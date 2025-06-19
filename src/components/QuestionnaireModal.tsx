
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
    question: "Face à une situation stressante, comment réagissez-vous ?",
    options: [
      { text: "Je deviens très anxieux(se) et anticipe le pire.", points: { 'anxieux': 3 } },
      { text: "Je me sens épuisé(e) et n'ai plus d'énergie pour réagir.", points: { 'fatigue': 3 } },
      { text: "Je me sens perdu(e) et désorienté(e).", points: { 'deracine': 3 } },
      { text: "J'essaie de tout contrôler pour éviter l'imprévu.", points: { 'controlant': 3 } },
      { text: "Je suis submergé(e) par mes émotions.", points: { 'hypersensible': 3 } },
      { text: "Je garde tout pour moi et évite d'en parler.", points: { 'refoule': 3 } },
      { text: "J'accumule la frustration jusqu'à exploser.", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "Quelle est votre plus grande difficulté au quotidien ?",
    options: [
      { text: "Les pensées négatives qui tournent en boucle.", points: { 'anxieux': 3 } },
      { text: "Le manque d'énergie chronique.", points: { 'fatigue': 3 } },
      { text: "Le sentiment d'isolement et de solitude.", points: { 'deracine': 3 } },
      { text: "L'incapacité à lâcher prise.", points: { 'controlant': 3 } },
      { text: "La difficulté à gérer mes émotions intenses.", points: { 'hypersensible': 3 } },
      { text: "L'impossibilité d'exprimer ce que je ressens.", points: { 'refoule': 3 } },
      { text: "Les colères soudaines et imprévisibles.", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "Comment vous comportez-vous en société ?",
    options: [
      { text: "J'évite les situations sociales par peur du jugement.", points: { 'anxieux': 3 } },
      { text: "Je participe peu car je n'ai pas l'énergie.", points: { 'fatigue': 3 } },
      { text: "Je me sens souvent à l'écart du groupe.", points: { 'deracine': 3 } },
      { text: "J'organise et planifie tout pour que ça se passe bien.", points: { 'controlant': 3 } },
      { text: "Je ressens intensément l'ambiance et les émotions des autres.", points: { 'hypersensible': 3 } },
      { text: "Je souris et fait bonne figure même si ça ne va pas.", points: { 'refoule': 3 } },
      { text: "J'ai parfois des réactions disproportionnées.", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "Qu'est-ce qui vous aide le mieux à vous sentir mieux ?",
    options: [
      { text: "Des exercices de respiration et relaxation.", points: { 'anxieux': 3 } },
      { text: "Du repos et des moments de récupération.", points: { 'fatigue': 3 } },
      { text: "Retrouver du lien avec mes proches.", points: { 'deracine': 3 } },
      { text: "Avoir un plan clair et organisé.", points: { 'controlant': 3 } },
      { text: "Un environnement calme et apaisant.", points: { 'hypersensible': 3 } },
      { text: "Écrire ou m'exprimer artistiquement.", points: { 'refoule': 3 } },
      { text: "Faire du sport ou une activité physique intense.", points: { 'volcan': 3 } }
    ]
  },
  {
    question: "Quelle est votre plus grande peur ?",
    options: [
      { text: "Que quelque chose de terrible arrive.", points: { 'anxieux': 3 } },
      { text: "Ne plus jamais retrouver mon énergie.", points: { 'fatigue': 3 } },
      { text: "Rester seul(e) pour toujours.", points: { 'deracine': 3 } },
      { text: "Perdre le contrôle de ma vie.", points: { 'controlant': 3 } },
      { text: "Être submergé(e) par mes émotions.", points: { 'hypersensible': 3 } },
      { text: "Ne jamais pouvoir dire ce que je pense vraiment.", points: { 'refoule': 3 } },
      { text: "Faire du mal à quelqu'un dans un moment de colère.", points: { 'volcan': 3 } }
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
