import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { DashboardView } from './page';

timeZoneMock();

vi.mock('@/hooks/useFinanceSummary', () => ({
  useFinanceSummary: () => ({
    data: {
      currency: 'USD',
      cashBalance: 1500000,
      monthlyBurnRate: 250000,
      runwayMonths: 6,
      generatedAt: '2025-01-01T00:00:00Z'
    },
    isLoading: false,
    error: null
  })
}));

vi.mock('@/hooks/useAgents', () => ({
  useAgents: () => ({
    data: [
      { id: 'a1', name: 'Agent One', status: 'online', capabilities: [], domain: 'finance' },
      { id: 'a2', name: 'Agent Two', status: 'degraded', capabilities: [], domain: 'research' }
    ],
    isLoading: false,
    error: null
  })
}));

vi.mock('@/hooks/useEvents', () => ({
  useEvents: () => ({
    events: [
      { id: 'e1', type: 'task.completed', source: 'agent:finance', timestamp: '2025-01-01T00:00:00Z' }
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
  it('shows finance and agent stats', () => {
    render(<DashboardView />);

    expect(screen.getByText('Cash Balance')).toBeInTheDocument();
    expect(screen.getByText('$1,500,000')).toBeInTheDocument();
    expect(screen.getByText('Runway (months)')).toBeInTheDocument();
    expect(screen.getByText('6.0')).toBeInTheDocument();
    expect(screen.getByText('Total agents')).toBeInTheDocument();
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
  });
});
