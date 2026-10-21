import { NavLink, useLocation } from 'react-router'

import { Logo } from '@/components/shared/Logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { appNav, publicNav, type NavItem } from '@/config/navigation'

function NavGroup({ label, items }: { label: string; items: NavItem[] }) {
  const { pathname } = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ to, title, icon: Icon }) => {
            const isActive = to === '/' ? pathname === '/' : pathname.startsWith(to)
            return (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={title}>
                  <NavLink to={to} end={to === '/'} onClick={() => isMobile && setOpenMobile(false)}>
                    <Icon aria-hidden="true" />
                    <span>{title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" aria-label="Dashboard">
      <SidebarHeader className="h-16 justify-center px-3">
        <Logo to="/dashboard" compact={state === 'collapsed'} />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup label="Application" items={appNav} />
        <NavGroup label="Template" items={publicNav} />
      </SidebarContent>
      <SidebarFooter>
        <p className="px-2 pb-1 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          Demo workspace · mock data
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
