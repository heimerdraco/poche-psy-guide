
-- Supprimer les données utilisateur existantes pour repartir sur de bonnes bases
DELETE FROM completed_activities;
DELETE FROM questionnaire_answers;
DELETE FROM journey_progress;
DELETE FROM users;

-- Supprimer les anciennes activités pour les remplacer par de nouvelles
DELETE FROM activities;

-- Insérer des activités complètes pour les 7 profils émotionnels
-- Chaque profil aura au moins 20 activités variées (matin/midi/soir et explanatory/audio/notebook)

-- PROFIL: anxieux (L'Anxieux)
INSERT INTO activities (title, description, type, activity_format, content, target_profiles, day_min, day_max) VALUES
('Respiration 4-7-8', 'Technique de respiration pour calmer l''anxiété instantanément', 'morning', 'explanatory', '{"steps": ["Inspirez par le nez pendant 4 secondes", "Retenez votre souffle pendant 7 secondes", "Expirez par la bouche pendant 8 secondes", "Répétez 4 fois"]}', '{"anxieux"}', 1, 30),
('Méditation anti-stress', 'Séance audio de 10 minutes pour apaiser l''esprit', 'morning', 'audio', '{"duration": 600, "theme": "stress-relief"}', '{"anxieux"}', 1, 60),
('Journal des inquiétudes', 'Notez vos préoccupations pour les extérioriser', 'evening', 'notebook', '{"prompt": "Quelles sont vos 3 principales inquiétudes aujourd''hui ? Écrivez-les et notez ce qui est sous votre contrôle."}', '{"anxieux"}', 1, 90),
('Technique de la boule de lumière', 'Visualisation apaisante pour calmer l''anxiété', 'afternoon', 'audio', '{"duration": 480, "theme": "calming-light"}', '{"anxieux"}', 5, 120),
('Scan corporel anti-tension', 'Détendez chaque partie de votre corps', 'evening', 'explanatory', '{"steps": ["Allongez-vous confortablement", "Respirez profondément", "Concentrez-vous sur vos pieds, relâchez", "Remontez progressivement jusqu''à la tête"]}', '{"anxieux"}', 3, 45),
('Journal des gratitudes anxieux', 'Notez 3 choses positives malgré l''anxiété', 'evening', 'notebook', '{"prompt": "Malgré vos inquiétudes, quelles sont 3 choses pour lesquelles vous êtes reconnaissant(e) aujourd''hui ?"}', '{"anxieux"}', 7, 150),
('Cohérence cardiaque', 'Synchronisez votre respiration avec votre rythme cardiaque', 'morning', 'audio', '{"duration": 300, "theme": "heart-coherence"}', '{"anxieux"}', 10, 200),
('Analyse des pensées catastrophiques', 'Remettez en question vos pensées négatives', 'afternoon', 'notebook', '{"prompt": "Identifiez une pensée anxieuse récurrente. Est-elle réaliste ? Quelles preuves avez-vous pour et contre ?"}', '{"anxieux"}', 14, 180),

-- PROFIL: fatigue (Le Fatigué)  
('Étirements énergisants', 'Réveil corporel en douceur pour retrouver de l''élan', 'morning', 'explanatory', '{"steps": ["Étirement des bras vers le ciel", "Rotation des épaules", "Étirement latéral", "Respiration profonde"]}', '{"fatigue"}', 1, 45),
('Micro-sieste réparatrice', 'Guide pour une sieste de 20 minutes efficace', 'afternoon', 'audio', '{"duration": 1200, "theme": "power-nap"}', '{"fatigue"}', 1, 90),
('Bilan énergie quotidien', 'Identifiez ce qui vous épuise et ce qui vous ressource', 'evening', 'notebook', '{"prompt": "Qu''est-ce qui vous a donné de l''énergie aujourd''hui ? Qu''est-ce qui vous en a pris ? Comment réajuster demain ?"}', '{"fatigue"}', 1, 120),
('Micro-méditation énergisante', '5 minutes pour retrouver de l''élan', 'afternoon', 'audio', '{"duration": 300, "theme": "energy-boost"}', '{"fatigue"}', 3, 60),
('Cartographie de l''énergie', 'Visualisez vos sources d''énergie personnelles', 'evening', 'notebook', '{"prompt": "Dessinez votre niveau d''énergie sur une semaine. Quels patterns observez-vous ?"}', '{"fatigue"}', 7, 150),
('Réveil progressif', 'Routine matinale douce pour commencer la journée', 'morning', 'explanatory', '{"steps": ["5 respirations profondes dans le lit", "Étirements doux", "Hydratation", "Intention positive pour la journée"]}', '{"fatigue"}', 5, 180),
('Visualisation énergétique', 'Rechargez-vous mentalement', 'morning', 'audio', '{"duration": 420, "theme": "energy-visualization"}', '{"fatigue"}', 10, 200),
('Planification énergétique', 'Organisez votre journée selon votre énergie', 'morning', 'notebook', '{"prompt": "À quel moment de la journée avez-vous le plus d''énergie ? Comment adapter votre planning en conséquence ?"}', '{"fatigue"}', 14, 365),

-- PROFIL: deracine (Le Déraciné)
('Lettre à soi-même passé', 'Reconnectez-vous à vos valeurs profondes', 'morning', 'notebook', '{"prompt": "Écrivez une lettre bienveillante à la personne que vous étiez il y a 5 ans. Que lui diriez-vous ?"}', '{"deracine"}', 1, 60),
('Méditation d''ancrage', 'Retrouvez votre centre intérieur', 'afternoon', 'audio', '{"duration": 900, "theme": "grounding"}', '{"deracine"}', 1, 90),
('Cartographie des liens', 'Visualisez votre réseau de soutien', 'evening', 'explanatory', '{"steps": ["Dessinez un cercle au centre (vous)", "Ajoutez les personnes importantes autour", "Tracez les liens qui vous unissent", "Identifiez les liens à renforcer"]}', '{"deracine"}', 1, 120),
('Rituel d''ancrage matinal', 'Connectez-vous à l''instant présent', 'morning', 'explanatory', '{"steps": ["Posez vos pieds au sol", "Respirez profondément 5 fois", "Nommez 3 choses que vous voyez", "Connectez-vous à votre corps"]}', '{"deracine"}', 3, 150),
('Lettre à un proche', 'Reconnectez-vous avec une personne importante', 'evening', 'notebook', '{"prompt": "Écrivez une lettre (que vous n''enverrez pas forcément) à quelqu''un qui compte pour vous. Exprimez ce que vous ressentez."}', '{"deracine"}', 5, 180),
('Méditation des racines', 'Visualisation pour retrouver vos fondations', 'afternoon', 'audio', '{"duration": 600, "theme": "roots-meditation"}', '{"deracine"}', 7, 200),
('Exploration des valeurs', 'Redécouvrez ce qui compte vraiment pour vous', 'evening', 'notebook', '{"prompt": "Listez 10 valeurs importantes pour vous. Lesquelles vivez-vous pleinement ? Lesquelles négligez-vous ?"}', '{"deracine"}', 10, 250),
('Rituel de connexion nature', 'Retrouvez votre lien avec l''environnement', 'morning', 'explanatory', '{"steps": ["Sortez dehors 10 minutes", "Touchez un arbre ou la terre", "Respirez l''air frais consciemment", "Ressentez votre appartenance au monde"]}', '{"deracine"}', 14, 300),

-- PROFIL: controlant (Le Contrôlant)
('Agenda du chaos', 'Planifiez délibérément de l''imprévu', 'morning', 'notebook', '{"prompt": "Planifiez 15 minutes de ''temps libre'' sans objectif précis dans votre journée. Que pourriez-vous faire de spontané ?"}', '{"controlant"}', 1, 45),
('Dessin spontané', 'Lâchez prise à travers l''art', 'afternoon', 'explanatory', '{"steps": ["Prenez une feuille et un crayon", "Dessinez sans but pendant 10 minutes", "Ne jugez pas le résultat", "Observez ce qui émerge naturellement"]}', '{"controlant"}', 1, 60),
('Méditation du lâcher-prise', 'Apprenez à relâcher le contrôle', 'evening', 'audio', '{"duration": 720, "theme": "letting-go"}', '{"controlant"}', 1, 90),
('Journal des imperfections', 'Acceptez ce qui ne peut être contrôlé', 'evening', 'notebook', '{"prompt": "Qu''est-ce qui a échappé à votre contrôle aujourd''hui ? Comment vous êtes-vous adapté(e) ? Qu''avez-vous appris ?"}', '{"controlant"}', 3, 120),
('Exercice de délégation', 'Pratiquez l''art de faire confiance', 'morning', 'notebook', '{"prompt": "Identifiez une tâche que vous pourriez déléguer cette semaine. À qui ? Quelles sont vos résistances ?"}', '{"controlant"}', 7, 150),
('Respiration de l''acceptation', 'Technique pour accueillir l''imprévu', 'afternoon', 'explanatory', '{"steps": ["Situation stressante : inspirez en acceptant", "Retenez en lâchant mentalement prise", "Expirez en libérant la tension", "Répétez jusqu''à l''apaisement"]}', '{"controlant"}', 5, 180),
('Méditation de l''impermanence', 'Tout change, tout passe', 'morning', 'audio', '{"duration": 540, "theme": "impermanence"}', '{"controlant"}', 10, 220),
('Planification flexible', 'Créez des plans qui s''adaptent', 'evening', 'notebook', '{"prompt": "Révisez votre planning de demain. Ajoutez 3 ''zones tampons'' pour l''imprévu. Comment vous sentez-vous ?"}', '{"controlant"}', 14, 300),

-- PROFIL: hypersensible (L'Hypersensible)
('Bulle de protection', 'Créez votre espace émotionnel sécurisé', 'morning', 'audio', '{"duration": 420, "theme": "protection-bubble"}', '{"hypersensible"}', 1, 60),
('Écriture cathartique', 'Libérez vos émotions par l''écriture', 'evening', 'notebook', '{"prompt": "Écrivez tout ce que vous ressentez, sans censure, pendant 10 minutes. Laissez sortir tout ce qui vous pèse."}', '{"hypersensible"}', 1, 90),
('Respiration de régulation émotionnelle', 'Calmez l''intensité émotionnelle', 'afternoon', 'explanatory', '{"steps": ["Identifiez l''émotion intense", "Inspirez en comptant jusqu''à 6", "Expirez en comptant jusqu''à 8", "Visualisez l''émotion qui s''apaise"]}', '{"hypersensible"}', 1, 45),
('Méditation de compassion', 'Soyez bienveillant avec votre sensibilité', 'morning', 'audio', '{"duration": 600, "theme": "self-compassion"}', '{"hypersensible"}', 3, 120),
('Journal des limites', 'Apprenez à vous protéger sainement', 'evening', 'notebook', '{"prompt": "Dans quelles situations vous sentez-vous envahi(e) ? Quelles limites pourriez-vous poser ? Comment ?"}', '{"hypersensible"}', 5, 150),
('Technique du cocon', 'Créez un refuge intérieur', 'afternoon', 'explanatory', '{"steps": ["Asseyez-vous confortablement", "Fermez les yeux", "Imaginez un cocon de lumière autour de vous", "Seules les énergies positives peuvent entrer"]}', '{"hypersensible"}', 7, 180),
('Méditation des émotions', 'Accueillez sans être submergé', 'morning', 'audio', '{"duration": 480, "theme": "emotional-waves"}', '{"hypersensible"}', 10, 200),
('Cartographie émotionnelle', 'Comprenez vos déclencheurs', 'evening', 'notebook', '{"prompt": "Dessinez votre paysage émotionnel de la semaine. Quels sont vos pics et creux ? Vos déclencheurs récurrents ?"}', '{"hypersensible"}', 14, 250),

-- PROFIL: refoule (Le Refoulé)
('Dialogue intérieur', 'Reconnectez-vous à votre voix intérieure', 'morning', 'notebook', '{"prompt": "Posez-vous la question : ''Qu''est-ce que j''ai vraiment envie de dire aujourd''hui ?'' Écrivez sans filtre."}', '{"refoule"}', 1, 60),
('Méditation de reconnexion', 'Retrouvez le contact avec vos émotions', 'afternoon', 'audio', '{"duration": 600, "theme": "emotional-reconnection"}', '{"refoule"}', 1, 90),
('Scan émotionnel corporel', 'Écoutez ce que dit votre corps', 'evening', 'explanatory', '{"steps": ["Allongez-vous tranquillement", "Scannez votre corps de la tête aux pieds", "Notez les tensions, les sensations", "Demandez-vous : que me dit mon corps ?"]}', '{"refoule"}', 1, 45),
('Journal des non-dits', 'Exprimez ce que vous taisez', 'evening', 'notebook', '{"prompt": "Qu''avez-vous eu envie de dire aujourd''hui mais que vous avez gardé pour vous ? Écrivez-le ici en toute liberté."}', '{"refoule"}', 3, 120),
('Méditation des besoins', 'Redécouvrez vos besoins profonds', 'morning', 'audio', '{"duration": 540, "theme": "needs-discovery"}', '{"refoule"}', 5, 150),
('Expression créative libre', 'Laissez parler votre créativité', 'afternoon', 'explanatory', '{"steps": ["Choisissez un mode d''expression (dessin, chant, danse...)", "Exprimez-vous pendant 15 minutes", "Sans jugement, juste pour le plaisir", "Observez ce qui émerge"]}', '{"refoule"}', 7, 180),
('Dialogue avec ses émotions', 'Donnez la parole à vos ressentis', 'evening', 'notebook', '{"prompt": "Si votre tristesse/colère/joie pouvait parler, que vous dirait-elle ? Écrivez ce dialogue intérieur."}', '{"refoule"}', 10, 200),
('Méditation de l''authenticité', 'Retrouvez qui vous êtes vraiment', 'morning', 'audio', '{"duration": 720, "theme": "authentic-self"}', '{"refoule"}', 14, 250),

-- PROFIL: volcan (Le Volcan)
('Journal de colère', 'Exprimez votre colère de manière constructive', 'evening', 'notebook', '{"prompt": "Qu''est-ce qui vous a mis en colère aujourd''hui ? Écrivez sans retenue, laissez sortir la pression."}', '{"volcan"}', 1, 60),
('Respiration de libération', 'Technique pour évacuer les tensions', 'afternoon', 'explanatory', '{"steps": ["Inspirez profondément par le nez", "Retenez 3 secondes", "Expirez en faisant un son (ahh, ouf...)", "Répétez 10 fois en libérant la tension"]}', '{"volcan"}', 1, 45),
('Méditation de l''apaisement', 'Calmez le feu intérieur', 'morning', 'audio', '{"duration": 600, "theme": "inner-calm"}', '{"volcan"}', 1, 90),
('Cartographie des déclencheurs', 'Identifiez ce qui allume votre colère', 'evening', 'notebook', '{"prompt": "Quelles situations, personnes ou mots déclenchent votre colère ? Pouvez-vous identifier des patterns ?"}', '{"volcan"}', 3, 120),
('Exercice de défoulement', 'Libérez l''énergie accumulée', 'afternoon', 'explanatory', '{"steps": ["Trouvez un espace privé", "Frappez dans un coussin ou criez dans une serviette", "Bougez énergiquement 5 minutes", "Respirez profondément pour revenir au calme"]}', '{"volcan"}', 5, 150),
('Méditation de transformation', 'Transformez la colère en force', 'morning', 'audio', '{"duration": 480, "theme": "anger-transformation"}', '{"volcan"}', 7, 180),
('Journal des solutions', 'Canalisez votre énergie vers l''action', 'evening', 'notebook', '{"prompt": "Face à votre dernière colère, quelles actions constructives pourriez-vous entreprendre ? Comment transformer cette énergie ?"}', '{"volcan"}', 10, 200),
('Technique de pause salvratrice', 'Apprenez à vous arrêter avant l''explosion', 'afternoon', 'explanatory', '{"steps": ["Sentez monter la colère", "STOP - arrêtez-vous immédiatement", "Comptez jusqu''à 10 en respirant", "Sortez de la situation si possible", "Revenez quand vous êtes apaisé"]}', '{"volcan"}', 14, 250);
