import Link from 'next/link';
import { StatusPill } from './StatusPill';
import type { Env } from '@/types';

const statusCopy: Record<Env['status'], string> = {
  healthy: 'All systems go',
  warning: 'Investigate warnings',
  degraded: 'Reduced capacity'
};

export function EnvCard({ env }: { env: Env }) {
  return (
    <Link href={`/env/${env.id}`} className="block transition hover:translate-y-[-2px]">
      <article className="card-surface p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">{env.region.toUpperCase()}</p>
            <h2 className="text-lg font-semibold">{env.name}</h2>
          </div>
          <StatusPill label={statusCopy[env.status]} tone={env.status} />
        </div>
        <p className="mt-3 text-sm text-gray-400">Updated {new Date(env.updatedAt).toLocaleTimeString()}</p>
      </article>
    </Link>
  );
}
