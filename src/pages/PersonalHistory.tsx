import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calendar, Heart } from "lucide-react";
import { supabaseService } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface JournalEntry {
  id: string;
  device_id: string;
  content: string;
  mood: string;
  day: number;
  created_at: string;
}

const PersonalHistory = () => {
  const navigate = useNavigate();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const loadJournalEntries = async () => {
    try {
      const userData = await supabaseService.getUserData();
      if (userData.journal) {
        // Sort by creation date (most recent first)
        const sortedEntries = userData.journal.sort((a: JournalEntry, b: JournalEntry) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setJournalEntries(sortedEntries);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des journaux:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupEntriesByDay = () => {
    const grouped: { [key: number]: JournalEntry[] } = {};
    journalEntries.forEach(entry => {
      if (!grouped[entry.day]) {
        grouped[entry.day] = [];
      }
      grouped[entry.day].push(entry);
    });
    return grouped;
  };

  const getProfileType = (userProfile: string) => {
    // Determine profile type based on stored profile
    if (userProfile?.includes('épuisement') || userProfile?.includes('burnout')) return 'Épuisement';
    if (userProfile?.includes('anxiété') || userProfile?.includes('stress')) return 'Anxiété';
    if (userProfile?.includes('tristesse') || userProfile?.includes('dépression')) return 'Tristesse';
    if (userProfile?.includes('colère') || userProfile?.includes('irritation')) return 'Colère';
    return 'Équilibre';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de ton historique...</p>
        </div>
      </div>
    );
  }

  const groupedEntries = groupEntriesByDay();
  const userProfile = localStorage.getItem('psyProfile') || '';

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
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">Mon Historique</h1>
          </div>
        </header>

        {journalEntries.length === 0 ? (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Aucun journal pour le moment</h3>
              <p className="text-gray-600 text-sm">
                Commence ton parcours émotionnel pour voir tes entrées apparaître ici.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Résumé de ton parcours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{journalEntries.length}</div>
                    <div className="text-sm text-gray-600">Entrées totales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-600">{Object.keys(groupedEntries).length}</div>
                    <div className="text-sm text-gray-600">Jours d'écriture</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge className="bg-purple-100 text-purple-800">
                    Profil: {getProfileType(userProfile)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {Object.entries(groupedEntries)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([day, entries]) => (
                <Card key={day} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Jour {day} du parcours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {entries.map((entry, index) => (
                      <div key={index} className="border-l-4 border-purple-200 pl-4 py-2">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-xs">
                            {entry.mood}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatDate(entry.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {entry.content}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalHistory;
