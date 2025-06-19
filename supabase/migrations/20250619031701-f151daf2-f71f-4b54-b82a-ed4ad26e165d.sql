
-- Table pour les utilisateurs avec leur profil émotionnel
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL UNIQUE,
  profile TEXT,
  trial_start TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les réponses du questionnaire
CREATE TABLE public.questionnaire_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  answer TEXT NOT NULL,
  points JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les messages anonymes
CREATE TABLE public.anonymous_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sent', 'received')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour le journaling
CREATE TABLE public.journaling (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT NOT NULL,
  day INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les paramètres de rappel
CREATE TABLE public.reminder_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL UNIQUE,
  reminder_time TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer Row Level Security sur toutes les tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anonymous_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journaling ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminder_settings ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour permettre l'accès basé sur device_id (stocké dans localStorage)
-- Pour les utilisateurs
CREATE POLICY "Allow all operations for users" ON public.users FOR ALL USING (true) WITH CHECK (true);

-- Pour les réponses du questionnaire
CREATE POLICY "Allow all operations for questionnaire_answers" ON public.questionnaire_answers FOR ALL USING (true) WITH CHECK (true);

-- Pour les messages anonymes
CREATE POLICY "Allow all operations for anonymous_messages" ON public.anonymous_messages FOR ALL USING (true) WITH CHECK (true);

-- Pour le journaling
CREATE POLICY "Allow all operations for journaling" ON public.journaling FOR ALL USING (true) WITH CHECK (true);

-- Pour les paramètres de rappel
CREATE POLICY "Allow all operations for reminder_settings" ON public.reminder_settings FOR ALL USING (true) WITH CHECK (true);

-- Index pour améliorer les performances
CREATE INDEX idx_users_device_id ON public.users (device_id);
CREATE INDEX idx_questionnaire_answers_device_id ON public.questionnaire_answers (device_id);
CREATE INDEX idx_anonymous_messages_device_id ON public.anonymous_messages (device_id);
CREATE INDEX idx_journaling_device_id ON public.journaling (device_id);
CREATE INDEX idx_reminder_settings_device_id ON public.reminder_settings (device_id);
