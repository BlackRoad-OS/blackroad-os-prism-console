'use client';

import { useMemo } from 'react';
import { useFinanceSnapshot } from '@/hooks/useFinanceSnapshot';
import { FinanceSnapshot } from '@/types';

function formatCurrency(value: number | undefined) {
  if (value === undefined) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function TrendList({ history }: { history: NonNullable<FinanceSnapshot['history']> }) {
  return (
    <ul className="trend-list">
      {history.map((item) => (
        <li key={item.label} className="trend-row">
          <div>
            <div className="muted small">{item.label}</div>
            <div className="muted small">Infra: {formatCurrency(item.costs)}</div>
          </div>
          <div className="trend-bars">
            <div className="trend-bar balance" style={{ width: `${Math.min(item.balance / 2000, 100)}%` }} />
            <div className="trend-bar savings" style={{ width: `${Math.min(item.savings / 120, 100)}%` }} />
          </div>
          <div className="muted small">Wallet: {formatCurrency(item.balance)}</div>
        </li>
      ))}
    </ul>
  );
}

export default function FinancePage() {
  const { data, isLoading, error } = useFinanceSnapshot();

  const financeNotes = useMemo(() => {
    if (!data?.notes) return 'Automation offsetting SaaS/tooling costs and operator time saved.';
    return data.notes;
  }, [data]);

  return (
    <div className="page-grid">
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h1>Finance</h1>
        <p className="muted">
          Treasury and wallet-inspired summary for BlackRoad OS. Data sourced from blackroad-os-api with fallbacks until the
          live endpoint is ready.
        </p>
      </div>

      <div className="card stat-grid" style={{ gridColumn: 'span 2' }}>
        <div className="card-header-row">
          <h3>Snapshot</h3>
          {error && <div className="error-banner">{error.message}</div>}
        </div>
        <div className="stat-grid-inner">
          <div className="stat-card">
            <div className="stat-label">OS Wallet Balance</div>
            <div className="stat-value">{isLoading ? 'Loading…' : formatCurrency(data?.walletBalanceUsd)}</div>
            <div className="stat-help">Funds available for automation + infra</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Monthly Infra Cost</div>
            <div className="stat-value">{isLoading ? '…' : formatCurrency(data?.monthlyInfraCostUsd)}</div>
            <div className="stat-help">Cloud, edge devices, network</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Estimated Monthly Savings</div>
            <div className="stat-value">{isLoading ? '…' : formatCurrency(data?.estimatedSavingsUsd)}</div>
            <div className="stat-help">Automation offset of SaaS and manual ops</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Monthly Revenue</div>
            <div className="stat-value">{isLoading ? '…' : formatCurrency(data?.monthlyRevenueUsd)}</div>
            <div className="stat-help">Optional commercial runs</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Wallet trend</h3>
        {isLoading && <p className="muted">Loading history…</p>}
        {data?.history ? <TrendList history={data.history} /> : <p className="muted">No trend data yet.</p>}
      </div>

      <div className="card">
        <h3>Notes</h3>
        <p className="muted">{financeNotes}</p>
        <ul className="muted small">
          <li>Automation offsetting SaaS/tooling costs</li>
          <li>Operator time saved for incidents and provisioning</li>
          <li>Wallet framing for treasury visibility</li>
        </ul>
      </div>
    </div>
  );
}
