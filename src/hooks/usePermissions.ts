
import { useState } from 'react';

export interface PermissionDialogProps {
  isOpen: boolean;
  type: 'camera' | 'microphone' | 'storage';
  onAccept: () => void;
  onDecline: () => void;
}

export const usePermissions = () => {
  const [permissionDialog, setPermissionDialog] = useState<PermissionDialogProps | null>(null);

  const requestCameraPermission = (onGranted: () => void) => {
    setPermissionDialog({
      isOpen: true,
      type: 'camera',
      onAccept: () => {
        setPermissionDialog(null);
        onGranted();
      },
      onDecline: () => {
        setPermissionDialog(null);
      }
    });
  };

  const requestMicrophonePermission = (onGranted: () => void) => {
    setPermissionDialog({
      isOpen: true,
      type: 'microphone',
      onAccept: () => {
        setPermissionDialog(null);
        onGranted();
      },
      onDecline: () => {
        setPermissionDialog(null);
      }
    });
  };

  const requestStoragePermission = (onGranted: () => void) => {
    setPermissionDialog({
      isOpen: true,
      type: 'storage',
      onAccept: () => {
        setPermissionDialog(null);
        onGranted();
      },
      onDecline: () => {
        setPermissionDialog(null);
      }
    });
  };

  const closePermissionDialog = () => {
    setPermissionDialog(null);
  };

  return {
    permissionDialog,
    requestCameraPermission,
    requestMicrophonePermission,
    requestStoragePermission,
    closePermissionDialog
  };
};
