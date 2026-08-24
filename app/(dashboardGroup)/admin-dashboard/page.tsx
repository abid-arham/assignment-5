import { getAllUsers } from "@/service/admin/getAllUsers"
import { getAllBookingsAdmin } from "@/service/admin/getAllBookings"
import { IBookingStatus } from "@/lib/types"

const ACTIVE_BOOKING_STATUSES: IBookingStatus[] = ["DECLINED", "ACCEPTED", "COMPLETED", "IN_PROGRESS"]

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  )
}

export default async function AdminOverviewPage() {
  const [users, bookings] = await Promise.all([getAllUsers(), getAllBookingsAdmin()])

  const activeBookingCount = bookings.filter((booking) =>
    ACTIVE_BOOKING_STATUSES.includes(booking.status as IBookingStatus)
  ).length

  const revenue = bookings
    .filter((booking) => booking.status === "COMPLETED" || booking.status === "PAID")
    .reduce((total, booking) => total + Number(booking.totalAmount), 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform-wide stats at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Users" value={String(users.length)} />
        <StatCard label="Active Bookings" value={String(activeBookingCount)} />
        <StatCard label="Revenue" value={`$${revenue.toFixed(2)}`} />
      </div>
    </div>
  )
}