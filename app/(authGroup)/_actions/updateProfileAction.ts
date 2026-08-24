"use server"

import { api } from "@/lib/api"
import { IUser } from "@/lib/types"
import { updateProfileSchema } from "@/lib/validations"

export type UpdateProfileState = {
  success: boolean
  message: string
}

export const updateProfileAction = async (name: string): Promise<UpdateProfileState> => {
  const parsed = updateProfileSchema.safeParse({ name: name.trim() })

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid input." }
  }

  const result = await api<IUser>("/api/auth/me", {
    method: "PATCH",
    body: JSON.stringify(parsed.data),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Profile updated." }
}