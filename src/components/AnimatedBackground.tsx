
import React from 'react';
import { Monitor, Laptop, Smartphone, Server, Cpu, HardDrive } from 'lucide-react';

const AnimatedBackground: React.FC = () => {
  const computerIcons = [Monitor, Laptop, Smartphone, Server, Cpu, HardDrive];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Computer Icons */}
      {Array.from({ length: 12 }).map((_, index) => {
        const Icon = computerIcons[index % computerIcons.length];
        const delay = index * 0.5;
        const duration = 15 + (index % 5);
        
        return (
          <div
            key={index}
            className="absolute opacity-20 computer-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          >
            <Icon 
              className="w-8 h-8 text-elegant-primary computer-pulse" 
            />
          </div>
        );
      })}
      
      {/* Data Flow Lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`line-${index}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-elegant-primary to-transparent opacity-30"
            style={{
              top: `${20 + index * 15}%`,
              width: '100%',
              animationDelay: `${index * 1.2}s`
            }}
          >
            <div 
              className="h-full w-20 bg-elegant-accent data-stream"
              style={{
                animationDelay: `${index * 0.8}s`
              }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`particle-${index}`}
            className="absolute w-2 h-2 bg-elegant-accent rounded-full particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.3}s`,
              animationDuration: `${8 + (index % 4)}s`
            }}
          />
        ))}
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-elegant-primary/5 via-transparent to-elegant-secondary/5"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-elegant-accent/5 via-transparent to-transparent"></div>
    </div>
  );
};

export default AnimatedBackground;
