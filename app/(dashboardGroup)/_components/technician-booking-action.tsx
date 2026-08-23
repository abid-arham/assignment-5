"use client"

import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { updateBookingStatusAction } from "../_actions/updateBookingStatusAction"
import { BookingStatusValue } from "@/lib/booking-status"
import { IBooking } from "@/lib/types"

export function TechnicianBookingActions({ booking }: { booking: IBooking }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const runUpdate = (status: BookingStatusValue) => {
    setError(null)
    startTransition(async () => {
      const result = await updateBookingStatusAction(booking.id, status)
      if (!result.success) {
        setError(result.message)
        return
      }
      router.refresh()
    })
  }

  const buttonClass = "rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50"

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        {booking.status === "REQUESTED" && (
          <>
            <button disabled={isPending} onClick={() => runUpdate("ACCEPTED")} className={`${buttonClass} bg-primary text-primary-foreground`}>
              Accept
            </button>
            <button disabled={isPending} onClick={() => runUpdate("DECLINED")} className={`${buttonClass} bg-destructive text-destructive-foreground`}>
              Decline
            </button>
          </>
        )}
        {booking.status === "PAID" && (
          <button disabled={isPending} onClick={() => runUpdate("IN_PROGRESS")} className={`${buttonClass} bg-primary text-primary-foreground`}>
            Start Job
          </button>
        )}
        {booking.status === "IN_PROGRESS" && (
          <button disabled={isPending} onClick={() => runUpdate("COMPLETED")} className={`${buttonClass} bg-primary text-primary-foreground`}>
            Complete Job
          </button>
        )}
      </div>
    </div>
  )
}