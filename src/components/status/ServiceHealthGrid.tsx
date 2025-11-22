'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { osServices } from '@/config/services';
import { fetchServiceHealth, ServiceHealthResult } from '@/lib/fetchServiceHealth';

function formatTimestamp(value?: string) {
  if (!value) return '—';
  const ts = new Date(value);
  if (Number.isNaN(ts.getTime())) return value;
  return ts.toLocaleString();
}

function resolveHealthUrl(id: string, healthUrl: string) {
  if (id === 'prism-console') {
    return '/api/health';
  }

  return healthUrl;
}

export function ServiceHealthGrid() {
  const [results, setResults] = useState<Record<string, ServiceHealthResult>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const services = useMemo(() => osServices, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    const updates = await Promise.all(
      services.map(async (service) => {
        const healthUrl = resolveHealthUrl(service.id, service.healthUrl);
        return fetchServiceHealth(healthUrl, service.id);
      })
    );

    const merged: Record<string, ServiceHealthResult> = {};
    updates.forEach((update) => {
      merged[update.id] = update;
    });

    setResults(merged);
    setLastUpdated(new Date().toISOString());
    setLoading(false);
  }, [services]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 15000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="card" style={{ gridColumn: 'span 2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>OS Services Health</h2>
          <p className="muted">Live checks against each service health endpoint.</p>
        </div>
        <button className="button" onClick={refresh} disabled={loading}>
          {loading ? 'Checking...' : 'Refresh'}
        </button>
      </div>
      <p className="muted" style={{ marginTop: 8 }}>
        Last updated: {lastUpdated ? formatTimestamp(lastUpdated) : '—'}
      </p>
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12
        }}
      >
        {services.map((service) => {
          const result = results[service.id];
          const statusClass = result ? (result.status === 'up' ? 'status-ok' : 'status-bad') : 'badge';
          const payload = result?.payload;
          const hasPayload = typeof payload !== 'undefined';
          return (
            <div key={service.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3>{service.name}</h3>
                  <p className="muted">{resolveHealthUrl(service.id, service.healthUrl)}</p>
                </div>
                <span className={statusClass}>{result ? (result.status === 'up' ? 'UP' : 'DOWN') : '...'}</span>
              </div>
              <dl style={{ display: 'grid', gap: 4, marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <dt className="muted">Last checked</dt>
                  <dd>{formatTimestamp(result?.lastCheckedAt)}</dd>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <dt className="muted">HTTP</dt>
                  <dd>{result?.rawStatusCode ?? '—'}</dd>
                </div>
              </dl>
              {result?.errorMessage && <p className="status-bad">{result.errorMessage}</p>}
              {hasPayload && (
                <details style={{ marginTop: 8 }}>
                  <summary>Health payload</summary>
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(payload, null, 2)}</pre>
                </details>
              )}
              {!result && loading && <p className="muted">Checking...</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
