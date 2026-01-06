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

    <!-- Validation summary -->
    <div v-if="showValidationErrors && !isValid && validationAttempted" class="mb-6">
      <div class="bg-rose-50 border border-rose-200 rounded-xl p-4">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-rose-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-rose-800 font-medium">
            Please complete all required fields to generate your itinerary
          </span>
        </div>
        <ul class="text-rose-700 text-sm mt-2 ml-7 list-disc space-y-1">
          <li v-if="!form.name">Full name is required</li>
          <li v-if="!form.email || !isEmailValid">Valid email address is required</li>
          <li v-if="!form.date">Travel date is required</li>
          <li v-if="form.activities.length === 0">Select at least one activity</li>
        </ul>
        <button 
          @click="showValidationErrors = false"
          class="ml-7 mt-2 text-sm text-rose-600 hover:text-rose-800 font-medium"
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
          <label class="block text-sm font-semibold mb-3">Choose Your Activities <span class="text-rose-500">*</span></label>
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
            <label class="block text-sm font-semibold mb-2">Travel date <span class="text-rose-500">*</span></label>
            <input 
              type="date" 
              v-model="form.date" 
              class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-300" 
              :class="{'border-rose-300': errors.date}"
            />
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
        <section class="mb-5">
          <label class="block text-sm font-semibold mb-3">Contact details</label>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Full Name -->
            <div>
              <label class="block text-sm text-slate-600 mb-1">Full name <span class="text-rose-500">*</span></label>
              <input 
                type="text" 
                v-model="form.name" 
                placeholder="John Doe" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-300" 
                :class="{'border-rose-300': errors.name}"
                :data-prefilled="!!form.name" 
              />
              <p v-if="errors.name" class="mt-1 text-xs text-rose-600">{{ errors.name }}</p>
            </div>
            
            <!-- Email -->
            <div>
              <label class="block text-sm text-slate-600 mb-1">Email address <span class="text-rose-500">*</span></label>
              <input 
                type="email" 
                v-model="form.email" 
                placeholder="john@example.com" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-300" 
                :class="{'border-rose-300': errors.email}"
                :data-prefilled="!!form.email" 
              />
              <p v-if="errors.email" class="mt-1 text-xs text-rose-600">{{ errors.email }}</p>
            </div>

            <!-- Country -->
            <div>
              <label class="block text-sm text-slate-600 mb-1">Country</label>
              <select 
                v-model="form.country" 
                class="w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-sky-300 focus:border-sky-500"
                :data-prefilled="!!form.country"
              >
                <option value="">Select your country</option>
                <option v-for="country in countries" :key="country.code" :value="country.name">
                  {{ country.flag }} {{ country.name }}
                </option>
              </select>
            </div>

            <!-- Origin City -->
            <div>
              <label class="block text-sm text-slate-600 mb-1">Origin city</label>
              <input 
                type="text" 
                v-model="form.originCity" 
                placeholder="e.g., New York, London, Nairobi" 
                class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-300" 
              />
            </div>

            <!-- Phone Section - Improved Layout -->
            <div class="md:col-span-2">
              <label class="block text-sm text-slate-600 mb-1">Phone number</label>
              <div class="flex gap-3">
                <!-- Country Code -->
                <div class="relative flex-1">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-base">+</div>
                  <input
                    type="tel"
                    v-model="form.countryCode"
                    placeholder="255"
                    aria-label="Country code"
                    class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500"
                    :data-prefilled="!!form.countryCode"
                    @input="formatCountryCode"
                  />
                </div>
                
                <!-- Phone Number -->
                <div class="flex-2">
                  <input
                    type="tel"
                    v-model="form.phone"
                    placeholder="712 345 678"
                    class="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500"
                    :data-prefilled="!!form.phone"
                    @input="formatPhoneNumber"
                  />
                </div>
              </div>
              <p class="mt-1 text-xs text-slate-500">Example: +255 712 345 678</p>
            </div>
          </div>
        </section>

        <!-- Message / Special Requests -->
        <section class="mb-5">
          <label class="block text-sm font-semibold mb-2">Message / Special Requests</label>
          <p class="text-sm text-slate-500 mb-3">
            Accommodation preferences, dietary needs, etc.
          </p>
          <textarea 
            v-model="form.message" 
            rows="4" 
            placeholder="Enter any special requests, dietary restrictions, accommodation preferences, or other details..."
            class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-300"
          ></textarea>
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
            
            <div class="font-medium">Country</div>
            <div class="text-right">{{ form.country || '—' }}</div>
            
            <div class="font-medium">Message</div>
            <div class="text-right">{{ form.message ? '✓ Provided' : '—' }}</div>
          </div>

          <div class="pt-3 border-t"></div>

          <!-- Required fields hint -->
          <div v-if="!isValid" class="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg">
            <p class="font-medium">Complete required fields to enable button:</p>
            <ul class="mt-1 ml-4 list-disc space-y-0.5">
              <li v-if="!form.name">Full name</li>
              <li v-if="!form.email || !isEmailValid">Valid email</li>
              <li v-if="!form.date">Travel date</li>
              <li v-if="form.activities.length === 0">At least one activity</li>
            </ul>
          </div>

          <div class="flex gap-2">
            <button
              type="submit"
              :disabled="!isValid || isSubmitting"
              class="flex-1 rounded-lg px-4 py-3 text-white font-semibold shadow-md transition disabled:opacity-50 inline-flex items-center justify-center gap-3"
              :class="isValid && !isSubmitting ? 'bg-sky-600 hover:bg-sky-700' : 'bg-slate-400 cursor-not-allowed'"
              @click="attemptValidation"
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

// Popular countries for travel planning
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' }
]

// Form structure (country added)
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
  country: '', // NEW - Country field
  phone: '',
  countryCode: '',
  originCity: '',
  message: '' // NEW - Message field
})

const errors = ref({})
const isSubmitting = ref(false)
const showPrefilledNotification = ref(false)
const travellersManuallyEdited = ref(false)
const showValidationErrors = ref(false)
const validationAttempted = ref(false)

// Email validation helper
const isEmailValid = computed(() => {
  if (!form.value.email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
})

// Watch for who changes and update travellers if not manually edited
watch(() => form.value.who, (newWho) => {
  if (!travellersManuallyEdited.value) {
    let defaultTravellers = 1
    
    if (newWho === 'single') {
      defaultTravellers = 1
    } else if (newWho === 'couple') {
      defaultTravellers = 2
    } else if (newWho === 'groups' || newWho === 'family') {
      defaultTravellers = 3
    }
    
    form.value.travellers = defaultTravellers
    updateTravellerArrays()
  }
})

// Watch for manual travellers input changes
watch(() => form.value.travellers, () => {
  travellersManuallyEdited.value = true
})

// Watch for country selection to auto-fill country code
watch(() => form.value.country, (newCountry) => {
  if (newCountry) {
    const countryObj = countries.find(c => c.name === newCountry)
    if (countryObj) {
      // Set common country codes
      const countryCodeMap = {
        'United States': '1',
        'United Kingdom': '44',
        'Canada': '1',
        'Australia': '61',
        'Germany': '49',
        'France': '33',
        'Italy': '39',
        'Spain': '34',
        'Tanzania': '255',
        'Kenya': '254',
        'Uganda': '256',
        'Rwanda': '250',
        'South Africa': '27',
        'India': '91',
        'China': '86',
        'Japan': '81',
        'South Korea': '82',
        'United Arab Emirates': '971',
        'Brazil': '55',
        'Mexico': '52',
        'Argentina': '54'
      }
      
      if (countryCodeMap[newCountry]) {
        form.value.countryCode = countryCodeMap[newCountry]
      }
    }
  }
})

// --- Utilities for phone parsing/normalizing ---
function normalizeCountryCode(raw = '') {
  if (!raw) return ''
  const s = String(raw).trim()
  if (!s) return ''
  if (s.startsWith('+')) return s
  if (s.startsWith('00')) return `+${s.slice(2)}`
  return `+${s}`
}

/**
 * Attempt to split a combined phone string into { countryCode, phone }
 * E.g. "+255 712345678" -> { countryCode: "+255", phone: "712345678" }
 * Works with leading + or 00 or if not present returns {countryCode:'', phone: original}
 */
function splitCombinedPhone(str = '') {
  if (!str) return { countryCode: '', phone: '' }
  const s = String(str).trim()
  // try +country first
  const plusMatch = s.match(/^(\+?0{0,2}\d{1,4})\s*(.*)$/) // captures +255 or 00255 or 255
  if (plusMatch) {
    let ccRaw = plusMatch[1]
    let remaining = plusMatch[2] || ''
    // normalize cc
    if (ccRaw.startsWith('00')) ccRaw = `+${ccRaw.slice(2)}`
    else if (!ccRaw.startsWith('+')) ccRaw = `+${ccRaw}`
    return { countryCode: ccRaw, phone: remaining.trim() }
  }
  return { countryCode: '', phone: s }
}

// Format country code input
function formatCountryCode(event) {
  let value = event.target.value.replace(/\D/g, '')
  form.value.countryCode = value
}

// Format phone number input
function formatPhoneNumber(event) {
  let value = event.target.value.replace(/\D/g, '')
  // Format as 712 345 678
  if (value.length > 6) {
    value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 9)
  } else if (value.length > 3) {
    value = value.substring(0, 3) + ' ' + value.substring(3, 6)
  }
  form.value.phone = value
}

// --- Load prefilled data on mount ---
onMounted(() => {
  loadPrefilledData()
})

function loadPrefilledData() {
  if (process.client) {
    loadFromURLParams()
    // if not prefilled from URL, try localStorage/sessionStorage
    if (!showPrefilledNotification.value) {
      loadFromLocalStorage()
    }
  }
}

function loadFromURLParams() {
  const urlParams = new URLSearchParams(window.location.search)

  if (urlParams.has('prefilled') && urlParams.get('prefilled') === 'true') {
    showPrefilledNotification.value = true

    if (urlParams.has('name')) {
      form.value.name = decodeURIComponent(urlParams.get('name') || '')
    }
    if (urlParams.has('email')) {
      form.value.email = decodeURIComponent(urlParams.get('email') || '')
    }
    
    // Country
    if (urlParams.has('country')) {
      form.value.country = decodeURIComponent(urlParams.get('country') || '')
    }

    // phone & country code handling: priority -> countryCode param -> phoneCombined -> phone
    if (urlParams.has('countryCode')) {
      form.value.countryCode = normalizeCountryCode(urlParams.get('countryCode'))
      if (urlParams.has('phone')) {
        form.value.phone = urlParams.get('phone')
      } else if (urlParams.has('phoneCombined')) {
        const combined = urlParams.get('phoneCombined') || ''
        const parsed = splitCombinedPhone(decodeURIComponent(combined))
        form.value.countryCode = form.value.countryCode || normalizeCountryCode(parsed.countryCode)
        form.value.phone = parsed.phone || form.value.phone
      }
    } else if (urlParams.has('phoneCombined')) {
      const combined = urlParams.get('phoneCombined') || ''
      const parsed = splitCombinedPhone(decodeURIComponent(combined))
      form.value.countryCode = normalizeCountryCode(parsed.countryCode)
      form.value.phone = parsed.phone
    } else if (urlParams.has('phone')) {
      // phone only, could include +prefix - try to parse
      const p = urlParams.get('phone') || ''
      const parsed = splitCombinedPhone(decodeURIComponent(p))
      form.value.countryCode = normalizeCountryCode(parsed.countryCode)
      form.value.phone = parsed.phone || p
    }

    // Travel date
    if (urlParams.has('travelDate')) {
      form.value.date = urlParams.get('travelDate') || ''
    }

    // Travellers mapping (same as before)
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
      if (travellerCount === 1) form.value.who = 'single'
      else if (travellerCount === 2) form.value.who = 'couple'
      else if (travellerCount >= 10) form.value.who = 'groups'
      else form.value.who = 'family'
    }

    // Budget
    if (urlParams.has('budget')) {
      const budgetParam = urlParams.get('budget') || ''
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
        const interests = JSON.parse(urlParams.get('interests') || '[]')
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

    // Message / Special Requests
    if (urlParams.has('message')) {
      form.value.message = decodeURIComponent(urlParams.get('message') || '')
    }

    updateTravellerArrays()

    // Clear URL parameters (so refresh doesn't keep them)
    const newUrl = window.location.pathname
    window.history.replaceState({}, document.title, newUrl)
  }
}

function loadFromLocalStorage() {
  let storedData = localStorage.getItem('heroLeadData')
  // fallback to sessionStorage
  if (!storedData) storedData = sessionStorage.getItem('heroLeadData')

  if (storedData) {
    try {
      const heroData = JSON.parse(storedData)
      showPrefilledNotification.value = true

      if (heroData.name) form.value.name = heroData.name
      if (heroData.email) form.value.email = heroData.email
      
      // Country
      if (heroData.country) form.value.country = heroData.country

      // countryCode priority: heroData.countryCode -> heroData.phoneCombined -> heroData.phone (with +)
      if (heroData.countryCode) {
        form.value.countryCode = normalizeCountryCode(heroData.countryCode)
        if (heroData.phone) form.value.phone = heroData.phone
        else if (heroData.phoneCombined) {
          const p = splitCombinedPhone(heroData.phoneCombined)
          form.value.phone = p.phone || form.value.phone
        }
      } else if (heroData.phoneCombined) {
        const p = splitCombinedPhone(heroData.phoneCombined)
        form.value.countryCode = normalizeCountryCode(p.countryCode)
        form.value.phone = p.phone || ''
      } else if (heroData.phone) {
        const p = splitCombinedPhone(heroData.phone)
        form.value.countryCode = normalizeCountryCode(p.countryCode)
        form.value.phone = p.phone || heroData.phone
      }

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

      // Message / Special Requests
      if (heroData.message) {
        form.value.message = heroData.message
      }

      updateTravellerArrays()

      // Clear storage after loading to avoid duplicate prefill later
      localStorage.removeItem('heroLeadData')
      localStorage.removeItem('heroLeadTimestamp')
      sessionStorage.removeItem('heroLeadData')
    } catch (error) {
      console.error('Error loading heroLeadData:', error)
      // clear corrupted data
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

function attemptValidation() {
  validationAttempted.value = true
  showValidationErrors.value = true
  validate()
}

const isValid = computed(() => {
  return form.value.name && 
         form.value.email && 
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
         form.value.date && 
         form.value.activities.length > 0
})

async function handleSubmit() {
  validationAttempted.value = true
  showValidationErrors.value = true
  
  if (!validate()) return

  isSubmitting.value = true

  try {
    const payload = JSON.parse(JSON.stringify(form.value))
    payload.createdAt = new Date().toISOString()

    // Always set source to 'custom_itinerary' for this page
    payload.source = 'custom_itinerary'
    payload.leadSourceDetail = 'Custom itinerary request form'

    // Save to server - Updated to include all new fields
    await $fetch('/api/leads', {
      method: 'POST',
      body: payload,
    })

    // Keep local copy for thankyou page text
    if (process.client) {
      localStorage.setItem('tripForm', JSON.stringify(payload))
    }

    // Redirect to thank you page
    router.push({ 
      path: '/thankyou',
      query: { 
        name: form.value.name,
        activities: form.value.activities.join(', '),
        days: form.value.days,
        travellers: form.value.travellers,
        date: form.value.date,
        budget: form.value.budget
      }
    })
  } catch (err) {
    console.error('Error saving lead:', err)
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
    country: '',
    phone: '',
    countryCode: '',
    originCity: '',
    message: '' // NEW - Reset message field
  }
  errors.value = {}
  showPrefilledNotification.value = false
  travellersManuallyEdited.value = false
  showValidationErrors.value = false
  validationAttempted.value = false

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
input[data-prefilled="true"], select[data-prefilled="true"] {
  background-color: #f0f9ff;
  border-color: #0ea5e9;
}

/* Required field indicator */
.text-rose-500 {
  color: #f43f5e;
}

/* Border color for error fields */
.border-rose-300 {
  border-color: #fda4af;
}
</style>