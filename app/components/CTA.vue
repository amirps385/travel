<!-- components/CTA.vue -->
<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <!-- Safari-themed background matching your other components -->
    <div class="absolute inset-0 bg-gray-900">
      <!-- Safari background image -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('/images/background/safari7.png')` }"
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

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
      <!-- Badge with safari styling -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center px-5 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold shadow-lg">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/>
          </svg>
          Start Your Adventure
        </div>
      </div>

      <!-- Main Heading with safari styling -->
      <div class="text-center mb-10 lg:mb-12">
        <h2 class="heading-safe text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ready to Plan Your
          <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-300 block mt-2">Tanzania Adventure?</span>
        </h2>
        
        <p class="body-safe text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Tell us what you want to experience and our local team will craft a custom safari, Kilimanjaro trek, or Zanzibar holiday tailored just for you. Quick response within 24 hours.
        </p>
      </div>

      <!-- Trust Indicators with glass effect -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 lg:mb-16 max-w-2xl mx-auto">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-3xl font-bold text-amber-300 mb-2">24h</div>
          <div class="text-gray-300 font-medium">Response Time</div>
          <div class="text-gray-400 text-sm mt-1">Guaranteed</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-3xl font-bold text-emerald-300 mb-2">100%</div>
          <div class="text-gray-300 font-medium">Free Quote</div>
          <div class="text-gray-400 text-sm mt-1">No hidden fees</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-3xl font-bold text-amber-300 mb-2">Expert</div>
          <div class="text-gray-300 font-medium">Local Guides</div>
          <div class="text-gray-400 text-sm mt-1">10+ years experience</div>
        </div>
      </div>

      <!-- CTA Buttons with safari styling -->
      <div class="flex flex-col sm:flex-row gap-6 justify-center mb-12 lg:mb-16">
        <!-- Primary Button -->
        <NuxtLink 
          to="/journey" 
          class="group inline-flex items-center justify-center px-10 py-5 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-amber-400/30 hover:border-amber-300/40 text-lg"
        >
          <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          <span>Plan My Trip</span>
          <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </NuxtLink>

        <!-- Secondary Button -->
        <a 
          href="https://wa.me/255620285462?text=Hi%20ZafsTours,%20I%20want%20to%20plan%20a%20Tanzania%20trip."
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg"
        >
          <span class="mr-3">💬</span>
          <span>Chat on WhatsApp</span>
          <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </a>
      </div>

      <!-- Additional Trust Indicators with safari styling -->
      <div class="flex flex-wrap items-center justify-center gap-8 text-base text-gray-300 mb-8">
        <div class="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/10 hover:border-amber-500/30 transition-colors">
          <svg class="w-5 h-5 mr-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium">Licensed & Insured Operator</span>
        </div>
        
        <div class="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/10 hover:border-amber-500/30 transition-colors">
          <svg class="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="font-medium">4.9/5 TripAdvisor Rating</span>
        </div>
        
        <div class="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/10 hover:border-amber-500/30 transition-colors">
          <svg class="w-5 h-5 mr-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium">Best Price Guarantee</span>
        </div>
      </div>

      <!-- Optional Small Text -->
      <div class="text-center">
        <div class="inline-flex flex-wrap items-center justify-center gap-6 bg-white/5 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10">
          <span class="text-gray-300 font-medium flex items-center">
            <svg class="w-4 h-4 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            No booking fees
          </span>
          <div class="w-1 h-1 bg-gray-500 rounded-full"></div>
          <span class="text-gray-300 font-medium flex items-center">
            <svg class="w-4 h-4 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            Flexible cancellation
          </span>
          <div class="w-1 h-1 bg-gray-500 rounded-full"></div>
          <span class="text-gray-300 font-medium flex items-center">
            <svg class="w-4 h-4 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            Tailor-made itineraries
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// This is a simple static component, no logic needed
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
</style>