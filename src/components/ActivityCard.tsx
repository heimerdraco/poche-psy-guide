
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Lock, Crown } from "lucide-react";
import EnhancedButton from "./EnhancedButton";

interface ActivityCardProps {
  activity: any;
  timeType: string;
  timeIcon: React.ReactNode;
  timeLabel: string;
  isCompleted: boolean;
  isLocked: boolean;
  profileColor: string;
  onActivityClick: (activity: any) => void;
  onLockedClick: () => void;
  showPremiumBadge?: boolean;
}

const ActivityCard = ({
  activity,
  timeType,
  timeIcon,
  timeLabel,
  isCompleted,
  isLocked,
  profileColor,
  onActivityClick,
  onLockedClick,
  showPremiumBadge = false
}: ActivityCardProps) => {
  if (!activity) {
    return (
      <Card className="opacity-50">
        <CardContent className="p-4 text-center">
          <p className="text-gray-500">Aucune activité disponible</p>
        </CardContent>
      </Card>
    );
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'notebook': return '📝';
      case 'audio': return '🎧';
      case 'explanatory': return '📖';
      default: return '📋';
    }
  };

  const getFormatLabel = (format: string) => {
    switch (format) {
      case 'notebook': return 'Journal';
      case 'audio': return 'Audio';
      case 'explanatory': return 'Guide';
      default: return format;
    }
  };

  const content = typeof activity.content === 'string' 
    ? JSON.parse(activity.content) 
    : activity.content;

  return (
    <Card className={`transition-all duration-200 cursor-pointer ${
      isCompleted ? 'border-green-300 bg-green-50' : 
      isLocked ? 'opacity-60 border-gray-200' : 
      'hover:shadow-md border-emerald-200 hover:border-emerald-300'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {timeIcon}
            <Badge variant="outline" className="text-xs">
              {timeLabel}
            </Badge>
            {showPremiumBadge && (
              <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
            {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
        
        <h4 className="font-semibold mb-2 text-gray-800 leading-tight">
          {activity.title}
        </h4>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {activity.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={`bg-gradient-to-r ${profileColor} text-white text-xs`}>
              <span className="mr-1">{getFormatIcon(activity.activity_format)}</span>
              {getFormatLabel(activity.activity_format)}
            </Badge>
            
            {content.duration && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {content.duration}
              </Badge>
            )}
          </div>
        </div>
        
        <EnhancedButton
          onClick={() => {
            if (isLocked) {
              onLockedClick();
            } else {
              onActivityClick(activity);
            }
          }}
          disabled={false}
          size="sm"
          soundType="click"
          animationType="scale"
          className={`w-full ${
            isCompleted ? 'bg-green-500 text-white' :
            isLocked ? 'bg-gray-300 text-gray-600' :
            `bg-gradient-to-r ${profileColor} text-white hover:opacity-90`
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 mr-1" />
              Terminé
            </>
          ) : isLocked ? (
            <>
              <Lock className="w-4 h-4 mr-1" />
              Premium
            </>
          ) : (
            'Voir les détails'
          )}
        </EnhancedButton>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
