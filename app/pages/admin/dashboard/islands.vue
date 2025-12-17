<template>
  <div class="min-h-[calc(100vh-5rem)] bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- HEADER -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Islands</h1>
            <p class="mt-2 text-sm text-gray-600">
              Manage island entries and gallery images
              <span class="ml-2 text-gray-500">• {{ islands.length }} island{{ islands.length !== 1 ? 's' : '' }}</span>
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              @click="openCreateModal"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Island
            </button>
          </div>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-3 text-sm text-gray-600">Loading islands...</p>
        </div>
      </div>

      <!-- TABLE -->
      <div v-else-if="displayedIslands.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50">
              <tr class="text-left text-xs uppercase tracking-wide text-gray-500 border-b">
                <th class="px-6 py-3">Island</th>
                <th class="px-6 py-3">Region</th>
                <th class="px-6 py-3">Area</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="isl in displayedIslands" :key="isl._id || isl.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="shrink-0 h-12 w-16 rounded-md overflow-hidden border border-gray-200">
                      <img
                        v-if="isl.featuredImage"
                        :src="isl.featuredImage"
                        :alt="isl.name"
                        class="h-full w-full object-cover"
                        @error="handleImageError"
                      />
                      <div v-else class="h-full w-full bg-gray-100 flex items-center justify-center">
                        <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ isl.name }}</div>
                      <div class="text-xs text-gray-500">{{ isl.slug }}</div>
                      <div v-if="isl.shortDescription" class="text-xs text-gray-400 truncate max-w-xs">{{ isl.shortDescription }}</div>
                      <div class="flex items-center gap-2 mt-1">
                        <span v-if="isl.metadata?.isFeatured" class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-800">Featured</span>
                        <div v-if="isl.gallery?.length" class="text-xs text-gray-500">{{ isl.gallery.length }} image{{ isl.gallery.length !== 1 ? 's' : '' }}</div>
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ isl.region || '—' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ isl.areaKm2 ? Number(isl.areaKm2).toLocaleString() + ' km²' : '—' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="isl.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    <span class="w-2 h-2 rounded-full mr-1.5" :class="isl.isActive ? 'bg-green-400' : 'bg-gray-400'"></span>
                    {{ isl.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button @click="openEditModal(isl)" class="inline-flex items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit island">
                      <!-- Revised edit icon to match other pages -->
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button @click="deleteIsland(isl._id || isl.id)" class="inline-flex items-center p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete island">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7l1-2h4l1 2" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- EMPTY -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No islands yet</h3>
        <p class="mt-2 text-sm text-gray-600">Get started by creating your first island entry.</p>
        <div class="mt-6">
          <button @click="openCreateModal" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">Add New Island</button>
        </div>
      </div>

      <!-- MODAL: ADD / EDIT -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4">
        <div class="mt-16 mb-8 w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh]">
          <!-- header -->
          <div class="flex items-center justify-between px-6 py-4 border-b bg-slate-50/70">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">{{ isEditing ? 'Edit Island' : 'Add New Island' }}</p>
              <h2 class="text-lg font-semibold text-slate-900">{{ form.name || (isEditing ? 'Edit island' : 'New island') }}</h2>
            </div>
            <button type="button" class="rounded-full w-8 h-8 flex items-center justify-center border bg-white hover:bg-slate-100" @click="closeModal">✕</button>
          </div>

          <!-- body -->
          <div class="px-6 py-5 max-h-[70vh] overflow-y-auto text-sm text-slate-700 space-y-6">
            <!-- BASIC -->
            <div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Name *</label>
                  <input v-model="form.name" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="e.g. Mnemba Island" />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">URL Slug *</label>
                  <input v-model="form.slug" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="mnemba-island" />
                  <p class="text-[11px] text-slate-400 mt-1">Lowercase, hyphens, no spaces.</p>
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-xs font-semibold text-slate-600 mb-1">Short Description</label>
                <input v-model="form.shortDescription" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="Short blurb for list views" />
              </div>

              <div class="mt-4">
                <label class="block text-xs font-semibold text-slate-600 mb-1">Full Description</label>
                <textarea v-model="form.description" rows="4" class="w-full border rounded-lg px-3 py-2" placeholder="Full page description"></textarea>
              </div>
            </div>

            <!-- IMAGES -->
            <div>
              <h3 class="text-sm font-semibold text-slate-800 mb-2">Images</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- featured -->
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Featured Image</label>
                  <div class="flex items-start gap-4">
                    <div class="w-48 h-32 overflow-hidden rounded-md border border-gray-200">
                      <img v-if="form.featuredImage" :src="form.featuredImage" alt="featured" class="w-full h-full object-cover" @error="handleImageError" />
                      <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg class="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                        </svg>
                      </div>
                    </div>

                    <div class="flex-1 space-y-2">
                      <div class="flex items-center gap-2">
                        <input type="file" accept="image/*" @change="onFeaturedImageSelected" ref="featuredImageInput" id="featuredImageInput" />
                        <label for="featuredImageInput" class="cursor-pointer rounded-lg px-3 py-1.5 text-xs border bg-white hover:bg-gray-50">Browse</label>
                      </div>
                      <p class="text-[11px] text-slate-400">Recommended 1200×800</p>
                      <button v-if="form.featuredImage" type="button" @click="removeFeaturedImage" class="text-xs text-red-600 hover:text-red-800">Remove featured image</button>
                    </div>
                  </div>
                </div>

                <!-- gallery -->
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Gallery Images</label>
                  <div class="space-y-3">
                    <div class="flex items-center gap-3">
                      <input type="file" accept="image/*" multiple @change="onGalleryImagesSelected" ref="galleryImagesInput" id="galleryImagesInput" />
                      <label for="galleryImagesInput" class="cursor-pointer rounded-lg px-3 py-1.5 text-xs border bg-white hover:bg-gray-50">Browse Multiple</label>
                      <button v-if="form.gallery && form.gallery.length" type="button" @click="clearGallery" class="rounded-lg px-3 py-1.5 text-xs border bg-white hover:bg-gray-50 text-red-600">Clear all</button>
                    </div>

                    <div v-if="form.gallery && form.gallery.length > 0">
                      <p class="text-xs text-slate-500">{{ form.gallery.length }} image{{ form.gallery.length !== 1 ? 's' : '' }}</p>
                      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <div v-for="(img, idx) in form.gallery" :key="idx" class="relative aspect-video rounded-md overflow-hidden border border-gray-200 group">
                          <img :src="img" class="w-full h-full object-cover" @error="handleImageError" />
                          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button @click="removeGalleryImage(idx)" type="button" class="p-1.5 bg-white/90 rounded-full hover:bg-white" title="Remove image">
                              <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                          <div class="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{{ idx + 1 }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-xs text-gray-400 italic p-4 border border-dashed border-gray-300 rounded-lg text-center">No gallery images selected.</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- LOCATION & STATS -->
            <div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Region</label>
                  <select v-model="form.region" class="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                    <option value="">Select region</option>
                    <option v-for="r in ISLAND_REGIONS" :key="r" :value="r">{{ r }}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Area (km²)</label>
                  <input v-model.number="form.areaKm2" type="number" min="0" step="0.1" class="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. 3.5" />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Established Year</label>
                  <input v-model.number="form.establishedYear" type="number" min="1800" :max="new Date().getFullYear()" class="w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. 1999" />
                </div>
              </div>
            </div>

            <!-- SETTINGS -->
            <div>
              <h3 class="text-sm font-semibold text-slate-800 mb-2">Settings</h3>
              <div class="flex items-center gap-4">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="form.isActive" />
                  <span class="text-sm text-slate-700">Active (visible on website)</span>
                </label>
                <!-- Featured option removed as requested -->
              </div>
            </div>

            <div v-if="error" class="p-3 bg-rose-50 border border-rose-200 rounded-md">
              <p class="text-xs text-rose-600">{{ error }}</p>
            </div>
          </div>

          <!-- footer -->
          <div class="px-6 py-4 border-t bg-slate-50/70 flex items-center justify-between">
            <p class="text-[11px] text-slate-500">You can refine fields later when connecting to the CMS.</p>
            <div class="flex items-center gap-2">
              <button type="button" class="rounded-lg px-4 py-2 text-xs font-semibold border bg-white text-slate-700 hover:bg-slate-100" @click="closeModal">Cancel</button>
              <button type="button" :disabled="isSaving" class="rounded-lg px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60" @click="saveIsland">
                {{ isSaving ? 'Saving…' : (isEditing ? 'Save changes' : 'Create Island') }}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAsyncData } from '#app'

/* ================= CONSTANTS ================= */
const ISLAND_REGIONS = [
  'Northern Islands', 'Southern Islands', 'Zanzibar & Coastal', 'Western Isles', 'Central Archipelago'
]

/* ================= PAGE META ================= */
definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Islands'
})

/* ================= STATE ================= */
const featuredImageInput = ref(null)
const galleryImagesInput = ref(null)

const islands = ref([])
const showModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const isLoading = ref(false)
const error = ref('')

function emptyForm() {
  return {
    _id: null,
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    region: '',
    areaKm2: null,
    establishedYear: null,
    featuredImage: '',
    gallery: [],
    isActive: true,
    metadata: {}
  }
}
const form = ref(emptyForm())

/* ================= HELPERS ================= */
function handleImageError(event) {
  if (!event?.target) return
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlNWU1ZTUiLz4KPHBhdGggZD0iTTI1IDI1SDUwVjUwSDI1VjI1Wk02Mi41IDI1SDc1VjM3LjVINjIuNVYyNVpNMjUgNjIuNUg1MFY3LjVIMjVWNjIuNVpNNjIuNSA1MEg3NVY2Mi41SDYyLjVWNTVaIiBmaWxsPSIjY2NjIi8+CjxwYXRoIGQ9Ik01MCA2Mi41SDc1Vjc1SDUwVjYyLjVaIiBmaWxsPSIjY2NjIi8+Cjwvc3ZnPgo='
  event.target.alt = 'Image not available'
}

/* file -> data URL helper */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => { reader.abort(); reject(new Error('Failed to read file')) }
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}

/* ================= IMAGE HANDLERS ================= */
async function onFeaturedImageSelected(e) {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    const dataUrl = await fileToDataUrl(file)
    form.value.featuredImage = dataUrl
  } catch (err) {
    console.error('featured image read failed', err)
  } finally {
    if (featuredImageInput.value) featuredImageInput.value.value = ''
  }
}

function removeFeaturedImage() {
  form.value.featuredImage = ''
  if (featuredImageInput.value) featuredImageInput.value.value = ''
}

async function onGalleryImagesSelected(e) {
  const files = Array.from(e.target.files || [])
  if (!files.length) return
  try {
    const results = await Promise.all(files.map(f => fileToDataUrl(f)))
    for (const r of results) form.value.gallery.push(r)
  } catch (err) {
    console.error('gallery read failed', err)
  } finally {
    if (galleryImagesInput.value) galleryImagesInput.value.value = ''
  }
}

function removeGalleryImage(index) {
  form.value.gallery.splice(index, 1)
}

function clearGallery() {
  form.value.gallery = []
  if (galleryImagesInput.value) galleryImagesInput.value.value = ''
}

/* ================= SSR DATA FETCH ================= */
const { data: islandsPayload, pending, refresh: refreshIslands, error: islandsError } = useAsyncData(
  'islands-list',
  async () => {
    const res = await $fetch('/api/islands')
    return res
  },
  { server: true, immediate: true }
)

watch(pending, (p) => { isLoading.value = !!p }, { immediate: true })

watch(islandsPayload, (p) => {
  if (!p) islands.value = []
  else islands.value = Array.isArray(p.data) ? p.data : (p.data || [])
}, { immediate: true })

/* ================= CRUD ================= */
async function reloadIslands() {
  await refreshIslands()
}

function openCreateModal() {
  form.value = emptyForm()
  isEditing.value = false
  error.value = ''
  showModal.value = true
}

function openEditModal(island) {
  form.value = {
    _id: island._id || island.id || null,
    name: island.name || '',
    slug: island.slug || '',
    shortDescription: island.shortDescription || '',
    description: island.description || '',
    region: island.region || '',
    areaKm2: island.areaKm2 ?? null,
    establishedYear: island.establishedYear ?? null,
    featuredImage: island.featuredImage || '',
    gallery: Array.isArray(island.gallery) ? [...island.gallery] : (island.gallery ? [island.gallery] : []),
    isActive: island.isActive !== undefined ? island.isActive : true,
    metadata: island.metadata ? { ...island.metadata } : {}
  }
  isEditing.value = true
  error.value = ''
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  error.value = ''
}

/* save (create/update) */
async function saveIsland() {
  error.value = ''

  // basic validation
  if (!form.value.name || !form.value.slug) {
    error.value = 'Name and slug are required.'
    return
  }

  isSaving.value = true
  try {
    // prepare payload matching schema
    const payload = {
      name: String(form.value.name).trim(),
      slug: String(form.value.slug).trim(),
      shortDescription: (form.value.shortDescription || '').trim(),
      description: (form.value.description || '').trim(),
      region: form.value.region || '',
      areaKm2: form.value.areaKm2 != null ? Number(form.value.areaKm2) : undefined,
      establishedYear: form.value.establishedYear != null ? Number(form.value.establishedYear) : undefined,
      featuredImage: form.value.featuredImage || '',
      gallery: Array.isArray(form.value.gallery) ? form.value.gallery : [],
      isActive: form.value.isActive !== undefined ? Boolean(form.value.isActive) : true,
      // preserve metadata as-is (do not inject isFeatured)
      metadata: form.value.metadata || {}
    }

    if (isEditing.value && form.value._id) {
      const updated = await $fetch(`/api/islands/${form.value._id}`, { method: 'PUT', body: payload })
      const idx = islands.value.findIndex(i => (i._id || i.id) === (updated._id || updated.id))
      if (idx !== -1) islands.value[idx] = updated
    } else {
      const created = await $fetch('/api/islands', { method: 'POST', body: payload })
      islands.value.unshift(created)
    }

    closeModal()
  } catch (err) {
    console.error('Failed to save island', err)
    // give server message if present
    error.value = err?.data?.error || err?.message || 'Failed to save island.'
  } finally {
    isSaving.value = false
  }
}

/* delete */
async function deleteIsland(id) {
  if (!confirm('Are you sure you want to delete this island? This action cannot be undone.')) return
  try {
    await $fetch(`/api/islands/${id}`, { method: 'DELETE' })
    // optimistic filter local list
    islands.value = islands.value.filter(i => (i._id || i.id) !== id)
  } catch (err) {
    console.error('Failed to delete island', err)
    alert('Failed to delete island. See console for details.')
  }
}

/* computed for display (no filters currently) */
const displayedIslands = computed(() => islands.value || [])
</script>

<style scoped>
/* small niceties */
.max-h-\[70vh\]::-webkit-scrollbar { width: 6px; }
.max-h-\[70vh\]::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
.max-h-\[70vh\]::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 3px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
/* gallery hover */
.group:hover img { transform: scale(1.05); transition: transform 0.3s ease; }
</style>
