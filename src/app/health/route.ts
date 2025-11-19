import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function GET() {
  const payload = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.environment,
    services: {
      coreApiConfigured: Boolean(config.coreApiUrl),
      agentsApiConfigured: Boolean(config.agentsApiUrl)
    }
  };

  return NextResponse.json(payload);
}
