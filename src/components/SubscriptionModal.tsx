
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Heart, Star } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  const features = [
    "Accès illimité aux 7 profils psychologiques",
    "Parcours personnalisés avec 50+ exercices",
    "Journal personnel avec suivi d'humeur",
    "Citations quotidiennes inspirantes",
    "Nouvelles techniques ajoutées chaque mois",
    "Sauvegarde cloud de vos données",
    "Support prioritaire",
    "Aucune publicité"
  ];

  const handleSubscribe = () => {
    // Simuler un processus d'abonnement
    alert("Redirection vers le système de paiement...");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            Psy de poche Premium
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              9,99€
              <span className="text-lg font-normal text-gray-600">/mois</span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              ✨ Essai gratuit 3 jours
            </Badge>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Tout ce dont vous avez besoin pour votre bien-être :
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={handleSubscribe}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 text-lg"
            >
              Commencer mon essai gratuit
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Annulable à tout moment. Pas d'engagement.
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">🔒 Paiement sécurisé</p>
              <p>💝 Satisfait ou remboursé sous 14 jours</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
