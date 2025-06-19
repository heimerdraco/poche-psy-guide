
-- Créer une table pour les 7 profils émotionnels
CREATE TABLE public.emotional_profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  causes TEXT NOT NULL,
  objectives TEXT NOT NULL,
  color_theme TEXT NOT NULL DEFAULT 'from-blue-400 to-purple-400',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insérer les 7 profils émotionnels
INSERT INTO public.emotional_profiles (id, name, description, causes, objectives, color_theme) VALUES
('anxieux', 'L''Anxieux', 'Vit dans l''anticipation négative, sujet au stress chronique', 'Environnement professionnel toxique, charge mentale', 'Réduire les pensées parasites, recréer un sentiment de sécurité', 'from-orange-400 to-red-400'),
('fatigue', 'Le Fatigué', 'Épuisé émotionnellement et physiquement, perte de motivation', 'Burnout, surcharge familiale', 'Rétablir l''énergie, retrouver un équilibre corps-esprit', 'from-gray-400 to-blue-400'),
('deracine', 'Le Déraciné', 'Perte de repères, isolement émotionnel', 'Ruptures, déménagements, deuil', 'Reconstruire son socle, recréer du lien', 'from-green-400 to-teal-400'),
('controlant', 'Le Contrôlant', 'Besoin de tout maîtriser, difficulté à lâcher prise', 'Traumatismes, peur de l''échec', 'Réapprendre à faire confiance, pratiquer le lâcher-prise', 'from-purple-400 to-indigo-400'),
('hypersensible', 'L''Hypersensible', 'Vécu émotionnel intense, difficultés à poser des limites', 'Surstimulation, vécu d''injustice', 'Apaiser les émotions, renforcer les barrières psychologiques', 'from-pink-400 to-rose-400'),
('refoule', 'Le Refoulé', 'Difficulté à exprimer ses ressentis, émotions mises de côté', 'Éducation rigide, traumatismes enfouis', 'Favoriser l''expression, débloquer la parole intérieure', 'from-indigo-400 to-blue-400'),
('volcan', 'Le Volcan', 'Accumule les émotions, jusqu''à l''explosion (colère, crises)', 'Frustrations, pressions sociales', 'Canaliser l''émotion, comprendre ses déclencheurs', 'from-red-400 to-orange-400');

-- Créer une table pour les activités
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('morning', 'afternoon', 'evening')),
  activity_format TEXT NOT NULL CHECK (activity_format IN ('explanatory', 'audio', 'notebook')),
  content JSONB NOT NULL DEFAULT '{}',
  target_profiles TEXT[] NOT NULL DEFAULT '{}',
  day_min INTEGER DEFAULT 1,
  day_max INTEGER DEFAULT 365,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer une table pour suivre les activités complétées
CREATE TABLE public.completed_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  activity_id UUID REFERENCES public.activities(id) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  UNIQUE(device_id, activity_id)
);

-- Créer une table pour les entrées de journal quotidien
CREATE TABLE public.daily_journal (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 5),
  mood_text TEXT,
  written_note TEXT,
  audio_url TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(device_id, date)
);

-- Créer une table pour les permissions utilisateur
CREATE TABLE public.user_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL UNIQUE,
  microphone_granted BOOLEAN DEFAULT false,
  camera_granted BOOLEAN DEFAULT false,
  files_granted BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur toutes les nouvelles tables
ALTER TABLE public.completed_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les activités complétées
CREATE POLICY "Users can view their completed activities" 
  ON public.completed_activities 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their completed activities" 
  ON public.completed_activities 
  FOR INSERT 
  WITH CHECK (true);

-- Politiques RLS pour le journal quotidien
CREATE POLICY "Users can view their journal entries" 
  ON public.daily_journal 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create journal entries" 
  ON public.daily_journal 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their journal entries" 
  ON public.daily_journal 
  FOR UPDATE 
  USING (true);

-- Politiques RLS pour les permissions
CREATE POLICY "Users can view their permissions" 
  ON public.user_permissions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can manage their permissions" 
  ON public.user_permissions 
  FOR ALL 
  USING (true);

-- Insérer quelques activités d'exemple pour chaque profil
INSERT INTO public.activities (title, description, type, activity_format, content, target_profiles) VALUES
-- Activités pour L'Anxieux
('Respiration 4-7-8', 'Technique de respiration pour calmer l''anxiété instantanément', 'morning', 'explanatory', '{"steps": ["Inspirez par le nez pendant 4 secondes", "Retenez votre souffle pendant 7 secondes", "Expirez par la bouche pendant 8 secondes", "Répétez 4 fois"]}', '{"anxieux"}'),
('Journal des inquiétudes', 'Notez vos préoccupations pour les extérioriser', 'evening', 'notebook', '{"prompt": "Quelles sont vos 3 principales inquiétudes aujourd''hui ? Écrivez-les et notez ce qui est sous votre contrôle."}', '{"anxieux"}'),
('Méditation guidée anti-stress', 'Séance audio de 10 minutes pour apaiser l''esprit', 'afternoon', 'audio', '{"duration": 600, "theme": "stress-relief"}', '{"anxieux"}'),

-- Activités pour Le Fatigué
('Étirements énergisants', 'Réveil corporel en douceur', 'morning', 'explanatory', '{"steps": ["Étirement des bras vers le ciel", "Rotation des épaules", "Étirement latéral", "Respiration profonde"]}', '{"fatigue"}'),
('Sieste réparatrice', 'Guide pour une sieste de 20 minutes efficace', 'afternoon', 'audio', '{"duration": 1200, "theme": "power-nap"}', '{"fatigue"}'),
('Bilan énergie', 'Identifiez ce qui vous épuise et ce qui vous ressource', 'evening', 'notebook', '{"prompt": "Qu''est-ce qui vous a donné de l''énergie aujourd''hui ? Qu''est-ce qui vous en a pris ?"}', '{"fatigue"}'),

-- Activités pour Le Déraciné
('Lettre à soi-même', 'Reconnectez-vous à vos valeurs profondes', 'morning', 'notebook', '{"prompt": "Écrivez une lettre bienveillante à la personne que vous étiez il y a 5 ans."}', '{"deracine"}'),
('Méditation d''ancrage', 'Retrouvez votre centre intérieur', 'afternoon', 'audio', '{"duration": 900, "theme": "grounding"}', '{"deracine"}'),
('Cartographie des liens', 'Visualisez votre réseau de soutien', 'evening', 'explanatory', '{"steps": ["Dessinez un cercle au centre (vous)", "Ajoutez les personnes importantes autour", "Tracez les liens qui vous unissent", "Identifiez les liens à renforcer"]}', '{"deracine"}');

-- Index pour améliorer les performances
CREATE INDEX idx_activities_target_profiles ON public.activities USING GIN (target_profiles);
CREATE INDEX idx_completed_activities_device ON public.completed_activities (device_id);
CREATE INDEX idx_daily_journal_device_date ON public.daily_journal (device_id, date);
