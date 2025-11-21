<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 lg:px-6 py-8 space-y-6">
      <!-- Breadcrumb + header -->
      <div class="flex items-center justify-between gap-3">
        <div>
          <nav class="text-xs text-slate-500 mb-1">
            <NuxtLink to="/dashboard" class="hover:underline">Dashboard</NuxtLink>
            <span class="mx-1">/</span>
            <button type="button" class="hover:underline" @click="goToLeads">Leads</button>
            <span class="mx-1">/</span>
            <span class="text-slate-700">Build itinerary</span>
          </nav>
          <h1 class="text-xl md:text-2xl font-bold text-slate-900">
            Build itinerary for {{ leadSummary.name || 'Guest' }}
          </h1>
          <p class="text-xs md:text-sm text-slate-500">
            {{ leadSummary.travellers }} travellers · {{ leadSummary.days }} days ·
            {{ leadSummary.prettyDate }}
          </p>
        </div>
        <div class="hidden sm:flex flex-col items-end text-xs text-slate-500">
          <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 bg-slate-100">
            <span class="w-2 h-2 rounded-full bg-sky-500"></span>
            Builder mode
          </span>
        </div>
      </div>

      <!-- Lead summary card -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 py-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
          <div>
            <h3 class="text-xs font-semibold text-slate-500 mb-1">Guest</h3>
            <p class="font-medium">{{ leadSummary.name || '—' }}</p>
            <p class="text-xs text-slate-500">{{ leadSummary.email || 'No email' }}</p>
          </div>
          <div>
            <h3 class="text-xs font-semibold text-slate-500 mb-1">Trip details</h3>
            <p>{{ leadSummary.travellers }} travellers · {{ leadSummary.days }} days</p>
            <p class="text-xs text-slate-500">
              Who is travelling: {{ leadSummary.who || '—' }}
            </p>
          </div>
          <div>
            <h3 class="text-xs font-semibold text-slate-500 mb-1">Activities & budget</h3>
            <p class="truncate">
              Activities: {{ leadSummary.activitiesText || '—' }}
            </p>
            <p class="text-xs text-slate-500">
              Budget per person: {{ leadSummary.budget ? '$' + leadSummary.budget : '—' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Main builder: Hotels + Day planner -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- HOTEL SELECTION -->
        <section class="bg-white rounded-2xl shadow border border-slate-100 p-5 space-y-4">
          <div class="flex items-center justify-between gap-2">
            <div>
              <h2 class="text-base font-semibold text-slate-900">1. Select hotel</h2>
              <p class="text-xs text-slate-500">
                Choose a primary hotel / camp that matches the guest’s budget.
              </p>
            </div>
          </div>

          <div class="flex gap-2 text-sm">
            <input
              v-model="hotelSearch"
              type="text"
              placeholder="Search hotels by name or location"
              class="border rounded-lg px-3 py-2 w-full text-sm"
            />
          </div>

          <div class="space-y-3 max-h-72 overflow-y-auto pr-1">
            <button
              v-for="hotel in filteredHotels"
              :key="hotel.id"
              type="button"
              @click="selectHotel(hotel)"
              :class="[
                'w-full text-left border rounded-xl px-4 py-3 text-sm flex justify-between items-center gap-3 hover:bg-slate-50',
                selectedHotel && selectedHotel.id === hotel.id
                  ? 'border-sky-500 bg-sky-50/60'
                  : 'border-slate-200'
              ]"
            >
              <div>
                <div class="font-medium text-slate-900">{{ hotel.name }}</div>
                <div class="text-xs text-slate-500">
                  {{ hotel.location }} · {{ hotel.category }}
                </div>
              </div>
              <div class="text-right text-xs text-slate-600">
                From
                <span class="font-semibold">${{ hotel.minBudget }}</span>
                <span class="text-slate-400">/ person</span>
              </div>
            </button>

            <p v-if="filteredHotels.length === 0" class="text-xs text-slate-500">
              No hotels match this search yet.
            </p>
          </div>

          <div class="text-xs text-slate-500 border-t pt-3 mt-2">
            Selected hotel:
            <span v-if="selectedHotel" class="font-medium text-slate-800">
              {{ selectedHotel.name }}
            </span>
            <span v-else>None yet</span>
          </div>
        </section>

        <!-- DAY-BY-DAY ACTIVITIES -->
        <section class="bg-white rounded-2xl shadow border border-slate-100 p-5 space-y-4">
          <div class="flex items-center justify-between gap-2">
            <div>
              <h2 class="text-base font-semibold text-slate-900">2. Plan activities</h2>
              <p class="text-xs text-slate-500">
                Assign activities for each day of the trip.
              </p>
            </div>
          </div>

          <div v-if="days.length === 0" class="text-xs text-slate-500">
            This lead has no days specified.
          </div>

          <div
            v-else
            class="space-y-3 max-h-80 overflow-y-auto pr-1"
          >
            <div
              v-for="day in days"
              :key="day.dayNumber"
              class="border rounded-xl px-4 py-3 text-sm"
            >
              <div class="flex items-center justify-between gap-2 mb-2">
                <div class="font-medium text-slate-900">
                  Day {{ day.dayNumber }}
                </div>
                <div class="text-[11px] text-slate-500">
                  {{ leadSummary.prettyDate }} + {{ day.dayNumber - 1 }} days
                </div>
              </div>

              <!-- Selected activities chips -->
              <div class="flex flex-wrap gap-1 mb-2 min-h-5">
                <span
                  v-for="act in day.selectedActivities"
                  :key="act.id"
                  class="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 text-[11px] px-2 py-0.5"
                >
                  {{ act.name }}
                  <button
                    type="button"
                    class="text-[9px]"
                    @click="removeActivityFromDay(day.dayNumber, act.id)"
                  >
                    ✕
                  </button>
                </span>
                <span
                  v-if="day.selectedActivities.length === 0"
                  class="text-[11px] text-slate-400"
                >
                  No activities yet
                </span>
              </div>

              <!-- Search box -->
              <input
                v-model="day.search"
                type="text"
                placeholder="Search activities for this day"
                class="border rounded-lg px-3 py-1.5 w-full text-xs mb-2"
              />

              <!-- Suggestions list -->
              <div class="space-y-1 max-h-28 overflow-y-auto">
                <button
                  v-for="act in filteredActivitiesForDay(day)"
                  :key="act.id"
                  type="button"
                  class="w-full text-left text-[11px] border rounded-lg px-2 py-1 hover:bg-slate-50 flex justify-between items-center gap-2"
                  @click="addActivityToDay(day.dayNumber, act)"
                >
                  <span class="truncate">
                    {{ act.name }}
                    <span class="text-slate-400">
                      · {{ act.location }} · {{ act.duration }}
                    </span>
                  </span>
                  <span class="text-slate-400 text-[10px]">{{ act.code }}</span>
                </button>
                <p
                  v-if="filteredActivitiesForDay(day).length === 0"
                  class="text-[11px] text-slate-400"
                >
                  No matches. Try a different keyword.
                </p>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t mt-2 text-xs text-slate-500">
            Tip: You can re-use the same activity on multiple days if needed.
          </div>
        </section>
      </div>

      <!-- Save bar -->
      <div class="flex justify-between items-center bg-white rounded-2xl shadow border border-slate-100 px-5 py-3">
        <div class="text-xs text-slate-500">
          This is a demo. In the next step, we’ll save this plan as an itinerary document in the database.
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="text-xs rounded-lg border px-3 py-2 text-slate-700 hover:bg-slate-50"
            @click="goToLeads"
          >
            Cancel
          </button>
          <button
            type="button"
            class="text-xs md:text-sm rounded-lg px-4 py-2 font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60"
            :disabled="isSaving || !selectedHotel"
            @click="saveItinerary"
          >
            {{ isSaving ? 'Saving...' : 'Save itinerary (demo)' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  title: 'Build Itinerary'
})

const route = useRoute()
const router = useRouter()
const leadId = computed(() => route.params.id)

const lead = ref(null)
const hotels = ref([])
const activities = ref([])
const isLoading = ref(true)
const isSaving = ref(false)

// hotel selection
const hotelSearch = ref('')
const selectedHotel = ref(null)

// day-by-day activities state
const days = ref([])

function goToLeads() {
  router.push('/dashboard')
}

// Load lead + hotels + activities
onMounted(async () => {
  try {
    isLoading.value = true

    const [leadData, hotelsData, activitiesData] = await Promise.all([
      $fetch(`/api/leads/${leadId.value}`),
      $fetch('/api/hotels'),
      $fetch('/api/activities')
    ])

    lead.value = leadData
    hotels.value = hotelsData
    activities.value = activitiesData

    const totalDays = (lead.value && lead.value.days) || 0
    days.value = Array.from({ length: totalDays }, (_, i) => ({
      dayNumber: i + 1,
      search: '',
      selectedActivities: []
    }))
  } catch (err) {
    console.error('Failed to load builder data', err)
    alert('Failed to load data. Please check the console.')
  } finally {
    isLoading.value = false
  }
})

// Derived lead summary for header card
const leadSummary = computed(() => {
  if (!lead.value) {
    return {
      name: '',
      email: '',
      travellers: 0,
      days: 0,
      who: '',
      activitiesText: '',
      budget: null,
      prettyDate: '—'
    }
  }

  let prettyDate = '—'
  if (lead.value.date) {
    try {
      prettyDate = new Date(lead.value.date).toLocaleDateString()
    } catch {
      prettyDate = lead.value.date
    }
  }

  return {
    name: lead.value.name,
    email: lead.value.email,
    travellers: lead.value.travellers || 0,
    days: lead.value.days || 0,
    who: lead.value.who || '',
    activitiesText: (lead.value.activities || []).join(', '),
    budget: lead.value.budget || null,
    prettyDate
  }
})

// HOTEL FILTERING
const filteredHotels = computed(() => {
  const q = hotelSearch.value.trim().toLowerCase()
  if (!q) return hotels.value
  return hotels.value.filter((h) => {
    return (
      h.name.toLowerCase().includes(q) ||
      (h.location || '').toLowerCase().includes(q) ||
      (h.category || '').toLowerCase().includes(q)
    )
  })
})

function selectHotel(hotel) {
  selectedHotel.value = hotel
}

// ACTIVITY FILTERING PER DAY
function filteredActivitiesForDay(day) {
  const q = day.search.trim().toLowerCase()
  if (!q) return activities.value
  return activities.value.filter((a) => {
    return (
      a.name.toLowerCase().includes(q) ||
      (a.location || '').toLowerCase().includes(q) ||
      (a.type || '').toLowerCase().includes(q) ||
      (a.code || '').toLowerCase().includes(q)
    )
  })
}

function addActivityToDay(dayNumber, act) {
  const day = days.value.find((d) => d.dayNumber === dayNumber)
  if (!day) return
  if (day.selectedActivities.some((a) => a.id === act.id)) return
  day.selectedActivities.push(act)
}

function removeActivityFromDay(dayNumber, actId) {
  const day = days.value.find((d) => d.dayNumber === dayNumber)
  if (!day) return
  day.selectedActivities = day.selectedActivities.filter((a) => a.id !== actId)
}

// SAVE ITINERARY (demO)
async function saveItinerary() {
  if (!lead.value || !selectedHotel.value) {
    alert('Please select a hotel before saving.')
    return
  }

  isSaving.value = true
  try {
    const payload = {
      leadId: leadId.value,
      hotelId: selectedHotel.value.id,
      hotelName: selectedHotel.value.name,
      days: days.value.map((d) => ({
        dayNumber: d.dayNumber,
        activityIds: d.selectedActivities.map((a) => a.id)
      }))
    }

    console.log('Itinerary payload (demo, not saved to DB yet):', payload)

    alert('Demo: itinerary structure logged to console. Later we will save this to MongoDB.')
    router.push('/dashboard')
  } catch (err) {
    console.error('Failed to save itinerary', err)
    alert('Failed to save itinerary. Check console.')
  } finally {
    isSaving.value = false
  }
}
</script>
