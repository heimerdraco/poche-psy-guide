
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
    const timer1 = setTimeout(() => setCurrentPhase(1), 800);
    const timer2 = setTimeout(() => setCurrentPhase(2), 2200);
    const timer3 = setTimeout(() => setCurrentPhase(3), 3800);
    const timer4 = setTimeout(() => setCurrentPhase(4), 4500);
    const timer5 = setTimeout(() => onComplete(), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 overflow-hidden">
      
      {/* Particules flottantes améliorées */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full animate-float-slow"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Logo central avec animation améliorée */}
      <div className={`transition-all duration-1000 ${currentPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className={`w-28 h-28 mb-8 relative ${currentPhase >= 1 ? 'animate-pulse-gentle' : ''}`}>
          <img 
            src="/lovable-uploads/71692815-441c-473e-8dca-dc19e4da3570.png" 
            alt="Arboria Logo"
            className={`w-full h-full object-contain transition-all duration-2000 ${
              currentPhase >= 2 ? 'filter drop-shadow-lg' : ''
            }`}
          />
          
          {/* Animation de croissance simulée autour du logo */}
          {currentPhase >= 2 && (
            <>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-200/30 to-teal-200/30 animate-pulse-gentle"></div>
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-100/20 to-teal-100/20 animate-pulse-gentle" style={{ animationDelay: '0.5s' }}></div>
            </>
          )}
        </div>
      </div>

      {/* Titre avec animation améliorée */}
      <div className={`text-center mb-12 transition-all duration-1000 ${currentPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <h1 className="text-5xl font-bold text-emerald-800 mb-3" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Arboria
        </h1>
        <div className={`w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full transition-all duration-1000 ${
          currentPhase >= 2 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}></div>
        <p className={`text-emerald-600 mt-3 text-lg transition-all duration-1000 ${
          currentPhase >= 2 ? 'opacity-100' : 'opacity-0'
        }`} style={{ fontFamily: 'Nunito, sans-serif' }}>
          Votre compagnon de bien-être
        </p>
      </div>

      {/* Phrases apaisantes avec meilleure animation */}
      <div className="text-center max-w-sm px-8">
        {phrases.map((phrase, index) => (
          <p
            key={index}
            className={`text-xl text-emerald-700 mb-4 font-medium transition-all duration-1000 ${
              currentPhase >= 2 + index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              fontFamily: 'Nunito, sans-serif',
              transitionDelay: `${index * 0.8}s`
            }}
          >
            {phrase}
          </p>
        ))}
      </div>

      {/* Animation de croissance symbolique */}
      {currentPhase >= 3 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex items-end space-x-1 animate-fade-in">
            <div className="w-1 bg-emerald-400 rounded-full animate-bounce-gentle h-4"></div>
            <div className="w-1 bg-emerald-500 rounded-full animate-bounce-gentle h-6" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 bg-emerald-600 rounded-full animate-bounce-gentle h-8" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-1 bg-emerald-500 rounded-full animate-bounce-gentle h-6" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-1 bg-emerald-400 rounded-full animate-bounce-gentle h-4" style={{ animationDelay: '0.8s' }}></div>
          </div>
        </div>
      )}

      {/* Animation de sortie améliorée */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white via-emerald-50 to-teal-50 transition-opacity duration-1500 ${
        currentPhase >= 4 ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default SplashScreen;
