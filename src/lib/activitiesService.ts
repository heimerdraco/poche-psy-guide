
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
  }
};
