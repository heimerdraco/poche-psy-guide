
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, Lock, Flame, Target, Brain, Users } from "lucide-react";

interface ThematicExplorationsProps {
  profile: string;
  daysElapsed: number;
  isPremium: boolean;
}

interface Theme {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  duration: number;
}

const ThematicExplorations = ({ profile, daysElapsed, isPremium }: ThematicExplorationsProps) => {
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const themes: Theme[] = [
    {
      id: 'anger',
      title: 'Gestion de la colère',
      description: 'Apprivoiser et canaliser ses émotions intenses',
      icon: <Flame className="w-5 h-5" />,
      color: 'from-red-400 to-orange-400',
      duration: 3
    },
    {
      id: 'failure',
      title: 'Peur de l\'échec',
      description: 'Transformer la peur en motivation constructive',
      icon: <Target className="w-5 h-5" />,
      color: 'from-yellow-400 to-amber-400',
      duration: 3
    },
    {
      id: 'overstimulation',
      title: 'Surstimulation mentale',
      description: 'Calmer le mental et retrouver la clarté',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-cyan-400 to-blue-400',
      duration: 3
    },
    {
      id: 'relationships',
      title: 'Reconstruction relationnelle',
      description: 'Réparer et renforcer ses liens avec les autres',
      icon: <Users className="w-5 h-5" />,
      color: 'from-pink-400 to-purple-400',
      duration: 3
    }
  ];

  useEffect(() => {
    // Débloquer automatiquement des thèmes selon les jours écoulés
    const autoUnlocked = Math.floor(daysElapsed / 15); // 1 thème tous les 15 jours
    const themesToUnlock = themes.slice(0, Math.min(autoUnlocked, themes.length)).map(t => t.id);
    
    const saved = localStorage.getItem('unlockedThemes');
    const previouslyUnlocked = saved ? JSON.parse(saved) : [];
    
    const allUnlocked = [...new Set([...previouslyUnlocked, ...themesToUnlock])];
    setUnlockedThemes(allUnlocked);
    localStorage.setItem('unlockedThemes', JSON.stringify(allUnlocked));
  }, [daysElapsed]);

  const unlockTheme = (themeId: string) => {
    if (!isPremium) return;
    
    const updated = [...unlockedThemes, themeId];
    setUnlockedThemes(updated);
    localStorage.setItem('unlockedThemes', JSON.stringify(updated));
  };

  const freeThemesThisMonth = isPremium ? themes.length : 1;

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
            <Compass className="w-5 h-5 text-emerald-600" />
            Explorer d'autres zones
          </h3>
          <Badge variant="outline" className="border-emerald-400 text-emerald-700">
            {unlockedThemes.length}/{themes.length} débloqués
          </Badge>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Mini-parcours thématiques de 3 jours pour approfondir des aspects spécifiques
        </p>

        <div className="grid gap-4">
          {themes.map((theme) => {
            const isUnlocked = unlockedThemes.includes(theme.id);
            const canUnlock = isPremium || unlockedThemes.length < freeThemesThisMonth;

            return (
              <div
                key={theme.id}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  isUnlocked 
                    ? 'border-emerald-200 bg-white/80' 
                    : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${theme.color} text-white`}>
                      {theme.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{theme.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{theme.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {theme.duration} jours
                      </Badge>
                    </div>
                  </div>

                  <div className="ml-3">
                    {isUnlocked ? (
                      <Button
                        onClick={() => setSelectedTheme(theme.id)}
                        size="sm"
                        className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white"
                      >
                        Commencer
                      </Button>
                    ) : canUnlock ? (
                      <Button
                        onClick={() => unlockTheme(theme.id)}
                        size="sm"
                        variant="outline"
                        className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                      >
                        Débloquer
                      </Button>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Lock className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-400">Premium</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isPremium && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-700">
              <Lock className="w-3 h-3 inline mr-1" />
              Version gratuite : 1 exploration par mois. Premium : accès illimité.
            </p>
          </div>
        )}

        {selectedTheme && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <h4 className="font-medium text-emerald-800 mb-2">
              Parcours sélectionné : {themes.find(t => t.id === selectedTheme)?.title}
            </h4>
            <p className="text-sm text-emerald-700 mb-3">
              Ce parcours sera disponible dans une prochaine mise à jour 🌟
            </p>
            <Button
              onClick={() => setSelectedTheme(null)}
              size="sm"
              variant="outline"
              className="border-emerald-300 text-emerald-600"
            >
              Retour
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThematicExplorations;
