import { getStaticServiceHealth, publicConfig } from '@/lib/config';
import { StatusCard } from '@/components/status/StatusCard';

export const metadata = {
  title: 'System Status | Prism Console'
};

export default function StatusPage() {
  const services = getStaticServiceHealth();
  const env = publicConfig.environment;

  return (
    <div className="grid">
      <StatusCard
        title="Prism Console"
        description="Static overview of configured upstream services. Replace mock health with live pings when endpoints are ready."
        environment={env}
        services={services}
      />
      <div className="card">
        <h3>Next Steps</h3>
        <ol>
          <li>Wire status to lightweight read-only endpoints from core and agents.</li>
          <li>Add authentication guard before exposing sensitive data.</li>
          <li>Expand to deployment + observability widgets under /status.</li>
        </ol>
      </div>
    </div>
  );
}
