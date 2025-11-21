'use client';

import { useEffect, useState } from 'react';
import type { ServiceStatus } from '@/lib/config';
import { serviceConfig } from '@/config/serviceConfig';

type HealthResponse = {
  ok: boolean;
  service: string;
  ts: string;
  status: string;
  environment: string;
  version?: string;
  services: ServiceStatus[];
};

export function LiveHealthCard() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<string | null>(null);

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
          setLastChecked(payload.ts);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load health');
          setLastChecked(new Date().toISOString());
          setLoading(false);
        }
      }
    };

    load();
    const interval = setInterval(load, 10000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const statusText = loading ? 'CHECKING' : health?.ok ? 'ONLINE' : 'OFFLINE';
  const statusClass = loading ? 'badge' : health?.ok ? 'badge' : 'status-bad';
  const checkedAt = lastChecked;

  return (
    <div className="card">
      <h3>System Status</h3>
      <p className="muted">Live ping against <code>/api/health</code> for {serviceConfig.SERVICE_NAME}.</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className={statusClass}>Status: {statusText}</span>
        <span className="muted">Service: {serviceConfig.SERVICE_ID}</span>
      </div>
      {health && (
        <div style={{ marginTop: 12, display: 'grid', gap: 6 }}>
          <div className="muted">Environment: {health.environment}</div>
          <div className="muted">Version: {health.version || 'unknown'}</div>
          <div className="muted">Last checked: {new Date(health.ts).toLocaleString()}</div>
        </div>
      )}
      {!health && loading && <p className="muted">Requesting live health...</p>}
      {checkedAt && !health && !loading && (
        <p className="muted">Last checked: {new Date(checkedAt).toLocaleString()}</p>
      )}
      {error && <p className="status-bad">{error}</p>}
    </div>
  );
}
