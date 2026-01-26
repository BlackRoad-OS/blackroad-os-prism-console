import { Suspense } from 'react';

interface Intent {
  id: string;
  agentId: string;
  action: string;
  target?: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  reason?: string;
}

async function fetchIntents(): Promise<Intent[]> {
  try {
    const res = await fetch('https://api.blackroad.io/intents', {
      next: { revalidate: 10 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.intents || [];
  } catch (error) {
    console.error('Failed to fetch intents:', error);
    return [];
  }
}

function IntentCard({ intent }: { intent: Intent }) {
  const statusColors = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    executing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    completed: 'bg-green-500/10 text-green-400 border-green-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="card-surface p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-white">{intent.action}</h3>
            <div
              className={`px-2 py-0.5 rounded border text-xs font-medium ${
                statusColors[intent.status]
              }`}
            >
              {intent.status}
            </div>
          </div>
          {intent.target && (
            <p className="text-sm text-gray-400 mt-1">→ {intent.target}</p>
          )}
          {intent.reason && (
            <p className="text-sm text-gray-500 mt-2">{intent.reason}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span className="font-mono">{intent.agentId}</span>
        <span>{new Date(intent.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
}

async function IntentsList() {
  const intents = await fetchIntents();

  if (intents.length === 0) {
    return (
      <div className="card-surface p-8 text-center">
        <p className="text-gray-400">No intents declared</p>
        <p className="text-sm text-gray-500 mt-2">
          Intents will appear here as agents declare their intentions
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {intents.map((intent) => (
        <IntentCard key={intent.id} intent={intent} />
      ))}
    </div>
  );
}

export default function IntentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold text-white">Intents</h1>
        <p className="text-gray-400 mt-1">
          Track declared intentions across the BlackRoad mesh
        </p>
        <p className="text-sm text-gray-500 mt-2">
          &quot;Opacity is violence. Transparency is trust.&quot;
        </p>
      </section>

      <Suspense
        fallback={
          <div className="card-surface p-8 text-center text-gray-400">
            Loading intents...
          </div>
        }
      >
        <IntentsList />
      </Suspense>
    </div>
  );
}
