
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "@/lib/profilesData";
import EnhancedButton from "./EnhancedButton";

interface ChatButtonProps {
  profile?: string;
  className?: string;
}

const ChatButton = ({ profile, className = "" }: ChatButtonProps) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = profile || localStorage.getItem('userProfile');
    setUserProfile(savedProfile);
  }, [profile]);

  if (!userProfile) {
    return null;
  }

  const profileData = getProfileData(userProfile);

  const handleChatClick = () => {
    navigate('/chat');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <EnhancedButton
        onClick={handleChatClick}
        className={`w-full bg-gradient-to-r ${profileData.color} hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-xl shadow-md`}
        soundType="success"
        animationType="glow"
        style={{ fontFamily: 'Nunito, sans-serif' }}
      >
        <div className="flex items-center justify-center gap-3">
          <MessageCircle className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold">💬 Discussion</div>
            <div className="text-xs opacity-90">Échanger avec votre communauté</div>
          </div>
        </div>
      </EnhancedButton>
      
      <div className="text-center">
        <Badge className={`bg-gradient-to-r ${profileData.color} text-white text-xs px-3 py-1`}>
          <Users className="w-3 h-3 mr-1" />
          Espace {profileData.name}
        </Badge>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Partagez en toute bienveillance avec d'autres personnes qui vous comprennent
        </p>
      </div>
    </div>
  );
};

export default ChatButton;
