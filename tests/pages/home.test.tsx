import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

jest.mock('@/components/status/LiveHealthCard', () => ({
  LiveHealthCard: () => <div data-testid="live-health-card">Live Health Card</div>,
}))

jest.mock('@/components/status/ServiceHealthGrid', () => ({
  ServiceHealthGrid: () => <div data-testid="service-health-grid">Service Health Grid</div>,
}))

jest.mock('@/lib/config', () => ({
  getStaticServiceHealth: () => [
    {
      key: 'core-api',
      name: 'Core API',
      url: 'http://localhost:8080',
      configured: true,
    },
    {
      key: 'agents-api',
      name: 'Agents API',
      url: '',
      configured: false,
    },
  ],
  publicConfig: {
    coreApiUrl: 'http://localhost:8080',
    agentsApiUrl: '',
    consoleUrl: 'http://localhost:3000',
  },
  serverConfig: {
    environment: 'development',
    coreApiUrl: 'http://localhost:8080',
    agentsApiUrl: '',
    consoleUrl: 'http://localhost:3000',
  },
}))

jest.mock('@/config/serviceConfig', () => ({
  serviceConfig: {
    SERVICE_NAME: 'Prism Console',
    SERVICE_ID: 'prism-console',
    SERVICE_BASE_URL: 'http://localhost:3000',
    OS_ROOT: 'http://blackroad.systems',
  },
}))

describe('Home Page', () => {
  it('renders the service name and description', () => {
    render(<Home />)

    expect(screen.getByText('Prism Console')).toBeInTheDocument()
    expect(screen.getByText('Operator-facing control panel for BlackRoad OS')).toBeInTheDocument()
  })

  it('displays service metadata badges', () => {
    render(<Home />)

    expect(screen.getByText(/Service ID: prism-console/)).toBeInTheDocument()
    expect(screen.getByText(/Environment: development/)).toBeInTheDocument()
  })

  it('shows configuration URLs', () => {
    render(<Home />)

    expect(screen.getByText(/Base URL:/)).toBeInTheDocument()
    expect(screen.getByText(/OS Root:/)).toBeInTheDocument()
  })

  it('renders the System Status section', () => {
    render(<Home />)

    expect(screen.getByText('System Status')).toBeInTheDocument()
    expect(screen.getByText('Live and static readiness signals for the Prism Console.')).toBeInTheDocument()
  })

  it('includes LiveHealthCard component', () => {
    render(<Home />)

    expect(screen.getByTestId('live-health-card')).toBeInTheDocument()
  })

  it('includes ServiceHealthGrid component', () => {
    render(<Home />)

    expect(screen.getByTestId('service-health-grid')).toBeInTheDocument()
  })

  it('displays dependency checklist', () => {
    render(<Home />)

    expect(screen.getByText('Dependency Checklist')).toBeInTheDocument()
    expect(screen.getByText('Core API:')).toBeInTheDocument()
    expect(screen.getByText('Agents API:')).toBeInTheDocument()
  })

  it('shows configured and missing statuses correctly', () => {
    render(<Home />)

    const configured = screen.getAllByText('Configured')
    const missing = screen.getAllByText('Missing')

    expect(configured.length).toBeGreaterThan(0)
    expect(missing.length).toBeGreaterThan(0)
  })

  it('displays configuration snapshot table', () => {
    render(<Home />)

    expect(screen.getByText('Configuration Snapshot')).toBeInTheDocument()
    expect(screen.getByText('Core API')).toBeInTheDocument()
    expect(screen.getByText('Agents API')).toBeInTheDocument()
    expect(screen.getByText('Console URL')).toBeInTheDocument()
  })

  it('renders operator queue section', () => {
    render(<Home />)

    expect(screen.getByText('Operator Queue')).toBeInTheDocument()
    expect(screen.getByText('Integrate authentication for console routes.')).toBeInTheDocument()
  })
})
