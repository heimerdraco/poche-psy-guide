
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Sun, Sunset, Moon } from "lucide-react";
import { activitiesService, type DailyActivities } from "@/lib/activitiesService";
import { getProfileData } from "@/lib/profilesData";
import { useToast } from "@/hooks/use-toast";
import ActivityDetailModal from "./ActivityDetailModal";
import ActivityCard from "./ActivityCard";

interface DailyActivitiesSectionProps {
  profile: string;
  dayNumber: number;
  isTrialExpired: boolean;
}

const DailyActivitiesSection = ({ profile, dayNumber, isTrialExpired }: DailyActivitiesSectionProps) => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<DailyActivities>({
    morning: null,
    afternoon: null,
    evening: null
  });
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const profileData = getProfileData(profile);

  useEffect(() => {
    loadDailyActivities();
  }, [profile, dayNumber]);

  const loadDailyActivities = async () => {
    setLoading(true);
    try {
      console.log('Chargement activités pour profil:', profile);
      
      const dailyActivities = await activitiesService.getDailyActivities(profile, dayNumber);
      console.log('Activités récupérées:', dailyActivities);
      setActivities(dailyActivities);

      // Vérifier les activités complétées
      const completed = new Set<string>();
      if (dailyActivities.morning) {
        const isCompleted = await activitiesService.isActivityCompleted(dailyActivities.morning.id);
        if (isCompleted) completed.add(dailyActivities.morning.id);
      }
      if (dailyActivities.afternoon) {
        const isCompleted = await activitiesService.isActivityCompleted(dailyActivities.afternoon.id);
        if (isCompleted) completed.add(dailyActivities.afternoon.id);
      }
      if (dailyActivities.evening) {
        const isCompleted = await activitiesService.isActivityCompleted(dailyActivities.evening.id);
        if (isCompleted) completed.add(dailyActivities.evening.id);
      }
      setCompletedActivities(completed);
    } catch (error) {
      console.error('Erreur chargement activités:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les activités du jour.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleActivityComplete = async (activityId: string) => {
    try {
      const success = await activitiesService.completeActivity(activityId);
      if (success) {
        setCompletedActivities(prev => new Set([...prev, activityId]));
        toast({
          title: "🎉 Activité terminée !",
          description: "Félicitations pour votre engagement !",
        });
      }
    } catch (error) {
      console.error('Erreur completion activité:', error);
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

  const isActivityLocked = (activity: any) => {
    return isTrialExpired && dayNumber > 3;
  };

  const handleLockedClick = () => {
    toast({
      title: "Contenu Premium",
      description: "Passez à Arboria+ pour débloquer cette activité.",
      variant: "destructive",
    });
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

  return (
    <>
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <Clock className="w-5 h-5" />
            Vos activités du jour {dayNumber}
          </CardTitle>
          {isTrialExpired && dayNumber > 3 && (
            <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded-lg">
              🔒 Contenu Premium - Passez à Arboria+ pour continuer votre parcours
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <ActivityCard
            activity={activities.morning}
            timeType="morning"
            timeIcon={getTimeIcon('morning')}
            timeLabel={getTimeLabel('morning')}
            isCompleted={activities.morning ? completedActivities.has(activities.morning.id) : false}
            isLocked={activities.morning ? isActivityLocked(activities.morning) : false}
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
            isLocked={activities.afternoon ? isActivityLocked(activities.afternoon) : false}
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
            isLocked={activities.evening ? isActivityLocked(activities.evening) : false}
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

export default DailyActivitiesSection;
