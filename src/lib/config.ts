export type RuntimeEnvironment = 'development' | 'staging' | 'production';

type ReadEnvOptions = {
  optional?: boolean;
  defaultValue?: string;
};

type ServiceKey = 'console' | 'core' | 'agents';

const nodeEnvRaw = (process.env.NODE_ENV || 'development') as string;
const environment: RuntimeEnvironment =
  nodeEnvRaw === 'production' ? 'production' : nodeEnvRaw === 'staging' ? 'staging' : 'development';

const isDev = environment === 'development';
const requireEnv = !isDev && process.env.SKIP_ENV_VALIDATION !== 'true';

function readEnv(variable: string, { optional, defaultValue }: ReadEnvOptions = {}): string {
  const value = process.env[variable];

  if (!value && !optional && requireEnv) {
    throw new Error(`Missing required environment variable ${variable} for ${environment}`);
  }

  if (!value && defaultValue) {
    return defaultValue;
  }

  return value ?? '';
}

export const serverConfig = {
  environment,
  nodeEnv: environment,
  coreApiUrl: readEnv('CORE_API_URL', { optional: isDev }),
  agentsApiUrl: readEnv('AGENTS_API_URL', { optional: isDev }),
  consoleUrl: readEnv('PUBLIC_CONSOLE_URL', { optional: isDev }),
  get isProduction() {
    return environment === 'production';
  },
  get isStaging() {
    return environment === 'staging';
  },
  get isDevelopment() {
    return environment === 'development';
  }
};

export const publicConfig = {
  environment,
  consoleUrl: readEnv('PUBLIC_CONSOLE_URL', { optional: true }),
  coreApiUrl: readEnv('NEXT_PUBLIC_CORE_API_URL', { optional: true }),
  agentsApiUrl: readEnv('NEXT_PUBLIC_AGENTS_API_URL', { optional: true })
};

export type ServiceDescriptor = {
  key: ServiceKey;
  name: string;
  url: string;
  configured: boolean;
};

export type ServiceStatus = ServiceDescriptor & {
  status: 'healthy' | 'unreachable' | 'not_configured';
  latencyMs?: number;
  error?: string;
};

const serviceCatalog: Record<ServiceKey, { name: string }> = {
  console: { name: 'Operator Console' },
  core: { name: 'Core API' },
  agents: { name: 'Agents API' }
};

function resolveServiceUrl(key: ServiceKey, preferPublic = true): string {
  if (key === 'console') {
    return preferPublic ? publicConfig.consoleUrl || serverConfig.consoleUrl : serverConfig.consoleUrl || publicConfig.consoleUrl;
  }

  if (key === 'core') {
    return preferPublic ? publicConfig.coreApiUrl || serverConfig.coreApiUrl : serverConfig.coreApiUrl || publicConfig.coreApiUrl;
  }

  return preferPublic ? publicConfig.agentsApiUrl || serverConfig.agentsApiUrl : serverConfig.agentsApiUrl || publicConfig.agentsApiUrl;
}

export function getStaticServiceHealth(preferPublic = true): ServiceDescriptor[] {
  return (Object.keys(serviceCatalog) as ServiceKey[]).map((key) => {
    const url = resolveServiceUrl(key, preferPublic);
    return {
      key,
      name: serviceCatalog[key].name,
      url,
      configured: Boolean(url)
    };
  });
}

function withHealthPath(url: string): string {
  if (!url) return '';
  try {
    const normalized = url.endsWith('/') ? url.slice(0, -1) : url;
    const target = new URL(normalized);
    target.pathname = target.pathname.endsWith('/health') ? target.pathname : `${target.pathname || ''}/health`;
    return target.toString();
  } catch (error) {
    return url;
  }
}

export async function pollServiceHealth(timeoutMs = 2500): Promise<ServiceStatus[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const checks = getStaticServiceHealth(false).map(async (service) => {
    if (!service.configured) {
      return { ...service, status: 'not_configured' as const } satisfies ServiceStatus;
    }

    const healthUrl = withHealthPath(service.url);
    const started = performance.now();

    try {
      const response = await fetch(healthUrl, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal
      });
      const latencyMs = Math.round(performance.now() - started);

      if (!response.ok) {
        return {
          ...service,
          status: 'unreachable',
          latencyMs,
          error: `HTTP ${response.status}`
        } satisfies ServiceStatus;
      }

      return {
        ...service,
        status: 'healthy',
        latencyMs
      } satisfies ServiceStatus;
    } catch (error) {
      return {
        ...service,
        status: 'unreachable',
        error: error instanceof Error ? error.message : 'unknown error'
      } satisfies ServiceStatus;
    }
  });

  const results = await Promise.all(checks);
  clearTimeout(timeout);
  return results;
}
