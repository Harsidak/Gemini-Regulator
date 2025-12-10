
import React from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { RegulatorReport, RiskSeverity } from '../types';
import { BarChart3, PieChart as PieIcon, Layers } from 'lucide-react';

interface DeepAnalyticsProps {
  report: RegulatorReport;
}

const DeepAnalytics: React.FC<DeepAnalyticsProps> = ({ report }) => {
  
  // 1. Prepare Compliance Data
  const complianceCounts = { Pass: 0, Fail: 0, Warning: 0 };
  report.compliance_matrix.forEach(c => {
    if (complianceCounts[c.status] !== undefined) complianceCounts[c.status]++;
  });
  const complianceData = [
    { name: 'Pass', value: complianceCounts.Pass, color: '#10b981' }, // Emerald
    { name: 'Warning', value: complianceCounts.Warning, color: '#f59e0b' }, // Amber
    { name: 'Fail', value: complianceCounts.Fail, color: '#ef4444' } // Red
  ].filter(d => d.value > 0);

  // 2. Prepare Risk Severity Data
  const severityCounts = { 
    [RiskSeverity.LOW]: 0, 
    [RiskSeverity.MEDIUM]: 0, 
    [RiskSeverity.HIGH]: 0, 
    [RiskSeverity.CRITICAL]: 0 
  };
  report.red_flags.forEach(f => {
    if (severityCounts[f.severity] !== undefined) severityCounts[f.severity]++;
  });
  const severityData = [
    { name: 'Low', count: severityCounts[RiskSeverity.LOW], fill: 'url(#gradLow)' }, 
    { name: 'Med', count: severityCounts[RiskSeverity.MEDIUM], fill: 'url(#gradMed)' }, 
    { name: 'High', count: severityCounts[RiskSeverity.HIGH], fill: 'url(#gradHigh)' }, 
    { name: 'Critical', count: severityCounts[RiskSeverity.CRITICAL], fill: 'url(#gradCrit)' } 
  ];

  // 3. Prepare Entity Type Data
  const entityCounts: Record<string, number> = {};
  report.entities.forEach(e => {
    entityCounts[e.type] = (entityCounts[e.type] || 0) + 1;
  });
  const entityData = Object.keys(entityCounts).map((key, index) => ({
    name: key,
    value: entityCounts[key],
    color: [
      '#5AB7FF', // Blue
      '#B07CFF', // Purple
      '#4FF2D8', // Mint
      '#FFDA6E'  // Gold
    ][index % 4]
  }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md border border-white/50 p-3 rounded-xl shadow-xl text-slate-800 text-xs font-bold">
          <p>{label ? `${label}:` : ''} {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
      
      {/* Compliance Health Donut */}
      <div className="glass-panel rounded-[2.5rem] p-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4 w-full text-slate-800">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <PieIcon size={18} />
            </div>
            <h3 className="font-bold text-sm">Compliance Health</h3>
        </div>
        <div className="w-full h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={complianceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={6}
                    >
                        {complianceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 600 }}/>
                </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-8">
                <span className="text-2xl font-extrabold text-slate-700">
                    {Math.round((complianceCounts.Pass / (report.compliance_matrix.length || 1)) * 100)}%
                </span>
            </div>
        </div>
      </div>

      {/* Risk Severity Bar Chart */}
      <div className="glass-panel rounded-[2.5rem] p-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4 w-full text-slate-800">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <BarChart3 size={18} />
            </div>
            <h3 className="font-bold text-sm">Issue Severity Distribution</h3>
        </div>
        <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData}>
                    <defs>
                      <linearGradient id="gradLow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4FF2D8" />
                        <stop offset="100%" stopColor="#2CBFA8" />
                      </linearGradient>
                      <linearGradient id="gradMed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#eab308" />
                      </linearGradient>
                      <linearGradient id="gradHigh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#ea580c" />
                      </linearGradient>
                      <linearGradient id="gradCrit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C46CFF" />
                        <stop offset="100%" stopColor="#8A51E1" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} content={<CustomTooltip />} />
                    <Bar dataKey="count" radius={[6, 6, 6, 6]} barSize={32}>
                        {severityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Entity Composition */}
      <div className="glass-panel rounded-[2.5rem] p-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4 w-full text-slate-800">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Layers size={18} />
            </div>
            <h3 className="font-bold text-sm">Entity Composition</h3>
        </div>
        <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={entityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        dataKey="value"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth={2}
                        paddingAngle={2}
                    >
                        {entityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} iconType="diamond" wrapperStyle={{ fontSize: '10px', fontWeight: 600 }}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default DeepAnalytics;
