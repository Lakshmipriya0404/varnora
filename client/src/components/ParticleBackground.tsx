import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { random, clamp } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulse: boolean;
  connectionRadius: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [count, setCount] = useState(80); // Increased number of particles
  const [isInteractive, setIsInteractive] = useState(true);
  
  // Colors for particles
  const particleColors = isDark 
    ? [
        "rgba(0, 255, 255, alpha)", // cyan
        "rgba(157, 0, 255, alpha)", // purple
        "rgba(255, 255, 255, alpha)", // white
        "rgba(0, 150, 255, alpha)", // blue
      ]
    : [
        "rgba(0, 210, 255, alpha)", // lighter cyan
        "rgba(157, 0, 255, alpha)", // purple
        "rgba(50, 50, 80, alpha)", // dark blue
        "rgba(0, 90, 210, alpha)", // blue
      ];
  
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas to full size
    const updateCanvasSize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Reinitialize particles when size changes
      if (particlesRef.current.length === 0 || particlesRef.current[0].x > width || particlesRef.current[0].y > height) {
        initializeParticles(width, height);
      }
    };
    
    updateCanvasSize();
    
    // Initialize particles with the proper size
    function initializeParticles(width: number, height: number) {
      particlesRef.current = Array.from({ length: count }, () => {
        const size = random(1, 5);
        const colorIndex = Math.floor(random(0, particleColors.length));
        const opacity = random(0.1, 0.6);
        const color = particleColors[colorIndex].replace('alpha', opacity.toString());
        
        return {
          x: random(0, width),
          y: random(0, height),
          size,
          speedX: random(-0.5, 0.5),
          speedY: random(-0.5, 0.5),
          opacity,
          color,
          pulse: Math.random() > 0.7, // Some particles will pulse
          connectionRadius: random(80, 150) // Distance for drawing connections
        };
      });
    }
    
    // Handle mouse movement for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mousePosition.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', updateCanvasSize);
    
    // Animation loop
    const animate = (time: number) => {
      if (!ctx) return;
      
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      const deltaTime = time - previousTimeRef.current;
      previousTimeRef.current = time;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounds checking
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        
        // Interactive effect: particles attracted to mouse position
        if (isInteractive) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = clamp((150 - distance) / 1500, 0, 0.5);
            particle.speedX += dx * force;
            particle.speedY += dy * force;
            
            // Limit maximum speed
            particle.speedX = clamp(particle.speedX, -2, 2);
            particle.speedY = clamp(particle.speedY, -2, 2);
          }
        }
        
        // Apply a very small friction/damping effect to gradually slow particles
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Calculate real-time opacity for pulsing particles
        let drawOpacity = particle.opacity;
        if (particle.pulse) {
          // Create a pulsing effect
          drawOpacity = particle.opacity * (0.6 + 0.4 * Math.sin(time * 0.001 + i));
        }
        
        // Draw the particle
        ctx.fillStyle = particle.color.replace('alpha', drawOpacity.toString());
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections between nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < particle.connectionRadius) {
            // Connection opacity based on distance
            const opacity = (1 - distance / particle.connectionRadius) * 0.3;
            // Different connection color based on theme
            const connectionColor = isDark ? '255, 255, 255' : '50, 50, 80';
            ctx.strokeStyle = `rgba(${connectionColor}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize particles
    initializeParticles(canvas.width, canvas.height);
    
    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [count, isInteractive, theme]);
  
  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-radial pointer-events-none ${
        isDark 
          ? 'from-transparent via-deep-space/30 to-deep-space/80' 
          : 'from-transparent via-gray-100/30 to-gray-200/80'
      }`}></div>
      
      {/* Canvas for particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </motion.div>
  );
}
