import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Clock, ChevronRight, Users, ExternalLink, Share2, Link as LinkIcon } from 'lucide-react';
import { portfolioItems } from '@/components/Portfolio';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Type for route parameters
interface Params {
  projectId: string;
}

const ProjectDetail = () => {
  const { projectId } = useParams<Params>();
  const [, setLocation] = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Find the project based on the ID from the URL
  const project = portfolioItems.find(item => item.id === projectId);
  
  // State for the currently visible tab
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'results'>('overview');
  
  // If project not found, redirect to 404
  useEffect(() => {
    if (!project && projectId) {
      setLocation('/not-found');
    }
  }, [project, projectId, setLocation]);
  
  if (!project) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center ${isDark ? 'bg-deep-space' : 'bg-gray-100'}`}>
        <div className="w-20 h-20 rounded-full border-4 border-t-neon-cyan border-r-electric-purple border-b-neon-cyan border-l-electric-purple animate-spin"></div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className={`${isDark ? 'bg-deep-space' : 'bg-gradient-to-b from-blue-50 to-gray-100'} min-h-screen`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <div className="relative h-[60vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDark 
            ? 'from-deep-space via-deep-space/80' 
            : 'from-blue-50 via-blue-50/80 to-transparent'
        }`}></div>
        
        {/* Back to portfolio button */}
        <div className="absolute top-8 left-8 z-10">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setLocation('/')}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Portfolio</span>
          </motion.button>
        </div>
        
        {/* Project Title Area */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <span className="font-code text-neon-cyan text-sm mb-2 block">{project.tags.join(" · ")}</span>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">{project.title}</h1>
            <h2 className={`text-xl md:text-2xl ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{project.subtitle}</h2>
          </div>
        </div>
        
        {/* Futuristic decorative elements */}
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-electric-purple/20 filter blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-neon-cyan/20 filter blur-[100px] pointer-events-none"></div>
      </div>
      
      {/* Project Metadata */}
      <div className="container mx-auto px-6 py-10">
        <div className="glass rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-neon-cyan/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Timeline</h3>
              <p className={isDark ? "text-white/70" : "text-gray-600"}>{project.timeline}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-electric-purple/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-electric-purple" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Team</h3>
              <p className={isDark ? "text-white/70" : "text-gray-600"}>{project.team}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-neon-cyan/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Key Result</h3>
              <p className={isDark ? "text-white/70" : "text-gray-600"}>{project.results[0]}</p>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto space-x-6 mb-8 pb-2">
          <TabButton 
            isActive={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<ExternalLink className="w-4 h-4" />}
          >
            Overview
          </TabButton>
          <TabButton 
            isActive={activeTab === 'details'} 
            onClick={() => setActiveTab('details')}
            icon={<LinkIcon className="w-4 h-4" />}
          >
            Project Details
          </TabButton>
          <TabButton 
            isActive={activeTab === 'results'} 
            onClick={() => setActiveTab('results')}
            icon={<Share2 className="w-4 h-4" />}
          >
            Results & Impact
          </TabButton>
        </div>
        
        {/* Tab Content */}
        <div className="mb-20">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 gradient-text">Project Overview</h2>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'} mb-8`}>
                    {project.fullDescription}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3">The Challenge</h3>
                      <p className={isDark ? 'text-white/70' : 'text-gray-600'}>{project.challenge}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3">Our Solution</h3>
                      <p className={isDark ? 'text-white/70' : 'text-gray-600'}>{project.solution}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className={`rounded-lg overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-300/30'}`}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <div className="glass rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 gradient-text">Project Highlights</h3>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5 mr-2" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="glass rounded-lg p-8 border-l-4 border-electric-purple max-w-3xl mx-auto">
                <blockquote className="text-lg italic mb-4">"{project.testimonial.text}"</blockquote>
                <footer className={`text-right ${isDark ? 'text-white/70' : 'text-gray-600'}`}>— {project.testimonial.author}</footer>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">Technical Implementation</h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'} mb-8`}>
                  Our approach to implementing {project.title} involved leveraging the latest technologies and methodologies to create a robust, scalable solution that met all the client's requirements.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="glass rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                    <ul className="space-y-3">
                      {project.tags.map((tag, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center mr-3">
                            <span className="text-neon-cyan font-bold">{idx + 1}</span>
                          </div>
                          <span>{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="glass rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Development Approach</h3>
                    <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} mb-4`}>
                      We followed an agile methodology, working in close collaboration with the client throughout the development process. This allowed us to adapt quickly to changing requirements and deliver incremental value.
                    </p>
                    <p className={isDark ? 'text-white/70' : 'text-gray-600'}>
                      The project was completed in {project.timeline.split(' ')[0]} sprints, with regular client reviews and feedback sessions to ensure alignment with project goals.
                    </p>
                  </div>
                </div>
                
                <div className="glass rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className={`glass p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-blue-50/30'}`}>
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-electric-purple flex items-center justify-center flex-shrink-0 mr-3">
                            <span className="font-bold text-white">{idx + 1}</span>
                          </div>
                          <div>
                            <p className={isDark ? '' : 'text-gray-700'}>{highlight}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">Project Outcomes</h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'} mb-8`}>
                  The implementation of {project.title} delivered significant value to the client, exceeding expectations across multiple key performance indicators.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {project.results.map((result, idx) => (
                    <div key={idx} className={`glass rounded-lg p-6 text-center ${isDark ? '' : 'bg-blue-50/30'}`}>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-electric-purple mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{idx + 1}</span>
                      </div>
                      <p className={`text-lg font-semibold ${isDark ? '' : 'text-gray-700'}`}>{result}</p>
                    </div>
                  ))}
                </div>
                
                <div className={`glass rounded-lg p-6 mb-12 ${isDark ? '' : 'bg-gradient-to-br from-blue-50/20 to-white/80'}`}>
                  <h3 className="text-xl font-bold mb-4">Impact Analysis</h3>
                  <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} mb-4`}>
                    The solution significantly improved the client's operational efficiency and customer satisfaction metrics. Key improvements include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5 mr-2" />
                      <span className={isDark ? '' : 'text-gray-700'}>Enhanced user engagement and satisfaction</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5 mr-2" />
                      <span className={isDark ? '' : 'text-gray-700'}>Streamlined internal processes and workflows</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5 mr-2" />
                      <span className={isDark ? '' : 'text-gray-700'}>Improved data-driven decision making</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5 mr-2" />
                      <span className={isDark ? '' : 'text-gray-700'}>Increased revenue and market share</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Client Testimonial</h3>
                  <div className={`glass rounded-lg p-8 border-l-4 border-electric-purple ${isDark ? '' : 'bg-blue-50/20'}`}>
                    <blockquote className={`text-lg italic mb-4 ${isDark ? '' : 'text-gray-700'}`}>"{project.testimonial.text}"</blockquote>
                    <footer className={`text-right ${isDark ? 'text-white/70' : 'text-gray-600'}`}>— {project.testimonial.author}</footer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* More Projects Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems
              .filter(item => item.id !== project.id)
              .slice(0, 3)
              .map((relatedProject, idx) => (
                <div 
                  key={idx} 
                  className="glass rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => {
                    setLocation(`/portfolio/${relatedProject.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProject.image} 
                      alt={relatedProject.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{relatedProject.title}</h3>
                    <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} mb-4 line-clamp-2`}>{relatedProject.description}</p>
                    <div className="flex items-center text-neon-cyan group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-bold">View Project</span>
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">Start Your Project With Us</h2>
          <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}>
            Ready to bring your digital vision to life? Let's create something extraordinary together.
          </p>
          <motion.a 
            href="#contact" 
            className="inline-block px-8 py-3 rounded-md animate-gradient text-white font-semibold relative group overflow-hidden"
            onClick={(e) => {
              e.preventDefault();
              setLocation('/');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative">Get in Touch</span>
          </motion.a>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

// Tab button component
interface TabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ children, isActive, onClick, icon }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <button
      className={`flex items-center whitespace-nowrap px-4 py-2 rounded-md transition-all ${
        isActive 
          ? 'bg-gradient-to-r from-neon-cyan to-electric-purple text-white' 
          : isDark
            ? 'glass text-white/70 hover:text-white hover:bg-white/10'
            : 'glass text-gray-700 hover:text-gray-900 hover:bg-gray-200/30'
      }`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default ProjectDetail;