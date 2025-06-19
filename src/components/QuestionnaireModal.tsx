
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabaseService } from "@/lib/supabase";

interface Question {
  id: number;
  text: string;
  answers: {
    text: string;
    points: {
      burnout?: number;
      anxiety?: number;
      sadness?: number;
      anger?: number;
      balance?: number;
    };
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Comment te sens-tu généralement le matin au réveil ?",
    answers: [
      { text: "Énergique et motivé(e)", points: { balance: 3 } },
      { text: "Un peu fatigué(e) mais ça va", points: { balance: 1 } },
      { text: "Épuisé(e) avant même de commencer", points: { burnout: 2 } },
      { text: "Anxieux/se pour la journée à venir", points: { anxiety: 2 } },
      { text: "Triste sans raison apparente", points: { sadness: 2 } }
    ]
  },
  {
    id: 2,
    text: "Face aux défis du quotidien, tu te sens plutôt :",
    answers: [
      { text: "Confiant(e) et capable", points: { balance: 3 } },
      { text: "Un peu stressé(e) mais je gère", points: { anxiety: 1 } },
      { text: "Complètement dépassé(e)", points: { burnout: 3 } },
      { text: "En colère contre les circonstances", points: { anger: 2 } },
      { text: "Résigné(e) et découragé(e)", points: { sadness: 3 } }
    ]
  },
  {
    id: 3,
    text: "Quand tu penses à ton avenir :",
    answers: [
      { text: "Tu es optimiste et plein(e) d'espoir", points: { balance: 3 } },
      { text: "Tu as quelques inquiétudes mais ça va", points: { anxiety: 1 } },
      { text: "Tu as peur de ne pas y arriver", points: { anxiety: 3 } },
      { text: "Tu ne vois pas comment ça peut s'améliorer", points: { sadness: 3 } },
      { text: "Tu es en colère contre la situation", points: { anger: 2 } }
    ]
  },
  {
    id: 4,
    text: "Dans tes relations avec les autres :",
    answers: [
      { text: "Tu es épanoui(e) et à l'aise", points: { balance: 3 } },
      { text: "Tu peux être un peu timide parfois", points: { anxiety: 1 } },
      { text: "Tu te sens souvent incompris(e)", points: { sadness: 2 } },
      { text: "Tu t'isoles de plus en plus", points: { burnout: 2 } },
      { text: "Tu t'emportes facilement", points: { anger: 3 } }
    ]
  },
  {
    id: 5,
    text: "Ton niveau d'énergie actuellement :",
    answers: [
      { text: "Excellent, je suis en forme", points: { balance: 3 } },
      { text: "Correct, je tiens le coup", points: { balance: 1 } },
      { text: "Très bas, je suis épuisé(e)", points: { burnout: 3 } },
      { text: "Variable selon mon stress", points: { anxiety: 2 } },
      { text: "Je n'ai envie de rien faire", points: { sadness: 2 } }
    ]
  }
];

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: string) => void;
}

const QuestionnaireModal = ({ isOpen, onClose, onComplete }: QuestionnaireModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState({
    burnout: 0,
    anxiety: 0,
    sadness: 0,
    anger: 0,
    balance: 0
  });

  const handleAnswer = async (answerIndex: number) => {
    const question = questions[currentQuestion];
    const selectedAnswer = question.answers[answerIndex];
    
    // Save answer to Supabase
    await supabaseService.saveQuestionnaireAnswer(
      question.id,
      selectedAnswer.text,
      selectedAnswer.points
    );
    
    // Update local state
    const newAnswers = { ...answers, [currentQuestion]: selectedAnswer.text };
    setAnswers(newAnswers);
    
    const newScores = { ...scores };
    Object.entries(selectedAnswer.points).forEach(([key, value]) => {
      newScores[key as keyof typeof scores] += value || 0;
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Questionnaire terminé
      const maxScore = Math.max(...Object.values(newScores));
      const dominantProfile = Object.entries(newScores).find(([_, score]) => score === maxScore)?.[0] || 'balance';
      
      let profileText = '';
      switch (dominantProfile) {
        case 'burnout':
          profileText = 'Tu sembles vivre un épuisement émotionnel. Il est important de prendre du temps pour toi.';
          break;
        case 'anxiety':
          profileText = 'Tu ressens de l\'anxiété. Des techniques de relaxation pourraient t\'aider.';
          break;
        case 'sadness':
          profileText = 'Tu traverses une période de tristesse. Il est normal de se sentir ainsi parfois.';
          break;
        case 'anger':
          profileText = 'Tu ressens de la colère. Apprendre à la canaliser peut être bénéfique.';
          break;
        default:
          profileText = 'Tu sembles être dans un bon équilibre émotionnel. Continue ainsi !';
      }
      
      // Save profile to Supabase
      await supabaseService.saveUser(profileText, new Date().toISOString());
      
      localStorage.setItem('psyProfile', profileText);
      onComplete(profileText);
      onClose();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-gray-800">
            Questionnaire d'évaluation émotionnelle
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <Badge variant="outline" className="mx-auto block w-fit">
            Question {currentQuestion + 1} sur {questions.length}
          </Badge>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4 leading-relaxed">
                {questions[currentQuestion].text}
              </h3>
              
              <div className="space-y-3">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 hover:bg-purple-50 hover:border-purple-200 transition-colors"
                    onClick={() => handleAnswer(index)}
                  >
                    {answer.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnaireModal;
