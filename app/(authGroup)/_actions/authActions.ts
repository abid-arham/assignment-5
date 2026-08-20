"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { ILoginState, IUser } from "@/lib/types";
import { logout } from "@/service/logout";

type AuthData = {
  accessToken: string;
  refreshToken: string;
  user?: IUser;  // ponytail: backend doesn't return user on login
};

const dashboardPath = (role?: string) =>
  ({ CUSTOMER: "/dashboard", ADMIN: "/admin-dashboard", TECHNICIAN: "/technician-dashboard" }[role || ""] || "/");

/** Both login and register end the same way: tokens into httpOnly cookies. */
const setAuthCookies = async ({ accessToken, refreshToken }: AuthData) => {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });
};

export const loginAction = async (
  prevState: ILoginState,
  formData: FormData
): Promise<ILoginState> => {

  const result = await api<AuthData>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  // Wrong credentials -> hand the backend's message back to the form
  if (!result.ok) {
    return { success: false, message: result.message };
  }

  await setAuthCookies(result.data);

  redirect(dashboardPath(result.data.user?.role));
};

export const registerAction = async (
  prevState: ILoginState,
  formData: FormData
): Promise<ILoginState> => {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role") as string;

  const result = await api<{ user: IUser }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      email,
      password,
      role,
    }),
  });

  // Email already taken, weak password, etc.
  if (!result.ok) {
    return { success: false, message: result.message };
  }

  // Register doesn't return tokens, so sign them straight in afterwards
  // rather than making them retype what they just typed.
  const login = await api<AuthData>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!login.ok) {
    return { success: false, message: "Account created. Please sign in." };
  }

  await setAuthCookies(login.data);

  redirect(dashboardPath(role));
};

export const logoutAction = async () => {
  await logout();
  redirect("/login");
};