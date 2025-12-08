<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <!-- Safari-themed background matching your other components -->
    <div class="absolute inset-0 bg-gray-900">
      <!-- Safari background image -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('/images/background/mountains.png')` }"
      ></div>
      
      <!-- Soft gradient overlay -->
      <div class="absolute inset-0 bg-linear-to-br from-gray-900/50 via-gray-800/40 to-amber-900/30"></div>

      <!-- Soft dark fade for text readability -->
      <div class="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/70 via-black/50 to-transparent"></div>
      
      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
    </div>

    <!-- Subtle background elements -->
    <div class="absolute top-10 left-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
      <!-- Main Card with safari glass morphism -->
      <div class="bg-black/30 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 border border-white/20">

        
        <!-- Header -->
        <div class="text-center mb-10">
          <!-- Safari-themed badge -->
          <div class="inline-flex items-center px-5 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 rounded-full text-white font-bold mb-6 shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Safari Newsletter
          </div>
          
          <h2 class="heading-safe text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Sign up for our newsletter
          </h2>
          
          <p class="body-safe text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Receive exclusive travel ideas, destination guides, safari tips, and inspiring stories directly in your inbox.
          </p>
        </div>

        <!-- Success Message with safari styling -->
        <div v-if="success" 
             class="mb-8 p-6 bg-linear-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm rounded-xl border border-emerald-500/30 flex items-center justify-center"
             role="alert"
             aria-live="polite">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4 border border-emerald-500/30">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p class="font-bold text-white text-lg">Welcome to the adventure!</p>
              <p class="text-emerald-200 text-sm mt-1">Check your inbox for safari inspiration.</p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name Input -->
            <div>
              <label for="name" class="block text-gray-300 font-semibold mb-3 text-sm">
                Your name
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  :disabled="loading"
                  placeholder="Your name"
                  class="w-full pl-10 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all duration-200 placeholder-gray-500 disabled:bg-white/10 disabled:cursor-not-allowed text-white"
                  :class="{ 'border-red-400/50': errors.name }"
                  aria-invalid="errors.name ? 'true' : 'false'"
                  aria-describedby="name-error"
                />
              </div>
              <div v-if="errors.name" id="name-error" class="text-red-400 text-sm mt-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ errors.name }}
              </div>
            </div>

            <!-- Email Input -->
            <div>
              <label for="email" class="block text-gray-300 font-semibold mb-3 text-sm">
                Your email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  :disabled="loading"
                  placeholder="Your e-mail"
                  class="w-full pl-10 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all duration-200 placeholder-gray-500 disabled:bg-white/10 disabled:cursor-not-allowed text-white"
                  :class="{ 'border-red-400/50': errors.email }"
                  aria-invalid="errors.email ? 'true' : 'false'"
                  aria-describedby="email-error"
                />
              </div>
              <div v-if="errors.email" id="email-error" class="text-red-400 text-sm mt-2 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ errors.email }}
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="group w-full px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center border border-amber-400/30 hover:border-amber-300/40 text-lg"
            >
              <span v-if="!loading" class="flex items-center">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Sign up now
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing Up...
              </span>
            </button>
          </div>
        </form>

        <!-- Privacy Note -->
        <div class="mt-10 pt-8 border-t border-white/20">
          <p class="text-gray-400 text-sm text-center">
            By signing up for our mailing list, you agree to our 
            <NuxtLink to="/privacy-policy" class="text-amber-300 hover:text-amber-400 font-semibold transition-colors">
              privacy policy
            </NuxtLink>. We respect your privacy.
          </p>
        </div>

        <!-- Trust Indicators -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div class="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/10">
            <svg class="w-4 h-4 text-emerald-400 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <span class="text-gray-300 font-medium">Secure & private</span>
          </div>
          
          <div class="h-6 w-px bg-white/20"></div>
          
          <div class="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/10">
            <svg class="w-4 h-4 text-amber-400 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-gray-300 font-medium">Unsubscribe anytime</span>
          </div>
          
          <div class="h-6 w-px bg-white/20"></div>
          
          <div class="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/10">
            <svg class="w-4 h-4 text-emerald-400 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            <span class="text-gray-300 font-medium">No spam, ever</span>
          </div>
        </div>

        <!-- What to Expect -->
        <div class="mt-10 pt-6 border-t border-white/10">
          <h3 class="text-center text-white font-bold text-lg mb-4">What You'll Receive:</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-amber-500 mr-3 animate-pulse"></div>
              <span class="text-gray-300 text-sm">Safari planning tips & seasonal guides</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-emerald-500 mr-3 animate-pulse"></div>
              <span class="text-gray-300 text-sm">Kilimanjaro climbing insights</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-blue-500 mr-3 animate-pulse"></div>
              <span class="text-gray-300 text-sm">Zanzibar beach & culture highlights</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-amber-500 mr-3 animate-pulse"></div>
              <span class="text-gray-300 text-sm">Exclusive offers & early access</span>
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
/* Background image styling */
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

/* Glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Text readability */
.heading-safe {
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.85);
}

.body-safe {
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.75);
}

/* Safari color gradients */
.bg-linear-to-r.from-amber-500.to-amber-600 {
  background-image: linear-gradient(to right, #f59e0b, #d97706);
}

.hover\:from-amber-600:hover {
  --tw-gradient-from: #d97706;
}

.hover\:to-amber-700:hover {
  --tw-gradient-to: #b45309;
}

/* Enhanced shadows for depth */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Input focus styles */
input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Custom focus ring colors */
.focus\:ring-amber-500\/30:focus {
  --tw-ring-color: rgba(245, 158, 11, 0.3);
}

.focus\:border-amber-500\/50:focus {
  border-color: rgba(245, 158, 11, 0.5);
}

/* Success message gradient */
.bg-linear-to-r.from-emerald-500\/10.to-emerald-600\/10 {
  background-image: linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
}

/* Ensure proper z-index stacking */
.relative.z-10 {
  position: relative;
  z-index: 10;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .bg-cover {
    background-position: 70% center;
  }
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Pulsing animation for list items */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>