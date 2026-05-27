import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu } from 'lucide-react';

// ── SYSTEM TICKER WIDGET ──
const TickerPanel = ({ uptime, time }: { uptime: string; time: string }) => {
  return (
    <div className="glass border border-white/10 rounded-xl p-5 flex flex-col w-full h-[190px] font-mono justify-between bg-zinc-950/20">
      <div className="w-full flex items-center justify-between text-[8px] text-white/50 border-b border-white/5 pb-1.5">
        <span>SYS_STATUS // DATA_PULSE</span>
        <span className="text-primary animate-pulse">● RUNNING</span>
      </div>
      
      <div className="flex flex-col gap-2.5 my-2">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-white/40">SYS_UPTIME:</span>
          <span className="text-[11px] text-primary font-bold tracking-wider">{uptime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-white/40">LOC_TIME_IST:</span>
          <span className="text-[11px] text-white tracking-wider">{time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-white/40">LATENCY:</span>
          <span className="text-[11px] text-emerald-400 font-bold">14ms</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-white/40">PORTFOLIO_VER:</span>
          <span className="text-[11px] text-white/70">v2.2.0-prod</span>
        </div>
      </div>
      
      <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
        <motion.div 
          className="bg-primary h-full"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
};

// ── TERMINAL LOGS WIDGET ──
const TerminalLogsPanel = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const logPool = [
      'INIT_SECURITY_HANDSHAKE... SUCCESS',
      'ESTABLISHING SECURE CONNECTION TO SUPABASE',
      'DB_POOLED: LOADED 10 APPAREL ITEMS',
      'API_ROUTE //GET /api/products - 200 OK',
      'PORTFOLIO_STATE // MOUNTED // READY',
      'COMPILING STYLESHEETS // VITE-REPORTER',
      'PRE-FETCHING ASSETS: my-img.png [OK]',
      'ANALYZE_VISITOR: TARGET LOCKED',
      'SYSTEM STATUS: STABLE // LATENCY 14MS',
      'AI_AGENT // ORCHESTRATION ENGINE ONLINE'
    ];
    
    setLogs(logPool.slice(0, 3));
    
    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setLogs(prev => {
        const next = [...prev.slice(1), `[${new Date().toLocaleTimeString()}] ${randomLog}`];
        return next;
      });
    }, 4500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="glass border border-white/10 rounded-xl p-5 flex flex-col w-full h-[190px] font-mono justify-between bg-zinc-950/20 text-left">
      <div className="w-full flex items-center justify-between text-[8px] text-white/50 border-b border-white/5 pb-1.5">
        <span>SYS_CONSOLE // STDOUT</span>
        <span className="text-emerald-400 font-bold">ACTIVE</span>
      </div>
      <div className="flex flex-col gap-1.5 my-2 flex-grow overflow-hidden text-[9px] text-white/70">
        {logs.map((log, index) => (
          <div key={index} className="truncate select-none font-mono text-emerald-400/90">
            <span className="text-white/30">&gt; </span>
            {log}
          </div>
        ))}
      </div>
      <div className="text-[7px] text-white/30 font-mono text-right select-none">
        STREAMING_LOGS_ON_PORT_80
      </div>
    </div>
  );
};

// ── MAIN ABOUTSTORY SECTION ──
export const AboutStory = () => {
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState('');

  // Update Ticker Times
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      // @ts-ignore
      setTime(now.toLocaleTimeString('en-US', options));
      
      const diff = Date.now() - startTime;
      const hrs = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      const ms = Math.floor((diff % 1000) / 10).toString().padStart(2, '0');
      setUptime(`${hrs}:${mins}:${secs}.${ms}`);
    }, 50);
    return () => clearInterval(interval);
  }, []);

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
    <section id="story" className="py-32 px-6 bg-background relative overflow-hidden border-t border-white/5">
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
          
          {/* Narrative & Active Diagnostics Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
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

            {/* Diagnostic Ticker Panels (Moved here for clean first-view page structure) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row lg:flex-col gap-6 w-full"
            >
              <TickerPanel uptime={uptime} time={time} />
              <TerminalLogsPanel />
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
