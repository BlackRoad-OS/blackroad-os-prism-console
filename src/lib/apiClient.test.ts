import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { apiGet } from './apiClient';

const originalEnv = process.env.NEXT_PUBLIC_API_BASE_URL;

beforeEach(() => {
  vi.restoreAllMocks();
  process.env.NEXT_PUBLIC_API_BASE_URL = originalEnv;
});

afterEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
  process.env.NEXT_PUBLIC_API_BASE_URL = originalEnv;
});

describe('apiClient', () => {
  it('throws when base URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;

    await expect(apiGet('/internal/agents')).rejects.toThrow('NEXT_PUBLIC_API_BASE_URL is not configured');
  });

  it('normalizes the request URL and returns JSON', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.com/';
    const payload = { ok: true };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => payload
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await apiGet('internal/agents');

    expect(fetchMock).toHaveBeenCalledWith('https://api.example.com/internal/agents', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    });
    expect(result).toEqual(payload);
  });

  it('wraps network failures with URL context', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.com';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('connection refused')));

    await expect(apiGet('/internal/agents')).rejects.toThrow(
      'Failed to reach API at https://api.example.com/internal/agents: connection refused'
    );
  });
});
