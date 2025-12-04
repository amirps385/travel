<!-- app/pages/itinerary/[slug].vue -->
<template>
  <div class="min-h-screen bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-6">
      <!-- LOADING / ERROR STATES -->
      <div
        v-if="pending"
        class="bg-white rounded-2xl border border-slate-100 shadow p-6 text-sm text-slate-500"
      >
        Loading itinerary…
      </div>

      <div
        v-else-if="error || !itinerary"
        class="bg-white rounded-2xl border border-rose-100 shadow p-6 text-sm text-rose-600"
      >
        We couldn’t find this itinerary. The link may be invalid or expired.
      </div>

      <!-- MAIN CONTENT -->
      <div v-else class="space-y-6">
        <!-- HERO / SUMMARY HEADER -->
        <header
          class="rounded-3xl bg-linear-to-r from-sky-50 via-white to-emerald-50 border border-slate-100 shadow-md px-5 md:px-8 py-6 md:py-8"
        >
          <div class="flex flex-col lg:flex-row gap-6 lg:items-start">
            <!-- Left: Title + overview -->
            <div class="flex-1 space-y-4">
              <div class="flex items-start gap-3">
                <div
                  class="shrink-0 w-11 h-11 rounded-2xl bg-white shadow flex items-center justify-center text-sky-600"
                >
                  <!-- Simple plane icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.7"
                      d="M2.5 19.5L21 12 2.5 4.5 2 8l11 4-11 4z"
                    />
                  </svg>
                </div>

                <div>
                  <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                    Tailored itinerary
                  </p>
                  <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                    {{ itinerary.title || 'Your custom itinerary' }}
                  </h1>
                  <p class="text-sm text-slate-600 mt-1">
                    for
                    <span class="font-semibold">
                      {{ itinerary.guestName || 'Guest' }}
                    </span>
                    <span v-if="itinerary.travellers">
                      • {{ itinerary.travellers }} traveller<span v-if="itinerary.travellers > 1">s</span>
                    </span>
                    <span v-if="daysCount">
                      • {{ daysCount }} day<span v-if="daysCount > 1">s</span>
                    </span>
                  </p>
                </div>
              </div>

              <!-- Trip quick stats -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                <div class="rounded-2xl bg-white/80 border border-slate-100 p-4 shadow-sm">
                  <div class="text-xs text-slate-500">Travel date</div>
                  <div class="mt-1 font-medium text-slate-900">
                    {{ formattedTravelDate || 'To be confirmed' }}
                  </div>
                  <div class="mt-1 text-[11px] text-slate-400">
                    We can adjust dates on request.
                  </div>
                </div>

                <div class="rounded-2xl bg-white/80 border border-slate-100 p-4 shadow-sm">
                  <div class="text-xs text-slate-500">Travellers</div>
                  <div class="mt-1 font-medium text-slate-900">
                    {{ itinerary.travellers || 'Not set' }}
                  </div>
                  <div class="mt-1 text-[11px] text-slate-400">
                    Ideal rooming & transfers planned for this group size.
                  </div>
                </div>

                <div class="rounded-2xl bg-white/80 border border-slate-100 p-4 shadow-sm">
                  <div class="text-xs text-slate-500">Duration</div>
                  <div class="mt-1 font-medium text-slate-900">
                    {{ daysCount }} day<span v-if="daysCount !== 1">s</span>
                  </div>
                  <div class="mt-1 text-[11px] text-slate-400">
                    Customisable – you can add or remove days.
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Actions + cost summary -->
            <aside class="w-full lg:w-72 space-y-3">
              <!-- Actions -->
              <div class="bg-white/90 rounded-2xl border border-slate-100 shadow-sm p-4">
                <p class="text-xs font-semibold text-slate-600 mb-2">
                  Itinerary actions
                </p>
                <div class="flex flex-col gap-2">
                  <button
                    type="button"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700"
                    @click="printPage"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.7"
                        d="M6 9V3h12v6M6 18h12v3H6v-3zM6 14h12v-3H6v3z"
                      />
                    </svg>
                    Print itinerary
                  </button>

                  <button
                    type="button"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50"
                    @click="downloadPDF"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-slate-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.7"
                        d="M12 3v12m0 0l-3-3m3 3 3-3M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"
                      />
                    </svg>
                    Download PDF
                  </button>

                  <button
                    type="button"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50"
                    @click="shareItinerary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-slate-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.7"
                        d="M15 8a3 3 0 1 0-2.83-4H8a3 3 0 1 0 0 6h1.17A3 3 0 1 0 15 8zM6 20h12"
                      />
                    </svg>
                    Share / copy link
                  </button>
                </div>
              </div>

              <!-- Cost estimate -->
              <div class="bg-white/90 rounded-2xl border border-slate-100 shadow-sm p-4">
                <p class="text-xs font-semibold text-slate-600 mb-2">
                  Estimated trip cost
                </p>

                <div class="flex items-baseline justify-between mb-2">
                  <div>
                    <div class="text-xs text-slate-500">Estimated total</div>
                    <div class="text-2xl font-extrabold text-slate-900 leading-tight">
                      {{ estimatedTotalDisplay }}
                    </div>
                  </div>
                  <div class="text-right text-xs text-slate-500">
                    <div>
                      {{ itinerary.travellers || 1 }} traveller<span v-if="itinerary.travellers !== 1">s</span>
                    </div>
                    <div>
                      x {{ daysCount }} night<span v-if="daysCount !== 1">s</span>
                    </div>
                  </div>
                </div>

                <div class="text-[11px] text-slate-500">
                  Based on a budget of
                  <span class="font-medium">
                    {{ budgetPerPersonDisplay }} per person
                  </span>.
                  Final pricing may change based on room type, dates and availability.
                </div>
              </div>
            </aside>
          </div>
        </header>

        <!-- MAIN GRID: LEFT (timeline + checklist), CENTER (days + hotels), RIGHT (support) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- LEFT: timeline + checklist -->
          <section class="lg:col-span-4 space-y-5">
            <!-- Travel timeline -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 class="text-sm font-semibold text-slate-900 mb-3">
                Before you travel
              </h2>
              <div class="relative">
                <div class="absolute left-2.5 top-3 bottom-3 w-px bg-slate-200"></div>
                <ul class="space-y-5 pl-7">
                  <li
                    v-for="(item, idx) in timeline"
                    :key="idx"
                    class="relative"
                  >
                    <div
                      class="absolute -left-2 top-1 w-4 h-4 rounded-full bg-white border border-sky-200 flex items-center justify-center"
                    >
                      <div class="w-2 h-2 rounded-full bg-sky-500"></div>
                    </div>
                    <div class="bg-slate-50/80 border border-slate-100 rounded-xl px-3 py-2.5">
                      <div class="flex items-start justify-between gap-3">
                        <div>
                          <div class="text-xs font-semibold text-slate-900">
                            {{ item.title }}
                          </div>
                          <div class="text-[11px] text-slate-500 mt-0.5">
                            {{ item.note }}
                          </div>
                        </div>
                        <div class="text-[11px] text-slate-400 whitespace-nowrap">
                          {{ item.when }}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Checklist -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 class="text-sm font-semibold text-slate-900 mb-3">
                Travel checklist
              </h2>
              <ul class="space-y-2 text-sm text-slate-700">
                <li
                  v-for="(c, i) in checklist"
                  :key="i"
                  class="flex items-start gap-2"
                >
                  <input
                    v-model="c.done"
                    type="checkbox"
                    class="mt-1"
                  />
                  <div>
                    <div class="font-medium text-xs">
                      {{ c.title }}
                    </div>
                    <div class="text-[11px] text-slate-500">
                      {{ c.note }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <!-- CENTER: Day-by-day + hotels -->
          <main class="lg:col-span-5 space-y-5">
            <!-- Day-by-day -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 class="text-sm font-semibold text-slate-900 mb-3">
                Day-by-day itinerary
              </h2>

              <div
                v-for="day in itinerary.days || []"
                :key="day.dayNumber"
                class="mb-4 last:mb-2"
              >
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-9 h-9 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 text-sm font-semibold"
                    >
                      {{ day.dayNumber }}
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-slate-900">
                        {{ day.title || `Day ${day.dayNumber}` }}
                      </div>
                      <div class="text-[11px] text-slate-500">
                        {{ dayDateLabel(day.dayNumber) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Day notes -->
                <div
                  v-if="day.notes"
                  class="mt-2 text-xs text-slate-600 bg-slate-50/80 border border-slate-100 rounded-lg px-3 py-2"
                >
                  {{ day.notes }}
                </div>

                <!-- Activities -->
                <div class="mt-2 space-y-2">
                  <div
                    v-for="(a, idx) in (day.activities || [])"
                    :key="idx"
                    class="border border-slate-100 rounded-lg px-3 py-2 bg-white flex justify-between items-start gap-3"
                  >
                    <div class="flex-1">
                      <div class="text-xs font-semibold text-slate-900">
                        {{ findActivity(a.activityId)?.name || 'Activity' }}
                      </div>
                      <div class="text-[11px] text-slate-500 mt-0.5">
                        <span v-if="findActivity(a.activityId)?.location">
                          {{ findActivity(a.activityId)?.location }}
                        </span>
                        <span v-if="findActivity(a.activityId)?.type">
                          • {{ findActivity(a.activityId)?.type }}
                        </span>
                      </div>
                      <div
                        v-if="findActivity(a.activityId)?.description"
                        class="text-[11px] text-slate-500 mt-1"
                      >
                        {{ findActivity(a.activityId)?.description }}
                      </div>
                    </div>
                    <div class="text-right text-[11px] text-slate-500 shrink-0">
                      <div v-if="findActivity(a.activityId)?.timeOfDay">
                        {{ findActivity(a.activityId)?.timeOfDay }}
                      </div>
                      <div v-if="findActivity(a.activityId)?.costUSD">
                        ${{ findActivity(a.activityId)?.costUSD }}
                      </div>
                      <div v-if="findActivity(a.activityId)?.durationMinutes">
                        {{ findActivity(a.activityId)?.durationMinutes }} min
                      </div>
                    </div>
                  </div>

                  <p
                    v-if="!day.activities || !day.activities.length"
                    class="text-[11px] text-slate-400"
                  >
                    No specific activities added for this day yet.
                  </p>
                </div>
              </div>
            </div>

            <!-- Hotels -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div class="flex items-center justify-between mb-3">
                <h2 class="text-sm font-semibold text-slate-900">
                  Your stay
                </h2>
                <p class="text-[11px] text-slate-400">
                  We can swap hotels on request.
                </p>
              </div>

              <div
                v-if="(itinerary.selectedHotels || []).length"
                class="space-y-4"
              >
                <div
                  v-for="(sel, idx) in itinerary.selectedHotels"
                  :key="idx"
                  class="flex flex-col sm:flex-row gap-4 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/60"
                >
                  <!-- Hotel image (placeholder for now) -->
                  <div class="sm:w-40 h-32 bg-slate-200/60 flex items-center justify-center text-slate-400 text-xs">
                    Hotel Image
                  </div>

                  <!-- Info -->
                  <div class="flex-1 p-3 sm:p-4 space-y-1">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <div class="text-sm font-semibold text-slate-900">
                          {{ findHotel(sel.hotelId)?.name || 'Hotel / Lodge' }}
                        </div>
                        <div class="text-[11px] text-slate-500 mt-0.5">
                          {{ findHotel(sel.hotelId)?.destination || 'Destination to be confirmed' }}
                        </div>
                      </div>
                      <div class="text-right text-[11px] text-slate-500 whitespace-nowrap">
                        <div>
                          {{ sel.nights || daysCount }} night<span v-if="(sel.nights || daysCount) !== 1">s</span>
                        </div>
                        <div v-if="findHotel(sel.hotelId)?.range">
                          {{ findHotel(sel.hotelId)?.range }} range
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="(findHotel(sel.hotelId)?.activityTypes || []).length"
                      class="flex flex-wrap gap-1 mt-1"
                    >
                      <span
                        v-for="tag in findHotel(sel.hotelId)?.activityTypes || []"
                        :key="tag"
                        class="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-medium"
                      >
                        {{ tag }}
                      </span>
                    </div>

                    <p class="text-[11px] text-slate-500 mt-1">
                      Ideal for this route and budget. We’ll confirm exact room types and board basis
                      (BB / HB / FB) during booking.
                    </p>
                  </div>
                </div>
              </div>

              <p
                v-else
                class="text-[11px] text-slate-500"
              >
                A specific hotel hasn’t been locked in yet. Once you confirm dates and budget, we’ll
                suggest 1–2 options per night and update this section.
              </p>
            </div>
          </main>

          <!-- RIGHT: support / notes -->
          <aside class="lg:col-span-3 space-y-5">
            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-sm text-slate-700">
              <h3 class="text-sm font-semibold text-slate-900 mb-1">
                Questions or changes?
              </h3>
              <p class="text-xs text-slate-600 mb-3">
                We can adjust hotels, activities, and dates to match your pace and budget.
              </p>
              <ul class="text-xs text-slate-600 space-y-1.5 mb-3">
                <li>• Add or remove days.</li>
                <li>• Swap hotels (budget → luxury or vice versa).</li>
                <li>• Change activities (more safari, more beach, etc.).</li>
              </ul>
              <button
                type="button"
                class="w-full rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 py-2.5"
              >
                Contact your travel planner
              </button>

              <div class="mt-3 text-[11px] text-slate-500">
                We typically reply within 24 hours on working days.
              </div>
            </div>

            <div class="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-[11px] text-slate-700">
              <div class="font-semibold text-slate-900 mb-1">
                Practical info
              </div>
              <p class="mb-1">
                Remember to check visa, vaccination, and insurance requirements for your nationality.
              </p>
              <p>
                We’ll send you a final pre-departure checklist 1–2 weeks before your trip.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug)

// Load itinerary by slug (public endpoint)
const { data, pending, error } = await useAsyncData(
  'public-itinerary',
  () => $fetch(`/api/itineraries/public/${slug.value}`),
  { server: true }
)

const itinerary = computed(() => data.value || null)

// Load hotels and activities to enrich display
const { data: hotelsData } = await useAsyncData(
  'public-hotels',
  () => $fetch('/api/hotels'),
  { server: true }
)

const { data: activitiesData } = await useAsyncData(
  'public-activities',
  () => $fetch('/api/activities'),
  { server: true }
)

const hotels = computed(() => hotelsData.value || [])
const activities = computed(() => activitiesData.value || [])

// ---- Helpers to find hotel / activity by id ----
function findHotel (id) {
  if (!id) return null
  return hotels.value.find(h => (h._id || h.id) === id) || null
}

function findActivity (id) {
  if (!id) return null
  return activities.value.find(a => (a._id || a.id) === id) || null
}

// ---- Derived values ----
const daysCount = computed(() => itinerary.value?.days?.length || 0)

const formattedTravelDate = computed(() => {
  if (!itinerary.value?.travelDate) return ''
  try {
    return new Date(itinerary.value.travelDate).toLocaleDateString()
  } catch {
    return itinerary.value.travelDate
  }
})

const budgetPerPersonDisplay = computed(() => {
  const v = itinerary.value?.budgetPerPerson
  if (!v) return 'Not set'
  return `$${Number(v).toLocaleString()}`
})

const estimatedTotalDisplay = computed(() => {
  const travellers = Number(itinerary.value?.travellers || 1)
  const nights = daysCount.value || 1
  const budget = Number(itinerary.value?.budgetPerPerson || 0)

  if (!budget) return 'On request'

  const total = travellers * nights * budget
  return `$${total.toLocaleString()}`
})

// ---- Timeline & checklist ----
const timeline = computed(() => {
  if (!itinerary.value?.travelDate) {
    return [
      {
        title: 'Share your dates',
        note: 'Once your travel dates are confirmed, we’ll add a detailed pre-trip timeline here.',
        when: 'Before booking'
      }
    ]
  }
  const travel = new Date(itinerary.value.travelDate)
  function dayBefore (n) {
    const d = new Date(travel)
    d.setDate(d.getDate() - n)
    return d.toDateString()
  }
  return [
    {
      title: 'Visa & documents',
      note: 'Check passport validity and visa requirements.',
      when: dayBefore(45)
    },
    {
      title: 'Book international flights',
      note: 'Secure your flights early for better prices.',
      when: dayBefore(30)
    },
    {
      title: 'Confirm transfers & hotels',
      note: 'We’ll finalise airport transfers and room types.',
      when: dayBefore(14)
    },
    {
      title: 'Final details & packing',
      note: 'Print documents, check baggage rules, and pack.',
      when: dayBefore(3)
    },
    {
      title: 'Departure',
      note: 'Relax and enjoy your journey!',
      when: travel.toDateString()
    }
  ]
})

const checklist = ref([
  {
    title: 'Passport validity > 6 months',
    note: 'Check the expiry date of your passport.',
    done: false
  },
  {
    title: 'Travel insurance',
    note: 'We strongly recommend full travel insurance.',
    done: false
  },
  {
    title: 'Visa / entry requirements',
    note: 'Check if you need a visa or eTA.',
    done: false
  },
  {
    title: 'Health & vaccinations',
    note: 'Check any recommended vaccinations for your destination.',
    done: false
  }
])

// Compute date label for each day
function dayDateLabel (dayNumber) {
  if (!itinerary.value?.travelDate) return ''
  try {
    const base = new Date(itinerary.value.travelDate)
    const d = new Date(base)
    d.setDate(d.getDate() + (dayNumber - 1))
    return d.toDateString()
  } catch {
    return ''
  }
}

// ---- Actions ----
function printPage () {
  if (typeof window !== 'undefined') {
    window.print()
  }
}

function downloadPDF () {
  // Placeholder – you can later add server-side or client-side PDF generation
  alert('PDF download will be added later. For now, use “Print” and save as PDF.')
}

function shareItinerary () {
  if (typeof window === 'undefined') return

  const url = window.location.href

  if (navigator.share && typeof navigator.share === 'function') {
    navigator
      .share({
        title: itinerary.value?.title || 'My trip itinerary',
        text: 'Here is my proposed itinerary.',
        url
      })
      .catch(() => {})
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard')
  } else {
    alert('Your browser does not support sharing or copying links automatically.')
  }
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

/* Print: show just the core content */
@media print {
  button {
    display: none !important;
  }

  aside {
    display: none !important;
  }

  body {
    background: white;
  }
}
</style>
