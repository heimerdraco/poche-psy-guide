
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Scale, Shield, FileText, Camera, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const Legal = () => {
  const navigate = useNavigate();

  const handleDeleteData = () => {
    // Supprimer toutes les données locales
    localStorage.clear();
    sessionStorage.clear();
    
    // Afficher une confirmation
    alert("Toutes vos données ont été supprimées de cet appareil.");
  };

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

          {/* Permissions et Confidentialité */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                Confidentialité & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-700 space-y-4">
                <div>
                  <p className="font-medium mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Appareil photo et galerie
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    L'application peut demander l'accès à votre appareil photo et galerie uniquement 
                    pour les activités qui le nécessitent. Aucune photo n'est stockée, analysée ou partagée.
                  </p>
                  <p className="text-xs text-blue-600 mt-1 font-mono">
                    Permissions : android.permission.CAMERA, android.permission.READ_EXTERNAL_STORAGE
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-xs text-green-800 leading-relaxed">
                  <strong>Engagement de confidentialité :</strong> Aucune donnée personnelle ou image 
                  n'est stockée, analysée ou utilisée à des fins commerciales. Toutes les informations 
                  restent sur l'appareil de l'utilisateur.
                </p>
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
                    Vos données sont stockées localement sur votre appareil. Aucune donnée personnelle 
                    n'est transmise à des serveurs externes sans votre consentement explicite.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium mb-1">Partage</p>
                  <p className="text-gray-600">Aucune donnée n'est partagée avec des tiers.</p>
                </div>

                <div>
                  <p className="font-medium mb-1">Types de données collectées</p>
                  <ul className="text-gray-600 text-xs list-disc list-inside space-y-1">
                    <li>Réponses aux questionnaires de profil émotionnel</li>
                    <li>Progression dans les activités</li>
                    <li>Préférences d'utilisation</li>
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs text-green-800 leading-relaxed">
                    Vous pouvez à tout moment supprimer vos données depuis cette page.
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Supprimer mes données
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer vos données</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action supprimera définitivement toutes vos données stockées sur cet appareil, 
                        y compris votre profil, votre progression et vos préférences. Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteData} className="bg-red-600 hover:bg-red-700">
                        Supprimer définitivement
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
