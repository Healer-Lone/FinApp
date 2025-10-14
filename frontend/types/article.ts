export interface Article {
  id: string;
  company: string;
  headline: string;
  summary: string;
  stockSymbol: string;
  currentPrice?: number;
  priceChange?: number;
  percentageChange?: number;
  sector: string;
  timestamp: Date;
  imageUrl: string;
  imageColor: string;
  // New fields from Supabase
  nifty50?: string;
  bse200?: string;
}

export type Category = 'All' | 'Technology' | 'Banking' | 'Energy' | 'Healthcare' | 'Consumer' | 'Manufacturing' | 'IT Sector';