
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Heart, Info, Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    window.open("mailto:heimerdraco63@gmail.com?subject=Psy de poche - Contact", "_blank");
  };

  const handleDeleteData = () => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer toutes vos données ? Cette action est irréversible.")) {
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
      <div className="container mx-auto max-w-md pb-24">
        <header className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-purple-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Paramètres
            </h1>
          </div>
        </header>

        <div className="space-y-6">
          {/* Mon compte */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600" />
                Mon espace personnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  onClick={handleExportData}
                  variant="outline"
                  className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Télécharger mes données
                </Button>
                
                <Button
                  onClick={handleDeleteData}
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-3" />
                  Supprimer mes données
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Aide & Contact */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-600" />
                Aide & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => navigate("/help")}
                variant="outline"
                className="w-full justify-between text-gray-700 border-gray-200 hover:bg-gray-50"
              >
                Questions fréquentes
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>

              <Button
                onClick={handleContactUs}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
              >
                <Mail className="w-4 h-4 mr-2" />
                Nous écrire
              </Button>
              <p className="text-xs text-gray-500 text-center">
                heimerdraco63@gmail.com
              </p>
            </CardContent>
          </Card>

          {/* À propos */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-600" />
                À propos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Version</p>
                  <p className="text-gray-600">1.0.0</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Abonnement</p>
                  <p className="text-gray-600">3,99€/mois</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 leading-relaxed">
                  Cette app vous accompagne dans votre bien-être émotionnel. 
                  Elle ne remplace pas un suivi médical ou psychologique professionnel.
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-between text-gray-700 border-gray-200 hover:bg-gray-50"
                  onClick={() => navigate("/legal")}
                >
                  Mentions légales & CGU
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer discret */}
          <div className="text-center space-y-2 pt-4">
            <p className="text-xs text-gray-400" style={{ fontFamily: 'Nunito, sans-serif' }}>
              App conçue par Heimerdraco · Tous droits réservés
            </p>
            <p className="text-xs text-gray-400">
              Conforme RGPD · Hébergé par Supabase, Inc.
            </p>
            <p className="text-xs text-gray-300">
              Fait avec 💜 pour votre bien-être
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
