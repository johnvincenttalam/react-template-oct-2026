import { Link } from 'react-router'

import { env } from '@/lib/env'
import { cn } from '@/lib/utils'

interface LogoProps {
  to?: string
  /** Hide the wordmark visually and show only the mark (e.g. a collapsed sidebar). */
  compact?: boolean
  /** For use on primary-coloured surfaces. */
  inverted?: boolean
  className?: string
}

/** Brand placeholder. Replace the mark and wordmark with your own. */
export function Logo({ to = '/', compact, inverted, className }: LogoProps) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'grid size-8 shrink-0 place-items-center rounded-lg text-sm font-bold',
          inverted ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground',
        )}
      >
        {env.appName.charAt(0)}
      </span>
      <span className={cn('text-base font-semibold tracking-tight', compact && 'sr-only')}>{env.appName}</span>
    </Link>
  )
}
