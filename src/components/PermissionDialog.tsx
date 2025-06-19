
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Camera, Mic, Image, Shield } from "lucide-react";
import { PermissionDialogProps } from "@/hooks/usePermissions";

const PermissionDialog = ({ isOpen, type, onAccept, onDecline }: PermissionDialogProps) => {
  const getPermissionContent = () => {
    switch (type) {
      case 'camera':
        return {
          icon: <Camera className="w-8 h-8 text-purple-500" />,
          title: "Accès à l'appareil photo",
          description: "Arboria a besoin d'accéder à votre appareil photo pour réaliser cette activité avec vous. Aucune donnée n'est partagée ni stockée sans votre consentement.",
          permissions: ["android.permission.CAMERA"]
        };
      case 'microphone':
        return {
          icon: <Mic className="w-8 h-8 text-purple-500" />,
          title: "Accès au microphone",
          description: "Arboria utilise votre micro uniquement pour cette activité. Aucun enregistrement n'est stocké, partagé ou analysé.",
          permissions: ["android.permission.RECORD_AUDIO"]
        };
      case 'storage':
        return {
          icon: <Image className="w-8 h-8 text-purple-500" />,
          title: "Accès à la galerie",
          description: "Arboria a besoin d'accéder à votre galerie pour importer une image. Aucune donnée n'est partagée ni stockée sans votre consentement.",
          permissions: ["android.permission.READ_EXTERNAL_STORAGE"]
        };
      default:
        return {
          icon: <Shield className="w-8 h-8 text-purple-500" />,
          title: "Permission requise",
          description: "Une permission est nécessaire pour cette activité.",
          permissions: []
        };
    }
  };

  const content = getPermissionContent();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            {content.icon}
          </div>
          <AlertDialogTitle className="text-lg font-semibold">
            {content.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600 leading-relaxed">
            {content.description}
          </AlertDialogDescription>
          
          {content.permissions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-xs font-medium text-blue-800 mb-1">Permissions requises :</p>
              {content.permissions.map((permission, index) => (
                <p key={index} className="text-xs text-blue-700 font-mono">
                  {permission}
                </p>
              ))}
            </div>
          )}
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
          <AlertDialogCancel 
            onClick={onDecline}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Refuser
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onAccept}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Autoriser
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PermissionDialog;
