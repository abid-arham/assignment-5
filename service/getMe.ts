import { api } from "@/lib/api"
import { IUser } from "@/lib/types"
import { cookies } from "next/headers"

export const getMe = async (): Promise<IUser | null> => {
  const result = await api<IUser>("/api/auth/me", { cache: "no-store", auth: true })
  return result.ok ? result.data : null
}