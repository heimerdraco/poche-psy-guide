
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string; points: Record<string, number> }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Comment réagissez-vous généralement face au stress ?",
    options: [
      { value: "overthink", label: "Je réfléchis beaucoup et analyse tout", points: { analytique: 3, anxieux: 2 } },
      { value: "avoid", label: "J'évite les situations stressantes", points: { evitant: 3, sensible: 1 } },
      { value: "confront", label: "Je fais face directement", points: { combatif: 3, resilient: 2 } },
      { value: "seek_help", label: "Je cherche du soutien", points: { social: 3, empathique: 2 } }
    ]
  },
  {
    id: 2,
    text: "Quelle activité vous apporte le plus de bien-être ?",
    options: [
      { value: "alone_time", label: "Du temps seul(e) pour réfléchir", points: { introverti: 3, analytique: 1 } },
      { value: "social", label: "Passer du temps avec des proches", points: { social: 3, empathique: 2 } },
      { value: "creative", label: "Activités créatives ou artistiques", points: { creatif: 3, sensible: 2 } },
      { value: "physical", label: "Exercice physique ou sport", points: { resilient: 3, combatif: 1 } }
    ]
  },
  {
    id: 3,
    text: "Comment décririez-vous votre rapport aux émotions ?",
    options: [
      { value: "analyze", label: "J'aime comprendre et analyser mes émotions", points: { analytique: 3, introverti: 1 } },
      { value: "feel_deeply", label: "Je ressens tout très intensément", points: { sensible: 3, empathique: 2 } },
      { value: "control", label: "Je préfère garder le contrôle", points: { combatif: 2, resilient: 2 } },
      { value: "overwhelmed", label: "Je me sens parfois dépassé(e)", points: { anxieux: 3, evitant: 1 } }
    ]
  },
  {
    id: 4,
    text: "Dans un groupe, vous êtes plutôt :",
    options: [
      { value: "leader", label: "Celui/celle qui prend les initiatives", points: { combatif: 3, social: 1 } },
      { value: "mediator", label: "Le médiateur qui harmonise", points: { empathique: 3, social: 2 } },
      { value: "observer", label: "L'observateur discret", points: { introverti: 3, analytique: 2 } },
      { value: "creative_contributor", label: "Celui qui apporte des idées originales", points: { creatif: 3, sensible: 1 } }
    ]
  },
  {
    id: 5,
    text: "Face à un échec, votre première réaction est :",
    options: [
      { value: "analyze_learn", label: "Analyser pour comprendre et apprendre", points: { analytique: 3, resilient: 2 } },
      { value: "feel_disappointed", label: "Ressentir une profonde déception", points: { sensible: 3, anxieux: 1 } },
      { value: "bounce_back", label: "Rebondir rapidement", points: { resilient: 3, combatif: 2 } },
      { value: "withdraw", label: "Me retirer temporairement", points: { evitant: 3, introverti: 2 } }
    ]
  },
  {
    id: 6,
    text: "Votre environnement idéal pour vous ressourcer :",
    options: [
      { value: "nature", label: "En pleine nature, au calme", points: { introverti: 2, sensible: 2, resilient: 1 } },
      { value: "home_cozy", label: "Chez moi, dans un espace cosy", points: { evitant: 2, creatif: 2 } },
      { value: "social_gathering", label: "Entouré(e) de personnes bienveillantes", points: { social: 3, empathique: 2 } },
      { value: "inspiring_place", label: "Dans un lieu inspirant (musée, café...)", points: { creatif: 3, analytique: 1 } }
    ]
  },
  {
    id: 7,
    text: "Votre plus grande force est :",
    options: [
      { value: "empathy", label: "Ma capacité d'écoute et d'empathie", points: { empathique: 3, social: 2 } },
      { value: "analysis", label: "Ma capacité d'analyse et de réflexion", points: { analytique: 3, introverti: 1 } },
      { value: "creativity", label: "Ma créativité et mon imagination", points: { creatif: 3, sensible: 2 } },
      { value: "resilience", label: "Ma résistance et ma détermination", points: { resilient: 3, combatif: 2 } }
    ]
  },
  {
    id: 8,
    text: "Quand vous vous sentez anxieux/se :",
    options: [
      { value: "think_solutions", label: "Je cherche des solutions rationnelles", points: { analytique: 3, combatif: 1 } },
      { value: "need_comfort", label: "J'ai besoin de réconfort", points: { sensible: 3, empathique: 2 } },
      { value: "isolate", label: "Je préfère m'isoler", points: { evitant: 3, anxieux: 2 } },
      { value: "distract", label: "Je me distrais avec des activités", points: { resilient: 2, creatif: 2 } }
    ]
  },
  {
    id: 9,
    text: "Votre rapport au changement :",
    options: [
      { value: "embrace", label: "J'embrasse le changement avec enthousiasme", points: { resilient: 3, combatif: 2 } },
      { value: "cautious", label: "Je suis prudent(e) mais m'adapte", points: { analytique: 2, social: 1 } },
      { value: "anxious", label: "Le changement m'angoisse", points: { anxieux: 3, evitant: 2 } },
      { value: "creative_opportunity", label: "Je vois une opportunité créative", points: { creatif: 3, empathique: 1 } }
    ]
  },
  {
    id: 10,
    text: "Votre vision du bonheur :",
    options: [
      { value: "inner_peace", label: "La paix intérieure et l'harmonie", points: { introverti: 2, sensible: 2, empathique: 1 } },
      { value: "meaningful_connections", label: "Des relations profondes et authentiques", points: { empathique: 3, social: 3 } },
      { value: "personal_growth", label: "L'épanouissement et la croissance personnelle", points: { analytique: 2, resilient: 2, creatif: 2 } },
      { value: "freedom", label: "La liberté et l'indépendance", points: { combatif: 2, resilient: 2, creatif: 1 } }
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
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({
    analytique: 0,
    sensible: 0,
    combatif: 0,
    resilient: 0,
    empathique: 0,
    creatif: 0,
    social: 0,
    anxieux: 0,
    evitant: 0,
    introverti: 0
  });

  const handleAnswer = (questionId: number, optionValue: string) => {
    const question = questions.find(q => q.id === questionId);
    const option = question?.options.find(opt => opt.value === optionValue);
    
    if (option) {
      const newAnswers = { ...answers, [questionId]: optionValue };
      setAnswers(newAnswers);
      
      // Update scores
      const newScores = { ...scores };
      Object.entries(option.points).forEach(([trait, points]) => {
        newScores[trait] = (newScores[trait] || 0) + points;
      });
      setScores(newScores);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateProfile();
    }
  };

  const calculateProfile = () => {
    const profiles = {
      "L'Analytique": ['analytique', 'introverti'],
      "Le Sensible": ['sensible', 'empathique'],
      "Le Combatif": ['combatif', 'resilient'],
      "Le Résilient": ['resilient', 'combatif'],
      "L'Empathique": ['empathique', 'social'],
      "Le Créatif": ['creatif', 'sensible'],
      "L'Évitant": ['evitant', 'anxieux']
    };

    let maxScore = 0;
    let dominantProfile = "L'Analytique";

    Object.entries(profiles).forEach(([profileName, traits]) => {
      const score = traits.reduce((sum, trait) => sum + (scores[trait] || 0), 0);
      if (score > maxScore) {
        maxScore = score;
        dominantProfile = profileName;
      }
    });

    onComplete(dominantProfile);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Évaluation psychologique personnalisée
          </DialogTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} sur {questions.length}</span>
              <span>{Math.round(progress)}% complété</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <Button
                    key={option.value}
                    variant={answers[question.id] === option.value ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4 whitespace-normal"
                    onClick={() => handleAnswer(question.id, option.value)}
                  >
                    {option.label}
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
            >
              Précédent
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              {currentQuestion === questions.length - 1 ? "Voir mon profil" : "Suivant"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnaireModal;
