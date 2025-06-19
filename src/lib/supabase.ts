
import { supabase } from "@/integrations/supabase/client";

// Générer un device_id unique
export const getDeviceId = () => {
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
};

export const supabaseService = {
  // Utilisateurs
  async saveUser(profile: string, trialStart: string) {
    const deviceId = getDeviceId();
    const { data, error } = await supabase
      .from('users')
      .upsert({
        device_id: deviceId,
        profile: profile,
        trial_start: trialStart,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'device_id'
      });
    
    if (error) console.error('Erreur sauvegarde utilisateur:', error);
    return { data, error };
  },

  // Réponses questionnaire
  async saveQuestionnaireAnswer(questionId: number, answer: string, points: Record<string, number>) {
    const deviceId = getDeviceId();
    const { data, error } = await supabase
      .from('questionnaire_answers')
      .insert({
        device_id: deviceId,
        question_id: questionId,
        answer: answer,
        points: points,
        created_at: new Date().toISOString()
      });
    
    if (error) console.error('Erreur sauvegarde réponse:', error);
    return { data, error };
  },

  // Messages anonymes
  async saveAnonymousMessage(message: string, type: 'sent' | 'received') {
    const deviceId = getDeviceId();
    const { data, error } = await supabase
      .from('anonymous_messages')
      .insert({
        device_id: deviceId,
        message: message,
        type: type,
        created_at: new Date().toISOString()
      });
    
    if (error) console.error('Erreur sauvegarde message:', error);
    return { data, error };
  },

  // Journaling
  async saveJournalEntry(content: string, mood: string, day: number) {
    const deviceId = getDeviceId();
    const { data, error } = await supabase
      .from('journaling')
      .insert({
        device_id: deviceId,
        content: content,
        mood: mood,
        day: day,
        created_at: new Date().toISOString()
      });
    
    if (error) console.error('Erreur sauvegarde journal:', error);
    return { data, error };
  },

  // Paramètres de rappel
  async saveReminderSettings(time: string, enabled: boolean) {
    const deviceId = getDeviceId();
    const { data, error } = await supabase
      .from('reminder_settings')
      .upsert({
        device_id: deviceId,
        reminder_time: time,
        enabled: enabled,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'device_id'
      });
    
    if (error) console.error('Erreur sauvegarde rappels:', error);
    return { data, error };
  },

  // Récupérer toutes les données d'un utilisateur
  async getUserData() {
    const deviceId = getDeviceId();
    
    const [users, answers, messages, journal, reminders] = await Promise.all([
      supabase.from('users').select('*').eq('device_id', deviceId),
      supabase.from('questionnaire_answers').select('*').eq('device_id', deviceId),
      supabase.from('anonymous_messages').select('*').eq('device_id', deviceId),
      supabase.from('journaling').select('*').eq('device_id', deviceId),
      supabase.from('reminder_settings').select('*').eq('device_id', deviceId)
    ]);

    return {
      user: users.data?.[0] || null,
      answers: answers.data || [],
      messages: messages.data || [],
      journal: journal.data || [],
      reminders: reminders.data?.[0] || null
    };
  }
};
