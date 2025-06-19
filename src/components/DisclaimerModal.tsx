
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Heart, Lock } from "lucide-react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

const DisclaimerModal = ({ isOpen, onAccept }: DisclaimerModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      // Marquer le disclaimer comme accepté
      localStorage.setItem('arboriaDisclaimerAccepted', 'true');
      onAccept();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-cream-50 to-sage-50 border-sage-200">
        <div className="space-y-6 p-2">
          {/* Header avec icône bienveillante */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sage-200/90 to-forest-200/90 rounded-full p-3 mx-auto mb-4 animate-pulse-gentle shadow-lg backdrop-blur-sm border-2 border-white/50">
              <Heart className="w-full h-full text-forest-600 drop-shadow-sm" />
            </div>
            <h2 className="text-2xl font-bold text-forest-800 mb-2" style={{ fontFamily: 'Comfortaa, cursive' }}>
              🧠 Bienvenue dans Arboria
            </h2>
          </div>

          {/* Contenu principal */}
          <div className="space-y-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-sage-100 shadow-sm">
            <p className="text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Avant de commencer, il est important de savoir que :
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-sage-50/50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lg">🎯</span>
                </div>
                <p className="text-sm text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Les 10 questions qui suivent ont pour but de mieux cerner ton profil émotionnel et te proposer des activités adaptées sur le long terme.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-sage-50/50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-4 h-4 text-forest-600" />
                </div>
                <p className="text-sm text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Aucune réponse ne sera utilisée à d'autres fins que ton bien-être personnel.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-sage-50/50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Lock className="w-4 h-4 text-forest-600" />
                </div>
                <p className="text-sm text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Tes données restent privées : elles sont anonymes, stockées de façon sécurisée, et ne seront jamais revendues ni partagées.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-sage-50/50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-forest-600" />
                </div>
                <p className="text-sm text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Tu peux consulter ou supprimer tes données à tout moment dans les paramètres de l'app.
                </p>
              </div>
            </div>
          </div>

          {/* Checkbox de consentement */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-sage-100 shadow-sm">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked as boolean)}
                className="mt-1 border-sage-400 data-[state=checked]:bg-forest-500 data-[state=checked]:border-forest-500"
              />
              <label 
                htmlFor="consent" 
                className="text-sm text-forest-700 leading-relaxed cursor-pointer flex-1" 
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                ✅ Je comprends et j'accepte de répondre aux questions pour bénéficier d'un parcours personnalisé.
              </label>
            </div>
          </div>

          {/* Bouton de validation */}
          <Button
            onClick={handleAccept}
            disabled={!isChecked}
            className={`w-full py-4 text-lg rounded-2xl shadow-lg transition-all duration-300 ${
              isChecked
                ? 'bg-gradient-to-r from-sage-500 to-forest-500 hover:from-sage-600 hover:to-forest-600 text-cream-50 hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            🔘 Commencer mon parcours
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerModal;
