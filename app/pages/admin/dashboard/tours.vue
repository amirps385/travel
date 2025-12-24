<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">Tours</h2>
            <p class="text-xs md:text-sm text-slate-500">Manage safari packages, pricing, images, and itineraries.</p>
          </div>
          <button class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 text-white px-4 py-2" @click="openCreateModal">
            <span class="text-lg">＋</span> Add Tour
          </button>
        </div>

        <!-- Table -->
        <div class="rounded-2xl border overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="px-4 py-3">Tour Name</th>
                <th class="px-4 py-3">Nights</th>
                <th class="px-4 py-3">Days</th>
                <th class="px-4 py-3">Price (USD)</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Images</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tour in tours" :key="tour._id" class="border-b last:border-b-0 hover:bg-slate-50/70">
                <td class="px-4 py-3 text-slate-900 font-medium">
                  <div class="flex items-center gap-3">
                    <div v-if="tour.featuredImage" class="w-14 h-10 overflow-hidden rounded-md">
                      <img :src="tour.featuredImage" alt="featured" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      {{ tour.title }}
                      <div class="text-xs text-slate-500">{{ tour.slug }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-slate-700">{{ tour.nights ?? (tour.duration ? (tour.duration - 1) : '—') }}</td>
                <td class="px-4 py-3 text-slate-700">{{ tour.duration ?? (tour.nights ? (tour.nights + 1) : '—') }}</td>
                <td class="px-4 py-3 text-slate-700">{{ tour.price ? '$' + tour.price : '—' }}</td>
                <td class="px-4 py-3">
                  <span :class="tour.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'" class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
                    {{ tour.isActive ? 'Active' : 'Draft' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <span v-if="tour.images?.length" class="text-xs text-slate-600">{{ tour.images.length }} images</span>
                  <span v-else class="text-xs text-slate-400">No images</span>
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="inline-flex items-center gap-2">
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100"
                      @click.stop="openEditModal(tour)"
                      aria-label="Edit tour"
                    >✎</button>
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600"
                      @click="deleteTour(tour._id)"
                    >🗑</button>
                  </div>
                </td>
              </tr>

              <tr v-if="!tours.length">
                <td colspan="7" class="px-4 py-6 text-center text-xs text-slate-500">No tours created yet. Click “Add Tour”.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal: Add / Edit Tour -->
      <transition name="fade">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div class="max-w-4xl w-full bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div class="px-6 py-4 border-b flex items-center justify-between">
              <div>
                <h2 class="text-base md:text-lg font-semibold text-slate-900">{{ isEditing ? 'Edit Tour' : 'Add New Tour' }}</h2>
                <p class="text-xs text-slate-500">Create or update safari package details.</p>
              </div>
              <button type="button" class="p-2 rounded-lg hover:bg-slate-100" @click="closeModal">✕</button>
            </div>

            <div class="px-6 py-5 space-y-4 text-xs md:text-sm">
              <!-- Title / Slug -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Tour Title</label>
                  <input v-model="form.title" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="7-Day Serengeti Migration Safari" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Slug (URL)</label>
                  <input v-model="form.slug" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="7-day-serengeti-migration-safari" />
                </div>
              </div>

              <!-- Images -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Featured image</label>
                <div class="flex items-center gap-3">
                  <div v-if="form.featuredImage" class="w-28 h-16 overflow-hidden rounded-md border">
                    <img :src="form.featuredImage" alt="featured" class="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <input type="file" accept="image/*" @change="onFeaturedImageSelected" />
                    <p class="text-[11px] text-slate-400 mt-1">Recommended size: 1600×900</p>
                  </div>
                  <div v-if="isUploading" class="text-xs text-slate-500">Uploading…</div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Gallery images</label>
                <div class="flex items-center gap-3 mb-2">
                  <input type="file" accept="image/*" multiple @change="onGalleryImagesSelected" />
                  <button v-if="form.images && form.images.length" type="button" class="rounded-lg px-3 py-1 text-xs border bg-white hover:bg-slate-50" @click="clearGallery">Clear gallery</button>
                </div>
                <div class="flex gap-2 flex-wrap">
                  <div v-for="(img, idx) in form.images" :key="idx" class="relative w-24 h-16 rounded overflow-hidden border">
                    <img :src="img" class="w-full h-full object-cover" />
                    <button @click="removeGalleryImage(idx)" type="button" class="absolute top-1 right-1 bg-white/80 rounded px-1 text-xs">✕</button>
                  </div>
                </div>
              </div>

              <!-- Price / Nights / Duration -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Price (USD)</label>
                  <input type="number" v-model.number="form.price" class="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Nights</label>
                  <input type="number" v-model.number="form.nights" class="w-full border rounded-lg px-3 py-2" />
                  <p class="text-[11px] text-slate-400 mt-1">Days will be saved as <strong>nights + 1</strong>.</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Duration (Days)</label>
                  <input type="number" v-model.number="form.duration" class="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>

              <!-- Overview -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Overview</label>
                <textarea v-model="form.overview" rows="3" class="w-full border rounded-lg px-3 py-2"></textarea>
              </div>

              <!-- Type / Difficulty / Age Range -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Tour Type</label>
                  <select v-model="form.type" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Select type</option>
                    <option v-for="opt in typeOptions" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Difficulty</label>
                  <select v-model="form.difficulty" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Select difficulty</option>
                    <option v-for="opt in difficultyOptions" :key="opt" :value="opt">{{ opt }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Age Range</label>
                  <select v-model="form.ageRange" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Select age range</option>
                    <option v-for="opt in ageRangeOptions" :key="opt" :value="opt">{{ opt }}</option>
                    <option value="custom">Custom (type below)</option>
                  </select>
                  <input v-if="form.ageRange === 'custom'" v-model="customAgeRange" class="w-full border rounded-lg px-3 py-2 mt-2" placeholder="e.g. 12-70 years" />
                </div>
              </div>

              <!-- Best Time (month range) & Group size -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Best Time From</label>
                  <select v-model="bestTimeFrom" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Any</option>
                    <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Best Time To</label>
                  <select v-model="bestTimeTo" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Any</option>
                    <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Group Size Min</label>
                  <select v-model.number="groupMin" class="w-full border rounded-lg px-3 py-2">
                    <option v-for="n in groupSizeOptions" :key="'min'+n" :value="n">{{ n }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Group Size Max</label>
                  <select v-model.number="groupMax" class="w-full border rounded-lg px-3 py-2">
                    <option v-for="n in groupSizeOptions" :key="'max'+n" :value="n">{{ n }}</option>
                  </select>
                </div>
              </div>

              <!-- Key Locations (tag input + suggestions) -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Key Locations</label>
                <div class="flex gap-2 flex-wrap mb-2">
                  <span v-for="(loc, i) in form.keyLocations" :key="loc + i" class="inline-flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border">
                    {{ loc }} <button @click="removeKeyLocation(i)" type="button" class="ml-2 text-emerald-700">✕</button>
                  </span>
                </div>
                <input
                  v-model="keyLocationInput"
                  @keydown.enter.prevent="addKeyLocation"
                  @input="filterLocationSuggestions"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2"
                  placeholder="Type location and press Enter (suggestions will appear)"
                />
                <div v-if="locationSuggestionsFiltered.length" class="mt-2 grid grid-cols-3 gap-2">
                  <button v-for="s in locationSuggestionsFiltered" :key="s" @click="addKeyLocationFromSuggestion(s)" type="button" class="text-xs py-1 px-2 border rounded text-slate-700 bg-white hover:bg-emerald-50">{{ s }}</button>
                </div>
              </div>

              <!-- Highlights (single area: title + description per highlight) -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-2">Highlights</label>

                <div class="space-y-3">
                  <div v-for="(h, i) in form.highlights" :key="i" class="p-3 rounded-lg border bg-amber-50 border-amber-100">
                    <div class="flex justify-between items-start gap-2">
                      <div class="w-full">
                        <div class="flex gap-2">
                          <input v-model="h.title"
                                 @input="filterHighlightSuggestions(i)"
                                 placeholder="Highlight title (required)"
                                 class="w-full border rounded px-3 py-2 text-sm" />
                          <button type="button" @click="removeHighlight(i)" class="text-amber-700 px-2 py-1 rounded hover:bg-amber-100">✕</button>
                        </div>
                        <textarea v-model="h.description" rows="2" placeholder="Short description (optional)" class="w-full border rounded px-3 py-2 mt-2 text-sm"></textarea>
                      </div>
                    </div>

                    <!-- suggestions for the title -->
                    <div v-if="highlightSuggestionsFilteredByIndex[i] && highlightSuggestionsFilteredByIndex[i].length" class="mt-2 grid grid-cols-3 gap-2">
                      <button
                        v-for="s in highlightSuggestionsFilteredByIndex[i]"
                        :key="s"
                        type="button"
                        class="text-xs py-1 px-2 border rounded bg-white hover:bg-amber-50 text-amber-700"
                        @click="useHighlightSuggestion(i, s)"
                      >{{ s }}</button>
                    </div>
                  </div>

                  <div>
                    <div class="flex gap-2">
                      <!-- Removed quick text input as requested; only Add button -->
                      <button type="button" @click="addEmptyHighlight" class="px-4 py-2 bg-amber-500 text-white rounded-lg">Add Highlight</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Activities tags (global suggestions) -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Activities</label>
                <div class="flex gap-2 flex-wrap mb-2">
                  <span v-for="(a, i) in form.activities" :key="a + i" class="inline-flex items-center bg-sky-50 text-sky-700 px-3 py-1 rounded-full border">
                    {{ a }} <button @click="removeActivity(i)" type="button" class="ml-2 text-sky-700">✕</button>
                  </span>
                </div>
                <input
                  v-model="activityInput"
                  @keydown.enter.prevent="addActivity"
                  @input="filterActivitySuggestions"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2"
                  placeholder="Type activity and press Enter"
                />
                <div v-if="activitySuggestionsFiltered.length" class="mt-2 grid grid-cols-4 gap-2">
                  <button v-for="s in activitySuggestionsFiltered" :key="s" @click="addActivityFromSuggestion(s)" type="button" class="text-xs py-1 px-2 border rounded text-slate-700 bg-white hover:bg-sky-50">{{ s }}</button>
                </div>
              </div>

              <!-- Itinerary builder -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Itinerary (optional)</label>
                <div class="space-y-3">
                  <div v-for="(day, idx) in form.itinerary" :key="idx" class="p-3 border rounded">
                    <div class="flex justify-between items-center mb-2">
                      <div class="text-sm font-semibold">Day {{ idx + 1 }}</div>
                      <div class="flex gap-2">
                        <button type="button" @click="removeItineraryDay(idx)" class="text-xs px-2 py-1 border rounded">Remove</button>
                      </div>
                    </div>
                    <input v-model="day.title" placeholder="Title (e.g. Arrival in Arusha)" class="w-full border rounded px-2 py-1 mb-2" />
                    <textarea v-model="day.description" rows="2" class="w-full border rounded px-2 py-1" placeholder="Description"></textarea>
                    <div class="mt-2 text-xs text-slate-500">Activities for this day (add one-by-one)</div>
                    <div class="flex gap-2 mt-2">
                      <input v-model="day.activitiesInput" @keydown.enter.prevent="pushDayActivities(idx)" @input="filterItineraryActivitySuggestions(idx)" placeholder="Type activity then press Enter" class="w-full border rounded px-2 py-1" />
                      <button type="button" @click="pushDayActivities(idx)" class="px-3 py-1 border rounded bg-emerald-50">Add</button>
                    </div>

                    <div v-if="itineraryActivitySuggestions[idx] && itineraryActivitySuggestions[idx].length" class="mt-2 flex gap-2 flex-wrap">
                      <button v-for="s in itineraryActivitySuggestions[idx]" :key="s" type="button" class="px-2 py-1 bg-white border rounded text-xs hover:bg-emerald-50" @click="useItineraryActivitySuggestion(idx, s)">{{ s }}</button>
                    </div>

                    <div class="flex gap-2 mt-2 flex-wrap">
                      <span v-for="(act, aidx) in day.activities" :key="act + aidx" class="px-2 py-0.5 bg-emerald-50 rounded text-emerald-700 text-xs inline-flex items-center">
                        {{ act }} <button @click="removeDayActivity(idx, aidx)" type="button" class="ml-1 text-emerald-700">✕</button>
                      </span>
                    </div>
                  </div>

                  <div>
                    <button @click="addItineraryDay" type="button" class="px-4 py-2 border rounded bg-white hover:bg-emerald-50 text-sm">+ Add day</button>
                  </div>
                </div>
              </div>

              <!-- Active toggle and error -->
              <div class="flex items-center gap-3">
                <input type="checkbox" v-model="form.isActive" />
                <span class="text-sm text-slate-700">Active tour</span>
              </div>
              <p v-if="error" class="text-[11px] text-rose-600">{{ error }}</p>
            </div>

            <div class="px-6 py-4 border-t flex items-center justify-end gap-2">
              <button type="button" class="rounded-lg px-4 py-2 border bg-white hover:bg-slate-100" @click="closeModal">Cancel</button>
              <button type="button" class="rounded-lg px-4 py-2 text-white bg-emerald-700" :disabled="saving || isUploading" @click="saveTour">
                {{ saving ? 'Saving…' : isEditing ? 'Save changes' : 'Create Tour' }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

definePageMeta({ layout: 'dashboard', title: 'Dashboard - Tours' })

/* ---------- state ---------- */
const tours = ref([])
const showModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const error = ref('')
const isUploading = ref(false)

// form aligned with your backend Tour model
const form = ref({
  _id: null,
  title: '',
  slug: '',
  overview: '',
  price: 0,
  nights: 1,
  duration: 2,
  highlights: [],
  activities: [],
  keyLocations: [],
  featuredImage: '',
  images: [],
  isActive: true,
  type: '',
  difficulty: '',
  bestTime: '',
  groupSize: { min: 2, max: 12 },
  ageRange: '',
  itinerary: []
})

// inputs & suggestion filters
const keyLocationInput = ref('')
const highlightInput = ref('')
const activityInput = ref('')
const customAgeRange = ref('')

const bestTimeFrom = ref('')
const bestTimeTo = ref('')
const groupMin = ref(2)
const groupMax = ref(12)

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const groupSizeOptions = Array.from({ length: 30 }, (_, i) => i + 1)

// dropdown options (competitor-inspired + extras)
const typeOptions = ['Wildlife Safari','Kilimanjaro Climb','Zanzibar Beach','Cultural Experience','Birdwatching','Day Trip','Private Tour','Group Departure','Adventure Tour']
const difficultyOptions = ['Easy','Moderate','Challenging','Strenuous']
const ageRangeOptions = ['All ages','12-70 years','18-65 years','16-60 years']

// suggestions from server
const suggestions = ref({
  highlights: [],
  activities: [],
  keyLocations: [],
  types: [],
  difficulties: []
})

// filtered suggestion lists for UI
const locationSuggestionsFiltered = ref([])
const highlightSuggestionsFiltered = ref([])
const highlightSuggestionsFilteredByIndex = reactive({}) // keyed by highlight index
const activitySuggestionsFiltered = ref([])

// itinerary per-day suggestions
const itineraryActivitySuggestions = reactive({}) // keyed by day idx

/* ---------- helpers & lifecycle ---------- */

function resetForm() {
  form.value = {
    _id: null,
    title: '',
    slug: '',
    overview: '',
    price: 0,
    nights: 1,
    duration: 2,
    highlights: [{ title: '', description: '' }],
    activities: [],
    keyLocations: [],
    featuredImage: '',
    images: [],
    isActive: true,
    type: '',
    difficulty: '',
    bestTime: '',
    groupSize: { min: 2, max: 12 },
    ageRange: '',
    itinerary: []
  }
  bestTimeFrom.value = ''
  bestTimeTo.value = ''
  groupMin.value = 2
  groupMax.value = 12
  keyLocationInput.value = ''
  highlightInput.value = ''
  activityInput.value = ''
  customAgeRange.value = ''
  error.value = ''
  // reset suggestion trackers
  Object.keys(highlightSuggestionsFilteredByIndex).forEach(k => delete highlightSuggestionsFilteredByIndex[k])
  Object.keys(itineraryActivitySuggestions).forEach(k => delete itineraryActivitySuggestions[k])
}

function openCreateModal() {
  resetForm()
  isEditing.value = false
  showModal.value = true
}

async function openEditModal(t) {
  try {
    let tourObj = null

    if (!t) {
      console.warn('openEditModal called without tour param')
      return
    }

    if (typeof t === 'string') {
      // try local
      tourObj = tours.value.find(x => x._id === t || x.slug === t) || null
      if (!tourObj) {
        try {
          const res = await $fetch(`/api/tours/${t}`).catch(() => null)
          tourObj = (res && (res.data ?? res)) || null
        } catch (e) {
          console.warn('failed to fetch tour by slug/id', e)
        }
      }
    } else if (typeof t === 'object') {
      tourObj = t
    }

    if (!tourObj) {
      alert('Unable to find the tour to edit.')
      return
    }

    // deep clone to avoid mutating array
    const cloned = JSON.parse(JSON.stringify(tourObj || {}))

    // Normalize arrays & itinerary structure — ensure day number present
    cloned.highlights = cloned.highlights || []
    cloned.activities = cloned.activities || []
    cloned.keyLocations = cloned.keyLocations || []
    cloned.itinerary = (cloned.itinerary || []).map((d, idx) => {
      const safe = d || {}
      return {
        day: Number(safe.day ?? (idx + 1)),
        title: safe.title ?? `Day ${idx + 1}`,
        description: safe.description ?? '',
        activities: Array.isArray(safe.activities) ? safe.activities : (safe.activities ? String(safe.activities).split(',').map(s=>s.trim()).filter(Boolean) : []),
        activitiesInput: ''
      }
    })

    // normalize highlights to objects {title, description}
    cloned.highlights = (cloned.highlights || []).map(h => {
      if (!h) return { title: '', description: '' }
      if (typeof h === 'string') {
        const str = h.trim()
        if (str.startsWith('{') && str.endsWith('}')) {
          try {
            const parsed = JSON.parse(str)
            return {
              title: String(parsed.title ?? parsed.text ?? parsed.name ?? '').trim(),
              description: String(parsed.description ?? parsed.desc ?? parsed.body ?? '').trim()
            }
          } catch (e) { /* ignore */ }
        }
        return { title: str, description: '' }
      }
      return {
        title: String(h.title ?? h.text ?? h.name ?? '').trim(),
        description: String(h.description ?? h.desc ?? h.body ?? '').trim()
      }
    }).filter(h => h.title || h.description)

    if (!cloned.highlights.length) cloned.highlights = [{ title: '', description: '' }]

    // pre-populate suggestion filters for existing highlights
    cloned.highlights.forEach((_, idx) => {
      highlightSuggestionsFilteredByIndex[idx] = []
    })

    // parse bestTime into two selects if possible
    if (cloned.bestTime && typeof cloned.bestTime === 'string' && cloned.bestTime.includes('-')) {
      const parts = cloned.bestTime.split('-').map(s => s.trim())
      bestTimeFrom.value = parts[0] || ''
      bestTimeTo.value = parts[1] || ''
    } else {
      bestTimeFrom.value = (cloned.bestTime && typeof cloned.bestTime === 'string' && months.includes(cloned.bestTime)) ? cloned.bestTime : ''
      bestTimeTo.value = ''
    }

    groupMin.value = cloned.groupSize?.min ?? 2
    groupMax.value = cloned.groupSize?.max ?? 12

    if (!ageRangeOptions.includes(cloned.ageRange) && cloned.ageRange) {
      customAgeRange.value = cloned.ageRange
      cloned.ageRange = 'custom'
    } else {
      customAgeRange.value = ''
    }

    form.value = cloned
    isEditing.value = true
    showModal.value = true
  } catch (err) {
    console.error('openEditModal error:', err)
    alert('Failed to open edit modal — see console for details.')
  }
}

function closeModal() {
  showModal.value = false
}

/* ---------- load data ---------- */

async function loadTours() {
  try {
    const res = await $fetch('/api/tours').catch(e => { console.error('fetch /api/tours failed', e); throw e })
    if (!res) { tours.value = []; return }
    if (Array.isArray(res)) tours.value = res
    else if (res && 'data' in res && Array.isArray(res.data)) tours.value = res.data
    else {
      const arr = Object.values(res).find(v => Array.isArray(v))
      tours.value = arr || []
      console.warn('GET /api/tours returned unexpected shape, extracted array if any', res)
    }
  } catch (err) {
    console.error('Failed to load tours', err)
    tours.value = []
  }
}

async function loadSuggestions() {
  try {
    const res = await $fetch('/api/tours/suggestions').catch(e => { console.warn('suggestions fetch failed', e); return null })
    const payload = res?.data ?? res
    if (!payload) return
    suggestions.value.highlights = Array.isArray(payload.highlights) ? payload.highlights : (payload.highlights ? [payload.highlights].flat() : [])
    suggestions.value.activities = Array.isArray(payload.activities) ? payload.activities : (payload.activities ? [payload.activities].flat() : [])
    suggestions.value.keyLocations = Array.isArray(payload.keyLocations) ? payload.keyLocations : (payload.keyLocations ? [payload.keyLocations].flat() : [])
    suggestions.value.types = Array.isArray(payload.types) ? payload.types : typeOptions
    suggestions.value.difficulties = Array.isArray(payload.difficulties) ? payload.difficulties : difficultyOptions
  } catch (err) {
    console.warn('Failed to load suggestions', err)
  }
}

/* ---------- image uploads ---------- */

async function uploadImageFile(file) {
  if (!file) return null
  isUploading.value = true
  try {
    const fd = new FormData()
    fd.append('image', file)
    const r = await fetch('/api/tours/upload-image', { method: 'POST', body: fd })
    const j = await r.json()
    if (j?.success && j.url) return j.url
    if (j?.url) return j.url
    console.warn('unexpected upload response', j)
    return null
  } catch (e) {
    console.error('upload error', e)
    return null
  } finally {
    isUploading.value = false
  }
}
async function onFeaturedImageSelected(e) {
  const f = e.target.files?.[0]; if (!f) return
  const url = await uploadImageFile(f)
  if (url) form.value.featuredImage = url
  e.target.value = ''
}
async function onGalleryImagesSelected(e) {
  const files = Array.from(e.target.files || [])
  for (const f of files) {
    const url = await uploadImageFile(f)
    if (url) form.value.images.push(url)
  }
  e.target.value = ''
}
function removeGalleryImage(i) { form.value.images.splice(i,1) }
function clearGallery() { form.value.images = [] }

/* ---------- tags & highlights ---------- */

// Key Locations
function addKeyLocation() {
  const v = (keyLocationInput.value || '').trim()
  if (!v) return
  if (!form.value.keyLocations.includes(v)) form.value.keyLocations.push(v)
  keyLocationInput.value = ''
  locationSuggestionsFiltered.value = []
}
function addKeyLocationFromSuggestion(s) { if (!form.value.keyLocations.includes(s)) form.value.keyLocations.push(s) }
function removeKeyLocation(i) { form.value.keyLocations.splice(i,1) }
function filterLocationSuggestions() {
  const q = (keyLocationInput.value || '').toLowerCase()
  locationSuggestionsFiltered.value = q ? (suggestions.value.keyLocations || []).filter(s => s.toLowerCase().includes(q)).slice(0,12) : []
}

// Highlights: single area (title + description per highlight)
function addEmptyHighlight() {
  form.value.highlights.push({ title: '', description: '' })
}
function addHighlightFromSuggestion(s) {
  if (!s) return
  form.value.highlights.push({ title: s, description: '' })
}
function removeHighlight(i) {
  form.value.highlights.splice(i,1)
  delete highlightSuggestionsFilteredByIndex[i]
}
function filterHighlightSuggestions(index = null) {
  const q = index === null ? (highlightInput.value || '').toLowerCase() : ((form.value.highlights[index]?.title || '').toLowerCase())
  const matched = q ? (suggestions.value.highlights || []).filter(s => s.toLowerCase().includes(q)).slice(0,12) : []
  if (index === null) {
    highlightSuggestionsFiltered.value = matched
  } else {
    highlightSuggestionsFilteredByIndex[index] = matched
  }
}
function useHighlightSuggestion(index, value) {
  if (index == null) return
  if (!form.value.highlights[index]) return
  form.value.highlights[index].title = value
  highlightSuggestionsFilteredByIndex[index] = []
}

/* ---------- Activities (global) ---------- */
function addActivity() {
  const v = (activityInput.value || '').trim()
  if (!v) return
  if (!form.value.activities.includes(v)) form.value.activities.push(v)
  activityInput.value = ''
  activitySuggestionsFiltered.value = []
}
function addActivityFromSuggestion(s) { if (!form.value.activities.includes(s)) form.value.activities.push(s) }
function removeActivity(i) { form.value.activities.splice(i,1) }
function filterActivitySuggestions() {
  const q = (activityInput.value || '').toLowerCase()
  activitySuggestionsFiltered.value = q ? (suggestions.value.activities || []).filter(s => s.toLowerCase().includes(q)).slice(0,12) : []
}

/* ---------- itinerary helpers (with per-day suggestions) ---------- */
function addItineraryDay() {
  const next = (form.value.itinerary?.length ?? 0) + 1
  form.value.itinerary.push({
    day: next,
    title: `Day ${next}`,
    description: '',
    activities: [],
    activitiesInput: ''
  })
  itineraryActivitySuggestions[form.value.itinerary.length - 1] = []
}
function removeItineraryDay(i) { 
  form.value.itinerary.splice(i,1)
  // re-index remaining days so day numbers remain sequential
  for (let j = 0; j < form.value.itinerary.length; j++) {
    form.value.itinerary[j].day = j + 1
  }
  delete itineraryActivitySuggestions[i]
}
function pushDayActivities(dayIdx) {
  const day = form.value.itinerary[dayIdx]
  if (!day) return
  const v = (day.activitiesInput || '').trim()
  if (!v) return
  const parts = v.split(',').map(s => s.trim()).filter(Boolean)
  day.activities = Array.from(new Set([...(day.activities || []), ...parts]))
  day.activitiesInput = ''
  itineraryActivitySuggestions[dayIdx] = []
}
function removeDayActivity(dayIdx, actIdx) {
  form.value.itinerary[dayIdx].activities.splice(actIdx, 1)
}
function filterItineraryActivitySuggestions(dayIdx) {
  const q = (form.value.itinerary[dayIdx]?.activitiesInput || '').toLowerCase()
  itineraryActivitySuggestions[dayIdx] = q ? (suggestions.value.activities || []).filter(s => s.toLowerCase().includes(q)).slice(0,10) : []
}
function useItineraryActivitySuggestion(dayIdx, value) {
  if (!form.value.itinerary[dayIdx]) return
  if (!form.value.itinerary[dayIdx].activities) form.value.itinerary[dayIdx].activities = []
  if (!form.value.itinerary[dayIdx].activities.includes(value)) form.value.itinerary[dayIdx].activities.push(value)
  form.value.itinerary[dayIdx].activitiesInput = ''
  itineraryActivitySuggestions[dayIdx] = []
}

/* ---------- save / delete ---------- */

function toStringArray(input) {
  if (!input && input !== 0) return []
  if (Array.isArray(input)) return input.map(i => String(i).trim()).filter(Boolean)
  if (typeof input === 'string') return input.split(',').map(s => s.trim()).filter(Boolean)
  return [String(input).trim()].filter(Boolean)
}

function normalizeHighlightsForSave(input) {
  if (!input) return []
  if (Array.isArray(input)) {
    return input.map((h) => {
      if (!h) return null
      if (typeof h === 'string') return { title: String(h).trim(), description: '' }
      return { title: String(h.title ?? h.text ?? h.name ?? '').trim(), description: String(h.description ?? '').trim() }
    }).filter(Boolean).filter(h => h.title)
  }
  if (typeof input === 'string') {
    return input.split(',').map(s => ({ title: s.trim(), description: '' })).filter(h => h.title)
  }
  return []
}

async function saveTour() {
  error.value = ''
  saving.value = true

  // sync nights/duration
  if (form.value.nights != null) {
    form.value.nights = Number(form.value.nights)
    form.value.duration = form.value.nights + 1
  } else if (form.value.duration != null) {
    form.value.duration = Number(form.value.duration)
    form.value.nights = Math.max(1, form.value.duration - 1)
  } else {
    form.value.nights = 1
    form.value.duration = 2
  }

  // bestTime
  form.value.bestTime = ''
  if (bestTimeFrom.value && bestTimeTo.value) form.value.bestTime = `${bestTimeFrom.value} - ${bestTimeTo.value}`
  else if (bestTimeFrom.value) form.value.bestTime = bestTimeFrom.value
  else if (bestTimeTo.value) form.value.bestTime = bestTimeTo.value

  // group size
  form.value.groupSize = { min: Number(groupMin.value || 0), max: Number(groupMax.value || 0) }

  // age range
  if (form.value.ageRange === 'custom') {
    form.value.ageRange = customAgeRange.value || ''
  }

  // ensure arrays are arrays
  form.value.highlights = Array.isArray(form.value.highlights) ? form.value.highlights : (form.value.highlights ? String(form.value.highlights).split(',').map(s=>s.trim()).filter(Boolean) : [])
  form.value.activities = Array.isArray(form.value.activities) ? form.value.activities : (form.value.activities ? String(form.value.activities).split(',').map(s=>s.trim()).filter(Boolean) : [])
  form.value.keyLocations = Array.isArray(form.value.keyLocations) ? form.value.keyLocations : (form.value.keyLocations ? String(form.value.keyLocations).split(',').map(s=>s.trim()).filter(Boolean) : [])

  // normalize highlights to array of objects before sending (server expects {title, description})
  const payload = JSON.parse(JSON.stringify(form.value))
  payload.highlights = normalizeHighlightsForSave(payload.highlights)

  // Ensure itinerary day numbering is set and sequential before save
  if (Array.isArray(payload.itinerary)) {
    payload.itinerary = payload.itinerary.map((d, i) => ({
      day: Number(d?.day ?? (i + 1)),
      title: d?.title ?? `Day ${i + 1}`,
      description: d?.description ?? '',
      activities: Array.isArray(d?.activities) ? d.activities : (d?.activities ? String(d.activities).split(',').map(s => s.trim()).filter(Boolean) : [])
    }))
  } else {
    payload.itinerary = []
  }

  try {
    if (isEditing.value && payload._id) {
      const res = await $fetch(`/api/tours/${payload._id}`, { method: 'PATCH', body: payload })
      const updated = res?.data ?? res
      const i = tours.value.findIndex(t => t._id === updated._id)
      if (i !== -1) tours.value[i] = updated
      else {
        await loadTours()
      }
    } else {
      const res = await $fetch('/api/tours', { method: 'POST', body: payload })
      const created = res?.data ?? res
      if (created) tours.value.unshift(created)
    }
    closeModal()
  } catch (err) {
    console.error('Failed to save tour', err)
    error.value = (err?.message || 'Failed to save tour.')
    alert(error.value)
  } finally {
    saving.value = false
  }
}

async function deleteTour(id) {
  if (!confirm('Delete this tour?')) return
  try {
    await $fetch(`/api/tours/${id}`, { method: 'DELETE' })
    tours.value = tours.value.filter(t => t._id !== id)
  } catch (err) {
    console.error('Failed to delete tour', err)
    alert('Failed to delete tour. See console for details.')
  }
}

/* ---------- mount ---------- */
onMounted(async () => {
  await loadTours()
  await loadSuggestions()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: all 0.15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; transform: translateY(-4px); }

/* make highlights visually yellow/amber like UI */
.bg-amber-50 { background: linear-gradient(180deg, #fffbeb, #fff7ed); }
.border-amber-100 { border-color: #ffe6b8; }

/* small niceties */
input[type="file"] { font-size: 0.85rem; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
