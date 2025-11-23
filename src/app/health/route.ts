import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/config';

export async function GET() {
  const timestamp = new Date().toISOString();

  return NextResponse.json({
    status: 'ok',
    service: 'prism-console',
    meta: {
      timestamp,
      environment: serverConfig.environment
    }
  });
}
