
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const phrases = [
    "Respire un instant.",
    "On est là pour avancer ensemble."
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fdf2f8 100%)'
         }}>
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
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
        <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mb-8 animate-pulse-gentle shadow-lg">
          <Heart className="w-10 h-10 text-purple-600" />
        </div>
      </div>

      {/* Titre avec animation */}
      <div className={`text-center mb-12 transition-all duration-1000 ${currentPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Psy de poche
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto rounded-full"></div>
      </div>

      {/* Phrases apaisantes */}
      <div className="text-center max-w-sm px-8">
        {phrases.map((phrase, index) => (
          <p
            key={index}
            className={`text-lg text-gray-700 mb-3 transition-all duration-1000 ${
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
