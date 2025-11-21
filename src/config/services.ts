const resolveHealthUrl = (envKey: string, fallback: string) => {
  return process.env[`NEXT_PUBLIC_${envKey}`] || process.env[envKey] || fallback;
};

export const osServices = [
  {
    id: 'core',
    name: 'Core Service',
    healthUrl: resolveHealthUrl('CORE_HEALTH_URL', 'https://core.blackroad.systems/health')
  },
  {
    id: 'operator',
    name: 'Operator Service',
    healthUrl: resolveHealthUrl('OPERATOR_HEALTH_URL', 'https://operator.blackroad.systems/health')
  },
  {
    id: 'web',
    name: 'Web Frontend',
    healthUrl: resolveHealthUrl('WEB_HEALTH_URL', 'https://blackroad.systems/api/health')
  },
  {
    id: 'prism-console',
    name: 'Prism Console',
    healthUrl: resolveHealthUrl('PRISM_CONSOLE_HEALTH_URL', 'https://console.blackroad.systems/api/health')
  },
  {
    id: 'docs',
    name: 'Docs',
    healthUrl: resolveHealthUrl('DOCS_HEALTH_URL', 'https://docs.blackroad.systems/api/health')
  }
];
