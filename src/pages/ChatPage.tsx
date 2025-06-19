
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chat from "@/components/Chat";

const ChatPage = () => {
  const navigate = useNavigate();
  const { profile } = useParams<{ profile: string }>();
  const [userProfile, setUserProfile] = useState<string | null>(null);

  useEffect(() => {
    // Utiliser le profil de l'URL ou récupérer depuis localStorage
    let profileToUse = profile ? decodeURIComponent(profile) : null;
    
    if (!profileToUse) {
      profileToUse = localStorage.getItem('userProfile');
    }
    
    console.log('ChatPage - Profile from URL:', profile);
    console.log('ChatPage - Profile from localStorage:', localStorage.getItem('userProfile'));
    console.log('ChatPage - Profile to use:', profileToUse);
    
    if (!profileToUse || profileToUse === 'undefined') {
      console.log('No valid profile found, redirecting to home');
      navigate('/');
      return;
    }

    setUserProfile(profileToUse);
  }, [navigate, profile]);

  if (!userProfile || userProfile === 'undefined') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-300 border-t-emerald-600 rounded-full"></div>
      </div>
    );
  }

  return <Chat profile={userProfile} />;
};

export default ChatPage;

