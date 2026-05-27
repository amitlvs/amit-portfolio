import { X } from 'lucide-react';
import { useEffect } from 'react';


interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export const PolicyModal = ({ isOpen, onClose, type }: PolicyModalProps) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-zinc-950 border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl glass flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              {isTerms ? 'System_Protocol // Terms_of_Use' : 'Data_Security // Privacy_Policy'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="space-y-6 text-sm text-white/70 leading-relaxed font-sans pr-2">
          {isTerms ? (
            <>
              <h2 className="text-xl font-black text-white tracking-tight uppercase">TERMS OF USE</h2>
              <p className="text-[11px] font-mono text-white/40">LAST UPDATED: MAY 27, 2026</p>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">01. ACCEPTANCE OF TERMS</h3>
                <p>
                  By accessing and navigating this portfolio (the &quot;Site&quot;), you acknowledge and agree to abide by these Terms of Use and all applicable local, national, and international laws.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">02. INTELLECTUAL PROPERTY</h3>
                <p>
                  All components, source code representations, graphics, custom interactive canvas layouts, and narrative assets displayed on this Site are the property of Amit Kumar. Select company names, logos, or client product details are copyrighted by their respective owners and are displayed here solely for project illustration purposes.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">03. USE OF CODE &amp; REPOSITORIES</h3>
                <p>
                  Any repository snippets or design patterns shared through external links (such as GitHub) are subject to their respective open-source or proprietary license agreements. Unauthorized replication of the proprietary visual systems of this portfolio site is prohibited.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">04. DISCLAIMERS</h3>
                <p>
                  All project case studies, metrics (such as LIVE_PRODUCTION statuses), and technical descriptions are provided for professional evaluation purposes &quot;as is&quot; without direct guarantees of current system availability. External links lead to client platforms which are owned, operated, and maintained by third parties.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">05. LIMITATION OF LIABILITY</h3>
                <p>
                  Amit Kumar shall not be held liable for any damages resulting from server downtime, browser-side canvas execution anomalies, or direct interactions with external websites linked on the Site.
                </p>
              </section>
            </>
          ) : (
            <>
              <h2 className="text-xl font-black text-white tracking-tight uppercase">PRIVACY POLICY</h2>
              <p className="text-[11px] font-mono text-white/40">LAST UPDATED: MAY 27, 2026</p>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">01. INFORMATION COLLECTION</h3>
                <p>
                  This Site collects standard identification details that you voluntarily submit through the contact form (specifically your Name, Email Address, and Message payload). We do not collect passive location data or tracking cookies beyond standard server-side routing headers.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">02. PURPOSE OF DATA PROCESSING</h3>
                <p>
                  Submitted data is strictly used to evaluate your inquiries and communicate regarding project collaborations. It will never be sold, leased, or distributed for third-party commercial marketing.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">03. DUAL-CHANNEL STORAGE &amp; TRANSMISSION</h3>
                <p>
                  Your messages are securely stored in our cloud-backed Supabase database table and routed via SSL transmission. Inquiries may also be processed via the Web3Forms API to send real-time email notifications directly to the administrator.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">04. THIRD-PARTY LINKS &amp; WHATSAPP</h3>
                <p>
                  This Site includes links to LinkedIn and WhatsApp Business. Engaging with WhatsApp starts direct message routing through WhatsApp Business systems. Please refer to their respective terms and privacy policies regarding message encryption.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-mono text-xs text-primary uppercase tracking-wider">05. SECURITY PROTOCOLS</h3>
                <p>
                  We deploy industry-standard database row-level security (RLS), SSL communication pipelines, and security rules auditing to prevent unauthorized database read/write actions on user contact submissions.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
