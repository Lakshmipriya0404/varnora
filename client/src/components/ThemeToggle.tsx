import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.button
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        isDark 
          ? "bg-deep-space/50 backdrop-blur-sm border border-white/10 hover:bg-deep-space/80" 
          : "bg-white/50 backdrop-blur-sm border border-gray-200 hover:bg-white/80 shadow-sm",
        className
      )}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Moon className="h-5 w-5 text-blue-700" />
      )}
      
      {/* Animated glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        isDark 
          ? "bg-yellow-500/10 animate-pulse" 
          : "bg-blue-500/10 animate-pulse"
      )}></div>
    </motion.button>
  );
}