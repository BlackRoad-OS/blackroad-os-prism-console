import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/config';

export async function GET() {
  if (!serverConfig.agentsApiUrl) {
    return NextResponse.json({ error: 'AGENTS_API_URL is not configured' }, { status: 503 });
  }

  const url = new URL('/agents', serverConfig.agentsApiUrl);

  try {
    const response = await fetch(url.toString(), { cache: 'no-store' });
    const payload = await response.json();
    const agents = Array.isArray(payload) ? payload : payload.agents ?? [];
    return NextResponse.json({ agents });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to load agents' },
      { status: 502 }
    );
  }
}
