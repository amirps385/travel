<!-- components/CTA.vue -->
<template>
  <!-- Section with eye-catching gradient -->
  <section class="relative py-24 overflow-hidden">
    <!-- Background Gradient -->
    <div class="absolute inset-0">
      <!-- Main gradient -->
      <div class="absolute inset-0 bg-linear-to-br from-primary-600 via-secondary-600 to-ocean-600"></div>
      
      <!-- Animated gradient overlay -->
      <div class="absolute inset-0 bg-gradient-x animate-gradient-x opacity-30"></div>
      
      <!-- Floating elements -->
      <div class="absolute top-1/4 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      
      <!-- SIMPLIFIED Pattern overlay - removed the complex SVG -->
      <div class="absolute inset-0 opacity-10 bg-dot-pattern"></div>
    </div>

    <!-- Content -->
    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Top Badge -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
            <svg class="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/>
            </svg>
            <span class="text-white font-semibold">Limited Time Offer</span>
          </div>
        </div>

        <!-- Main Heading -->
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready for Your
            <span class="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-amber-300">
              African
            </span>
            Adventure?
          </h2>
          
          <p class="text-xl text-white/90 max-w-3xl mx-auto">
            Get a <span class="font-bold text-yellow-300">free personalized itinerary</span> crafted by our expert travel planners. 
            No obligations, just professional advice tailored to your dreams.
          </p>
        </div>

        <!-- Stats Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div class="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="text-2xl font-bold text-white">24h</div>
            <div class="text-sm text-white/80">Response Time</div>
          </div>
          <div class="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="text-2xl font-bold text-white">100%</div>
            <div class="text-sm text-white/80">Free Quote</div>
          </div>
          <div class="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="text-2xl font-bold text-white">No</div>
            <div class="text-sm text-white/80">Booking Fees</div>
          </div>
          <div class="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="text-2xl font-bold text-white">Flexible</div>
            <div class="text-sm text-white/80">Dates & Plans</div>
          </div>
        </div>

        <!-- CTA Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <!-- Card 1: Quick Inquiry -->
          <div class="bg-white rounded-3xl p-8 shadow-2xl">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-xl bg-linear-to-r from-primary-500 to-primary-600 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Quick Inquiry</h3>
                <p class="text-sm text-gray-600">Get instant itinerary ideas</p>
              </div>
            </div>
            
            <form @submit.prevent="submitQuickInquiry" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <input v-model="quickForm.name" 
                       type="text" 
                       placeholder="Your Name" 
                       required
                       class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <input v-model="quickForm.email" 
                       type="email" 
                       placeholder="Email Address" 
                       required
                       class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              </div>
              
              <button type="submit" 
                      class="w-full py-4 bg-linear-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary-200 transition-all duration-300">
                <span v-if="!quickLoading" class="flex items-center justify-center">
                  Get Free Itinerary Ideas
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Processing...
                </span>
              </button>
            </form>
            
            <div class="mt-6 text-center text-sm text-gray-500">
              <div class="flex items-center justify-center">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                No spam. Privacy guaranteed.
              </div>
            </div>
          </div>

          <!-- Card 2: Contact Options -->
          <div class="bg-white rounded-3xl p-8 shadow-2xl">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-xl bg-linear-to-r from-secondary-500 to-secondary-600 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Speak Directly</h3>
                <p class="text-sm text-gray-600">Talk to our safari experts</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <!-- Phone Option -->
              <a href="tel:+255123456789" 
                 class="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-gray-900">Call Us Now</div>
                  <div class="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    +255 123 456 789
                  </div>
                  <div class="text-sm text-gray-500">Available 24/7</div>
                </div>
                <div class="text-primary-600 transform group-hover:translate-x-1 transition-transform">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </div>
              </a>
              
              <!-- WhatsApp Option -->
              <a href="https://wa.me/255123456789" 
                 target="_blank"
                 class="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <span class="text-green-600 font-bold">W</span>
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-gray-900">WhatsApp Chat</div>
                  <div class="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    Message on WhatsApp
                  </div>
                  <div class="text-sm text-gray-500">Instant response</div>
                </div>
                <div class="text-green-600 transform group-hover:translate-x-1 transition-transform">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </div>
              </a>
              
              <!-- Email Option -->
              <a href="mailto:info@zafstours.com" 
                 class="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-gray-900">Send Email</div>
                  <div class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    info@zafstours.com
                  </div>
                  <div class="text-sm text-gray-500">Response within 2 hours</div>
                </div>
                <div class="text-blue-600 transform group-hover:translate-x-1 transition-transform">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div class="text-center">
          <div class="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span>Licensed & Insured</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span>4.9/5 TripAdvisor</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Quick inquiry form
const quickForm = ref({
  name: '',
  email: ''
})

const quickLoading = ref(false)

const submitQuickInquiry = async () => {
  if (!quickForm.value.name || !quickForm.value.email) {
    alert('Please fill in all fields')
    return
  }
  
  quickLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  alert(`Thank you ${quickForm.value.name}! We'll email your free itinerary ideas within 24 hours.`)
  quickLoading.value = false
  quickForm.value = { name: '', email: '' }
}
</script>

<style scoped>
/* Dot pattern background */
.bg-dot-pattern {
  background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Gradient animation */
@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.bg-gradient-x {
  background: linear-gradient(90deg, 
    rgba(255,255,255,0.1) 0%, 
    rgba(255,255,255,0.3) 50%, 
    rgba(255,255,255,0.1) 100%);
  background-size: 200% 200%;
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>