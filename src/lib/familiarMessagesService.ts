
import { supabase } from "@/integrations/supabase/client";
import { getDeviceId } from "./supabase";

export const familiarMessagesService = {
  // Envoyer un message bienveillant anonyme
  async sendBenevolentMessage(message: string): Promise<boolean> {
    try {
      const deviceId = getDeviceId();
      
      // Vérification et nettoyage du message
      const cleanMessage = message.trim();
      if (cleanMessage.length < 10 || cleanMessage.length > 200) {
        return false;
      }

      // Filtrage basique pour éviter les contenus inappropriés
      const forbiddenWords = ['spam', 'publicité', '@', 'http', 'www'];
      const containsForbidden = forbiddenWords.some(word => 
        cleanMessage.toLowerCase().includes(word)
      );

      if (containsForbidden) {
        return false;
      }

      const { error } = await supabase
        .from('anonymous_messages')
        .insert({
          device_id: deviceId,
          message: cleanMessage,
          type: 'sent',
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erreur envoi message bienveillant:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur service message bienveillant:', error);
      return false;
    }
  },

  // Récupérer des messages bienveillants aléatoires
  async getBenevolentMessages(limit: number = 20): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('anonymous_messages')
        .select('message')
        .eq('type', 'sent')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error || !data) {
        return [];
      }

      // Filtrer et nettoyer les messages
      return data
        .map(item => item.message)
        .filter(message => 
          message.length >= 10 && 
          message.length <= 200 &&
          !message.includes('@') &&
          !message.toLowerCase().includes('http')
        );
    } catch (error) {
      console.error('Erreur récupération messages:', error);
      return [];
    }
  }
};
