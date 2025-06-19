
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Send, Star } from "lucide-react";

interface Message {
  id: string;
  content: string;
  date: string;
  isFromUser: boolean;
}

const MessagesSection = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [dailyMessageSent, setDailyMessageSent] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem('anonymousMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Messages d'exemple bienveillants
      const initialMessages = [
        {
          id: '1',
          content: "Tu es plus fort(e) que tu ne le penses. Chaque jour que tu traverses est une victoire. 💙",
          date: new Date(Date.now() - 86400000).toISOString(),
          isFromUser: false
        },
        {
          id: '2',
          content: "Prends le temps d'être fier(ère) de toi aujourd'hui. Tu fais de ton mieux et c'est déjà beaucoup. 🌸",
          date: new Date(Date.now() - 172800000).toISOString(),
          isFromUser: false
        },
        {
          id: '3',
          content: "Tes émotions sont valides, même les plus difficiles. Tu as le droit de les ressentir. 🫂",
          date: new Date(Date.now() - 259200000).toISOString(),
          isFromUser: false
        }
      ];
      setMessages(initialMessages);
      localStorage.setItem('anonymousMessages', JSON.stringify(initialMessages));
    }

    // Vérifier si un message a déjà été envoyé aujourd'hui
    const lastSent = localStorage.getItem('lastMessageSent');
    const today = new Date().toDateString();
    setDailyMessageSent(lastSent === today);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      date: new Date().toISOString(),
      isFromUser: true
    };

    const updatedMessages = [message, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('anonymousMessages', JSON.stringify(updatedMessages));
    
    // Marquer comme envoyé aujourd'hui
    localStorage.setItem('lastMessageSent', new Date().toDateString());
    setDailyMessageSent(true);
    setNewMessage("");
  };

  const getTodayMessage = () => {
    const today = new Date().toDateString();
    const todayMessages = messages.filter(msg => 
      !msg.isFromUser && new Date(msg.date).toDateString() === today
    );
    
    if (todayMessages.length > 0) {
      return todayMessages[0];
    }
    
    // Messages de secours si aucun message du jour
    const fallbackMessages = [
      "Tu es exactement où tu dois être dans ton parcours. 💜",
      "Chaque petit pas compte, même les plus petits. 🌱",
      "Tu mérites de la douceur, surtout de ta part. 🌙",
      "Tes efforts sont vus, même quand personne ne les remarque. ✨",
      "Tu as survécu à 100% de tes pires journées jusqu'ici. 💪"
    ];
    
    return {
      id: 'daily',
      content: fallbackMessages[new Date().getDate() % fallbackMessages.length],
      date: new Date().toISOString(),
      isFromUser: false
    };
  };

  const todayMessage = getTodayMessage();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
          <MessageCircle className="w-6 h-6 text-pink-500" />
          Messages bienveillants 💌
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Reçois et partage des mots doux anonymement
        </p>
      </div>

      {/* Message du jour */}
      <Card className="border-0 bg-gradient-to-br from-pink-100 to-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Star className="w-5 h-5 text-yellow-500" />
            Message du jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-gray-700 text-lg leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {todayMessage.content}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-500">D'une âme bienveillante</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Envoyer un message */}
      <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Send className="w-5 h-5 text-blue-500" />
            Partager un message bienveillant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!dailyMessageSent ? (
            <>
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écris un message bienveillant pour réconforter quelqu'un... 💙"
                className="min-h-[100px] border-2 border-purple-200 rounded-2xl focus:border-purple-400 bg-white/70"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-2xl border-0 shadow-lg"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                <Send className="w-4 h-4 mr-2" />
                Envoyer avec amour
              </Button>
              <p className="text-sm text-gray-500 text-center">
                1 message gratuit par jour
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
              <p className="text-gray-600 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Merci pour ta bienveillance ! 💜
              </p>
              <p className="text-sm text-gray-500">
                Reviens demain pour partager un nouveau message
              </p>
              <Badge className="mt-3 bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700">
                Messages illimités avec Soutien+
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messages récents */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Messages de la communauté</h3>
        {messages.filter(msg => !msg.isFromUser).slice(0, 5).map((message) => (
          <Card key={message.id} className="border-0 bg-white/70 backdrop-blur-sm shadow-md">
            <CardContent className="p-4">
              <p className="text-gray-700 leading-relaxed mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {message.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span className="text-xs text-gray-500">Anonyme</span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(message.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessagesSection;
