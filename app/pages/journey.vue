<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <!-- HERO -->
    <header class="mb-8">
      <div class="rounded-2xl bg-linear-to-r from-sky-50 to-white p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6">
        <div class="grow">
          <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900">Plan your custom trip</h1>
          <p class="mt-2 text-slate-600 max-w-xl">
            Choose activities, travel dates, travellers and budget — we'll generate a personalized itinerary
            including timeline, hotels and key pre-trip tasks.
          </p>
          <div class="mt-4 flex gap-3 items-center">
            <span class="inline-flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full text-sm font-medium text-slate-700 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Trusted suggestions
            </span>
            <span class="inline-flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full text-sm font-medium text-slate-700 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h4l3 8 4-16 3 8h4"/></svg>
              Expert planning
            </span>
          </div>
        </div>

        <div class="w-full md:w-64">
          <div class="bg-white rounded-xl p-4 shadow-inner border">
            <div class="text-sm text-slate-500">Quick facts</div>
            <div class="mt-3 grid grid-cols-2 gap-2">
              <div class="text-sm"><span class="font-semibold">Activities</span><div class="text-xs text-slate-500">4 picks</div></div>
              <div class="text-sm"><span class="font-semibold">Max days</span><div class="text-xs text-slate-500">30</div></div>
              <div class="text-sm"><span class="font-semibold">Group sizes</span><div class="text-xs text-slate-500">1–20</div></div>
              <div class="text-sm"><span class="font-semibold">Currency</span><div class="text-xs text-slate-500">USD</div></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Notification when data is prefilled -->
    <div v-if="showPrefilledNotification" class="mb-6">
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-blue-800 font-medium">
            Welcome! Some details have been prefilled from your previous form.
          </span>
        </div>
        <p class="text-blue-700 text-sm mt-1 ml-7">
          Please complete the remaining fields and click "Get my custom itinerary".
        </p>
        <button 
          @click="showPrefilledNotification = false"
          class="ml-7 mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Dismiss
        </button>
      </div>
    </div>

    <!-- FORM -->
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT: Controls -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
        <!-- Activities -->
        <section class="mb-5">
          <label class="block text-sm font-semibold mb-3">Choose Your Activities</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              v-for="act in activities"
              :key="act.value"
              type="button"
              @click="toggleActivity(act.value)"
              :class="['flex items-center gap-3 p-3 rounded-xl border transition-shadow focus:outline-none', form.activities.includes(act.value) ? 'bg-linear-to-r from-sky-600 to-indigo-600 text-white shadow-md border-transparent' : 'bg-white text-slate-700 border-slate-200 hover:shadow']"
            >
              <span class="text-xl">{{ act.icon }}</span>
              <div class="text-left">
                <div class="text-sm font-medium">{{ act.label }}</div>
                <div class="text-xs text-slate-400">{{ act.desc }}</div>
              </div>
            </button>
          </div>
          <p v-if="errors.activities" class="mt-2 text-sm text-rose-600">{{ errors.activities }}</p>
        </section>

        <!-- Days slider -->
        <section class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-semibold">How many days?</label>
            <button
              type="button"
              title="Use the slider to pick how many days you want the trip to be (1–30)."
              class="text-xs text-slate-500 hover:text-slate-700"
              aria-label="How many days info"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.227 13.659A3 3 0 1112 16a3 3 0 01-3.773-2.341M12 6v.01M21 12A9 9 0 113 12a9 9 0 0118 0z"/>
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-4">
            <input
              type="range"
              v-model.number="form.days"
              min="1"
              max="30"
              step="1"
              class="w-full h-2 rounded-lg bg-slate-100 accent-sky-500"
            />
            <div class="w-20 text-right font-medium text-slate-700">{{ form.days }}d</div>
          </div>
        </section>

        <!-- Who is travelling -->
        <section class="mb-5">
          <label class="block text-sm font-semibold mb-3">Who is travelling?</label>
          <div class="flex gap-3">
            <label v-for="opt in whoOptions" :key="opt" class="inline-flex items-center gap-2 cursor-pointer">
              <input type="radio" :value="opt" v-model="form.who" class="h-4 w-4" />
              <span class="text-sm text-slate-700 capitalize">{{ opt }}</span>
            </label>
          </div>
        </section>

        <!-- Travel date & travellers -->
        <section class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Travel date</label>
            <input type="date" v-model="form.date" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-300" />
            <p v-if="errors.date" class="mt-1 text-xs text-rose-600">{{ errors.date }}</p>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2">Number of travellers</label>
            <input type="number" v-model.number="form.travellers" min="1" max="20" class="w-full border rounded-lg p-3" />
          </div>
        </section>

        <!-- Ages -->
        <section v-if="form.travellers > 0" class="mb-5">
          <label class="block text-sm font-semibold mb-3">Ages & genders</label>
          <div class="space-y-3">
            <div v-for="n in form.travellers" :key="n" class="flex items-center gap-3">
              <div class="w-24 text-sm text-slate-600">Traveller {{ n }}</div>
              <input type="number" v-model.number="form.ages[n-1]" min="0" max="120" class="border rounded-lg p-2 w-28" />
              <select v-model="form.genders[n-1]" class="border rounded-lg p-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Budget -->
        <section class="mb-5">
          <label class="block text-sm font-semibold mb-2">Budget per person (USD)</label>
          <input type="number" v-model.number="form.budget" min="0" class="w-48 border rounded-lg p-3" />
        </section>

        <!-- Contact -->
        <section>
          <label class="block text-sm font-semibold mb-3">Contact details</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" v-model="form.name" placeholder="Full name" class="border rounded-lg p-3" />
            <input type="email" v-model="form.email" placeholder="Email address" class="border rounded-lg p-3" />
            <input type="tel" v-model="form.phone" placeholder="Phone number" class="border rounded-lg p-3" />
            <input type="text" v-model="form.originCity" placeholder="Origin city" class="border rounded-lg p-3" />
          </div>
          <div class="mt-2 space-y-1">
            <p v-if="errors.name" class="text-xs text-rose-600">{{ errors.name }}</p>
            <p v-if="errors.email" class="text-xs text-rose-600">{{ errors.email }}</p>
          </div>
        </section>
      </div>

      <!-- RIGHT: Summary / CTA -->
      <aside class="bg-linear-to-b from-white to-sky-50 rounded-2xl p-6 shadow-lg border">
        <div class="flex flex-col gap-4">
          <div>
            <h3 class="text-lg font-semibold">Trip summary</h3>
            <p class="text-sm text-slate-500 mt-1">Quick preview before generating your itinerary</p>
          </div>

          <div class="grid grid-cols-2 gap-2 text-sm text-slate-700">
            <div class="font-medium">Activities</div>
            <div class="text-right truncate">{{ form.activities.join(', ') || '—' }}</div>

            <div class="font-medium">Days</div>
            <div class="text-right">{{ form.days }} days</div>

            <div class="font-medium">Travellers</div>
            <div class="text-right">{{ form.travellers }}</div>

            <div class="font-medium">Budget/person</div>
            <div class="text-right">${{ form.budget || '—' }}</div>

            <div class="font-medium">Travel date</div>
            <div class="text-right">{{ formattedDate }}</div>
          </div>

          <div class="pt-3 border-t"></div>

          <div class="flex gap-2">
            <button
              type="submit"
              :disabled="!isValid || isSubmitting"
              class="flex-1 rounded-lg px-4 py-3 text-white font-semibold shadow-md transition disabled:opacity-50 inline-flex items-center justify-center gap-3"
              :class="isValid && !isSubmitting ? 'bg-sky-600 hover:bg-sky-700' : 'bg-slate-400 cursor-not-allowed'"
            >
              <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 19l9-7-9-7-4 7v6l4-4z" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5 -ml-1 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {{ isSubmitting ? 'Processing...' : 'Get my custom itinerary' }}
            </button>

            <button type="button" @click="resetForm" class="rounded-lg px-3 py-3 border bg-white text-slate-700 hover:shadow">
              Reset
            </button>
          </div>

          <p class="text-xs text-slate-500">We never share your contact details. This is a demo — integrate a backend to save plans.</p>
        </div>
      </aside>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activities = [
  { value: 'wild safari', label: 'Wild Safari', icon: '🦁', desc: 'Game drives & wildlife' },
  { value: 'beach holidays', label: 'Beach Holidays', icon: '🏖️', desc: 'Relax by the sea' },
  { value: 'kilimanjaro trek', label: 'Kilimanjaro Trek', icon: '🏔️', desc: 'High-altitude trek' },
  { value: 'great migration', label: 'Great Migration', icon: '🦓', desc: 'Nature spectacle' },
  { value: 'cultural tour', label: 'Cultural Tour', icon: '🏛️', desc: 'Local culture & heritage' }
]

const whoOptions = ['single', 'couple', 'groups', 'family']

// Form structure
const form = ref({
  activities: [],
  days: 5,
  who: 'single',
  date: '',
  travellers: 1,
  ages: [30],
  genders: ['male'],
  budget: 1500,
  name: '',
  email: '',
  phone: '',
  originCity: ''
})

const errors = ref({})
const isSubmitting = ref(false)
const showPrefilledNotification = ref(false)

// On component mount, check for prefilled data
onMounted(() => {
  loadPrefilledData()
})

function loadPrefilledData() {
  if (process.client) {
    // Method 1: Check URL parameters first (most reliable)
    loadFromURLParams()
    
    // Method 2: Check localStorage as backup
    if (!showPrefilledNotification.value) {
      loadFromLocalStorage()
    }
  }
}

function loadFromURLParams() {
  const urlParams = new URLSearchParams(window.location.search)
  
  if (urlParams.has('prefilled') && urlParams.get('prefilled') === 'true') {
    showPrefilledNotification.value = true
    
    // Basic contact info
    if (urlParams.has('name')) {
      form.value.name = decodeURIComponent(urlParams.get('name'))
    }
    if (urlParams.has('email')) {
      form.value.email = decodeURIComponent(urlParams.get('email'))
    }
    
    // Travel date
    if (urlParams.has('travelDate')) {
      form.value.date = urlParams.get('travelDate')
    }
    
    // Travellers
    if (urlParams.has('travellers')) {
      const travellerParam = urlParams.get('travellers')
      const travellerMap = {
        '1': 1,
        '2': 2,
        '3-4': 3,
        '5-6': 5,
        '7+': 7,
        'group': 10
      }
      
      const travellerCount = travellerMap[travellerParam] || 2
      form.value.travellers = travellerCount
      
      // Update who based on travellers
      if (travellerCount === 1) form.value.who = 'single'
      else if (travellerCount === 2) form.value.who = 'couple'
      else if (travellerCount >= 10) form.value.who = 'groups'
      else form.value.who = 'family'
    }
    
    // Budget
    if (urlParams.has('budget')) {
      const budgetParam = urlParams.get('budget')
      const budgetMap = {
        '1000-2000': 1500,
        '2000-3000': 2500,
        '3000-5000': 4000,
        '5000+': 6000,
        'custom': 8000
      }
      form.value.budget = budgetMap[budgetParam] || 1500
    }
    
    // Interests
    if (urlParams.has('interests')) {
      try {
        const interests = JSON.parse(urlParams.get('interests'))
        const interestToActivity = {
          'safari': 'wild safari',
          'kilimanjaro': 'kilimanjaro trek',
          'zanzibar': 'beach holidays',
          'cultural': 'cultural tour'
        }
        
        interests.forEach(interest => {
          const activity = interestToActivity[interest]
          if (activity && !form.value.activities.includes(activity)) {
            form.value.activities.push(activity)
          }
        })
      } catch (e) {
        console.error('Error parsing interests:', e)
      }
    }
    
    // Update ages and genders arrays
    updateTravellerArrays()
    
    // Clear URL parameters
    const newUrl = window.location.pathname
    window.history.replaceState({}, document.title, newUrl)
  }
}

function loadFromLocalStorage() {
  // Check localStorage
  let storedData = localStorage.getItem('heroLeadData')
  const timestamp = localStorage.getItem('heroLeadTimestamp')
  
  // If no data in localStorage, check sessionStorage
  if (!storedData) {
    storedData = sessionStorage.getItem('heroLeadData')
  }
  
  if (storedData) {
    try {
      const heroData = JSON.parse(storedData)
      showPrefilledNotification.value = true
      
      // Apply data to form (same mapping logic as URL params)
      if (heroData.name) form.value.name = heroData.name
      if (heroData.email) form.value.email = heroData.email
      if (heroData.travelDate) form.value.date = heroData.travelDate
      
      if (heroData.travellers) {
        const travellerMap = {
          '1': 1, '2': 2, '3-4': 3, '5-6': 5, '7+': 7, 'group': 10
        }
        const travellerCount = travellerMap[heroData.travellers] || 2
        form.value.travellers = travellerCount
        
        if (travellerCount === 1) form.value.who = 'single'
        else if (travellerCount === 2) form.value.who = 'couple'
        else if (travellerCount >= 10) form.value.who = 'groups'
        else form.value.who = 'family'
      }
      
      if (heroData.budget) {
        const budgetMap = {
          '1000-2000': 1500, '2000-3000': 2500, '3000-5000': 4000,
          '5000+': 6000, 'custom': 8000
        }
        form.value.budget = budgetMap[heroData.budget] || 1500
      }
      
      if (heroData.interests && heroData.interests.length > 0) {
        const interestToActivity = {
          'safari': 'wild safari',
          'kilimanjaro': 'kilimanjaro trek',
          'zanzibar': 'beach holidays',
          'cultural': 'cultural tour'
        }
        
        heroData.interests.forEach(interest => {
          const activity = interestToActivity[interest]
          if (activity && !form.value.activities.includes(activity)) {
            form.value.activities.push(activity)
          }
        })
      }
      
      updateTravellerArrays()
      
      // Clear storage after loading
      localStorage.removeItem('heroLeadData')
      localStorage.removeItem('heroLeadTimestamp')
      sessionStorage.removeItem('heroLeadData')
      
    } catch (error) {
      console.error('Error loading from storage:', error)
      // Clear corrupted data
      localStorage.removeItem('heroLeadData')
      localStorage.removeItem('heroLeadTimestamp')
      sessionStorage.removeItem('heroLeadData')
    }
  }
}

// Helper to update traveller arrays
function updateTravellerArrays() {
  const count = form.value.travellers
  while (form.value.ages.length < count) form.value.ages.push(30)
  while (form.value.ages.length > count) form.value.ages.pop()
  while (form.value.genders.length < count) form.value.genders.push('male')
  while (form.value.genders.length > count) form.value.genders.pop()
}

// Watch for travellers changes
watch(() => form.value.travellers, (newVal) => {
  const v = Number(newVal) || 1
  while (form.value.ages.length < v) form.value.ages.push(30)
  while (form.value.ages.length > v) form.value.ages.pop()
  while (form.value.genders.length < v) form.value.genders.push('male')
  while (form.value.genders.length > v) form.value.genders.pop()
})

function toggleActivity(val) {
  const idx = form.value.activities.indexOf(val)
  if (idx === -1) form.value.activities.push(val)
  else form.value.activities.splice(idx, 1)
}

const formattedDate = computed(() => {
  if (!form.value.date) return '—'
  const date = new Date(form.value.date)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
})

function validate() {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Please enter your full name.'
  if (!form.value.email) {
    errors.value.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address.'
  }
  if (!form.value.date) errors.value.date = 'Select a travel date.'
  if (form.value.activities.length === 0) errors.value.activities = 'Choose at least one activity.'
  return Object.keys(errors.value).length === 0
}

const isValid = computed(() => {
  return form.value.name && 
         form.value.email && 
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
         form.value.date && 
         form.value.activities.length > 0
})

async function handleSubmit() {
  if (!validate()) return

  isSubmitting.value = true

  try {
    const payload = JSON.parse(JSON.stringify(form.value))
    payload.createdAt = new Date().toISOString()
    
    // Include source information
    if (showPrefilledNotification.value) {
      payload.source = 'hero_lead_continuation'
    } else {
      payload.source = 'journey_page'
    }

    // 1) Save to MongoDB via API
    await $fetch('/api/leads', {
      method: 'POST',
      body: payload,
    })

    // 2) Keep local copy for thankyou page text
    if (process.client) {
      localStorage.setItem('tripForm', JSON.stringify(payload))
    }

    // 3) Redirect to thank you page
    router.push({ path: '/thankyou' })
  } catch (err) {
    console.error(err)
    alert('Something went wrong while saving your request. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  form.value = {
    activities: [],
    days: 5,
    who: 'single',
    date: '',
    travellers: 1,
    ages: [30],
    genders: ['male'],
    budget: 1500,
    name: '',
    email: '',
    phone: '',
    originCity: ''
  }
  errors.value = {}
  showPrefilledNotification.value = false
  
  // Also clear any stored data
  if (process.client) {
    localStorage.removeItem('heroLeadData')
    localStorage.removeItem('heroLeadTimestamp')
    sessionStorage.removeItem('heroLeadData')
  }
}
</script>

<style scoped>
/* subtle focus ring fallback for non-Tailwind browsers */
input:focus, select:focus, button:focus {
  outline: 2px solid rgba(96,165,250,0.35);
  outline-offset: 2px;
}

/* Style for prefilled fields */
input[data-prefilled="true"] {
  background-color: #f0f9ff;
  border-color: #0ea5e9;
}
</style>