import { Outlet, ScrollRestoration } from 'react-router'

import { AppCommandMenu } from '@/components/layouts/AppCommandMenu'
import { Footer } from '@/components/layouts/Footer'
import { Navbar } from '@/components/layouts/Navbar'
import { SkipLink } from '@/components/layouts/SkipLink'

interface PublicLayoutProps {
  /** Set to false for focused pages such as marketing landing variants. */
  showFooter?: boolean
}

export function PublicLayout({ showFooter = true }: PublicLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
      <AppCommandMenu />
      <ScrollRestoration />
    </div>
  )
}
