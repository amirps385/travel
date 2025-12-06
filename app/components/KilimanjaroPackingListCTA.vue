<template>
  <section class="relative py-12 md:py-16 lg:py-20">
    <div class="container mx-auto px-4">
      <!-- Main Container - Better contrast -->
      <div class="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto border border-blue-800">
        
        <!-- Subtle alpine pattern -->
        <div class="absolute inset-0 opacity-5 overflow-hidden">

          <div class="absolute top-0 left-0 right-0 h-32">
            <!-- Mountain silhouettes -->
            <div class="absolute top-8 left-10 w-16 h-8 bg-white rounded-t-full"></div>
            <div class="absolute top-4 left-1/3 w-24 h-12 bg-white rounded-t-full"></div>
            <div class="absolute top-0 left-1/2 w-32 h-16 bg-white rounded-t-full"></div>
            <div class="absolute top-6 right-1/4 w-20 h-10 bg-white rounded-t-full"></div>
          </div>
        </div>
        
        <div class="flex flex-col lg:flex-row items-stretch relative z-10">
          
          <!-- Left: Illustration Section -->
          <div class="lg:w-2/5 p-6 md:p-8 lg:p-10 flex items-center justify-center">
            <div class="relative w-full max-w-sm mx-auto">
              <!-- Mountain Illustration Card -->
              <div class="relative h-64 md:h-72 lg:h-80 rounded-2xl bg-linear-to-b from-slate-800 to-blue-900 border-2 border-blue-700/50 overflow-hidden shadow-2xl">
                
                <!-- Sky gradient -->
                <div class="absolute inset-0 bg-linear-to-b from-blue-400/10 via-blue-300/5 to-transparent"></div>
                
                <!-- Kilimanjaro Peak -->
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div class="relative">
                    <!-- Mountain -->
                    <div class="w-56 h-36 bg-linear-to-t from-slate-700 via-slate-600 to-slate-700 rounded-t-xl"></div>
                    <!-- Snow cap -->
                    <div class="absolute -top-6 left-2 w-52 h-16 bg-linear-to-b from-white to-blue-100 rounded-t-xl shadow-md"></div>
                    <!-- Summit -->
                    <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg"></div>
                  </div>
                </div>
                
                <!-- Route markers -->
                <div class="absolute bottom-12 left-6 right-6">
                  <div class="relative">
                    <!-- Base line -->
                    <div class="h-1 bg-linear-to-r from-emerald-400/50 via-emerald-400 to-emerald-400/50"></div>
                    <!-- Markers -->
                    <div class="absolute top-1/2 transform -translate-y-1/2 left-1/4 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                    <div class="absolute top-1/2 transform -translate-y-1/2 left-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                    <div class="absolute top-1/2 transform -translate-y-1/2 left-3/4 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                  </div>
                </div>
                
                <!-- Climber -->
                <div class="absolute bottom-20 right-12 transform rotate-12">
                  <div class="relative">
                    <!-- Trekking pole -->
                    <div class="absolute -bottom-4 -right-1 w-1 h-12 bg-slate-300 transform rotate-45"></div>
                    <!-- Body -->
                    <div class="w-5 h-10 bg-linear-to-b from-slate-100 to-slate-200 rounded"></div>
                    <!-- Backpack -->
                    <div class="absolute -top-1 -right-2 w-8 h-5 bg-linear-to-b from-emerald-500 to-emerald-600 rounded"></div>
                    <!-- Head -->
                    <div class="absolute -top-8 left-0 w-5 h-5 bg-slate-100 rounded-full border-2 border-slate-200"></div>
                  </div>
                </div>
                
                <!-- Sun -->
                <div class="absolute top-4 right-6">
                  <div class="w-16 h-16 bg-linear-to-br from-yellow-300 to-orange-300 rounded-full shadow-lg"></div>
                  <div class="absolute inset-4 bg-linear-to-br from-yellow-100 to-orange-100 rounded-full"></div>
                </div>
                
                <!-- Badge -->
                <div class="absolute top-6 left-6">
                  <div class="bg-linear-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white/20">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                      </svg>
                      <span>KILIMANJARO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Content Section - Improved contrast -->
          <div class="lg:w-3/5 p-6 md:p-8 lg:p-10">
            <div class="h-full flex flex-col justify-center">
              
              <!-- Title - Now visible -->
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
                Get PDF Kilimanjaro Packing List
              </h2>
              
              <!-- Description - Better contrast -->
              <p class="text-slate-200 text-base md:text-lg lg:text-xl mb-6 lg:mb-8 leading-relaxed">
                Free Kilimanjaro packing list with all essential gear for your climb, plus practical tips from local mountain guides.
              </p>
              
              <!-- CTA Button - Standout color -->
              <div class="mb-8 lg:mb-10">
                <a 
                  :href="pdfLink"
                  download
                  class="group inline-flex items-center justify-center bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 md:px-10 py-3 md:py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 text-base md:text-lg w-full sm:w-auto"
                >
                  <svg class="w-5 h-5 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>GET PDF</span>
                  <svg class="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </a>
                
                <!-- Trust indicator -->
                <p class="mt-3 text-sm text-slate-300 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Instant download • Expert-curated • No sign-up required
                </p>
              </div>
              
              <!-- Key Features - Better visibility -->
              <div class="space-y-3 mb-6 lg:mb-8">
                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-slate-100 font-medium">Full gear list for all seasons</span>
                </div>
                
                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-slate-100 font-medium">Clothing, boots, and layering system</span>
                </div>
                
                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <span class="text-slate-100 font-medium">Printable checklist you can take on the mountain</span>
                </div>
              </div>
              
              <!-- Footer note - Improved contrast -->
              <div class="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-blue-800/60">
                <p class="text-sm text-slate-300">
                  <span class="font-medium text-slate-100">Covers all major Kilimanjaro routes:</span>
                  <span class="ml-2 text-emerald-300">Lemosho, Machame, Marangu, Rongai, Northern Circuit and more.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bottom accent -->
        <div class="h-1.5 bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-400"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component configuration
const pdfLink = '/downloads/kilimanjaro-packing-list.pdf'
</script>

<style scoped>
/* Better text visibility and contrast */
.text-slate-100 {
  color: #f1f5f9;
}

.text-slate-200 {
  color: #e2e8f0;
}

.text-slate-300 {
  color: #cbd5e1;
}

.bg-slate-900 {
  background-color: #0f172a;
}

.from-slate-900 {
  --tw-gradient-from: #0f172a;
}

.via-blue-900 {
  --tw-gradient-via: #1e3a8a;
}

.to-slate-900 {
  --tw-gradient-to: #0f172a;
}

/* Enhanced button visibility */
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

/* Stronger shadow for depth */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}
</style>