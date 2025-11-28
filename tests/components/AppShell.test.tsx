import React from 'react'
import { render, screen } from '@testing-library/react'
import AppShell from '@/components/layout/AppShell'

jest.mock('@/lib/config', () => ({
  serverConfig: {
    environment: 'test',
  },
}))

describe('AppShell', () => {
  it('renders the Prism Console logo', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    )

    expect(screen.getByText('Prism Console')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    )

    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Agents')).toBeInTheDocument()
  })

  it('displays the environment badge', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    )

    expect(screen.getByText(/Environment: test/)).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <AppShell>
        <div data-testid="child-content">Test Content</div>
      </AppShell>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('has correct navigation link structure', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    )

    const overviewLink = screen.getByText('Overview').closest('a')
    const statusLink = screen.getByText('Status').closest('a')
    const agentsLink = screen.getByText('Agents').closest('a')

    expect(overviewLink).toHaveAttribute('href', '/')
    expect(statusLink).toHaveAttribute('href', '/status')
    expect(agentsLink).toHaveAttribute('href', '/agents')
  })
})
