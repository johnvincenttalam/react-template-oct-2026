import { Outlet, ScrollRestoration } from 'react-router'

import { AppCommandMenu } from '@/components/layouts/AppCommandMenu'
import { AppSidebar } from '@/components/layouts/AppSidebar'
import { CommandMenuButton } from '@/components/layouts/CommandMenuButton'
import { NotificationsMenu } from '@/components/layouts/NotificationsMenu'
import { SkipLink } from '@/components/layouts/SkipLink'
import { UserMenu } from '@/components/layouts/UserMenu'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <SkipLink />
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur supports-backdrop-filter:bg-background/70 sm:px-6">
          <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
          <Separator orientation="vertical" className="mr-1 data-vertical:h-5 data-vertical:self-center" />
          <Breadcrumbs className="min-w-0 truncate" />
          <div className="ml-auto flex items-center gap-1">
            <CommandMenuButton />
            <NotificationsMenu />
            {/* Theme is also in the user menu, so the toggle can go on very small screens. */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <UserMenu />
          </div>
        </header>
        <main id="main-content" tabIndex={-1} className="flex-1 px-4 py-6 outline-none sm:px-6 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
      <AppCommandMenu />
      <ScrollRestoration />
    </SidebarProvider>
  )
}
