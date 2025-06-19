
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
      sensible?: number;
      hyperlucide?: number;
      blesse?: number;
      colerique?: number;
      surefficace?: number;
      vide?: number;
      refoule?: number;
    };
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Dans un conflit, votre première réaction est généralement :",
    answers: [
      { text: "Je me tais et j'évite la confrontation", points: { sensible: 3 } },
      { text: "J'analyse tous les angles du problème", points: { hyperlucide: 3 } },
      { text: "Je me sens trahi(e) si c'est quelqu'un de proche", points: { blesse: 3 } },
      { text: "Je m'emporte rapidement", points: { colerique: 3 } },
      { text: "Je gère efficacement mais ça m'épuise", points: { surefficace: 3 } },
      { text: "Je fais comme si ça ne m'atteignait pas", points: { vide: 2, refoule: 2 } },
      { text: "Je dédramatise avec de l'humour", points: { refoule: 3 } }
    ]
  },
  {
    id: 2,
    text: "Quand vous vous sentez submergé(e) émotionnellement :",
    answers: [
      { text: "Je me replie sur moi-même", points: { sensible: 3 } },
      { text: "Je sur-analyse ce que je ressens", points: { hyperlucide: 3 } },
      { text: "Je ressens une profonde solitude", points: { blesse: 2, vide: 2 } },
      { text: "Je peux exploser de frustration", points: { colerique: 3 } },
      { text: "Je continue à fonctionner en mode pilote automatique", points: { surefficace: 2, vide: 2 } },
      { text: "Je ne ressens plus rien", points: { vide: 3 } },
      { text: "Je fais des blagues pour éviter d'y penser", points: { refoule: 3 } }
    ]
  },
  {
    id: 3,
    text: "Face à vos propres émotions difficiles :",
    answers: [
      { text: "J'ai peur qu'elles soient trop intenses pour les autres", points: { sensible: 3 } },
      { text: "Je les décortique jusqu'à l'épuisement mental", points: { hyperlucide: 3 } },
      { text: "Je me demande si je mérite qu'on s'en soucie", points: { blesse: 3 } },
      { text: "Elles se transforment vite en colère", points: { colerique: 3 } },
      { text: "Je n'ai pas le temps de m'y attarder", points: { surefficace: 3 } },
      { text: "Je ne sais plus vraiment ce que je ressens", points: { vide: 3 } },
      { text: "Je préfère ne pas creuser", points: { refoule: 3 } }
    ]
  },
  {
    id: 4,
    text: "Dans vos relations proches :",
    answers: [
      { text: "J'ai peur de déranger ou d'être trop", points: { sensible: 3 } },
      { text: "J'analyse constamment les comportements des autres", points: { hyperlucide: 2 } },
      { text: "J'ai du mal à faire confiance après avoir été blessé(e)", points: { blesse: 3 } },
      { text: "Je peux être impulsif(ve) et le regretter après", points: { colerique: 3 } },
      { text: "Je donne beaucoup mais je m'épuise", points: { surefficace: 2, blesse: 1 } },
      { text: "J'ai l'impression de jouer un rôle", points: { vide: 3 } },
      { text: "Je garde mes vraies pensées pour moi", points: { refoule: 3 } }
    ]
  },
  {
    id: 5,
    text: "Votre rapport au perfectionnisme :",
    answers: [
      { text: "Je vise la perfection pour éviter les critiques", points: { sensible: 2 } },
      { text: "Je ne peux pas m'empêcher de tout analyser dans les détails", points: { hyperlucide: 3 } },
      { text: "Je me donne à fond pour prouver ma valeur", points: { blesse: 2, surefficace: 1 } },
      { text: "Mon perfectionnisme me rend irritable", points: { colerique: 2, surefficace: 1 } },
      { text: "C'est devenu épuisant mais je ne peux pas m'arrêter", points: { surefficace: 3 } },
      { text: "J'ai perdu la motivation d'être parfait(e)", points: { vide: 3 } },
      { text: "Je fais semblant que ça ne me préoccupe pas", points: { refoule: 2 } }
    ]
  },
  {
    id: 6,
    text: "Quand quelqu'un vous fait une critique :",
    answers: [
      { text: "Je l'encaisse en silence mais ça me bouleverse", points: { sensible: 3 } },
      { text: "Je la décortique pendant des heures", points: { hyperlucide: 3 } },
      { text: "Je me demande si j'ai encore déçu", points: { blesse: 3 } },
      { text: "Je me défends de manière disproportionnée", points: { colerique: 3 } },
      { text: "Je l'intègre immédiatement pour m'améliorer", points: { surefficace: 3 } },
      { text: "Ça ne m'atteint plus vraiment", points: { vide: 3 } },
      { text: "Je réponds par une boutade", points: { refoule: 3 } }
    ]
  },
  {
    id: 7,
    text: "Par rapport à vos besoins personnels :",
    answers: [
      { text: "J'ai du mal à les exprimer clairement", points: { sensible: 3 } },
      { text: "Je les analyse tellement que j'oublie de les satisfaire", points: { hyperlucide: 2 } },
      { text: "Je les mets souvent après ceux des autres", points: { blesse: 2, surefficace: 1 } },
      { text: "Quand ils ne sont pas satisfaits, je m'énerve", points: { colerique: 3 } },
      { text: "Je n'ai plus le temps de savoir ce dont j'ai besoin", points: { surefficace: 3 } },
      { text: "Je ne sais plus vraiment ce que je veux", points: { vide: 3 } },
      { text: "Je fais comme si je n'en avais pas", points: { refoule: 3 } }
    ]
  },
  {
    id: 8,
    text: "Votre façon de gérer le stress :",
    answers: [
      { text: "Je l'intériorise et j'espère que ça passe", points: { sensible: 3 } },
      { text: "Je ressasse tous les scénarios possibles", points: { hyperlucide: 3 } },
      { text: "Je me sens abandonné(e) face à celui-ci", points: { blesse: 3 } },
      { text: "Je deviens irritable et impulsif(ve)", points: { colerique: 3 } },
      { text: "Je redouble d'efforts jusqu'à l'épuisement", points: { surefficace: 3 } },
      { text: "Je me déconnecte émotionnellement", points: { vide: 3 } },
      { text: "Je plaisante pour dédramatiser", points: { refoule: 3 } }
    ]
  },
  {
    id: 9,
    text: "Quand vous repensez à votre passé :",
    answers: [
      { text: "Je regrette souvent de ne pas avoir osé m'exprimer", points: { sensible: 3 } },
      { text: "Je l'analyse pour comprendre qui je suis", points: { hyperlucide: 2 } },
      { text: "Je repense aux moments où j'ai été blessé(e)", points: { blesse: 3 } },
      { text: "Je regrette certains emportements", points: { colerique: 2 } },
      { text: "Je réalise que j'ai toujours couru après quelque chose", points: { surefficace: 3 } },
      { text: "J'ai l'impression d'avoir vécu en pilote automatique", points: { vide: 3 } },
      { text: "Je préfère regarder vers l'avenir", points: { refoule: 3 } }
    ]
  },
  {
    id: 10,
    text: "Ce dont vous avez le plus besoin actuellement :",
    answers: [
      { text: "De courage pour exprimer qui je suis vraiment", points: { sensible: 3 } },
      { text: "De calme mental et de lâcher-prise", points: { hyperlucide: 3 } },
      { text: "De reconstruire ma confiance en moi et aux autres", points: { blesse: 3 } },
      { text: "D'apprendre à canaliser mes émotions", points: { colerique: 3 } },
      { text: "De retrouver un équilibre et du sens", points: { surefficace: 3 } },
      { text: "De me reconnecter à mes vrais désirs", points: { vide: 3 } },
      { text: "D'oser être authentique et vulnérable", points: { refoule: 3 } }
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
    sensible: 0,
    hyperlucide: 0,
    blesse: 0,
    colerique: 0,
    surefficace: 0,
    vide: 0,
    refoule: 0
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
      const dominantProfile = Object.entries(newScores).find(([_, score]) => score === maxScore)?.[0] || 'sensible';
      
      console.log('Scores finaux:', newScores);
      console.log('Profil dominant:', dominantProfile);
      
      // Mapper les profils vers les noms complets
      const profileMapping = {
        sensible: 'Le Sensible Silencieux',
        hyperlucide: 'L\'Hyperlucide',
        blesse: 'Le Blessé Loyal',
        colerique: 'Le Colérique Fatigué',
        surefficace: 'Le Surefficace Usé',
        vide: 'Le Vide Camouflé',
        refoule: 'Le Refoulé Rieur'
      };
      
      const fullProfileName = profileMapping[dominantProfile as keyof typeof profileMapping];
      
      // Save profile to Supabase and localStorage
      await supabaseService.saveUser(fullProfileName, new Date().toISOString());
      localStorage.setItem('arboriaProfile', fullProfileName);
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
          <DialogTitle className="text-center text-lg font-semibold text-emerald-800">
            Découverte de votre profil émotionnel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="w-full bg-emerald-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <Badge variant="outline" className="mx-auto block w-fit border-emerald-400 text-emerald-700">
            Question {currentQuestion + 1} sur {questions.length}
          </Badge>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold text-emerald-800 mb-4 leading-relaxed">
                {questions[currentQuestion].text}
              </h3>
              
              <div className="space-y-3">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 hover:bg-emerald-50 hover:border-emerald-300 transition-colors border-emerald-200"
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
