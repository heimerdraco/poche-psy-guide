
import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  phase?: 'calm' | 'hopeful' | 'warm';
  intensity?: 'subtle' | 'medium' | 'active';
}

const AnimatedBackground = ({ phase = 'calm', intensity = 'subtle' }: AnimatedBackgroundProps) => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const particleCount = intensity === 'subtle' ? 15 : intensity === 'medium' ? 25 : 35;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 10
    }));
    setParticles(newParticles);
  }, [intensity]);

  const getPhaseGradient = () => {
    switch (phase) {
      case 'calm':
        return 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0f9ff 100%)';
      case 'hopeful':
        return 'linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 50%, #fef3c7 100%)';
      case 'warm':
        return 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)';
      default:
        return 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #fdf2f8 100%)';
    }
  };

  const getParticleColor = () => {
    switch (phase) {
      case 'calm':
        return 'bg-blue-200/20';
      case 'hopeful':
        return 'bg-green-200/20';
      case 'warm':
        return 'bg-yellow-200/20';
      default:
        return 'bg-purple-200/20';
    }
  };

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden transition-all duration-1000"
      style={{ background: getPhaseGradient() }}
    >
      {/* Particules flottantes */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${getParticleColor()} animate-float-slow`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}

      {/* Effet de brume douce */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-white/40 to-transparent animate-fade-in-out" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-white/30 to-transparent animate-fade-in-out" style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
};

export default AnimatedBackground;
