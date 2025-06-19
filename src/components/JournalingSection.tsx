
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, BookOpen, Save, RefreshCw } from "lucide-react";
import { supabaseService } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import EnhancedButton from "./EnhancedButton";

const JournalingSection = () => {
  const { toast } = useToast();
  const [journalContent, setJournalContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);

  const moods = [
    { emoji: "😊", label: "Joyeux", color: "bg-yellow-100 text-yellow-800" },
    { emoji: "😌", label: "Paisible", color: "bg-green-100 text-green-800" },
    { emoji: "😔", label: "Triste", color: "bg-blue-100 text-blue-800" },
    { emoji: "😰", label: "Anxieux", color: "bg-orange-100 text-orange-800" },
    { emoji: "😡", label: "Colère", color: "bg-red-100 text-red-800" },
    { emoji: "🤔", label: "Réfléchi", color: "bg-purple-100 text-purple-800" }
  ];

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const loadJournalEntries = async () => {
    setLoading(true);
    try {
      const userData = await supabaseService.getUserData();
      setJournalEntries(userData.journal || []);
    } catch (error) {
      console.error('Erreur chargement journal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!journalContent.trim() || !selectedMood) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir votre ressenti et sélectionner une humeur.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const dayNumber = Math.floor((Date.now() - (parseInt(localStorage.getItem('trialStart') || '0'))) / (1000 * 60 * 60 * 24)) + 1;
      
      await supabaseService.saveJournalEntry(journalContent, selectedMood, dayNumber);
      
      toast({
        title: "Journal sauvegardé",
        description: "Votre ressenti a été enregistré avec succès.",
      });

      // Réinitialiser le formulaire
      setJournalContent("");
      setSelectedMood("");
      
      // Recharger les entrées
      loadJournalEntries();
    } catch (error) {
      console.error('Erreur sauvegarde journal:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre journal.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="w-6 h-6 animate-spin text-emerald-600 mr-2" />
        <span className="text-emerald-700">Chargement de votre journal...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in-gentle">
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <BookOpen className="w-5 h-5" />
            Mon Journal Personnel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Comment vous sentez-vous aujourd'hui ?
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Badge
                  key={mood.label}
                  className={`cursor-pointer transition-all ${
                    selectedMood === mood.label
                      ? mood.color + " scale-110"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedMood(mood.label)}
                >
                  <span className="mr-1">{mood.emoji}</span>
                  {mood.label}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Exprimez vos pensées et ressentis
            </label>
            <Textarea
              value={journalContent}
              onChange={(e) => setJournalContent(e.target.value)}
              placeholder="Décrivez votre journée, vos émotions, vos réflexions..."
              className="min-h-[120px] border-emerald-200 focus:border-emerald-400"
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {journalContent.length}/1000 caractères
            </p>
          </div>

          <EnhancedButton
            onClick={handleSave}
            disabled={!journalContent.trim() || !selectedMood || saving}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            soundType="success"
            animationType="glow"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder mon ressenti
              </>
            )}
          </EnhancedButton>
        </CardContent>
      </Card>

      {/* Affichage des entrées précédentes */}
      {journalEntries.length > 0 && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <Calendar className="w-5 h-5" />
              Mes entrées précédentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {journalEntries.slice(-5).reverse().map((entry, index) => (
              <div key={entry.id} className="border-l-4 border-emerald-300 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-emerald-100 text-emerald-800">
                    {moods.find(m => m.label === entry.mood)?.emoji} {entry.mood}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {entry.content}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JournalingSection;
