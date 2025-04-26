import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { random } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  
  const COUNT = 50; // Number of particles
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Initialize particles
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: random(0, width),
      y: random(0, height),
      size: random(2, 6),
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5),
      opacity: random(0.1, 0.6)
    }));
    
    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      const deltaTime = time - previousTimeRef.current;
      previousTimeRef.current = time;
      
      // Update particle positions
      particlesRef.current = particlesRef.current.map(particle => {
        let { x, y, speedX, speedY } = particle;
        
        // Update position
        x += speedX;
        y += speedY;
        
        // Bounds checking
        if (x < 0) {
          x = width;
        } else if (x > width) {
          x = 0;
        }
        
        if (y < 0) {
          y = height;
        } else if (y > height) {
          y = 0;
        }
        
        return { ...particle, x, y };
      });
      
      // Force re-render for updated particle positions
      container.style.opacity = '0.999';
      setTimeout(() => {
        container.style.opacity = '1';
      }, 0);
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    const handleResize = () => {
      // Update container dimensions on resize
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      
      // Reposition particles within new bounds
      particlesRef.current = particlesRef.current.map(particle => ({
        ...particle,
        x: (particle.x / width) * newWidth,
        y: (particle.y / height) * newHeight
      }));
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {particlesRef.current.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, random(-20, 20), 0],
            y: [0, random(-20, 20), 0],
          }}
          transition={{
            duration: random(3, 8),
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </motion.div>
  );
}
