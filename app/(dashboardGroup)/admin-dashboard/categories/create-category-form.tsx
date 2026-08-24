"use client"

import { useActionState } from "react"
import { createCategoryAction, CreateCategoryState } from "@/app/(dashboardGroup)/_actions/createCategoryAction"

const initialState: CreateCategoryState = { success: false, message: "" }

export function CreateCategoryForm() {
  const [state, formAction, isPending] = useActionState(createCategoryAction, initialState)

  return (
    <form action={formAction} className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">New Category</h2>

      {state.message && (
        <div
          className={`mt-4 rounded-lg border p-3 text-sm ${
            state.success
              ? "border-border text-muted-foreground"
              : "border-destructive/30 text-destructive"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Plumbing"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description (optional)
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Short description"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  )
}