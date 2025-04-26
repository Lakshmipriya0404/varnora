import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Code, 
  Database, 
  Globe,
  Zap,
  Lock,
  LayoutPanelTop,
  Lightbulb
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  features, 
  delay,
  index
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Alternate corner styles for a more futuristic look
  const corners = [
    "rounded-tl-none rounded-br-none",
    "rounded-tr-none rounded-bl-none",
    "rounded-bl-none rounded-tr-none",
    "rounded-br-none rounded-tl-none"
  ];
  
  // Different effect for each card
  const effects = [
    "cyber-dots",
    "cyber-scanline",
    "cyberpunk-slash",
    ""
  ];
  
  return (
    <motion.div 
      className={`gradient-border p-6 glass rounded-lg relative overflow-hidden ${corners[index % corners.length]} ${effects[index % effects.length]}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Top corner accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-neon-cyan/30 border-r-transparent"></div>
      
      {/* Animated icon container */}
      <motion.div 
        className="relative h-16 w-16 rounded-full flex items-center justify-center mb-6 overflow-hidden"
        whileHover={{ scale: 1.1 }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-electric-purple animate-gradient"></div>
        
        {/* Pulsing effect */}
        <motion.div 
          className="absolute inset-0 bg-white rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        
        {/* Icon */}
        <div className="relative z-10">
          {icon}
        </div>
      </motion.div>
      
      {/* Title with animated underline */}
      <div className="relative">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <motion.div 
          className="h-[2px] bg-gradient-to-r from-neon-cyan to-electric-purple w-0"
          whileInView={{ width: "40%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
      
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} my-4`}>{description}</p>
      
      {/* Feature list with futuristic styling */}
      <ul className="space-y-3 text-sm font-code">
        {features.map((feature, idx) => (
          <motion.li 
            key={idx} 
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * idx }}
            viewport={{ once: true }}
          >
            <span className="text-neon-cyan mt-1 mr-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6H11M6 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
      
      {/* Learn more indicator */}
      <motion.div 
        className="mt-6 flex items-center text-neon-cyan text-xs opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        whileHover={{ x: 5 }}
      >
        <span>LEARN MORE</span>
        <svg className="ml-1 w-3 h-3" viewBox="0 0 10 10" fill="none">
          <path d="M1 5H9M5 1L9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.div>
  );
};

const servicesData = [
  {
    icon: <Monitor className="h-8 w-8 text-white" />,
    title: "Web Design",
    description: "Crafting visually stunning, user-centric interfaces that engage and convert.",
    features: ["UI/UX Design", "Responsive Layouts", "Brand Integration"],
    delay: 0
  },
  {
    icon: <Code className="h-8 w-8 text-white" />,
    title: "Frontend Development",
    description: "Building performant, interactive user interfaces with modern technologies.",
    features: ["React / Vue.js", "Tailwind / SCSS", "Framer Motion / GSAP"],
    delay: 0.2
  },
  {
    icon: <Database className="h-8 w-8 text-white" />,
    title: "Backend Development",
    description: "Creating robust, scalable API services and data architecture solutions.",
    features: ["Node.js / Express", "MongoDB / PostgreSQL", "AWS / Firebase"],
    delay: 0.4
  },
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    title: "Full-Stack Solutions",
    description: "End-to-end development of complex web applications and platforms.",
    features: ["Next.js / MERN Stack", "GraphQL / REST APIs", "CI/CD Pipelines"],
    delay: 0.6
  }
];

// Additional services
const moreServicesData = [
  {
    icon: <Zap className="h-8 w-8 text-white" />,
    title: "Performance Optimization",
    description: "Enhancing speed, responsiveness and overall user experience of web applications.",
    features: ["Core Web Vitals", "Code Splitting", "Caching Strategies"],
    delay: 0.2
  },
  {
    icon: <Lock className="h-8 w-8 text-white" />,
    title: "Security Solutions",
    description: "Implementing robust security measures to protect applications and user data.",
    features: ["Auth Systems", "Encryption", "Security Audits"],
    delay: 0.4
  },
  {
    icon: <LayoutPanelTop className="h-8 w-8 text-white" />,
    title: "Progressive Web Apps",
    description: "Building applications that work offline and provide a native-like experience.",
    features: ["Service Workers", "Push Notifications", "Offline Support"],
    delay: 0.6
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    title: "Digital Innovation",
    description: "Exploring cutting-edge technologies to create unique digital experiences.",
    features: ["3D/WebGL", "AR/VR Interfaces", "AI Integration"],
    delay: 0.8
  }
];

const Services = forwardRef<HTMLElement>((props, ref) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <section 
      id="services" 
      ref={ref}
      className={`py-20 md:py-32 relative ${isDark ? 'bg-deep-space' : 'bg-gray-100'} circuit-pattern`}
    >
      {/* Futuristic overlays for depth and style */}
      <div className="absolute inset-0 futuristic-grid pointer-events-none"></div>
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${
        isDark 
          ? 'via-deep-space to-deep-space/60' 
          : 'via-gray-100 to-gray-200/60'
      } pointer-events-none`}></div>
      
      {/* Glowing orbs as accents */}
      <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-electric-purple/5 filter blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-neon-cyan/5 filter blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Decorative elements */}
          <div className="flex items-center justify-center mb-4">
            <motion.div 
              className="h-px w-12 bg-neon-cyan/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            <span className="font-code text-neon-cyan mx-4">&lt;services&gt;</span>
            <motion.div 
              className="h-px w-12 bg-neon-cyan/70"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 relative inline-block">
            <span className="relative z-10">Our Expertise</span>
            <motion.div 
              className="absolute -inset-1 rounded-md bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 blur-md -z-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            />
          </h2>
          
          <motion.p 
            className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            We blend creativity and technology to deliver exceptional digital experiences that drive results.
          </motion.p>
        </motion.div>
        
        {/* Primary services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={service.delay}
              index={index}
            />
          ))}
        </div>
        
        {/* View all services button */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <button 
            className="group relative px-8 py-3 glass border border-neon-cyan/30 rounded-md overflow-hidden"
            onClick={() => {
              // Toggle visibility of additional services
              const moreServices = document.getElementById('more-services');
              if (moreServices) {
                moreServices.classList.toggle('hidden');
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative font-code text-sm">
              <span className="mr-2 text-neon-cyan">+</span>
              EXPLORE MORE SERVICES
            </span>
          </button>
        </motion.div>
        
        {/* Additional services - initially hidden */}
        <div id="more-services" className="hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {moreServicesData.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                delay={service.delay}
                index={index + 4} // Offset index to get different styles
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
