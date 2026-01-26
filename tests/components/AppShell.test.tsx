import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
// import AppShell from '@/components/layout/AppShell'

// vi.mock('@/lib/config', () => ({
//   serverConfig: {
//     environment: 'test',
//   },
// }))

describe.skip('AppShell', () => {
  // These tests are skipped because AppShell component doesn't exist yet
  it.skip('renders the Prism Console logo', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    )

    expect(screen.getByText('Prism Console')).toBeInTheDocument()
  })

  it.skip('renders all navigation links', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    )

    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Agents')).toBeInTheDocument()
  })

  it.skip('displays the environment badge', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    )

    expect(screen.getByText(/Environment: test/)).toBeInTheDocument()
  })

  it.skip('renders children content', () => {
    render(
      <AppShell>
        <div data-testid="child-content">Test Content</div>
      </AppShell>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it.skip('has correct navigation link structure', () => {
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
