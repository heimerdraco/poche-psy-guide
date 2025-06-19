
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, Sparkles } from "lucide-react";

interface DailyRoutineProps {
  profile: string;
  dayNumber: number;
  isPremium: boolean;
}

const DailyRoutine = ({ profile, dayNumber, isPremium }: DailyRoutineProps) => {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [todayCompleted, setTodayCompleted] = useState(false);

  const routinesByProfile = {
    epuise: [
      { action: "Prends 3 respirations profondes", affirmation: "Je mérite de me reposer", emoji: "🌬️" },
      { action: "Note une petite victoire d'hier", affirmation: "Chaque petit pas compte", emoji: "⭐" },
      { action: "Bois un verre d'eau lentement", affirmation: "Je prends soin de mon corps", emoji: "💧" },
      { action: "Regarde par la fenêtre 2 minutes", affirmation: "La nature me ressource", emoji: "🌿" },
      { action: "Étire tes épaules doucement", affirmation: "Mon corps se détend naturellement", emoji: "🤗" },
      // ... continuer jusqu'à 20 jours
    ],
    anxieux: [
      { action: "Nomme 3 choses que tu vois autour de toi", affirmation: "Je suis ancré(e) dans l'instant présent", emoji: "👀" },
      { action: "Compte jusqu'à 10 en respirant", affirmation: "Je peux ralentir mon rythme", emoji: "🔢" },
      { action: "Pose tes pieds bien au sol", affirmation: "Je suis en sécurité ici et maintenant", emoji: "🦶" },
      { action: "Masse doucement tes tempes", affirmation: "La tension se relâche naturellement", emoji: "💆" },
      { action: "Écoute les sons autour de toi", affirmation: "Je peux observer sans juger", emoji: "👂" },
      // ... continuer jusqu'à 20 jours
    ],
    depassé: [
      { action: "Écris une chose à faire demain, pas aujourd'hui", affirmation: "Je peux reporter sans culpabilité", emoji: "📝" },
      { action: "Ferme les yeux 30 secondes", affirmation: "Je mérite une pause", emoji: "😌" },
      { action: "Range une seule chose sur ton bureau", affirmation: "L'ordre extérieur apaise l'ordre intérieur", emoji: "🗂️" },
      { action: "Dis non à une petite demande aujourd'hui", affirmation: "Mes limites sont respectables", emoji: "🛡️" },
      { action: "Priorise : garde seulement 3 tâches", affirmation: "Moins, c'est plus efficace", emoji: "🎯" },
      // ... continuer jusqu'à 20 jours
    ]
  };

  const currentRoutine = routinesByProfile[profile as keyof typeof routinesByProfile] || routinesByProfile.epuise;
  const todayRoutine = currentRoutine[Math.min(dayNumber - 1, currentRoutine.length - 1)];

  useEffect(() => {
    const saved = localStorage.getItem('completedRoutineDays');
    if (saved) {
      setCompletedDays(JSON.parse(saved));
      setTodayCompleted(JSON.parse(saved).includes(dayNumber));
    }
  }, [dayNumber]);

  const markAsCompleted = () => {
    if (!isPremium) return;
    
    const newCompleted = [...completedDays, dayNumber];
    setCompletedDays(newCompleted);
    setTodayCompleted(true);
    localStorage.setItem('completedRoutineDays', JSON.stringify(newCompleted));
  };

  if (dayNumber > 20) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="font-semibold text-xl mb-2 text-gray-800">
            Bravo ! Tu as terminé ta routine de 20 jours
          </h3>
          <p className="text-gray-600 text-sm">
            Il est temps de passer aux rendez-vous mensuels
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-yellow-50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
            <Sparkles className="w-5 h-5 text-orange-600" />
            Ma route continue
          </h3>
          <Badge variant="outline" className="border-orange-400 text-orange-700">
            Jour {dayNumber}/20
          </Badge>
        </div>

        {!isPremium ? (
          <div className="text-center py-6">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">Contenu premium requis</p>
            <Button 
              disabled
              className="bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              Débloquer la suite
            </Button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{todayRoutine.emoji}</div>
              <div className="bg-white/80 p-4 rounded-xl mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Action douce du jour</h4>
                <p className="text-gray-700">{todayRoutine.action}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl">
                <h4 className="font-medium text-orange-800 mb-2">Affirmation</h4>
                <p className="text-orange-700 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {todayRoutine.affirmation}
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={markAsCompleted}
                disabled={todayCompleted}
                className={`${
                  todayCompleted 
                    ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white'
                } rounded-full px-6 py-2`}
              >
                {todayCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    C'est fait aujourd'hui !
                  </>
                ) : (
                  '✨ Marquer comme fait'
                )}
              </Button>
            </div>

            {completedDays.length > 0 && (
              <div className="mt-6 pt-4 border-t border-orange-100">
                <p className="text-xs text-gray-500 mb-2">Progression</p>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i + 1}
                      className={`w-3 h-3 rounded-full ${
                        completedDays.includes(i + 1) ? 'bg-green-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyRoutine;
