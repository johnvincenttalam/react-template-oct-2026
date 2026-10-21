import { Link } from 'react-router'

import { Container } from '@/components/shared/Container'
import { Logo } from '@/components/shared/Logo'
import { appNav, authNav, publicNav } from '@/config/navigation'

const columns = [
  { heading: 'Explore', items: publicNav },
  { heading: 'App', items: [...appNav, ...authNav] },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <Container className="grid gap-10 py-12 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            A reusable React + Vite starter. All data on these pages is mock data generated in your browser.
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="mb-3 type-label text-foreground">{column.heading}</h2>
            <ul className="space-y-2">
              {column.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="border-t py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Your company. Replace this footer with your own.
      </Container>
    </footer>
  )
}
