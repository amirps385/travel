<!-- components/HeroLead.vue -->
<template>
  <form @submit.prevent="submitLead" class="space-y-6">
    <!-- Form Header -->
    <div class="text-center mb-2">
      <h4 class="text-lg font-semibold text-gray-900">Start Your Adventure</h4>
      <p class="text-sm text-gray-600 mt-1">Fill in details for a personalized quote</p>
    </div>
    
    <!-- Name Field -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Full Name
        <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <input 
          v-model="form.name"
          type="text" 
          required
          class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
          placeholder="John Doe"
        >
      </div>
    </div>
    
    <!-- Email Field -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Email Address
        <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <input 
          v-model="form.email"
          type="email" 
          required
          class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
          placeholder="john@example.com"
        >
      </div>
    </div>
    
    <!-- Travel Dates -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Travel Date
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <input 
            v-model="form.travelDate"
            type="date" 
            class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
          >
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Travellers
        </label>
        <select 
          v-model="form.travellers"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
        >
          <option value="1">1 Person</option>
          <option value="2">2 People</option>
          <option value="3-4">3-4 People</option>
          <option value="5-6">5-6 People</option>
          <option value="7+">7+ People</option>
          <option value="group">Group (10+)</option>
        </select>
      </div>
    </div>
    
    <!-- Destination Interest -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        What interests you?
      </label>
      <div class="grid grid-cols-2 gap-2">
        <label class="flex items-center p-3 border border-gray-300 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-300">
          <input v-model="form.interests" type="checkbox" value="safari" class="rounded text-primary-600 focus:ring-primary-500">
          <span class="ml-3 text-sm font-medium text-gray-700">Safari</span>
        </label>
        
        <label class="flex items-center p-3 border border-gray-300 rounded-xl hover:border-secondary-300 hover:bg-secondary-50 cursor-pointer transition-all duration-300">
          <input v-model="form.interests" type="checkbox" value="kilimanjaro" class="rounded text-secondary-600 focus:ring-secondary-500">
          <span class="ml-3 text-sm font-medium text-gray-700">Kilimanjaro</span>
        </label>
        
        <label class="flex items-center p-3 border border-gray-300 rounded-xl hover:border-ocean-300 hover:bg-ocean-50 cursor-pointer transition-all duration-300">
          <input v-model="form.interests" type="checkbox" value="zanzibar" class="rounded text-ocean-600 focus:ring-ocean-500">
          <span class="ml-3 text-sm font-medium text-gray-700">Zanzibar</span>
        </label>
        
        <label class="flex items-center p-3 border border-gray-300 rounded-xl hover:border-adventure-300 hover:bg-adventure-50 cursor-pointer transition-all duration-300">
          <input v-model="form.interests" type="checkbox" value="cultural" class="rounded text-adventure-600 focus:ring-adventure-500">
          <span class="ml-3 text-sm font-medium text-gray-700">Cultural</span>
        </label>
      </div>
    </div>
    
    <!-- Budget Range -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Budget Range (per person)
      </label>
      <select 
        v-model="form.budget"
        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
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
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Special Requests
      </label>
      <textarea 
        v-model="form.message"
        rows="3"
        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
        placeholder="Any special requirements or questions..."
      ></textarea>
    </div>
    
    <!-- Submit Button -->
    <button 
      type="submit"
      class="w-full py-4 bg-linear-to-r from-primary-600 to-ocean-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary-200 transition-all duration-300 transform hover:-translate-y-1"
      :disabled="loading"
    >
      <span v-if="!loading" class="flex items-center justify-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
        </svg>
        Get Free Custom Itinerary
      </span>
      <span v-else class="flex items-center justify-center">
        <svg class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        Processing...
      </span>
    </button>
    
    <!-- Privacy Note -->
    <p class="text-xs text-center text-gray-500 mt-4">
      By submitting, you agree to our 
      <a href="/privacy" class="text-primary-600 hover:text-primary-800 font-medium">Privacy Policy</a>. 
      We'll contact you within 24 hours.
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  travelDate: '',
  travellers: '2',
  interests: [],
  budget: '',
  message: ''
})

const loading = ref(false)

const submitLead = async () => {
  // Basic validation
  if (!form.value.name || !form.value.email) {
    alert('Please fill in required fields (Name and Email)')
    return
  }

  loading.value = true

  try {
    // 1. Prepare data to pass to journey.vue
    const leadData = {
      name: form.value.name,
      email: form.value.email,
      travelDate: form.value.travelDate,
      travellers: form.value.travellers,
      interests: form.value.interests,
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

    
    if (form.value.travelDate) params.append('travelDate', form.value.travelDate)
    if (form.value.travellers) params.append('travellers', form.value.travellers)
    if (form.value.budget) params.append('budget', form.value.budget)
    if (form.value.interests.length > 0) params.append('interests', JSON.stringify(form.value.interests))
    
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