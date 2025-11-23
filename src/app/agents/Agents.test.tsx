import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AgentsPage from './page';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push })
}));

vi.mock('@/hooks/useAgents', () => ({
  useAgents: () => ({
    data: [
      {
        id: 'agent-1',
        name: 'Agent One',
        status: 'online',
        lastHeartbeat: '2025-01-01T00:00:00Z',
        capabilities: [{ id: 'c1', name: 'Analysis' }],
        domain: 'finance'
      }
    ],
    isLoading: false,
    error: null
  })
}));

describe('AgentsPage', () => {
  it('renders the table and navigates on row click', async () => {
    render(<AgentsPage />);

    expect(screen.getByText('Agents')).toBeInTheDocument();
    expect(screen.getByText('Agent One')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Agent One'));
    expect(push).toHaveBeenCalledWith('/agents/agent-1');
  });
});
