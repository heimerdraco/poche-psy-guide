
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Star, Lock } from "lucide-react";
import DailyRoutine from "./DailyRoutine";
import MonthlyCheckin from "./MonthlyCheckin";
import ThematicExplorations from "./ThematicExplorations";

interface ContinuedJourneyProps {
  profile: string;
  trialDays: number;
}

const ContinuedJourney = ({ profile, trialDays }: ContinuedJourneyProps) => {
  const [journeyPhase, setJourneyPhase] = useState<'initial' | 'routine' | 'monthly' | 'exploration'>('initial');
  const [daysElapsed, setDaysElapsed] = useState(0);

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    const completedInitial = localStorage.getItem('completedInitialJourney') === 'true';
    
    if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      setDaysElapsed(daysPassed);
      
      // Simuler la fin du parcours initial après 10 jours OU si marqué comme complété
      if (completedInitial || daysPassed >= 10) {
        if (daysPassed <= 30) {
          setJourneyPhase('routine');
        } else {
          setJourneyPhase('monthly');
        }
      }
    }
  }, []);

  const isPremium = trialDays > 0 || localStorage.getItem('unlimitedAccess') === 'true';

  if (journeyPhase === 'initial') {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-xl mb-2 text-gray-800">
            Termine d'abord ton parcours initial
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Complète tes 10 premiers jours pour débloquer la suite de ton accompagnement 🌸
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 Conseil : Pour débloquer rapidement en test, active le mode développeur en tapant 5 fois sur le logo ❤️
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 mb-2">
          <Heart className="w-3 h-3 mr-1" />
          Jour {daysElapsed} de ton parcours
        </Badge>
        <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Ta route continue 🌟
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Ton accompagnement émotionnel évolue avec toi
        </p>
      </div>

      {journeyPhase === 'routine' && (
        <DailyRoutine 
          profile={profile} 
          dayNumber={Math.max(1, daysElapsed - 10)} 
          isPremium={isPremium}
        />
      )}

      {journeyPhase === 'monthly' && (
        <div className="space-y-6">
          <MonthlyCheckin 
            profile={profile} 
            isPremium={isPremium}
          />
          <ThematicExplorations 
            profile={profile} 
            daysElapsed={daysElapsed}
            isPremium={isPremium}
          />
        </div>
      )}
    </div>
  );
};

export default ContinuedJourney;
