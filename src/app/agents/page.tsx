'use client';

import { useRouter } from 'next/navigation';
import { GenericTable } from '@/components/tables/GenericTable';
import { useAgents } from '@/hooks/useAgents';
import type { AgentSummary } from '@/types/agents';

export default function AgentsPage() {
  const router = useRouter();
  const { data: agents, isLoading, error } = useAgents();

  const columns = [
    { header: 'Name', accessor: (agent: AgentSummary) => agent.name },
    { header: 'Domain', accessor: (agent: AgentSummary) => agent.domain || '—' },
    {
      header: 'Status',
      accessor: (agent: AgentSummary) => <span className={`status-pill ${agent.status}`}>{agent.status}</span>
    },
    { header: 'Last heartbeat', accessor: (agent: AgentSummary) => agent.lastHeartbeat || 'n/a' },
    { header: 'Capabilities', accessor: (agent: AgentSummary) => agent.capabilities?.length ?? 0 }
  ];

  return (
    <div className="card">
      <h1>Agents</h1>
      <p className="muted">Live state of BlackRoad OS agents with their capabilities and health.</p>
      {error && <div className="error-banner">{error.message}</div>}
      {isLoading && <p className="muted">Loading agents…</p>}
      <div className="table-wrapper">
        <GenericTable
          columns={columns}
          data={agents}
          emptyText={isLoading ? 'Loading…' : 'No agents found'}
          onRowClick={(agent) => router.push(`/agents/${agent.id}`)}
        />
      </div>
      <p className="muted" style={{ marginTop: 12 }}>
        Click a row to view details and recent tasks.
      </p>
    </div>
  );
}
