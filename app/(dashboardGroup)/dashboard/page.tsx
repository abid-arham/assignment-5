
import { getAllService } from "@/service/getService"
import { Calendar, MapPin, Plus } from "lucide-react"
import Link from "next/link"
import { getAllBookingsAction } from "../_actions/getAllBookingsAction"
import { StatusBadge } from "@/components/status-badge"

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export default async function DashboardPage() {
  const [bookings, services] = await Promise.all([
    getAllBookingsAction(),
    getAllService(),
  ])

  const serviceMap = new Map(services.map((s) => [s.id, s]))
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <Link
          href="/dashboard/bookings/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="size-4" aria-hidden="true" />
          New booking
        </Link>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent bookings</h2>
          <Link href="/dashboard/bookings" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
            You haven't made any bookings yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {recentBookings.map((booking) => {
              const service = serviceMap.get(booking.serviceId)
              return (
                <li
                  key={booking.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      <StatusBadge status={booking.status} />
                    </span>
                    <h3 className="mt-1.5 text-sm font-semibold text-card-foreground">
                      {service?.title ?? "Service unavailable"}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" aria-hidden="true" />
                        {formatDate(booking.scheduledAt)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {booking.location}
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}