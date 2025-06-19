
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface MascotProps {
  phase?: 'calm' | 'hopeful' | 'warm';
  isInteracting?: boolean;
}

const Mascot = ({ phase = 'calm', isInteracting = false }: MascotProps) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('😌');

  const emotions = {
    calm: ['😌', '🫧', '💙'],
    hopeful: ['🌟', '✨', '🌸'],
    warm: ['🌻', '💛', '🌅']
  };

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000 + Math.random() * 2000);

    const emotionInterval = setInterval(() => {
      const phaseEmotions = emotions[phase];
      setCurrentEmotion(phaseEmotions[Math.floor(Math.random() * phaseEmotions.length)]);
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(emotionInterval);
    };
  }, [phase]);

  const getPhaseStyles = () => {
    switch (phase) {
      case 'calm':
        return 'from-blue-100 to-purple-100 shadow-blue-200';
      case 'hopeful':
        return 'from-green-100 to-blue-100 shadow-green-200';
      case 'warm':
        return 'from-yellow-100 to-orange-100 shadow-yellow-200';
      default:
        return 'from-blue-100 to-purple-100 shadow-blue-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className={`
        w-12 h-12 rounded-full bg-gradient-to-br ${getPhaseStyles()}
        flex items-center justify-center shadow-lg transition-all duration-500
        ${isInteracting ? 'animate-bounce' : 'animate-float'}
        ${isBlinking ? 'scale-95' : 'scale-100'}
        hover:scale-110 cursor-pointer
      `}>
        <span className="text-xl transition-all duration-300">
          {currentEmotion}
        </span>
      </div>
      
      {/* Particules autour de la mascotte */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-purple-400 animate-twinkle" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-300 rounded-full animate-ping" />
      </div>
    </div>
  );
};

export default Mascot;
