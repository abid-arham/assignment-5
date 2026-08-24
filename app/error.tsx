'use client'

import { useEffect } from 'react'
import { Link2, RotateCcw, TriangleAlert } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[v0] Application error:', error)
  }, [error])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground">
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-destructive" />
      <div className="w-full max-w-2xl">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Link2 aria-hidden="true" className="size-4" />
            </span>
            <span>Northstar</span>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Error 500</span>
        </div>

        <section className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-14">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-destructive/10 text-destructive sm:size-28">
            <TriangleAlert aria-hidden="true" className="size-10 sm:size-14" strokeWidth={1.5} />
          </div>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-destructive">A rough patch</p>
            <h1 className="text-balance text-5xl font-bold tracking-[-0.06em] sm:text-7xl sm:leading-[0.95]">
              Something went sideways.
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              We hit an unexpected snag while loading this page. Try again, and we&apos;ll get you back on track.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Try again
            </button>
          </div>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
          <span>If this keeps happening, come back shortly.</span>
          {error.digest ? <span className="font-mono">Ref {error.digest}</span> : null}
        </div>
      </div>
    </main>
  )
}
