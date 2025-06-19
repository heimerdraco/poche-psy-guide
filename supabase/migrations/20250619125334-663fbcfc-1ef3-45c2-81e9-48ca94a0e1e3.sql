
-- Table pour stocker les pseudonymes anonymes des utilisateurs
CREATE TABLE public.user_pseudonyms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL UNIQUE,
  pseudonym TEXT NOT NULL,
  profile TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les messages de chat
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  profile TEXT NOT NULL,
  pseudonym TEXT NOT NULL,
  message TEXT NOT NULL,
  is_moderated BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les mots-clés de modération
CREATE TABLE public.moderation_keywords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL UNIQUE,
  severity TEXT NOT NULL DEFAULT 'medium', -- low, medium, high
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insérer quelques mots-clés de base pour la modération
INSERT INTO public.moderation_keywords (keyword, severity) VALUES
('idiot', 'medium'),
('stupide', 'medium'),
('crétin', 'high'),
('imbécile', 'high'),
('connard', 'high'),
('salaud', 'high'),
('merde', 'low'),
('putain', 'low');

-- Activer RLS sur toutes les tables
ALTER TABLE public.user_pseudonyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_keywords ENABLE ROW LEVEL SECURITY;

-- Politiques pour user_pseudonyms (tous peuvent lire, seul le propriétaire peut modifier)
CREATE POLICY "Tous peuvent voir les pseudonymes" 
  ON public.user_pseudonyms 
  FOR SELECT 
  USING (true);

CREATE POLICY "Utilisateurs peuvent créer leur pseudonyme" 
  ON public.user_pseudonyms 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Utilisateurs peuvent modifier leur pseudonyme" 
  ON public.user_pseudonyms 
  FOR UPDATE 
  USING (true);

-- Politiques pour chat_messages (lecture par profil, création libre)
CREATE POLICY "Lecture des messages par profil" 
  ON public.chat_messages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Création de messages" 
  ON public.chat_messages 
  FOR INSERT 
  WITH CHECK (true);

-- Politiques pour moderation_keywords (lecture libre)
CREATE POLICY "Lecture des mots-clés de modération" 
  ON public.moderation_keywords 
  FOR SELECT 
  USING (true);

-- Activer realtime pour les messages de chat
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.chat_messages;
