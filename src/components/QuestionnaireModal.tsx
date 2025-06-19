
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  id: number;
  text: string;
  type: 'multiple' | 'open';
  options?: { value: string; label: string; points: Record<string, number> }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Comment te sens-tu en ce moment dans ta vie ? 🌙",
    type: 'multiple',
    options: [
      { value: "exhausted", label: "Épuisé(e), à bout de souffle", points: { epuisement: 3 } },
      { value: "anxious", label: "Anxieux/se, bloqué(e)", points: { anxiete: 3 } },
      { value: "sad", label: "Triste, vide à l'intérieur", points: { tristesse: 3 } },
      { value: "low_esteem", label: "Pas assez bien, estime cassée", points: { estime: 3 } },
      { value: "confused", label: "Perdu(e), confus(e)", points: { confusion: 3 } },
      { value: "lonely", label: "Seul(e), isolé(e)", points: { solitude: 3 } },
      { value: "traumatized", label: "Marqué(e) par un événement", points: { trauma: 3 } }
    ]
  },
  {
    id: 2,
    text: "Qu'est-ce qui t'empêche le plus de dormir la nuit ? 🌚",
    type: 'multiple',
    options: [
      { value: "overthinking", label: "Mes pensées qui tournent en boucle", points: { anxiete: 2, confusion: 1 } },
      { value: "responsibilities", label: "Tout ce que je dois faire demain", points: { epuisement: 2, anxiete: 1 } },
      { value: "sadness", label: "Une tristesse profonde", points: { tristesse: 3 } },
      { value: "self_doubt", label: "Mes doutes sur moi-même", points: { estime: 2, confusion: 1 } },
      { value: "loneliness", label: "Le sentiment de solitude", points: { solitude: 3 } },
      { value: "memories", label: "Des souvenirs douloureux", points: { trauma: 3 } }
    ]
  },
  {
    id: 3,
    text: "Décris en quelques mots ce que tu ressens le plus souvent 💭",
    type: 'open'
  },
  {
    id: 4,
    text: "Quand tu te regardes dans le miroir, que te dis-tu ? 🪞",
    type: 'multiple',
    options: [
      { value: "tired", label: "Tu as l'air fatigué(e)", points: { epuisement: 2 } },
      { value: "worried", label: "Tu as l'air inquiet/ète", points: { anxiete: 2 } },
      { value: "sad_look", label: "Tu as l'air triste", points: { tristesse: 2 } },
      { value: "not_enough", label: "Tu n'es pas assez bien", points: { estime: 3 } },
      { value: "lost", label: "Qui es-tu vraiment ?", points: { confusion: 2 } },
      { value: "alone", label: "Personne ne te comprend", points: { solitude: 2 } },
      { value: "different", label: "Tu n'es plus le/la même", points: { trauma: 2 } }
    ]
  },
  {
    id: 5,
    text: "Qu'est-ce qui te ferait le plus de bien en ce moment ? 🫂",
    type: 'multiple',
    options: [
      { value: "rest", label: "Du repos, une vraie pause", points: { epuisement: 2 } },
      { value: "peace", label: "De la sérénité, moins d'inquiétudes", points: { anxiete: 2 } },
      { value: "joy", label: "Retrouver la joie de vivre", points: { tristesse: 2 } },
      { value: "confidence", label: "Croire en moi à nouveau", points: { estime: 2 } },
      { value: "clarity", label: "Y voir plus clair", points: { confusion: 2 } },
      { value: "connection", label: "Me sentir moins seul(e)", points: { solitude: 2 } },
      { value: "healing", label: "Guérir de mes blessures", points: { trauma: 2 } }
    ]
  },
  {
    id: 6,
    text: "Raconte-moi ce qui te pèse le plus actuellement 💙",
    type: 'open'
  },
  {
    id: 7,
    text: "Comment réagis-tu face aux défis du quotidien ? ⚡",
    type: 'multiple',
    options: [
      { value: "overwhelmed", label: "Je me sens dépassé(e)", points: { epuisement: 2, anxiete: 1 } },
      { value: "anxious_avoid", label: "J'évite, j'ai peur", points: { anxiete: 2 } },
      { value: "give_up", label: "J'abandonne facilement", points: { tristesse: 2, estime: 1 } },
      { value: "self_blame", label: "Je me blâme", points: { estime: 2 } },
      { value: "paralyzed", label: "Je ne sais plus quoi faire", points: { confusion: 2 } },
      { value: "withdraw", label: "Je m'isole", points: { solitude: 2 } },
      { value: "triggered", label: "Ça réveille des douleurs", points: { trauma: 2 } }
    ]
  },
  {
    id: 8,
    text: "Quel est ton plus grand besoin émotionnel ? 🌸",
    type: 'multiple',
    options: [
      { value: "energy", label: "Retrouver mon énergie", points: { epuisement: 3 } },
      { value: "calm", label: "Être en paix avec moi-même", points: { anxiete: 3 } },
      { value: "happiness", label: "Ressentir du bonheur", points: { tristesse: 3 } },
      { value: "self_love", label: "M'aimer comme je suis", points: { estime: 3 } },
      { value: "direction", label: "Savoir où je vais", points: { confusion: 3 } },
      { value: "belonging", label: "Appartenir quelque part", points: { solitude: 3 } },
      { value: "peace", label: "Faire la paix avec mon passé", points: { trauma: 3 } }
    ]
  },
  {
    id: 9,
    text: "Qu'est-ce qui t'a amené(e) ici aujourd'hui ? 🤲",
    type: 'open'
  },
  {
    id: 10,
    text: "Si tu pouvais te dire une chose bienveillante, que serait-ce ? 💜",
    type: 'open'
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
  const [openAnswers, setOpenAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({
    epuisement: 0,
    anxiete: 0,
    tristesse: 0,
    estime: 0,
    confusion: 0,
    solitude: 0,
    trauma: 0
  });

  const handleMultipleAnswer = (questionId: number, optionValue: string) => {
    const question = questions.find(q => q.id === questionId);
    const option = question?.options?.find(opt => opt.value === optionValue);
    
    if (option) {
      const newAnswers = { ...answers, [questionId]: optionValue };
      setAnswers(newAnswers);
      
      const newScores = { ...scores };
      Object.entries(option.points).forEach(([trait, points]) => {
        newScores[trait] = (newScores[trait] || 0) + points;
      });
      setScores(newScores);
    }
  };

  const handleOpenAnswer = (questionId: number, value: string) => {
    setOpenAnswers({ ...openAnswers, [questionId]: value });
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
      "Épuisement mental": 'epuisement',
      "Anxiété / blocage": 'anxiete',
      "Tristesse / vide": 'tristesse',
      "Estime cassée": 'estime',
      "Confusion intérieure": 'confusion',
      "Solitude / isolement affectif": 'solitude',
      "Trauma / événement marquant": 'trauma'
    };

    let maxScore = 0;
    let dominantProfile = "Épuisement mental";

    Object.entries(profiles).forEach(([profileName, trait]) => {
      const score = scores[trait] || 0;
      if (score > maxScore) {
        maxScore = score;
        dominantProfile = profileName;
      }
    });

    // Sauvegarder les réponses
    localStorage.setItem('questionnaireAnswers', JSON.stringify({ answers, openAnswers }));
    onComplete(dominantProfile);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const canProceed = question.type === 'multiple' 
    ? answers[question.id] 
    : openAnswers[question.id]?.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4 text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            Questionnaire émotionnel 🌸
          </DialogTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} sur {questions.length}</span>
              <span>{Math.round(progress)}% ✨</span>
            </div>
            <Progress value={progress} className="w-full h-2 bg-purple-100" />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-800 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {question.text}
              </h3>
              
              {question.type === 'multiple' && question.options && (
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <Button
                      key={option.value}
                      variant={answers[question.id] === option.value ? "default" : "outline"}
                      className={`w-full text-left justify-start h-auto p-4 whitespace-normal rounded-2xl border-2 ${
                        answers[question.id] === option.value
                          ? 'bg-gradient-to-r from-purple-300 to-pink-300 text-gray-800 border-purple-300'
                          : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'
                      }`}
                      onClick={() => handleMultipleAnswer(question.id, option.value)}
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
              
              {question.type === 'open' && (
                <Textarea
                  value={openAnswers[question.id] || ''}
                  onChange={(e) => handleOpenAnswer(question.id, e.target.value)}
                  placeholder="Prends le temps de t'exprimer librement... 💭"
                  className="min-h-[120px] border-2 border-purple-200 rounded-2xl focus:border-purple-400 bg-white/70"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                />
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="flex-1 rounded-2xl border-2 border-gray-300 hover:border-gray-400"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              ← Précédent
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl border-0 shadow-lg"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              {currentQuestion === questions.length - 1 ? "Découvrir mon profil ✨" : "Suivant →"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnaireModal;
