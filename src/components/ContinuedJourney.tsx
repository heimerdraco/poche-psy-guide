
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
    
    if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      setDaysElapsed(daysPassed);
      
      // Progression automatique basée sur les jours écoulés
      if (daysPassed >= 45) {
        // Après 45 jours : explorations thématiques avancées
        setJourneyPhase('exploration');
      } else if (daysPassed >= 20) {
        // Après 20 jours : check-ins mensuels + explorations
        setJourneyPhase('monthly');
      } else if (daysPassed >= 7) {
        // Après 7 jours : routine quotidienne
        setJourneyPhase('routine');
        // Marquer automatiquement le parcours initial comme complété
        localStorage.setItem('completedInitialJourney', 'true');
      } else {
        // 0-7 jours : encore en parcours initial
        setJourneyPhase('initial');
      }
    }
  }, []);

  const isPremium = trialDays > 0 || localStorage.getItem('unlimitedAccess') === 'true';

  // Phase initiale : encourager à terminer le parcours de base
  if (journeyPhase === 'initial') {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-xl mb-2 text-gray-800">
            Ton parcours continue dans {Math.max(0, 7 - daysElapsed)} jour{Math.max(0, 7 - daysElapsed) > 1 ? 's' : ''}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Continue ton parcours quotidien, de nouvelles activités se débloquent bientôt 🌟
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 Jour {daysElapsed + 1}/7 du parcours initial
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
          {journeyPhase === 'routine' && 'Ta routine quotidienne 🌱'}
          {journeyPhase === 'monthly' && 'Évolution mensuelle 🌸'}
          {journeyPhase === 'exploration' && 'Explorations approfondies 🌟'}
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          {journeyPhase === 'routine' && 'Renforce tes nouvelles habitudes'}
          {journeyPhase === 'monthly' && 'Suivi personnalisé et explorations'}
          {journeyPhase === 'exploration' && 'Parcours thématiques spécialisés'}
        </p>
      </div>

      {journeyPhase === 'routine' && (
        <DailyRoutine 
          profile={profile} 
          dayNumber={Math.max(1, daysElapsed - 7)} 
          isPremium={isPremium}
        />
      )}

      {(journeyPhase === 'monthly' || journeyPhase === 'exploration') && (
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

      {/* Aperçu des prochaines étapes */}
      {journeyPhase === 'routine' && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-700 mb-1">
              <strong>Prochaine étape :</strong> Check-ins mensuels
            </p>
            <p className="text-xs text-gray-600">
              Se débloque dans {Math.max(0, 20 - daysElapsed)} jours
            </p>
          </CardContent>
        </Card>
      )}

      {journeyPhase === 'monthly' && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-700 mb-1">
              <strong>Prochaine étape :</strong> Explorations approfondies
            </p>
            <p className="text-xs text-gray-600">
              Se débloque dans {Math.max(0, 45 - daysElapsed)} jours
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContinuedJourney;
