
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Image, Play } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import PermissionDialog from "./PermissionDialog";

interface ActivityWithPermissionsProps {
  activity: {
    title: string;
    description: string;
    duration: string;
    requiresCamera?: boolean;
    requiresStorage?: boolean;
  };
  onComplete: () => void;
  className?: string;
}

const ActivityWithPermissions = ({ activity, onComplete, className }: ActivityWithPermissionsProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const { permissionDialog, requestCameraPermission, requestStoragePermission, closePermissionDialog } = usePermissions();

  const handleStartActivity = () => {
    // Vérifier les permissions nécessaires
    if (activity.requiresCamera && activity.requiresStorage) {
      // Activité photo qui nécessite appareil photo ET galerie
      requestCameraPermission(() => {
        requestStoragePermission(() => {
          setIsStarted(true);
        });
      });
    } else if (activity.requiresCamera) {
      // Activité photo simple
      requestCameraPermission(() => {
        setIsStarted(true);
      });
    } else if (activity.requiresStorage) {
      // Import depuis la galerie
      requestStoragePermission(() => {
        setIsStarted(true);
      });
    } else {
      // Pas de permission nécessaire
      setIsStarted(true);
    }
  };

  const getPermissionIcons = () => {
    const icons = [];
    if (activity.requiresCamera) icons.push(<Camera key="camera" className="w-3 h-3" />);
    if (activity.requiresStorage) icons.push(<Image key="storage" className="w-3 h-3" />);
    return icons;
  };

  if (isStarted) {
    return (
      <Card className={`shadow-lg border-2 border-green-200 bg-green-50/50 ${className}`}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Play className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Activité en cours... Suivez les instructions à l'écran.
              </p>
            </div>
            <Button 
              onClick={onComplete}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Terminer l'activité
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`shadow-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50/50 to-pink-50/50 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex items-center justify-center">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {getPermissionIcons()}
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                {activity.duration}
              </span>
            </div>
          </div>

          {(activity.requiresCamera || activity.requiresStorage) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-800">
                Cette activité nécessite des permissions spéciales pour fonctionner.
              </p>
            </div>
          )}

          <Button
            onClick={handleStartActivity}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
          >
            🌟 Commencer l'activité
          </Button>
        </CardContent>
      </Card>

      {permissionDialog && (
        <PermissionDialog
          isOpen={permissionDialog.isOpen}
          type={permissionDialog.type}
          onAccept={permissionDialog.onAccept}
          onDecline={permissionDialog.onDecline}
        />
      )}
    </>
  );
};

export default ActivityWithPermissions;
