
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DailyMoodWidget = () => {
  const [currentMood, setCurrentMood] = useState('😌');
  const [isAnimating, setIsAnimating] = useState(false);

  const moods = [
    { emoji: '😌', label: 'Serein', color: 'from-blue-100 to-blue-200' },
    { emoji: '🌱', label: 'En croissance', color: 'from-green-100 to-green-200' },
    { emoji: '✨', label: 'Inspiré', color: 'from-yellow-100 to-yellow-200' },
    { emoji: '🧘‍♀️', label: 'Zen', color: 'from-purple-100 to-purple-200' },
    { emoji: '🌸', label: 'Épanoui', color: 'from-pink-100 to-pink-200' },
    { emoji: '🍃', label: 'Léger', color: 'from-emerald-100 to-emerald-200' }
  ];

  const currentMoodData = moods.find(mood => mood.emoji === currentMood) || moods[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        setCurrentMood(randomMood.emoji);
        setIsAnimating(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleMoodClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const nextIndex = (moods.findIndex(m => m.emoji === currentMood) + 1) % moods.length;
      setCurrentMood(moods[nextIndex].emoji);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Card 
      className={`bg-gradient-to-r ${currentMoodData.color} border-0 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer animate-pulse-gentle`}
      onClick={handleMoodClick}
      style={{ animationDuration: '4s' }}
    >
      <CardContent className="p-4 text-center">
        <div className={`text-3xl mb-2 transition-all duration-300 ${
          isAnimating ? 'scale-75 opacity-50' : 'scale-100 opacity-100'
        }`}>
          {currentMood}
        </div>
        <Badge 
          variant="outline" 
          className="bg-white/70 backdrop-blur-sm border-emerald-200 text-emerald-800 font-medium"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          {currentMoodData.label}
        </Badge>
        <p className="text-xs text-emerald-600 mt-2 opacity-70" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Touche pour changer
        </p>
      </CardContent>
    </Card>
  );
};

export default DailyMoodWidget;
