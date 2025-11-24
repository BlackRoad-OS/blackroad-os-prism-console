import { EnvCard } from '@/components/EnvCard';
import { StatusPill } from '@/components/StatusPill';
import { fetchEnvironments, fetchHealth } from '@/lib/fetcher';
import { SERVICE_ENV } from '@/lib/constants';

export default async function HomePage() {
  const [envs, health] = await Promise.all([fetchEnvironments(), fetchHealth()]);

  return (
    <div className="flex flex-col gap-6">
      <section className="card-surface flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-gray-400">Overall health</p>
          <div className="mt-1 flex items-center gap-2">
            <StatusPill label={health.status} tone="healthy" />
            <span className="text-sm text-gray-400">Uptime: {health.uptime}s</span>
          </div>
        </div>
        <div className="text-right text-sm text-gray-400">
          <p className="font-medium text-white">Environment: {SERVICE_ENV}</p>
          <p className="text-xs">App router • Edge-ready</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {envs.map((env) => (
          <EnvCard key={env.id} env={env} />
        ))}
      </section>
    </div>
  );
}
