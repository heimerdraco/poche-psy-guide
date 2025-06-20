
import { Card, CardContent } from "@/components/ui/card";
import AnimatedFamiliar from "./AnimatedFamiliar";
import { getProfileData } from "@/lib/profilesData";

interface FamiliarSectionProps {
  profile: string;
}

const FamiliarSection = ({ profile }: FamiliarSectionProps) => {
  const profileData = getProfileData(profile);

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-sage-50/90 to-forest-50/90 backdrop-blur-sm border border-sage-200 overflow-hidden">
      <CardContent className="p-6">
        {/* Section familier simplifiée */}
        <div className="relative">
          {/* Arbre décoratif en arrière-plan */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-8xl text-forest-600">🌳</div>
          </div>
          
          {/* Contenu principal - Simplifié */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            {/* Titre de section plus concis */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-forest-800 mb-2" style={{ fontFamily: 'Comfortaa, cursive' }}>
                {profileData.name}
              </h3>
              <p className="text-sm text-forest-600 italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Votre compagnon de voyage
              </p>
            </div>

            {/* Le familier animé au centre - Plus d'espace */}
            <div className="flex justify-center py-6">
              <AnimatedFamiliar profile={profile} />
            </div>

            {/* Encouragement personnalisé simplifié */}
            <div className="bg-gradient-to-r from-sage-100/50 to-forest-100/50 rounded-xl p-4 text-center border border-sage-200/50 max-w-xs">
              <p className="text-sm text-forest-600 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                💫 Cliquez sur {profileData.name === 'Le Sensible Silencieux' ? 'Cendre' : 
                                profileData.name === 'Le Cœur Fatigué' ? 'Moka' :
                                profileData.name === 'Le Cœur Déraciné' ? 'Lume' :
                                profileData.name === 'Le Cœur Contrôlant' ? 'Nox' :
                                profileData.name === 'Le Cœur Hypersensible' ? 'Élior' :
                                profileData.name === 'Le Cœur Volcanique' ? 'Tiko' : 'Brume'} pour des encouragements
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamiliarSection;
