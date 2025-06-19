
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Calendar, Heart, Lock, Sparkles } from "lucide-react";
import { supabaseService } from "@/lib/supabase";
import EnhancedButton from "./EnhancedButton";
import LockedActivityOverlay from "./LockedActivityOverlay";

interface EmotionalJourneyProps {
  profile: string;
  trialDays: number;
}

const EmotionalJourney = ({ profile, trialDays }: EmotionalJourneyProps) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [journeyData, setJourneyData] = useState<any>(null);

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      setCurrentDay(Math.min(daysPassed + 1, 10));
    }

    const savedActivities = localStorage.getItem('completedActivities');
    if (savedActivities) {
      setCompletedActivities(JSON.parse(savedActivities));
    }

    loadJourneyData();
  }, [profile]);

  const loadJourneyData = async () => {
    try {
      await supabaseService.saveJourneyProgress(profile, currentDay, completedActivities);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  const isPremium = trialDays > 0 || localStorage.getItem('unlimitedAccess') === 'true';
  const isActivityLocked = (dayNumber: number) => dayNumber > 3 && !isPremium;

  const handleUpgrade = () => {
    const upgradeEvent = new CustomEvent('openSubscription');
    window.dispatchEvent(upgradeEvent);
  };

  const activities = [
    {
      day: 1,
      title: "Comprendre ton profil",
      description: "Découvre les nuances de ton profil émotionnel",
      type: "reflection",
      duration: "10 min"
    },
    {
      day: 2,
      title: "Première technique de soulagement",
      description: "Apprends une méthode adaptée à tes besoins",
      type: "exercise",
      duration: "15 min"
    },
    {
      day: 3,
      title: "Mise en pratique",
      description: "Intègre ta nouvelle technique dans ton quotidien",
      type: "practice",
      duration: "20 min"
    },
    {
      day: 4,
      title: "Approfondissement",
      description: "Explore des stratégies plus avancées",
      type: "advanced",
      duration: "25 min"
    },
    {
      day: 5,
      title: "Consolidation",
      description: "Renforce tes nouveaux réflexes",
      type: "consolidation",
      duration: "20 min"
    },
    {
      day: 6,
      title: "Évaluation des progrès",
      description: "Mesure ton évolution depuis le début",
      type: "evaluation",
      duration: "15 min"
    },
    {
      day: 7,
      title: "Préparation semaine 2",
      description: "Prépare la suite de ton parcours",
      type: "preparation",
      duration: "30 min"
    }
  ];

  return (
    <div className="space-y-6 animate-slide-in-gentle">
      <div className="text-center mb-6">
        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 mb-2">
          <Heart className="w-3 h-3 mr-1" />
          Jour {currentDay} de ton parcours
        </Badge>
        <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          Ton parcours personnalisé 🌱
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Profil détecté : <strong>{profile}</strong>
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const isCompleted = completedActivities.includes(`day-${activity.day}`);
          const isLocked = isActivityLocked(activity.day);
          const isCurrentDay = activity.day === currentDay;

          return (
            <div key={activity.day} className="relative">
              <Card 
                className={`transition-all duration-500 ${
                  isLocked 
                    ? 'opacity-50 blur-[2px] saturate-50 animate-pulse-gentle' 
                    : isCurrentDay 
                      ? 'shadow-lg border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 animate-glow' 
                      : 'shadow-md hover:shadow-lg hover:scale-[1.02]'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-100 text-green-600 animate-bounce-gentle'
                          : isCurrentDay 
                            ? 'bg-purple-100 text-purple-600 animate-pulse' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Jour {activity.day} : {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.duration}
                    </Badge>
                  </div>

                  {!isLocked && (
                    <EnhancedButton
                      className={`w-full transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl'
                      }`}
                      soundType={isCompleted ? "calm" : "success"}
                      animationType={isCompleted ? "scale" : "glow"}
                    >
                      {isCompleted ? '✅ Activité terminée' : '🌟 Commencer l\'activité'}
                    </EnhancedButton>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced locked overlay */}
              {isLocked && <LockedActivityOverlay onUpgrade={handleUpgrade} />}
            </div>
          );
        })}
      </div>

      {/* Trial status */}
      {trialDays > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 animate-slide-in-gentle">
          <CardContent className="p-4 text-center">
            <p className="text-green-700 font-medium">
              🎉 Période d'essai : {trialDays} jour{trialDays > 1 ? 's' : ''} restant{trialDays > 1 ? 's' : ''}
            </p>
            <p className="text-sm text-green-600 mt-1">
              Profitez de votre parcours gratuit !
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmotionalJourney;
