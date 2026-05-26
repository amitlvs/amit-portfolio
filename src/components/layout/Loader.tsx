import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOT_INIT');

  const statusLogs = [
    { threshold: 0, text: 'SECURE_CHANNEL_ESTABLISHED' },
    { threshold: 20, text: 'LOADING_AI_CORES... [OK]' },
    { threshold: 45, text: 'MOUNTING_PORTFOLIO_OBJECTS... [OK]' },
    { threshold: 70, text: 'ESTABLISHING_WEBGL_SCENE... [OK]' },
    { threshold: 90, text: 'HANDSHAKE_COMPLETE' },
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + step, 100);
        
        // Update status text based on progress thresholds
        const currentLog = [...statusLogs]
          .reverse()
          .find((log) => next >= log.threshold);
        if (currentLog) {
          setStatusText(currentLog.text);
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300); // Small buffer for animation to complete
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-white"
    >
      <div className="w-full max-w-md">
        {/* Loading Header */}
        <div className="flex justify-between items-end mb-4 font-mono text-[10px] text-primary">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <span>SYS_BOOT_SEQUENCE</span>
          </div>
          <span>{progress.toFixed(0)}%</span>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden mb-6">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Status Log */}
        <div className="font-mono text-[9px] text-white/50 space-y-1">
          <div className="flex justify-between border-b border-white/5 pb-1">
            <span>COMMAND_PROMPT</span>
            <span>STATUS</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-white/80">amit-os:~$ {statusText}</span>
            <span className="text-primary">[ RUNNING ]</span>
          </div>
          <div className="text-white/30 text-[8px] mt-4 leading-relaxed">
            SYSTEM CORE V2.14 // INTEL_CORE_X // COMPILER: RUST_WASM
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Loader;
