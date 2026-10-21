# Component usage guide

Recommended composition patterns for the shared components. Every component shown here is live in the gallery at `/components`.

## Principles

1. **Compose, don't configure.** Prefer slots (`Card` + `CardHeader` + `CardTitle`…) over components with many boolean props.
2. **Variants over overrides.** If you keep writing the same `className` on a component, add a `cva` variant instead.
3. **Tokens only.** `bg-success/10 text-success-emphasis`, never `bg-green-50 text-green-700`.
4. **One way to show data states.** `LoadingIndicator`/skeletons, `EmptyState`, `ErrorState`.
5. **Accessible by default.** Icon-only buttons get `aria-label`; decorative icons get `aria-hidden="true"`; status is never conveyed by colour alone.

## Page skeleton

```tsx
export default function ProjectsPage() {
  useDocumentTitle('Projects')
  return (
    <div className="space-y-8">
      {' '}
      {/* inside DashboardLayout */}
      <PageHeader
        title="Projects"
        description="Everything your team is working on."
        actions={
          <Button>
            <PlusIcon aria-hidden="true" />
            New project
          </Button>
        }
      />
      <section aria-labelledby="active-heading" className="space-y-4">
        <SectionHeader id="active-heading" title="Active" />…
      </section>
    </div>
  )
}
```

On public pages, wrap content in `<Container>` (`size`: `sm` prose · `md` · `lg` · `xl` default · `full`). Dashboard pages are already constrained by the layout.

## Button

```tsx
<Button>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button size="icon" variant="ghost" aria-label="Settings"><SettingsIcon aria-hidden="true" /></Button>
<Button loading={mutation.isPending}>Save changes</Button>  {/* spinner + disabled + aria-busy */}
<Button fullWidth>Continue</Button>
<Button asChild><Link to="/dashboard">Open dashboard</Link></Button>  {/* navigation = a link */}
```

Variants: `default | secondary | outline | ghost | destructive | link`. Sizes: `xs | sm | default | lg | icon | icon-xs | icon-sm | icon-lg`.
Use a link (`asChild` + `<Link>`) for navigation and a button for actions.

## Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>
      <h2>Team plan</h2>
    </CardTitle>{' '}
    {/* put the real heading level inside */}
    <CardDescription>12 of 20 seats in use</CardDescription>
    <CardAction>
      <Badge variant="success">Active</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter className="gap-2">
    <Button size="sm">Manage</Button>
  </CardFooter>
</Card>
```

## Badges and alerts

```tsx
<Badge variant="success"><CircleCheckIcon aria-hidden="true" />Active</Badge>
<Alert variant="warning">
  <TriangleAlertIcon aria-hidden="true" />
  <AlertTitle>Storage almost full</AlertTitle>
  <AlertDescription>You're using 90% of your quota.</AlertDescription>
</Alert>
```

Variants for both: `default | secondary | outline` (badge only), `success | warning | info | destructive`. Only `destructive` alerts get `role="alert"` (interrupting); pass `role="status"` for dynamic, non-urgent messages.

## Forms

Use `FormField` for every React Hook Form control. It renders the label, required marker, description and error, and returns `controlProps` with the ARIA wiring.

```tsx
<FormField control={form.control} name="email" label="Email" required description="We never share it."
  render={({ field, controlProps }) => <Input type="email" {...field} {...controlProps} />} />

{/* Select: wire value/onChange; put controlProps on the trigger */}
<FormField control={form.control} name="timezone" label="Timezone"
  render={({ field, controlProps }) => (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger {...controlProps} ref={field.ref} onBlur={field.onBlur}><SelectValue /></SelectTrigger>
      <SelectContent>…</SelectContent>
    </Select>
  )} />

{/* Checkbox / Switch: horizontal orientation */}
<FormField control={form.control} name="acceptTerms" label="I accept the terms" orientation="horizontal"
  render={({ field, controlProps }) => (
    <Checkbox {...controlProps} ref={field.ref} checked={field.value}
      onCheckedChange={(checked) => field.onChange(checked === true)} onBlur={field.onBlur} />
  )} />
<FormField … orientation="horizontal" controlPosition="end" render={… <Switch …/>} />  {/* label left, switch right */}

{/* Dates */}
<FormField control={form.control} name="dueDate" label="Due date"
  render={({ field, controlProps }) => <DatePicker {...controlProps} value={field.value} onChange={field.onChange} onBlur={field.onBlur} />} />
```

Form conventions:

- `noValidate` on `<form>` (Zod owns validation), `mode: 'onTouched'` for forgiving feedback.
- Wrap fields in `<fieldset disabled={isSubmitting}>` to lock them during submission.
- Catch submit failures and show them with `form.setError('root', …)` + `<FormError>`; don't let the promise reject unhandled.
- Edit forms: `form.reset(serverData)` when data loads and after saving, so **Reset** returns to the saved state and `isDirty` gates the buttons.
- Put reusable field rules in `src/schemas/common.ts` (`requiredString`, `emailField`, `passwordField`, `optionalUrlField`).

## Search and filters

```tsx
const [search, setSearch] = useState('')
const debounced = useDebouncedValue(search)

<FilterBar label="Filter invoices" activeCount={activeCount} onReset={reset} end={<span>{count} results</span>}>
  <SearchInput value={search} onValueChange={setSearch} label="Search invoices" />
  <Label htmlFor={statusId} className="sr-only">Status</Label>
  <Select value={status} onValueChange={setStatus}>…</Select>
  <DatePicker value={from} onChange={setFrom} placeholder="From…" />
</FilterBar>
```

`FilterBar` is a `role="search"` landmark and shows **Reset filters** while `activeCount > 0`. Every control needs a label, visible or `sr-only`.

## DataTable

```tsx
// columns.tsx (module scope keeps the array stable)
const column = createDataTableColumnHelper<Invoice>()
export const invoiceColumns = column.columns([
  column.accessor('number', { header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice" /> }),
  column.accessor('status', { header: 'Status', cell: ({ getValue }) => <StatusBadge status={getValue()} />, filterFn: 'equalsString' }),
  column.display({ id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions invoice={row.original} /> }),
])

// component
<DataTable
  caption="Invoices"
  columns={invoiceColumns}
  data={data ?? EMPTY}                 // stable fallback, not an inline []
  isLoading={isPending}
  globalFilter={debouncedSearch}
  columnFilters={useMemo(() => (status === 'all' ? [] : [{ id: 'status', value: status }]), [status])}
  initialSorting={[{ id: 'createdAt', desc: true }]}
  renderMobileItem={(row) => <InvoiceCard invoice={row.original} />}
  emptyState={<EmptyState title="No invoices match" />}
/>
```

TanStack Table v9 is tree-shaken: register new features or filter/sort functions once in `components/shared/data-table/features.ts`. **Keep `columns`, `data` and `columnFilters` referentially stable**; a new array on each render resets pagination.

## Overlays

```tsx
{/* Destructive confirmation; waits for the promise and keeps the dialog open on failure */}
<ConfirmDialog
  trigger={<Button variant="destructive">Delete</Button>}
  destructive title="Delete project?" description="This can't be undone." confirmLabel="Delete project"
  onConfirm={() => deleteProject.mutateAsync(id)}
/>

{/* Opening a dialog from a dropdown item: control it */}
const [open, setOpen] = useState(false)
<DropdownMenuItem onSelect={() => setOpen(true)}>Delete…</DropdownMenuItem>
<ConfirmDialog open={open} onOpenChange={setOpen} … />
```

- `Dialog`: forms and focused tasks. Always include `DialogTitle` and `DialogDescription`.
- `Sheet`: side panels and mobile navigation.
- `Popover`: non-modal anchored content (date picker, notifications).
- `Tooltip`: supplementary hints only; never the only label.
- `toast.success / info / warning / error / promise`: transient confirmation. Use inline errors for form problems.

## Data states

```tsx
if (query.isPending) return <LoadingIndicator label="Loading invoices…" /> // or skeletons matching the layout
if (query.isError)
  return <ErrorState error={query.error} onRetry={() => void query.refetch()} isRetrying={query.isRefetching} />
if (query.data.length === 0)
  return <EmptyState icon={FileTextIcon} title="No invoices yet" action={<Button>Create invoice</Button>} />
```

In the dashboard, use **Demo state** (mock mode only) to preview all four states.

## Layouts

Layouts are route components that render `<Outlet />`; pages never import them.

| Layout            | Use for                       | Provides                                                                              |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| `PublicLayout`    | Marketing and content pages   | Skip link, sticky navbar, mobile sheet menu, command menu, footer (`showFooter`)      |
| `AuthLayout`      | Sign-in, sign-up, reset flows | Centred column, optional branding panel (`showBrandPanel`), theme toggle              |
| `DashboardLayout` | Authenticated app screens     | Collapsible sidebar (sheet on mobile), top bar, breadcrumbs, notifications, user menu |

Breadcrumbs come from `handle: { crumb: '…' }` on routes. Navigation items come from `src/config/navigation.ts`.
