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
      epuise?: number;
      anxieux?: number;
      triste?: number;
      estime?: number;
      confus?: number;
      seul?: number;
      trauma?: number;
    };
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Comment te sens-tu généralement le matin au réveil ?",
    answers: [
      { text: "Épuisé(e) avant même de commencer la journée", points: { epuise: 3 } },
      { text: "Anxieux/se pour ce qui m'attend", points: { anxieux: 3 } },
      { text: "Triste sans vraiment savoir pourquoi", points: { triste: 2 } },
      { text: "Motivé(e) mais pas sûr(e) de mes capacités", points: { estime: 2 } },
      { text: "Plutôt bien, prêt(e) à affronter la journée", points: {} }
    ]
  },
  {
    id: 2,
    text: "Face à un défi ou une difficulté, ta première réaction est :",
    answers: [
      { text: "Je me sens dépassé(e), je n'ai plus d'énergie", points: { epuise: 3 } },
      { text: "Je panique, je ne sais pas par où commencer", points: { anxieux: 3 } },
      { text: "Je me décourage avant même d'essayer", points: { triste: 2 } },
      { text: "Je doute de pouvoir y arriver", points: { estime: 3 } },
      { text: "Je me sens perdu(e), confus(e)", points: { confus: 3 } }
    ]
  },
  {
    id: 3,
    text: "Dans tes relations avec les autres :",
    answers: [
      { text: "Je n'ai plus l'énergie de maintenir mes relations", points: { epuise: 2 } },
      { text: "J'évite les contacts par peur du jugement", points: { anxieux: 2 } },
      { text: "Je me sens incompris(e) et isolé(e)", points: { seul: 3 } },
      { text: "Je pense que je ne mérite pas l'attention des autres", points: { estime: 3 } },
      { text: "Les relations me semblent compliquées à gérer", points: { confus: 2 } }
    ]
  },
  {
    id: 4,
    text: "Quand tu penses à ton avenir :",
    answers: [
      { text: "Je me sens trop fatigué(e) pour faire des projets", points: { epuise: 2 } },
      { text: "J'ai peur de ce qui pourrait arriver", points: { anxieux: 3 } },
      { text: "Je ne vois pas comment les choses peuvent s'améliorer", points: { triste: 3 } },
      { text: "Je ne pense pas avoir les capacités pour réussir", points: { estime: 2 } },
      { text: "Je ne sais pas vraiment ce que je veux", points: { confus: 3 } }
    ]
  },
  {
    id: 5,
    text: "Concernant ton sommeil et ton énergie :",
    answers: [
      { text: "Je suis constamment épuisé(e), même après avoir dormi", points: { epuise: 3 } },
      { text: "J'ai du mal à m'endormir, mon esprit ne s'arrête pas", points: { anxieux: 2 } },
      { text: "Je dors trop ou pas assez, sans vraiment de rythme", points: { triste: 2 } },
      { text: "Mon sommeil est correct mais je me sens vide", points: { seul: 2 } },
      { text: "Ça va, je gère mes nuits et mes journées", points: {} }
    ]
  },
  {
    id: 6,
    text: "Face à tes émotions difficiles :",
    answers: [
      { text: "J'aimerais les comprendre mais je n'ai plus la force", points: { epuise: 2 } },
      { text: "Elles me submergent et me paralysent", points: { anxieux: 3 } },
      { text: "Elles me font me sentir encore plus seul(e)", points: { seul: 3 } },
      { text: "Je les refoule pour ne pas les affronter", points: { trauma: 2 } },
      { text: "J'arrive à les accueillir sans trop de difficulté", points: {} }
    ]
  },
  {
    id: 7,
    text: "Si tu devais décrire ton état mental actuel :",
    answers: [
      { text: "Brouillard constant, difficultés à me concentrer", points: { confus: 3 } },
      { text: "Hypervigilance, toujours sur le qui-vive", points: { anxieux: 2 } },
      { text: "Vide émotionnel, comme anesthésié(e)", points: { triste: 3 } },
      { text: "Ruminations constantes sur le passé", points: { trauma: 3 } },
      { text: "Globalement stable avec quelques hauts et bas", points: {} }
    ]
  },
  {
    id: 8,
    text: "Concernant ta confiance en toi :",
    answers: [
      { text: "Elle a complètement disparu, je doute de tout", points: { estime: 3 } },
      { text: "J'ai peur de décevoir constamment", points: { anxieux: 2 } },
      { text: "Je me sens nul(le) et sans valeur", points: { estime: 2, triste: 1 } },
      { text: "Elle fluctue selon les situations", points: { confus: 1 } },
      { text: "Elle est plutôt solide en général", points: {} }
    ]
  },
  {
    id: 9,
    text: "Par rapport à un événement difficile de ta vie :",
    answers: [
      { text: "J'y pense souvent et ça me hante encore", points: { trauma: 3 } },
      { text: "Ça me rend anxieux/se d'en reparler", points: { anxieux: 2, trauma: 1 } },
      { text: "J'ai l'impression de ne jamais m'en remettre", points: { triste: 2, trauma: 1 } },
      { text: "Je préfère faire comme si ça n'existait pas", points: { trauma: 2 } },
      { text: "J'ai réussi à l'accepter et à avancer", points: {} }
    ]
  },
  {
    id: 10,
    text: "Actuellement, ce dont tu as le plus besoin c'est :",
    answers: [
      { text: "De repos et de récupérer mon énergie", points: { epuise: 3 } },
      { text: "D'apprendre à gérer mon stress et mes peurs", points: { anxieux: 3 } },
      { text: "De retrouver goût à la vie et la motivation", points: { triste: 3 } },
      { text: "De reconstruire ma confiance en moi", points: { estime: 3 } },
      { text: "De clarifier mes pensées et mes objectifs", points: { confus: 3 } },
      { text: "De créer des liens authentiques avec les autres", points: { seul: 3 } },
      { text: "De faire la paix avec mon passé", points: { trauma: 3 } }
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
    epuise: 0,
    anxieux: 0,
    triste: 0,
    estime: 0,
    confus: 0,
    seul: 0,
    trauma: 0
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
      // Questionnaire terminé - calculer le profil dominant
      const maxScore = Math.max(...Object.values(newScores));
      const dominantProfile = Object.entries(newScores).find(([_, score]) => score === maxScore)?.[0] || 'epuise';
      
      console.log('Scores finaux:', newScores);
      console.log('Profil dominant:', dominantProfile);
      
      // Mapper les profils vers les noms complets
      const profileMapping = {
        epuise: 'Épuisement mental',
        anxieux: 'Anxiété / blocage',
        triste: 'Tristesse / vide',
        estime: 'Estime cassée',
        confus: 'Confusion intérieure',
        seul: 'Solitude / déconnexion',
        trauma: 'Trauma / événement marquant'
      };
      
      const fullProfileName = profileMapping[dominantProfile as keyof typeof profileMapping];
      
      // Save profile to Supabase and localStorage
      await supabaseService.saveUser(fullProfileName, new Date().toISOString());
      localStorage.setItem('psyProfile', fullProfileName);
      localStorage.setItem('trialStart', Date.now().toString());
      
      // Complete questionnaire
      onComplete(fullProfileName);
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
