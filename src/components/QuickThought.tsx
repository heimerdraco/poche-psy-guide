
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Send, Clock } from "lucide-react";
import { supabaseService } from "@/lib/supabase";

interface ThoughtEntry {
  id?: number;
  thought: string;
  date: string;
  timestamp: number;
}

const QuickThought = () => {
  const [thought, setThought] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentThoughts, setRecentThoughts] = useState<ThoughtEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadRecentThoughts();
  }, []);

  const loadRecentThoughts = () => {
    const saved = localStorage.getItem('quickThoughts');
    if (saved) {
      const thoughts = JSON.parse(saved);
      setRecentThoughts(thoughts.slice(-3)); // Show last 3
    }
  };

  const saveThought = async () => {
    if (!thought.trim() || thought.length > 140) return;
    
    setIsSubmitting(true);
    
    try {
      // Save to Supabase (as anonymous message or new table)
      await supabaseService.saveAnonymousMessage(thought, 'sent');
      
      // Also save locally for quick access
      const newThought: ThoughtEntry = {
        thought: thought.trim(),
        date: new Date().toLocaleDateString('fr-FR'),
        timestamp: Date.now()
      };
      
      const existing = JSON.parse(localStorage.getItem('quickThoughts') || '[]');
      const updated = [...existing, newThought].slice(-10); // Keep last 10
      localStorage.setItem('quickThoughts', JSON.stringify(updated));
      
      setRecentThoughts(updated.slice(-3));
      setThought("");
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Erreur sauvegarde pensée:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const characterCount = thought.length;
  const isOverLimit = characterCount > 140;

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800 mb-4">
          <PenTool className="w-5 h-5 text-green-600" />
          Une pensée à poser
        </h3>

        {showSuccess ? (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">🌸</div>
            <p className="text-green-600 font-medium">Merci de partager tes émotions</p>
            <p className="text-gray-500 text-sm">Ta pensée a été sauvegardée avec tendresse</p>
          </div>
        ) : (
          <div>
            <Textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Qu'est-ce qui te traverse l'esprit en ce moment ? 💭"
              className="min-h-[80px] resize-none border-green-200 focus:border-green-400 mb-3"
            />
            
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
                {characterCount}/140 caractères
              </span>
              
              <Button
                onClick={saveThought}
                disabled={!thought.trim() || isOverLimit || isSubmitting}
                size="sm"
                className="bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1" />
                    Poser
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {recentThoughts.length > 0 && (
          <div className="border-t border-green-100 pt-4">
            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Tes dernières pensées
            </p>
            <div className="space-y-2">
              {recentThoughts.slice().reverse().map((entry, index) => (
                <div key={index} className="bg-green-50 p-2 rounded-lg">
                  <p className="text-sm text-gray-700 leading-relaxed">{entry.thought}</p>
                  <span className="text-xs text-gray-400">{entry.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickThought;
