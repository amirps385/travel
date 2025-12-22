<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- HEADER -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Routes
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage trekking routes, itineraries, and pricing.
            </p>
          </div>

          <button
            type="button"
            @click="newRoute"
            class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2"
          >
            <span class="text-lg">＋</span> Add Route
          </button>
        </div>

        <!-- SEARCH AND FILTER -->
        <div class="mb-4 flex gap-2">
          <input
            v-model="filter"
            @input="debouncedLoad"
            placeholder="Search routes..."
            class="flex-1 px-3 py-2 border rounded-lg"
          />
          <div class="flex gap-2">
            <button @click="prevPage" :disabled="page === 1" class="px-3 py-2 border rounded-lg text-sm">
              Prev
            </button>
            <button
              @click="nextPage"
              :disabled="routes.length < perPage"
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
                <th class="py-3 px-4">Route</th>
                <th class="py-3 px-4">Slug</th>
                <th class="py-3 px-4">Difficulty</th>
                <th class="py-3 px-4">Duration</th>
                <th class="py-3 px-4">Price</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="r in routes"
                :key="r._id"
                class="border-b last:border-b-0 hover:bg-slate-50/80"
              >
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="r.featuredImage || r.heroImage || r.gallery?.[0] || placeholder"
                      class="w-14 h-10 object-cover rounded"
                    />
                    <div>
                      <div class="font-medium text-slate-900">{{ r.name }}</div>
                      <div class="text-xs text-slate-500">{{ r.tagline }}</div>
                    </div>
                  </div>
                </td>

                <td class="py-3 px-4 text-slate-700">
                  /{{ r.slug }}
                </td>

                <td class="py-3 px-4">
                  <span class="px-2 py-1 text-xs rounded-full" :class="difficultyClass(r.difficulty)">
                    {{ r.difficulty || '—' }}
                  </span>
                </td>

                <td class="py-3 px-4 text-slate-700">
                  {{ r.duration }}
                </td>

                <td class="py-3 px-4">
                  <span v-if="r.startingPrice" class="font-medium">
                    ${{ r.startingPrice }}
                  </span>
                  <span v-else class="text-slate-400">—</span>
                </td>

                <td class="py-3 px-4">
                  <span class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full" :class="r.isActive ? 'bg-emerald-500' : 'bg-slate-300'"></span>
                    <span class="text-xs">{{ r.isActive ? 'Active' : 'Draft' }}</span>
                  </span>
                </td>

                <td class="py-3 px-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <button
                      @click.stop="editRoute(r)"
                      class="p-2 rounded-lg border hover:bg-slate-100"
                      title="Edit"
                    >
                      ✎
                    </button>

                    <button
                      @click="confirmDelete(r)"
                      class="p-2 text-rose-600 border rounded-lg hover:bg-rose-50"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!routes.length && !loadingList">
                <td colspan="7" class="p-4 text-center text-xs text-slate-500">
                  No routes found. Click "Add Route" to create one.
                </td>
              </tr>

              <tr v-if="loadingList">
                <td colspan="7" class="p-4 text-center text-xs text-slate-500">
                  Loading routes...
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION INFO -->
        <div class="mt-4 flex justify-between text-xs text-slate-500">
          <span>{{ routes.length }} routes</span>
          <span>Page {{ page }}</span>
        </div>
      </div>
    </div>

    <!-- ROUTE EDITING MODAL -->
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
                {{ isEditing ? 'Edit Route' : 'Create Route' }}
              </h2>
              <p class="text-sm text-slate-500">
                Fill details and save
              </p>
            </div>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-1 text-sm">
                <input type="checkbox" v-model="form.isActive" /> Active
              </label>
              <label class="flex items-center gap-1 text-sm">
                <input type="checkbox" v-model="form.isFeatured" /> Featured
              </label>
              <button class="p-2 rounded hover:bg-slate-100" @click="resetForm">✕</button>
            </div>
          </div>

          <!-- MODAL BODY -->
          <div class="px-6 py-5">
            <!-- FORM GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- LEFT FIELDS -->
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold mb-1">Name *</label>
                  <input v-model="form.name" class="w-full border rounded-lg px-3 py-2" />
                  <p v-if="!form.name" class="text-red-500 text-xs mt-1">Name is required</p>
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

                <div>
                  <label class="block text-xs font-semibold mb-1">Tagline</label>
                  <input v-model="form.tagline" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Short description (card)</label>
                  <input v-model="form.shortDescription" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Duration string</label>
                  <input v-model="form.duration" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-semibold mb-1">Duration min (days)</label>
                    <input type="number" v-model.number="form.durationMin" class="w-full border rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold mb-1">Duration max (days)</label>
                    <input type="number" v-model.number="form.durationMax" class="w-full border rounded-lg px-3 py-2" />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Starting price (USD)</label>
                  <input type="number" v-model.number="form.startingPrice" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Difficulty *</label>
                  <select v-model="form.difficulty" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Select</option>
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Challenging</option>
                    <option>Very Challenging</option>
                  </select>
                  <p v-if="!form.difficulty" class="text-red-500 text-xs mt-1">Difficulty is required</p>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Success rate (e.g. 95%)</label>
                  <input v-model="form.successRate" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <!-- STATS FIELDS -->
                <div class="border-t pt-4 mt-4">
                  <h4 class="text-sm font-semibold mb-3 text-slate-700">Route Statistics</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-semibold mb-1">Starting Altitude (value)</label>
                      <input v-model="form.stats.startingAltitude.value" class="w-full border rounded-lg px-3 py-2" />
                      <label class="block text-xs font-semibold mb-1 mt-2">Starting Altitude (detail)</label>
                      <input v-model="form.stats.startingAltitude.detail" class="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold mb-1">Max Altitude (value)</label>
                      <input v-model="form.stats.maxAltitude.value" class="w-full border rounded-lg px-3 py-2" />
                      <label class="block text-xs font-semibold mb-1 mt-2">Max Altitude (detail)</label>
                      <input v-model="form.stats.maxAltitude.detail" class="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold mb-1">Total Distance (value)</label>
                      <input v-model="form.stats.totalDistance.value" class="w-full border rounded-lg px-3 py-2" />
                      <label class="block text-xs font-semibold mb-1 mt-2">Total Distance (detail)</label>
                      <input v-model="form.stats.totalDistance.detail" class="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold mb-1">Best Season (value)</label>
                      <input v-model="form.stats.bestSeason.value" class="w-full border rounded-lg px-3 py-2" />
                      <label class="block text-xs font-semibold mb-1 mt-2">Best Season (detail)</label>
                      <input v-model="form.stats.bestSeason.detail" class="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-xs font-semibold mb-1">Acclimatization (value)</label>
                      <input v-model="form.stats.acclimatization.value" class="w-full border rounded-lg px-3 py-2" />
                      <label class="block text-xs font-semibold mb-1 mt-2">Acclimatization (detail)</label>
                      <input v-model="form.stats.acclimatization.detail" class="w-full border rounded-lg px-3 py-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Tag / highlights (comma separated)</label>
                  <input v-model="highlightsInput" @change="syncHighlights" placeholder="comma, separated, list" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Description (long) *</label>
                  <textarea v-model="form.description" rows="6" class="w-full border rounded-lg px-3 py-2"></textarea>
                  <p v-if="!form.description" class="text-red-500 text-xs mt-1">Description is required</p>
                </div>
              </div>

              <!-- RIGHT MEDIA / SEO -->
              <div class="space-y-4">
                <!-- FEATURED IMAGE -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Featured image URL</label>
                  <div class="flex gap-2">
                    <input v-model="form.featuredImage" class="flex-1 border rounded-lg px-3 py-2" placeholder="https://..." />
                    <input 
                      type="file" 
                      @change="onFileChange($event, 'featuredImage')" 
                      class="border rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                      accept="image/*"
                    />
                  </div>
                  <img
                    v-if="form.featuredImage"
                    :src="form.featuredImage"
                    class="mt-2 h-36 w-full object-cover rounded-lg"
                  />
                </div>

                <!-- HERO IMAGE -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Hero image URL</label>
                  <div class="flex gap-2">
                    <input v-model="form.heroImage" class="flex-1 border rounded-lg px-3 py-2" placeholder="https://..." />
                    <input 
                      type="file" 
                      @change="onFileChange($event, 'heroImage')" 
                      class="border rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                      accept="image/*"
                    />
                  </div>
                  <img
                    v-if="form.heroImage"
                    :src="form.heroImage"
                    class="mt-2 h-36 w-full object-cover rounded-lg"
                  />
                </div>

                <!-- GALLERY -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Gallery</label>
                  <div class="flex gap-2 mb-2">
                    <input
                      type="file"
                      multiple
                      @change="onGalleryFiles"
                      class="flex-1 border rounded-lg px-3 py-2 text-sm"
                      accept="image/*"
                    />
                    <button
                      @click="showGalleryModal = true"
                      class="px-3 py-2 border rounded-lg text-sm whitespace-nowrap"
                    >
                      Manage
                    </button>
                  </div>
                  
                  <!-- Gallery preview -->
                  <div class="mt-3 grid grid-cols-4 gap-2">
                    <div
                      v-for="(g, i) in form.gallery"
                      :key="i"
                      class="relative group"
                    >
                      <img
                        :src="g"
                        class="h-20 w-full object-cover rounded-lg"
                      />
                      <button
                        @click="removeGalleryImage(i)"
                        class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>

                <!-- SEO -->
                <div class="border-t pt-4">
                  <h4 class="text-sm font-semibold mb-3 text-slate-700">SEO Settings</h4>
                  <div>
                    <label class="block text-xs font-semibold mb-1">SEO Title</label>
                    <input v-model="form.seo.title" class="w-full border rounded-lg px-3 py-2" />
                  </div>
                  
                  <div class="mt-3">
                    <label class="block text-xs font-semibold mb-1">SEO Description</label>
                    <input v-model="form.seo.description" class="w-full border rounded-lg px-3 py-2" />
                  </div>

                  <div class="mt-3">
                    <label class="block text-xs font-semibold mb-1">SEO Keywords (comma separated)</label>
                    <input v-model="seoKeywordsInput" @change="syncSeoKeywords" class="w-full border rounded-lg px-3 py-2" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Itinerary editor -->
            <div class="mt-6 border-t pt-6">
              <h3 class="text-base font-semibold text-slate-800 mb-3">Itinerary (day-by-day)</h3>
              <div class="space-y-3">
                <div v-for="(day, idx) in form.itinerary" :key="idx" class="border rounded-lg p-3 bg-slate-50">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label class="text-xs text-slate-600">Day no</label>
                      <input type="number" v-model.number="day.day" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div class="md:col-span-2">
                      <label class="text-xs text-slate-600">Title</label>
                      <input v-model="day.title" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div class="md:col-span-3">
                      <label class="text-xs text-slate-600">Description</label>
                      <textarea v-model="day.description" rows="3" class="w-full border rounded-lg px-2 py-1"></textarea>
                    </div>
                    <div>
                      <label class="text-xs text-slate-600">Altitude</label>
                      <input v-model="day.altitude" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div class="md:col-span-2">
                      <label class="text-xs text-slate-600">Image URL</label>
                      <div class="flex gap-2">
                        <input v-model="day.image" class="flex-1 border rounded-lg px-2 py-1" placeholder="https://..." />
                        <input 
                          type="file" 
                          @change="onFileChange($event, 'itinerary', idx)" 
                          class="border rounded-lg px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 flex justify-end">
                    <button @click="removeItinerary(idx)" class="px-3 py-1 text-sm border rounded-lg text-red-600">
                      Remove Day
                    </button>
                  </div>
                </div>

                <div class="flex gap-2">
                  <button @click="addItinerary" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                    Add Day
                  </button>
                  <button @click="sortItinerary" class="px-3 py-2 border rounded-lg text-sm">
                    Sort by Day
                  </button>
                </div>
              </div>
            </div>

            <!-- Group climbs editor -->
            <div class="mt-6 border-t pt-6">
              <h3 class="text-base font-semibold text-slate-800 mb-3">Group Climbs</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(c, idx) in form.groupClimbs" :key="idx" class="border rounded-lg p-3 bg-slate-50">
                  <label class="text-xs text-slate-600">Departure date</label>
                  <input type="date" v-model="c.date" class="w-full border rounded-lg px-2 py-1 mb-2" />
                  
                  <div class="grid grid-cols-3 gap-2 mb-2">
                    <div>
                      <label class="text-xs text-slate-600">Days</label>
                      <input type="number" v-model.number="c.days" placeholder="days" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div>
                      <label class="text-xs text-slate-600">Price</label>
                      <input type="number" v-model.number="c.price" placeholder="price" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div>
                      <label class="text-xs text-slate-600">Group</label>
                      <input type="number" v-model.number="c.groupSize" placeholder="size" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600">Spots left</span>
                    <input type="number" v-model.number="c.spotsLeft" class="w-20 border rounded-lg px-2 py-1" />
                  </div>
                  
                  <div class="mt-2 text-right">
                    <button @click="removeClimb(idx)" class="px-3 py-1 text-sm border rounded-lg text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <button @click="addClimb" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                  Add Group Climb
                </button>
              </div>
            </div>

            <!-- FAQs editor -->
            <div class="mt-6 border-t pt-6">
              <h3 class="text-base font-semibold text-slate-800 mb-3">FAQs</h3>
              <div class="space-y-3">
                <div v-for="(f, idx) in form.faqs" :key="idx" class="border rounded-lg p-3 bg-slate-50">
                  <input v-model="f.question" placeholder="Question" class="w-full border rounded-lg px-2 py-1 mb-2" />
                  <textarea v-model="f.answer" rows="3" class="w-full border rounded-lg px-2 py-1" placeholder="Answer"></textarea>
                  <div class="mt-2 text-right">
                    <button @click="removeFaq(idx)" class="px-3 py-1 border rounded-lg text-red-600 text-sm">
                      Remove FAQ
                    </button>
                  </div>
                </div>
                <button @click="addFaq" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                  Add FAQ
                </button>
              </div>
            </div>

            <!-- SAVE BUTTONS -->
            <div class="mt-6 border-t pt-6 flex flex-wrap gap-3 items-center">
              <button
                @click="save"
                :disabled="saving || !isFormValid"
                class="px-6 py-3 bg-emerald-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : isEditing ? 'Update Route' : 'Create Route' }}
              </button>

              <button
                @click="saveAndPublish"
                :disabled="saving || !isFormValid"
                class="px-6 py-3 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save & Publish
              </button>

              <button
                @click="resetForm"
                class="px-6 py-3 border rounded-lg"
              >
                Cancel
              </button>

              <span v-if="message" class="text-sm" :class="messageType === 'error' ? 'text-red-600' : 'text-emerald-600'">
                {{ message }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Gallery Management Modal -->
    <div v-if="showGalleryModal" class="fixed inset-0 bg-black/30 z-[60] flex items-center justify-center px-4">
      <div class="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Manage Gallery Images</h3>
          <button @click="showGalleryModal = false" class="p-2 rounded hover:bg-slate-100">
            ✕
          </button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(g, i) in form.gallery" :key="i" class="relative group">
            <img :src="g" class="w-full h-32 object-cover rounded-lg" />
            <button
              @click="removeGalleryImage(i)"
              class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm"
            >
              ×
            </button>
            <input
              v-model="form.gallery[i]"
              class="mt-2 w-full px-2 py-1 text-xs border rounded-lg"
              placeholder="Image URL"
            />
          </div>
        </div>
        
        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="showGalleryModal = false"
            class="px-4 py-2 border rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard', title: 'Dashboard - Routes' })
import { ref, reactive, computed, onMounted } from 'vue'

const placeholder = '/images/placeholder.png'

// list state
const routes = ref([])
const loadingList = ref(false)
const page = ref(1)
const perPage = ref(20)
const filter = ref('')

// form state
const isEditing = ref(false)
const editId = ref(null)
const saving = ref(false)
const message = ref('')
const messageType = ref('success') // 'success' or 'error'
const showModal = ref(false)
const showGalleryModal = ref(false)

// Form validation
const isFormValid = computed(() => {
  return form.name && form.slug && form.description && form.difficulty
})

const defaultForm = () => ({
  name: '',
  slug: '',
  tagline: '',
  shortDescription: '',
  duration: '',
  durationMin: null,
  durationMax: null,
  startingPrice: null,
  difficulty: '',
  successRate: '',
  highlights: [],
  featuredImage: '',
  heroImage: '',
  gallery: [],
  description: '',
  stats: {
    startingAltitude: { value: '', detail: '' },
    maxAltitude: { value: '', detail: '' },
    totalDistance: { value: '', detail: '' },
    bestSeason: { value: '', detail: '' },
    acclimatization: { value: '', detail: '' }
  },
  itinerary: [],
  groupClimbs: [],
  faqs: [],
  seo: { title: '', description: '', keywords: [] },
  isActive: true,
  isFeatured: false
})

const form = reactive(defaultForm())

// helper inputs for comma / textarea controls
const highlightsInput = ref('')
const seoKeywordsInput = ref('')

// Difficulty color helper
const difficultyClass = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return 'bg-emerald-100 text-emerald-800'
    case 'Moderate': return 'bg-blue-100 text-blue-800'
    case 'Challenging': return 'bg-amber-100 text-amber-800'
    case 'Very Challenging': return 'bg-red-100 text-red-800'
    default: return 'bg-slate-100 text-slate-800'
  }
}

// debounce helper
let timer = null
function debouncedLoad() {
  clearTimeout(timer)
  timer = setTimeout(() => { 
    page.value = 1 // Reset to first page when searching
    loadRoutes() 
  }, 400)
}

async function loadRoutes() {
  loadingList.value = true
  try {
    const q = new URLSearchParams()
    if (filter.value.trim()) q.set('search', filter.value.trim())
    q.set('page', String(page.value))
    q.set('limit', String(perPage.value))
    
    const url = '/api/routes' + (q.toString() ? `?${q.toString()}` : '')
    const res = await $fetch(url)
    
    if (res.success) {
      routes.value = res.data || []
    } else {
      routes.value = []
    }
  } catch (e) {
    console.error('loadRoutes error', e)
    routes.value = []
    showMessage('Failed to load routes', 'error')
  } finally {
    loadingList.value = false
  }
}

function prevPage(){ 
  if(page.value > 1){ 
    page.value--; 
    loadRoutes() 
  } 
}

function nextPage(){ 
  page.value++; 
  loadRoutes() 
}

function newRoute() {
  Object.assign(form, defaultForm())
  highlightsInput.value = ''
  seoKeywordsInput.value = ''
  isEditing.value = false
  editId.value = null
  message.value = ''
  showGalleryModal.value = false
  showModal.value = true
}

function editRoute(r) {
  Object.assign(form, JSON.parse(JSON.stringify(r)))
  // ensure nested objects exist
  form.stats = form.stats || defaultForm().stats
  form.itinerary = form.itinerary || []
  form.groupClimbs = form.groupClimbs || []
  form.faqs = form.faqs || []
  form.gallery = form.gallery || []
  form.seo = form.seo || { title: '', description: '', keywords: [] }

  highlightsInput.value = (form.highlights || []).join(', ')
  seoKeywordsInput.value = (form.seo.keywords || []).join(', ')

  isEditing.value = true
  editId.value = r._id
  message.value = ''
  showGalleryModal.value = false
  showModal.value = true
}

function generateSlug() {
  if (!form.name) return
  form.slug = form.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .substring(0, 100) // Limit length
}

function syncHighlights(){ 
  form.highlights = highlightsInput.value.split(',').map(s=>s.trim()).filter(Boolean) 
}

function syncSeoKeywords(){ 
  form.seo.keywords = seoKeywordsInput.value.split(',').map(s=>s.trim()).filter(Boolean) 
}

// Helper to show messages
function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

// itinerary helpers
function addItinerary() {
  form.itinerary.push({ 
    day: (form.itinerary.length ? Math.max(...form.itinerary.map(d=>d.day||0)) + 1 : 1), 
    title: '', 
    description: '', 
    altitude: '', 
    image: '' 
  })
}

function removeItinerary(i) { 
  form.itinerary.splice(i, 1) 
}

function sortItinerary(){ 
  form.itinerary.sort((a,b)=> (a.day||0) - (b.day||0)) 
}

// group climbs
function addClimb(){ 
  form.groupClimbs.push({ 
    date: new Date().toISOString().slice(0,10), 
    days: null, 
    price: null, 
    groupSize: null, 
    spotsLeft: 0 
  }) 
}

function removeClimb(i){ 
  form.groupClimbs.splice(i, 1) 
}

// faqs
function addFaq(){ 
  form.faqs.push({ question: '', answer: '' }) 
}

function removeFaq(i){ 
  form.faqs.splice(i, 1) 
}

// gallery functions
async function onGalleryFiles(e) {
  const files = Array.from(e.target.files)
  if (!files.length) return
  
  for (const file of files) {
    const url = await uploadFile(file)
    if (url) {
      form.gallery.push(url)
    }
  }
  e.target.value = '' // Clear input
}

function removeGalleryImage(index) {
  form.gallery.splice(index, 1)
}

// file upload function - FIXED VERSION
async function uploadFile(file) {
  if (!file) return null
  
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    console.log('Uploading file:', file.name, file.size, file.type)
    
    const res = await $fetch('/api/routes/upload-image', { 
      method: 'POST', 
      body: formData,
      headers: {
        // Let the browser set the correct Content-Type for FormData
      }
    })
    
    console.log('Upload response:', res)
    
    if (res && res.url) {
      showMessage('Image uploaded successfully')
      return res.url
    } else {
      throw new Error('No URL returned from upload')
    }
  } catch (e) { 
    console.error('uploadFile error:', e)
    showMessage('Upload failed: ' + (e.data?.message || e.message || 'Unknown error'), 'error')
    return null 
  }
}

async function onFileChange(e, target, idx = null) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  
  console.log('File selected:', file.name, 'for target:', target)
  
  const url = await uploadFile(file)
  if (!url) return
  
  if (target === 'featuredImage') {
    form.featuredImage = url
  } else if (target === 'heroImage') {
    form.heroImage = url
  } else if (target === 'itinerary' && typeof idx === 'number') {
    form.itinerary[idx].image = url
  }
  
  // Reset file input
  e.target.value = ''
}

function confirmDelete(r) {
  if (!confirm(`Delete route "${r.name}"? This cannot be undone.`)) return
  deleteRoute(r._id)
}

async function deleteRoute(id) {
  try {
    await $fetch(`/api/routes/${id}`, { method: 'DELETE' })
    showMessage('Route deleted successfully')
    await loadRoutes()
    if (editId.value === id) {
      resetForm()
    }
  } catch (e) { 
    console.error('deleteRoute', e)
    showMessage('Delete failed: ' + (e.data?.message || e.message), 'error')
  }
}

async function save() {
  if (!isFormValid.value) {
    showMessage('Please fill all required fields', 'error')
    return
  }
  
  saving.value = true
  try {
    // ensure arrays/structure
    syncHighlights()
    syncSeoKeywords()
    
    const payload = JSON.parse(JSON.stringify(form))
    
    // Format group climb dates
    payload.groupClimbs = (payload.groupClimbs || []).map(g => ({
      ...g,
      date: g.date || new Date().toISOString().slice(0,10)
    }))

    let res
    if (isEditing.value && editId.value) {
      res = await $fetch(`/api/routes/${editId.value}`, { 
        method: 'PUT', 
        body: payload 
      })
      showMessage('Route updated successfully')
    } else {
      res = await $fetch('/api/routes', { 
        method: 'POST', 
        body: payload 
      })
      showMessage('Route created successfully')
      editId.value = res.data?._id
      isEditing.value = true
    }
    
    await loadRoutes()
    
  } catch (e) { 
    console.error('Save error:', e)
    showMessage('Save failed: ' + (e.data?.message || e.message || 'Unknown error'), 'error')
  }
  finally { 
    saving.value = false 
  }
}

async function saveAndPublish() {
  form.isActive = true
  await save()
}

function resetForm() {
  Object.assign(form, defaultForm())
  highlightsInput.value = ''
  seoKeywordsInput.value = ''
  isEditing.value = false
  editId.value = null
  message.value = ''
  showGalleryModal.value = false
  showModal.value = false
}

onMounted(() => { 
  loadRoutes() 
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
</style>