import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, RefreshCw, User, Calendar, Database, Unlock } from "lucide-react";
import SupabaseTest from "./SupabaseTest";

interface DeveloperModeProps {
  isActive: boolean;
  onToggle: () => void;
  onProfileSelect: (profile: string) => void;
  currentProfile: string | null;
}

const DeveloperMode = ({ isActive, onToggle, onProfileSelect, currentProfile }: DeveloperModeProps) => {
  const [showModal, setShowModal] = useState(false);

  const profiles = [
    { id: 'epuisement', name: '🔵 Épuisement mental', color: 'bg-blue-100 text-blue-800' },
    { id: 'anxiete', name: '🟣 Anxiété / blocage', color: 'bg-purple-100 text-purple-800' },
    { id: 'tristesse', name: '🔵 Tristesse / vide', color: 'bg-slate-100 text-slate-800' },
    { id: 'estime', name: '💗 Estime cassée', color: 'bg-pink-100 text-pink-800' },
    { id: 'confusion', name: '🟡 Confusion intérieure', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'solitude', name: '🔘 Solitude / déconnexion', color: 'bg-gray-100 text-gray-800' },
    { id: 'trauma', name: '🟤 Trauma / choc', color: 'bg-amber-100 text-amber-800' }
  ];

  const getStoredData = () => {
    return {
      profile: localStorage.getItem('psyProfile'),
      trialStart: localStorage.getItem('trialStart'),
      devMode: localStorage.getItem('devMode'),
      questionnaire: localStorage.getItem('questionnaireAnswers'),
      journalEntries: localStorage.getItem('journalEntries'),
      completedDays: localStorage.getItem('completedDays')
    };
  };

  const clearLocalStorage = () => {
    const keys = ['psyProfile', 'trialStart', 'questionnaireAnswers', 'journalEntries', 'completedDays'];
    keys.forEach(key => localStorage.removeItem(key));
    window.location.reload();
  };

  const enableUnlimitedAccess = () => {
    localStorage.setItem('devMode', 'true');
    localStorage.setItem('unlimitedAccess', 'true');
  };

  const storedData = getStoredData();

  if (!isActive) return null;

  return (
    <>
      <div className="fixed top-16 right-4 z-50">
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 p-0 shadow-lg"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Mode Développeur
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="controls" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="controls">Contrôles</TabsTrigger>
                <TabsTrigger value="supabase">Supabase Test</TabsTrigger>
              </TabsList>

              <TabsContent value="controls" className="space-y-6">
                {/* Profile Selection */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Sélection du profil
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid gap-2">
                      {profiles.map(profile => (
                        <Button
                          key={profile.id}
                          onClick={() => {
                            onProfileSelect(profile.id);
                            setShowModal(false);
                          }}
                          variant={currentProfile === profile.id ? "default" : "outline"}
                          className="justify-start text-sm h-8"
                        >
                          {profile.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Unlock className="w-4 h-4" />
                      Actions de développement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={enableUnlimitedAccess}
                      className="w-full bg-green-500 hover:bg-green-600 text-white text-sm h-8"
                    >
                      🔓 Débloquer accès illimité
                    </Button>
                    
                    <Button
                      onClick={clearLocalStorage}
                      variant="destructive"
                      className="w-full text-sm h-8"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Réinitialiser données
                    </Button>
                  </CardContent>
                </Card>

                {/* Stored Data Display */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Données stockées localement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(storedData).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">{key}:</span>
                          <Badge variant="outline" className="text-xs">
                            {value ? '✓' : '✗'}
                          </Badge>
                        </div>
                        {value && (
                          <div className="text-xs bg-gray-50 p-2 rounded border break-all">
                            {typeof value === 'string' && value.length > 50 
                              ? value.substring(0, 50) + '...'
                              : value
                            }
                          </div>
                        )}
                        <Separator />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="supabase">
                <SupabaseTest />
              </TabsContent>
            </Tabs>

            {/* Status */}
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-gray-600">Mode développeur</span>
              <Badge className="bg-red-100 text-red-800">Actif ⚙️</Badge>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DeveloperMode;
