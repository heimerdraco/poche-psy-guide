
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "./supabase";

export interface JournalEntry {
  id: string;
  device_id: string;
  date: string;
  mood_rating?: number;
  mood_text?: string;
  written_note?: string;
  audio_url?: string;
  photo_url?: string;
  created_at: string;
}

export const journalService = {
  // Sauvegarder une entrée de journal
  async saveEntry(entry: Partial<JournalEntry>): Promise<boolean> {
    try {
      const deviceId = getDeviceId();
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('daily_journal')
        .upsert({
          device_id: deviceId,
          date: today,
          ...entry,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erreur sauvegarde journal:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur service journal:', error);
      return false;
    }
  },

  // Récupérer l'entrée du jour
  async getTodayEntry(): Promise<JournalEntry | null> {
    try {
      const deviceId = getDeviceId();
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('daily_journal')
        .select('*')
        .eq('device_id', deviceId)
        .eq('date', today)
        .maybeSingle();

      if (error) {
        console.error('Erreur récupération journal:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erreur service journal:', error);
      return null;
    }
  },

  // Récupérer l'historique du journal
  async getHistory(limit: number = 30): Promise<JournalEntry[]> {
    try {
      const deviceId = getDeviceId();
      
      const { data, error } = await supabase
        .from('daily_journal')
        .select('*')
        .eq('device_id', deviceId)
        .order('date', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Erreur récupération historique:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Erreur service historique:', error);
      return [];
    }
  }
};
