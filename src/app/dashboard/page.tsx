'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { StatCard } from '@/components/cards/StatCard';
import { useAgents } from '@/hooks/useAgents';
import { useEvents } from '@/hooks/useEvents';
import { useFinanceSummary } from '@/hooks/useFinanceSummary';
import type { AgentSummary } from '@/types/agents';

function formatCurrency(value: number | undefined, currency = 'USD') {
  if (value === undefined || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

function formatNumber(value: number | undefined, digits = 1) {
  if (value === undefined || Number.isNaN(value)) return '—';
  return value.toFixed(digits);
}

export function DashboardView() {
  const { data: finance, isLoading: financeLoading, error: financeError } = useFinanceSummary();
  const { data: agents, isLoading: agentsLoading, error: agentsError } = useAgents();
  const { events, isLoading: eventsLoading, error: eventsError } = useEvents({ limit: 5 });

  const topAgents = useMemo(() => agents.slice(0, 5), [agents]);

  return (
    <div className="grid dashboard-grid">
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h1>Prism Console Overview</h1>
        <p className="muted">Operational snapshot across agents, finance, and recent events.</p>
      </div>

      <div className="card stat-grid">
        <h3>Finance</h3>
        <div className="stat-grid-inner">
          <StatCard
            label="Cash Balance"
            value={financeLoading ? 'Loading…' : formatCurrency(finance?.cashBalance, finance?.currency)}
            helpText={financeError ? financeError.message : 'Live from finance summary'}
          />
          <StatCard
            label="Runway (months)"
            value={financeLoading ? 'Loading…' : formatNumber(finance?.runwayMonths)}
            helpText="How long we can operate on current burn"
          />
          <StatCard
            label="Monthly Burn"
            value={financeLoading ? 'Loading…' : formatCurrency(finance?.monthlyBurnRate, finance?.currency)}
          />
          <StatCard
            label="Active Revenue"
            value={financeLoading ? 'Loading…' : finance?.mrr ? formatCurrency(finance.mrr, finance.currency) : '—'}
            helpText={finance?.arr ? `ARR: ${formatCurrency(finance.arr, finance.currency)}` : 'MRR/ARR optional'}
          />
        </div>
      </div>

      <div className="card stat-grid">
        <h3>Agents</h3>
        <div className="stat-grid-inner">
          <StatCard
            label="Total agents"
            value={agentsLoading ? 'Loading…' : agents.length}
            helpText={agentsError ? agentsError.message : 'Online + offline agents from operator'}
          />
          <StatCard
            label="Online"
            value={agentsLoading ? '…' : agents.filter((a) => a.status === 'online').length}
          />
          <StatCard
            label="Degraded"
            value={agentsLoading ? '…' : agents.filter((a) => a.status === 'degraded').length}
          />
          <StatCard
            label="Domains"
            value={agentsLoading ? '…' : new Set(agents.map((a) => a.domain || 'unknown')).size}
            helpText="Distinct domains covered"
          />
        </div>
      </div>

      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h3>Recent Events</h3>
        {eventsError && <div className="error-banner">{eventsError.message}</div>}
        {eventsLoading && <p className="muted">Loading events…</p>}
        {!eventsLoading && events.length === 0 && <p className="muted">No events found.</p>}
        {events.length > 0 && (
          <ul className="event-list">
            {events.map((event) => (
              <li key={event.id} className="event-item">
                <div>
                  <div className="muted">{new Date(event.timestamp).toLocaleString()}</div>
                  <div className="event-type">{event.type}</div>
                  <div className="muted">{event.source}</div>
                </div>
                {event.summary && <div>{event.summary}</div>}
              </li>
            ))}
          </ul>
        )}
        <Link href="/events" className="muted">
          View full stream →
        </Link>
      </div>

      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h3>Active Agents</h3>
        {topAgents.length === 0 && !agentsLoading && <p className="muted">No agents loaded.</p>}
        {agentsLoading && <p className="muted">Loading agents…</p>}
        {topAgents.length > 0 && (
          <ul className="agent-list">
            {topAgents.map((agent: AgentSummary) => (
              <li key={agent.id} className="agent-item">
                <div>
                  <div className="agent-name">{agent.name}</div>
                  <div className="muted">{agent.domain || 'unspecified domain'}</div>
                </div>
                <div className={`status-pill ${agent.status}`}>{agent.status}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardView />;
}
