export type HealthStatus = 'healthy' | 'degraded' | 'down';

export interface ServiceHealth {
  id: string;
  name: string;
  status: HealthStatus;
  latencyMs?: number;
  lastChecked: string;
}

export interface SystemOverview {
  overallStatus: HealthStatus;
  services: ServiceHealth[];
  jobsProcessedLast24h?: number;
  errorsLast24h?: number;
  notes?: string;
}

export type AgentStatus = 'idle' | 'running' | 'error' | 'offline';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  lastHeartbeat: string;
  version?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface FinanceSnapshot {
  timestamp: string;
  monthlyInfraCostUsd?: number;
  monthlyRevenueUsd?: number;
  estimatedSavingsUsd?: number;
  walletBalanceUsd?: number;
  notes?: string;
  history?: { label: string; balance: number; costs: number; savings: number }[];
}

export interface EventRecord {
  id: string;
  timestamp: string;
  source: string;
  type: string;
  summary: string;
  psShaInfinity?: string;
  severity?: 'info' | 'warning' | 'error';
}

export interface RoadChainBlock {
  height: number;
  hash: string;
  prevHash: string;
  timestamp: string;
  eventIds: string[];
}

export interface RoadChainBlockWithEvents extends RoadChainBlock {
  events?: EventRecord[];
}

export type ApiHealth = 'ok' | 'degraded' | 'down' | 'unknown';
