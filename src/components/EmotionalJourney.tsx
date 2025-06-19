import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Calendar, Heart, Lock, Sparkles, Play, BookOpen, Headphones, PenTool } from "lucide-react";
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
  const [newUnlockedDay, setNewUnlockedDay] = useState<number | null>(null);

  const profileData = getProfileData(profile);
  const isPremium = trialDays > 0 || localStorage.getItem('arboriaPlus') === 'true';
  const isLockedDay = (dayNumber: number) => dayNumber > 3 && !isPremium;

  // Phrases bienveillantes quotidiennes
  const dailyMessages = [
    "Aujourd'hui, prends soin de toi un peu plus qu'hier 🌱",
    "Ton chemin compte, chaque pas est important 🌿",
    "Respire profondément, tu es exactement où tu dois être 🍃",
    "Ta croissance intérieure mérite d'être célébrée 🌳",
    "Chaque jour est une nouvelle opportunité de fleurir 🌸",
    "Ta sensibilité est une force, pas une faiblesse 💚",
    "Prends le temps d'écouter ton cœur aujourd'hui 💛"
  ];

  const getTodayMessage = () => {
    const today = new Date().getDate();
    return dailyMessages[today % dailyMessages.length];
  };

  const getActivityIcon = (activity: any) => {
    switch (activity.type) {
      case 'audio':
        return <Headphones className="w-4 h-4 text-emerald-600" />;
      case 'interactive':
        return <PenTool className="w-4 h-4 text-emerald-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
    }
  };

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      const newCurrentDay = Math.min(daysPassed + 1, 7);
      
      // Animation pour nouveau jour débloqué
      if (newCurrentDay > currentDay) {
        setNewUnlockedDay(newCurrentDay);
        setTimeout(() => setNewUnlockedDay(null), 2000);
      }
      
      setCurrentDay(newCurrentDay);
    }

    const savedActivities = localStorage.getItem('completedActivities');
    if (savedActivities) {
      setCompletedActivities(JSON.parse(savedActivities));
    }

    loadJourneyData();
  }, [profile, currentDay]);

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
      <div className="animate-slide-in-gentle">
        <ActivityManager
          activity={activeActivity}
          onComplete={() => {
            const [, dayStr, , activityStr] = activeActivity.id.split('-');
            handleActivityComplete(parseInt(dayStr), parseInt(activityStr));
          }}
          onBack={handleActivityBack}
        />
      </div>
    );
  }

  // Génération des jours (affichage jusqu'à 7 jours)
  const days = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-slide-in-gentle">
      {/* Profile identification avec message bienveillant */}
      <div className="text-center mb-6">
        <Badge className={`bg-gradient-to-r ${profileData.color} text-white mb-3 px-4 py-2 animate-pulse-gentle`}>
          <Heart className="w-3 h-3 mr-1" />
          Jour {currentDay} de votre parcours
        </Badge>
        
        {/* Message bienveillant quotidien */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 mb-4 border border-emerald-100 animate-fade-in">
          <p className="text-emerald-700 text-sm font-medium italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {getTodayMessage()}
          </p>
        </div>
        
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 mb-4 shadow-sm">
          <h2 className="text-xl font-bold text-emerald-800 mb-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            Vous êtes {profileData.name}
          </h2>
          <p className="text-emerald-600 text-sm mb-2 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {profileData.description}
          </p>
          <p className="text-emerald-700 text-sm leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
            {profileData.explanation}
          </p>
        </div>
      </div>

      {/* Days navigation with improved styling */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-1">
        {days.map((dayNumber) => {
          const isCompleted = isDayCompleted(dayNumber);
          const isLocked = isLockedDay(dayNumber);
          const isSelected = dayNumber === selectedDay;
          const hasActivities = getDayActivities(dayNumber).length > 0;
          const isNewUnlocked = newUnlockedDay === dayNumber;

          return (
            <EnhancedButton
              key={dayNumber}
              onClick={() => handleDayClick(dayNumber)}
              soundType="click"
              animationType="scale"
              className={`min-w-[70px] h-16 rounded-xl transition-all duration-500 transform ${
                isNewUnlocked ? 'animate-bounce-gentle scale-105' : ''
              } ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                  : isCompleted
                    ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 hover:from-green-200 hover:to-green-300 shadow-md'
                    : isLocked
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white opacity-95 hover:from-gray-600 hover:to-gray-700 border-2 border-gray-600 shadow-md'
                      : hasActivities
                        ? 'bg-gradient-to-r from-white to-emerald-50 text-emerald-800 hover:from-emerald-50 hover:to-emerald-100 border-2 border-emerald-200 shadow-md hover:shadow-lg'
                        : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-500 border-2 border-gray-200 shadow-sm'
              }`}
              disabled={isLocked}
            >
              <div className="text-center">
                <div className={`text-xs font-bold mb-1 ${
                  isLocked ? 'text-gray-200' : 
                  isSelected ? 'text-white' : 
                  isCompleted ? 'text-green-700' : 
                  hasActivities ? 'text-emerald-700' : 'text-gray-400'
                }`}>
                  Jour
                </div>
                <div className={`text-2xl font-bold mb-1 ${
                  isLocked ? 'text-white' : 
                  isSelected ? 'text-white' : 
                  isCompleted ? 'text-green-800' : 
                  hasActivities ? 'text-emerald-800' : 'text-gray-500'
                }`}>
                  {dayNumber}
                </div>
                {isCompleted && <CheckCircle className="w-4 h-4 mx-auto text-green-700" />}
                {isLocked && <Lock className="w-4 h-4 mx-auto text-gray-300" />}
                {isNewUnlocked && <Sparkles className="w-3 h-3 mx-auto text-emerald-400 animate-twinkle" />}
              </div>
            </EnhancedButton>
          );
        })}
      </div>

      {/* Content area */}
      {isLockedDay(selectedDay) ? (
        // Locked content with enhanced blur background
        <div className="relative min-h-[400px]">
          {/* Enhanced blurred background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 to-teal-50/40 backdrop-blur-lg rounded-2xl border border-emerald-100/50"></div>
          
          {/* Lock banner with improved styling */}
          <div className="relative z-10 flex items-center justify-center min-h-[400px] p-6">
            <Card className="max-w-md mx-auto shadow-2xl border-0 bg-white/98 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto animate-pulse-gentle">
                  <Lock className="w-10 h-10 text-emerald-600" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-emerald-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    🔒 Vous avez atteint la limite gratuite
                  </h3>
                  <p className="text-emerald-600 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Passez en Arboria+ pour débloquer la suite de votre parcours personnalisé et continuer votre croissance intérieure.
                  </p>
                </div>

                <EnhancedButton
                  onClick={handleUpgrade}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  soundType="success"
                  animationType="glow"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  🌿 Débloquer maintenant
                </EnhancedButton>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Activities for unlocked days with enhanced styling
        <div className="space-y-5">
          {getDayActivities(selectedDay).length > 0 ? (
            getDayActivities(selectedDay).map((activity, index) => {
              const activityId = `day-${selectedDay}-activity-${index}`;
              const isCompleted = completedActivities.includes(activityId);

              return (
                <Card key={index} className={`shadow-lg border-2 transition-all duration-500 hover:shadow-xl ${
                  isCompleted 
                    ? 'border-green-200 bg-gradient-to-r from-green-50/80 to-green-100/60' 
                    : `border-emerald-200 bg-gradient-to-r ${profileData.color.replace('from-', 'from-').replace('to-', 'to-')}/15 hover:${profileData.color.replace('from-', 'from-').replace('to-', 'to-')}/25`
                } rounded-2xl animate-slide-in-gentle`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700'
                            : `bg-gradient-to-r ${profileData.color} text-white shadow-md`
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            getActivityIcon(activity)
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {!isCompleted && getActivityIcon(activity)}
                            <h3 className="font-bold text-emerald-800 text-lg" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                              {activity.title}
                            </h3>
                          </div>
                          <p className="text-sm text-emerald-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                            {activity.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700 bg-emerald-50 px-3 py-1">
                        {activity.duration}
                      </Badge>
                    </div>

                    <EnhancedButton
                      onClick={() => isCompleted ? null : handleActivityStart(selectedDay, index)}
                      className={`w-full transition-all duration-300 transform hover:scale-[1.02] py-4 text-base font-semibold rounded-xl ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 hover:from-green-200 hover:to-green-300 cursor-default shadow-sm'
                          : `bg-gradient-to-r ${profileData.color} hover:shadow-xl text-white shadow-lg`
                      }`}
                      soundType={isCompleted ? "calm" : "success"}
                      animationType={isCompleted ? "scale" : "glow"}
                      disabled={isCompleted}
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                    >
                      {isCompleted ? '✅ Activité terminée' : `🌟 Commencer l'activité`}
                    </EnhancedButton>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="shadow-lg border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
              <CardContent className="p-8 text-center">
                <Calendar className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-float" />
                <h3 className="font-bold text-emerald-800 mb-2 text-lg" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  Jour {selectedDay}
                </h3>
                <p className="text-emerald-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
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

      {/* Trial status avec amélioration visuelle */}
      {trialDays > 0 && (
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 animate-slide-in-gentle shadow-sm rounded-2xl">
          <CardContent className="p-4 text-center">
            <p className="text-emerald-800 font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
              🌱 Période d'essai : {trialDays} jour{trialDays > 1 ? 's' : ''} restant{trialDays > 1 ? 's' : ''}
            </p>
            <p className="text-sm text-emerald-600 mt-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Profitez de votre parcours gratuit !
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmotionalJourney;
