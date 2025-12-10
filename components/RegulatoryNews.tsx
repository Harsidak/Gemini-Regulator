
import React from 'react';
import { Globe, ExternalLink, Newspaper } from 'lucide-react';
import { RegulatoryNewsData } from '../types';

interface RegulatoryNewsProps {
  data: RegulatoryNewsData;
}

const RegulatoryNews: React.FC<RegulatoryNewsProps> = ({ data }) => {
  return (
    <div className="glass-panel rounded-[2.5rem] p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-cyber-mint/10 rounded-xl text-cyber-mint-deep">
          <Globe size={22} />
        </div>
        <div>
           <h3 className="font-bold text-slate-800 text-lg">Live Regulatory Context</h3>
           <p className="text-xs text-slate-500 font-medium">Powered by Google Search Grounding</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary Text */}
        <div className="bg-white/40 p-5 rounded-2xl border border-white/50 shadow-sm">
            <div className="flex items-start gap-3">
                <Newspaper className="text-slate-400 mt-1 flex-shrink-0" size={18} />
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
                     {data.summary.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0">{line}</p>
                     ))}
                </div>
            </div>
        </div>

        {/* Sources Grid */}
        {data.sources.length > 0 && (
            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Verified Sources</h4>
                <div className="flex flex-wrap gap-3">
                    {data.sources.map((source, idx) => (
                        <a 
                            key={idx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 bg-white/60 hover:bg-white/90 border border-white/50 rounded-xl text-xs font-semibold text-slate-600 hover:text-neon-blue-deep transition-all shadow-sm hover:shadow-md"
                        >
                            <span className="truncate max-w-[150px] sm:max-w-[200px]">{source.title}</span>
                            <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
                        </a>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default RegulatoryNews;
