"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { updateBookingStatusAction } from "@/app/(dashboardGroup)/_actions/updateBookingStatusAction"
import { IBooking } from "@/lib/types"
import { BookingStatusValue } from "@/lib/booking-status"

interface TechnicianBookingActionsProps {
  booking: IBooking
}

export function TechnicianBookingActions({
  booking,
}: TechnicianBookingActionsProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const updateStatus = async (
    status: BookingStatusValue
  ) => {
    setLoading(true)
    setError("")

    const result =
      await updateBookingStatusAction(
        booking.id,
        status
      )

    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    router.refresh()
  }

  const handleDecline = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to decline this booking?"
    )

    if (!confirmed) {
      return
    }

    await updateStatus("DECLINED")
  }

  if (booking.status === "REQUESTED") {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              updateStatus("ACCEPTED")
            }
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Accept"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleDecline}
            className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Decline"}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  }

  if (booking.status === "PAID") {
    return (
      <div className="space-y-3">
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            updateStatus("IN_PROGRESS")
          }
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Starting..."
            : "Start Job"}
        </button>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  }

  if (booking.status === "IN_PROGRESS") {
    return (
      <div className="space-y-3">
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            updateStatus("COMPLETED")
          }
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Completing..."
            : "Complete Job"}
        </button>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  }

  if (booking.status === "ACCEPTED") {
    return (
      <div className="text-sm text-muted-foreground">
        Waiting for customer payment.
      </div>
    )
  }

  if (booking.status === "COMPLETED") {
    return (
      <div className="text-sm text-muted-foreground">
        Job completed.
      </div>
    )
  }

  if (booking.status === "DECLINED") {
    return (
      <div className="text-sm text-red-600">
        Booking declined.
      </div>
    )
  }

  if (booking.status === "CANCELLED") {
    return (
      <div className="text-sm text-muted-foreground">
        Booking cancelled.
      </div>
    )
  }

  return null
}