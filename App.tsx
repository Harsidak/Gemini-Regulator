import React, { useState } from 'react';
import { ShieldCheck, Loader2, RotateCcw, HelpCircle, ArrowLeft } from 'lucide-react';
import FileUpload from './components/FileUpload';
import AnalysisReport from './components/AnalysisReport';
import GuideModal from './components/GuideModal';
import LandingPage from './components/LandingPage';
import { AppStatus, ProcessedFile, RegulatorReport } from './types';
import { analyzeDocuments } from './services/geminiService';

const App: React.FC = () => {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [status, setStatus] = useState<AppStatus>(AppStatus.LANDING);
  const [report, setReport] = useState<RegulatorReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleAnalyze = async () => {
    if (files.length === 0) return;

    setStatus(AppStatus.ANALYZING);
    setErrorMsg(null);

    try {
      const result = await analyzeDocuments(files);
      setReport(result);
      setStatus(AppStatus.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred during analysis.");
      setStatus(AppStatus.ERROR);
    }
  };

  const resetApp = () => {
    setFiles([]);
    setReport(null);
    setStatus(AppStatus.IDLE);
    setErrorMsg(null);
  };
  
  const goBackToLanding = () => {
      resetApp();
      setStatus(AppStatus.LANDING);
  };

  // Render Landing Page
  if (status === AppStatus.LANDING) {
      return <LandingPage onStart={() => setStatus(AppStatus.IDLE)} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Floating Glass Header */}
      <header className="sticky top-6 z-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/40 border border-white/40 shadow-xl shadow-neon-blue/5 rounded-2xl h-20 flex items-center justify-between px-6 transition-all duration-300">
          <div className="flex items-center gap-3 cursor-pointer" onClick={goBackToLanding}>
            <div className="bg-gradient-to-br from-neon-blue-electric to-neon-purple-hyper p-2.5 rounded-xl shadow-lg shadow-neon-blue/20 text-white">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">GEMINI REGULATOR</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="group flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-neon-blue-deep transition-all px-4 py-2.5 rounded-xl bg-white/30 hover:bg-white/60 border border-white/20 backdrop-blur-md shadow-sm hover:shadow-md"
            >
              <HelpCircle size={18} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Guide</span>
            </button>
            {status === AppStatus.COMPLETE && (
               <button 
                 onClick={resetApp}
                 className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-neon-blue-deep transition-all px-4 py-2.5 rounded-xl bg-white/30 hover:bg-white/60 border border-white/20 backdrop-blur-md shadow-sm hover:shadow-md"
               >
                 <RotateCcw size={16} />
                 New Analysis
               </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Input Section (Hidden when complete) */}
          {status !== AppStatus.COMPLETE && (
            <div className={`max-w-4xl mx-auto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${status === AppStatus.ANALYZING ? 'scale-95 opacity-50 blur-[2px] pointer-events-none' : 'scale-100 opacity-100'}`}>
              <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 mb-8 relative overflow-hidden">
                 
                 <div className="relative z-10 text-center mb-10">
                   <h2 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Enterprise Intelligence.</h2>
                   <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
                     Drag & drop complex business documentation. <br/>
                     <span className="text-neon-blue-electric font-semibold">Gemini 2.5</span> fuses vision and text to expose risk.
                   </p>
                 </div>
                 
                 <FileUpload files={files} setFiles={setFiles} isAnalyzing={status === AppStatus.ANALYZING} />

                 <div className="mt-10 flex justify-center relative z-10">
                   <button
                     onClick={handleAnalyze}
                     disabled={files.length === 0 || status === AppStatus.ANALYZING}
                     className={`
                       relative overflow-hidden group flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform
                       ${files.length === 0 
                         ? 'bg-slate-200/50 text-slate-400 cursor-not-allowed backdrop-blur-sm' 
                         : 'bg-gradient-to-r from-neon-blue-electric to-neon-purple-hyper text-white shadow-xl shadow-neon-blue/30 hover:shadow-neon-blue/50 hover:-translate-y-1 hover:scale-105 active:scale-95'}
                     `}
                   >
                     {status === AppStatus.ANALYZING ? (
                       <>
                         <Loader2 className="animate-spin" />
                         <span className="tracking-wide">Analyzing Evidence...</span>
                       </>
                     ) : (
                       <>
                         <ShieldCheck className="group-hover:rotate-12 transition-transform duration-300" />
                         <span className="tracking-wide">Generate Intelligence</span>
                       </>
                     )}
                   </button>
                 </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {status === AppStatus.ERROR && (
             <div className="max-w-3xl mx-auto mb-8 bg-red-50/80 backdrop-blur-xl border border-red-200/50 rounded-3xl p-6 flex items-center gap-4 text-red-700 shadow-lg animate-in slide-in-from-bottom-5">
                <div className="bg-red-100 p-3 rounded-full">
                  <ShieldCheck className="flex-shrink-0" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">Analysis Failed</p>
                  <p className="opacity-90">{errorMsg}</p>
                </div>
                <button onClick={() => setStatus(AppStatus.IDLE)} className="ml-auto px-4 py-2 bg-white/50 hover:bg-white/80 rounded-xl text-sm font-semibold transition-colors">Try Again</button>
             </div>
          )}

          {/* Results Section */}
          {status === AppStatus.COMPLETE && report && (
            <AnalysisReport report={report} />
          )}

        </div>
      </main>
      
      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm font-medium backdrop-blur-sm">
        <p>Powered by Google Gemini 2.5 • Enterprise Forensic AI</p>
      </footer>

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};

export default App;