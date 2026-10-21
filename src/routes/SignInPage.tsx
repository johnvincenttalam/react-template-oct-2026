import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { FormError } from '@/components/forms/FormError'
import { FormField } from '@/components/forms/FormField'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { getErrorMessage } from '@/lib/api-client'
import { signInSchema, type SignInInput } from '@/schemas/auth'
import { accountService, MOCK_SIGN_IN_PASSWORD } from '@/services/account.service'

export default function SignInPage() {
  useDocumentTitle('Sign in')
  const navigate = useNavigate()

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '', remember: false },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { name } = await accountService.signIn(values)
      toast.success(`Welcome back, ${name} (mock sign-in, no session was created)`)
      await navigate('/dashboard')
    } catch (error) {
      form.setError('root', { message: getErrorMessage(error) })
    }
  })

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="type-title">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Demo only. Use any email with the password{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{MOCK_SIGN_IN_PASSWORD}</code>.
        </p>
      </div>

      <form onSubmit={(event) => void onSubmit(event)} noValidate className="space-y-6">
        <FormError message={form.formState.errors.root?.message} title="Sign-in failed" />
        <fieldset disabled={form.formState.isSubmitting} className="min-w-0">
          <FieldGroup>
            <FormField
              control={form.control}
              name="email"
              label="Email"
              required
              render={({ field, controlProps }) => (
                <Input type="email" autoComplete="email" placeholder="you@example.com" {...field} {...controlProps} />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              required
              render={({ field, controlProps }) => (
                <Input type="password" autoComplete="current-password" {...field} {...controlProps} />
              )}
            />
            <FormField
              control={form.control}
              name="remember"
              label="Keep me signed in"
              orientation="horizontal"
              render={({ field, controlProps }) => (
                <Checkbox
                  {...controlProps}
                  ref={field.ref}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  onBlur={field.onBlur}
                />
              )}
            />
          </FieldGroup>
        </fieldset>
        <Button type="submit" size="lg" fullWidth loading={form.formState.isSubmitting}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        No account?{' '}
        <Link to="/forms" className="font-medium text-primary underline-offset-4 hover:underline">
          Try the registration form
        </Link>
      </p>
    </div>
  )
}
