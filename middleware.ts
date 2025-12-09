import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard and logs routes
        if (req.nextUrl.pathname.startsWith("/dashboard") || 
            req.nextUrl.pathname.startsWith("/logs")) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/logs/:path*"],
}

