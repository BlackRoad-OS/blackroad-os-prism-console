import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { DashboardView } from './page';

timeZoneMock();

vi.mock('@/hooks/useSystemOverview', () => ({
  useSystemOverview: () => ({
    data: {
      overallStatus: 'healthy',
      services: [
        { id: 'api', name: 'api', status: 'healthy', lastChecked: '2025-01-01T00:00:00Z' },
        { id: 'operator', name: 'operator', status: 'degraded', lastChecked: '2025-01-01T00:00:00Z' }
      ],
      jobsProcessedLast24h: 10,
      errorsLast24h: 1
    },
    isLoading: false,
    error: null
  })
}));

vi.mock('@/hooks/useFinanceSnapshot', () => ({
  useFinanceSnapshot: () => ({
    data: {
      walletBalanceUsd: 150000,
      monthlyInfraCostUsd: 12000,
      estimatedSavingsUsd: 24000,
      monthlyRevenueUsd: 32000,
      timestamp: '2025-01-01T00:00:00Z'
    },
    isLoading: false,
    error: null
  })
}));

vi.mock('@/hooks/useAgents', () => ({
  useAgents: () => ({
    data: [
      { id: 'a1', name: 'Agent One', role: 'ops', status: 'running', lastHeartbeat: '2025-01-01T00:00:00Z' },
      { id: 'a2', name: 'Agent Two', role: 'finance', status: 'idle', lastHeartbeat: '2025-01-01T00:00:00Z' }
    ],
    isLoading: false,
    error: null
  })
}));

vi.mock('@/hooks/useEvents', () => ({
  useEvents: () => ({
    events: [
      {
        id: 'e1',
        type: 'task.completed',
        source: 'agent:finance',
        timestamp: '2025-01-01T00:00:00Z',
        summary: 'done',
        severity: 'info'
      }
    ],
    isLoading: false,
    error: null
  })
}));

function timeZoneMock() {
  const formatter = new Intl.DateTimeFormat('en-US');
  formatter.format(new Date());
}

describe('DashboardView', () => {
  it('renders core stats', () => {
    render(<DashboardView />);

    expect(screen.getByText('Prism Console Overview')).toBeInTheDocument();
    expect(screen.getByText('BlackRoad OS')).toBeInTheDocument();
    expect(screen.getByText('OS Wallet Balance')).toBeInTheDocument();
    expect(screen.getByText('Estimated Savings')).toBeInTheDocument();
    expect(screen.getByText('Active Agents')).toBeInTheDocument();
    expect(screen.getByText('Recent Events')).toBeInTheDocument();
  });
});
