"use server"

import { api } from "@/lib/api"
import { IUser } from "@/lib/types"

export type UpdateProfileState = {
  success: boolean
  message: string
}

export const updateProfileAction = async (name: string): Promise<UpdateProfileState> => {
  const trimmedName = name.trim()
  if (!trimmedName) {
    return { success: false, message: "Name cannot be empty." }
  }

  const result = await api<IUser>("/api/auth/me", {
    method: "PATCH",
    body: JSON.stringify({ name: trimmedName }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Profile updated." }
}