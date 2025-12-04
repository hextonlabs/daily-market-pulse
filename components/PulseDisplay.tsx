import React from 'react';
import { PulseData, PulseItem } from '../types';
import { Lightbulb, Zap, Activity, ExternalLink } from 'lucide-react';

interface PulseDisplayProps {
  data: PulseData;
}

// Curated high-performance images to ensure instant loading
const IMAGE_POOLS: Record<string, string[]> = {
  general: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80", // Skyscrapers
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", // Chip
    "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=600&q=80", // Stock tickers
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80", // Matrix code
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", // Analytics
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80", // Globe
  ],
  health: [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80", // DNA
    "https://images.unsplash.com/photo-1581093458791-9f302e6d839b?auto=format&fit=crop&w=600&q=80", // Robot arm
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80", // Research
    "https://images.unsplash.com/photo-1559757131-406ead92983b?auto=format&fit=crop&w=600&q=80", // Doctor
    "https://images.unsplash.com/photo-1584036561566-b93a901668d7?auto=format&fit=crop&w=600&q=80", // Micro
    "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80", // Pills/Data
  ]
};

const getInstantImage = (section: 'general' | 'health', index: number) => {
  const pool = IMAGE_POOLS[section];
  return pool[index % pool.length];
};

const Card: React.FC<{ item: PulseItem; index: number; section: 'general' | 'health' }> = ({ item, index, section }) => {
  const theme = section === 'general' 
    ? { border: 'border-indigo-500/30', badge: 'bg-indigo-500 text-white', text: 'text-indigo-200' }
    : { border: 'border-emerald-500/30', badge: 'bg-emerald-500 text-white', text: 'text-emerald-200' };

  const imageUrl = getInstantImage(section, index);
  
  // Use provided URL or fallback to a Google search for the headline
  const linkUrl = item.url || `https://www.google.com/search?q=${encodeURIComponent(item.headline)}`;

  return (
    <a 
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col bg-slate-800 rounded-xl overflow-hidden border ${theme.border} hover:border-white/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
    >
      <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={item.category}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm ${theme.badge}`}>
            {item.category}
          </span>
        </div>

        {/* External Link Icon on Hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
            <ExternalLink className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col relative z-10 -mt-8">
        <h3 className="text-base font-bold text-white leading-tight mb-2 font-serif drop-shadow-md group-hover:text-indigo-200 transition-colors">
          {item.headline}
        </h3>
        
        <p className="text-xs text-slate-300 mb-3 leading-relaxed opacity-90 group-hover:opacity-100">
          {item.summary}
        </p>

        <div className="mt-auto pt-3 border-t border-white/10 group-hover:border-white/20 transition-colors">
          <div className="flex items-start gap-1.5">
            <Lightbulb className={`w-3 h-3 mt-0.5 flex-shrink-0 ${theme.text}`} />
            <p className={`text-[10px] ${theme.text} font-medium leading-tight`}>
              {item.implication}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export const PulseDisplay: React.FC<PulseDisplayProps> = ({ data }) => {
  return (
    <div className="w-full max-w-7xl animate-fade-in-up pb-12">
      
      {/* SECTION 1: GLOBAL SIGNALS */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 px-4">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-serif font-bold text-white tracking-wide">
            Global Signals
          </h2>
          <div className="h-px bg-white/10 flex-1 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {data.general.map((item, idx) => (
            <Card key={`gen-${idx}`} item={item} index={idx} section="general" />
          ))}
        </div>
      </div>

      {/* SECTION 2: HEALTH AI */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 px-4">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-serif font-bold text-white tracking-wide">
            Health AI Frontier
          </h2>
          <div className="h-px bg-white/10 flex-1 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {data.healthAi.map((item, idx) => (
            <Card key={`health-${idx}`} item={item} index={idx} section="health" />
          ))}
        </div>
      </div>
    </div>
  );
};
