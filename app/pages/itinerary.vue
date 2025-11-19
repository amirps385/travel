<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- HERO -->
    <header class="rounded-2xl bg-gradient-to-r from-sky-50 to-white p-8 shadow-lg mb-8">
      <div class="flex flex-col lg:flex-row gap-6 items-start">
        <div class="grow">
          <div class="flex items-center gap-4">
            <div class="rounded-full bg-white p-3 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3 10h4l3 8 4-16 3 8h4"/>
              </svg>
            </div>

            <div>
              <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900">
                {{ heroTitle }}
              </h1>
              <p class="text-sm text-slate-600 mt-1">
                {{ heroSubtitle }}
              </p>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="rounded-lg bg-white p-4 shadow-sm border">
              <div class="text-xs text-slate-500">Travel date</div>
              <div class="font-medium mt-1">{{ formattedDate }}</div>
            </div>

            <div class="rounded-lg bg-white p-4 shadow-sm border">
              <div class="text-xs text-slate-500">Travellers</div>
              <div class="font-medium mt-1">{{ data?.travellers || '—' }}</div>
            </div>

            <div class="rounded-lg bg-white p-4 shadow-sm border">
              <div class="text-xs text-slate-500">Duration</div>
              <div class="font-medium mt-1">{{ data?.days }} days</div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-72">
          <div class="bg-white p-4 rounded-2xl shadow border">
            <div class="text-sm text-slate-500">Quick actions</div>
            <div class="mt-3 flex flex-col gap-3">
              <button @click="printPage" class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-sky-600 text-white font-semibold hover:bg-sky-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M6 9V2h12v7M6 18h12v4H6v-4zM6 14h12v-3H6v3z"/></svg>
                Print itinerary
              </button>

              <button @click="downloadPDF" class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-white border font-medium hover:shadow">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 3v12m0 0l-3-3m3 3l3-3M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6"/></svg>
                Download PDF
              </button>

              <button @click="shareItinerary" class="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-white border font-medium hover:shadow">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M15 8a3 3 0 10-2.83-4H8a3 3 0 100 6h1.17A3 3 0 1015 8zM6 20h12"/></svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- LEFT: Timeline -->
      <section class="lg:col-span-4 space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow border">
          <h2 class="text-lg font-semibold mb-3">Suggested timeline</h2>
          <div class="relative">
            <div class="absolute left-3 top-6 bottom-0 w-0.5 bg-slate-200"></div>

            <ul class="space-y-8 pl-8">
              <li v-for="(item, idx) in timeline" :key="idx" class="relative">
                <div class="absolute -left-5 top-0 bg-white rounded-full border p-1 shadow-sm">
                  <div class="w-6 h-6 flex items-center justify-center text-sky-600">
                    <svg v-if="item.icon === 'visa'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 2v4M6 6h12M6 10h12M6 14h12"/></svg>
                    <svg v-else-if="item.icon === 'flight'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M2.5 19.5L21 12 2.5 4.5 2 8l11 4-11 4z"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3 13l4 4L21 3"/></svg>
                  </div>
                </div>
                <div class="bg-white p-3 rounded-lg border shadow-sm">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="text-sm font-semibold">{{ item.title }}</div>
                      <div class="text-xs text-slate-500 mt-1">{{ item.note }}</div>
                    </div>
                    <div class="text-xs text-slate-500">{{ item.when }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Checklist & pre-trip tasks -->
        <div class="bg-white rounded-2xl p-6 shadow border">
          <h2 class="text-lg font-semibold mb-3">Pre-trip checklist</h2>
          <ul class="space-y-2 text-sm text-slate-700">
            <li v-for="(c,i) in checklist" :key="i" class="flex items-start gap-3">
              <input type="checkbox" :id="'c'+i" v-model="c.done" class="mt-1" />
              <label :for="'c'+i" class="flex-1">
                <div class="font-medium">{{ c.title }}</div>
                <div class="text-xs text-slate-500">{{ c.note }}</div>
              </label>
            </li>
          </ul>
        </div>
      </section>

      <!-- MIDDLE: Day-by-day & hotels -->
      <main class="lg:col-span-5 space-y-6">
        <!-- Day-by-day itinerary -->
        <div class="bg-white rounded-2xl p-6 shadow border">
          <h2 class="text-lg font-semibold mb-3">Day-by-day itinerary</h2>

          <div v-for="day in daysArray" :key="day.day" class="mb-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 font-semibold">{{ day.day }}</div>
                <div>
                  <div class="font-semibold">Day {{ day.day }} — {{ day.dateString }}</div>
                  <div class="text-xs text-slate-500">{{ day.caption }}</div>
                </div>
              </div>

              <button @click="toggleDay(day.day)" class="text-sky-600 text-sm">
                {{ expandedDays.includes(day.day) ? 'Collapse' : 'Expand' }}
              </button>
            </div>

            <transition name="fade">
              <div v-if="expandedDays.includes(day.day)" class="mt-3 space-y-3">
                <div v-for="(evt, i) in day.events" :key="i" class="p-3 rounded-lg border bg-white">
                  <div class="flex justify-between items-start">
                    <div class="text-sm font-medium">{{ evt.title }}</div>
                    <div class="text-xs text-slate-500">{{ evt.time || 'TBD' }}</div>
                  </div>
                  <div class="text-xs text-slate-500 mt-1">{{ evt.desc }}</div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Hotels list -->
        <div class="bg-white rounded-2xl p-6 shadow border">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">Hotels (within budget)</h2>
            <div class="text-sm text-slate-500">Showing top picks</div>
          </div>

          <div class="space-y-4">
            <div v-for="hotel in recommendedHotels" :key="hotel.id" class="flex gap-4 items-center border rounded-lg overflow-hidden">
              <img :src="hotel.image" alt="" class="w-36 h-24 object-cover" />
              <div class="flex-1 p-3">
                <div class="flex justify-between items-start gap-3">
                  <div>
                    <div class="font-semibold">{{ hotel.name }}</div>
                    <div class="text-xs text-slate-500 mt-1">{{ hotel.desc }}</div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold">${{ hotel.price }}</div>
                    <div class="text-xs text-slate-500">/ night</div>
                    <button @click="bookHotel(hotel)" class="mt-3 inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm bg-sky-600 text-white hover:bg-sky-700">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Meals / arrival note -->
        <div class="bg-white rounded-2xl p-6 shadow border">
          <h3 class="font-semibold mb-2">Arrival & meals</h3>
          <p class="text-sm text-slate-600">We recommend booking the first-night meal with the hotel if you arrive late. Local cuisine options and dietary information are available at each hotel's page (link to booking provider).</p>
        </div>
      </main>

      <!-- RIGHT: Booking summary -->
      <aside class="lg:col-span-3 sticky top-24 space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow border">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-slate-500">Trip total (est.)</div>
              <div class="text-2xl font-extrabold">${{ estimatedTotal }}</div>
            </div>
            <div class="text-sm text-slate-500 text-right">
              <div class="font-medium">{{ data?.travellers || 1 }} travellers</div>
              <div class="text-xs">x {{ data?.days || 1 }} nights</div>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
            <div class="font-medium">Hotel (avg/night)</div>
            <div class="text-right">${{ avgHotelPrice }}</div>

            <div class="font-medium">Estimated total</div>
            <div class="text-right">${{ estimatedTotal }}</div>
          </div>

          <div class="mt-5">
            <button @click="proceedToBooking" class="w-full rounded-lg px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold">
              Proceed to booking
            </button>
          </div>

          <div class="mt-3 text-xs text-slate-500">
            Contact: <span class="font-medium">{{ data?.phone || '—' }}</span>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg border shadow text-sm text-slate-600">
          <div class="font-medium mb-2">Need help?</div>
          <div>We can arrange transfers, visas, and custom requests. Contact our support for add-ons.</div>
          <button class="mt-3 w-full rounded-md py-2 border text-slate-700">Contact support</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const data = ref(null)

// load saved trip from localStorage (saved by the planner form)
onMounted(() => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('tripForm')
    if (raw) data.value = JSON.parse(raw)
  }
})

// Hero text
const heroTitle = computed(() => {
  if (!data.value) return 'Your planned trip'
  const activities = (data.value.activities || []).map(a => (a.charAt(0).toUpperCase()+a.slice(1))).join(', ')
  const dest = data.value.activities?.[0] ? data.value.activities[0] : 'Your destination'
  return `${dest.replace('-', ' ')} — ${activities}`
})

const heroSubtitle = computed(() => {
  if (!data.value) return 'We built an itinerary based on your selections.'
  return `${data.value.travellers} traveller(s) • ${data.value.days} days • ${data.value.originCity || 'Origin'}`
})

const formattedDate = computed(() => {
  if (!data.value?.date) return '—'
  return new Date(data.value.date).toDateString()
})

// Build timeline: simple offsets from travel date
const timeline = computed(() => {
  if (!data.value?.date) {
    return [
      { title: 'Plan start', note: 'Fill trip details to get timeline', when: '-', icon: 'info' }
    ]
  }
  const travel = new Date(data.value.date)
  function dayBefore(n) { const d = new Date(travel); d.setDate(d.getDate() - n); return d.toDateString() }
  return [
    { title: 'Apply for visa / documents', note: 'Start early if visa required', when: dayBefore(45), icon: 'visa' },
    { title: 'Book flights', note: 'Secure flights for best rates', when: dayBefore(30), icon: 'flight' },
    { title: 'Arrange transfers', note: 'Confirm airport pickup', when: dayBefore(7), icon: 'transfer' },
    { title: 'Final checks & pack', note: 'Travel insurance, currency', when: dayBefore(2), icon: 'check' },
    { title: 'Departure day', note: 'Head to airport and enjoy the trip', when: travel.toDateString(), icon: 'flight' }
  ]
})

// Pre-trip checklist
const checklist = ref([
  { title: 'Passport validity > 6 months', note: 'Check passport expiry', done: false },
  { title: 'Travel insurance', note: 'Buy travel insurance', done: false },
  { title: 'Vaccinations (if needed)', note: 'Check requirements', done: false },
  { title: 'Visa / eTA', note: 'Apply if required', done: false }
])

// Day-by-day data generator
const daysArray = computed(() => {
  const days = Number(data.value?.days || 5)
  const start = data.value?.date ? new Date(data.value.date) : new Date()
  const arr = []
  for (let i=0;i<days;i++){
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    arr.push({
      day: i+1,
      dateString: d.toDateString(),
      caption: i===0 ? 'Arrival & transfer to hotel' : `Activities & meals — day ${i+1}`,
      events: [
        { title: 'Flight / Arrival', time: i===0 ? 'TBD' : undefined, desc: i===0 ? 'Arrival at destination, meet & greet, transfer to hotel.' : 'Daily activities or tours.' },
        { title: 'Hotel check-in / relaxation', time: undefined, desc: 'Check in and relax. Explore nearby restaurants.' }
      ]
    })
  }
  return arr
})

// control expand/collapse of days
const expandedDays = ref([1])

function toggleDay(n) {
  if (expandedDays.value.includes(n)) expandedDays.value = expandedDays.value.filter(x=>x!==n)
  else expandedDays.value.push(n)
}

// Mock hotels and filter by budget
const hotels = [
  { id:1, name:'Comfort Lodge', price:80, desc:'Clean, central, great value', image:'https://images.unsplash.com/photo-1501117716987-c8e2f6de8b0a?auto=format&fit=crop&w=800&q=60' },
  { id:2, name:'Safari Resort', price:220, desc:'Perfect for safari trips', image:'https://images.unsplash.com/photo-1505691723518-36a3e8c6d4f9?auto=format&fit=crop&w=800&q=60' },
  { id:3, name:'Mountain Inn', price:120, desc:'Cozy and scenic', image:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60' },
  { id:4, name:'Luxury Stay', price:450, desc:'Premium amenities & service', image:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60' }
]

const recommendedHotels = computed(() => {
  if (!data.value) return hotels.slice(0,3)
  const budget = Number(data.value.budget || 99999)
  return hotels.filter(h => h.price <= (budget || 99999)).slice(0,5)
})

const avgHotelPrice = computed(() => {
  const list = recommendedHotels.value
  if (!list.length) return 0
  return Math.round(list.reduce((s,n)=>s+n.price,0)/list.length)
})

const estimatedTotal = computed(() => {
  const nights = Number(data.value?.days || 1)
  return (avgHotelPrice.value * nights * (Number(data.value?.travellers || 1))).toLocaleString()
})

function bookHotel(h) {
  alert(`Booking flow placeholder for ${h.name}. Integrate booking API.`)
}

function proceedToBooking() {
  alert('Proceed to booking placeholder — integrate checkout flow.')
}

function printPage() {
  window.print()
}

function downloadPDF() {
  alert('Download PDF stub — implement server-side PDF generation or client-side html2pdf integration.')
}

function shareItinerary() {
  if (navigator.share && typeof navigator.share === 'function') {
    const shareText = `My trip: ${heroTitle.value} on ${formattedDate.value}`
    navigator.share({ title: 'My itinerary', text: shareText, url: window.location.href }).catch(()=>{})
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard')
  }
}
</script>

<style scoped>
/* small utilities used by the layout to mimic a polished itinerary look */
.fade-enter-active, .fade-leave-active { transition: all .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* print styles */
@media print {
  header, button, aside { display: none !important; }
  body { background: white; }
}
</style>
