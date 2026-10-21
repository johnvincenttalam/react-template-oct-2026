import { Outlet } from 'react-router'

import { LoadingIndicator } from '@/components/feedback/LoadingIndicator'
import { NavigationProgress } from '@/components/feedback/NavigationProgress'

/** Top of the route tree: global UI that every layout shares. */
export function RootLayout() {
  return (
    <>
      <NavigationProgress />
      <Outlet />
    </>
  )
}

/** Shown while the first lazy route chunk loads. */
export function AppLoading() {
  return <LoadingIndicator label="Loading app…" className="min-h-svh" />
}
