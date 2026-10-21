import { useDemoStore } from '@/stores/demo-store'

/** Simulates network latency. */
export function delay(ms = 600) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

/**
 * Applies the scenario chosen in the dashboard's "Demo state" switcher so the
 * loading, empty and error UI can be inspected without a backend.
 * Returns true when the caller should return an empty result.
 */
export async function applyDemoScenario(): Promise<boolean> {
  const { scenario } = useDemoStore.getState()
  if (scenario === 'loading') return new Promise<never>(() => {})
  await delay()
  if (scenario === 'error') throw new Error('Mock server error: the demo is set to the "Error" state.')
  return scenario === 'empty'
}

export function clone<T>(value: T): T {
  return structuredClone(value)
}
