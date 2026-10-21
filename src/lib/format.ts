const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
const dateTimeFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' })
const relativeFormatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' })

export function formatDate(value: string | Date) {
  return dateFormatter.format(new Date(value))
}

export function formatDateTime(value: string | Date) {
  return dateTimeFormatter.format(new Date(value))
}

const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.345, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
]

/** "3 hours ago", "yesterday", etc. */
export function formatRelative(value: string | Date, now: Date = new Date()) {
  let duration = (new Date(value).getTime() - now.getTime()) / 1000
  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) return relativeFormatter.format(Math.round(duration), division.unit)
    duration /= division.amount
  }
  return formatDate(value)
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
