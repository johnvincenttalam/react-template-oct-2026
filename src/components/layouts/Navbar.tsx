import { ArrowRightIcon, MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'

import { CommandMenuButton } from '@/components/layouts/CommandMenuButton'
import { Container } from '@/components/shared/Container'
import { Logo } from '@/components/shared/Logo'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { publicNav } from '@/config/navigation'
import { cn } from '@/lib/utils'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
    isActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
  )

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <Container className="flex h-16 items-center gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {publicNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <CommandMenuButton />
          <ThemeToggle />
          <Button asChild className="ml-2 hidden sm:inline-flex">
            <Link to="/dashboard">
              Open dashboard
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
                <MenuIcon aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription className="sr-only">Links to every page in the template</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {publicNav.map(({ to, title, icon: Icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end={to === '/'}
                        onClick={() => setMobileOpen(false)}
                        className={(state) => cn(linkClass(state), 'flex items-center gap-3')}
                      >
                        <Icon aria-hidden="true" className="size-4" />
                        {title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    Open dashboard
                    <ArrowRightIcon aria-hidden="true" />
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
