import { pollServiceHealth, publicConfig } from '@/lib/config';
import { StatusCard } from '@/components/status/StatusCard';

export const metadata = {
  title: 'System Status | Prism Console'
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function StatusPage() {
  const services = await pollServiceHealth();
  const env = publicConfig.environment;

  return (
    <div className="grid">
      <StatusCard
        title="Prism Console"
        description="Live health from upstream services. Polls /health for each configured endpoint."
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
