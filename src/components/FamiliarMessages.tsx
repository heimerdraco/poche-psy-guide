
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { X, Heart, MessageCircle } from "lucide-react";
import { useFamiliarData } from '@/hooks/useFamiliarData';
import { supabase } from "@/integrations/supabase/client";

interface FamiliarMessagesProps {
  profile: string;
}

const FamiliarMessages = ({ profile }: FamiliarMessagesProps) => {
  const { familiar } = useFamiliarData(profile);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageOpacity, setMessageOpacity] = useState(0);
  const [anonymousMessages, setAnonymousMessages] = useState<string[]>([]);

  // Messages pré-enregistrés bienveillants
  const predefinedMessages = [
    "✨ Chaque petit pas compte, vous faites du merveille !",
    "🌱 Votre croissance personnelle inspire les autres",
    "💝 Vous méritez toute la douceur du monde",
    "🌈 Après la pluie vient toujours le beau temps",
    "🕊️ Respirez... Vous êtes exactement où vous devez être",
    "🌸 Votre sensibilité est un don précieux",
    "⭐ Vous avez déjà surmonté tant d'épreuves",
    "🦋 Laissez-vous le temps de vous transformer",
    "🌿 La nature vous rappelle votre force intérieure",
    "💫 Votre lumière éclaire le chemin d'autres personnes",
    "🏔️ Les montagnes se gravissent une pierre à la fois",
    "🌊 Comme les vagues, vos émotions vont et viennent",
    "🔥 Votre passion est une flamme qui ne s'éteint jamais",
    "🌙 Même dans l'obscurité, vous portez votre propre lumière",
    "🌺 Chaque journée est une nouvelle chance de fleurir"
  ];

  // Charger des messages anonymes bienveillants d'autres utilisateurs
  useEffect(() => {
    const loadAnonymousMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('anonymous_messages')
          .select('message')
          .eq('type', 'sent')
          .limit(20);

        if (data && !error) {
          const messages = data.map(item => item.message).filter(msg => 
            msg.length > 10 && msg.length < 200 && // Filtrer par longueur
            !msg.includes('@') && // Pas d'emails
            !msg.includes('http') // Pas de liens
          );
          setAnonymousMessages(messages);
        }
      } catch (error) {
        console.error('Erreur chargement messages anonymes:', error);
      }
    };

    loadAnonymousMessages();
  }, []);

  // Fonction pour afficher un message aléatoire
  const showRandomMessage = () => {
    // Mélanger messages pré-définis et anonymes
    const allMessages = [...predefinedMessages, ...anonymousMessages];
    
    if (allMessages.length === 0) return;

    const randomMessage = allMessages[Math.floor(Math.random() * allMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    setMessageOpacity(1);

    // Masquer après 6 secondes avec animation
    setTimeout(() => {
      setMessageOpacity(0);
      setTimeout(() => setShowMessage(false), 500);
    }, 6000);
  };

  // Timer pour afficher un message toutes les 30 secondes
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (!showMessage && Math.random() > 0.3) { // 70% de chance d'afficher
        showRandomMessage();
      }
    }, 30000); // 30 secondes

    // Premier message après 5 secondes
    const initialTimer = setTimeout(() => {
      if (!showMessage) {
        showRandomMessage();
      }
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(initialTimer);
    };
  }, [showMessage, anonymousMessages]);

  const closeMessage = () => {
    setMessageOpacity(0);
    setTimeout(() => setShowMessage(false), 300);
  };

  if (!showMessage) return null;

  return (
    <div className="fixed top-20 right-4 z-40 max-w-sm">
      <Card 
        className="bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-slide-in-right"
        style={{ 
          opacity: messageOpacity,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <CardContent className="p-4">
          {/* Header avec familier */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${familiar.color} flex items-center justify-center flex-shrink-0`}>
              <span className="text-lg">{familiar.emoji}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-forest-700">
                  {familiar.name}
                </span>
                <button
                  onClick={closeMessage}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-gray-500">
                Message bienveillant
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gradient-to-br from-sage-50 to-forest-50 p-3 rounded-lg border border-sage-200">
            <p className="text-sm text-forest-700 leading-relaxed">
              {currentMessage}
            </p>
          </div>

          {/* Footer avec icônes */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Heart className="w-3 h-3" />
              <span>Bienveillance</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MessageCircle className="w-3 h-3" />
              <span>Arboria</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Petite flèche pointant vers le familier */}
      <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
    </div>
  );
};

export default FamiliarMessages;
