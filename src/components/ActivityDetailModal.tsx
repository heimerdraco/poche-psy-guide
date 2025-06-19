
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Target, List, Package, HelpCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EnhancedButton from "./EnhancedButton";

interface ActivityDetailModalProps {
  activity: any;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (activityId: string) => void;
  profileColor: string;
  isCompleted?: boolean;
}

const ActivityDetailModal = ({ 
  activity, 
  isOpen, 
  onClose, 
  onComplete, 
  profileColor,
  isCompleted = false 
}: ActivityDetailModalProps) => {
  const { toast } = useToast();
  const [isCompleting, setIsCompleting] = useState(false);

  if (!activity) return null;

  const content = typeof activity.content === 'string' 
    ? JSON.parse(activity.content) 
    : activity.content;

  const handleComplete = async () => {
    if (isCompleted) return;
    
    setIsCompleting(true);
    try {
      await onComplete(activity.id);
      toast({
        title: "🎉 Activité terminée !",
        description: "Félicitations pour votre engagement !",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de marquer l'activité comme terminée.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="text-2xl">{getFormatIcon(activity.activity_format)}</span>
            {activity.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête avec badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className={`bg-gradient-to-r ${profileColor} text-white`}>
              {getFormatLabel(activity.activity_format)}
            </Badge>
            {content.duration && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {content.duration}
              </Badge>
            )}
            {isCompleted && (
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Terminé
              </Badge>
            )}
          </div>

          {/* Objectif psychologique */}
          {content.objective && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-semibold text-lg">
                <Target className="w-5 h-5 text-blue-600" />
                Objectif psychologique
              </h3>
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                {content.objective}
              </p>
            </div>
          )}

          <Separator />

          {/* Instructions étape par étape */}
          {content.instructions && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 font-semibold text-lg">
                <List className="w-5 h-5 text-green-600" />
                Instructions étape par étape
              </h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <ol className="space-y-2">
                  {content.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          <Separator />

          {/* Temps estimé et matériel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.duration && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Temps estimé
                </h4>
                <p className="text-gray-600 bg-orange-50 p-2 rounded">
                  {content.duration}
                </p>
              </div>
            )}

            {content.material && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-medium">
                  <Package className="w-4 h-4 text-purple-600" />
                  Matériel requis
                </h4>
                <p className="text-gray-600 bg-purple-50 p-2 rounded">
                  {content.material}
                </p>
              </div>
            )}
          </div>

          {/* Pourquoi cette activité aide */}
          {content.why_helps && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  Pourquoi cette activité vous aide
                </h3>
                <p className="text-gray-700 bg-indigo-50 p-3 rounded-lg leading-relaxed">
                  {content.why_helps}
                </p>
              </div>
            </>
          )}

          {/* Message pour audio manquant */}
          {activity.activity_format === 'audio' && !content.theme && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-yellow-800 text-sm">
                🎧 <strong>Audio disponible bientôt</strong> - En attendant, vous pouvez suivre les instructions écrites ci-dessus.
              </p>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4">
            <EnhancedButton
              onClick={handleComplete}
              disabled={isCompleted || isCompleting}
              className={`flex-1 ${
                isCompleted 
                  ? 'bg-green-500 text-white' 
                  : `bg-gradient-to-r ${profileColor} text-white hover:opacity-90`
              }`}
              soundType="success"
              animationType="scale"
            >
              {isCompleting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Finalisation...
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Terminé
                </>
              ) : (
                'Marquer comme terminé'
              )}
            </EnhancedButton>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="px-6"
            >
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailModal;
