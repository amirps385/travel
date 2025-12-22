<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- HEADER -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Zanzibar Experiences
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage Zanzibar experiences, itineraries, pricing, gallery and FAQs.
            </p>
          </div>

          <button
            type="button"
            @click="newItem"
            class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2"
          >
            <span class="text-lg">＋</span> Add Experience
          </button>
        </div>

        <!-- SEARCH AND FILTER -->
        <div class="mb-4 flex gap-2">
          <input
            v-model="filter"
            @input="debouncedLoad"
            placeholder="Search experiences..."
            class="flex-1 px-3 py-2 border rounded-lg"
          />
          <div class="flex gap-2">
            <button @click="prevPage" :disabled="page === 1" class="px-3 py-2 border rounded-lg text-sm">
              Prev
            </button>
            <button
              @click="nextPage"
              :disabled="items.length < perPage"
              class="px-3 py-2 border rounded-lg text-sm"
            >
              Next
            </button>
          </div>
        </div>

        <!-- TABLE -->
        <div class="border rounded-2xl overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">Experience</th>
                <th class="py-3 px-4">Slug</th>
                <th class="py-3 px-4">Type</th>
                <th class="py-3 px-4">Region</th>
                <th class="py-3 px-4">Duration</th>
                <th class="py-3 px-4">Price</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="it in items"
                :key="it._id"
                class="border-b last:border-b-0 hover:bg-slate-50/80"
              >
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="it.heroImage || it.gallery?.[0] || placeholder"
                      class="w-14 h-10 object-cover rounded"
                    />
                    <div>
                      <div class="font-medium text-slate-900">{{ it.title }}</div>
                      <div class="text-xs text-slate-500">{{ it.tagline || it.description?.slice(0, 80) }}</div>
                    </div>
                  </div>
                </td>

                <td class="py-3 px-4 text-slate-700">
                  /{{ it.slug }}
                </td>

                <td class="py-3 px-4">
                  <span class="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800">
                    {{ it.type || '—' }}
                  </span>
                </td>

                <td class="py-3 px-4 text-slate-700">
                  {{ it.region || '—' }}
                </td>

                <td class="py-3 px-4 text-slate-700">
                  {{ it.durationLabel || '—' }}
                </td>

                <td class="py-3 px-4">
                  <span v-if="it.priceFrom" class="font-medium">
                    ${{ it.priceFrom }}
                  </span>
                  <span v-else class="text-slate-400">—</span>
                </td>

                <td class="py-3 px-4">
                  <span class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full" :class="it.isActive ? 'bg-emerald-500' : 'bg-slate-300'"></span>
                    <span class="text-xs">{{ it.isActive ? 'Active' : 'Draft' }}</span>
                  </span>
                </td>

                <td class="py-3 px-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <button
                      @click.stop="editItem(it)"
                      class="p-2 rounded-lg border hover:bg-slate-100"
                      title="Edit"
                    >
                      ✎
                    </button>

                    <button
                      @click="confirmDelete(it)"
                      class="p-2 text-rose-600 border rounded-lg hover:bg-rose-50"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!items.length && !loadingList">
                <td colspan="8" class="p-4 text-center text-xs text-slate-500">
                  No experiences found. Click "Add Experience" to create one.
                </td>
              </tr>

              <tr v-if="loadingList">
                <td colspan="8" class="p-4 text-center text-xs text-slate-500">
                  Loading experiences...
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION INFO -->
        <div class="mt-4 flex justify-between text-xs text-slate-500">
          <span>{{ items.length }} experiences</span>
          <span>Page {{ page }}</span>
        </div>
      </div>
    </div>

    <!-- EDIT / CREATE MODAL -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <div class="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-y-auto max-h-[90vh] my-8">
          <!-- MODAL HEADER -->
          <div class="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between z-10">
            <div>
              <h2 class="text-lg font-semibold">
                {{ isEditing ? 'Edit Experience' : 'Create Experience' }}
              </h2>
              <p class="text-sm text-slate-500">
                Fill details and save
              </p>
            </div>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-1 text-sm">
                <input type="checkbox" v-model="form.isActive" /> Active
              </label>
              <button class="p-2 rounded hover:bg-slate-100" @click="closeModal">✕</button>
            </div>
          </div>

          <!-- MODAL BODY -->
          <div class="px-6 py-5">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- LEFT COL: main fields -->
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold mb-1">Title *</label>
                  <input v-model="form.title" class="w-full border rounded-lg px-3 py-2" />
                  <p v-if="!form.title" class="text-red-500 text-xs mt-1">Title is required</p>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Slug *</label>
                  <div class="flex gap-2">
                    <input v-model="form.slug" class="flex-1 border rounded-lg px-3 py-2" />
                    <button @click="generateSlug" class="px-3 py-2 border rounded-lg text-sm whitespace-nowrap">
                      Auto
                    </button>
                  </div>
                  <p v-if="!form.slug" class="text-red-500 text-xs mt-1">Slug is required</p>
                </div>

                <!-- TYPE as dropdown -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Type *</label>
                  <select v-model="form.type" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Select type</option>
                    <option v-for="t in TYPE_OPTIONS" :key="t" :value="t">{{ t }}</option>
                  </select>
                  <p v-if="!form.type" class="text-red-500 text-xs mt-1">Type is required</p>
                </div>

                <!-- REGION as dropdown -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Region *</label>
                  <select v-model="form.region" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Select region</option>
                    <option v-for="r in REGION_OPTIONS" :key="r" :value="r">{{ r }}</option>
                  </select>
                  <p v-if="!form.region" class="text-red-500 text-xs mt-1">Region is required</p>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Tagline</label>
                  <input v-model="form.tagline" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Description *</label>
                  <textarea v-model="form.description" rows="6" class="w-full border rounded-lg px-3 py-2"></textarea>
                  <p v-if="!form.description" class="text-red-500 text-xs mt-1">Description is required</p>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-semibold mb-1">Duration label</label>
                    <select v-model="form.durationLabel" class="w-full border rounded-lg px-3 py-2">
                      <option value="">Custom / not specified</option>
                      <option v-for="d in DURATION_OPTIONS" :key="d" :value="d">{{ d }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold mb-1">Starting price (USD)</label>
                    <input type="number" v-model.number="form.priceFrom" class="w-full border rounded-lg px-3 py-2" />
                  </div>
                </div>

                <!-- Highlights: single-add (enter / Add button) and chips -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Highlights</label>

                  <div class="flex gap-2 mb-3">
                    <input
                      v-model="tmpHighlight"
                      @keyup.enter.prevent="addCustomHighlight"
                      placeholder="Add custom highlight (press Enter or click Add)"
                      class="flex-1 border rounded-lg px-3 py-2"
                    />
                    <button @click="addCustomHighlight" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">Add</button>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <template v-for="(h, i) in form.highlights" :key="`hl-${i}`">
                      <span class="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1 text-xs">
                        <span class="max-w-48 truncate">{{ h }}</span>
                        <button @click="removeHighlight(i)" class="text-rose-600 text-sm leading-none">✕</button>
                      </span>
                    </template>
                  </div>

                  <p class="text-xs text-slate-400 mt-2">
                    Add one highlight at a time; remove with ✕.
                  </p>
                </div>

                <!-- Included / Excluded -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- INCLUDED -->
                  <div class="border rounded-xl p-4 bg-slate-50 box-border">
                    <div class="flex items-center justify-between mb-3">
                      <label class="text-xs font-semibold">Included</label>
                      <button
                        @click="addIncluded"
                        class="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs"
                      >
                        Add Included
                      </button>
                    </div>

                    <div class="space-y-2">
                      <div
                        v-for="(inc, i) in form.included"
                        :key="`inc-${i}`"
                        class="flex gap-2 items-center"
                      >
                        <input
                          v-model="form.included[i]"
                          class="flex-1 min-w-0 border rounded-lg px-3 py-2 included-excluded-input"
                          placeholder="What's included"
                        />
                        <button
                          @click="removeIncluded(i)"
                          class="remove-btn border rounded-lg text-rose-600"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>

                      <p v-if="!form.included.length" class="text-xs text-slate-400">
                        No included items added yet.
                      </p>
                    </div>
                  </div>

                  <!-- EXCLUDED -->
                  <div class="border rounded-xl p-4 bg-slate-50 box-border">
                    <div class="flex items-center justify-between mb-3">
                      <label class="text-xs font-semibold">Excluded</label>
                      <button
                        @click="addExcluded"
                        class="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs"
                      >
                        Add Excluded
                      </button>
                    </div>

                    <div class="space-y-2">
                      <div
                        v-for="(ex, i) in form.excluded"
                        :key="`ex-${i}`"
                        class="flex gap-2 items-center"
                      >
                        <input
                          v-model="form.excluded[i]"
                          class="flex-1 min-w-0 border rounded-lg px-3 py-2 included-excluded-input"
                          placeholder="What's excluded"
                        />
                        <button
                          @click="removeExcluded(i)"
                          class="remove-btn border rounded-lg text-rose-600"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>

                      <p v-if="!form.excluded.length" class="text-xs text-slate-400">
                        No excluded items added yet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- RIGHT COL: media / itinerary / faqs / gallery / seo -->
              <div class="space-y-4">
                <!-- HERO IMAGE -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Hero image URL</label>
                  <div class="flex gap-2">
                    <input v-model="form.heroImage" class="flex-1 border rounded-lg px-3 py-2" placeholder="https://..." />
                    <input type="file" @change="onFileChange($event, 'heroImage')" class="border rounded-lg px-3 py-2 text-sm" accept="image/*" />
                  </div>
                  <img v-if="form.heroImage" :src="form.heroImage" class="mt-2 h-36 w-full object-cover rounded-lg" />
                </div>

                <!-- GALLERY -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Gallery</label>
                  <div class="flex gap-2 mb-2">
                    <input type="file" multiple @change="onGalleryFiles" class="flex-1 border rounded-lg px-3 py-2 text-sm" accept="image/*" />
                    <button @click="showGalleryModal = true" class="px-3 py-2 border rounded-lg text-sm">Manage</button>
                  </div>

                  <div class="mt-3 grid grid-cols-4 gap-2">
                    <div v-for="(g, i) in form.gallery" :key="i" class="relative group">
                      <img :src="g" class="h-20 w-full object-cover rounded-lg" />
                      <button @click="removeGalleryImage(i)" class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                    </div>
                  </div>
                </div>

                <!-- ITINERARY -->
                <div>
                  <h4 class="text-sm font-semibold mb-2">Itinerary</h4>
                  <div class="space-y-2">
                    <div v-for="(step, idx) in form.itinerary" :key="idx" class="border rounded-lg p-3 bg-slate-50">
                      <input v-model="step.title" placeholder="Title" class="w-full border rounded-lg px-2 py-1 mb-2" />
                      <textarea v-model="step.description" rows="2" placeholder="Description" class="w-full border rounded-lg px-2 py-1 mb-2"></textarea>
                      <div class="flex gap-2">
                        <input v-model="step.image" placeholder="Image URL" class="flex-1 border rounded-lg px-2 py-1" />
                        <input type="file" @change="onFileChange($event, 'itinerary', idx)" class="border rounded-lg px-2 py-1 text-sm" accept="image/*" />
                      </div>
                      <div class="mt-2 text-right">
                        <button @click="removeItinerary(idx)" class="px-3 py-1 text-sm border rounded-lg text-rose-600">Remove</button>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button @click="addItinerary" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">Add Step</button>
                      <button @click="sortItinerary" class="px-3 py-2 border rounded-lg text-sm">Sort</button>
                    </div>
                  </div>
                </div>

                <!-- FAQs -->
                <div>
                  <h4 class="text-sm font-semibold mb-2">FAQs</h4>
                  <div class="space-y-2">
                    <div v-for="(f, idx) in form.faqs" :key="idx" class="border rounded-lg p-3 bg-slate-50">
                      <input v-model="f.question" placeholder="Question" class="w-full border rounded-lg px-2 py-1 mb-2" />
                      <textarea v-model="f.answer" rows="2" placeholder="Answer" class="w-full border rounded-lg px-2 py-1"></textarea>
                      <div class="mt-2 text-right">
                        <button @click="removeFaq(idx)" class="px-3 py-1 border rounded-lg text-rose-600 text-sm">Remove</button>
                      </div>
                    </div>
                    <button @click="addFaq" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">Add FAQ</button>
                  </div>
                </div>

                <!-- SEO (light) -->
                <div class="border-t pt-3">
                  <label class="block text-xs font-semibold mb-1">SEO Title</label>
                  <input v-model="form.seo.title" class="w-full border rounded-lg px-3 py-2" />
                  <label class="block text-xs font-semibold mb-1 mt-2">SEO Description</label>
                  <input v-model="form.seo.description" class="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>
            </div>

            <!-- SAVE AREA -->
            <div class="mt-6 border-t pt-6 flex flex-wrap gap-3 items-center">
              <button
                @click="save"
                :disabled="saving || !isFormValid"
                class="px-6 py-3 bg-emerald-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : isEditing ? 'Update Experience' : 'Create Experience' }}
              </button>

              <button
                @click="saveAndPublish"
                :disabled="saving || !isFormValid"
                class="px-6 py-3 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save & Publish
              </button>

              <button @click="resetForm" class="px-6 py-3 border rounded-lg">Cancel</button>

              <span v-if="message" class="text-sm" :class="messageType === 'error' ? 'text-red-600' : 'text-emerald-600'">
                {{ message }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Gallery Management Modal -->
    <div v-if="showGalleryModal" class="fixed inset-0 bg-black/30 z-60 flex items-center justify-center px-4">
      <div class="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Manage Gallery Images</h3>
          <button @click="showGalleryModal = false" class="p-2 rounded hover:bg-slate-100">✕</button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(g, i) in form.gallery" :key="i" class="relative group">
            <img :src="g" class="w-full h-32 object-cover rounded-lg" />
            <button @click="removeGalleryImage(i)" class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm">×</button>
            <input v-model="form.gallery[i]" class="mt-2 w-full px-2 py-1 text-xs border rounded-lg" placeholder="Image URL" />
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button @click="showGalleryModal = false" class="px-4 py-2 border rounded-lg">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard', title: 'Dashboard - Zanzibar' })
import { ref, reactive, computed, onMounted } from 'vue'

const placeholder = '/images/placeholder.png'

// option lists
const TYPE_OPTIONS = ['Excursion', 'Stay', 'Combo', 'Private Tour', 'Group Tour']
const REGION_OPTIONS = ['Stone Town', 'Nungwi', 'Kendwa', 'Paje', 'Jambiani', 'Matemwe', 'Kizimkazi', 'Mnemba']
const DURATION_OPTIONS = ['Half Day (≤4h)', 'Full Day (≈8h)', '1 Day', '2 Days', '3–4 Days', '5+ Days']

// list state
const items = ref([])
const loadingList = ref(false)
const page = ref(1)
const perPage = ref(20)
const filter = ref('')

// modal / form state
const showModal = ref(false)
const showGalleryModal = ref(false)
const isEditing = ref(false)
const editId = ref(null)
const saving = ref(false)
const message = ref('')
const messageType = ref('success') // 'success' or 'error'

// default form matches server/models/Zanzibar.ts
const defaultForm = () => ({
  slug: '',
  title: '',
  type: '',
  region: '',
  durationLabel: '',
  priceFrom: null,
  tagline: '',
  description: '',
  highlights: [],
  itinerary: [], // { title, description, image }
  included: [],
  excluded: [],
  faqs: [], // { question, answer }
  heroImage: '',
  gallery: [],
  isActive: true,
  seo: { title: '', description: '', keywords: [] }
})

const form = reactive(defaultForm())

// helper inputs
const tmpHighlight = ref('')

// form validity
const isFormValid = computed(() => {
  return form.title && form.slug && form.type && form.region && form.description
})

// pagination + debounce helper
let timer = null
function debouncedLoad() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    page.value = 1
    loadItems()
  }, 400)
}

async function loadItems() {
  loadingList.value = true
  try {
    const q = new URLSearchParams()
    if (filter.value.trim()) q.set('search', filter.value.trim())
    q.set('page', String(page.value))
    q.set('limit', String(perPage.value))
    const url = '/api/zanzibar' + (q.toString() ? `?${q.toString()}` : '')
    const res = await $fetch(url)
    if (res && res.success) {
      items.value = res.data || []
    } else {
      items.value = []
    }
  } catch (e) {
    console.error('loadItems error', e)
    items.value = []
    showMessage('Failed to load experiences', 'error')
  } finally {
    loadingList.value = false
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    loadItems()
  }
}
function nextPage() {
  page.value++
  loadItems()
}

function newItem() {
  Object.assign(form, defaultForm())
  tmpHighlight.value = ''
  isEditing.value = false
  editId.value = null
  message.value = ''
  showGalleryModal.value = false
  showModal.value = true
}

function editItem(it) {
  Object.assign(form, JSON.parse(JSON.stringify(it)))
  form.itinerary = form.itinerary || []
  form.included = form.included || []
  form.excluded = form.excluded || []
  form.faqs = form.faqs || []
  form.gallery = form.gallery || []
  form.seo = form.seo || { title: '', description: '', keywords: [] }

  // ensure highlights is an array (if older saved value)
  form.highlights = form.highlights || []
  tmpHighlight.value = ''
  isEditing.value = true
  editId.value = it._id
  showGalleryModal.value = false
  showModal.value = true
}

function generateSlug() {
  if (!form.title) return
  form.slug = form.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .substring(0, 100)
}

function addCustomHighlight() {
  const t = (tmpHighlight.value || '').trim()
  if (!t) return
  // avoid duplicates (case-sensitive normalization)
  const lower = t.toLowerCase()
  if (!form.highlights.some(h => h.toLowerCase() === lower)) {
    form.highlights.push(t)
  }
  tmpHighlight.value = ''
}

function removeHighlight(index) {
  form.highlights.splice(index, 1)
}

function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type
  setTimeout(() => (message.value = ''), 3000)
}

// itinerary helpers
function addItinerary() {
  form.itinerary.push({ title: '', description: '', image: '' })
}
function removeItinerary(i) { form.itinerary.splice(i, 1) }
function sortItinerary() { /* no ordering field in schema — keep as is */ }

// included / excluded helpers
function addIncluded() { form.included.push('') }
function removeIncluded(i) { form.included.splice(i, 1) }
function addExcluded() { form.excluded.push('') }
function removeExcluded(i) { form.excluded.splice(i, 1) }

// faqs
function addFaq() { form.faqs.push({ question: '', answer: '' }) }
function removeFaq(i) { form.faqs.splice(i, 1) }

// gallery
async function onGalleryFiles(e) {
  const files = Array.from(e.target.files || [])
  if (!files.length) return
  for (const file of files) {
    const url = await uploadFile(file)
    if (url) form.gallery.push(url)
  }
  e.target.value = ''
}

function removeGalleryImage(i) { form.gallery.splice(i, 1) }

// file upload
async function uploadFile(file) {
  if (!file) return null
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await $fetch('/api/zanzibar/upload-image', {
      method: 'POST',
      body: formData
      // let browser set multipart headers
    })
    if (res && res.url) {
      showMessage('Image uploaded successfully')
      return res.url
    } else {
      throw new Error('No URL returned')
    }
  } catch (e) {
    console.error('uploadFile', e)
    showMessage('Upload failed: ' + (e.data?.message || e.message || 'Unknown'), 'error')
    return null
  }
}

async function onFileChange(e, target, idx = null) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  const url = await uploadFile(file)
  if (!url) return
  if (target === 'heroImage') form.heroImage = url
  else if (target === 'itinerary' && typeof idx === 'number') form.itinerary[idx].image = url
  e.target.value = ''
}

// delete
function confirmDelete(it) {
  if (!confirm(`Delete "${it.title}"? This cannot be undone.`)) return
  deleteItem(it._id)
}
async function deleteItem(id) {
  try {
    await $fetch(`/api/zanzibar/${id}`, { method: 'DELETE' })
    showMessage('Experience deleted successfully')
    await loadItems()
  } catch (e) {
    console.error('deleteItem', e)
    showMessage('Delete failed: ' + (e.data?.message || e.message), 'error')
  }
}

// save
async function save() {
  if (!isFormValid.value) {
    showMessage('Please fill required fields', 'error')
    return
  }

  saving.value = true
  try {
    // sanitize arrays
    form.included = (form.included || []).map(s => (s || '').trim()).filter(Boolean)
    form.excluded = (form.excluded || []).map(s => (s || '').trim()).filter(Boolean)
    form.highlights = Array.from(new Set((form.highlights || []).map(s => (s || '').trim()).filter(Boolean))) // dedupe

    const payload = JSON.parse(JSON.stringify(form))
    let res
    if (isEditing.value && editId.value) {
      res = await $fetch(`/api/zanzibar/${editId.value}`, { method: 'PUT', body: payload })
      showMessage('Experience updated successfully')
    } else {
      res = await $fetch('/api/zanzibar', { method: 'POST', body: payload })
      showMessage('Experience created successfully')
      if (res?.data?._id) {
        editId.value = res.data._id
        isEditing.value = true
      }
    }
    await loadItems()
  } catch (e) {
    console.error('save error', e)
    showMessage('Save failed: ' + (e.data?.message || e.message || 'Unknown'), 'error')
  } finally {
    saving.value = false
  }
}

async function saveAndPublish() {
  form.isActive = true
  await save()
}

function resetForm() {
  Object.assign(form, defaultForm())
  tmpHighlight.value = ''
  isEditing.value = false
  editId.value = null
  message.value = ''
  showModal.value = false
  showGalleryModal.value = false
}

function closeModal() {
  showModal.value = false
}

onMounted(() => {
  loadItems()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

input[type="file"] {
  max-width: 200px;
}

@media (max-width: 640px) {
  input[type="file"] {
    max-width: 140px;
  }
}

/* Ensure table cells don't overflow */
td {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* --- Included/Excluded UI fixes --- */
/* Make inputs shrinkable (so the remove button stays visible) */
.included-excluded-input {
  min-width: 0; /* important for flex children */
  box-sizing: border-box;
}

/* Remove button: fixed square, centered content, prevents overflow */
.remove-btn {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
  min-width: 36px;
  flex: 0 0 36px;
  background: transparent;
}

/* Slight spacing & consistent look for list container */
.box-border {
  box-sizing: border-box;
}

/* Prevent long text from pushing buttons out */
.flex > input[type="text"],
.flex > input[type="number"],
.flex > textarea {
  min-width: 0;
}

/* tiny tweak: ensure group-hover opacity transition is smoother */
.group-hover\:opacity-100 {
  transition: opacity 0.15s ease;
}
</style>
