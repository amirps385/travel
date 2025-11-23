<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-6">
      <!-- HEADER -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-4 flex items-center justify-between"
      >
        <div>
          <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
            Itineraries
          </p>
          <h1 class="text-xl md:text-2xl font-bold text-slate-900">
            Created itineraries
          </h1>
          <p class="text-xs md:text-sm text-slate-500">
            These itineraries are created from leads and can be previewed or shared via link.
          </p>
        </div>

        <div class="text-xs text-slate-500 text-right">
          <div>Total itineraries: <span class="font-semibold">{{ itineraries.length }}</span></div>
          <div v-if="isLoading" class="text-[11px] text-slate-400">Loading…</div>
        </div>
      </div>

      <!-- LIST CARD -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6">
        <p v-if="loadError" class="mb-3 text-xs text-rose-600">
          {{ loadError }}
        </p>

        <div class="overflow-x-auto rounded-2xl border border-slate-100">
          <table class="min-w-full text-sm">
            <thead class="bg-slate-50">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">Itinerary</th>
                <th class="py-3 px-4">Guest</th>
                <th class="py-3 px-4">Travel date</th>
                <th class="py-3 px-4">Days</th>
                <th class="py-3 px-4">Travellers</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4">Created</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="it in itineraries"
                :key="it._id"
                class="border-b last:border-b-0 hover:bg-slate-50/80"
              >
                <!-- Title -->
                <td class="py-3 px-4">
                  <div class="font-medium text-slate-900 truncate max-w-[220px]">
                    {{ it.title || 'Untitled itinerary' }}
                  </div>
                  <div class="text-[11px] text-slate-400">
                    Lead ID: {{ it.leadId || '—' }}
                  </div>
                </td>

                <!-- Guest -->
                <td class="py-3 px-4">
                  <div class="text-sm font-medium text-slate-900">
                    {{ it.guestName || 'Guest' }}
                  </div>
                  <div class="text-[11px] text-slate-500 truncate max-w-[180px]">
                    {{ it.guestEmail || 'No email' }}
                  </div>
                </td>

                <!-- Travel date -->
                <td class="py-3 px-4 text-slate-700">
                  {{ formatDate(it.travelDate) }}
                </td>

                <!-- Days -->
                <td class="py-3 px-4 text-slate-700">
                  {{ it.days?.length || 0 }}
                </td>

                <!-- Travellers -->
                <td class="py-3 px-4 text-slate-700">
                  {{ it.travellers ?? '—' }}
                </td>

                <!-- Status -->
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    :class="statusPillClass(it.status)"
                  >
                    {{ it.status || 'draft' }}
                  </span>
                </td>

                <!-- Created -->
                <td class="py-3 px-4 text-slate-700">
                  <div class="text-xs">
                    {{ formatDate(it.createdAt) }}
                  </div>
                  <div class="text-[10px] text-slate-400">
                    {{ formatTime(it.createdAt) }}
                  </div>
                </td>

                <!-- Actions -->
                <td class="py-3 pr-4 text-right">
                  <div class="inline-flex items-center gap-1">
                    <!-- Preview -->
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                      @click="openPreview(it)"
                    >
                      👁 Preview
                    </button>

                    <!-- Copy link -->
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                      :disabled="!it.slug"
                      @click="copyLink(it)"
                    >
                      🔗 Copy link
                    </button>

                    <!-- Open link -->
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                      :disabled="!it.slug"
                      @click="openLink(it)"
                    >
                      🌐 Open
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!isLoading && !itineraries.length">
                <td colspan="8" class="py-6 px-4 text-center text-xs text-slate-500">
                  No itineraries created yet. Go to the Leads tab, click “Build” on a lead,
                  and save an itinerary to see it here.
                </td>
              </tr>

              <tr v-if="isLoading">
                <td colspan="8" class="py-6 px-4 text-center text-xs text-slate-500">
                  Loading itineraries…
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- PREVIEW MODAL -->
      <transition name="fade">
        <div
          v-if="isPreviewOpen && previewItinerary"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
          <div
            class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
          >
            <!-- Modal header -->
            <div class="flex items-center justify-between px-6 py-4 border-b bg-slate-50/70">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                  Itinerary Preview
                </p>
                <h2 class="text-lg font-semibold text-slate-900">
                  {{ previewItinerary.title || 'Untitled itinerary' }}
                </h2>
                <p class="text-xs text-slate-500 mt-1">
                  {{ previewItinerary.guestName || 'Guest' }} •
                  {{ previewItinerary.travellers || 0 }} travellers •
                  {{ previewItinerary.days?.length || 0 }} days •
                  Travel date:
                  <span class="font-medium">
                    {{ formatDate(previewItinerary.travelDate) }}
                  </span>
                </p>
              </div>
              <button
                type="button"
                class="rounded-full w-8 h-8 flex items-center justify-center border bg-white hover:bg-slate-100"
                @click="closePreview"
              >
                ✕
              </button>
            </div>

            <!-- Modal body -->
            <div class="px-6 py-5 space-y-6 text-sm text-slate-700">
              <!-- Basic info -->
              <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-xl p-4 bg-slate-50/60">
                  <h3 class="text-xs font-semibold text-slate-500 mb-2">Guest</h3>
                  <p class="font-medium">{{ previewItinerary.guestName || 'Guest' }}</p>
                  <p class="text-xs text-slate-500">
                    {{ previewItinerary.guestEmail || 'No email' }}
                  </p>
                </div>

                <div class="border rounded-xl p-4 bg-slate-50/60">
                  <h3 class="text-xs font-semibold text-slate-500 mb-2">Trip overview</h3>
                  <p class="text-xs text-slate-600">
                    Travellers:
                    <span class="font-medium">{{ previewItinerary.travellers || 0 }}</span>
                  </p>
                  <p class="text-xs text-slate-600">
                    Days:
                    <span class="font-medium">{{ previewItinerary.days?.length || 0 }}</span>
                  </p>
                  <p class="text-xs text-slate-600">
                    Status:
                    <span class="font-medium capitalize">
                      {{ previewItinerary.status || 'draft' }}
                    </span>
                  </p>
                  <p class="text-xs text-slate-600" v-if="previewItinerary.budgetPerPerson">
                    Budget / person:
                    <span class="font-medium">
                      ${{ previewItinerary.budgetPerPerson }}
                    </span>
                  </p>
                </div>
              </section>

              <!-- Hotels -->
              <section>
                <h3 class="text-xs font-semibold text-slate-500 mb-2">
                  Hotels / Lodges
                </h3>

                <div v-if="previewSelectedHotels.length" class="space-y-2">
                  <div
                    v-for="h in previewSelectedHotels"
                    :key="h.hotelId"
                    class="border rounded-xl px-4 py-3 bg-white flex items-start justify-between gap-3"
                  >
                    <div>
                      <p class="text-sm font-semibold text-slate-900">
                        {{ h.hotelName }}
                      </p>
                      <p class="text-xs text-slate-500">
                        {{ h.destination || 'Destination not set' }}
                      </p>
                      <p class="text-[11px] text-slate-400" v-if="h.range">
                        Range: {{ h.range }}
                      </p>
                    </div>
                    <div class="text-right text-xs text-slate-500">
                      <p class="font-medium">
                        Nights: {{ h.nights || 1 }}
                      </p>
                      <p class="text-[11px]" v-if="h.notes">
                        {{ h.notes }}
                      </p>
                    </div>
                  </div>
                </div>

                <p v-else class="text-xs text-slate-400">
                  No hotels selected for this itinerary.
                </p>
              </section>

              <!-- Day-by-day -->
              <section>
                <h3 class="text-xs font-semibold text-slate-500 mb-2">
                  Day-by-day plan
                </h3>

                <div v-if="previewItinerary.days?.length" class="space-y-3">
                  <div
                    v-for="day in previewItinerary.days"
                    :key="day.dayNumber"
                    class="border rounded-xl px-4 py-3 bg-slate-50/60"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <p class="text-sm font-semibold text-slate-900">
                          Day {{ day.dayNumber }} — {{ day.title || `Day ${day.dayNumber}` }}
                        </p>
                        <p class="text-[11px] text-slate-500" v-if="day.notes">
                          {{ day.notes }}
                        </p>
                      </div>
                    </div>

                    <!-- Activities -->
                    <div class="mt-2" v-if="day.activities && day.activities.length">
                      <p class="text-[11px] font-semibold text-slate-600 mb-1">
                        Activities
                      </p>
                      <div class="flex flex-wrap gap-1">
                        <span
                          v-for="(act, idx) in day.activities"
                          :key="idx"
                          class="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px]"
                        >
                          {{ getActivityName(act.activityId) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p v-else class="text-xs text-slate-400">
                  No day structure defined for this itinerary.
                </p>
              </section>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Itineraries'
})

const itineraries = ref([])
const isLoading = ref(false)
const loadError = ref('')

// Preview modal state
const isPreviewOpen = ref(false)
const previewItinerary = ref(null)

// For resolving names in preview
const allHotels = ref([])
const allActivities = ref([])

onMounted(async () => {
  await loadData()
})

async function loadData () {
  isLoading.value = true
  loadError.value = ''

  try {
    const [its, hotels, acts] = await Promise.all([
      $fetch('/api/itineraries'),
      $fetch('/api/hotels').catch(() => []),
      $fetch('/api/activities').catch(() => [])
    ])

    itineraries.value = its || []
    allHotels.value = hotels || []
    allActivities.value = acts || []
  } catch (err) {
    console.error('Failed to load itineraries', err)
    loadError.value = 'Failed to load itineraries. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

function formatDate (value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } catch {
    return '—'
  }
}

function formatTime (value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return '—'
  }
}

function statusPillClass (status) {
  const s = status || 'draft'
  if (s === 'sent') return 'bg-sky-50 text-sky-700'
  if (s === 'accepted') return 'bg-emerald-50 text-emerald-700'
  if (s === 'rejected') return 'bg-rose-50 text-rose-700'
  return 'bg-slate-100 text-slate-700'
}

// --- Preview modal logic ---
function openPreview (itinerary) {
  previewItinerary.value = itinerary
  isPreviewOpen.value = true
}

function closePreview () {
  isPreviewOpen.value = false
  previewItinerary.value = null
}

// Helpers to resolve hotel & activity names
function findHotelById (id) {
  return allHotels.value.find(h => (h._id || h.id) === id)
}

const previewSelectedHotels = computed(() => {
  if (!previewItinerary.value) return []

  const arr = previewItinerary.value.selectedHotels || []
  return arr.map(sel => {
    const hotel = findHotelById(sel.hotelId) || {}
    return {
      ...sel,
      hotelName: hotel.name || 'Unknown hotel',
      destination: hotel.destination || '',
      range: hotel.range || ''
    }
  })
})

function getActivityName (id) {
  if (!id) return 'Activity'
  const act = allActivities.value.find(a => (a._id || a.id) === id)
  return act ? act.name : 'Activity'
}

// --- Copy / open public link ---
async function copyLink (itinerary) {
  if (!itinerary.slug) return

  try {
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000'

    const url = `${origin}/itinerary/${itinerary.slug}`
    await navigator.clipboard.writeText(url)
    alert('Public itinerary link copied to clipboard.')
  } catch (err) {
    console.error('Failed to copy link', err)
    alert('Failed to copy link.')
  }
}

function openLink (itinerary) {
  if (!itinerary.slug) return

  const url = `/itinerary/${itinerary.slug}`
  if (typeof window !== 'undefined') {
    window.open(url, '_blank')
  }
}
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
