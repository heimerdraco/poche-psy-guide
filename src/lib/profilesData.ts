
export interface EmotionalProfile {
  id: string;
  name: string;
  description: string;
  causes: string;
  objectives: string;
  color: string;
  explanation?: string;
}

export const getProfileData = (profileId: string): EmotionalProfile => {
  const profiles: Record<string, EmotionalProfile> = {
    'anxieux': {
      id: 'anxieux',
      name: 'L\'Anxieux',
      description: 'Vit dans l\'anticipation négative, sujet au stress chronique',
      causes: 'Environnement professionnel toxique, charge mentale',
      objectives: 'Réduire les pensées parasites, recréer un sentiment de sécurité',
      color: 'from-orange-400 to-red-400',
      explanation: 'Votre profil révèle une tendance à anticiper le négatif. Ensemble, nous allons apprendre à calmer votre esprit.'
    },
    'fatigue': {
      id: 'fatigue',
      name: 'Le Fatigué',
      description: 'Épuisé émotionnellement et physiquement, perte de motivation',
      causes: 'Burnout, surcharge familiale',
      objectives: 'Rétablir l\'énergie, retrouver un équilibre corps-esprit',
      color: 'from-gray-400 to-blue-400',
      explanation: 'Votre énergie est au plus bas. Nous allons vous aider à retrouver votre vitalité pas à pas.'
    },
    'deracine': {
      id: 'deracine',
      name: 'Le Déraciné',
      description: 'Perte de repères, isolement émotionnel',
      causes: 'Ruptures, déménagements, deuil',
      objectives: 'Reconstruire son socle, recréer du lien',
      color: 'from-green-400 to-teal-400',
      explanation: 'Vous traversez une période de transition. Nous allons vous accompagner pour retrouver vos repères.'
    },
    'controlant': {
      id: 'controlant',
      name: 'Le Contrôlant',
      description: 'Besoin de tout maîtriser, difficulté à lâcher prise',
      causes: 'Traumatismes, peur de l\'échec',
      objectives: 'Réapprendre à faire confiance, pratiquer le lâcher-prise',
      color: 'from-purple-400 to-indigo-400',
      explanation: 'Votre besoin de contrôle vous protège mais vous épuise. Apprenons ensemble à lâcher prise.'
    },
    'hypersensible': {
      id: 'hypersensible',
      name: 'L\'Hypersensible',
      description: 'Vécu émotionnel intense, difficultés à poser des limites',
      causes: 'Surstimulation, vécu d\'injustice',
      objectives: 'Apaiser les émotions, renforcer les barrières psychologiques',
      color: 'from-pink-400 to-rose-400',
      explanation: 'Votre sensibilité est un don précieux. Nous allons apprendre à la protéger et la canaliser.'
    },
    'refoule': {
      id: 'refoule',
      name: 'Le Refoulé',
      description: 'Difficulté à exprimer ses ressentis, émotions mises de côté',
      causes: 'Éducation rigide, traumatismes enfouis',
      objectives: 'Favoriser l\'expression, débloquer la parole intérieure',
      color: 'from-indigo-400 to-blue-400',
      explanation: 'Vos émotions cherchent à s\'exprimer. Nous allons créer un espace sécurisé pour qu\'elles puissent se libérer.'
    },
    'volcan': {
      id: 'volcan',
      name: 'Le Volcan',
      description: 'Accumule les émotions, jusqu\'à l\'explosion (colère, crises)',
      causes: 'Frustrations, pressions sociales',
      objectives: 'Canaliser l\'émotion, comprendre ses déclencheurs',
      color: 'from-red-400 to-orange-400',
      explanation: 'Vos émotions s\'accumulent comme la lave. Apprenons à les exprimer avant qu\'elles n\'explosent.'
    }
  };

  return profiles[profileId] || profiles['anxieux'];
};

export const getAllProfiles = (): EmotionalProfile[] => {
  return [
    'anxieux', 'fatigue', 'deracine', 'controlant', 
    'hypersensible', 'refoule', 'volcan'
  ].map(id => getProfileData(id));
};
