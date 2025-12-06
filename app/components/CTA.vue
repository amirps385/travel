<!-- components/CTA.vue -->
<template>
  <section class="py-16 lg:py-24 bg-linear-to-b from-emerald-50 to-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <!-- Badge -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/>
          </svg>
          Start Your Adventure
        </div>
      </div>

      <!-- Main Heading -->
      <div class="text-center mb-8 lg:mb-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Ready to Plan Your
          <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-emerald-600">Tanzania Adventure?</span>
        </h2>
        
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Tell us what you want to experience and our local team will craft a custom safari, Kilimanjaro trek, or Zanzibar holiday tailored just for you. Quick response within 24 hours.
        </p>
      </div>

      <!-- Trust Indicators -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 lg:mb-12 max-w-2xl mx-auto">
        <div class="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div class="text-2xl font-bold text-emerald-600 mb-1">24h</div>
          <div class="text-sm font-medium text-gray-700">Response Time</div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div class="text-2xl font-bold text-emerald-600 mb-1">100%</div>
          <div class="text-sm font-medium text-gray-700">Free Quote</div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div class="text-2xl font-bold text-emerald-600 mb-1">Expert</div>
          <div class="text-sm font-medium text-gray-700">Local Guides</div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10 lg:mb-12">
        <!-- Primary Button -->
        <NuxtLink 
          to="/journey" 
          class="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          Plan My Trip
        </NuxtLink>

        <!-- Secondary Button -->
        <a 
          href="https://wa.me/255620285462?text=Hi%20ZafsTours,%20I%20want%20to%20plan%20a%20Tanzania%20trip."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
        >
          <span class="mr-2">💬</span>
          Chat on WhatsApp
        </a>
      </div>

      <!-- Additional Trust Indicators -->
      <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span>Licensed & Insured Operator</span>
        </div>
        
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span>4.9/5 TripAdvisor Rating</span>
        </div>
        
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span>Best Price Guarantee</span>
        </div>
      </div>

      <!-- Optional Small Text -->
      <p class="text-center text-sm text-gray-500 mt-8">
        No booking fees • Flexible cancellation • Tailor-made itineraries
      </p>
    </div>
  </section>
</template>

<script setup>
// This is a simple static component, no logic needed
</script>