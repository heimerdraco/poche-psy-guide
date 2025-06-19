
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Scale, Shield, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Legal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 p-4">
      <div className="container mx-auto max-w-md pb-20">
        <header className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            Informations légales
          </h1>
        </header>

        <div className="space-y-6">
          {/* Éditeur */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Éditeur & Publication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Éditeur responsable</p>
                  <p className="text-gray-600">Heimerdraco</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">Responsable de publication</p>
                  <p className="text-gray-600">Heimerdraco</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">Contact</p>
                  <p className="text-gray-600">heimerdraco63@gmail.com</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">Hébergement</p>
                  <p className="text-gray-600">Supabase, Inc.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Abonnement */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Scale className="w-5 h-5 text-purple-600" />
                Conditions d'abonnement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-700 space-y-3">
                <div>
                  <p className="font-medium mb-1">Essai gratuit</p>
                  <p className="text-gray-600">3 jours d'accès complet sans engagement</p>
                </div>
                
                <div>
                  <p className="font-medium mb-1">Abonnement mensuel</p>
                  <p className="text-gray-600">3,99€ par mois, renouvelé automatiquement</p>
                </div>
                
                <div>
                  <p className="font-medium mb-1">Résiliation</p>
                  <p className="text-gray-600">Possible à tout moment depuis les paramètres</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-800 leading-relaxed">
                  <strong>Droit de rétractation :</strong> L'achat numérique étant immédiat après validation, 
                  le droit de rétractation ne s'applique pas conformément à l'article L221-28 du Code de la consommation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Données personnelles */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Vos données personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-700 space-y-3">
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression 
                  de vos données personnelles.
                </p>
                
                <div>
                  <p className="font-medium mb-1">Stockage des données</p>
                  <p className="text-gray-600">
                    Vos données sont stockées localement sur votre appareil et sauvegardées de manière 
                    chiffrée via Supabase, Inc.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium mb-1">Partage</p>
                  <p className="text-gray-600">Aucune donnée n'est partagée avec des tiers.</p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-xs text-green-800 leading-relaxed">
                  Vous pouvez à tout moment télécharger ou supprimer vos données depuis les paramètres de l'application.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Clause de responsabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 leading-relaxed">
                  Cette application vous accompagne dans votre bien-être émotionnel mais ne constitue pas 
                  un traitement médical ou psychologique. En cas de détresse importante, nous vous encourageons 
                  à consulter un professionnel de santé mentale.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center space-y-2 pt-4">
            <p className="text-xs text-gray-400">
              Application conforme au RGPD, CNIL et Loi LCEN
            </p>
            <p className="text-xs text-gray-300">
              Dernière mise à jour : Décembre 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;
