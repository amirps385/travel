<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-6">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-6">
      <h2 class="text-2xl font-semibold text-slate-900 mb-1">Create admin account</h2>
      <p class="text-sm text-slate-500 mb-4">Register an admin user.</p>

      <form @submit.prevent="onSubmit" class="space-y-4" novalidate>
        <div>
          <label class="text-xs font-medium text-slate-600 block mb-1">Full name</label>
          <input
            v-model="name"
            type="text"
            required
            autocomplete="name"
            class="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label class="text-xs font-medium text-slate-600 block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="you@company.test"
          />
        </div>

        <div>
          <label class="text-xs font-medium text-slate-600 block mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="new-password"
            class="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label class="text-xs font-medium text-slate-600 block mb-1">Confirm password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            autocomplete="new-password"
            class="mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            placeholder="Repeat password"
          />
        </div>

        <!-- Avatar upload -->
        <div>
          <label class="text-xs font-medium text-slate-600 block mb-1">Avatar (optional)</label>
          <div class="flex items-center gap-3">
            <div class="w-14 h-14 rounded-full overflow-hidden border bg-gray-50 flex items-center justify-center">
              <img v-if="avatarPreview" :src="avatarPreview" class="w-full h-full object-cover" />
              <div v-else class="text-xs text-slate-400">No image</div>
            </div>
            <div class="flex-1">
              <input type="file" accept="image/*" @change="onAvatarSelected" ref="avatarInput" />
              <p class="text-[11px] text-slate-400 mt-1">Square avatar recommended (max 2MB).</p>
              <div v-if="avatarError" class="text-xs text-rose-600 mt-1">{{ avatarError }}</div>
            </div>
          </div>
        </div>

        <div>
          <button
            :disabled="loading"
            type="submit"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium disabled:opacity-60"
          >
            <span v-if="loading">Creating…</span>
            <span v-else>Create account</span>
          </button>
        </div>

        <!-- messages -->
        <div v-if="msg" :class="msgType === 'error' ? 'text-rose-600 text-sm' : 'text-emerald-600 text-sm'">
          {{ msg }}
        </div>

        <!-- success quick card -->
        <div v-if="createdUser" class="mt-4 p-3 bg-slate-50 rounded-md text-sm border">
          <div>Account created for <strong>{{ createdUser.email }}</strong>.</div>
          <div class="mt-2 flex items-center gap-3">
            <button @click="goToSignin" class="text-sky-600 hover:underline text-sm">Go to sign in</button>
            <button @click="resetForm" class="text-slate-600 hover:underline text-sm">Create another</button>
          </div>
        </div>

        <div class="mt-2 text-xs text-slate-500">
          Already have an account?
          <button @click="goToSignin" class="text-sky-600 hover:underline ml-1">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from '#imports'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const avatarPreview = ref('') // data URL
const avatarData = ref('') // data URL to send
const avatarError = ref('')
const avatarInput = ref(null)

const loading = ref(false)
const msg = ref('')
const msgType = ref('')
const createdUser = ref(null)

const router = useRouter()

function validateEmail (em) {
  return typeof em === 'string' && /\S+@\S+\.\S+/.test(em)
}

function resetForm () {
  name.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  avatarPreview.value = ''
  avatarData.value = ''
  avatarError.value = ''
  msg.value = ''
  msgType.value = ''
  createdUser.value = null
  if (avatarInput.value) avatarInput.value.value = ''
}

function goToSignin () {
  // attempt logout to clear any cookie then navigate
  $fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
  router.push('/admin')
}

async function onAvatarSelected (e) {
  avatarError.value = ''
  const file = e.target.files?.[0]
  if (!file) {
    avatarPreview.value = ''
    avatarData.value = ''
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    avatarError.value = 'Avatar must be smaller than 2MB.'
    if (avatarInput.value) avatarInput.value.value = ''
    return
  }

  if (!file.type.startsWith('image/')) {
    avatarError.value = 'Please select an image file.'
    if (avatarInput.value) avatarInput.value.value = ''
    return
  }

  try {
    const reader = new FileReader()
    reader.onload = () => {
      avatarPreview.value = String(reader.result || '')
      avatarData.value = String(reader.result || '')
    }
    reader.onerror = () => {
      avatarError.value = 'Failed to read image file.'
    }
    reader.readAsDataURL(file)
  } catch (err) {
    console.error('avatar read error', err)
    avatarError.value = 'Failed to process image.'
  }
}

async function onSubmit () {
  msg.value = ''
  msgType.value = ''
  createdUser.value = null

  if (!name.value.trim() || !email.value.trim() || !password.value) {
    msg.value = 'Please fill all required fields.'
    msgType.value = 'error'
    return
  }
  if (!validateEmail(email.value.trim())) {
    msg.value = 'Please enter a valid email address.'
    msgType.value = 'error'
    return
  }
  if (password.value.length < 6) {
    msg.value = 'Password must be at least 6 characters.'
    msgType.value = 'error'
    return
  }
  if (password.value !== confirmPassword.value) {
    msg.value = 'Passwords do not match.'
    msgType.value = 'error'
    return
  }

  loading.value = true
  try {
    const payload = {
      name: name.value.trim(),
      email: email.value.trim().toLowerCase(),
      password: password.value
    }
    if (avatarData.value) payload.avatar = avatarData.value

    const res = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: payload
    })

    if (res && res.user) {
      msg.value = 'Account created successfully. Please sign in.'
      msgType.value = 'success'
      createdUser.value = res.user
      password.value = ''
      confirmPassword.value = ''
    } else {
      if (res && res.createdFull && res.createdFull.email) {
        createdUser.value = { email: res.createdFull.email, name: res.createdFull.name, id: res.createdFull._id }
        msg.value = 'Account created successfully. Please sign in.'
        msgType.value = 'success'
        password.value = ''
        confirmPassword.value = ''
      } else {
        msg.value = 'Unexpected response from server.'
        msgType.value = 'error'
      }
    }
  } catch (err) {
    console.error('Signup failed', err)
    msg.value =
      (err && err.data && (err.data.statusMessage || err.data.message)) ||
      (err && err.message) ||
      'Signup failed'
    msgType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* keep style minimal */
</style>
