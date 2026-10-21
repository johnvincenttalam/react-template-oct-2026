import { z } from 'zod'

// Reusable field schemas. Compose these into form schemas so the same rule
// produces the same message everywhere.

export const requiredString = (label: string) => z.string().trim().min(1, `${label} is required`)

export const emailField = z.string().trim().min(1, 'Email is required').pipe(z.email('Enter a valid email address'))

export const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/i, 'Password must contain a letter')
  .regex(/[0-9]/, 'Password must contain a number')

export const optionalUrlField = z.union([
  z.literal(''),
  z.url({ protocol: /^https?$/, error: 'Enter a valid URL starting with http:// or https://' }),
])
