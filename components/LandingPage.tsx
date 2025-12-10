import React from 'react';
import { ShieldCheck, ArrowRight, Activity, FileText, Lock } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      {/* Hero Section */}
      <div className="max-w-4xl w-full text-center z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Logo/Icon */}
        <div className="inline-flex p-4 rounded-3xl bg-glass-white backdrop-blur-xl border border-white/40 shadow-2xl shadow-neon-blue/20 mb-4">
          <ShieldCheck size={64} className="text-neon-blue-electric drop-shadow-[0_0_15px_rgba(0,193,255,0.5)]" />
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-slate-900 drop-shadow-sm">
          Gemini <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue-electric to-neon-purple-hyper">Regulator</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          The autonomous <span className="font-semibold text-slate-800">Risk Intelligence Agent</span>. <br/>
          Upload messy evidence. Get forensic clarity.
        </p>

        {/* Feature Grid - Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 text-left">
           <div className="glass-panel p-6 rounded-3xl hover:bg-glass-whiteHover transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-neon-blue/10 flex items-center justify-center mb-4 text-neon-blue-electric">
                 <FileText size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Multimodal Fusion</h3>
              <p className="text-sm text-slate-600">Instantly reads PDFs, Invoices, and CSV ledgers in one context.</p>
           </div>
           
           <div className="glass-panel p-6 rounded-3xl hover:bg-glass-whiteHover transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 flex items-center justify-center mb-4 text-neon-purple-hyper">
                 <Activity size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Live Risk Radar</h3>
              <p className="text-sm text-slate-600">Forensic scoring for Fraud, Legal, and Operational risks.</p>
           </div>

           <div className="glass-panel p-6 rounded-3xl hover:bg-glass-whiteHover transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-cyber-mint/10 flex items-center justify-center mb-4 text-cyber-mint-deep">
                 <Lock size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Compliance Audit</h3>
              <p className="text-sm text-slate-600">Auto-check against GDPR, Tax, and Contract obligations.</p>
           </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-slate-900 text-white font-bold text-lg shadow-2xl shadow-neon-blue/30 overflow-hidden transition-all duration-300 hover:shadow-neon-purple/50 hover:scale-105 active:scale-95"
        >
          {/* Button Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue-electric via-neon-purple-hyper to-neon-blue-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          <div className="absolute inset-0 bg-slate-900 opacity-90 group-hover:opacity-80 transition-opacity"></div>
          
          <span className="relative z-10">Start Analysis</span>
          <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>

      {/* Footer Text */}
      <div className="absolute bottom-6 text-slate-400 text-sm font-medium">
        Powered by Gemini 2.5 Flash • Enterprise Grade Security
      </div>

    </div>
  );
};

export default LandingPage;