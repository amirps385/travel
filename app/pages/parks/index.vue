<template>
  <div class="min-h-screen bg-linear-to-b from-emerald-50/30 via-white to-amber-50/20">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-28 overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-linear-to-br from-emerald-900 via-emerald-800 to-slate-900"></div>

      <!-- Decorative Elements -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>

      <!-- Pattern Overlay -->
      <div class="absolute inset-0 opacity-5 bg-pattern"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span class="text-sm text-emerald-100 font-medium tracking-wider">PROTECTED PARKS OF TANZANIA</span>
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Tanzania's
            <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-teal-300">Wild Crown Jewels</span>
          </h1>

          <p class="text-xl md:text-2xl text-emerald-100/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            From the sweeping plains of the Serengeti to the cratered amphitheatre of Ngorongoro,
            Tanzania's national parks protect some of the planet's richest wildlife and most spectacular
            landscapes. Discover safaris designed by local experts for unforgettable wildlife encounters.
          </p>

          <div class="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">{{ activeParksCount }}</div>
              <div class="text-sm text-emerald-200/80 uppercase tracking-wider">Protected Parks</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">365</div>
              <div class="text-sm text-emerald-200/80 uppercase tracking-wider">Days of Safari</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">300+</div>
              <div class="text-sm text-emerald-200/80 uppercase tracking-wider">Recorded Species</div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 justify-center">
            <button @click="() => router.push('/#contact')"
                    class="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 overflow-visible">
              <span class="relative z-10">Plan My Safari</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button @click="() => router.push('/about#conservation')"
                    class="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-visible">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="relative z-10">Why Conservation Matters</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-emerald-300/50 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-emerald-300 rounded-full mt-2"></div>
        </div>
      </div>
    </section>

    <!-- FILTER BAR (card overlapped with solid BG to avoid hero bleed-through) -->
    <div class="max-w-7xl mx-auto px-4 lg:px-6">
      <div class="relative -mt-12 md:-mt-16 z-30">
        <div class="mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-5 backdrop-blur-sm">
          <div class="flex flex-col md:flex-row md:items-center gap-3">
            <!-- Search -->
            <div class="flex-1">
              <label class="sr-only" for="parks-search">Search parks</label>
              <div class="relative">
                <input
                  id="parks-search"
                  v-model="filters.search"
                  @keydown.enter.prevent="applyFiltersNow"
                  type="search"
                  placeholder="Search parks, region, or keywords (e.g. Serengeti)"
                  class="w-full border rounded-lg px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
                <button @click="clearSearch" v-if="filters.search" type="button" class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-700">
                  ✕
                </button>
              </div>
            </div>

            <!-- Region select -->
            <div class="w-full md:w-56">
              <label class="sr-only" for="filter-region">Region</label>
              <select id="filter-region" v-model="filters.region"
                      class="w-full border rounded-lg px-3 py-3 text-sm bg-white focus:outline-none">
                <option value="">All regions</option>
                <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
              </select>
            </div>

            <!-- Category select -->
            <div class="w-full md:w-56">
              <label class="sr-only" for="filter-category">Category</label>
              <select id="filter-category" v-model="filters.category"
                      class="w-full border rounded-lg px-3 py-3 text-sm bg-white focus:outline-none">
                <option value="">All categories</option>
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <button @click="resetFilters" class="px-4 py-2 bg-slate-50 border rounded-lg text-sm">Reset</button>
              <button @click="applyFiltersNow" class="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">Apply</button>
            </div>
          </div>

          <!-- small helper / result count -->
          <div class="mt-3 text-xs text-slate-500">
            <span v-if="!pending">{{ filteredParks.length }}</span>
            <span v-else>—</span>
            <span> results</span>
            <span class="mx-2">•</span>
            <span>Showing parks</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Parks Grid Section -->
    <section class="py-12 md:py-20 bg-linear-to-b from-slate-50 to-white">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
        <!-- Section Header -->
        <div class="text-center mb-12 md:mb-16">
          <div class="inline-block mb-4">
            <div class="w-16 h-1 bg-linear-to-r from-emerald-400 to-teal-400 rounded-full"></div>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Where <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Wild Encounters</span> Begin
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Each park is a distinct ecosystem — Serengeti's migration, Ngorongoro's crater landscape,
            Tarangire's elephant strongholds and Kilimanjaro's alpine heights. Browse protected areas,
            wildlife highlights and practical details to choose the best park for your safari goals.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="text-center py-20">
          <div class="inline-block relative">
            <div class="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-3xl animate-pulse">🏞️</span>
            </div>
          </div>
          <p class="mt-6 text-slate-600 text-lg font-medium">Loading parks from our reserves…</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="inline-block p-8 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100">
            <div class="text-7xl mb-6">🌍</div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3">Unable to load parks</h3>
            <p class="text-slate-600 max-w-md mx-auto mb-8">
              We're having trouble connecting to our park database. Please check your connection or try again.
            </p>
            <button @click="refresh" class="px-8 py-3.5 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl">Retry</button>
          </div>
        </div>

        <!-- No Parks -->
        <div v-else-if="filteredParks.length === 0" class="text-center py-20">
          <div class="inline-block p-10 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 max-w-md">
            <div class="text-8xl mb-6">🏕️</div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3">No parks found</h3>
            <p class="text-slate-600 mb-8">
              Try adjusting filters or search terms to broaden your results.
            </p>
            <button @click="resetFilters" class="px-6 py-2 bg-slate-50 border rounded-lg">Reset filters</button>
          </div>
        </div>

        <!-- Parks Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="park in paginatedParks" :key="park._id" class="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-emerald-200">
            <!-- Image -->
            <div class="relative h-64 overflow-hidden">
              <img :src="park.featuredImage || defaultImage" :alt="park.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div class="absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg bg-white/20 text-white border border-white/30">
                {{ park.category }}
              </div>
              <div class="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md shadow-lg bg-black/40 text-white border border-white/20 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ park.region }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors duration-300">{{ park.name }}</h3>
              <p class="text-slate-600 mb-6 line-clamp-2 leading-relaxed">{{ park.shortDescription || defaultShortDescription(park) }}</p>
              <button @click="() => viewPark(park.slug)" class="w-full py-3.5 px-4 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <span>Explore Park Details</span>
                <span class="text-lg transition-transform duration-300">→</span>
              </button>
            </div>

            <div class="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagesCount > 1" class="mt-12 flex justify-center items-center gap-3">
          <button :disabled="page === 1" @click="page--" class="px-3 py-1 rounded border bg-white">Prev</button>
          <button v-for="p in pagesCount" :key="p" @click="page = p" :class="['px-3 py-1 rounded', page === p ? 'bg-emerald-600 text-white' : 'bg-white border']">{{ p }}</button>
          <button :disabled="page === pagesCount" @click="page++" class="px-3 py-1 rounded border bg-white">Next</button>
        </div>

        <!-- Park Count Display -->
        <div v-if="!pending && parks.length > 0" class="text-center mt-16 pt-12 border-t border-slate-200">
          <div class="mb-8">
            <div class="inline-flex items-center justify-center gap-4 mb-6">
              <div class="w-12 h-0.5 bg-slate-300"></div>
              <div class="text-lg font-bold text-emerald-700 tracking-wider uppercase">TANZANIA'S NATIONAL HERITAGE</div>
              <div class="w-12 h-0.5 bg-slate-300"></div>
            </div>
            <div class="mb-6">
              <div class="text-5xl md:text-6xl font-bold text-emerald-700 mb-3">{{ activeParksCount }}</div>
              <div class="text-2xl font-semibold text-slate-800">Protected Wilderness Areas</div>
            </div>
          </div>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Preserving biodiversity, supporting local communities and enabling meaningful wildlife experiences.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-28 bg-linear-to-r from-slate-900 to-emerald-900">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center">
          <div class="inline-block p-4 bg-emerald-500/20 rounded-2xl mb-8"><div class="text-4xl">🏞️</div></div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Ready for a safari designed for you?</h2>
          <p class="text-xl text-emerald-100/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            We design responsible safaris — local guides, flexible itineraries and accommodations chosen
            for comfort and conservation impact. Tell us what you want to see, and we'll plan the rest.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="() => router.push('/contact')" class="px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-lg">Book Your Safari</button>
            <button @click="() => router.push('/itineraries')" class="px-8 py-4 bg-transparent border-2 border-emerald-400 text-white font-bold rounded-xl hover:bg-emerald-400/10">View Sample Itineraries</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * Parks index page
 * - adds search + region + category filters
 * - syncs filters with URL query so navbar links can link to /parks?search=...
 * - protects filter card from hero bleed-through by using a solid white background + z-index
 */

import { ref, computed, watch, onMounted } from 'vue'
import { useFetch, useSeoMeta, refreshNuxtData } from '#app'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

/* ----------------------
  Fetch parks data (server-friendly)
  ---------------------- */
const { data: parksData, pending, error } = await useFetch('/api/parks')

/* helper to normalize response */
const extractParksArray = (data) => {
  if (!data) return []
  if (Array.isArray(data)) return data
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data.parks)) return data.parks
    if (Array.isArray(data.data)) return data.data
    if (Array.isArray(data.items)) return data.items
    if (Array.isArray(data.results)) return data.results
    if (Array.isArray(data.docs)) return data.docs
    const arrayProp = Object.values(data).find(value => Array.isArray(value))
    if (arrayProp) return arrayProp
  }
  return []
}

/* reactive computed of all active parks */
const parks = computed(() => {
  const arr = extractParksArray(parksData.value)
  return (arr || []).filter(p => p?.isActive === true)
})

/* Counts and defaults */
const activeParksCount = computed(() => parks.value.length)
const defaultImage = 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&q=80&auto=format&fit=crop'
const defaultShortDescription = (park) => {
  if (park?.shortDescription) return park.shortDescription
  if (park?.region && park?.category) return `${park.region} — a ${park.category.toLowerCase()} known for outstanding wildlife viewing.`
  return 'A remarkable protected area in Tanzania with unique wildlife and landscapes.'
}

/* ----------------------
  Filters (search / region / category)
  - synced with URL query so external links (e.g. navbar) can point to /parks?search=Serengeti
  ---------------------- */
const filters = ref({
  search: '',
  region: '',
  category: ''
})

/* read query on mount (so /parks?search=x pre-fills filters) */
onMounted(() => {
  const q = route.query
  if (q.search) filters.value.search = String(q.search)
  if (q.region) filters.value.region = String(q.region)
  if (q.category) filters.value.category = String(q.category)
})

/* update URL query when filters change (debounced for search) */
let searchDebounce = null
let isUpdatingFromRoute = false

watch(filters, (newVal) => {
  // Don't update URL if we're responding to route changes
  if (isUpdatingFromRoute) return
  
  // debounce search to avoid too many URL updates while typing
  if (searchDebounce) clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    const q = {}
    if (newVal.search?.trim()) q.search = newVal.search.trim()
    if (newVal.region) q.region = newVal.region
    if (newVal.category) q.category = newVal.category
    
    // Only update if we're still on the parks page
    if (route.path === '/parks') {
      router.replace({ path: '/parks', query: q }).catch(() => {})
    }
  }, 300)
}, { deep: true })

/* also respond when user uses browser back/forward (route.query changes) */
watch(() => route.query, (q) => {
  if (route.path !== '/parks') return
  
  isUpdatingFromRoute = true
  try {
    if (q.search !== undefined && q.search !== filters.value.search) filters.value.search = String(q.search || '')
    if (q.region !== undefined && q.region !== filters.value.region) filters.value.region = String(q.region || '')
    if (q.category !== undefined && q.category !== filters.value.category) filters.value.category = String(q.category || '')
  } finally {
    // Use nextTick to ensure we're done updating before allowing watch to trigger
    nextTick(() => {
      isUpdatingFromRoute = false
    })
  }
})

/* helpers to clear / apply instantly */
function clearSearch() { filters.value.search = '' }
function resetFilters() { filters.value.search = ''; filters.value.region = ''; filters.value.category = '' }
function applyFiltersNow() {
  // immediate sync (no debounce)
  const q = {}
  if (filters.value.search?.trim()) q.search = filters.value.search.trim()
  if (filters.value.region) q.region = filters.value.region
  if (filters.value.category) q.category = filters.value.category
  router.replace({ path: '/parks', query: q }).catch(() => {})
}

/* ----------------------
  Derived UI lists
  ---------------------- */
const regions = computed(() => {
  const set = new Set()
  for (const p of parks.value) if (p.region) set.add(p.region)
  return Array.from(set).sort()
})
const categories = computed(() => {
  const set = new Set()
  for (const p of parks.value) if (p.category) set.add(p.category)
  return Array.from(set).sort()
})

/* ----------------------
  Filtered + search logic
  ---------------------- */
const filteredParks = computed(() => {
  const s = (filters.value.search || '').trim().toLowerCase()
  return parks.value.filter(park => {
    if (filters.value.region && park.region !== filters.value.region) return false
    if (filters.value.category && park.category !== filters.value.category) return false
    if (s) {
      const hay = `${park.name || ''} ${park.shortDescription || ''} ${park.region || ''} ${park.category || ''} ${park.slug || ''}`.toLowerCase()
      if (!hay.includes(s)) return false
    }
    return true
  })
})

/* ----------------------
  Simple client-side pagination
  ---------------------- */
const page = ref(1)
const perPage = ref(9)
watch([filteredParks, perPage], () => { page.value = 1 }) // reset page when filters change
const pagesCount = computed(() => Math.max(1, Math.ceil(filteredParks.value.length / perPage.value)))
const paginatedParks = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filteredParks.value.slice(start, start + perPage.value)
})

/* ----------------------
  Navigation & misc
  ---------------------- */
const viewPark = (slug) => { if (!slug) return; router.push(`/parks/${slug}`) }
const refresh = () => { try { refreshNuxtData() } catch (e) {} }

/* SEO */
useSeoMeta({
  title: 'Tanzania National Parks | Safaris, Wildlife & Conservation',
  description: 'Discover Tanzania\'s national parks — Serengeti, Ngorongoro, Tarangire, Kilimanjaro and more. Tailored safaris, expert guides and conservation-led experiences.',
  ogTitle: 'Tanzania National Parks — Expert-Led Safaris & Wildlife Experiences'
})
</script>

<style scoped>
/* Pattern Background */
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* clamp util */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* small responsive tweak */
@media (min-width: 768px) {
  .-mt-16 { margin-top: -4rem; }
}

/* ensure filter card sits above hero visuals */
.z-30 { z-index: 30; }

/* accessibility niceties */
input:focus, select:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
}

/* custom scrollbar */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #10b981, #0d9488); border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #059669, #0f766e); }
</style>
