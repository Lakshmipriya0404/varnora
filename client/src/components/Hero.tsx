import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import AnimatedText from './AnimatedText';

const Hero = forwardRef<HTMLElement>((props, ref) => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      id="home" 
      ref={ref}
      className="h-screen relative overflow-hidden flex items-center"
    >
      <ParticleBackground />
      
      <div className="container mx-auto px-6 z-10">
        <motion.div 
          className="flex flex-col items-start justify-center md:max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            We create <span className="gradient-text">digital</span> <br/>
            experiences that <br/>
            <AnimatedText 
              phrases={['inspire.', 'transform.', 'innovate.', 'elevate.']} 
            />
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-300 font-code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            A creative agency specializing in cutting-edge web development and design solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.a 
              href="#contact"
              className="px-8 py-3 rounded-md animate-gradient text-white font-semibold hover:opacity-90 transition-opacity"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.a>
            <motion.a 
              href="#portfolio"
              className="px-8 py-3 rounded-md glass text-white font-semibold hover:bg-opacity-20 transition-all border border-white/10"
              onClick={() => scrollToSection('portfolio')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View our work
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-neon-cyan" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          onClick={() => scrollToSection('services')}
          style={{ cursor: 'pointer' }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7" 
          />
        </svg>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
