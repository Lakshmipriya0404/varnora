import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  phrases: string[];
  className?: string;
}

export default function AnimatedText({ phrases, className = '' }: AnimatedTextProps) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[currentIndex];
      const speed = isDeleting ? 50 : 150;
      
      if (!isDeleting && currentText === currentPhrase) {
        // Pause at the end of typing
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        // Pause before starting new phrase
        timeoutRef.current = setTimeout(() => {}, 500);
      } else {
        setCurrentText(prev => {
          if (isDeleting) {
            return prev.substring(0, prev.length - 1);
          } else {
            return currentPhrase.substring(0, prev.length + 1);
          }
        });
        
        timeoutRef.current = setTimeout(handleTyping, speed);
      }
    };
    
    timeoutRef.current = setTimeout(handleTyping, 100);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, currentIndex, isDeleting, phrases]);
  
  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-[3px] h-[1.2em] bg-neon-cyan ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  );
}
