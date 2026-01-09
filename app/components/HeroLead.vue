<template>
  <form @submit.prevent="submitLead" class="space-y-6">
    <!-- Form Header -->
    <div class="text-center mb-2">
      <h4 class="text-xl font-bold text-gray-900">
        Plan Your Dream Trip in 30 Seconds
      </h4>
      <p class="text-sm text-gray-700 mt-2">
        Tell us who's traveling and when you're arriving — and unlock a personalized plan crafted just for you.
      </p>
    </div>

    <!-- Adults Count -->
    <div>
      <label for="adults" class="block text-sm font-medium text-gray-800 mb-2">
        Adults <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <input
          id="adults"
          v-model.number="form.adults"
          type="number"
          min="1"
          max="20"
          required
          class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
                 focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
          placeholder="Number of adults"
        />
      </div>
    </div>

    <!-- Children Count -->
    <div>
      <label for="children" class="block text-sm font-medium text-gray-800 mb-2">
        Children
        <span class="text-xs text-gray-600 font-normal block mt-0.5">(Under 12 years)</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5v-5.5m0 5.5h-5.5m5.5 0l-2.5-2.5" />
          </svg>
        </div>
        <input
          id="children"
          v-model.number="form.children"
          type="number"
          min="0"
          max="20"
          class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
                 focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
          placeholder="Number of children"
        />
      </div>
    </div>

    <!-- Estimated Arrival Date -->
    <div>
      <label for="arrivalDate" class="block text-sm font-medium text-gray-800 mb-2">
        Estimated arrival date <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          id="arrivalDate"
          v-model="form.arrivalDate"
          type="date"
          required
          class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm text-gray-900
                 focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 transition-all duration-200"
          :min="minDate"
        />
      </div>
      <p class="text-xs text-gray-600 mt-2">Flexible dates? Approximate is fine.</p>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="loading"
      class="w-full py-3.5 bg-linear-to-r from-amber-500 via-amber-400 to-emerald-600 text-white font-bold rounded-xl
             shadow-lg shadow-amber-900/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300
             disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base"
    >
      <div v-if="!loading" class="flex items-center justify-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Get My Personalized Plan
      </div>
      <div v-else class="flex items-center justify-center">
        <svg class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Creating your plan...
      </div>
    </button>

    <!-- Trust & Privacy Note -->
    <div class="pt-3">
      <div class="flex items-center justify-center text-xs text-gray-600 mb-2">
        <svg class="w-4 h-4 mr-1.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd" />
        </svg>
        <span>100% free · No commitment required</span>
      </div>
      <p class="text-xs text-center text-gray-600">
        We'll get back to you within 24 hours with a personalized itinerary.
        <a href="/privacy" class="text-emerald-700 hover:text-emerald-800 font-medium">Privacy Policy</a>.
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Set minimum date to today
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Get current date formatted as YYYY-MM-DD for default
const getCurrentDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const form = ref({
  adults: 2,
  children: 0,
  arrivalDate: getCurrentDate() // Default to today
})

const loading = ref(false)

const submitLead = async () => {
  if (!form.value.adults || !form.value.arrivalDate) {
    alert('Please fill in all required fields')
    return
  }

  loading.value = true

  try {
    // Generate a unique session ID for this form submission
    const sessionId = `hero_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // NUCLEAR CLEAR: Remove ALL possible localStorage items before saving new
    if (typeof window !== 'undefined') {
      // Clear ALL localStorage items that start with 'hero' or contain 'prefilled'
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('hero') || key.includes('prefilled') || key === 'heroSessionId') {
          localStorage.removeItem(key)
        }
      })
      
      // Clear ALL sessionStorage
      sessionStorage.clear()
      
      console.log('🧹 NUKED all hero-related localStorage before saving new')
    }

    // Prepare lead data for the journey page
    const leadData = {
      adults: parseInt(form.value.adults),
      children: parseInt(form.value.children) || 0,
      arrivalDate: form.value.arrivalDate,
      totalTravelers: parseInt(form.value.adults) + (parseInt(form.value.children) || 0),
      source: 'hero_quick_lead',
      leadSourceDetail: `Homepage Quick Planner - ${form.value.adults}A/${form.value.children}C - ${form.value.arrivalDate}`,
      submittedAt: new Date().toISOString(),
      sessionId: sessionId
    }

    console.log('Hero lead data:', leadData)

    // Save NEW data to storage with VERY SHORT expiration
    if (typeof window !== 'undefined') {
      // Save session ID
      localStorage.setItem('heroSessionId', sessionId)
      
      // Save data with expiration timestamp (5 minutes)
      const dataWithExpiry = {
        ...leadData,
        _expiry: Date.now() + (5 * 60 * 1000) // 5 minutes from now
      }
      
      localStorage.setItem('heroLeadData', JSON.stringify(dataWithExpiry))
      
      console.log('💾 Saved NEW hero form data with 5-minute expiry')
    }

    // Build URL params for journey page
    const params = new URLSearchParams()
    params.append('prefilled', 'true')
    params.append('adults', form.value.adults)
    params.append('children', form.value.children || '0')
    params.append('arrivalDate', form.value.arrivalDate)
    params.append('source', 'hero_quick')
    params.append('sessionId', sessionId)
    
    const total = parseInt(form.value.adults) + (parseInt(form.value.children) || 0)
    params.append('travelers', total)

    console.log('Redirecting to journey with FRESH session:', sessionId)

    // Use replaceState to prevent back button issues
    if (window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname)
    }
    
    // Redirect to journey page IMMEDIATELY
    window.location.href = `/journey?${params.toString()}`

  } catch (error) {
    console.error('Error submitting lead:', error)
    alert('Something went wrong. Please try again.')
  } finally {
    loading.value = false
  }
}

// On component mount, check if we should prefill from URL params
onMounted(() => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const prefilledAdults = urlParams.get('adults')
    const prefilledChildren = urlParams.get('children')
    const prefilledArrivalDate = urlParams.get('arrivalDate')
    
    if (prefilledAdults) form.value.adults = parseInt(prefilledAdults)
    if (prefilledChildren) form.value.children = parseInt(prefilledChildren)
    if (prefilledArrivalDate) form.value.arrivalDate = prefilledArrivalDate
  }
})
</script>

<style scoped>
/* Style for number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
  height: auto;
  cursor: pointer;
}

/* Keep focus styles consistent */
input:focus, button:focus {
  outline: 2px solid rgba(96,165,250,0.35);
  outline-offset: 2px;
}

/* Make date input show calendar icon */
input[type="date"] {
  color-scheme: light;
}

/* Ensure placeholder text is visible */
input::placeholder {
  color: #9ca3af;
}
</style>