import { useState } from 'react';
import { Mail, ShieldCheck, Wifi } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/icons';
import { PolicyModal } from '@/components/common/PolicyModal';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  return (
    <footer className="border-t border-white/5 bg-background py-16 px-6 relative overflow-hidden">
      {/* Visual background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px)] bg-[size:100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left section: Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-sm font-black tracking-widest text-white mb-2">[ AMIT_KUMAR ]</div>
          <p className="text-xs text-muted-foreground font-mono">
            ENGINEERING HIGH-PERFORMANCE DIGITAL PRODUCTS.
          </p>
        </div>

        {/* Center section: Stats / Metadata */}
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono text-white/40">
          <div className="flex items-center space-x-1.5">
            <Wifi size={10} className="text-primary" />
            <span>PING: 24MS</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck size={10} className="text-primary" />
            <span>SECURE: AES_256</span>
          </div>
          <div>LOC: BANGALORE // IN</div>
        </div>

        {/* Right section: Socials */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/amitlvs"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 transition-all"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/amitkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 transition-all"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:amit.at14@yahoo.com"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 transition-all"
            title="Email"
          >
            <Mail size={16} />
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 text-[10px] font-mono text-white/30">
        <p>&copy; {currentYear} AMIT KUMAR. ALL RIGHTS RESERVED. TRANSMISSION_SECURE.</p>
        <div className="flex space-x-6">
          <button onClick={() => setModalType('terms')} className="hover:text-primary transition-colors">TERM_OF_USE</button>
          <button onClick={() => setModalType('privacy')} className="hover:text-primary transition-colors">PRIVACY_POLICY</button>
        </div>
      </div>

      <PolicyModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        type={modalType || 'terms'} 
      />
    </footer>
  );
};
export default Footer;
