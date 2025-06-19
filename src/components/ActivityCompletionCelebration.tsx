
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ActivityCompletionCelebrationProps {
  isVisible: boolean;
  onClose: () => void;
  activityTitle: string;
}

const ActivityCompletionCelebration = ({ 
  isVisible, 
  onClose, 
  activityTitle 
}: ActivityCompletionCelebrationProps) => {
  const [phase, setPhase] = useState(0);

  const encouragements = [
    "Magnifique ! Tu as pris soin de toi aujourd'hui 🌟",
    "Chaque petit pas compte vers ton bien-être 🌱",
    "Tu rayonnes de plus en plus chaque jour ✨",
    "Quelle belle progression ! Continue ainsi 🌸",
    "Ton équilibre intérieur grandit 🧘‍♀️"
  ];

  const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

  useEffect(() => {
    if (isVisible) {
      setPhase(0);
      const timer1 = setTimeout(() => setPhase(1), 300);
      const timer2 = setTimeout(() => setPhase(2), 1200);
      const timer3 = setTimeout(() => setPhase(3), 2500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative">
        {/* Celebration particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float opacity-60"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            >
              {['🌟', '✨', '🌸', '🍃', '💚', '🌱'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>

        <Card className={`max-w-md mx-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-2xl transition-all duration-1000 ${
          phase >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}>
          <CardContent className="p-8 text-center space-y-6">
            {/* Success icon with animation */}
            <div className={`w-20 h-20 mx-auto bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center transition-all duration-700 ${
              phase >= 2 ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <span className="text-3xl">🎉</span>
            </div>

            {/* Success message */}
            <div className={`space-y-3 transition-all duration-500 ${
              phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h3 className="text-xl font-bold text-emerald-800" style={{ fontFamily: 'Comfortaa, cursive' }}>
                Activité terminée !
              </h3>
              <p className="text-emerald-700 font-medium" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {activityTitle}
              </p>
            </div>

            {/* Encouragement message */}
            <div className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 transition-all duration-500 ${
              phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-emerald-800 font-medium leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {randomEncouragement}
              </p>
            </div>

            {/* Continue button */}
            <Button
              onClick={onClose}
              className={`bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full px-8 py-3 font-semibold shadow-lg transition-all duration-300 ${
                phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Continuer mon parcours ✨
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityCompletionCelebration;
