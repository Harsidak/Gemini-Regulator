
import React, { useState } from 'react';
import { CausalChainStep } from '../types';
import { GitCommit, ArrowDown, FileText, ZoomIn, Quote } from 'lucide-react';

interface CausalChainProps {
  steps: CausalChainStep[];
}

const CausalChain: React.FC<CausalChainProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  if (!steps || steps.length === 0) return null;

  // Sort by step number just in case
  const sortedSteps = [...steps].sort((a, b) => a.step_number - b.step_number);

  return (
    <div className="glass-panel rounded-[2.5rem] p-8 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-neon-blue/10 rounded-xl text-neon-blue-deep">
          <GitCommit size={22} className="rotate-90" />
        </div>
        <div>
           <h3 className="font-bold text-slate-800 text-lg">Causal Chain Analysis</h3>
           <p className="text-xs text-slate-500">Click a node to inspect evidence.</p>
        </div>
      </div>

      <div className="relative pl-4 pr-2 max-h-[500px] overflow-y-auto custom-scrollbar">
        {/* Connecting Line */}
        <div className="absolute left-[29px] top-4 bottom-10 w-0.5 bg-gradient-to-b from-neon-blue-light/50 to-neon-purple-hyper/50 z-0"></div>

        <div className="space-y-6 relative z-10">
          {sortedSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            
            return (
              <div 
                key={idx} 
                className={`relative group transition-all duration-300 ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
              >
                <div className="flex gap-4">
                    {/* Node Circle */}
                    <button 
                        onClick={() => setActiveStep(isActive ? null : idx)}
                        className={`
                            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-4 
                            transition-all duration-300 cursor-pointer shadow-lg
                            ${isActive 
                                ? 'bg-neon-blue-electric border-white shadow-neon-blue/40 scale-110' 
                                : 'bg-white border-slate-100 group-hover:border-neon-blue-light group-hover:bg-neon-blue/10'}
                        `}
                    >
                        {isActive ? (
                            <ZoomIn size={14} className="text-white" />
                        ) : (
                            <span className="text-xs font-bold text-slate-500 group-hover:text-neon-blue-deep">{step.step_number}</span>
                        )}
                    </button>

                    {/* Card Content */}
                    <div 
                        onClick={() => setActiveStep(isActive ? null : idx)}
                        className={`
                            flex-1 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                            ${isActive 
                                ? 'bg-white/80 border-neon-blue/50 shadow-xl ring-2 ring-neon-blue/10' 
                                : 'bg-white/40 border-white/50 hover:bg-white/60 hover:shadow-md'}
                        `}
                    >
                        <div className="p-4">
                            <h4 className={`font-bold text-sm ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                {step.event_description}
                            </h4>
                            
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                    isActive ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    Impact
                                </span>
                                <span className="text-xs text-slate-500 font-medium">
                                    {step.risk_impact}
                                </span>
                            </div>
                        </div>

                        {/* Expandable Evidence Section */}
                        <div className={`
                            bg-slate-50/80 border-t border-slate-100/50 transition-all duration-500 ease-in-out
                            ${isActive ? 'max-h-[300px] opacity-100 p-4' : 'max-h-0 opacity-0 p-0 overflow-hidden'}
                        `}>
                            <div className="mb-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                    <Quote size={12} />
                                    <span>Supporting Evidence</span>
                                </div>
                                <p className="text-sm italic text-slate-700 font-medium bg-white p-3 rounded-lg border border-slate-200 shadow-sm leading-relaxed">
                                    "{step.supporting_evidence}"
                                </p>
                            </div>
                            
                            <div className="flex justify-end">
                                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-neon-blue/10 rounded-md text-[10px] font-bold text-neon-blue-deep">
                                    <FileText size={10} />
                                    <span>SOURCE: {step.source_document}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Down Arrow between steps (except last) */}
                {idx < sortedSteps.length - 1 && (
                    <div className="absolute left-[9px] -bottom-4 z-0 text-slate-300">
                        <ArrowDown size={14} />
                    </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CausalChain;
