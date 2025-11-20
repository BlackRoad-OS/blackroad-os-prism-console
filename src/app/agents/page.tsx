'use client';

import { useEffect, useState } from 'react';

type Agent = {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
};

type AgentsResponse = {
  agents: Agent[];
  error?: string;
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/agents', { cache: 'no-store' });
      const payload = (await response.json()) as AgentsResponse;
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to load agents');
      }
      setAgents(payload.agents || []);
      setError(null);
    } catch (err) {
      setAgents([]);
      setError(err instanceof Error ? err.message : 'Unable to load agents');
    } finally {
      setLoading(false);
    }
  };

  const runAgent = async (agent: Agent) => {
    try {
      setMessage(null);
      const response = await fetch('/api/agents/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agentId: agent.id || agent.name })
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || 'Agent run failed');
      }
      setMessage(`Triggered ${agent.name || agent.id || 'agent'}`);
    } catch (err) {
      setMessage(null);
      setError(err instanceof Error ? err.message : 'Unable to trigger agent');
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  return (
    <div className="grid">
      <div className="card">
        <h1>Agents</h1>
        <p className="muted">Lists agents from the configured AGENTS_API_URL and triggers /agents/run.</p>
        <button onClick={loadAgents} disabled={loading} style={{ marginTop: 8 }}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
        {message && <p className="status-ok" style={{ marginTop: 8 }}>{message}</p>}
        {error && <p className="status-bad" style={{ marginTop: 8 }}>{error}</p>}
      </div>

      <div className="card">
        <h3>Agent List</h3>
        {agents.length === 0 && !loading && <p className="muted">No agents found.</p>}
        {loading && <p className="muted">Loading…</p>}
        {agents.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id || agent.name}>
                  <td>{agent.name || agent.id}</td>
                  <td className="muted">{agent.status || 'n/a'}</td>
                  <td className="muted">{agent.description || '—'}</td>
                  <td>
                    <button onClick={() => runAgent(agent)}>Run</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
