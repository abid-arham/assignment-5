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
  const result = await api("/api/auth/me/password", {
    method: "PATCH",
    body: JSON.stringify({ currentPassword, newPassword }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Password changed." }
}