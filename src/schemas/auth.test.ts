import { describe, expect, it } from 'vitest'

import { registrationSchema } from '@/schemas/auth'

const valid = {
  fullName: 'Jordan Rivera',
  email: 'jordan@example.com',
  role: 'designer' as const,
  dateOfBirth: new Date(1990, 4, 12),
  password: 'secret123',
  confirmPassword: 'secret123',
  acceptTerms: true,
}

function issuesFor(input: unknown) {
  const result = registrationSchema.safeParse(input)
  if (result.success) return {}
  // Keep the first issue per field: that is the message the form displays.
  const issues: Record<string, string> = {}
  for (const issue of result.error.issues) issues[issue.path.join('.')] ??= issue.message
  return issues
}

describe('registrationSchema', () => {
  it('accepts valid input', () => {
    expect(registrationSchema.safeParse(valid).success).toBe(true)
  })

  it('requires the full name and a valid email', () => {
    expect(issuesFor({ ...valid, fullName: '   ', email: 'not-an-email' })).toMatchObject({
      fullName: 'Full name is required',
      email: 'Enter a valid email address',
    })
  })

  it('enforces password strength', () => {
    expect(issuesFor({ ...valid, password: 'short', confirmPassword: 'short' }).password).toBe(
      'Password must be at least 8 characters',
    )
    expect(issuesFor({ ...valid, password: 'lettersonly', confirmPassword: 'lettersonly' }).password).toBe(
      'Password must contain a number',
    )
  })

  it('requires matching passwords', () => {
    expect(issuesFor({ ...valid, confirmPassword: 'different1' }).confirmPassword).toBe('Passwords do not match')
  })

  it('requires accepting the terms', () => {
    expect(issuesFor({ ...valid, acceptTerms: false }).acceptTerms).toBe('You must accept the terms to continue')
  })

  it('rejects users younger than 16', () => {
    const recent = new Date()
    recent.setFullYear(recent.getFullYear() - 10)
    expect(issuesFor({ ...valid, dateOfBirth: recent }).dateOfBirth).toBe('You must be at least 16 years old')
  })
})
