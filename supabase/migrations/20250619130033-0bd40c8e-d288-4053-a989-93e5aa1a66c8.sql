
-- Supprimer les anciens mots-clés pour les remplacer par une liste plus complète
DELETE FROM public.moderation_keywords;

-- Insérer une liste complète de mots à bloquer
INSERT INTO public.moderation_keywords (keyword, severity) VALUES
-- Contenu sexuel
('sexe', 'high'),
('bite', 'high'),
('chatte', 'high'),
('baiser', 'high'),
('branler', 'high'),
('niquer', 'high'),
('cul', 'medium'),
('sucer', 'high'),
('porno', 'high'),
('sodomie', 'high'),
('fellation', 'high'),
('viol', 'high'),
-- Variantes orthographiques
('b1te', 'high'),
('ch@tte', 'high'),
('s3xe', 'high'),
('p0rn0', 'high'),

-- Violence & haine
('tuer', 'high'),
('meurtre', 'high'),
('crever', 'high'),
('flinguer', 'high'),
('haine', 'high'),
('raciste', 'high'),
('nazi', 'high'),
('pédé', 'high'),
('enculé', 'high'),
('sale juif', 'high'),
('négro', 'high'),
('bougnoule', 'high'),

-- Vulgarité / insultes
('connard', 'high'),
('connasse', 'high'),
('fils de pute', 'high'),
('va te faire foutre', 'high'),
('ta gueule', 'high'),
('bâtard', 'high'),
('merdeux', 'high'),
('idiot', 'medium'),
('stupide', 'medium'),
('crétin', 'high'),
('imbécile', 'high'),
('salaud', 'high'),
('putain', 'low'),
('merde', 'low'),

-- Idées suicidaires ou automutilation
('me suicider', 'high'),
('je veux mourir', 'high'),
('me faire du mal', 'high'),
('m''ouvrir les veines', 'high'),
('overdose', 'high'),
('me flinguer', 'high'),
('suicide', 'high'),
('suicider', 'high'),
('mourir', 'medium'),
('automutilation', 'high'),

-- Variantes supplémentaires
('c0nnard', 'high'),
('enk*lé', 'high'),
('f*ck', 'medium'),
('sh*t', 'medium');
