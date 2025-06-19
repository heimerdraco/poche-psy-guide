import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Book, Edit, MessageCircle, Calendar, Sparkles, HelpCircle } from "lucide-react";
import QuestionnaireModal from "@/components/QuestionnaireModal";
import ProfileDisplay from "@/components/ProfileDisplay";
import JournalingSection from "@/components/JournalingSection";
import ExercisesSection from "@/components/ExercisesSection";
import SubscriptionModal from "@/components/SubscriptionModal";
import MessagesSection from "@/components/MessagesSection";
import EmotionalJourney from "@/components/EmotionalJourney";
import DeveloperMode from "@/components/DeveloperMode";
import TrialExpiredScreen from "@/components/TrialExpiredScreen";

const Index = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [userProfile, setUserProfile] = useState<string | null>(localStorage.getItem('psyProfile'));
  const [showSubscription, setShowSubscription] = useState(false);
  const [trialDays, setTrialDays] = useState(3);
  const [currentSection, setCurrentSection] = useState('home');
  const [devMode, setDevMode] = useState(localStorage.getItem('devMode') === 'true');
  const [logoTapCount, setLogoTapCount] = useState(0);

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    const unlimitedAccess = localStorage.getItem('unlimitedAccess') === 'true';
    
    if (unlimitedAccess) {
      setTrialDays(99); // Unlimited for dev mode
    } else if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      setTrialDays(Math.max(0, 3 - daysPassed));
    } else if (userProfile) {
      localStorage.setItem('trialStart', Date.now().toString());
    }
  }, [userProfile]);

  const handleLogoTap = () => {
    setLogoTapCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setDevMode(true);
        localStorage.setItem('devMode', 'true');
        setLogoTapCount(0);
        return 0;
      }
      return newCount;
    });

    // Reset counter after 3 seconds of inactivity
    setTimeout(() => {
      setLogoTapCount(0);
    }, 3000);
  };

  const toggleDevMode = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    if (newDevMode) {
      localStorage.setItem('devMode', 'true');
    } else {
      localStorage.removeItem('devMode');
      localStorage.removeItem('unlimitedAccess');
    }
  };

  const handleDevProfileSelect = (profile: string) => {
    setUserProfile(profile);
    localStorage.setItem('psyProfile', profile);
    if (!localStorage.getItem('trialStart')) {
      localStorage.setItem('trialStart', Date.now().toString());
    }
    setCurrentSection('journey');
  };

  const quotes = [
    "Prendre soin de soi n'est pas de l'égoïsme, c'est de l'amour-propre 💙",
    "Chaque petit pas compte sur le chemin de la guérison 🌸",
    "Tu es plus fort(e) que tu ne le penses 🌟",
    "Aujourd'hui, sois doux/douce avec toi-même 🫂",
    "Tes émotions sont valides et méritent d'être entendues 💜"
  ];

  const todayQuote = quotes[new Date().getDate() % quotes.length];

  const handleProfileComplete = (profile: string) => {
    setUserProfile(profile);
    localStorage.setItem('psyProfile', profile);
    if (!localStorage.getItem('trialStart')) {
      localStorage.setItem('trialStart', Date.now().toString());
    }
    setShowQuestionnaire(false);
    setCurrentSection('journey');
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50" style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fdf2f8 100%)'
      }}>
        <DeveloperMode 
          isActive={devMode}
          onToggle={toggleDevMode}
          onProfileSelect={handleDevProfileSelect}
          currentProfile={userProfile}
        />
        
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <div 
                className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                onClick={handleLogoTap}
              >
                <Heart className="w-6 h-6 text-purple-600" />
                {devMode && <span className="absolute -top-1 -right-1 text-xs">⚙️</span>}
              </div>
              <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Psy de poche
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Ton mini-psychologue personnel. Un espace doux pour prendre soin de tes émotions 🌸
            </p>
            
            <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-800">Découvre ton profil émotionnel</h3>
                    <p className="text-gray-600 text-sm">Un questionnaire bienveillant pour mieux te comprendre</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Book className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-800">Parcours personnalisé</h3>
                    <p className="text-gray-600 text-sm">10 jours d'accompagnement doux adapté à tes besoins</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-800">Messages bienveillants</h3>
                    <p className="text-gray-600 text-sm">Reçois et partage des mots doux anonymement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <Badge variant="secondary" className="text-base px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 text-gray-700 border-0">
                ✨ 3 jours gratuits puis 3,99€/mois
              </Badge>
            </div>

            <Button 
              onClick={() => setShowQuestionnaire(true)}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              🧠 Commencer mon questionnaire
            </Button>
          </div>
        </div>

        <QuestionnaireModal 
          isOpen={showQuestionnaire}
          onClose={() => setShowQuestionnaire(false)}
          onComplete={handleProfileComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50" style={{
      background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fdf2f8 100%)'
    }}>
      <DeveloperMode 
        isActive={devMode}
        onToggle={toggleDevMode}
        onProfileSelect={handleDevProfileSelect}
        currentProfile={userProfile}
      />
      
      <div className="container mx-auto px-4 py-4 max-w-md">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 relative"
              onClick={handleLogoTap}
            >
              <Heart className="w-4 h-4 text-purple-600" />
              {devMode && <span className="absolute -top-1 -right-1 text-xs">⚙️</span>}
            </div>
            <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Psy de poche
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {trialDays > 0 && trialDays < 90 ? (
              <Badge variant="outline" className="border-green-400 text-green-700 bg-green-50">
                Jour {4 - trialDays}/3 gratuit
              </Badge>
            ) : trialDays >= 90 ? (
              <Badge className="bg-red-100 text-red-800">
                🔓 Dev Mode
              </Badge>
            ) : (
              <Button 
                onClick={() => setShowSubscription(true)}
                size="sm"
                className="bg-gradient-to-r from-orange-300 to-pink-300 hover:from-orange-400 hover:to-pink-400 text-gray-800 border-0 rounded-full"
              >
                💎 Soutien+
              </Button>
            )}
          </div>
        </header>

        {currentSection === 'home' && (
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Message du jour
                </h2>
                <blockquote className="text-base text-gray-700 italic leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {todayQuote}
                </blockquote>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Button
                onClick={() => setCurrentSection('journey')}
                className="w-full bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 text-gray-800 py-6 text-lg rounded-2xl border-0 shadow-lg"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                <Book className="w-6 h-6 mr-2" />
                📚 Explorer mon parcours émotionnel
              </Button>
              
              <Button
                onClick={() => setCurrentSection('messages')}
                className="w-full bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-gray-800 py-6 text-lg rounded-2xl border-0 shadow-lg"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                💌 Messages bienveillants
              </Button>
              
              <Button
                onClick={() => setShowSubscription(true)}
                className="w-full bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400 text-gray-800 py-6 text-lg rounded-2xl border-0 shadow-lg"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                <Sparkles className="w-6 h-6 mr-2" />
                💎 Activer Soutien+
              </Button>
            </div>
          </div>
        )}

        {currentSection === 'journey' && <EmotionalJourney profile={userProfile} trialDays={trialDays} />}
        {currentSection === 'profile' && <ProfileDisplay profile={userProfile} />}
        {currentSection === 'journal' && <JournalingSection />}
        {currentSection === 'messages' && <MessagesSection />}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-purple-100 px-4 py-2">
          <div className="flex justify-center max-w-md mx-auto">
            <div className="flex gap-1">
              {[
                { key: 'home', label: '🏠', icon: Heart },
                { key: 'journey', label: '📚', icon: Book },
                { key: 'messages', label: '💌', icon: MessageCircle },
                { key: 'journal', label: '📝', icon: Edit },
                { key: 'profile', label: '👤', icon: User },
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={currentSection === key ? "default" : "ghost"}
                  onClick={() => setCurrentSection(key)}
                  className={`flex flex-col items-center gap-1 h-12 px-3 rounded-xl ${
                    currentSection === key 
                      ? 'bg-gradient-to-r from-purple-300 to-pink-300 text-gray-800' 
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                  size="sm"
                >
                  <span className="text-lg">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        </nav>

        <div className="pb-16"></div>

        <SubscriptionModal 
          isOpen={showSubscription}
          onClose={() => setShowSubscription(false)}
        />
      </div>
    </div>
  );
};

export default Index;
