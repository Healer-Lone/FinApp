import { Article } from '../types/article';

const getRandomChange = () => {
  const change = (Math.random() * 10 - 5).toFixed(2);
  return parseFloat(change);
};

const getRandomPrice = (base: number) => {
  return parseFloat((base + Math.random() * 50).toFixed(2));
};

export const mockArticles: Article[] = [
  {
    id: '1',
    company: 'Apple Inc.',
    headline: 'Apple Reports Record Q4 Earnings Beating Analyst Expectations',
    summary: 'Apple Inc. reported quarterly earnings of $1.64 per share, surpassing Wall Street estimates of $1.60. Revenue reached $94.9 billion, driven by strong iPhone 15 sales and services growth. The tech giant announced a 4% dividend increase and $110 billion buyback program. CFO Luca Maestri highlighted robust performance in emerging markets, particularly India and Southeast Asia. Mac and iPad sales showed resilience despite industry headwinds. Services revenue grew 16% year-over-year, reaching an all-time high.',
    stockSymbol: 'AAPL',
    currentPrice: getRandomPrice(180),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Technology',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '2',
    company: 'JPMorgan Chase',
    headline: 'JPMorgan Posts Strong Profit Growth on Investment Banking Surge',
    summary: 'JPMorgan Chase reported net income of $13.2 billion in Q4, up 32% from last year. Investment banking fees jumped 50% to $2.4 billion, driven by increased M&A activity and capital markets transactions. Net interest income rose 12% to $23.1 billion. CEO Jamie Dimon expressed optimism about economic resilience while cautioning about geopolitical uncertainties. The bank maintained its market-leading position in credit cards and consumer banking. Provisions for credit losses remained stable at $2.7 billion.',
    stockSymbol: 'JPM',
    currentPrice: getRandomPrice(160),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Banking',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: '3',
    company: 'Tesla Inc.',
    headline: 'Tesla Delivers 1.8M Vehicles in 2024, Plans Gigafactory Expansion',
    summary: 'Tesla announced record annual deliveries of 1.8 million vehicles, meeting guidance despite production challenges. Q4 margins improved to 16.3% as manufacturing efficiency gains offset price cuts. The company revealed plans for two new Gigafactory locations in Asia and Europe. Model Y maintained its position as the world\'s best-selling vehicle. Energy storage deployments tripled year-over-year. CEO Elon Musk confirmed FSD Beta rollout across Europe in Q2 2025. The Cybertruck production ramping continues.',
    stockSymbol: 'TSLA',
    currentPrice: getRandomPrice(250),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Technology',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: '4',
    company: 'ExxonMobil',
    headline: 'Exxon Announces $36B Annual Profit Amid Energy Transition Push',
    summary: 'ExxonMobil reported annual earnings of $36 billion, down from previous year but exceeding expectations. The energy giant committed $17 billion to low-carbon initiatives through 2027. Production volumes increased 4% driven by Permian Basin and Guyana operations. The company announced a strategic partnership for hydrogen infrastructure development. Refining margins remained strong despite capacity additions. Shareholders received $32 billion through dividends and buybacks. CEO emphasized balanced approach to energy transition.',
    stockSymbol: 'XOM',
    currentPrice: getRandomPrice(110),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Energy',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: '5',
    company: 'Pfizer Inc.',
    headline: 'Pfizer\'s New Obesity Drug Shows Promising Results in Phase 3 Trials',
    summary: 'Pfizer unveiled positive Phase 3 results for its oral obesity treatment, showing average weight loss of 15% over 12 months. The drug demonstrated superior safety profile compared to competitors. Revenue guidance raised by $2 billion for fiscal 2025. COVID vaccine sales normalized to $3.5 billion quarterly. The oncology portfolio grew 20% with strong Ibrance and Eliquis performance. Three new drug applications submitted to FDA. CEO announced aggressive R&D investment plan targeting metabolic diseases.',
    stockSymbol: 'PFE',
    currentPrice: getRandomPrice(40),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Healthcare',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
  },
  {
    id: '6',
    company: 'Amazon.com',
    headline: 'Amazon Web Services Revenue Jumps 32% as Cloud Demand Accelerates',
    summary: 'Amazon reported AWS revenue of $26.3 billion in Q4, significantly ahead of forecasts. Operating margin in cloud segment expanded to 38%. Retail sales grew 9% with strong Prime membership additions. The company announced major AI infrastructure investments totaling $12 billion. North America retail margins improved to 5.7%. International segment turned profitable for first time since 2021. Advertising revenue reached $14.7 billion, up 24%. CEO Andy Jassy highlighted progress in generative AI offerings.',
    stockSymbol: 'AMZN',
    currentPrice: getRandomPrice(175),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Technology',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
  },
  {
    id: '7',
    company: 'Coca-Cola Company',
    headline: 'Coca-Cola Raises Dividend for 62nd Consecutive Year, Reports Growth',
    summary: 'Coca-Cola announced 3% dividend increase, maintaining status as dividend aristocrat. Organic revenue grew 11% driven by pricing and volume gains. The company expanded portfolio with 15 new zero-sugar products. Emerging markets revenue surged 18%. Operating margin reached 30.2%, highest in five years. Management confirmed full-year guidance and outlined innovation pipeline. Latin America showed strongest performance with 22% growth. Sustainability initiatives reduced water usage by 20% year-over-year.',
    stockSymbol: 'KO',
    currentPrice: getRandomPrice(60),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Consumer',
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
  },
  {
    id: '8',
    company: 'Microsoft Corporation',
    headline: 'Microsoft Azure Growth Accelerates to 30% with AI Integration Boost',
    summary: 'Microsoft posted revenue of $62 billion, up 18% year-over-year. Azure revenue acceleration attributed to Copilot adoption across enterprise clients. LinkedIn revenue grew 9% with record engagement metrics. Office commercial products revenue increased 15%. Gaming revenue jumped 51% following Activision integration. The company highlighted $80 billion AI infrastructure investment plan. Productivity suite added 15 million subscribers. CEO Satya Nadella emphasized platform approach to AI monetization and cloud-first strategy.',
    stockSymbol: 'MSFT',
    currentPrice: getRandomPrice(410),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Technology',
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
  },
  {
    id: '9',
    company: 'Goldman Sachs',
    headline: 'Goldman Sachs Trading Revenue Surges 18% Driven by Fixed Income',
    summary: 'Goldman Sachs reported quarterly profit of $3.2 billion, beating consensus by 12%. Fixed income trading revenue rose 24% to $3.8 billion. Equities trading grew 10% with strong derivatives performance. Asset and wealth management fees increased 17%. The bank announced strategic exit from consumer banking to focus on core strengths. Investment banking backlog reached $12 billion, highest since 2021. Return on equity improved to 13.8%. CEO David Solomon emphasized discipline in expense management.',
    stockSymbol: 'GS',
    currentPrice: getRandomPrice(450),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Banking',
    timestamp: new Date(Date.now() - 1000 * 60 * 420),
  },
  {
    id: '10',
    company: 'Boeing Company',
    headline: 'Boeing Secures $45B Order Book as 737 MAX Production Stabilizes',
    summary: 'Boeing announced $45 billion in new aircraft orders across commercial and defense segments. 737 MAX production rate increased to 38 per month ahead of schedule. The company resolved major supply chain bottlenecks affecting deliveries. Defense segment won $8 billion in government contracts. Free cash flow turned positive at $2.1 billion. Quality metrics improved with 30% reduction in production defects. CEO Dave Calhoun outlined path to normalized production rates. 787 Dreamliner backlog grew to 500 units.',
    stockSymbol: 'BA',
    currentPrice: getRandomPrice(210),
    priceChange: getRandomChange(),
    percentageChange: getRandomChange(),
    sector: 'Manufacturing',
    timestamp: new Date(Date.now() - 1000 * 60 * 480),
  },
];

export const getArticlesByCategory = (category: string): Article[] => {
  if (category === 'All') {
    return mockArticles;
  }
  return mockArticles.filter((article) => article.sector === category);
};
