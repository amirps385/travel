<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      
      <!-- Header -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Animals
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage wildlife species, images, and content.
            </p>
          </div>

          <button
            type="button"
            @click="openCreateModal"
            class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2"
          >
            <span class="text-lg">＋</span> Add Animal
          </button>
        </div>

        <!-- Animals Table -->
        <div class="border rounded-2xl overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">Name</th>
                <th class="py-3 px-4">Slug</th>
                <th class="py-3 px-4">Category</th>
                <th class="py-3 px-4">Image</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="animal in animals"
                :key="animal._id"
                class="border-b last:border-b-0 hover:bg-slate-50/80"
              >
                <td class="py-3 px-4 font-medium text-slate-900">
                  {{ animal.name }}
                </td>

                <td class="py-3 px-4 text-slate-700">
                  {{ animal.slug }}
                </td>

                <td class="py-3 px-4 text-slate-700">
                  {{ animal.category || '—' }}
                </td>

                <td class="py-3 px-4">
                  <img
                    v-if="animal.featuredImage"
                    :src="animal.featuredImage"
                    class="w-14 h-10 object-cover rounded"
                  />
                  <span v-else class="text-xs text-slate-400">No image</span>
                </td>

                <td class="py-3 px-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <button
                      @click.stop="openEditModal(animal)"
                      class="p-2 rounded-lg border hover:bg-slate-100"
                    >✎</button>

                    <button
                      @click="deleteAnimal(animal._id)"
                      class="p-2 text-rose-600 border rounded-lg hover:bg-rose-50"
                    >🗑</button>
                  </div>
                </td>
              </tr>

              <tr v-if="!animals.length">
                <td colspan="5" class="p-4 text-center text-xs text-slate-500">
                  No animals added yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL -->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4"
        >
          <div class="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-y-auto max-h-[90vh]">

            <!-- Modal Header -->
            <div class="px-6 py-4 border-b flex items-center justify-between">
              <h2 class="text-lg font-semibold">
                {{ isEditing ? 'Edit Animal' : 'Add Animal' }}
              </h2>
              <button class="p-2 rounded hover:bg-slate-100" @click="closeModal">✕</button>
            </div>

            <!-- Modal Body -->
            <div class="px-6 py-5 space-y-4">

              <div>
                <label class="block text-xs mb-1 font-semibold">Name</label>
                <input v-model="form.name" class="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label class="block text-xs mb-1 font-semibold">Slug</label>
                <input v-model="form.slug" class="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label class="block text-xs mb-1 font-semibold">Scientific Name</label>
                <input v-model="form.scientificName" class="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label class="block text-xs mb-1 font-semibold">Category</label>
                <select v-model="form.category" class="w-full border rounded-lg px-3 py-2">
                  <option value="">Select category</option>
                  <option value="Big Five">Big Five</option>
                  <option value="Mammal">Mammal</option>
                  <option value="Bird">Bird</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Predator">Predator</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold mb-1">Featured Image</label>
                <input type="file" accept="image/*" @change="onFeaturedImageSelect" />
                <div v-if="form.featuredImage" class="mt-2">
                  <img :src="form.featuredImage" class="w-40 h-28 object-cover rounded" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold mb-1">Gallery Images</label>
                <input type="file" multiple accept="image/*" @change="onGallerySelect" />
                <div class="flex gap-2 mt-2 flex-wrap">
                  <div
                    v-for="(img, i) in form.gallery"
                    :key="i"
                    class="relative w-24 h-16 border rounded overflow-hidden"
                  >
                    <img :src="img" class="w-full h-full object-cover" />
                    <button
                      @click="removeGallery(i)"
                      class="absolute top-1 right-1 bg-white/70 px-1 rounded text-xs"
                    >✕</button>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs mb-1 font-semibold">Short Description</label>
                <textarea v-model="form.shortDescription" rows="3" class="w-full border rounded-lg px-3 py-2"></textarea>
              </div>

              <div>
                <label class="block text-xs mb-1 font-semibold">Full Description</label>
                <textarea v-model="form.description" rows="6" class="w-full border rounded-lg px-3 py-2"></textarea>
              </div>

            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t flex items-center justify-end gap-2">
              <button class="px-4 py-2 rounded-lg bg-white border" @click="closeModal">Cancel</button>
              <button class="px-4 py-2 rounded-lg bg-emerald-700 text-white" @click="saveAnimal">
                {{ isEditing ? 'Save Changes' : 'Create Animal' }}
              </button>
            </div>

          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'dashboard', title: 'Dashboard - Animals' })

const animals = ref([])
const showModal = ref(false)
const isEditing = ref(false)

const form = ref({
  _id: null,
  name: '',
  slug: '',
  scientificName: '',
  category: '',
  featuredImage: '',
  gallery: [],
  shortDescription: '',
  description: ''
})

// Load animals from backend
async function loadAnimals() {
  const res = await $fetch('/api/animals')
  animals.value = res || []
}

// Open modal
function openCreateModal() {
  isEditing.value = false
  form.value = {
    _id: null,
    name: '',
    slug: '',
    scientificName: '',
    category: '',
    featuredImage: '',
    gallery: [],
    shortDescription: '',
    description: ''
  }
  showModal.value = true
}

// Edit modal
function openEditModal(a) {
  isEditing.value = true
  form.value = JSON.parse(JSON.stringify(a))
  showModal.value = true
}

// Close modal
function closeModal() {
  showModal.value = false
}

// Upload featured
async function onFeaturedImageSelect(e) {
  const file = e.target.files[0]
  if (!file) return

  const fd = new FormData()
  fd.append('image', file)

  const res = await fetch('/api/animals/upload', {
    method: 'POST',
    body: fd
  })
  const json = await res.json()
  if (json.url) form.value.featuredImage = json.url
}

// Upload gallery
async function onGallerySelect(e) {
  const files = Array.from(e.target.files)
  for (const file of files) {
    const fd = new FormData()
    fd.append('image', file)

    const res = await fetch('/api/animals/upload', {
      method: 'POST',
      body: fd
    })
    const json = await res.json()
    if (json.url) form.value.gallery.push(json.url)
  }
}

// remove gallery
function removeGallery(i) {
  form.value.gallery.splice(i, 1)
}

// Save animal
async function saveAnimal() {
  const payload = JSON.parse(JSON.stringify(form.value))

  if (isEditing.value && payload._id) {
    const updated = await $fetch(`/api/animals/${payload._id}`, {
      method: 'PATCH',
      body: payload
    })
    const i = animals.value.findIndex(x => x._id === updated._id)
    if (i !== -1) animals.value[i] = updated
  } else {
    const created = await $fetch('/api/animals', {
      method: 'POST',
      body: payload
    })
    animals.value.unshift(created)
  }

  closeModal()
}

// Delete animal
async function deleteAnimal(id) {
  if (!confirm('Delete this animal?')) return
  await $fetch(`/api/animals/${id}`, { method: 'DELETE' })
  animals.value = animals.value.filter(a => a._id !== id)
}

onMounted(loadAnimals)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: all .15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>