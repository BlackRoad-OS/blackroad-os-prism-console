import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/config';
import { serviceConfig } from '@/config/serviceConfig';

export async function GET() {
  const version = process.env.npm_package_version ?? 'unknown';
  return NextResponse.json({
    service: serviceConfig.SERVICE_ID,
    name: serviceConfig.SERVICE_NAME,
    version,
    environment: serverConfig.environment,
    timestamp: new Date().toISOString()
  });
}
