
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Sparkles, Heart } from "lucide-react";
import { playCompletionChime } from "@/components/ui/sound-effects";

interface ActivityCompletionToastProps {
  isVisible: boolean;
  onClose: () => void;
  activityTitle: string;
}

const ActivityCompletionToast = ({ 
  isVisible, 
  onClose, 
  activityTitle 
}: ActivityCompletionToastProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      
      // Son léger de validation
      playCompletionChime();
      
      // Auto-fermeture après 4 secondes
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    } else {
      // Délai pour l'animation de sortie
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
    }`}>
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl border-0 min-w-[320px] animate-bounce-gentle">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <CheckCircle className="w-8 h-8 animate-scale-in" />
              <div className="absolute inset-0 animate-ping opacity-75">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg">🎉 Bravo !</h3>
              <p className="text-green-100 text-sm">Activité "{activityTitle}" complétée</p>
            </div>
            
            <div className="flex gap-1">
              <Sparkles className="w-5 h-5 animate-twinkle text-yellow-300" />
              <Heart className="w-5 h-5 animate-pulse text-pink-300" />
            </div>
          </div>
          
          {/* Barre de progression de fermeture */}
          <div className="mt-3 w-full bg-green-600 rounded-full h-1">
            <div className="bg-white h-1 rounded-full animate-progress-bar"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityCompletionToast;
