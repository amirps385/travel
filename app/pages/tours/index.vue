<template>
  <div class="min-h-screen bg-linear-to-b from-emerald-50/30 via-white to-amber-50/20">
    <!-- Hero (kept visually same) -->
    <div class="relative overflow-hidden bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-1/4 w-32 h-32">
          <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100"><path d="M50,20 C60,15 75,20 80,35 C85,50 70,65 50,80 C30,65 15,50 20,35 C25,20 40,15 50,20 Z"/></svg>
        </div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div class="mb-8">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NuxtLink to="/" class="inline-flex items-center text-emerald-100 hover:text-white transition-colors">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                  Home
                </NuxtLink>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                  <span class="ml-1 text-emerald-200 font-medium">Tours</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div class="max-w-3xl">
          <div class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <svg class="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/></svg>
            <span class="text-sm font-semibold text-amber-300">Premium Safari Experiences</span>
          </div>

          <h1 class="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Discover <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-amber-200">Tanzania</span> Adventures
          </h1>

          <p class="text-xl text-emerald-100 mb-8 max-w-2xl leading-relaxed">
            Explore our handcrafted collection of safari tours, Kilimanjaro climbs, and Zanzibar escapes.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-12 md:py-16 -mt-4 relative z-10">
      <!-- Search -->
      <div class="mb-12">
        <div class="relative max-w-3xl mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for safaris, Kilimanjaro climbs, Zanzibar beaches..."
            class="w-full pl-14 pr-4 py-4 bg-white border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-xl text-lg transition-all duration-300"
            @input="onSearchInput"
          />
          <div class="absolute left-5 top-1/2 transform -translate-y-1/2">
            <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <button @click="applySearch" class="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg">Search</button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters -->
        <div class="lg:w-1/4">
          <div class="lg:hidden mb-6">
            <button @click="showMobileFilters = !showMobileFilters" class="w-full flex items-center justify-between p-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold">
              <span class="flex items-center">Filters & Options</span>
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
            </button>
          </div>

          <div :class="['lg:block', showMobileFilters ? 'block' : 'hidden']">
            <!-- pass typeOptions so TourFilters can use full type labels -->
            <TourFilters
  @filter="handleFilter"
  :type-options="typeOptions"
  :result-count="filteredTours.length"
/>

            <div class="mt-8 bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h4 class="font-bold text-gray-900 mb-4">Quick Categories</h4>
              <div class="space-y-2">
                <button v-for="c in quickCategories" :key="c.id" @click="selectCategory(c.id)" :class="[ 'w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 font-medium', activeCategory === c.id ? c.classes.active : c.classes.inactive ]">
                  <div class="flex items-center justify-between">
                    <span>{{ c.name }}</span>
                    <span class="text-xs px-2 py-1 rounded-full bg-white/50">{{ c.count }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tours -->
        <div class="lg:w-3/4">
          <div class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p class="text-gray-700">Showing <span class="font-bold text-emerald-700">{{ displayedToursNormalized.length }}</span> of <span class="font-bold text-gray-900">{{ totalTours }}</span> adventures</p>
                <p class="text-sm text-gray-500 mt-1">Sorted by: <span class="font-medium text-emerald-600">Most Popular</span></p>
              </div>

              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <button @click="gridView = false" :class="[ 'p-3 rounded-xl transition-all duration-300', !gridView ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ]">List</button>
                  <button @click="gridView = true" :class="[ 'p-3 rounded-xl transition-all duration-300', gridView ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ]">Grid</button>
                </div>

                <!-- Sort select with chevron icon -->
                <div class="relative">
                  <select v-model="sortBy" @change="onSortChange" class="pl-4 pr-10 py-3 bg-white border-2 border-emerald-200 rounded-xl appearance-none">
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration: Short to Long</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <!-- chevron/arrow on the right -->
                  <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg class="w-5 h-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading / Error -->
          <div v-if="pending" class="text-center py-20">
            <div class="inline-block">
              <div class="relative">
                <div class="w-24 h-24 border-4 border-emerald-200 rounded-full"></div>
                <div class="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
              <p class="mt-6 text-gray-600 font-medium text-lg">Discovering Amazing Tours...</p>
            </div>
          </div>

          <div v-else-if="error" class="text-center py-20 bg-linear-to-br from-red-50 to-amber-50 rounded-3xl border-2 border-red-100 p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Unable to Load Tours</h3>
            <p class="text-gray-600 mb-6 max-w-md mx-auto">{{ error.message || 'We had trouble loading tours.' }}</p>
            <div class="flex items-center justify-center gap-4">
              <button @click="refresh" class="px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl">Try Again</button>
              <NuxtLink to="/contact" class="px-6 py-3 bg-white text-emerald-600 rounded-xl border-2 border-emerald-200">Contact Support</NuxtLink>
            </div>
          </div>

          <!-- Tours Grid -->
          <div v-else-if="displayedToursNormalized.length">
            <div :class="[ 'grid gap-8', gridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1' ]">
              <TourCard v-for="t in displayedToursNormalized" :key="t._id" :tour="t" :layout="gridView ? 'grid' : 'list'" />
            </div>

            <div v-if="displayedTours.length < filteredTours.length" class="text-center mt-12">
              <button @click="loadMore" class="group px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl">Load More Tours</button>
              <p class="text-gray-500 text-sm mt-3">Showing {{ displayedTours.length }} of {{ filteredTours.length }} tours</p>
            </div>
          </div>

          <div v-else class="text-center py-20">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">No Tours Found</h3>
            <p class="text-gray-600 max-w-md mx-auto mb-8">We couldn't find any tours matching your search criteria.</p>
            <div class="flex flex-wrap gap-3 justify-center">
              <button @click="resetFilters" class="px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl">Reset All Filters</button>
              <NuxtLink to="/contact" class="px-6 py-3 bg-white text-emerald-600 rounded-xl border-2 border-emerald-200">Request Custom Tour</NuxtLink>
            </div>
          </div>

          <div class="mt-16"><TourCTA /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TourCard from '~/components/tours/TourCard.vue'
import TourFilters from '~/components/tours/TourFilters.vue'
import TourCTA from '~/components/tours/TourCTA.vue'

/* ---------- Fetch once (do NOT redeclare these names later) ---------- */
const { data, pending, error, refresh } = await useFetch('/api/tours', { method: 'get' })

/* ---------- UI state ---------- */
const gridView = ref(true)
const showMobileFilters = ref(false)
const searchQuery = ref('')
const sortBy = ref('popular')
const activeCategory = ref('all')
const activeFilters = ref({})
const toursPerPage = ref(9)
const displayedCount = ref(9)

/* ---------- helper to normalize text for matching (declare FIRST) ---------- */
const norm = (s) => (s || '').toString().toLowerCase().trim()

/* ---------- small slugify used for category ids (declare FIRST) ---------- */
const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/* ---------- type options to pass to TourFilters (declare BEFORE quickCategories) ---------- */
const typeOptions = [
  'Wildlife Safari',
  'Kilimanjaro Climb',
  'Zanzibar Beach',
  'Cultural Experience',
  'Birdwatching',
  'Day Trip',
  'Private Tour',
  'Group Departure',
  'Adventure Tour'
]

/* ---------- dynamic quick categories (computed) ---------- */

const categoryClassDefault = {
  active: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500',
  inactive: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
}

const categoryClassOverrides = {
  [slugify('Kilimanjaro Climb')]: {
    active: 'bg-gradient-to-r from-slate-600 to-slate-800 text-white border-slate-600',
    inactive: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
  },
  [slugify('Zanzibar Beach')]: {
    active: 'bg-linear-to-r from-sky-500 to-blue-600 text-white border-sky-500',
    inactive: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
  },
  [slugify('Cultural Experience')]: {
    active: 'bg-linear-to-r from-amber-500 to-amber-600 text-white border-amber-500',
    inactive: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
  },
  [slugify('Adventure Tour')]: {
    active: 'bg-linear-to-r from-pink-500 to-rose-600 text-white border-pink-500',
    inactive: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
  }
}

function countForCategoryId(idRaw) {
  const id = (idRaw || 'all').toString().trim()

  if (id === 'all') return tours.value.length

  const matchedType = typeOptions.find(tp =>
    slugify(tp) === id || norm(tp) === id
  )

  if (matchedType) {
    const mf = norm(matchedType)
    return tours.value.filter(t => {
      const tType = Array.isArray(t.type) ? t.type.map(norm).join(' ') : norm(t.type)
      return (
        tType === mf ||
        tType.includes(mf) ||
        norm(t.title).includes(mf) ||
        norm(t.overview).includes(mf)
      )
    }).length
  }

  return tours.value.filter(t =>
    norm(t.title).includes(id) ||
    norm(t.overview).includes(id) ||
    (Array.isArray(t.type) ? t.type.map(norm).join(' ') : norm(t.type)).includes(id)
  ).length
}

const quickCategories = computed(() => {
  const out = [{
    id: 'all',
    name: 'All Tours',
    count: countForCategoryId('all'),
    classes: categoryClassDefault
  }]

  // add categories from typeOptions
  for (const name of typeOptions) {
    const id = slugify(name)
    out.push({
      id,
      name,
      count: countForCategoryId(id),
      classes: categoryClassOverrides[id] || categoryClassDefault
    })
  }

  return out
})

/* ---------- derived data ---------- */
const tours = computed(() => {
  if (!data.value) return []
  return Array.isArray(data.value) ? data.value : (data.value.data || [])
})
const totalTours = computed(() => tours.value.length)

/* ---------- filtering & sorting ---------- */
const filteredTours = computed(() => {
  let list = [...tours.value]

  // combine filters coming from TourFilters (activeFilters) and local quick/search
  const f = (activeFilters.value && typeof activeFilters.value === 'object') ? activeFilters.value : {}
  const catRaw = (f.category || activeCategory.value || 'all').toString().trim()
  const searchRaw = (f.search || searchQuery.value || '').toString().trim()

  const cat = norm(catRaw)
  const q = norm(searchRaw)

  // search
  if (q) {
    list = list.filter(t => {
      return norm(t.title).includes(q) || norm(t.overview).includes(q) || norm(t.route).includes(q)
    })
  }

  // CATEGORY / TOUR TYPE MATCHING (supports slug + readable text)
  if (cat && cat !== 'all') {
    // Check for full readable match OR slug match
    const matchedType = typeOptions.find(tp =>
      norm(tp) === cat || slugify(tp) === cat
    )

    if (matchedType) {
      const mf = norm(matchedType)

      list = list.filter(t => {
        const tType = Array.isArray(t.type)
          ? t.type.map(norm).join(' ')
          : norm(t.type)

        return (
          tType === mf ||
          tType.includes(mf) ||
          norm(t.title).includes(mf) ||
          norm(t.overview).includes(mf)
        )
      })
    } else {
      // fallback for short custom categories
      if (cat === 'safari') {
        list = list.filter(t =>
          norm(t.title).includes('safari') ||
          norm(t.overview).includes('safari') ||
          norm(t.type).includes('safari') ||
          norm(t.title).includes('serengeti') ||
          norm(t.title).includes('ngorongoro')
        )
      } else if (cat.includes('kili')) {
        list = list.filter(t =>
          norm(t.title).includes('kilimanjaro') ||
          norm(t.overview).includes('kilimanjaro') ||
          norm(t.type).includes('kilimanjaro')
        )
      } else if (cat === 'zanzibar') {
        list = list.filter(t =>
          norm(t.title).includes('zanzibar') ||
          norm(t.overview).includes('zanzibar') ||
          norm(t.type).includes('zanzibar')
        )
      } else {
        list = list.filter(t =>
          norm(t.title).includes(cat) ||
          norm(t.overview).includes(cat) ||
          norm(t.type).includes(cat)
        )
      }
    }
  }

  // -------- Duration filter (exact days match) --------
  if (f.duration !== '' && f.duration !== null && f.duration !== undefined) {
    const dur = Number(f.duration)

    // apply only if valid number
    if (Number.isFinite(dur) && dur > 0) {
      list = list.filter(t => {
        const days =
          t.duration != null
            ? Number(t.duration)
            : t.nights != null
              ? Number(t.nights) + 1
              : null

        if (!Number.isFinite(days)) return false
        return days === dur
      })
    }
  }

  // -------- Price range (robust) --------
  const MAX_PRICE_DEFAULT = 10000

  const rawMin = f.minPrice
  const rawMax = f.maxPrice

  // Convert safely — treat empty string / null / undefined as not-set
  const minNum = (rawMin === '' || rawMin === null || rawMin === undefined) ? NaN : Number(rawMin)
  const maxNum = (rawMax === '' || rawMax === null || rawMax === undefined) ? NaN : Number(rawMax)

  const minSet = Number.isFinite(minNum) // true if user set a number (including 0)
  const maxSet = Number.isFinite(maxNum)

  // If neither set, skip price filtering
  if (minSet || maxSet) {
    const minP = minSet ? minNum : 0
    const maxP = maxSet ? maxNum : MAX_PRICE_DEFAULT

    list = list.filter(t => {
      const p = Number(t.price ?? 0)
      // ignore tours with non-finite price values
      if (!Number.isFinite(p)) return false
      return p >= minP && p <= maxP
    })
  }

  // sorting
  switch (sortBy.value) {
    case 'price-low': list.sort((a,b) => (a.price || 0) - (b.price || 0)); break
    case 'price-high': list.sort((a,b) => (b.price || 0) - (a.price || 0)); break
    case 'duration': list.sort((a,b) => ((a.duration ?? (a.nights != null ? a.nights + 1 : 0)) - (b.duration ?? (b.nights != null ? b.nights + 1 : 0)))); break
    case 'rating': list.sort((a,b) => (b.rating || 0) - (a.rating || 0)); break
    default: break
  }

  return list
})

/* ---------- pagination / normalized display ---------- */
const displayedTours = computed(() => filteredTours.value.slice(0, displayedCount.value))
function loadMore() { displayedCount.value += toursPerPage.value }

function normalizeTour(t) {
  const nightsFromDb = (t?.nights != null) ? Number(t.nights) : null
  const daysFromDb = (t?.duration != null) ? Number(t.duration) : null
  const displayNightsVal = nightsFromDb != null ? nightsFromDb : (daysFromDb != null ? Math.max(1, daysFromDb - 1) : 6)
  const displayDaysVal = nightsFromDb != null ? nightsFromDb + 1 : (daysFromDb != null ? daysFromDb : 7)
  return { ...t, _displayNights: displayNightsVal, _displayDays: displayDaysVal, duration: displayDaysVal, nights: displayNightsVal }
}
const displayedToursNormalized = computed(() => displayedTours.value.map(t => normalizeTour(t)))

/* ---------- handlers ---------- */
function handleFilter(filters) {
  // TourFilters.vue may emit category as a short id (e.g. 'safari') or as a full type (e.g. 'Wildlife Safari')
  activeFilters.value = filters || {}
  if (filters?.category) activeCategory.value = filters.category
  displayedCount.value = toursPerPage.value
}
function selectCategory(id) { activeCategory.value = id; activeFilters.value = { ...(activeFilters.value || {}), category: id }; displayedCount.value = toursPerPage.value }
function onSearchInput() { displayedCount.value = toursPerPage.value }
function applySearch() { activeFilters.value = { ...(activeFilters.value || {}), search: searchQuery.value }; displayedCount.value = toursPerPage.value }
function resetFilters() { searchQuery.value = ''; activeCategory.value = 'all'; activeFilters.value = {}; sortBy.value = 'popular'; displayedCount.value = toursPerPage.value }
function onSortChange() { displayedCount.value = toursPerPage.value }

/* ---------- expose helpers used by template ---------- */
function getTourType(t) {
  const title = norm(t?.title)
  if (title.includes('safari') || title.includes('serengeti') || title.includes('ngorongoro')) return 'Safari'
  if (title.includes('kilimanjaro') || title.includes('kili') || title.includes('mountain')) return 'Kilimanjaro'
  if (title.includes('zanzibar') || title.includes('beach')) return 'Zanzibar'
  return 'Adventure'
}
</script>


<style scoped>
/* small styles kept from your original file */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #10b981, #059669); border-radius: 4px; }
button, a, .transition-all { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.bg-safari-pattern { /* optional */ }
</style>
