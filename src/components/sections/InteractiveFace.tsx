import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import amitPhoto from '../../assets/my-img.png';

const AMIT_PHOTO = amitPhoto;

// ── FLUID HIGH-VISIBILITY CANVAS WORLD MAP (SPREAD ACROSS WHOLE BACKGROUND) ──
const CanvasWorldMap = ({ isHovered }: { isHovered: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // High-DPI (Retina) scaling to make it razor-sharp
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Continent dot coordinates (percentage-based relative to canvas dimensions)
    const dots: {rx: number, ry: number, alpha: number}[] = [];
    const addContinent = (cx: number, cy: number, rx: number, ry: number, density: number) => {
      for (let i = 0; i < density; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random();
        const dx = Math.cos(angle) * rx * r;
        const dy = Math.sin(angle) * ry * r;
        const rxVal = Math.max(0.01, Math.min(0.99, cx + dx));
        const ryVal = Math.max(0.01, Math.min(0.99, cy + dy));
        dots.push({ rx: rxVal, ry: ryVal, alpha: 0.35 + Math.random() * 0.35 });
      }
    };
    
    // Seed relative continent coordinates (spread across the whole page canvas)
    addContinent(0.14, 0.38, 0.08, 0.12, 50); // NA
    addContinent(0.22, 0.72, 0.05, 0.18, 35); // SA
    addContinent(0.44, 0.28, 0.06, 0.10, 30); // Europe
    addContinent(0.48, 0.58, 0.05, 0.15, 35); // Africa
    addContinent(0.66, 0.40, 0.12, 0.15, 75); // Asia
    addContinent(0.85, 0.75, 0.06, 0.08, 30); // Australia
    
    let animationFrameId: number;
    let t = 0;
    
    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      
      // Dynamic scaled Tech Hub coordinates
      const hubs = [
        { name: 'BLR_HQ', x: w * 0.42, y: h * 0.60, pulse: 0 },    // Bengaluru (center-left)
        { name: 'SFO_NODE', x: w * 0.12, y: h * 0.38, pulse: 0.3 },  // San Francisco
        { name: 'LHR_NODE', x: w * 0.30, y: h * 0.32, pulse: 0.6 },  // London
        { name: 'TYO_NODE', x: w * 0.58, y: h * 0.34, pulse: 0.8 },  // Tokyo
        { name: 'IMG_SYS', x: w * 0.78, y: h * 0.50, pulse: 0.5 },   // Under the right photo card area
      ];
      
      // Draw grid dots
      dots.forEach(dot => {
        const x = dot.rx * w;
        const y = dot.ry * h;
        ctx.fillStyle = `rgba(0, 255, 230, ${dot.alpha * (isHovered ? 0.95 : 0.6) * (0.6 + Math.sin(t * 0.02 + x * 0.05) * 0.4)})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw curves
      const center = hubs[0];
      hubs.slice(1).forEach((hub, i) => {
        ctx.strokeStyle = isHovered ? 'rgba(0, 255, 230, 0.28)' : 'rgba(0, 255, 230, 0.14)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        
        const mx = (center.x + hub.x) / 2;
        const my = (center.y + hub.y) / 2 - 40;
        ctx.quadraticCurveTo(mx, my, hub.x, hub.y);
        ctx.stroke();
        
        // Travel particle
        const speed = isHovered ? 0.007 : 0.004;
        const progress = (t * speed + i * 0.25) % 1;
        const px = (1 - progress) * (1 - progress) * center.x + 2 * (1 - progress) * progress * mx + progress * progress * hub.x;
        const py = (1 - progress) * (1 - progress) * center.y + 2 * (1 - progress) * progress * my + progress * progress * hub.y;
        
        ctx.fillStyle = '#00ffe6';
        ctx.beginPath();
        ctx.arc(px, py, isHovered ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.shadowColor = '#00ffe6';
        ctx.shadowBlur = isHovered ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Draw hubs
      hubs.forEach(hub => {
        const pulseMax = isHovered ? 18 : 10;
        const pulse = (t * (isHovered ? 0.05 : 0.03) + hub.pulse * 8) % pulseMax;
        ctx.fillStyle = hub.name === 'BLR_HQ' ? '#00ffe6' : 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hub.name === 'BLR_HQ' ? 2.5 : 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = hub.name === 'BLR_HQ' ? 'rgba(0, 255, 230, 0.5)' : 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, pulse, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '6px monospace';
        ctx.fillText(hub.name, hub.x + 6, hub.y - 2);
      });
      
      t++;
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none select-none transition-opacity duration-1000 z-0 ${
        isHovered ? 'opacity-85' : 'opacity-60'
      }`} 
    />
  );
};

// ── MAIN INTERACTIVE FACE HERO SECTION ──
export const InteractiveFace = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const spotX = `${(mousePos.x + 0.5) * 100}%`;
  const spotY = `${(mousePos.y + 0.5) * 100}%`;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen flex flex-col xl:flex-row items-center justify-between overflow-hidden bg-background xl:py-0"
    >
      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dynamic blurred background image */}
        <img
          src={AMIT_PHOTO}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top scale-110 grayscale opacity-[0.03] blur-[8px]"
          style={{
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(1.1)`,
          }}
        />
        {/* Fine grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
        {/* Top + bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* ── BACKGROUND ANIMATED WORLD NETWORK MAP ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <CanvasWorldMap isHovered={isHovered} />
      </div>

      {/* ── LEFT COLUMN: TYPOGRAPHY (CLEAN & SPACIOUS) ── */}
      <div className="relative z-10 w-full xl:w-[55%] flex flex-col items-center xl:items-start text-center xl:text-left px-6 py-24 xl:py-0 xl:pl-20 select-none gap-10 mt-20 xl:mt-0">
        
        {/* Name and Title */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <h1 className="text-[12vw] xl:text-[6.5vw] font-black tracking-tighter text-white leading-none">
            AMIT KUMAR
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-primary font-mono text-[10px] md:text-sm tracking-[0.45em] uppercase mt-4"
          >
            [ Senior_Software_Developer ]
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-6 items-center w-full justify-center xl:justify-start"
        >
          <a href="#projects" className="group relative px-10 py-4 overflow-hidden">
            <div className="absolute inset-0 bg-primary group-hover:brightness-110 transition-all text-black" />
            <span className="relative z-10 text-black font-black tracking-tighter uppercase font-bold text-xs tracking-wider">View_Case_Studies</span>
          </a>
          <a href="#contact" className="group relative px-10 py-4 overflow-hidden">
            <div className="absolute inset-0 border border-white/20 glass group-hover:bg-white/10 transition-colors" />
            <span className="relative z-10 text-white font-black tracking-tighter uppercase font-bold text-xs tracking-wider">Contact_System</span>
          </a>
        </motion.div>

      </div>

      {/* ── RIGHT COLUMN: PORTRAIT IMAGE (NO OVERLAP, TOUCHES HEADER ON DESKTOP) ── */}
      <div className="relative w-full xl:w-[45%] h-[50vh] xl:h-screen flex items-start justify-center xl:justify-end select-none overflow-hidden z-20 xl:absolute xl:right-0 xl:top-0">
        <motion.div
          className={`relative w-full max-w-[340px] h-[450px] md:max-w-[450px] md:h-[600px] xl:max-w-none xl:w-[90%] xl:h-full border rounded-[32px] xl:rounded-none xl:rounded-bl-[120px] overflow-hidden bg-zinc-950/15 backdrop-blur-[2.5px] transition-all duration-700 ${
            isHovered ? 'border-primary/45 shadow-[0_0_45px_rgba(0,255,230,0.18)] bg-zinc-950/30' : 'border-white/[0.08] shadow-none'
          }`}
          animate={{
            rotateY: mousePos.x * 6,
            rotateX: mousePos.y * -6,
            y: mousePos.y * -5,
            x: mousePos.x * -5,
          }}
          transition={{ type: 'spring', stiffness: 85, damping: 20 }}
          style={{ perspective: 1000 }}
        >
          {/* Glossy light sweep shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none z-10"
            initial={{ x: '-100%', y: '-100%' }}
            animate={isHovered ? { x: '100%', y: '100%' } : { x: '-100%', y: '-100%' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          {/* CRT Scanline Grid Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay transition-opacity duration-500"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 255, 230, 0.25) 50%)',
              backgroundSize: '100% 4px',
              opacity: isHovered ? 0.25 : 0.08,
            }}
          />

          {/* Glass corner bracket accents with dynamic scale */}
          <motion.div 
            animate={isHovered ? { scale: 0.95 } : { scale: 1 }}
            className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-white/20 pointer-events-none z-10 transition-colors duration-500"
            style={{ borderColor: isHovered ? 'var(--primary)' : 'rgba(255,255,255,0.2)' }}
          />
          <motion.div 
            animate={isHovered ? { scale: 0.95 } : { scale: 1 }}
            className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-white/20 pointer-events-none z-10 transition-colors duration-500"
            style={{ borderColor: isHovered ? 'var(--primary)' : 'rgba(255,255,255,0.2)' }}
          />
          <motion.div 
            animate={isHovered ? { scale: 0.95 } : { scale: 1 }}
            className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-white/20 pointer-events-none z-10 transition-colors duration-500"
            style={{ borderColor: isHovered ? 'var(--primary)' : 'rgba(255,255,255,0.2)' }}
          />
          <motion.div 
            animate={isHovered ? { scale: 0.95 } : { scale: 1 }}
            className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-white/20 pointer-events-none z-10 transition-colors duration-500"
            style={{ borderColor: isHovered ? 'var(--primary)' : 'rgba(255,255,255,0.2)' }}
          />

          {/* Image container with animated radial mask */}
          <div 
            className="w-full h-full relative transition-all duration-700"
            style={{
              maskImage: isHovered 
                ? 'radial-gradient(ellipse 95% 95% at 50% 50%, black 65%, transparent 100%)' 
                : 'radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 95%)',
              WebkitMaskImage: isHovered 
                ? 'radial-gradient(ellipse 95% 95% at 50% 50%, black 65%, transparent 100%)' 
                : 'radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 95%)',
            }}
          >
            {!imgError ? (
              <motion.img
                src={AMIT_PHOTO}
                alt="Amit Kumar Portrait"
                onError={() => setImgError(true)}
                animate={{
                  x: mousePos.x * -16,
                  y: mousePos.y * -16,
                }}
                transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                className={`w-full h-full object-cover object-top transition-all duration-1000 ease-out ${
                  isHovered ? 'grayscale-0 brightness-95 contrast-105 scale-105' : 'grayscale brightness-75 contrast-95 scale-100'
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl font-black text-white/5 bg-zinc-900">AK</div>
            )}

            {/* Dynamic spotlight */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at ${spotX} ${spotY}, transparent 20%, rgba(5,5,7,0.7) 85%)`,
                opacity: isHovered ? 0.9 : 0.5,
              }}
            />

            {/* Cyan tint wash */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{
                background: 'radial-gradient(ellipse at 50% 10%, rgba(0,255,230,0.06) 0%, transparent 80%)',
                opacity: isHovered ? 1 : 0,
              }}
            />
          </div>

          {/* HUD overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
              >
                <motion.div
                  animate={{ y: ['-4px', '105%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-full h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 shadow-[0_0_8px_rgba(0,255,200,0.7)]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Custom Curve Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-background fill-current">
          <path d="M0,0 C150,90 350,120 600,100 C850,80 1050,90 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* Custom cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 border border-primary rounded-full z-50 pointer-events-none hidden md:block"
        animate={{
          x: mousePos.x * 200 + (typeof window !== 'undefined' ? window.innerWidth / 2 : 760) - 10,
          y: mousePos.y * 200 + (typeof window !== 'undefined' ? window.innerHeight / 2 : 400) - 10,
          scale: isHovered ? 2.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 22, mass: 0.08 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-primary rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveFace;
