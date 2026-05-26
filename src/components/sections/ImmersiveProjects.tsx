import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'TATVALENS.COM',
    category: 'LIVE_PRODUCTION_PORTAL',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_b16671f2-35d1-4537-904d-3619085b4f59.jpg',
    metrics: '99.9_UPTIME_RATE',
    tags: ['REACT', 'AI_INTEGRATION', 'CLEAN_ARCH']
  },
  {
    title: 'SaaS_TE_FRAMEWORK',
    category: 'CLOUD_SAAS_INFRA',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_c28b6d6d-7ec5-431f-8768-65781a807aa4.jpg',
    metrics: '50_DEPL_REDUCTION',
    tags: ['ANGULAR', 'AWS_S3', 'AWS_SNS', 'CI_CD']
  },
  {
    title: 'REGENALL_HEALTH',
    category: 'AI_HEALTHCARE_TRACKER',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_94c047b0-4847-43c3-a0bc-4ee77ace74af.jpg',
    metrics: 'SECURE_ROLE_AUTH',
    tags: ['ANGULAR', 'NGRX', 'RXJS', 'PAYMENTS']
  },
  {
    title: 'FEDEX_ROCS_SYSTEM',
    category: 'ENTERPRISE_LOGISTICS',
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_bdd3e7c7-889b-4fc9-80a5-6b71ee20bbd8.jpg',
    metrics: '40_DEPLOY_SPEEDUP',
    tags: ['ANGULAR', 'NODEJS', 'MICROSERVICES']
  }
];

export const ImmersiveProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} id="projects" className="py-32 px-6 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4">[ CASE_STUDIES ]</div>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-white">
              SELECTED <br /> <span className="text-reveal">PROJECTS</span>
            </h2>
          </motion.div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed mb-4">
            A curated list of recently deployed systems, APIs, and client storefront architectures.
          </p>
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group flex flex-col justify-between glass border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all p-6 overflow-hidden relative"
            >
              <div>
                {/* Meta details */}
                <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-white/40">
                  <span>PROJECT_INDEX: 0{i + 1} // {proj.category}</span>
                  <span className="text-primary font-bold uppercase tracking-wider">{proj.metrics}</span>
                </div>

                {/* Project Image */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-zinc-900 border border-white/10 rounded-lg mb-8 relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-all duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-black tracking-tight text-white mb-4 group-hover:text-primary transition-colors leading-none flex items-center justify-between">
                  <span>{proj.title}</span>
                  <ArrowUpRight size={24} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono text-white/50 bg-white/5 border border-white/5 px-2.5 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default ImmersiveProjects;
