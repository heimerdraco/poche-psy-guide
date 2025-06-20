
import { supabase } from "@/integrations/supabase/client";
import { planningService, type DayPlan } from "./planningService";

export interface StableActivity {
  id: string;
  title: string;
  description: string;
  type: 'morning' | 'afternoon' | 'evening';
  activity_format: 'explanatory' | 'audio' | 'notebook';
  content: any;
  target_profiles: string[];
  day_min: number;
  day_max: number;
  is_premium: boolean;
  created_at: string;
}

export interface StableDailyActivities {
  morning: StableActivity | null;
  afternoon: StableActivity | null;
  evening: StableActivity | null;
}

export const stableActivitiesService = {
  // Récupérer les activités stables pour un jour donné
  async getStableDailyActivities(profile: string, dayNumber: number): Promise<StableDailyActivities> {
    try {
      console.log('Récupération activités stables pour profil:', profile, 'jour:', dayNumber);
      
      // Récupérer le planning du jour
      const dayPlan: DayPlan | null = await planningService.getDayPlan(profile, dayNumber);
      
      if (!dayPlan) {
        console.log('Aucun planning trouvé, génération en cours...');
        // Générer le planning s'il n'existe pas
        const success = await planningService.generateYearlyPlan(profile);
        if (!success) {
          return { morning: null, afternoon: null, evening: null };
        }
        
        // Réessayer après génération
        const newDayPlan = await planningService.getDayPlan(profile, dayNumber);
        if (!newDayPlan) {
          return { morning: null, afternoon: null, evening: null };
        }
        
        return this.fetchActivitiesFromPlan(newDayPlan);
      }
      
      return this.fetchActivitiesFromPlan(dayPlan);
    } catch (error) {
      console.error('Erreur service activités stables:', error);
      return { morning: null, afternoon: null, evening: null };
    }
  },

  // Récupérer les activités depuis le planning avec nettoyage du contenu audio
  async fetchActivitiesFromPlan(dayPlan: DayPlan): Promise<StableDailyActivities> {
    try {
      const activityIds = [
        dayPlan.morning_activity_id,
        dayPlan.afternoon_activity_id,
        dayPlan.evening_activity_id
      ].filter(id => id);

      if (activityIds.length === 0) {
        return { morning: null, afternoon: null, evening: null };
      }

      const { data: activities, error } = await supabase
        .from('activities')
        .select('*')
        .in('id', activityIds);

      if (error || !activities) {
        console.error('Erreur récupération activités:', error);
        return { morning: null, afternoon: null, evening: null };
      }

      // Nettoyer et adapter les activités pour supprimer les références audio
      const cleanedActivities = activities.map(activity => {
        const cleanedActivity = { ...activity };
        
        // Si l'activité contient des références audio, les convertir en texte
        if (cleanedActivity.content && typeof cleanedActivity.content === 'object' && cleanedActivity.content !== null) {
          const content = cleanedActivity.content as any;
          
          if (content.audioText) {
            content.textContent = content.audioText;
            delete content.audioText;
          }
          
          // S'assurer qu'il y a toujours un contenu textuel
          if (!content.textContent && !content.text) {
            content.textContent = "Prenez un moment pour vous recentrer et réfléchir à votre journée.";
          }
        }
        
        return cleanedActivity;
      });

      const morningActivity = cleanedActivities.find(a => a.id === dayPlan.morning_activity_id) as StableActivity || null;
      const afternoonActivity = cleanedActivities.find(a => a.id === dayPlan.afternoon_activity_id) as StableActivity || null;
      const eveningActivity = cleanedActivities.find(a => a.id === dayPlan.evening_activity_id) as StableActivity || null;

      console.log('Activités nettoyées récupérées:', {
        morning: morningActivity?.title || 'Aucune',
        afternoon: afternoonActivity?.title || 'Aucune',
        evening: eveningActivity?.title || 'Aucune'
      });

      return {
        morning: morningActivity,
        afternoon: afternoonActivity,
        evening: eveningActivity
      };
    } catch (error) {
      console.error('Erreur récupération activités du planning:', error);
      return { morning: null, afternoon: null, evening: null };
    }
  },

  // Marquer une activité comme complétée et sauvegarder dans les souvenirs
  async completeStableActivity(
    profile: string,
    dayNumber: number,
    activityType: 'morning' | 'afternoon' | 'evening',
    activityId: string,
    notes?: string
  ): Promise<boolean> {
    try {
      // Récupérer le souvenir existant ou créer un nouveau
      let dayMemory = await planningService.getDayMemory(dayNumber);
      
      if (!dayMemory) {
        // Récupérer les activités du jour pour initialiser le souvenir
        const dailyActivities = await this.getStableDailyActivities(profile, dayNumber);
        
        dayMemory = {
          day: dayNumber,
          date: new Date().toISOString().split('T')[0],
          completed: false,
          morning_completed: false,
          afternoon_completed: false,
          evening_completed: false,
          morning_activity: dailyActivities.morning,
          afternoon_activity: dailyActivities.afternoon,
          evening_activity: dailyActivities.evening
        };
      }

      // Marquer l'activité comme complétée
      if (activityType === 'morning') {
        dayMemory.morning_completed = true;
        dayMemory.morning_notes = notes;
      } else if (activityType === 'afternoon') {
        dayMemory.afternoon_completed = true;
        dayMemory.afternoon_notes = notes;
      } else if (activityType === 'evening') {
        dayMemory.evening_completed = true;
        dayMemory.evening_notes = notes;
      }

      // Vérifier si toutes les activités sont complétées
      dayMemory.completed = dayMemory.morning_completed && 
                           dayMemory.afternoon_completed && 
                           dayMemory.evening_completed;

      // Sauvegarder le souvenir
      const success = await planningService.saveDayMemory(dayMemory);
      
      if (success) {
        console.log(`Activité ${activityType} du jour ${dayNumber} complétée et sauvegardée`);
      }
      
      return success;
    } catch (error) {
      console.error('Erreur completion activité stable:', error);
      return false;
    }
  },

  // Vérifier si une activité est complétée
  async isStableActivityCompleted(dayNumber: number, activityType: 'morning' | 'afternoon' | 'evening'): Promise<boolean> {
    try {
      const dayMemory = await planningService.getDayMemory(dayNumber);
      
      if (!dayMemory) return false;
      
      switch (activityType) {
        case 'morning': return dayMemory.morning_completed;
        case 'afternoon': return dayMemory.afternoon_completed;
        case 'evening': return dayMemory.evening_completed;
        default: return false;
      }
    } catch (error) {
      return false;
    }
  }
};
