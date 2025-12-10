import React from 'react';
import { 
  ShieldCheck, ArrowRight, Activity, FileText, Lock, 
  BrainCircuit, Globe, Scale, 
  Fingerprint, Zap, CheckCircle, Eye, Layers 
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans text-slate-800">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 animate-slide-down">
        <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg shadow-neon-blue/5">
           <div className="flex items-center gap-2">
             <div className="bg-gradient-to-br from-neon-blue-electric to-neon-purple-hyper p-2 rounded-lg text-white shadow-md">
               <ShieldCheck size={20} />
             </div>
             <span className="font-bold text-lg tracking-tight text-slate-900">Gemini Regulator</span>
           </div>
           <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
             <a href="#features" className="hover:text-neon-blue-deep transition-colors">Capabilities</a>
             <a href="#workflow" className="hover:text-neon-blue-deep transition-colors">How it Works</a>
             <a href="#security" className="hover:text-neon-blue-deep transition-colors">Security</a>
           </div>
           <button 
             onClick={onStart}
             className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
           >
             Launch App
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/60 backdrop-blur-md text-xs font-bold text-neon-blue-deep uppercase tracking-wider shadow-sm mb-4 opacity-0 animate-slide-up [animation-delay:200ms]">
             <Zap size={12} className="fill-current" />
             <span>Powered by Gemini 2.5 Multimodal AI</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 leading-[0.9] opacity-0 animate-slide-up [animation-delay:400ms]">
            The AI Auditor for the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue-electric via-neon-purple-hyper to-neon-blue-electric bg-[length:200%_auto] animate-gradient">Modern Enterprise</span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed opacity-0 animate-slide-up [animation-delay:600ms]">
            Turn chaotic evidence—invoices, contracts, logs—into a pristine forensic intelligence report. <span className="font-semibold text-slate-900">Detect fraud, leaks, and risks in seconds.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 animate-slide-up [animation-delay:800ms]">
            <button 
              onClick={onStart}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-lg shadow-2xl shadow-neon-blue/30 overflow-hidden transition-all duration-300 hover:shadow-neon-purple/50 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue-electric via-neon-purple-hyper to-neon-blue-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <span className="relative z-10">Start Analysis</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#features" className="px-10 py-5 rounded-full bg-white/40 border border-white/50 backdrop-blur-md text-slate-700 font-bold text-lg hover:bg-white/60 transition-all w-full sm:w-auto text-center">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 opacity-0 animate-slide-up [animation-delay:200ms]">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Complete Forensic Intelligence.</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Gemini Regulator fuses five specialized intelligence engines into one cohesive dashboard.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px]">
              
              {/* Feature 1: Multimodal Fusion (Large) */}
              <div className="glass-panel p-8 rounded-[2.5rem] md:col-span-4 relative overflow-hidden group hover:bg-glass-whiteHover transition-all duration-500 opacity-0 animate-slide-up [animation-delay:300ms]">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BrainCircuit size={200} />
                 </div>
                 <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="w-14 h-14 rounded-2xl bg-neon-blue/10 flex items-center justify-center mb-6 text-neon-blue-electric">
                            <Layers size={32} />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-3">Multimodal Fusion Engine</h3>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                            Don't just OCR. <span className="font-semibold text-slate-900">Understand.</span> Regulator reads PDFs, receipts, handwriting, and Excel rows simultaneously to cross-reference truth across documents.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {['PDF', 'JPG', 'CSV', 'TXT'].map(fmt => (
                            <span key={fmt} className="px-3 py-1 bg-white/50 border border-white/60 rounded-lg text-xs font-bold text-slate-500">{fmt}</span>
                        ))}
                    </div>
                 </div>
              </div>

              {/* Feature 2: Risk Radar (Tall) */}
              <div className="glass-panel p-8 rounded-[2.5rem] md:col-span-2 md:row-span-2 relative overflow-hidden group hover:bg-glass-whiteHover transition-all duration-500 flex flex-col opacity-0 animate-slide-up [animation-delay:400ms]">
                 <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-neon-purple/20 blur-3xl rounded-full"></div>
                 <div className="w-14 h-14 rounded-2xl bg-neon-purple/10 flex items-center justify-center mb-6 text-neon-purple-hyper">
                    <Activity size={32} />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-800 mb-3">4-Vector Risk Radar</h3>
                 <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                    Quantify exposure with forensic scoring across four critical dimensions.
                 </p>
                 <div className="space-y-4">
                    {[
                        { label: 'Financial Fraud', color: 'bg-red-500' },
                        { label: 'Operational Risk', color: 'bg-orange-500' },
                        { label: 'Legal Liability', color: 'bg-neon-purple' },
                        { label: 'Compliance Gaps', color: 'bg-neon-blue' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/40 p-3 rounded-xl border border-white/50 flex items-center justify-between">
                            <span className="font-bold text-slate-700 text-sm">{item.label}</span>
                            <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                        </div>
                    ))}
                 </div>
              </div>

              {/* Feature 3: PII Shield (Medium) */}
              <div className="glass-panel p-8 rounded-[2.5rem] md:col-span-2 relative overflow-hidden group hover:bg-glass-whiteHover transition-all duration-500 opacity-0 animate-slide-up [animation-delay:500ms]">
                 <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
                    <Fingerprint size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Privacy Shield</h3>
                 <p className="text-sm text-slate-600 leading-relaxed">
                    Auto-detects sensitive PII (SSN, Emails) hidden in unstructured files to prevent leaks.
                 </p>
              </div>

              {/* Feature 4: Contract Sentiment (Medium) */}
              <div className="glass-panel p-8 rounded-[2.5rem] md:col-span-2 relative overflow-hidden group hover:bg-glass-whiteHover transition-all duration-500 opacity-0 animate-slide-up [animation-delay:600ms]">
                 <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
                    <Scale size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Legal Sentinel</h3>
                 <p className="text-sm text-slate-600 leading-relaxed">
                    Sentiment analysis for contracts. Detects hostile clauses and "High Risk" language.
                 </p>
              </div>

              {/* Feature 5: Live Grounding (Wide) */}
              <div className="glass-panel p-8 rounded-[2.5rem] md:col-span-6 relative overflow-hidden group hover:bg-glass-whiteHover transition-all duration-500 flex items-center justify-between opacity-0 animate-slide-up [animation-delay:700ms]">
                 <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-cyber-mint/10 flex items-center justify-center text-cyber-mint-deep">
                            <Globe size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Live Regulatory Context</h3>
                    </div>
                    <p className="text-slate-600 text-lg">
                        Connects to Google Search to validate findings against the latest real-world laws and news.
                    </p>
                 </div>
                 <div className="hidden md:flex gap-3">
                     <div className="px-4 py-2 bg-white/40 border border-white/50 rounded-xl text-xs font-bold text-slate-500">GDPR</div>
                     <div className="px-4 py-2 bg-white/40 border border-white/50 rounded-xl text-xs font-bold text-slate-500">SOX</div>
                     <div className="px-4 py-2 bg-white/40 border border-white/50 rounded-xl text-xs font-bold text-slate-500">HIPAA</div>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* How it Works / Workflow */}
      <section id="workflow" className="py-20 px-6 relative">
          <div className="max-w-5xl mx-auto">
             <div className="text-center mb-16 opacity-0 animate-slide-up [animation-delay:200ms]">
                 <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">From Chaos to Clarity.</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                 {/* Connecting Line (Desktop) */}
                 <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-slate-200 via-neon-blue/30 to-slate-200 z-0"></div>

                 {/* Step 1 */}
                 <div className="relative z-10 flex flex-col items-center text-center opacity-0 animate-slide-up [animation-delay:300ms]">
                    <div className="w-24 h-24 rounded-[2rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center mb-6 relative hover:scale-110 transition-transform duration-300">
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 rounded-full text-white font-bold flex items-center justify-center border-4 border-white">1</div>
                        <FileText size={32} className="text-slate-700" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Upload Evidence</h3>
                    <p className="text-slate-500 text-sm px-6">Drag & drop loose PDFs, images, and logs. No pre-sorting required.</p>
                 </div>

                 {/* Step 2 */}
                 <div className="relative z-10 flex flex-col items-center text-center opacity-0 animate-slide-up [animation-delay:500ms]">
                    <div className="w-24 h-24 rounded-[2rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center mb-6 relative hover:scale-110 transition-transform duration-300">
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-neon-blue-electric rounded-full text-white font-bold flex items-center justify-center border-4 border-white shadow-lg shadow-neon-blue/40">2</div>
                        <BrainCircuit size={32} className="text-neon-blue-electric" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Gemini Analysis</h3>
                    <p className="text-slate-500 text-sm px-6">The AI reconstructs the business timeline and detects inconsistencies.</p>
                 </div>

                 {/* Step 3 */}
                 <div className="relative z-10 flex flex-col items-center text-center opacity-0 animate-slide-up [animation-delay:700ms]">
                    <div className="w-24 h-24 rounded-[2rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center mb-6 relative hover:scale-110 transition-transform duration-300">
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-neon-purple-hyper rounded-full text-white font-bold flex items-center justify-center border-4 border-white shadow-lg shadow-neon-purple/40">3</div>
                        <CheckCircle size={32} className="text-neon-purple-hyper" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Actionable Report</h3>
                    <p className="text-slate-500 text-sm px-6">Receive a prioritized remediation plan and detailed risk scorecard.</p>
                 </div>
             </div>
          </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-20 px-6 border-t border-white/50 bg-white/30 backdrop-blur-lg">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to audit your documents?</h2>
            <button 
              onClick={onStart}
              className="px-12 py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl shadow-xl shadow-slate-900/20 hover:scale-105 transition-transform"
            >
              Launch Regulator
            </button>
            <div className="mt-12 flex items-center justify-center gap-6 text-slate-400 text-sm font-medium">
               <span className="flex items-center gap-2"><Lock size={14}/> Enterprise Encrypted</span>
               <span className="flex items-center gap-2"><Eye size={14}/> Private & Confidential</span>
            </div>
            <div className="mt-8 text-slate-400 text-xs">
                © 2024 Gemini Regulator. Powered by Google DeepMind.
            </div>
         </div>
      </footer>

    </div>
  );
};

export default LandingPage;