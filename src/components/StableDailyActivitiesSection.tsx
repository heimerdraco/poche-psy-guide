
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Sun, Sunset, Moon, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { stableActivitiesService, type StableDailyActivities } from "@/lib/stableActivitiesService";
import { planningService } from "@/lib/planningService";
import { getProfileData } from "@/lib/profilesData";
import { useToast } from "@/hooks/use-toast";
import ActivityDetailModal from "./ActivityDetailModal";
import ActivityCard from "./ActivityCard";
import EnhancedButton from "./EnhancedButton";

interface StableDailyActivitiesSectionProps {
  profile: string;
  profileCreatedAt: string;
  isTrialExpired: boolean;
}

const StableDailyActivitiesSection = ({ 
  profile, 
  profileCreatedAt, 
  isTrialExpired 
}: StableDailyActivitiesSectionProps) => {
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const [activities, setActivities] = useState<StableDailyActivities>({
    morning: null,
    afternoon: null,
    evening: null
  });
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [dayMemory, setDayMemory] = useState<any>(null);

  const profileData = getProfileData(profile);
  const actualCurrentDay = planningService.getCurrentDay(profileCreatedAt);

  useEffect(() => {
    // Navigation intelligente vers le jour actuel
    setCurrentDay(actualCurrentDay);
  }, [actualCurrentDay]);

  useEffect(() => {
    loadDayData();
  }, [profile, currentDay]);

  const loadDayData = async () => {
    setLoading(true);
    try {
      console.log('Chargement données jour:', currentDay);
      
      // Charger les activités stables pour ce jour
      const dailyActivities = await stableActivitiesService.getStableDailyActivities(profile, currentDay);
      console.log('Activités récupérées:', dailyActivities);
      setActivities(dailyActivities);

      // Charger le souvenir du jour
      const memory = await planningService.getDayMemory(currentDay);
      setDayMemory(memory);

      // Vérifier les activités complétées
      const completed = new Set<string>();
      if (memory) {
        if (memory.morning_completed && dailyActivities.morning) {
          completed.add(dailyActivities.morning.id);
        }
        if (memory.afternoon_completed && dailyActivities.afternoon) {
          completed.add(dailyActivities.afternoon.id);
        }
        if (memory.evening_completed && dailyActivities.evening) {
          completed.add(dailyActivities.evening.id);
        }
      }
      setCompletedActivities(completed);
      
    } catch (error) {
      console.error('Erreur chargement jour:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du jour.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleActivityComplete = async (activityId: string, notes?: string) => {
    try {
      // Déterminer le type d'activité
      let activityType: 'morning' | 'afternoon' | 'evening' = 'morning';
      if (activities.afternoon?.id === activityId) activityType = 'afternoon';
      else if (activities.evening?.id === activityId) activityType = 'evening';

      const success = await stableActivitiesService.completeStableActivity(
        profile, 
        currentDay, 
        activityType, 
        activityId, 
        notes
      );
      
      if (success) {
        setCompletedActivities(prev => new Set([...prev, activityId]));
        await loadDayData(); // Recharger les données
        
        toast({
          title: "🎉 Activité terminée !",
          description: "Votre progression a été sauvegardée !",
        });
      }
    } catch (error) {
      console.error('Erreur completion activité:', error);
    }
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentDay > 1) {
      setCurrentDay(currentDay - 1);
    } else if (direction === 'next' && currentDay < 365) {
      setCurrentDay(currentDay + 1);
    }
  };

  const getTimeIcon = (type: string) => {
    switch (type) {
      case 'morning': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'afternoon': return <Sunset className="w-5 h-5 text-orange-500" />;
      case 'evening': return <Moon className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getTimeLabel = (type: string) => {
    switch (type) {
      case 'morning': return 'Matin';
      case 'afternoon': return 'Après-midi';
      case 'evening': return 'Soir';
      default: return type;
    }
  };

  const isActivityLocked = () => {
    return isTrialExpired || currentDay > actualCurrentDay;
  };

  const handleLockedClick = () => {
    if (currentDay > actualCurrentDay) {
      toast({
        title: "Jour futur",
        description: "Les jours futurs sont verrouillés. Revenez demain !",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Contenu Premium",
        description: "Passez à Arboria+ pour débloquer cette activité.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const isDayCompleted = dayMemory?.completed || false;
  const isPastDay = currentDay < actualCurrentDay;
  const isFutureDay = currentDay > actualCurrentDay;
  const isToday = currentDay === actualCurrentDay;

  return (
    <>
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-emerald-800">
                Jour {currentDay} / 365
              </CardTitle>
            </div>
            
            <div className="flex items-center gap-2">
              <EnhancedButton
                onClick={() => navigateDay('prev')}
                disabled={currentDay <= 1}
                size="sm"
                variant="outline"
                soundType="click"
              >
                <ChevronLeft className="w-4 h-4" />
              </EnhancedButton>
              
              <EnhancedButton
                onClick={() => setCurrentDay(actualCurrentDay)}
                size="sm"
                variant={isToday ? "default" : "outline"}
                soundType="click"
                className={isToday ? "bg-emerald-600 text-white" : ""}
              >
                Aujourd'hui
              </EnhancedButton>
              
              <EnhancedButton
                onClick={() => navigateDay('next')}
                disabled={currentDay >= 365}
                size="sm"
                variant="outline"
                soundType="click"
              >
                <ChevronRight className="w-4 h-4" />
              </EnhancedButton>
            </div>
          </div>
          
          {/* Status du jour */}
          <div className="text-sm">
            {isPastDay && (
              <div className="text-gray-600 bg-gray-50 p-2 rounded-lg">
                📚 Souvenir • {isDayCompleted ? '✅ Jour complété' : '⏸️ Jour incomplet'}
                {dayMemory && (dayMemory.morning_notes || dayMemory.afternoon_notes || dayMemory.evening_notes) && (
                  <div className="mt-1 text-xs text-gray-500">
                    📝 Contient des notes personnelles
                  </div>
                )}
              </div>
            )}
            {isToday && (
              <div className="text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                🌟 Aujourd'hui • Vos activités vous attendent
              </div>
            )}
            {isFutureDay && (
              <div className="text-orange-600 bg-orange-50 p-2 rounded-lg">
                🔒 Jour futur • Revenez demain pour débloquer
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <ActivityCard
            activity={activities.morning}
            timeType="morning"
            timeIcon={getTimeIcon('morning')}
            timeLabel={getTimeLabel('morning')}
            isCompleted={activities.morning ? completedActivities.has(activities.morning.id) : false}
            isLocked={isActivityLocked()}
            profileColor={profileData.color}
            onActivityClick={setSelectedActivity}
            onLockedClick={handleLockedClick}
          />
          
          <ActivityCard
            activity={activities.afternoon}
            timeType="afternoon"
            timeIcon={getTimeIcon('afternoon')}
            timeLabel={getTimeLabel('afternoon')}
            isCompleted={activities.afternoon ? completedActivities.has(activities.afternoon.id) : false}
            isLocked={isActivityLocked()}
            profileColor={profileData.color}
            onActivityClick={setSelectedActivity}
            onLockedClick={handleLockedClick}
          />
          
          <ActivityCard
            activity={activities.evening}
            timeType="evening"
            timeIcon={getTimeIcon('evening')}
            timeLabel={getTimeLabel('evening')}
            isCompleted={activities.evening ? completedActivities.has(activities.evening.id) : false}
            isLocked={isActivityLocked()}
            profileColor={profileData.color}
            onActivityClick={setSelectedActivity}
            onLockedClick={handleLockedClick}
          />
        </CardContent>
      </Card>

      <ActivityDetailModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onComplete={handleActivityComplete}
        profileColor={profileData.color}
        isCompleted={selectedActivity ? completedActivities.has(selectedActivity.id) : false}
      />
    </>
  );
};

export default StableDailyActivitiesSection;
