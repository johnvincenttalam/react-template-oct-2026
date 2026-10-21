import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router'

import { RouteErrorBoundary } from '@/components/feedback/RouteErrorBoundary'
import { AppLoading, RootLayout } from '@/components/layouts/RootLayout'
import type { RouteHandle } from '@/types/router'

/** Lazy-loads a page module whose default export is the page component (one JS chunk per page). */
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({ Component: (await load()).default })

/** Lazy-loads a layout, so e.g. the dashboard shell isn't downloaded by visitors of public pages. */
const layout =
  <TModule,>(load: () => Promise<TModule>, pick: (module: TModule) => ComponentType) =>
  async () => ({ Component: pick(await load()) })

/**
 * Route tree. Layouts are pathless parents, so one shell serves many pages.
 * Add `handle: { crumb }` to include a route in the breadcrumbs.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: RouteErrorBoundary,
    HydrateFallback: AppLoading,
    handle: { crumb: 'Home' } satisfies RouteHandle,
    children: [
      {
        lazy: layout(
          () => import('@/components/layouts/PublicLayout'),
          (m) => m.PublicLayout,
        ),
        children: [
          { index: true, lazy: page(() => import('@/routes/HomePage')) },
          { path: 'components', lazy: page(() => import('@/routes/ComponentsPage')) },
          { path: 'forms', lazy: page(() => import('@/routes/FormsPage')) },
        ],
      },
      {
        path: 'auth',
        lazy: layout(
          () => import('@/components/layouts/AuthLayout'),
          (m) => m.AuthLayout,
        ),
        children: [{ path: 'sign-in', lazy: page(() => import('@/routes/SignInPage')) }],
      },
      {
        lazy: layout(
          () => import('@/components/layouts/DashboardLayout'),
          (m) => m.DashboardLayout,
        ),
        children: [
          {
            path: 'dashboard',
            handle: { crumb: 'Dashboard' } satisfies RouteHandle,
            lazy: page(() => import('@/routes/DashboardPage')),
          },
          {
            path: 'settings',
            handle: { crumb: 'Settings' } satisfies RouteHandle,
            lazy: page(() => import('@/routes/SettingsPage')),
          },
        ],
      },
      { path: '*', lazy: page(() => import('@/routes/NotFoundPage')) },
    ],
  },
]
