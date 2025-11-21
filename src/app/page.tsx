import { LiveHealthCard } from '@/components/status/LiveHealthCard';
import { getStaticServiceHealth, publicConfig, serverConfig } from '@/lib/config';
import { serviceConfig } from '@/config/serviceConfig';

const serviceLinks = [
  { name: 'Core', url: 'https://core.blackroad.systems' },
  { name: 'API', url: 'https://api.blackroad.systems' },
  { name: 'Operator', url: 'https://operator.blackroad.systems' },
  { name: 'Web', url: 'https://blackroad.systems' },
  { name: 'Docs', url: 'https://docs.blackroad.systems' }
];

export default function Home() {
  const serviceHealth = getStaticServiceHealth();

  return (
    <div className="grid">
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h1>{serviceConfig.SERVICE_NAME}</h1>
        <p className="muted">Operator-facing control panel for BlackRoad OS</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="badge">Service ID: {serviceConfig.SERVICE_ID}</span>
          <span className="badge">Environment: {serverConfig.environment}</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <div className="muted">Base URL: {serviceConfig.SERVICE_BASE_URL}</div>
          <div className="muted">OS Root: {serviceConfig.OS_ROOT}</div>
        </div>
      </div>

      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h2>System Status</h2>
        <p className="muted">Live and static readiness signals for the Prism Console.</p>
        <div className="grid">
          <LiveHealthCard />
          <div className="card">
            <h3>Configuration Snapshot</h3>
            <p className="muted">Resolved URLs from server/public configuration.</p>
            <table className="table">
              <tbody>
                <tr>
                  <td>Core API</td>
                  <td className="muted">{publicConfig.coreApiUrl || serverConfig.coreApiUrl || 'not set'}</td>
                </tr>
                <tr>
                  <td>Agents API</td>
                  <td className="muted">{publicConfig.agentsApiUrl || serverConfig.agentsApiUrl || 'not set'}</td>
                </tr>
                <tr>
                  <td>Console URL</td>
                  <td className="muted">{publicConfig.consoleUrl || serverConfig.consoleUrl || 'not set'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <h3>Dependency Checklist</h3>
            <p className="muted">Configuration readiness across Prism Console dependencies.</p>
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
        </div>
      </div>

      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h3>Services</h3>
        <p className="muted">Static references for connected BlackRoad OS surfaces.</p>
        <ul>
          {serviceLinks.map((svc) => (
            <li key={svc.name}>
              <a href={svc.url} target="_blank" rel="noreferrer">
                {svc.name}
              </a>{' '}
              <span className="muted">{svc.url}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Operator Queue</h3>
        <p className="muted">Placeholder for pending operator tasks, incidents, or approvals.</p>
        <ul>
          <li>Integrate authentication for console routes.</li>
          <li>Connect deployment events stream.</li>
          <li>Surface observability snapshots from core services.</li>
        </ul>
      </div>
    </div>
  );
}
