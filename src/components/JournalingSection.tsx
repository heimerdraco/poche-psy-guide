
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, Calendar, Heart, Plus } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
  gratitude: string[];
  reflection: string;
}

const JournalingSection = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({});
  const [showNewEntry, setShowNewEntry] = useState(false);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
  };

  const saveEntry = () => {
    if (!currentEntry.content?.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: currentEntry.mood || '',
      content: currentEntry.content || '',
      gratitude: currentEntry.gratitude || [],
      reflection: currentEntry.reflection || ''
    };

    const newEntries = [entry, ...entries];
    saveEntries(newEntries);
    setCurrentEntry({});
    setShowNewEntry(false);
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

  const addGratitudeItem = (item: string) => {
    if (item.trim()) {
      setCurrentEntry({
        ...currentEntry,
        gratitude: [...(currentEntry.gratitude || []), item.trim()]
      });
    }
  };

  const removeGratitudeItem = (index: number) => {
    const newGratitude = [...(currentEntry.gratitude || [])];
    newGratitude.splice(index, 1);
    setCurrentEntry({
      ...currentEntry,
      gratitude: newGratitude
    });
  };

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
            <h3 className="text-xl font-semibold mb-2">Créer une nouvelle entrée</h3>
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
              Nouvelle entrée - {new Date().toLocaleDateString('fr-FR')}
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

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Gratitudes (3 choses pour lesquelles vous êtes reconnaissant(e))
              </label>
              <div className="space-y-2">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                    <input
                      type="text"
                      placeholder="Une chose pour laquelle vous êtes reconnaissant(e)..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onBlur={(e) => {
                        if (e.target.value.trim()) {
                          const newGratitude = [...(currentEntry.gratitude || [])];
                          newGratitude[index] = e.target.value.trim();
                          setCurrentEntry({ ...currentEntry, gratitude: newGratitude });
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Réflexion personnelle</label>
              <Textarea
                value={currentEntry.reflection || ''}
                onChange={(e) => setCurrentEntry({ ...currentEntry, reflection: e.target.value })}
                placeholder="Qu'avez-vous appris sur vous aujourd'hui ? Comment pouvez-vous grandir ?"
                className="min-h-[80px]"
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
                      {new Date(entry.date).toLocaleDateString('fr-FR', { 
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
                  <p className="text-gray-700 mb-4 line-clamp-3">{entry.content}</p>
                  {entry.gratitude && entry.gratitude.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-sm text-gray-600 mb-2 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        Gratitudes:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {entry.gratitude.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
