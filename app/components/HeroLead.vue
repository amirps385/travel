<template>
  <form @submit.prevent="submitLead" class="space-y-5">
    <!-- Form Header -->
    <div class="text-center mb-2">
      <h4 class="text-xl font-bold text-gray-900">
        Plan Your Dream Trip
      </h4>
      <p class="text-sm text-gray-700 mt-1">
        Get your free custom quote in 24 hours
      </p>
    </div>

    <!-- Full Name -->
    <div>
      <label for="fullName" class="block text-sm font-medium text-gray-800 mb-1.5">
        Full Name <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <input
          id="fullName"
          v-model="form.name"
          type="text"
          required
          class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
                 focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
          placeholder="John Doe"
        />
      </div>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-800 mb-1.5">
        Email Address <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
                 focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
          placeholder="john@example.com"
        />
      </div>
    </div>

    <!-- Country Selection -->
    <div>
      <label for="country" class="block text-sm font-medium text-gray-800 mb-1.5">
        Country
      </label>
      <select
        id="country"
        v-model="form.country"
        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
        @change="onCountryChange"
      >
        <option value="">Select your country</option>
        <option v-for="country in popularCountries" :key="country.code" :value="country.name">
          {{ country.flag }} {{ country.name }}
        </option>
      </select>
    </div>

    <!-- Country Code + Phone -->
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-800 mb-1.5">
        Phone / WhatsApp
        <span class="text-xs text-gray-600 font-normal"> (include country code)</span>
        <span class="text-xs text-gray-600 font-normal"> — optional but recommended</span>
      </label>

      <div class="flex gap-2">
        <!-- Country code input with + prefix -->
        <div class="relative shrink-0 w-28">
          <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">+</div>
          <input
            id="countryCode"
            v-model="form.countryCode"
            type="tel"
            inputmode="tel"
            placeholder="91"
            aria-label="Country code"
            class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-xl sm:rounded-l-xl sm:rounded-r-none bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            @input="formatCountryCode"
          />
        </div>

        <!-- Phone main input -->
        <div class="flex-1">
          <div
            class="flex items-center border border-gray-300 rounded-xl sm:rounded-l-none sm:rounded-r-xl px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-amber-500/30"
          >
            <svg class="h-5 w-5 text-gray-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 18.72V22a2 2 0 01-2 2h-1C9.716 24 3 17.284 3 9V5z" />
            </svg>

            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              inputmode="tel"
              class="flex-1 text-sm text-gray-900 bg-transparent placeholder-gray-400 focus:outline-none"
              placeholder="98765 43210"
              @input="formatPhoneNumber"
              maxlength="15" 
            />
          </div>
        </div>
      </div>

      <p class="text-xs text-gray-500 mt-2">Example: <span class="font-medium">+91 98765 43210</span> (10 digits)</p>
    </div>

    <!-- Trip Type / Destination -->
    <div>
      <label for="tripType" class="block text-sm font-medium text-gray-800 mb-1.5">
        Trip Type / Destination <span class="text-red-500">*</span>
      </label>
      <select
        id="tripType"
        v-model="form.interests"
        required
        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
      >
        <option value="" disabled selected>Select your adventure</option>
        <option value="safari">Tanzania Safari</option>
        <option value="kilimanjaro">Climbing Kilimanjaro</option>
        <option value="zanzibar">Zanzibar &amp; Beach</option>
        <option value="cultural">Day Trip / Cultural</option>
        <option value="custom">Custom Trip / Multi-destination</option>
      </select>
    </div>

    <!-- Travel Dates -->
    <div>
      <label for="travelDate" class="block text-sm font-medium text-gray-800 mb-1.5">
        Approx. Travel Date <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          id="travelDate"
          v-model="form.travelDate"
          type="date"
          required
          class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
                 focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
        />
      </div>
      <p class="text-xs text-gray-600 mt-1">Flexible dates? Approximate is fine.</p>
    </div>

    <!-- Number of Travellers -->
    <div>
      <label for="travellers" class="block text-sm font-medium text-gray-800 mb-1.5">
        Number of Travellers <span class="text-red-500">*</span>
      </label>
      <select
        id="travellers"
        v-model="form.travellers"
        required
        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
      >
        <option value="1">1 Person</option>
        <option value="2">2 People</option>
        <option value="3-4">3–4 People</option>
        <option value="5-6">5–6 People</option>
        <option value="7+">7+ People</option>
        <option value="group">Group (10+)</option>
      </select>
    </div>

    <!-- Budget -->
    <div>
      <label for="budget" class="block text-sm font-medium text-gray-800 mb-1.5">
        Budget Range (per person)
        <span class="text-xs text-gray-600 font-normal block mt-0.5">Helps us tailor recommendations</span>
      </label>
      <select
        id="budget"
        v-model="form.budget"
        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
      >
        <option value="">Select budget</option>
        <option value="1000-2000">$1,000 - $2,000</option>
        <option value="2000-3000">$2,000 - $3,000</option>
        <option value="3000-5000">$3,000 - $5,000</option>
        <option value="5000+">$5,000+</option>
        <option value="custom">Custom/Luxury</option>
      </select>
    </div>

    <!-- Message -->
    <div>
      <label for="message" class="block text-sm font-medium text-gray-800 mb-1.5">
        Message / Special Requests
        <span class="text-xs text-gray-600 font-normal block mt-0.5">Accommodation preferences, dietary needs, etc.</span>
      </label>
      <textarea
        id="message"
        v-model="form.message"
        rows="3"
        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
               focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200 resize-none"
        placeholder="Tell us about your dream trip, any special requirements, or questions..."
      ></textarea>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="loading"
      class="w-full py-3 bg-linear-to-r from-amber-500 via-amber-400 to-emerald-600 text-white font-semibold rounded-xl
             shadow-lg shadow-amber-900/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300
             disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
      <div v-if="!loading" class="flex items-center justify-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Get Free Quote Now
      </div>
      <div v-else class="flex items-center justify-center">
        <svg class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Processing...
      </div>
    </button>

    <!-- Trust & Privacy Note -->
    <div class="pt-2">
      <div class="flex items-center justify-center text-xs text-gray-600 mb-2">
        <svg class="w-4 h-4 mr-1.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd" />
        </svg>
        <span>We'll get back to you within 24 hours</span>
      </div>
      <p class="text-xs text-center text-gray-600">
        By submitting, you agree to our
        <a href="/privacy" class="text-emerald-700 hover:text-emerald-800 font-medium">Privacy Policy</a>.
        Your information is secure.
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

// Popular countries with their country codes
const popularCountries = [
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', dialCode: '255' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '254' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', dialCode: '256' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', dialCode: '250' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '27' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '91' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '44' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '1' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '33' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '39' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '34' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '86' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '81' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '55' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '52' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '971' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '966' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '234' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', dialCode: '233' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '20' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', dialCode: '212' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '54' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '56' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', dialCode: '51' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '57' }
]

const form = ref({
  name: '',
  email: '',
  country: '', // NEW: country field
  phone: '',
  countryCode: '', // Stores numeric code without +
  travelDate: '',
  travellers: '2',
  interests: [],
  budget: '',
  message: ''
})

const loading = ref(false)

// Watch for country changes to auto-fill country code
function onCountryChange() {
  if (form.value.country) {
    const countryObj = popularCountries.find(c => c.name === form.value.country)
    if (countryObj && countryObj.dialCode) {
      // Set country code without + (just the numbers)
      form.value.countryCode = countryObj.dialCode
    }
  }
}

// Format country code input (numbers only)
function formatCountryCode(event) {
  let value = event.target.value.replace(/\D/g, '')
  // Limit to 4 digits for country codes
  if (value.length > 4) {
    value = value.substring(0, 4)
  }
  form.value.countryCode = value
}

// Format phone number input - FIXED VERSION
function formatPhoneNumber(event) {
  let value = event.target.value.replace(/\D/g, '')
  
  // Remove any formatting from previous call
  const rawDigits = value
  
  // Don't limit the number of digits - allow up to 15 digits for phone numbers
  // (Some countries have longer phone numbers)
  
  // Format based on length for Indian numbers (10 digits)
  let formattedValue = rawDigits
  
  if (rawDigits.length <= 10) {
    // Indian format: 98765 43210
    if (rawDigits.length > 5) {
      formattedValue = rawDigits.substring(0, 5) + ' ' + rawDigits.substring(5, 10)
    }
  } else {
    // For longer numbers, format in groups of 3 or 4
    if (rawDigits.length > 7) {
      formattedValue = rawDigits.substring(0, 3) + ' ' + 
                      rawDigits.substring(3, 6) + ' ' + 
                      rawDigits.substring(6, 10) + ' ' +
                      rawDigits.substring(10, 13)
    } else if (rawDigits.length > 3) {
      formattedValue = rawDigits.substring(0, 3) + ' ' + rawDigits.substring(3, 7)
    }
  }
  
  // Ensure we don't have trailing space
  formattedValue = formattedValue.trim()
  
  // Update the display value (with formatting)
  form.value.phone = formattedValue
}

/**
 * Normalize country code to ensure it's just numbers without +
 */
function normalizeCountryCode(raw = '') {
  if (!raw) return ''
  const s = String(raw).trim()
  if (!s) return ''
  // Remove any + signs and keep only digits
  const digits = s.replace(/\D/g, '')
  return digits
}

const submitLead = async () => {
  if (!form.value.name || !form.value.email || !form.value.travelDate) {
    alert('Please fill in all required fields')
    return
  }

  loading.value = true

  try {
    // Normalize country code to digits only (no +)
    const countryCodeDigits = normalizeCountryCode(form.value.countryCode)

    // Build interests array
    const interestsArray = form.value.interests ? [form.value.interests] : []

    // Prepare phone number - remove all formatting spaces and keep only digits
    const phoneDigits = form.value.phone ? form.value.phone.replace(/\s/g, '') : ''

    // Compose hero lead data
    const leadData = {
      name: form.value.name,
      email: form.value.email,
      phone: phoneDigits,
      countryCode: countryCodeDigits, // Store as digits only
      country: form.value.country, // Store country name
      travelDate: form.value.travelDate,
      travellers: form.value.travellers,
      interests: interestsArray,
      budget: form.value.budget,
      message: form.value.message,
      source: 'hero_lead',
      leadSourceDetail: 'Hero form submission',
      submittedAt: new Date().toISOString()
    }

    console.log('Hero lead data:', leadData)
    console.log('Phone digits:', phoneDigits, 'Length:', phoneDigits.length)

    // Save to localStorage + sessionStorage (so journey page can prefill)
    if (typeof window !== 'undefined') {
      localStorage.setItem('heroLeadData', JSON.stringify(leadData))
      localStorage.setItem('heroLeadTimestamp', Date.now().toString())
      sessionStorage.setItem('heroLeadData', JSON.stringify(leadData))
    }

    // Build URL params for journey page
    const params = new URLSearchParams()
    params.append('prefilled', 'true')
    params.append('name', form.value.name)
    params.append('email', form.value.email)
    
    // Add country field
    if (form.value.country) {
      params.append('country', form.value.country)
    }
    
    // Add country code (digits only)
    if (countryCodeDigits) {
      params.append('countryCode', countryCodeDigits)
    }
    
    // Add phone
    if (phoneDigits) {
      params.append('phone', phoneDigits)
    }

    // Also include combined phone for backward compatibility
    if (countryCodeDigits && phoneDigits) {
      params.append('phoneCombined', `+${countryCodeDigits} ${phoneDigits}`)
    } else if (phoneDigits) {
      params.append('phoneCombined', phoneDigits)
    }

    // Add other fields
    if (form.value.travelDate) params.append('travelDate', form.value.travelDate)
    if (form.value.travellers) params.append('travellers', form.value.travellers)
    if (form.value.budget) params.append('budget', form.value.budget)
    if (interestsArray.length > 0) {
      params.append('interests', JSON.stringify(interestsArray))
    }

    // ADD ONLY THIS LINE: Include message in URL parameters
    if (form.value.message) {
      params.append('message', encodeURIComponent(form.value.message))
    }

    console.log('Redirecting to journey with params:', params.toString())

    // Immediate redirect with short timeout for better UX
    setTimeout(() => {
      window.location.href = `/journey?${params.toString()}`
    }, 80)

  } catch (error) {
    console.error('Error submitting lead:', error)
    alert('Something went wrong. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* keep styling consistent with journey page */
input:focus, select:focus, button:focus {
  outline: 2px solid rgba(96,165,250,0.35);
  outline-offset: 2px;
}

/* Country code input styling */
input#countryCode {
  text-align: center;
  font-family: monospace;
}
</style>