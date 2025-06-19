
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "./supabase";

export interface Activity {
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

export interface DailyActivities {
  morning: Activity | null;
  afternoon: Activity | null;
  evening: Activity | null;
}

export const activitiesService = {
  // Récupérer les activités du jour pour un profil
  async getDailyActivities(profile: string, dayNumber: number): Promise<DailyActivities> {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .contains('target_profiles', [profile])
        .lte('day_min', dayNumber)
        .gte('day_max', dayNumber);

      if (error) {
        console.error('Erreur récupération activités:', error);
        return { morning: null, afternoon: null, evening: null };
      }

      const activities = data || [];
      
      // Sélectionner une activité aléatoire pour chaque moment de la journée
      const morningActivities = activities.filter(a => a.type === 'morning');
      const afternoonActivities = activities.filter(a => a.type === 'afternoon');
      const eveningActivities = activities.filter(a => a.type === 'evening');

      return {
        morning: morningActivities.length > 0 ? 
          morningActivities[Math.floor(Math.random() * morningActivities.length)] as Activity : null,
        afternoon: afternoonActivities.length > 0 ? 
          afternoonActivities[Math.floor(Math.random() * afternoonActivities.length)] as Activity : null,
        evening: eveningActivities.length > 0 ? 
          eveningActivities[Math.floor(Math.random() * eveningActivities.length)] as Activity : null
      };
    } catch (error) {
      console.error('Erreur service activités:', error);
      return { morning: null, afternoon: null, evening: null };
    }
  },

  // Marquer une activité comme complétée
  async completeActivity(activityId: string, notes?: string): Promise<boolean> {
    try {
      const deviceId = getDeviceId();
      const { error } = await supabase
        .from('completed_activities')
        .upsert({
          device_id: deviceId,
          activity_id: activityId,
          notes: notes,
          completed_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erreur completion activité:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur service completion:', error);
      return false;
    }
  },

  // Vérifier si une activité est complétée
  async isActivityCompleted(activityId: string): Promise<boolean> {
    try {
      const deviceId = getDeviceId();
      const { data, error } = await supabase
        .from('completed_activities')
        .select('id')
        .eq('device_id', deviceId)
        .eq('activity_id', activityId)
        .single();

      return !error && !!data;
    } catch (error) {
      return false;
    }
  },

  // Récupérer les activités complétées
  async getCompletedActivities(): Promise<any[]> {
    try {
      const deviceId = getDeviceId();
      const { data, error } = await supabase
        .from('completed_activities')
        .select(`
          *,
          activities (
            title,
            description,
            type,
            activity_format
          )
        `)
        .eq('device_id', deviceId)
        .order('completed_at', { ascending: false });

      if (error) {
        console.error('Erreur récupération activités complétées:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Erreur service activités complétées:', error);
      return [];
    }
  },

  // Insérer des activités supplémentaires pour enrichir la base de données
  async seedMoreActivities(): Promise<void> {
    const additionalActivities = [
      // Activités pour L'Anxieux
      {
        title: "Technique de la boule de lumière",
        description: "Visualisation apaisante pour calmer l'anxiété",
        type: "morning",
        activity_format: "audio",
        content: { duration: 480, theme: "calming-light" },
        target_profiles: ["anxieux"]
      },
      {
        title: "Journal des gratitudes",
        description: "Notez 3 choses positives de votre journée",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Quelles sont les 3 choses pour lesquelles vous êtes reconnaissant(e) aujourd'hui ?" },
        target_profiles: ["anxieux"]
      },
      
      // Activités pour Le Fatigué
      {
        title: "Micro-méditation énergisante",
        description: "5 minutes pour retrouver de l'élan",
        type: "afternoon",
        activity_format: "audio",
        content: { duration: 300, theme: "energy-boost" },
        target_profiles: ["fatigue"]
      },
      {
        title: "Cartographie de l'énergie",
        description: "Identifiez vos sources d'énergie et de fatigue",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Qu'est-ce qui vous donne de l'énergie ? Qu'est-ce qui vous en prend ?" },
        target_profiles: ["fatigue"]
      },

      // Activités pour Le Déraciné
      {
        title: "Rituel d'ancrage matinal",
        description: "Connectez-vous à l'instant présent",
        type: "morning",
        activity_format: "explanatory",
        content: { steps: ["Posez vos pieds au sol", "Respirez profondément 5 fois", "Nommez 3 choses que vous voyez", "Connectez-vous à votre corps"] },
        target_profiles: ["deracine"]
      },
      {
        title: "Lettre à un proche",
        description: "Reconnectez-vous avec une personne importante",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Écrivez une lettre (que vous n'enverrez pas forcément) à quelqu'un qui compte pour vous." },
        target_profiles: ["deracine"]
      },

      // Activités pour Le Contrôlant
      {
        title: "Agenda du chaos",
        description: "Planifiez délibérément de l'imprévu",
        type: "morning",
        activity_format: "notebook",
        content: { prompt: "Planifiez 15 minutes de 'temps libre' sans objectif précis dans votre journée." },
        target_profiles: ["controlant"]
      },
      {
        title: "Dessin spontané",
        description: "Lâchez prise à travers l'art",
        type: "afternoon",
        activity_format: "explanatory",
        content: { steps: ["Prenez une feuille et un crayon", "Dessinez sans but pendant 10 minutes", "Ne jugez pas le résultat", "Observez ce qui émerge"] },
        target_profiles: ["controlant"]
      },

      // Activités pour L'Hypersensible
      {
        title: "Bulle de protection",
        description: "Créez votre espace émotionnel sécurisé",
        type: "morning",
        activity_format: "audio",
        content: { duration: 420, theme: "protection-bubble" },
        target_profiles: ["hypersensible"]
      },
      {
        title: "Écriture cathartique",
        description: "Libérez vos émotions par l'écriture",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Écrivez tout ce que vous ressentez, sans censure, pendant 10 minutes." },
        target_profiles: ["hypersensible"]
      },

      // Activités pour Le Refoulé
      {
        title: "Dialogue intérieur",
        description: "Reconnectez-vous à votre voix intérieure",
        type: "morning",
        activity_format: "notebook",
        content: { prompt: "Posez-vous la question : 'Qu'est-ce que j'ai vraiment envie de dire aujourd'hui ?'" },
        target_profiles: ["refoule"]
      },
      {
        title: "Méditation de reconnexion",
        description: "Retrouvez le contact avec vos émotions",
        type: "afternoon",
        activity_format: "audio",
        content: { duration: 600, theme: "emotional-reconnection" },
        target_profiles: ["refoule"]
      },

      // Activités pour Le Volcan
      {
        title: "Journal de colère",
        description: "Exprimez votre colère de manière constructive",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Qu'est-ce qui vous a mis en colère aujourd'hui ? Écrivez sans retenue." },
        target_profiles: ["volcan"]
      },
      {
        title: "Respiration de libération",
        description: "Technique pour évacuer les tensions",
        type: "afternoon",
        activity_format: "explanatory",
        content: { steps: ["Inspirez profondément", "Retenez 3 secondes", "Expirez en faisant un son (ahh, ouf...)", "Répétez 10 fois"] },
        target_profiles: ["volcan"]
      }
    ];

    try {
      const { error } = await supabase
        .from('activities')
        .insert(additionalActivities);
      
      if (error) {
        console.error('Erreur insertion activités:', error);
      }
    } catch (error) {
      console.error('Erreur seed activités:', error);
    }
  }
};
