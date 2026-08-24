"use server"

import { api } from "@/lib/api"
import { changePasswordSchema } from "@/lib/validations"

export type ChangePasswordState = {
  success: boolean
  message: string
}

export const changePasswordAction = async (
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordState> => {
  const parsed = changePasswordSchema.safeParse({ currentPassword, newPassword })

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid input." }
  }

  const result = await api("/api/auth/me/password", {
    method: "PATCH",
    body: JSON.stringify(parsed.data),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Password changed successfully." }
}