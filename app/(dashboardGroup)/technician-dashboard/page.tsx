import Link from "next/link"

import { getTechnicianBookings } from "@/service/getTechnicianBookings"
import { getAllService } from "@/service/getService"

import { StatusBadge } from "@/components/status-badge"
import { TechnicianBookingActions } from "../_components/technician-booking-action"
import { getMyTechnicianProfile } from "@/service/getMyTechnicianProfile"

export default async function TechnicianDashboard() {
  const [technician, bookings, services] =
    await Promise.all([
      getMyTechnicianProfile(),
      getTechnicianBookings(),
      getAllService(),
    ])

  const serviceMap = new Map(
    services.map((service) => [
      service.id,
      service,
    ])
  )

  // rest of your existing code...
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "REQUESTED"
  )

  const upcomingBookings = bookings
    .filter(
      (booking) =>
        booking.status === "ACCEPTED" ||
        booking.status === "PAID" ||
        booking.status === "IN_PROGRESS"
    )
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() -
        new Date(b.scheduledAt).getTime()
    )

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  )

  const totalEarnings = completedBookings.reduce(
    (total, booking) =>
      total + Number(booking.totalAmount),
    0
  )

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Technician Dashboard
          </h1>

          <p className="mt-1 text-muted-foreground">
            Welcome back
            {technician?.user?.name
              ? `, ${technician.user.name}`
              : ""}
            .
          </p>
        </div>

        <Link
          href="/technician-dashboard/profile"
          className="rounded-full border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
        >
          Manage Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Pending Requests
          </p>

          <p className="mt-2 text-3xl font-bold">
            {pendingBookings.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Upcoming Jobs
          </p>

          <p className="mt-2 text-3xl font-bold">
            {upcomingBookings.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Completed Jobs
          </p>

          <p className="mt-2 text-3xl font-bold">
            {completedBookings.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Total Earnings
          </p>

          <p className="mt-2 text-3xl font-bold">
            ${totalEarnings.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Technician Profile Summary */}
      {technician && (
        <section className="mt-8 rounded-2xl border bg-card p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Your Profile
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Technician information visible to customers.
              </p>
            </div>

            <Link
              href="/technician-dashboard/profile"
              className="text-sm font-medium text-primary hover:underline"
            >
              Edit profile →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Experience
              </p>

              <p className="mt-1 font-medium">
                {technician.experience} years
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Hourly Rate
              </p>

              <p className="mt-1 font-medium">
                $
                {Number(
                  technician.hourlyRate
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Location
              </p>

              <p className="mt-1 font-medium">
                {technician.location ??
                  "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Rating
              </p>

              <p className="mt-1 font-medium">
                {technician.averageRating} (
                {technician.reviewCount} reviews)
              </p>
            </div>
          </div>

          {technician.skills.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Skills
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {technician.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Pending Requests */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Pending Requests
            </h2>

            <p className="text-sm text-muted-foreground">
              Booking requests waiting for your response.
            </p>
          </div>

          <Link
            href="/technician-dashboard/bookings"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>

        {pendingBookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No pending booking requests.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingBookings.slice(0, 5).map((booking) => {
              const service = serviceMap.get(
                booking.serviceId
              )

              return (
                <div
                  key={booking.id}
                  className="rounded-2xl border bg-card p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <StatusBadge
                        status={booking.status}
                      />

                      <h3 className="mt-2 text-lg font-semibold">
                        {service?.title ??
                          "Service unavailable"}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(
                          booking.scheduledAt
                        ).toLocaleString()}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {booking.location}
                      </p>
                    </div>

                    <p className="text-lg font-semibold">
                      $
                      {Number(
                        booking.totalAmount
                      ).toLocaleString()}
                    </p>
                  </div>

                  {booking.notes && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {booking.notes}
                    </p>
                  )}

                  <div className="mt-5">
                    <TechnicianBookingActions
                      booking={booking}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Upcoming Jobs */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Upcoming Jobs
            </h2>

            <p className="text-sm text-muted-foreground">
              Jobs that have been accepted or paid.
            </p>
          </div>

          <Link
            href="/technician-dashboard/bookings"
            className="text-sm font-medium text-primary hover:underline"
          >
            Manage bookings →
          </Link>
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No upcoming jobs.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">
                    Service
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Location
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {upcomingBookings
                  .slice(0, 5)
                  .map((booking) => {
                    const service =
                      serviceMap.get(
                        booking.serviceId
                      )

                    return (
                      <tr
                        key={booking.id}
                        className="border-b last:border-0"
                      >
                        <td className="px-4 py-4 font-medium">
                          {service?.title ??
                            "Service unavailable"}
                        </td>

                        <td className="px-4 py-4 text-muted-foreground">
                          {new Date(
                            booking.scheduledAt
                          ).toLocaleString()}
                        </td>

                        <td className="px-4 py-4 text-muted-foreground">
                          {booking.location}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge
                            status={
                              booking.status
                            }
                          />
                        </td>

                        <td className="px-4 py-4 text-right font-medium">
                          $
                          {Number(
                            booking.totalAmount
                          ).toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}