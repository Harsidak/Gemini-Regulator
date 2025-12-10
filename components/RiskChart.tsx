
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { RiskScores } from '../types';

interface RiskChartProps {
  scores: RiskScores;
}

const RiskChart: React.FC<RiskChartProps> = ({ scores }) => {
  const data = [
    { subject: 'Financial', A: scores.financial_risk, fullMark: 100 },
    { subject: 'Operational', A: scores.operational_risk, fullMark: 100 },
    { subject: 'Legal', A: scores.legal_risk, fullMark: 100 },
    { subject: 'Fraud', A: scores.fraud_probability, fullMark: 100 },
  ];

  return (
    <div className="w-full h-80 glass-panel rounded-[2.5rem] p-4 flex flex-col items-center justify-center relative overflow-hidden group">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-neon-purple/20 blur-3xl rounded-full pointer-events-none animate-pulse-slow"></div>

      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest absolute top-6 left-8 z-10">Risk Vectors</h3>
      <div className="w-full h-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C46CFF" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#5AB7FF" stopOpacity={0.4}/>
                </linearGradient>
            </defs>
            <PolarGrid stroke="rgba(0,0,0,0.1)" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Risk Score"
              dataKey="A"
              stroke="#B07CFF"
              strokeWidth={3}
              fill="url(#riskGradient)"
              fillOpacity={0.6}
              dot={{ r: 4, fill: '#fff', stroke: '#B07CFF', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#fff', stroke: '#C46CFF', strokeWidth: 2 }}
            />
            <Tooltip 
               contentStyle={{ 
                 backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                 backdropFilter: 'blur(8px)', 
                 borderRadius: '12px', 
                 border: '1px solid rgba(255,255,255,0.5)', 
                 color: '#1e293b', 
                 boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                 fontSize: '12px',
                 fontWeight: '600'
               }}
               formatter={(value: number) => [`${value}/100`, 'Score']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskChart;
