import { NextResponse } from 'next/server';
import { pollServiceHealth, serverConfig } from '@/lib/config';
import { SERVICE_ID } from '@/config/serviceConfig';

export async function GET() {
  const services = await pollServiceHealth();
  const healthy = services.every((service) => service.status === 'healthy' || service.status === 'not_configured');

  const payload = {
    status: 'ok',
    service: 'prism-console',
    ok: healthy,
    ts: new Date().toISOString(),
    environment: serverConfig.environment,
    version: process.env.npm_package_version ?? 'unknown',
    services
  };

  return NextResponse.json(payload, { status: healthy ? 200 : 503 });
}
