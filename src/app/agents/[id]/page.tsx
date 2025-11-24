'use client';

import { useParams } from 'next/navigation';
import { useAgentDetail } from '@/hooks/useAgentDetail';

export default function AgentDetailPage() {
  const params = useParams<{ id: string }>();
  const { agent, tasks, isLoading, error } = useAgentDetail(params?.id);

  return (
    <div className="page-grid">
      <div className="card">
        <h1>Agent Detail</h1>
        {isLoading && <p className="muted">Loading agent…</p>}
        {error && <div className="error-banner">{error.message}</div>}
        {agent && (
          <>
            <div className="agent-header">
              <div>
                <div className="agent-name">{agent.name}</div>
                <div className="muted">{agent.role}</div>
              </div>
              <div className={`status-pill ${agent.status}`}>{agent.status}</div>
            </div>
            <div className="muted">Last heartbeat: {agent.lastHeartbeat || 'n/a'}</div>
            <div className="muted">Tags: {agent.tags?.join(', ') || '—'}</div>
            <div className="muted">Version: {agent.version ?? '—'}</div>
          </>
        )}
      </div>

      <div className="card">
        <h3>Recent Tasks</h3>
        {isLoading && <p className="muted">Loading tasks…</p>}
        {!isLoading && tasks.length === 0 && <p className="muted">No tasks found.</p>}
        {tasks.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.type}</td>
                  <td>{task.status}</td>
                  <td>{new Date(task.createdAt).toLocaleString()}</td>
                  <td>{new Date(task.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
