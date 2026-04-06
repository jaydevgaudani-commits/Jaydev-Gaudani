import React, { useRef, useState } from 'react';
import LiquidOverlay from './components/LiquidOverlay';
import { BentoGrid, BentoCard } from './components/BentoGrid';
import TerminalContact from './components/TerminalContact';
import ProjectExpansion from './components/ProjectExpansion';
import { 
  Terminal, Cpu, Layout, Workflow, Code, Zap, 
  Globe, Search, Cloud, Database, ShieldCheck, 
  MessageSquare, Calendar, LayoutDashboard 
} from 'lucide-react';

const App: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    subtitle: string;
    description: string;
    specs: { label: string; value: string; status: string }[];
    flow: { icon: any; label: string; color: string }[];
  } | null>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary selection:text-background">
      {/* Liquid Physics Overlay Background */}
      <LiquidOverlay />

      {/* Hero Section - Main Background (#080808) */}
      <section className="h-[95vh] flex flex-col justify-center px-6 md:px-20 bg-background overflow-hidden relative">
        <div className="z-10 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-12 h-[2px] bg-primary animate-pulse" />
              <span className="mono-data text-xs md:text-sm tracking-[0.3em] font-bold text-primary">
                SYSTEM_STATUS: ACTIVE
              </span>
            </div>
            <div className="hidden md:block w-[1px] h-4 bg-white/10" />
            <span className="mono-data text-[10px] md:text-xs tracking-[0.2em] text-gray-500 uppercase font-black">
              ARCHITECT: JAYDEV GAUDANI
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-[0.85] break-words">
            AUTOMATING <br />
            <span className="text-primary italic">SYSTEM LOGIC</span>
          </h1>
          
          <p className="max-w-xl text-base md:text-xl font-medium text-gray-400 mb-10 leading-relaxed border-l-2 border-white/10 pl-6">
            Architecting high-frequency business systems through AI automation and technical web development.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={scrollToContact}
              aria-label="Initiate contact protocol and scroll to terminal"
              className="bg-primary text-background px-8 py-4 font-black uppercase text-sm flex items-center gap-2 hover:bg-white transition-all active:scale-95"
            >
              <Terminal size={18} />
              INITIATE_PROTOCOL
            </button>
            <button 
              onClick={scrollToProjects}
              aria-label="View flagship project logs"
              className="border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 font-black uppercase text-sm flex items-center gap-2 hover:bg-white/10 transition-all active:scale-95"
            >
              VIEW_LOGS
            </button>
          </div>
        </div>

        {/* Floating Geometric Element (Terrain_04 Style) */}
        <div className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute -bottom-40 left-0 w-full h-[300px] bg-gradient-to-t from-surface to-transparent" />
      </section>

      {/* Projects Section - Secondary Background (#0E0E0E via shift) */}
      <section ref={projectsRef} className="py-24 px-6 md:px-20 bg-[#0E0E0E] relative">
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-end justify-between border-b border-white/5 pb-8">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
                FLAGSHIP_WORKS
              </h2>
              <p className="text-sm mono-data text-primary/70">
                [ PRODUCTION_READY_MODULES ]
              </p>
            </div>
            <span className="text-6xl font-black text-white/5 hidden md:block">
              01
            </span>
          </div>
        </div>

        <BentoGrid>
          <BentoCard 
            title="CLINIC_OS_V1" 
            subtitle="AI RDP AUTOMATION"
            description="Scalable medical operations framework powered by n8n. Reduces administrative overhead by 40% through automated booking and patient triaging."
            className="md:col-span-2 md:row-span-2"
            onClick={() => setSelectedProject({
              title: "CLINIC_OS_V1",
              subtitle: "AI RDP AUTOMATION",
              description: "Scalable medical operations framework powered by n8n. Reduces administrative overhead by 40% through automated booking and patient triaging.",
              specs: [
                { label: "LATENCY", value: "0.2s", status: "OPTIMIZED" },
                { label: "STACK", value: "n8n / OPENAI / REACT", status: "ACTIVE" },
                { label: "ENCRYPTION", value: "AES-256", status: "SECURE" },
                { label: "THROUGHPUT", value: "1.2k req/h", status: "STABLE" }
              ],
              flow: [
                { icon: MessageSquare, label: "Patient Message", color: "text-primary" },
                { icon: Cpu, label: "AI Agent", color: "text-cyan-400" },
                { icon: Calendar, label: "Book Appointment", color: "text-blue-400" },
                { icon: LayoutDashboard, label: "Doctor Dashboard", color: "text-emerald-400" }
              ]
            })}
          >
            <div className="h-full bg-black/40 rounded flex items-center justify-center p-8 border border-white/5 group-hover:border-primary/20 transition-colors">
              <Cpu className="text-primary/20 w-32 h-32 animate-pulse group-hover:text-primary/40 transition-colors" />
            </div>
          </BentoCard>

          <BentoCard 
            title="WEB_ARCHITECT" 
            subtitle="PERFORMANCE STACK"
            description="High-performance custom web architectures for service businesses. Optimized for technical SEO."
            className="md:col-span-2"
            onClick={() => setSelectedProject({
              title: "WEB_ARCHITECT",
              subtitle: "PERFORMANCE STACK",
              description: "High-performance custom web architectures for service businesses. Optimized for technical SEO.",
              specs: [
                { label: "LCP", value: "0.8s", status: "FAST" },
                { label: "SEO_SCORE", value: "100/100", status: "IDEAL" },
                { label: "RESPONSIVENESS", value: "A+", status: "OPTIMIZED" },
                { label: "BUILD_TIME", value: "42s", status: "CI/CD" }
              ],
              flow: [
                { icon: Search, label: "Search Indexing", color: "text-primary" },
                { icon: Globe, label: "CDN Caching", color: "text-cyan-400" },
                { icon: Zap, label: "Edge Computing", color: "text-blue-400" },
                { icon: Cloud, label: "Scalable Deployment", color: "text-emerald-400" }
              ]
            })}
          >
            <Layout className="text-primary/40 mt-auto group-hover:text-primary transition-colors" size={40} />
          </BentoCard>

          <BentoCard 
            title="N8N_FLOWS" 
            subtitle="LOGIC ENGINE"
            description="Enterprise-grade backend automation that connects disparate APIs."
            onClick={() => setSelectedProject({
              title: "N8N_FLOWS",
              subtitle: "LOGIC ENGINE",
              description: "Enterprise-grade backend automation that connects disparate APIs.",
              specs: [
                { label: "NODES", value: "150+", status: "COMPLEX" },
                { label: "RECURSION", value: "ENABLED", status: "ACTIVE" },
                { label: "FAILSAFE", value: "AUTO-RETRY", status: "SECURE" },
                { label: "UPTIME", value: "99.9%", status: "STABLE" }
              ],
              flow: [
                { icon: Database, label: "Data Ingestion", color: "text-primary" },
                { icon: Workflow, label: "Node Logic", color: "text-cyan-400" },
                { icon: Cpu, label: "Agentic Decision", color: "text-blue-400" },
                { icon: ShieldCheck, label: "Failsafe Output", color: "text-emerald-400" }
              ]
            })}
          >
            <Workflow className="text-primary/40 mt-auto group-hover:text-primary transition-colors" size={40} />
          </BentoCard>

          <BentoCard 
            title="EFFICIENCY" 
            subtitle="METRIC_01"
            className="bg-primary/5 border-primary/20 hover:bg-primary/10"
            onClick={scrollToContact}
          >
            <div className="flex flex-col h-full justify-center">
              <span className="text-5xl font-black text-primary">98%</span>
              <span className="mono-data text-[10px] text-primary/70">TIME_SAVED_ANNUALLY</span>
            </div>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* Services/Experience Section - Surface Background (#131313) */}
      <section className="py-24 px-6 md:px-20 bg-surface relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-6">
              CAPABILITIES_<br />
              & EXPERIENCE
            </h2>
            <div className="flex flex-col gap-6">
              <div className="border-l-2 border-white/10 hover:border-primary pl-4 py-2 group transition-all cursor-crosshair">
                <h4 className="mono-data text-white group-hover:text-primary text-sm font-bold transition-colors">AI AUTOMATION LEAD</h4>
                <p className="text-xs text-gray-500">Enterprise Systems Design & Optimization</p>
              </div>
              <div className="border-l-2 border-white/10 hover:border-primary pl-4 py-2 group transition-all cursor-crosshair">
                <h4 className="mono-data text-white group-hover:text-primary text-sm font-bold transition-colors">FULL-STACK ARCHITECT</h4>
                <p className="text-xs text-gray-500">Scalable Digital Infrastructure</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background/20 p-8 border border-white/5 rounded-lg flex flex-col gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group active:scale-95 cursor-pointer">
              <Zap className="text-primary group-hover:animate-bounce" />
              <h4 className="font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">ENTERPRISE AUTOMATION</h4>
              <p className="text-sm text-gray-400">Scaling operations with AI agentic flows and Python-based logic engines.</p>
            </div>
            
            <div className="bg-background/20 p-8 border border-white/5 rounded-lg flex flex-col gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group active:scale-95 cursor-pointer">
              <Code className="text-primary group-hover:animate-bounce" />
              <h4 className="font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">CUSTOM ARCHITECTURE</h4>
              <p className="text-sm text-gray-400">Performance-first development for technical founders needing structural integrity.</p>
            </div>
          </div>
        </div>

        {/* New Terminal Contact Section */}
        <div ref={contactRef} className="max-w-4xl mx-auto scroll-mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="mono-data text-xs uppercase text-gray-400 font-bold">
              SYSTEM_READY: ESTABLISH_CONTACT_PROTOCOL
            </span>
          </div>
          <TerminalContact />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-20 border-t border-white/5 bg-background flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-black italic tracking-tighter text-xl">LIQUID_ARCHITECT</span>
          <span className="mono-data text-[10px] text-gray-500">VERSION_1.0.42_BUILD_FINAL</span>
        </div>
        
        <div className="flex gap-10 mono-data text-[10px] text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:text-primary">ENCRYPTED_LOGS</a>
          <a href="#" className="hover:text-primary">SECURE_CONTACT</a>
          <a href="#" className="hover:text-primary">SOURCE_FILE</a>
        </div>
      </footer>
      
      {/* Project Intelligence Expansion Overlay */}
      {/* Floating Identity Badge */}
      <div className="fixed bottom-6 right-6 z-[200] hidden md:flex flex-col items-end gap-2 isolate">
        <div className="glass-card bg-surface/40 backdrop-blur-xl border-white/5 py-3 px-5 flex flex-col items-end shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1 h-full bg-primary/40" />
          <span className="text-[9px] mono-data text-gray-500 font-bold uppercase tracking-widest mb-1 italic">
            PROJECT_STATUS: OPEN_FOR_INTAKE
          </span>
          <span className="text-sm font-black uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors">
            JAYDEV GAUDANI
          </span>
        </div>
      </div>

      <ProjectExpansion 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject}
        onActionComplete={scrollToContact}
      />
    </div>
  );
};

export default App;
