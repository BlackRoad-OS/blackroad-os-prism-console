import React from 'react';
import { render, screen } from '@testing-library/react';
import { EnvCard } from '@/components/EnvCard';
import type { Env } from '@/types';

const mockEnv: Env = {
  id: 'env-dev',
  name: 'Development',
  region: 'iad',
  status: 'healthy',
  updatedAt: new Date('2024-01-01T00:00:00Z').toISOString()
};

describe('EnvCard', () => {
  it('renders environment details', () => {
    render(<EnvCard env={mockEnv} />);

    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('IAD')).toBeInTheDocument();
    expect(screen.getByText(/All systems go/i)).toBeInTheDocument();
  });
});
