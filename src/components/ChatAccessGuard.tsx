
import { useState, useEffect } from "react";
import { getDeviceId } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import SubscriptionModal from "./SubscriptionModal";

interface ChatAccessGuardProps {
  children: React.ReactNode;
  profile: string;
}

const ChatAccessGuard = ({ children, profile }: ChatAccessGuardProps) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    checkChatAccess();
  }, [profile]);

  const checkChatAccess = async () => {
    try {
      const deviceId = getDeviceId();
      
      // Vérifier le statut de l'utilisateur
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('trial_start, profile')
        .eq('device_id', deviceId)
        .single();

      if (userError) {
        console.error('Erreur vérification utilisateur:', userError);
        setHasAccess(false);
        return;
      }

      if (!userData?.trial_start) {
        // Pas encore d'essai commencé, accès refusé
        setHasAccess(false);
        return;
      }

      const trialStartDate = new Date(userData.trial_start);
      const now = new Date();
      const daysSinceStart = Math.floor((now.getTime() - trialStartDate.getTime()) / (1000 * 60 * 60 * 24));

      // Accès autorisé si plus de 3 jours d'essai
      // TODO: Vérifier aussi le statut premium quand implémenté
      setHasAccess(daysSinceStart >= 3);
    } catch (error) {
      console.error('Erreur vérification accès chat:', error);
      setHasAccess(false);
    }
  };

  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-300 border-t-emerald-600 rounded-full"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Chat Thérapeutique Premium
              </h2>
              <p className="text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Cette fonctionnalité est réservée aux membres Premium.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Pourquoi Premium ?</h3>
                <ul className="text-sm text-purple-700 space-y-1 text-left">
                  <li>🛡️ Modération automatique avancée</li>
                  <li>👥 Communauté bienveillante et sécurisée</li>
                  <li>🔒 Anonymat total et respect de la vie privée</li>
                  <li>💝 Échanges authentiques entre pairs</li>
                </ul>
              </div>
              
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                ✨ Découvrir Premium
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm transition-colors"
              >
                ← Retour
              </button>
            </div>
          </div>
        </div>

        <SubscriptionModal 
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
        />
      </>
    );
  }

  return <>{children}</>;
};

export default ChatAccessGuard;
