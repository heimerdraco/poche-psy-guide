
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "./supabase";

// Générateurs de pseudonymes anonymes poétiques
const adjectives = [
  'Paisible', 'Calme', 'Rêveur', 'Serein', 'Doux', 'Lumineux', 'Tendre', 'Sage',
  'Bienveillant', 'Harmonieux', 'Gracieux', 'Silencieux', 'Mystérieux', 'Radieux',
  'Apaisé', 'Contemplatif', 'Méditatif', 'Poétique', 'Inspiré', 'Éthéré'
];

const nouns = [
  'Lys', 'Brume', 'Érable', 'Saule', 'Rosée', 'Aurore', 'Brise', 'Iris',
  'Bambou', 'Cerisier', 'Lotus', 'Jasmin', 'Océan', 'Colibri', 'Papillon',
  'Nuage', 'Étoile', 'Plume', 'Cristal', 'Perle', 'Corail', 'Violette'
];

export const generatePseudonym = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${noun} ${adjective}`;
};

// Fonction pour normaliser le texte et détecter les variantes
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[@€£$%&*]/g, 'a')
    .replace(/[0]/g, 'o')
    .replace(/[1]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[5]/g, 's')
    .replace(/[7]/g, 't')
    .replace(/\*/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim();
};

// Expressions régulières pour la modération avancée
const ADVANCED_MODERATION_PATTERNS = {
  // URLs et liens web
  url: /(?:https?:\/\/|www\.|[a-zA-Z0-9-]+\.(?:com|fr|org|net|eu|co|info|biz|me|io|app|dev|tech|online))/gi,
  
  // Adresses email
  email: /@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/gi,
  
  // Numéros de téléphone français et internationaux
  phone: /(?:\+33|0[1-9])(?:[-.\s]?\d{2}){4}|(?:\+\d{1,3}[-.\s]?)?\d{8,15}/gi
};

export const chatService = {
  // Obtenir ou créer un pseudonyme pour l'utilisateur
  async getUserPseudonym(profile: string): Promise<string> {
    const deviceId = getDeviceId();
    
    try {
      // Vérifier si l'utilisateur a déjà un pseudonyme
      const { data: existingPseudonym, error } = await supabase
        .from('user_pseudonyms')
        .select('pseudonym')
        .eq('device_id', deviceId)
        .eq('profile', profile)
        .single();

      if (existingPseudonym && !error) {
        return existingPseudonym.pseudonym;
      }

      // Créer un nouveau pseudonyme
      const newPseudonym = generatePseudonym();
      const { error: insertError } = await supabase
        .from('user_pseudonyms')
        .upsert({
          device_id: deviceId,
          pseudonym: newPseudonym,
          profile: profile,
          updated_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Erreur création pseudonyme:', insertError);
        return generatePseudonym(); // Fallback
      }

      return newPseudonym;
    } catch (error) {
      console.error('Erreur service pseudonyme:', error);
      return generatePseudonym(); // Fallback
    }
  },

  // Changer le pseudonyme de l'utilisateur
  async changePseudonym(profile: string): Promise<string> {
    const deviceId = getDeviceId();
    const newPseudonym = generatePseudonym();
    
    try {
      const { error } = await supabase
        .from('user_pseudonyms')
        .upsert({
          device_id: deviceId,
          pseudonym: newPseudonym,
          profile: profile,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erreur changement pseudonyme:', error);
      }

      return newPseudonym;
    } catch (error) {
      console.error('Erreur changement pseudonyme:', error);
      return newPseudonym;
    }
  },

  // Modération avancée avec détection de liens, emails et téléphones
  async moderateMessage(message: string): Promise<{ isAllowed: boolean; reason?: string }> {
    try {
      // Vérifier les patterns avancés (liens, emails, téléphones)
      for (const [type, pattern] of Object.entries(ADVANCED_MODERATION_PATTERNS)) {
        if (pattern.test(message)) {
          return { 
            isAllowed: false, 
            reason: `Ce message contient un contenu interdit (${type === 'url' ? 'lien' : type === 'email' ? 'email' : 'numéro'}).` 
          };
        }
      }

      // Vérifier les mots-clés dans la base de données
      const { data: keywords, error } = await supabase
        .from('moderation_keywords')
        .select('keyword, severity');

      if (error) {
        console.error('Erreur chargement mots-clés:', error);
        return { isAllowed: true }; // En cas d'erreur, on laisse passer
      }

      const normalizedMessage = normalizeText(message);
      
      for (const { keyword, severity } of keywords || []) {
        const normalizedKeyword = normalizeText(keyword);
        
        // Vérifier si le mot-clé est présent (en tant que mot complet ou partie de mot)
        if (normalizedMessage.includes(normalizedKeyword)) {
          return { 
            isAllowed: false, 
            reason: `Ce message a été bloqué pour non-respect des règles du chat.` 
          };
        }
      }

      return { isAllowed: true };
    } catch (error) {
      console.error('Erreur modération:', error);
      return { isAllowed: true };
    }
  },

  // Envoyer un message
  async sendMessage(profile: string, message: string, pseudonym: string): Promise<boolean> {
    const deviceId = getDeviceId();
    
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          device_id: deviceId,
          profile: profile,
          pseudonym: pseudonym,
          message: message,
          is_moderated: false
        });

      if (error) {
        console.error('Erreur envoi message:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur envoi message:', error);
      return false;
    }
  },

  // Récupérer les messages d'un profil
  async getMessages(profile: string, limit: number = 50) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('profile', profile)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Erreur chargement messages:', error);
        return [];
      }

      return data?.reverse() || [];
    } catch (error) {
      console.error('Erreur chargement messages:', error);
      return [];
    }
  }
};
