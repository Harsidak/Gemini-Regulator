
import React, { useState } from 'react';
import { RegulatorReport, RiskSeverity, RegulatoryNewsData } from '../types';
import RiskChart from './RiskChart';
import Timeline from './Timeline';
import EntityGrid from './EntityGrid';
import RegulatoryNews from './RegulatoryNews';
import ContractSentiment from './ContractSentiment';
import PIIFinder from './PIIFinder';
import DeepAnalytics from './DeepAnalytics';
import { fetchRegulatoryNews } from '../services/geminiService';
import { AlertTriangle, CheckCircle, ShieldAlert, BookOpen, BrainCircuit, Quote, Globe, Loader2, FileText, Search } from 'lucide-react';

interface AnalysisReportProps {
  report: RegulatorReport;
}

const SeverityBadge: React.FC<{ severity: string }> = ({ severity }) => {
  const styles = {
    [RiskSeverity.CRITICAL]: 'bg-red-500/10 text-red-600 border-red-200/50',
    [RiskSeverity.HIGH]: 'bg-orange-500/10 text-orange-600 border-orange-200/50',
    [RiskSeverity.MEDIUM]: 'bg-yellow-500/10 text-yellow-600 border-yellow-200/50',
    [RiskSeverity.LOW]: 'bg-green-500/10 text-green-600 border-green-200/50',
  }[severity] || 'bg-slate-100 text-slate-600';

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${styles} backdrop-blur-md`}>
      {severity}
    </span>
  );
};

const AnalysisReport: React.FC<AnalysisReportProps> = ({ report }) => {
  const [newsData, setNewsData] = useState<RegulatoryNewsData | null>(null);
  const [loadingNews, setLoadingNews] = useState(false);

  const handleFetchNews = async () => {
    setLoadingNews(true);
    try {
        const data = await fetchRegulatoryNews(report.c_suite_summary);
        setNewsData(data);
    } catch (err) {
        console.error("Failed to fetch news", err);
    } finally {
        setLoadingNews(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in slide-in-from-bottom-8 fade-in duration-700">
      
      {/* --- TOP ROW: SUMMARY & RADAR --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Executive Summary Card */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-neon-blue/10 transition-all duration-500 hover:shadow-neon-blue/20">
            {/* Dark Glass Background */}
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl z-0"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
            
            {/* Glowing Orbs */}
            <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-neon-blue-electric rounded-full blur-[120px] opacity-30 animate-pulse-slow"></div>
            <div className="absolute bottom-[-50%] left-[-10%] w-[400px] h-[400px] bg-neon-purple-hyper rounded-full blur-[120px] opacity-20"></div>

            <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
                            <BrainCircuit className="text-neon-blue-light" size={28}/>
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Executive Intelligence Summary</h2>
                    </div>
                    <p className="text-slate-200 leading-relaxed text-lg font-light tracking-wide opacity-90">
                        {report.c_suite_summary}
                    </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
                        <span>AI Forensic Analysis</span>
                        <span className="text-neon-blue-electric">• Gemini 2.5 Flash</span>
                    </div>

                    {/* Fetch News Button */}
                    {!newsData && (
                        <button 
                            onClick={handleFetchNews}
                            disabled={loadingNews}
                            className="flex items-center gap-2 px-4 py-2 bg-cyber-mint/10 hover:bg-cyber-mint/20 border border-cyber-mint/30 rounded-xl text-cyber-mint-neon text-sm font-bold transition-all shadow-lg shadow-cyber-mint/10"
                        >
                            {loadingNews ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
                            {loadingNews ? "Searching..." : "Fetch Live Regulatory News"}
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Risk Radar */}
        <div className="lg:col-span-1">
          <RiskChart scores={report.risk_scores} />
        </div>
      </div>

      {/* --- DEEP ANALYTICS ROW --- */}
      <DeepAnalytics report={report} />

      {/* --- LIVE NEWS SECTION (Conditional) --- */}
      {newsData && (
        <div className="grid grid-cols-1">
            <RegulatoryNews data={newsData} />
        </div>
      )}

      {/* --- SECOND ROW: TIMELINE & ENTITIES --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Timeline events={report.timeline} />
        <EntityGrid entities={report.entities} />
      </div>

      {/* --- THIRD ROW: RED FLAGS & FIX PLAN --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Red Flags */}
        <div className="glass-panel rounded-[2.5rem] flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-white/40 flex items-center gap-3 bg-red-50/20 backdrop-blur-md">
            <div className="bg-red-100 p-2 rounded-xl text-red-600">
                 <ShieldAlert size={22} />
            </div>
            <h3 className="font-bold text-red-950 text-lg">Risk Detected</h3>
          </div>
          <div className="divide-y divide-white/40 overflow-y-auto max-h-[500px] custom-scrollbar p-2">
            {report.red_flags.length === 0 ? (
                <div className="p-8 text-center text-slate-400 italic">No red flags detected.</div>
            ) : (
                report.red_flags.map((flag, idx) => (
                <div key={idx} className="p-5 hover:bg-white/40 transition-colors rounded-2xl mx-2 my-1">
                    <div className="flex items-start justify-between mb-2 gap-4">
                        <span className="font-bold text-slate-800 text-sm leading-snug">{flag.issue}</span>
                        <SeverityBadge severity={flag.severity} />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{flag.description}</p>
                    {flag.source_document && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/40 border border-white/50 rounded-lg text-[10px] font-bold text-slate-500">
                            <Quote size={10} />
                            <span>Found in: {flag.source_document}</span>
                        </div>
                    )}
                </div>
                ))
            )}
          </div>
        </div>

        {/* Fix Plan */}
        <div className="glass-panel rounded-[2.5rem] flex flex-col h-full overflow-hidden">
           <div className="p-6 border-b border-white/40 flex items-center gap-3 bg-emerald-50/20 backdrop-blur-md">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                 <CheckCircle size={22} />
            </div>
            <h3 className="font-bold text-emerald-950 text-lg">Remediation Strategy</h3>
          </div>
           <div className="divide-y divide-white/40 overflow-y-auto max-h-[500px] custom-scrollbar p-2">
             {report.executive_fix_plan.map((plan, idx) => (
               <div key={idx} className="p-5 flex gap-5 hover:bg-white/40 transition-colors rounded-2xl mx-2 my-1">
                 <div className="flex-shrink-0 mt-1">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-400 text-emerald-900 flex items-center justify-center text-sm font-bold shadow-sm">
                     {idx + 1}
                   </div>
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <h4 className="font-bold text-slate-800 text-sm">{plan.step}</h4>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border shadow-sm backdrop-blur-sm ${
                            plan.priority === 'Immediate' ? 'bg-red-50/50 text-red-600 border-red-100' : 
                            plan.priority === 'High' ? 'bg-orange-50/50 text-orange-600 border-orange-100' :
                            'bg-blue-50/50 text-blue-600 border-blue-100'
                        }`}>{plan.priority}</span>
                   </div>
                   <p className="text-sm text-slate-600 leading-relaxed">{plan.rationale}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* --- FOURTH ROW: CONTRACT SENTIMENT & COMPLIANCE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract Sentiment Analysis */}
        {report.contract_sentiment && report.contract_sentiment.length > 0 && (
           <ContractSentiment clauses={report.contract_sentiment} />
        )}
        
        {/* Compliance Matrix */}
        <div className="glass-panel rounded-[2.5rem] p-8">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
                <div className="bg-cyber-mint/20 p-2 rounded-xl text-cyber-mint-deep">
                    <BookOpen size={20} />
                </div>
                Compliance Audit
            </h3>
            <div className="space-y-3">
                {report.compliance_matrix.map((check, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/40 border border-white/50 rounded-xl">
                        <span className="text-sm font-semibold text-slate-700">{check.regulation}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500 hidden sm:block">{check.notes}</span>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase border ${
                                check.status === 'Pass' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                check.status === 'Fail' ? 'bg-red-100 text-red-700 border-red-200' :
                                'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }`}>
                                {check.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
      
      {/* --- FIFTH ROW: PII FINDINGS --- */}
      {report.pii_findings && report.pii_findings.length > 0 && (
        <div className="grid grid-cols-1">
             <PIIFinder findings={report.pii_findings} />
        </div>
      )}

      {/* --- SIXTH ROW: EVIDENCE --- */}
      <div className="grid grid-cols-1">
        {/* Evidence Chains with Sources */}
        <div className="glass-panel rounded-[2.5rem] p-8">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-lg">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                    <Search size={20} />
                </div>
                Forensic Evidence Log
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {report.evidence_backed_explanations.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl bg-white/40 border border-white/50 hover:bg-white/60 transition-colors shadow-sm relative overflow-hidden group border-l-4 ${
                        item.risk_vector === 'Financial' ? 'border-l-indigo-500' :
                        item.risk_vector === 'Fraud' ? 'border-l-red-500' :
                        item.risk_vector === 'Legal' ? 'border-l-orange-500' :
                        'border-l-emerald-500'
                    }`}>
                        
                        {/* Header: Risk Vector */}
                        <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                item.risk_vector === 'Financial' ? 'bg-indigo-100 text-indigo-700' :
                                item.risk_vector === 'Fraud' ? 'bg-red-100 text-red-700' :
                                item.risk_vector === 'Legal' ? 'bg-orange-100 text-orange-700' :
                                'bg-emerald-100 text-emerald-700'
                            }`}>
                                {item.risk_vector} Vector
                             </span>
                        </div>

                        {/* Analysis */}
                        <div className="mb-3 text-sm font-medium text-slate-800 leading-snug">
                            {item.explanation}
                        </div>

                        {/* Verbatim Quote / Data */}
                        <div className="bg-slate-100/50 rounded-lg p-3 border border-slate-200/50 mb-3 group-hover:bg-white/80 transition-colors">
                            <div className="flex gap-2 items-start text-xs text-slate-500 font-mono">
                                <Quote size={12} className="flex-shrink-0 mt-0.5 text-slate-400" />
                                <span className="italic">"{item.verbatim_quote}"</span>
                            </div>
                        </div>

                        {/* Source Citation */}
                        <div className="flex justify-end items-center">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 border border-white/60 rounded-lg text-[10px] font-bold text-slate-500 hover:text-neon-blue-deep hover:border-neon-blue/30 hover:bg-white/80 transition-all cursor-help" title="Location in document">
                                <FileText size={10} />
                                <span>REF: {item.source_citation}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisReport;
