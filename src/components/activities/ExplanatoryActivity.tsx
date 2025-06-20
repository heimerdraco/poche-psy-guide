
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, CheckCircle, PenTool } from "lucide-react";
import { supabaseService } from "@/lib/supabase";

interface ExplanatoryActivityProps {
  activity: {
    title: string;
    introduction?: string;
    objective?: string;
    steps?: string[];
    content: string;
    id?: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

const ExplanatoryActivity = ({ activity, onComplete, onBack }: ExplanatoryActivityProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [userReflection, setUserReflection] = useState('');
  const [showReflection, setShowReflection] = useState(false);

  const handleComplete = async () => {
    setIsCompleted(true);
    
    // Sauvegarder la réflexion si elle existe
    if (userReflection.trim() && activity.id) {
      await supabaseService.saveJournalEntry(
        userReflection,
        'neutral',
        new Date().getDate()
      );
    }

    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const toggleReflectionSection = () => {
    setShowReflection(!showReflection);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {activity.title}
              </h1>
            </div>

            {/* Introduction */}
            {activity.introduction && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-gray-700 leading-relaxed">
                  {activity.introduction}
                </p>
              </div>
            )}

            {/* Objective */}
            {activity.objective && (
              <div className="mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Objectif :</h3>
                <p className="text-gray-700">{activity.objective}</p>
              </div>
            )}

            {/* Steps */}
            {activity.steps && activity.steps.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-blue-800 mb-4">Étapes à suivre :</h3>
                <div className="space-y-3">
                  {activity.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {activity.content}
              </p>
            </div>

            {/* Section de réflexion personnelle */}
            <div className="mb-6">
              <Button
                onClick={toggleReflectionSection}
                variant="outline"
                className="flex items-center gap-2 mb-4"
              >
                <PenTool className="w-4 h-4" />
                {showReflection ? 'Masquer la réflexion' : 'Ajouter une réflexion personnelle'}
              </Button>
              
              {showReflection && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Prenez un moment pour noter vos pensées sur cette activité :
                  </p>
                  <Textarea
                    value={userReflection}
                    onChange={(e) => setUserReflection(e.target.value)}
                    placeholder="Qu'avez-vous ressenti ? Qu'avez-vous appris ? Notez vos réflexions ici..."
                    className="min-h-[120px] border-blue-200 focus:border-blue-400"
                  />
                </div>
              )}
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
                disabled={isCompleted}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Terminé !
                  </>
                ) : (
                  'Terminer l\'activité'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExplanatoryActivity;
