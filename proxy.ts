import { NextRequest, NextResponse } from "next/server"
import jwt, { JwtPayload } from "jsonwebtoken"

const AUTH_ROUTES = ["/auth/login", "/auth/register"]

const PUBLIC_EXACT_ROUTES = [
  "/",
  "/services",
]

const PUBLIC_PREFIX_ROUTES = [
  "/technicians",
]

const PROTECTED_ROUTES = {
  CUSTOMER: ["/dashboard"],
  TECHNICIAN: ["/technician-dashboard"],
  ADMIN: ["/admin-dashboard"],
}

function isExactRoute(pathname: string, route: string) {
  return pathname === route
}

function isRouteOrChild(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`)
}

function isPublicRoute(pathname: string) {
  if (
    PUBLIC_EXACT_ROUTES.some((route) =>
      isExactRoute(pathname, route)
    )
  ) {
    return true
  }

  return PUBLIC_PREFIX_ROUTES.some((route) =>
    isRouteOrChild(pathname, route)
  )
}

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) =>
    isRouteOrChild(pathname, route)
  )
}

function getUserRole(token?: string) {
  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as JwtPayload

    return typeof decoded.role === "string"
      ? decoded.role
      : null
  } catch {
    return null
  }
}

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/auth/login", request.url)
  )

  response.cookies.delete("accessToken")
  response.cookies.delete("refreshToken")

  return response
}

function redirectHome(request: NextRequest) {
  return NextResponse.redirect(
    new URL("/", request.url)
  )
}

function redirectByRole(
  request: NextRequest,
  role: string | null
) {
  switch (role) {
    case "CUSTOMER":
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      )

    case "TECHNICIAN":
      return NextResponse.redirect(
        new URL("/technician-dashboard", request.url)
      )

    case "ADMIN":
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      )

    default:
      return redirectHome(request)
  }
}

function hasRoleAccess(
  pathname: string,
  role: string | null
) {
  if (!role) {
    return false
  }

  const allowedRoutes =
    PROTECTED_ROUTES[
      role as keyof typeof PROTECTED_ROUTES
    ]

  if (!allowedRoutes) {
    return false
  }

  return allowedRoutes.some((route) =>
    isRouteOrChild(pathname, route)
  )
}

export default function proxy(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname

  const accessToken =
    request.cookies.get("accessToken")?.value

  const refreshToken =
    request.cookies.get("refreshToken")?.value

  const userRole = getUserRole(accessToken)

  /*
   * Public pages can be accessed without authentication.
   */
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  /*
   * If the user is already authenticated and tries
   * to visit login/register, send them to their dashboard.
   */
  if (isAuthRoute(pathname) && userRole) {
    return redirectByRole(request, userRole)
  }

  /*
   * Auth pages remain accessible when there is no
   * valid access token.
   */
  if (isAuthRoute(pathname)) {
    return NextResponse.next()
  }

  /*
   * Everything else requires authentication.
   */
  if (!accessToken || !userRole) {
    /*
     * We have a refresh token, but refreshing the token
     * requires a server-side refresh implementation.
     *
     * For now, don't pretend an expired access token
     * is valid. Send the user back to login and clear
     * stale credentials.
     */
    if (refreshToken) {
      return redirectToLogin(request)
    }

    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    )
  }

  /*
   * Role-based route protection.
   */
  if (!hasRoleAccess(pathname, userRole)) {
    return redirectHome(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)",
  ],
}