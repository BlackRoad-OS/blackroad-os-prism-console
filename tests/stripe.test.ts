import { products, getProductsByCategory } from '@/lib/stripe';

describe('lib/stripe', () => {
  it('exports a non-empty product catalog', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('every product has required fields', () => {
    for (const p of products) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(typeof p.price).toBe('number');
      expect(p.price).toBeGreaterThan(0);
      expect(['month', 'year']).toContain(p.interval);
      expect(['console', 'platform', 'drive', 'addon']).toContain(p.category);
      expect(p.features.length).toBeGreaterThan(0);
    }
  });

  it('includes drive products', () => {
    const drive = getProductsByCategory('drive');
    expect(drive.length).toBeGreaterThanOrEqual(3);
    expect(drive.every((p) => p.category === 'drive')).toBe(true);
  });

  it('includes console products', () => {
    const console = getProductsByCategory('console');
    expect(console.length).toBe(3);
  });

  it('includes platform products', () => {
    const platform = getProductsByCategory('platform');
    expect(platform.length).toBe(3);
  });

  it('includes addon products', () => {
    const addons = getProductsByCategory('addon');
    expect(addons.length).toBeGreaterThanOrEqual(2);
  });

  it('returns empty array for unknown category', () => {
    expect(getProductsByCategory('nonexistent')).toEqual([]);
  });
});
