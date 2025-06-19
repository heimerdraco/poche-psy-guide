
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const phrases = [
    "Respire un instant.",
    "Trouve ton équilibre intérieur."
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentPhase(1), 1000);
    const timer2 = setTimeout(() => setCurrentPhase(2), 2500);
    const timer3 = setTimeout(() => setCurrentPhase(3), 4000);
    const timer4 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 overflow-hidden">
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Logo central avec animation pulse */}
      <div className={`transition-all duration-1000 ${currentPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="w-24 h-24 mb-8 animate-pulse-gentle">
          <img 
            src="/lovable-uploads/71692815-441c-473e-8dca-dc19e4da3570.png" 
            alt="Arboria Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Titre avec animation */}
      <div className={`text-center mb-12 transition-all duration-1000 ${currentPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-4xl font-bold text-emerald-800 mb-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Arboria
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
      </div>

      {/* Phrases apaisantes */}
      <div className="text-center max-w-sm px-8">
        {phrases.map((phrase, index) => (
          <p
            key={index}
            className={`text-lg text-emerald-700 mb-3 transition-all duration-1000 ${
              currentPhase >= 2 + index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              fontFamily: 'Nunito, sans-serif',
              transitionDelay: `${index * 0.5}s`
            }}
          >
            {phrase}
          </p>
        ))}
      </div>

      {/* Animation de sortie */}
      <div className={`absolute inset-0 bg-white transition-opacity duration-1000 ${
        currentPhase >= 3 ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default SplashScreen;
