
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "@/components/Chat";

const ChatPage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer le profil de l'utilisateur depuis le localStorage
    const profile = localStorage.getItem('userProfile');
    
    if (!profile) {
      // Si pas de profil, rediriger vers la page d'accueil
      navigate('/');
      return;
    }

    setUserProfile(profile);
  }, [navigate]);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-300 border-t-emerald-600 rounded-full"></div>
      </div>
    );
  }

  return <Chat profile={userProfile} />;
};

export default ChatPage;
