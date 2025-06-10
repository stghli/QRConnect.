
import React from 'react';
import { Monitor, Laptop, Smartphone, Server, Cpu, HardDrive } from 'lucide-react';

const AnimatedBackground: React.FC = () => {
  const computerIcons = [Monitor, Laptop, Smartphone, Server, Cpu, HardDrive];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Computer Icons - More visible and larger */}
      {Array.from({ length: 18 }).map((_, index) => {
        const Icon = computerIcons[index % computerIcons.length];
        const delay = index * 0.3;
        const duration = 12 + (index % 6);
        const size = Math.random() > 0.5 ? 'w-12 h-12' : 'w-16 h-16';
        
        return (
          <div
            key={index}
            className="absolute opacity-40 computer-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          >
            <Icon 
              className={`${size} text-elegant-primary computer-pulse`}
            />
          </div>
        );
      })}
      
      {/* Data Flow Lines - More lines and brighter */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={`line-${index}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-elegant-primary to-transparent opacity-60"
            style={{
              top: `${10 + index * 9}%`,
              width: '100%',
              animationDelay: `${index * 0.8}s`
            }}
          >
            <div 
              className="h-full w-32 bg-elegant-accent data-stream opacity-80"
              style={{
                animationDelay: `${index * 0.5}s`
              }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* Floating Particles - More particles and brighter */}
      <div className="absolute inset-0">
        {Array.from({ length: 35 }).map((_, index) => {
          const size = Math.random() > 0.7 ? 'w-3 h-3' : 'w-2 h-2';
          const opacity = Math.random() > 0.5 ? 'opacity-60' : 'opacity-40';
          
          return (
            <div
              key={`particle-${index}`}
              className={`absolute ${size} bg-elegant-accent rounded-full particle-float ${opacity}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${index * 0.2}s`,
                animationDuration: `${6 + (index % 5)}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Moving Circuit Patterns */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`circuit-${index}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-elegant-secondary to-transparent opacity-30"
            style={{
              left: `${15 + index * 12}%`,
              height: '100%',
              animationDelay: `${index * 1.5}s`
            }}
          >
            <div 
              className="w-full h-24 bg-elegant-primary circuit-flow opacity-70"
              style={{
                animationDelay: `${index * 0.7}s`
              }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* Pulsing Network Nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`node-${index}`}
            className="absolute w-4 h-4 bg-elegant-primary rounded-full network-pulse opacity-50"
            style={{
              left: `${20 + (index % 4) * 20}%`,
              top: `${20 + Math.floor(index / 4) * 60}%`,
              animationDelay: `${index * 0.4}s`
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-elegant-primary/10 via-transparent to-elegant-secondary/10"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-elegant-accent/8 via-transparent to-elegant-primary/5"></div>
      <div className="absolute inset-0 bg-gradient-radial from-elegant-primary/5 via-transparent to-transparent"></div>
    </div>
  );
};

export default AnimatedBackground;
