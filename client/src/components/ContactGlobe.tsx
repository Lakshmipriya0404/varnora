
import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

const ContactGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw globe
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      // Grid lines
      ctx.strokeStyle = isDark ? 'rgba(0, 255, 255, 0.2)' : 'rgba(157, 0, 255, 0.2)';
      ctx.lineWidth = 0.5;
      
      // Latitude lines
      for (let i = 0; i < 10; i++) {
        const latRadius = (radius / 10) * i;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, latRadius, latRadius * Math.abs(Math.cos(rotation)), 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius, radius, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Pulse effect
      ctx.strokeStyle = isDark ? 'rgba(0, 255, 255, 0.4)' : 'rgba(157, 0, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * (1 + Math.sin(Date.now() * 0.001) * 0.05), 0, Math.PI * 2);
      ctx.stroke();
      
      rotation += 0.002;
      animationFrameId = requestAnimationFrame(drawGlobe);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawGlobe();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
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
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </motion.div>
  );
};

export default ContactGlobe;
