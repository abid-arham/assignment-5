import { getTechnicianBookings } from "@/service/getTechnicianBookings"
import { getAllService } from "@/service/getService"
import { StatusBadge } from "@/components/status-badge"

import { Calendar, MapPin } from "lucide-react"
import { TechnicianBookingActions } from "../../_components/technician-booking-action"

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
}

export default async function TechnicianBookingsPage() {
  const [bookings, services] = await Promise.all([
    getTechnicianBookings(),
    getAllService(),
  ])
  const serviceMap = new Map(services.map((s) => [s.id, s]))

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Your bookings</h1>

      {bookings.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No bookings assigned yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {bookings.map((booking) => {
            const service = serviceMap.get(booking.serviceId)
            return (
              <li key={booking.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <StatusBadge status={booking.status} />
                    <h2 className="mt-2 text-lg font-semibold text-card-foreground">
                      {service?.title ?? "Service unavailable"}
                    </h2>
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    ${Number(booking.totalAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><Calendar className="size-4" />{formatDate(booking.scheduledAt)}</span>
                  <span className="inline-flex items-center gap-2"><MapPin className="size-4" />{booking.location}</span>
                </div>
                {booking.notes && <p className="text-sm text-muted-foreground">{booking.notes}</p>}
                <TechnicianBookingActions booking={booking} />
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}