'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

export type OperatorHealthDashboardProps = {
  operatorApiUrl?: string;
};

type OperatorServiceResponse = {
  name: string;
  status?: string;
  message?: string;
  httpStatus?: number;
  statusCode?: number;
  code?: number;
};

type OperatorHealthPayload = {
  services?: Record<string, OperatorServiceResponse> | OperatorServiceResponse[];
  status?: string;
};

type ServiceDisplay = {
  id: string;
  label: string;
  status: string;
  message?: string;
  httpStatus?: number;
};

const serviceCatalog: ServiceDisplay[] = [
  { id: 'core', label: 'Core' },
  { id: 'web', label: 'Web' },
  { id: 'docs', label: 'Docs' },
  { id: 'prism-console', label: 'Prism Console' },
  { id: 'operator', label: 'Operator' }
];

function normalizeStatus(value?: string): 'ok' | 'warn' | 'error' | 'unknown' {
  if (!value) return 'unknown';
  const normalized = value.toLowerCase();
  if (['ok', 'healthy', 'up', 'online'].includes(normalized)) return 'ok';
  if (['warn', 'warning', 'degraded'].includes(normalized)) return 'warn';
  if (['down', 'error', 'critical', 'offline'].includes(normalized)) return 'error';
  return 'unknown';
}

function statusClass(status: ServiceDisplay['status']) {
  if (status === 'ok') return 'badge status-ok';
  if (status === 'warn') return 'badge status-warn';
  if (status === 'error') return 'badge status-bad';
  return 'badge';
}

function parseServices(payload: OperatorHealthPayload): Record<string, ServiceDisplay> {
  const resolved: Record<string, ServiceDisplay> = {};

  if (!payload) return resolved;

  const services = payload.services;

  if (Array.isArray(services)) {
    services.forEach((service, index) => {
      const id = service.name?.toLowerCase() || `service-${index}`;
      resolved[id] = {
        id,
        label: service.name || id,
        status: normalizeStatus(service.status),
        message: service.message,
        httpStatus: service.httpStatus ?? service.statusCode ?? service.code
      };
    });
    return resolved;
  }

  if (services && typeof services === 'object') {
    Object.entries(services).forEach(([id, service]) => {
      const normalizedId = id.toLowerCase();
      resolved[normalizedId] = {
        id: normalizedId,
        label: service.name || id,
        status: normalizeStatus(service.status),
        message: service.message,
        httpStatus: service.httpStatus ?? service.statusCode ?? service.code
      };
    });
  }

  return resolved;
}

export function OperatorHealthDashboard({ operatorApiUrl }: OperatorHealthDashboardProps) {
  const [services, setServices] = useState<Record<string, ServiceDisplay>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  const targetUrl = useMemo(() => {
    if (!operatorApiUrl) return '';
    return operatorApiUrl.endsWith('/system/health')
      ? operatorApiUrl
      : `${operatorApiUrl.replace(/\/$/, '')}/system/health`;
  }, [operatorApiUrl]);

  const refresh = useCallback(async () => {
    if (!targetUrl) {
      setError('Set NEXT_PUBLIC_OPERATOR_API_URL to load operator health.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(targetUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Operator health returned HTTP ${response.status}`);
      }
      const payload = (await response.json()) as OperatorHealthPayload;
      setServices(parseServices(payload));
      setCheckedAt(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load operator health');
    } finally {
      setLoading(false);
    }
  }, [targetUrl]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 15000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="card" style={{ gridColumn: 'span 2', background: 'linear-gradient(145deg, #11162d, #0b1021)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <h2 style={{ margin: '0 0 4px' }}>Services Status</h2>
          <p className="muted" style={{ margin: 0 }}>
            Live snapshot from the Operator service (/system/health).
          </p>
        </div>
        <button className="button" onClick={refresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <p className="muted" style={{ marginTop: 8 }}>
        Operator API: {targetUrl || 'not configured'}
      </p>
      <p className="muted" style={{ marginTop: 4 }}>
        Last checked: {checkedAt ? new Date(checkedAt).toLocaleString() : '—'}
      </p>
      {error && <p className="status-bad">{error}</p>}
      {!error && loading && <p className="muted">Loading service health from operator...</p>}
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
          marginTop: 12
        }}
      >
        {serviceCatalog.map((service) => {
          const info = services[service.id] || services[service.id.replace('-', '')];
          const status = info?.status ?? 'unknown';
          const httpStatus = info?.httpStatus;
          const message = info?.message || 'No message reported';
          return (
            <div key={service.id} className="card" style={{ borderColor: 'var(--border)', background: '#151b34' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div>
                  <h3 style={{ margin: '0 0 4px' }}>{service.label}</h3>
                  <p className="muted" style={{ margin: 0 }}>
                    {service.id}
                  </p>
                </div>
                <span className={statusClass(status)}>{status.toUpperCase()}</span>
              </div>
              <dl style={{ marginTop: 8, display: 'grid', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <dt className="muted">HTTP</dt>
                  <dd>{httpStatus ?? '—'}</dd>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <dt className="muted">Message</dt>
                  <dd style={{ textAlign: 'right' }}>{message}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
