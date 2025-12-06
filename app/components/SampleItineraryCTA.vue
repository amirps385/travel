<template>
  <section class="relative py-20 md:py-24 lg:py-28 overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-linear-to-br from-white via-blue-50/10 to-slate-50/30"></div>
    
    <!-- Decorative elements -->
    <div class="absolute top-20 right-10 w-80 h-80 bg-blue-100/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-10 w-80 h-80 bg-emerald-100/10 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <!-- Left: Content -->
          <div class="lg:w-3/5">
            <div class="max-w-2xl">
              <!-- Badge -->
              <div class="inline-flex items-center mb-6">
                <div class="w-16 h-1 bg-linear-to-rrom-transparent via-primary-blue to-transparent rounded-full"></div>
                <span class="mx-4 text-primary-blue font-semibold tracking-wider text-sm uppercase">Itinerary Sample</span>
                <div class="w-16 h-1 bg-linear-to-rrom-transparent via-primary-blue to-transparent rounded-full"></div>
              </div>
              
              <!-- Heading -->
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Kilimanjaro Itinerary
              </h1>
              
              <!-- Description -->
              <div class="space-y-4 text-gray-600 text-lg md:text-xl leading-relaxed">
                <p>
                  Planning to climb Kilimanjaro? Explore our beginner-friendly 7–8 day Lemosho itinerary, which includes enough time for acclimatization and the best summit chances.
                </p>
                <p>
                  After the climb, unwind with a short safari or beach stay in Zanzibar.
                </p>
              </div>

              <!-- Features List -->
              <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">95% Summit Success Rate</span>
                </div>
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">Certified Mountain Guides</span>
                </div>
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">All Meals & Accommodation</span>
                </div>
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-gray-700 font-medium">Safety Equipment Provided</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Sample Itinerary Card - IMPROVED VISIBILITY -->
          <div class="lg:w-2/5 w-full">
            <div class="relative">
              <!-- Main Card with better contrast -->
              <div class="bg-linear-to-br from-slate-800 via-blue-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">
                <!-- Top right illustration -->
                <div class="absolute top-0 right-0 w-48 h-48 overflow-hidden">
                  <div class="relative w-full h-full">
                    <!-- Lighter overlay for better contrast -->
                    <div class="absolute inset-0 bg-linear-to-br from-blue-600/30 to-blue-800/30"></div>
                    
                    <!-- Mountain peaks with better visibility -->
                    <div class="absolute bottom-0 left-4 right-4 h-16">
                      <!-- Kilimanjaro peak -->
                      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                        <div class="relative">
                          <div class="w-24 h-16 bg-linear-to-t from-slate-100 via-slate-50 to-white rounded-t-xl shadow-md"></div>
                          <div class="absolute -top-2 left-0 w-24 h-8 bg-white rounded-t-xl shadow-sm"></div>
                          <!-- Summit flag -->
                          <div class="absolute -top-6 left-10">
                            <div class="w-4 h-4 bg-red-500 shadow-md"></div>
                            <div class="w-0.5 h-6 bg-red-500 ml-1.5 shadow-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Route line - brighter for visibility -->
                    <div class="absolute bottom-8 left-10 right-10">
                      <div class="relative h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent shadow-sm"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Card Content - Improved text contrast -->
                <div class="p-8 md:p-10 relative z-10">
                  <!-- Badge -->
                  <div class="inline-flex mb-6">
                    <span class="bg-red-500 text-white font-bold px-4 py-2 rounded-full text-sm tracking-wide shadow-md">
                      ITINERARY
                    </span>
                  </div>
                  
                  <!-- Main Heading - Brighter white -->
                  <h3 class="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight drop-shadow-sm">
                    Check this sample Kilimanjaro itinerary
                  </h3>
                  
                  <!-- Subheadings with better icons -->
                  <div class="space-y-4 mb-8">
                    <div class="flex items-center bg-white/5 p-3 rounded-xl">
                      <svg class="w-6 h-6 text-emerald-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                      <span class="text-white font-semibold text-lg">Lemosho Route 7-day program</span>
                    </div>
                    <div class="flex items-center bg-white/5 p-3 rounded-xl">
                      <svg class="w-6 h-6 text-emerald-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                      <span class="text-white font-semibold text-lg">Beginner-friendly</span>
                    </div>
                  </div>
                  
                  <!-- Stats with better contrast -->
                  <div class="grid grid-cols-2 gap-4 mb-8">
                    <div class="bg-linear-to-br from-slate-700 to-slate-800 rounded-xl p-4 text-center border border-slate-600">
                      <div class="text-slate-300 text-sm mb-1 font-medium">Duration</div>
                      <div class="text-2xl font-bold text-white">7 Days</div>
                    </div>
                    <div class="bg-linear-to-br from-slate-700 to-slate-800 rounded-xl p-4 text-center border border-slate-600">
                      <div class="text-slate-300 text-sm mb-1 font-medium">Difficulty</div>
                      <div class="text-2xl font-bold text-emerald-400">Moderate</div>
                    </div>
                  </div>
                  
                  <!-- CTA Button - More prominent -->
                  <a 
                    :href="pdfLink"
                    download
                    class="group w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center text-lg border-2 border-emerald-400/30"
                  >
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>View Sample Itinerary</span>
                    <svg class="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </a>
                  
                  <!-- Trust note - Brighter color -->
                  <p class="mt-4 text-center text-slate-300 text-sm">
                    <svg class="w-4 h-4 inline mr-1 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    No email required • Instant download
                  </p>
                </div>
                
                <!-- Bottom accent border -->
                <div class="h-1.5 bg-linear-to-r from-emerald-500 via-emerald-400 to-emerald-500"></div>
              </div>
              
              <!-- Floating elements -->
              <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-700/20 rounded-full blur-xl"></div>
              <div class="absolute -top-4 -left-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const pdfLink = '/downloads/lemosho-sample-itinerary.pdf'
</script>

<style scoped>
/* Custom color definitions with better contrast */
.bg-primary-blue {
  background-color: #297BD4;
}

.text-primary-blue {
  color: #297BD4;
}

/* Improved gradient for better contrast */
.from-slate-800 {
  --tw-gradient-from: #1e293b;
}

.via-blue-900 {
  --tw-gradient-via: #1e3a8a;
}

.to-slate-900 {
  --tw-gradient-to: #0f172a;
}

/* Button gradients */
.from-emerald-500 {
  --tw-gradient-from: #10b981;
}

.to-emerald-600 {
  --tw-gradient-to: #059669;
}

.hover\:from-emerald-600:hover {
  --tw-gradient-from: #059669;
}

.hover\:to-emerald-700:hover {
  --tw-gradient-to: #047857;
}

/* Enhanced shadows for depth */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

/* Text shadow for better readability on dark backgrounds */
.drop-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Smooth transitions */
a, button, .bg-gradient-to-br {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Card hover effect */
.bg-gradient-to-br:hover {
  transform: translateY(-2px);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);
}

/* Improve white text visibility */
.text-white {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}

.text-slate-300 {
  color: #cbd5e1;
}

/* Mountain illustration improvements */
.bg-gradient-to-t.from-slate-100 {
  background-image: linear-gradient(to top, #f1f5f9, var(--tw-gradient-stops));
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg\:w-3\/5,
  .lg\:w-2\/5 {
    width: 100%;
  }
  
  .bg-gradient-to-br {
    margin-top: 2rem;
  }
}

/* Ensure good contrast for all text elements */
.bg-white\/5 {
  background-color: rgba(255, 255, 255, 0.05);
}

.border-slate-700\/50 {
  border-color: rgba(51, 65, 85, 0.5);
}
</style>