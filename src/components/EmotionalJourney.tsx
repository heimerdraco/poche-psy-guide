import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Heart, Calendar, MessageCircle, Book, Edit } from "lucide-react";

interface EmotionalJourneyProps {
  profile: string;
  trialDays: number;
}

const journeyContent = {
  "Épuisement mental": {
    emoji: "🌙",
    color: "from-blue-200 to-purple-200",
    bgGradient: "from-slate-100 via-blue-50 to-purple-50",
    textColor: "text-slate-600",
    cardBg: "bg-white/60 backdrop-blur-sm",
    animation: "animate-pulse",
    fontFamily: "'Nunito', sans-serif", // Ronde, lisible
    title: "Zone de Repos",
    theme: {
      primary: "bg-gradient-to-r from-blue-200 to-purple-200",
      secondary: "bg-gradient-to-r from-slate-100 to-blue-100",
      accent: "text-blue-600",
      shadow: "shadow-blue-100/50"
    },
    days: [
      {
        day: 1,
        title: "Poser le poids 🌙",
        message: "Tu es fatigué·e. Pas juste physiquement, mais profondément. Ici, on ne te demandera rien.",
        action: "Fermer les yeux 1 min, main sur le ventre",
        quote: "Le repos n'est pas un luxe, c'est un besoin vital."
      },
      {
        day: 2,
        title: "Reconnexion au corps 🫂",
        message: "Ton corps porte ce que ton mental refuse d'exprimer. Écoutons-le ensemble.",
        action: "Étirements doux + journal 'Mon corps me dit quoi ?'",
        quote: "Ce que ton mental refuse d'exprimer, ton corps le porte."
      },
      {
        day: 3,
        title: "Droit au vide ⏸️",
        message: "Tu as le droit de ne rien faire, de ne rien produire. Tu as de la valeur par essence.",
        action: "3 minutes sans téléphone, juste être",
        quote: "Tu n'as pas à être productif·ve pour avoir de la valeur."
      },
      {
        day: 4,
        title: "Rituel du soir guidé 🕯️",
        message: "Créer un moment sacré pour clôturer tes journées en douceur.",
        action: "Mettre en place un rituel de 10 minutes avant le coucher",
        quote: "Les rituels sont des ancres de paix dans le chaos."
      },
      {
        day: 5,
        title: "Routine 3-6-9 🌊",
        message: "3 minutes pour respirer, 6 minutes pour écrire, 9 minutes pour visualiser.",
        action: "Suivre la routine 3-6-9 à ton rythme",
        quote: "La structure libère quand elle est choisie, pas subie."
      },
      {
        day: 6,
        title: "Affirmations douces 💙",
        message: "Remplacer la voix critique par une voix bienveillante.",
        action: "Répéter 3 affirmations douces qui résonnent en toi",
        quote: "Je mérite la même gentillesse que je donne aux autres."
      },
      {
        day: 7,
        title: "Suivi auto-score fatigue 📊",
        message: "Observer ta fatigue sans jugement, juste pour comprendre.",
        action: "Noter ton niveau de fatigue de 1 à 10 + ce qui l'influence",
        quote: "Observer, c'est le premier pas vers le changement."
      },
      {
        day: 8,
        title: "Micro-pauses régénérantes ⚡",
        message: "De petites pauses peuvent transformer une journée.",
        action: "Programmer 3 micro-pauses de 2 minutes dans ta journée",
        quote: "Les petites pauses créent de grandes régénérations."
      },
      {
        day: 9,
        title: "Énergie vs épuisement 🔋",
        message: "Identifier ce qui te donne de l'énergie et ce qui t'en prend.",
        action: "Faire 2 listes : ce qui nourrit / ce qui épuise",
        quote: "Connaître ses sources d'énergie, c'est reprendre son pouvoir."
      },
      {
        day: 10,
        title: "Plan de repos personnalisé 🗺️",
        message: "Tu as maintenant ta boîte à outils pour gérer ton épuisement.",
        action: "Créer ton plan personnel de gestion de l'épuisement",
        quote: "Le repos conscient est une forme de résistance dans un monde qui ne s'arrête jamais."
      }
    ]
  },
  "Anxiété / blocage": {
    emoji: "🌸",
    color: "from-green-200 to-blue-200",
    bgGradient: "from-sky-50 via-green-50 to-blue-50",
    textColor: "text-slate-700",
    cardBg: "bg-white/70 backdrop-blur-md",
    animation: "animate-[pulse_4s_ease-in-out_infinite]",
    fontFamily: "'Inter', sans-serif", // Fine et stable
    title: "Micro-pas vers demain",
    theme: {
      primary: "bg-gradient-to-r from-green-200 to-blue-200",
      secondary: "bg-gradient-to-r from-sky-100 to-green-100",
      accent: "text-green-600",
      shadow: "shadow-green-100/50"
    },
    days: [
      {
        day: 1,
        title: "Calmer la tempête 🌸",
        message: "Ton esprit va vite. Tu peux ralentir. Ici et maintenant.",
        action: "Respiration 4-4-6 (inspirer 4, retenir 4, expirer 6)",
        quote: "Tu n'as pas à tout contrôler, juste respirer."
      },
      {
        day: 2,
        title: "Agir malgré la peur 👣",
        message: "L'action, même toute petite, dissout l'anxiété mieux que la réflexion.",
        action: "Micro-action simple : ranger 1 objet ou envoyer 1 message",
        quote: "Le courage n'est pas l'absence de peur, c'est agir malgré elle."
      },
      {
        day: 3,
        title: "Choisir sa pensée dominante 🧠",
        message: "Tu peux transformer tes pensées anxieuses en versions plus douces.",
        action: "Transformer 3 pensées anxieuses en versions bienveillantes",
        quote: "Tes pensées ne sont pas des faits, elles sont des options."
      },
      {
        day: 4,
        title: "Défis micro-action 🎯",
        message: "Chaque petit pas défait un peu plus le blocage.",
        action: "Choisir 1 défi micro (5 minutes max) et le réaliser",
        quote: "Les grandes réalisations commencent par de petites actions."
      },
      {
        day: 5,
        title: "Visualisation 'chemin brumeux' 🌫️",
        message: "Même dans le brouillard, on peut avancer pas à pas.",
        action: "Visualiser un chemin dans la brume, avancer malgré l'incertitude",
        quote: "Tu n'as pas besoin de voir tout l'escalier, juste la première marche."
      },
      {
        day: 6,
        title: "Audio calmant 🎵",
        message: "Laisser les sons apaiser ton système nerveux.",
        action: "Écouter 10 minutes de sons apaisants (nature, musique douce)",
        quote: "La musique adoucit les mœurs et calme les tempêtes intérieures."
      },
      {
        day: 7,
        title: "Fiche pensée / alternative 📝",
        message: "Pour chaque pensée anxieuse, créer une alternative réaliste.",
        action: "Remplir ta fiche : Pensée anxieuse → Pensée alternative",
        quote: "Entre le stimulus et la réponse, il y a un espace où réside ton pouvoir."
      },
      {
        day: 8,
        title: "Ancrage corporel 🌿",
        message: "Ramener ton attention de tes pensées vers ton corps.",
        action: "Technique 5-4-3-2-1 : 5 choses vues, 4 touchées, 3 entendues...",
        quote: "Ton corps est ton ancre dans le présent."
      },
      {
        day: 9,
        title: "Plan d'action progressive 📈",
        message: "Créer un plan d'actions graduelles pour sortir du blocage.",
        action: "Noter 5 micro-actions à faire cette semaine",
        quote: "Le progrès, pas la perfection."
      },
      {
        day: 10,
        title: "Boîte à outils anti-anxiété 🧰",
        message: "Tu as maintenant une panoplie d'outils pour naviguer avec ton anxiété.",
        action: "Créer ta liste d'urgence : 5 techniques qui marchent pour toi",
        quote: "L'anxiété fait partie de toi, mais ne te définit pas."
      }
    ]
  },
  "Tristesse / vide": {
    emoji: "💧",
    color: "from-blue-200 to-indigo-200",
    bgGradient: "from-rose-50 via-stone-50 to-amber-50",
    textColor: "text-stone-700",
    cardBg: "bg-white/50 backdrop-blur-sm",
    animation: "animate-[fade-in_3s_ease-in-out_infinite_alternate]",
    fontFamily: "'Dancing Script', cursive", // Manuscrite douce
    title: "Reconnecter doucement",
    theme: {
      primary: "bg-gradient-to-r from-rose-200 to-stone-200",
      secondary: "bg-gradient-to-r from-amber-100 to-rose-100",
      accent: "text-rose-600",
      shadow: "shadow-rose-100/50"
    },
    days: [
      {
        day: 1,
        title: "Accueillir l'émotion 💧",
        message: "Tu peux juste être. Ta tristesse a le droit d'exister.",
        action: "Écrire une phrase sur le vide que tu ressens",
        quote: "Même la lune traverse des phases."
      },
      {
        day: 2,
        title: "Créer une lumière ✨",
        message: "Dans l'obscurité, la plus petite lumière devient précieuse.",
        action: "Noter 1 chose qui fait du bien + journal 'Peux-tu recréer ce moment demain ?'",
        quote: "Une bougie perd-elle de sa lumière en allumant une autre bougie ?"
      },
      {
        day: 3,
        title: "Ancrer du réel 🪨",
        message: "Te reconnecter au monde tangible qui t'entoure.",
        action: "Toucher un objet et le décrire en détail (texture, poids, température)",
        quote: "Ce que je touche me rappelle que je suis là."
      },
      {
        day: 4,
        title: "Suivi des sensations 🌡️",
        message: "Observer tes sensations sans les juger, juste les accueillir.",
        action: "Noter 3 sensations corporelles du moment présent",
        quote: "Sentir, c'est la preuve que tu es vivant·e."
      },
      {
        day: 5,
        title: "Album de petits bonheurs 📸",
        message: "Collectionner les micro-moments qui réchauffent le cœur.",
        action: "Photographier ou noter 1 détail qui t'a fait sourire",
        quote: "Le bonheur se trouve dans les détails."
      },
      {
        day: 6,
        title: "Musiques douces + visuels 🎼",
        message: "Laisser l'art nourrir ton âme fatiguée.",
        action: "Écouter 1 musique qui te fait du bien + regarder quelque chose de beau",
        quote: "L'art est la nourriture de l'âme."
      },
      {
        day: 7,
        title: "Rituel de connexion 🔗",
        message: "Créer un petit rituel quotidien qui te relie à la vie.",
        action: "Choisir un geste quotidien à faire avec intention (thé, étirement...)",
        quote: "Les rituels sont des ponts entre notre intérieur et le monde."
      },
      {
        day: 8,
        title: "Lettre à ta tristesse 💌",
        message: "Dialoguer avec ton émotion plutôt que la subir.",
        action: "Écrire quelques lignes à ta tristesse : que veut-elle te dire ?",
        quote: "Nos émotions sont des messages, pas des maîtres."
      },
      {
        day: 9,
        title: "Graines d'espoir 🌱",
        message: "Planter de petites graines d'espoir pour demain.",
        action: "Noter 1 chose que tu aimerais ressentir prochainement",
        quote: "L'espoir est la seule chose plus forte que la peur."
      },
      {
        day: 10,
        title: "Renaissance douce 🌅",
        message: "Tu as appris à être avec ta tristesse. C'est un cadeau précieux.",
        action: "Écrire une lettre de gratitude à toi-même pour ce parcours",
        quote: "Après l'hiver le plus dur vient le printemps le plus beau."
      }
    ]
  },
  "Estime cassée": {
    emoji: "💗",
    color: "from-pink-200 to-rose-200",
    bgGradient: "from-orange-50 via-pink-50 to-yellow-50",
    textColor: "text-amber-800",
    cardBg: "bg-white/60 backdrop-blur-md border border-yellow-100/50",
    animation: "animate-[glow_2s_ease-in-out_infinite_alternate]",
    fontFamily: "'Playfair Display', serif", // Élégante, fine mais lisible
    title: "Douceur envers soi",
    theme: {
      primary: "bg-gradient-to-r from-orange-200 to-yellow-200",
      secondary: "bg-gradient-to-r from-pink-100 to-orange-100",
      accent: "text-amber-600",
      shadow: "shadow-amber-100/50"
    },
    days: [
      {
        day: 1,
        title: "Observer sans juger 👁️",
        message: "Tu n'es pas la voix qui te critique. Tu es bien plus que ça.",
        action: "Journal : 'Que dirais-tu à un·e ami·e qui se sent comme toi ?'",
        quote: "Parle-toi comme tu parlerais à quelqu'un que tu aimes."
      },
      {
        day: 2,
        title: "Réécrire le miroir 🪞",
        message: "Changer le dialogue avec ton reflet, une phrase à la fois.",
        action: "Noter 3 choses positives que tu as faites cette semaine",
        quote: "Tu es ton critique le plus dur et tu peux aussi être ton allié le plus doux."
      },
      {
        day: 3,
        title: "Auto-compassion 🫂",
        message: "T'offrir la même gentillesse que tu donnes naturellement aux autres.",
        action: "Choisir une phrase bienveillante à te répéter chaque jour",
        quote: "L'auto-compassion est un super-pouvoir déguisé en douceur."
      },
      {
        day: 4,
        title: "Lettre à soi-même 💝",
        message: "Écrire à ton moi futur avec toute la bienveillance du monde.",
        action: "Rédiger une lettre d'encouragement à lire dans les moments difficiles",
        quote: "Tu es digne d'amour, en commençant par le tien."
      },
      {
        day: 5,
        title: "Fiche forces et réussites 🏆",
        message: "Collectionner tes victoires, même les plus petites.",
        action: "Lister 5 de tes forces + 5 réussites (grandes ou petites)",
        quote: "Tes réussites ne sont pas des accidents, elles révèlent qui tu es."
      },
      {
        day: 6,
        title: "Miroir positif 🌟",
        message: "Transformer ton rapport au miroir en moment de bienveillance.",
        action: "Créer une phrase d'ancrage positive à dire face au miroir",
        quote: "Ce que tu vois dans le miroir change selon l'amour que tu te portes."
      },
      {
        day: 7,
        title: "Célébration des efforts 🎉",
        message: "Honorer le chemin parcouru, pas seulement la destination.",
        action: "Célébrer 3 efforts que tu as faits récemment (même non réussis)",
        quote: "Le courage se mesure aux tentatives, pas aux résultats."
      },
      {
        day: 8,
        title: "Dialogue intérieur bienveillant 💭",
        message: "Entraîner la voix douce en toi à parler plus fort que la critique.",
        action: "Remplacer 3 pensées auto-critiques par 3 pensées compréhensives",
        quote: "Change ta voix intérieure et tu changeras ta vie."
      },
      {
        day: 9,
        title: "Gratitude envers soi 🙏",
        message: "Remercier ton corps, ton cœur, ton esprit pour tout ce qu'ils font.",
        action: "Écrire 3 mercis à différentes parties de toi",
        quote: "La gratitude envers soi-même guérit ce que la critique a blessé."
      },
      {
        day: 10,
        title: "Nouvelle relation avec toi 💕",
        message: "Tu as planté les graines d'une amitié avec toi-même. Continue de l'arroser.",
        action: "Créer ton contrat d'amour-propre : 3 engagements envers toi",
        quote: "La relation la plus importante de ta vie, c'est celle que tu as avec toi."
      }
    ]
  },
  "Confusion intérieure": {
    emoji: "🌀",
    color: "from-purple-200 to-pink-200",
    bgGradient: "from-teal-50 via-slate-50 to-stone-50",
    textColor: "text-slate-600",
    cardBg: "bg-white/40 backdrop-blur-lg border border-teal-100/30",
    animation: "animate-[spin_8s_linear_infinite] opacity-20",
    fontFamily: "'JetBrains Mono', monospace", // Mono-espace légère
    title: "Boussole intérieure",
    theme: {
      primary: "bg-gradient-to-r from-teal-200 to-slate-200",
      secondary: "bg-gradient-to-r from-stone-100 to-teal-100",
      accent: "text-teal-600",
      shadow: "shadow-teal-100/50"
    },
    days: [
      {
        day: 1,
        title: "Nommer une émotion 🏷️",
        message: "Donner un nom à ce que tu ressens, c'est commencer à le comprendre.",
        action: "Choisir un mot parmi 10 émotions + expliquer pourquoi",
        quote: "Ce qui ne peut être nommé ne peut être transformé."
      },
      {
        day: 2,
        title: "Clarifier une pensée 💭",
        message: "Sortir les pensées de ta tête pour les voir plus clairement.",
        action: "Journal : 'Quelle idée tourne en boucle dans ma tête ?'",
        quote: "Écrire ses pensées, c'est les libérer de leur prison mentale."
      },
      {
        day: 3,
        title: "Mini-direction 🧭",
        message: "Pas besoin de voir loin, juste le prochain pas à faire.",
        action: "Imaginer 1 chose que tu aimerais ressentir demain",
        quote: "Une direction, même petite, vaut mieux que l'immobilité."
      },
      {
        day: 4,
        title: "Carte mentale émotionnelle 🗺️",
        message: "Dessiner le paysage de tes émotions pour mieux le naviguer.",
        action: "Créer une carte de tes émotions récurrentes et leurs liens",
        quote: "Comprendre son paysage intérieur, c'est retrouver son chemin."
      },
      {
        day: 5,
        title: "Outil tri pensée/émotion/action 📊",
        message: "Séparer ce que tu penses, ressens et fais pour y voir plus clair.",
        action: "Remplir 3 colonnes : Je pense / Je ressens / Je peux faire",
        quote: "La clarté naît de la distinction entre penser, ressentir et agir."
      },
      {
        day: 6,
        title: "Check-in 2x/jour ⏰",
        message: "Prendre rendez-vous avec toi-même pour maintenir la connexion intérieure.",
        action: "Programmer 2 moments courts pour te demander 'Comment ça va ?'",
        quote: "S'écouter régulièrement évite de se perdre dans le bruit."
      },
      {
        day: 7,
        title: "Valeurs personnelles 💎",
        message: "Tes valeurs sont tes étoiles guides dans le brouillard.",
        action: "Identifier tes 3 valeurs les plus importantes et pourquoi",
        quote: "Connaître ses valeurs, c'est avoir sa boussole intérieure."
      },
      {
        day: 8,
        title: "Scénarios possibles 🎭",
        message: "Explorer différents futurs possibles sans te presser de choisir.",
        action: "Imaginer 3 scénarios différents pour ta situation actuelle",
        quote: "L'avenir a plusieurs visages, tu peux tous les considérer."
      },
      {
        day: 9,
        title: "Signal corps-esprit 📡",
        message: "Ton corps sait souvent avant ton mental. Apprends à l'écouter.",
        action: "Noter les signaux de ton corps face à différentes options",
        quote: "L'intuition parle à travers le corps avant de parler à l'esprit."
      },
      {
        day: 10,
        title: "Tableau de bord personnel 🎛️",
        message: "Tu as maintenant les outils pour naviguer dans ta complexité intérieure.",
        action: "Créer ton tableau de bord : tes outils préférés de clarification",
        quote: "La confusion devient créativité quand on a les bons outils."
      }
    ]
  },
  "Solitude / déconnexion": {
    emoji: "🫂",
    color: "from-gray-200 to-blue-200",
    bgGradient: "from-amber-50 via-orange-50 to-red-50",
    textColor: "text-amber-800",
    cardBg: "bg-white/50 backdrop-blur-sm border border-amber-100/40",
    animation: "animate-[heartbeat_2s_ease-in-out_infinite]",
    fontFamily: "'Comfortaa', cursive", // Amicale, légèrement arrondie
    title: "Tu n'es pas seul·e",
    theme: {
      primary: "bg-gradient-to-r from-amber-200 to-orange-200",
      secondary: "bg-gradient-to-r from-red-100 to-amber-100",
      accent: "text-orange-600",
      shadow: "shadow-orange-100/50"
    },
    days: [
      {
        day: 1,
        title: "Réception 💌",
        message: "Un inconnu t'envoie ce mot aujourd'hui : 'Tu comptes, même si tu ne le sens pas.'",
        action: "Lire et relire ce message jusqu'à ce qu'il résonne",
        quote: "Dans ce monde, quelqu'un pense à toi sans te connaître."
      },
      {
        day: 2,
        title: "Transmission 📮",
        message: "À ton tour d'envoyer de la lumière à quelqu'un d'autre dans l'ombre.",
        action: "Écrire une phrase bienveillante à transmettre à un·e inconnu·e",
        quote: "Donner ce qu'on aimerait recevoir guérit les deux cœurs."
      },
      {
        day: 3,
        title: "Connexion avec soi 🔗",
        message: "Avant de te connecter aux autres, reconnecte-toi à toi-même.",
        action: "Journal : 'Quelle qualité en moi peut faire du bien aux autres ?'",
        quote: "Tu portes en toi ce dont le monde a besoin."
      },
      {
        day: 4,
        title: "Galerie de messages anonymes 🖼️",
        message: "Tu n'es pas seul·e à ressentir cela. D'autres partagent tes émotions.",
        action: "Lire des messages d'autres personnes qui se sentent comme toi",
        quote: "Ta douleur est universelle, donc tu n'es jamais vraiment seul·e."
      },
      {
        day: 5,
        title: "Fiche créer un lien lentement 🌱",
        message: "Les vraies connexions se construisent pas à pas, sans pression.",
        action: "Identifier 1 personne avec qui tu pourrais créer un micro-lien",
        quote: "Les grandes amitiés commencent par de petits gestes."
      },
      {
        day: 6,
        title: "Groupe de soutien virtuel 👥",
        message: "Sentir qu'on fait partie d'une communauté, même invisiblement.",
        action: "T'imaginer dans un cercle de personnes qui te comprennent",
        quote: "Quelque part, des gens comme toi cherchent des gens comme eux."
      },
      {
        day: 7,
        title: "Rituel de connexion quotidien 🕯️",
        message: "Créer un moment quotidien pour te sentir relié·e au monde.",
        action: "Choisir un rituel : regarder le ciel, toucher un arbre, envoyer une pensée...",
        quote: "Les rituels sont des fils invisibles qui nous relient à l'univers."
      },
      {
        day: 8,
        title: "Acte de service anonyme 🎁",
        message: "Donner sans attendre crée une connexion invisible mais réelle.",
        action: "Faire 1 petit geste pour quelqu'un sans qu'il le sache",
        quote: "Servir les autres, c'est se connecter à l'humanité."
      },
      {
        day: 9,
        title: "Célébrer les micro-connexions 🌟",
        message: "Reconnaître tous les petits moments de connexion qui existent déjà.",
        action: "Noter 3 micro-connexions de ta semaine (sourire, merci, regard...)",
        quote: "Les connexions se cachent dans les détails du quotidien."
      },
      {
        day: 10,
        title: "Réseau invisible de soutien 🕸️",
        message: "Tu es connecté·e par des fils invisibles à plus de gens que tu ne le crois.",
        action: "Dessiner ton réseau de connexions : famille, amis, connaissances, inconnus bienveillants",
        quote: "Tu fais partie d'une toile humaine plus vaste que ta solitude."
      }
    ]
  },
  "Trauma / événement marquant": {
    emoji: "🛡️",
    color: "from-red-200 to-orange-200",
    bgGradient: "from-purple-900 via-indigo-800 to-purple-700",
    textColor: "text-purple-100",
    cardBg: "bg-purple-900/20 backdrop-blur-xl border border-purple-300/20",
    animation: "animate-[fade-in_4s_ease-in-out_infinite_alternate]",
    fontFamily: "'Roboto Slab', serif", // Solide, protectrice, rassurante
    title: "Se reconstruire doucement",
    theme: {
      primary: "bg-gradient-to-r from-purple-600 to-indigo-600",
      secondary: "bg-gradient-to-r from-indigo-300 to-purple-300",
      accent: "text-purple-300",
      shadow: "shadow-purple-500/30"
    },
    days: [
      {
        day: 1,
        title: "Valider la cassure 💔",
        message: "Ce que tu as vécu n'a pas à être minimisé. Ta douleur est légitime.",
        action: "Écriture libre sur ce que tu ressens, sans censure",
        quote: "Honorer sa blessure, c'est le premier pas vers la guérison."
      },
      {
        day: 2,
        title: "Rassurer le présent 🏠",
        message: "Ancrer dans ta réalité actuelle ce qui est encore stable et sûr.",
        action: "Lister 3 choses encore là dans ta vie qui n'ont pas changé",
        quote: "Dans la tempête, certaines racines tiennent encore."
      },
      {
        day: 3,
        title: "Créer un espace sécurisé 🕊️",
        message: "Construire un refuge mental où tu peux te sentir en sécurité.",
        action: "Visualisation : 'Ma bulle de sécurité' - créer ton sanctuaire intérieur",
        quote: "Tu peux créer en toi l'espace sûr que le monde ne t'a pas donné."
      },
      {
        day: 4,
        title: "Lettre à ce qui est perdu 📜",
        message: "Dialoguer avec ce qui a été perdu ou abîmé pour faire son deuil.",
        action: "Écrire une lettre à ce que tu as perdu dans cet événement",
        quote: "Dire au revoir permet de faire de la place pour l'après."
      },
      {
        day: 5,
        title: "Guide de reconstruction lente 🗺️",
        message: "La reconstruction se fait pierre par pierre, sans se presser.",
        action: "Noter 5 petites choses que tu peux reconstruire à ton rythme",
        quote: "Reconstruire, c'est choisir consciemment qui tu veux redevenir."
      },
      {
        day: 6,
        title: "Audio d'ancrage corporel 🎧",
        message: "Reconnecter ton esprit à ton corps pour retrouver ta stabilité.",
        action: "Écouter un audio de relaxation + exercices d'ancrage corporel",
        quote: "Ton corps se souvient de la sécurité même quand ton esprit l'a oubliée."
      },
      {
        day: 7,
        title: "Rituel de protection quotidien 🔮",
        message: "Créer une routine qui te fait sentir fort·e et protégé·e.",
        action: "Mettre en place un rituel quotidien qui t'apaise et te protège",
        quote: "Les rituels créent la sécurité que les événements ont ébranlée."
      },
      {
        day: 8,
        title: "Identifier tes ressources 💪",
        message: "Reconnaître toutes les forces qui t'ont aidé·e à survivre jusqu'ici.",
        action: "Lister tes ressources internes et externes de survie",
        quote: "Tu as déjà tout ce qu'il faut en toi pour traverser cela."
      },
      {
        day: 9,
        title: "Post-traumatic growth 🌱",
        message: "Certaines blessures peuvent faire naître une sagesse et une force nouvelles.",
        action: "Réfléchir : 'Qu'est-ce que cette épreuve m'a appris sur moi ?'",
        quote: "Certaines blessures nous révèlent des forces qu'on ignorait avoir."
      },
      {
        day: 10,
        title: "Nouveau chapitre 📖",
        message: "Tu n'es pas défini·e par ce qui t'est arrivé, mais par comment tu choisis de continuer.",
        action: "Écrire le premier paragraphe de ton nouveau chapitre de vie",
        quote: "Survivre à l'impensable, c'est découvrir qu'on est plus grand que ses blessures."
      }
    ]
  }
};

const EmotionalJourney = ({ profile, trialDays }: EmotionalJourneyProps) => {
  const [currentDay, setCurrentDay] = useState(1);
  const journey = journeyContent[profile as keyof typeof journeyContent];
  
  if (!journey) return null;

  const isLocked = (day: number) => day > 3 && trialDays === 0;
  const getCurrentDayContent = () => journey.days.find(d => d.day === currentDay) || journey.days[0];
  const dayContent = getCurrentDayContent();

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${journey.bgGradient} relative overflow-hidden`}
      style={{ fontFamily: journey.fontFamily }}
    >
      {/* Background Animation Elements */}
      <div className={`absolute inset-0 ${journey.animation}`}>
        {profile === "Confusion intérieure" && (
          <div className="absolute top-10 left-10 w-2 h-2 bg-teal-300 rounded-full opacity-30"></div>
        )}
        {profile === "Confusion intérieure" && (
          <div className="absolute top-32 right-20 w-1 h-1 bg-slate-400 rounded-full opacity-40"></div>
        )}
        {profile === "Solitude / déconnexion" && (
          <div className="absolute inset-0 bg-gradient-radial from-orange-100/20 to-transparent"></div>
        )}
        {profile === "Trauma / événement marquant" && (
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent"></div>
        )}
      </div>

      <div className="relative z-10 space-y-6 p-6">
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${journey.theme.primary} mb-4 ${journey.theme.shadow} shadow-xl`}>
            <span className="text-3xl">{journey.emoji}</span>
            <div className="text-left">
              <h2 className={`text-lg font-bold ${journey.textColor}`} style={{ fontFamily: journey.fontFamily }}>
                {profile}
              </h2>
              <p className={`text-sm ${journey.textColor} opacity-80`} style={{ fontFamily: journey.fontFamily }}>
                {journey.title}
              </p>
            </div>
          </div>
          <p className={`${journey.textColor} opacity-70`} style={{ fontFamily: journey.fontFamily }}>
            Parcours personnalisé • 10 jours
          </p>
        </div>

        {/* Sélection des jours */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((day) => (
            <Button
              key={day}
              variant={currentDay === day ? "default" : "outline"}
              size="sm"
              onClick={() => !isLocked(day) && setCurrentDay(day)}
              disabled={isLocked(day)}
              className={`min-w-[48px] h-12 rounded-full transition-all duration-300 ${
                currentDay === day
                  ? `${journey.theme.primary} ${journey.textColor} shadow-lg`
                  : isLocked(day)
                  ? 'opacity-50 cursor-not-allowed bg-gray-200'
                  : `${journey.cardBg} border-2 ${journey.theme.accent} border-opacity-30 hover:border-opacity-60 ${journey.textColor}`
              }`}
              style={{ fontFamily: journey.fontFamily }}
            >
              {isLocked(day) ? <Lock className="w-4 h-4" /> : day}
            </Button>
          ))}
        </div>

        {isLocked(currentDay) ? (
          <Card className={`border-0 ${journey.cardBg} ${journey.theme.shadow} shadow-2xl`}>
            <CardContent className="p-8 text-center">
              <Lock className={`w-16 h-16 mx-auto mb-4 ${journey.theme.accent}`} />
              <h3 className={`text-xl font-semibold mb-4 ${journey.textColor}`} style={{ fontFamily: journey.fontFamily }}>
                Tu veux continuer à prendre soin de toi ? 💜
              </h3>
              <p className={`${journey.textColor} opacity-80 mb-6 leading-relaxed`} style={{ fontFamily: journey.fontFamily }}>
                Active ton espace personnel illimité pour accéder aux 7 jours suivants de ton parcours émotionnel.
              </p>
              <div className="space-y-3">
                <Badge className={`${journey.theme.secondary} ${journey.textColor} text-lg px-4 py-2`}>
                  3,99€/mois ou 0,99€/semaine
                </Badge>
                <div>
                  <Button className={`w-full ${journey.theme.primary} hover:opacity-90 text-white py-3 rounded-2xl shadow-lg`}>
                    💎 Activer Soutien+
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className={`border-0 ${journey.cardBg} ${journey.theme.shadow} shadow-2xl`}>
            <CardHeader>
              <CardTitle className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className={`w-5 h-5 ${journey.theme.accent}`} />
                  <span className={`text-lg font-bold ${journey.textColor}`} style={{ fontFamily: journey.fontFamily }}>
                    Jour {dayContent.day}
                  </span>
                </div>
                <h3 className={`text-xl ${journey.textColor}`} style={{ fontFamily: journey.fontFamily }}>
                  {dayContent.title}
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`${journey.cardBg} rounded-2xl p-4 border border-white/20`}>
                <h4 className={`font-semibold mb-2 flex items-center gap-2 ${journey.textColor}`} style={{ fontFamily: journey.fontFamily }}>
                  <Heart className="w-4 h-4 text-red-400" />
                  Message du jour
                </h4>
                <p className={`${journey.textColor} opacity-90 leading-relaxed`} style={{ fontFamily: journey.fontFamily }}>
                  {dayContent.message}
                </p>
              </div>

              <div className={`${journey.cardBg} rounded-2xl p-4 border border-white/20`}>
                <h4 className={`font-semibold mb-2 flex items-center gap-2 ${journey.textColor}`} style={{ fontFamily: journey.fontFamily }}>
                  <Edit className="w-4 h-4 text-green-400" />
                  Action ou exercice
                </h4>
                <p className={`${journey.textColor} opacity-90`} style={{ fontFamily: journey.fontFamily }}>
                  {dayContent.action}
                </p>
              </div>

              <div className={`${journey.cardBg} rounded-2xl p-4 border border-white/20`}>
                <h4 className={`font-semibold mb-2 flex items-center gap-2 ${journey.textColor}`} style={{ fontFamily: journey.fontFamily }}>
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  Citation inspirante
                </h4>
                <blockquote className={`${journey.textColor} opacity-90 italic`} style={{ fontFamily: journey.fontFamily }}>
                  "{dayContent.quote}"
                </blockquote>
              </div>

              <Button 
                className={`w-full ${journey.theme.primary} hover:opacity-90 ${journey.textColor} py-3 rounded-2xl border-0 shadow-lg transition-all duration-300`}
                style={{ fontFamily: journey.fontFamily }}
              >
                🌸 Je reviens demain
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmotionalJourney;
