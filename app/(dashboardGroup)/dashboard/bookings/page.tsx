// app/(dashboardGroup)/dashboard/bookings/page.tsx

import { getAllService } from "@/service/getService"
import { StatusBadge } from "@/components/status-badge"
import { Calendar, MapPin, Plus } from "lucide-react"
import Link from "next/link"
import { getAllBookingsAction } from "../../_actions/getAllBookingsAction"
import { CustomerBookingActions } from "../../_components/customer-booking-action"

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function formatAmount(amount: string) {
  const n = Number(amount)
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : amount
}

export default async function BookingsPage() {
  const [bookings, services] = await Promise.all([
    getAllBookingsAction(),
    getAllService(),
  ])

  const serviceMap = new Map(services.map((s) => [s.id, s]))

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Your bookings</h1>
        <Link
          href="/dashboard/bookings/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="size-4" aria-hidden="true" />
          New booking
        </Link>
      </div>

      {sortedBookings.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          You haven't made any bookings yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {sortedBookings.map((booking) => {
            const service = serviceMap.get(booking.serviceId)

            return (
              <li
                key={booking.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <StatusBadge status={booking.status} />
                    <h2 className="mt-2 text-lg font-semibold text-card-foreground">
                      {service?.title ?? "Service unavailable"}
                    </h2>
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    {formatAmount(booking.totalAmount)}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="size-4" aria-hidden="true" />
                    {formatDate(booking.scheduledAt)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" aria-hidden="true" />
                    {booking.location}
                  </span>
                </div>

                {booking.notes && (
                  <p className="text-sm leading-6 text-muted-foreground">{booking.notes}</p>
                )}

                <CustomerBookingActions booking={booking} />
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}