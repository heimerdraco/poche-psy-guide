
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Calendar, Heart, Lock, Sparkles, Play, BookOpen, Headphones, PenTool } from "lucide-react";
import { supabaseService } from "@/lib/supabase";
import EnhancedButton from "./EnhancedButton";
import { getProfileData } from "@/lib/profilesData";
import ActivityManager from "./activities/ActivityManager";
import { useToast } from "@/hooks/use-toast";
import DailyActivitiesSection from "./DailyActivitiesSection";

interface EmotionalJourneyProps {
  profile: string;
  trialDays: number;
}

const EmotionalJourney = ({ profile, trialDays }: EmotionalJourneyProps) => {
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [newUnlockedDay, setNewUnlockedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const profileData = getProfileData(profile);
  const isPremium = trialDays > 0 || localStorage.getItem('arboriaPlus') === 'true';
  const isLockedDay = (dayNumber: number) => dayNumber > 3 && !isPremium;
  const isTrialExpired = trialDays <= 0 && !localStorage.getItem('arboriaPlus');

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

  useEffect(() => {
    loadJourneyProgress();
  }, [profile]);

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      const newCurrentDay = Math.min(daysPassed + 1, 7);
      
      if (newCurrentDay > currentDay) {
        setNewUnlockedDay(newCurrentDay);
        setTimeout(() => setNewUnlockedDay(null), 2000);
      }
      
      setCurrentDay(newCurrentDay);
    }
  }, [currentDay]);

  const loadJourneyProgress = async () => {
    setLoading(true);
    try {
      const userData = await supabaseService.getUserData();
      
      if (userData.journeyProgress) {
        setCurrentDay(userData.journeyProgress.day_number || 1);
      } else {
        // Initialiser la progression si elle n'existe pas
        await supabaseService.saveJourneyProgress(profile, 1, []);
      }
    } catch (error) {
      console.error('Erreur chargement progression:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = () => {
    const upgradeEvent = new CustomEvent('openSubscription');
    window.dispatchEvent(upgradeEvent);
  };

  const handleDayClick = (dayNumber: number) => {
    setSelectedDay(dayNumber);
  };

  // Génération des jours (affichage jusqu'à 7 jours)
  const days = Array.from({ length: 7 }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin w-6 h-6 border-2 border-emerald-300 border-t-emerald-600 rounded-full"></div>
        <span className="ml-2 text-gray-600">Chargement de votre parcours...</span>
      </div>
    );
  }

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
          {profileData.explanation && (
            <p className="text-emerald-700 text-sm leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {profileData.explanation}
            </p>
          )}
        </div>
      </div>

      {/* Days navigation with improved number visibility */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-1">
        {days.map((dayNumber) => {
          const isLocked = isLockedDay(dayNumber);
          const isSelected = dayNumber === selectedDay;
          const isNewUnlocked = newUnlockedDay === dayNumber;

          return (
            <EnhancedButton
              key={dayNumber}
              onClick={() => handleDayClick(dayNumber)}
              soundType="click"
              animationType="scale"
              className={`min-w-[85px] h-24 rounded-2xl transition-all duration-500 transform ${
                isNewUnlocked ? 'animate-bounce-gentle scale-105' : ''
              } ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-700 to-teal-700 text-white shadow-xl scale-105 border-2 border-emerald-300'
                  : isLocked
                    ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-white opacity-95 hover:from-gray-600 hover:to-gray-800 border-2 border-gray-400 shadow-lg'
                    : 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-900 hover:from-emerald-200 hover:to-emerald-300 border-2 border-emerald-300 shadow-md hover:shadow-lg'
              }`}
              disabled={isLocked}
            >
              <div className="text-center">
                <div className={`text-xs font-bold mb-1 tracking-wide ${
                  isLocked ? 'text-gray-100' : 
                  isSelected ? 'text-emerald-100' : 
                  'text-emerald-800'
                }`}>
                  JOUR
                </div>
                <div className={`text-4xl font-black mb-1 leading-none ${
                  isLocked ? 'text-white drop-shadow-lg' : 
                  isSelected ? 'text-white drop-shadow-lg' : 
                  'text-emerald-900 drop-shadow-sm'
                }`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
                  {dayNumber}
                </div>
                <div className="flex justify-center items-center h-5">
                  {isLocked && <Lock className="w-5 h-5 text-gray-100 drop-shadow-md" />}
                  {isNewUnlocked && <Sparkles className="w-4 h-4 text-emerald-200 animate-twinkle drop-shadow-md" />}
                </div>
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
        // Activities for unlocked days - Use the new DailyActivitiesSection component
        <DailyActivitiesSection 
          profile={profile} 
          dayNumber={selectedDay} 
          isTrialExpired={isTrialExpired}
        />
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
