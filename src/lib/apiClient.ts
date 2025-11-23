import { ApiHealth, Agent, EventRecord, FinanceSnapshot, RoadChainBlock, ServiceHealth, SystemOverview } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
const DEFAULT_TIMEOUT_MS = 8000;

type HttpGetOptions = {
  timeoutMs?: number;
};

export async function httpGet<T>(path: string, options: HttpGetOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      signal: controller.signal
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`API error ${response.status}: ${text}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getSystemOverview(): Promise<SystemOverview> {
  try {
    return await httpGet<SystemOverview>('/system/overview');
  } catch (error) {
    console.warn('[api] falling back to mock system overview', error);
    return mockSystemOverview;
  }
}

export async function getAgents(): Promise<Agent[]> {
  try {
    return await httpGet<Agent[]>('/agents');
  } catch (error) {
    console.warn('[api] falling back to mock agents', error);
    return mockAgents;
  }
}

export async function getFinanceSnapshot(): Promise<FinanceSnapshot> {
  try {
    return await httpGet<FinanceSnapshot>('/finance/snapshot');
  } catch (error) {
    console.warn('[api] falling back to mock finance snapshot', error);
    return mockFinanceSnapshot;
  }
}

export async function getEvents(params: { limit?: number; severity?: string; search?: string } = {}): Promise<EventRecord[]> {
  const query = new URLSearchParams();
  if (params.limit) query.set('limit', String(params.limit));
  if (params.severity) query.set('severity', params.severity);
  if (params.search) query.set('q', params.search);
  const qs = query.toString();

  try {
    return await httpGet<EventRecord[]>(qs ? `/events?${qs}` : '/events');
  } catch (error) {
    console.warn('[api] falling back to mock events', error);
    return mockEvents;
  }
}

export async function getRoadChainBlocks(): Promise<RoadChainBlock[]> {
  try {
    return await httpGet<RoadChainBlock[]>('/roadchain');
  } catch (error) {
    console.warn('[api] falling back to mock roadchain blocks', error);
    return mockRoadChainBlocks;
  }
}

export function deriveApiHealth(overall: SystemOverview | undefined): ApiHealth {
  if (!overall) return 'unknown';
  if (overall.overallStatus === 'healthy') return 'ok';
  if (overall.overallStatus === 'degraded') return 'degraded';
  return 'down';
}

const nowIso = new Date().toISOString();

const mockServices: ServiceHealth[] = [
  { id: 'api', name: 'blackroad-os-api', status: 'healthy', latencyMs: 48, lastChecked: nowIso },
  { id: 'operator', name: 'blackroad-os-operator', status: 'healthy', latencyMs: 72, lastChecked: nowIso },
  { id: 'core', name: 'blackroad-os-core', status: 'healthy', latencyMs: 35, lastChecked: nowIso },
  { id: 'doc', name: 'blackroad-os-docs', status: 'degraded', latencyMs: 140, lastChecked: nowIso }
];

const mockSystemOverview: SystemOverview = {
  overallStatus: 'healthy',
  services: mockServices,
  jobsProcessedLast24h: 3480,
  errorsLast24h: 7,
  notes: 'Mock data fallback; connect blackroad-os-api to view live health.'
};

const mockAgents: Agent[] = [
  {
    id: 'br-agent-ops',
    name: 'Ops Steward',
    role: 'Orchestration + systems',
    status: 'running',
    lastHeartbeat: nowIso,
    version: '1.8.2',
    tags: ['ops', 'infra']
  },
  {
    id: 'br-agent-finance',
    name: 'Treasury Scout',
    role: 'Finance + vendor intelligence',
    status: 'idle',
    lastHeartbeat: nowIso,
    version: '1.3.0',
    tags: ['finance', 'intel']
  },
  {
    id: 'br-agent-triage',
    name: 'Triage First Responder',
    role: 'Incident response',
    status: 'error',
    lastHeartbeat: nowIso,
    version: '1.1.4',
    tags: ['incidents']
  },
  {
    id: 'br-agent-field',
    name: 'Field Node Watcher',
    role: 'Edge hardware telemetry',
    status: 'offline',
    lastHeartbeat: nowIso,
    version: '0.9.8',
    tags: ['edge', 'hardware']
  }
];

const mockFinanceSnapshot: FinanceSnapshot = {
  timestamp: nowIso,
  monthlyInfraCostUsd: 4280,
  monthlyRevenueUsd: 9600,
  estimatedSavingsUsd: 7200,
  walletBalanceUsd: 182400,
  notes: 'Mocked finance snapshot. Replace once /finance/snapshot is live.',
  history: [
    { label: 'Jan', balance: 168000, costs: 4100, savings: 6500 },
    { label: 'Feb', balance: 172400, costs: 4200, savings: 6700 },
    { label: 'Mar', balance: 178800, costs: 4300, savings: 7000 },
    { label: 'Apr', balance: 182400, costs: 4280, savings: 7200 }
  ]
};

const mockEvents: EventRecord[] = [
  {
    id: 'evt-001',
    timestamp: nowIso,
    source: 'operator',
    type: 'task.completed',
    summary: 'Agent Ops Steward reconciled service definitions',
    severity: 'info'
  },
  {
    id: 'evt-002',
    timestamp: nowIso,
    source: 'finance',
    type: 'report.generated',
    summary: 'Treasury Scout produced updated cost offset model',
    severity: 'warning'
  },
  {
    id: 'evt-003',
    timestamp: nowIso,
    source: 'roadchain',
    type: 'block.committed',
    summary: 'RoadChain block 1182 sealed',
    severity: 'info'
  }
];

const mockRoadChainBlocks: RoadChainBlock[] = [
  {
    height: 1182,
    hash: '0xabc123def456',
    prevHash: '0xabc123def455',
    timestamp: nowIso,
    eventIds: ['evt-003', 'evt-001']
  },
  {
    height: 1181,
    hash: '0xabc123def455',
    prevHash: '0xabc123def454',
    timestamp: nowIso,
    eventIds: ['evt-002']
  }
];
