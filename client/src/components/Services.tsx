import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Code, 
  Database, 
  Globe 
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  features, 
  delay 
}) => {
  return (
    <motion.div 
      className="gradient-border p-6 glass rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-neon-cyan to-electric-purple flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="space-y-2 text-sm font-code">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-neon-cyan mr-2">&#8250;</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
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

const Services = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section 
      id="services" 
      ref={ref}
      className="py-20 md:py-32 relative bg-deep-space circuit-pattern"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="font-code text-neon-cyan">&lt;services&gt;</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Our Expertise</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We blend creativity and technology to deliver exceptional digital experiences that drive results.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
