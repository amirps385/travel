<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex gap-6">
      <!-- SIDEBAR -->
      <aside
        class="hidden md:flex flex-col w-56 shrink-0 bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 py-6"
      >
        <div class="px-5 mb-6">
          <h2 class="text-lg font-semibold text-slate-900">Admin Panel</h2>
          <p class="text-xs text-slate-500 mt-1">Management</p>
        </div>

        <nav class="flex-1 px-2 space-y-1 text-sm">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition text-left"
            :class="isActive(item.to)
              ? 'bg-slate-900 text-slate-50 shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'"
          >
            <span
              class="inline-flex items-center justify-center w-7 h-7 rounded-lg"
              :class="isActive(item.to) ? 'bg-slate-800 text-slate-50' : 'bg-slate-100 text-slate-500'"
            >
              <span v-if="item.icon === 'dashboard'">📊</span>
              <span v-else-if="item.icon === 'leads'">👥</span>
              <span v-else-if="item.icon === 'tours'">🧭</span>
              <span v-else-if="item.icon === 'itineraries'">📄</span>
              <span v-else-if="item.icon === 'hotels'">🏨</span>
              <span v-else-if="item.icon === 'activities'">📍</span>
              <span v-else-if="item.icon === 'transfers'">🚐</span>
              <span v-else-if="item.icon === 'cities'">🌆</span>
              <span v-else-if="item.icon === 'animals'">🦁</span>
              <span v-else-if="item.icon === 'parks'">🏞️</span>

              <span v-else>•</span>
            </span>
            <span class="text-sm font-medium">{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- MAIN CONTENT -->
      <section class="flex-1">
        <!-- Top header -->
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

          <div class="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 bg-slate-100">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              Live
            </span>
            <span class="hidden md:inline">
              {{ today }}
            </span>
          </div>
        </div>

        <!-- here each dashboard page is rendered -->
        <slot />
      </section>
    </div>

    <!-- Mobile top bar (instead of sidebar) -->
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// --- admin nav (includes Animals) ---
const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/dashboard/leads', label: 'Leads', icon: 'leads' },
  { to: '/admin/dashboard/tours', label: 'Tours', icon: 'tours' },
   { to: '/admin/dashboard/parks', label: 'Parks', icon: 'parks' },
  { to: '/admin/dashboard/animals', label: 'Animals', icon: 'animals' },
  { to: '/admin/dashboard/itineraries', label: 'Itineraries', icon: 'itineraries' },
  { to: '/admin/dashboard/hotels', label: 'Hotels', icon: 'hotels' },
  { to: '/admin/dashboard/activities', label: 'Activities', icon: 'activities' },
  { to: '/admin/dashboard/transfers', label: 'Transfers', icon: 'transfers' },
  { to: '/admin/dashboard/cities', label: 'Cities', icon: 'cities' }
]

// isActive: treat '/admin' as active (if you want), and match children via startsWith
const isActive = (to) => {
  if (!to) return false
  // exact match
  if (route.path === to) return true
  // allow admin root to be considered active for dashboard
  if (to === '/admin/dashboard' && (route.path === '/admin' || route.path === '/admin/')) return true
  // children
  return to !== '/admin/dashboard' && route.path.startsWith(to)
}

// header title / subtitle logic for admin routes (uses /admin prefix)
// NOTE: checks for Tours & Animals are placed before the default to avoid fallback problems
const headerTitle = computed(() => {
  if (route.path === '/admin' || route.path === '/admin/dashboard') return 'Dashboard Overview'
  if (route.path.startsWith('/admin/dashboard/leads')) return 'Leads Management'
  if (route.path.startsWith('/admin/dashboard/tours')) return 'Tours'
  if (route.path.startsWith('/admin/dashboard/parks')) return 'National Parks'
  if (route.path.startsWith('/admin/dashboard/animals')) return 'Animals'
  if (route.path.startsWith('/admin/dashboard/itineraries')) return 'Itineraries'
  if (route.path.startsWith('/admin/dashboard/hotels')) return 'Hotels'
  if (route.path.startsWith('/admin/dashboard/activities')) return 'Activities'
  if (route.path.startsWith('/admin/dashboard/transfers')) return 'Transfers'
  if (route.path.startsWith('/admin/dashboard/cities')) return 'Cities'
  return 'Dashboard'
})


const headerSubtitle = computed(() => {
  if (route.path === '/admin' || route.path === '/admin/dashboard')
    return 'Welcome to your admin dashboard'

  if (route.path.startsWith('/admin/dashboard/leads'))
    return 'Track and manage all travel enquiries.'

  if (route.path.startsWith('/admin/dashboard/tours'))
    return 'Manage safari packages, pricing and images.'

  if (route.path.startsWith('/admin/dashboard/parks'))
    return 'Manage national parks, regions, wildlife highlights, and SEO.'

  if (route.path.startsWith('/admin/dashboard/animals'))
    return 'Manage wildlife species, images, and content.'

  if (route.path.startsWith('/admin/dashboard/itineraries'))
    return 'Review and edit created itineraries.'

  if (route.path.startsWith('/admin/dashboard/hotels'))
    return 'Configure hotel partners & pricing.'

  if (route.path.startsWith('/admin/dashboard/activities'))
    return 'Manage activities available for trips.'

  if (route.path.startsWith('/admin/dashboard/transfers'))
    return 'Set up transfers and local transport.'

  if (route.path.startsWith('/admin/dashboard/cities'))
    return 'Organise cities and regions.'

  return ''
})


const currentSectionLabel = computed(() => {
  const item = navItems.find((i) => isActive(i.to))
  return item?.label || 'Dashboard'
})

const today = computed(() => {
  const d = new Date()
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})
</script>
