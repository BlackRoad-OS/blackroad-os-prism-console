'use client';

import { useEffect, useState } from 'react';
import { StatusPill } from '@/components/StatusPill';

interface Environment {
  id: string;
  name: string;
  region: string;
  status: string;
  updatedAt: string;
}

interface DeploySummary {
  artifact: string;
  lastDeploy: string;
}

export default function EnvClient({ envId }: { envId: string }) {
  const [env, setEnv] = useState<Environment | null>(null);
  const [deploy, setDeploy] = useState<DeploySummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for static export - would fetch from API in production
    setEnv({
      id: envId,
      name: `Environment ${envId}`,
      region: 'us-west',
      status: 'healthy',
      updatedAt: new Date().toISOString()
    });
    setDeploy({
      artifact: 'v1.0.0',
      lastDeploy: new Date().toISOString()
    });
    setLoading(false);
  }, [envId]);

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (!env) {
    return <div className="text-gray-400">Environment not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card-surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{env.region.toUpperCase()}</p>
            <h1 className="text-2xl font-semibold">{env.name}</h1>
          </div>
          <StatusPill label={env.status} tone={env.status as any} />
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
