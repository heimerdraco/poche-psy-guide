
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Legal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <header className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Mentions légales</h1>
        </header>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Éditeur de l'application</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Application Psy de poche</p>
              <p>Version 1.0.0</p>
              <p>Développée avec Lovable.dev</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Politique de confidentialité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Données collectées</h3>
                <p className="text-sm text-gray-600">
                  Cette application collecte uniquement les données nécessaires à son fonctionnement :
                  profil émotionnel, réponses au questionnaire, entrées de journal et progression.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Stockage des données</h3>
                <p className="text-sm text-gray-600">
                  Vos données sont stockées localement sur votre appareil et peuvent être sauvegardées 
                  de manière chiffrée si vous activez la synchronisation cloud.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Partage des données</h3>
                <p className="text-sm text-gray-600">
                  Aucune donnée personnelle n'est partagée avec des tiers. Les messages anonymes 
                  sont transmis de manière chiffrée et ne contiennent aucune information d'identification.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conditions d'utilisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Usage prévu</h3>
                <p className="text-sm text-gray-600">
                  Cette application est conçue comme un outil de bien-être personnel et ne remplace 
                  pas un suivi médical ou psychologique professionnel.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Abonnement</h3>
                <p className="text-sm text-gray-600">
                  L'abonnement premium (3,99€/mois) se renouvelle automatiquement. 
                  Vous pouvez l'annuler à tout moment dans les paramètres de votre compte.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Garantie de remboursement</h3>
                <p className="text-sm text-gray-600">
                  Satisfaction garantie sous 14 jours. Contactez-nous pour un remboursement complet 
                  si l'application ne répond pas à vos attentes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Pour toute question concernant cette application ou vos données :
              </p>
              <p className="text-sm font-medium mt-2">
                Email : support@psydepoche.app
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Legal;
