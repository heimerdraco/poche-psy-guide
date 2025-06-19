
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  type: 'leaf' | 'petal' | 'bubble';
}

const AnimatedNatureBackground = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      const types: ('leaf' | 'petal' | 'bubble')[] = ['leaf', 'petal', 'bubble'];
      
      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          speed: Math.random() * 20 + 15,
          delay: Math.random() * 5,
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
      default: return '🍃';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Breathing background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-teal-25/30 to-sage-50/40 animate-pulse-gentle" 
           style={{ animationDuration: '4s' }} />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-transparent via-emerald-100/20 to-transparent animate-fade-in-out" />
      
      {/* Floating nature elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float-slow opacity-20 hover:opacity-40 transition-opacity duration-1000"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            animationDuration: `${element.speed}s`,
            animationDelay: `${element.delay}s`,
            filter: 'blur(0.5px)'
          }}
        >
          {getElementEmoji(element.type)}
        </div>
      ))}
      
      {/* Growing roots animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg className="w-full h-full animate-fade-in" viewBox="0 0 1200 200">
          <path
            d="M0,200 Q150,150 300,160 T600,140 T900,150 T1200,160 L1200,200 Z"
            fill="url(#rootGradient)"
            className="animate-pulse-gentle"
            style={{ animationDuration: '6s' }}
          />
          <defs>
            <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(52, 168, 83)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="rgb(22, 101, 52)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedNatureBackground;
