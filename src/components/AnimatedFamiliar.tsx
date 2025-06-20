
import { useState } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useFamiliarData } from '@/hooks/useFamiliarData';

interface AnimatedFamiliarProps {
  profile: string;
  className?: string;
}

const AnimatedFamiliar = ({ profile, className = '' }: AnimatedFamiliarProps) => {
  const { familiar } = useFamiliarData(profile);
  const { playCalm } = useSoundEffects();
  const [isClicked, setIsClicked] = useState(false);

  const handleFamiliarClick = () => {
    setIsClicked(true);
    playCalm();
    
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <div className={`relative flex justify-center ${className}`}>
      {/* Le familier - Plus vivant avec animations améliorées */}
      <div 
        className={`
          relative cursor-pointer transition-all duration-300 transform
          ${isClicked ? familiar.clickAnimation : familiar.idleAnimation}
          hover:scale-110 group
        `}
        onClick={handleFamiliarClick}
        title={`${familiar.name} - ${familiar.animal}`}
      >
        {/* Corps du familier avec gradient personnalisé et pulsation */}
        <div className={`
          w-24 h-24 rounded-full bg-gradient-to-br ${familiar.color}
          flex items-center justify-center shadow-lg border-2 border-white/50
          backdrop-blur-sm relative overflow-hidden
          transition-all duration-300 group-hover:shadow-xl
          animate-pulse-gentle
        `}>
          {/* Émoji du familier avec animation de respiration */}
          <span className={`text-4xl transition-all duration-300 group-hover:scale-110 ${
            isClicked ? 'animate-bounce' : 'animate-breathe'
          }`}>
            {familiar.emoji}
          </span>
          
          {/* Particules d'ambiance plus nombreuses */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-6 left-6 w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-5 right-2 w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Effet de brillance qui traverse le familier */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
        </div>

        {/* Nom du familier */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-sm font-semibold text-forest-700 bg-white/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm animate-float" 
                style={{ fontFamily: 'Comfortaa, cursive' }}>
            {familiar.name}
          </span>
        </div>

        {/* Aura douce autour du familier - Plus prononcée */}
        <div className={`
          absolute inset-0 rounded-full bg-gradient-to-br ${familiar.color}
          opacity-30 scale-125 animate-pulse-gentle -z-10
        `}></div>
        
        {/* Deuxième aura plus large */}
        <div className={`
          absolute inset-0 rounded-full bg-gradient-to-br ${familiar.color}
          opacity-15 scale-150 animate-pulse-gentle -z-20
        `} style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Indicateur d'interaction plus visible */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full animate-ping opacity-75"></div>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full animate-pulse"></div>
    </div>
  );
};

export default AnimatedFamiliar;
