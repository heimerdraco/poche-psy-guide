
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp } from "lucide-react";
import { supabaseService } from "@/lib/supabase";

const moods = [
  { emoji: "😊", label: "Joyeux", color: "bg-yellow-100 border-yellow-300" },
  { emoji: "😌", label: "Calme", color: "bg-blue-100 border-blue-300" },
  { emoji: "😔", label: "Triste", color: "bg-gray-100 border-gray-300" },
  { emoji: "😰", label: "Anxieux", color: "bg-purple-100 border-purple-300" },
  { emoji: "😤", label: "Énervé", color: "bg-red-100 border-red-300" },
  { emoji: "😴", label: "Fatigué", color: "bg-green-100 border-green-300" }
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [todayMood, setTodayMood] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMoodData();
  }, []);

  const loadMoodData = async () => {
    try {
      const userData = await supabaseService.getUserData();
      
      if (userData.journal && userData.journal.length > 0) {
        setMoodHistory(userData.journal);
        
        // Vérifier si l'humeur a déjà été enregistrée aujourd'hui
        const today = new Date().toDateString();
        const todayEntry = userData.journal.find((entry: any) => 
          new Date(entry.created_at).toDateString() === today
        );
        
        if (todayEntry) {
          setTodayMood(todayEntry.mood);
        }
      }
    } catch (error) {
      console.error('Erreur chargement humeurs:', error);
    }
  };

  const handleMoodSelect = async (mood: string) => {
    if (todayMood) return; // Déjà enregistré aujourd'hui
    
    setLoading(true);
    try {
      // Calculer le jour du parcours
      const userData = await supabaseService.getUserData();
      let dayCount = 1;
      
      if (userData.user?.trial_start) {
        const startDate = new Date(userData.user.trial_start);
        const today = new Date();
        dayCount = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      }
      
      // Sauvegarder l'humeur dans Supabase
      await supabaseService.saveJournalEntry(
        `Humeur du jour: ${mood}`,
        mood,
        dayCount
      );
      
      setSelectedMood(mood);
      setTodayMood(mood);
      
      // Recharger les données
      await loadMoodData();
    } catch (error) {
      console.error('Erreur sauvegarde humeur:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodStats = () => {
    if (moodHistory.length === 0) return null;
    
    // Statistiques des 7 derniers jours
    const lastWeek = moodHistory
      .filter((entry: any) => {
        const entryDate = new Date(entry.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate >= weekAgo;
      })
      .slice(-7);
    
    if (lastWeek.length === 0) return null;
    
    const moodCounts = lastWeek.reduce((acc: any, entry: any) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});
    
    const dominantMood = Object.entries(moodCounts).sort(([,a], [,b]) => (b as number) - (a as number))[0];
    
    return {
      total: lastWeek.length,
      dominant: dominantMood[0],
      count: dominantMood[1]
    };
  };

  const stats = getMoodStats();

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Heart className="w-5 h-5 text-pink-600" />
          Comment te sens-tu aujourd'hui ?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayMood ? (
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl mb-2">
              {moods.find(m => m.label === todayMood)?.emoji || "😊"}
            </div>
            <p className="text-green-700 font-medium">Humeur enregistrée: {todayMood}</p>
            <p className="text-green-600 text-sm">Merci d'avoir partagé ton ressenti !</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.label}
                variant="outline"
                className={`h-16 flex flex-col items-center justify-center ${mood.color} hover:scale-105 transition-transform ${loading ? 'opacity-50' : ''}`}
                onClick={() => handleMoodSelect(mood.label)}
                disabled={loading}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs text-gray-700">{mood.label}</span>
              </Button>
            ))}
          </div>
        )}

        {stats && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Tendance de la semaine</span>
            </div>
            <p className="text-sm text-purple-700">
              Tu as exprimé "{stats.dominant}" {stats.count} fois sur {stats.total} jours
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
