
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
    triste: [
      { action: "Autorise-toi à ressentir cette tristesse", affirmation: "Mes émotions sont valides", emoji: "💙" },
      { action: "Écoute une musique qui te parle", affirmation: "La musique comprend mon cœur", emoji: "🎶" },
      { action: "Écris une lettre à ta tristesse", affirmation: "Je peux dialoguer avec mes émotions", emoji: "✉️" },
      { action: "Regarde un film ou une série réconfortante", affirmation: "Le divertissement peut être thérapeutique", emoji: "🎬" },
      { action: "Prépare-toi quelque chose de bon", affirmation: "Je mérite d'être nourri(e)", emoji: "🍲" },
      { action: "Prends un bain chaud avec de la musique douce", affirmation: "L'eau et les sons guérissent", emoji: "🛀" },
      { action: "Écris 3 souvenirs heureux", affirmation: "La joie existe aussi en moi", emoji: "📝" },
      { action: "Appelle quelqu'un qui te comprend", affirmation: "Je ne suis pas seul(e)", emoji: "☎️" },
      { action: "Fais quelque chose de créatif", affirmation: "Ma créativité transforme la douleur", emoji: "🎨" },
      { action: "Prends l'air, même 5 minutes", affirmation: "Le monde extérieur m'accueille", emoji: "🌳" },
      { action: "Regarde des photos d'animaux", affirmation: "La tendresse existe partout", emoji: "🐕" },
      { action: "Écris ce que tu ressentirais mieux demain", affirmation: "L'espoir peut renaître", emoji: "🌅" },
      { action: "Fais-toi un thé réconfortant", affirmation: "Les petits plaisirs comptent", emoji: "🍵" },
      { action: "Lis quelque chose d'inspirant", affirmation: "Les mots peuvent guérir", emoji: "📖" },
      { action: "Fais un petit rangement doux", affirmation: "L'ordre apaise le chaos intérieur", emoji: "🧹" },
      { action: "Médite 5 minutes sur ta respiration", affirmation: "Mon souffle m'ancre dans le présent", emoji: "🧘‍♀️" },
      { action: "Écris une lettre à ton futur toi", affirmation: "Je peux espérer des jours meilleurs", emoji: "💌" },
      { action: "Regarde le coucher de soleil", affirmation: "Chaque fin annonce un nouveau début", emoji: "🌅" },
      { action: "Fais-toi un compliment sincère", affirmation: "Je mérite ma propre bienveillance", emoji: "💝" },
      { action: "Célèbre ta force d'avoir traversé ces jours", affirmation: "Ma résilience est ma plus grande force", emoji: "🏆" },
    ],
    estime: [
      { action: "Regarde-toi dans le miroir et souris", affirmation: "Je mérite de l'amour, surtout le mien", emoji: "😊" },
      { action: "Écris 3 qualités que tu as", affirmation: "J'ai de la valeur", emoji: "✨" },
      { action: "Rappelle-toi un compliment récent", affirmation: "Les autres voient ma beauté", emoji: "💖" },
      { action: "Fais quelque chose que tu fais bien", affirmation: "J'ai des talents uniques", emoji: "🎯" },
      { action: "Pardonne-toi une erreur récente", affirmation: "Je peux apprendre sans me juger", emoji: "🤗" },
    ],
    confus: [
      { action: "Écris 3 choses dont tu es sûr(e)", affirmation: "Certaines vérités m'appartiennent", emoji: "📝" },
      { action: "Fais une liste de tes valeurs importantes", affirmation: "Je connais ce qui compte pour moi", emoji: "💎" },
      { action: "Pose-toi une question simple sur maintenant", affirmation: "Le présent est plus clair que l'avenir", emoji: "🤔" },
      { action: "Choisis une petite décision facile", affirmation: "Je peux décider, même petit", emoji: "✅" },
      { action: "Médite 5 minutes sans chercher de réponses", affirmation: "La confusion peut coexister avec la paix", emoji: "🧘" },
    ],
    seul: [
      { action: "Envoie un message à quelqu'un", affirmation: "Je peux créer du lien", emoji: "📱" },
      { action: "Souris à un inconnu ou salue un voisin", affirmation: "La connexion commence par un geste", emoji: "👋" },
      { action: "Rejoins un groupe ou une activité", affirmation: "J'appartiens à une communauté", emoji: "👥" },
      { action: "Écris à ton moi enfant", affirmation: "Je ne suis jamais vraiment seul(e)", emoji: "💌" },
      { action: "Prends soin d'une plante ou d'un animal", affirmation: "Donner de l'amour en crée", emoji: "🌱" },
    ],
    trauma: [
      { action: "Respire profondément 5 fois", affirmation: "Je suis en sécurité maintenant", emoji: "🌬️" },
      { action: "Touche quelque chose de doux", affirmation: "Mon corps peut ressentir de la douceur", emoji: "🧸" },
      { action: "Nomme 5 choses que tu vois ici", affirmation: "Je suis présent(e) et ancré(e)", emoji: "👁️" },
      { action: "Bois de l'eau lentement", affirmation: "Je prends soin de moi avec gentillesse", emoji: "💧" },
      { action: "Dis-toi 'C'est fini, je suis en sécurité'", affirmation: "Le passé ne peut plus me blesser", emoji: "🛡️" },
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
            <p className="text-xs text-gray-500 mb-4">
              Débloquez l'accès complet pour continuer votre parcours
            </p>
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
                <p className="text-xs text-gray-500 mt-2">
                  {completedDays.length}/20 jours complétés
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyRoutine;
