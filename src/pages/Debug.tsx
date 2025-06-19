
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, RefreshCw, Database, User, Calendar, MessageSquare, BookOpen } from "lucide-react";
import { supabaseService, getDeviceId } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const Debug = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const userData = await supabaseService.getUserData();
      setData(userData);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getTrialStatus = () => {
    const trialStart = localStorage.getItem('trialStart');
    const unlimitedAccess = localStorage.getItem('unlimitedAccess') === 'true';
    
    if (unlimitedAccess) return { status: 'unlimited', message: 'Accès illimité (Dev Mode)' };
    if (!trialStart) return { status: 'not_started', message: 'Essai non commencé' };
    
    const daysPassed = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(0, 3 - daysPassed);
    
    if (daysLeft > 0) {
      return { status: 'active', message: `${daysLeft} jour(s) restant(s)` };
    } else {
      return { status: 'expired', message: 'Essai expiré' };
    }
  };

  const trialStatus = getTrialStatus();

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
          <h1 className="text-2xl font-bold text-gray-800">🔍 Debug Développeur</h1>
          <Button
            onClick={loadData}
            disabled={loading}
            size="sm"
            variant="outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </header>

        <div className="space-y-6">
          {/* Informations système */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Informations Système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Device ID:</strong>
                <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">{getDeviceId()}</code>
              </div>
              
              <div>
                <strong>Profil émotionnel:</strong>
                <Badge className="ml-2" variant="outline">
                  {localStorage.getItem('psyProfile') || 'Non défini'}
                </Badge>
              </div>
              
              <div>
                <strong>Date début essai:</strong>
                <span className="ml-2">
                  {localStorage.getItem('trialStart') 
                    ? new Date(parseInt(localStorage.getItem('trialStart')!)).toLocaleDateString('fr-FR')
                    : 'Non définie'
                  }
                </span>
              </div>
              
              <div>
                <strong>État abonnement:</strong>
                <Badge 
                  className="ml-2" 
                  variant={trialStatus.status === 'expired' ? 'destructive' : 
                          trialStatus.status === 'unlimited' ? 'secondary' : 'default'}
                >
                  {trialStatus.message}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Données Supabase */}
          {data && (
            <>
              {/* Utilisateur */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Utilisateur Supabase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.user ? (
                    <div className="space-y-2">
                      <div><strong>Profil:</strong> {data.user.profile}</div>
                      <div><strong>Début essai:</strong> {data.user.trial_start}</div>
                      <div><strong>Dernière MAJ:</strong> {data.user.updated_at}</div>
                    </div>
                  ) : (
                    <Badge variant="outline">Aucune donnée utilisateur</Badge>
                  )}
                </CardContent>
              </Card>

              {/* Réponses questionnaire */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Réponses Questionnaire ({data.answers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.answers.length > 0 ? (
                    <div className="space-y-3">
                      {data.answers.map((answer: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <strong>Question {answer.question_id}</strong>
                            <Badge variant="outline" className="text-xs">
                              {new Date(answer.created_at).toLocaleDateString('fr-FR')}
                            </Badge>
                          </div>
                          <div className="text-sm mb-2">{answer.answer}</div>
                          <div className="text-xs text-gray-600">
                            Points: {JSON.stringify(answer.points)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline">Aucune réponse</Badge>
                  )}
                </CardContent>
              </Card>

              {/* Messages anonymes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Messages Anonymes ({data.messages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.messages.length > 0 ? (
                    <div className="space-y-3">
                      {data.messages.slice(0, 5).map((message: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant={message.type === 'sent' ? 'default' : 'secondary'}>
                              {message.type === 'sent' ? 'Envoyé' : 'Reçu'}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(message.created_at).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="text-sm">{message.message}</div>
                        </div>
                      ))}
                      {data.messages.length > 5 && (
                        <div className="text-center text-sm text-gray-500">
                          ... et {data.messages.length - 5} autres messages
                        </div>
                      )}
                    </div>
                  ) : (
                    <Badge variant="outline">Aucun message</Badge>
                  )}
                </CardContent>
              </Card>

              {/* Entrées journal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Entrées Journal ({data.journal.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.journal.length > 0 ? (
                    <div className="space-y-3">
                      {data.journal.slice(0, 3).map((entry: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <strong>Jour {entry.day}</strong>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.created_at).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="text-sm mb-2">
                            {entry.content.length > 100 
                              ? entry.content.substring(0, 100) + '...'
                              : entry.content
                            }
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Humeur: {entry.mood}
                          </Badge>
                        </div>
                      ))}
                      {data.journal.length > 3 && (
                        <div className="text-center text-sm text-gray-500">
                          ... et {data.journal.length - 3} autres entrées
                        </div>
                      )}
                    </div>
                  ) : (
                    <Badge variant="outline">Aucune entrée</Badge>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Debug;
