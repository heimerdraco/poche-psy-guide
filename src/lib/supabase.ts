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
    console.log('Sauvegarde utilisateur avec profil:', profile);
    
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
    
    if (error) {
      console.error('Erreur sauvegarde utilisateur:', error);
    } else {
      console.log('Utilisateur sauvegardé avec succès:', data);
    }
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

  // Sauvegarder la progression du parcours
  async saveJourneyProgress(phase: string, dayNumber: number, completedActivities: string[]) {
    const deviceId = getDeviceId();
    
    try {
      const { data, error } = await supabase
        .from('journey_progress')
        .upsert({
          device_id: deviceId,
          current_phase: phase,
          day_number: dayNumber,
          completed_activities: completedActivities,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'device_id'
        });
      
      if (error) {
        console.error('Erreur sauvegarde progression:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Erreur sauvegarde progression:', error);
      return { data: null, error };
    }
  },

  // Sauvegarder les explorations thématiques
  async saveThemeProgress(themeId: string, progress: number, completed: boolean) {
    const deviceId = getDeviceId();
    
    try {
      const { data, error } = await supabase
        .from('theme_progress')
        .upsert({
          device_id: deviceId,
          theme_id: themeId,
          progress: progress,
          completed: completed,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'device_id, theme_id'
        });
      
      if (error) {
        console.error('Erreur sauvegarde thème:', error);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Erreur sauvegarde thème:', error);
      return { data: null, error };
    }
  },

  // Sauvegarder un pseudonyme utilisateur
  async savePseudonym(profile: string, pseudonym: string) {
    const deviceId = getDeviceId();
    const { data, error } = await supabase
      .from('user_pseudonyms')
      .upsert({
        device_id: deviceId,
        profile: profile,
        pseudonym: pseudonym,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'device_id'
      });
    
    if (error) console.error('Erreur sauvegarde pseudonyme:', error);
    return { data, error };
  },

  // Sauvegarder un message de chat
  async saveChatMessage(profile: string, pseudonym: string, message: string) {
    const deviceId = getDeviceId();
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        device_id: deviceId,
        profile: profile,
        pseudonym: pseudonym,
        message: message,
        created_at: new Date().toISOString()
      });
    
    if (error) console.error('Erreur sauvegarde message chat:', error);
    return { data, error };
  },

  // Récupérer toutes les données d'un utilisateur (méthode étendue)
  async getUserData() {
    const deviceId = getDeviceId();
    
    const [users, answers, messages, journal, reminders] = await Promise.all([
      supabase.from('users').select('*').eq('device_id', deviceId),
      supabase.from('questionnaire_answers').select('*').eq('device_id', deviceId),
      supabase.from('anonymous_messages').select('*').eq('device_id', deviceId),
      supabase.from('journaling').select('*').eq('device_id', deviceId),
      supabase.from('reminder_settings').select('*').eq('device_id', deviceId)
    ]);

    // Récupérer les données des nouvelles tables
    let journeyProgress = null;
    let themeProgress = [];
    let userPseudonyms = [];
    let chatMessages = [];

    try {
      const journeyResult = await supabase
        .from('journey_progress')
        .select('*')
        .eq('device_id', deviceId);
      journeyProgress = journeyResult.data?.[0] || null;
    } catch (error) {
      console.error('Erreur récupération journey_progress:', error);
    }

    try {
      const themeResult = await supabase
        .from('theme_progress')
        .select('*')
        .eq('device_id', deviceId);
      themeProgress = themeResult.data || [];
    } catch (error) {
      console.error('Erreur récupération theme_progress:', error);
    }

    try {
      const pseudonymResult = await supabase
        .from('user_pseudonyms')
        .select('*')
        .eq('device_id', deviceId);
      userPseudonyms = pseudonymResult.data || [];
    } catch (error) {
      console.error('Erreur récupération user_pseudonyms:', error);
    }

    try {
      const chatResult = await supabase
        .from('chat_messages')
        .select('*')
        .eq('device_id', deviceId);
      chatMessages = chatResult.data || [];
    } catch (error) {
      console.error('Erreur récupération chat_messages:', error);
    }

    return {
      user: users.data?.[0] || null,
      answers: answers.data || [],
      messages: messages.data || [],
      journal: journal.data || [],
      reminders: reminders.data?.[0] || null,
      journeyProgress,
      themeProgress,
      userPseudonyms,
      chatMessages
    };
  }
};
