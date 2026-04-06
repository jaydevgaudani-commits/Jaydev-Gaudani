import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import NeuralPulse from './NeuralPulse';
import gsap from 'gsap';

interface ProjectExpansionProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    subtitle: string;
    description: string;
    specs: { label: string; value: string; status: string }[];
    flow: { icon: any; label: string; color: string }[];
  } | null;
  onActionComplete?: () => void;
}

const ProjectExpansion: React.FC<ProjectExpansionProps> = ({ isOpen, onClose, project, onActionComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [testState, setTestState] = useState<'IDLE' | 'ANALYZING' | 'SUCCESS'>('IDLE');

  useEffect(() => {
    if (isOpen && containerRef.current) {
      // Liquid Expansion Effect (Bouncy Scale) using GSAP
      gsap.fromTo(containerRef.current, 
        { scale: 0.8, opacity: 0, borderRadius: "40px" }, 
        { 
          scale: 1, 
          opacity: 1, 
          borderRadius: "0px",
          duration: 0.6, 
          ease: "elastic.out(1, 0.75)"        }
      );
    }
    
    if (!isOpen) {
      setTestState('IDLE');
    }
  }, [isOpen]);

  const handleStressTest = () => {
    setTestState('ANALYZING');
    
    // Simulate system stress test duration
    setTimeout(() => {
      setTestState('SUCCESS');
      
      // Auto-close and trigger follow-up after success
      setTimeout(() => {
        onClose();
        if (onActionComplete) onActionComplete();
      }, 800);
    }, 1500);
  };

  if (!isOpen || !project) return null;

  const technicalSpecs = project.specs;
  const logicFlow = project.flow;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        {/* Backdrop Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
        />

        {/* Expansion Container */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] glass-card bg-surface/80 border-white/10 overflow-y-auto flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,255,242,0.1)] custom-scrollbar"
        >
          <NeuralPulse />
          
          <button 
            onClick={onClose}
            aria-label="Close project expansion modal"
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white active:scale-95"
          >
            <X size={20} />
          </button>

          {/* Left Column: Technical Specs */}
          <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 z-10 flex flex-col">
            <div className="mb-12">
              <span className="mono-data text-[10px] text-primary font-bold tracking-[0.4em] mb-2 block uppercase">
                {project.subtitle} // MODULE_DETAIL
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-none">
                {project.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-auto">
              <h4 className="text-[10px] mono-data text-gray-500 font-bold uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
                TECHNICAL_SPECIFICATIONS
              </h4>
              <div className="space-y-6">
                {technicalSpecs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2 font-mono group">
                    <div>
                      <span className="text-[9px] text-gray-500 block mb-1 group-hover:text-primary transition-colors">{spec.label}</span>
                      <span className="text-sm font-bold text-white italic">{spec.value}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                       <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase">
                         {spec.status}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Logic Flow */}
          <div className="flex-1 p-8 md:p-12 z-10 flex flex-col bg-white/[0.01]">
            <div className="mb-10">
               <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2 italic">
                LOGIC_FLOW_VISUALIZATION
              </h3>
              <p className="text-sm text-gray-500 font-medium max-w-sm">
                Architectural overview of the recursive data pipeline and agentic decision engine.
              </p>
            </div>

            <div className="flex flex-col gap-4 relative mt-auto md:mt-0">
               {logicFlow.map((step, i) => (
                 <React.Fragment key={i}>
                   <div className="flex items-center gap-6 p-4 rounded-lg bg-black/40 border border-white/5 hover:border-primary/30 transition-all group">
                     <div className={`p-3 rounded bg-white/5 ${step.color} group-hover:scale-110 transition-transform`}>
                       <step.icon size={24} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[8px] mono-data text-gray-600 font-black uppercase tracking-tighter">NODE_0{i+1}</span>
                        <span className="text-sm font-black uppercase italic tracking-tight text-white">{step.label}</span>
                     </div>
                   </div>
                   {i < logicFlow.length - 1 && (
                     <div className="w-[1px] h-4 bg-white/10 ml-10" />
                   )}
                 </React.Fragment>
               ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                 <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">SYSTEM_PROTOCOL</span>
                 <span className="text-[10px] text-primary italic font-bold">STITCH_V{Math.random().toFixed(2)}</span>
              </div>
              <button 
                onClick={handleStressTest}
                disabled={testState !== 'IDLE'}
                aria-label="Run module stress test"
                className={`px-6 py-2.5 font-black uppercase text-[10px] transition-all active:scale-95 ${
                  testState === 'IDLE' ? 'bg-primary text-background hover:bg-white' : 
                  testState === 'ANALYZING' ? 'bg-yellow-400 text-black animate-pulse' : 
                  'bg-emerald-500 text-white'
                }`}
              >
                {testState === 'IDLE' && "// RUN_MODULE_STRESS_TEST"}
                {testState === 'ANALYZING' && "// ANALYZING_SYSTEM_INTEGRITY..."}
                {testState === 'SUCCESS' && "// PASS: SYSTEM_OPTIMIZED"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectExpansion;
