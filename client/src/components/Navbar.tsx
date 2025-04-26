import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Update navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle navigation item click
  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    // Smooth scroll to section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "backdrop-blur-md bg-deep-space/70" : ""
      )}
    >
      <nav className="glass mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-2xl font-bold gradient-text">Glacium</a>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="#home" 
            className="nav-item text-white hover:text-neon-cyan transition-colors"
            onClick={() => handleNavClick('home')}
          >
            Home
          </a>
          <a 
            href="#services" 
            className="nav-item text-white hover:text-neon-cyan transition-colors"
            onClick={() => handleNavClick('services')}
          >
            Services
          </a>
          <a 
            href="#portfolio" 
            className="nav-item text-white hover:text-neon-cyan transition-colors"
            onClick={() => handleNavClick('portfolio')}
          >
            Portfolio
          </a>
          <a 
            href="#about" 
            className="nav-item text-white hover:text-neon-cyan transition-colors"
            onClick={() => handleNavClick('about')}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="nav-item text-white hover:text-neon-cyan transition-colors"
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden glass absolute w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              <a 
                href="#home" 
                className="text-white hover:text-neon-cyan transition-colors"
                onClick={() => handleNavClick('home')}
              >
                Home
              </a>
              <a 
                href="#services" 
                className="text-white hover:text-neon-cyan transition-colors"
                onClick={() => handleNavClick('services')}
              >
                Services
              </a>
              <a 
                href="#portfolio" 
                className="text-white hover:text-neon-cyan transition-colors"
                onClick={() => handleNavClick('portfolio')}
              >
                Portfolio
              </a>
              <a 
                href="#about" 
                className="text-white hover:text-neon-cyan transition-colors"
                onClick={() => handleNavClick('about')}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-white hover:text-neon-cyan transition-colors"
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
