
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
      console.log('Récupération activités pour profil:', profile, 'jour:', dayNumber);
      
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

      console.log('Activités trouvées:', data?.length || 0);
      const activities = data || [];
      
      // Sélectionner une activité aléatoire pour chaque moment de la journée
      const morningActivities = activities.filter(a => a.type === 'morning');
      const afternoonActivities = activities.filter(a => a.type === 'afternoon');
      const eveningActivities = activities.filter(a => a.type === 'evening');

      console.log('Répartition activités:', {
        morning: morningActivities.length,
        afternoon: afternoonActivities.length,
        evening: eveningActivities.length
      });

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

  // Ajouter plus d'activités pour compléter tous les profils
  async addMoreActivities(): Promise<void> {
    const moreActivities = [
      // Activités supplémentaires pour L'Anxieux
      {
        title: "Affirmations rassurantes",
        description: "Répétez des phrases positives pour calmer votre mental",
        type: "morning",
        activity_format: "explanatory",
        content: { steps: ["Je suis en sécurité", "Je contrôle ma respiration", "Cette émotion va passer", "Je suis plus fort que mes peurs"] },
        target_profiles: ["anxieux"],
        day_min: 20,
        day_max: 365
      },
      {
        title: "Méditation progressive",
        description: "Détente musculaire progressive pour relâcher les tensions",
        type: "evening",
        activity_format: "audio",
        content: { duration: 900, theme: "progressive-relaxation" },
        target_profiles: ["anxieux"],
        day_min: 25,
        day_max: 365
      },
      {
        title: "Plan d'action anti-stress",
        description: "Créez votre stratégie personnelle contre l'anxiété",
        type: "afternoon",
        activity_format: "notebook",
        content: { prompt: "Listez 5 techniques qui vous aident quand vous êtes anxieux. Comment les utiliser au quotidien ?" },
        target_profiles: ["anxieux"],
        day_min: 30,
        day_max: 365
      },

      // Activités supplémentaires pour Le Fatigué
      {
        title: "Booster matinal",
        description: "Réveil énergique avec des mouvements simples",
        type: "morning",
        activity_format: "explanatory",
        content: { steps: ["Sautillements sur place 30 sec", "Rotations des bras", "Respirations dynamisantes", "Sourire forcé 30 sec"] },
        target_profiles: ["fatigue"],
        day_min: 20,
        day_max: 365
      },
      {
        title: "Pause renaissance",
        description: "Méditation pour retrouver sa vitalité",
        type: "afternoon",
        activity_format: "audio",
        content: { duration: 480, theme: "vitality-restoration" },
        target_profiles: ["fatigue"],
        day_min: 25,
        day_max: 365
      },
      {
        title: "Agenda des priorités",
        description: "Organisez votre énergie sur ce qui compte vraiment",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Identifiez 3 priorités de demain. Quelle énergie chacune nécessite-t-elle ? Comment optimiser ?" },
        target_profiles: ["fatigue"],
        day_min: 30,
        day_max: 365
      },

      // Activités supplémentaires pour Le Déraciné
      {
        title: "Rituel de gratitude",
        description: "Appréciez ce qui vous entoure maintenant",
        type: "morning",
        activity_format: "explanatory",
        content: { steps: ["Regardez autour de vous", "Nommez 5 choses que vous appréciez", "Ressentez la gratitude dans votre corps", "Ancrez cette sensation"] },
        target_profiles: ["deracine"],
        day_min: 20,
        day_max: 365
      },
      {
        title: "Méditation du foyer",
        description: "Créez un sentiment de chez-soi intérieur",
        type: "evening",
        activity_format: "audio",
        content: { duration: 720, theme: "inner-home" },
        target_profiles: ["deracine"],
        day_min: 25,
        day_max: 365
      },
      {
        title: "Carnet de souvenirs",
        description: "Reconnectez-vous à votre histoire personnelle",
        type: "afternoon",
        activity_format: "notebook",
        content: { prompt: "Décrivez un souvenir heureux de votre enfance. Quelles valeurs y trouvez-vous ? Comment les vivre aujourd'hui ?" },
        target_profiles: ["deracine"],
        day_min: 35,
        day_max: 365
      },

      // Activités supplémentaires pour Le Contrôlant
      {
        title: "Exercice d'improvisation",
        description: "Pratiquez la spontanéité dans votre quotidien",
        type: "afternoon",
        activity_format: "explanatory",
        content: { steps: ["Choisissez une tâche routinière", "Changez votre façon habituelle de la faire", "Observez vos résistances", "Appréciez la nouveauté"] },
        target_profiles: ["controlant"],
        day_min: 20,
        day_max: 365
      },
      {
        title: "Méditation de confiance",
        description: "Apprenez à faire confiance à la vie",
        type: "morning",
        activity_format: "audio",
        content: { duration: 600, theme: "trust-meditation" },
        target_profiles: ["controlant"],
        day_min: 25,
        day_max: 365
      },
      {
        title: "Journal de lâcher prise",
        description: "Identifiez ce que vous pouvez relâcher",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Sur quoi avez-vous essayé de garder le contrôle aujourd'hui ? Que pourriez-vous lâcher demain ?" },
        target_profiles: ["controlant"],
        day_min: 30,
        day_max: 365
      },

      // Activités supplémentaires pour L'Hypersensible
      {
        title: "Bouclier émotionnel",
        description: "Technique de protection énergétique",
        type: "morning",
        activity_format: "explanatory",
        content: { steps: ["Visualisez une lumière dorée autour de vous", "Cette lumière filtre les énergies négatives", "Seul l'amour peut la traverser", "Portez ce bouclier toute la journée"] },
        target_profiles: ["hypersensible"],
        day_min: 20,
        day_max: 365
      },
      {
        title: "Méditation de centrage",
        description: "Retrouvez votre équilibre émotionnel",
        type: "afternoon",
        activity_format: "audio",
        content: { duration: 540, theme: "emotional-centering" },
        target_profiles: ["hypersensible"],
        day_min: 25,
        day_max: 365
      },
      {
        title: "Carnet de protection",
        description: "Planifiez vos stratégies de préservation",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Dans quelles situations vous sentez-vous le plus vulnérable ? Quelles stratégies de protection pouvez-vous mettre en place ?" },
        target_profiles: ["hypersensible"],
        day_min: 30,
        day_max: 365
      },

      // Activités supplémentaires pour Le Refoulé
      {
        title: "Exercice de voix",
        description: "Libérez votre expression vocale",
        type: "morning",
        activity_format: "explanatory",
        content: { steps: ["Faites des vocalises (ah, eh, oh)", "Parlez plus fort que d'habitude", "Chantez une chanson que vous aimez", "Exprimez-vous avec conviction"] },
        target_profiles: ["refoule"],
        day_min: 20,
        day_max: 365
      },
      {
        title: "Méditation d'expression",
        description: "Libérez votre parole intérieure",
        type: "afternoon",
        activity_format: "audio",
        content: { duration: 480, theme: "inner-voice" },
        target_profiles: ["refoule"],
        day_min: 25,
        day_max: 365
      },
      {
        title: "Lettre de libération",
        description: "Exprimez ce que vous n'avez jamais dit",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Écrivez une lettre à quelqu'un (vivant ou décédé) en exprimant tout ce que vous n'avez jamais osé dire." },
        target_profiles: ["refoule"],
        day_min: 30,
        day_max: 365
      },

      // Activités supplémentaires pour Le Volcan
      {
        title: "Exercice de décharge",
        description: "Libérez la pression avant qu'elle monte",
        type: "morning",
        activity_format: "explanatory",
        content: { steps: ["Secouez vos bras énergiquement", "Tapez des pieds", "Faites des grimaces", "Criez dans un coussin si besoin"] },
        target_profiles: ["volcan"],
        day_min: 20,
        day_max: 365
      },
      {
        title: "Méditation de refroidissement",
        description: "Calmez le feu intérieur avant l'explosion",
        type: "afternoon",
        activity_format: "audio",
        content: { duration: 360, theme: "cooling-down" },
        target_profiles: ["volcan"],
        day_min: 25,
        day_max: 365
      },
      {
        title: "Plan de gestion de crise",
        description: "Préparez-vous aux moments difficiles",
        type: "evening",
        activity_format: "notebook",
        content: { prompt: "Créez votre plan d'urgence : que faire quand vous sentez la colère monter ? Listez 5 stratégies concrètes." },
        target_profiles: ["volcan"],
        day_min: 30,
        day_max: 365
      }
    ];

    try {
      const { error } = await supabase
        .from('activities')
        .insert(moreActivities);
      
      if (error) {
        console.error('Erreur insertion activités supplémentaires:', error);
      } else {
        console.log('Activités supplémentaires ajoutées avec succès');
      }
    } catch (error) {
      console.error('Erreur ajout activités:', error);
    }
  }
};
