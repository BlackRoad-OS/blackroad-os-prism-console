import { notFound } from 'next/navigation';
import { StatusPill } from '@/components/StatusPill';
import { fetchDeploySummary, fetchEnvironmentById } from '@/lib/fetcher';

interface EnvPageProps {
  params: { id: string };
}

export default async function EnvDetailPage({ params }: EnvPageProps) {
  const env = await fetchEnvironmentById(params.id);
  if (!env) {
    notFound();
  }

  const deploy = await fetchDeploySummary(env.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="card-surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{env.region.toUpperCase()}</p>
            <h1 className="text-2xl font-semibold">{env.name}</h1>
          </div>
          <StatusPill label={env.status} tone={env.status} />
        </div>
        <p className="mt-2 text-sm text-gray-400">Updated {new Date(env.updatedAt).toLocaleString()}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="card-surface p-4">
          <h2 className="text-lg font-semibold">Deployments</h2>
          <p className="text-sm text-gray-400">Most recent artifact and timestamp.</p>
          <div className="mt-3 rounded-lg bg-black/20 p-3">
            <p className="text-sm text-gray-300">Artifact: {deploy?.artifact ?? 'pending'}</p>
            <p className="text-xs text-gray-400">Last deploy: {deploy?.lastDeploy ?? 'unknown'}</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">TODO(prism-next): stream from $CORE_HUB/ws</p>
        </article>

        <article className="card-surface p-4">
          <h2 className="text-lg font-semibold">Signals</h2>
          <p className="text-sm text-gray-400">Charts and alerts land here.</p>
          <div className="mt-3 flex h-24 items-center justify-center rounded-lg border border-dashed border-white/10 text-xs text-gray-500">
            TODO(prism-next): wire metrics
          </div>
        </article>
      </div>
    </div>
  );
}
