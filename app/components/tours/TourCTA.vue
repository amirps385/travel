<template>
  <section class="relative py-12 md:py-16 overflow-hidden rounded-2xl">
    <!-- Safari Background -->
    <div class="absolute inset-0">
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-30"
        :style="{ backgroundImage: `url('/images/background/safari-cta.jpg')` }"
      ></div>
      <div class="absolute inset-0 bg-linear-to-br from-emerald-900/80 via-emerald-800/60 to-amber-900/70"></div>
      
      <!-- Pattern Overlay -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/4 left-1/4 w-64 h-64">
          <div class="w-12 h-6 bg-amber-300/30 rounded-full absolute top-8 left-8"></div>
          <div class="w-8 h-4 bg-amber-400/30 rounded-full absolute top-12 right-12"></div>
          <div class="w-16 h-8 bg-emerald-300/30 rounded-full absolute bottom-8 left-12"></div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <!-- Badge -->
      <div class="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-amber-200 font-bold mb-8 border border-amber-300/30">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.414L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
        LIMITED SPOTS AVAILABLE
      </div>

      <!-- Heading -->
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
        Ready for Your
        <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-amber-200 block">
          Tanzania Adventure?
        </span>
      </h2>

      <!-- Description -->
      <p class="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
        Contact our local experts for personalized advice, custom itineraries, 
        and the best Tanzania experience.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <NuxtLink 
          to="/contact" 
          class="group inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-amber-400/30 hover:border-amber-300/40"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          Enquire Now
          <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </NuxtLink>

        <a 
          href="https://wa.me/255620285462?text=Hi%20ZafsTours,%20I%20want%20to%20plan%20a%20Tanzania%20tour."
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          <span class="mr-3">💬</span>
          Chat on WhatsApp
          <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </a>
      </div>

      <!-- Trust Indicators -->
      <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-emerald-200">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Best Price Guarantee
        </div>
        <div class="h-4 w-px bg-emerald-300/30"></div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.414L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
          24/7 Support
        </div>
        <div class="h-4 w-px bg-emerald-300/30"></div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clip-rule="evenodd"/>
          </svg>
          Flexible Booking
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-6 left-6 w-24 h-24 bg-amber-300/10 rounded-full blur-xl"></div>
    <div class="absolute bottom-6 right-6 w-32 h-32 bg-emerald-300/10 rounded-full blur-xl"></div>
  </section>
</template>

<script setup>
// Premium CTA component with safari styling
</script>

<style scoped>
/* Glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Smooth transitions */
a, button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>