import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/config';

export async function GET() {
  const version = process.env.npm_package_version ?? 'unknown';
  return NextResponse.json({
    version,
    environment: serverConfig.environment,
    timestamp: new Date().toISOString()
  });
}
