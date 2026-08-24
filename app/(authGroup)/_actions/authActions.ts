"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { api } from "@/lib/api"
import { ILoginState, IUser } from "@/lib/types"
import { logout } from "@/service/logout"
import { loginSchema, registerSchema } from "@/lib/validations"

type AuthData = {
  accessToken: string
  refreshToken: string
}

const dashboardPath = (role?: string) => {
  switch (role) {
    case "CUSTOMER":
      return "/dashboard"
    case "TECHNICIAN":
      return "/technician-dashboard"
    case "ADMIN":
      return "/admin-dashboard"
    default:
      return "/"
  }
}

const setAuthCookies = async ({ accessToken, refreshToken }: AuthData) => {
  const cookieStore = await cookies()

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  })

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
}

export const loginAction = async (
  prevState: ILoginState,
  formData: FormData
): Promise<ILoginState> => {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  })

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid input." }
  }

  const { email, password } = parsed.data

  const result = await api<AuthData>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  await setAuthCookies(result.data)

  const userResult = await api<IUser>("/api/auth/me", {
    method: "GET",
    auth: true,
  })

  if (!userResult.ok) {
    return {
      success: false,
      message: "Login succeeded, but user information could not be retrieved.",
    }
  }

  redirect(dashboardPath(userResult.data.role))
}

export const registerAction = async (
  prevState: ILoginState,
  formData: FormData
): Promise<ILoginState> => {
  const parsed = registerSchema.safeParse({
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    role: String(formData.get("role") ?? ""),
  })

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid input." }
  }

  const { name, email, password, role } = parsed.data

  const registerResult = await api<IUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  })

  if (!registerResult.ok) {
    return { success: false, message: registerResult.message }
  }

  const loginResult = await api<AuthData>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

  if (!loginResult.ok) {
    return { success: false, message: "Account created successfully. Please log in." }
  }

  await setAuthCookies(loginResult.data)

  redirect(dashboardPath(role))
}

export const logoutAction = async () => {
  await logout()
  redirect("/login")
}