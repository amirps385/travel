<template>
  <div>
    <!-- Image Modal -->
    <div v-if="modalOpen" class="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/90"
         @click.self="closeModal">
      <button @click="closeModal"
              class="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="relative max-w-7xl w-full h-full flex items-center justify-center">
        <div class="relative w-full max-h-[85vh] flex flex-col">
          <div class="flex-1 flex items-center justify-center overflow-hidden">
            <img :src="modalImage" :alt="modalAlt"
                 class="max-w-full max-h-full object-contain rounded-lg" />
          </div>

          <div v-if="isGalleryModal && experience.gallery.length > 1"
               class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4">
            <button @click.stop="prevImage"
                    class="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors disabled:opacity-30"
                    :disabled="currentGalleryIndex <= 0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click.stop="nextImage"
                    class="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    :disabled="currentGalleryIndex >= experience.gallery.length - 1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div v-if="modalAlt" class="mt-4 text-center text-white text-sm md:text-base">
            {{ modalAlt }}
          </div>

          <div v-if="isGalleryModal && experience.gallery.length > 1"
               class="mt-2 text-center text-white/80 text-sm">
            {{ currentGalleryIndex + 1 }} / {{ experience.gallery.length }}
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="min-h-screen bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p class="mt-4 text-gray-600">Loading route...</p>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div class="text-center max-w-xl">
        <div class="text-6xl mb-4">😞</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ error.statusCode === 404 ? 'Route Not Found' : 'Error' }}</h2>
        <p class="text-gray-600 mb-6">{{ error.message || 'Something went wrong while loading the route.' }}</p>
        <NuxtLink to="/routes" class="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Back to routes</NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <main v-else class="bg-white">
      <!-- HERO -->
      <header class="relative w-full">
        <div class="h-[60vh] md:h-[72vh] lg:h-[80vh] w-full relative overflow-hidden">
          <img
            :src="experience.heroImage || experience.featuredImage || placeholderHero"
            :alt="experience.name"
            class="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            loading="lazy"
            @click="openModal(experience.heroImage || experience.featuredImage || placeholderHero, experience.name)"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>

          <div class="absolute inset-0 flex items-end pb-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="bg-white/6 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10">
                <nav class="text-sm text-white/90 mb-3" aria-label="Breadcrumb">
                  <NuxtLink to="/" class="text-white/80 hover:underline">Home</NuxtLink>
                  <span class="mx-2">/</span>
                  <NuxtLink to="/routes" class="text-white/80 hover:underline">Routes</NuxtLink>
                  <span class="mx-2">/</span>
                  <span class="font-semibold">{{ experience.name }}</span>
                </nav>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div class="lg:col-span-2">
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {{ experience.name }}
                    </h1>
                    <p class="mt-2 text-sm md:text-base text-white/90 max-w-2xl">
                      {{ experience.tagline || experience.shortDescription || '' }}
                    </p>

                    <div class="mt-4 flex flex-wrap gap-3 items-center">
                      <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white text-sm">
                        ⏱️ {{ displayDuration }}
                      </span>
                      <span v-if="experience.difficulty" class="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-white text-sm">
                        🧭 {{ experience.difficulty }}
                      </span>
                      <span v-if="experience.region" class="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-white text-sm">
                        📍 {{ experience.region }}
                      </span>
                      <span v-if="experience.successRate" class="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-white text-sm">
                        ⭐ Success: {{ experience.successRate }}%
                      </span>
                    </div>
                  </div>

                  <aside class="rounded-xl bg-white p-4 shadow-md w-full lg:w-auto border">
                    <div class="flex items-baseline justify-between">
                      <div>
                        <p class="text-xs text-gray-500">Starting from</p>
                        <div class="text-2xl font-extrabold text-amber-600">${{ priceFormatted }}</div>
                      </div>
                    </div>

                    <ul class="mt-4 space-y-2 text-sm text-gray-700">
                      <li><strong>Duration:</strong> {{ displayDuration }}</li>
                      <li v-if="experience.difficulty"><strong>Difficulty:</strong> {{ experience.difficulty }}</li>
                      <li v-if="experience.region"><strong>Region:</strong> {{ experience.region }}</li>
                    </ul>

                    <div class="mt-4 grid gap-2">
                      <button class="w-full rounded-full bg-amber-600 text-white font-semibold py-2 hover:bg-amber-700">INQUIRE NOW</button>
                      <NuxtLink to="/contact" class="w-full text-center rounded-full border border-gray-200 py-2 text-sm hover:bg-gray-50">Contact Sales</NuxtLink>
                    </div>

                    <div v-if="experience.isFeatured" class="mt-3 text-xs text-amber-600 font-semibold">Featured</div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- MAIN CONTENT AREA -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left column: itinerary + overview -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Overview / Description -->
            <section class="rounded-2xl bg-white p-6 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
              <p class="text-gray-700 whitespace-pre-line leading-relaxed">{{ experience.description }}</p>

              <div v-if="experience.highlights && experience.highlights.length" class="mt-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Highlights</h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <li v-for="(h, i) in experience.highlights" :key="i" class="text-sm text-gray-700 flex items-start gap-2">
                    <span class="mt-1">•</span> <span>{{ h }}</span>
                  </li>
                </ul>
              </div>
            </section>

            <!-- Itinerary -->
            <section v-if="sortedItinerary.length" class="rounded-2xl bg-white p-6 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Itinerary (Day by Day)</h2>
              <div class="space-y-6">
                <article
                  v-for="(day, idx) in sortedItinerary"
                  :key="idx"
                  class="group overflow-hidden rounded-2xl border border-gray-100 p-4 md:p-6"
                >
                  <div class="flex gap-4 items-start">
                    <div class="flex-none">
                      <div class="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                        Day {{ day.day || idx + 1 }}
                      </div>
                    </div>

                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-gray-900">{{ day.title || `Day ${day.day || idx + 1}` }}</h4>
                      <p class="text-gray-700 mt-2 whitespace-pre-line">{{ day.description }}</p>
                      <div v-if="day.altitude" class="mt-3 text-sm text-gray-500">Altitude: {{ day.altitude }}</div>
                    </div>

                    <div v-if="day.image" class="hidden md:block w-40 h-28 rounded-lg overflow-hidden cursor-zoom-in hover:opacity-90 transition-opacity"
                         @click="openModal(day.image, day.title)">
                      <img :src="day.image" :alt="day.title" class="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <!-- Group climbs -->
            <section class="rounded-2xl bg-white p-6 shadow-sm" v-if="experience.groupClimbs && experience.groupClimbs.length">
              <h2 class="text-2xl font-bold text-gray-900 mb-3">Upcoming Group Climbs</h2>
              <div class="space-y-3">
                <div v-for="(g, i) in experience.groupClimbs" :key="i" class="flex items-center justify-between gap-4 border rounded-lg p-3">
                  <div>
                    <div class="text-sm text-gray-600">{{ formatDate(g.date) }}</div>
                    <div class="text-sm font-semibold text-gray-900">{{ g.days }} days • {{ g.groupSize }} pax</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold text-amber-600">${{ g.price }}</div>
                    <div class="text-xs text-gray-500">{{ g.spotsLeft }} spots left</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- FAQs -->
            <section v-if="experience.faqs && experience.faqs.length" class="rounded-2xl bg-white p-6 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div class="space-y-3">
                <div v-for="(faq, i) in experience.faqs" :key="i" class="border rounded-lg overflow-hidden">
                  <button
                    @click="toggleFaq(i)"
                    class="w-full flex items-center justify-between p-4 text-left"
                    :aria-expanded="openFaqs[i] ? 'true' : 'false'"
                  >
                    <span class="font-semibold text-gray-900">{{ faq.question }}</span>
                    <span class="text-2xl text-amber-600">{{ openFaqs[i] ? '−' : '+' }}</span>
                  </button>
                  <div v-if="openFaqs[i]" class="px-4 pb-4 text-gray-700 whitespace-pre-line">
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right column: stats, gallery, included -->
          <aside class="space-y-6">
            <!-- Stats -->
            <section class="rounded-2xl bg-white p-5 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Quick Facts</h3>

              <dl class="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <dt class="text-xs text-gray-500">Start Altitude</dt>
                  <dd class="font-medium">
                    {{ displayStatValue(experience.stats?.startingAltitude?.value) }}
                    <div v-if="experience.stats?.startingAltitude?.detail" class="mt-1 text-xs text-gray-500">
                      Detail: {{ experience.stats.startingAltitude.detail }}
                    </div>
                  </dd>
                </div>

                <div>
                  <dt class="text-xs text-gray-500">Max Altitude</dt>
                  <dd class="font-medium">
                    {{ displayStatValue(experience.stats?.maxAltitude?.value) }}
                    <div v-if="experience.stats?.maxAltitude?.detail" class="mt-1 text-xs text-gray-500">
                      Detail: {{ experience.stats.maxAltitude.detail }}
                    </div>
                  </dd>
                </div>

                <div>
                  <dt class="text-xs text-gray-500">Total Distance</dt>
                  <dd class="font-medium">
                    {{ displayStatValue(experience.stats?.totalDistance?.value) }}
                    <div v-if="experience.stats?.totalDistance?.detail" class="mt-1 text-xs text-gray-500">
                      Detail: {{ experience.stats.totalDistance.detail }}
                    </div>
                  </dd>
                </div>

                <div>
                  <dt class="text-xs text-gray-500">Best Season</dt>
                  <dd class="font-medium">
                    {{ formatBestSeasonDisplay(experience.stats?.bestSeason) }}
                    <div v-if="extractBestSeasonDetail(experience.stats?.bestSeason)" class="mt-1 text-xs text-gray-500">
                      Note: {{ extractBestSeasonDetail(experience.stats?.bestSeason) }}
                    </div>
                  </dd>
                </div>

                <div class="col-span-2">
                  <dt class="text-xs text-gray-500">Acclimatization</dt>
                  <dd class="font-medium">
                    {{ displayStatValue(experience.stats?.acclimatization?.value) }}
                    <div v-if="experience.stats?.acclimatization?.detail" class="mt-1 text-xs text-gray-500">
                      Detail: {{ experience.stats.acclimatization.detail }}
                    </div>
                  </dd>
                </div>
              </dl>
            </section>

            <!-- What's Included -->
            <section class="rounded-2xl bg-white p-5 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">What's Included</h3>
              <div v-if="hasWhatsIncluded">
                <ul class="text-sm text-gray-700 space-y-2">
                  <li v-for="(inc, i) in experience.whatsIncluded.included" :key="'inc-' + i" class="flex items-start gap-3">
                    <span class="text-amber-600 mt-1">✓</span><span>{{ inc }}</span>
                  </li>
                </ul>
                <div v-if="experience.whatsIncluded.notIncluded && experience.whatsIncluded.notIncluded.length" class="mt-4">
                  <h4 class="text-sm font-semibold text-gray-800 mb-2">Not Included</h4>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li v-for="(n, k) in experience.whatsIncluded.notIncluded" :key="'not-' + k">— {{ n }}</li>
                  </ul>
                </div>
                <div v-if="experience.whatsIncluded.note" class="mt-3 text-xs text-gray-500">
                  <strong>Note:</strong> {{ experience.whatsIncluded.note }}
                </div>
              </div>
              <div v-else class="text-sm text-gray-600">Inclusions not specified.</div>
            </section>

            <!-- Gallery -->
            <section v-if="experience.gallery && experience.gallery.length" class="rounded-2xl bg-white p-5 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Gallery</h3>
              <div class="grid grid-cols-3 gap-2">
                <div v-for="(img, i) in experience.gallery.slice(0, 9)" :key="i"
                     class="h-20 overflow-hidden rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity group relative"
                     @click="openGalleryModal(img, i)">
                  <img :src="img" :alt="experience.name + ' image ' + (i+1)"
                       class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" loading="lazy" />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
              </div>
              <div v-if="experience.gallery.length > 9" class="mt-3 text-sm text-gray-600">+ {{ experience.gallery.length - 9 }} more images</div>
            </section>
          </aside>
        </div>

        <!-- Footer CTA -->
        <div class="mt-12 mb-24 rounded-2xl bg-linear-to-r from-amber-600 to-amber-500 text-white p-8 text-center shadow-lg">
          <h3 class="text-2xl font-bold">Like this route?</h3>
          <p class="mt-2">Get a personalized quote or ask our experts for advice.</p>
          <div class="mt-4 flex items-center justify-center gap-4">
            <button class="rounded-full bg-white text-amber-600 px-6 py-2 font-semibold">Request Quote</button>
            <NuxtLink to="/contact" class="rounded-full border border-white/30 px-6 py-2">Contact Us</NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead, useSeoMeta } from '#imports'

const route = useRoute()
const slug = route.params.slug

const experience = ref(null)
const loading = ref(true)
const error = ref(null)
const openFaqs = ref({})

const modalOpen = ref(false)
const modalImage = ref('')
const modalAlt = ref('')
const isGalleryModal = ref(false)
const currentGalleryIndex = ref(0)

const placeholderHero = '/images/placeholder-hero.jpg'

// Helpers / UI computed
const priceFormatted = computed(() => {
  if (!experience.value) return '—'
  return experience.value.startingPrice || experience.value.priceFrom || (experience.value.startingPrice === 0 ? '0' : '—')
})

const displayDuration = computed(() => {
  if (!experience.value) return ''
  const min = experience.value.durationMin
  const max = experience.value.durationMax
  if (min && max) {
    return min === max ? `${min} Day${min > 1 ? 's' : ''}` : `${min}–${max} Days`
  }
  if (min) return `${min} Day${min > 1 ? 's' : ''}`
  if (experience.value.duration) return experience.value.duration
  return 'Duration not specified'
})

const hasWhatsIncluded = computed(() => {
  return !!(experience.value && experience.value.whatsIncluded && ( (experience.value.whatsIncluded.included && experience.value.whatsIncluded.included.length) || (experience.value.whatsIncluded.notIncluded && experience.value.whatsIncluded.notIncluded.length) ))
})

const sortedItinerary = computed(() => {
  if (!experience.value?.itinerary) return []
  return [...experience.value.itinerary].sort((a, b) => ( (a.day || 0) - (b.day || 0) ))
})

function formatDate(d) {
  if (!d) return ''
  try {
    const dt = new Date(d)
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(dt)
  } catch {
    return String(d)
  }
}

function toggleFaq(i) {
  openFaqs.value[i] = !openFaqs.value[i]
}

// modal
function openModal(imageSrc, alt = '') {
  modalImage.value = imageSrc
  modalAlt.value = alt
  isGalleryModal.value = false
  modalOpen.value = true
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

function openGalleryModal(imageSrc, index) {
  modalImage.value = imageSrc
  modalAlt.value = `${experience.value.name} - Image ${index + 1}`
  isGalleryModal.value = true
  currentGalleryIndex.value = index
  modalOpen.value = true
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

function closeModal() {
  modalOpen.value = false
  isGalleryModal.value = false
  currentGalleryIndex.value = 0
  document.body.style.overflow = 'auto'
  document.documentElement.style.overflow = 'auto'
}

function nextImage() {
  if (experience.value?.gallery && currentGalleryIndex.value < experience.value.gallery.length - 1) {
    currentGalleryIndex.value++
    modalImage.value = experience.value.gallery[currentGalleryIndex.value]
    modalAlt.value = `${experience.value.name} - Image ${currentGalleryIndex.value + 1}`
  }
}

function prevImage() {
  if (currentGalleryIndex.value > 0) {
    currentGalleryIndex.value--
    modalImage.value = experience.value.gallery[currentGalleryIndex.value]
    modalAlt.value = `${experience.value.name} - Image ${currentGalleryIndex.value + 1}`
  }
}

function handleKeydown(event) {
  if (!modalOpen.value) return
  switch(event.key) {
    case 'Escape': closeModal(); break
    case 'ArrowRight': if (isGalleryModal.value) nextImage(); break
    case 'ArrowLeft': if (isGalleryModal.value) prevImage(); break
  }
}

/**
 * Normalizes and ensures there are upcoming group climbs for UI.
 * - supports different field names
 * - moves past/invalid dates into the future
 * - if empty and running on localhost, generate mock climbs
 */
function ensureGroupClimbs(raw) {
  // Accept multiple property names
  let climbs = raw?.groupClimbs || raw?.group_climbs || raw?.groupEvents || raw?.group_climbs || []

  // If climbs is not an array, try to coerce
  if (!Array.isArray(climbs)) {
    climbs = climbs ? [climbs] : []
  }

  const now = new Date()
  const normalized = climbs.map((g, idx) => {
    // support multiple possible date keys
    const origDate = g?.date || g?.startDate || g?.start_date || g?.when || null
    let dt = null
    if (origDate) {
      try {
        dt = new Date(origDate)
        if (isNaN(dt.getTime())) dt = null
      } catch { dt = null }
    }

    // If invalid/past, set to future spaced dates
    if (!dt || dt <= now) {
      const future = new Date(now)
      future.setDate(now.getDate() + 7 * (idx + 1)) // 7 days x index spacing
      return {
        ...g,
        date: future.toISOString()
      }
    }

    // normalized ISO
    return {
      ...g,
      date: dt.toISOString()
    }
  })

  // If normalized is empty and we're on localhost, generate 3 mock climbs for dev
  if ((!normalized || normalized.length === 0) && (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))) {
    const mock = []
    for (let i = 1; i <= 3; i++) {
      const d = new Date(now)
      d.setDate(now.getDate() + 7 * i)
      mock.push({
        id: `mock-${i}`,
        date: d.toISOString(),
        days: (raw?.defaultDays) || 7,
        groupSize: (raw?.defaultGroupSize) || 8,
        price: (raw?.defaultPrice) || 1200,
        spotsLeft: (raw?.defaultSpotsLeft) || 8,
        title: raw?.name ? `${raw.name} - Mock Group ${i}` : `Mock Group ${i}`
      })
    }
    console.debug('[routes/slug] generated mock group climbs (localhost)', mock)
    return mock
  }

  return normalized
}

async function fetchExperience(slugParam) {
  loading.value = true
  error.value = null
  try {
    const res = await $fetch(`/api/routes/${encodeURIComponent(slugParam)}`)
    if (!res || !res.success) {
      throw createError({ statusCode: 404, message: 'Route not found' })
    }

    // attach raw data
    experience.value = res.data

    // Debug: log returned group climb fields so you can inspect in console
    console.debug('[routes/slug] API groupClimbs keys:', {
      has_groupClimbs: Array.isArray(res.data?.groupClimbs),
      has_group_climbs: Array.isArray(res.data?.group_climbs),
      has_groupEvents: Array.isArray(res.data?.groupEvents),
      returned: res.data?.groupClimbs || res.data?.group_climbs || res.data?.groupEvents || null
    })

    // initialize FAQs open state
    openFaqs.value = {}
    if (Array.isArray(experience.value.faqs)) {
      experience.value.faqs.forEach((f, idx) => (openFaqs.value[idx] = idx === 0))
    }

    // ENSURE group climbs exist and are upcoming
    experience.value.groupClimbs = ensureGroupClimbs(experience.value)

    // finally sort by date ascending
    if (Array.isArray(experience.value.groupClimbs)) {
      experience.value.groupClimbs.sort((a, b) => {
        try { return new Date(a.date) - new Date(b.date) } catch { return 0 }
      })
    }

    console.debug('[routes/slug] final groupClimbs used on page', experience.value.groupClimbs || [])

    // set meta/seo
    const title = experience.value.seo?.title || experience.value.name || 'Route'
    const desc = experience.value.seo?.description || experience.value.shortDescription || (experience.value.description || '').slice(0, 160)
    useHead({
      title,
      meta: [
        { name: 'description', content: desc },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:image', content: experience.value.heroImage || experience.value.featuredImage || '' },
        { property: 'og:type', content: 'article' }
      ]
    })
    useSeoMeta({
      ogTitle: title,
      ogDescription: desc,
      ogImage: experience.value.heroImage || experience.value.featuredImage || ''
    })
  } catch (err) {
    console.error('Failed to load route', err)
    error.value = err
    experience.value = null
  } finally {
    loading.value = false
  }
}

// Utility & helpers
function displayStatValue(val) { if (val === undefined || val === null || String(val).trim() === '') return '—'; return String(val) }
function formatBestSeasonDisplay(bestSeason) {
  if (!bestSeason) return 'Year-round'
  if (typeof bestSeason === 'object') {
    if (bestSeason.from || bestSeason.to) {
      const from = bestSeason.from || ''
      const to = bestSeason.to || ''
      if (from.toLowerCase().includes('year') || to.toLowerCase().includes('year')) return 'Year-round'
      if (from && to) return `${from}${from === to ? '' : ' – ' + to}`
      return (from || to) || 'Year-round'
    }
    if (bestSeason.value) return String(bestSeason.value)
  }
  if (typeof bestSeason === 'string') {
    const s = bestSeason.trim()
    if (!s) return 'Year-round'
    return s
  }
  return 'Year-round'
}
function extractBestSeasonDetail(bestSeason) { if (!bestSeason) return ''; if (typeof bestSeason === 'object') return bestSeason.detail || ''; return '' }

onMounted(() => {
  const s = route.params.slug
  if (s) fetchExperience(s)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (modalOpen.value) {
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
  }
})

watch(() => route.params.slug, (val) => { if (val) fetchExperience(val) })
</script>

<style scoped>
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
main { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
@media (min-width: 1024px) { header .bg-white\/6 { padding: 2rem; } }
.fixed { animation: fadeIn 0.2s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
