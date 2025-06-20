
// Système de sons légers pour les validations
export const playValidationSound = () => {
  // Son très doux de validation - uniquement si l'utilisateur n'a pas désactivé les sons
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Son doux de validation (fréquences harmonieuses)
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Fréquences douces pour un son apaisant
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
  oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
  oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol
  
  oscillator.type = 'sine';
  
  // Volume très doux
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

export const playCompletionChime = () => {
  try {
    // Vérifier si les sons sont autorisés
    const soundsEnabled = localStorage.getItem('arboria_sounds_enabled') !== 'false';
    if (!soundsEnabled) return;
    
    playValidationSound();
  } catch (error) {
    // Silencieux en cas d'erreur - pas de bruit parasite
    console.log('Son non disponible');
  }
};
