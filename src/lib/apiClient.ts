function buildApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured. Set it to your API endpoint.');
  }

  const normalizedBase = baseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export async function apiGet<T>(path: string): Promise<T> {
  const url = buildApiUrl(path);

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to reach API at ${url}: ${message}`);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const body = text || res.statusText;
    throw new Error(`API error ${res.status} from ${url}: ${body}`);
  }

  return res.json() as Promise<T>;
}
