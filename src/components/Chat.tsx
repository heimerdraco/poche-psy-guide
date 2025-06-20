
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, RefreshCw, Users, MessageCircle, Shuffle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { chatService } from "@/lib/chatService";
import { getProfileData } from "@/lib/profilesData";
import EnhancedButton from "./EnhancedButton";
import { useToast } from "@/hooks/use-toast";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import ChatAccessGuard from "./ChatAccessGuard";

interface ChatProps {
  profile: string;
}

interface ChatMessage {
  id: string;
  pseudonym: string;
  message: string;
  created_at: string;
  device_id: string;
  is_moderated: boolean;
}

const Chat = ({ profile }: ChatProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { playSuccess } = useSoundEffects();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userPseudonym, setUserPseudonym] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);

  const profileData = getProfileData(profile);
  const deviceId = localStorage.getItem('device_id');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    loadUserPseudonym();
    loadMessages();
  }, [profile]);

  useEffect(() => {
    // Setup realtime subscription only once
    if (!channelRef.current) {
      setupRealtimeSubscription();
    }

    // Cleanup function
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [profile, deviceId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadUserPseudonym = async () => {
    const pseudonym = await chatService.getUserPseudonym(profile);
    setUserPseudonym(pseudonym);
  };

  const loadMessages = async () => {
    setLoading(true);
    const chatMessages = await chatService.getMessages(profile);
    setMessages(chatMessages);
    setLoading(false);
  };

  const setupRealtimeSubscription = () => {
    // Clean up existing channel if any
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    // Create new channel with unique name
    const channelName = `chat-messages-${profile}-${Date.now()}`;
    channelRef.current = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `profile=eq.${profile}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
          
          // Si ce n'est pas notre message, compter comme nouveau
          if (newMessage.device_id !== deviceId) {
            setNewMessageCount(prev => prev + 1);
            playSuccess(); // Son discret pour nouveau message
          }
        }
      )
      .subscribe();
  };

  // Réinitialiser le compteur quand l'utilisateur scrolle vers le bas
  useEffect(() => {
    const handleScroll = () => {
      const container = messagesEndRef.current?.parentElement;
      if (container) {
        const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
        if (isAtBottom) {
          setNewMessageCount(0);
        }
      }
    };

    const container = messagesEndRef.current?.parentElement;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChangePseudonym = async () => {
    const newPseudonym = await chatService.changePseudonym(profile);
    setUserPseudonym(newPseudonym);
    toast({
      title: "Pseudonyme mis à jour",
      description: `Votre nouveau pseudonyme est : ${newPseudonym}`,
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);

    // Modération du message avec nouvelle logique avancée
    const moderation = await chatService.moderateMessage(newMessage);
    
    if (!moderation.isAllowed) {
      toast({
        title: "⚠️ Message bloqué",
        description: moderation.reason || "Ce message a été bloqué pour non-respect des règles du chat.",
        variant: "destructive",
      });
      
      setNewMessage("");
      setSending(false);
      return;
    }

    // Envoyer le message
    const success = await chatService.sendMessage(profile, newMessage, userPseudonym);
    
    if (success) {
      setNewMessage("");
      toast({
        title: "Message envoyé",
        description: "Votre message a été publié avec succès.",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
        variant: "destructive",
      });
    }
    
    setSending(false);
  };

  const isMyMessage = (message: ChatMessage) => message.device_id === deviceId;

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ChatAccessGuard profile={profile}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 p-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <header className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Chat Thérapeutique {profileData.name}
                {newMessageCount > 0 && (
                  <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {newMessageCount}
                  </Badge>
                )}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Espace bienveillant et sécurisé pour échanger avec d'autres personnes partageant votre profil
              </p>
            </div>
            <Badge className={`bg-gradient-to-r ${profileData.color} text-white`}>
              <Users className="w-3 h-3 mr-1" />
              {profileData.name}
            </Badge>
          </header>

          {/* Pseudonym display */}
          <Card className="mb-4 bg-white/80 backdrop-blur-sm border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vous participez en tant que :</p>
                  <p className="font-bold text-emerald-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    {userPseudonym || 'Chargement...'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    🔒 Votre identité reste anonyme et protégée
                  </p>
                </div>
                <EnhancedButton
                  onClick={handleChangePseudonym}
                  size="sm"
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  soundType="click"
                  animationType="scale"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Changer
                </EnhancedButton>
              </div>
            </CardContent>
          </Card>

          {/* Chat interface */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  💬 Discussion en cours
                  <Badge variant="outline" className="text-xs">
                    Modération automatique avancée
                  </Badge>
                </CardTitle>
                <Button
                  onClick={loadMessages}
                  disabled={loading}
                  size="sm"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Messages area */}
              <ScrollArea className="h-96 px-4">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-emerald-300 border-t-emerald-600 rounded-full"></div>
                    <span className="ml-2 text-gray-600">Chargement des messages...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-semibold mb-2">Aucune discussion pour le moment</p>
                    <p className="text-sm">Soyez le premier à partager un message bienveillant !</p>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        🛡️ Cet espace est protégé par une modération automatique avancée pour garantir des échanges respectueux
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${isMyMessage(message) ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${
                          message.is_moderated 
                            ? 'bg-red-100 border border-red-200' 
                            : isMyMessage(message)
                              ? `bg-gradient-to-r ${profileData.color} text-white`
                              : 'bg-gray-100 text-gray-800'
                        } rounded-2xl px-4 py-3 shadow-sm`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold ${
                              message.is_moderated 
                                ? 'text-red-600'
                                : isMyMessage(message) 
                                  ? 'text-white/80' 
                                  : 'text-gray-600'
                            }`}>
                              {message.pseudonym}
                            </span>
                            <span className={`text-xs ${
                              message.is_moderated 
                                ? 'text-red-500'
                                : isMyMessage(message) 
                                  ? 'text-white/60' 
                                  : 'text-gray-500'
                            }`}>
                              {formatTime(message.created_at)}
                            </span>
                          </div>
                          <p className={`text-sm leading-relaxed ${
                            message.is_moderated ? 'text-red-700' : ''
                          }`} style={{ fontFamily: 'Nunito, sans-serif' }}>
                            {message.message}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              {/* Message input */}
              <div className="border-t bg-gray-50/50 p-4">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message bienveillant..."
                    className="flex-1 border-emerald-200 focus:border-emerald-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={sending}
                    maxLength={500}
                  />
                  <EnhancedButton
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6"
                    soundType="success"
                    animationType="glow"
                  >
                    <Send className="w-4 h-4" />
                  </EnhancedButton>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    💝 Partagez avec bienveillance et respect • {newMessage.length}/500 caractères
                  </p>
                  <p className="text-xs text-emerald-600">
                    🛡️ Messages protégés par modération automatique avancée
                  </p>
                </div>
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    ℹ️ Les échanges sont modérés automatiquement. Les messages sont anonymisés et non partagés avec des tiers, sauf obligation légale.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ChatAccessGuard>
  );
};

export default Chat;
