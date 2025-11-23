'use client';

import { useEffect, useState } from 'react';

function getEnvironmentLabel() {
  return process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development';
}

type ApiStatus = 'unknown' | 'online' | 'degraded';

export function TopBar() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('unknown');
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return;

    const controller = new AbortController();
    const start = performance.now();
    fetch(`${baseUrl}/health`, { signal: controller.signal })
      .then((res) => {
        const elapsed = Math.round(performance.now() - start);
        setLatency(elapsed);
        setApiStatus(res.ok ? 'online' : 'degraded');
      })
      .catch(() => setApiStatus('degraded'));

    return () => controller.abort();
  }, []);

  return (
    <header className="topbar">
      <div>
        <div className="muted" style={{ fontSize: 12 }}>
          Environment
        </div>
        <div className="topbar-env">{getEnvironmentLabel()}</div>
      </div>
      <div className="topbar-status">
        <span className={`status-pill ${apiStatus}`}>{apiStatus}</span>
        {latency !== null && <span className="muted">{latency} ms</span>}
      </div>
      <div className="topbar-user">Cecilia • Orchestrator</div>
    </header>
  );
}
