import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AMIT_PHOTO = 'https://miaoda-conversation-file.s3cdn.medo.dev/user-bwrabo2dio74/app-bwraeqkb6p6p/20260526/IMG_8145.jpg';

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

  // Spotlight position as percentages
  const spotX = `${(mousePos.x + 0.5) * 100}%`;
  const spotY = `${(mousePos.y + 0.5) * 100}%`;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20"
    >
      {/* Dynamic blurred background — uses the real photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={AMIT_PHOTO}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top scale-110 grayscale opacity-[0.07] blur-[6px]"
          style={{
            transform: `translate(${mousePos.x * -24}px, ${mousePos.y * -24}px) scale(1.12)`,
          }}
        />
        {/* Fine grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
        {/* Top + bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-7xl w-full px-6">

        {/* ── NAME ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 select-none"
        >
          <h1 className="text-[13vw] md:text-[11vw] font-black tracking-tighter text-white leading-none">
            AMIT KUMAR
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-primary font-mono text-[10px] md:text-sm tracking-[0.45em] uppercase mt-3"
          >
            [ Senior_Software_Engineer ]
          </motion.p>
        </motion.div>

        {/* ── PORTRAIT ── */}
        <motion.div
          className="relative w-[270px] h-[340px] md:w-[400px] md:h-[520px] group mb-16"
          animate={{
            rotateY: mousePos.x * 14,
            rotateX: mousePos.y * -14,
          }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          style={{ perspective: 900 }}
        >
          {/* Photo */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.7)] bg-zinc-900">
            {!imgError ? (
              <img
                src={AMIT_PHOTO}
                alt="Amit Kumar"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />
            ) : (
              /* Fallback initials block if image fails */
              <div className="w-full h-full flex items-center justify-center text-5xl font-black text-white/10 bg-zinc-900">AK</div>
            )}

            {/* Dynamic spotlight that follows cursor inside photo */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${spotX} ${spotY}, transparent 15%, rgba(0,0,0,0.65) 70%)`,
                opacity: isHovered ? 1 : 0.4,
              }}
            />

            {/* Cyan tint wash on hover */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,230,0.12) 0%, transparent 70%)',
                opacity: isHovered ? 1 : 0,
              }}
            />
          </div>

          {/* HUD overlay — only on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden border-2 border-primary/35 shadow-[0_0_24px_rgba(0,255,200,0.18)]"
              >
                {/* Scanning line */}
                <motion.div
                  animate={{ y: ['-4px', '105%'] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-full h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70 shadow-[0_0_8px_rgba(0,255,200,0.9)]"
                />

                {/* Corner HUD labels */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between font-mono text-[8px] text-primary/75">
                  <div className="flex justify-between">
                    <span className="border-t border-l border-primary/40 px-1.5 py-0.5">FACE_LOCK</span>
                    <span className="border-t border-r border-primary/40 px-1.5 py-0.5">SYS_ON</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="border-b border-l border-primary/40 px-1.5 py-0.5">X:{(mousePos.x * 100).toFixed(0)}</span>
                    <span className="border-b border-r border-primary/40 px-1.5 py-0.5">Y:{(mousePos.y * 100).toFixed(0)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <a href="#projects" className="group relative px-10 py-4 overflow-hidden">
            <div className="absolute inset-0 bg-primary group-hover:brightness-110 transition-all text-black" />
            <span className="relative z-10 text-black font-black tracking-tighter uppercase">View_Case_Studies</span>
          </a>
          <a href="#contact" className="group relative px-10 py-4 overflow-hidden">
            <div className="absolute inset-0 border border-white/20 glass group-hover:bg-white/10 transition-colors" />
            <span className="relative z-10 text-white font-black tracking-tighter uppercase">Contact_System</span>
          </a>
        </motion.div>
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
