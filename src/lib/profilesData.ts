
export const profilesData = {
  "Épuisement mental": {
    name: "Le Surmené Structuré",
    description: "un esprit structuré qui oublie parfois de respirer",
    explanation: "Vous êtes hyper-organisé mais souvent anxieux. Votre quête de perfection vous mène parfois vers l'épuisement. Il est temps d'apprendre à faire des pauses et à lâcher prise.",
    color: "from-blue-400 to-cyan-400",
    activities: [
      // Jour 1
      [
        { title: "Micro-méditation express", description: "3 minutes de respiration guidée", duration: "3 min", type: "meditation" },
        { title: "Check-list inversée", description: "Noter ce que vous n'avez PAS à faire aujourd'hui", duration: "5 min", type: "exercise" },
        { title: "Pause sensorielle", description: "Observer 5 choses autour de vous", duration: "2 min", type: "mindfulness" }
      ],
      // Jour 2
      [
        { title: "Respiration 4-7-8", description: "Technique de relaxation profonde", duration: "5 min", type: "breathing" },
        { title: "Rupture de routine", description: "Changez une habitude aujourd'hui", duration: "10 min", type: "challenge" },
        { title: "Journal de gratitude", description: "3 choses positives de votre journée", duration: "3 min", type: "writing" }
      ],
      // Jour 3
      [
        { title: "Méditation du lâcher-prise", description: "Accepter ce qui ne dépend pas de vous", duration: "8 min", type: "meditation" },
        { title: "Planification douce", description: "Organiser sans pression", duration: "10 min", type: "planning" },
        { title: "Automassage détente", description: "Relâcher les tensions physiques", duration: "5 min", type: "body" }
      ]
    ]
  },
  
  "Anxiété / blocage": {
    name: "L'Inquiet Chronique",
    description: "un esprit qui imagine souvent le pire mais peut apprendre la sérénité",
    explanation: "Votre mental anticipe constamment les difficultés. Cette vigilance peut être un atout, mais elle vous épuise. Apprenons ensemble à apaiser ces inquiétudes.",
    color: "from-red-400 to-orange-400",
    activities: [
      // Jour 1
      [
        { title: "3 preuves que tout va bien", description: "Identifier le positif dans votre réalité", duration: "5 min", type: "exercise" },
        { title: "Ancrage sensoriel", description: "Technique 5-4-3-2-1 pour revenir au présent", duration: "4 min", type: "mindfulness" },
        { title: "Respiration carrée", description: "Calmer le système nerveux", duration: "6 min", type: "breathing" }
      ],
      // Jour 2
      [
        { title: "Reframing des pensées", description: "Transformer une inquiétude en action", duration: "8 min", type: "cognitive" },
        { title: "Marche consciente", description: "5 minutes de marche en pleine conscience", duration: "5 min", type: "movement" },
        { title: "Visualisation sécurisante", description: "Créer votre lieu de paix mental", duration: "7 min", type: "visualization" }
      ],
      // Jour 3
      [
        { title: "Journal des victoires", description: "Lister vos réussites récentes", duration: "6 min", type: "writing" },
        { title: "Technique de désamorçage", description: "Neutraliser une peur irrationnelle", duration: "10 min", type: "technique" },
        { title: "Auto-compassion", description: "Se parler avec bienveillance", duration: "5 min", type: "self-care" }
      ]
    ]
  },

  "Tristesse / vide": {
    name: "Le Faux Positif",
    description: "une âme qui dit souvent 'ça va' mais ressent un vide intérieur",
    explanation: "Vous excellez à rassurer les autres, mais vous oubliez de prendre soin de vos propres émotions. Il est temps de reconnecter avec votre vraie météo intérieure.",
    color: "from-yellow-400 to-amber-400",
    activities: [
      // Jour 1
      [
        { title: "Météo intérieure réelle", description: "Comment vous sentez-vous vraiment ?", duration: "4 min", type: "check-in" },
        { title: "Miroir émotionnel", description: "Regarder et nommer vos émotions", duration: "6 min", type: "awareness" },
        { title: "Activation plaisir", description: "Une petite chose qui vous fait du bien", duration: "10 min", type: "pleasure" }
      ],
      // Jour 2
      [
        { title: "Journal authentique", description: "Écrire sans filtre pendant 5 minutes", duration: "5 min", type: "writing" },
        { title: "Reconnexion corporelle", description: "Que dit votre corps aujourd'hui ?", duration: "7 min", type: "body" },
        { title: "Moment créatif", description: "Dessiner, chanter, danser librement", duration: "8 min", type: "creativity" }
      ],
      // Jour 3
      [
        { title: "Lettre à soi-même", description: "Écrire avec compassion à votre enfant intérieur", duration: "10 min", type: "writing" },
        { title: "Rituel de joie", description: "Créer un moment de bonheur simple", duration: "5 min", type: "ritual" },
        { title: "Partage authentique", description: "Dire votre vérité à quelqu'un", duration: "15 min", type: "social" }
      ]
    ]
  },

  "Estime cassée": {
    name: "L'Hyper-Adapté(e)",
    description: "une personne qui s'adapte toujours aux autres mais oublie ses propres besoins",
    explanation: "Vous êtes expert(e) pour vous adapter aux attentes d'autrui, mais cette habileté vous fait parfois oublier qui vous êtes vraiment. Retrouvons votre voix intérieure.",
    color: "from-purple-400 to-pink-400",
    activities: [
      // Jour 1
      [
        { title: "Si j'osais...", description: "Imaginer ce que vous feriez sans peur du jugement", duration: "6 min", type: "visualization" },
        { title: "Mes valeurs profondes", description: "Identifier ce qui compte vraiment pour vous", duration: "8 min", type: "values" },
        { title: "Non bienveillant", description: "Dire non à quelque chose aujourd'hui", duration: "2 min", type: "boundaries" }
      ],
      // Jour 2
      [
        { title: "Miroir de force", description: "Reconnaître vos qualités uniques", duration: "5 min", type: "strength" },
        { title: "Expression libre", description: "Parler ou écrire sans vous censurer", duration: "7 min", type: "expression" },
        { title: "Choix personnel", description: "Prendre une décision juste pour vous", duration: "10 min", type: "decision" }
      ],
      // Jour 3
      [
        { title: "Affirmations personnalisées", description: "Créer vos propres phrases de pouvoir", duration: "6 min", type: "affirmation" },
        { title: "Limite saine", description: "Poser une limite respectueuse", duration: "5 min", type: "boundaries" },
        { title: "Célébration de soi", description: "Honorer une de vos réussites", duration: "4 min", type: "celebration" }
      ]
    ]
  },

  "Confusion intérieure": {
    name: "Le Déphasé",
    description: "une âme qui se sent parfois à côté du monde mais retrouve petit à petit ses repères",
    explanation: "Vous ressentez parfois un sentiment de flottement, comme si vous étiez déconnecté(e) du monde. Cette sensation peut être temporaire, créons ensemble de nouveaux ancrages.",
    color: "from-gray-400 to-slate-400",
    activities: [
      // Jour 1
      [
        { title: "Ancrage symbolique", description: "Choisir un objet qui vous relie au présent", duration: "5 min", type: "grounding" },
        { title: "Routine douce", description: "Créer un petit rituel réconfortant", duration: "8 min", type: "routine" },
        { title: "Carnet de re-présence", description: "Noter une chose concrète de votre journée", duration: "3 min", type: "awareness" }
      ],
      // Jour 2
      [
        { title: "Connexion nature", description: "Observer un élément naturel pendant 5 minutes", duration: "5 min", type: "nature" },
        { title: "Exercice d'orientation", description: "Nommer où vous êtes dans l'espace et le temps", duration: "4 min", type: "grounding" },
        { title: "Micro-objectif", description: "Vous fixer un petit but atteignable", duration: "6 min", type: "goal" }
      ],
      // Jour 3
      [
        { title: "Tisser des liens", description: "Reconnectez avec une personne proche", duration: "10 min", type: "social" },
        { title: "Rituel du soir", description: "Créer une transition douce vers la nuit", duration: "7 min", type: "routine" },
        { title: "Bilan de présence", description: "Mesurer votre ancrage d'aujourd'hui", duration: "5 min", type: "reflection" }
      ]
    ]
  },

  "Solitude / déconnexion": {
    name: "L'Éponge Émotionnelle",
    description: "un cœur qui absorbe les émotions des autres mais oublie de se protéger",
    explanation: "Votre empathie est un don, mais elle peut vous épuiser si vous ne savez pas vous en protéger. Apprenons à créer des limites saines tout en gardant votre sensibilité.",
    color: "from-green-400 to-emerald-400",
    activities: [
      // Jour 1
      [
        { title: "Bulle de protection", description: "Visualiser votre espace personnel protégé", duration: "6 min", type: "protection" },
        { title: "Recentrage express", description: "Revenir à vos propres sensations", duration: "4 min", type: "centering" },
        { title: "Activité 'toi d'abord'", description: "Faire quelque chose uniquement pour vous", duration: "10 min", type: "self-care" }
      ],
      // Jour 2
      [
        { title: "Tri émotionnel", description: "Distinguer vos émotions de celles des autres", duration: "8 min", type: "boundaries" },
        { title: "Journaling personnel", description: "Écrire uniquement sur vos ressentis", duration: "7 min", type: "writing" },
        { title: "Respiration purifiante", description: "Évacuer les énergies parasites", duration: "5 min", type: "breathing" }
      ],
      // Jour 3
      [
        { title: "Dialogue intérieur", description: "Conversation avec votre moi profond", duration: "9 min", type: "dialogue" },
        { title: "Limite douce", description: "Dire non avec bienveillance", duration: "5 min", type: "boundaries" },
        { title: "Rituel de clôture", description: "Fermer la journée en beauté", duration: "6 min", type: "closure" }
      ]
    ]
  },

  "Trauma / événement marquant": {
    name: "Le Ruminant du Soir",
    description: "un esprit qui ressasse souvent le passé, surtout quand vient la nuit",
    explanation: "Vos pensées ont tendance à tourner en boucle, particulièrement le soir. Cette rumination peut être apaisée avec des techniques de clôture mentale et de transition douce.",
    color: "from-indigo-400 to-purple-400",
    activities: [
      // Jour 1
      [
        { title: "Vidage mental", description: "Déposer toutes vos pensées sur papier", duration: "8 min", type: "brain-dump" },
        { title: "Rituel de transition", description: "Marquer la fin de la journée consciente", duration: "6 min", type: "transition" },
        { title: "Audio apaisant", description: "Écouter un son relaxant", duration: "10 min", type: "audio" }
      ],
      // Jour 2
      [
        { title: "Technique du coffre", description: "Ranger mentalement vos préoccupations", duration: "7 min", type: "visualization" },
        { title: "Écriture libératrice", description: "Lettre que vous ne posterez jamais", duration: "10 min", type: "writing" },
        { title: "Respiration du soir", description: "Calmer le mental avant le coucher", duration: "5 min", type: "breathing" }
      ],
      // Jour 3
      [
        { title: "Bilan positif", description: "3 bonnes choses de votre journée", duration: "4 min", type: "gratitude" },
        { title: "Méditation du pardon", description: "Lâcher prise sur une frustration", duration: "8 min", type: "forgiveness" },
        { title: "Préparation au sommeil", description: "Rituel pour un endormissement serein", duration: "7 min", type: "sleep" }
      ]
    ]
  }
};

export const getProfileData = (profileName: string) => {
  return profilesData[profileName as keyof typeof profilesData] || profilesData["Épuisement mental"];
};
