
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  type: 'leaf' | 'petal' | 'bubble' | 'sparkle' | 'branch';
}

const AnimatedNatureBackground = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      const types: ('leaf' | 'petal' | 'bubble' | 'sparkle' | 'branch')[] = ['leaf', 'petal', 'bubble', 'sparkle', 'branch'];
      
      // Augmented number of elements for a more lively effect
      for (let i = 0; i < 35; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 25 + 8,
          speed: Math.random() * 25 + 10,
          delay: Math.random() * 8,
          type: types[Math.floor(Math.random() * types.length)]
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  const getElementEmoji = (type: string) => {
    switch (type) {
      case 'leaf': return '🍃';
      case 'petal': return '🌸';
      case 'bubble': return '💫';
      case 'sparkle': return '✨';
      case 'branch': return '🌿';
      default: return '🍃';
    }
  };

  const getElementOpacity = (type: string) => {
    switch (type) {
      case 'sparkle': return 'opacity-30';
      case 'bubble': return 'opacity-25';
      case 'petal': return 'opacity-20';
      case 'leaf': return 'opacity-15';
      case 'branch': return 'opacity-10';
      default: return 'opacity-15';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Enhanced breathing background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-cream-25/40 to-forest-50/50 animate-breathe" 
           style={{ animationDuration: '6s' }} />
      
      {/* Multiple texture overlays for depth */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-transparent via-sage-200/30 to-transparent animate-fade-in-out" />
      <div className="absolute inset-0 opacity-3 bg-gradient-to-tl from-forest-100/20 via-transparent to-cream-100/20 animate-fade-in-out" 
           style={{ animationDelay: '3s' }} />
      
      {/* Enhanced floating nature elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute animate-float-slow ${getElementOpacity(element.type)} hover:opacity-60 transition-opacity duration-2000`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            animationDuration: `${element.speed}s`,
            animationDelay: `${element.delay}s`,
            filter: element.type === 'sparkle' ? 'blur(0.3px)' : 'blur(0.5px)'
          }}
        >
          {getElementEmoji(element.type)}
        </div>
      ))}
      
      {/* Enhanced growing roots animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
        <svg className="w-full h-full animate-fade-in" viewBox="0 0 1200 200">
          <path
            d="M0,200 Q150,140 300,150 T600,130 T900,140 T1200,150 L1200,200 Z"
            fill="url(#rootGradient)"
            className="animate-wave"
            style={{ animationDuration: '8s' }}
          />
          <path
            d="M0,200 Q200,160 400,170 T800,150 T1200,165 L1200,200 Z"
            fill="url(#rootGradient2)"
            className="animate-wave"
            style={{ animationDuration: '12s', animationDelay: '2s' }}
          />
          <defs>
            <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(34, 139, 34)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="rgb(22, 101, 52)" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="rootGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(46, 125, 50)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="rgb(27, 94, 32)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Additional gentle particles for ambiance */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-sage-300/20 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedNatureBackground;
