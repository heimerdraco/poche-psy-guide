
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Database, RefreshCw, User, MessageSquare, BookOpen, Clock } from "lucide-react";
import { supabaseService } from "@/lib/supabase";

const SupabaseTest = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const userData = await supabaseService.getUserData();
      setData(userData);
      console.log('Données Supabase:', userData);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const testSaveUser = async () => {
    await supabaseService.saveUser('Test Profile', new Date().toISOString());
    loadData();
  };

  const testSaveAnswer = async () => {
    await supabaseService.saveQuestionnaireAnswer(1, 'Test answer', { anxiete: 2 });
    loadData();
  };

  const testSaveMessage = async () => {
    await supabaseService.saveAnonymousMessage('Message de test', 'sent');
    loadData();
  };

  const testSaveJournal = async () => {
    await supabaseService.saveJournalEntry('Entrée de journal test', 'content', 1);
    loadData();
  };

  const testSaveReminder = async () => {
    await supabaseService.saveReminderSettings('09:00', true);
    loadData();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Interface Test Supabase
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={loadData} disabled={loading} size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Recharger
            </Button>
            <Button onClick={testSaveUser} size="sm" variant="outline">
              Test User
            </Button>
            <Button onClick={testSaveAnswer} size="sm" variant="outline">
              Test Answer
            </Button>
            <Button onClick={testSaveMessage} size="sm" variant="outline">
              Test Message
            </Button>
            <Button onClick={testSaveJournal} size="sm" variant="outline">
              Test Journal
            </Button>
            <Button onClick={testSaveReminder} size="sm" variant="outline">
              Test Reminder
            </Button>
          </div>
        </CardContent>
      </Card>

      {data && (
        <div className="grid gap-4">
          {/* Utilisateur */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                Utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.user ? (
                <div className="space-y-2 text-sm">
                  <div><strong>Device ID:</strong> {data.user.device_id}</div>
                  <div><strong>Profil:</strong> {data.user.profile}</div>
                  <div><strong>Début essai:</strong> {data.user.trial_start}</div>
                </div>
              ) : (
                <Badge variant="outline">Aucune donnée utilisateur</Badge>
              )}
            </CardContent>
          </Card>

          {/* Réponses questionnaire */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Réponses Questionnaire ({data.answers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.answers.length > 0 ? (
                <div className="space-y-2">
                  {data.answers.slice(0, 3).map((answer: any, i: number) => (
                    <div key={i} className="text-sm bg-gray-50 p-2 rounded">
                      <div><strong>Q{answer.question_id}:</strong> {answer.answer}</div>
                      <div className="text-xs text-gray-500">Points: {JSON.stringify(answer.points)}</div>
                    </div>
                  ))}
                  {data.answers.length > 3 && <div className="text-xs text-gray-500">... et {data.answers.length - 3} autres</div>}
                </div>
              ) : (
                <Badge variant="outline">Aucune réponse</Badge>
              )}
            </CardContent>
          </Card>

          {/* Messages anonymes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages Anonymes ({data.messages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.messages.length > 0 ? (
                <div className="space-y-2">
                  {data.messages.slice(0, 3).map((message: any, i: number) => (
                    <div key={i} className="text-sm bg-gray-50 p-2 rounded">
                      <div><Badge className="mb-1" variant={message.type === 'sent' ? 'default' : 'secondary'}>{message.type}</Badge></div>
                      <div>{message.message}</div>
                    </div>
                  ))}
                  {data.messages.length > 3 && <div className="text-xs text-gray-500">... et {data.messages.length - 3} autres</div>}
                </div>
              ) : (
                <Badge variant="outline">Aucun message</Badge>
              )}
            </CardContent>
          </Card>

          {/* Journal */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Entrées Journal ({data.journal.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.journal.length > 0 ? (
                <div className="space-y-2">
                  {data.journal.slice(0, 2).map((entry: any, i: number) => (
                    <div key={i} className="text-sm bg-gray-50 p-2 rounded">
                      <div><strong>Jour {entry.day}:</strong> {entry.content.substring(0, 50)}...</div>
                      <div className="text-xs text-gray-500">Humeur: {entry.mood}</div>
                    </div>
                  ))}
                  {data.journal.length > 2 && <div className="text-xs text-gray-500">... et {data.journal.length - 2} autres</div>}
                </div>
              ) : (
                <Badge variant="outline">Aucune entrée</Badge>
              )}
            </CardContent>
          </Card>

          {/* Rappels */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Paramètres Rappels
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.reminders ? (
                <div className="space-y-2 text-sm">
                  <div><strong>Heure:</strong> {data.reminders.reminder_time}</div>
                  <div><strong>Activé:</strong> {data.reminders.enabled ? '✅' : '❌'}</div>
                </div>
              ) : (
                <Badge variant="outline">Aucun paramètre</Badge>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SupabaseTest;
