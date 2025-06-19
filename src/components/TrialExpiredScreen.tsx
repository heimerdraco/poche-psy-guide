
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Lock, Sparkles, Shield } from "lucide-react";

interface TrialExpiredScreenProps {
  onUpgrade: () => void;
}

const TrialExpiredScreen = ({ onUpgrade }: TrialExpiredScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-md">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
              Fin de ton essai gratuit
            </CardTitle>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Tu arrives à la fin de ton essai gratuit de 3 jours. Pour continuer ton parcours émotionnel...
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Ce que tu débloques :
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Accès illimité à tous les parcours émotionnels
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Messages bienveillants sans limite
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Journal personnel sauvegardé à vie
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Nouveaux contenus chaque mois
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Badge className="bg-green-100 text-green-800 mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Ton contenu sera conservé et débloqué à vie
              </Badge>
            </div>

            <Button
              onClick={onUpgrade}
              size="lg"
              className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              💎 Débloquer tout (3,99 €/mois)
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Paiement sécurisé • Annulation possible à tout moment
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-2 text-purple-600">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Psy de poche</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialExpiredScreen;
