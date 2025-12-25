<template>
  <div class="min-h-screen bg-white">
    <!-- HERO -->
    <section
      class="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"
      aria-hidden="false"
    >
      <div
        class="absolute inset-0 z-0"
        :style="{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2340&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      />
      <div class="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/50 to-transparent z-1" />

      <div class="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Kilimanjaro Routes
        </h1>
        <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover the perfect path to Africa's highest peak. Each carefully crafted itinerary
          offers a unique adventure with expert guides and optimal acclimatization.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            @click="scrollToRoutes"
            class="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Compare Routes
          </button>

          <!-- ItinerarySelector: support both v-model and update:selected -->
          <ItinerarySelector
            :options="[5,6,7,8,9]"
            v-model:selected="selectedDays"
            @update:selected="setSelectedDays"
            class="w-full sm:w-auto"
          />
        </div>
      </div>
    </section>

    <!-- ROUTES GRID -->
    <section id="routes-grid" class="py-16 px-4 max-w-7xl mx-auto">
      <!-- Improved Header and Controls -->
      <div class="mb-10">
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Choose Your Adventure</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto">
            Filter by duration or search to find your ideal climb.
          </p>
        </div>

        <!-- Search and Filter Container -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <!-- Search Section -->
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Search Routes
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  @keydown.enter.prevent="performSearch"
                  ref="searchInput"
                  class="w-full pl-10 pr-36 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                  placeholder="Search by route name, keyword, or description..."
                  aria-label="Search routes"
                />
                <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button
                    @click="performSearch"
                    class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                  <button
                    v-if="searchQuery"
                    @click="clearSearch"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <!-- Filter Section -->
            <div class="flex-1">
              <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                <div class="flex items-center gap-3">
                  <label class="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Filter by Duration:
                  </label>
                  <div class="flex-1">
                    <ItinerarySelector
                      :options="[5,6,7,8,9]"
                      v-model:selected="selectedDays"
                      @update:selected="setSelectedDays"
                      class="w-full"
                    />
                  </div>
                </div>
                <button
                  v-if="selectedDays !== null"
                  @click="clearDays"
                  class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filter
                </button>
              </div>
              <p class="text-sm text-gray-500 mt-2">
                Select number of days to see matching routes
              </p>
            </div>
          </div>

          <!-- Active Filters Display -->
          <div v-if="searchQuery || selectedDays !== null" class="mt-6 pt-6 border-t border-gray-100">
            <div class="flex flex-wrap items-center gap-3">
              <span class="text-sm font-medium text-gray-700">Active filters:</span>
              
              <!-- Search Filter Badge -->
              <div v-if="searchQuery" class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                <span>Search: "{{ searchQuery }}"</span>
                <button @click="clearSearch" class="text-blue-500 hover:text-blue-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- Days Filter Badge -->
              <div v-if="selectedDays !== null" class="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium">
                <span>{{ selectedDays }} Days</span>
                <button @click="clearDays" class="text-amber-500 hover:text-amber-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- Clear All Button -->
              <button
                v-if="searchQuery && selectedDays !== null"
                @click="clearAllFilters"
                class="ml-2 text-sm font-medium text-gray-600 hover:text-gray-900 underline"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        <!-- Results Count -->
        <div v-if="!loading && filteredRoutes.length > 0" class="mb-8">
          <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="text-gray-700">
                <span class="font-semibold text-gray-900">{{ filteredRoutes.length }}</span>
                <span class="ml-1">route{{ filteredRoutes.length !== 1 ? 's' : '' }} found</span>
                <span v-if="searchQuery" class="ml-2 text-gray-600">
                  matching "<span class="font-medium">{{ searchQuery }}</span>"
                </span>
                <span v-if="selectedDays !== null" class="ml-2 text-gray-600">
                  • {{ selectedDays }}-day itineraries
                </span>
              </div>
              
              <div v-if="filteredRoutes.length > 0" class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Click on any route for detailed itinerary</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p class="text-slate-600">Loading routes...</p>
        </div>
      </div>

      <!-- No Routes Found -->
      <div v-else-if="filteredRoutes.length === 0" class="text-center py-16">
        <div class="inline-block p-10 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 max-w-md">
          <div class="text-8xl mb-6">🏔️</div>
          <h3 class="text-2xl font-bold text-slate-900 mb-3">No routes match your search</h3>
          <p class="text-slate-600 mb-6">Try adjusting your search terms or duration filter.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <button @click="clearSearch" class="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
              Clear Search
            </button>
            <button @click="clearDays" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      <!-- Routes Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <RouteCard 
          v-for="r in filteredRoutes" 
          :key="r._id" 
          :route="{
            _id: r._id,
            name: r.name,
            slug: r.slug,
            image: r.featuredImage || r.heroImage || r.gallery?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
            durationMin: r.durationMin || r._minDays || extractDurationNumbers(r.duration)[0] || 0,
            durationMax: r.durationMax || r._maxDays || extractDurationNumbers(r.duration)[1] || (r._minDays || 0),
            difficulty: r.difficulty,
            startingPrice: r.startingPrice,
            shortDescription: r.shortDescription || r.tagline || 'Experience this amazing trekking route.',
            duration: r.duration,
            tagline: r.tagline,
            successRate: r.successRate,
            featuredImage: r.featuredImage,
            heroImage: r.heroImage,
            gallery: r.gallery
          }" 
        />
      </div>
    </section>

    <!-- INFO STRIP -->
    <section class="bg-linear-to-r from-gray-900 to-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Fully Customizable</h3>
            <p class="text-gray-300">All routes can be tailored to your preferences, fitness level, and schedule.</p>
          </div>

          <div class="text-center">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Private & Group Climbs</h3>
            <p class="text-gray-300">Join a group expedition or book a private climb with your own team.</p>
          </div>

          <div class="text-center">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Expert Local Guides</h3>
            <p class="text-gray-300">Climb with certified guides who have hundreds of successful summits.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import RouteCard from '~/components/routes/RouteCard.vue'
import ItinerarySelector from '~/components/routes/ItinerarySelector.vue'

const route = useRoute()
const routes = ref([])
const loading = ref(true)
const selectedDays = ref(null)
const searchQuery = ref('')
const searchInput = ref(null)

// Add a clear all filters function
async function clearAllFilters() {
  searchQuery.value = ''
  selectedDays.value = null
  await navigateTo({ path: '/routes' }, { replace: true })
  await nextTick()
  try { searchInput.value && searchInput.value.focus() } catch {}
}

/**
 * Improved parse for duration strings.
 * Handles:
 *  - "5–7 Days", "5-7 days", "5 to 7 days"
 *  - "7 Days / 6 Nights" (prefers day number)
 *  - "7 Days", "6 Nights" (converts nights -> days as nights+1)
 *  - fallback: picks first two numeric tokens and returns [min,max] with min <= max
 */
function extractDurationNumbers(duration = '') {
  const text = (duration || '').toString().trim()
  if (!text) return [0, 0]

  // 1) explicit day range like "5-7 days" or "5 to 7 days"
  const rangeMatch = text.match(/(\d+)\s*(?:[-–to]{1,3})\s*(\d+)\s*(?:days?|day)\b/i)
  if (rangeMatch) {
    const a = Number(rangeMatch[1])
    const b = Number(rangeMatch[2])
    if (!Number.isNaN(a) && !Number.isNaN(b)) {
      return [Math.min(a, b), Math.max(a, b)]
    }
  }

  // 2) explicit "x days" occurrence
  const dayMatch = text.match(/(\d+)\s*(?:days?|day)\b/i)
  if (dayMatch) {
    const n = Number(dayMatch[1])
    if (!Number.isNaN(n)) return [n, n]
  }

  // 3) explicit nights mention e.g. "6 nights" -> assume days = nights + 1
  const nightMatch = text.match(/(\d+)\s*(?:nights?|night)\b/i)
  if (nightMatch) {
    const nights = Number(nightMatch[1])
    if (!Number.isNaN(nights)) {
      const days = nights + 1
      return [days, days]
    }
  }

  // 4) fallback: pull first two numbers found and return sorted pair
  const nums = (text.match(/\d+/g) || []).map(x => Number(x)).filter(n => !Number.isNaN(n))
  if (nums.length === 0) return [0, 0]
  if (nums.length === 1) return [nums[0], nums[0]]
  const a = Math.min(nums[0], nums[1])
  const b = Math.max(nums[0], nums[1])
  return [a, b]
}

/**
 * For a route record return normalized [min,max] days.
 * Priority:
 * 1. durationMin/durationMax numeric fields
 * 2. parsed duration string via extractDurationNumbers
 * 3. itinerary length (days = itinerary.length)
 * 4. [0,0] unknown
 */
function routeDurationRange(r) {
  const toNum = v => {
    if (v === undefined || v === null) return null
    const n = Number(v)
    return Number.isNaN(n) ? null : n
  }

  const dMin = toNum(r.durationMin)
  const dMax = toNum(r.durationMax)
  if (dMin && dMax) return [dMin, dMax]
  if (dMin) return [dMin, dMin]
  if (dMax) return [dMax, dMax]

  // parse textual duration
  const [pMin, pMax] = extractDurationNumbers(r.duration)
  if (pMin && pMax) return [pMin, pMax]
  if (pMin) return [pMin, pMin]

  // itinerary fallback (count days in itinerary)
  if (Array.isArray(r.itinerary) && r.itinerary.length > 0) {
    const n = r.itinerary.length
    return [n, n]
  }

  return [0, 0]
}

async function fetchRoutes() {
  try {
    loading.value = true
    // request many so client-side filtering can work - adjust limit as needed
    const response = await $fetch('/api/routes?limit=1000').catch(async () => {
      return await $fetch('/api/routes').catch(() => ({ success: true, data: [] }))
    })

    let data = []
    if (response && response.success && Array.isArray(response.data)) {
      data = response.data
    } else if (Array.isArray(response)) {
      data = response
    } else {
      data = []
    }

    routes.value = data.filter(Boolean)

    // normalize min/max once per route
    routes.value.forEach(r => {
      const [min, max] = routeDurationRange(r)
      r._minDays = Number(min) || 0
      r._maxDays = Number(max) || (r._minDays || 0)
    })
  } catch (err) {
    console.error('Failed to fetch routes', err)
    routes.value = []
  } finally {
    loading.value = false
  }
}

// Combined filters: q + days
const filteredRoutes = computed(() => {
  let list = Array.isArray(routes.value) ? routes.value.slice() : []

  const q = (searchQuery.value || '').toString().trim().toLowerCase()
  if (q) {
    list = list.filter(r => {
      const name = (r.name || '').toString().toLowerCase()
      const slug = (r.slug || '').toString().toLowerCase()
      const tagline = (r.tagline || r.shortDescription || '').toString().toLowerCase()
      const keywords = ((r.tags || r.seo?.keywords || []) .join(' ') || '').toString().toLowerCase()
      return name.includes(q) || slug.includes(q) || tagline.includes(q) || keywords.includes(q)
    })
  }

  if (selectedDays.value !== null && selectedDays.value !== undefined) {
    const daysNum = Number(selectedDays.value)
    if (!Number.isNaN(daysNum)) {
      list = list.filter(r => {
        const min = Number(r._minDays || 0)
        const max = Number(r._maxDays || 0)
        if (!min && !max) return false
        const a = min || max || 0
        const b = max || min || a
        return daysNum >= a && daysNum <= b
      })
    }
  }

  return list
})

const scrollToRoutes = () => {
  const el = document.getElementById('routes-grid')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

async function performSearch() {
  const q = (searchQuery.value || '').toString().trim()
  const query = {}
  if (q) query.q = q
  if (selectedDays.value !== null && selectedDays.value !== undefined) query.days = String(selectedDays.value)
  await navigateTo({ path: '/routes', query }, { replace: true })
  nextTick(() => scrollToRoutes())
}

async function clearSearch() {
  searchQuery.value = ''
  const query = {}
  if (selectedDays.value !== null && selectedDays.value !== undefined) query.days = String(selectedDays.value)
  await navigateTo({ path: '/routes', query }, { replace: true })
  await nextTick()
  try { searchInput.value && searchInput.value.focus() } catch {}
}

async function setSelectedDays(val) {
  const n = val === null || val === undefined ? null : Number(val)
  selectedDays.value = (n === null || Number.isNaN(n)) ? null : n
  const query = {}
  if (searchQuery.value) query.q = String(searchQuery.value)
  if (selectedDays.value !== null && selectedDays.value !== undefined) query.days = String(selectedDays.value)
  await navigateTo({ path: '/routes', query }, { replace: true })
  nextTick(() => scrollToRoutes())
}

async function clearDays() {
  selectedDays.value = null
  const query = {}
  if (searchQuery.value) query.q = String(searchQuery.value)
  await navigateTo({ path: '/routes', query }, { replace: true })
}

// init from URL
onMounted(async () => {
  if (process.client) {
    const q = route?.query?.q
    if (q && !Array.isArray(q)) searchQuery.value = String(q)

    const days = route?.query?.days
    if (days && !Array.isArray(days)) {
      const n = Number(days)
      selectedDays.value = Number.isNaN(n) ? null : n
    }
  }

  await fetchRoutes()

  await nextTick()
  if (searchQuery.value || selectedDays.value !== null) {
    try { searchInput.value && searchInput.value.focus() } catch {}
    scrollToRoutes()
  }
})

// keep URL -> UI sync
watch(() => route.query.q, (val) => {
  if (val && !Array.isArray(val)) {
    searchQuery.value = String(val)
    nextTick(() => scrollToRoutes())
  } else {
    searchQuery.value = ''
  }
})
watch(() => route.query.days, (val) => {
  if (val && !Array.isArray(val)) {
    const n = Number(val)
    selectedDays.value = Number.isNaN(n) ? null : n
    nextTick(() => scrollToRoutes())
  } else {
    selectedDays.value = null
  }
})

// optionally refresh when tab focus returns
if (process.client) {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) fetchRoutes()
  })
}
</script>

<style scoped>
.bg-linear-to-r {
  background-image: linear-gradient(90deg, #0f1724 0%, #0b3f3b 100%);
}
.bg-linear-to-br {
  background-image: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
}
.relative.z-1 {
  z-index: 1;
}
</style>