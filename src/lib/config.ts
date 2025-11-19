export type RuntimeEnvironment = 'development' | 'staging' | 'production';

type ReadEnvOptions = {
  optional?: boolean;
  defaultValue?: string;
};

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

export const config = {
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
  consoleUrl: readEnv('NEXT_PUBLIC_CONSOLE_URL', { optional: isDev }),
  coreApiUrl: readEnv('NEXT_PUBLIC_CORE_API_URL', { optional: isDev }),
  agentsApiUrl: readEnv('NEXT_PUBLIC_AGENTS_API_URL', { optional: isDev })
};

export type ServiceHealth = {
  name: string;
  url: string;
  configured: boolean;
};

export function getStaticServiceHealth(): ServiceHealth[] {
  return [
    {
      name: 'Core API',
      url: publicConfig.coreApiUrl || config.coreApiUrl,
      configured: Boolean(publicConfig.coreApiUrl || config.coreApiUrl)
    },
    {
      name: 'Agents API',
      url: publicConfig.agentsApiUrl || config.agentsApiUrl,
      configured: Boolean(publicConfig.agentsApiUrl || config.agentsApiUrl)
    }
  ];
}
