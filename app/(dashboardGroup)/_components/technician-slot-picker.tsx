"use client"

import { useEffect, useState } from "react"

import { getTechnicianAvailability } from "@/service/getTechnicianAvailability"
import { IAvailableSlot } from "@/lib/types"

interface TechnicianSlotPickerProps {
  technicianId: string
  serviceId?: string
  selectedSlot: string
  onSelectSlot: (isoDateTime: string) => void
}

export default function TechnicianSlotPicker({
  technicianId,
  serviceId,
  selectedSlot,
  onSelectSlot,
}: TechnicianSlotPickerProps) {
  const today = new Date().toISOString().split("T")[0]

  const [date, setDate] = useState(today)
  const [slots, setSlots] = useState<IAvailableSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!technicianId || !date) return

    let cancelled = false

    const fetchSlots = async () => {
      setLoading(true)
      setError("")
      setSlots([])

      const result = await getTechnicianAvailability(technicianId, date, serviceId)

      if (cancelled) return
      setLoading(false)

      if (!result.ok) {
        setError(result.message)
        return
      }

      setSlots(result.data.slots)
    }

    fetchSlots()

    return () => {
      cancelled = true
    }
  }, [technicianId, date, serviceId])

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="booking-date" className="block text-sm font-medium">
          Select a date
        </label>
        <input
          id="booking-date"
          type="date"
          min={today}
          value={date}
          onChange={(event) => {
            setDate(event.target.value)
            onSelectSlot("")
          }}
          className="mt-2 w-full max-w-xs rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <p className="text-sm font-medium">Available times</p>

        {loading && (
          <p className="mt-2 text-sm text-muted-foreground">Loading slots...</p>
        )}

        {!loading && error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}

        {!loading && !error && slots.length === 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            No available slots for this date. Try a different day.
          </p>
        )}

        {!loading && !error && slots.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot.start
              const label = new Date(slot.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })

              return (
                <button
                  key={slot.start}
                  type="button"
                  onClick={() => onSelectSlot(slot.start)}
                  className={`rounded-md border px-3 py-2 text-sm font-medium ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}