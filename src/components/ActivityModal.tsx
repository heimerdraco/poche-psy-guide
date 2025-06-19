
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Pause, CheckCircle, BookOpen, Headphones, PenTool } from "lucide-react";
import EnhancedButton from "./EnhancedButton";

interface ActivityModalProps {
  activity: any;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (activityId: string, notes?: string) => void;
  profileColor: string;
}

const ActivityModal = ({ activity, isOpen, onClose, onComplete, profileColor }: ActivityModalProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [notes, setNotes] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  if (!activity) return null;

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(activity.id, notes);
    setTimeout(() => {
      onClose();
      setIsCompleted(false);
      setNotes("");
    }, 1500);
  };

  const renderActivityContent = () => {
    switch (activity.activity_format) {
      case 'explanatory':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Guide étape par étape</h3>
            </div>
            
            {activity.content?.steps && (
              <div className="space-y-3">
                {activity.content.steps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${profileColor} text-white flex items-center justify-center text-sm font-semibold`}>
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'audio':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Headphones className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Séance audio guidée</h3>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                {isPlaying ? 
                  <Pause className="w-8 h-8 text-white" /> : 
                  <Play className="w-8 h-8 text-white" />
                }
              </div>
              
              <p className="text-gray-600 mb-4">
                Durée: {Math.floor((activity.content?.duration || 600) / 60)} minutes
              </p>
              
              <EnhancedButton
                onClick={() => setIsPlaying(!isPlaying)}
                className={`bg-gradient-to-r ${profileColor} text-white px-6 py-2`}
                soundType="click"
                animationType="scale"
              >
                {isPlaying ? 'Pause' : 'Commencer la séance'}
              </EnhancedButton>
              
              {isPlaying && (
                <div className="mt-4 text-sm text-purple-600">
                  🎧 Installez-vous confortablement et suivez les instructions audio
                </div>
              )}
            </div>
          </div>
        );

      case 'notebook':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <PenTool className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Exercice d'écriture</h3>
            </div>
            
            {activity.content?.prompt && (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-green-800 font-medium mb-2">Consigne :</p>
                <p className="text-gray-700">{activity.content.prompt}</p>
              </div>
            )}
            
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Commencez à écrire vos pensées ici..."
              className="min-h-[200px] border-green-200 focus:border-green-400"
            />
          </div>
        );

      default:
        return <p className="text-gray-600">Format d'activité non reconnu.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-2xl font-bold bg-gradient-to-r ${profileColor} bg-clip-text text-transparent`}>
            {activity.title}
          </DialogTitle>
          <p className="text-gray-600 mt-2">{activity.description}</p>
        </DialogHeader>

        <div className="mt-6">
          {renderActivityContent()}
        </div>

        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Fermer
          </Button>

          <EnhancedButton
            onClick={handleComplete}
            disabled={isCompleted}
            className={`bg-gradient-to-r ${profileColor} text-white px-6`}
            soundType="success"
            animationType="glow"
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Terminé !
              </>
            ) : (
              'Marquer comme terminé'
            )}
          </EnhancedButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityModal;
