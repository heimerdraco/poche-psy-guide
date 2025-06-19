
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, Lock, Flame, Target, Brain, Users, Clock } from "lucide-react";

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
  unlockDay: number;
}

const ThematicExplorations = ({ profile, daysElapsed, isPremium }: ThematicExplorationsProps) => {
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [completedThemes, setCompletedThemes] = useState<string[]>([]);

  const themes: Theme[] = [
    {
      id: 'anger',
      title: 'Gestion de la colère',
      description: 'Apprivoiser et canaliser ses émotions intenses',
      icon: <Flame className="w-5 h-5" />,
      color: 'from-red-400 to-orange-400',
      duration: 3,
      unlockDay: 20
    },
    {
      id: 'failure',
      title: 'Peur de l\'échec',
      description: 'Transformer la peur en motivation constructive',
      icon: <Target className="w-5 h-5" />,
      color: 'from-yellow-400 to-amber-400',
      duration: 3,
      unlockDay: 35
    },
    {
      id: 'overstimulation',
      title: 'Surstimulation mentale',
      description: 'Calmer le mental et retrouver la clarté',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-cyan-400 to-blue-400',
      duration: 3,
      unlockDay: 50
    },
    {
      id: 'relationships',
      title: 'Reconstruction relationnelle',
      description: 'Réparer et renforcer ses liens avec les autres',
      icon: <Users className="w-5 h-5" />,
      color: 'from-pink-400 to-purple-400',
      duration: 3,
      unlockDay: 65
    },
    // Thèmes avancés pour utilisateurs premium
    {
      id: 'deep-healing',
      title: 'Guérison profonde',
      description: 'Travail en profondeur sur les blessures anciennes',
      icon: <Heart className="w-5 h-5" />,
      color: 'from-purple-400 to-indigo-400',
      duration: 7,
      unlockDay: 80
    },
    {
      id: 'life-purpose',
      title: 'Sens de la vie',
      description: 'Découvrir sa mission et ses valeurs profondes',
      icon: <Compass className="w-5 h-5" />,
      color: 'from-emerald-400 to-teal-400',
      duration: 5,
      unlockDay: 100
    }
  ];

  useEffect(() => {
    // Déblocage automatique selon les jours écoulés
    const autoUnlocked = themes
      .filter(theme => daysElapsed >= theme.unlockDay)
      .map(theme => theme.id);
    
    const saved = localStorage.getItem('unlockedThemes');
    const previouslyUnlocked = saved ? JSON.parse(saved) : [];
    
    const allUnlocked = [...new Set([...previouslyUnlocked, ...autoUnlocked])];
    setUnlockedThemes(allUnlocked);
    localStorage.setItem('unlockedThemes', JSON.stringify(allUnlocked));

    // Charger les thèmes complétés
    const savedCompleted = localStorage.getItem('completedThemes');
    if (savedCompleted) {
      setCompletedThemes(JSON.parse(savedCompleted));
    }
  }, [daysElapsed]);

  const startTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    // Marquer comme en cours
    const inProgress = localStorage.getItem('themeInProgress');
    if (!inProgress) {
      localStorage.setItem('themeInProgress', JSON.stringify({
        themeId,
        startDate: Date.now(),
        currentDay: 1
      }));
    }
  };

  const completeTheme = (themeId: string) => {
    const newCompleted = [...completedThemes, themeId];
    setCompletedThemes(newCompleted);
    localStorage.setItem('completedThemes', JSON.stringify(newCompleted));
    localStorage.removeItem('themeInProgress');
    setSelectedTheme(null);
  };

  const nextUnlockDays = themes
    .filter(theme => daysElapsed < theme.unlockDay)
    .sort((a, b) => a.unlockDay - b.unlockDay)[0]?.unlockDay - daysElapsed;

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
            <Compass className="w-5 h-5 text-emerald-600" />
            Explorations thématiques
          </h3>
          <Badge variant="outline" className="border-emerald-400 text-emerald-700">
            {unlockedThemes.length}/{isPremium ? themes.length : Math.min(4, themes.length)} disponibles
          </Badge>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Parcours spécialisés qui se débloquent au fil de ton évolution
        </p>

        <div className="grid gap-4">
          {themes.map((theme) => {
            const isUnlocked = unlockedThemes.includes(theme.id);
            const isCompleted = completedThemes.includes(theme.id);
            const canAccess = isPremium || themes.indexOf(theme) < 4; // 4 premiers gratuits
            const daysUntilUnlock = Math.max(0, theme.unlockDay - daysElapsed);

            return (
              <div
                key={theme.id}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  isCompleted
                    ? 'border-green-200 bg-green-50/50'
                    : isUnlocked 
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
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {theme.duration} jours
                        </Badge>
                        {!isUnlocked && daysUntilUnlock > 0 && (
                          <Badge variant="outline" className="text-xs border-orange-300 text-orange-600">
                            <Clock className="w-3 h-3 mr-1" />
                            Dans {daysUntilUnlock}j
                          </Badge>
                        )}
                        {isCompleted && (
                          <Badge className="text-xs bg-green-100 text-green-700">
                            ✓ Complété
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ml-3">
                    {isCompleted ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-300 text-green-600"
                        disabled
                      >
                        Terminé
                      </Button>
                    ) : isUnlocked && canAccess ? (
                      <Button
                        onClick={() => startTheme(theme.id)}
                        size="sm"
                        className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white"
                      >
                        Commencer
                      </Button>
                    ) : !canAccess ? (
                      <div className="flex flex-col items-center">
                        <Lock className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-400">Premium</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Lock className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-400">Bientôt</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {nextUnlockDays && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <Clock className="w-3 h-3 inline mr-1" />
              Prochain déblocage dans {nextUnlockDays} jour{nextUnlockDays > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {!isPremium && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-700">
              <Lock className="w-3 h-3 inline mr-1" />
              Version gratuite : 4 explorations. Premium : accès complet + contenus avancés.
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
            <div className="flex gap-2">
              <Button
                onClick={() => setSelectedTheme(null)}
                size="sm"
                variant="outline"
                className="border-emerald-300 text-emerald-600"
              >
                Retour
              </Button>
              <Button
                onClick={() => completeTheme(selectedTheme)}
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Marquer comme complété (test)
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThematicExplorations;
