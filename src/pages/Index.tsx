import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Book, Edit, MessageCircle, Calendar, Sparkles } from "lucide-react";
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
import AnimatedNatureBackground from "@/components/AnimatedNatureBackground";
import DailyMoodWidget from "@/components/DailyMoodWidget";
import ActivityCompletionCelebration from "@/components/ActivityCompletionCelebration";
import Mascot from "@/components/Mascot";
import EnhancedButton from "@/components/EnhancedButton";
import DisclaimerModal from "@/components/DisclaimerModal";

const Index = () => {
  const navigate = useNavigate();
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [userProfile, setUserProfile] = useState<string | null>(localStorage.getItem('arboriaProfile'));
  const [showSubscription, setShowSubscription] = useState(false);
  const [trialDays, setTrialDays] = useState(3);
  const [currentSection, setCurrentSection] = useState('home');
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [showSplash, setShowSplash] = useState(!userProfile);
  const [currentPhase, setCurrentPhase] = useState<'calm' | 'hopeful' | 'warm'>('calm');
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedActivity, setCompletedActivity] = useState('');

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

    // Listen for upgrade events from locked activities
    const handleUpgradeEvent = () => {
      setShowSubscription(true);
    };

    window.addEventListener('openSubscription', handleUpgradeEvent);
    return () => {
      window.removeEventListener('openSubscription', handleUpgradeEvent);
    };
  }, [userProfile]);

  const handleProfileComplete = async (profile: string) => {
    console.log('Profil reçu:', profile);
    
    setUserProfile(profile);
    localStorage.setItem('arboriaProfile', profile);
    
    if (!localStorage.getItem('trialStart')) {
      localStorage.setItem('trialStart', Date.now().toString());
    }
    
    setShowQuestionnaire(false);
    setCurrentSection('journey');
    
    console.log('Profil défini et redirection vers journey');
  };

  const handleUpgrade = () => {
    setShowSubscription(true);
  };

  const handleStartQuestionnaire = () => {
    // Vérifier si le disclaimer a été accepté
    const disclaimerAccepted = localStorage.getItem('arboriaDisclaimerAccepted');
    
    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
    } else {
      setShowQuestionnaire(true);
    }
  };

  const handleDisclaimerAccepted = () => {
    setShowDisclaimer(false);
    setShowQuestionnaire(true);
  };

  // Show splash screen for new users
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Show trial expired screen if trial is over
  if (isTrialExpired) {
    return <TrialExpiredScreen onUpgrade={handleUpgrade} />;
  }

  const quotes = [
    "Prendre soin de soi n'est pas de l'égoïsme, c'est de l'amour-propre 🌿",
    "Chaque petit pas compte sur le chemin de la guérison 🌱",
    "Tu es plus fort(e) que tu ne le penses 🌳",
    "Aujourd'hui, sois doux/douce avec toi-même 🍃",
    "Tes émotions sont valides et méritent d'être entendues 💚"
  ];

  const todayQuote = quotes[new Date().getDate() % quotes.length];

  if (!userProfile) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-sage-100 via-cream-50 to-forest-100">
        <AnimatedNatureBackground />
        
        {/* MASCOTTE TOUJOURS VISIBLE */}
        <Mascot phase={currentPhase} isInteracting={currentSection !== 'home'} />
        
        <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
          <div className="text-center mb-12 animate-slide-in-gentle">
            <div className="inline-flex items-center gap-3 mb-6">
              {/* Logo circulaire amélioré */}
              <div className="w-16 h-16 bg-gradient-to-br from-sage-200/90 to-forest-200/90 rounded-full p-2 animate-pulse-gentle shadow-xl backdrop-blur-sm border-2 border-white/50">
                <img 
                  src="/lovable-uploads/71692815-441c-473e-8dca-dc19e4da3570.png" 
                  alt="Arboria Logo"
                  className="w-full h-full object-contain drop-shadow-lg rounded-full"
                />
              </div>
              <h1 className="text-3xl font-bold text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>
                Arboria
              </h1>
            </div>
            
            <p className="text-lg text-forest-700 mb-8 leading-relaxed animate-fade-in" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Votre compagnon de bien-être émotionnel. Un espace d'enracinement pour cultiver votre équilibre intérieur 🌿
            </p>
            
            <Card className="mb-8 shadow-lg border-0 bg-cream-50/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-sage-200">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-sage-100 to-forest-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                      <User className="w-8 h-8 text-forest-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>Découvrez votre profil émotionnel</h3>
                    <p className="text-forest-600 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>Un questionnaire bienveillant pour mieux vous comprendre</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-forest-100 to-sage-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '1s' }}>
                      <Book className="w-8 h-8 text-sage-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>Parcours personnalisé</h3>
                    <p className="text-forest-600 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>Un parcours d'1 an adapté à vos besoins émotionnels</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-sage-100 to-forest-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '2s' }}>
                      <MessageCircle className="w-8 h-8 text-forest-600" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>Accompagnement quotidien</h3>
                    <p className="text-forest-600 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>3 activités par jour pour cultiver votre bien-être</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <Badge variant="secondary" className="text-base px-6 py-3 bg-gradient-to-r from-sage-100 to-forest-100 text-forest-700 border-0 animate-pulse-gentle" style={{ fontFamily: 'Nunito, sans-serif' }}>
                🌱 3 jours gratuits puis Arboria+ à 3,99€/mois
              </Badge>
            </div>

            <EnhancedButton 
              onClick={handleStartQuestionnaire}
              size="lg"
              soundType="success"
              animationType="glow"
              className="w-full bg-gradient-to-r from-sage-500 to-forest-500 hover:from-sage-600 hover:to-forest-600 text-cream-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-0"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              🌿 Découvrir mon profil émotionnel
            </EnhancedButton>
          </div>
        </div>

        <DisclaimerModal 
          isOpen={showDisclaimer}
          onAccept={handleDisclaimerAccepted}
        />

        <QuestionnaireModal 
          isOpen={showQuestionnaire}
          onClose={() => setShowQuestionnaire(false)}
          onComplete={handleProfileComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-sage-100 via-cream-50 to-forest-100">
      <AnimatedNatureBackground />
      
      {/* MASCOTTE TOUJOURS VISIBLE */}
      <Mascot phase={currentPhase} isInteracting={currentSection !== 'home'} />
      
      <div className="container mx-auto px-4 py-4 max-w-md relative z-10">
        <header className="flex justify-between items-center mb-6 animate-slide-in-gentle">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sage-200 to-forest-200 rounded-full p-1 animate-pulse-gentle shadow-md">
              <img 
                src="/lovable-uploads/71692815-441c-473e-8dca-dc19e4da3570.png" 
                alt="Arboria Logo"
                className="w-full h-full object-contain drop-shadow-lg rounded-full"
              />
            </div>
            <h1 className="text-xl font-bold text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>
              Arboria
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {trialDays > 0 ? (
              <Badge variant="outline" className="border-sage-400 text-forest-700 bg-sage-50 animate-pulse-gentle" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Jour {4 - trialDays}/3 gratuit
              </Badge>
            ) : (
              <EnhancedButton 
                onClick={() => setShowSubscription(true)}
                size="sm"
                soundType="calm"
                className="bg-gradient-to-r from-sage-400 to-forest-400 hover:from-sage-500 hover:to-forest-500 text-cream-50 border-0 rounded-full"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                🌿 Arboria+
              </EnhancedButton>
            )}
          </div>
        </header>

        {currentSection === 'home' && (
          <div className="space-y-6 animate-slide-in-gentle">
            {/* Affichage du profil détecté */}
            <Card className="shadow-lg border-0 bg-cream-50/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-sage-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>
                  <User className="w-5 h-5 text-sage-600 animate-twinkle" />
                  Votre profil émotionnel
                </h2>
                <div className="bg-gradient-to-r from-sage-50 to-forest-50 p-4 rounded-xl">
                  <Badge className="bg-gradient-to-r from-sage-300 to-forest-300 text-forest-800 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {userProfile}
                  </Badge>
                  <p className="text-sm text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Votre parcours personnalisé est maintenant disponible ! Il s'adapte à vos besoins émotionnels spécifiques.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Widget d'humeur du jour */}
            <DailyMoodWidget />

            <Card className="shadow-lg border-0 bg-cream-50/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-sage-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>
                  <Calendar className="w-5 h-5 text-sage-600 animate-twinkle" />
                  Pensée du jour
                </h2>
                <blockquote className="text-base text-forest-700 italic leading-relaxed animate-fade-in" style={{ fontFamily: 'Nunito, sans-serif' }}>
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
                className="w-full bg-gradient-to-r from-sage-400 to-forest-400 hover:from-sage-500 hover:to-forest-500 text-cream-50 py-6 text-lg rounded-2xl border-0 shadow-lg animate-slide-in-gentle"
                style={{ fontFamily: 'Nunito, sans-serif', animationDelay: '0.8s' }}
              >
                <Book className="w-6 h-6 mr-2" />
                🌳 Mon parcours de croissance
              </EnhancedButton>
              
              <EnhancedButton
                onClick={() => navigate(`/chat/${userProfile}`)}
                soundType="calm"
                animationType="scale"
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-cream-50 py-6 text-lg rounded-2xl border-0 shadow-lg animate-slide-in-gentle"
                style={{ fontFamily: 'Nunito, sans-serif', animationDelay: '0.9s' }}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                💬 Chat Thérapeutique
              </EnhancedButton>
              
              <EnhancedButton
                onClick={() => setCurrentSection('messages')}
                soundType="calm"
                animationType="scale"
                className="w-full bg-gradient-to-r from-sage-400 to-forest-400 hover:from-sage-500 hover:to-forest-500 text-cream-50 py-6 text-lg rounded-2xl border-0 shadow-lg animate-slide-in-gentle"
                style={{ fontFamily: 'Nunito, sans-serif', animationDelay: '1s' }}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                💌 Messages bienveillants
              </EnhancedButton>
              
              <EnhancedButton
                onClick={() => setShowSubscription(true)}
                soundType="success"
                animationType="glow"
                className="w-full bg-gradient-to-r from-forest-400 to-sage-400 hover:from-forest-500 hover:to-sage-500 text-cream-50 py-6 text-lg rounded-2xl border-0 shadow-lg animate-slide-in-gentle"
                style={{ fontFamily: 'Nunito, sans-serif', animationDelay: '1.2s' }}
              >
                <Sparkles className="w-6 h-6 mr-2" />
                🌿 Activer Arboria+
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
        <nav className="fixed bottom-0 left-0 right-0 bg-cream-50/90 backdrop-blur-sm border-t border-sage-200 px-4 py-2 z-50">
          <div className="flex justify-center max-w-md mx-auto">
            <div className="flex gap-1">
              {[
                { key: 'home', label: '🏠', icon: User },
                { key: 'journey', label: '🌳', icon: Book },
                { key: 'chat', label: '💬', icon: MessageCircle, isRoute: true, route: `/chat/${userProfile}` },
                { key: 'messages', label: '💌', icon: MessageCircle },
                { key: 'journal', label: '📝', icon: Edit },
                { key: 'settings', label: '⚙️', icon: User, isRoute: true, route: '/settings' },
              ].map(({ key, label, icon: Icon, isRoute, route }) => (
                <EnhancedButton
                  key={key}
                  variant={currentSection === key ? "default" : "ghost"}
                  onClick={() => {
                    if (isRoute) {
                      navigate(route || `/${key}`);
                    } else {
                      setCurrentSection(key);
                    }
                  }}
                  soundType="click"
                  animationType="scale"
                  className={`flex flex-col items-center gap-1 h-12 px-3 rounded-xl transition-all duration-200 ${
                    currentSection === key 
                      ? 'bg-gradient-to-r from-sage-400 to-forest-400 text-cream-50' 
                      : 'text-forest-600 hover:bg-sage-50'
                  }`}
                  size="sm"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
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

        <ActivityCompletionCelebration 
          isVisible={showCelebration}
          onClose={() => setShowCelebration(false)}
          activityTitle={completedActivity}
        />
      </div>
    </div>
  );
};

export default Index;
