import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, Activity } from 'lucide-react';

export const AboutStory = () => {
  const milestones = [
    {
      year: 'DEC 2024 - PRESENT',
      role: 'LEAD FULL STACK DEVELOPER',
      company: 'TATA ELXSI',
      desc: 'Directing full-stack web development, handling team collaboration and task assignments, designing complex interactive UI flows, implementing role-based dynamic rendering, and establishing secure session management models.',
      icon: Cpu,
    },
    {
      year: 'JAN 2024 - DEC 2024',
      role: 'SENIOR FULL STACK ENGINEER',
      company: 'PRIMUS GLOBAL TECHNOLOGY',
      desc: 'Architected subscription-based SaaS platforms utilizing Angular and AWS cloud infrastructure. Built state management patterns using NGRX and RxJS, and integrated custom secure payment frameworks.',
      icon: Terminal,
    },
    {
      year: 'OCT 2021 - JAN 2024',
      role: 'SENIOR SYSTEM ENGINEER',
      company: 'INFOSYS LIMITED',
      desc: 'Designed and deployed enterprise-level web applications using Angular, Node.js, and microservice architectures. Built shared UI component libraries reused across multiple project groups.',
      icon: Shield,
    }
  ];

  return (
    <section id="story" className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Mesh gradients */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <div className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4">[ NARRATIVE_TIMELINE ]</div>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
              THE <br /> <span className="text-reveal">EVOLUTION</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed mb-4">
            A chronological trace of building production-grade digital systems and scaling architectures globally.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass p-10 rounded-none border-white/5 relative overflow-hidden"
            >
              <div className="text-[10px] font-mono text-primary mb-6">SYS_SUMMARY // INTEL</div>
              <h3 className="text-2xl font-black tracking-tight mb-4 text-white leading-none">CRAFTING ROBUST INFRASTRUCTURE</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                With 5+ years of professional experience in software development, I work as a Senior Software Developer designing and building digital architectures that reconcile visual excellence with rigorous performance metrics. My approach leverages modern frontends, performant microservices, and autonomous pipelines to yield resilient digital experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-10 border border-white/5 bg-white/[0.01] relative"
            >
              <div className="absolute top-0 left-0 w-2 h-2 bg-primary" />
              <div className="flex items-center space-x-4 mb-4">
                <Activity className="text-primary" size={20} />
                <span className="text-xs font-mono text-white tracking-widest uppercase">SYS_METRICS_STATUS</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-mono">
                CORE_TEMP: NORMAL // LOAD_AVG: 0.12 // RAM_USAGE: 4.8GB / 16GB // DISPATCH_QUEUE: ACTIVE
              </p>
            </motion.div>
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-7 space-y-12 relative before:absolute before:top-4 before:bottom-4 before:left-6 before:w-px before:bg-white/10">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="flex items-start space-x-8 group"
                >
                  {/* Visual Node Pin */}
                  <div className="relative z-10 w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center text-white/70 group-hover:text-primary group-hover:border-primary/45 transition-colors shrink-0">
                    <Icon size={16} />
                  </div>

                  {/* Content block */}
                  <div className="border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.02] p-8 transition-all w-full relative">
                    <div className="text-[10px] font-mono text-primary mb-3">{m.year}</div>
                    <h4 className="text-xl font-bold tracking-tight text-white leading-tight mb-1">{m.role}</h4>
                    <div className="text-xs font-mono text-white/40 mb-4">{m.company}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
export default AboutStory;
