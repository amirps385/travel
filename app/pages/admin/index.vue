<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-6">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-6">
      <h2 class="text-2xl font-semibold text-slate-900 mb-1">Admin sign in</h2>
      <p class="text-sm text-slate-500 mb-4">Sign in with your admin account</p>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="text-xs font-medium text-slate-600">Email</label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="username"
            class="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="you@company.test"
          />
        </div>

        <div>
          <label class="text-xs font-medium text-slate-600">Password</label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center justify-between text-xs text-slate-500">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="remember" class="w-4 h-4" />
            Remember me
          </label>
          <NuxtLink to="/admin/signup" class="text-sky-600 hover:underline">Create account</NuxtLink>
        </div>

        <div>
          <button
            :disabled="loading"
            type="submit"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium disabled:opacity-60"
          >
            <span v-if="loading">Signing in…</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <div v-if="error" class="text-sm text-rose-600 mt-1">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from '#imports'

const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const error = ref('')

const router = useRouter()

// useAuth composable (assumes you have one at app/composables/useAuth.js or .ts)
let auth
try {
  auth = useAuth()
} catch (e) {
  auth = null
}

async function onSubmit () {
  error.value = ''
  loading.value = true

  try {
    const payload = { email: email.value.trim(), password: password.value, remember: !!remember.value }
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload
    })

    // If backend returns a token, persist it in cookie for subsequent requests.
    // Many backends will also set the cookie server-side. This is just a fallback.
    if (res && res.token) {
      const cookie = useCookie('auth_token')
      cookie.value = res.token
    }

    // If the backend returns user object, update client state
    if (auth && typeof auth.fetchMe === 'function') {
      await auth.fetchMe()
    }

    // redirect to admin dashboard (should show role-specific layout)
    // use navigateTo or router.push
    await router.push('/admin/dashboard')
  } catch (err) {
    console.error('Login failed', err)
    // Try to extract friendly message
    error.value = (err && err.data && err.data.statusMessage) ||
                  (err && err.data && err.data.message) ||
                  (err && err.message) ||
                  'Login failed. Check credentials or server.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* small responsive tweak */
@media (max-width: 640px) {
  .max-w-md { width: 100%; padding: 1.25rem; }
}
</style>
