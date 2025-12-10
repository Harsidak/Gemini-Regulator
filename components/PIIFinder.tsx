

import React, { useState } from 'react';
import { PIIFinding } from '../types';
import { Fingerprint, Eye, EyeOff, ShieldAlert, FileText, Lock, Mail, Phone, MapPin, CreditCard, User, FileDigit } from 'lucide-react';

interface PIIFinderProps {
  findings: PIIFinding[];
}

const PIIFinder: React.FC<PIIFinderProps> = ({ findings }) => {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const toggleReveal = (index: number) => {
    const newRevealed = new Set(revealedIndices);
    if (newRevealed.has(index)) {
      newRevealed.delete(index);
    } else {
      newRevealed.add(index);
    }
    setRevealedIndices(newRevealed);
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getIconForType = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('email')) return <Mail size={12} className="text-slate-400"/>;
    if (t.includes('phone')) return <Phone size={12} className="text-slate-400"/>;
    if (t.includes('address')) return <MapPin size={12} className="text-slate-400"/>;
    if (t.includes('card') || t.includes('financial')) return <CreditCard size={12} className="text-slate-400"/>;
    if (t.includes('name')) return <User size={12} className="text-slate-400"/>;
    if (t.includes('ssn') || t.includes('id') || t.includes('social')) return <FileDigit size={12} className="text-slate-400"/>;
    return <Lock size={12} className="text-slate-400"/>;
  };

  if (!findings || findings.length === 0) return null;

  return (
    <div className="glass-panel rounded-[2.5rem] p-8 h-full relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2.5 bg-red-500/10 rounded-xl text-red-600">
          <Fingerprint size={22} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Privacy Data Audit</h3>
          <p className="text-xs text-slate-500">Sensitive PII Detection</p>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 relative z-10">
        {findings.map((item, idx) => (
          <div key={idx} className="flex flex-col p-4 bg-white/40 border border-white/50 rounded-2xl hover:bg-white/60 transition-colors">
            
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                {getIconForType(item.type)}
                {item.type}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getRiskColor(item.risk_level)}`}>
                {item.risk_level} Sensitivity
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-100/50 p-3 rounded-xl border border-slate-200/50 mb-2 group">
              <div className={`font-mono text-sm ${revealedIndices.has(idx) ? 'text-slate-800' : 'text-slate-400 blur-[4px] select-none'} transition-all duration-300`}>
                {revealedIndices.has(idx) ? item.value : '••••••••••••••••'}
              </div>
              <button 
                onClick={() => toggleReveal(idx)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
                title={revealedIndices.has(idx) ? "Hide value" : "Reveal value"}
              >
                {revealedIndices.has(idx) ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-end">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                <FileText size={10} />
                <span>Found in: {item.location_citation}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PIIFinder;