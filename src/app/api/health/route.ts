import { NextResponse } from 'next/server';
import { pollServiceHealth, serverConfig } from '@/lib/config';
import { SERVICE_ID } from '@/config/serviceConfig';

export async function GET() {
  const services = await pollServiceHealth();
  const healthy = services.every((service) => service.status === 'healthy' || service.status === 'not_configured');

  const payload = {
    ok: healthy,
    service: SERVICE_ID,
    ts: new Date().toISOString(),
    status: healthy ? 'ok' : 'degraded',
    environment: serverConfig.environment,
    version: process.env.npm_package_version ?? 'unknown',
    services
  };

  return NextResponse.json(payload, { status: healthy ? 200 : 503 });
}
