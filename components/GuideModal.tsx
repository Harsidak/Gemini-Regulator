import React from 'react';
import { X, FileText, Activity, ShieldAlert, CheckCircle, FileUp } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Glass Modal */}
      <div className="relative backdrop-blur-2xl bg-white/80 border border-white/50 rounded-[2.5rem] shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/30 bg-white/30 backdrop-blur-xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Manual</h2>
            <p className="text-sm text-slate-500 font-medium">Gemini Regulator v1.0</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-indigo-700">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FileUp size={20} />
              </div>
              <h3 className="font-bold text-lg">Supported Intelligence Types</h3>
            </div>
            <div className="bg-white/50 rounded-2xl p-6 border border-white/60 shadow-sm">
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                Gemini Regulator uses multimodal fusion to read diverse data streams concurrently.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
                  <span className="font-bold text-slate-700">PDF Contracts</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
                  <span className="font-bold text-slate-700">Image Receipts (PNG/JPG)</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
                  <span className="font-bold text-slate-700">CSV Ledgers</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
                  <span className="font-bold text-slate-700">Raw Text Logs</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-indigo-700">
              <div className="p-2 bg-indigo-100 rounded-lg">
                 <Activity size={20} />
              </div>
              <h3 className="font-bold text-lg">Forensic Logic Engine</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/30">1</div>
                  <div className="w-0.5 h-full bg-indigo-200/50 my-1 rounded-full"></div>
                </div>
                <div className="pb-6">
                   <h4 className="font-bold text-slate-800">Multimodal Fusion</h4>
                   <p className="text-sm text-slate-500 mt-1">Ingests visual layout, handwritten signatures, and digital text simultaneously.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/30">2</div>
                  <div className="w-0.5 h-full bg-indigo-200/50 my-1 rounded-full"></div>
                </div>
                <div className="pb-6">
                   <h4 className="font-bold text-slate-800">Graph Construction</h4>
                   <p className="text-sm text-slate-500 mt-1">Builds an internal map of entities (Vendors, Dates, Amounts) to find discrepancies.</p>
                </div>
              </div>
               <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/30">3</div>
                </div>
                <div>
                   <h4 className="font-bold text-slate-800">Risk Scoring</h4>
                   <p className="text-sm text-slate-500 mt-1">Calculates 0-100 probability scores for Fraud, Legal, and Operational risk.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4 text-indigo-700">
               <div className="p-2 bg-indigo-100 rounded-lg">
                <FileText size={20} />
               </div>
              <h3 className="font-bold text-lg">Report Legend</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="p-4 bg-white/60 border border-white/60 rounded-2xl shadow-sm text-center">
                  <Activity className="text-orange-500 mx-auto mb-2" size={24} />
                  <h4 className="font-bold text-slate-800 text-sm">Radar</h4>
                  <p className="text-xs text-slate-500 mt-1">Scores > 70 are critical.</p>
               </div>
               <div className="p-4 bg-white/60 border border-white/60 rounded-2xl shadow-sm text-center">
                  <ShieldAlert className="text-red-500 mx-auto mb-2" size={24} />
                  <h4 className="font-bold text-slate-800 text-sm">Red Flags</h4>
                  <p className="text-xs text-slate-500 mt-1">Violations cited w/ proof.</p>
               </div>
               <div className="p-4 bg-white/60 border border-white/60 rounded-2xl shadow-sm text-center">
                  <CheckCircle className="text-emerald-500 mx-auto mb-2" size={24} />
                  <h4 className="font-bold text-slate-800 text-sm">Fix Plan</h4>
                  <p className="text-xs text-slate-500 mt-1">Prioritized to-do list.</p>
               </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/30 bg-white/40 backdrop-blur-xl text-center">
            <button 
                onClick={onClose}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 active:scale-95"
            >
                Acknowledge
            </button>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;