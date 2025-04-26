import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTheme } from './ThemeProvider';

// Client testimonial data
const testimonials = [
  {
    id: 1,
    name: "Alex Mitchell",
    position: "CEO, TechVision",
    company: "TechVision",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    quote: "The Glacium team went above and beyond our expectations. Their design work transformed our brand online and the user experience is exactly what we needed. Highly recommend!",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Thompson",
    position: "Marketing Director",
    company: "Innovate Labs",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    quote: "Working with Glacium was a game-changer for our digital presence. Their attention to detail and innovative approach helped us stand out in a crowded market. The results have exceeded our expectations.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    position: "Product Manager",
    company: "Nexus Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    quote: "The interactive elements Glacium implemented on our site increased user engagement by over 40%. Their code is clean, well-documented, and their process was transparent from start to finish.",
    rating: 5
  },
  {
    id: 4,
    name: "Emily Chen",
    position: "Creative Director",
    company: "Elevate Studio",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", 
    quote: "As a design-focused studio ourselves, we had high standards. Glacium not only met them but took our vision further than we imagined possible. The animations and transitions are flawless.",
    rating: 5
  },
  {
    id: 5,
    name: "James Wilson",
    position: "Founder",
    company: "Quantum Brands",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    quote: "From concept to execution, Glacium delivered a website that perfectly represents our brand while providing an exceptional user experience. The site has significantly improved our conversion rates.",
    rating: 5
  }
];

interface TestimonialsProps {}

const Testimonials = forwardRef<HTMLElement, TestimonialsProps>((props, ref) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Auto-rotate testimonials
  useEffect(() => {
    const startTimeout = () => {
      timeoutRef.current = setTimeout(() => {
        setDirection(1);
        setCurrent(prev => (prev + 1) % testimonials.length);
      }, 8000);
    };

    startTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current]);

  const handlePrevious = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDirection(-1);
    setCurrent(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDirection(1);
    setCurrent(prev => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };
  
  // Track which testimonials are visible for pagination
  const goToTestimonial = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className={`relative py-20 overflow-hidden ${isDark ? 'bg-midnight' : 'bg-gray-50'}`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 cyber-dots opacity-10"></div>
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-b from-deep-space/50 via-transparent to-deep-space/50' 
          : 'bg-gradient-to-b from-white/70 via-transparent to-white/70'
      }`}></div>
      
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-electric-purple/5 filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-neon-cyan/5 filter blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="font-code text-neon-cyan mb-2 inline-block">&lt;testimonials&gt;</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Client Success Stories</h2>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't just take our word for it. Here's what our clients have to say about their experience working with Glacium.
          </p>
        </motion.div>
        
        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden relative rounded-xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 }
                }}
                className={`p-10 glassmorphism relative ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              >
                <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-electric-purple flex items-center justify-center text-white">
                  <Quote size={20} />
                </div>
                
                <div className="mb-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={i < testimonials[current].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} 
                      />
                    ))}
                  </div>
                  <p className={`text-xl italic mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    "{testimonials[current].quote}"
                  </p>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-neon-cyan/50" 
                  />
                  <div>
                    <h4 className="font-bold">{testimonials[current].name}</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{testimonials[current].position}, {testimonials[current].company}</p>
                  </div>
                </div>
                
                {/* Futuristic decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-r from-transparent to-neon-cyan/30 transform rotate-45"></div>
                <div className="absolute bottom-0 left-0 w-20 h-[1px] bg-gradient-to-r from-electric-purple/30 to-transparent transform -rotate-45"></div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <button 
              onClick={handlePrevious}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full 
                ${isDark ? 'bg-deep-space/80' : 'bg-white/80'} border border-neon-cyan/30
                flex items-center justify-center backdrop-blur-sm
                hover:bg-neon-cyan/20 transition-colors z-20`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleNext}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full 
                ${isDark ? 'bg-deep-space/80' : 'bg-white/80'} border border-neon-cyan/30
                flex items-center justify-center backdrop-blur-sm
                hover:bg-neon-cyan/20 transition-colors z-20`}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === i 
                    ? 'bg-neon-cyan w-8' 
                    : `${isDark ? 'bg-white/30' : 'bg-gray-300'} hover:bg-neon-cyan/50`
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;