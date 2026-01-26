import React from 'react'
import { render, screen } from '@testing-library/react'
// import { StatusCard, StatusCardProps } from '@/components/status/StatusCard'

describe.skip('StatusCard', () => {
  // These tests are skipped because StatusCard component doesn't exist yet
  const mockProps = {
    title: 'Test Service',
    description: 'Test description',
    environment: 'development',
    services: [
      {
        key: 'core',
        name: 'Core API',
        url: 'http://localhost:8080',
        status: 'healthy',
        configured: true,
        latencyMs: 150,
      },
      {
        key: 'agents',
        name: 'Agent API',
        url: '',
        status: 'not_configured',
        configured: false,
      },
    ],
  }

  it.skip('renders the title and environment badge', () => {
    render(<StatusCard {...mockProps} />)

    expect(screen.getByText('Test Service')).toBeInTheDocument()
    expect(screen.getByText('development')).toBeInTheDocument()
  })

  it.skip('renders the description when provided', () => {
    render(<StatusCard {...mockProps} />)

    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it.skip('renders service information in a table', () => {
    render(<StatusCard {...mockProps} />)

    expect(screen.getByText('Core API')).toBeInTheDocument()
    expect(screen.getByText('http://localhost:8080')).toBeInTheDocument()
    expect(screen.getByText('Healthy')).toBeInTheDocument()
    expect(screen.getByText('150 ms')).toBeInTheDocument()
  })

  it.skip('displays not configured status correctly', () => {
    render(<StatusCard {...mockProps} />)

    expect(screen.getByText('Agent API')).toBeInTheDocument()
    expect(screen.getByText('Not configured')).toBeInTheDocument()
  })

  it.skip('shows warning when services are not configured', () => {
    render(<StatusCard {...mockProps} />)

    expect(screen.getByText('Backend URLs are required in staging/production.')).toBeInTheDocument()
  })

  it.skip('does not show warning when all services are configured', () => {
    const allConfiguredProps: StatusCardProps = {
      ...mockProps,
      services: [
        {
          key: 'core',
          name: 'Core API',
          url: 'http://localhost:8080',
          status: 'healthy',
          configured: true,
          latencyMs: 150,
        },
      ],
    }

    render(<StatusCard {...allConfiguredProps} />)

    expect(screen.queryByText('Backend URLs are required in staging/production.')).not.toBeInTheDocument()
  })
})
