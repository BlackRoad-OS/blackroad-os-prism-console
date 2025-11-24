'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { StatCard } from '@/components/cards/StatCard';
import { useAgents } from '@/hooks/useAgents';
import { useEvents } from '@/hooks/useEvents';
import { useFinanceSnapshot } from '@/hooks/useFinanceSnapshot';
import { useSystemOverview } from '@/hooks/useSystemOverview';
import { Agent, ServiceHealth } from '@/types';

function formatCurrency(value: number | undefined, currency = 'USD') {
  if (value === undefined || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

function StatBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-header-row">
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function renderServiceSummary(services: ServiceHealth[]) {
  const healthy = services.filter((svc) => svc.status === 'healthy').length;
  const degraded = services.filter((svc) => svc.status === 'degraded').length;
  const down = services.filter((svc) => svc.status === 'down').length;
  return `${healthy} healthy · ${degraded} degraded · ${down} down`;
}

export function DashboardView() {
  const { data: system, isLoading: systemLoading, error: systemError } = useSystemOverview();
  const { data: agents, isLoading: agentsLoading } = useAgents();
  const { data: finance, isLoading: financeLoading } = useFinanceSnapshot();
  const { events, isLoading: eventsLoading, error: eventsError } = useEvents({ limit: 6 });

  const topAgents = useMemo(() => agents.slice(0, 4), [agents]);
  const serviceSummary = system?.services ? renderServiceSummary(system.services) : 'Awaiting health ping…';

  return (
    <div className="page-grid">
      <div className="card hero">
        <div>
          <p className="muted">BlackRoad OS – Master Orchestration</p>
          <h1>Prism Console Overview</h1>
          <p className="muted">
            Operator cockpit for health, agents, treasury, and RoadChain history. Connects to blackroad-os-api for live
            telemetry.
          </p>
        </div>
        <div className="hero-meta">
          <div className="muted">System status</div>
          <div className={`status-pill ${system?.overallStatus ?? 'unknown'}`}>{system?.overallStatus ?? 'checking'}</div>
          <div className="muted small">{serviceSummary}</div>
        </div>
      </div>

      <div className="card stat-grid" style={{ gridColumn: 'span 2' }}>
        <div className="card-header-row">
          <h3>Health snapshot</h3>
          {systemError && <div className="error-banner">{systemError.message}</div>}
        </div>
        <div className="stat-grid-inner">
          <StatCard
            label="BlackRoad OS"
            value={systemLoading ? 'Loading…' : system?.overallStatus ?? 'unknown'}
            helpText={serviceSummary}
          />
          <StatCard
            label="Services monitored"
            value={systemLoading ? '…' : system?.services.length ?? 0}
            helpText="API, operator, docs, and sibling surfaces"
          />
          <StatCard
            label="Jobs processed (24h)"
            value={systemLoading ? '…' : system?.jobsProcessedLast24h ?? '—'}
            delta="miner-inspired throughput"
          />
          <StatCard
            label="Errors (24h)"
            value={systemLoading ? '…' : system?.errorsLast24h ?? 0}
            helpText={system?.notes}
          />
        </div>
      </div>

      <div className="card stat-grid">
        <div className="card-header-row">
          <h3>Finance pulse</h3>
        </div>
        <div className="stat-grid-inner">
          <StatCard
            label="OS Wallet Balance"
            value={financeLoading ? 'Loading…' : formatCurrency(finance?.walletBalanceUsd)}
            helpText="Treasury held by Prism"
          />
          <StatCard
            label="Monthly Infra Cost"
            value={financeLoading ? '…' : formatCurrency(finance?.monthlyInfraCostUsd)}
            helpText="Cloud + hardware"
          />
          <StatCard
            label="Estimated Savings"
            value={financeLoading ? '…' : formatCurrency(finance?.estimatedSavingsUsd)}
            helpText="Automation offset of SaaS/tooling"
          />
          <StatCard
            label="Monthly Revenue"
            value={financeLoading ? '…' : formatCurrency(finance?.monthlyRevenueUsd)}
            helpText="For commercial runs"
          />
        </div>
      </div>

      <StatBlock title="Service detail">
        {systemLoading && <p className="muted">Loading service health…</p>}
        {!systemLoading && system && (
          <ul className="event-list">
            {system.services.map((svc) => (
              <li key={svc.id} className="event-item">
                <div>
                  <div className="muted">{svc.name}</div>
                  <div className="muted small">Last checked: {new Date(svc.lastChecked).toLocaleString()}</div>
                </div>
                <div className="pill-row">
                  <span className={`status-pill ${svc.status}`}>{svc.status}</span>
                  {svc.latencyMs && <span className="muted small">{svc.latencyMs} ms</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </StatBlock>

      <StatBlock title="Recent Events">
        {eventsError && <div className="error-banner">{eventsError.message}</div>}
        {eventsLoading && <p className="muted">Loading events…</p>}
        {!eventsLoading && events.length === 0 && <p className="muted">No events yet.</p>}
        {events.length > 0 && (
          <ul className="event-list">
            {events.map((event) => (
              <li key={event.id} className="event-item">
                <div>
                  <div className="muted small">{new Date(event.timestamp).toLocaleString()}</div>
                  <div className="event-type">{event.type}</div>
                  <div className="muted small">{event.source}</div>
                </div>
                <div className="pill-row">
                  <span className={`status-pill ${event.severity || 'info'}`}>{event.severity || 'info'}</span>
                  <span>{event.summary}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link href="/events" className="muted">
          Explore full RoadChain →
        </Link>
      </StatBlock>

      <StatBlock title="Active Agents">
        {agentsLoading && <p className="muted">Loading agents…</p>}
        {!agentsLoading && topAgents.length === 0 && <p className="muted">No agents registered.</p>}
        {topAgents.length > 0 && (
          <ul className="agent-list">
            {topAgents.map((agent: Agent) => (
              <li key={agent.id} className="agent-item">
                <div>
                  <div className="agent-name">{agent.name}</div>
                  <div className="muted small">{agent.role}</div>
                  <div className="muted small">Tags: {agent.tags?.join(', ') || '—'}</div>
                </div>
                <div className="pill-row">
                  <span className={`status-pill ${agent.status}`}>{agent.status}</span>
                  <span className="muted small">Heartbeat {new Date(agent.lastHeartbeat).toLocaleTimeString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </StatBlock>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardView />;
}
