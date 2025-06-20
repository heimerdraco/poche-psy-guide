
import { useState, useEffect } from 'react';

interface FamiliarData {
  id: string;
  name: string;
  animal: string;
  emoji: string;
  color: string;
  personality: string;
  idleAnimation: string;
  clickAnimation: string;
  phrases: string[];
  contextualMessages: string[];
}

export const useFamiliarData = (profile: string) => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const familiars: Record<string, FamiliarData> = {
    'anxieux': {
      id: 'anxieux',
      name: 'Brume',
      animal: 'Renarde douce',
      emoji: '🦊',
      color: 'from-orange-200 to-amber-200',
      personality: 'Discrète et attentive',
      idleAnimation: 'animate-pulse-gentle',
      clickAnimation: 'animate-bounce-gentle',
      phrases: [
        "Respire doucement, tout va bien se passer 🌸",
        "Une étape à la fois, tu y arrives 🍃",
        "Je veille sur toi, tu n'es pas seul(e) 💫",
        "Tes inquiétudes sont normales, accueille-les avec douceur 🌿"
      ],
      contextualMessages: [
        "Tu sembles tendu(e) aujourd'hui, respire avec moi",
        "Prends une pause, je reste près de toi",
        "Tes pensées tourbillonnent ? Ancre-toi dans l'instant présent"
      ]
    },
    'fatigue': {
      id: 'fatigue',
      name: 'Moka',
      animal: 'Koala pelucheux',
      emoji: '🐨',
      color: 'from-gray-200 to-blue-200',
      personality: 'Calme et réconfortant',
      idleAnimation: 'animate-breathe',
      clickAnimation: 'animate-float',
      phrases: [
        "Repose-toi quand tu en as besoin 😴",
        "L'énergie revient petit à petit 🌱",
        "Tu fais de ton mieux, c'est suffisant 💙",
        "Chaque moment de repos te nourrit 🍃"
      ],
      contextualMessages: [
        "Ton énergie est précieuse, préserve-la",
        "Une sieste de 20 minutes peut tout changer",
        "Écoute ton corps, il sait ce dont il a besoin"
      ]
    },
    'deracine': {
      id: 'deracine',
      name: 'Lume',
      animal: 'Cerf mousseux',
      emoji: '🦌',
      color: 'from-green-200 to-teal-200',
      personality: 'Rêveur et sage',
      idleAnimation: 'animate-float-slow',
      clickAnimation: 'animate-twinkle',
      phrases: [
        "Chaque lieu peut devenir un chez-soi 🏡",
        "Tes racines poussent partout où tu vas 🌳",
        "L'appartenance naît de l'intérieur 💚",
        "Tu portes ton foyer dans ton cœur 🌿"
      ],
      contextualMessages: [
        "Crée de nouveaux liens, ils deviendront précieux",
        "L'adaptation est une force, pas une faiblesse",
        "Ton histoire se réécrit à chaque étape"
      ]
    },
    'controlant': {
      id: 'controlant',
      name: 'Nox',
      animal: 'Hibou rigide',
      emoji: '🦉',
      color: 'from-purple-200 to-indigo-200',
      personality: 'Observateur et précis',
      idleAnimation: 'animate-pulse',
      clickAnimation: 'animate-bounce-gentle',
      phrases: [
        "Lâcher prise est aussi un choix 🍃",
        "Tu peux faire confiance au processus 🌊",
        "L'imprévu apporte parfois de belles surprises ✨",
        "Ton besoin de sécurité est légitime 💜"
      ],
      contextualMessages: [
        "Et si tu laissais les choses se faire aujourd'hui ?",
        "Respire, tu n'as pas besoin de tout contrôler",
        "La perfection n'existe pas, et c'est libérateur"
      ]
    },
    'hypersensible': {
      id: 'hypersensible',
      name: 'Élior',
      animal: 'Papillon-luciole',
      emoji: '🦋',
      color: 'from-pink-200 to-rose-200',
      personality: 'Lumineux et délicat',
      idleAnimation: 'animate-twinkle',
      clickAnimation: 'animate-float',
      phrases: [
        "Ta sensibilité est un don précieux 🌟",
        "Protège ton énergie comme un trésor 💎",
        "Tu ressens le monde avec tant de beauté 🌸",
        "Tes émotions colorent le monde 🎨"
      ],
      contextualMessages: [
        "Créé des bulles de douceur autour de toi",
        "Tes limites sont sacrées, respecte-les",
        "Le monde a besoin de ta sensibilité unique"
      ]
    },
    'refoule': {
      id: 'refoule',
      name: 'Cendre',
      animal: 'Chat masqué',
      emoji: '🐱',
      color: 'from-indigo-200 to-blue-200',
      personality: 'Mystérieux et profond',
      idleAnimation: 'animate-fade-in-out',
      clickAnimation: 'animate-scale-in',
      phrases: [
        "Tes émotions méritent d'être entendues 🎭",
        "Il est temps de libérer ta voix intérieure 🗣️",
        "Chaque émotion a sa place et sa valeur 💙",
        "L'expression authentique te libère 🌊"
      ],
      contextualMessages: [
        "Qu'est-ce que ton cœur aimerait dire aujourd'hui ?",
        "Tes émotions cachées demandent à s'exprimer",
        "Un petit pas vers l'authenticité suffit"
      ]
    },
    'volcan': {
      id: 'volcan',
      name: 'Tiko',
      animal: 'Axolotl rougeoyant',
      emoji: '🌋',
      color: 'from-red-200 to-orange-200',
      personality: 'Vif et expressif',
      idleAnimation: 'animate-wave',
      clickAnimation: 'animate-bounce',
      phrases: [
        "Canalise cette énergie puissante 🔥",
        "Tes émotions ont le droit d'exister 💥",
        "Transform la tempête en force créatrice ⚡",
        "Ta passion est une flamme précieuse 🕯️"
      ],
      contextualMessages: [
        "Respire profondément, laisse passer la vague",
        "Cette intensité peut devenir ta plus belle force",
        "Exprime-toi, ne garde pas tout à l'intérieur"
      ]
    }
  };

  const familiar = familiars[profile] || familiars['anxieux'];

  const showRandomPhrase = () => {
    const phrases = Math.random() > 0.7 ? familiar.contextualMessages : familiar.phrases;
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(randomPhrase);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };

  useEffect(() => {
    // Afficher un message aléatoire toutes les 2-3 minutes
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        showRandomPhrase();
      }
    }, (2 + Math.random()) * 60 * 1000);

    return () => clearInterval(interval);
  }, [profile]);

  return {
    familiar,
    currentPhrase,
    showMessage,
    showRandomPhrase
  };
};
