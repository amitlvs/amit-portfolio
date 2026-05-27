import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Lock, Play } from 'lucide-react';
import quberThumbail from "../../assets/quber_thumnail.jpeg";
import stagThumbail from "../../assets/stag_beetle_thumbnail.jpeg";
import quberDemo from '../../assets/quber-demo.mp4';
import stagDemo from '../../assets/stag-beetle-demo.mp4';

const projects = [
  {
    title: 'QUBERFUNDED',
    category: 'PROPRIETARY_TRADING_DASHBOARD',
    image: quberThumbail,
    metrics: 'LIVE_PRODUCTION',
    tagline: 'Capital Without Challenge. Just Pure Payout.',
    tags: ['NEXTJS', 'REACT', 'WEBSOCKETS', 'TAILWIND_CSS', 'CHARTS'],
    link: 'https://www.quberfunded.com/',
    isShareable: true,
    video: quberDemo
  },
  {
    title: 'STAG BEETLE',
    category: 'ECOM_LUXURY_PLATFORM',
    image: stagThumbail,
    metrics: 'LIVE_DEPLOYMENT',
    tagline: 'The Anatomy of Elegance | Headless Commerce Storefront',
    tags: ['NEXTJS', 'REACT', 'SUPABASE', 'TAILWIND_CSS', 'INFINITE_SCROLL'],
    link: 'https://stag-beetle-ecom.vercel.app',
    isShareable: true,
    video: stagDemo
  }
];

const ProjectCard = ({ proj, index }: { proj: typeof projects[0]; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const CardWrapper = proj.isShareable && proj.link ? 'a' : 'div';
  const extraProps = proj.isShareable && proj.link ? {
    href: proj.link,
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.warn("Video play interrupted or blocked:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* @ts-ignore */}
      <CardWrapper
        {...extraProps}
        className={`group flex flex-col justify-between h-full glass border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all p-6 overflow-hidden relative cursor-pointer ${
          !proj.isShareable ? 'cursor-default border-dashed border-white/10' : ''
        }`}
      >
        <div>
          {/* Meta details */}
          <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-white/40">
            <span>PROJECT_INDEX: 0{index + 1} // {proj.category}</span>
            <span className={`font-bold uppercase tracking-wider ${
              proj.isShareable ? 'text-primary' : 'text-red-500 flex items-center gap-1.5'
            }`}>
              {!proj.isShareable && <Lock size={10} />}
              {proj.metrics}
            </span>
          </div>

          {/* Project Image / Video Container */}
          <div
            className="w-full aspect-video overflow-hidden bg-zinc-950 border border-white/10 rounded-lg mb-8 relative group/media"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-full object-contain object-center scale-100 group-hover:scale-102 transition-all duration-700 brightness-75 group-hover:brightness-95"
            />
            {proj.video && (
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                src={proj.video}
              />
            )}

            {proj.isShareable && (
              <div className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-white/80 opacity-60 group-hover:opacity-100 transition-opacity">
                <Play size={12} className="ml-0.5 fill-current" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-60 pointer-events-none z-20" />
          </div>

          {/* Title & Tagline */}
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3 group-hover:text-primary transition-colors leading-tight flex items-center justify-between">
              <span>{proj.title}</span>
              {proj.isShareable ? (
                <ArrowUpRight size={20} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-primary" />
              ) : (
                <Lock size={16} className="opacity-30 group-hover:opacity-60 transition-all text-red-500" />
              )}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-md">{proj.tagline}</p>
          </div>
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
      </CardWrapper>
    </motion.div>
  );
};

export const ImmersiveProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} id="projects" className="py-32 px-6 bg-background relative border-t border-white/5">
      {/* Visual elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

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
          <div className="max-w-sm text-sm leading-relaxed mb-4">
            <p className="text-muted-foreground mb-4">
              A curated list of recently deployed systems, custom client solutions, and cloud architectures.
            </p>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-white/50">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>INTERACTIVE VIDEO PREVIEWS PLAY ON HOVER (5-8S RECOMMENDED LOOP)</span>
            </div>
          </div>
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((proj, i) => (
            <ProjectCard key={i} proj={proj} index={i} />
          ))}
        </div>

        {/* Future projects pipeline placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 border border-dashed border-white/10 bg-white/[0.01] hover:bg-white/[0.02] transition-colors p-8 rounded-xl max-w-3xl mx-auto text-center relative overflow-hidden group"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-primary mb-4 bg-primary/5 border border-primary/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="tracking-wider uppercase">Pipeline Active // More to Come</span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
              ACTIVE DEVELOPMENT & FUTURISTIC SANDBOXES
            </h3>
            
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-xl">
              Several new custom platforms, e-commerce storefronts, and cloud infrastructure systems are currently under active design and staging. Case studies will be unlocked as these production builds go live.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImmersiveProjects;
