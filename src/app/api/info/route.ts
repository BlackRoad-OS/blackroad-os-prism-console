import { NextResponse } from 'next/server';
import { serviceConfig } from '@/config/serviceConfig';

export async function GET() {
  const payload = {
    name: serviceConfig.SERVICE_NAME,
    id: serviceConfig.SERVICE_ID,
    baseUrl: serviceConfig.SERVICE_BASE_URL,
    osRoot: serviceConfig.OS_ROOT,
    ts: new Date().toISOString()
  };

  return NextResponse.json(payload);
}
