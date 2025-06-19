
import { useCallback } from 'react';

interface SoundEffects {
  playClick: () => void;
  playSuccess: () => void;
  playCalm: () => void;
}

export const useSoundEffects = (): SoundEffects => {
  const playSound = useCallback((frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
    if (typeof window === 'undefined' || !window.AudioContext) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio non supporté:', error);
    }
  }, []);

  const playClick = useCallback(() => {
    playSound(800, 0.1, 'sine');
  }, [playSound]);

  const playSuccess = useCallback(() => {
    playSound(600, 0.2, 'triangle');
    setTimeout(() => playSound(800, 0.2, 'triangle'), 100);
  }, [playSound]);

  const playCalm = useCallback(() => {
    playSound(400, 0.3, 'sine');
  }, [playSound]);

  return { playClick, playSuccess, playCalm };
};
