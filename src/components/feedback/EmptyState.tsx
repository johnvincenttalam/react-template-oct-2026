import type { LucideIcon } from 'lucide-react'
import { InboxIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  title: string
  description?: ReactNode
  icon?: LucideIcon
  /** Buttons or links that help the user get out of the empty state. */
  action?: ReactNode
  /** Adds a dashed border, useful inside cards and tables. */
  bordered?: boolean
  className?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon = InboxIcon,
  action,
  bordered,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={cn(bordered && 'border border-dashed', className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description ? <EmptyDescription>{description}</EmptyDescription> : null}
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  )
}
