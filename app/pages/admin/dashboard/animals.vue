<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">

      <!-- HEADER -->
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

        <!-- TABLE -->
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
                      title="Edit"
                    >✎</button>

                    <button
                      @click="deleteAnimal(animal._id)"
                      class="p-2 text-rose-600 border rounded-lg hover:bg-rose-50"
                      title="Delete"
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

            <!-- MODAL HEADER -->
            <div class="px-6 py-4 border-b flex items-center justify-between">
              <h2 class="text-lg font-semibold">
                {{ isEditing ? 'Edit Animal' : 'Add Animal' }}
              </h2>
              <button class="p-2 rounded hover:bg-slate-100" @click="closeModal">✕</button>
            </div>

            <!-- MODAL BODY -->
            <div class="px-6 py-5 space-y-4">

              <!-- Name -->
              <div>
                <label class="block text-xs font-semibold mb-1">Name</label>
                <input v-model="form.name" class="w-full border rounded-lg px-3 py-2" />
              </div>

              <!-- Slug -->
              <div>
                <label class="block text-xs font-semibold mb-1">Slug</label>
                <input v-model="form.slug" class="w-full border rounded-lg px-3 py-2" />
              </div>

              <!-- Scientific Name -->
              <div>
                <label class="block text-xs font-semibold mb-1">Scientific Name</label>
                <input v-model="form.scientificName" class="w-full border rounded-lg px-3 py-2" />
              </div>

              <!-- Category -->
              <div>
                <label class="block text-xs font-semibold mb-1">Category</label>
                <select v-model="form.category" class="w-full border rounded-lg px-3 py-2">
                  <option value="">Select category</option>
                  <option>Big Five</option>
                  <option>Mammal</option>
                  <option>Bird</option>
                  <option>Reptile</option>
                  <option>Predator</option>
                </select>
              </div>

              <!-- Featured Image -->
              <div>
                <label class="block text-xs font-semibold mb-1">Featured Image</label>
                <input type="file" accept="image/*" @change="onFeaturedImageSelect" />
                <img
                  v-if="form.featuredImage"
                  :src="form.featuredImage"
                  class="mt-2 w-40 h-28 object-cover rounded border"
                />
              </div>

              <!-- Gallery -->
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
                      class="absolute top-1 right-1 bg-white/80 rounded text-xs px-1"
                    >✕</button>
                  </div>
                </div>
              </div>

              <!-- Short Description -->
              <div>
                <label class="block text-xs font-semibold mb-1">Short Description</label>
                <textarea v-model="form.shortDescription" rows="3" class="w-full border rounded-lg px-3 py-2"></textarea>
              </div>

              <!-- Full Description -->
              <div>
                <label class="block text-xs font-semibold mb-1">Full Description</label>
                <textarea v-model="form.description" rows="5" class="w-full border rounded-lg px-3 py-2"></textarea>
              </div>

            </div>

            <!-- MODAL FOOTER -->
            <div class="px-6 py-4 border-t flex justify-end gap-2">
              <button class="px-4 py-2 border rounded-lg" @click="closeModal">
                Cancel
              </button>
              <button
                class="px-4 py-2 rounded-lg bg-emerald-700 text-white"
                @click="saveAnimal"
              >
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

const emptyForm = () => ({
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

const form = ref(emptyForm())

/* LOAD */
async function loadAnimals() {
  animals.value = await $fetch('/api/animals')
}

/* MODAL */
function openCreateModal() {
  isEditing.value = false
  form.value = emptyForm()
  showModal.value = true
}

function openEditModal(animal) {
  isEditing.value = true
  form.value = JSON.parse(JSON.stringify(animal))
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

/* IMAGE UPLOADS */
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

function removeGallery(i) {
  form.value.gallery.splice(i, 1)
}

/* SAVE */
async function saveAnimal() {
  try {
    const payload = JSON.parse(JSON.stringify(form.value))

    if (isEditing.value && payload._id) {
      const updated = await $fetch(`/api/animals/${payload._id}`, {
        method: 'PUT',
        body: payload
      })

      const i = animals.value.findIndex(a => a._id === updated._id)
      if (i !== -1) animals.value[i] = updated
    } else {
      const created = await $fetch('/api/animals', {
        method: 'POST',
        body: payload
      })
      animals.value.unshift(created)
    }

    closeModal()
  } catch (err) {
    console.error('Save failed:', err)
    alert('Failed to save animal. Check console.')
  }
}

/* DELETE */
async function deleteAnimal(id) {
  if (!confirm('Delete this animal?')) return
  await $fetch(`/api/animals/${id}`, { method: 'DELETE' })
  animals.value = animals.value.filter(a => a._id !== id)
}

onMounted(loadAnimals)
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
</style>
