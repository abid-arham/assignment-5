import { getAllBookingsAdmin } from "@/service/admin/getAllBookings"
import { IBookingStatus } from "@/lib/types"

const STATUS_STYLES: Record<IBookingStatus, string> = {
  REQUESTED: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  DECLINED: "bg-red-100 text-red-700",
  PAID: "bg-purple-100 text-purple-700",
  IN_PROGRESS: "bg-green-100 text-green-700",
  COMPLETED: "bg-gray-200 text-gray-700",
  CANCELLED: "bg-red-200 text-red-900",
}

function isKnownStatus(status: string): status is IBookingStatus {
  return status in STATUS_STYLES
}

export default async function AdminBookingsPage() {
  const bookings = await getAllBookingsAdmin()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All bookings across the platform.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30 text-left">
              <th className="px-4 py-3 font-medium">Booking ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Technician</th>
              <th className="px-4 py-3 font-medium">Scheduled</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                  No bookings found.
                </td>
              </tr>
            )}

            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{booking.id.slice(0, 8)}</td>
                <td className="px-4 py-3 font-mono text-xs">{booking.customerId.slice(0, 8)}</td>
                <td className="px-4 py-3 font-mono text-xs">{booking.technicianId.slice(0, 8)}</td>
                <td className="px-4 py-3">
                  {new Date(booking.scheduledAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">${Number(booking.totalAmount).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      isKnownStatus(booking.status)
                        ? STATUS_STYLES[booking.status]
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}