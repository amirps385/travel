<!-- app/layouts/dashboard.vue -->
<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex gap-6">
      <!-- SIDEBAR -->
      <aside
        class="hidden md:flex flex-col w-56 shrink-0 bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 py-6"
      >
        <div class="px-5 mb-6">
          <h2 class="text-lg font-semibold text-slate-900">Admin Panel</h2>
          <p class="text-xs text-slate-500 mt-1">{{ userRoleFormatted }}</p>
        </div>

        <nav class="flex-1 px-2 space-y-1 text-sm">
          <NuxtLink
            v-for="item in filteredNavItems"
            :key="item.to"
            :to="item.to"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition text-left"
            :class="isActive(item.to)
              ? 'bg-slate-900 text-slate-50 shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'"
          >
            <span
              class="inline-flex items-center justify-center w-7 h-7 rounded-lg"
              :class="isActive(item.to)
                ? 'bg-slate-800 text-slate-50'
                : 'bg-slate-100 text-slate-500'"
            >
              <span v-if="item.icon === 'dashboard'">📊</span>
              <span v-else-if="item.icon === 'leads'">👥</span>
              <span v-else-if="item.icon === 'tours'">🧭</span>
              <span v-else-if="item.icon === 'routes'">🗺️</span>
              <span v-else-if="item.icon === 'parks'">🏞️</span>
              <span v-else-if="item.icon === 'islands'">🏝️</span>
              <span v-else-if="item.icon === 'zanzibar'">🏝️</span>
              <span v-else-if="item.icon === 'animals'">🦁</span>
              <span v-else-if="item.icon === 'itineraries'">📄</span>
              <span v-else-if="item.icon === 'hotels'">🏨</span>
              <span v-else-if="item.icon === 'activities'">📍</span>
              <span v-else-if="item.icon === 'transfers'">🚐</span>
              <span v-else-if="item.icon === 'cities'">🌆</span>
              <span v-else-if="item.icon === 'users'">👤</span>
              <span v-else>•</span>
            </span>

            <span class="text-sm font-medium">{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- MAIN CONTENT -->
      <section class="flex-1">
        <!-- TOP HEADER -->
        <div
          class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-4 flex items-center justify-between mb-6"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-sky-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M4 21h16"
                />
              </svg>
            </div>

            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                {{ currentSectionLabel }}
              </p>
              <h1 class="text-xl md:text-2xl font-bold text-slate-900">
                {{ headerTitle }}
              </h1>
              <p class="text-xs md:text-sm text-slate-500">
                {{ headerSubtitle }}
              </p>
            </div>
          </div>

          <!-- RIGHT: Live/date + notifications + avatar menu -->
          <div class="hidden sm:flex items-center gap-3">
            <!-- Live + date -->
            <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
              <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 bg-slate-100">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                Live
              </span>
              <span class="hidden md:inline">{{ today }}</span>
            </div>

            <!-- Notification bell -->
            <div class="relative">
              <button @click="openNotifications" class="p-2 rounded-lg hover:bg-slate-100" title="Notifications">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
                </svg>
                <span v-if="me?.unreadNotificationCount" class="absolute -top-1 -right-1 text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-rose-600 text-white">
                  {{ me.unreadNotificationCount }}
                </span>
              </button>
            </div>

            <!-- User avatar button (keeps layout position) -->
            <div>
              <button ref="menuBtn" @click="toggleMenu" class="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-100" title="Account">
                <img v-if="me?.avatar"
                     :src="me.avatar"
                     class="w-8 h-8 rounded-full object-cover border"
                     alt="User avatar" />
                <div v-else class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
                  {{ initials }}
                </div>
                <svg class="w-3 h-3 text-slate-500" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M6 8l4 4 4-4"/></svg>
              </button>
            </div>

            <!-- Teleported dropdown (renders to body to avoid clipping/stacking issues) -->
            <teleport to="body">
              <div
                v-if="showMenu"
                ref="menuEl"
                :style="menuStyles"
                class="bg-white border rounded-lg shadow-lg z-9999 ring-1 ring-slate-200"
              >
                <div class="p-3 text-sm text-slate-700 border-b">
                  <div class="font-medium">{{ me?.name || 'Account' }}</div>
                  <div class="text-xs text-slate-400">{{ me?.email }}</div>
                  <div class="text-xs mt-1 px-2 py-1 rounded bg-slate-100 inline-block">
                    {{ userRoleFormatted }}
                  </div>
                </div>
                <button @click="goToProfile" class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50">Profile</button>
                <button @click="logout" class="w-full text-left px-3 py-2 text-sm hover:bg-rose-50 text-rose-600">Logout</button>
              </div>
            </teleport>
          </div>
        </div>

        <!-- PAGE CONTENT -->
        <slot />
      </section>
    </div>

    <!-- MOBILE HEADER -->
    <div class="md:hidden px-4 pb-4">
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 py-4 flex items-center justify-between"
      >
        <div>
          <p class="text-xs uppercase tracking-[0.18em] text-sky-500 font-semibold">
            Admin Panel
          </p>
          <p class="text-sm font-semibold text-slate-900 capitalize">
            {{ currentSectionLabel }}
          </p>
        </div>
        <div class="text-xs text-slate-500">
          {{ today }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()

/* -------------------------
   ALL NAV ITEMS (Full List)
   Added Dashboard for all roles
------------------------- */
const allNavItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard', roles: ['superadmin', 'admin', 'content-manager', 'lead-manager', 'itinerary-planner'] },
  { to: '/admin/dashboard/leads', label: 'Leads', icon: 'leads', roles: ['superadmin', 'admin', 'lead-manager', 'itinerary-planner'] },
  { to: '/admin/dashboard/tours', label: 'Tours', icon: 'tours', roles: ['superadmin', 'admin', 'content-manager'] },
  { to: '/admin/dashboard/routes', label: 'Routes', icon: 'routes', roles: ['superadmin', 'admin', 'content-manager'] },
  { to: '/admin/dashboard/parks', label: 'Parks', icon: 'parks', roles: ['superadmin', 'admin', 'content-manager'] },
  { to: '/admin/dashboard/islands', label: 'Islands', icon: 'islands', roles: ['superadmin', 'admin', 'content-manager'] },
  { to: '/admin/dashboard/zanzibar', label: 'Zanzibar', icon: 'zanzibar', roles: ['superadmin', 'admin', 'content-manager'] },
  { to: '/admin/dashboard/animals', label: 'Animals', icon: 'animals', roles: ['superadmin', 'admin', 'content-manager'] },
  { to: '/admin/dashboard/itineraries', label: 'Itineraries', icon: 'itineraries', roles: ['superadmin', 'admin', 'itinerary-planner'] },
  { to: '/admin/dashboard/hotels', label: 'Hotels', icon: 'hotels', roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'] },
  { to: '/admin/dashboard/activities', label: 'Activities', icon: 'activities', roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'] },
  { to: '/admin/dashboard/users', label: 'Users', icon: 'users', roles: ['superadmin', 'admin'] },
  { to: '/admin/dashboard/transfers', label: 'Transfers', icon: 'transfers', roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'] },
  { to: '/admin/dashboard/cities', label: 'Cities', icon: 'cities', roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'] }
]

/* -------------------------
   USER ROLE & FILTERED NAV ITEMS
------------------------- */
const { data: meData, refresh: refreshMe } = await useAsyncData(
  'admin-me',
  () => $fetch('/api/auth/me'),
  { server: false, immediate: true }
)

const me = computed(() => meData.value?.user || null)
const userRole = computed(() => me.value?.role || '')
const userRoleFormatted = computed(() => {
  const roleMap = {
    'superadmin': 'Super Admin',
    'admin': 'Admin',
    'content-manager': 'Content Manager',
    'lead-manager': 'Lead Manager',
    'itinerary-planner': 'Itinerary Planner'
  }
  return roleMap[userRole.value] || userRole.value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
})

// Filter nav items based on user role
const filteredNavItems = computed(() => {
  const role = userRole.value
  
  if (!role) return [] // Not logged in
  
  // Superadmin sees everything
  if (role === 'superadmin') return allNavItems
  
  // Admin sees everything (for now - we'll restrict Users section later)
  if (role === 'admin') return allNavItems
  
  // Other roles see filtered items
  return allNavItems.filter(item => {
    if (!item.roles) return false
    return item.roles.includes(role)
  })
})

/* -------------------------
   ACTIVE STATE
------------------------- */
const isActive = (to) => {
  if (!to) return false
  if (route.path === to) return true
  if (to === '/admin/dashboard' && route.path === '/admin') return true
  return to !== '/admin/dashboard' && route.path.startsWith(to)
}

/* -------------------------
   HEADER TITLE
------------------------- */
const headerTitle = computed(() => {
  if (route.path === '/admin' || route.path === '/admin/dashboard') return 'Dashboard Overview'
  if (route.path.startsWith('/admin/dashboard/leads')) return 'Leads Management'
  if (route.path.startsWith('/admin/dashboard/tours')) return 'Tours'
  if (route.path.startsWith('/admin/dashboard/routes')) return 'Kilimanjaro Routes'
  if (route.path.startsWith('/admin/dashboard/parks')) return 'National Parks'
  if (route.path.startsWith('/admin/dashboard/islands')) return 'Islands'
  if (route.path.startsWith('/admin/dashboard/zanzibar')) return 'Zanzibar Experiences'
  if (route.path.startsWith('/admin/dashboard/animals')) return 'Animals'
  if (route.path.startsWith('/admin/dashboard/itineraries')) return 'Itineraries'
  if (route.path.startsWith('/admin/dashboard/hotels')) return 'Hotels'
  if (route.path.startsWith('/admin/dashboard/activities')) return 'Activities'
  if (route.path.startsWith('/admin/dashboard/users')) return 'Users'
  if (route.path.startsWith('/admin/dashboard/transfers')) return 'Transfers'
  if (route.path.startsWith('/admin/dashboard/cities')) return 'Cities'
  return 'Dashboard'
})

/* -------------------------
   HEADER SUBTITLE
------------------------- */
const headerSubtitle = computed(() => {
  if (route.path === '/admin' || route.path === '/admin/dashboard')
    return 'Welcome to your admin dashboard'

  if (route.path.startsWith('/admin/dashboard/leads'))
    return 'Track and manage all travel enquiries.'

  if (route.path.startsWith('/admin/dashboard/tours'))
    return 'Manage safari packages, pricing and images.'

  if (route.path.startsWith('/admin/dashboard/routes'))
    return 'Create Kilimanjaro routes, itineraries, group climbs and SEO.'

  if (route.path.startsWith('/admin/dashboard/parks'))
    return 'Manage national parks, wildlife highlights and SEO.'

  if (route.path.startsWith('/admin/dashboard/islands'))
    return 'Manage island pages and content.'

  if (route.path.startsWith('/admin/dashboard/zanzibar'))
    return 'Manage Zanzibar experiences, itineraries, galleries and FAQs.'

  if (route.path.startsWith('/admin/dashboard/animals'))
    return 'Manage wildlife species and images.'

  if (route.path.startsWith('/admin/dashboard/itineraries'))
    return 'Review and edit itineraries.'

  if (route.path.startsWith('/admin/dashboard/hotels'))
    return 'Configure hotel partners.'

  if (route.path.startsWith('/admin/dashboard/activities'))
    return 'Manage available activities.'

  if (route.path.startsWith('/admin/dashboard/users'))
    return 'Manage admin users, roles and access.'

  if (route.path.startsWith('/admin/dashboard/transfers'))
    return 'Manage transport and transfers.'

  if (route.path.startsWith('/admin/dashboard/cities'))
    return 'Organise cities and regions.'

  return ''
})

/* -------------------------
   SECTION LABEL
------------------------- */
const currentSectionLabel = computed(() => {
  const item = filteredNavItems.value.find((i) => isActive(i.to))
  return item?.label || 'Dashboard'
})

/* -------------------------
   DATE
------------------------- */
const today = computed(() => {
  const d = new Date()
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

/* -------------------------
   AVATAR / NOTIFICATIONS
------------------------- */
const showMenu = ref(false)

const initials = computed(() => {
  if (!me.value?.name) return 'A'
  return me.value.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()
})

/* -------------------------
   DROPDOWN TELEPORT POSITIONING
------------------------- */
const menuBtn = ref(null)
const menuEl = ref(null)
const menuStyles = ref({ position: 'fixed', top: '0px', left: '0px', width: '192px', zIndex: 9999 })

async function updateMenuPosition() {
  await nextTick()
  const btn = menuBtn.value
  if (!btn) return
  const rect = btn.getBoundingClientRect()
  const dropdownWidth = 192 // px (w-48)
  // Align right edges; ensure not off-screen
  const leftCandidate = rect.right - dropdownWidth
  const left = Math.max(8, Math.min(leftCandidate, window.innerWidth - dropdownWidth - 8))
  const top = Math.min(window.innerHeight - 48, rect.bottom + 8)
  menuStyles.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    width: `${dropdownWidth}px`,
    zIndex: 9999
  }
}

function toggleMenu() {
  showMenu.value = !showMenu.value
  if (showMenu.value) updateMenuPosition()
}

function onDocClick(e) {
  const btn = menuBtn.value
  const el = menuEl.value
  if (!btn || !el) return
  if (btn.contains(e.target)) return
  if (el.contains(e.target)) return
  showMenu.value = false
}

function onResizeOrScroll() {
  if (showMenu.value) updateMenuPosition()
}

onMounted(() => {
  window.addEventListener('resize', onResizeOrScroll, { passive: true })
  window.addEventListener('scroll', onResizeOrScroll, { passive: true })
  document.addEventListener('click', onDocClick)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResizeOrScroll)
  window.removeEventListener('scroll', onResizeOrScroll)
  document.removeEventListener('click', onDocClick)
})

watch(showMenu, (val) => {
  if (val) updateMenuPosition()
})

function openNotifications() {
  // Placeholder: implement notifications panel or page later
  console.log('Open notifications — implement UI later')
}

async function logout() {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
  } catch (e) {
    console.warn('Logout error (ignored):', e)
  } finally {
    // clear client state then redirect to signin
    await refreshMe()
    router.push('/admin')
  }
}

function goToProfile() {
  // navigate to profile/settings page (implement later)
  router.push('/admin/dashboard')
}

/* -------------------------
   FIXED: Role-Based Access Control
------------------------- */
const currentPath = computed(() => route.path)

// Check if current user can access the current route
const canAccessCurrentRoute = computed(() => {
  if (!me.value || !userRole.value) return false
  
  const role = userRole.value
  if (role === 'superadmin') return true
  
  // Find the nav item for current path
  const currentItem = allNavItems.find(item => {
    if (item.to === '/admin/dashboard' && (currentPath.value === '/admin' || currentPath.value === '/admin/dashboard')) {
      return true
    }
    return currentPath.value.startsWith(item.to)
  })
  
  // If no matching nav item found, allow access (could be a sub-route)
  if (!currentItem) return true
  
  // Check if user's role is in the allowed roles for this item
  return currentItem.roles.includes(role)
})

// Watch route changes and redirect if not authorized
watch(currentPath, (newPath, oldPath) => {
  // Skip initial load or if user not loaded yet
  if (!me.value || newPath === oldPath) return
  
  if (!canAccessCurrentRoute.value) {
    // Find first accessible page for this user
    const firstAllowed = filteredNavItems.value[0]
    if (firstAllowed && firstAllowed.to !== newPath) {
      router.push(firstAllowed.to)
    }
  }
}, { immediate: true })

// Also check on component mount
onMounted(() => {
  if (me.value && !canAccessCurrentRoute.value) {
    const firstAllowed = filteredNavItems.value[0]
    if (firstAllowed && firstAllowed.to !== currentPath.value) {
      router.push(firstAllowed.to)
    }
  }
})
</script>

<style scoped>
/* small niceties */
.max-h-\[70vh\]::-webkit-scrollbar { width: 6px; }
.max-h-\[70vh\]::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
.max-h-\[70vh\]::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 3px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.z-\[9999\] { z-index: 9999; }
</style>