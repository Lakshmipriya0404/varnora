import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const services = [
    { name: "Web Design", href: "#services" },
    { name: "Frontend Development", href: "#services" },
    { name: "Backend Development", href: "#services" },
    { name: "Full-Stack Solutions", href: "#services" },
    { name: "UI/UX Design", href: "#services" }
  ];
  
  const company = [
    { name: "About Us", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Careers", href: "#about" },
    { name: "Testimonials", href: "#" },
    { name: "Blog", href: "#" }
  ];
  
  return (
    <footer className={`py-12 border-t ${
      isDark 
        ? 'bg-deep-space border-white/10' 
        : 'bg-gray-100 border-gray-200'
    }`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="text-2xl font-bold gradient-text mb-4 block">
              Glacium
            </Link>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Transforming ideas into exceptional digital experiences.</p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>© {new Date().getFullYear()} Glacium Creative Agency. All rights reserved.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Services</h4>
            <ul className="space-y-2">
              {services.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className={`hover:text-neon-cyan transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.replace('#', ''));
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Company</h4>
            <ul className="space-y-2">
              {company.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className={`hover:text-neon-cyan transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.href.startsWith('#')) {
                        scrollToSection(item.href.replace('#', ''));
                      }
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Newsletter</h4>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Subscribe to our newsletter for the latest updates.</p>
            <form 
              className="flex"
              onSubmit={async (e) => {
                e.preventDefault();
                const emailInput = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement;
                if (emailInput && emailInput.value) {
                  try {
                    const response = await fetch('/api/subscribe', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ email: emailInput.value }),
                    });
                    
                    if (response.ok) {
                      alert('Thank you for subscribing!');
                      emailInput.value = '';
                    } else {
                      const data = await response.json();
                      alert(`Error: ${data.message || 'Something went wrong'}`);
                    }
                  } catch (error) {
                    console.error('Subscription error:', error);
                    alert('Failed to subscribe. Please try again later.');
                  }
                }
              }}
            >
              <input 
                type="email" 
                placeholder="Your email" 
                className={`px-4 py-2 rounded-l-md w-full focus:outline-none ${
                  isDark 
                    ? 'bg-midnight/50 border border-white/10 text-white placeholder-gray-500'
                    : 'bg-white border border-gray-300 text-gray-800 placeholder-gray-400'
                }`}
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 rounded-r-md bg-neon-cyan text-deep-space font-medium hover:bg-opacity-90 transition-colors"
                aria-label="Subscribe"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
