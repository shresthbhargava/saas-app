# Middleware.ts Fix Plan

## Problem Analysis

The current `middleware.ts` file has TypeScript errors because:

1. **Current Code**: `clerkMiddleware()` is called without parameters
2. **Error**: The user was trying to use `publicRoutes` option which doesn't exist in Clerk v6
3. **Version**: Using `@clerk/nextjs": "^6.28.1"` which has a different API than older versions

## Root Cause

In Clerk v6, the middleware API changed:
- `publicRoutes` option was removed
- Now uses `createRouteMatcher` function to define public routes
- Requires a different syntax for route protection

## Solution

### Current App Routes Analysis
Based on the app structure:
- `/` - Home page (should be public)
- `/sign-in` - Sign-in page (should be public)
- `/companions/*` - Protected routes
- `/My-Journey` - Protected route
- `/Subscription` - Protected route
- `/api/*` - API routes (need protection)

### Fixed Code

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```

## Key Changes Explained

1. **Import Addition**: Added `createRouteMatcher` from `@clerk/nextjs/server`
2. **Route Matcher**: Created `isPublicRoute` using `createRouteMatcher` with public routes array
3. **Middleware Function**: Changed from `clerkMiddleware()` to `clerkMiddleware((auth, req) => {...})`
4. **Protection Logic**: Added conditional protection - only protect routes that are NOT public
5. **Public Routes**: Defined `/` and `/sign-in(.*)` as public routes

## Benefits

- ✅ Fixes all TypeScript errors
- ✅ Properly protects authenticated routes
- ✅ Allows public access to home and sign-in pages
- ✅ Uses correct Clerk v6 API
- ✅ Maintains existing matcher configuration

## Next Steps

1. Apply the fix to `middleware.ts`
2. Test that TypeScript errors are resolved
3. Verify authentication flow works correctly