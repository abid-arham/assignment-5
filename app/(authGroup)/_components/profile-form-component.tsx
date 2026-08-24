"use client"

import { useState, useTransition } from "react"
import { updateProfileAction } from "../_actions/updateProfileAction"
import { changePasswordAction } from "../_actions/changePasswordAction"

export function ProfileForms({
  currentName,
}: {
  currentName: string
}) {
  const [isPending, startTransition] =
    useTransition()

  const [name, setName] = useState(currentName)

  const [nameMessage, setNameMessage] =
    useState<{
      text: string
      isError: boolean
    } | null>(null)

  const [currentPassword, setCurrentPassword] =
    useState("")

  const [newPassword, setNewPassword] =
    useState("")

  const [passwordMessage, setPasswordMessage] =
    useState<{
      text: string
      isError: boolean
    } | null>(null)

  const handleNameSubmit = () => {
    setNameMessage(null)

    if (!name.trim()) {
      setNameMessage({
        text: "Name cannot be empty.",
        isError: true,
      })
      return
    }

    startTransition(async () => {
      const result =
        await updateProfileAction(
          name.trim()
        )

      setNameMessage({
        text: result.message,
        isError: !result.success,
      })
    })
  }

  const handlePasswordSubmit = () => {
    setPasswordMessage(null)

    if (newPassword.length < 6) {
      setPasswordMessage({
        text:
          "New password must be at least 6 characters.",
        isError: true,
      })
      return
    }

    startTransition(async () => {
      const result =
        await changePasswordAction(
          currentPassword,
          newPassword
        )

      setPasswordMessage({
        text: result.message,
        isError: !result.success,
      })

      if (result.success) {
        setCurrentPassword("")
        setNewPassword("")
      }
    })
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Profile */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-foreground">
          Profile
        </h2>

        {nameMessage && (
          <p
            className={`text-sm ${
              nameMessage.isError
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {nameMessage.text}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <button
          type="button"
          disabled={isPending}
          onClick={handleNameSubmit}
          className="self-start rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : "Save name"}
        </button>
      </section>

      {/* Password */}
      <section className="flex flex-col gap-3 border-t border-border pt-8">
        <h2 className="text-lg font-semibold text-foreground">
          Change password
        </h2>

        {passwordMessage && (
          <p
            className={`text-sm ${
              passwordMessage.isError
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {passwordMessage.text}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="currentPassword"
            className="text-sm font-medium text-foreground"
          >
            Current password
          </label>

          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-foreground"
          >
            New password
          </label>

          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>

        <button
          type="button"
          disabled={
            isPending ||
            !currentPassword ||
            !newPassword
          }
          onClick={handlePasswordSubmit}
          className="self-start rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isPending
            ? "Updating..."
            : "Change password"}
        </button>
      </section>
    </div>
  )
}