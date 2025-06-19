
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Calendar, Sparkles, Book } from "lucide-react";
import EnhancedButton from "@/components/EnhancedButton";
import Mascot from "@/components/Mascot";
import AnimatedNatureBackground from "@/components/AnimatedNatureBackground";

interface CompanionCenteredHomeProps {
  userProfile: string;
  trialDays: number;
  currentPhase: 'calm' | 'hopeful' | 'warm';
  onShowSubscription: () => void;
  onNavigateToJourney: () => void;
  onNavigateToMessages: () => void;
}

const CompanionCenteredHome = ({ 
  userProfile, 
  trialDays, 
  currentPhase, 
  onShowSubscription,
  onNavigateToJourney,
  onNavigateToMessages
}: CompanionCenteredHomeProps) => {
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [dailyActivities, setDailyActivities] = useState<string[]>([]);

  const profileMessages = {
    'Hypersensible Émotionnel': [
      "Bonjour ! Comment vous sentez-vous aujourd'hui ? 🌸",
      "Prenons un moment pour accueillir vos émotions avec bienveillance 💙",
      "Votre sensibilité est une force, cultivons-la ensemble 🌿"
    ],
    'Anxieux Généralisé': [
      "Respirons ensemble, tout va bien se passer ✨",
      "Un pas à la fois, vous êtes plus fort(e) que vos inquiétudes 🌱",
      "Ancrons-nous dans le moment présent 🧘‍♀️"
    ],
    'Perfectionniste Stressé': [
      "Aujourd'hui, soyons doux avec nous-même 🌻",
      "L'imperfection fait partie de la beauté de la vie 🌈",
      "Célébrons les petites victoires du quotidien ⭐"
    ],
    'Introverti Réfléchi': [
      "Bienvenue dans votre espace de calme et de réflexion 🍃",
      "Écoutons la sagesse de votre monde intérieur 🌙",
      "Prenons le temps de nous reconnecter à nous-même 💚"
    ],
    'Empathique Absorbant': [
      "Comment protégeons-nous votre énergie aujourd'hui ? 🛡️",
      "Votre compassion est précieuse, prenons soin de vous aussi 💝",
      "Créons un cocon de bienveillance autour de vous 🦋"
    ]
  };

  const profileActivities = {
    'Hypersensible Émotionnel': [
      "🎨 Expression créative des émotions",
      "🌸 Méditation de pleine conscience",
      "📝 Journal émotionnel guidé"
    ],
    'Anxieux Généralisé': [
      "🌬️ Exercices de respiration",
      "🧘‍♀️ Relaxation progressive",
      "📋 Planification apaisante"
    ],
    'Perfectionniste Stressé': [
      "🌱 Acceptation de l'imperfection",
      "⚖️ Équilibre travail-détente",
      "🎯 Objectifs bienveillants"
    ],
    'Introverti Réfléchi': [
      "📚 Lecture méditative",
      "🌳 Connexion à la nature",
      "💭 Réflexion guidée"
    ],
    'Empathique Absorbant': [
      "🛡️ Protection énergétique",
      "💚 Auto-compassion",
      "🌊 Nettoyage émotionnel"
    ]
  };

  useEffect(() => {
    // Sélectionner un message du jour
    const messages = profileMessages[userProfile as keyof typeof profileMessages] || profileMessages['Hypersensible Émotionnel'];
    const todayMessage = messages[new Date().getDate() % messages.length];
    setWelcomeMessage(todayMessage);

    // Sélectionner les activités du jour
    const activities = profileActivities[userProfile as keyof typeof profileActivities] || profileActivities['Hypersensible Émotionnel'];
    setDailyActivities(activities);
  }, [userProfile]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-sage-100 via-cream-50 to-forest-100">
      <AnimatedNatureBackground />
      
      <div className="container mx-auto px-4 py-4 max-w-md relative z-10">
        {/* Header avec informations d'essai */}
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
                onClick={onShowSubscription}
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

        {/* Compagnon central avec message personnalisé */}
        <div className="text-center mb-8 animate-slide-in-gentle">
          <div className="relative mb-6">
            {/* Compagnon agrandi au centre */}
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-sage-200/90 to-forest-200/90 rounded-full p-4 animate-float shadow-2xl backdrop-blur-sm border-4 border-white/50">
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-6xl">
                  😌
                </div>
              </div>
            </div>
            
            {/* Message de bienvenue personnalisé */}
            <Card className="shadow-lg border-0 bg-cream-50/95 backdrop-blur-sm border border-sage-200 mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-sage-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>
                      Votre compagnon {userProfile}
                    </h3>
                    <p className="text-base text-forest-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {welcomeMessage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activités du jour */}
        <Card className="shadow-lg border-0 bg-cream-50/90 backdrop-blur-sm border border-sage-200 mb-6 animate-slide-in-gentle">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-forest-800" style={{ fontFamily: 'Comfortaa, cursive' }}>
              <Calendar className="w-5 h-5 text-sage-600" />
              Vos activités du jour
            </h3>
            <div className="space-y-3">
              {dailyActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-sage-50/50 rounded-lg hover:bg-sage-100/50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-sage-100 to-forest-100 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <span className="text-forest-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {activity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions principales */}
        <div className="space-y-4 animate-slide-in-gentle">
          <EnhancedButton
            onClick={onNavigateToJourney}
            soundType="click"
            animationType="bounce"
            className="w-full bg-gradient-to-r from-sage-400 to-forest-400 hover:from-sage-500 hover:to-forest-500 text-cream-50 py-6 text-lg rounded-2xl border-0 shadow-lg"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            <Book className="w-6 h-6 mr-2" />
            🌳 Commencer mon parcours
          </EnhancedButton>
          
          <EnhancedButton
            onClick={() => navigate(`/chat/${userProfile}`)}
            soundType="calm"
            animationType="scale"
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-cream-50 py-6 text-lg rounded-2xl border-0 shadow-lg"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            💬 Chat avec mon thérapeute IA
          </EnhancedButton>
          
          <EnhancedButton
            onClick={onNavigateToMessages}
            soundType="calm"
            animationType="scale"
            className="w-full bg-gradient-to-r from-sage-400 to-forest-400 hover:from-sage-500 hover:to-forest-500 text-cream-50 py-6 text-lg rounded-2xl border-0 shadow-lg"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            💌 Messages bienveillants
          </EnhancedButton>
          
          {trialDays > 0 && (
            <EnhancedButton
              onClick={onShowSubscription}
              soundType="success"
              animationType="glow"
              className="w-full bg-gradient-to-r from-forest-400 to-sage-400 hover:from-forest-500 hover:to-sage-500 text-cream-50 py-6 text-lg rounded-2xl border-0 shadow-lg"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <Sparkles className="w-6 h-6 mr-2" />
              🌿 Découvrir Arboria+
            </EnhancedButton>
          )}
        </div>

        <div className="pb-16"></div>
      </div>
      
      {/* Mascotte flottante (plus petite maintenant que le compagnon principal est au centre) */}
      <div className="fixed bottom-20 right-4 z-50">
        <Mascot phase={currentPhase} isInteracting={true} />
      </div>
    </div>
  );
};

export default CompanionCenteredHome;
