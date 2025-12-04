import React from 'react';
import { PulseData, PulseItem } from '../types';
import { ExternalLink, BookOpen, TrendingUp, Lightbulb } from 'lucide-react';

interface PulseDisplayProps {
  data: PulseData;
}

const CategoryCard: React.FC<{ item: PulseItem; index: number }> = ({ item, index }) => {
  // Map categories to specific color themes
  const getTheme = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('ai')) return { bg: 'bg-indigo-50', text: 'text-indigo-900', accent: 'bg-indigo-500', border: 'border-indigo-100', badge: 'bg-indigo-100 text-indigo-700' };
    if (lower.includes('product')) return { bg: 'bg-emerald-50', text: 'text-emerald-900', accent: 'bg-emerald-500', border: 'border-emerald-100', badge: 'bg-emerald-100 text-emerald-700' };
    if (lower.includes('health')) return { bg: 'bg-rose-50', text: 'text-rose-900', accent: 'bg-rose-500', border: 'border-rose-100', badge: 'bg-rose-100 text-rose-700' };
    return { bg: 'bg-amber-50', text: 'text-amber-900', accent: 'bg-amber-500', border: 'border-amber-100', badge: 'bg-amber-100 text-amber-700' };
  };

  const theme = getTheme(item.category);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(item.visualPrompt + " minimal modern high quality abstract 3d render")}`;

  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border ${theme.border}`}>
      {/* Image Area */}
      <div className="h-40 w-full bg-gray-200 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={item.visualPrompt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4">
          <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/90 ${theme.text} shadow-sm`}>
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight mb-3">
          {item.headline}
        </h3>
        
        <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
          {item.summary}
        </p>

        <div className={`mt-auto p-4 rounded-xl ${theme.bg} border ${theme.border}`}>
          <div className="flex items-start gap-2">
            <Lightbulb className={`w-4 h-4 mt-0.5 ${theme.text}`} />
            <div>
              <span className={`text-xs font-bold uppercase tracking-wide ${theme.text} block mb-1`}>Implication</span>
              <p className={`text-sm ${theme.text} font-medium leading-snug`}>
                {item.implication}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PulseDisplay: React.FC<PulseDisplayProps> = ({ data }) => {
  return (
    <div className="w-full max-w-6xl animate-fade-in-up pb-12">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8 px-4">
        <BookOpen className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
          Today's Intel
        </h2>
        <div className="h-px bg-white/20 flex-1 ml-4"></div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
        {data.items.map((item, idx) => (
          <CategoryCard key={idx} item={item} index={idx} />
        ))}
      </div>

      {/* Sources Section */}
      {data.sources.length > 0 && (
        <div className="mt-12 mx-4 p-6 bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700/50">
          <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            <TrendingUp className="w-4 h-4" />
            Verified Sources
          </h4>
          <div className="flex flex-wrap gap-3">
            {data.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 text-slate-300 text-xs hover:bg-indigo-600 hover:text-white transition-all border border-slate-600 hover:border-indigo-500"
                title={source.title}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="max-w-[150px] truncate">{source.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center text-slate-500 text-xs">
        Images generated real-time based on content analysis.
      </div>
    </div>
  );
};
