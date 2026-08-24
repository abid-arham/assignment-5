"use client"

import { useState, useTransition } from "react"
import { updateTechnicianProfileAction } from "../_actions/updateTechnicianProfileAction"



interface TechnicianProfileFormProps {
  initialSkills: string[]
  initialExperience: number
  initialHourlyRate: number
  initialLocation: string
}

export function TechnicianProfileForm({
  initialSkills,
  initialExperience,
  initialHourlyRate,
  initialLocation,
}: TechnicianProfileFormProps) {
  const [isPending, startTransition] =
    useTransition()

  const [skills, setSkills] =
    useState<string[]>(initialSkills)

  const [skillInput, setSkillInput] =
    useState("")

  const [experience, setExperience] =
    useState(String(initialExperience))

  const [hourlyRate, setHourlyRate] =
    useState(String(initialHourlyRate))

  const [location, setLocation] =
    useState(initialLocation)

  const [message, setMessage] =
    useState<{
      text: string
      isError: boolean
    } | null>(null)

  const addSkill = () => {
    const skill = skillInput.trim()

    if (!skill) {
      return
    }

    const alreadyExists = skills.some(
      (existingSkill) =>
        existingSkill.toLowerCase() ===
        skill.toLowerCase()
    )

    if (alreadyExists) {
      setSkillInput("")
      return
    }

    setSkills([...skills, skill])
    setSkillInput("")
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(
      skills.filter(
        (skill) => skill !== skillToRemove
      )
    )
  }

  const handleSkillKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      addSkill()
    }
  }

  const handleSubmit = () => {
    setMessage(null)

    const parsedExperience =
      Number(experience)

    const parsedHourlyRate =
      Number(hourlyRate)

    if (
      !Number.isFinite(parsedExperience) ||
      parsedExperience < 0
    ) {
      setMessage({
        text: "Experience must be a valid number.",
        isError: true,
      })
      return
    }

    if (
      !Number.isFinite(parsedHourlyRate) ||
      parsedHourlyRate < 0
    ) {
      setMessage({
        text: "Hourly rate must be a valid number.",
        isError: true,
      })
      return
    }

    if (!location.trim()) {
      setMessage({
        text: "Location cannot be empty.",
        isError: true,
      })
      return
    }

    startTransition(async () => {
      const result =
        await updateTechnicianProfileAction({
          skills,
          experience: parsedExperience,
          hourlyRate: parsedHourlyRate,
          location: location.trim(),
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
          Professional Profile
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update the information customers see
          about your professional services.
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
        {/* Skills */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="skill"
            className="text-sm font-medium"
          >
            Skills
          </label>

          <div className="flex gap-2">
            <input
              id="skill"
              type="text"
              value={skillInput}
              onChange={(event) =>
                setSkillInput(event.target.value)
              }
              onKeyDown={handleSkillKeyDown}
              placeholder="e.g. Plumbing"
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            <button
              type="button"
              onClick={addSkill}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Add
            </button>
          </div>

          {skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm"
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(skill)
                    }
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Type a skill and press Enter or click
            Add.
          </p>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="experience"
            className="text-sm font-medium"
          >
            Experience
          </label>

          <div className="flex items-center gap-2">
            <input
              id="experience"
              type="number"
              min="0"
              value={experience}
              onChange={(event) =>
                setExperience(event.target.value)
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            <span className="text-sm text-muted-foreground">
              years
            </span>
          </div>
        </div>

        {/* Hourly rate */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="hourlyRate"
            className="text-sm font-medium"
          >
            Hourly Rate
          </label>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              $
            </span>

            <input
              id="hourlyRate"
              type="number"
              min="0"
              value={hourlyRate}
              onChange={(event) =>
                setHourlyRate(event.target.value)
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="location"
            className="text-sm font-medium"
          >
            Location
          </label>

          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            placeholder="e.g. Dhaka"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          disabled={isPending}
          onClick={handleSubmit}
          className="self-start rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : "Save Profile"}
        </button>
      </div>
    </section>
  )
}