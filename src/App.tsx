import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Loader } from '@/components/layout/Loader';
import { InteractiveFace } from '@/components/sections/InteractiveFace';
import { AboutStory } from '@/components/sections/AboutStory';
import { ImmersiveProjects } from '@/components/sections/ImmersiveProjects';
import { TechStack } from '@/components/sections/TechStack';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { Linkedin, Whatsapp } from '@/components/ui/icons';
import { supabase } from '@/db/supabase';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('submitting');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      let supabaseSuccess = false;

      // 1. Try saving to Supabase if config is active
      if (
        import.meta.env.VITE_SUPABASE_URL &&
        import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder-url.supabase.co'
      ) {
        const { error } = await supabase.from('contact_messages').insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);
        if (!error) supabaseSuccess = true;
      }

      // 2. Try sending email via Web3Forms
      if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE') {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Message from ${formData.name}`,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setFormStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setFormStatus('idle'), 4000);
        } else {
          setFormStatus('error');
          setTimeout(() => setFormStatus('idle'), 4000);
        }
      } else if (supabaseSuccess) {
        // If Supabase worked but email API is not configured
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        // Mock fallback success for testing when no keys are configured
        console.warn("Contact form submitted. Set VITE_WEB3FORMS_ACCESS_KEY in env to receive emails.");
        setTimeout(() => {
          setFormStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setFormStatus('idle'), 4000);
        }, 1000);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <SmoothScrollProvider>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-background text-foreground"
        >
          <Navbar />

          <main>
            {/* Hero Scene */}
            <InteractiveFace />

            {/* About Narrative */}
            <AboutStory />

            {/* Project Showcase */}
            <ImmersiveProjects />

            {/* Skills Ecosystem */}
            <TechStack />

            {/* Services Section */}
            <section id="services" className="py-32 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
                  <div>
                    <div className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4">[ SOLUTIONS_MATRIX ]</div>
                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
                      ELITE <br /> <span className="text-reveal">SERVICES</span>
                    </h2>
                  </div>
                  <p className="text-muted-foreground max-w-sm text-sm leading-relaxed mb-4">
                    Deploying production-grade architectures and high-impact digital products across the global market.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                  {[
                    {
                      title: 'FULLSTACK_SYSTEMS',
                      desc: 'Scalable backend architectures and high-performance frontends. Focused on React, Next.js, Node.js, and specialized cloud infrastructure.',
                      tags: ['Architecture', 'Scalability', 'Security']
                    },
                    {
                      title: 'AI_ARCHITECTURES',
                      desc: 'Custom LLM integration, autonomous AI agents, and specialized automation pipelines to revolutionize business workflows.',
                      tags: ['LangChain', 'OpenAI', 'Automation']
                    },
                    {
                      title: 'ECOM_ECOSYSTEMS',
                      desc: 'High-converting Shopify stores and custom headless commerce platforms designed for luxury brands and global enterprises.',
                      tags: ['Shopify', 'Headless', 'Conversion']
                    },
                    {
                      title: 'STARTUP_ENGINEERING',
                      desc: 'Rapid MVP development with a focus on product-market fit and a technical foundation capable of scaling to millions.',
                      tags: ['Rapid_Prototyping', 'Venture_Scale', 'Agile']
                    },
                    {
                      title: 'REALTIME_DYNAMICS',
                      desc: 'Low-latency collaborative systems, specialized WebSocket protocols, and real-time data streaming architectures.',
                      tags: ['Socket.io', 'WebRTC', 'Low_Latency']
                    },
                    {
                      title: 'CLOUD_OPERATIONS',
                      desc: 'Modern DevOps practices, Dockerized microservices, and specialized AWS/Azure deployments with zero-downtime CI/CD.',
                      tags: ['AWS', 'Docker', 'Kubernetes']
                    }
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 sm:p-12 bg-background hover:bg-white/[0.02] transition-colors group relative overflow-hidden"
                    >
                      <div className="text-[10px] font-mono text-primary mb-6 sm:mb-12">NODE_ID: {i + 1001}</div>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tighter mb-6 group-hover:neon-text transition-all leading-none break-words">{s.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8">{s.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-mono text-white/30 border border-white/5 px-2 py-1">#{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Scene */}
            <section id="contact" className="py-32 px-6 relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-20 pointer-events-none" />

              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="text-xs font-mono tracking-[0.5em] text-primary uppercase mb-4">[ CONNECTION_INIT ]</div>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-12">
                    LET'S <br /> <span className="text-reveal">EXECUTE.</span>
                  </h2>
                  <div className="space-y-8">
                    <div className="flex items-center space-x-6 group">
                      <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Email_Address</div>
                        <a href="mailto:amit.at14@yahoo.com" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">amit.at14@yahoo.com</a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                        <Linkedin size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Professional_Network</div>
                        <a href="https://linkedin.com/in/amitkumar" target="_blank" rel="noopener noreferrer" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">linkedin.com/in/amitkumar</a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                        <Whatsapp size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">WhatsApp_Business</div>
                        <a
                          href="https://wa.me/918550000499?text=Hi%20Amit,%20I'm%20interested%20in%20your%20services!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
                        >
                          +91 8550000499
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Base_Location</div>
                        <div className="text-xl font-bold tracking-tight">Bangalore, Karnataka, India</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="holographic p-6 sm:p-8 md:p-12 relative overflow-hidden"
                >
                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-primary uppercase tracking-widest">User_Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border-b border-white/20 px-4 py-4 focus:border-primary focus:bg-white/10 outline-none transition-all text-xl font-bold text-white"
                          placeholder="IDENTIFY_YOURSELF"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-primary uppercase tracking-widest">User_Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border-b border-white/20 px-4 py-4 focus:border-primary focus:bg-white/10 outline-none transition-all text-xl font-bold text-white"
                          placeholder="COMM_CH_ADDR"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-primary uppercase tracking-widest">Message_Payload</label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border-b border-white/20 px-4 py-4 focus:border-primary focus:bg-white/10 outline-none transition-all text-xl font-bold text-white resize-none"
                        placeholder="DESCRIBE_OBJECTIVE"
                      />
                    </div>
                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="group w-full bg-primary text-black py-6 font-black text-xl tracking-tighter uppercase flex items-center justify-center space-x-4 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>
                          {formStatus === 'submitting' && 'Transmitting_Signal...'}
                          {formStatus === 'success' && 'Signal_Transmitted!'}
                          {formStatus === 'error' && 'Transmission_Failed'}
                          {formStatus === 'idle' && 'Transmit_Signal'}
                        </span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </MagneticButton>
                  </form>
                </motion.div>
              </div>
            </section>
          </main>

          <Footer />
        </motion.div>
      )}
    </SmoothScrollProvider>
  );
};

export default App;
