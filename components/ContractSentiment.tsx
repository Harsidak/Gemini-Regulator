
import React from 'react';
import { ContractClauseSentiment } from '../types';
import { Scale, AlertTriangle, CheckCircle, MinusCircle, AlertOctagon } from 'lucide-react';

interface ContractSentimentProps {
  clauses: ContractClauseSentiment[];
}

const ContractSentiment: React.FC<ContractSentimentProps> = ({ clauses }) => {
  const getIcon = (sentiment: string) => {
    switch(sentiment) {
        case 'Positive': return <CheckCircle size={18} />;
        case 'Negative': return <AlertTriangle size={18} />;
        case 'High Risk': return <AlertOctagon size={18} />;
        default: return <MinusCircle size={18} />;
    }
  };

  const getColors = (sentiment: string) => {
    switch(sentiment) {
        case 'Positive': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50';
        case 'Negative': return 'bg-orange-500/10 text-orange-600 border-orange-200/50';
        case 'High Risk': return 'bg-red-500/10 text-red-600 border-red-200/50';
        default: return 'bg-slate-500/10 text-slate-600 border-slate-200/50';
    }
  };

  if (!clauses || clauses.length === 0) return null;

  return (
    <div className="glass-panel rounded-[2.5rem] p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-neon-purple/10 rounded-xl text-neon-purple-deep">
          <Scale size={22} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg">Contract Sentiment & Risk</h3>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {clauses.map((clause, idx) => (
            <div key={idx} className="p-4 bg-white/40 border border-white/50 rounded-2xl hover:bg-white/60 transition-colors">
                <div className="flex items-start justify-between mb-2">
                    <span className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getColors(clause.sentiment)}`}>
                        {getIcon(clause.sentiment)}
                        {clause.sentiment}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        clause.risk_level === 'High' ? 'bg-red-100 text-red-700' : 
                        clause.risk_level === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                        {clause.risk_level} Risk
                    </span>
                </div>
                <div className="bg-slate-100/50 p-3 rounded-xl border border-slate-200/50 mb-3">
                    <p className="text-xs font-mono text-slate-600 italic">"{clause.clause_text}"</p>
                </div>
                <p className="text-sm font-medium text-slate-800 leading-snug">{clause.analysis}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ContractSentiment;
