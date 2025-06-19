import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Heart, Calendar, MessageCircle, Book } from "lucide-react";

interface EmotionalJourneyProps {
  profile: string;
  trialDays: number;
}

const journeyContent = {
  "Épuisement mental": {
    emoji: "🌙",
    color: "from-blue-200 to-purple-200",
    days: [
      {
        day: 1,
        title: "Bienvenue, âme fatiguée 💙",
        message: "Je vois ta fatigue, et elle est légitime. Aujourd'hui, nous commençons un chemin de récupération douce.",
        action: "Respiration de 5 minutes pour libérer les tensions",
        quote: "Se reposer n'est pas de la paresse, c'est de la sagesse."
      },
      {
        day: 2,
        title: "Écouter ton corps 🫂",
        message: "Ton corps te parle. Apprenons ensemble à l'écouter sans jugement.",
        action: "Scanner corporel : identifier où se loge ta fatigue",
        quote: "Ton corps est ton temple, traite-le avec amour."
      },
      {
        day: 3,
        title: "Libérer la pression 🌊",
        message: "Tu n'as pas à tout porter sur tes épaules. Déposons ensemble ce fardeau trop lourd.",
        action: "Écrire 3 choses que tu peux déléguer ou abandonner",
        quote: "Lâcher prise, c'est retrouver sa force."
      },
      {
        day: 4,
        title: "Rituel du soir apaisant 🕯️",
        message: "Créons ensemble un rituel qui signale à ton esprit qu'il est temps de se reposer.",
        action: "Établir une routine de 20 minutes avant le coucher",
        quote: "Les petits rituels créent de grandes transformations."
      },
      {
        day: 5,
        title: "Dire non avec bienveillance 🛡️",
        message: "Apprendre à protéger ton énergie n'est pas de l'égoïsme, c'est de l'amour-propre.",
        action: "Pratiquer des phrases pour dire non poliment",
        quote: "Chaque 'non' dit aux autres est un 'oui' dit à toi-même."
      },
      {
        day: 6,
        title: "Micro-pauses régénérantes ⏸️",
        message: "Quelques minutes de pause peuvent transformer une journée épuisante.",
        action: "Programmer 3 pauses de 5 minutes dans ta journée",
        quote: "La pause n'est pas une perte de temps, c'est un investissement."
      },
      {
        day: 7,
        title: "Reconnexion à tes besoins 🌱",
        message: "Tes besoins sont valides et méritent d'être honorés.",
        action: "Lister 5 besoins non satisfaits et choisir le plus urgent",
        quote: "Écouter ses besoins, c'est s'écouter soi-même."
      },
      {
        day: 8,
        title: "Célébrer les petites victoires 🎉",
        message: "Chaque effort compte, même les plus petits. Il est temps de les reconnaître.",
        action: "Noter 3 choses que tu as accomplies cette semaine",
        quote: "Les petites victoires pavent le chemin des grandes réussites."
      },
      {
        day: 9,
        title: "Planifier ta récupération 📅",
        message: "La récupération ne se fait pas par hasard, elle se planifie avec intention.",
        action: "Planifier une activité ressourçante pour demain",
        quote: "Planifier son bien-être, c'est se respecter."
      },
      {
        day: 10,
        title: "Ton nouveau départ 🌅",
        message: "Tu as appris à reconnaître et honorer ta fatigue. C'est un cadeau précieux que tu te fais.",
        action: "Écrire une lettre de gratitude à ton moi fatigué",
        quote: "Chaque fin est un nouveau commencement."
      }
    ]
  },
  "Anxiété / blocage": {
    emoji: "🌸",
    color: "from-green-200 to-blue-200",
    days: [
      {
        day: 1,
        title: "Respire, tu es en sécurité 🌸",
        message: "Ton anxiété te protège, mais elle peut aussi t'emprisonner. Apprenons à l'apprivoiser.",
        action: "Technique 4-7-8 : respirer pour calmer le système nerveux",
        quote: "Chaque inspiration est une nouvelle chance de paix."
      },
      {
        day: 2,
        title: "Démêler tes peurs 🧵",
        message: "Tes peurs ont une histoire. Explorons-les avec bienveillance pour les transformer.",
        action: "Identifier 3 peurs et leur donner un nom doux",
        quote: "Le courage n'est pas l'absence de peur, c'est agir malgré elle."
      },
      {
        day: 3,
        title: "Créer ton espace sûr 🏠",
        message: "Tu mérites un havre de paix, un endroit où ton anxiété peut se reposer.",
        action: "Visualiser et créer ton sanctuaire mental",
        quote: "La paix commence à l'intérieur de toi."
      },
      {
        day: 4,
        title: "Ancrage dans le présent ⚓",
        message: "L'anxiété vit dans le futur. Ramenons-toi doucement dans l'instant présent.",
        action: "Technique 5-4-3-2-1 : observer ce qui t'entoure maintenant",
        quote: "Le présent est le seul moment où tu as du pouvoir."
      },
      {
        day: 5,
        title: "Dialogue avec ton anxiété 💭",
        message: "Ton anxiété essaie de te protéger. Écoutons ce qu'elle a à dire.",
        action: "Écrire une conversation avec ton anxiété",
        quote: "Comprendre, c'est le premier pas vers l'apaisement."
      },
      {
        day: 6,
        title: "Mouvement libérateur 🌊",
        message: "L'énergie anxieuse peut se transformer en mouvement apaisant.",
        action: "5 minutes de mouvement doux (étirements, marche, danse)",
        quote: "Le mouvement est la médecine du corps et de l'esprit."
      },
      {
        day: 7,
        title: "Restructurer tes pensées 🔄",
        message: "Tes pensées ne sont pas des faits. Apprenons à les questionner avec douceur.",
        action: "Identifier une pensée anxieuse et la reformuler positivement",
        quote: "Change tes pensées et tu changeras ton monde."
      },
      {
        day: 8,
        title: "Rituel de calme quotidien 🧘",
        message: "Un rituel quotidien peut devenir ton refuge contre les tempêtes intérieures.",
        action: "Créer un rituel de 10 minutes pour retrouver ton calme",
        quote: "Les rituels sont des ancres dans le chaos."
      },
      {
        day: 9,
        title: "Célébrer ton courage 🦋",
        message: "Chaque jour où tu affrontes ton anxiété est un acte de bravoure extraordinaire.",
        action: "Noter 3 moments où tu as été courageux/se malgré l'anxiété",
        quote: "Le courage grandit à chaque pas que tu fais."
      },
      {
        day: 10,
        title: "Ta boîte à outils anti-anxiété 🧰",
        message: "Tu as maintenant des outils pour naviguer avec ton anxiété. Elle fait partie de toi, mais ne te définit pas.",
        action: "Créer ta liste personnelle d'outils anti-anxiété",
        quote: "Tu es plus fort que tes peurs, plus grand que tes inquiétudes."
      }
    ]
  },
  "Tristesse / vide": {
    emoji: "💧",
    color: "from-blue-200 to-indigo-200",
    days: [
      {
        day: 1,
        title: "Honorer ta tristesse 💧",
        message: "Ta tristesse n'est pas une faiblesse, c'est la preuve de ton humanité profonde.",
        action: "Laisser couler tes larmes si elles viennent",
        quote: "Les larmes sont les mots que le cœur ne peut pas dire."
      },
      {
        day: 2,
        title: "Retrouver les petites lumières ✨",
        message: "Même dans l'obscurité, de petites étoiles brillent. Apprenons à les voir.",
        action: "Noter 3 micro-moments de beauté dans ta journée",
        quote: "La plus petite lumière peut percer la plus grande obscurité."
      },
      {
        day: 3,
        title: "Nourrir ton cœur 🌱",
        message: "Ton cœur a besoin de tendresse pour se réparer. Donnons-lui ce dont il a besoin.",
        action: "Écrire une lettre de compassion à ton moi triste",
        quote: "Sois patient avec toi-même, la guérison prend du temps."
      },
      {
        day: 4,
        title: "Créer de la douceur 🍯",
        message: "Dans la tristesse, créons ensemble des îlots de douceur.",
        action: "Te faire un petit plaisir simple (thé, musique, bain...)",
        quote: "La douceur est un baume pour l'âme blessée."
      },
      {
        day: 5,
        title: "Connecter avec la nature 🌿",
        message: "La nature a un pouvoir guérisseur. Elle nous rappelle que tout renaît.",
        action: "Passer 15 minutes dehors, observer la vie autour de toi",
        quote: "Dans la nature, tout se transforme, rien ne se perd."
      },
      {
        day: 6,
        title: "Expression créative 🎨",
        message: "Ta tristesse peut devenir source de création et de beauté.",
        action: "Dessiner, écrire ou chanter ta tristesse",
        quote: "L'art transforme la douleur en beauté."
      },
      {
        day: 7,
        title: "Mémoires précieuses 📸",
        message: "Même dans la tristesse, des souvenirs doux existent. Honorons-les.",
        action: "Revivre 3 souvenirs qui réchauffent ton cœur",
        quote: "Les beaux souvenirs sont des trésors que personne ne peut voler."
      },
      {
        day: 8,
        title: "Gestes d'amour-propre 💝",
        message: "Prendre soin de toi n'est pas du luxe, c'est une nécessité vitale.",
        action: "Te faire 3 gestes d'amour-propre aujourd'hui",
        quote: "S'aimer soi-même est le début d'une histoire d'amour éternelle."
      },
      {
        day: 9,
        title: "Rêves et espoirs 🌟",
        message: "Tes rêves ne sont pas morts, ils sommeillent. Réveillons-les doucement.",
        action: "Écrire un petit rêve qui te fait encore vibrer",
        quote: "L'espoir est la chose ailée qui se perche dans l'âme."
      },
      {
        day: 10,
        title: "Renaissance intérieure 🌅",
        message: "Tu as traversé ta nuit intérieure. Une nouvelle aube se lève en toi.",
        action: "Écrire une promesse d'amour à ton futur toi",
        quote: "Après l'hiver le plus rude, le printemps le plus beau."
      }
    ]
  },
  "Estime cassée": {
    emoji: "💔",
    color: "from-pink-200 to-rose-200",
    days: [
      {
        day: 1,
        title: "Tu es précieux/se 💎",
        message: "Ta valeur ne dépend pas de tes performances. Tu es précieux/se par essence.",
        action: "Lister 5 qualités que tu possèdes, même petites",
        quote: "Tu vaux infiniment plus que tu ne le crois."
      },
      {
        day: 2,
        title: "Arrêter la comparaison 🚫",
        message: "Te comparer aux autres, c'est comme comparer une rose à un tournesol. Chacun a sa beauté.",
        action: "Identifier 3 comparaisons toxiques et les remplacer par de l'auto-compassion",
        quote: "Ta seule compétition, c'est qui tu étais hier."
      },
      {
        day: 3,
        title: "Pardon à soi-même 🤲",
        message: "Les erreurs ne te définissent pas. Elles t'apprennent et te font grandir.",
        action: "Te pardonner une erreur passée avec bienveillance",
        quote: "Le pardon est un cadeau que tu te fais à toi-même."
      },
      {
        day: 4,
        title: "Célébrer tes efforts 🌟",
        message: "L'effort compte plus que le résultat. Tu mérites d'être fier/ère de tes tentatives.",
        action: "Noter 3 efforts que tu as faits cette semaine",
        quote: "Chaque effort est une victoire en soi."
      },
      {
        day: 5,
        title: "Dialogue intérieur bienveillant 💭",
        message: "La voix dans ta tête peut devenir ton meilleur ami au lieu de ton pire ennemi.",
        action: "Remplacer 3 pensées critiques par 3 pensées bienveillantes",
        quote: "Parle-toi comme tu parlerais à ton meilleur ami."
      },
      {
        day: 6,
        title: "Tes réussites oubliées 🏆",
        message: "Tu as déjà surmonté tant de choses. Il est temps de s'en souvenir.",
        action: "Lister 5 défis que tu as relevés dans ta vie",
        quote: "Tu es déjà un survivant, un guerrier, un miracle."
      },
      {
        day: 7,
        title: "Affirmations personnelles 💪",
        message: "Les mots ont un pouvoir. Utilisons-les pour te construire au lieu de te détruire.",
        action: "Créer 3 affirmations personnelles et les répéter",
        quote: "Je suis digne d'amour et de respect, en commençant par le mien."
      },
      {
        day: 8,
        title: "Accepter les compliments 🌸",
        message: "Tu mérites les mots doux qu'on te dit. Apprends à les recevoir.",
        action: "Accepter un compliment sans le minimiser aujourd'hui",
        quote: "Accepter un compliment, c'est honorer celui qui te l'offre."
      },
      {
        day: 9,
        title: "Ton impact positif 🌍",
        message: "Tu apportes du bien dans ce monde, même si tu ne t'en rends pas compte.",
        action: "Réfléchir à 3 façons dont tu as aidé quelqu'un",
        quote: "Ton existence fait une différence dans la vie d'autres personnes."
      },
      {
        day: 10,
        title: "Nouvelle relation avec toi-même 💕",
        message: "Tu es maintenant prêt/e à construire une relation d'amour avec toi-même.",
        action: "Écrire une lettre d'amour à ton futur toi",
        quote: "S'aimer soi-même est le plus beau des voyages."
      }
    ]
  },
  "Confusion intérieure": {
    emoji: "🌀",
    color: "from-purple-200 to-pink-200",
    days: [
      {
        day: 1,
        title: "Accepter l'incertitude 🌫️",
        message: "Ne pas savoir où tu vas n'est pas un échec. C'est le début d'une exploration.",
        action: "Écrire 3 choses dont tu es certain/e dans ta vie",
        quote: "Dans le brouillard, chaque pas compte."
      },
      {
        day: 2,
        title: "Écouter ton intuition 🧭",
        message: "Au-delà de la confusion mentale, ton cœur sait souvent la direction.",
        action: "Méditer 10 minutes et noter ce que ton intuition te dit",
        quote: "L'intuition est la boussole de l'âme."
      },
      {
        day: 3,
        title: "Clarifier tes valeurs 💎",
        message: "Tes valeurs sont comme des étoiles : elles te guident même dans l'obscurité.",
        action: "Identifier tes 3 valeurs les plus importantes",
        quote: "Connaître ses valeurs, c'est connaître sa direction."
      },
      {
        day: 4,
        title: "Petit pas, grande direction 👣",
        message: "Tu n'as pas besoin de voir tout l'escalier. Un pas suffit pour avancer.",
        action: "Choisir une petite action alignée avec tes valeurs",
        quote: "Le voyage de mille lieues commence par un pas."
      },
      {
        day: 5,
        title: "Explorer tes options 🗺️",
        message: "La confusion naît souvent de trop d'options. Explorons-les une par une.",
        action: "Lister 3 options qui s'offrent à toi et leurs pour/contre",
        quote: "Chaque chemin a sa beauté, il faut juste en choisir un."
      },
      {
        day: 6,
        title: "Lâcher le contrôle 🕊️",
        message: "Tout contrôler est impossible. Lâcher prise peut révéler de nouvelles possibilités.",
        action: "Identifier une chose que tu peux lâcher aujourd'hui",
        quote: "Lâcher prise n'est pas abandonner, c'est faire confiance."
      },
      {
        day: 7,
        title: "Reconnecter avec tes rêves 🌙",
        message: "Tes anciens rêves peuvent t'éclairer sur tes vrais désirs profonds.",
        action: "Revisite un rêve d'enfance et ce qu'il représentait",
        quote: "Les rêves sont les murmures de notre vraie nature."
      },
      {
        day: 8,
        title: "Expérimenter avec curiosité 🔬",
        message: "La confusion s'évapore dans l'action. Testons de nouvelles expériences.",
        action: "Essayer quelque chose de nouveau, même tout petit",
        quote: "L'action apporte la clarté que la réflexion ne peut donner."
      },
      {
        day: 9,
        title: "Faire confiance au processus ⏳",
        message: "Ton chemin se révèle en marchant. Fais confiance à ton processus unique.",
        action: "Écrire 3 choses qui se sont éclaircies depuis le début",
        quote: "La vie n'est pas un problème à résoudre mais un mystère à vivre."
      },
      {
        day: 10,
        title: "Ta nouvelle boussole 🧭",
        message: "Tu as maintenant des outils pour naviguer dans l'incertitude avec grâce.",
        action: "Créer ton guide personnel pour les moments de confusion",
        quote: "La clarté vient non pas de réponses mais de meilleures questions."
      }
    ]
  },
  "Solitude / déconnexion": {
    emoji: "🫂",
    color: "from-gray-200 to-blue-200",
    days: [
      {
        day: 1,
        title: "Tu n'es pas seul/e 🫂",
        message: "Ta solitude est réelle et douloureuse. Mais tu n'es pas seul/e dans cette épreuve.",
        action: "Reconnaître que ta solitude est valide et partagée",
        quote: "La solitude partagée devient connexion."
      },
      {
        day: 2,
        title: "Compagnie avec toi-même 🪞",
        message: "Apprendre à être bien seul/e avec toi-même est le plus beau des cadeaux.",
        action: "Passer 20 minutes en ta propre compagnie sans distraction",
        quote: "Celui qui est bien avec lui-même n'est jamais seul."
      },
      {
        day: 3,
        title: "Ouvrir ton cœur 💌",
        message: "L'isolement se brise quand on ose montrer sa vulnérabilité authentique.",
        action: "Partager un sentiment vrai avec quelqu'un aujourd'hui",
        quote: "La vulnérabilité est le berceau de la connexion."
      },
      {
        day: 4,
        title: "Petits gestes de connexion 🌉",
        message: "Les grandes amitiés naissent souvent de petits gestes sincères.",
        action: "Faire un petit geste vers quelqu'un (message, sourire, aide)",
        quote: "Un sourire sincère peut construire un pont entre deux solitudes."
      },
      {
        day: 5,
 title: "Écouter vraiment 👂",
        message: "Être présent/e pour les autres crée naturellement de la réciprocité.",
        action: "Écouter vraiment quelqu'un aujourd'hui, sans penser à ta réponse",
        quote: "L'écoute est le plus beau cadeau qu'on puisse offrir."
      },
      {
        day: 6,
        title: "Sortir de ta zone de confort 🚪",
        message: "Les connexions authentiques demandent parfois de prendre des risques sociaux.",
        action: "Faire un pas vers quelqu'un qui t'intrigue ou t'inspire",
        quote: "Les plus belles rencontres commencent par un pas vers l'inconnu."
      },
      {
        day: 7,
        title: "Créer des rituels de connexion 🕯️",
        message: "Les relations se nourrissent de moments réguliers partagés.",
        action: "Planifier un moment régulier avec quelqu'un qui compte",
        quote: "L'amitié se cultive dans la régularité des petits moments."
      },
      {
        day: 8,
        title: "Pardonner et réparer 🛠️",
        message: "Parfois, la solitude vient de liens brisés qu'on peut réparer.",
        action: "Tendre la main vers quelqu'un avec qui tu as eu une difficulté",
        quote: "Le pardon ouvre les portes que l'orgueil a fermées."
      },
      {
        day: 9,
        title: "Cultiver la gratitude relationnelle 🌺",
        message: "Reconnaître l'amour qui t'entoure, même discret, nourrit les liens.",
        action: "Remercier 3 personnes pour leur présence dans ta vie",
        quote: "La gratitude transforme ce qu'on a en assez."
      },
      {
        day: 10,
        title: "Ton cercle de connexion 🔗",
        message: "Tu as maintenant les clés pour créer et nourrir des connexions authentiques.",
        action: "Dessiner ton cercle relationnel et planifier comment le nourrir",
        quote: "Nous sommes tous connectés par des fils invisibles d'amour et d'humanité."
      }
    ]
  },
  "Trauma / événement marquant": {
    emoji: "🛡️",
    color: "from-red-200 to-orange-200",
    days: [
      {
        day: 1,
        title: "Tu as survécu 🛡️",
        message: "Ce qui t'est arrivé était difficile, mais tu es là. Ta survie est déjà une victoire.",
        action: "Reconnaître ta force d'avoir survécu jusqu'ici",
        quote: "Tu es plus brave que tu ne le crois et plus fort que tu ne le parais."
      },
      {
        day: 2,
        title: "Sécurité dans l'instant présent 🏠",
        message: "Le trauma vit dans le passé. Ancrons-nous dans la sécurité du moment présent.",
        action: "Pratiquer la technique d'ancrage 5-4-3-2-1",
        quote: "Tu es en sécurité maintenant, dans cet instant précis."
      },
      {
        day: 3,
        title: "Honorer ta douleur 💧",
        message: "Ta douleur mérite d'être reconnue et honorée, sans jugement.",
        action: "Permettre à tes émotions d'exister sans les combattre",
        quote: "La douleur honorée peut devenir sagesse."
      },
      {
        day: 4,
        title: "Reprendre le contrôle 🎛️",
        message: "Tu peux choisir comment réagir maintenant. Tu as repris le pouvoir sur ta vie.",
        action: "Identifier 3 choses sur lesquelles tu as le contrôle aujourd'hui",
        quote: "Le pouvoir de choisir ta réponse ne peut t'être retiré."
      },
      {
        day: 5,
        title: "Créer de nouveaux souvenirs 📸",
        message: "Les nouveaux souvenirs positifs peuvent coexister avec les anciens.",
        action: "Créer consciemment un petit moment de joie aujourd'hui",
        quote: "Tu peux créer de nouveaux chapitres dans l'histoire de ta vie."
      },
      {
        day: 6,
        title: "Ton réseau de soutien 🌐",
        message: "Tu n'as pas à porter ce fardeau seul/e. Identifions tes ressources.",
        action: "Lister 3 personnes ou ressources qui peuvent t'aider",
        quote: "Demander de l'aide est un signe de courage, pas de faiblesse."
      },
      {
        day: 7,
        title: "Rituels de protection 🔮",
        message: "Créons ensemble des rituels qui te font te sentir fort/e et protégé/e.",
        action: "Développer un rituel personnel qui te donne de la force",
        quote: "Tu as le pouvoir de créer ta propre magie protectrice."
      },
      {
        day: 8,
        title: "Transformer la douleur 🦋",
        message: "Ta douleur peut devenir ta plus grande source de compassion et de force.",
        action: "Réfléchir à comment ton expérience pourrait aider d'autres",
        quote: "Nos blessures peuvent devenir nos plus grandes forces."
      },
      {
        day: 9,
        title: "Célébrer ta résilience 🌟",
        message: "Tu es la preuve vivante que l'être humain peut surmonter l'impensable.",
        action: "Célébrer 3 signes de ta résilience extraordinaire",
        quote: "Ta résilience est un témoignage de la beauté de l'esprit humain."
      },
      {
        day: 10,
        title: "Nouveau chapitre 📖",
        message: "Tu écris maintenant un nouveau chapitre, celui de ta renaissance après la tempête.",
        action: "Écrire une lettre d'espoir à ton futur toi",
        quote: "Tu n'es pas défini par ce qui t'est arrivé, mais par comment tu choisis de continuer."
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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${journey.color} mb-4`}>
          <span className="text-2xl">{journey.emoji}</span>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            {profile}
          </h2>
        </div>
        <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
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
            className={`min-w-[48px] h-12 rounded-full ${
              currentDay === day
                ? `bg-gradient-to-r ${journey.color} text-gray-800`
                : isLocked(day)
                ? 'opacity-50 cursor-not-allowed'
                : 'border-2 border-purple-200 hover:border-purple-300'
            }`}
          >
            {isLocked(day) ? <Lock className="w-4 h-4" /> : day}
          </Button>
        ))}
      </div>

      {isLocked(currentDay) ? (
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-pink-50 shadow-lg">
          <CardContent className="p-8 text-center">
            <Lock className="w-16 h-16 mx-auto mb-4 text-orange-400" />
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Tu veux continuer à prendre soin de toi ? 💜
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Active ton espace personnel illimité pour accéder aux 7 jours suivants de ton parcours émotionnel.
            </p>
            <div className="space-y-3">
              <Badge className="bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-800 text-lg px-4 py-2">
                3,99€/mois ou 0,99€/semaine
              </Badge>
              <div>
                <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-2xl">
                  💎 Activer Soutien+
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className={`border-0 bg-gradient-to-br ${journey.color} shadow-lg`}>
          <CardHeader>
            <CardTitle className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-lg font-bold text-gray-800">Jour {dayContent.day}</span>
              </div>
              <h3 className="text-xl text-gray-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                {dayContent.title}
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {dayContent.message}
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-800">
                <Heart className="w-4 h-4 text-red-500" />
                Action douce du jour
              </h4>
              <p className="text-gray-700" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {dayContent.action}
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-800">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                Citation inspirante
              </h4>
              <blockquote className="text-gray-700 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
                "{dayContent.quote}"
              </blockquote>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-green-300 to-blue-300 hover:from-green-400 hover:to-blue-400 text-gray-800 py-3 rounded-2xl border-0 shadow-lg"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              🌸 Je reviens demain
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmotionalJourney;
