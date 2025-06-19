
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Heart, Calendar, Check } from "lucide-react";
import { useState } from "react";

interface ExercisesSectionProps {
  profile: string;
}

const exercisesByProfile = {
  "L'Analytique": [
    {
      title: "Méditation de pleine conscience",
      description: "Pratiquez 10 minutes de méditation pour calmer votre mental analytique",
      duration: "10 min",
      type: "Méditation",
      instructions: [
        "Asseyez-vous confortablement et fermez les yeux",
        "Concentrez-vous sur votre respiration",
        "Quand des pensées arrivent, observez-les sans les juger",
        "Revenez doucement à votre respiration"
      ]
    },
    {
      title: "Journal de gratitude analytique",
      description: "Analysez 3 choses positives de votre journée en détail",
      duration: "15 min",
      type: "Écriture",
      instructions: [
        "Notez 3 moments positifs de votre journée",
        "Pour chaque moment, analysez pourquoi il était positif",
        "Identifiez les patterns de ce qui vous rend heureux",
        "Planifiez comment reproduire ces moments"
      ]
    },
    {
      title: "Pause décision",
      description: "Technique pour éviter la sur-analyse paralysante",
      duration: "5 min",
      type: "Technique",
      instructions: [
        "Face à une décision, posez-vous 3 questions maximum",
        "Donnez-vous 5 minutes de réflexion",
        "Après ce temps, prenez une décision",
        "Acceptez que la perfection n'existe pas"
      ]
    }
  ],
  "Le Sensible": [
    {
      title: "Bouclier émotionnel",
      description: "Technique de protection contre l'hypersensibilité",
      duration: "8 min",
      type: "Visualisation",
      instructions: [
        "Imaginez une bulle de lumière dorée autour de vous",
        "Cette bulle filtre les émotions négatives des autres",
        "Respirez profondément et renforcez votre bulle",
        "Pratiquez cet exercice avant les interactions sociales"
      ]
    },
    {
      title: "Expression créative des émotions",
      description: "Canalisez vos émotions à travers l'art ou l'écriture",
      duration: "20 min",
      type: "Créativité",
      instructions: [
        "Choisissez votre moyen d'expression (dessin, écriture, musique)",
        "Laissez vos émotions s'exprimer librement",
        "Ne jugez pas votre création",
        "Observez comment vous vous sentez après"
      ]
    },
    {
      title: "Ancrage sensoriel",
      description: "Revenez au présent grâce à vos 5 sens",
      duration: "5 min",
      type: "Technique",
      instructions: [
        "Nommez 5 choses que vous voyez",
        "4 choses que vous entendez",
        "3 choses que vous touchez",
        "2 choses que vous sentez",
        "1 chose que vous goûtez"
      ]
    }
  ],
  "Le Combatif": [
    {
      title: "Respiration apaisante",
      description: "Calmez votre intensité avec des techniques de respiration",
      duration: "10 min",
      type: "Respiration",
      instructions: [
        "Inspirez sur 4 temps",
        "Retenez sur 4 temps",
        "Expirez sur 6 temps",
        "Répétez pendant 10 minutes"
      ]
    },
    {
      title: "Transformation de la colère",
      description: "Canalisez votre énergie combative positivement",
      duration: "15 min",
      type: "Exercice physique",
      instructions: [
        "Identifiez votre émotion de colère",
        "Faites 10 pompes ou jumping jacks",
        "Écrivez ce qui vous met en colère",
        "Transformez en plan d'action constructif"
      ]
    },
    {
      title: "Pause compassion",
      description: "Développez votre empathie naturelle",
      duration: "10 min",
      type: "Réflexion",
      instructions: [
        "Pensez à quelqu'un qui vous agace",
        "Imaginez ses difficultés personnelles",
        "Trouvez un point commun avec cette personne",
        "Envoyez-lui des pensées bienveillantes"
      ]
    }
  ],
  "Le Résilient": [
    {
      title: "Célébration des victoires",
      description: "Reconnaissez et savourez vos réussites",
      duration: "10 min",
      type: "Réflexion",
      instructions: [
        "Listez 3 défis que vous avez surmontés récemment",
        "Détaillez comment vous les avez relevés",
        "Félicitez-vous sincèrement",
        "Identifiez vos ressources internes"
      ]
    },
    {
      title: "Plan de rebond",
      description: "Structurez votre approche face aux difficultés",
      duration: "15 min",
      type: "Planification",
      instructions: [
        "Identifiez un défi actuel",
        "Listez vos ressources disponibles",
        "Créez 3 stratégies différentes",
        "Choisissez la première étape à accomplir"
      ]
    },
    {
      title: "Méditation de la montagne",
      description: "Renforcez votre stabilité intérieure",
      duration: "12 min",
      type: "Méditation",
      instructions: [
        "Imaginez-vous comme une montagne solide",
        "Les pensées et émotions sont comme la météo",
        "Elles passent, mais vous restez stable",
        "Ressentez votre force et votre permanence"
      ]
    }
  ],
  "L'Empathique": [
    {
      title: "Retour à soi",
      description: "Reconnectez-vous avec vos propres besoins",
      duration: "15 min",
      type: "Auto-compassion",
      instructions: [
        "Posez-vous : 'Comment je me sens vraiment ?'",
        "Identifiez vos besoins du moment",
        "Accordez-vous la même compassion qu'aux autres",
        "Planifiez une action bienveillante pour vous"
      ]
    },
    {
      title: "Limites saines",
      description: "Apprenez à dire non avec bienveillance",
      duration: "10 min",
      type: "Exercice pratique",
      instructions: [
        "Identifiez une situation où vous devriez dire non",
        "Formulez votre refus avec empathie",
        "Pratiquez votre réponse à voix haute",
        "Rappelez-vous : dire non, c'est prendre soin de vous"
      ]
    },
    {
      title: "Recharge énergétique",
      description: "Rechargez vos batteries émotionnelles",
      duration: "20 min",
      type: "Bien-être",
      instructions: [
        "Choisissez une activité qui vous ressource",
        "Éteignez tous les appareils",
        "Concentrez-vous uniquement sur vous",
        "Observez comment votre énergie se renouvelle"
      ]
    }
  ],
  "Le Créatif": [
    {
      title: "Flux créatif libre",
      description: "Laissez libre cours à votre créativité sans contrainte",
      duration: "25 min",
      type: "Créativité",
      instructions: [
        "Choisissez votre médium favori",
        "Créez sans objectif ni jugement",
        "Laissez vos émotions guider votre création",
        "Admirez votre œuvre sans critique"
      ]
    },
    {
      title: "Transformation des émotions",
      description: "Utilisez l'art pour processer vos émotions",
      duration: "20 min",
      type: "Art-thérapie",
      instructions: [
        "Identifiez une émotion forte",
        "Représentez-la par des couleurs et formes",
        "Transformez progressivement votre création",
        "Observez l'évolution de votre ressenti"
      ]
    },
    {
      title: "Inspiration quotidienne",
      description: "Cultivez votre inspiration au quotidien",
      duration: "10 min",
      type: "Exploration",
      instructions: [
        "Sortez et observez votre environnement",
        "Photographiez ou dessinez ce qui vous inspire",
        "Notez 3 idées créatives qui vous viennent",
        "Gardez ce carnet d'inspiration à portée de main"
      ]
    }
  ],
  "L'Évitant": [
    {
      title: "Micro-confrontation",
      description: "Affrontez doucement vos évitements",
      duration: "15 min",
      type: "Exposition graduelle",
      instructions: [
        "Identifiez une situation que vous évitez",
        "Divisez-la en petites étapes",
        "Affrontez la première étape seulement",
        "Félicitez-vous pour ce petit pas"
      ]
    },
    {
      title: "Zone de confort élargie",
      description: "Élargissez progressivement votre zone de confort",
      duration: "10 min",
      type: "Défi personnel",
      instructions: [
        "Choisissez quelque chose de légèrement inconfortable",
        "Préparez-vous mentalement",
        "Faites cette chose pendant 2 minutes",
        "Notez comment vous vous sentez après"
      ]
    },
    {
      title: "Affirmation de soi douce",
      description: "Exprimez vos besoins avec bienveillance",
      duration: "12 min",
      type: "Communication",
      instructions: [
        "Identifiez un besoin non exprimé",
        "Formulez-le clairement et positivement",
        "Pratiquez votre demande devant un miroir",
        "Choisissez le bon moment pour l'exprimer"
      ]
    }
  ]
};

const ExercisesSection = ({ profile }: ExercisesSectionProps) => {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const exercises = exercisesByProfile[profile as keyof typeof exercisesByProfile] || [];

  const markAsCompleted = (exerciseTitle: string) => {
    if (!completedExercises.includes(exerciseTitle)) {
      setCompletedExercises([...completedExercises, exerciseTitle]);
    }
    setActiveExercise(null);
  };

  const typeColors = {
    "Méditation": "bg-purple-100 text-purple-800",
    "Écriture": "bg-blue-100 text-blue-800",
    "Technique": "bg-green-100 text-green-800",
    "Visualisation": "bg-pink-100 text-pink-800",
    "Créativité": "bg-orange-100 text-orange-800",
    "Exercice physique": "bg-red-100 text-red-800",
    "Réflexion": "bg-indigo-100 text-indigo-800",
    "Planification": "bg-teal-100 text-teal-800",
    "Auto-compassion": "bg-rose-100 text-rose-800",
    "Exercice pratique": "bg-yellow-100 text-yellow-800",
    "Bien-être": "bg-emerald-100 text-emerald-800",
    "Art-thérapie": "bg-violet-100 text-violet-800",
    "Exploration": "bg-cyan-100 text-cyan-800",
    "Exposition graduelle": "bg-amber-100 text-amber-800",
    "Défi personnel": "bg-lime-100 text-lime-800",
    "Communication": "bg-sky-100 text-sky-800",
    "Respiration": "bg-slate-100 text-slate-800"
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Book className="w-8 h-8 text-blue-600" />
          Exercices pour {profile}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Voici des exercices personnalisés selon votre profil psychologique. 
          Pratiquez-les régulièrement pour développer votre bien-être.
        </p>
        <div className="mt-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {completedExercises.length} / {exercises.length} exercices complétés
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {exercises.map((exercise, index) => {
          const isCompleted = completedExercises.includes(exercise.title);
          const isActive = activeExercise === exercise.title;
          
          return (
            <Card key={index} className={`transition-all duration-300 ${
              isCompleted ? 'border-green-500 bg-green-50' : 
              isActive ? 'border-blue-500 shadow-lg' : 'hover:shadow-md'
            }`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {isCompleted && <Check className="w-5 h-5 text-green-600" />}
                      {exercise.title}
                    </CardTitle>
                    <p className="text-gray-600 mt-2">{exercise.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={typeColors[exercise.type as keyof typeof typeColors]}>
                      {exercise.type}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exercise.duration}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              {isActive && (
                <CardContent className="border-t bg-blue-50/50">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Instructions étape par étape :
                  </h4>
                  <ol className="space-y-2 mb-4">
                    {exercise.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                  <Button
                    onClick={() => markAsCompleted(exercise.title)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Marquer comme terminé
                  </Button>
                </CardContent>
              )}
              
              {!isActive && (
                <CardContent>
                  <Button
                    onClick={() => setActiveExercise(exercise.title)}
                    variant={isCompleted ? "outline" : "default"}
                    className="w-full"
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Exercice terminé ✓" : "Commencer l'exercice"}
                  </Button>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExercisesSection;
