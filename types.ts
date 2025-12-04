export interface Source {
  title: string;
  uri: string;
}

export interface PulseItem {
  category: string;
  headline: string;
  summary: string;
  implication: string;
  visualPrompt: string;
}

export interface PulseData {
  items: PulseItem[];
  sources: Source[];
}

export interface PulseState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: PulseData | null;
  error: string | null;
}
