
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Book, Edit, MessageCircle, Calendar, Sparkles } from "lucide-react";
import QuestionnaireModal from "@/components/QuestionnaireModal";
import ProfileDisplay from "@/components/ProfileDisplay";
import JournalingSection from "@/components/JournalingSection";
import ExercisesSection from "@/components/ExercisesSection";
import SubscriptionModal from "@/components/SubscriptionModal";
import MessagesSection from "@/components/MessagesSection";
import EmotionalJourney from "@/components/EmotionalJourney";
import TrialExpiredScreen from "@/components/TrialExpiredScreen";
import DailyQuote from "@/components/DailyQuote";
import MoodTracker from "@/components/MoodTracker";
import QuickThought from "@/components/QuickThought";
import ContinuedJourney from "@/components/ContinuedJourney";
import SplashScreen from "@/components/SplashScreen";
import AnimatedBackground from "@/components/AnimatedBackground";
import Mascot from "@/components/Mascot";
import EnhancedButton from "@/components/EnhancedButton";

const Index = () => {
  const navigate = useNavigate();
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [userProfile, setUserProfile] = useState<string | null>(localStorage.getItem('psyProfile'));
  const [showSubscription, setShowSubscription] = useState(false);
  const [trialDays, setTrialDays] = useState(3);
  const [currentSection, setCurrentSection] = useState('home');
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<'calm' | 'hopeful' | 'warm'>('calm');

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    
    if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      const remainingDays = Math.max(0, 3 - daysPassed);
      setTrialDays(remainingDays);
      setIsTrialExpired(remainingDays === 0);
      
      // Déterminer la phase émotionnelle selon les jours
      if (daysPassed <= 1) setCurrentPhase('calm');
      else if (daysPassed <= 2) setCurrentPhase('hopeful');
      else setCurrentPhase('warm');
    } else if (userProfile) {
      localStorage.setItem('trialStart', Date.now().toString());
      setTrialDays(3);
      setIsTrialExpired(false);
    }
  }, [userProfile]);

  const handleProfileComplete = (profile: string) => {
    console.log('Profil reçu:', profile);
    
    setUserProfile(profile);
    localStorage.setItem('psyProfile', profile);
    
    if (!localStorage.getItem('trialStart')) {
      localStorage.setItem('trialStart', Date.now().toString());
    }
    
    setShowQuestionnaire(false);
    // Rediriger automatiquement vers le parcours émotionnel après détection du profil
    setCurrentSection('journey');
    
    console.log('Profil défini et redirection vers journey');
  };

  const handleUpgrade = () => {
    setShowSubscription(true);
  };

  // Show splash screen on first launch
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Show trial expired screen if trial is over
  if (isTrialExpired) {
    return <TrialExpiredScreen onUpgrade={handleUpgrade} />;
  }

  const quotes = [
    "Prendre soin de soi n'est pas de l'égoïsme, c'est de l'amour-propre 💙",
    "Chaque petit pas compte sur le chemin de la guérison 🌸",
    "Tu es plus fort(e) que tu ne le penses 🌟",
    "Aujourd'hui, sois doux/douce avec toi-même 🫂",
    "Tes émotions sont valides et méritent d'être entendues 💜"
  ];

  const todayQuote = quotes[new Date().getDate() % quotes.length];

  if (!userProfile) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground phase={currentPhase} intensity="subtle" />
        <Mascot phase={currentPhase} />
        
        <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
          <div className="text-center mb-12 animate-slide-in-gentle">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center animate-pulse-gentle">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Psy de poche
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Ton mini-psychologue personnel. Un espace doux pour prendre soin de tes émotions 🌸
            </p>
            
            <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                      <User className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-800">Découvre ton profil émotionnel</h3>
                    <p className="text-gray-600 text-sm">Un questionnaire bienveillant pour mieux te comprendre</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '1s' }}>
                      <Book className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-800">Parcours personnalisé</h3>
                    <p className="text-gray-600 text-sm">Un parcours d'1 an adapté à tes besoins émotionnels</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '2s' }}>
                      <MessageCircle className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-800">Messages bienveillants</h3>
                    <p className="text-gray-600 text-sm">Reçois et partage des mots doux anonymement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <Badge variant="secondary" className="text-base px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 text-gray-700 border-0 animate-pulse-gentle">
                ✨ 3 jours gratuits puis 3,99€/mois
              </Badge>
            </div>

            <EnhancedButton 
              onClick={() => setShowQuestionnaire(true)}
              size="lg"
              soundType="success"
              animationType="glow"
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              🧠 Commencer mon questionnaire
            </EnhancedButton>
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
    <div className="min-h-screen relative">
      <AnimatedBackground phase={currentPhase} intensity="medium" />
      <Mascot phase={currentPhase} isInteracting={currentSection !== 'home'} />
      
      <div className="container mx-auto px-4 py-4 max-w-md relative z-10">
        <header className="flex justify-between items-center mb-6 animate-slide-in-gentle">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center animate-pulse-gentle">
              <Heart className="w-4 h-4 text-purple-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Psy de poche
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {trialDays > 0 ? (
              <Badge variant="outline" className="border-green-400 text-green-700 bg-green-50 animate-pulse-gentle">
                Jour {4 - trialDays}/3 gratuit
              </Badge>
            ) : (
              <EnhancedButton 
                onClick={() => setShowSubscription(true)}
                size="sm"
                soundType="calm"
                className="bg-gradient-to-r from-orange-300 to-pink-300 hover:from-orange-400 hover:to-pink-400 text-gray-800 border-0 rounded-full"
              >
                💎 Soutien+
              </EnhancedButton>
            )}
          </div>
        </header>

        {currentSection === 'home' && (
          <div className="space-y-6 animate-slide-in-gentle">
            {/* Affichage du profil détecté */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <User className="w-5 h-5 text-purple-600 animate-twinkle" />
                  Ton profil émotionnel
                </h2>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                  <Badge className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 mb-2">
                    {userProfile}
                  </Badge>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Ton parcours personnalisé est maintenant disponible ! Il s'adapte à tes besoins émotionnels spécifiques.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <Calendar className="w-5 h-5 text-purple-600 animate-twinkle" />
                  Message du jour
                </h2>
                <blockquote className="text-base text-gray-700 italic leading-relaxed animate-fade-in" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  {todayQuote}
                </blockquote>
              </CardContent>
            </Card>

            {/* Daily Features */}
            <div className="space-y-4">
              <div className="animate-slide-in-gentle" style={{ animationDelay: '0.2s' }}>
                <DailyQuote />
              </div>
              <div className="animate-slide-in-gentle" style={{ animationDelay: '0.4s' }}>
                <MoodTracker />
              </div>
              <div className="animate-slide-in-gentle" style={{ animationDelay: '0.6s' }}>
                <QuickThought />
              </div>
            </div>

            <div className="grid gap-4">
              <EnhancedButton
                onClick={() => setCurrentSection('journey')}
                soundType="click"
                animationType="bounce"
                className="w-full bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 text-gray-800 py-6 text-lg rounded-2xl border-0 shadow-lg animate-slide-in-gentle"
                style={{ fontFamily: 'Nunito, sans-serif', animationDelay: '0.8s' }}
              >
                <Book className="w-6 h-6 mr-2" />
                🌟 Mon cheminement personnel
              </EnhancedButton>
              
              <EnhancedButton
                onClick={() => setCurrentSection('messages')}
                soundType="calm"
                animationType="scale"
                className="w-full bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-gray-800 py-6 text-lg rounded-2xl border-0 shadow-lg animate-slide-in-gentle"
                style={{ fontFamily: 'Nunito, sans-serif', animationDelay: '1s' }}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                💌 Messages bienveillants
              </EnhancedButton>
              
              <EnhancedButton
                onClick={() => setShowSubscription(true)}
                soundType="success"
                animationType="glow"
                className="w-full bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400 text-gray-800 py-6 text-lg rounded-2xl border-0 shadow-lg animate-slide-in-gentle"
                style={{ fontFamily: 'Nunito, sans-serif', animationDelay: '1.2s' }}
              >
                <Sparkles className="w-6 h-6 mr-2" />
                💎 Activer Soutien+
              </EnhancedButton>
            </div>
          </div>
        )}

        {currentSection === 'journey' && userProfile && (
          <div className="space-y-6 animate-slide-in-gentle">
            <EmotionalJourney profile={userProfile} trialDays={trialDays} />
            <ContinuedJourney profile={userProfile} trialDays={trialDays} />
          </div>
        )}

        {currentSection === 'profile' && <ProfileDisplay onOpenQuestionnaire={() => setShowQuestionnaire(true)} />}
        {currentSection === 'journal' && <JournalingSection />}
        {currentSection === 'messages' && <MessagesSection />}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-purple-100 px-4 py-2 z-50">
          <div className="flex justify-center max-w-md mx-auto">
            <div className="flex gap-1">
              {[
                { key: 'home', label: '🏠', icon: Heart },
                { key: 'journey', label: '🌟', icon: Book },
                { key: 'messages', label: '💌', icon: MessageCircle },
                { key: 'journal', label: '📝', icon: Edit },
                { key: 'settings', label: '⚙️', icon: User, isRoute: true },
              ].map(({ key, label, icon: Icon, isRoute }) => (
                <EnhancedButton
                  key={key}
                  variant={currentSection === key ? "default" : "ghost"}
                  onClick={() => isRoute ? navigate('/settings') : setCurrentSection(key)}
                  soundType="click"
                  animationType="scale"
                  className={`flex flex-col items-center gap-1 h-12 px-3 rounded-xl transition-all duration-200 ${
                    currentSection === key 
                      ? 'bg-gradient-to-r from-purple-300 to-pink-300 text-gray-800' 
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                  size="sm"
                >
                  <span className="text-lg">{label}</span>
                </EnhancedButton>
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
