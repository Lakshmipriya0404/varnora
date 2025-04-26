import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Zap, 
  Users 
} from 'lucide-react';

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Mia Rodriguez",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Alex Thompson",
    role: "Frontend Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

const About = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section 
      id="about" 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-midnight/80 to-deep-space"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="font-code text-neon-cyan">&lt;about&gt;</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Our Story</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the team behind Glacium and discover our approach to creating meaningful digital experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-lg blur opacity-50"></div>
              <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Glacium team working together" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text inline-block">Innovation meets expertise</h3>
            <p className="text-gray-300 mb-6">
              Founded in 2018, Glacium brings together a diverse team of designers, developers, and digital strategists with a shared passion for creating extraordinary digital experiences.
            </p>
            <p className="text-gray-300 mb-8">
              We believe in pushing the boundaries of what's possible on the web, combining cutting-edge technology with thoughtful design to create solutions that not only look stunning but also perform exceptionally.
            </p>
            
            <div className="space-y-4">
              <motion.div 
                className="glass p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-electric-purple flex items-center justify-center mr-4">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Innovation</h4>
                    <p className="text-sm text-gray-300">Constantly exploring new technologies and approaches</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="glass p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-purple to-neon-cyan flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Performance</h4>
                    <p className="text-sm text-gray-300">Optimized for speed, accessibility, and conversion</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="glass p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-electric-purple flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Collaboration</h4>
                    <p className="text-sm text-gray-300">Working closely with clients throughout the process</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20">
          <motion.h3 
            className="text-2xl font-bold mb-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our Team
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="glass p-4 rounded-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold">{member.name}</h4>
                <p className="text-sm text-neon-cyan">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
