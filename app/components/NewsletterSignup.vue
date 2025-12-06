<template>
  <section class="relative py-20 md:py-24 lg:py-28">
    <!-- Background gradient matching previous components -->
    <div class="absolute inset-0 bg-linear-to-br from-white via-blue-50/20 to-slate-50/30"></div>
    
    <!-- Decorative elements similar to other sections -->
    <div class="absolute top-1/4 -right-20 w-80 h-80 bg-blue-100/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 -left-20 w-80 h-80 bg-emerald-100/10 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="max-w-3xl mx-auto">
        <!-- Main Card with same styling as testimonials -->
        <div class="bg-white rounded-3xl shadow-xl p-8 md:p-10 lg:p-12 border border-gray-100">
          
          <!-- Header -->
          <div class="text-center mb-10">
            <div class="inline-flex items-center justify-center mb-6">
              <svg class="w-5 h-5 text-primary-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span class="text-primary-blue font-semibold tracking-wider text-sm uppercase">Newsletter</span>
            </div>
            
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Sign up for our newsletter
            </h2>
            
            <p class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Receive travel ideas, destination guides, and inspiration directly in your inbox.
            </p>
          </div>

          <!-- Success Message -->
          <div v-if="success" 
               class="mb-8 p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 flex items-center justify-center"
               role="alert"
               aria-live="polite">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p class="font-medium text-emerald-800 text-sm">Thank you for subscribing! Check your inbox soon.</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Name Input -->
              <div>
                <label for="name" class="block text-gray-700 font-medium mb-2 text-sm">
                  Your name
                </label>
                <div class="relative">
                  <input
                    id="name"
                    v-model="name"
                    type="text"
                    :disabled="loading"
                    placeholder="Your name"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    :class="{ 'border-red-300': errors.name }"
                    aria-invalid="errors.name ? 'true' : 'false'"
                    aria-describedby="name-error"
                  />
                </div>
                <div v-if="errors.name" id="name-error" class="text-red-600 text-xs mt-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ errors.name }}
                </div>
              </div>

              <!-- Email Input -->
              <div>
                <label for="email" class="block text-gray-700 font-medium mb-2 text-sm">
                  Your email
                </label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    :disabled="loading"
                    placeholder="Your e-mail"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    :class="{ 'border-red-300': errors.email }"
                    aria-invalid="errors.email ? 'true' : 'false'"
                    aria-describedby="email-error"
                  />
                </div>
                <div v-if="errors.email" id="email-error" class="text-red-600 text-xs mt-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ errors.email }}
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="loading"
                class="w-full md:w-auto px-8 py-3 bg-primary-blue hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center min-w-[140px]"
              >
                <span v-if="!loading" class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Sign up
                </span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              </button>
            </div>
          </form>

          <!-- Privacy Note -->
          <div class="mt-8 pt-6 border-t border-gray-100">
            <p class="text-gray-500 text-sm text-center">
              By signing up for our mailing list, you agree to our 
              <NuxtLink to="/privacy-policy" class="text-primary-blue hover:text-blue-700 font-medium transition-colors">
                privacy policy
              </NuxtLink>.
            </p>
          </div>

          <!-- Trust Indicators -->
          <div class="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <div class="flex items-center">
              <svg class="w-3 h-3 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span>Secure & private</span>
            </div>
            <div class="h-4 w-px bg-gray-300"></div>
            <div class="flex items-center">
              <svg class="w-3 h-3 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Unsubscribe anytime</span>
            </div>
            <div class="h-4 w-px bg-gray-300"></div>
            <div class="flex items-center">
              <svg class="w-3 h-3 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span>No spam, ever</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form data
const name = ref('')
const email = ref('')

// State
const loading = ref(false)
const success = ref(false)
const errors = reactive({
  name: '',
  email: ''
})

// Validation
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.name = ''
  errors.email = ''
  
  // Validate name
  if (!name.value.trim()) {
    errors.name = 'Please enter your name'
    isValid = false
  }
  
  // Validate email
  if (!email.value.trim()) {
    errors.email = 'Please enter your email address'
    isValid = false
  } else if (!email.value.includes('@')) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  return isValid
}

// Form submission handler
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Simulate successful subscription
  success.value = true
  
  // Clear form
  name.value = ''
  email.value = ''
  loading.value = false
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    success.value = false
  }, 5000)
}
</script>

<style scoped>
/* Custom color definitions - matching previous components */
.bg-primary-blue {
  background-color: #297BD4;
}

.text-primary-blue {
  color: #297BD4;
}

/* Smooth transitions matching previous components */
input, button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles */
input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Card styling to match testimonials */
.bg-white {
  background-color: #ffffff;
}

.border-gray-100 {
  border-color: #f3f4f6;
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.rounded-3xl {
  border-radius: 1.5rem;
}

/* Success message styling */
.from-emerald-50 {
  --tw-gradient-from: #ecfdf5;
}

.to-green-50 {
  --tw-gradient-to: #f0fdf4;
}

.border-emerald-200 {
  border-color: #a7f3d0;
}
</style>