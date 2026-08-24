"use server"

import { cookies } from "next/headers"

export const logout = async (): Promise<void> => {
  const cookieStore = await cookies()

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
}