
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, RefreshCw, Calendar } from "lucide-react";
import { supabaseService } from "@/lib/supabase";

interface ProfileDisplayProps {
  onOpenQuestionnaire: () => void;
}

const ProfileDisplay = ({ onOpenQuestionnaire }: ProfileDisplayProps) => {
  const [profile, setProfile] = useState<string>("");
  const [trialStart, setTrialStart] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const userData = await supabaseService.getUserData();
      
      if (userData.user) {
        setProfile(userData.user.profile || "");
        setTrialStart(userData.user.trial_start || "");
      } else {
        // Fallback vers localStorage si pas de données Supabase
        const localProfile = localStorage.getItem('psyProfile') || "";
        const localTrialStart = localStorage.getItem('trialStart') || "";
        setProfile(localProfile);
        setTrialStart(localTrialStart);
      }
    } catch (error) {
      console.error('Erreur chargement profil:', error);
      // Fallback vers localStorage en cas d'erreur
      const localProfile = localStorage.getItem('psyProfile') || "";
      const localTrialStart = localStorage.getItem('trialStart') || "";
      setProfile(localProfile);
      setTrialStart(localTrialStart);
    } finally {
      setLoading(false);
    }
  };

  const getProfileType = () => {
    if (profile.includes('épuisement') || profile.includes('burnout')) return 'Épuisement';
    if (profile.includes('anxiété') || profile.includes('anxieux')) return 'Anxiété';
    if (profile.includes('tristesse') || profile.includes('triste')) return 'Tristesse';
    if (profile.includes('colère') || profile.includes('en colère')) return 'Colère';
    return 'Équilibre';
  };

  const getProfileColor = () => {
    const type = getProfileType();
    switch (type) {
      case 'Épuisement': return 'bg-orange-100 text-orange-800';
      case 'Anxiété': return 'bg-blue-100 text-blue-800';
      case 'Tristesse': return 'bg-gray-100 text-gray-800';
      case 'Colère': return 'bg-red-100 text-red-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getDaysCount = () => {
    if (!trialStart) return 0;
    const start = new Date(trialStart);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
            <span className="text-gray-600">Chargement du profil...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <User className="w-5 h-5 text-purple-600" />
            Découvre ton profil émotionnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-4">
            Réponds à quelques questions pour personnaliser ton expérience et recevoir des conseils adaptés.
          </p>
          <Button 
            onClick={onOpenQuestionnaire}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
          >
            Commencer le questionnaire
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <User className="w-5 h-5 text-purple-600" />
          Ton profil émotionnel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Badge className={getProfileColor()}>
            {getProfileType()}
          </Badge>
          <p className="text-gray-700 text-sm leading-relaxed">
            {profile}
          </p>
        </div>
        
        {trialStart && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Jour {getDaysCount()} de ton parcours • Commencé le {formatDate(trialStart)}</span>
          </div>
        )}
        
        <Button
          onClick={onOpenQuestionnaire}
          variant="outline"
          size="sm"
          className="w-full mt-3 text-purple-600 border-purple-200 hover:bg-purple-50"
        >
          Refaire le questionnaire
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileDisplay;
