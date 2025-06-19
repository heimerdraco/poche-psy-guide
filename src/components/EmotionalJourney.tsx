
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Heart, Calendar, MessageCircle, Book } from "lucide-react";

interface EmotionalJourneyProps {
  profile: string;
  trialDays: number;
}

const journeyContent = {
  "Épuisement mental": {
    emoji: "🌙",
    color: "from-blue-200 to-purple-200",
    days: [
      {
        day: 1,
        title: "Bienvenue, âme fatiguée 💙",
        message: "Je vois ta fatigue, et elle est légitime. Aujourd'hui, nous commençons un chemin de récupération douce.",
        action: "Respiration de 5 minutes pour libérer les tensions",
        quote: "Se reposer n'est pas de la paresse, c'est de la sagesse."
      },
      {
        day: 2,
        title: "Écouter ton corps 🫂",
        message: "Ton corps te parle. Apprenons ensemble à l'écouter sans jugement.",
        action: "Scanner corporel : identifier où se loge ta fatigue",
        quote: "Ton corps est ton temple, traite-le avec amour."
      },
      {
        day: 3,
        title: "Libérer la pression 🌊",
        message: "Tu n'as pas à tout porter sur tes épaules. Déposons ensemble ce fardeau trop lourd.",
        action: "Écrire 3 choses que tu peux déléguer ou abandonner",
        quote: "Lâcher prise, c'est retrouver sa force."
      }
    ]
  },
  "Anxiété / blocage": {
    emoji: "🌸",
    color: "from-green-200 to-blue-200",
    days: [
      {
        day: 1,
        title: "Respire, tu es en sécurité 🌸",
        message: "Ton anxiété te protège, mais elle peut aussi t'emprisonner. Apprenons à l'apprivoiser.",
        action: "Technique 4-7-8 : respirer pour calmer le système nerveux",
        quote: "Chaque inspiration est une nouvelle chance de paix."
      },
      {
        day: 2,
        title: "Démêler tes peurs 🧵",
        message: "Tes peurs ont une histoire. Explorons-les avec bienveillance pour les transformer.",
        action: "Identifier 3 peurs et leur donner un nom doux",
        quote: "Le courage n'est pas l'absence de peur, c'est agir malgré elle."
      },
      {
        day: 3,
        title: "Créer ton espace sûr 🏠",
        message: "Tu mérites un havre de paix, un endroit où ton anxiété peut se reposer.",
        action: "Visualiser et créer ton sanctuaire mental",
        quote: "La paix commence à l'intérieur de toi."
      }
    ]
  },
  "Tristesse / vide": {
    emoji: "💧",
    color: "from-blue-200 to-indigo-200",
    days: [
      {
        day: 1,
        title: "Honorer ta tristesse 💧",
        message: "Ta tristesse n'est pas une faiblesse, c'est la preuve de ton humanité profonde.",
        action: "Laisser couler tes larmes si elles viennent",
        quote: "Les larmes sont les mots que le cœur ne peut pas dire."
      },
      {
        day: 2,
        title: "Retrouver les petites lumières ✨",
        message: "Même dans l'obscurité, de petites étoiles brillent. Apprenons à les voir.",
        action: "Noter 3 micro-moments de beauté dans ta journée",
        quote: "La plus petite lumière peut percer la plus grande obscurité."
      },
      {
        day: 3,
        title: "Nourrir ton cœur 🌱",
        message: "Ton cœur a besoin de tendresse pour se réparer. Donnons-lui ce dont il a besoin.",
        action: "Écrire une lettre de compassion à ton moi triste",
        quote: "Sois patient avec toi-même, la guérison prend du temps."
      }
    ]
  }
  // Ajout des autres profils...
};

const EmotionalJourney = ({ profile, trialDays }: EmotionalJourneyProps) => {
  const [currentDay, setCurrentDay] = useState(1);
  const journey = journeyContent[profile as keyof typeof journeyContent];
  
  if (!journey) return null;

  const isLocked = (day: number) => day > 3 && trialDays === 0;
  const getCurrentDayContent = () => journey.days.find(d => d.day === currentDay) || journey.days[0];
  const dayContent = getCurrentDayContent();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${journey.color} mb-4`}>
          <span className="text-2xl">{journey.emoji}</span>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            {profile}
          </h2>
        </div>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Parcours personnalisé • 10 jours
        </p>
      </div>

      {/* Sélection des jours */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((day) => (
          <Button
            key={day}
            variant={currentDay === day ? "default" : "outline"}
            size="sm"
            onClick={() => !isLocked(day) && setCurrentDay(day)}
            disabled={isLocked(day)}
            className={`min-w-[48px] h-12 rounded-full ${
              currentDay === day
                ? `bg-gradient-to-r ${journey.color} text-gray-800`
                : isLocked(day)
                ? 'opacity-50 cursor-not-allowed'
                : 'border-2 border-purple-200 hover:border-purple-300'
            }`}
          >
            {isLocked(day) ? <Lock className="w-4 h-4" /> : day}
          </Button>
        ))}
      </div>

      {isLocked(currentDay) ? (
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg">
          <CardContent className="p-8 text-center">
            <Lock className="w-16 h-16 mx-auto mb-4 text-orange-400" />
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Tu veux continuer à prendre soin de toi ? 💜
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Active ton espace personnel illimité pour accéder aux 7 jours suivants de ton parcours émotionnel.
            </p>
            <div className="space-y-3">
              <Badge className="bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-800 text-lg px-4 py-2">
                3,99€/mois ou 0,99€/semaine
              </Badge>
              <div>
                <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-2xl">
                  💎 Activer Soutien+
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className={`border-0 bg-gradient-to-br ${journey.color} shadow-lg`}>
          <CardHeader>
            <CardTitle className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-lg font-bold text-gray-800">Jour {dayContent.day}</span>
              </div>
              <h3 className="text-xl text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                {dayContent.title}
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {dayContent.message}
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-800">
                <Heart className="w-4 h-4 text-red-500" />
                Action douce du jour
              </h4>
              <p className="text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {dayContent.action}
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-800">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                Citation inspirante
              </h4>
              <blockquote className="text-gray-700 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
                "{dayContent.quote}"
              </blockquote>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-green-300 to-blue-300 hover:from-green-400 hover:to-blue-400 text-gray-800 py-3 rounded-2xl border-0 shadow-lg"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              🌸 Je reviens demain
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmotionalJourney;
