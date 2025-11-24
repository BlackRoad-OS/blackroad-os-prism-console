'use client';

import { useMemo, useState } from 'react';
import { GenericTable } from '@/components/tables/GenericTable';
import { useAgents } from '@/hooks/useAgents';
import { Agent } from '@/types';

const statusFilters: (Agent['status'] | 'all')[] = ['all', 'running', 'idle', 'error', 'offline'];

export default function AgentsPage() {
  const { data: agents, isLoading, error } = useAgents();
  const [status, setStatus] = useState<Agent['status'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Agent | null>(null);

  const filtered = useMemo(() => {
    return agents.filter((agent) => {
      const matchesStatus = status === 'all' ? true : agent.status === status;
      const text = search.toLowerCase();
      const matchesText = text
        ? agent.name.toLowerCase().includes(text) || agent.tags?.some((tag) => tag.toLowerCase().includes(text))
        : true;
      return matchesStatus && matchesText;
    });
  }, [agents, status, search]);

  const columns = [
    { header: 'Name', accessor: (agent: Agent) => agent.name },
    { header: 'Role', accessor: (agent: Agent) => agent.role },
    {
      header: 'Status',
      accessor: (agent: Agent) => <span className={`status-pill ${agent.status}`}>{agent.status}</span>
    },
    { header: 'Last heartbeat', accessor: (agent: Agent) => new Date(agent.lastHeartbeat).toLocaleString() },
    { header: 'Tags', accessor: (agent: Agent) => agent.tags?.join(', ') || '—' },
    { header: 'Version', accessor: (agent: Agent) => agent.version ?? '—' }
  ];

  return (
    <div className="page-grid">
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h1>Agents</h1>
        <p className="muted">
          Fleet of orchestrators and domain specialists powered by blackroad-os-operator. Filter by status or tags and open
          a row for metadata.
        </p>
      </div>

      <div className="card">
        <div className="filter-grid">
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value as Agent['status'] | 'all')}>
              {statusFilters.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Search
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name or tag" />
          </label>
          <div className="filter-helper">
            <p className="muted small">Click any row to inspect raw metadata.</p>
          </div>
        </div>
        {error && <div className="error-banner">{error.message}</div>}
        {isLoading && <p className="muted">Loading agents…</p>}
        <div className="table-wrapper">
          <GenericTable
            columns={columns}
            data={filtered}
            emptyText={isLoading ? 'Loading…' : 'No agents found'}
            onRowClick={(agent) => setSelected(agent)}
          />
        </div>
      </div>

      <div className="card">
        <h3>Agent detail</h3>
        {!selected && <p className="muted">Select an agent to view detail.</p>}
        {selected && (
          <div className="agent-detail">
            <div className="pill-row">
              <span className="muted small">ID</span>
              <span className="pill">{selected.id}</span>
            </div>
            <p className="muted small">Role: {selected.role}</p>
            <p className="muted small">Heartbeat: {new Date(selected.lastHeartbeat).toLocaleString()}</p>
            <p className="muted small">Tags: {selected.tags?.join(', ') || '—'}</p>
            <p className="muted small">Version: {selected.version ?? '—'}</p>
            <pre className="code-block">{JSON.stringify(selected.metadata || selected, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
