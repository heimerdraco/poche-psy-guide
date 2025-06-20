import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "./supabase";

export interface DayPlan {
  day: number;
  morning_activity_id: string;
  afternoon_activity_id: string;
  evening_activity_id: string;
}

export interface DayMemory {
  day: number;
  date: string;
  completed: boolean;
  morning_completed: boolean;
  afternoon_completed: boolean;
  evening_completed: boolean;
  morning_notes?: string;
  afternoon_notes?: string;
  evening_notes?: string;
  morning_activity: any;
  afternoon_activity: any;
  evening_activity: any;
}

export const planningService = {
  // Générer un planning STABLE de 365 jours pour un profil (FIXE UNE FOIS POUR TOUTES)
  async generateYearlyPlan(profile: string): Promise<boolean> {
    try {
      const deviceId = getDeviceId();
      
      // Vérifier si un planning existe déjà
      const { data: existingPlan } = await supabase
        .from('yearly_plans')
        .select('id')
        .eq('device_id', deviceId)
        .eq('profile', profile)
        .single();

      if (existingPlan) {
        console.log('Planning déjà existant pour ce profil - STABLE ET FIXE');
        return true;
      }

      // Récupérer toutes les activités pour ce profil
      const { data: activities, error } = await supabase
        .from('activities')
        .select('*')
        .contains('target_profiles', [profile]);

      if (error || !activities || activities.length === 0) {
        console.error('Impossible de récupérer les activités:', error);
        return false;
      }

      // Séparer par type d'activité
      const morningActivities = activities.filter(a => a.type === 'morning');
      const afternoonActivities = activities.filter(a => a.type === 'afternoon');
      const eveningActivities = activities.filter(a => a.type === 'evening');

      console.log('Activités disponibles:', {
        morning: morningActivities.length,
        afternoon: afternoonActivities.length,
        evening: eveningActivities.length
      });

      // GÉNÉRER PLANNING FIXE avec une seed basée sur le device_id + profile
      // Cela garantit que le même utilisateur aura toujours les mêmes activités
      const seed = this.createSeed(deviceId + profile);
      const seededRandom = this.createSeededRandom(seed);

      const yearlyPlan = [];
      for (let day = 1; day <= 365; day++) {
        const plan: DayPlan = {
          day,
          morning_activity_id: morningActivities[Math.floor(seededRandom() * morningActivities.length)]?.id || '',
          afternoon_activity_id: afternoonActivities[Math.floor(seededRandom() * afternoonActivities.length)]?.id || '',
          evening_activity_id: eveningActivities[Math.floor(seededRandom() * eveningActivities.length)]?.id || ''
        };
        yearlyPlan.push(plan);
      }

      // Sauvegarder le planning principal (FIXE POUR TOUJOURS)
      const { error: planError } = await supabase
        .from('yearly_plans')
        .insert({
          device_id: deviceId,
          profile: profile,
          plan_data: yearlyPlan,
          created_at: new Date().toISOString()
        });

      if (planError) {
        console.error('Erreur sauvegarde planning:', planError);
        return false;
      }

      console.log('Planning STABLE de 365 jours généré et FIXÉ pour toujours');
      return true;
    } catch (error) {
      console.error('Erreur génération planning:', error);
      return false;
    }
  },

  // Créer une seed numérique à partir d'une chaîne
  createSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  },

  // Générateur de nombres pseudo-aléatoires avec seed (pour garantir reproductibilité)
  createSeededRandom(seed: number) {
    let currentSeed = seed;
    return function() {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
  },

  // Récupérer le planning d'un jour spécifique
  async getDayPlan(profile: string, dayNumber: number): Promise<DayPlan | null> {
    try {
      const deviceId = getDeviceId();
      
      const { data, error } = await supabase
        .from('yearly_plans')
        .select('plan_data')
        .eq('device_id', deviceId)
        .eq('profile', profile)
        .single();

      if (error || !data) {
        console.error('Planning non trouvé:', error);
        return null;
      }

      const planData = data.plan_data as unknown as DayPlan[];
      return planData.find(day => day.day === dayNumber) || null;
    } catch (error) {
      console.error('Erreur récupération planning jour:', error);
      return null;
    }
  },

  // Sauvegarder un souvenir de jour
  async saveDayMemory(dayMemory: Partial<DayMemory>): Promise<boolean> {
    try {
      const deviceId = getDeviceId();
      
      const { error } = await supabase
        .from('day_memories')
        .upsert({
          device_id: deviceId,
          day: dayMemory.day,
          date: dayMemory.date || new Date().toISOString().split('T')[0],
          completed: dayMemory.completed || false,
          morning_completed: dayMemory.morning_completed || false,
          afternoon_completed: dayMemory.afternoon_completed || false,
          evening_completed: dayMemory.evening_completed || false,
          morning_notes: dayMemory.morning_notes,
          afternoon_notes: dayMemory.afternoon_notes,
          evening_notes: dayMemory.evening_notes,
          morning_activity: dayMemory.morning_activity,
          afternoon_activity: dayMemory.afternoon_activity,
          evening_activity: dayMemory.evening_activity,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'device_id, day'
        });

      if (error) {
        console.error('Erreur sauvegarde souvenir:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur service souvenir:', error);
      return false;
    }
  },

  // Récupérer un souvenir de jour
  async getDayMemory(dayNumber: number): Promise<DayMemory | null> {
    try {
      const deviceId = getDeviceId();
      
      const { data, error } = await supabase
        .from('day_memories')
        .select('*')
        .eq('device_id', deviceId)
        .eq('day', dayNumber)
        .single();

      if (error) {
        return null;
      }

      return data as DayMemory;
    } catch (error) {
      return null;
    }
  },

  // Récupérer tous les souvenirs
  async getAllMemories(): Promise<DayMemory[]> {
    try {
      const deviceId = getDeviceId();
      
      const { data, error } = await supabase
        .from('day_memories')
        .select('*')
        .eq('device_id', deviceId)
        .order('day', { ascending: true });

      if (error) {
        console.error('Erreur récupération souvenirs:', error);
        return [];
      }

      return (data as DayMemory[]) || [];
    } catch (error) {
      console.error('Erreur service souvenirs:', error);
      return [];
    }
  },

  // Calculer le jour actuel basé sur la date de création du profil
  getCurrentDay(profileCreatedAt: string): number {
    const startDate = new Date(profileCreatedAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Cycle de 365 jours
    return (diffDays % 365) + 1;
  }
};
