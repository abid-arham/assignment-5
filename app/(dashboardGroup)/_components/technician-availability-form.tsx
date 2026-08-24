"use client"

import { useState, useTransition } from "react"

import {
  updateTechnicianAvailabilityAction,
} from "../_actions/updateTechnicianAvailabilityAction"

interface TechnicianAvailabilityFormProps {
  initialDays: string[]
  initialHours: string
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export function TechnicianAvailabilityForm({
  initialDays,
  initialHours,
}: TechnicianAvailabilityFormProps) {
  const [isPending, startTransition] =
    useTransition()

  const [days, setDays] =
    useState<string[]>(initialDays)

  const [hours, setHours] =
    useState(initialHours)

  const [message, setMessage] =
    useState<{
      text: string
      isError: boolean
    } | null>(null)

  const toggleDay = (day: string) => {
    setDays((currentDays) => {
      if (currentDays.includes(day)) {
        return currentDays.filter(
          (currentDay) => currentDay !== day
        )
      }

      return [...currentDays, day]
    })
  }

  const handleSubmit = () => {
    setMessage(null)

    if (days.length === 0) {
      setMessage({
        text: "Select at least one working day.",
        isError: true,
      })
      return
    }

    if (!hours.trim()) {
      setMessage({
        text: "Working hours cannot be empty.",
        isError: true,
      })
      return
    }

    startTransition(async () => {
      const result =
        await updateTechnicianAvailabilityAction({
          days,
          hours: hours.trim(),
        })

      setMessage({
        text: result.message,
        isError: !result.success,
      })
    })
  }

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Availability
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Choose the days and working hours when
          customers can request your services.
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg border p-3 text-sm ${
            message.isError
              ? "border-destructive/30 text-destructive"
              : "border-border text-muted-foreground"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Working days */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">
            Working days
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {DAYS.map((day) => {
              const selected =
                days.includes(day)

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    toggleDay(day)
                  }
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Working hours */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="working-hours"
            className="text-sm font-medium"
          >
            Working hours
          </label>

          <input
            id="working-hours"
            type="text"
            value={hours}
            onChange={(event) =>
              setHours(event.target.value)
            }
            placeholder="09:00 - 17:00"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />

          <p className="text-xs text-muted-foreground">
            Example: 09:00 - 17:00
          </p>
        </div>

        {/* Selected summary */}
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Current availability
          </p>

          <p className="mt-1 text-sm">
            {days.length > 0
              ? days.join(", ")
              : "No working days selected"}
          </p>

          {hours && (
            <p className="mt-1 text-sm text-muted-foreground">
              {hours}
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={isPending}
          onClick={handleSubmit}
          className="self-start rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : "Save Availability"}
        </button>
      </div>
    </section>
  )
}