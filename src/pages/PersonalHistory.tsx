
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import { supabaseService, getDeviceId } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const PersonalHistory = () => {
  const navigate = useNavigate();
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const userData = await supabaseService.getUserData();
      setJournalEntries(userData.journal || []);
    } catch (error) {
      console.error('Erreur chargement historique:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const getProfileEmoji = (profile: string) => {
    const profileMap: Record<string, string> = {
      'epuisement': '🔵',
      'anxiete': '🟣',
      'tristesse': '🔵',
      'estime': '💗',
      'confusion': '🟡',
      'solitude': '🔘',
      'trauma': '🟤'
    };
    return profileMap[profile] || '📝';
  };

  const getProfileName = (profile: string) => {
    const profileNames: Record<string, string> = {
      'epuisement': 'Épuisement mental',
      'anxiete': 'Anxiété / blocage',
      'tristesse': 'Tristesse / vide',
      'estime': 'Estime cassée',
      'confusion': 'Confusion intérieure',
      'solitude': 'Solitude / déconnexion',
      'trauma': 'Trauma / choc'
    };
    return profileNames[profile] || profile;
  };

  // Group entries by day
  const groupedEntries = journalEntries.reduce((acc, entry) => {
    const key = `day-${entry.day}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {} as Record<string, any[]>);

  const currentProfile = localStorage.getItem('psyProfile') || '';

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
          <h1 className="text-2xl font-bold text-gray-800">📓 Historique personnel</h1>
        </header>

        <div className="space-y-6">
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement de l'historique...</p>
              </CardContent>
            </Card>
          ) : Object.keys(groupedEntries).length > 0 ? (
            <>
              {/* Current profile info */}
              {currentProfile && (
                <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getProfileEmoji(currentProfile)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">Ton parcours actuel</h3>
                        <p className="text-sm text-gray-600">{getProfileName(currentProfile)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Journal entries grouped by day */}
              {Object.entries(groupedEntries)
                .sort(([a], [b]) => {
                  const dayA = parseInt(a.split('-')[1]);
                  const dayB = parseInt(b.split('-')[1]);
                  return dayB - dayA; // Most recent first
                })
                .map(([dayKey, entries]) => {
                  const dayNumber = parseInt(dayKey.split('-')[1]);
                  return (
                    <Card key={dayKey} className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          Jour {dayNumber}
                          <Badge variant="outline" className="ml-auto">
                            {entries.length} entrée{entries.length > 1 ? 's' : ''}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {entries.map((entry, i) => (
                          <div key={i} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {entry.mood || 'Réflexion'}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(entry.created_at).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
                              {entry.content}
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucune entrée trouvée</h3>
                <p className="text-gray-500 text-sm">
                  Tes réflexions et entrées de journal apparaîtront ici au fur et à mesure de ton parcours.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalHistory;
