import { forwardRef, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionTemplate } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import rageshpic from '@/images/rageshpic.jpg';
import priyapic from '@/images/priya pic_3.jpg';
import { 
  Lightbulb, 
  Zap, 
  Users, 
  Code,
  Globe,
  Shapes,
  Rocket,
  Sparkles,
  Heart,
  Clock,
  Compass,
  Database,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Link,
  FileText,
  Palette,
  Video
} from 'lucide-react';

const teamMembers = [
  {
    name: "Lakshmipriya Ramesh",
    role: "Founder & Creative Director",
    image: priyapic,
    bio: "With over 5 years of experience in digital design, Priya leads Varnora's creative vision and strategic direction.",
    links: {
      github: "https://github.com/Lakshmipriya0404",
      linkedin: "https://www.linkedin.com/in/lakshmipriya-ramesh-b32770201/",
      behance: "https://lakshmipriya-portfolio.vercel.app/",
    },
  },
  {
    name: "Rageshwaran",
    role: "Lead Developer",
    image: rageshpic,
    bio: "Ragesh is a full-stack engineer with expertise in React, Node.js, and cloud architecture.",
    links: {
      github: "https://github.com/Rageshwaran-HR",
      linkedin: "davidchen",
      behance:
        "https://64f6251e0b26fd04e7db272d--lucent-pika-ec6e69.netlify.app/#about",
    },
  },
];

// Project development cycle
const projectDevelopmentCycle = [
  {
    phase: "01",
    title: "Discovery",
    description: "Deep research and stakeholder interviews to understand business goals and user needs.",
    icon: <Compass />
  },
  {
    phase: "02",
    title: "Concept & Strategy",
    description: "Define project scope, create user personas, and develop a comprehensive digital strategy.",
    icon: <Lightbulb />
  },
  {
    phase: "03",
    title: "UX Architecture",
    description: "Design information architecture, create wireframes, and establish user flows and interactions.",
    icon: <Shapes />
  },
  {
    phase: "04",
    title: "Visual Design",
    description: "Create a stunning visual language with mood boards, UI components, and interactive prototypes.",
    icon: <Sparkles />
  },
  {
    phase: "05",
    title: "Frontend Development",
    description: "Transform designs into responsive, accessible, and performant code using modern frameworks.",
    icon: <Code />
  },
  {
    phase: "06",
    title: "Backend Integration",
    description: "Build scalable APIs, implement security protocols, and connect to data sources and third-party services.",
    icon: <Database />
  },
  {
    phase: "07",
    title: "Quality Assurance",
    description: "Rigorous testing across devices, performance optimization, and accessibility compliance.",
    icon: <Zap />
  },
  {
    phase: "08",
    title: "Deployment & Growth",
    description: "Launch with CI/CD pipelines, implement analytics, and provide continuous improvement strategies.",
    icon: <Rocket />
  }
];

// Company core values
const coreValues = [
  {
    icon: <Lightbulb className="h-6 w-6 text-white" />,
    title: "Innovation",
    description: "Constantly exploring new technologies and approaches to craft unique digital experiences.",
    color: "from-neon-cyan to-blue-500"
  },
  {
    icon: <Zap className="h-6 w-6 text-white" />,
    title: "Performance",
    description: "Optimizing every aspect of our work for speed, accessibility, and conversion.",
    color: "from-electric-purple to-fuchsia-500"
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Collaboration",
    description: "Working closely with clients throughout the process to ensure alignment and satisfaction.",
    color: "from-teal-400 to-neon-cyan"
  },
  {
    icon: <Code className="h-6 w-6 text-white" />,
    title: "Craftsmanship",
    description: "Paying meticulous attention to detail in every line of code and pixel of design.",
    color: "from-pink-500 to-electric-purple"
  },
  {
    icon: <Clock className="h-6 w-6 text-white" />,
    title: "Timeliness",
    description: "Delivering exceptional results on schedule, respecting our clients' timelines.",
    color: "from-amber-500 to-red-500"
  },
  {
    icon: <Globe className="h-6 w-6 text-white" />,
    title: "Global Perspective",
    description: "Drawing inspiration from diverse cultures and approaches to solve complex challenges.",
    color: "from-blue-500 to-indigo-600"
  }
];

// Animated team member card
const TeamMemberCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div 
      ref={cardRef}
      className="glass rounded-lg overflow-hidden group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        style={{ zIndex: -1 }}
      ></div>
      
      <div className="p-1 h-full">
        <div className={`${isDark ? 'bg-deep-space' : 'bg-white'} rounded-lg p-5 h-full relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 cyber-dots opacity-10"></div>
          
          {/* Image with hover effect */}
          <div className="relative mb-4 w-24 h-24 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
              style={{ padding: '2px' }}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center">
            <h4 className="font-bold text-lg">{member.name}</h4>
            <p className="text-sm text-neon-cyan mb-3">{member.role}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4 line-clamp-3`}>{member.bio}</p>
            
            {/* Social links */}
            <div className="flex justify-center space-x-3">
              {Object.entries(member.links).map(([platform, username], idx) => {
                const Icon = (() => {
                  switch (platform) {
                    case 'twitter': return Twitter;
                    case 'github': return Github;
                    case 'linkedin': return Linkedin;
                    case 'dribbble': return Shapes;
                    case 'instagram': return Instagram;
                    case 'behance': return Globe;
                    case 'codepen': return Code;
                    case 'medium': return FileText;
                    case 'artstation': return Palette;
                    case 'vimeo': return Video;
                    default: return Link;
                  }
                })();
                
                return (
                  <a
                    key={idx}
                    href={username}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full ${
                      isDark ? "bg-white/5" : "bg-gray-100"
                    } flex items-center justify-center hover:bg-neon-cyan/20 transition-colors group cursor-pointer`}
                    aria-label={`${member.name}'s ${platform}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isDark ? "text-white" : "text-gray-700"
                      } group-hover:text-neon-cyan transition-colors z-10`}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative py-12" ref={containerRef}>
      {/* Timeline line */}
      <div
        className={`absolute left-[26px] md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-px ${isDark ? "bg-white/10" : "bg-gray-200"}`}
      ></div>
      <motion.div
        className="absolute left-[26px] md:left-1/2 md:transform md:-translate-x-px top-0 w-px bg-neon-cyan"
        style={{ height: lineHeight }}
      ></motion.div>

      <div className="relative">
        {projectDevelopmentCycle.map((item, index) => (
          <div
            key={index}
            className={`mb-12 flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Mobile view - single column (unchanged) */}
            <div className="md:hidden relative w-full">
              <motion.div
                className="relative z-10 pb-4 pl-16"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-neon-cyan font-code font-bold text-2xl block mb-1">
                  {item.phase}
                </span>
                <h4 className="text-xl font-bold mb-2 gradient-text">
                  {item.title}
                </h4>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {item.description}
                </p>
              </motion.div>

              <div className="absolute left-0 top-0 flex items-center justify-center">
                <motion.div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${
                    isDark
                      ? "bg-deep-space border-neon-cyan text-white"
                      : "bg-white border-neon-cyan text-gray-800 shadow-md shadow-neon-cyan/20"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                  }}
                >
                  {item.icon}
                </motion.div>
              </div>
            </div>

            {/* Desktop view - alternating layout (unchanged) */}
            <motion.div
              className={`hidden md:block relative z-10 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div
                className={`inline-block ${index % 2 === 0 ? "md:float-right" : ""} pb-4`}
              >
                <span className="text-neon-cyan font-code font-bold text-2xl block mb-1">
                  {item.phase}
                </span>
                <h4 className="text-xl font-bold mb-2 gradient-text">
                  {item.title}
                </h4>
                <p
                  className={`max-w-md ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>

            <div className="hidden md:flex absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 items-center justify-center">
              <motion.div
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${
                  isDark
                    ? "bg-deep-space border-neon-cyan text-white"
                    : "bg-white border-neon-cyan text-gray-800 shadow-md shadow-neon-cyan/20"
                }`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                }}
              >
                {item.icon}
              </motion.div>
            </div>

            <div className="hidden md:block md:w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Core value card
const CoreValueCard = ({ value, index }: { value: typeof coreValues[0], index: number }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div 
      className="glass rounded-lg overflow-hidden relative group cyberpunk-slash"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="p-6">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mb-4`}>
          {value.icon}
        </div>
        <h4 className="text-xl font-bold mb-2">{value.title}</h4>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{value.description}</p>
      </div>
    </motion.div>
  );
};

// Main About component with parallax effects
const About = forwardRef<HTMLElement>((props, ref) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // References for parallax sections
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  // Parallax effects for hero section
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });
  
  const heroY = useTransform(heroScroll, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5, 1], [1, 1, 0]);
  
  // Rotating 3D effect for company logo/graphic
  const rotateX = useTransform(heroScroll, [0, 1], [0, 10]);
  const rotateY = useTransform(heroScroll, [0, 1], [0, 15]);
  const heroScale = useTransform(heroScroll, [0, 0.5, 1], [1, 1.1, 1]);
  
  const logoTransform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${heroScale})`;
  
  return (
    <section
      id="about"
      ref={ref}
      className={`relative overflow-hidden ${
        isDark ? "bg-deep-space" : "bg-gray-50"
      }`}
    >
      {/* Hero section with parallax effect */}
      <div
        ref={heroRef}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background elements */}
        <motion.div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-radial from-midnight/40 to-deep-space"
              : "bg-gradient-radial from-gray-200/70 to-gray-50"
          }`}
          style={{ y: heroY, opacity: heroOpacity }}
        ></motion.div>

        {/* Particle dust effect in background */}
        <div className="absolute inset-0 cyber-dots opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Advanced 3D rotating company visual with futuristic elements */}
            <motion.div
              className="relative mx-auto lg:mx-0 max-w-md"
              style={{ transform: logoTransform }}
            >
              <div className="relative aspect-square">
                {/* Glowing orb background with animation */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-electric-purple/10 filter blur-[80px]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>

                {/* Secondary glow for depth */}
                <motion.div
                  className="absolute -top-10 -left-10 w-[120%] h-[120%] rounded-full bg-neon-cyan/5 filter blur-[100px]"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                ></motion.div>

                {/* Futuristic holographic cube frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-[350px] max-h-[350px]">
                    <motion.div
                      className="absolute inset-6 border-2 border-neon-cyan/30 rounded-xl"
                      animate={{
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                    <motion.div
                      className="absolute inset-12 border-2 border-electric-purple/20 rounded-xl"
                      animate={{
                        rotate: [0, -7, 0, 7, 0],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                  </div>
                </div>

                {/* Animated circuit lines */}
                <div className="absolute inset-0 overflow-hidden">
                  <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 300 300"
                  >
                    <defs>
                      <clipPath id="circuitClip">
                        <rect x="50" y="50" width="200" height="200" rx="8" />
                      </clipPath>
                    </defs>

                    <motion.path
                      d="M50,50 L100,50 L150,100 L200,100 L250,50"
                      stroke="hsla(var(--neon-cyan), 0.5)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path
                      d="M50,150 L100,150 L150,100 L200,100 L250,150"
                      stroke="hsla(var(--electric-purple), 0.5)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 0.8 }}
                    />
                    <motion.path
                      d="M50,250 L100,250 L150,200 L200,200 L250,250"
                      stroke="hsla(var(--neon-cyan), 0.5)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 1.1 }}
                    />
                    <motion.path
                      d="M50,50 L50,100 L100,150 L100,200 L50,250"
                      stroke="hsla(var(--electric-purple), 0.5)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 1.4 }}
                    />
                    <motion.path
                      d="M250,50 L250,100 L200,150 L200,200 L250,250"
                      stroke="hsla(var(--neon-cyan), 0.5)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 1.7 }}
                    />
                  </svg>
                </div>

                {/* Company visual/logo with holographic effect */}
                <div className="relative z-10 glassmorphism rounded-xl overflow-hidden cyberpunk-slash">
                  <div className="relative aspect-w-1 aspect-h-1 rounded-xl overflow-hidden cyber-dots">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-electric-purple/10 backdrop-blur-sm"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        {/* Animated logo with cyberpunk effect */}
                        <div className="relative w-36 h-36 mx-auto mb-6">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan to-electric-purple p-[1px] animate-pulse">
                            <div
                              className={`w-full h-full rounded-full ${
                                isDark ? "bg-deep-space" : "bg-white"
                              } flex items-center justify-center`}
                            >
                              {/* Animated letter G */}
                              <div className="relative">
                                {/* Glow effect */}
                                <div className="absolute inset-0 text-6xl font-bold text-neon-cyan blur-[8px] opacity-50">
                                  G
                                </div>
                                {/* Main letter */}
                                <div className="relative text-6xl font-bold gradient-text">
                                  G
                                </div>

                                {/* Data visualization dots around the letter */}
                                <motion.div
                                  className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-neon-cyan/70"
                                  animate={{
                                    opacity: [0.4, 1, 0.4],
                                    scale: [0.8, 1.2, 0.8],
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.div
                                  className="absolute bottom-0 -left-2 w-2 h-2 rounded-full bg-electric-purple/70"
                                  animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [0.7, 1.1, 0.7],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: 0.5,
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Orbiting elements */}
                          <motion.div
                            className="absolute top-0 left-0 right-0 bottom-0 rounded-full border border-neon-cyan/20"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <motion.div
                              className="absolute top-0 -translate-x-1/2 left-1/2 w-4 h-4 rounded-full bg-neon-cyan/40"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </motion.div>

                          <motion.div
                            className="absolute top-2 left-2 right-2 bottom-2 rounded-full border border-electric-purple/20"
                            animate={{ rotate: -360 }}
                            transition={{
                              duration: 25,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <motion.div
                              className="absolute top-0 -translate-x-1/2 left-1/2 w-3 h-3 rounded-full bg-electric-purple/40"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: 1,
                              }}
                            />
                          </motion.div>
                        </div>

                        <h2 className="text-4xl font-bold gradient-text relative">
                          Glacium
                          <div className="absolute -inset-1 blur-sm bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 -z-10 rounded-lg"></div>
                        </h2>

                        <div className="flex items-center justify-center space-x-2 mt-2">
                          <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                          <p
                            className={`${
                              isDark ? "text-white/70" : "text-gray-600"
                            } font-code`}
                          >
                            Est. 2018
                          </p>
                          <div className="w-2 h-2 rounded-full bg-electric-purple"></div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced decorative elements */}
                    <motion.div
                      className="absolute top-8 right-8 w-16 h-16 border border-white/20 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    ></motion.div>
                    <motion.div
                      className="absolute bottom-12 left-10 w-8 h-8 border border-neon-cyan/30 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    ></motion.div>
                    <motion.div
                      className="absolute top-1/2 left-10 w-12 h-12 border border-electric-purple/30 rounded-lg"
                      animate={{ rotate: [0, 45, 0], opacity: [0.4, 0.7, 0.4] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                    ></motion.div>

                    <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-r from-transparent to-neon-cyan/40 transform rotate-45"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-[1px] bg-gradient-to-r from-electric-purple/40 to-transparent transform -rotate-45"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <span className="font-code text-neon-cyan mb-2 block">
                  &lt;about&gt;
                </span>
                <h2 className="text-5xl font-bold mb-6">Our Story</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-neon-cyan to-electric-purple mb-6"></div>

                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } text-lg mb-6 leading-relaxed`}
                >
                  At Varnora, we believe every brand has a story — and every
                  story deserves a vibrant digital space
                </p>

                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } mb-8 leading-relaxed`}
                >
                  We are a creative digital studio focused on designing websites
                  and experiences that not only look beautiful but feel
                  intuitive, purposeful, and alive.
                </p>

                <motion.a
                  href="#team"
                  className="inline-flex items-center px-6 py-3 rounded-md glass hover:bg-white/10 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("team")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ x: 5 }}
                >
                  <span>Meet our team</span>
                  <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10h12M12 4l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="flex flex-col items-center">
            <p className="text-neon-cyan text-xs mb-2 font-code">SCROLL</p>
            <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Core values section */}
      <div
        ref={valuesRef}
        className={`py-20 relative ${isDark ? "" : "bg-white"}`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-b from-deep-space via-midnight/50 to-deep-space"
              : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
          }`}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="font-code text-neon-cyan">&lt;values&gt;</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Our Core Values
            </h2>
            <p
              className={`max-w-2xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              These principles guide everything we do, from client interactions
              to the smallest details in our work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <CoreValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Project Development Cycle */}
      <div
        id="timeline"
        ref={timelineRef}
        className={`py-20 relative ${isDark ? "bg-deep-space" : "bg-gray-50"}`}
      >
        <div className="absolute inset-0 futuristic-grid opacity-30"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="font-code text-neon-cyan">&lt;process&gt;</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Project Development Cycle
            </h2>
            <p
              className={`max-w-2xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our systematic approach to every project ensures exceptional
              results, from initial discovery to deployment and growth.
            </p>
          </motion.div>

          <Timeline />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-electric-purple/5 filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-neon-cyan/5 filter blur-[120px] pointer-events-none"></div>
      </div>

      {/* Team section */}
      <div
        id="team"
        ref={teamRef}
        className={`py-20 relative ${isDark ? "bg-deep-space" : "bg-gray-100"}`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-b from-deep-space via-midnight/30 to-deep-space"
              : "bg-gradient-to-b from-gray-100 via-white/80 to-gray-100"
          }`}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="font-code text-neon-cyan">&lt;team&gt;</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Meet Our Team
            </h2>
            <p
              className={`max-w-2xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              The talented individuals who bring our vision to life and push the
              boundaries of digital creation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>

          {/* Join our team CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="glass p-8 rounded-lg max-w-2xl mx-auto cyber-scanline">
              <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
              <p
                className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                We're always looking for talented individuals to join our
                creative collective. If you're passionate about digital
                innovation, we'd love to hear from you.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-3 rounded-md animate-gradient text-white font-semibold hover:opacity-90 transition-opacity relative group overflow-hidden"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative">View Open Positions</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
