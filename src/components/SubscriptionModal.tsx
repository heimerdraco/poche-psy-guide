
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Heart, Star, Sparkles } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  const features = [
    "Accès illimité aux 7 parcours émotionnels complets (70 jours)",
    "Messages bienveillants illimités",
    "Journal émotionnel avec graphiques",
    "Nouvelles techniques ajoutées chaque mois",
    "Guides de méditation et relaxation",
    "Sauvegarde cloud de ton parcours",
    "Support prioritaire avec bienveillance",
    "Aucune publicité, expérience pure"
  ];

  const handleSubscribe = (plan: 'monthly' | 'weekly') => {
    const price = plan === 'monthly' ? '3,99€/mois' : '0,99€/semaine';
    alert(`Redirection vers le paiement ${price}...`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2 text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            <Sparkles className="w-6 h-6 text-purple-500" />
            Soutien+ 💜
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Continue à prendre soin de toi avec un accompagnement illimité
            </p>
            <div className="flex gap-3 justify-center">
              <Badge className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 text-base px-4 py-2">
                3,99€/mois
              </Badge>
              <Badge className="bg-gradient-to-r from-pink-200 to-orange-200 text-gray-800 text-base px-4 py-2">
                0,99€/semaine
              </Badge>
            </div>
          </div>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-800">
                <Star className="w-4 h-4 text-yellow-500" />
                Tout ce dont tu as besoin pour ton bien-être :
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={() => handleSubscribe('monthly')}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white py-3 text-lg rounded-2xl border-0 shadow-lg"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              💜 Choisir 3,99€/mois
            </Button>
            
            <Button 
              onClick={() => handleSubscribe('weekly')}
              variant="outline"
              className="w-full border-2 border-purple-300 hover:border-purple-400 hover:bg-purple-50 py-3 text-lg rounded-2xl text-gray-700"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              🌸 Essayer 0,99€/semaine
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Annulable à tout moment. Pas d'engagement. 🫂
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="text-center text-sm text-gray-600 space-y-2">
              <p className="flex items-center justify-center gap-2">
                <span>🔒</span> Paiement sécurisé
              </p>
              <p className="flex items-center justify-center gap-2">
                <span>💝</span> Satisfait ou remboursé sous 14 jours
              </p>
              <p className="flex items-center justify-center gap-2">
                <span>🫂</span> Support humain et bienveillant
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
