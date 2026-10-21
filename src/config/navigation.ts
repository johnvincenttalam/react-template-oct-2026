import type { LucideIcon } from 'lucide-react'
import { BlocksIcon, FormInputIcon, HomeIcon, LayoutDashboardIcon, LogInIcon, SettingsIcon } from 'lucide-react'

export interface NavItem {
  title: string
  to: string
  icon: LucideIcon
  description?: string
}

/** Single source of truth for navigation: the navbar, sidebar and command menu all read from here. */
export const publicNav: NavItem[] = [
  { title: 'Home', to: '/', icon: HomeIcon, description: 'Template overview' },
  { title: 'Components', to: '/components', icon: BlocksIcon, description: 'Component gallery' },
  { title: 'Forms', to: '/forms', icon: FormInputIcon, description: 'Validation playground' },
]

export const appNav: NavItem[] = [
  { title: 'Dashboard', to: '/dashboard', icon: LayoutDashboardIcon, description: 'Metrics and customers' },
  { title: 'Settings', to: '/settings', icon: SettingsIcon, description: 'Profile, appearance, notifications' },
]

export const authNav: NavItem[] = [
  { title: 'Sign in', to: '/auth/sign-in', icon: LogInIcon, description: 'Auth layout demo' },
]
