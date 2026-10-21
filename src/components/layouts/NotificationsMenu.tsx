import { BellIcon, CheckCheckIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { formatRelative } from '@/lib/format'
import { cn } from '@/lib/utils'
import { mockNotifications } from '@/services/mock/data'

/** Notification entry point. Uses mock notifications kept in component state. */
export function NotificationsMenu() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const unread = notifications.filter((n) => !n.read).length

  const markRead = (id: string) =>
    setNotifications((items) => items.map((n) => (n.id === id ? { ...n, read: true } : n)))
  const markAllRead = () => setNotifications((items) => items.map((n) => ({ ...n, read: true })))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
        >
          <BellIcon aria-hidden="true" />
          {unread > 0 ? (
            <span
              aria-hidden="true"
              className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground"
            >
              {unread}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-sm font-semibold">Notifications</h2>
          <Button variant="ghost" size="sm" onClick={markAllRead} disabled={unread === 0}>
            <CheckCheckIcon aria-hidden="true" />
            Mark all read
          </Button>
        </div>
        <Separator />
        <ul className="max-h-80 overflow-y-auto py-1">
          {notifications.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => markRead(n.id)}
                className="flex w-full gap-3 px-4 py-3 text-left outline-none hover:bg-accent focus-visible:bg-accent"
              >
                <span
                  aria-hidden="true"
                  className={cn('mt-1.5 size-2 shrink-0 rounded-full', n.read ? 'bg-transparent' : 'bg-primary')}
                />
                <span className="min-w-0 space-y-0.5">
                  <span className="block text-sm font-medium">
                    {n.title}
                    {!n.read ? <span className="sr-only"> (unread)</span> : null}
                  </span>
                  <span className="block text-sm text-muted-foreground">{n.body}</span>
                  <span className="block text-xs text-muted-foreground">{formatRelative(n.occurredAt)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <Separator />
        <p className="px-4 py-2 text-xs text-muted-foreground">Mock notifications · reset on reload</p>
      </PopoverContent>
    </Popover>
  )
}
