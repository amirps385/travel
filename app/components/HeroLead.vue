<!-- components/HeroLead.vue -->
<template>
  <form @submit.prevent="submitLead" class="space-y-5">
    <!-- Form Header -->
    <div class="text-center mb-4">
      <h4 class="text-xl font-bold text-gray-900">Plan Your Dream Trip</h4>
      <p class="text-sm text-gray-600 mt-1">Get your free custom quote in 24 hours</p>
    </div>

    <!-- Full Name -->
    <div>
      <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1.5">
        Full Name <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <input 
          id="fullName"
          v-model="form.name"
          type="text" 
          required
          class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          placeholder="John Doe"
        >
      </div>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
        Email Address <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <input 
          id="email"
          v-model="form.email"
          type="email" 
          required
          class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          placeholder="john@example.com"
        >
      </div>
    </div>

    <!-- Phone / WhatsApp -->
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700 mb-1.5">
        Phone / WhatsApp <span class="text-xs text-gray-500 font-normal">(optional but recommended)</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </div>
        <input 
          id="phone"
          v-model="form.phone"
          type="tel"
          class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          placeholder="+255 123 456 789"
        >
      </div>
    </div>

    <!-- Trip Type / Destination -->
    <div>
      <label for="tripType" class="block text-sm font-medium text-gray-700 mb-1.5">
        Trip Type / Destination <span class="text-red-500">*</span>
      </label>
      <select 
        id="tripType"
        v-model="form.interests"
        required
        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
      >
        <option value="" disabled selected>Select your adventure</option>
        <option value="safari">Tanzania Safari</option>
        <option value="kilimanjaro">Climbing Kilimanjaro</option>
        <option value="zanzibar">Zanzibar & Beach</option>
        <option value="cultural">Day Trip / Cultural</option>
        <option value="custom">Custom Trip / Multi-destination</option>
      </select>
    </div>

    <!-- Travel Dates - Date Picker -->
    <div>
      <label for="travelDate" class="block text-sm font-medium text-gray-700 mb-1.5">
        Approx. Travel Date <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <input 
          id="travelDate"
          v-model="form.travelDate"
          type="date" 
          required
          class="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
        >
      </div>
      <p class="text-xs text-gray-500 mt-1">Flexible dates? You can approximate or select a preferred start date.</p>
    </div>

    <!-- Number of Travellers -->
    <div>
      <label for="travellers" class="block text-sm font-medium text-gray-700 mb-1.5">
        Number of Travellers <span class="text-red-500">*</span>
      </label>
      <select 
        id="travellers"
        v-model="form.travellers"
        required
        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
      >
        <option value="1">1 Person</option>
        <option value="2">2 People</option>
        <option value="3-4">3-4 People</option>
        <option value="5-6">5-6 People</option>
        <option value="7+">7+ People</option>
        <option value="group">Group (10+)</option>
      </select>
    </div>

    <!-- Budget Range -->
    <div>
      <label for="budget" class="block text-sm font-medium text-gray-700 mb-1.5">
        Budget Range (per person)
        <span class="text-xs text-gray-500 font-normal block mt-0.5">Helps us tailor recommendations</span>
      </label>
      <select 
        id="budget"
        v-model="form.budget"
        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white"
      >
        <option value="">Select budget</option>
        <option value="1000-2000">$1,000 - $2,000</option>
        <option value="2000-3000">$2,000 - $3,000</option>
        <option value="3000-5000">$3,000 - $5,000</option>
        <option value="5000+">$5,000+</option>
        <option value="custom">Custom/Luxury</option>
      </select>
    </div>

    <!-- Message / Special Requests -->
    <div>
      <label for="message" class="block text-sm font-medium text-gray-700 mb-1.5">
        Message / Special Requests
        <span class="text-xs text-gray-500 font-normal block mt-0.5">Accommodation preferences, dietary needs, etc.</span>
      </label>
      <textarea 
        id="message"
        v-model="form.message"
        rows="3"
        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
        placeholder="Tell us about your dream trip, any special requirements, or questions..."
      ></textarea>
    </div>

    <!-- Submit Button -->
    <button 
      type="submit"
      :disabled="loading"
      class="w-full py-3 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
    >
      <div v-if="!loading" class="flex items-center justify-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Get Free Quote Now
      </div>
      <div v-else class="flex items-center justify-center">
        <svg class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        Processing...
      </div>
    </button>

    <!-- Trust & Privacy Note -->
    <div class="pt-2">
      <div class="flex items-center justify-center text-xs text-gray-500 mb-2">
        <svg class="w-4 h-4 mr-1.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span>We'll get back to you within 24 hours</span>
      </div>
      <p class="text-xs text-center text-gray-500">
        By submitting, you agree to our 
        <a href="/privacy" class="text-emerald-600 hover:text-emerald-800 font-medium">Privacy Policy</a>. 
        Your information is secure.
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

// Initialize form with updated fields while maintaining compatibility
const form = ref({
  name: '',
  email: '',
  phone: '',
  travelDate: '',
  travellers: '2',
  interests: [], // Using array for compatibility with original
  budget: '',
  message: ''
})

// Helper to get the single selected interest from the dropdown
const getSelectedInterest = () => {
  if (Array.isArray(form.value.interests) && form.value.interests.length > 0) {
    return form.value.interests[0];
  }
  return form.value.interests;
}

const loading = ref(false)

const submitLead = async () => {
  // Basic validation
  if (!form.value.name || !form.value.email || !form.value.travelDate) {
    alert('Please fill in all required fields')
    return
  }

  loading.value = true

  try {
    // Convert single selection to array for compatibility
    const interestsArray = form.value.interests ? [form.value.interests] : [];

    // 1. Prepare data to pass to journey.vue
    const leadData = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      travelDate: form.value.travelDate,
      travellers: form.value.travellers,
      interests: interestsArray, // Keep as array for compatibility
      budget: form.value.budget,
      message: form.value.message,
      source: 'hero_lead',
      submittedAt: new Date().toISOString()
    }

    // 2. Save to localStorage (most reliable for cross-page data)
    if (typeof window !== 'undefined') {
      localStorage.setItem('heroLeadData', JSON.stringify(leadData))
      // Add a timestamp to prevent old data from being used
      localStorage.setItem('heroLeadTimestamp', Date.now().toString())
      
      // Also save to sessionStorage as backup
      sessionStorage.setItem('heroLeadData', JSON.stringify(leadData))
    }

    // 3. Redirect to journey page with URL parameters (most reliable method)
    const params = new URLSearchParams()
    params.append('prefilled', 'true')
    params.append('name', form.value.name)
    params.append('email', form.value.email)
    
    if (form.value.phone) params.append('phone', form.value.phone)
    if (form.value.travelDate) params.append('travelDate', form.value.travelDate)
    if (form.value.travellers) params.append('travellers', form.value.travellers)
    if (form.value.budget) params.append('budget', form.value.budget)
    if (interestsArray.length > 0) params.append('interests', JSON.stringify(interestsArray))
    
    // Wait a moment to ensure data is saved, then redirect
    setTimeout(() => {
      window.location.href = `/journey?${params.toString()}`
    }, 100)

  } catch (error) {
    console.error('Error:', error)
    alert('Something went wrong. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>