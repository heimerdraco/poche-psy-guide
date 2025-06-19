
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { supabaseService } from "@/lib/supabase";

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: string) => void;
}

interface Question {
  question: string;
  options: {
    text: string;
    points: { [key: string]: number };
  }[];
}

const questions: Question[] = [
  {
    question: "Quand tu ressens une émotion forte, qu'est-ce que tu fais en général ?",
    options: [
      { text: "Je l'analyse dans tous les sens et j'anticipe le pire", points: { 'anxieux': 3 } },
      { text: "Je me sens vidé(e) et j'ai du mal à réagir", points: { 'fatigue': 3 } },
      { text: "Je me sens perdu(e) et désorienté(e)", points: { 'deracine': 3 } },
      { text: "J'essaie de la contrôler et de rester maître de moi", points: { 'controlant': 3 } },
      { text: "Elle me submerge complètement", points: { 'hypersensible': 3 } },
      { text: "Je la refoule et fais comme si de rien n'était", points: { 'refoule': 3 } },
      { text: "Elle s'accumule jusqu'à ce que j'explose", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "As-tu parfois du mal à identifier ce que tu ressens ?",
    options: [
      { text: "Non, mais je ressasse tout le temps mes émotions", points: { 'anxieux': 2 } },
      { text: "Oui, je me sens souvent engourdi(e) émotionnellement", points: { 'fatigue': 3, 'refoule': 2 } },
      { text: "Oui, c'est comme si j'étais déconnecté(e) de moi", points: { 'deracine': 3, 'refoule': 2 } },
      { text: "Je préfère me concentrer sur les faits plutôt que les émotions", points: { 'controlant': 3 } },
      { text: "Au contraire, je ressens tout très intensément", points: { 'hypersensible': 3 } },
      { text: "J'ai appris à ne pas trop écouter mes émotions", points: { 'refoule': 3 } },
      { text: "Ça explose d'un coup sans que je comprenne pourquoi", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "T'arrive-t-il de ruminer longtemps sur des événements ?",
    options: [
      { text: "Tout le temps, mes pensées tournent en boucle", points: { 'anxieux': 3 } },
      { text: "Je n'ai plus l'énergie de ruminer", points: { 'fatigue': 3 } },
      { text: "Je repense souvent au passé avec nostalgie", points: { 'deracine': 2 } },
      { text: "Je rumine pour trouver des solutions et éviter les erreurs", points: { 'controlant': 2 } },
      { text: "Oui, et ça me fait mal au cœur à chaque fois", points: { 'hypersensible': 2 } },
      { text: "J'évite d'y penser, je préfère passer à autre chose", points: { 'refoule': 2 } },
      { text: "Parfois, jusqu'à ce que la colère monte", points: { 'volcan': 2 } }
    ]
  },
  {
    question: "Te sens-tu souvent à bout sans trop savoir pourquoi ?",
    options: [
      { text: "Oui, l'anxiété me ronge de l'intérieur", points: { 'anxieux': 2 } },
      { text: "Constamment, je suis épuisé(e) en permanence", points: { 'fatigue': 3 } },
      { text: "Oui, comme si j'avais perdu mes repères", points: { 'deracine': 3 } },
      { text: "Quand je n'arrive pas à tout maîtriser", points: { 'controlant': 2 } },
      { text: "Oui, le monde me semble trop intense", points: { 'hypersensible': 3 } },
      { text: "Parfois, mais je ne sais pas d'où ça vient", points: { 'refoule': 3 } },
      { text: "Ça monte, monte, puis j'explose", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "Préfères-tu tout gérer toi-même plutôt que déléguer ?",
    options: [
      { text: "Oui, car j'ai peur que les autres fassent mal", points: { 'anxieux': 2, 'controlant': 2 } },
      { text: "Non, je n'ai plus la force de tout porter", points: { 'fatigue': 3 } },
      { text: "J'aimerais bien avoir quelqu'un sur qui compter", points: { 'deracine': 2 } },
      { text: "Absolument, je ne fais confiance qu'à moi-même", points: { 'controlant': 3 } },
      { text: "Ça dépend, parfois c'est trop lourd pour moi", points: { 'hypersensible': 2 } },
      { text: "Je dis oui mais au fond j'aimerais qu'on m'aide", points: { 'refoule': 2 } },
      { text: "Oui, sinon je m'énerve sur leur façon de faire", points: { 'volcan': 2 } }
    ]
  },
  {
    question: "Est-ce que tu as du mal à dire non ou poser tes limites ?",
    options: [
      { text: "Oui, j'ai peur de décevoir ou de créer des conflits", points: { 'anxieux': 2 } },
      { text: "Je n'ai plus l'énergie de me battre pour mes limites", points: { 'fatigue': 2 } },
      { text: "Oui, j'ai peur de perdre les liens avec les autres", points: { 'deracine': 2 } },
      { text: "Non, je pose mes limites très clairement", points: { 'controlant': 1 } },
      { text: "Énormément, je me laisse envahir par les autres", points: { 'hypersensible': 3 } },
      { text: "Oui, j'évite les confrontations", points: { 'refoule': 3 } },
      { text: "Au début oui, puis j'explose d'un coup", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "Est-ce que tu t'emportes parfois sans comprendre pourquoi ?",
    options: [
      { text: "Rarement, je suis plutôt dans l'inquiétude", points: { 'anxieux': 1 } },
      { text: "Non, je suis trop fatigué(e) pour m'emporter", points: { 'fatigue': 1 } },
      { text: "Parfois, quand je me sens incompris(e)", points: { 'deracine': 2 } },
      { text: "Quand les choses échappent à mon contrôle", points: { 'controlant': 2 } },
      { text: "Oui, mes émotions débordent facilement", points: { 'hypersensible': 2 } },
      { text: "Rarement, je garde tout pour moi", points: { 'refoule': 1 } },
      { text: "Oui, c'est exactement ça, des explosions soudaines", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "Te sens-tu souvent en décalage avec les autres ?",
    options: [
      { text: "Oui, j'ai l'impression qu'ils ne comprennent pas mes peurs", points: { 'anxieux': 2 } },
      { text: "Oui, comme si j'étais dans un brouillard", points: { 'fatigue': 2 } },
      { text: "Tout le temps, je ne trouve pas ma place", points: { 'deracine': 3 } },
      { text: "Parfois, car j'ai des standards élevés", points: { 'controlant': 2 } },
      { text: "Énormément, je me sens différent(e) et incompris(e)", points: { 'hypersensible': 3 } },
      { text: "Oui, mais je ne le montre pas", points: { 'refoule': 2 } },
      { text: "Oui, et ça me met en colère", points: { 'volcan': 2 } }
    ]
  },
  {
    question: "Ressens-tu un besoin fréquent de silence ou d'isolement ?",
    options: [
      { text: "Oui, pour échapper à mes pensées anxieuses", points: { 'anxieux': 2 } },
      { text: "Constamment, je n'ai plus d'énergie sociale", points: { 'fatigue': 3 } },
      { text: "Oui, je me sens seul(e) même entouré(e)", points: { 'deracine': 2 } },
      { text: "Oui, pour garder le contrôle de mon environnement", points: { 'controlant': 2 } },
      { text: "Absolument, le monde est trop stimulant pour moi", points: { 'hypersensible': 3 } },
      { text: "Oui, c'est là que je me sens le plus moi-même", points: { 'refoule': 2 } },
      { text: "Oui, sinon j'ai peur d'exploser sur quelqu'un", points: { 'volcan': 2 } }
    ]
  },
  {
    question: "Es-tu plutôt dans l'analyse ou dans l'action quand ça ne va pas ?",
    options: [
      { text: "Analyse excessive, je tourne en rond dans ma tête", points: { 'anxieux': 3 } },
      { text: "Ni l'un ni l'autre, je suis paralysé(e)", points: { 'fatigue': 3 } },
      { text: "J'analyse mais je ne sais plus quoi faire", points: { 'deracine': 2 } },
      { text: "Action immédiate pour reprendre le contrôle", points: { 'controlant': 3 } },
      { text: "J'analyse tout en ressentant intensément", points: { 'hypersensible': 2 } },
      { text: "J'évite d'analyser ET d'agir, je fuis", points: { 'refoule': 3 } },
      { text: "Action impulsive, souvent regrettée après", points: { 'volcan': 3 } }
    ]
  }
];

const QuestionnaireModal = ({ isOpen, onClose, onComplete }: QuestionnaireModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [scores, setScores] = useState<{ [key: string]: number }>({
    'anxieux': 0,
    'fatigue': 0,
    'deracine': 0,
    'controlant': 0,
    'hypersensible': 0,
    'refoule': 0,
    'volcan': 0
  });
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer: string, points: { [key: string]: number }) => {
    setAnswers({ ...answers, [currentQuestion]: answer });

    // Mise à jour des scores
    setScores(prevScores => {
      let newScores = { ...prevScores };
      for (const profile in points) {
        newScores[profile] = (newScores[profile] || 0) + points[profile];
      }
      return newScores;
    });
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Sauvegarder chaque réponse dans Supabase
      for (const [questionIndex, answer] of Object.entries(answers)) {
        const question = questions[parseInt(questionIndex)];
        const selectedOption = question.options.find(opt => opt.text === answer);
        const points = selectedOption?.points || {};
        
        await supabaseService.saveQuestionnaireAnswer(
          parseInt(questionIndex) + 1,
          answer,
          points
        );
      }

      // Déterminer le profil dominant
      const winningProfile = Object.entries(scores).reduce((a, b) => 
        scores[a[0]] > scores[b[0]] ? a : b
      )[0];

      // Sauvegarder l'utilisateur avec son profil et date de début d'essai
      const trialStart = Date.now().toString();
      await supabaseService.saveUser(winningProfile, trialStart);
      
      // Sauvegarder la progression initiale du parcours
      await supabaseService.saveJourneyProgress(winningProfile, 1, []);
      
      onComplete(winningProfile);
    } catch (error) {
      console.error('Erreur sauvegarde questionnaire:', error);
      // En cas d'erreur, continuer quand même avec le profil détecté
      const winningProfile = Object.entries(scores).reduce((a, b) => 
        scores[a[0]] > scores[b[0]] ? a : b
      )[0];
      onComplete(winningProfile);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-emerald-800 mb-4">
            Découverte de votre profil émotionnel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <Progress 
              value={(currentQuestion / questions.length) * 100} 
              className="mb-4"
            />
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} sur {questions.length}
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center text-emerald-800">
                {questions[currentQuestion].question}
              </h3>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion] === option.text ? "default" : "outline"}
                    className={`w-full text-left justify-start p-4 h-auto whitespace-normal ${
                      answers[currentQuestion] === option.text
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                        : 'hover:bg-emerald-50 border-emerald-200'
                    }`}
                    onClick={() => handleAnswer(option.text, option.points)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={!answers[currentQuestion]}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!answers[currentQuestion] || loading}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                {loading ? 'Analyse en cours...' : 'Découvrir mon profil'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnaireModal;
