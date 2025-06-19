
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, Calendar, Heart, Plus } from "lucide-react";
import { supabaseService } from "@/lib/supabase";

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
  gratitude: string[];
  reflection: string;
  day?: number;
}

const JournalingSection = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({});
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      // Charger depuis Supabase
      const userData = await supabaseService.getUserData();
      if (userData.journal && userData.journal.length > 0) {
        const supabaseEntries = userData.journal.map((entry: any) => ({
          id: entry.id.toString(),
          date: entry.created_at.split('T')[0],
          mood: entry.mood,
          content: entry.content,
          gratitude: [],
          reflection: '',
          day: entry.day
        }));
        setEntries(supabaseEntries);
        
        // Calculer le jour actuel
        const maxDay = Math.max(...userData.journal.map((entry: any) => entry.day));
        setCurrentDay(maxDay + 1);
      } else {
        // Fallback vers localStorage
        const savedEntries = localStorage.getItem('journalEntries');
        if (savedEntries) {
          setEntries(JSON.parse(savedEntries));
        }
      }
    } catch (error) {
      console.error('Erreur chargement entrées:', error);
      // Fallback vers localStorage en cas d'erreur
      const savedEntries = localStorage.getItem('journalEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    }
  };

  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
  };

  const saveEntry = async () => {
    if (!currentEntry.content?.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: currentEntry.mood || '',
      content: currentEntry.content || '',
      gratitude: currentEntry.gratitude || [],
      reflection: currentEntry.reflection || '',
      day: currentDay
    };

    // Sauvegarder localement
    const newEntries = [entry, ...entries];
    saveEntries(newEntries);

    // Sauvegarder dans Supabase
    try {
      await supabaseService.saveJournalEntry(
        currentEntry.content || '',
        currentEntry.mood || 'neutre',
        currentDay
      );
      console.log('Entrée sauvegardée dans Supabase');
    } catch (error) {
      console.error('Erreur sauvegarde Supabase:', error);
    }

    setCurrentEntry({});
    setShowNewEntry(false);
    setCurrentDay(currentDay + 1);
  };

  const moods = [
    { value: 'joyful', label: '😊 Joyeux', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'calm', label: '😌 Calme', color: 'bg-green-100 text-green-800' },
    { value: 'stressed', label: '😰 Stressé', color: 'bg-red-100 text-red-800' },
    { value: 'sad', label: '😢 Triste', color: 'bg-blue-100 text-blue-800' },
    { value: 'energetic', label: '⚡ Énergique', color: 'bg-orange-100 text-orange-800' },
    { value: 'thoughtful', label: '🤔 Pensif', color: 'bg-purple-100 text-purple-800' },
    { value: 'grateful', label: '🙏 Reconnaissant', color: 'bg-pink-100 text-pink-800' }
  ];

  const prompts = [
    "Qu'est-ce qui vous a apporté de la joie aujourd'hui ?",
    "Quel défi avez-vous surmonté récemment ?",
    "Pour quoi êtes-vous reconnaissant(e) en ce moment ?",
    "Quelle émotion avez-vous ressentie le plus fortement aujourd'hui ?",
    "Qu'avez-vous appris sur vous-même cette semaine ?",
    "Comment vous êtes-vous montré(e) bienveillant(e) envers vous-même ?",
    "Quelle est une petite victoire que vous célébrez aujourd'hui ?"
  ];

  const todayPrompt = prompts[new Date().getDate() % prompts.length];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Edit className="w-8 h-8 text-purple-600" />
          Journal Personnel
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Prenez quelques minutes chaque jour pour réfléchir à vos émotions et expériences. 
          L'écriture est un outil puissant de développement personnel.
        </p>
      </div>

      {!showNewEntry && (
        <Card className="border-dashed border-2 border-purple-300 hover:border-purple-500 transition-colors">
          <CardContent className="p-8 text-center">
            <Plus className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Créer une nouvelle entrée - Jour {currentDay}</h3>
            <p className="text-gray-600 mb-4">Prompt du jour : "{todayPrompt}"</p>
            <Button 
              onClick={() => setShowNewEntry(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Commencer à écrire
            </Button>
          </CardContent>
        </Card>
      )}

      {showNewEntry && (
        <Card className="border-purple-500 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Nouvelle entrée - Jour {currentDay} - {new Date().toLocaleDateString('fr-FR')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Comment vous sentez-vous aujourd'hui ?</label>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <Badge
                    key={mood.value}
                    className={`cursor-pointer transition-all ${
                      currentEntry.mood === mood.value 
                        ? mood.color + ' ring-2 ring-offset-2 ring-purple-500' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.value })}
                  >
                    {mood.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Réflexion du jour <span className="text-gray-500">({todayPrompt})</span>
              </label>
              <Textarea
                value={currentEntry.content || ''}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                placeholder="Exprimez vos pensées et émotions librement..."
                className="min-h-[120px]"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={saveEntry}
                className="bg-purple-600 hover:bg-purple-700 flex-1"
                disabled={!currentEntry.content?.trim()}
              >
                Sauvegarder l'entrée
              </Button>
              <Button 
                onClick={() => {
                  setShowNewEntry(false);
                  setCurrentEntry({});
                }}
                variant="outline"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Vos entrées récentes</h3>
        {entries.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Edit className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune entrée pour le moment. Commencez votre voyage de réflexion !</p>
            </CardContent>
          </Card>
        ) : (
          entries.slice(0, 5).map((entry) => {
            const mood = moods.find(m => m.value === entry.mood);
            return (
              <Card key={entry.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Jour {entry.day || 1} - {new Date(entry.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                    {mood && (
                      <Badge className={mood.color}>
                        {mood.label}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 line-clamp-3">{entry.content}</p>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default JournalingSection;
