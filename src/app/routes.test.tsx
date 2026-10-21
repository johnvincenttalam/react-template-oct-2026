import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderRoute } from '@/test/render'

describe('routing', () => {
  it('renders the home page inside the public layout', async () => {
    renderRoute('/')
    expect(await screen.findByRole('heading', { level: 1, name: /cohesive foundation/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('navigates from the home page to the component gallery', async () => {
    const { user, router } = renderRoute('/')
    await user.click(await screen.findByRole('link', { name: /browse components/i }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Component gallery' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/components')
    const mainNav = screen.getByRole('navigation', { name: 'Main' })
    expect(within(mainNav).getByRole('link', { name: 'Components' })).toHaveAttribute('aria-current', 'page')
  })

  it('renders the dashboard inside the dashboard layout with breadcrumbs', async () => {
    renderRoute('/dashboard')
    expect(await screen.findByRole('heading', { level: 1, name: 'Dashboard' })).toBeInTheDocument()
    const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i })
    expect(breadcrumb).toHaveTextContent('Home')
    expect(breadcrumb).toHaveTextContent('Dashboard')
    expect(screen.getByRole('button', { name: /account menu/i })).toBeInTheDocument()
  })

  it('shows the 404 page for unknown routes with a link home', async () => {
    const { user, router } = renderRoute('/does-not-exist')
    expect(await screen.findByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByText('/does-not-exist')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /back to home/i }))
    expect(await screen.findByRole('heading', { level: 1, name: /cohesive foundation/i })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
  })
})
