import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface MoodEntry {
  date: string;
  mood: string;
  value: number;
}

const MoodTracker = () => {
  const [todayMood, setTodayMood] = useState<string>("");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  const moodOptions = [
    { emoji: "😊", label: "Joyeux", value: 5 },
    { emoji: "🙂", label: "Bien", value: 4 },
    { emoji: "😐", label: "Neutre", value: 3 },
    { emoji: "😔", label: "Triste", value: 2 },
    { emoji: "😢", label: "Difficile", value: 1 }
  ];

  useEffect(() => {
    loadMoodHistory();
    checkTodayMood();
  }, []);

  const loadMoodHistory = () => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      setMoodHistory(JSON.parse(saved));
    }
  };

  const checkTodayMood = () => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      const history = JSON.parse(saved);
      const todayEntry = history.find((entry: MoodEntry) => entry.date === today);
      if (todayEntry) {
        setTodayMood(todayEntry.mood);
        setHasLoggedToday(true);
      }
    }
  };

  const saveMood = (mood: string, value: number) => {
    const today = new Date().toDateString();
    const newEntry: MoodEntry = {
      date: today,
      mood: mood,
      value: value
    };

    // Remove today's entry if exists, then add new one
    const updatedHistory = moodHistory.filter(entry => entry.date !== today);
    updatedHistory.push(newEntry);
    
    // Keep only last 30 days
    const last30Days = updatedHistory.slice(-30);
    
    setMoodHistory(last30Days);
    localStorage.setItem('moodHistory', JSON.stringify(last30Days));
    setTodayMood(mood);
    setHasLoggedToday(true);
  };

  const getChartData = () => {
    return moodHistory.slice(-7).map((entry, index) => ({
      day: `J${index + 1}`,
      value: entry.value,
      mood: entry.mood
    }));
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Mon état
        </h3>

        {!hasLoggedToday ? (
          <div>
            <p className="text-gray-600 mb-4 text-sm">Comment te sens-tu aujourd'hui ?</p>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {moodOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  onClick={() => saveMood(option.emoji, option.value)}
                  className="flex flex-col items-center p-3 h-auto hover:bg-blue-50"
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className="text-xs">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">{todayMood}</div>
            <p className="text-green-600 text-sm">✓ État enregistré pour aujourd'hui</p>
          </div>
        )}

        {moodHistory.length > 1 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Tendance des 7 derniers jours</p>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis hide domain={[0, 6]} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
