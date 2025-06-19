
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Calendar, Heart, Lock, Sparkles, Play } from "lucide-react";
import { supabaseService } from "@/lib/supabase";
import EnhancedButton from "./EnhancedButton";
import { getProfileData } from "@/lib/profilesData";
import ActivityManager from "./activities/ActivityManager";

interface EmotionalJourneyProps {
  profile: string;
  trialDays: number;
}

const EmotionalJourney = ({ profile, trialDays }: EmotionalJourneyProps) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeActivity, setActiveActivity] = useState<any>(null);

  const profileData = getProfileData(profile);
  const isPremium = trialDays > 0 || localStorage.getItem('arboriaPlus') === 'true';
  const isLockedDay = (dayNumber: number) => dayNumber > 3 && !isPremium;

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      setCurrentDay(Math.min(daysPassed + 1, 7));
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

  const handleUpgrade = () => {
    const upgradeEvent = new CustomEvent('openSubscription');
    window.dispatchEvent(upgradeEvent);
  };

  const handleDayClick = (dayNumber: number) => {
    setSelectedDay(dayNumber);
  };

  const handleActivityStart = (dayNumber: number, activityIndex: number) => {
    const dayActivities = getDayActivities(dayNumber);
    if (dayActivities && dayActivities[activityIndex]) {
      const activity = {
        ...dayActivities[activityIndex],
        id: `day-${dayNumber}-activity-${activityIndex}`
      };
      setActiveActivity(activity);
    }
  };

  const handleActivityComplete = (dayNumber: number, activityIndex: number) => {
    const activityId = `day-${dayNumber}-activity-${activityIndex}`;
    if (!completedActivities.includes(activityId)) {
      const newCompleted = [...completedActivities, activityId];
      setCompletedActivities(newCompleted);
      localStorage.setItem('completedActivities', JSON.stringify(newCompleted));
    }
    setActiveActivity(null);
  };

  const handleActivityBack = () => {
    setActiveActivity(null);
  };

  const getDayActivities = (dayNumber: number) => {
    if (dayNumber <= 3 && profileData.activities[dayNumber - 1]) {
      return profileData.activities[dayNumber - 1];
    }
    return [];
  };

  const isDayCompleted = (dayNumber: number) => {
    const dayActivities = getDayActivities(dayNumber);
    return dayActivities.every((_, index) => 
      completedActivities.includes(`day-${dayNumber}-activity-${index}`)
    );
  };

  // Si une activité est active, afficher l'ActivityManager
  if (activeActivity) {
    return (
      <ActivityManager
        activity={activeActivity}
        onComplete={() => {
          const [, dayStr, , activityStr] = activeActivity.id.split('-');
          handleActivityComplete(parseInt(dayStr), parseInt(activityStr));
        }}
        onBack={handleActivityBack}
      />
    );
  }

  // Génération des jours (affichage jusqu'à 7 jours)
  const days = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-slide-in-gentle">
      {/* Profile identification */}
      <div className="text-center mb-6">
        <Badge className={`bg-gradient-to-r ${profileData.color} text-white mb-3 px-4 py-2`}>
          <Heart className="w-3 h-3 mr-1" />
          Jour {currentDay} de votre parcours
        </Badge>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 mb-4">
          <h2 className="text-xl font-bold text-emerald-800 mb-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            Vous êtes {profileData.name}
          </h2>
          <p className="text-emerald-600 text-sm mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {profileData.description}
          </p>
          <p className="text-emerald-700 text-sm leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {profileData.explanation}
          </p>
        </div>
      </div>

      {/* Days navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((dayNumber) => {
          const isCompleted = isDayCompleted(dayNumber);
          const isLocked = isLockedDay(dayNumber);
          const isSelected = dayNumber === selectedDay;
          const hasActivities = getDayActivities(dayNumber).length > 0;

          return (
            <EnhancedButton
              key={dayNumber}
              onClick={() => handleDayClick(dayNumber)}
              soundType="click"
              animationType="scale"
              className={`min-w-[65px] h-14 rounded-xl transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : isCompleted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : isLocked
                      ? 'bg-gray-600 text-white opacity-90 hover:bg-gray-700 border-2 border-gray-500'
                      : hasActivities
                        ? 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                        : 'bg-gray-50 text-gray-400 border border-gray-200'
              }`}
              disabled={isLocked}
            >
              <div className="text-center">
                <div className={`text-xs font-semibold ${isLocked ? 'text-gray-200' : ''}`}>
                  Jour
                </div>
                <div className={`text-xl font-bold ${isLocked ? 'text-white' : ''}`}>
                  {dayNumber}
                </div>
                {isCompleted && <CheckCircle className="w-3 h-3 mx-auto mt-1" />}
                {isLocked && <Lock className="w-3 h-3 mx-auto mt-1 text-gray-200" />}
              </div>
            </EnhancedButton>
          );
        })}
      </div>

      {/* Content area */}
      {isLockedDay(selectedDay) ? (
        // Locked content with blur background
        <div className="relative min-h-[400px]">
          {/* Blurred background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 backdrop-blur-md rounded-lg"></div>
          
          {/* Lock banner */}
          <div className="relative z-10 flex items-center justify-center min-h-[400px]">
            <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-emerald-600" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-emerald-800">
                    🔒 Vous avez atteint la limite gratuite de 3 jours
                  </h3>
                  <p className="text-emerald-600 leading-relaxed">
                    Passez en Arboria+ pour débloquer la suite de votre parcours personnalisé.
                  </p>
                </div>

                <EnhancedButton
                  onClick={handleUpgrade}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  soundType="success"
                  animationType="glow"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  🌿 Débloquer maintenant
                </EnhancedButton>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Activities for unlocked days
        <div className="space-y-4">
          {getDayActivities(selectedDay).length > 0 ? (
            getDayActivities(selectedDay).map((activity, index) => {
              const activityId = `day-${selectedDay}-activity-${index}`;
              const isCompleted = completedActivities.includes(activityId);

              return (
                <Card key={index} className={`shadow-lg border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'border-green-200 bg-green-50/50' 
                    : `border-emerald-200 bg-gradient-to-r ${profileData.color.replace('from-', 'from-').replace('to-', 'to-')}/10`
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? 'bg-green-100 text-green-600'
                            : `bg-gradient-to-r ${profileData.color} text-white`
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Play className="w-4 h-4 ml-0.5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-emerald-800">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-emerald-600">{activity.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-600">
                        {activity.duration}
                      </Badge>
                    </div>

                    <EnhancedButton
                      onClick={() => isCompleted ? null : handleActivityStart(selectedDay, index)}
                      className={`w-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-default'
                          : `bg-gradient-to-r ${profileData.color} hover:shadow-lg text-white`
                      }`}
                      soundType={isCompleted ? "calm" : "success"}
                      animationType={isCompleted ? "scale" : "glow"}
                      disabled={isCompleted}
                    >
                      {isCompleted ? '✅ Activité terminée' : '🌟 Commencer l\'activité'}
                    </EnhancedButton>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="shadow-lg border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-semibold text-emerald-800 mb-2">
                  Jour {selectedDay}
                </h3>
                <p className="text-emerald-600">
                  {selectedDay > 3 
                    ? "Contenu Arboria+ à débloquer"
                    : "Activités bientôt disponibles"
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Trial status */}
      {trialDays > 0 && (
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 animate-slide-in-gentle">
          <CardContent className="p-4 text-center">
            <p className="text-emerald-700 font-medium">
              🌱 Période d'essai : {trialDays} jour{trialDays > 1 ? 's' : ''} restant{trialDays > 1 ? 's' : ''}
            </p>
            <p className="text-sm text-emerald-600 mt-1">
              Profitez de votre parcours gratuit !
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmotionalJourney;
