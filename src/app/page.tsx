import { getStaticServiceHealth, publicConfig, serverConfig } from '@/lib/config';

const cards = [
  { title: 'Core API', key: 'coreApiUrl', description: 'Primary backend for Prism data.' },
  { title: 'Agents API', key: 'agentsApiUrl', description: 'Agent runtime surface area.' },
  { title: 'Console URL', key: 'consoleUrl', description: 'Public entrypoint for this console.' }
] as const;

export default function Home() {
  const serviceHealth = getStaticServiceHealth();
  const resolvedValues = {
    coreApiUrl: publicConfig.coreApiUrl || serverConfig.coreApiUrl,
    agentsApiUrl: publicConfig.agentsApiUrl || serverConfig.agentsApiUrl,
    consoleUrl: publicConfig.consoleUrl || serverConfig.consoleUrl
  } as const;

  return (
    <div className="grid">
      <div className="card">
        <h3>Environment</h3>
        <p className="muted">Aligns with Railway and Cloudflare mapping.</p>
        <div className="badge">{serverConfig.environment}</div>
        <table className="table">
          <tbody>
            {cards.map((card) => (
              <tr key={card.key}>
                <td>{card.title}</td>
                <td className="muted">{resolvedValues[card.key] || 'not set'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted" style={{ marginTop: 12 }}>
          Add authentication here later — centralize auth checks before rendering protected pages.
        </p>
      </div>

      <div className="card">
        <h3>Connectivity</h3>
        <p className="muted">Configuration-based readiness of upstream services.</p>
        <ul>
          {serviceHealth.map((service) => (
            <li key={service.key}>
              {service.name}:{' '}
              <span className={service.configured ? 'status-ok' : 'status-bad'}>
                {service.configured ? 'Configured' : 'Missing'}
              </span>{' '}
              <span className="muted">{service.url || 'not set'}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Notes</h3>
        <ul>
          <li>Use /status for a focused service status board.</li>
          <li>Centralized fetch helper lives in <code>src/lib/api.ts</code>.</li>
          <li>Health endpoint: <code>/api/health</code>.</li>
        </ul>
      </div>
    </div>
  );
}
