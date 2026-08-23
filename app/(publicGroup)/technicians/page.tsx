import { getAllTechnicians } from '@/service/getTechnicians'
import { Star, MapPin, Wrench } from 'lucide-react'
import Link from 'next/link'

function formatRate(rate: string) {
  const n = Number(rate)
  return Number.isFinite(n) ? `$${n.toFixed(2)}/hr` : rate
}

function formatRating(rating: string) {
  const n = Number(rating)
  return Number.isFinite(n) ? n.toFixed(1) : rating
}

export const metadata = {
  title: 'Technicians | AutoCare',
  description: 'Browse available technicians and their expertise.',
}

export default async function TechniciansPage() {
  const technicians = await getAllTechnicians()

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
              Technicians you can trust.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
              Skilled, rated professionals ready to take on your next job.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">Available technicians</p>
        </header>

        {technicians.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            No technicians found.
          </p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {technicians.map((tech) => (
              <li key={tech.id}>
                <Link
                  href={`/technicians/${tech.id}`}
                  className="flex min-h-56 flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        Technician
                      </span>
                      <span className="text-xl font-semibold text-foreground">
                        {formatRate(tech.hourlyRate)}
                      </span>
                    </div>

                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {tech.bio ?? "No bio provided yet."}
                    </p>

                    {tech.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tech.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4 text-sm text-muted-foreground">
                    {tech.location ? (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="size-4" aria-hidden="true" />
                        {tech.location}
                      </span>
                    ) : (
                      <span>Location not set</span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-4 fill-current text-primary" aria-hidden="true" />
                      {formatRating(tech.averageRating)} ({tech.reviewCount})
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}