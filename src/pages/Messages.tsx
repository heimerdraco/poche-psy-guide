
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, MessageSquare, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('anonymous_messages')
        .select('*')
        .eq('type', 'received')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Erreur chargement messages:', error);
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <header className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">📬 Messages reçus</h1>
          <Button
            onClick={loadMessages}
            disabled={loading}
            size="sm"
            variant="outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Rafraîchir
          </Button>
        </header>

        <div className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des messages...</p>
              </CardContent>
            </Card>
          ) : messages.length > 0 ? (
            messages.map((message, i) => (
              <Card key={i} className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {message.message}
                      </p>
                      <div className="text-xs text-gray-500">
                        {new Date(message.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun message reçu</h3>
                <p className="text-gray-500 text-sm">
                  Les messages bienveillants d'autres utilisateurs apparaîtront ici.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
