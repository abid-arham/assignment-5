import Link from 'next/link'
import { ArrowLeft, ArrowRight, Compass, Home, Search } from 'lucide-react'
import Navbar from '@/components/navbar'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="mx-auto flex max-w-7xl flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pt-24 lg:pb-28">
        <div className="relative flex size-40 items-center justify-center sm:size-52" aria-hidden="true">
          <div className="absolute inset-0 rounded-[2.5rem] border border-border bg-secondary/70 rotate-6" />
          <div className="relative flex size-32 -rotate-3 items-center justify-center rounded-[2rem] bg-primary shadow-lg shadow-primary/20 sm:size-44">
            <span className="font-sans text-6xl font-bold tracking-tighter text-primary-foreground sm:text-8xl">404</span>
          </div>
          <div className="absolute -right-1 top-1 flex size-10 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm sm:right-2 sm:top-3" title="Page not found">
            <Compass className="size-5" aria-hidden="true" />
          </div>
        </div>

        <p className="mt-12 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Wrong turn</p>
        <h1 className="mt-4 max-w-2xl text-balance font-sans text-4xl font-bold tracking-tight sm:text-6xl">
          This page needs a professional.
        </h1>
        <p className="mt-5 max-w-lg text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          We couldn&apos;t find the address you entered. Let&apos;s get you back to the right place.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href="/" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Home className="size-4" aria-hidden="true" />
            Back home
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
            <Search className="size-4" aria-hidden="true" />
            Browse services
          </Link>
        </div>

        <Link href="/" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Return to FixItNow
        </Link>
      </section>
    </main>
  )
}
