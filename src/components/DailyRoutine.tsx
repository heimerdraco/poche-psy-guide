
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
      { action: "Écris 3 mots pour décrire ton état", affirmation: "Je peux nommer ce que je ressens", emoji: "✍️" },
      { action: "Fais une micro-sieste de 10 minutes", affirmation: "Le repos est productif", emoji: "😴" },
      { action: "Mange quelque chose que tu aimes", affirmation: "Je mérite de la douceur", emoji: "🍎" },
      { action: "Écoute une chanson apaisante", affirmation: "La musique nourrit mon âme", emoji: "🎵" },
      { action: "Dis 'non' à une demande non-urgente", affirmation: "Mes limites me protègent", emoji: "🛡️" },
      { action: "Prends un bain ou une douche chaude", affirmation: "L'eau purifie mes tensions", emoji: "🛁" },
      { action: "Écris une chose pour laquelle tu es reconnaissant(e)", affirmation: "La gratitude me nourrit", emoji: "🙏" },
      { action: "Fais 5 minutes de marche lente", affirmation: "Chaque mouvement me fait du bien", emoji: "🚶" },
      { action: "Regarde des photos qui te font sourire", affirmation: "Les souvenirs heureux me rechargent", emoji: "📸" },
      { action: "Bois une tisane ou une boisson chaude", affirmation: "La chaleur apaise mon être", emoji: "☕" },
      { action: "Fais le tri dans une petite zone", affirmation: "L'ordre extérieur calme l'intérieur", emoji: "🧹" },
      { action: "Appelle ou écris à quelqu'un de bienveillant", affirmation: "Je mérite du soutien", emoji: "📞" },
      { action: "Fais une liste de 3 choses simples pour demain", affirmation: "Je peux planifier sans stress", emoji: "📝" },
      { action: "Prends 10 minutes pour ne rien faire", affirmation: "L'inaction est aussi précieuse", emoji: "🧘" },
      { action: "Félicite-toi pour ces 20 jours", affirmation: "J'ai accompli quelque chose de beau", emoji: "🎉" },
    ],
    anxieux: [
      { action: "Nomme 3 choses que tu vois autour de toi", affirmation: "Je suis ancré(e) dans l'instant présent", emoji: "👀" },
      { action: "Compte jusqu'à 10 en respirant", affirmation: "Je peux ralentir mon rythme", emoji: "🔢" },
      { action: "Pose tes pieds bien au sol", affirmation: "Je suis en sécurité ici et maintenant", emoji: "🦶" },
      { action: "Masse doucement tes tempes", affirmation: "La tension se relâche naturellement", emoji: "💆" },
      { action: "Écoute les sons autour de toi", affirmation: "Je peux observer sans juger", emoji: "👂" },
      { action: "Écris tes inquiétudes sur papier", affirmation: "Mes peurs perdent leur pouvoir quand je les nomme", emoji: "📄" },
      { action: "Fais 5 respirations abdominales", affirmation: "Mon souffle me ramène au calme", emoji: "🫁" },
      { action: "Visualise un endroit où tu te sens bien", affirmation: "Mon esprit peut créer la sérénité", emoji: "🏝️" },
      { action: "Serre quelque chose de doux contre toi", affirmation: "Le réconfort est à ma portée", emoji: "🧸" },
      { action: "Répète 'Ça va passer' 5 fois", affirmation: "Les émotions sont temporaires", emoji: "🔄" },
      { action: "Fais du coloriage ou du dessin libre", affirmation: "La créativité apaise mon mental", emoji: "🎨" },
      { action: "Prends une douche ou lave-toi le visage", affirmation: "L'eau emporte mes tensions", emoji: "💦" },
      { action: "Écoute un podcast ou une histoire", affirmation: "D'autres voix calment la mienne", emoji: "🎧" },
      { action: "Fais une to-do list très simple", affirmation: "Je peux organiser sans m'accabler", emoji: "✅" },
      { action: "Regarde des vidéos d'animaux mignons", affirmation: "La douceur existe dans le monde", emoji: "🐱" },
      { action: "Pratique la technique 5-4-3-2-1", affirmation: "Mes sens me reconnectent au présent", emoji: "🔢" },
      { action: "Écris 3 choses positives sur toi", affirmation: "Je peux être bienveillant(e) envers moi", emoji: "💝" },
      { action: "Fais des étirements doux", affirmation: "Mon corps sait comment se détendre", emoji: "🤸" },
      { action: "Regarde le ciel ou les nuages", affirmation: "L'immensité me donne de la perspective", emoji: "☁️" },
      { action: "Célèbre ton courage d'avoir continué", affirmation: "J'ai fait preuve d'une grande force", emoji: "🏆" },
    ],
    // Ajout des autres profils...
    triste: [
      { action: "Autorise-toi à ressentir cette tristesse", affirmation: "Mes émotions sont valides", emoji: "💙" },
      { action: "Écoute une musique qui te parle", affirmation: "La musique comprend mon cœur", emoji: "🎶" },
      { action: "Écris une lettre à ta tristesse", affirmation: "Je peux dialoguer avec mes émotions", emoji: "✉️" },
      { action: "Regarde un film ou une série réconfortante", affirmation: "Le divertissement peut être thérapeutique", emoji: "🎬" },
      { action: "Prépare-toi quelque chose de bon", affirmation: "Je mérite d'être nourri(e)", emoji: "🍲" },
    ]
  };

  const currentRoutine = routinesByProfile[profile as keyof typeof routinesByProfile] || routinesByProfile.epuise;
  const todayRoutine = currentRoutine[Math.min(dayNumber - 1, currentRoutine.length - 1)] || currentRoutine[0];

  useEffect(() => {
    const saved = localStorage.getItem('completedRoutineDays');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCompletedDays(parsed);
      setTodayCompleted(parsed.includes(dayNumber));
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
