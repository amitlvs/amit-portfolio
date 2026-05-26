import { motion } from 'framer-motion';

const techStack = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Shopify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
];

export const TechStack = () => {
  return (
    <section className="py-24 bg-card/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Tech <span className="text-primary">Ecosystem</span>
        </motion.h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Leveraging modern technologies to build scalable, high-performance applications.
        </p>
      </div>

      <div className="flex flex-col space-y-12">
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex space-x-12 whitespace-nowrap py-4"
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 glass px-8 py-4 rounded-2xl hover:bg-primary/10 transition-colors border-white/5"
              >
                <img src={tech.icon} alt={tech.name} className="w-8 h-8 filter brightness-0 invert" />
                <span className="text-lg font-bold tracking-tight text-white">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex space-x-12 whitespace-nowrap py-4"
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 glass px-8 py-4 rounded-2xl hover:bg-primary/10 transition-colors border-white/5"
              >
                <img src={tech.icon} alt={tech.name} className="w-8 h-8 filter brightness-0 invert" />
                <span className="text-lg font-bold tracking-tight text-white">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default TechStack;
