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
      { text: "Je deviens très émotif(ve) et ai du mal à me calmer.", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "Je m'inquiète énormément et anticipe le pire.", points: { 'Anxieux Généralisé': 3 } },
      { text: "Je me mets une pression énorme pour tout contrôler parfaitement.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "Je prends du recul et analyse la situation calmement.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Je ressens les émotions des autres et essaie de les aider.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Quelle est votre plus grande peur ?",
    options: [
      { text: "Être rejeté(e) ou incompris(e).", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "Que quelque chose de terrible arrive à mes proches.", points: { 'Anxieux Généralisé': 3 } },
      { text: "Ne pas être à la hauteur de mes propres attentes.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "Être envahi(e) par le bruit et l'agitation du monde extérieur.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Ne pas pouvoir soulager la souffrance des autres.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Dans une conversation, vous avez tendance à...",
    options: [
      { text: "Être très expressif(ve) et passionné(e).", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "Anticiper les réactions et ajuster mes propos en conséquence.", points: { 'Anxieux Généralisé': 3 } },
      { text: "Préparer mentalement ce que je vais dire pour être clair(e) et précis(e).", points: { 'Perfectionniste Stressé': 3 } },
      { text: "Écouter attentivement et observer les réactions avant de parler.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Ressentir l'état émotionnel de mon interlocuteur et adapter mon discours.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Comment rechargez-vous vos batteries après une longue journée ?",
    options: [
      { text: "En exprimant mes émotions à quelqu'un de confiance.", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "En planifiant et organisant ma semaine pour me rassurer.", points: { 'Anxieux Généralisé': 3 } },
      { text: "En me concentrant sur une tâche précise pour me sentir utile.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "En passant du temps seul(e) dans un endroit calme.", points: { 'Introverti Réfléchi': 3 } },
      { text: "En aidant ou en écoutant les problèmes des autres.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Qu'est-ce qui vous met le plus mal à l'aise ?",
    options: [
      { text: "Les critiques ou les remarques négatives.", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "L'incertitude et le manque de contrôle.", points: { 'Anxieux Généralisé': 3 } },
      { text: "L'imperfection et le travail bâclé.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "Les conversations superficielles et le bavardage inutile.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Être témoin de l'injustice ou de la souffrance.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Quelle est votre plus grande qualité ?",
    options: [
      { text: "Ma grande sensibilité et mon intuition.", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "Ma capacité à anticiper les problèmes et à trouver des solutions.", points: { 'Anxieux Généralisé': 3 } },
      { text: "Mon sens du détail et mon perfectionnisme.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "Ma capacité à écouter et à comprendre les autres.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Mon empathie et ma compassion.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Comment réagissez-vous face à un conflit ?",
    options: [
      { text: "Je suis facilement submergé(e) par mes émotions et ai du mal à rester objectif(ve).", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "Je m'inquiète des conséquences et essaie d'éviter l'affrontement direct.", points: { 'Anxieux Généralisé': 3 } },
      { text: "Je cherche à analyser la situation de manière logique et à trouver une solution juste.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "Je préfère me retirer et observer la situation de loin.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Je ressens les émotions des autres personnes impliquées et essaie de trouver un terrain d'entente.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Quel est votre plus grand défi ?",
    options: [
      { text: "Gérer mes émotions et ne pas me laisser submerger.", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "Lâcher prise et accepter l'incertitude.", points: { 'Anxieux Généralisé': 3 } },
      { text: "Être moins exigeant(e) envers moi-même et les autres.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "M'ouvrir aux autres et partager mes pensées.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Me protéger de la souffrance des autres sans me couper du monde.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Dans votre temps libre, vous aimez...",
    options: [
      { text: "Exprimer ma créativité à travers l'art, la musique ou l'écriture.", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "Planifier des activités et organiser mon environnement.", points: { 'Anxieux Généralisé': 3 } },
      { text: "Me consacrer à des projets qui demandent de la précision et de la rigueur.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "Lire, réfléchir ou passer du temps dans la nature.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Aider les autres, faire du bénévolat ou écouter leurs histoires.", points: { 'Empathique Absorbant': 3 } }
    ]
  },
  {
    question: "Quelle est votre vision du bonheur ?",
    options: [
      { text: "Vivre des expériences intenses et partager des moments émotionnels forts.", points: { 'Hypersensible Émotionnel': 3 } },
      { text: "Avoir une vie stable, sécurisée et prévisible.", points: { 'Anxieux Généralisé': 3 } },
      { text: "Atteindre mes objectifs et me sentir compétent(e) dans ce que je fais.", points: { 'Perfectionniste Stressé': 3 } },
      { text: "Être en paix avec moi-même et en harmonie avec le monde qui m'entoure.", points: { 'Introverti Réfléchi': 3 } },
      { text: "Contribuer au bien-être des autres et faire une différence dans le monde.", points: { 'Empathique Absorbant': 3 } }
    ]
  }
];

const QuestionnaireModal = ({ isOpen, onClose, onComplete }: QuestionnaireModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [scores, setScores] = useState<{ [key: string]: number }>({
    'Hypersensible Émotionnel': 0,
    'Anxieux Généralisé': 0,
    'Perfectionniste Stressé': 0,
    'Introverti Réfléchi': 0,
    'Empathique Absorbant': 0
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
