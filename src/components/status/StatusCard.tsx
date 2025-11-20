import { ServiceStatus } from '@/lib/config';

export type StatusCardProps = {
  title: string;
  description?: string;
  environment: string;
  services: ServiceStatus[];
};

function statusLabel(status: ServiceStatus['status']) {
  if (status === 'healthy') return 'status-ok';
  if (status === 'not_configured') return 'status-bad';
  return 'status-bad';
}

export function StatusCard({ title, description, environment, services }: StatusCardProps) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{title}</h3>
        <span className="badge">{environment}</span>
      </div>
      {description && <p className="muted">{description}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Service</th>
            <th>URL</th>
            <th>Status</th>
            <th>Latency</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.name}>
              <td>{service.name}</td>
              <td className="muted">{service.url || 'not set'}</td>
              <td className={statusLabel(service.status)}>
                {service.status === 'healthy' && 'Healthy'}
                {service.status === 'not_configured' && 'Not configured'}
                {service.status === 'unreachable' && 'Unreachable'}
              </td>
              <td className="muted">{service.latencyMs ? `${service.latencyMs} ms` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!services.every((svc) => svc.configured) && (
        <p className="muted">Backend URLs are required in staging/production.</p>
      )}
    </div>
  );
}
