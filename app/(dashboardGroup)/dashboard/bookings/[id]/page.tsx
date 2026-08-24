import Link from "next/link"

import { getAllBookingsAction } from "@/app/(dashboardGroup)/_actions/getAllBookingsAction"
import { getAllService } from "@/service/getService"
import { getTechnicians } from "@/service/getTechnicians"

import { StatusBadge } from "@/components/status-badge"
import CustomerBookingAction from "@/app/(dashboardGroup)/_components/customer-booking-action"
interface BookingDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const { id } = await params

  const [bookings, services, technicians] =
    await Promise.all([
      getAllBookingsAction(),
      getAllService(),
      getTechnicians(),
    ])

  const booking = bookings.find(
    (item) => item.id === id
  )

  if (!booking) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-xl border p-8 text-center">
          <h1 className="text-xl font-semibold">
            Booking not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This booking could not be found.
          </p>

          <Link
            href="/dashboard/bookings"
            className="mt-6 inline-block rounded-md border px-4 py-2 text-sm"
          >
            Back to bookings
          </Link>
        </div>
      </main>
    )
  }

  const service = services.find(
    (item) => item.id === booking.serviceId
  )

  const technician = technicians.find(
    (item) => item.id === booking.technicianId
  )

  const scheduledDate = new Date(
    booking.scheduledAt
  )

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/bookings"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to bookings
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Booking Details
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Booking ID: {booking.id}
          </p>
        </div>

        <StatusBadge
          status={booking.status}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Service */}
        <section className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">
            Service
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">
                Service
              </p>

              <p className="font-medium">
                {service?.title ??
                  "Service unavailable"}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">
                Amount
              </p>

              <p className="font-medium">
                ৳
                {Number(
                  booking.totalAmount
                ).toLocaleString()}
              </p>
            </div>

            {service?.description && (
              <div>
                <p className="text-muted-foreground">
                  Description
                </p>

                <p>
                  {service.description}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Technician */}
        <section className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">
            Technician
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">
                Name
              </p>

              <p className="font-medium">
                {technician?.user?.name ??
                  "Technician unavailable"}
              </p>
            </div>

            {technician?.location && (
              <div>
                <p className="text-muted-foreground">
                  Location
                </p>

                <p>
                  {technician.location}
                </p>
              </div>
            )}

            {technician?.hourlyRate && (
              <div>
                <p className="text-muted-foreground">
                  Hourly Rate
                </p>

                <p>
                  ৳
                  {Number(
                    technician.hourlyRate
                  ).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Schedule */}
        <section className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">
            Schedule
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">
                Date
              </p>

              <p className="font-medium">
                {scheduledDate.toLocaleDateString(
                  "en-BD",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">
                Time
              </p>

              <p className="font-medium">
                {scheduledDate.toLocaleTimeString(
                  "en-BD",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">
                Location
              </p>

              <p className="font-medium">
                {booking.location}
              </p>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">
            Notes
          </h2>

          <div className="mt-4 text-sm">
            {booking.notes ? (
              <p>{booking.notes}</p>
            ) : (
              <p className="text-muted-foreground">
                No additional notes were provided.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Actions */}
      <section className="mt-6 rounded-xl border p-6">
        <h2 className="text-lg font-semibold">
          Actions
        </h2>

        <div className="mt-4">
          <CustomerBookingAction
            booking={booking}
          />
        </div>
      </section>
    </main>
  )
}