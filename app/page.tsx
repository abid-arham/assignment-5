import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Droplets,
  Hammer,
  Home,
  Paintbrush,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import Navbar from '@/components/navbar'

const categories = [
  { name: 'Plumbing', detail: 'Leaks, taps & pipes', icon: Droplets },
  { name: 'Electrical', detail: 'Safe, reliable repairs', icon: Zap },
  { name: 'Cleaning', detail: 'A fresh start at home', icon: Sparkles },
  { name: 'Handyman', detail: 'The jobs on your list', icon: Hammer },
  { name: 'Painting', detail: 'Make rooms feel new', icon: Paintbrush },
]

const technicians = [
  { name: 'Avery Mitchell', trade: 'Master plumber', rating: '4.9', jobs: '128 jobs', initials: 'AM', tone: 'bg-primary' },
  { name: 'Jordan Lee', trade: 'Electrician', rating: '5.0', jobs: '96 jobs', initials: 'JL', tone: 'bg-secondary' },
  { name: 'Samira Khan', trade: 'Home cleaner', rating: '4.8', jobs: '210 jobs', initials: 'SK', tone: 'bg-accent' },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      
      <section className="border-b border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 pb-20 pt-14 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl flex-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
              <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
              Trusted help, right when you need it
            </div>
            <h1 className="max-w-xl text-balance font-sans text-5xl font-bold leading-[1.03] tracking-tight sm:text-7xl">
              Your home, <span className="underline decoration-primary decoration-8 underline-offset-4">in good hands.</span>
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-8 text-muted-foreground">
              Find vetted local professionals for the jobs that keep your home running beautifully.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/services" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                Find a professional <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link href="#how-it-works" className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary">
                See how it works
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" aria-hidden="true" /> Vetted professionals</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-primary" aria-hidden="true" /> Secure booking</span>
            </div>
          </div>

          <div className="relative flex-1 lg:max-w-xl">
            <div className="rounded-[2rem] bg-secondary p-4 sm:p-6">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-card p-5 shadow-xl shadow-foreground/5 sm:p-7">
                <div className="absolute right-0 top-0 size-28 rounded-bl-[4rem] bg-primary/20" aria-hidden="true" />
                <div className="relative flex items-start justify-between">
                  <div><p className="text-sm font-semibold">What can we help with?</p><p className="mt-1 text-xs text-muted-foreground">Tell us what needs fixing</p></div>
                  <Home className="size-5 text-primary" aria-hidden="true" />
                </div>
                <div className="relative mt-6 flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5">
                  <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">Search for a service...</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Leaky faucet', 'Deep clean', 'Install a light'].map((item) => <span key={item} className="rounded-full bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground">{item}</span>)}
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
                  <div><p className="text-xs text-muted-foreground">Average response time</p><p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><Clock3 className="size-3.5 text-primary" aria-hidden="true" /> Under 15 minutes</p></div>
                  <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">4.9/5 rating</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:flex">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold">✓</span><div><p className="text-xs font-semibold">Booking confirmed</p><p className="text-[11px] text-muted-foreground">A pro is on the way</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-muted-foreground">Start with a service</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Small fixes. Big relief.</h2></div><Link href="/services" className="hidden items-center gap-1 text-sm font-semibold sm:flex">View all services <ChevronRight className="size-4" aria-hidden="true" /></Link></div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {categories.map(({ name, detail, icon: Icon }) => <Link key={name} href="/services" className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md sm:p-5"><span className="flex size-11 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary"><Icon className="size-5" aria-hidden="true" /></span><p className="mt-5 text-sm font-semibold">{name}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p></Link>)}
        </div>
      </section>

      <section id="how-it-works" className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24">
          <div><p className="text-sm font-semibold text-primary">How FixItNow works</p><h2 className="mt-3 max-w-md text-3xl font-bold tracking-tight sm:text-5xl">A better way to take care of home.</h2><p className="mt-5 max-w-md leading-7 text-background/65">From the first search to the final thumbs-up, we make getting help feel simple.</p></div>
          <div className="grid gap-4 sm:grid-cols-3">{[['01', 'Tell us what you need', 'Choose a service and share a few details.'], ['02', 'Meet your match', 'Compare trusted pros, prices, and reviews.'], ['03', 'Get it done', 'Book a time, then relax. We have you covered.']].map(([number, title, text]) => <div key={number} className="border-t border-background/20 pt-5"><span className="font-mono text-sm text-primary">{number}</span><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-background/60">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-muted-foreground">Meet the community</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">People you can count on.</h2></div><Link href="/services" className="hidden items-center gap-1 text-sm font-semibold sm:flex">Meet all pros <ChevronRight className="size-4" aria-hidden="true" /></Link></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{technicians.map((tech) => <article key={tech.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"><div className={`flex size-14 shrink-0 items-center justify-center rounded-full text-sm font-bold ${tech.tone}`}>{tech.initials}</div><div className="min-w-0"><h3 className="font-semibold">{tech.name}</h3><p className="mt-1 text-sm text-muted-foreground">{tech.trade}</p><div className="mt-2 flex items-center gap-2 text-xs"><span className="inline-flex items-center gap-1 font-semibold"><Star className="size-3.5 fill-primary text-primary" aria-hidden="true" /> {tech.rating}</span><span className="text-muted-foreground">· {tech.jobs}</span></div></div></article>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10"><div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-primary px-6 py-10 sm:px-10 lg:flex-row lg:items-center"><div><h2 className="text-3xl font-bold tracking-tight text-primary-foreground">Ready to cross it off your list?</h2><p className="mt-2 text-sm text-primary-foreground/70">Find your next trusted professional today.</p></div><Link href="/services" className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5">Browse services</Link></div></section>

      <footer className="border-t border-border/70"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><span className="font-semibold text-foreground">FixItNow</span><span>Trusted help for every corner of home.</span></div></footer>
    </main>
  )
}
