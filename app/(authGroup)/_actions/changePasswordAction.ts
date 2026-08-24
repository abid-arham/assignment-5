"use server"

import { api } from "@/lib/api"

export type ChangePasswordState = {
  success: boolean
  message: string
}

export const changePasswordAction = async (
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordState> => {
  if (!currentPassword || !newPassword) {
    return { success: false, message: "Current password and new password are required." }
  }

  if (newPassword.length < 6) {
    return { success: false, message: "New password must be at least 6 characters." }
  }

  const result = await api("/api/auth/me/password", {
    method: "PATCH",
    body: JSON.stringify({ currentPassword, newPassword }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Password changed successfully." }
}