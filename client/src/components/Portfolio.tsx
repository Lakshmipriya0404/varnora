import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface PortfolioItemProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

const portfolioItems = [
  {
    title: "Nova E-commerce Platform",
    description: "Modern e-commerce experience with dynamic product filtering and AR try-on feature.",
    tags: ["React", "Node.js", "Shopify"],
  },
  {
    title: "Pulse Financial Dashboard",
    description: "Interactive financial analytics platform with real-time data visualization.",
    tags: ["Vue.js", "D3.js", "Express"],
  },
  {
    title: "Horizon Travel App",
    description: "Travel planning application with personalized recommendations and immersive experiences.",
    tags: ["React Native", "Firebase", "ML Kit"],
  },
  {
    title: "Nexus Workspace",
    description: "Collaborative platform with real-time document editing and team management tools.",
    tags: ["Next.js", "Socket.io", "MongoDB"],
  },
  {
    title: "Vitality Health Platform",
    description: "Fitness tracking system with personalized workout plans and nutrition guidance.",
    tags: ["Flutter", "GraphQL", "Django"],
  },
  {
    title: "Insight Analytics",
    description: "Business intelligence platform with AI-powered data analysis and reporting tools.",
    tags: ["Angular", "Python", "TensorFlow"],
  }
];

const PortfolioItem: React.FC<PortfolioItemProps> = ({ title, description, tags, index }) => {
  // Placeholder images for the portfolio items
  const placeholderImages = [
    "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  ];

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="aspect-w-16 aspect-h-10 w-full h-64 overflow-hidden">
        <img 
          src={placeholderImages[index % placeholderImages.length]} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section 
      id="portfolio" 
      ref={ref}
      className="py-20 md:py-32 bg-midnight/50"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="font-code text-neon-cyan">&lt;portfolio&gt;</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Our Work</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our latest projects that showcase our expertise in creating impactful digital experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolioItems.map((item, index) => (
            <PortfolioItem 
              key={index} 
              title={item.title} 
              description={item.description} 
              tags={item.tags} 
              index={index} 
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <a 
            href="#contact" 
            className="inline-block px-8 py-3 rounded-md glass border border-neon-cyan/30 text-white font-semibold hover:bg-neon-cyan/10 transition-all"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start your project with us
          </a>
        </motion.div>
      </div>
    </section>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
