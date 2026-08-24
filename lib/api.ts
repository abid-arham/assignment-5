import { cookies } from "next/headers"

const BACKEND_API_URL = process.env.BACKEND_API_URL

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not defined")
}

type ApiEnvelope<T> = {
  message?: string;
  data?: T;
};

export type ApiResult<T> = { ok: true; data: T } | { ok: false; message: string };

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function api<T>(path: string, options: ApiOptions = {}): Promise<ApiResult<T>> {
  const { auth, headers, ...init } = options;

  const authHeader: HeadersInit = {};
  if (auth) {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) return { ok: false, message: "Not logged in" };
    authHeader.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const res = await fetch(`${BACKEND_API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...authHeader, ...headers },
    });

    const body: ApiEnvelope<T> = await res.json();

    if (!res.ok || body.data === undefined) {
      return { ok: false, message: body.message || "Something went wrong" };
    }

    return { ok: true, data: body.data };
  } catch {
    return { ok: false, message: "Could not reach the server" };
  }
}