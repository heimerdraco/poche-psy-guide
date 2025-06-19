
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface EnhancedButtonProps extends ButtonProps {
  soundType?: 'click' | 'success' | 'calm';
  animationType?: 'bounce' | 'scale' | 'glow';
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ onClick, soundType = 'click', animationType = 'bounce', className = '', children, ...props }, ref) => {
    const { playClick, playSuccess, playCalm } = useSoundEffects();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Jouer le son approprié
      switch (soundType) {
        case 'click':
          playClick();
          break;
        case 'success':
          playSuccess();
          break;
        case 'calm':
          playCalm();
          break;
      }

      // Appeler le onClick original s'il existe
      if (onClick) {
        onClick(event);
      }
    };

    const getAnimationClasses = () => {
      switch (animationType) {
        case 'bounce':
          return 'hover:animate-bounce-gentle active:scale-95';
        case 'scale':
          return 'hover:scale-105 active:scale-95';
        case 'glow':
          return 'hover:shadow-lg hover:shadow-purple-200/50';
        default:
          return 'hover:scale-105 active:scale-95';
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        className={`transition-all duration-200 ${getAnimationClasses()} ${className}`}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

export default EnhancedButton;
