import { forwardRef, useRef, useEffect } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import AnimatedText from './AnimatedText';
import { useTheme } from './ThemeProvider';

// SVG Circuit Component for a futuristic look
const CircuitLines = () => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" 
      viewBox="0 0 800 600" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
          <stop offset="100%" stopColor="hsl(var(--electric-purple))" />
        </linearGradient>
      </defs>
      <g stroke="url(#circuitGradient)" fill="none" strokeWidth="1.5">
        <motion.path 
          d="M0,100 L100,100 L150,150 L250,150 L300,100 L400,100" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M0,200 L50,200 L100,150 L200,150 L250,200 L350,200 L400,150" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.7, ease: "easeInOut" }}
        />
        <motion.path 
          d="M100,0 L100,50 L150,100 L150,200 L100,250 L100,350" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.9, ease: "easeInOut" }}
        />
        <motion.path 
          d="M200,0 L200,100 L250,150 L250,250 L300,300 L300,400" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.1, ease: "easeInOut" }}
        />
        <motion.path 
          d="M400,50 L450,100 L550,100 L600,150 L700,150 L750,100 L800,100" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.3, ease: "easeInOut" }}
        />
        <motion.path 
          d="M400,200 L500,200 L550,150 L650,150 L700,200 L800,200" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
        />
        <motion.path 
          d="M500,0 L500,50 L550,100 L550,200 L600,250 L600,350" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.7, ease: "easeInOut" }}
        />
        <motion.path 
          d="M700,0 L700,100 L650,150 L650,250 L600,300 L600,400" 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.9, ease: "easeInOut" }}
        />
        
        {/* Circuit nodes */}
        <motion.circle cx="100" cy="100" r="4" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.circle cx="150" cy="150" r="4" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
        <motion.circle cx="200" cy="100" r="8" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        />
        <motion.circle cx="300" cy="150" r="4" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        />
        <motion.circle cx="400" cy="100" r="6" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        />
        <motion.circle cx="500" cy="200" r="4" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.circle cx="600" cy="150" r="8" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
        />
        <motion.circle cx="700" cy="200" r="6" 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        />
      </g>
    </svg>
  );
};

// Futuristic floating element
const FloatingElements = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Geometric Shapes */}
      <motion.div 
        className="absolute top-[20%] right-[15%] w-32 h-32 rounded-lg border border-neon-cyan/30"
        style={{ 
          background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(157,0,255,0.05) 100%)',
          backdropFilter: 'blur(5px)' 
        }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-[60%] left-[10%] w-24 h-24 rounded-full border border-electric-purple/30"
        style={{ 
          background: isDark 
            ? 'radial-gradient(circle, rgba(157,0,255,0.15) 0%, rgba(0,0,0,0) 70%)' 
            : 'radial-gradient(circle, rgba(157,0,255,0.1) 0%, rgba(255,255,255,0) 70%)' 
        }}
        animate={{ 
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="absolute top-[30%] left-[70%] w-40 h-16 rounded-md border border-neon-cyan/20"
        style={{ 
          background: isDark 
            ? 'linear-gradient(45deg, rgba(0,255,255,0.08) 0%, rgba(0,0,0,0) 70%)' 
            : 'linear-gradient(45deg, rgba(0,255,255,0.08) 0%, rgba(255,255,255,0) 70%)' 
        }}
        animate={{ 
          x: [0, -20, 0],
          rotate: [0, -3, 0],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Light Beams */}
      <motion.div 
        className="absolute -top-20 left-1/3 w-1 h-[80vh] bg-neon-cyan/10 rounded-full"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scaleY: [0.8, 1.2, 0.8]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -top-20 right-1/4 w-1 h-[60vh] bg-electric-purple/10 rounded-full"
        animate={{ 
          opacity: [0.05, 0.2, 0.05],
          scaleY: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </div>
  );
};

const Hero = forwardRef<HTMLElement>((props, ref) => {
  const controls = useAnimation();
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect for content
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    };
    
    sequence();
  }, [controls]);
  
  return (
    <section 
      id="home" 
      ref={ref}
      className="h-screen relative overflow-hidden flex items-center"
    >
      <ParticleBackground />
      <CircuitLines />
      <FloatingElements />
      
      {/* Glowing Orb - accented by theme */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-30 blur-3xl bg-electric-purple/30 animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl bg-neon-cyan/20 animate-pulse"></div>
      
      <div className="container mx-auto px-6 z-10 relative" ref={contentRef}>
        <motion.div 
          className="flex flex-col items-start justify-center md:max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          style={{ y, opacity }}
        >
          {/* Futuristic heading with clipped corners */}
          <div className="relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/50 to-electric-purple/50 rounded-md blur-md"></div>
            <h1 className={`relative text-5xl md:text-7xl font-bold ${theme === 'dark' ? 'bg-deep-space' : 'bg-white/70'} p-2 rounded-md`}>
              We create <span className="gradient-text">digital</span> <br/>
              experiences that <br/>
              <AnimatedText 
                phrases={['inspire.', 'transform.', 'innovate.', 'elevate.']} 
              />
            </h1>
          </div>
          
          <motion.p 
            className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-code pl-1 border-l-4 border-neon-cyan/60 py-2`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            A creative agency specializing in cutting-edge web development 
            and futuristic digital solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.a 
              href="#contact"
              className="px-8 py-3 rounded-md animate-gradient text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-neon-cyan/20 relative group overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative">Get in touch</span>
            </motion.a>
            
            <motion.a 
              href="#portfolio"
              className={`px-8 py-3 rounded-md glass ${theme === 'dark' ? 'text-white border-white/10' : 'text-gray-800 border-gray-300/30'} font-semibold transition-all border relative group overflow-hidden`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('portfolio');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative">View our work</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated scroll indicator with glow effect */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 1.2, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      >
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-neon-cyan flex items-center justify-center relative animate-glow"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-neon-cyan rounded-full"
            animate={{ 
              y: [0, 6, 0], 
              opacity: [0.6, 1, 0.6] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <div 
            className="absolute -bottom-7 text-xs font-code text-neon-cyan"
            onClick={() => scrollToSection('services')}
            style={{ cursor: 'pointer' }}
          >
            SCROLL
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
