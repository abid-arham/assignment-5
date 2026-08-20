import "server-only";
import { cookies } from "next/headers";

/**
 * Every response from our backend looks like this:
 *   success -> { message, data: { ... } }
 *   failure -> { success: false, message, errorDetails }
 */
type ApiEnvelope<T> = {
  message?: string;
  data?: T;
};

/** Either the data we asked for, or the reason we didn't get it. */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; message: string };

type ApiOptions = RequestInit & {
  /** Attach the logged-in user's access token as a Bearer header */
  auth?: boolean;
};

/**
 * One place where every backend call goes through, so each service file
 * stays a two-liner and nothing re-implements URL building or error handling.
 */
export async function api<T>(path: string, options: ApiOptions = {}): Promise<ApiResult<T>> {
  const { auth, headers, ...init } = options;

  const authHeader: HeadersInit = {};
  if (auth) {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) return { ok: false, message: "Not logged in" };

    // The backend's auth middleware reads `req.headers.authorization`.
    // If yours reads a cookie instead, send `Cookie: accessToken=${accessToken}` here.
    authHeader.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...authHeader, ...headers },
    });

    const body: ApiEnvelope<T> = await res.json();

    if (!res.ok || body.data === undefined) {
      return { ok: false, message: body.message || "Something went wrong" };
    }

    return { ok: true, data: body.data };
  } catch {
    // Network error / invalid JSON - the API is unreachable, not just unhappy
    return { ok: false, message: "Could not reach the server" };
  }
}