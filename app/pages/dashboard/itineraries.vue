<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-6">
      <!-- Header -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-5 flex items-center justify-between gap-3"
      >
        <div>
          <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
            Itineraries
          </p>
          <h1 class="text-xl md:text-2xl font-bold text-slate-900">
            Saved itineraries
          </h1>
          <p class="text-xs md:text-sm text-slate-500">
            These itineraries were built from client leads using the itinerary builder.
          </p>
        </div>

        <div class="text-right text-xs md:text-sm text-slate-500">
          <div class="font-semibold text-slate-800">
            Total: {{ totalItineraries }}
          </div>
          <div v-if="isLoading" class="text-[11px] text-slate-400">
            Loading…
          </div>
        </div>
      </div>

      <!-- Error message -->
      <div
        v-if="loadError"
        class="bg-white rounded-2xl border border-rose-100 text-rose-700 text-sm px-5 py-3"
      >
        {{ loadError }}
      </div>

      <!-- Itineraries table -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-4 md:px-6 py-5"
      >
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-slate-900">
            Itinerary list
          </h2>
          <p class="text-[11px] text-slate-400">
            Click preview to see details. Public link will open the client-facing page.
          </p>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-slate-100">
          <table class="min-w-full text-sm">
            <thead class="bg-slate-50/80">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">Title</th>
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

      <!-- Simple preview modal (stub, will be improved in Phase 4) -->
      <transition name="fade">
        <div
          v-if="isPreviewOpen && selectedItinerary"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
          <div
            class="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[80vh] overflow-y-auto"
          >
            <div class="flex items-center justify-between px-5 py-4 border-b bg-slate-50/70">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                  Itinerary preview
                </p>
                <h2 class="text-lg font-semibold text-slate-900">
                  {{ selectedItinerary.title || 'Untitled itinerary' }}
                </h2>
                <p class="text-[11px] text-slate-500">
                  Guest: {{ selectedItinerary.guestName || 'Guest' }}
                  • {{ selectedItinerary.guestEmail || 'No email' }}
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

            <div class="px-5 py-4 space-y-4 text-sm text-slate-700">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <div class="text-slate-500">Travel date</div>
                  <div class="font-medium">
                    {{ formatDate(selectedItinerary.travelDate) || '—' }}
                  </div>
                </div>
                <div>
                  <div class="text-slate-500">Days</div>
                  <div class="font-medium">
                    {{ selectedItinerary.days?.length || 0 }}
                  </div>
                </div>
                <div>
                  <div class="text-slate-500">Travellers</div>
                  <div class="font-medium">
                    {{ selectedItinerary.travellers ?? '—' }}
                  </div>
                </div>
                <div>
                  <div class="text-slate-500">Status</div>
                  <div class="font-medium capitalize">
                    {{ selectedItinerary.status || 'draft' }}
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-xs font-semibold text-slate-500 mb-2">
                  Day-by-day overview (simple preview)
                </h3>
                <div
                  v-if="selectedItinerary.days && selectedItinerary.days.length"
                  class="space-y-2 text-xs"
                >
                  <div
                    v-for="d in selectedItinerary.days"
                    :key="d._id || d.dayNumber"
                    class="border rounded-lg px-3 py-2 bg-slate-50/80"
                  >
                    <div class="font-semibold">
                      Day {{ d.dayNumber }} — {{ d.title || `Day ${d.dayNumber}` }}
                    </div>
                    <div
                      v-if="d.notes"
                      class="text-[11px] text-slate-500 mt-0.5"
                    >
                      {{ d.notes }}
                    </div>
                    <div
                      v-if="d.activities && d.activities.length"
                      class="text-[11px] text-slate-500 mt-1"
                    >
                      {{ d.activities.length }} activity(ies) selected
                    </div>
                  </div>
                </div>
                <p
                  v-else
                  class="text-[11px] text-slate-400"
                >
                  No day-by-day data saved yet.
                </p>
              </div>

              <p class="text-[11px] text-slate-400">
                This is a simple preview. In the next phase we’ll build a full visual
                itinerary preview similar to your public itinerary page.
              </p>
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
const isLoading = ref(true)
const loadError = ref('')

// Preview state
const isPreviewOpen = ref(false)
const selectedItinerary = ref(null)

const totalItineraries = computed(() => itineraries.value.length)

function statusPillClass (status) {
  const s = status || 'draft'
  if (s === 'draft') return 'bg-slate-100 text-slate-700'
  if (s === 'pending' || s === 'sent') return 'bg-amber-50 text-amber-700'
  if (s === 'confirmed') return 'bg-emerald-50 text-emerald-700'
  if (s === 'cancelled') return 'bg-rose-50 text-rose-700'
  return 'bg-slate-100 text-slate-700'
}

function formatDate (value) {
  if (!value) return '—'
  try {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return '—'
    return d.toLocaleDateString()
  } catch {
    return '—'
  }
}

function formatTime (value) {
  if (!value) return ''
  try {
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return ''
  }
}

// Load itineraries from API
onMounted(async () => {
  try {
    const data = await $fetch('/api/itineraries')
    itineraries.value = data || []
  } catch (err) {
    console.error('Failed to load itineraries', err)
    loadError.value = 'Failed to load itineraries. Please check the server console for details.'
  } finally {
    isLoading.value = false
  }
})

// Preview handlers
function openPreview (it) {
  selectedItinerary.value = it
  isPreviewOpen.value = true
}

function closePreview () {
  isPreviewOpen.value = false
  selectedItinerary.value = null
}

// Copy public link (uses slug)
async function copyLink (it) {
  if (!it.slug) {
    alert('This itinerary has no public link yet.')
    return
  }

  if (typeof window === 'undefined') return

  const url = `${window.location.origin}/itineraries/${it.slug}`

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard')
    } else {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Link copied to clipboard')
    }
  } catch (err) {
    console.error('Failed to copy link', err)
    alert('Could not copy link. Please copy it manually.')
  }
}

// Open public link in new tab
function openLink (it) {
  if (!it.slug) {
    alert('This itinerary has no public link yet.')
    return
  }
  if (typeof window === 'undefined') return

  const url = `/itineraries/${it.slug}`
  window.open(url, '_blank')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
