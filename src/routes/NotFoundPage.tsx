import { ArrowLeftIcon, CompassIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/hooks/use-document-title'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')
  const { pathname } = useLocation()

  return (
    <main
      id="main-content"
      className="flex min-h-svh flex-col items-center justify-center gap-10 px-4 py-16 text-center"
    >
      <Logo />
      <div className="space-y-4">
        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground">
          <CompassIcon aria-hidden="true" className="size-6" />
        </span>
        <p className="type-eyebrow text-primary">Error 404</p>
        <h1 className="type-title">Page not found</h1>
        <p className="mx-auto max-w-md text-muted-foreground">
          Nothing lives at{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm break-all">{pathname}</code>. It may have
          moved, or the link may be mistyped.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/">
            <ArrowLeftIcon aria-hidden="true" />
            Back to home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </main>
  )
}
