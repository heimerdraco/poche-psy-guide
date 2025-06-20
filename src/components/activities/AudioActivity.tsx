
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, CheckCircle, PenTool } from "lucide-react";
import { supabaseService } from "@/lib/supabase";
import ActivityCompletionToast from "../ActivityCompletionToast";

interface AudioActivityProps {
  activity: {
    title: string;
    description?: string;
    audioText?: string;
    visualUrl?: string;
    duration?: string;
    id?: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

const AudioActivity = ({ activity, onComplete, onBack }: AudioActivityProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [userReflection, setUserReflection] = useState('');
  const [showCompletionToast, setShowCompletionToast] = useState(false);

  const handleComplete = async () => {
    setIsCompleted(true);
    setShowCompletionToast(true);
    
    // Sauvegarder la réflexion si elle existe
    if (userReflection.trim() && activity.id) {
      await supabaseService.saveJournalEntry(
        userReflection,
        'peaceful',
        new Date().getDate(),
        activity.id
      );
    }

    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {activity.title}
                </h1>
                {activity.description && (
                  <p className="text-gray-600">
                    {activity.description}
                  </p>
                )}
              </div>

              {/* Visual/Illustration */}
              {activity.visualUrl ? (
                <div className="mb-8 text-center">
                  <img 
                    src={activity.visualUrl} 
                    alt="Illustration inspirante"
                    className="max-w-full h-48 object-cover rounded-lg mx-auto"
                  />
                </div>
              ) : (
                <div className="mb-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-4xl">🧘‍♀️</span>
                  </div>
                </div>
              )}

              {/* Texte inspirant (remplace l'audio) */}
              {activity.audioText && (
                <div className="mb-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-gray-700 leading-relaxed text-lg italic text-center">
                    "{activity.audioText}"
                  </p>
                </div>
              )}

              {/* Instructions */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-gray-700 text-center">
                  🌸 Prenez quelques minutes pour vous installer confortablement et lire attentivement ce texte inspirant.
                </p>
              </div>

              {/* Section de réflexion - Journal intégré */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <PenTool className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">Votre journal personnel</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  📝 Comment ces mots résonnent-ils en vous ? Vos réflexions seront sauvegardées :
                </p>
                <Textarea
                  value={userReflection}
                  onChange={(e) => setUserReflection(e.target.value)}
                  placeholder="Qu'avez-vous ressenti en lisant ce texte ? Quelles émotions cela évoque-t-il chez vous ?"
                  className="min-h-[120px] border-purple-200 focus:border-purple-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="flex-1"
                >
                  ← Retour
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Terminé !
                    </>
                  ) : (
                    'Terminer la méditation'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Toast de completion */}
      <ActivityCompletionToast
        isVisible={showCompletionToast}
        onClose={() => setShowCompletionToast(false)}
        activityTitle={activity.title}
      />
    </>
  );
};

export default AudioActivity;
