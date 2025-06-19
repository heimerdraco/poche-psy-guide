
import { useState, useEffect } from "react";

interface EnhancedSplashScreenProps {
  onComplete: () => void;
}

const EnhancedSplashScreen = ({ onComplete }: EnhancedSplashScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const phrases = [
    "Un souffle pour toi ✨",
    "Prends une pause avec Arboria 🌿",
    "Trouve ton équilibre intérieur 🧘‍♀️"
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentPhase(1), 600);
    const timer2 = setTimeout(() => setCurrentPhase(2), 1800);
    const timer3 = setTimeout(() => setCurrentPhase(3), 3200);
    const timer4 = setTimeout(() => setCurrentPhase(4), 4600);
    const timer5 = setTimeout(() => setCurrentPhase(5), 5200);
    const timer6 = setTimeout(() => onComplete(), 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-sage-100 via-cream-50 to-forest-100 overflow-hidden">
      
      {/* Organic floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-emerald-200/20 rounded-full animate-float-slow"
            style={{
              width: `${Math.random() * 12 + 6}px`,
              height: `${Math.random() * 12 + 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Breathing light effect behind logo */}
      <div className={`absolute w-96 h-96 rounded-full bg-gradient-radial from-emerald-200/30 via-teal-100/20 to-transparent animate-pulse-gentle transition-opacity duration-2000 ${
        currentPhase >= 1 ? 'opacity-100' : 'opacity-0'
      }`} style={{ animationDuration: '3s' }} />

      {/* Enhanced logo with growth animation */}
      <div className={`transition-all duration-1500 ${currentPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <div className={`w-32 h-32 mb-8 relative ${currentPhase >= 1 ? 'animate-pulse-gentle' : ''}`}>
          <img 
            src="/lovable-uploads/71692815-441c-473e-8dca-dc19e4da3570.png" 
            alt="Arboria Logo"
            className={`w-full h-full object-contain transition-all duration-2000 drop-shadow-2xl ${
              currentPhase >= 2 ? 'filter brightness-110' : ''
            }`}
          />
          
          {/* Gentle glow around logo */}
          {currentPhase >= 2 && (
            <>
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-emerald-200/30 to-teal-200/30 animate-pulse-gentle blur-sm"></div>
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-emerald-100/20 to-teal-100/20 animate-pulse-gentle blur-md" style={{ animationDelay: '1s' }}></div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced title with warmer styling */}
      <div className={`text-center mb-16 transition-all duration-1500 ${currentPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-6xl font-bold text-forest-800 mb-4 tracking-wide" style={{ fontFamily: 'Comfortaa, cursive' }}>
          Arboria
        </h1>
        <div className={`w-24 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 mx-auto rounded-full transition-all duration-1500 ${
          currentPhase >= 2 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}></div>
        <p className={`text-forest-600 mt-4 text-xl font-medium transition-all duration-1500 ${
          currentPhase >= 2 ? 'opacity-100' : 'opacity-0'
        }`} style={{ fontFamily: 'Nunito, sans-serif' }}>
          Votre compagnon de bien-être
        </p>
      </div>

      {/* Enhanced calming phrases */}
      <div className="text-center max-w-md px-8">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className={`text-2xl text-forest-700 mb-6 font-medium transition-all duration-1500 ${
              currentPhase >= 2 + index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
            style={{ 
              fontFamily: 'Nunito, sans-serif',
              transitionDelay: `${index * 0.8}s`
            }}
          >
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-emerald-100/50">
              {phrase}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced growth visualization */}
      {currentPhase >= 4 && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex items-end space-x-2 animate-slide-in-gentle">
            {[4, 6, 8, 10, 8, 6, 4].map((height, index) => (
              <div
                key={index}
                className={`w-2 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-full animate-bounce-gentle shadow-lg`}
                style={{ 
                  height: `${height * 4}px`,
                  animationDelay: `${index * 0.15}s`,
                  animationDuration: '1.2s'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gentle fade out overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-cream-50 via-sage-50 to-forest-50 transition-opacity duration-2000 ${
        currentPhase >= 5 ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default EnhancedSplashScreen;
