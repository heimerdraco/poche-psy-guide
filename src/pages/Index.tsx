
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Book, Edit, Calendar, Plus } from "lucide-react";
import QuestionnaireModal from "@/components/QuestionnaireModal";
import ProfileDisplay from "@/components/ProfileDisplay";
import JournalingSection from "@/components/JournalingSection";
import ExercisesSection from "@/components/ExercisesSection";
import SubscriptionModal from "@/components/SubscriptionModal";

const Index = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [userProfile, setUserProfile] = useState<string | null>(localStorage.getItem('psyProfile'));
  const [showSubscription, setShowSubscription] = useState(false);
  const [trialDays, setTrialDays] = useState(3);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const trialStart = localStorage.getItem('trialStart');
    if (trialStart) {
      const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
      setTrialDays(Math.max(0, 3 - daysPassed));
    } else if (userProfile) {
      localStorage.setItem('trialStart', Date.now().toString());
    }
  }, [userProfile]);

  const quotes = [
    "La première richesse est la santé. - Ralph Waldo Emerson",
    "Ce qui ne nous tue pas nous rend plus fort. - Friedrich Nietzsche",
    "Le bonheur n'est pas une destination, c'est une façon de voyager. - Margaret Lee Runbeck",
    "Votre esprit est un jardin, vos pensées sont les graines. - Anonyme",
    "La paix vient de l'intérieur. Ne la cherchez pas à l'extérieur. - Bouddha"
  ];

  const todayQuote = quotes[new Date().getDate() % quotes.length];

  const handleProfileComplete = (profile: string) => {
    setUserProfile(profile);
    localStorage.setItem('psyProfile', profile);
    if (!localStorage.getItem('trialStart')) {
      localStorage.setItem('trialStart', Date.now().toString());
    }
    setShowQuestionnaire(false);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Psy de poche
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Votre compagnon de bien-être psychologique personnalisé. 
              Découvrez votre profil émotionnel et suivez un parcours adapté à vos besoins.
            </p>
            
            <Card className="max-w-4xl mx-auto mb-8 shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Questionnaire personnalisé</h3>
                    <p className="text-gray-600">Découvrez votre profil émotionnel unique parmi 7 types</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Book className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Parcours adapté</h3>
                    <p className="text-gray-600">Exercices et conseils personnalisés selon votre profil</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Edit className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Journal personnel</h3>
                    <p className="text-gray-600">Suivez votre évolution avec des outils de réflexion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100">
                ✨ Essai gratuit 3 jours puis 9,99€/mois
              </Badge>
            </div>

            <Button 
              onClick={() => setShowQuestionnaire(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Commencer mon évaluation
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Psy de poche
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {trialDays > 0 ? (
              <Badge variant="outline" className="border-green-500 text-green-700">
                Essai gratuit : {trialDays} jours restants
              </Badge>
            ) : (
              <Button 
                onClick={() => setShowSubscription(true)}
                variant="outline"
                className="border-orange-500 text-orange-700 hover:bg-orange-50"
              >
                S'abonner maintenant
              </Button>
            )}
          </div>
        </header>

        <nav className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { key: 'home', label: 'Accueil', icon: Heart },
            { key: 'profile', label: 'Mon Profil', icon: User },
            { key: 'exercises', label: 'Exercices', icon: Book },
            { key: 'journal', label: 'Journal', icon: Edit },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={currentSection === key ? "default" : "outline"}
              onClick={() => setCurrentSection(key)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </nav>

        {currentSection === 'home' && (
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Citation du jour
                </h2>
                <blockquote className="text-lg text-gray-700 italic border-l-4 border-blue-500 pl-4">
                  {todayQuote}
                </blockquote>
              </CardContent>
            </Card>
            <ProfileDisplay profile={userProfile} />
          </div>
        )}

        {currentSection === 'profile' && <ProfileDisplay profile={userProfile} />}
        {currentSection === 'exercises' && <ExercisesSection profile={userProfile} />}
        {currentSection === 'journal' && <JournalingSection />}

        <SubscriptionModal 
          isOpen={showSubscription}
          onClose={() => setShowSubscription(false)}
        />
      </div>
    </div>
  );
};

export default Index;
