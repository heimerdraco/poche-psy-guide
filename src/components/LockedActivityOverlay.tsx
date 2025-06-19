
import React from "react";
import { Lock, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import EnhancedButton from "./EnhancedButton";

interface LockedActivityOverlayProps {
  onUpgrade: () => void;
}

const LockedActivityOverlay = ({ onUpgrade }: LockedActivityOverlayProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-lg animate-pulse-gentle">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-center space-y-4 p-6 bg-white/80 rounded-xl shadow-lg backdrop-blur-sm border border-purple-100">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Lock className="w-6 h-6 animate-pulse text-purple-500" />
                <span className="font-semibold text-lg">🔓 Contenu Premium</span>
              </div>
              <p className="text-sm text-gray-600 max-w-xs">
                Débloquez votre parcours complet personnalisé
              </p>
              <EnhancedButton
                onClick={onUpgrade}
                className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                soundType="success"
                animationType="glow"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                🛍️ Débloquer maintenant
              </EnhancedButton>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs p-3">
            <p className="text-sm font-medium">
              Débloquez l'accès complet à votre parcours personnalisé sur un an 🌟
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Activités, exercices et suivi adapté à votre profil émotionnel
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default LockedActivityOverlay;
