
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Lock } from "lucide-react";

interface MonthlyCheckinProps {
  profile: string;
  isPremium: boolean;
}

interface CheckinData {
  month: number;
  responses: string[];
  sliders: { fatigue: number; stress: number; confiance: number };
  date: string;
}

const MonthlyCheckin = ({ profile, isPremium }: MonthlyCheckinProps) => {
  const [currentMonth, setCurrentMonth] = useState(1);
  const [checkinData, setCheckinData] = useState<CheckinData[]>([]);
  const [showCheckin, setShowCheckin] = useState(false);
  const [responses, setResponses] = useState(['', '', '', '', '']);
  const [sliders, setSliders] = useState({ fatigue: 3, stress: 3, confiance: 3 });

  const questions = [
    "Qu'est-ce qui a changé ce mois-ci dans ta vie ?",
    "Quelle émotion as-tu le plus ressentie ?",
    "De quoi es-tu fier(e) ce mois-ci ?",
    "Qu'aimerais-tu améliorer le mois prochain ?",
    "Un mot pour décrire ton état actuel ?"
  ];

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    if (trialStart) {
      const monthsPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24 * 30));
      setCurrentMonth(Math.max(1, monthsPassed));
    }

    const saved = localStorage.getItem('monthlyCheckins');
    if (saved) {
      setCheckinData(JSON.parse(saved));
    }
  }, []);

  const saveCheckin = () => {
    if (!isPremium) return;

    const newCheckin: CheckinData = {
      month: currentMonth,
      responses,
      sliders,
      date: new Date().toLocaleDateString('fr-FR')
    };

    const updated = [...checkinData.filter(c => c.month !== currentMonth), newCheckin];
    setCheckinData(updated);
    localStorage.setItem('monthlyCheckins', JSON.stringify(updated));
    setShowCheckin(false);
  };

  const thisMonthData = checkinData.find(c => c.month === currentMonth);

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
            <Calendar className="w-5 h-5 text-blue-600" />
            Rendez-vous mensuel
          </h3>
          <Badge variant="outline" className="border-blue-400 text-blue-700">
            Mois {currentMonth}
          </Badge>
        </div>

        {!isPremium ? (
          <div className="text-center py-6">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">Version premium requise pour sauvegarder</p>
            <p className="text-xs text-gray-500">Tu peux consulter en lecture seule</p>
          </div>
        ) : !showCheckin && !thisMonthData ? (
          <div className="text-center py-6">
            <div className="text-3xl mb-4">📋</div>
            <h4 className="font-medium text-gray-800 mb-3">
              C'est l'heure de ton point d'étape
            </h4>
            <p className="text-gray-600 mb-4 text-sm">
              5 questions pour faire le bilan de ce mois
            </p>
            <Button
              onClick={() => setShowCheckin(true)}
              className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white"
            >
              Commencer le bilan
            </Button>
          </div>
        ) : showCheckin ? (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800 mb-4">Questions d'introspection</h4>
            
            {questions.map((question, index) => (
              <div key={index}>
                <label className="block text-sm text-gray-700 mb-2">{question}</label>
                <Textarea
                  value={responses[index]}
                  onChange={(e) => {
                    const newResponses = [...responses];
                    newResponses[index] = e.target.value;
                    setResponses(newResponses);
                  }}
                  className="min-h-[60px] resize-none"
                  disabled={!isPremium}
                />
              </div>
            ))}

            <div className="space-y-4 pt-4 border-t border-blue-100">
              <h4 className="font-medium text-gray-800">État général (1 = faible, 5 = excellent)</h4>
              
              {Object.entries(sliders).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm text-gray-700 mb-2 capitalize">
                    {key === 'fatigue' ? 'Énergie' : key} : {value}/5
                  </label>
                  <Slider
                    value={[value]}
                    onValueChange={(newValue) => 
                      setSliders(prev => ({ ...prev, [key]: newValue[0] }))
                    }
                    max={5}
                    min={1}
                    step={1}
                    disabled={!isPremium}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => setShowCheckin(false)}
                variant="outline"
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={saveCheckin}
                disabled={!isPremium}
                className="flex-1 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                Sauvegarder
              </Button>
            </div>
          </div>
        ) : thisMonthData ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Bilan complété le {thisMonthData.date}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/80 p-3 rounded-lg">
                <div className="font-medium text-blue-600">{thisMonthData.sliders.fatigue}/5</div>
                <div className="text-xs text-gray-600">Énergie</div>
              </div>
              <div className="bg-white/80 p-3 rounded-lg">
                <div className="font-medium text-purple-600">{thisMonthData.sliders.stress}/5</div>
                <div className="text-xs text-gray-600">Stress</div>
              </div>
              <div className="bg-white/80 p-3 rounded-lg">
                <div className="font-medium text-green-600">{thisMonthData.sliders.confiance}/5</div>
                <div className="text-xs text-gray-600">Confiance</div>
              </div>
            </div>

            <Button
              onClick={() => setShowCheckin(true)}
              variant="outline"
              size="sm"
              className="w-full"
              disabled={!isPremium}
            >
              Modifier mes réponses
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default MonthlyCheckin;
