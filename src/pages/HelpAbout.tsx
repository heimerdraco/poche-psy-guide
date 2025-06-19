
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Heart, Shield, HelpCircle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpAbout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50 p-4">
      <div className="container mx-auto max-w-2xl pb-20">
        <header className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">ℹ️ Aide & À propos</h1>
        </header>

        <div className="space-y-6">
          {/* About section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600" />
                À propos de Psy de Poche
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                <strong>Psy de Poche</strong> est une application d'accompagnement émotionnel personnalisé. 
                Elle propose un espace bienveillant pour prendre soin de tes émotions à travers des parcours 
                adaptés à ton profil.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">Notre mission :</h4>
                <p className="text-sm text-gray-700">
                  Rendre le bien-être émotionnel accessible à tous, avec des outils simples et bienveillants 
                  pour t'accompagner dans tes moments difficiles.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                Questions fréquentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Pourquoi l'app est-elle payante ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    L'abonnement nous permet de maintenir les services, d'améliorer constamment l'expérience 
                    et de créer de nouveaux contenus. Cela garantit aussi que tes données restent sécurisées 
                    et que l'app reste sans publicité.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Que fait l'app de mes données ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Tes données sont anonymisées et stockées de manière sécurisée sur Supabase. 
                    Elles ne sont jamais partagées avec des tiers et sont utilisées uniquement pour 
                    personnaliser ton expérience. Tu peux demander leur suppression à tout moment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Puis-je utiliser l'app sans compte ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Oui ! L'app fonctionne entièrement sans inscription. Tes données sont stockées 
                    localement et de manière anonyme. Aucune information personnelle n'est requise.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Comment annuler mon abonnement ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Tu peux annuler ton abonnement à tout moment depuis les paramètres de ton compte 
                    App Store ou Google Play. L'annulation prend effet à la fin de la période déjà payée.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    L'app remplace-t-elle un vrai psychologue ?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Non, Psy de Poche est un outil de bien-être et d'accompagnement personnel. 
                    En cas de détresse importante ou de troubles sérieux, nous encourageons 
                    vivement à consulter un professionnel de la santé mentale.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Links section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Informations légales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => window.open('#', '_blank')}
              >
                Politique de confidentialité
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => window.open('#', '_blank')}
              >
                Conditions d'utilisation
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => window.open('mailto:support@psydepoche.app')}
              >
                Nous contacter
                <ExternalLink className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Version info */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Psy de Poche v1.0.0 • Fait avec 💜 pour ton bien-être
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAbout;
