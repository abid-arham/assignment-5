import { getAllService } from '@/service/getService'
import { Clock3, Wrench } from 'lucide-react'


function formatPrice(price: string) {
  const numericPrice = Number(price)
  return Number.isFinite(numericPrice) ? `$${numericPrice.toFixed(2)}` : price
}

export const metadata = {
  title: 'Services | FixItNow',
  description: 'Browse available automotive services and pricing.',
}

export default async function ServicesPage() {
  const services = await getAllService()
  const activeServices = services.filter((service) => service.isActive)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 md:px-10 md:py-16">
        <header className="flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Wrench className="size-6" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FixItNow</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Services built around your home.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
              Find trusted maintenance and repair services with clear pricing and straightforward scheduling.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">Available services</p>
        </header>

        {activeServices.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            No services found.
          </p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeServices.map((service) => (
              <li key={service.id} className="flex min-h-56 flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      Service
                    </span>
                    <span className="text-xl font-semibold text-foreground">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold tracking-tight text-card-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="size-4" aria-hidden="true" />
                    {service.durationMins} minutes
                  </span>
                  <span>{service.isActive ? 'Available' : 'Unavailable'}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
