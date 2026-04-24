import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// IMPORT NOTE: DO NOT RENAME THIS FILE TO `middleware.ts` OR MOVE IT TO THE `app` DIRECTORY.
// Starting with Next.js 16, Middleware is now called Proxy to better reflect its purpose. The functionality remains the same.

// This file must be named `proxy.ts` and be located in the `src` directory to work properly with Next.js and Clerk.
// The `proxy.ts` file serves as a middleware proxy to apply authentication checks on protected routes without affecting the entire application.

// For more details, see:
// https://clerk.com/docs/nextjs/middleware-proxy
// https://nextjs.org/docs/app/getting-started/proxy

const isProtectedRoute = createRouteMatcher(['/studio/render(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
