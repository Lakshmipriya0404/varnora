import { forwardRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { useTheme } from './ThemeProvider';
import { ArrowRight, X, ChevronRight, ExternalLink, Clock, Award, Users } from 'lucide-react';

// Enhanced portfolio items with more details
export const portfolioItems = [
  {
    id: "nova-ecommerce",
    title: "Nova E-commerce Platform",
    subtitle: "Redefining Online Shopping",
    description: "Modern e-commerce experience with dynamic product filtering and AR try-on feature.",
    tags: ["React", "Node.js", "Shopify"],
    image: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    fullDescription: "Nova is a next-generation e-commerce platform that leverages cutting-edge technology to create an immersive shopping experience. The platform includes advanced product filtering, AR try-on capabilities, and personalized recommendations powered by machine learning algorithms.",
    challenge: "The client needed a solution that would stand out in the crowded e-commerce space and provide unique features that would increase engagement and conversion rates.",
    solution: "We developed a custom React-based frontend with a Node.js backend integrated with Shopify's APIs. The AR try-on feature was built using WebXR, allowing customers to visualize products in their own space before purchase.",
    results: [
      "43% increase in conversion rate",
      "27% decrease in product returns",
      "86% user satisfaction rating"
    ],
    testimonial: {
      text: "The AR feature has completely transformed our business model. Customers love being able to 'try before they buy' and it's significantly reduced our return rates.",
      author: "Sarah Johnson, CEO of Nova Retail"
    },
    highlights: [
      "Seamless integration with existing inventory systems",
      "Real-time inventory management",
      "Mobile-first responsive design",
      "Advanced analytics dashboard"
    ],
    timeline: "6 months",
    team: "5 developers, 2 designers, 1 project manager"
  },
  {
    id: "pulse-finance",
    title: "Pulse Financial Dashboard",
    subtitle: "Visualizing Financial Data",
    description: "Interactive financial analytics platform with real-time data visualization.",
    tags: ["Vue.js", "D3.js", "Express"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    fullDescription: "Pulse is a comprehensive financial dashboard that provides real-time analytics and visualization of complex financial data. It helps financial advisors and their clients make informed investment decisions through intuitive charts and customizable reports.",
    challenge: "The client needed a way to present complex financial data in an accessible format that both financial professionals and their clients could easily understand.",
    solution: "We built a Vue.js application with D3.js visualizations that presents financial data in interactive, easy-to-understand formats. The Express backend interfaces with various financial APIs to provide real-time data updates.",
    results: [
      "65% reduction in time spent analyzing data",
      "98% accuracy in financial forecasting",
      "4.9/5 average user rating"
    ],
    testimonial: {
      text: "Pulse has revolutionized how we present financial data to our clients. The interactive visualizations make complex information accessible and actionable.",
      author: "Michael Chen, CTO of Pulse Financial"
    },
    highlights: [
      "Real-time market data integration",
      "Customizable dashboard layouts",
      "Advanced filtering and time-series analysis",
      "Automated report generation"
    ],
    timeline: "4 months",
    team: "3 developers, 1 data scientist, 1 UX designer"
  },
  {
    id: "horizon-travel",
    title: "Horizon Travel App",
    subtitle: "Your Personalized Travel Companion",
    description: "Travel planning application with personalized recommendations and immersive experiences.",
    tags: ["React Native", "Firebase", "ML Kit"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    fullDescription: "Horizon is a mobile travel companion that offers personalized travel recommendations, itinerary planning, and immersive destination previews. The app uses machine learning to understand user preferences and provide tailored suggestions for accommodation, activities, and dining.",
    challenge: "The travel industry needed a solution that could provide truly personalized recommendations while handling the complexity of travel planning across different cultures and destinations.",
    solution: "We developed a React Native app with Firebase backend that utilizes ML Kit for personalization. The app includes features like AR destination previews, real-time language translation, and collaborative trip planning.",
    results: [
      "500,000+ downloads in first year",
      "Average trip planning time reduced by 60%",
      "92% of users reported discovering new experiences they wouldn't have found otherwise"
    ],
    testimonial: {
      text: "Horizon completely changed how I plan my trips. The personalized recommendations are spot-on, and the AR previews give me a real sense of what to expect before I arrive.",
      author: "Elena Rodriguez, Travel Blogger"
    },
    highlights: [
      "Offline map functionality",
      "Real-time language translation",
      "AR destination previews",
      "Collaborative trip planning"
    ],
    timeline: "8 months",
    team: "4 mobile developers, 2 backend developers, 1 ML specialist, 2 UX designers"
  },
  {
    id: "nexus-workspace",
    title: "Nexus Workspace",
    subtitle: "Collaborative Productivity Suite",
    description: "Collaborative platform with real-time document editing and team management tools.",
    tags: ["Next.js", "Socket.io", "MongoDB"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    fullDescription: "Nexus Workspace is a comprehensive collaboration platform that enables teams to work together efficiently regardless of location. It includes real-time document editing, project management tools, and integrated communication features.",
    challenge: "Remote work was creating collaboration barriers for teams, with productivity suffering due to disconnected tools and workflows.",
    solution: "We created a unified workspace using Next.js for the frontend and Socket.io for real-time collaboration. The MongoDB backend supports flexible document structures and efficient data querying.",
    results: [
      "32% increase in team productivity",
      "75% reduction in context-switching between tools",
      "25,000+ teams onboarded in first year"
    ],
    testimonial: {
      text: "Nexus has transformed how our distributed team works together. The real-time collaboration features make it feel like we're all in the same room.",
      author: "David Park, Head of Operations at TechFlex"
    },
    highlights: [
      "Real-time document collaboration",
      "Integrated video conferencing",
      "Customizable workflow automation",
      "Advanced permission controls"
    ],
    timeline: "10 months",
    team: "6 full-stack developers, 2 UX designers, 1 DevOps specialist"
  },
  {
    id: "vitality-health",
    title: "Vitality Health Platform",
    subtitle: "Personalized Wellness Solution",
    description: "Fitness tracking system with personalized workout plans and nutrition guidance.",
    tags: ["Flutter", "GraphQL", "Django"],
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    fullDescription: "Vitality is a comprehensive health and wellness platform that combines fitness tracking, personalized workout plans, and nutrition guidance. The platform adapts to user progress and preferences to create a truly personalized health journey.",
    challenge: "Generic fitness apps weren't providing the personalized guidance needed for users to achieve their health goals consistently.",
    solution: "We developed a cross-platform Flutter application with a Django backend and GraphQL API. The app uses machine learning to analyze user data and adapt workout and nutrition plans accordingly.",
    results: [
      "87% of users reported improved fitness levels after 3 months",
      "70% retention rate (industry average is 30%)",
      "250,000+ registered users"
    ],
    testimonial: {
      text: "Vitality is unlike any fitness app I've used before. It's like having a personal trainer and nutritionist in my pocket, adapting to my progress every step of the way.",
      author: "Thomas Wright, Vitality User"
    },
    highlights: [
      "Adaptive workout algorithms",
      "Personalized nutrition planning",
      "Wearable device integration",
      "Social community features"
    ],
    timeline: "7 months",
    team: "3 mobile developers, 2 backend developers, 1 nutrition specialist, 1 fitness expert"
  },
  {
    id: "insight-analytics",
    title: "Insight Analytics",
    subtitle: "AI-Powered Business Intelligence",
    description: "Business intelligence platform with AI-powered data analysis and reporting tools.",
    tags: ["Angular", "Python", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    fullDescription: "Insight Analytics is an advanced business intelligence platform that uses artificial intelligence to analyze company data and generate actionable insights. The platform can identify trends, predict outcomes, and recommend strategic actions based on comprehensive data analysis.",
    challenge: "Businesses were struggling to extract meaningful insights from their growing data repositories, with traditional BI tools requiring significant technical expertise.",
    solution: "We built an Angular frontend with an intuitive interface for non-technical users. The Python backend uses TensorFlow for machine learning models that can analyze complex datasets and generate accessible insights.",
    results: [
      "Average of 23% increase in operational efficiency for client businesses",
      "85% reduction in time spent generating reports",
      "96% accuracy in sales forecasting"
    ],
    testimonial: {
      text: "Insight has transformed how we use data to drive decisions. We're now able to identify opportunities and challenges before they become apparent through traditional analysis.",
      author: "Amanda Rios, Data Strategy Director at GlobeEx"
    },
    highlights: [
      "Natural language query processing",
      "Automated anomaly detection",
      "Predictive analytics dashboards",
      "Custom report generation"
    ],
    timeline: "9 months",
    team: "4 frontend developers, 3 data scientists, 2 backend developers, 1 UX specialist"
  }
];

interface PortfolioItemProps {
  item: typeof portfolioItems[0];
  index: number;
  onClick: () => void;
}

const ProjectDetail = ({ projectId, onClose }: { projectId: string, onClose: () => void }) => {
  const project = portfolioItems.find(item => item.id === projectId);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  if (!project) return null;
  
  return (
    <motion.div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden ${isDark ? 'bg-deep-space/80' : 'bg-gray-900/50'} backdrop-blur-md`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative w-full max-w-6xl m-4 p-1 overflow-hidden"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Glowing border */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-cyan animate-gradient rounded-xl"></div>
        
        <div className={`relative ${isDark ? 'bg-deep-space' : 'bg-white'} rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto cyber-dots`}>
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 z-20 p-2 rounded-full glass hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          {/* Hero section with parallax effect */}
          <div className="relative h-80 overflow-hidden">
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              <div className={`absolute inset-0 bg-gradient-to-t ${isDark 
                ? 'from-deep-space via-deep-space/60' 
                : 'from-gray-800 via-gray-800/60'} to-transparent`}></div>
            </motion.div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="font-code text-neon-cyan text-sm mb-2 block">{project.tags.join(" · ")}</span>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">{project.title}</h1>
              <p className="text-lg text-white/80">{project.subtitle}</p>
            </div>
          </div>
          
          <div className="p-8">
            {/* Project summary */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-neon-cyan" />
                  <span className="text-white/70">{project.timeline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-neon-cyan" />
                  <span className="text-white/70">{project.team}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-neon-cyan" />
                  <span className="text-white/70">{project.results[0]}</span>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed mb-8">{project.fullDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                {/* Challenge */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center mr-2">
                      <span className="text-neon-cyan text-sm">1</span>
                    </span>
                    Challenge
                  </h3>
                  <p className="text-white/70">{project.challenge}</p>
                </div>
                
                {/* Solution */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center mr-2">
                      <span className="text-neon-cyan text-sm">2</span>
                    </span>
                    Solution
                  </h3>
                  <p className="text-white/70">{project.solution}</p>
                </div>
              </div>
            </div>
            
            {/* Project highlights */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Project Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.highlights.map((highlight, idx) => (
                  <motion.div 
                    key={idx}
                    className="glass rounded-lg p-4 flex items-start space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="bg-gradient-to-br from-neon-cyan to-electric-purple w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </span>
                    <span>{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Results */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {project.results.map((result, idx) => (
                  <motion.div 
                    key={idx}
                    className={`${isDark ? 'bg-deep-space' : 'bg-white/80'} border border-neon-cyan/20 rounded-lg p-6 text-center cyberpunk-slash`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <p className="text-lg font-semibold">{result}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Client Feedback</h3>
              <blockquote className="glass border-l-4 border-electric-purple p-6 rounded-r-lg italic">
                <p className="mb-4 text-lg">"{project.testimonial.text}"</p>
                <footer className="text-white/70">— {project.testimonial.author}</footer>
              </blockquote>
            </div>
            
            {/* CTA */}
            <div className="text-center mt-12">
              <motion.button
                className="px-8 py-3 rounded-md animate-gradient text-white font-semibold hover:opacity-90 transition-opacity relative group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center">
                  <span>Back to portfolio</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, index, onClick }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Parallax effect constants
  const evenColumn = index % 2 === 0;
  const initialY = evenColumn ? 50 : 0;
  
  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg h-[400px] cursor-pointer cyberpunk-slash"
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      {/* Image with parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 filter saturate-50 group-hover:saturate-100"
        style={{ backgroundImage: `url(${item.image})` }}
        whileHover={{ scale: 1.05 }}
      />
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${
        isDark 
          ? 'from-deep-space via-deep-space/80' 
          : 'from-gray-800 via-gray-800/80'
      } to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 backdrop-blur-sm text-white border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title with animated underline */}
          <div className="relative">
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <motion.div 
              className="h-[2px] bg-neon-cyan w-0 group-hover:w-1/2 transition-all duration-300"
              initial={{ width: "0%" }}
              whileInView={{ width: "10%" }}
              viewport={{ once: true }}
            />
          </div>
          
          <p className="text-gray-300 mt-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {item.description}
          </p>
          
          {/* View details button */}
          <div 
            className="inline-flex items-center text-neon-cyan text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2 duration-300 delay-150"
          >
            <span>View Project</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ExternalLink className="w-4 h-4 text-white" />
      </div>
    </motion.div>
  );
};

const FilterTag = ({ tag, isActive, onClick, isDark }: { tag: string, isActive: boolean, onClick: () => void, isDark: boolean }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-neon-cyan to-electric-purple text-white' 
          : isDark 
            ? 'bg-white/5 text-white/70 hover:bg-white/10'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      {tag}
    </button>
  );
};

const Portfolio = forwardRef<HTMLElement>((props, ref) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [location, setLocation] = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { scrollYProgress } = useScroll({ target: ref as any });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Available filters
  const filters = ["All", "React", "Vue.js", "Mobile", "AI", "Backend"];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => {
        // Special case for Mobile filter
        if (activeFilter === "Mobile") {
          return item.tags.some(tag => tag.includes("Native") || tag.includes("Flutter"));
        }
        // Special case for AI filter
        if (activeFilter === "AI") {
          return item.tags.some(tag => tag.includes("ML") || tag.includes("TensorFlow"));
        }
        // Special case for Backend filter
        if (activeFilter === "Backend") {
          return item.tags.some(tag => 
            tag.includes("Node") || 
            tag.includes("Express") || 
            tag.includes("MongoDB") || 
            tag.includes("Django") || 
            tag.includes("GraphQL") || 
            tag.includes("Firebase")
          );
        }
        // Default tag filtering
        return item.tags.includes(activeFilter);
      });
  
  return (
    <>
      <section 
        id="portfolio" 
        ref={ref}
        className={`py-20 md:py-32 relative ${isDark ? 'bg-deep-space' : 'bg-gray-50'} overflow-hidden`}
      >
        {/* Futuristic background elements */}
        <div className="absolute inset-0 cyber-dots opacity-30 pointer-events-none"></div>
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${
          isDark 
            ? 'via-deep-space to-deep-space/80' 
            : 'via-gray-50 to-gray-100/90'
        } pointer-events-none`}></div>
        
        {/* Glowing accents */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-electric-purple/10 filter blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-neon-cyan/10 filter blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ opacity }}
          >
            {/* Decorative header */}
            <div className="flex items-center justify-center mb-4">
              <motion.div 
                className="h-px w-12 bg-neon-cyan/70"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
              <span className="font-code text-neon-cyan mx-4">&lt;portfolio&gt;</span>
              <motion.div 
                className="h-px w-12 bg-neon-cyan/70"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 relative inline-block">
              <span className="relative z-10">Our Work</span>
              <motion.div 
                className="absolute -inset-1 rounded-md bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 blur-md -z-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
            
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Explore our latest projects that showcase our expertise in creating impactful digital experiences.
            </p>
          </motion.div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter, index) => (
              <FilterTag 
                key={filter}
                tag={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                isDark={isDark}
              />
            ))}
          </div>
          
          {/* Project Grid with Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            <AnimatePresence>
              {filteredProjects.map((item, index) => (
                <PortfolioItem 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  onClick={() => {
                    setSelectedProject(item.id);
                    setLocation(`/portfolio/${item.id}`, { replace: true });
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Empty state when no projects match filter */}
          {filteredProjects.length === 0 && (
            <motion.div 
              className="py-20 text-center glass rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-400">No projects match the selected filter.</p>
              <button 
                className="mt-4 px-6 py-2 rounded-md glass border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                onClick={() => setActiveFilter('All')}
              >
                Reset Filters
              </button>
            </motion.div>
          )}
          
          {/* CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.div
                className={`inline-block px-8 py-3 rounded-md glass border border-neon-cyan/30 ${isDark ? 'text-white' : 'text-gray-800'} font-semibold relative group overflow-hidden cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative inline-flex items-center">
                  Start your project with us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            projectId={selectedProject} 
            onClose={() => {
              setSelectedProject(null);
              setLocation('/', { replace: true });
            }} 
          />
        )}
      </AnimatePresence>
    </>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
