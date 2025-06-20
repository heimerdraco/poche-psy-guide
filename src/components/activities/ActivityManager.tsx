
import { useState } from 'react';
import ExplanatoryActivity from './ExplanatoryActivity';
import AudioActivity from './AudioActivity';
import InteractiveActivity from './InteractiveActivity';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'explanatory' | 'audio' | 'interactive';
  content?: any;
}

interface ActivityManagerProps {
  activity: Activity;
  onComplete: () => void;
  onBack: () => void;
}

const ActivityManager = ({ activity, onComplete, onBack }: ActivityManagerProps) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleActivityComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  // Détection automatique du type d'activité selon les métadonnées
  const renderActivity = () => {
    switch (activity.type) {
      case 'explanatory':
        return (
          <ExplanatoryActivity
            activity={{
              title: activity.title,
              introduction: activity.content?.introduction,
              objective: activity.content?.objective,
              steps: activity.content?.steps,
              content: activity.content?.text || activity.description
            }}
            onComplete={handleActivityComplete}
            onBack={onBack}
          />
        );

      case 'audio':
        return (
          <AudioActivity
            activity={{
              title: activity.title,
              description: activity.description,
              audioText: activity.content?.audioText,
              visualUrl: activity.content?.visualUrl,
              duration: activity.duration
            }}
            onComplete={handleActivityComplete}
            onBack={onBack}
          />
        );

      case 'interactive':
        return (
          <InteractiveActivity
            activity={{
              title: activity.title,
              description: activity.description,
              prompt: activity.content?.prompt || activity.description,
              placeholder: activity.content?.placeholder,
              id: activity.id
            }}
            onComplete={handleActivityComplete}
            onBack={onBack}
          />
        );

      default:
        // Fallback vers activité explicative
        return (
          <ExplanatoryActivity
            activity={{
              title: activity.title,
              content: activity.description
            }}
            onComplete={handleActivityComplete}
            onBack={onBack}
          />
        );
    }
  };

  return renderActivity();
};

export default ActivityManager;
