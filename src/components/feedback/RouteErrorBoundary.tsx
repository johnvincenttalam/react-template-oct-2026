import { HomeIcon } from 'lucide-react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

import { ErrorState } from '@/components/feedback/ErrorState'
import { Button } from '@/components/ui/button'

/** Rendered by React Router when a route throws during render or loading. */
export function RouteErrorBoundary() {
  const error = useRouteError()

  const title = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'This page failed to load'
  const description = isRouteErrorResponse(error)
    ? typeof error.data === 'string'
      ? error.data
      : 'The request could not be completed.'
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred.'

  return (
    <main id="main-content" className="flex min-h-svh items-center justify-center p-4">
      <ErrorState
        className="max-w-lg"
        title={title}
        description={description}
        onRetry={() => window.location.reload()}
        action={
          <Button asChild variant="ghost">
            <Link to="/">
              <HomeIcon aria-hidden="true" />
              Go home
            </Link>
          </Button>
        }
      />
    </main>
  )
}
