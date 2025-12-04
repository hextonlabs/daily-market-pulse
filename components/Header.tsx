import React from 'react';
import { Activity, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-12 px-4 text-center relative z-10">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[10%] right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl mb-6 shadow-2xl ring-1 ring-white/20">
        <Activity className="w-8 h-8 text-indigo-400" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-sm">
        Daily Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">Pulse</span>
      </h1>
      
      <p className="text-slate-300 max-w-lg text-base md:text-lg leading-relaxed">
        Ultra-concise intelligence for product & tech leaders — curated by Lee Heston-Fraser.<br/>
        <span className="text-slate-400 text-sm">AI • Product • Health • Markets</span>
      </p>
    </header>
  );
};