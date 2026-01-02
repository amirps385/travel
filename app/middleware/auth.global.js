// app/middleware/auth.global.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run for admin area
  if (!to.path.startsWith('/admin')) return

  // Public admin paths (login and signup pages)
  const publicAdminPaths = ['/admin', '/admin/signup']

  // Try to get auth composable (Nuxt auto-imports it if present)
  let auth
  try {
    auth = useAuth()
  } catch (e) {
    console.warn('useAuth() not available in middleware', e)
    return
  }

  // Fetch user state but don't allow fetchMe to cause navigation (composable does not navigate)
  await auth.fetchMe({ noThrow: true }).catch(() => {})

  const isLoggedIn = !!auth.user.value
  const isPublic = publicAdminPaths.includes(to.path)

  // If user is already logged in and hits the login page, redirect to dashboard
  if (to.path === '/admin' && isLoggedIn) {
    // avoid redirect loop (rare): don't redirect if we are already coming from same path
    if (from && from.path === '/admin') return
    return navigateTo('/admin/dashboard')
  }

  // If trying to visit protected admin area but not logged in
  if (!isPublic && !isLoggedIn) {
    // send to login page (but only if not already there)
    if (to.path !== '/admin') {
      return navigateTo('/admin')
    }
  }

  // Otherwise allow navigation
})
