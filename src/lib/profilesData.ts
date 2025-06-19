export const profilesData = {
  "Épuisement mental": {
    name: "Le Surmené Structuré",
    description: "un esprit structuré qui oublie parfois de respirer",
    explanation: "Vous êtes hyper-organisé mais souvent anxieux. Votre quête de perfection vous mène parfois vers l'épuisement. Il est temps d'apprendre à faire des pauses et à lâcher prise.",
    color: "from-blue-400 to-cyan-400",
    activities: [
      // Jour 1
      [
        { 
          id: "surmene_j1_a1",
          title: "Micro-méditation express", 
          description: "3 minutes de respiration guidée", 
          duration: "3 min", 
          type: "audio",
          content: {
            audioText: "Fermez les yeux... Inspirez profondément par le nez pendant 4 secondes... Retenez votre souffle 4 secondes... Expirez lentement par la bouche pendant 6 secondes. Répétez ce cycle 5 fois en vous concentrant uniquement sur votre respiration.",
            introduction: "Une pause respiratoire pour calmer votre mental en seulement 3 minutes."
          }
        },
        { 
          id: "surmene_j1_a2",
          title: "Check-list inversée", 
          description: "Noter ce que vous n'avez PAS à faire aujourd'hui", 
          duration: "5 min", 
          type: "interactive",
          content: {
            prompt: "Listez 5 choses que vous n'avez PAS à faire aujourd'hui. Autorisez-vous à les laisser de côté.",
            placeholder: "Exemple : Je n'ai pas à répondre à tous mes emails ce soir...",
          }
        },
        { 
          id: "surmene_j1_a3",
          title: "Pause sensorielle", 
          description: "Observer 5 choses autour de vous", 
          duration: "2 min", 
          type: "explanatory",
          content: {
            objective: "Ramener votre attention dans l'instant présent et sortir du mental.",
            steps: [
              "Regardez autour de vous et nommez mentalement 5 choses que vous VOYEZ",
              "Identifiez 4 choses que vous pouvez TOUCHER",
              "Repérez 3 sons que vous ENTENDEZ",
              "Trouvez 2 odeurs que vous SENTEZ",
              "Notez 1 goût dans votre BOUCHE"
            ],
            text: "Cet exercice simple mais puissant vous aide à vous ancrer dans l'instant présent et à calmer votre mental hyperactif."
          }
        }
      ],
      // Jour 2
      [
        { 
          id: "surmene_j2_a1",
          title: "Respiration 4-7-8", 
          description: "Technique de relaxation profonde", 
          duration: "5 min", 
          type: "audio",
          content: {
            audioText: "La respiration 4-7-8 est une technique puissante. Inspirez par le nez en comptant jusqu'à 4... Retenez votre souffle en comptant jusqu'à 7... Expirez complètement par la bouche en comptant jusqu'à 8. Cette respiration active votre système nerveux parasympathique et induit un état de calme profond.",
          }
        },
        { 
          id: "surmene_j2_a2",
          title: "Rupture de routine", 
          description: "Changez une habitude aujourd'hui", 
          duration: "10 min", 
          type: "explanatory",
          content: {
            introduction: "Sortir de l'automatisme pour réveiller votre créativité et réduire le stress.",
            objective: "Briser le pilote automatique qui maintient votre stress.",
            steps: [
              "Choisissez une routine habituelle (chemin pour aller au travail, petit-déjeuner, etc.)",
              "Modifiez délibérément cette routine aujourd'hui",
              "Observez ce que vous ressentez lors de ce changement",
              "Notez si cela influence votre état mental"
            ],
            text: "Les habitudes automatiques maintiennent notre stress. En changeant consciemment une routine, vous reprenez le contrôle et stimulez votre adaptabilité."
          }
        },
        { 
          id: "surmene_j2_a3",
          title: "Journal de gratitude", 
          description: "3 choses positives de votre journée", 
          duration: "3 min", 
          type: "interactive",
          content: {
            prompt: "Écrivez 3 choses pour lesquelles vous êtes reconnaissant(e) aujourd'hui, même les plus petites.",
            placeholder: "Exemple : Le sourire du boulanger ce matin, avoir eu 5 minutes de calme, ce café délicieux...",
          }
        }
      ],
      // Jour 3
      [
        { 
          id: "surmene_j3_a1",
          title: "Méditation du lâcher-prise", 
          description: "Accepter ce qui ne dépend pas de vous", 
          duration: "8 min", 
          type: "audio",
          content: {
            audioText: "Installez-vous confortablement... Respirez naturellement... Pensez à une situation qui vous préoccupe... Demandez-vous : 'Est-ce que cela dépend vraiment de moi ?' Si oui, que pouvez-vous faire concrètement ? Si non, visualisez-vous en train de lâcher prise, comme un ballon qui s'envole dans le ciel... Répétez : 'J'accepte ce qui ne dépend pas de moi, j'agis sur ce qui dépend de moi.'",
          }
        },
        { 
          id: "surmene_j3_a2",
          title: "Planification douce", 
          description: "Organiser sans pression", 
          duration: "10 min", 
          type: "interactive",
          content: {
            prompt: "Créez votre planning idéal en incluant des pauses. Que feriez-vous si vous aviez 25% de temps en plus ?",
            placeholder: "Pensez à intégrer des moments de respiration entre vos tâches...",
          }
        },
        { 
          id: "surmene_j3_a3",
          title: "Automassage détente", 
          description: "Relâcher les tensions physiques", 
          duration: "5 min", 
          type: "explanatory",
          content: {
            objective: "Libérer les tensions accumulées dans votre corps.",
            steps: [
              "Massez doucement vos tempes avec des mouvements circulaires (30 secondes)",
              "Pressez délicatement le point entre vos sourcils (30 secondes)",
              "Massez vos épaules et votre nuque (2 minutes)",
              "Pressez les points d'acupression dans vos paumes (1 minute)",
              "Terminez par 3 respirations profondes"
            ],
            text: "Le stress se loge dans notre corps. Ces gestes simples permettent de relâcher les tensions physiques et, par effet domino, d'apaiser le mental."
          }
        }
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
        { 
          id: "anxiete_j1_a1",
          title: "3 preuves que tout va bien", 
          description: "Identifier le positif dans votre réalité", 
          duration: "5 min", 
          type: "interactive",
          content: {
            prompt: "Listez 3 preuves concrètes que tout va bien dans votre vie en ce moment. Concentrez-vous sur les faits, pas sur les émotions.",
            placeholder: "Exemple : J'ai un toit, j'ai mangé aujourd'hui, quelqu'un m'a souri...",
          }
        },
        { 
          id: "anxiete_j1_a2",
          title: "Ancrage sensoriel", 
          description: "Technique 5-4-3-2-1 pour revenir au présent", 
          duration: "4 min", 
          type: "explanatory",
          content: {
            objective: "Interrompre le cycle des pensées anxieuses en vous reconnectant au présent.",
            steps: [
              "5 choses que vous VOYEZ autour de vous",
              "4 choses que vous pouvez TOUCHER",
              "3 choses que vous ENTENDEZ",
              "2 choses que vous SENTEZ (odeurs)",
              "1 chose que vous GOÛTEZ"
            ],
            text: "Quand l'anxiété vous projette dans le futur, cet exercice vous ramène dans l'ici et maintenant, là où vous êtes en sécurité."
          }
        },
        { 
          id: "anxiete_j1_a3",
          title: "Respiration carrée", 
          description: "Calmer le système nerveux", 
          duration: "6 min", 
          type: "audio",
          content: {
            audioText: "La respiration carrée va apaiser votre système nerveux. Inspirez en comptant jusqu'à 4... Retenez en comptant jusqu'à 4... Expirez en comptant jusqu'à 4... Pause en comptant jusqu'à 4... Continuez ce rythme régulier, comme si vous dessiniez un carré avec votre respiration. Chaque côté du carré représente une phase de 4 temps.",
          }
        }
      ],
      // Jour 2 et 3 avec structure similaire...
      [
        { 
          id: "anxiete_j2_a1",
          title: "Reframing des pensées", 
          description: "Transformer une inquiétude en action", 
          duration: "8 min", 
          type: "interactive",
          content: {
            prompt: "Prenez une inquiétude actuelle. Écrivez-la, puis reformulez-la sous forme de question constructive ou d'action possible.",
            placeholder: "Exemple : 'Et si je rate ma présentation ?' devient 'Comment puis-je me préparer au mieux ?'",
          }
        },
        { 
          id: "anxiete_j2_a2",
          title: "Marche consciente", 
          description: "5 minutes de marche en pleine conscience", 
          duration: "5 min", 
          type: "explanatory",
          content: {
            objective: "Utiliser le mouvement pour calmer l'anxiété et ancrer l'attention.",
            text: "Marchez lentement, en portant attention à chaque pas. Sentez vos pieds toucher le sol, observez votre environnement sans jugement. Si des pensées anxieuses arrivent, revenez simplement à la sensation de marcher."
          }
        },
        { 
          id: "anxiete_j2_a3",
          title: "Visualisation sécurisante", 
          description: "Créer votre lieu de paix mental", 
          duration: "7 min", 
          type: "audio",
          content: {
            audioText: "Fermez les yeux et imaginez un lieu où vous vous sentez complètement en sécurité et en paix... Cela peut être un endroit réel ou imaginaire... Observez les détails : les couleurs, les sons, les odeurs... Sentez la sérénité de ce lieu vous envelopper... Ancrez cette sensation dans votre corps... Vous pouvez revenir dans ce lieu mental quand vous en avez besoin.",
          }
        }
      ],
      [
        { 
          id: "anxiete_j3_a1",
          title: "Journal des victoires", 
          description: "Lister vos réussites récentes", 
          duration: "6 min", 
          type: "interactive",
          content: {
            prompt: "Écrivez 5 choses que vous avez réussies récemment, même les plus petites. Chaque victoire compte.",
            placeholder: "Exemple : J'ai fini ce dossier, j'ai appelé ma mère, j'ai fait le ménage...",
          }
        },
        { 
          id: "anxiete_j3_a2",
          title: "Technique de désamorçage", 
          description: "Neutraliser une peur irrationnelle", 
          duration: "10 min", 
          type: "explanatory",
          content: {
            objective: "Défuser le pouvoir d'une peur en l'examinant rationnellement.",
            steps: [
              "Identifiez une peur qui vous paralyse",
              "Écrivez le pire scénario possible",
              "Évaluez la probabilité réelle que cela arrive (sur 10)",
              "Listez 3 solutions si cela arrivait vraiment",
              "Constatez que vous avez plus de ressources que vous ne le pensiez"
            ],
            text: "La plupart de nos peurs s'effondrent quand on les examine à la lumière de la logique et qu'on se rend compte de notre capacité d'adaptation."
          }
        },
        { 
          id: "anxiete_j3_a3",
          title: "Auto-compassion", 
          description: "Se parler avec bienveillance", 
          duration: "5 min", 
          type: "audio",
          content: {
            audioText: "Placez une main sur votre cœur... Respirez doucement... Maintenant, parlez-vous comme vous parleriez à votre meilleur ami qui traverse une période difficile... Répétez : 'Je traverse une période difficile, c'est normal d'avoir peur parfois. Je mérite de la compassion et de la douceur. Je fais de mon mieux avec les ressources que j'ai.'",
          }
        }
      ]
    ]
  },

  "Tristesse / vide": {
    name: "Le Faux Positif",
    description: "une âme qui dit souvent 'ça va' mais ressent un vide intérieur",
    explanation: "Vous excellez à rassurer les autres, mais vous oubliez de prendre soin de vos propres émotions. Il est temps de reconnecter avec votre vraie météo intérieure.",
    color: "from-yellow-400 to-amber-400",
    activities: [
      [
        { 
          id: "tristesse_j1_a1",
          title: "Météo intérieure réelle", 
          description: "Comment vous sentez-vous vraiment ?", 
          duration: "4 min", 
          type: "interactive",
          content: {
            prompt: "Décrivez votre vraie météo intérieure aujourd'hui, sans filtre. Que ressentez-vous réellement ?",
            placeholder: "Exemple : Je me sens comme un ciel gris avec quelques éclaircies...",
          }
        },
        { 
          id: "tristesse_j1_a2",
          title: "Miroir émotionnel", 
          description: "Regarder et nommer vos émotions", 
          duration: "6 min", 
          type: "explanatory",
          content: {
            objective: "Reconnecter avec vos vraies émotions sans jugement.",
            text: "Regardez-vous dans un miroir pendant 2 minutes. Observez votre visage sans jugement. Que voyez-vous dans vos yeux ? Quelles émotions transparaissent ? Nommez-les à voix haute avec bienveillance."
          }
        },
        { 
          id: "tristesse_j1_a3",
          title: "Activation plaisir", 
          description: "Une petite chose qui vous fait du bien", 
          duration: "10 min", 
          type: "explanatory",
          content: {
            objective: "Réveiller votre capacité à ressentir du plaisir.",
            text: "Faites une petite chose qui vous procure un plaisir simple : boire un thé en pleine conscience, écouter une chanson qui vous émeut, sentir une fleur, caresser un animal... L'important est de vous autoriser ce moment de plaisir."
          }
        }
      ],
      [
        { 
          id: "tristesse_j2_a1",
          title: "Journal authentique", 
          description: "Écrire sans filtre pendant 5 minutes", 
          duration: "5 min", 
          type: "interactive",
          content: {
            prompt: "Écrivez pendant 5 minutes sans vous arrêter, sans vous censurer. Laissez sortir tout ce qui vous passe par la tête.",
            placeholder: "Écrivez tout ce qui vous vient, même si ça n'a pas de sens...",
          }
        },
        { 
          id: "tristesse_j2_a2",
          title: "Reconnexion corporelle", 
          description: "Que dit votre corps aujourd'hui ?", 
          duration: "7 min", 
          type: "explanatory",
          content: {
            objective: "Écouter les messages de votre corps.",
            steps: [
              "Allongez-vous confortablement",
              "Portez attention à chaque partie de votre corps, de la tête aux pieds",
              "Remarquez les zones tendues ou douloureuses",
              "Respirez dans ces zones",
              "Demandez-vous ce que votre corps essaie de vous dire"
            ],
            text: "Votre corps porte souvent les émotions que votre mental refuse de reconnaître."
          }
        },
        { 
          id: "tristesse_j2_a3",
          title: "Moment créatif", 
          description: "Dessiner, chanter, danser librement", 
          duration: "8 min", 
          type: "explanatory",
          content: {
            objective: "Exprimer vos émotions à travers la créativité.",
            text: "Choisissez une forme d'expression créative (dessin, chant, danse, écriture...) et laissez-vous aller sans vous juger. Il n'y a pas de bon ou mauvais résultat, juste de l'expression authentique."
          }
        }
      ],
      [
        { 
          id: "tristesse_j3_a1",
          title: "Lettre à soi-même", 
          description: "Écrire avec compassion à votre enfant intérieur", 
          duration: "10 min", 
          type: "interactive",
          content: {
            prompt: "Écrivez une lettre bienveillante à votre enfant intérieur, à cette partie de vous qui souffre et a besoin de réconfort.",
            placeholder: "Mon/ma chéri(e), je vois ta tristesse et elle est légitime...",
          }
        },
        { 
          id: "tristesse_j3_a2",
          title: "Rituel de joie", 
          description: "Créer un moment de bonheur simple", 
          duration: "5 min", 
          type: "explanatory",
          content: {
            objective: "Créer consciemment un moment de joie, même petit.",
            text: "Créez un petit rituel qui vous apporte de la joie : préparer votre boisson préférée, mettre votre musique favorite, allumer une bougie... Savourez ce moment en pleine conscience."
          }
        },
        { 
          id: "tristesse_j3_a3",
          title: "Partage authentique", 
          description: "Dire votre vérité à quelqu'un", 
          duration: "15 min", 
          type: "explanatory",
          content: {
            objective: "Sortir de l'isolement en partageant votre vraie expérience.",
            text: "Contactez une personne de confiance et partagez authentiquement comment vous vous sentez vraiment. Pas besoin de solutions, juste d'être entendu(e)."
          }
        }
      ]
    ]
  },

  "Estime cassée": {
    name: "L'Hyper-Adapté(e)",
    description: "une personne qui s'adapte toujours aux autres mais oublie ses propres besoins",
    explanation: "Vous êtes expert(e) pour vous adapter aux attentes d'autrui, mais cette habileté vous fait parfois oublier qui vous êtes vraiment. Retrouvons votre voix intérieure.",
    color: "from-purple-400 to-pink-400",
    activities: [
      [
        { 
          id: "estime_j1_a1",
          title: "Si j'osais...", 
          description: "Imaginer ce que vous feriez sans peur du jugement", 
          duration: "6 min", 
          type: "interactive",
          content: {
            prompt: "Complétez cette phrase : 'Si je n'avais peur du jugement de personne, je...' Écrivez au moins 5 réponses.",
            placeholder: "Si j'osais, je changerais de travail, je porterais des couleurs vives...",
          }
        },
        { 
          id: "estime_j1_a2",
          title: "Mes valeurs profondes", 
          description: "Identifier ce qui compte vraiment pour vous", 
          duration: "8 min", 
          type: "explanatory",
          content: {
            objective: "Reconnecter avec vos valeurs authentiques, pas celles qu'on attend de vous.",
            steps: [
              "Listez 10 valeurs importantes (liberté, justice, créativité, famille...)",
              "Classez-les par ordre d'importance pour VOUS",
              "Pour chacune des 3 principales, donnez un exemple concret",
              "Réfléchissez : vivez-vous en accord avec ces valeurs ?",
              "Identifiez une petite action pour mieux les honorer"
            ],
            text: "Vos valeurs sont votre boussole intérieure. Quand vous les honorez, vous vous respectez."
          }
        },
        { 
          id: "estime_j1_a3",
          title: "Non bienveillant", 
          description: "Dire non à quelque chose aujourd'hui", 
          duration: "2 min", 
          type: "explanatory",
          content: {
            objective: "Exercer votre droit de refuser sans culpabiliser.",
            text: "Identifiez quelque chose à laquelle vous pouvez dire 'non' aujourd'hui. Commencez petit : un appel que vous n'avez pas envie de passer, une sortie qui ne vous tente pas... Dites non avec respect mais fermeté."
          }
        }
      ],
      [
        { 
          id: "estime_j2_a1",
          title: "Miroir de force", 
          description: "Reconnaître vos qualités uniques", 
          duration: "5 min", 
          type: "interactive",
          content: {
            prompt: "Listez 10 qualités que vous possédez. Si c'est difficile, pensez à ce que vos proches diraient de vous.",
            placeholder: "Je suis généreux/se, à l'écoute, créatif/ve, déterminé(e)...",
          }
        },
        { 
          id: "estime_j2_a2",
          title: "Expression libre", 
          description: "Parler ou écrire sans vous censurer", 
          duration: "7 min", 
          type: "interactive",
          content: {
            prompt: "Exprimez librement une opinion que vous gardez habituellement pour vous. Qu'aimeriez-vous dire au monde ?",
            placeholder: "Ce que je pense vraiment c'est que...",
          }
        },
        { 
          id: "estime_j2_a3",
          title: "Choix personnel", 
          description: "Prendre une décision juste pour vous", 
          duration: "10 min", 
          type: "explanatory",
          content: {
            objective: "Exercer votre autonomie en prenant une décision basée sur VOS désirs.",
            text: "Identifiez une petite décision que vous pouvez prendre aujourd'hui en vous basant uniquement sur ce que VOUS voulez, pas sur ce que les autres attendent. Cela peut être le choix de votre repas, de vos vêtements, de votre activité de soirée..."
          }
        }
      ],
      [
        { 
          id: "estime_j3_a1",
          title: "Affirmations personnalisées", 
          description: "Créer vos propres phrases de pouvoir", 
          duration: "6 min", 
          type: "interactive",
          content: {
            prompt: "Créez 5 affirmations personnalisées qui vous donnent du courage et vous rappellent votre valeur.",
            placeholder: "Je mérite d'être respecté(e), ma voix compte, je suis digne d'amour...",
          }
        },
        { 
          id: "estime_j3_a2",
          title: "Limite saine", 
          description: "Poser une limite respectueuse", 
          duration: "5 min", 
          type: "explanatory",
          content: {
            objective: "Apprendre à protéger votre énergie et votre temps.",
            text: "Identifiez une situation où vous devez poser une limite. Formulez votre demande de manière respectueuse mais ferme. Exemple : 'J'ai besoin de temps pour moi ce soir, je ne serai pas disponible après 20h.'"
          }
        },
        { 
          id: "estime_j3_a3",
          title: "Célébration de soi", 
          description: "Honorer une de vos réussites", 
          duration: "4 min", 
          type: "explanatory",
          content: {
            objective: "Apprendre à reconnaître et célébrer vos accomplissements.",
            text: "Choisissez une réussite récente, même petite, et célébrez-la consciemment. Dites-vous à voix haute : 'Je suis fier/fière de...' et offrez-vous une petite récompense."
          }
        }
      ]
    ]
  },

  "Confusion intérieure": {
    name: "Le Déphasé",
    description: "une âme qui se sent parfois à côté du monde mais retrouve petit à petit ses repères",
    explanation: "Vous ressentez parfois un sentiment de flottement, comme si vous étiez déconnecté(e) du monde. Cette sensation peut être temporaire, créons ensemble de nouveaux ancrages.",
    color: "from-gray-400 to-slate-400",
    activities: [
      [
        { 
          id: "confusion_j1_a1",
          title: "Ancrage symbolique", 
          description: "Choisir un objet qui vous relie au présent", 
          duration: "5 min", 
          type: "explanatory",
          content: {
            objective: "Créer un point d'ancrage physique pour vous reconnecter au réel.",
            text: "Choisissez un petit objet que vous pouvez garder avec vous (pierre, bijou, photo...). Tenez-le dans vos mains, observez sa texture, son poids, sa température. Cet objet devient votre ancre : quand vous vous sentez perdu(e), touchez-le pour revenir au présent."
          }
        },
        { 
          id: "confusion_j1_a2",
          title: "Routine douce", 
          description: "Créer un petit rituel réconfortant", 
          duration: "8 min", 
          type: "explanatory",
          content: {
            objective: "Créer des repères stables dans votre quotidien.",
            steps: [
              "Choisissez un moment de la journée (matin, midi, soir)",
              "Définissez 3 gestes simples et apaisants",
              "Exemple : boire un thé, allumer une bougie, écrire une phrase",
              "Répétez cette séquence chaque jour à la même heure",
              "Laissez ce rituel devenir un point de stabilité"
            ],
            text: "Les rituels créent des îlots de stabilité qui vous aident à vous retrouver quand tout semble flou."
          }
        },
        { 
          id: "confusion_j1_a3",
          title: "Carnet de re-présence", 
          description: "Noter une chose concrète de votre journée", 
          duration: "3 min", 
          type: "interactive",
          content: {
            prompt: "Notez un fait concret et précis de votre journée. Quelque chose de simple mais réel.",
            placeholder: "Aujourd'hui, j'ai bu un café à 9h15, il était chaud et avait un goût de noisette...",
          }
        }
      ],
      [
        { 
          id: "confusion_j2_a1",
          title: "Connexion nature", 
          description: "Observer un élément naturel pendant 5 minutes", 
          duration: "5 min", 
          type: "explanatory",
          content: {
            objective: "Utiliser la nature comme point d'ancrage au réel.",
            text: "Trouvez un élément naturel (arbre, fleur, nuage, oiseau...) et observez-le pendant 5 minutes. Remarquez les détails, les mouvements, les changements. Laissez cette observation vous ramener dans l'instant présent."
          }
        },
        { 
          id: "confusion_j2_a2",
          title: "Exercice d'orientation", 
          description: "Nommer où vous êtes dans l'espace et le temps", 
          duration: "4 min", 
          type: "explanatory",
          content: {
            objective: "Vous réorienter dans l'espace-temps pour réduire la sensation de flottement.",
            steps: [
              "Dites à voix haute la date d'aujourd'hui",
              "Nommez le lieu où vous êtes précisément",
              "Décrivez ce que vous voyez autour de vous",
              "Identifiez les sons que vous entendez",
              "Terminez par : 'Je suis ici, maintenant, et c'est réel'"
            ],
            text: "Cet exercice simple mais puissant vous aide à vous réancrer dans la réalité présente."
          }
        },
        { 
          id: "confusion_j2_a3",
          title: "Micro-objectif", 
          description: "Vous fixer un petit but atteignable", 
          duration: "6 min", 
          type: "interactive",
          content: {
            prompt: "Définissez un petit objectif très concret que vous pouvez accomplir aujourd'hui ou demain.",
            placeholder: "Ranger mon bureau, appeler ma sœur, finir ce livre, faire une promenade de 10 minutes...",
          }
        }
      ],
      [
        { 
          id: "confusion_j3_a1",
          title: "Tisser des liens", 
          description: "Reconnectez avec une personne proche", 
          duration: "10 min", 
          type: "explanatory",
          content: {
            objective: "Utiliser les relations humaines pour vous réancrer dans le réel.",
            text: "Contactez quelqu'un qui vous fait du bien. Pas forcément pour parler de vos difficultés, juste pour créer du lien. Posez des questions sur sa journée, partagez un souvenir, riez ensemble. Les relations authentiques nous ramènent à nous-mêmes."
          }
        },
        { 
          id: "confusion_j3_a2",
          title: "Rituel du soir", 
          description: "Créer une transition douce vers la nuit", 
          duration: "7 min", 
          type: "explanatory",
          content: {
            objective: "Créer une transition apaisante qui ferme la journée en beauté.",
            steps: [
              "Éteignez les écrans 30 minutes avant le coucher",
              "Faites un bilan bienveillant de votre journée",
              "Préparez consciemment votre espace de sommeil",
              "Faites 3 respirations profondes",
              "Remerciez votre corps pour cette journée"
            ],
            text: "Un rituel du soir crée une frontière rassurante entre le jour et la nuit, entre l'action et le repos."
          }
        },
        { 
          id: "confusion_j3_a3",
          title: "Bilan de présence", 
          description: "Mesurer votre ancrage d'aujourd'hui", 
          duration: "5 min", 
          type: "interactive",
          content: {
            prompt: "Sur une échelle de 1 à 10, comment vous sentez-vous ancré(e) aujourd'hui ? Qu'est-ce qui vous a aidé à vous sentir plus présent(e) ?",
            placeholder: "Aujourd'hui je me sens ancré(e) à 6/10. Ce qui m'a aidé c'est...",
          }
        }
      ]
    ]
  },

  "Solitude / déconnexion": {
    name: "L'Éponge Émotionnelle",
    description: "un cœur qui absorbe les émotions des autres mais oublie de se protéger",
    explanation: "Votre empathie est un don, mais elle peut vous épuiser si vous ne savez pas vous en protéger. Apprenons à créer des limites saines tout en gardant votre sensibilité.",
    color: "from-green-400 to-emerald-400",
    activities: [
      [
        { 
          id: "solitude_j1_a1",
          title: "Bulle de protection", 
          description: "Visualiser votre espace personnel protégé", 
          duration: "6 min", 
          type: "audio",
          content: {
            audioText: "Fermez les yeux et imaginez une bulle de lumière dorée qui vous entoure... Cette bulle est perméable à l'amour et à la bienveillance, mais elle filtre les énergies négatives... Sentez-vous en sécurité à l'intérieur... Vous pouvez réactiver cette bulle mentalement quand vous en avez besoin...",
          }
        },
        { 
          id: "solitude_j1_a2",
          title: "Recentrage express", 
          description: "Revenir à vos propres sensations", 
          duration: "4 min", 
          type: "explanatory",
          content: {
            objective: "Distinguer vos émotions de celles que vous captez chez les autres.",
            steps: [
              "Posez une main sur votre cœur, une sur votre ventre",
              "Respirez profondément et concentrez-vous sur VOS sensations",
              "Demandez-vous : 'Cette émotion, est-elle vraiment mienne ?'",
              "Si elle vient d'ailleurs, visualisez-la qui s'évacue par vos pieds",
              "Reconnectez-vous à votre centre émotionnel"
            ],
            text: "Votre sensibilité est précieuse, mais vous devez apprendre à distinguer ce qui vous appartient de ce qui appartient aux autres."
          }
        },
        { 
          id: "solitude_j1_a3",
          title: "Activité 'toi d'abord'", 
          description: "Faire quelque chose uniquement pour vous", 
          duration: "10 min",
          type: "explanatory",
          content: {
            objective: "Vous reconnecter à vos propres besoins et désirs.",
            text: "Faites quelque chose uniquement pour VOUS, sans penser aux autres. Cela peut être lire quelques pages, prendre un bain, écouter votre musique préférée... L'important est que ce soit VOTRE choix, pour VOTRE plaisir."
          }
        }
      ],
      [
        { 
          id: "solitude_j2_a1",
          title: "Tri émotionnel", 
          description: "Distinguer vos émotions de celles des autres", 
          duration: "8 min", 
          type: "interactive",
          content: {
            prompt: "Décrivez ce que vous ressentez maintenant, puis demandez-vous : quelles émotions sont vraiment miennes ? Lesquelles ai-je 'captées' ailleurs ?",
            placeholder: "Je ressens de la tristesse... En y réfléchissant, je pense qu'elle vient de...",
          }
        },
        { 
          id: "solitude_j2_a2",
          title: "Journaling personnel", 
          description: "Écrire uniquement sur vos ressentis", 
          duration: "7 min", 
          type: "interactive",
          content: {
            prompt: "Écrivez uniquement sur VOS émotions, VOS besoins, VOS désirs. Commencez chaque phrase par 'Je'.",
            placeholder: "Je ressens... Je veux... J'ai besoin de... Je rêve de...",
          }
        },
        { 
          id: "solitude_j2_a3",
          title: "Respiration purifiante", 
          description: "Évacuer les énergies parasites", 
          duration: "5 min", 
          type: "audio",
          content: {
            audioText: "Inspirez de la lumière pure et dorée... Expirez tout ce qui ne vous appartient pas... À chaque expiration, libérez les émotions des autres... À chaque inspiration, accueillez votre propre énergie... Continuez jusqu'à vous sentir centré(e) et purifié(e)...",
          }
        }
      ],
      [
        { 
          id: "solitude_j3_a1",
          title: "Dialogue intérieur", 
          description: "Conversation avec votre moi profond", 
          duration: "9 min", 
          type: "interactive",
          content: {
            prompt: "Entamez un dialogue écrit avec votre sagesse intérieure. Posez-vous une question importante et laissez la réponse venir.",
            placeholder: "Moi : Qu'est-ce dont j'ai vraiment besoin ? Ma sagesse intérieure : ...",
          }
        },
        { 
          id: "solitude_j3_a2",
          title: "Limite douce", 
          description: "Dire non avec bienveillance", 
          duration: "5 min", 
          type: "explanatory",
          content: {
            objective: "Apprendre à vous protéger sans blesser les autres.",
            text: "Entraînez-vous à dire non de manière bienveillante. Exemple : 'Je comprends que tu aies besoin de parler, mais je ne suis pas disponible émotionnellement en ce moment. Puis-je t'appeler demain ?' Votre empathie n'est pas une obligation 24h/24."
          }
        },
        { 
          id: "solitude_j3_a3",
          title: "Rituel de clôture", 
          description: "Fermer la journée en beauté", 
          duration: "6 min", 
          type: "explanatory",
          content: {
            objective: "Créer une transition qui vous libère des énergies de la journée.",
            steps: [
              "Visualisez votre journée comme un livre",
              "Remerciez les belles rencontres et expériences",
              "Libérez mentalement ce qui ne vous appartient pas",
              "Fermez symboliquement ce livre",
              "Accueillez la soirée comme un nouveau chapitre pour vous"
            ],
            text: "Chaque fin de journée est l'occasion de vous libérer de ce qui ne vous appartient pas et de revenir à vous."
          }
        }
      ]
    ]
  },

  "Trauma / événement marquant": {
    name: "Le Ruminant du Soir",
    description: "un esprit qui ressasse souvent le passé, surtout quand vient la nuit",
    explanation: "Vos pensées ont tendance à tourner en boucle, particulièrement le soir. Cette rumination peut être apaisée avec des techniques de clôture mentale et de transition douce.",
    color: "from-indigo-400 to-purple-400",
    activities: [
      [
        { 
          id: "trauma_j1_a1",
          title: "Vidage mental", 
          description: "Déposer toutes vos pensées sur papier", 
          duration: "8 min", 
          type: "interactive",
          content: {
            prompt: "Videz votre mental en écrivant tout ce qui vous préoccupe, sans ordre ni logique. Laissez sortir le flot de pensées.",
            placeholder: "J'ai cette réunion demain, je pense à ce qui s'est passé la semaine dernière, j'ai oublié d'appeler...",
          }
        },
        { 
          id: "trauma_j1_a2",
          title: "Rituel de transition", 
          description: "Marquer la fin de la journée consciemment", 
          duration: "6 min", 
          type: "explanatory",
          content: {
            objective: "Créer une frontière claire entre le jour et le soir pour arrêter les ruminations.",
            steps: [
              "Choisissez une heure de fin de journée (ex: 19h)",
              "Faites un bilan : 3 choses accomplies aujourd'hui",
              "Rangez symboliquement votre espace de travail/jour",
              "Dites à voix haute : 'Ma journée est terminée'",
              "Passez à une activité différente (détente, plaisir)"
            ],
            text: "Sans transition claire, votre mental continue de 'travailler' et de ruminer. Ce rituel marque une frontière nette."
          }
        },
        { 
          id: "trauma_j1_a3",
          title: "Audio apaisant", 
          description: "Écouter un son relaxant", 
          duration: "10 min", 
          type: "audio",
          content: {
            audioText: "Voici 10 minutes de sons apaisants pour calmer votre mental agité... Laissez ces sons remplacer le bruit de vos pensées... Concentrez-vous uniquement sur ce que vous entendez... Si des pensées arrivent, revenez simplement aux sons... Laissez-vous porter par cette douceur auditive...",
          }
        }
      ],
      [
        { 
          id: "trauma_j2_a1",
          title: "Technique du coffre", 
          description: "Ranger mentalement vos préoccupations", 
          duration: "7 min", 
          type: "audio",
          content: {
            audioText: "Imaginez un grand coffre solide... Prenez chaque préoccupation de votre mental et placez-la délicatement dans ce coffre... Fermez le coffre avec une clé... Dites-vous : 'Mes préoccupations sont enfermées pour la nuit, je peux me reposer l'esprit tranquille'... Demain, si besoin, vous pourrez rouvrir le coffre...",
          }
        },
        { 
          id: "trauma_j2_a2",
          title: "Écriture libératrice", 
          description: "Lettre que vous ne posterez jamais", 
          duration: "10 min", 
          type: "interactive",
          content: {
            prompt: "Écrivez une lettre à quelqu'un (réel ou imaginaire) pour exprimer tout ce que vous avez sur le cœur. Vous ne l'enverrez jamais.",
            placeholder: "Cher/Chère..., j'ai besoin de te dire que...",
          }
        },
        { 
          id: "trauma_j2_a3",
          title: "Respiration du soir", 
          description: "Calmer le mental avant le coucher", 
          duration: "5 min", 
          type: "audio",
          content: {
            audioText: "Cette respiration va préparer votre mental au repos... Inspirez en comptant jusqu'à 6... Expirez en comptant jusqu'à 8... À chaque expiration, relâchez les tensions de votre journée... Laissez votre corps s'alourdir... Votre mental se calme progressivement... Vous vous préparez à une nuit paisible...",
          }
        }
      ],
      [
        { 
          id: "trauma_j3_a1",
          title: "Bilan positif", 
          description: "3 bonnes choses de votre journée", 
          duration: "4 min", 
          type: "interactive",
          content: {
            prompt: "Notez 3 choses positives qui se sont passées aujourd'hui, même les plus petites.",
            placeholder: "1. J'ai eu un sourire d'un inconnu 2. Mon café était délicieux 3. J'ai terminé cette tâche...",
          }
        },
        { 
          id: "trauma_j3_a2",
          title: "Méditation du pardon", 
          description: "Lâcher prise sur une frustration", 
          duration: "8 min", 
          type: "audio",
          content: {
            audioText: "Pensez à quelque chose qui vous contrarie... Observez cette contrariété sans la juger... Maintenant, imaginez que vous la prenez délicatement dans vos mains... Sentez son poids... Et maintenant, libérez-la comme un oiseau qui s'envole... Répétez : 'Je libère ce qui ne me sert plus'... Sentez l'espace qui se crée en vous...",
          }
        },
        { 
          id: "trauma_j3_a3",
          title: "Préparation au sommeil", 
          description: "Rituel pour un endormissement serein", 
          duration: "7 min", 
          type: "explanatory",
          content: {
            objective: "Créer les conditions optimales pour un sommeil réparateur sans ruminations.",
            steps: [
              "Éteignez tous les écrans 1h avant le coucher",
              "Préparez votre chambre : température fraîche, obscurité",
              "Faites 5 respirations profondes dans votre lit",
              "Passez en revue votre corps : relâchez chaque tension",
              "Répétez : 'Je mérite un sommeil paisible et réparateur'"
            ],
            text: "Un bon sommeil commence par une bonne préparation. Ces gestes simples préparent votre corps et votre mental au repos."
          }
        }
      ]
    ]
  }
};

export const getProfileData = (profileName: string) => {
  return profilesData[profileName as keyof typeof profilesData] || profilesData["Épuisement mental"];
};
