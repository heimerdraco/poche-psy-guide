
import { useState, useEffect } from "react";
import { Sparkles, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MascotProps {
  phase?: 'calm' | 'hopeful' | 'warm';
  isInteracting?: boolean;
}

const Mascot = ({ phase = 'calm', isInteracting = false }: MascotProps) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('😌');
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const emotions = {
    calm: ['😌', '🧘‍♀️', '💙', '🌸'],
    hopeful: ['🌟', '✨', '🌱', '🌈'],
    warm: ['🌻', '💛', '🌅', '☀️']
  };

  const messages = {
    calm: [
      "Prenez une grande respiration 🌿",
      "Vous êtes sur le bon chemin 💙",
      "Un moment de calme vous fait du bien 🧘‍♀️",
      "Votre paix intérieure grandit chaque jour 🌸"
    ],
    hopeful: [
      "Chaque jour apporte de nouvelles possibilités ✨",
      "Votre force intérieure brille 🌟",
      "L'espoir guide vos pas 🌈",
      "Vous grandissez beautifully 🌱"
    ],
    warm: [
      "Votre lumière réchauffe le monde 🌻",
      "Aujourd'hui est rempli de potentiel ☀️",
      "Votre énergie positive rayonne 💛",
      "Embrassez cette belle journée 🌅"
    ]
  };

  useEffect(() => {
    // Animation de clignement
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000 + Math.random() * 3000);

    // Changement d'émotion
    const emotionInterval = setInterval(() => {
      const phaseEmotions = emotions[phase];
      setCurrentEmotion(phaseEmotions[Math.floor(Math.random() * phaseEmotions.length)]);
    }, 6000);

    // Messages périodiques
    const messageInterval = setInterval(() => {
      const phaseMessages = messages[phase];
      setCurrentMessage(phaseMessages[Math.floor(Math.random() * phaseMessages.length)]);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }, 15000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(emotionInterval);
      clearInterval(messageInterval);
    };
  }, [phase]);

  const getPhaseStyles = () => {
    switch (phase) {
      case 'calm':
        return 'from-blue-100 to-purple-100 shadow-blue-200 border-blue-200';
      case 'hopeful':
        return 'from-green-100 to-emerald-100 shadow-green-200 border-green-200';
      case 'warm':
        return 'from-yellow-100 to-orange-100 shadow-yellow-200 border-yellow-200';
      default:
        return 'from-blue-100 to-purple-100 shadow-blue-200 border-blue-200';
    }
  };

  const handleMascotClick = () => {
    const phaseMessages = messages[phase];
    setCurrentMessage(phaseMessages[Math.floor(Math.random() * phaseMessages.length)]);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Bulle de message */}
      {showMessage && (
        <Card className="absolute -left-64 top-12 w-60 bg-white/95 backdrop-blur-sm shadow-lg border-sage-200 animate-scale-in">
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {currentMessage}
              </p>
            </div>
            {/* Petite flèche pointant vers la mascotte */}
            <div className="absolute -right-2 top-4 w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </CardContent>
        </Card>
      )}

      {/* Corps de la mascotte */}
      <div 
        className={`
          w-16 h-16 rounded-full bg-gradient-to-br ${getPhaseStyles()}
          flex items-center justify-center shadow-lg transition-all duration-500
          ${isInteracting ? 'animate-bounce' : 'animate-float'}
          ${isBlinking ? 'scale-95' : 'scale-100'}
          hover:scale-110 cursor-pointer border-2
          backdrop-blur-sm
        `}
        onClick={handleMascotClick}
      >
        <span className="text-2xl transition-all duration-300">
          {currentEmotion}
        </span>
      </div>
      
      {/* Particules autour de la mascotte */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-purple-400 animate-twinkle" />
        <Heart className="absolute -bottom-1 -left-1 w-3 h-3 text-pink-400 animate-ping" />
        <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
      </div>

      {/* Bouton pour masquer/afficher */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
          setTimeout(() => setIsVisible(true), 5000); // Réapparaît après 5 secondes
        }}
        className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-xs transition-colors"
        title="Masquer temporairement"
      >
        ×
      </button>
    </div>
  );
};

export default Mascot;
