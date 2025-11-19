import { ServiceHealth } from '@/lib/config';

export type StatusCardProps = {
  title: string;
  description?: string;
  environment: string;
  services: ServiceHealth[];
};

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
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.name}>
              <td>{service.name}</td>
              <td className="muted">{service.url || 'not set'}</td>
              <td className={service.configured ? 'status-ok' : 'status-bad'}>
                {service.configured ? 'Configured' : 'Missing'}
              </td>
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
