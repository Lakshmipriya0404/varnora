
import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

const ContactGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    const nodes: { x: number; y: number; size: number; pulse: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Initialize nodes
    const initNodes = () => {
      for (let i = 0; i < 12; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 2,
          pulse: Math.random() * Math.PI
        });
      }
    };

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;
      
      // Mouse interaction effect
      const distX = mouseRef.current.x - centerX;
      const distY = mouseRef.current.y - centerY;
      const tiltX = distX * 0.0003;
      const tiltY = distY * 0.0003;

      // Grid lines with depth effect
      ctx.strokeStyle = isDark ? 'rgba(0, 255, 255, 0.3)' : 'rgba(157, 0, 255, 0.3)';
      ctx.lineWidth = 0.8;
      
      // Latitude lines with tilt
      for (let i = 0; i < 12; i++) {
        const latRadius = (radius / 12) * i;
        ctx.beginPath();
        ctx.ellipse(
          centerX + distX * 0.05,
          centerY + distY * 0.05,
          latRadius,
          latRadius * Math.abs(Math.cos(rotation + tiltY)),
          tiltX,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      
      // Longitude lines with dynamic rotation
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2 + rotation;
        ctx.beginPath();
        ctx.ellipse(
          centerX + distX * 0.05,
          centerY + distY * 0.05,
          radius,
          radius,
          angle + tiltX,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Draw interactive nodes
      nodes.forEach((node, i) => {
        const time = Date.now() * 0.001;
        const nodeX = centerX + Math.cos(time * 0.5 + i) * radius * 0.8;
        const nodeY = centerY + Math.sin(time * 0.5 + i) * radius * 0.5;
        
        // Node glow
        const gradient = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, node.size * 4);
        gradient.addColorStop(0, isDark ? 'rgba(0, 255, 255, 0.4)' : 'rgba(157, 0, 255, 0.4)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, node.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Node core
        ctx.fillStyle = isDark ? '#00ffff' : '#9d00ff';
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, node.size * Math.sin(time * 2 + node.pulse) * 0.5 + node.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Outer ring with pulse effect
      ctx.strokeStyle = isDark ? 'rgba(0, 255, 255, 0.6)' : 'rgba(157, 0, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius * (1 + Math.sin(Date.now() * 0.001) * 0.05),
        0,
        Math.PI * 2
      );
      ctx.stroke();
      
      rotation += 0.003;
      animationFrameId = requestAnimationFrame(drawGlobe);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    resizeCanvas();
    initNodes();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    drawGlobe();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  return (
    <motion.div
      className="w-full h-full min-h-[300px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ background: 'transparent' }}
      />
    </motion.div>
  );
};

export default ContactGlobe;
