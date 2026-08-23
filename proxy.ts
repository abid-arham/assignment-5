import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import jwt, { JwtPayload } from "jsonwebtoken"
import { getNewAccessToken } from "./utils/refreshToken"

const AUTH_ROUTE = ["/login", "/register"]
const PUBLIC_ROUTES = ["/services", "/", "/login", "/register", "/technicians"]

// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {

    const cookieStore = await cookies()
    const pathname = request.nextUrl.pathname
    
    let accessToken = request.cookies.get("accessToken")?.value
    const refreshToken = request.cookies.get("refreshToken")?.value

    // Verify access token, refresh if expired but refresh token valid
    let decoded: JwtPayload | null = null
    try {
        decoded = accessToken ? jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as JwtPayload : null
    } catch {
        // Access token invalid/expired, try refresh
        if (refreshToken) {
            try {
                jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)
                const result = await getNewAccessToken()
                if (result.success && result.data.accessToken) {
                    const newToken = result.data.accessToken
                    cookieStore.set("accessToken", newToken)
                    decoded = jwt.verify(newToken, process.env.JWT_ACCESS_SECRET!) as JwtPayload
                    accessToken = newToken
                }
            } catch {
                // Refresh token also invalid, clear everything
                cookieStore.delete("accessToken")
                cookieStore.delete("refreshToken")
            }
        }
    }

    const userRole = decoded?.role as string | null

    if(accessToken && AUTH_ROUTE.includes(pathname)){
        if(userRole === "CUSTOMER"){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        if(userRole === "ADMIN"){
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
        if(userRole === "TECHNICIAN"){
            return NextResponse.redirect(new URL('/technician-dashboard', request.url))
        }
        return NextResponse.redirect(new URL('/', request.url))
    }


    const isPublic = PUBLIC_ROUTES.some((route)=> pathname === route || pathname.startsWith(route+"/"));
    const isAuthRoute = AUTH_ROUTE.some((route)=> pathname === route || pathname.startsWith(route+"/"));
    // trying to access protected route. Woah, stop right there! can't let you in!
    if(!accessToken && !isPublic && !isAuthRoute){

        return NextResponse.redirect(new URL("/login", request.url))

    }

    if(pathname.startsWith("/dashboard") && userRole !== "CUSTOMER"){
        return NextResponse.redirect(new URL("/", request.url))
    }
    if(pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN"){
        return NextResponse.redirect(new URL("/", request.url))
    }
    if(pathname.startsWith("/technician-dashboard") && userRole !== "TECHNICIAN"){
        return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
  
}
 
 
export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/admin-dashboard/:path*',
    // '/technician-dashboard/:path*',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'

  ],
}