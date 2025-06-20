
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, RefreshCw, Clock, Heart } from "lucide-react";
import { supabaseService } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const JournalSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'recent' | 'memories'>('recent');

  const moods = [
    { emoji: "😊", label: "Joyeux", color: "bg-yellow-100 text-yellow-800" },
    { emoji: "😌", label: "Paisible", color: "bg-green-100 text-green-800" },
    { emoji: "😔", label: "Triste", color: "bg-blue-100 text-blue-800" },
    { emoji: "😰", label: "Anxieux", color: "bg-orange-100 text-orange-800" },
    { emoji: "😡", label: "Colère", color: "bg-red-100 text-red-800" },
    { emoji: "🤔", label: "Réfléchi", color: "bg-purple-100 text-purple-800" },
    { emoji: "🧘", label: "Peaceful", color: "bg-purple-100 text-purple-800" },
    { emoji: "✨", label: "Reflective", color: "bg-indigo-100 text-indigo-800" },
    { emoji: "💫", label: "Neutral", color: "bg-gray-100 text-gray-800" }
  ];

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const loadJournalEntries = async () => {
    setLoading(true);
    try {
      const userData = await supabaseService.getUserData();
      const entries = userData.journal || [];
      
      // Trier par date de création (plus récent en premier)
      const sortedEntries = entries.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setJournalEntries(sortedEntries);
    } catch (error) {
      console.error('Erreur chargement journal:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger votre journal.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredEntries = () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    switch (filter) {
      case 'recent':
        return journalEntries.filter(entry => 
          new Date(entry.created_at) >= sevenDaysAgo
        );
      case 'memories':
        return journalEntries.filter(entry => 
          new Date(entry.created_at) < sevenDaysAgo
        );
      default:
        return journalEntries;
    }
  };

  const getMoodInfo = (mood: string) => {
    return moods.find(m => m.label.toLowerCase() === mood.toLowerCase()) || 
           { emoji: "📝", label: mood, color: "bg-gray-100 text-gray-800" };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="w-6 h-6 animate-spin text-emerald-600 mr-2" />
        <span className="text-emerald-700">Chargement de votre journal...</span>
      </div>
    );
  }

  const filteredEntries = getFilteredEntries();

  return (
    <div className="space-y-6 animate-slide-in-gentle">
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <BookOpen className="w-5 h-5" />
            Mon Journal Personnel
          </CardTitle>
          
          {/* Filtres */}
          <div className="flex gap-2 mt-4">
            <Badge
              variant={filter === 'recent' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('recent')}
            >
              <Clock className="w-3 h-3 mr-1" />
              Récent (7j)
            </Badge>
            <Badge
              variant={filter === 'memories' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('memories')}
            >
              <Heart className="w-3 h-3 mr-1" />
              Souvenirs
            </Badge>
            <Badge
              variant={filter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('all')}
            >
              <Calendar className="w-3 h-3 mr-1" />
              Tout
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune entrée trouvée pour ce filtre.</p>
              <p className="text-sm mt-2">
                Complétez des activités pour alimenter votre journal.
              </p>
            </div>
          ) : (
            filteredEntries.map((entry, index) => {
              const moodInfo = getMoodInfo(entry.mood);
              const isMemory = filter === 'memories' || 
                             new Date(entry.created_at) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
              
              return (
                <div 
                  key={entry.id} 
                  className={`border-l-4 pl-4 py-4 ${
                    isMemory 
                      ? 'border-amber-300 bg-amber-50/30' 
                      : 'border-emerald-300 bg-emerald-50/30'
                  } rounded-r-lg`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={moodInfo.color}>
                        {moodInfo.emoji} {moodInfo.label}
                      </Badge>
                      {isMemory && (
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          📚 Souvenir
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(entry.created_at)} • Jour {entry.day}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {entry.content}
                  </p>
                  {entry.activity_id && (
                    <div className="mt-2 text-xs text-gray-500">
                      📝 Écrit dans une activité
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalSection;
