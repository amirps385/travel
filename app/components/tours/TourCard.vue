<template>
  <article class="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-amber-200">
    <!-- Image with Safari Overlay -->
    <div class="relative h-64 overflow-hidden">
      <NuxtLink :to="`/tours/${tour.slug}`" class="block h-full">
        <!-- Background Image -->
        <div 
          v-if="mainImage" 
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          :style="{ backgroundImage: `url('${mainImage}')` }"
        >
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>
          
          <!-- Safari Tree Silhouette -->
          <div class="absolute bottom-0 left-0 right-0 h-20">
            <div class="absolute bottom-0 left-1/4 w-2 h-16 bg-gray-800/50"></div>
            <div class="absolute bottom-12 left-1/4 -ml-8 w-16 h-6 bg-gray-900/50 rounded-full"></div>
          </div>
        </div>
        
        <!-- Fallback (if no image) -->
        <div v-else class="absolute inset-0 bg-linear-to-br from-emerald-900/90 to-amber-900/80 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-16 h-16 text-amber-300 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01 -2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-amber-100 font-semibold text-sm">Tanzania Adventure</span>
          </div>
        </div>

        <!-- Duration Badge -->
        <div class="absolute top-4 left-4">
          <span class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-emerald-800 border border-emerald-200 shadow-sm">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            {{ displayDuration }} days
          </span>
        </div>

        <!-- Type Badge -->
        <div class="absolute top-4 right-4 transform rotate-3">
          <span class="px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg">
            {{ getTourType(tour) }}
          </span>
        </div>

        <!-- View Overlay -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="px-4 py-2.5 bg-black/70 backdrop-blur-sm rounded-full border border-amber-300/30">
            <span class="text-white font-medium text-sm flex items-center">
              View Details
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="p-6 relative">
      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
        {{ tour.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
        {{ tour.overview || 'Experience the wild beauty of Tanzania with our expertly crafted tour.' }}
      </p>

      <!-- Highlights -->
      <div v-if="tour.highlights?.length" class="mb-5">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(highlight, idx) in tour.highlights.slice(0, 2)" 
            :key="idx"
            class="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100"
          >
            <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ parseHighlight(highlight) }}
          </span>
        </div>
      </div>

      <!-- Price and CTA -->
      <div class="flex items-center justify-between pt-5 border-t border-gray-100">
        <div>
          <div class="text-xs text-gray-500 font-medium">STARTING FROM</div>
          <div class="text-2xl font-bold text-emerald-700">
            ${{ formattedPrice }}
          </div>
          <div class="text-xs text-gray-500 mt-1">per person</div>
        </div>
        <NuxtLink
          :to="`/tours/${tour.slug}`"
          class="group/btn px-5 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center"
        >
          <span>View Tour</span>
          <svg
            class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- Decorative Bottom Border -->
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <!-- Safari Pattern Overlay -->
    <div class="absolute -top-6 -right-6 w-24 h-24 opacity-5 group-hover:opacity-20 transition-opacity">
      <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
        <path d="M50,20 C60,15 75,20 80,35 C85,50 70,65 50,80 C30,65 15,50 20,35 C25,20 40,15 50,20 Z"/>
      </svg>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tour: {
    type: Object,
    required: true
  }
})

/* -------------------------
   IMAGE / DURATION / PRICE
   ------------------------- */
const mainImage = computed(() => {
  const t = props.tour || {}
  if (t.featuredImage) return t.featuredImage
  if (Array.isArray(t.images) && t.images.length) return t.images[0]
  return '/images/placeholder.jpg'
})

const displayDuration = computed(() => {
  const t = props.tour || {}
  // prefer explicit duration (days). If only nights exist, show nights+1.
  const dur = (t.duration != null) ? Number(t.duration) : (t.nights != null ? Number(t.nights) + 1 : null)
  return Number.isFinite(dur) ? dur : 7
})

const formattedPrice = computed(() => {
  const p = Number(props.tour?.price ?? 0)
  if (!Number.isFinite(p) || p === 0) return '1,200'
  return p.toLocaleString()
})

/* -------------------------
   TOUR TYPE DETERMINATION
   ------------------------- */
/*
Strategy:
1. Prefer tour.type (string/array) or tour.category or tour.tags if present.
2. Normalize strings and check against known type labels or keywords.
3. Fall back to searching title/overview for keywords.
*/
const KNOWN_TYPES = [
  { id: 'wildlife-safari', label: 'Safari', keywords: ['safari','wildlife','serengeti','ngorongoro'] },
  { id: 'kilimanjaro-climb', label: 'Kilimanjaro', keywords: ['kilimanjaro','kili','mountain'] },
  { id: 'zanzibar-beach', label: 'Zanzibar', keywords: ['zanzibar','beach','zanzibar beach'] },
  { id: 'cultural-experience', label: 'Cultural', keywords: ['cultural','culture','community'] },
  { id: 'birdwatching', label: 'Birdwatching', keywords: ['bird','birdwatch','birdwatching'] },
  { id: 'day-trip', label: 'Day Trip', keywords: ['day trip','day-trip','daytrip'] },
  { id: 'private-tour', label: 'Private Tour', keywords: ['private','private tour'] },
  { id: 'group-departure', label: 'Group Departure', keywords: ['group','group departure','departure'] },
  { id: 'adventure-tour', label: 'Adventure', keywords: ['adventure','trek','hike','climb'] }
]

function normalize(s) {
  return (s || '').toString().toLowerCase().trim()
}

function toKeywordsArray(value) {
  if (!value && value !== 0) return []
  // array: map->string
  if (Array.isArray(value)) return value.map(v => normalize(v)).filter(Boolean)
  // object: collect likely string props
  if (typeof value === 'object') {
    const arr = []
    for (const k of ['type','category','name','title']) {
      if (value[k]) arr.push(normalize(value[k]))
    }
    return arr.filter(Boolean)
  }
  // string: split by common separators
  return normalize(String(value)).split(/[,|;/]+/).map(s => s.trim()).filter(Boolean)
}

/* main detection function */
function detectFromArray(arr) {
  const joined = arr.join(' ')
  for (const type of KNOWN_TYPES) {
    for (const kw of type.keywords) {
      if (joined.includes(kw)) return type.label
    }
  }
  return null
}

function getTourType(tour) {
  if (!tour) return 'Adventure'
  // 1) tour.type (array or string)
  const typeCandidates = toKeywordsArray(tour.type)
  if (typeCandidates.length) {
    const d = detectFromArray(typeCandidates)
    if (d) return d
    // fallback: exact match to known labels
    const joined = typeCandidates.join(' ')
    for (const kt of KNOWN_TYPES) {
      if (joined.includes(kt.label.toLowerCase())) return kt.label
      if (joined.includes(kt.id)) return kt.label
    }
  }

  // 2) tour.category or tour.tags
  const categoryCandidates = toKeywordsArray(tour.category).concat(toKeywordsArray(tour.tags))
  if (categoryCandidates.length) {
    const d = detectFromArray(categoryCandidates)
    if (d) return d
  }

  // 3) title / overview fallback
  const textCandidates = [
    normalize(tour.title),
    normalize(tour.overview),
    normalize(tour.summary),
    normalize(tour.description)
  ].filter(Boolean)
  const d = detectFromArray(textCandidates)
  if (d) return d

  // 4) last fallback: if price/duration suggests day trips vs long adventures (optional)
  // keep simple: default to Adventure
  return 'Adventure'
}

/* -------------------------
   Highlight parsing
   ------------------------- */
function parseHighlight(h) {
  if (h === null || h === undefined) return ''
  if (typeof h === 'object') {
    const title = (h.title ?? h.name ?? h.text ?? '').toString().trim()
    if (title) return title
    const desc = (h.description ?? h.desc ?? h.body ?? '').toString().trim()
    if (desc) return desc
    try {
      return JSON.stringify(h).replace(/^\{|\}$/g, '').slice(0, 80)
    } catch (e) {
      return String(h)
    }
  }
  if (typeof h === 'string') {
    const s = h.trim()
    if (!s) return ''
    if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
      try {
        const parsed = JSON.parse(s)
        if (typeof parsed === 'object' && parsed !== null) {
          return parseHighlight(parsed)
        }
      } catch (e) { /* not JSON */ }
    }
    if (s.includes('|||')) {
      const [left] = s.split('|||')
      return String(left || '').trim()
    }
    return s.replace(/\|+$/g, '').replace(/^{+|}+$/g, '').trim()
  }
  return String(h)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
