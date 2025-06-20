
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Save, CheckCircle, History } from "lucide-react";
import { supabaseService } from "@/lib/supabase";
import ActivityCompletionToast from "../ActivityCompletionToast";

interface InteractiveActivityProps {
  activity: {
    title: string;
    description?: string;
    prompt: string;
    placeholder?: string;
    id: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

const InteractiveActivity = ({ activity, onComplete, onBack }: InteractiveActivityProps) => {
  const [userInput, setUserInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [previousEntries, setPreviousEntries] = useState<Array<{date: string, content: string}>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showCompletionToast, setShowCompletionToast] = useState(false);

  useEffect(() => {
    // Charger les entrées précédentes du journal
    loadJournalEntries();

    // Charger le brouillon actuel
    const savedDraft = localStorage.getItem(`activity_${activity.id}_draft`);
    if (savedDraft) {
      setUserInput(savedDraft);
    }
  }, [activity.id]);

  const loadJournalEntries = async () => {
    // Récupérer les entrées du journal pour cette activité depuis Supabase
    try {
      const deviceId = localStorage.getItem('device_id') || '';
      // Cette fonctionnalité pourrait être étendue pour récupérer l'historique depuis Supabase
      // Pour l'instant, on garde le localStorage pour les brouillons
      const savedEntries = localStorage.getItem(`activity_${activity.id}_entries`);
      if (savedEntries) {
        setPreviousEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error('Erreur chargement entrées journal:', error);
    }
  };

  const handleSave = async () => {
    if (!userInput.trim()) return;

    // Sauvegarder dans le journal Supabase
    await supabaseService.saveJournalEntry(
      userInput.trim(),
      'reflective',
      new Date().getDate(),
      activity.id
    );

    // Sauvegarder l'entrée localement pour l'historique
    const newEntry = {
      date: new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      content: userInput.trim()
    };

    const updatedEntries = [newEntry, ...previousEntries].slice(0, 10); // Garder les 10 dernières
    setPreviousEntries(updatedEntries);
    localStorage.setItem(`activity_${activity.id}_entries`, JSON.stringify(updatedEntries));
    
    // Effacer le brouillon
    localStorage.removeItem(`activity_${activity.id}_draft`);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleInputChange = (value: string) => {
    setUserInput(value);
    // Sauvegarder le brouillon automatiquement
    localStorage.setItem(`activity_${activity.id}_draft`, value);
  };

  const handleComplete = async () => {
    if (userInput.trim() && !isSaved) {
      await handleSave();
    }
    
    setShowCompletionToast(true);
    
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenTool className="w-6 h-6 text-amber-600" />
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

              {/* Prompt */}
              <div className="mb-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <p className="text-gray-700 leading-relaxed text-lg font-medium text-center">
                  {activity.prompt}
                </p>
              </div>

              {/* Writing Area - Journal intégré */}
              <div className="mb-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-amber-800 mb-2">📝 Votre journal personnel</h3>
                  <p className="text-sm text-gray-600">
                    Vos réflexions seront automatiquement sauvegardées dans votre journal Arboria.
                  </p>
                </div>
                <div className="relative">
                  <Textarea
                    value={userInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={activity.placeholder || "Commencez à écrire vos pensées..."}
                    className="min-h-[200px] p-6 text-lg leading-relaxed border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50/30 focus:border-amber-400 focus:ring-amber-200 rounded-lg shadow-inner"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(0,0,0,0.05) 24px, rgba(0,0,0,0.05) 25px)',
                      fontFamily: 'Georgia, serif'
                    }}
                  />
                  
                  {/* Save Status */}
                  {isSaved && (
                    <div className="absolute top-2 right-2 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Sauvegardé dans votre journal
                    </div>
                  )}
                </div>
                
                {/* Character count */}
                <div className="text-right text-sm text-gray-500 mt-2">
                  {userInput.length} caractères
                </div>
              </div>

              {/* Save Button */}
              <div className="mb-6">
                <Button
                  onClick={handleSave}
                  disabled={!userInput.trim() || isSaved}
                  className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaved ? 'Sauvegardé dans le journal ✓' : 'Sauvegarder dans le journal'}
                </Button>
              </div>

              {/* History */}
              {previousEntries.length > 0 && (
                <div className="mb-6">
                  <Button
                    onClick={() => setShowHistory(!showHistory)}
                    variant="outline"
                    className="flex items-center gap-2 mb-4"
                  >
                    <History className="w-4 h-4" />
                    Voir l'historique ({previousEntries.length})
                  </Button>
                  
                  {showHistory && (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {previousEntries.map((entry, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                          <div className="text-xs text-gray-500 mb-2">{entry.date}</div>
                          <p className="text-sm text-gray-700 line-clamp-3">{entry.content}</p>
                        </div>
                      ))}
                    </div>
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
                >
                  ✓ Terminer l'activité
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

export default InteractiveActivity;
