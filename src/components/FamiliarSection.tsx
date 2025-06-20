
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
        {/* Section familier avec arbre stylisé */}
        <div className="relative">
          {/* Arbre décoratif en arrière-plan */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-8xl text-forest-600">🌳</div>
          </div>
          
          {/* Contenu principal */}
          <div className="relative z-10 flex flex-col items-center space-y-4">
            {/* Titre de section */}
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold text-forest-800 mb-1" style={{ fontFamily: 'Comfortaa, cursive' }}>
                Votre compagnon spirituel
              </h3>
              <p className="text-sm text-forest-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {profileData.name} • Votre guide dans ce parcours
              </p>
            </div>

            {/* Le familier animé au centre */}
            <div className="flex justify-center py-4">
              <AnimatedFamiliar profile={profile} />
            </div>

            {/* Description du profil avec le familier */}
            <div className="text-center max-w-sm">
              <p className="text-sm text-forest-700 leading-relaxed italic" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {profileData.description}
              </p>
            </div>

            {/* Encouragement personnalisé */}
            <div className="bg-gradient-to-r from-sage-100/50 to-forest-100/50 rounded-xl p-3 text-center border border-sage-200/50">
              <p className="text-xs text-forest-600 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                💫 Cliquez sur votre compagnon pour recevoir des encouragements personnalisés
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamiliarSection;
