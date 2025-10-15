import { normalizeArticle } from '../ArticleCard';

describe('normalizeArticle', () => {
  it('handles various field names and provides defaults', () => {
    const input: any = {
      uuid: '123',
      title: 'Acme launches rocket',
      content: 'Details',
      ticker: 'ACME',
      category: 'Aerospace',
      published_at: '2025-01-01T00:00:00Z',
      imageUrl: 'https://example.com/image.png',
    };
    const a = normalizeArticle(input);
    expect(a.id).toBe('123');
    expect(a.company).toBe('Acme');
    expect(a.headline).toBe('Acme launches rocket');
    expect(a.summary).toBe('Details');
    expect(a.stockSymbol).toBe('ACME');
    expect(a.sector).toBe('Aerospace');
    expect(a.imageUrl).toContain('http');
    expect(a.timestamp instanceof Date).toBe(true);
  });

  it('falls back to defaults when fields missing', () => {
    const a = normalizeArticle({});
    expect(a.id).toBe('');
    expect(a.company).toBe('Unknown');
    expect(a.headline).toBe('');
    expect(a.summary).toBe('');
    expect(a.sector).toBe('General');
    expect(a.imageUrl).toContain('unsplash');
  });
});
