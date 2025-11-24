'use client';

import { useMemo } from 'react';
import { deriveApiHealth } from '@/lib/apiClient';
import { useSystemOverview } from '@/hooks/useSystemOverview';

function getEnvironmentLabel() {
  return process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development';
}

export function TopBar() {
  const { data, isLoading } = useSystemOverview();
  const apiHealth = deriveApiHealth(data ?? undefined);

  const serviceSummary = useMemo(() => {
    if (!data) return 'Checking services…';
    const up = data.services.filter((svc) => svc.status === 'healthy').length;
    const degraded = data.services.filter((svc) => svc.status === 'degraded').length;
    const down = data.services.filter((svc) => svc.status === 'down').length;
    return `${up} healthy • ${degraded} degraded • ${down} down`;
  }, [data]);

  return (
    <header className="topbar">
      <div className="topbar-group">
        <div className="muted" style={{ fontSize: 12 }}>
          Environment
        </div>
        <div className="topbar-env">{getEnvironmentLabel()}</div>
      </div>
      <div className="topbar-group">
        <span className={`status-pill ${apiHealth}`}>{apiHealth}</span>
        <span className="muted small">{serviceSummary}</span>
        {isLoading && <span className="muted small">Refreshing…</span>}
      </div>
      <div className="topbar-user">
        <div className="avatar">◈</div>
        <div>
          <div className="muted" style={{ fontSize: 12 }}>
            Operator
          </div>
          <div className="topbar-operator">Prism Steward</div>
        </div>
      </div>
    </header>
  );
}
