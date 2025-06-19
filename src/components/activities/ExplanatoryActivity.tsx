
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen } from "lucide-react";

interface ExplanatoryActivityProps {
  activity: {
    title: string;
    introduction?: string;
    objective?: string;
    steps?: string[];
    content: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

const ExplanatoryActivity = ({ activity, onComplete, onBack }: ExplanatoryActivityProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                ✨ Activité terminée !
              </h3>
              <p className="text-gray-600">
                Félicitations pour avoir pris ce moment pour vous.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <h3 className="font-semibold text-gray-800 mb-2">🎯 Objectif :</h3>
                <p className="text-gray-700 leading-relaxed">
                  {activity.objective}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div className="mb-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {activity.content}
                </p>
              </div>
            </div>

            {/* Steps */}
            {activity.steps && activity.steps.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">📝 Étapes à suivre :</h3>
                <div className="space-y-3">
                  {activity.steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                        index <= currentStep 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        index <= currentStep 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <p className="text-gray-700 flex-1">{step}</p>
                      {index < currentStep && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                {activity.steps && currentStep < activity.steps.length - 1 && (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Étape suivante
                  </Button>
                )}
              </div>
            )}

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
                disabled={activity.steps && currentStep < activity.steps.length - 1}
              >
                {activity.steps && currentStep < activity.steps.length - 1 
                  ? 'Terminer toutes les étapes' 
                  : '✓ J\'ai compris'
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExplanatoryActivity;
