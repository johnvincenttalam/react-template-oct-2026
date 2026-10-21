import { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { CommandMenu, type CommandActionGroup } from '@/components/shared/CommandMenu'
import { appNav, authNav, publicNav } from '@/config/navigation'
import { themeOptions } from '@/config/theme-options'
import { useTheme } from '@/hooks/use-theme'
import { useUiStore } from '@/stores/ui-store'

/** The command menu wired to the app's routes and theme. Mounted once in each layout. */
export function AppCommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const open = useUiStore((state) => state.commandMenuOpen)
  const setOpen = useUiStore((state) => state.setCommandMenuOpen)

  const groups = useMemo<CommandActionGroup[]>(
    () => [
      {
        heading: 'Pages',
        actions: [...publicNav, ...appNav, ...authNav].map((item) => ({
          id: item.to,
          label: item.title,
          icon: item.icon,
          keywords: item.description ? [item.description] : undefined,
          onSelect: () => navigate(item.to),
        })),
      },
      {
        heading: 'Theme',
        actions: themeOptions.map((option) => ({
          id: `theme-${option.value}`,
          label: `Use ${option.label.toLowerCase()} theme`,
          icon: option.icon,
          keywords: ['appearance', 'dark mode', 'light mode'],
          onSelect: () => setTheme(option.value),
        })),
      },
    ],
    [navigate, setTheme],
  )

  return <CommandMenu open={open} onOpenChange={setOpen} groups={groups} />
}
