import React, { useState } from 'react';
import { generateMarketPulse } from './services/geminiService';
import { PulseState } from './types';
import { Header } from './components/Header';
import { PulseDisplay } from './components/PulseDisplay';
import { ArrowRight, Loader2, RefreshCw, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [pulseState, setPulseState] = useState<PulseState>({
    status: 'idle',
    data: null,
    error: null,
  });

  const handleGenerate = async () => {
    setPulseState({ status: 'loading', data: null, error: null });
    try {
      const data = await generateMarketPulse();
      setPulseState({ status: 'success', data, error: null });
    } catch (error: any) {
      setPulseState({
        status: 'error',
        data: null,
        error: error.message || "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-900 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <div className="w-full max-w-7xl px-4 pb-20 pt-2 flex flex-col items-center">
        <Header />

        {/* Action Area */}
        <div className="mt-2 mb-16 w-full flex justify-center z-20">
          {pulseState.status === 'idle' && (
            <button
              onClick={handleGenerate}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900"
            >
              <Sparkles className="w-5 h-5 mr-2 text-indigo-200" />
              <span>Generate Briefing</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          )}

          {pulseState.status === 'loading' && (
             <div className="flex flex-col items-center justify-center p-8">
               <div className="relative">
                 <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                 <Loader2 className="w-10 h-10 text-indigo-400 animate-spin relative z-10" />
               </div>
               <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest mt-6 animate-pulse">Scanning Global Signals...</p>
               <p className="text-xs text-slate-500 mt-2">Aggregating live data sources</p>
             </div>
          )}

          {pulseState.status === 'error' && (
            <div className="w-full max-w-md bg-rose-950/30 border border-rose-900/50 rounded-xl p-6 text-center backdrop-blur-sm">
              <p className="text-rose-400 mb-4 font-medium">Unable to generate pulse.</p>
              <p className="text-xs text-rose-300/70 mb-6">{pulseState.error}</p>
              <button
                onClick={handleGenerate}
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-rose-600 rounded-full hover:bg-rose-500 transition-colors shadow-lg shadow-rose-900/20"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        {pulseState.status === 'success' && pulseState.data && (
           <div className="w-full flex flex-col items-center gap-6 animate-fade-in">
              <PulseDisplay data={pulseState.data} />
              
              <button
                onClick={handleGenerate}
                className="mt-8 px-6 py-3 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
           </div>
        )}
      </div>

      <footer className="w-full py-6 text-center text-slate-600 text-xs border-t border-slate-800 bg-slate-900/80 backdrop-blur-md fixed bottom-0 z-30">
        <p>&copy; {new Date().getFullYear()} Daily Market Pulse. Powered by Gemini 2.5 Flash.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
