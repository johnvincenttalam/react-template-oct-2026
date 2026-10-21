/** Metadata attached to routes through the `handle` field in src/app/router.tsx. */
export interface RouteHandle {
  /** Label shown in breadcrumbs. Routes without one are skipped. */
  crumb?: string
}
