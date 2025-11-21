import { NextResponse } from 'next/server';
import { publicConfig, serverConfig } from '@/lib/config';
import { serviceConfig } from '@/config/serviceConfig';

export async function GET() {
  const safeEnv = {
    nodeEnv: process.env.NODE_ENV,
    nextRuntime: process.env.NEXT_RUNTIME,
    environment: serverConfig.environment,
    serviceId: serviceConfig.SERVICE_ID,
    serviceName: serviceConfig.SERVICE_NAME,
    serviceBaseUrl: serviceConfig.SERVICE_BASE_URL,
    osRoot: serviceConfig.OS_ROOT,
    publicCoreApiUrl: publicConfig.coreApiUrl,
    publicAgentsApiUrl: publicConfig.agentsApiUrl,
    publicConsoleUrl: publicConfig.consoleUrl
  };

  return NextResponse.json(safeEnv);
}
