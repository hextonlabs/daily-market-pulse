export interface Source {
  title: string;
  uri: string;
}

export interface PulseItem {
  category: string; // e.g. "Markets", "Product", "GenAI", "Health"
  headline: string;
  summary: string;
  implication: string;
  url?: string;
}

export interface PulseData {
  general: PulseItem[];
  healthAi: PulseItem[];
  sources: Source[];
}

export interface PulseState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: PulseData | null;
  error: string | null;
}
