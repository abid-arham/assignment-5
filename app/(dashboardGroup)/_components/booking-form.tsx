"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createBookingAction } from "../_actions/createBookingAction"
import TechnicianSlotPicker from "./technician-slot-picker"
import { toast } from "sonner"

type BookingFormProps = {
  technicians: { id: string; name: string; hourlyRate: string }[]
  services: { id: string; title: string; price: string; durationMins: number }[]
}

export function BookingForm({ technicians, services }: BookingFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [technicianId, setTechnicianId] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")

  const selectedTechnician = useMemo(
    () => technicians.find((t) => t.id === technicianId) ?? null,
    [technicianId, technicians]
  )
  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId) ?? null,
    [serviceId, services]
  )

  const estimatedTotal = useMemo(() => {
    if (!selectedTechnician || !selectedService) return null
    const rate = Number(selectedTechnician.hourlyRate)
    const hours = selectedService.durationMins / 60
    if (!Number.isFinite(rate) || !Number.isFinite(hours)) return null
    return rate * hours
  }, [selectedTechnician, selectedService])

  const handleSubmit = (formData: FormData) => {
    setError(null)

    const location = formData.get("location") as string
    const notes = formData.get("notes") as string

    if (!technicianId || !serviceId || !scheduledAt || !location) {
      const msg = "Please fill in all required fields, including a time slot."
      setError(msg)
      toast.error(msg)
      return
    }

    if (estimatedTotal === null) {
      const msg = "Could not calculate a total for this selection."
      setError(msg)
      toast.error(msg)
      return
    }

    startTransition(async () => {
      const result = await createBookingAction({
        technicianId,
        serviceId,
        scheduledAt,
        location,
        notes: notes || undefined,
        totalAmount: Number(estimatedTotal.toFixed(2)),
      })

      if (!result.success) {
        setError(result.message)
        toast.error(result.message)
        return
      }

      toast.success("Booking created successfully!")
      router.push("/dashboard")
      router.refresh()
    })
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="serviceId" className="text-sm font-medium text-foreground">Service</label>
        <select
          id="serviceId"
          name="serviceId"
          required
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value)
            setScheduledAt("")
          }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.title} — {s.durationMins} min</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="technicianId" className="text-sm font-medium text-foreground">Technician</label>
        <select
          id="technicianId"
          name="technicianId"
          required
          value={technicianId}
          onChange={(e) => {
            setTechnicianId(e.target.value)
            setScheduledAt("")
          }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a technician</option>
          {technicians.map((t) => (
            <option key={t.id} value={t.id}>{t.name} — ${Number(t.hourlyRate).toFixed(2)}/hr</option>
          ))}
        </select>
      </div>

      {estimatedTotal !== null && (
        <div className="rounded-lg border border-border bg-muted/50 px-4 py-3">
          <p className="text-sm text-muted-foreground">Estimated total</p>
          <p className="text-lg font-semibold text-foreground">${estimatedTotal.toFixed(2)}</p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-foreground">Date & time</p>
        {technicianId ? (
          <TechnicianSlotPicker
            technicianId={technicianId}
            serviceId={serviceId || undefined}
            selectedSlot={scheduledAt}
            onSelectSlot={setScheduledAt}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a technician first to see available times.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="location" className="text-sm font-medium text-foreground">Location</label>
        <input type="text" id="location" name="location" required placeholder="e.g. Notun Bazar, Dhaka" className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className="text-sm font-medium text-foreground">Notes (optional)</label>
        <textarea id="notes" name="notes" rows={3} className="rounded-lg border border-border bg-background px-3 py-2 text-sm" />
      </div>

      <button
        type="submit"
        disabled={isPending || estimatedTotal === null || !scheduledAt}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Booking..." : "Confirm booking"}
      </button>
    </form>
  )
}