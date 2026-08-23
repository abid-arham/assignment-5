
import { notFound } from "next/navigation"
import { Star, MapPin } from "lucide-react"
import { getTechnicianById } from "@/service/getTechnicians"

function formatRate(rate: string) {
  const n = Number(rate)
  return Number.isFinite(n) ? `$${n.toFixed(2)}/hr` : rate
}

function formatRating(rating: string) {
  const n = Number(rating)
  return Number.isFinite(n) ? n.toFixed(1) : rating
}

export default async function TechnicianPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const technician = await getTechnicianById(id)

  if (!technician) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12 md:px-10 md:py-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Technician Profile
            </h1>
            {technician.location && (
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-4" aria-hidden="true" />
                {technician.location}
              </p>
            )}
          </div>
          <span className="text-2xl font-semibold text-foreground">
            {formatRate(technician.hourlyRate)}
          </span>
        </div>

        <p className="text-base leading-7 text-muted-foreground">
          {technician.bio ?? "This technician hasn't added a bio yet."}
        </p>

        {technician.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technician.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-6 border-t border-border pt-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="size-4 fill-current text-primary" aria-hidden="true" />
            {formatRating(technician.averageRating)} ({technician.reviewCount} reviews)
          </span>
          <span>{technician.experience} years experience</span>
          {technician.availability ? (
            <span>
              Available: {technician.availability.days.join(", ")} — {technician.availability.hours}
            </span>
          ) : (
            <span>Availability not set</span>
          )}
        </div>
      </div>
    </main>
  )
}