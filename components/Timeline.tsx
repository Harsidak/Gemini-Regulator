import React from 'react';
import { TimelineEvent } from '../types';
import { Calendar, Clock } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  // Sort events by date if possible, otherwise keep original order
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="glass-panel rounded-[2.5rem] p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-neon-blue/10 rounded-xl text-neon-blue-deep">
          <Calendar size={22} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg">Event Reconstruction</h3>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pl-8 py-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {sortedEvents.map((ev, idx) => (
          <div key={idx} className="relative group">
            {/* Dot */}
            <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-slate-100 bg-neon-blue-electric shadow-lg group-hover:scale-125 transition-transform"></div>
            
            <div className="bg-white/40 p-4 rounded-2xl border border-white/50 hover:bg-white/60 transition-colors shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        {ev.event}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide px-2 py-1 bg-white/50 rounded-lg">
                        {ev.date}
                    </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                    <Clock size={10} />
                    <span>Source: {ev.source}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;