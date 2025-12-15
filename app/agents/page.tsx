import { Suspense } from 'react';

interface Agent {
  id: string;
  identity: string;
  name?: string;
  type: 'human' | 'ai' | 'system' | 'hybrid';
  status: 'observing' | 'active' | 'sleeping' | 'suspended';
  trustScore: number;
  lastSeen: string;
}

async function fetchAgents(): Promise<Agent[]> {
  try {
    const res = await fetch('https://api.blackroad.io/agents', {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.agents || [];
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return [];
  }
}

function AgentCard({ agent }: { agent: Agent }) {
  const statusColors = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    observing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    sleeping: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    suspended: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const typeIcons = {
    human: '👤',
    ai: '🤖',
    system: '⚙️',
    hybrid: '🧬',
  };

  return (
    <div className="card-surface p-4 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{typeIcons[agent.type]}</span>
          <div>
            <h3 className="font-medium text-white">
              {agent.name || agent.identity}
            </h3>
            <p className="text-xs text-gray-500 font-mono">{agent.identity}</p>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded border text-xs font-medium ${
            statusColors[agent.status]
          }`}
        >
          {agent.status}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Type</p>
          <p className="text-white capitalize">{agent.type}</p>
        </div>
        <div>
          <p className="text-gray-400">Trust Score</p>
          <p className="text-white">{agent.trustScore.toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Last seen: {new Date(agent.lastSeen).toLocaleString()}
      </div>
    </div>
  );
}

async function AgentsList() {
  const agents = await fetchAgents();

  if (agents.length === 0) {
    return (
      <div className="card-surface p-8 text-center">
        <p className="text-gray-400">No agents found</p>
        <p className="text-sm text-gray-500 mt-2">
          Agents will appear here once they connect to the mesh
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agents</h1>
          <p className="text-gray-400 mt-1">
            Monitor and manage agents in the BlackRoad mesh
          </p>
        </div>
        <button className="btn-primary">
          <span>+</span>
          <span>New Agent</span>
        </button>
      </section>

      <Suspense
        fallback={
          <div className="card-surface p-8 text-center text-gray-400">
            Loading agents...
          </div>
        }
      >
        <AgentsList />
      </Suspense>
    </div>
  );
}
