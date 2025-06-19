
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Calendar } from "lucide-react";

interface ProfileDisplayProps {
  profile: string;
}

const profileData = {
  "Épuisement mental": {
    description: "Tu ressens une fatigue profonde, comme si tes batteries étaient complètement vides. C'est le signe que tu as donné beaucoup de toi-même.",
    strengths: ["Capacité de don de soi", "Sensibilité aux autres", "Force intérieure", "Conscience de tes limites"],
    challenges: ["Besoin urgent de repos", "Difficulté à dire non", "Tendance à s'oublier"],
    color: "from-blue-200 to-purple-200",
    icon: "🌙",
    message: "Ton épuisement est le signe que tu as un grand cœur. Il est temps de prendre soin de toi avec la même tendresse que tu donnes aux autres."
  },
  "Anxiété / blocage": {
    description: "Ton esprit tourne en boucle, créant des scénarios qui t'empêchent d'avancer. Cette hypervigilance montre ta sensibilité au monde.",
    strengths: ["Grande sensibilité", "Capacité d'anticipation", "Intuition développée", "Attention aux détails"],
    challenges: ["Pensées envahissantes", "Difficultés à lâcher prise", "Paralysie face aux choix"],
    color: "from-green-200 to-blue-200",
    icon: "🌸",
    message: "Ton anxiété te protège, mais elle peut aussi t'emprisonner. Apprenons ensemble à l'apprivoiser pour qu'elle devienne ton alliée."
  },
  "Tristesse / vide": {
    description: "Une mélancolie profonde t'habite, comme si la couleur avait quitté ton monde. Cette tristesse témoigne de ta capacité à ressentir intensément.",
    strengths: ["Profondeur émotionnelle", "Empathie naturelle", "Authenticité", "Capacité à toucher les autres"],
    challenges: ["Sensation de vide", "Perte de motivation", "Difficulté à voir l'avenir"],
    color: "from-blue-200 to-indigo-200",
    icon: "💧",
    message: "Ta tristesse n'est pas une faiblesse, c'est la preuve de ton humanité profonde. Même dans l'obscurité, de petites lumières peuvent naître."
  },
  "Estime cassée": {
    description: "Tu ne te sens pas à la hauteur, comme si tu n'étais pas assez bien. Cette autocritique cache souvent un perfectionnisme douloureux.",
    strengths: ["Désir de bien faire", "Humilité", "Capacité d'amélioration", "Sensibilité aux autres"],
    challenges: ["Dialogue intérieur négatif", "Comparaison constante", "Peur du jugement"],
    color: "from-pink-200 to-rose-200",
    icon: "💔",
    message: "Tu es infiniment plus précieux/se que tu ne le crois. Apprenons ensemble à voir ta vraie valeur avec des yeux bienveillants."
  },
  "Confusion intérieure": {
    description: "Tu te sens perdu(e), comme dans un brouillard où les chemins ne sont plus clairs. Cette confusion cache souvent une transition importante.",
    strengths: ["Ouverture au changement", "Questionnement profond", "Adaptabilité", "Recherche de sens"],
    challenges: ["Manque de direction", "Difficultés décisionnelles", "Sentiment d'être perdu(e)"],
    color: "from-purple-200 to-pink-200",
    icon: "🌀",
    message: "La confusion est souvent le signe que tu es en train de grandir. Dans le brouillard, chaque petit pas compte pour retrouver ton chemin."
  },
  "Solitude / isolement affectif": {
    description: "Tu te sens seul(e) même entouré(e), comme si personne ne pouvait vraiment te comprendre. Cette solitude révèle ton besoin profond de connexion authentique.",
    strengths: ["Capacité d'introspection", "Indépendance", "Authenticité", "Recherche de profondeur"],
    challenges: ["Sentiment d'isolement", "Difficulté à créer des liens", "Peur de l'abandon"],
    color: "from-gray-200 to-blue-200",
    icon: "🫂",
    message: "Ta solitude n'est pas une condamnation, c'est un appel à créer des liens plus vrais. Tu n'es pas seul(e), même si tu ne le sens pas encore."
  },
  "Trauma / événement marquant": {
    description: "Un événement a bouleversé ton monde, laissant des traces profondes. Cette blessure témoigne de ton courage à continuer malgré la douleur.",
    strengths: ["Résilience extraordinaire", "Force cachée", "Empathie pour la souffrance", "Capacité de survie"],
    challenges: ["Souvenirs envahissants", "Méfiance protectrice", "Difficultés relationnelles"],
    color: "from-red-200 to-orange-200",
    icon: "🛡️",
    message: "Tu as survécu à l'impensable, et c'est la preuve de ta force immense. Guérir ne signifie pas oublier, mais apprendre à vivre avec douceur."
  }
};

const ProfileDisplay = ({ profile }: ProfileDisplayProps) => {
  const data = profileData[profile as keyof typeof profileData];
  
  if (!data) return null;

  return (
    <div className="space-y-6">
      <Card className={`border-0 bg-gradient-to-br ${data.color} shadow-lg`}>
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{data.icon}</div>
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2 text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            <User className="w-6 h-6" />
            {profile}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {data.description}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-800">
              <Heart className="w-5 h-5 text-pink-500" />
              Message bienveillant
            </h4>
            <p className="text-gray-700 leading-relaxed italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {data.message}
            </p>
          </div>
          
          <div className="grid gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-800">
                <Heart className="w-5 h-5 text-green-600" />
                Tes forces cachées
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.strengths.map((strength, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800 border-0">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-800">
                <Calendar className="w-5 h-5 text-blue-600" />
                Points d'attention douce
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.challenges.map((challenge, index) => (
                  <Badge key={index} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                    {challenge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDisplay;
