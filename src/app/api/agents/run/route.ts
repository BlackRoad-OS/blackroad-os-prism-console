import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/config';

export async function POST(request: Request) {
  if (!serverConfig.agentsApiUrl) {
    return NextResponse.json({ error: 'AGENTS_API_URL is not configured' }, { status: 503 });
  }

  const url = new URL('/agents/run', serverConfig.agentsApiUrl);
  const body = await request.json().catch(() => ({}));

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body ?? {}),
      cache: 'no-store'
    });

    const payload = await response.json().catch(() => ({}));

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to trigger agent' },
      { status: 502 }
    );
  }
}
