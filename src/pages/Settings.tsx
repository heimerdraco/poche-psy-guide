
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, Clock, Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabaseService } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("18:00");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const userData = await supabaseService.getUserData();
      
      if (userData.reminders) {
        setReminderEnabled(userData.reminders.enabled);
        setReminderTime(userData.reminders.reminder_time);
      } else {
        // Fallback vers localStorage
        const localEnabled = localStorage.getItem('reminderEnabled') === 'true';
        const localTime = localStorage.getItem('reminderTime') || '18:00';
        setReminderEnabled(localEnabled);
        setReminderTime(localTime);
      }
    } catch (error) {
      console.error('Erreur chargement paramètres:', error);
      // Fallback vers localStorage en cas d'erreur
      const localEnabled = localStorage.getItem('reminderEnabled') === 'true';
      const localTime = localStorage.getItem('reminderTime') || '18:00';
      setReminderEnabled(localEnabled);
      setReminderTime(localTime);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await supabaseService.saveReminderSettings(reminderTime, reminderEnabled);
      
      // Aussi sauvegarder en local pour le fallback
      localStorage.setItem('reminderEnabled', reminderEnabled.toString());
      localStorage.setItem('reminderTime', reminderTime);
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Tes préférences ont été mises à jour avec succès.",
      });
    } catch (error) {
      console.error('Erreur sauvegarde paramètres:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const clearAllData = async () => {
    if (!confirm("Es-tu sûr(e) de vouloir effacer toutes tes données ? Cette action est irréversible.")) {
      return;
    }

    try {
      // Effacer localStorage
      localStorage.clear();
      
      toast({
        title: "Données effacées",
        description: "Toutes tes données locales ont été supprimées.",
      });
      
      // Recharger la page pour repartir à zéro
      window.location.reload();
    } catch (error) {
      console.error('Erreur suppression données:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'effacer les données.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50">
      <div className="container mx-auto px-4 py-4 max-w-md">
        <header className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-800">Paramètres</h1>
        </header>

        <div className="space-y-4">
          {/* Rappels quotidiens */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-600" />
                Rappels quotidiens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Chargement...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminder-toggle" className="text-sm font-medium">
                      Activer les rappels
                    </Label>
                    <Switch
                      id="reminder-toggle"
                      checked={reminderEnabled}
                      onCheckedChange={setReminderEnabled}
                    />
                  </div>
                  
                  {reminderEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="reminder-time" className="text-sm font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Heure du rappel
                      </Label>
                      <input
                        id="reminder-time"
                        type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500">
                        Tu recevras une notification pour prendre un moment pour toi
                      </p>
                    </div>
                  )}
                  
                  <Button
                    onClick={saveSettings}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Sauvegarde...
                      </>
                    ) : (
                      'Sauvegarder'
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Données */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                Gestion des données
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Effacer toutes tes données personnelles stockées dans l'application.
              </p>
              <Button
                onClick={clearAllData}
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Effacer toutes les données
              </Button>
            </CardContent>
          </Card>

          {/* Informations */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Psy de Poche</h3>
              <p className="text-sm text-gray-600">
                Ton compagnon bienveillant pour un mieux-être émotionnel au quotidien.
              </p>
              <p className="text-xs text-gray-400 mt-2">Version 1.0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
