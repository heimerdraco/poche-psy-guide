
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Shield, Info, Trash2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    window.open("mailto:heimerdraco63@gmail.com?subject=Psy de poche - Contact", "_blank");
  };

  const handleDeleteData = () => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer toutes vos données ? Cette action est irréversible.")) {
      // Clear all localStorage data
      localStorage.clear();
      alert("Vos données ont été supprimées avec succès.");
      navigate("/");
    }
  };

  const handleExportData = () => {
    const userData = {
      profile: localStorage.getItem('psyProfile'),
      trialStart: localStorage.getItem('trialStart'),
      journeyProgress: localStorage.getItem('journeyProgress'),
      dailyRoutineProgress: localStorage.getItem('dailyRoutineProgress'),
      monthlyCheckins: localStorage.getItem('monthlyCheckins'),
      thematicExplorations: localStorage.getItem('thematicExplorations'),
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'psy-de-poche-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 p-4">
      <div className="container mx-auto max-w-2xl pb-20">
        <header className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">⚙️ Paramètres</h1>
        </header>

        <div className="space-y-6">
          {/* App Info */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-600" />
                À propos de l'application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Nom</p>
                  <p className="text-sm text-gray-600">Psy de poche</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Version</p>
                  <p className="text-sm text-gray-600">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Éditeur</p>
                  <p className="text-sm text-gray-600">Heimerdraco</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Abonnement</p>
                  <p className="text-sm text-gray-600">3,99€/mois</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 font-medium mb-2">⚠️ Clause de non-responsabilité</p>
                <p className="text-xs text-amber-700">
                  Cette application ne remplace pas un suivi médical ou psychologique professionnel. 
                  En cas de détresse importante, consultez un professionnel de santé mentale.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Gestion des données (RGPD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger mes données
                </Button>
                
                <Button
                  onClick={handleDeleteData}
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer toutes mes données
                </Button>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-700">
                  <strong>Stockage :</strong> Vos données sont stockées localement sur votre appareil et sauvegardées de manière chiffrée via Supabase, Inc. 
                  Aucune donnée n'est partagée avec des tiers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legal Information */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Informations légales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Éditeur responsable</p>
                  <p className="text-sm text-gray-600">Heimerdraco</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Responsable de publication</p>
                  <p className="text-sm text-gray-600">Heimerdraco</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Hébergement</p>
                  <p className="text-sm text-gray-600">Supabase, Inc.</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Conditions d'abonnement</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Essai gratuit de 3 jours</p>
                  <p>• Abonnement mensuel : 3,99€</p>
                  <p>• Renouvellement automatique</p>
                  <p>• Résiliation possible à tout moment</p>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-xs text-orange-800">
                  <strong>Droit de rétractation :</strong> L'achat numérique est ferme et immédiat après validation de l'abonnement, 
                  conformément à l'article L221-28 du Code de la consommation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legal Links */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Documents légaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => navigate("/legal")}
              >
                Mentions légales & CGU
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => navigate("/help")}
              >
                Aide & FAQ
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-600" />
                Contact & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleContactUs}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
              >
                <Mail className="w-4 h-4 mr-2" />
                Nous contacter
              </Button>
              <p className="text-xs text-gray-500 text-center mt-3">
                heimerdraco63@gmail.com
              </p>
            </CardContent>
          </Card>

          {/* Compliance Footer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">
              Application conforme au RGPD, CNIL et Loi LCEN
            </p>
            <p className="text-xs text-gray-400">
              Fait avec 💜 pour votre bien-être
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
