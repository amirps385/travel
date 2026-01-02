// app/composables/useAuth.js
import { ref } from 'vue'

/**
 * Minimal auth composable (no navigation inside fetchMe).
 * - fetchMe(opts = { noRedirect: true/false }) only fetches /api/auth/me and sets user.
 * - It DOES NOT navigate. Middleware will handle redirects.
 */
export default function useAuth () {
  const user = ref(null)
  const loading = ref(false)

  /**
   * Fetch current user from server. Do NOT redirect here.
   * opts.noThrow: if true, swallow errors and return null
   */
  async function fetchMe (opts = {}) {
    loading.value = true
    try {
      const res = await $fetch('/api/auth/me', { method: 'GET' })
      // expected shape: { user: { id, name, email, role, ... } } or { user: null }
      if (res && res.user) {
        user.value = res.user
        return user.value
      } else {
        user.value = null
        return null
      }
    } catch (err) {
      // if the API returns 401/403 or server unreachable, clear user
      user.value = null
      if (opts && opts.noThrow) return null
      // rethrow so callers can handle it if they want
      throw err
    } finally {
      loading.value = false
    }
  }

  function setUser (u) {
    user.value = u
  }

  function clear () {
    user.value = null
  }

  async function logout () {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {
      // ignore errors on logout
      console.warn('logout error (ignored):', e)
    }
    clear()
    // clear localStorage just in case app used it
    try { localStorage.removeItem('auth_token') } catch (e) {}
  }

  return {
    user,
    loading,
    fetchMe,
    setUser,
    clear,
    logout
  }
}
