'use client';

import { useEffect, useState } from 'react';
import type { ServiceStatus } from '@/lib/config';

type HealthResponse = {
  status: string;
  timestamp: string;
  environment: string;
  version?: string;
  services: ServiceStatus[];
};

function badgeClass(status: ServiceStatus['status']) {
  if (status === 'healthy') return 'status-ok';
  if (status === 'not_configured') return 'status-bad';
  return 'status-bad';
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch('/api/health', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Health endpoint returned ${response.status}`);
        }
        const payload = (await response.json()) as HealthResponse;
        if (!cancelled) {
          setHealth(payload);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load health');
        }
      }
    };

    load();
    const interval = setInterval(load, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid">
      <div className="card">
        <h1>Health Check</h1>
        <p className="muted">Live status from <code>/api/health</code>.</p>
        {health && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className={health.status === 'ok' ? 'badge' : 'status-bad'}>
              {health.status === 'ok' ? 'OK' : 'Degraded'}
            </span>
            <span className="muted">Env: {health.environment}</span>
            <span className="muted">Version: {health.version}</span>
            <span className="muted">Updated: {new Date(health.timestamp).toLocaleString()}</span>
          </div>
        )}
        {error && <p className="status-bad">{error}</p>}
      </div>

      <div className="card">
        <h3>Services</h3>
        <p className="muted">Core, API Gateway, Agents, and the operator console.</p>
        <div style={{ display: 'grid', gap: 8 }}>
          {health?.services.map((service) => (
            <div
              key={service.key}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <div>{service.name}</div>
                <div className="muted">{service.url || 'not set'}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={badgeClass(service.status)}>
                  {service.status === 'healthy' && 'Healthy'}
                  {service.status === 'not_configured' && 'Not configured'}
                  {service.status === 'unreachable' && 'Unreachable'}
                </span>
                <span className="muted">{service.latencyMs ? `${service.latencyMs} ms` : '—'}</span>
              </div>
            </div>
          )) || <p className="muted">No services configured.</p>}
        </div>
      </div>
    </div>
  );
}
