
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Lock, Sun, Sunset, Moon } from "lucide-react";
import { activitiesService, type DailyActivities } from "@/lib/activitiesService";
import { getProfileData } from "@/lib/profilesData";
import { useToast } from "@/hooks/use-toast";
import EnhancedButton from "./EnhancedButton";
import ActivityModal from "./ActivityModal";

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
      const dailyActivities = await activitiesService.getDailyActivities(profile, dayNumber);
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

  const renderActivity = (activity: any, timeType: string) => {
    if (!activity) {
      return (
        <Card className="opacity-50">
          <CardContent className="p-4 text-center">
            <p className="text-gray-500">Aucune activité disponible</p>
          </CardContent>
        </Card>
      );
    }

    const isCompleted = completedActivities.has(activity.id);
    const isLocked = isActivityLocked(activity);

    return (
      <Card className={`transition-all duration-200 ${
        isCompleted ? 'border-green-300 bg-green-50' : 
        isLocked ? 'opacity-60 border-gray-200' : 
        'hover:shadow-md border-emerald-200'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {getTimeIcon(timeType)}
              <Badge variant="outline" className="text-xs">
                {getTimeLabel(timeType)}
              </Badge>
            </div>
            {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
            {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
          </div>
          
          <h4 className="font-semibold mb-2 text-gray-800">{activity.title}</h4>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
          
          <div className="flex items-center justify-between">
            <Badge className={`bg-gradient-to-r ${profileData.color} text-white text-xs`}>
              {activity.activity_format === 'explanatory' ? '📖 Guide' :
               activity.activity_format === 'audio' ? '🎧 Audio' : '📝 Journal'}
            </Badge>
            
            <EnhancedButton
              onClick={() => {
                if (isLocked) {
                  toast({
                    title: "Contenu Premium",
                    description: "Passez à Arboria+ pour débloquer cette activité.",
                    variant: "destructive",
                  });
                } else {
                  setSelectedActivity(activity);
                }
              }}
              disabled={isCompleted}
              size="sm"
              soundType="click"
              animationType="scale"
              className={
                isCompleted ? 'bg-green-500 text-white' :
                isLocked ? 'bg-gray-300 text-gray-600' :
                `bg-gradient-to-r ${profileData.color} text-white hover:opacity-90`
              }
            >
              {isCompleted ? 'Terminé' : isLocked ? 'Premium' : 'Commencer'}
            </EnhancedButton>
          </div>
        </CardContent>
      </Card>
    );
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
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
          {renderActivity(activities.morning, 'morning')}
          {renderActivity(activities.afternoon, 'afternoon')}
          {renderActivity(activities.evening, 'evening')}
        </CardContent>
      </Card>

      <ActivityModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onComplete={handleActivityComplete}
        profileColor={profileData.color}
      />
    </>
  );
};

export default DailyActivitiesSection;
