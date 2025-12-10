import React from 'react';
import { Entity } from '../types';
import { Users, Building2, Banknote, MapPin, Box } from 'lucide-react';

interface EntityGridProps {
  entities: Entity[];
}

const EntityGrid: React.FC<EntityGridProps> = ({ entities }) => {
  
  const getIcon = (type: string) => {
    switch(type) {
        case 'Person': return <Users size={16} />;
        case 'Organization': return <Building2 size={16} />;
        case 'Money': return <Banknote size={16} />;
        case 'Location': return <MapPin size={16} />;
        default: return <Box size={16} />;
    }
  };

  const getColor = (type: string) => {
    switch(type) {
        case 'Person': return 'text-neon-purple-hyper bg-neon-purple/10';
        case 'Organization': return 'text-neon-blue-electric bg-neon-blue/10';
        case 'Money': return 'text-cyber-mint-deep bg-cyber-mint/10';
        case 'Location': return 'text-orange-500 bg-orange-100';
        default: return 'text-slate-500 bg-slate-100';
    }
  };

  return (
    <div className="glass-panel rounded-[2.5rem] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-neon-purple/10 rounded-xl text-neon-purple-deep">
          <Users size={22} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg">Detected Entities</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
        {entities.map((entity, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-white/40 border border-white/50 rounded-2xl hover:bg-white/60 transition-colors">
                <div className={`p-2 rounded-xl ${getColor(entity.type)}`}>
                    {getIcon(entity.type)}
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">{entity.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{entity.details}</p>
                    <span className="inline-block mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 opacity-70 border border-slate-200 px-1.5 rounded-md">
                        {entity.type}
                    </span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default EntityGrid;