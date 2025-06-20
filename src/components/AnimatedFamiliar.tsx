
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from 'lucide-react';
import { useFamiliarData } from '@/hooks/useFamiliarData';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface AnimatedFamiliarProps {
  profile: string;
  className?: string;
}

const AnimatedFamiliar = ({ profile, className = '' }: AnimatedFamiliarProps) => {
  const { familiar, currentPhrase, showMessage, showRandomPhrase } = useFamiliarData(profile);
  const { playCalm } = useSoundEffects();
  const [isClicked, setIsClicked] = useState(false);

  const handleFamiliarClick = () => {
    setIsClicked(true);
    playCalm();
    showRandomPhrase();
    
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Bulle de message */}
      {showMessage && currentPhrase && (
        <Card className="absolute -left-48 -top-16 w-56 bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-scale-in z-50">
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {currentPhrase}
              </p>
            </div>
            {/* Flèche pointant vers le familier */}
            <div className="absolute -right-2 bottom-4 w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </CardContent>
        </Card>
      )}

      {/* Le familier */}
      <div 
        className={`
          relative cursor-pointer transition-all duration-300 transform
          ${isClicked ? familiar.clickAnimation : familiar.idleAnimation}
          hover:scale-110 group
        `}
        onClick={handleFamiliarClick}
        title={`${familiar.name} - ${familiar.animal}`}
      >
        {/* Corps du familier avec gradient personnalisé */}
        <div className={`
          w-20 h-20 rounded-full bg-gradient-to-br ${familiar.color}
          flex items-center justify-center shadow-lg border-2 border-white/50
          backdrop-blur-sm relative overflow-hidden
          transition-all duration-300 group-hover:shadow-xl
        `}>
          {/* Émoji du familier */}
          <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
            {familiar.emoji}
          </span>
          
          {/* Particules d'ambiance */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Nom du familier */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-semibold text-forest-700 bg-white/80 px-2 py-1 rounded-full shadow-sm backdrop-blur-sm" 
                style={{ fontFamily: 'Comfortaa, cursive' }}>
            {familiar.name}
          </span>
        </div>

        {/* Aura douce autour du familier */}
        <div className={`
          absolute inset-0 rounded-full bg-gradient-to-br ${familiar.color}
          opacity-20 scale-150 animate-pulse-gentle -z-10
        `}></div>
      </div>

      {/* Indicateur d'interaction */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full animate-ping opacity-75"></div>
    </div>
  );
};

export default AnimatedFamiliar;
