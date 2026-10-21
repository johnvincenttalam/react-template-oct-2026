import { QuoteIcon } from 'lucide-react'
import { Outlet } from 'react-router'

import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  /** Show the decorative branding panel on large screens. */
  showBrandPanel?: boolean
}

export function AuthLayout({ showBrandPanel = true }: AuthLayoutProps) {
  return (
    <div className={cn('grid min-h-svh', showBrandPanel && 'lg:grid-cols-2')}>
      {showBrandPanel ? (
        <aside
          aria-label="About this template"
          className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(1_0_0/0.18),transparent_45%),radial-gradient(circle_at_80%_90%,oklch(1_0_0/0.12),transparent_40%)]"
          />
          <Logo inverted className="relative" />
          <figure className="relative max-w-md space-y-4">
            <QuoteIcon aria-hidden="true" className="size-8 opacity-60" />
            <blockquote className="text-xl leading-relaxed font-medium text-balance">
              A focused layout for sign-in, sign-up and password flows. Swap this panel for product imagery or remove
              it.
            </blockquote>
            <figcaption className="text-sm opacity-80">AuthLayout · branding panel</figcaption>
          </figure>
        </aside>
      ) : null}

      <div className="flex flex-col">
        <header className="flex items-center justify-between p-4 sm:p-6">
          <Logo className={cn(showBrandPanel && 'lg:invisible')} />
          <ThemeToggle />
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 items-center justify-center px-4 pb-12 outline-none sm:px-6"
        >
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
