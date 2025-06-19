
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Volume2, VolumeX } from "lucide-react";

const DailyQuote = () => {
  const [todayQuote, setTodayQuote] = useState("");
  const [hasClickedToday, setHasClickedToday] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const quotes = [
    {
      text: "Prendre soin de soi n'est pas de l'égoïsme, c'est de l'amour-propre 💙",
      visual: "🌸"
    },
    {
      text: "Chaque petit pas compte sur le chemin de la guérison 🌱",
      visual: "🌿"
    },
    {
      text: "Tu es plus fort(e) que tu ne le penses ✨",
      visual: "⭐"
    },
    {
      text: "Aujourd'hui, sois doux/douce avec toi-même 🫂",
      visual: "🤗"
    },
    {
      text: "Tes émotions sont valides et méritent d'être entendues 💜",
      visual: "💝"
    },
    {
      text: "La guérison n'est pas linéaire, et c'est normal 🌈",
      visual: "🌈"
    },
    {
      text: "Tu mérites la paix intérieure et le bonheur 🕊️",
      visual: "🕊️"
    }
  ];

  useEffect(() => {
    // Get today's quote based on date
    const today = new Date().toDateString();
    const quoteIndex = new Date().getDate() % quotes.length;
    setTodayQuote(quotes[quoteIndex].text);
    
    // Check if already clicked today
    const lastClick = localStorage.getItem('dailyQuoteClick');
    setHasClickedToday(lastClick === today);
  }, []);

  const handleQuoteClick = () => {
    const today = new Date().toDateString();
    localStorage.setItem('dailyQuoteClick', today);
    setHasClickedToday(true);
    
    // Play gentle sound if enabled
    if (soundEnabled) {
      // Simple audio feedback would go here
      console.log("🔔 Son doux joué");
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const todayQuoteObj = quotes[new Date().getDate() % quotes.length];

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            Mot du jour
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSound}
            className="p-1 h-8 w-8"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-gray-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
          </Button>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-4xl mb-3">{todayQuoteObj.visual}</div>
          <blockquote className="text-base text-gray-700 italic leading-relaxed mb-4" 
                     style={{ fontFamily: 'Nunito, sans-serif' }}>
            {todayQuote}
          </blockquote>
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={handleQuoteClick}
            disabled={hasClickedToday}
            className={`${
              hasClickedToday 
                ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white'
            } rounded-full px-4 py-2`}
          >
            {hasClickedToday ? '✓ Lu aujourd\'hui' : '🌟 Lire le message'}
          </Button>
          
          {hasClickedToday && (
            <Badge className="bg-yellow-100 text-yellow-800">
              ⭐ Badge du jour
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyQuote;
