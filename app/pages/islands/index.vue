<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50/80 to-slate-50">
    <!-- Hero Section with Safari Theme -->
    <div class="relative overflow-hidden bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900">
      <!-- Decorative elements -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <header class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div class="max-w-3xl">
          <!-- Hero Title -->
          <div class="mb-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-200 text-xs font-medium">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
              </svg>
              Safari Experience
            </span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            <span class="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
              Tanzanian Islands
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-amber-100/90 mb-8 leading-relaxed max-w-2xl">
            Discover pristine archipelago gems along the Swahili Coast. 
            Where safari adventures meet turquoise seas.
          </p>
          
          <!-- Search in Hero -->
          <div class="relative max-w-xl">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              id="search"
              v-model="searchQuery"
              @input="page = 1"
              type="search"
              placeholder="Search islands by name, description, or region..."
              class="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-amber-300/30 rounded-2xl text-white placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-base"
              aria-label="Search islands"
            />
            <div class="absolute right-3 top-1/2 -translate-y-1/2">
              <span class="text-xs text-amber-200/60 px-2 py-1 bg-white/5 rounded-lg">
                {{ filteredIslands.length }} islands
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      <!-- Sticky Filter Bar -->
      <div class="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-amber-100 shadow-lg -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-8">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Filters -->
            <div class="flex-1 flex flex-col sm:flex-row gap-4">
              <!-- Region Filter -->
              <div class="relative flex-1 group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                </div>
                <label class="text-xs text-slate-600 font-medium block mb-1 ml-1">Region</label>
                <select 
                  v-model="regionFilter" 
                  @change="page = 1" 
                  class="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all appearance-none cursor-pointer shadow-sm hover:border-amber-300"
                  aria-label="Filter by region"
                >
                  <option value="">All Regions</option>
                  <option v-for="r in regions" :key="r" :value="r" class="py-2">{{ r }}</option>
                </select>
              </div>

              <!-- Sort Filter -->
              <div class="relative flex-1 group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
                  </svg>
                </div>
                <label class="text-xs text-slate-600 font-medium block mb-1 ml-1">Sort by</label>
                <select 
                  v-model="sortBy" 
                  class="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all appearance-none cursor-pointer shadow-sm hover:border-amber-300"
                  aria-label="Sort islands"
                >
                  <option value="name:asc">Name (A → Z)</option>
                  <option value="name:desc">Name (Z → A)</option>
                  <option value="area:desc">Area (largest first)</option>
                  <option value="area:asc">Area (smallest first)</option>
                  <option value="year:desc">Established (newest first)</option>
                  <option value="year:asc">Established (oldest first)</option>
                </select>
              </div>

              <!-- Results Per Page -->
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                  </svg>
                </div>
                <label class="text-xs text-slate-600 font-medium block mb-1 ml-1">Show</label>
                <select 
                  id="perpage" 
                  v-model.number="perPage" 
                  class="pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all appearance-none cursor-pointer shadow-sm hover:border-amber-300 min-w-[120px]"
                  aria-label="Results per page"
                >
                  <option :value="6">6 per page</option>
                  <option :value="12">12 per page</option>
                  <option :value="24">24 per page</option>
                </select>
              </div>
            </div>

            <!-- Results & Actions -->
            <div class="flex items-center gap-4">
              <!-- Results Counter -->
              <div class="text-sm text-slate-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                <span class="font-semibold text-amber-700">{{ totalResults }}</span>
                {{ totalResults === 1 ? 'island' : 'islands' }} found
              </div>
              
              <!-- Clear Filters Button -->
              <button
                v-if="hasFilters"
                @click="clearFilters"
                class="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-amber-50 hover:text-amber-700 border border-amber-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                aria-label="Clear all filters"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <section>
        <!-- Loading State -->
        <div v-if="isLoading" class="py-12">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <IslandCards :isLoading="true" :islands="[]" :columns="4" />
          </div>
        </div>

        <!-- Islands Grid -->
        <div v-else>
          <div v-if="paginatedIslands.length">
            <!-- Grid Layout Toggle (Optional) -->
            <div class="flex items-center justify-between mb-6">
              <div class="text-sm text-slate-600">
                Page <span class="font-semibold text-amber-700">{{ page }}</span> of 
                <span class="font-semibold text-amber-700">{{ totalPages }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  @click="columns = columns === 3 ? 4 : 3"
                  class="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg border border-slate-200 transition-colors"
                  aria-label="Toggle grid layout"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                  Grid View
                </button>
              </div>
            </div>

            <!-- Islands Cards -->
            <IslandCards
              :islands="paginatedIslands"
              :columns="columns"
              @view="onView"
              class="mb-8"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="bg-gradient-to-br from-amber-50 to-white rounded-3xl shadow-lg border border-amber-100 p-12 text-center">
            <div class="max-w-md mx-auto">
              <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl mb-6 shadow-inner">
                <svg class="w-12 h-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-800 mb-3">No Islands Found</h3>
              <p class="text-slate-600 mb-6">
                {{ hasFilters 
                  ? 'Try adjusting your filters or search term.' 
                  : 'No islands are currently available in our database.' 
                }}
              </p>
              <div class="space-x-4">
                <button
                  v-if="hasFilters"
                  @click="clearFilters"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reset All Filters
                </button>
                <NuxtLink 
                  to="/" 
                  class="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                >
                  Back to Home
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 pt-8 border-t border-amber-100">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-slate-600">
            Showing 
            <span class="font-semibold text-amber-700">{{ ((page - 1) * perPage) + 1 }}</span> – 
            <span class="font-semibold text-amber-700">{{ Math.min(page * perPage, totalResults) }}</span> of 
            <span class="font-semibold text-amber-700">{{ totalResults }}</span> islands
          </div>
          
          <div class="flex items-center gap-2">
            <!-- Previous Button -->
            <button
              :disabled="page === 1"
              @click="page--"
              class="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-amber-200 rounded-xl hover:bg-amber-50 hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
              :aria-label="`Go to previous page, page ${page - 1}`"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Previous
            </button>
            
            <!-- Page Numbers -->
            <div class="flex items-center gap-1">
              <button
                v-for="p in paginationRange"
                :key="p"
                @click="page = p"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
                  p === page
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-700 bg-white border border-amber-200 shadow-sm hover:shadow-md'
                ]"
                :aria-label="`Go to page ${p}`"
                :aria-current="p === page ? 'page' : null"
                v-if="p !== '...'"
              >
                {{ p }}
              </button>
              <span v-else class="px-2 text-slate-400">…</span>
            </div>
            
            <!-- Next Button -->
            <button
              :disabled="page === totalPages"
              @click="page++"
              class="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-amber-200 rounded-xl hover:bg-amber-50 hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
              :aria-label="`Go to next page, page ${page + 1}`"
            >
              Next
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import IslandCards from '~/components/islands/IslandCards.vue'

definePageMeta({
  title: 'Tanzanian Islands | Safari by the Sea',
  meta: [
    { 
      name: 'description', 
      content: 'Discover the pristine islands of Tanzania. From Zanzibar to Mafia Island, experience where safari adventures meet turquoise seas.' 
    }
  ]
})

useHead({
  bodyAttrs: {
    class: 'bg-gradient-to-b from-amber-50 to-slate-50'
  }
})

/* fetching (SSR-friendly) */
const { data: islandsPayload, pending, refresh, error: fetchError } = await useAsyncData(
  'islands-list',
  async () => {
    const res = await $fetch('/api/islands').catch((e) => {
      console.error('Failed to fetch /api/islands', e)
      return []
    })
    // normalize -> array
    if (!res) return []
    if (Array.isArray(res)) return res
    // some APIs return { data: [...] }
    if (res.data && Array.isArray(res.data)) return res.data
    // fallback
    return Array.isArray(res) ? res : []
  },
  { server: true, immediate: true }
)

const isLoading = ref(false)
watch(pending, (p) => { isLoading.value = !!p }, { immediate: true })

const islandsRaw = computed(() => islandsPayload.value || [])

/* UI state */
const searchQuery = ref('')
const regionFilter = ref('')
const sortBy = ref('name:asc')
const perPage = ref(12)
const page = ref(1)
const columns = ref(3)

/* derived lists */
const regions = computed(() => {
  const set = new Set()
  for (const i of islandsRaw.value) {
    if (i.region) set.add(String(i.region).trim())
  }
  return Array.from(set).sort((a,b) => a.localeCompare(b))
})

const filteredIslands = computed(() => {
  const q = (searchQuery.value || '').trim().toLowerCase()
  return (islandsRaw.value || []).filter(i => {
    if (regionFilter.value && String((i.region || '')).trim() !== String(regionFilter.value).trim()) return false
    if (!q) return true
    const name = String(i.name || '').toLowerCase()
    const short = String(i.shortDescription || '').toLowerCase()
    const desc = String(i.description || '').toLowerCase()
    const region = String(i.region || '').toLowerCase()
    return name.includes(q) || short.includes(q) || desc.includes(q) || region.includes(q)
  })
})

const sortedIslands = computed(() => {
  const [field, dir] = (sortBy.value || 'name:asc').split(':')
  const arr = [...filteredIslands.value]
  arr.sort((a, b) => {
    const av = a[field] ?? ''
    const bv = b[field] ?? ''

    // handle numeric (area, establishedYear) vs string
    const isNum = field === 'areaKm2' || field === 'area' || field === 'establishedYear' || field === 'year'
    if (isNum) {
      const na = Number(a.areaKm2 ?? a[field] ?? 0)
      const nb = Number(b.areaKm2 ?? b[field] ?? 0)
      return dir === 'asc' ? na - nb : nb - na
    }

    const sa = String(a.name ?? a[field] ?? '').toLowerCase()
    const sb = String(b.name ?? b[field] ?? '').toLowerCase()
    if (sa < sb) return dir === 'asc' ? -1 : 1
    if (sa > sb) return dir === 'asc' ? 1 : -1
    return 0
  })
  return arr
})

const totalResults = computed(() => sortedIslands.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalResults.value / (perPage.value || 1))))

const paginatedIslands = computed(() => {
  const start = (page.value - 1) * perPage.value
  const end = start + perPage.value
  return sortedIslands.value.slice(start, end)
})

watch([perPage, searchQuery, regionFilter, sortBy], () => { page.value = 1 })

/* pagination helpers */
const paginationRange = computed(() => {
  const maxButtons = 7
  const tp = totalPages.value
  const current = page.value
  if (tp <= maxButtons) return Array.from({ length: tp }, (_, i) => i + 1)

  const pages = []
  const left = Math.max(1, current - 2)
  const right = Math.min(tp, current + 2)

  if (left > 1) pages.push(1)
  if (left > 2) pages.push('...')
  for (let p = left; p <= right; p++) pages.push(p)
  if (right < tp - 1) pages.push('...')
  if (right < tp) pages.push(tp)

  return pages
})

/* event handlers */
function onView(island) {
  // Optional: Add analytics or tracking here
  console.log('Viewing island:', island.name)
}

function clearFilters() {
  searchQuery.value = ''
  regionFilter.value = ''
  sortBy.value = 'name:asc'
  page.value = 1
}

/* helpful boolean */
const hasFilters = computed(() => {
  return !!(searchQuery.value || regionFilter.value || (sortBy.value !== 'name:asc'))
})
</script>

<style scoped>
/* Smooth scrolling for pagination */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #fef3c7;
}

::-webkit-scrollbar-thumb {
  background: #f59e0b;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d97706;
}
</style>