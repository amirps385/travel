<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 lg:px-6 py-8 space-y-6">
      <!-- Top header -->
      <div class="flex items-center justify-between gap-3 mb-2">
        <div>
          <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
            Build itinerary
          </p>
          <h1 class="text-xl md:text-2xl font-bold text-slate-900">
            {{ lead ? `Itinerary for ${lead.name || 'Guest'}` : 'Loading lead…' }}
          </h1>
          <p class="text-xs md:text-sm text-slate-500" v-if="lead">
            {{ lead.email || 'No email' }} •
            {{ lead.travellers || 0 }} travellers •
            {{ lead.days || '-' }} days •
            Travel date:
            <span class="font-medium">
              {{ prettyLeadDate || '—' }}
            </span>
          </p>
        </div>

        <button
          type="button"
          class="hidden sm:inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          @click="goBack"
        >
          ← Back to leads
        </button>
      </div>

      <!-- Lead still loading -->
      <div
        v-if="isLoadingLead"
        class="bg-white/90 rounded-2xl border border-slate-100 shadow p-6 text-sm text-slate-500"
      >
        Loading lead details…
      </div>

      <!-- MAIN BUILDER -->
      <div
        v-else-if="lead"
        class="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <!-- LEFT: trip basics + hotels -->
        <section class="lg:col-span-5 space-y-6">
          <!-- Trip basics -->
          <div class="bg-white/90 rounded-2xl border border-slate-100 shadow p-5 space-y-4">
            <h2 class="text-sm font-semibold text-slate-900">
              Trip basics
            </h2>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Itinerary title
              </label>
              <input
                v-model="itineraryTitle"
                type="text"
                class="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Tanzania Safari Itinerary"
              />
              <p class="mt-1 text-[11px] text-slate-400">
                This title will be shown on the preview page and public link.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Start date
                </label>
                <input
                  v-model="startDate"
                  type="date"
                  class="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Number of days
                </label>
                <input
                  v-model.number="daysCount"
                  type="number"
                  min="1"
                  class="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Hotels -->
          <div class="bg-white/90 rounded-2xl border border-slate-100 shadow p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-semibold text-slate-900">
                Accommodation
              </h2>
              <span class="text-[11px] text-slate-400">
                Optional
              </span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Main hotel / lodge
              </label>
              <select
                v-model="selectedHotelId"
                class="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="">
                  Select hotel (optional)
                </option>
                <option
                  v-for="hotel in hotels"
                  :key="hotel._id || hotel.id"
                  :value="hotel._id || hotel.id"
                >
                  {{ hotel.name }} — {{ hotel.destination || 'Unknown destination' }}
                </option>
              </select>
              <p class="mt-1 text-[11px] text-slate-400">
                Later we can support multiple hotels and nights. For now you can select
                one primary hotel.
              </p>
            </div>
          </div>
        </section>

        <!-- MIDDLE: day-by-day builder -->
        <main class="lg:col-span-7 space-y-4">
          <div class="bg-white/90 rounded-2xl border border-slate-100 shadow p-5">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-sm font-semibold text-slate-900">
                Day-by-day plan
              </h2>
              <p class="text-[11px] text-slate-400">
                Choose activities for each day.
              </p>
            </div>

            <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div
                v-for="day in dayPlans"
                :key="day.dayNumber"
                class="border rounded-xl px-4 py-3 bg-slate-50/60"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="text-sm font-semibold text-slate-900">
                      Day {{ day.dayNumber }}
                    </div>
                    <div class="text-[11px] text-slate-500">
                      {{ day.dateLabel }}
                    </div>
                  </div>
                  <button
                    type="button"
                    class="text-[11px] text-sky-600"
                    @click="toggleDay(day.dayNumber)"
                  >
                    {{ expandedDays.includes(day.dayNumber) ? 'Collapse' : 'Expand' }}
                  </button>
                </div>

                <transition name="fade">
                  <div
                    v-if="expandedDays.includes(day.dayNumber)"
                    class="mt-3 space-y-3"
                  >
                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                        Day title
                      </label>
                      <input
                        v-model="day.title"
                        type="text"
                        class="w-full border rounded-lg px-3 py-2 text-sm"
                        :placeholder="`Day ${day.dayNumber} — Game drives & activities`"
                      />
                    </div>

                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                        Notes / summary
                      </label>
                      <textarea
                        v-model="day.notes"
                        rows="2"
                        class="w-full border rounded-lg px-3 py-2 text-sm"
                        placeholder="Short description of what happens this day."
                      ></textarea>
                    </div>

                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">
                        Activities for this day
                      </label>

                      <div
                        v-if="activities.length"
                        class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-44 overflow-y-auto border rounded-lg p-2 bg-white"
                      >
                        <label
                          v-for="act in activities"
                          :key="act._id || act.id"
                          class="flex items-start gap-2 text-xs text-slate-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            :value="act._id || act.id"
                            v-model="day.activityIds"
                            class="mt-0.5"
                          />
                          <span>
                            <span class="font-semibold">{{ act.name }}</span>
                            <span class="block text-[11px] text-slate-500">
                              {{ act.location || act.type || '' }}
                            </span>
                          </span>
                        </label>
                      </div>

                      <p v-else class="text-[11px] text-slate-400">
                        No activities loaded yet.
                      </p>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Save bar -->
         <!-- Save bar -->
<div class="flex items-center justify-between gap-3">
  <p class="text-[11px] text-slate-500">
    When you click “Save itinerary”, a draft itinerary will be created and shown
    under the Itineraries tab.
  </p>
  <div class="flex items-center gap-2">
    <button
      type="button"
      class="hidden sm:inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
      @click="goBack"
    >
      Cancel
    </button>
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs md:text-sm font-semibold px-4 py-2 shadow-sm disabled:opacity-60"
      :disabled="isSaving || !canSave"
      @click="saveItinerary"
    >
      {{ isSaving ? 'Saving…' : 'Save Itinerary' }}
    </button>
  </div>
</div>

<!-- Success message -->
<p v-if="successMessage" class="text-[11px] text-emerald-600 mt-1">
  {{ successMessage }}
</p>

<!-- Error message -->
<p v-if="saveError" class="text-[11px] text-rose-600 mt-1">
  {{ saveError }}
</p>

        </main>
      </div>

      <!-- No lead found -->
      <div
        v-else
        class="bg-white/90 rounded-2xl border border-slate-100 shadow p-6 text-sm text-rose-600"
      >
        Lead not found. Maybe it was deleted?
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'dashboard',
  title: 'Build Itinerary'
})
const successMessage = ref('')

const route = useRoute()
const router = useRouter()
const leadId = computed(() => route.params.id)

// --- core state ---
const lead = ref(null)
const isLoadingLead = ref(true)

const hotels = ref([])
const activities = ref([])

const itineraryTitle = ref('')
const startDate = ref('')
const daysCount = ref(1)

const dayPlans = ref([])
const expandedDays = ref([])

const isSaving = ref(false)
const saveError = ref('')

// --- helpers ---
const prettyLeadDate = computed(() => {
  if (!lead.value?.date) return ''
  try {
    return new Date(lead.value.date).toLocaleDateString()
  } catch {
    return lead.value.date
  }
})

const canSave = computed(() => {
  return !!lead.value && !!itineraryTitle.value && dayPlans.value.length > 0
})

// init / recompute day plans when startDate or daysCount changes
watch([startDate, daysCount], () => {
  buildDayPlans()
})

function buildDayPlans () {
  const count = Number(daysCount.value || 1)
  const baseDate = startDate.value ? new Date(startDate.value) : null

  const newPlans = []
  for (let i = 1; i <= count; i++) {
    const existing = dayPlans.value.find(d => d.dayNumber === i)

    let dateLabel = ''
    if (baseDate) {
      const d = new Date(baseDate)
      d.setDate(d.getDate() + (i - 1))
      dateLabel = d.toDateString()
    }

    newPlans.push(
      existing || {
        dayNumber: i,
        title: '',
        notes: '',
        activityIds: [],
        dateLabel
      }
    )

    if (!existing) {
      newPlans[newPlans.length - 1].dateLabel = dateLabel
    } else {
      existing.dateLabel = dateLabel
    }
  }

  dayPlans.value = newPlans
  // expand day 1 by default
  if (!expandedDays.value.length && newPlans.length) {
    expandedDays.value = [1]
  }
}

function toggleDay (n) {
  if (expandedDays.value.includes(n)) {
    expandedDays.value = expandedDays.value.filter(x => x !== n)
  } else {
    expandedDays.value.push(n)
  }
}

function goBack () {
  router.push('/dashboard/leads')
}

// --- load data ---
onMounted(async () => {
  try {
    // 1) load lead
    const l = await $fetch(`/api/leads/${leadId.value}`)
    lead.value = l || null

    // pre-fill basics from lead
    if (lead.value) {
      itineraryTitle.value =
        `Trip for ${lead.value.name || 'Guest'}`

      if (lead.value.date) {
        // lead.date is usually ISO string
        const d = new Date(lead.value.date)
        startDate.value = d.toISOString().slice(0, 10)
      }

      daysCount.value = lead.value.days || lead.value.travellers || 1
    }

    // 2) load hotels & activities
    const [h, a] = await Promise.all([
      $fetch('/api/hotels').catch(() => []),
      $fetch('/api/activities').catch(() => [])
    ])
    hotels.value = h || []
    activities.value = a || []

    buildDayPlans()
  } catch (err) {
    console.error('Failed to load builder data', err)
  } finally {
    isLoadingLead.value = false
  }
})

// --- save itinerary ---
async function saveItinerary () {
  if (!lead.value) return

  saveError.value = ''
  successMessage.value = ''   // <--- add this ref in your script
  isSaving.value = true

  try {
    const payload = {
      leadId: lead.value._id || leadId.value,
      title: itineraryTitle.value,
      status: 'draft',
      guestName: lead.value.name,
      guestEmail: lead.value.email,
      travellers: lead.value.travellers,
      days: dayPlans.value.map(d => ({
        dayNumber: d.dayNumber,
        title: d.title || `Day ${d.dayNumber}`,
        notes: d.notes || '',
        activities: (d.activityIds || []).map(id => ({
          activityId: id
        }))
      })),
      selectedHotels: selectedHotelId.value
        ? [
            {
              hotelId: selectedHotelId.value,
              nights: daysCount.value || 1,
              notes: ''
            }
          ]
        : [],
      travelDate: startDate.value || lead.value.date || null,
      budgetPerPerson: lead.value.budget || null
    }

    await $fetch('/api/itineraries', {
      method: 'POST',
      body: payload
    })

    // ✅ DO NOT REDIRECT
    successMessage.value = 'Itinerary saved successfully!'

  } catch (err) {
    console.error('Failed to save itinerary', err)
    saveError.value = 'Failed to save itinerary. Please check the server console for details.'
  } finally {
    isSaving.value = false
  }
}


// selected hotel (single for now)
const selectedHotelId = ref('')
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
