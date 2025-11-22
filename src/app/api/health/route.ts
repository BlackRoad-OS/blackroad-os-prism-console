import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/config';

export async function GET() {
  const timestamp = new Date().toISOString();

  return NextResponse.json({
    ok: true,
    status: 'ok',
    service: 'prism-console',
    timestamp,
    ts: timestamp,
    environment: serverConfig.environment
  });
}
