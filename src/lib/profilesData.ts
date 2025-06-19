
export interface ProfileData {
  name: string;
  description: string;
  explanation: string;
  color: string;
  activities: Array<Array<{
    title: string;
    description: string;
    duration: string;
    type: 'explanatory' | 'audio' | 'interactive';
    content?: any;
  }>>;
}

const profilesData: Record<string, ProfileData> = {
  'Le Sensible Silencieux': {
    name: 'Le Sensible Silencieux',
    description: 'Vous évitez les conflits, avez du mal à exprimer vos émotions et ressentez souvent de l\'anxiété.',
    explanation: 'Votre sensibilité est une force, mais elle peut parfois vous paralyser. Nous allons vous accompagner pour apprendre à vous exprimer sans peur et trouver votre voix intérieure.',
    color: 'from-blue-400 to-teal-400',
    activities: [
      [
        {
          title: 'Reconnection à sa voix intérieure',
          description: 'Comprendre pourquoi exprimer ses émotions est vital',
          duration: '5 min',
          type: 'explanatory',
          content: {
            introduction: 'Votre sensibilité n\'est pas une faiblesse, c\'est un don précieux.',
            objective: 'Comprendre l\'importance de votre expression personnelle',
            steps: [
              'Reconnaître que vos émotions ont de la valeur',
              'Identifier les moments où vous vous taisez par peur',
              'Visualiser une version de vous qui s\'exprime librement'
            ],
            text: 'Aujourd\'hui, nous commençons un voyage vers votre authenticité. Vos émotions méritent d\'être entendues, d\'abord par vous-même.'
          }
        },
        {
          title: 'Méditation du coeur qui s\'ouvre',
          description: 'Audio guidé pour libérer les tensions émotionnelles',
          duration: '7 min',
          type: 'audio',
          content: {
            audioText: 'Respire profondément... Imagine ton cœur qui s\'ouvre doucement comme une fleur... Chaque inspiration apporte la confiance, chaque expiration libère la peur...',
            visualUrl: '/lovable-uploads/71692815-441c-473e-8dca-dc19e4da3570.png'
          }
        },
        {
          title: 'Lettre à mon moi silencieux',
          description: 'Dialogue écrit avec la partie de vous qui se tait',
          duration: '10 min',
          type: 'interactive',
          content: {
            prompt: 'Écrivez une lettre bienveillante à la partie de vous qui préfère se taire. Que lui diriez-vous pour la rassurer ?',
            placeholder: 'Cher moi silencieux, je comprends ta peur...'
          }
        }
      ],
      [
        {
          title: 'Anatomie de l\'expression émotionnelle',
          description: 'Comprendre les mécanismes de l\'expression',
          duration: '6 min',
          type: 'explanatory',
          content: {
            introduction: 'S\'exprimer, c\'est comme apprendre à marcher : cela demande de la pratique.',
            objective: 'Déconstruire les peurs liées à l\'expression',
            steps: [
              'Identifier vos patterns de silence',
              'Comprendre l\'origine de vos blocages',
              'Expérimenter de petites expressions sécurisées'
            ],
            text: 'Votre silence protège quelque chose de précieux en vous. Aujourd\'hui, nous explorons ce que c\'est et comment l\'honorer tout en vous permettant de vous exprimer.'
          }
        },
        {
          title: 'Affirmations de courage',
          description: 'Phrases à répéter pour renforcer votre confiance',
          duration: '5 min',
          type: 'audio',
          content: {
            audioText: 'Ma voix a de la valeur... Mes émotions méritent d\'être entendues... Je peux exprimer ma vérité avec douceur... Je suis en sécurité quand je parle de mon cœur...'
          }
        },
        {
          title: 'Cartographie de mes peurs',
          description: 'Identifier ce qui vous empêche de vous exprimer',
          duration: '8 min',
          type: 'interactive',
          content: {
            prompt: 'Listez 3 situations où vous aimeriez vous exprimer mais n\'osez pas. Pour chacune, notez ce que vous craignez exactement.',
            placeholder: 'Situation 1: Au travail quand je ne suis pas d\'accord...\nJe crains: ...'
          }
        }
      ],
      [
        {
          title: 'Le courage de la vulnérabilité',
          description: 'Transformer sa sensibilité en force',
          duration: '7 min',
          type: 'explanatory',
          content: {
            introduction: 'La vulnérabilité n\'est pas de la faiblesse, c\'est du courage brut.',
            objective: 'Réframe votre sensibilité comme un atout',
            steps: [
              'Reconnaître la force qu\'il faut pour ressentir profondément',
              'Identifier comment votre sensibilité aide les autres',
              'Choisir un petit acte de vulnérabilité pour aujourd\'hui'
            ],
            text: 'Votre capacité à ressentir profondément fait de vous quelqu\'un d\'extraordinaire. C\'est un superpouvoir déguisé en sensibilité.'
          }
        },
        {
          title: 'Visualisation: Mon expression libérée',
          description: 'Imaginer votre version la plus expressive',
          duration: '8 min',
          type: 'audio',
          content: {
            audioText: 'Ferme les yeux... Imagine-toi dans 6 mois... Tu t\'exprimes librement, avec confiance... Comment te sens-tu ? Comment les autres réagissent-ils ? Ancre cette sensation...'
          }
        },
        {
          title: 'Mon premier pas d\'expression',
          description: 'Choisir une action concrète pour aujourd\'hui',
          duration: '5 min',
          type: 'interactive',
          content: {
            prompt: 'Choisissez UNE petite action que vous pouvez faire aujourd\'hui pour vous exprimer davantage. Quelque chose de tout petit mais significatif.',
            placeholder: 'Aujourd\'hui, je vais...'
          }
        }
      ]
    ]
  },

  'L\'Hyperlucide': {
    name: 'L\'Hyperlucide',
    description: 'Votre mental envahissant sur-réfléchit tout, vous êtes perfectionniste et avez du mal à lâcher prise.',
    explanation: 'Votre intelligence est remarquable, mais elle peut parfois vous piéger dans des spirales de réflexion. Nous allons vous aider à vous reconnecter à votre corps et au moment présent.',
    color: 'from-purple-400 to-indigo-400',
    activities: [
      [
        {
          title: 'Sortir du mental, revenir au corps',
          description: 'Comprendre l\'équilibre tête-corps',
          duration: '6 min',
          type: 'explanatory',
          content: {
            introduction: 'Votre mental brillant peut parfois vous déconnecter de votre sagesse corporelle.',
            objective: 'Rétablir l\'équilibre entre mental et ressenti',
            steps: [
              'Reconnaître les signes de sur-mentalisation',
              'Identifier les moments où votre corps vous parle',
              'Pratiquer l\'ancrage dans l\'instant présent'
            ],
            text: 'Aujourd\'hui, nous explorons comment votre corps peut devenir votre meilleur allié pour calmer votre mental hyperactif.'
          }
        },
        {
          title: 'Scan corporel apaisant',
          description: 'Méditation guidée pour reconnecter corps et esprit',
          duration: '10 min',
          type: 'audio',
          content: {
            audioText: 'Commence par tes pieds... Sens-les contre le sol... Remonte lentement vers tes jambes... Que ressens-tu ? Monte vers ton ventre... Ton cœur... Laisse ton mental observer sans analyser...'
          }
        },
        {
          title: 'Journal de mes sur-pensées',
          description: 'Identifier vos patterns de rumination',
          duration: '8 min',
          type: 'interactive',
          content: {
            prompt: 'Notez 3 sujets sur lesquels vous sur-réfléchissez le plus. Pour chacun, décrivez comment cela affecte votre bien-être.',
            placeholder: 'Sujet 1: Mon travail/mes performances...\nComment ça m\'affecte: ...'
          }
        }
      ],
      [
        {
          title: 'L\'art de l\'imperfection',
          description: 'Libérer l\'emprise du perfectionnisme',
          duration: '7 min',
          type: 'explanatory',
          content: {
            introduction: 'Le perfectionnisme est souvent la prison dorée de l\'intelligence.',
            objective: 'Embrasser l\'imperfection comme chemin de liberté',
            steps: [
              'Identifier où le perfectionnisme vous limite',
              'Comprendre que "assez bien" peut être parfait',
              'Célébrer vos imperfections comme preuves d\'authenticité'
            ],
            text: 'Votre intelligence vous pousse vers l\'excellence, mais parfois, le "assez bien" est exactement ce dont vous avez besoin pour avancer.'
          }
        },
        {
          title: 'Respiration 4-7-8 anti-rumination',
          description: 'Technique respiratoire pour calmer le mental',
          duration: '6 min',
          type: 'audio',
          content: {
            audioText: 'Inspire sur 4 temps... 1, 2, 3, 4... Retiens sur 7 temps... 1, 2, 3, 4, 5, 6, 7... Expire sur 8 temps... Laisse ton mental se poser sur ce rythme...'
          }
        },
        {
          title: 'Mes moments de lâcher-prise',
          description: 'Identifier quand vous arrivez à vous détendre',
          duration: '7 min',
          type: 'interactive',
          content: {
            prompt: 'Décrivez 3 moments récents où vous avez réussi à lâcher prise et à être présent(e). Qu\'est-ce qui a facilité ces moments ?',
            placeholder: 'Moment 1: Quand je...\nCe qui m\'a aidé: ...'
          }
        }
      ],
      [
        {
          title: 'La sagesse du présent',
          description: 'Cultiver la présence comme antidote au mental',
          duration: '8 min',
          type: 'explanatory',
          content: {
            introduction: 'Le moment présent contient toute la paix que votre mental cherche dans le futur.',
            objective: 'Développer votre capacité à habiter l\'instant',
            steps: [
              'Pratiquer l\'observation sans jugement',
              'Utiliser vos 5 sens comme ancres au présent',
              'Transformer l\'analyse en contemplation'
            ],
            text: 'Votre capacité d\'analyse peut devenir un outil de contemplation profonde plutôt qu\'une source d\'agitation.'
          }
        },
        {
          title: 'Méditation des 5 sens',
          description: 'Ancrage sensoriel dans l\'instant présent',
          duration: '9 min',
          type: 'audio',
          content: {
            audioText: '5 choses que tu vois... 4 que tu entends... 3 que tu touches... 2 que tu sens... 1 que tu goûtes... Reste dans cette présence sensorielle... Ton mental peut observer et se reposer...'
          }
        },
        {
          title: 'Ma routine d\'ancrage quotidien',
          description: 'Créer des rituels pour revenir au présent',
          duration: '6 min',
          type: 'interactive',
          content: {
            prompt: 'Concevez 3 petits rituels quotidiens qui vous aideront à sortir de votre tête et revenir à votre corps et au présent.',
            placeholder: 'Matin: Je vais...\nMidi: ...\nSoir: ...'
          }
        }
      ]
    ]
  },

  'Le Blessé Loyal': {
    name: 'Le Blessé Loyal',
    description: 'Votre loyauté excessive et votre peur du rejet vous ont souvent mené à être blessé par des trahisons.',
    explanation: 'Votre capacité à aimer et à être loyal est magnifique, mais elle a besoin d\'être équilibrée par l\'amour de soi. Nous allons reconstruire votre confiance.',
    color: 'from-rose-400 to-pink-400',
    activities: [
      [
        {
          title: 'Reconnaître sa loyauté blessée',
          description: 'Comprendre le cycle loyauté-trahison-blessure',
          duration: '7 min',
          type: 'explanatory',
          content: {
            introduction: 'Votre loyauté est un cadeau précieux, mais elle mérite d\'être protégée.',
            objective: 'Comprendre comment transformer votre loyauté en force',
            steps: [
              'Identifier vos patterns de loyauté excessive',
              'Reconnaître les signaux de relations déséquilibrées',
              'Apprendre à être loyal envers vous-même d\'abord'
            ],
            text: 'Aujourd\'hui, nous explorons comment honorer votre nature loyale tout en vous protégeant des blessures répétées.'
          }
        },
        {
          title: 'Guérison du coeur blessé',
          description: 'Méditation pour apaiser les blessures relationnelles',
          duration: '10 min',
          type: 'audio',
          content: {
            audioText: 'Place ta main sur ton cœur... Sens sa chaleur... Respire dans cet espace... Envoie de la compassion à toutes tes blessures... Tu as aimé courageusement... C\'est beau...'
          }
        },
        {
          title: 'Carte de mes loyautés',
          description: 'Identifier où va votre énergie loyale',
          duration: '9 min',
          type: 'interactive',
          content: {
            prompt: 'Listez les personnes/situations auxquelles vous êtes le plus loyal(e). Pour chacune, notez si cette loyauté est réciproque.',
            placeholder: 'Personne/Situation 1: ...\nRéciproque ? ...\nComment je me sens: ...'
          }
        }
      ],
      [
        {
          title: 'Les frontières de l\'amour',
          description: 'Apprendre à aimer avec des limites saines',
          duration: '8 min',
          type: 'explanatory',
          content: {
            introduction: 'Aimer sans limites n\'est pas de l\'amour, c\'est de l\'épuisement.',
            objective: 'Créer des frontières qui protègent votre capacité d\'aimer',
            steps: [
              'Identifier où vous donnez trop',
              'Comprendre que dire non peut être un acte d\'amour',
              'Pratiquer l\'amour conditionnel sain'
            ],
            text: 'Vos limites ne diminuent pas votre amour, elles le rendent durable et authentique.'
          }
        },
        {
          title: 'Affirmations de protection',
          description: 'Renforcer votre bouclier émotionnel',
          duration: '6 min',
          type: 'audio',
          content: {
            audioText: 'Je mérite d\'être traité(e) avec respect... Ma loyauté est précieuse... Je peux aimer et me protéger... Je choisis qui mérite mon dévouement...'
          }
        },
        {
          title: 'Mes signaux d\'alarme',
          description: 'Reconnaître les signes de relations toxiques',
          duration: '10 min',
          type: 'interactive',
          content: {
            prompt: 'Identifiez 5 signaux qui vous alertent qu\'une relation ou situation pourrait blesser votre loyauté. Comment allez-vous réagir quand vous les verrez ?',
            placeholder: 'Signal 1: Quand quelqu\'un...\nMa réaction sera: ...'
          }
        }
      ],
      [
        {
          title: 'Reconstruire la confiance',
          description: 'Les étapes pour faire confiance à nouveau',
          duration: '9 min',
          type: 'explanatory',
          content: {
            introduction: 'La confiance brisée peut se reconstruire, pierre après pierre.',
            objective: 'Développer une confiance éclairée et progressive',
            steps: [
              'Distinguer confiance aveugle et confiance éclairée',
              'Pratiquer la confiance par petites doses',
              'Apprendre à faire confiance à votre intuition'
            ],
            text: 'Votre capacité à faire confiance peut se régénérer tout en devenant plus sage et plus sélective.'
          }
        },
        {
          title: 'Visualisation: Mon nouveau moi confiant',
          description: 'Imaginer votre version qui fait confiance sainement',
          duration: '8 min',
          type: 'audio',
          content: {
            audioText: 'Imagine-toi dans 6 mois... Tu fais confiance de manière éclairée... Tu es loyal(e) envers ceux qui le méritent... Comment te sens-tu ? Tu es protégé(e) et aimant(e)...'
          }
        },
        {
          title: 'Mon plan de loyauté éclairée',
          description: 'Créer des critères pour votre loyauté future',
          duration: '7 min',
          type: 'interactive',
          content: {
            prompt: 'Définissez 3 critères que quelqu\'un doit remplir pour mériter votre loyauté profonde. Comment allez-vous tester ces critères ?',
            placeholder: 'Critère 1: Cette personne doit...\nComment je le teste: ...'
          }
        }
      ]
    ]
  },

  'Le Colérique Fatigué': {
    name: 'Le Colérique Fatigué',
    description: 'Vous êtes impulsif, souvent frustré et ressentez des conflits intérieurs constants.',
    explanation: 'Votre colère cache souvent des besoins non exprimés et des blessures profondes. Nous allons transformer cette énergie en force constructive.',
    color: 'from-orange-400 to-red-400',
    activities: [
      [
        {
          title: 'Comprendre sa colère',
          description: 'Décoder les messages cachés de votre colère',
          duration: '8 min',
          type: 'explanatory',
          content: {
            introduction: 'Votre colère n\'est pas votre ennemi, c\'est un messager incompris.',
            objective: 'Apprendre à écouter ce que votre colère tente de vous dire',
            steps: [
              'Identifier les déclencheurs récurrents de votre colère',
              'Reconnaître les besoins cachés derrière la frustration',
              'Distinguer colère saine et colère destructrice'
            ],
            text: 'Aujourd\'hui, nous apprenons à transformer votre colère de force destructrice en énergie constructive.'
          }
        },
        {
          title: 'Respiration de libération',
          description: 'Technique pour évacuer la tension accumulée',
          duration: '7 min',
          type: 'audio',
          content: {
            audioText: 'Inspire profondément la frustration... Expire en faisant un son "Ahhhh"... Laisse sortir cette énergie bloquée... Ton corps se libère... Ta colère se transforme...'
          }
        },
        {
          title: 'Journal de ma colère',
          description: 'Traquer vos patterns de frustration',
          duration: '10 min',
          type: 'interactive',
          content: {
            prompt: 'Décrivez votre dernière grosse colère. Qu\'est-ce qui l\'a déclenchée ? Quel besoin n\'était pas satisfait ? Que vous disait-elle vraiment ?',
            placeholder: 'Situation: ...\nDéclencheur: ...\nBesoin caché: ...\nMessage réel: ...'
          }
        }
      ],
      [
        {
          title: 'L\'art de canaliser l\'énergie',
          description: 'Transformer l\'impulsivité en action constructive',
          duration: '7 min',
          type: 'explanatory',
          content: {
            introduction: 'Votre énergie intense est un carburant précieux qu\'il faut apprendre à diriger.',
            objective: 'Développer des stratégies pour utiliser votre énergie positivement',
            steps: [
              'Reconnaître les signaux avant-coureurs de l\'impulsivité',
              'Créer des pauses conscientes',
              'Rediriger l\'énergie vers des actions constructives'
            ],
            text: 'Votre intensité émotionnelle peut devenir votre plus grand atout si vous apprenez à la canaliser.'
          }
        },
        {
          title: 'Méditation du guerrier pacifique',
          description: 'Cultiver la force calme',
          duration: '9 min',
          type: 'audio',
          content: {
            audioText: 'Tu es un guerrier... Mais un guerrier de paix... Ta force vient de ta maîtrise... Sens cette puissance tranquille en toi... Tu peux choisir tes batailles...'
          }
        },
        {
          title: 'Mes nouveaux exutoires',
          description: 'Créer des canaux sains pour votre énergie',
          duration: '8 min',
          type: 'interactive',
          content: {
            prompt: 'Listez 5 activités qui pourraient vous aider à canaliser votre énergie de manière positive quand vous sentez la frustration monter.',
            placeholder: '1. Quand je sens la colère monter, je peux...\n2. ...'
          }
        }
      ],
      [
        {
          title: 'Retrouver sa boussole intérieure',
          description: 'Se reconnecter à ses valeurs profondes',
          duration: '8 min',
          type: 'explanatory',
          content: {
            introduction: 'Sous la colère se cache souvent une boussole morale très forte.',
            objective: 'Retrouver vos valeurs comme guide de vos actions',
            steps: [
              'Identifier ce qui vous révolte vraiment et pourquoi',
              'Reconnaître vos valeurs fondamentales',
              'Aligner vos actions sur vos convictions profondes'
            ],
            text: 'Votre colère révèle souvent vos valeurs les plus importantes. C\'est un cadeau déguisé.'
          }
        },
        {
          title: 'Visualisation: Mon calme puissant',
          description: 'Ancrer votre nouvelle façon d\'être',
          duration: '10 min',
          type: 'audio',
          content: {
            audioText: 'Imagine-toi face à une situation frustrante... Mais cette fois, tu restes centré(e)... Tu sens ta force tranquille... Tu choisis ta réponse... Tu es maître de ton énergie...'
          }
        },
        {
          title: 'Mon code de conduite personnel',
          description: 'Définir vos nouvelles règles de vie',
          duration: '9 min',
          type: 'interactive',
          content: {
            prompt: 'Créez votre code personnel : 5 principes qui vous guideront quand vous sentez la colère monter. Comment voulez-vous réagir désormais ?',
            placeholder: 'Principe 1: Quand je me sens en colère, je...\nPrincipe 2: ...'
          }
        }
      ]
    ]
  },

  'Le Surefficace Usé': {
    name: 'Le Surefficace Usé',
    description: 'Vous êtes surmené, épuisé par la charge mentale et le perfectionnisme vous consume.',
    explanation: 'Votre efficacité remarquable vous a mené à l\'épuisement. Il est temps d\'apprendre à ralentir et à retrouver du sens sans perdre votre essence.',
    color: 'from-yellow-400 to-amber-400',
    activities: [
      [
        {
          title: 'Reconnaître son épuisement',
          description: 'Comprendre les signaux de votre surmenage',
          duration: '7 min',
          type: 'explanatory',
          content: {
            introduction: 'Votre efficacité est devenue une prison dorée dont il faut sortir.',
            objective: 'Identifier les signaux d\'alarme de votre épuisement',
            steps: [
              'Reconnaître les symptômes physiques et émotionnels',
              'Identifier vos drivers de performance toxiques',
              'Comprendre que ralentir n\'est pas échouer'
            ],
            text: 'Aujourd\'hui, nous apprenons à distinguer efficacité saine et épuisement masqué.'
          }
        },
        {
          title: 'Méditation de récupération',
          description: 'Permettre à votre système nerveux de se reposer',
          duration: '12 min',
          type: 'audio',
          content: {
            audioText: 'Tu as le droit de te reposer... Ton corps a besoin de récupérer... Sens cette fatigue sans la juger... Elle te demande de ralentir... C\'est un message d\'amour...'
          }
        },
        {
          title: 'Inventaire de mon épuisement',
          description: 'Faire le bilan de votre charge mentale actuelle',
          duration: '10 min',
          type: 'interactive',
          content: {
            prompt: 'Listez tout ce qui vous épuise actuellement : tâches, responsabilités, préoccupations. Évaluez l\'urgence réelle de chaque élément sur 10.',
            placeholder: 'Charge 1: ...\nUrgence réelle: .../10\nImpact sur mon énergie: ...'
          }
        }
      ],
      [
        {
          title: 'L\'art du "assez bien"',
          description: 'Libérer l\'emprise du perfectionnisme',
          duration: '8 min',
          type: 'explanatory',
          content: {
            introduction: 'Le perfectionnisme vous vole votre énergie et votre joie de vivre.',
            objective: 'Apprendre à accepter "assez bien" comme parfait',
            steps: [
              'Identifier où le perfectionnisme vous coûte le plus',
              'Expérimenter le "assez bien" dans des domaines sécurisés',
              'Célébrer vos accomplissements même imparfaits'
            ],
            text: 'Votre valeur ne dépend pas de votre performance. Vous êtes précieux(se) par votre seule existence.'
          }
        },
        {
          title: 'Respiration de lâcher-prise',
          description: 'Technique pour relâcher le contrôle',
          duration: '8 min',
          type: 'audio',
          content: {
            audioText: 'À chaque expiration, lâche un peu de contrôle... "Assez bien" suffit... Tu n\'as pas à tout porter... Laisse d\'autres s\'occuper de certaines choses...'
          }
        },
        {
          title: 'Mes priorités essentielles',
          description: 'Identifier ce qui mérite vraiment votre énergie',
          duration: '12 min',
          type: 'interactive',
          content: {
            prompt: 'Parmi toutes vos activités, identifiez les 3 plus importantes pour VOUS (pas pour les autres). Qu\'est-ce que vous pourriez abandonner ou déléguer ?',
            placeholder: 'Priorité essentielle 1: ...\nPourquoi c\'est important POUR MOI: ...\nJe peux abandonner: ...'
          }
        }
      ],
      [
        {
          title: 'Retrouver du sens',
          description: 'Reconnecter avec vos motivations profondes',
          duration: '9 min',
          type: 'explanatory',
          content: {
            introduction: 'L\'efficacité sans sens mène à l\'épuisement. Il est temps de retrouver votre pourquoi.',
            objective: 'Redécouvrir ce qui donne du sens à vos actions',
            steps: [
              'Identifier ce qui vous animait avant l\'épuisement',
              'Reconnaître vos valeurs fondamentales',
              'Aligner vos actions sur ce qui compte vraiment'
            ],
            text: 'Votre efficacité retrouvera sa puissance quand elle sera au service de ce qui vous anime vraiment.'
          }
        },
        {
          title: 'Visualisation: Ma vie équilibrée',
          description: 'Imaginer votre nouveau rythme de vie',
          duration: '10 min',
          type: 'audio',
          content: {
            audioText: 'Imagine ta vie dans 6 mois... Tu es efficace ET reposé(e)... Tu as du temps pour toi... Tu choisis tes priorités... Comment te sens-tu ? Ancre cette sensation...'
          }
        },
        {
          title: 'Mon plan de récupération',
          description: 'Créer votre stratégie de sortie du surmenage',
          duration: '11 min',
          type: 'interactive',
          content: {
            prompt: 'Concevez votre plan en 3 étapes : 1) Ce que vous allez arrêter, 2) Ce que vous allez déléguer, 3) Les nouveaux espaces que vous allez créer pour vous.',
            placeholder: 'ARRÊTER: ...\nDÉLÉGUER: ...\nCRÉER POUR MOI: ...'
          }
        }
      ]
    ]
  },

  'Le Vide Camouflé': {
    name: 'Le Vide Camouflé',
    description: 'Vous paraissez bien en surface, mais vous ressentez un vide profond à l\'intérieur.',
    explanation: 'Votre façade parfaite cache une déconnexion de vos désirs authentiques. Nous allons vous aider à retrouver votre essence véritable.',
    color: 'from-gray-400 to-slate-400',
    activities: [
      [
        {
          title: 'Reconnaître le vide camouflé',
          description: 'Comprendre pourquoi vous vous sentez vide malgré les apparences',
          duration: '8 min',
          type: 'explanatory',
          content: {
            introduction: 'Votre vide n\'est pas un défaut, c\'est un signal que votre vraie nature demande à s\'exprimer.',
            objective: 'Identifier les mécanismes de camouflage de votre vide',
            steps: [
              'Reconnaître la différence entre paraître et être',
              'Identifier les moments où le vide se fait sentir',
              'Comprendre que le vide appelle l\'authenticité'
            ],
            text: 'Aujourd\'hui, nous explorons ce vide non comme un problème, mais comme un espace à remplir de votre vérité.'
          }
        },
        {
          title: 'Méditation du retour à soi',
          description: 'Se reconnecter à son essence profonde',
          duration: '11 min',
          type: 'audio',
          content: {
            audioText: 'Au-delà de tous tes rôles... Au-delà de toutes tes performances... Qui es-tu vraiment ? Descends dans ce silence... Il y a quelqu\'un là... Ton vrai toi...'
          }
        },
        {
          title: 'Cartographie de mon vide',
          description: 'Explorer les contours de votre sentiment de vide',
          duration: '10 min',
          type: 'interactive',
          content: {
            prompt: 'Décrivez les moments où vous ressentez le plus ce vide. Dans quelles situations ? Avec quelles personnes ? Que recherchez-vous vraiment dans ces moments ?',
            placeholder: 'Je me sens vide quand...\nCe que je recherche vraiment: ...\nCe qui pourrait combler: ...'
          }
        }
      ],
      [
        {
          title: 'Sortir de l\'automatisme',
          description: 'Briser les patterns qui vous déconnectent de vous',
          duration: '7 min',
          type: 'explanatory',
          content: {
            introduction: 'L\'automatisme est le terreau du vide. Il est temps de réveiller votre conscience.',
            objective: 'Identifier et transformer vos automatismes',
            steps: [
              'Reconnaître vos comportements automatiques',
              'Identifier les moments de vraie présence',
              'Créer des interruptions conscientes dans votre quotidien'
            ],
            text: 'Chaque moment de conscience que vous créez est une victoire contre le vide.'
          }
        },
        {
          title: 'Éveil sensoriel',
          description: 'Réveiller vos sens pour revenir à la vie',
          duration: '9 min',
          type: 'audio',
          content: {
            audioText: 'Réveille tes sens... Que vois-tu vraiment ? Que sens-tu ? Que goûtes-tu ? Ton corps est vivant... Il ressent... Il existe... Tu existes...'
          }
        },
        {
          title: 'Mes moments de vraie vie',
          description: 'Identifier quand vous vous sentez vraiment vivant(e)',
          duration: '9 min',
          type: 'interactive',
          content: {
            prompt: 'Rappelez-vous 3 moments récents où vous vous êtes senti(e) vraiment vivant(e), présent(e). Qu\'est-ce qui rendait ces moments spéciaux ?',
            placeholder: 'Moment 1: ...\nCe qui le rendait spécial: ...\nComment reproduire cette sensation: ...'
          }
        }
      ],
      [
        {
          title: 'Reconnecter avec ses désirs',
          description: 'Redécouvrir ce que vous voulez vraiment',
          duration: '9 min',
          type: 'explanatory',
          content: {
            introduction: 'Sous le vide se cachent des désirs authentiques que vous avez peut-être oubliés.',
            objective: 'Retrouver le contact avec vos désirs profonds',
            steps: [
              'Distinguer vos vrais désirs des attentes extérieures',
              'Explorer ce qui vous fait vibrer naturellement',
              'Oser reconnaître ce que vous voulez vraiment'
            ],
            text: 'Vos désirs sont la boussole qui peut vous sortir du vide et vous mener vers une vie authentique.'
          }
        },
        {
          title: 'Visualisation de vos désirs profonds',
          description: 'Explorer ce que votre cœur désire vraiment',
          duration: '12 min',
          type: 'audio',
          content: {
            audioText: 'Si tu étais totalement libre... Si tu n\'avais peur de rien... Que ferais-tu ? Qui serais-tu ? Laisse monter ces images... Ces sensations... C\'est ton vrai toi...'
          }
        },
        {
          title: 'Ma liste de désirs authentiques',
          description: 'Créer votre feuille de route vers l\'authenticité',
          duration: '10 min',
          type: 'interactive',
          content: {
            prompt: 'Listez 10 choses que vous désirez vraiment (pas ce que vous "devriez" vouloir). Grandes ou petites. Pour chacune, notez un premier petit pas.',
            placeholder: 'Désir 1: ...\nPremier pas: ...\nDésir 2: ...'
          }
        }
      ]
    ]
  },

  'Le Refoulé Rieur': {
    name: 'Le Refoulé Rieur',
    description: 'Vous cachez tout sous l\'humour ou le déni, refusant l\'introspection profonde.',
    explanation: 'Votre humour est un mécanisme de défense brillant, mais il vous empêche parfois d\'accéder à votre vérité intérieure. Il est temps d\'équilibrer légèreté et profondeur.',
    color: 'from-green-400 to-emerald-400',
    activities: [
      [
        {
          title: 'Reconnaître ses mécanismes de défense',
          description: 'Comprendre comment l\'humour peut masquer vos émotions',
          duration: '8 min',
          type: 'explanatory',
          content: {
            introduction: 'Votre humour est un cadeau, mais il ne doit pas devenir une prison qui vous empêche d\'être authentique.',
            objective: 'Identifier quand l\'humour devient une fuite',
            steps: [
              'Reconnaître les situations où vous utilisez l\'humour pour éviter',
              'Identifier ce que vous craignez de ressentir',
              'Apprendre à doser humour et authenticité'
            ],
            text: 'Aujourd\'hui, nous explorons comment garder votre légèreté tout en accueillant votre profondeur.'
          }
        },
        {
          title: 'Méditation du sérieux bienveillant',
          description: 'Apprendre à être avec vos émotions sans les fuir',
          duration: '10 min',
          type: 'audio',
          content: {
            audioText: 'Pour quelques minutes, pose ton masque de légèreté... Tu peux être sérieux(se) et bienveillant(e) avec toi... Qu\'est-ce qui se cache derrière le rire ? Accueille-le...'
          }
        },
        {
          title: 'Journal de mes fuites',
          description: 'Identifier vos patterns d\'évitement',
          duration: '9 min',
          type: 'interactive',
          content: {
            prompt: 'Pensez à 3 situations récentes où vous avez utilisé l\'humour ou le déni pour éviter une émotion. Qu\'essayiez-vous de ne pas ressentir ?',
            placeholder: 'Situation 1: ...\nÉmotion évitée: ...\nCe que ça m\'a coûté: ...'
          }
        }
      ],
      [
        {
          title: 'L\'art de la vulnérabilité légère',
          description: 'Apprendre à être authentique sans drama',
          duration: '7 min',
          type: 'explanatory',
          content: {
            introduction: 'Vous pouvez être profond(e) sans perdre votre légèreté naturelle.',
            objective: 'Développer une authenticité qui vous ressemble',
            steps: [
              'Comprendre que vulnérabilité ne signifie pas lourdeur',
              'Pratiquer l\'honnêteté émotionnelle avec douceur',
              'Garder votre humour tout en étant vrai(e)'
            ],
            text: 'Votre capacité à voir le côté léger peut coexister avec votre capacité à ressentir profondément.'
          }
        },
        {
          title: 'Affirmations d\'authenticité',
          description: 'Renforcer votre droit à être authentique',
          duration: '7 min',
          type: 'audio',
          content: {
            audioText: 'J\'ai le droit d\'être triste parfois... J\'ai le droit d\'être sérieux(se)... Mon humour ET mes émotions ont leur place... Je peux être complet(e)...'
          }
        },
        {
          title: 'Mes émotions cachées',
          description: 'Explorer ce que vous gardez sous silence',
          duration: '11 min',
          type: 'interactive',
          content: {
            prompt: 'Listez 5 émotions ou pensées que vous gardez généralement pour vous. Pour chacune, imaginez comment vous pourriez l\'exprimer de manière authentique mais douce.',
            placeholder: 'Émotion cachée 1: ...\nComment l\'exprimer sainement: ...'
          }
        }
      ],
      [
        {
          title: 'Libérer ses non-dits',
          description: 'Apprendre à exprimer ce que vous taisez',
          duration: '8 min',
          type: 'explanatory',
          content: {
            introduction: 'Vos non-dits s\'accumulent et créent une distance avec votre vérité.',
            objective: 'Développer des façons saines d\'exprimer vos non-dits',
            steps: [
              'Identifier vos non-dits les plus lourds',
              'Comprendre pourquoi vous les gardez',
              'Trouver des façons sécurisées de les exprimer'
            ],
            text: 'Chaque non-dit libéré vous rapproche de votre authenticité et allège votre être.'
          }
        },
        {
          title: 'Visualisation: Mon expression libérée',
          description: 'Imaginer votre version authentiquement expressive',
          duration: '10 min',
          type: 'audio',
          content: {
            audioText: 'Imagine-toi exprimant ta vérité avec douceur... Tu gardes ton humour mais tu dis aussi tes vraies émotions... Les gens te voient vraiment... Comment te sens-tu ?'
          }
        },
        {
          title: 'Ma stratégie d\'expression authentique',
          description: 'Créer votre plan pour être plus vrai(e)',
          duration: '12 min',
          type: 'interactive',
          content: {
            prompt: 'Choisissez 3 personnes avec qui vous aimeriez être plus authentique. Pour chacune, identifiez ce que vous aimeriez partager et comment vous pourriez le faire.',
            placeholder: 'Personne 1: ...\nCe que j\'aimerais partager: ...\nComment je vais m\'y prendre: ...'
          }
        }
      ]
    ]
  }
};

export const getProfileData = (profileName: string): ProfileData => {
  return profilesData[profileName] || profilesData['Le Sensible Silencieux'];
};
