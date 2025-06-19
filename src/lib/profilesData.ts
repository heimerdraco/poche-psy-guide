
export interface EmotionalProfile {
  id: string;
  name: string;
  description: string;
  causes: string;
  objectives: string;
  color: string;
}

export const getProfileData = (profileId: string): EmotionalProfile => {
  const profiles: Record<string, EmotionalProfile> = {
    'anxieux': {
      id: 'anxieux',
      name: 'L\'Anxieux',
      description: 'Vit dans l\'anticipation négative, sujet au stress chronique',
      causes: 'Environnement professionnel toxique, charge mentale',
      objectives: 'Réduire les pensées parasites, recréer un sentiment de sécurité',
      color: 'from-orange-400 to-red-400'
    },
    'fatigue': {
      id: 'fatigue',
      name: 'Le Fatigué',
      description: 'Épuisé émotionnellement et physiquement, perte de motivation',
      causes: 'Burnout, surcharge familiale',
      objectives: 'Rétablir l\'énergie, retrouver un équilibre corps-esprit',
      color: 'from-gray-400 to-blue-400'
    },
    'deracine': {
      id: 'deracine',
      name: 'Le Déraciné',
      description: 'Perte de repères, isolement émotionnel',
      causes: 'Ruptures, déménagements, deuil',
      objectives: 'Reconstruire son socle, recréer du lien',
      color: 'from-green-400 to-teal-400'
    },
    'controlant': {
      id: 'controlant',
      name: 'Le Contrôlant',
      description: 'Besoin de tout maîtriser, difficulté à lâcher prise',
      causes: 'Traumatismes, peur de l\'échec',
      objectives: 'Réapprendre à faire confiance, pratiquer le lâcher-prise',
      color: 'from-purple-400 to-indigo-400'
    },
    'hypersensible': {
      id: 'hypersensible',
      name: 'L\'Hypersensible',
      description: 'Vécu émotionnel intense, difficultés à poser des limites',
      causes: 'Surstimulation, vécu d\'injustice',
      objectives: 'Apaiser les émotions, renforcer les barrières psychologiques',
      color: 'from-pink-400 to-rose-400'
    },
    'refoule': {
      id: 'refoule',
      name: 'Le Refoulé',
      description: 'Difficulté à exprimer ses ressentis, émotions mises de côté',
      causes: 'Éducation rigide, traumatismes enfouis',
      objectives: 'Favoriser l\'expression, débloquer la parole intérieure',
      color: 'from-indigo-400 to-blue-400'
    },
    'volcan': {
      id: 'volcan',
      name: 'Le Volcan',
      description: 'Accumule les émotions, jusqu\'à l\'explosion (colère, crises)',
      causes: 'Frustrations, pressions sociales',
      objectives: 'Canaliser l\'émotion, comprendre ses déclencheurs',
      color: 'from-red-400 to-orange-400'
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
