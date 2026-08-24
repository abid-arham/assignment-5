import Link from "next/link"

import { getMe } from "@/service/getMe"
import { getTechnicians } from "@/service/getTechnicians"

import { TechnicianProfileForm } from "../../_components/technician-profile-form"
import { TechnicianAvailabilityForm } from "../../_components/technician-availability-form"

export default async function TechnicianProfilePage() {
  const [me, technicians] = await Promise.all([
    getMe(),
    getTechnicians(),
  ])

  const technician = technicians.find(
    (item) => item.userId === me?.id
  )

  if (!technician) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="rounded-2xl border border-destructive/30 bg-card p-8 text-center">
          <h1 className="text-xl font-semibold">
            Technician profile not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            We could not find the technician profile
            associated with your account.
          </p>

          <Link
            href="/technician-dashboard"
            className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    )
  }

  const availability = technician.availability

  const initialDays = Array.isArray(
    availability?.days
  )
    ? availability.days
    : []

  const initialHours =
    typeof availability?.hours === "string"
      ? availability.hours
      : ""

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <div>
        <Link
          href="/technician-dashboard"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to dashboard
        </Link>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Manage Profile
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your professional information and
          availability.
        </p>
      </div>

      <TechnicianProfileForm
        initialSkills={technician.skills ?? []}
        initialExperience={
          Number(technician.experience) || 0
        }
        initialHourlyRate={
          Number(technician.hourlyRate) || 0
        }
        initialLocation={
          technician.location ?? ""
        }
      />

      <TechnicianAvailabilityForm
        initialDays={initialDays}
        initialHours={initialHours}
      />
    </main>
  )
}