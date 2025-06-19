
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Book, Calendar } from "lucide-react";

interface ProfileDisplayProps {
  profile: string;
}

const profileData = {
  "L'Analytique": {
    description: "Vous êtes une personne réfléchie qui aime comprendre les choses en profondeur. Vous analysez les situations avant d'agir et cherchez toujours à apprendre.",
    strengths: ["Capacité d'analyse", "Réflexion approfondie", "Logique", "Apprentissage continu"],
    challenges: ["Tendance à la sur-analyse", "Difficulté à lâcher prise", "Perfectionnisme"],
    color: "blue",
    icon: "🧠"
  },
  "Le Sensible": {
    description: "Vous ressentez les émotions intensément et avez une grande sensibilité aux autres. Votre empathie est votre plus grande force.",
    strengths: ["Grande empathie", "Sensibilité émotionnelle", "Intuition développée", "Compassion"],
    challenges: ["Hypersensibilité", "Absorption des émotions d'autrui", "Vulnérabilité"],
    color: "pink",
    icon: "💖"
  },
  "Le Combatif": {
    description: "Vous faites face aux défis avec détermination. Votre force réside dans votre capacité à surmonter les obstacles.",
    strengths: ["Détermination", "Leadership", "Courage", "Persévérance"],
    challenges: ["Impatience", "Tendance à la confrontation", "Difficulté à demander de l'aide"],
    color: "red",
    icon: "💪"
  },
  "Le Résilient": {
    description: "Vous rebondissez facilement après les épreuves. Votre optimisme et votre adaptabilité vous permettent de traverser les difficultés.",
    strengths: ["Résilience", "Optimisme", "Adaptabilité", "Force mentale"],
    challenges: ["Minimisation des problèmes", "Évitement des émotions négatives"],
    color: "green",
    icon: "🌱"
  },
  "L'Empathique": {
    description: "Vous excellez dans les relations humaines. Votre capacité à comprendre et à aider les autres est remarquable.",
    strengths: ["Écoute active", "Compréhension des autres", "Médiation", "Soutien"],
    challenges: ["Oubli de ses propres besoins", "Épuisement émotionnel", "Difficultés à dire non"],
    color: "purple",
    icon: "🤝"
  },
  "Le Créatif": {
    description: "Votre imagination et votre créativité vous distinguent. Vous trouvez des solutions originales et exprimez votre individualité.",
    strengths: ["Créativité", "Innovation", "Expression artistique", "Originalité"],
    challenges: ["Dispersion", "Sensibilité à la critique", "Instabilité émotionnelle"],
    color: "orange",
    icon: "🎨"
  },
  "L'Évitant": {
    description: "Vous préférez éviter les conflits et les situations stressantes. Votre besoin de paix et de sécurité guide vos actions.",
    strengths: ["Recherche d'harmonie", "Prévention des conflits", "Stabilité"],
    challenges: ["Évitement des problèmes", "Difficulté à s'affirmer", "Isolation sociale"],
    color: "gray",
    icon: "🛡️"
  }
};

const ProfileDisplay = ({ profile }: ProfileDisplayProps) => {
  const data = profileData[profile as keyof typeof profileData];
  
  if (!data) return null;

  const colorVariants = {
    blue: "border-blue-500 bg-blue-50",
    pink: "border-pink-500 bg-pink-50",
    red: "border-red-500 bg-red-50",
    green: "border-green-500 bg-green-50",
    purple: "border-purple-500 bg-purple-50",
    orange: "border-orange-500 bg-orange-50",
    gray: "border-gray-500 bg-gray-50"
  };

  const badgeVariants = {
    blue: "bg-blue-100 text-blue-800",
    pink: "bg-pink-100 text-pink-800",
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    orange: "bg-orange-100 text-orange-800",
    gray: "bg-gray-100 text-gray-800"
  };

  return (
    <div className="space-y-6">
      <Card className={`border-2 ${colorVariants[data.color]} shadow-lg`}>
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{data.icon}</div>
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <User className="w-8 h-8" />
            {profile}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">{data.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                Vos forces
              </h4>
              <div className="space-y-2">
                {data.strengths.map((strength, index) => (
                  <Badge key={index} className={`${badgeVariants[data.color]} block w-fit`}>
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Book className="w-5 h-5 text-blue-600" />
                Points d'attention
              </h4>
              <div className="space-y-2">
                {data.challenges.map((challenge, index) => (
                  <Badge key={index} variant="outline" className="block w-fit">
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
