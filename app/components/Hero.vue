<!-- components/Hero.vue -->
<template>
  <section class="relative min-h-[90vh] flex items-center overflow-hidden">
    <!-- Background with gradient and floating elements -->
    <div class="absolute inset-0">
      <!-- Main gradient background -->
      <div class="absolute inset-0 bg-linear-to-br from-primary-50 via-ocean-50 to-adventure-50"></div>
      
      <!-- Floating shapes for visual interest -->
      <div class="absolute top-1/4 left-10 w-72 h-72 bg-linear-to-r from-primary-200 to-ocean-200 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-float"></div>
      <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-linear-to-l from-secondary-200 to-adventure-200 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-float animation-delay-2000"></div>
      <div class="absolute top-1/3 right-1/3 w-64 h-64 bg-linear-to-tr from-ocean-300 to-primary-300 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-float animation-delay-4000"></div>
    </div>
    
    <!-- Content -->
    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column: Text Content -->
        <div class="max-w-2xl">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-linear-to-r from-primary-500 to-ocean-500 rounded-full text-white text-sm font-semibold mb-6 shadow-lg">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
            </svg>
            ✨ Premium Safari Experiences Since 2008
          </div>
          
          <!-- Main Heading -->
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-ocean-600">
              Tanzania's
            </span>
            Wild Beauty
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Embark on unforgettable adventures in Africa's most spectacular destinations. 
            Expert guides, luxury accommodations, and memories that last a lifetime.
          </p>
          
          <!-- Stats Row -->
          <div class="flex flex-wrap gap-6 mb-10">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-linear-to-r from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mr-3">
                <span class="text-2xl font-bold text-primary-700">500+</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Successful Summits</div>
                <div class="text-sm text-gray-600">Kilimanjaro</div>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-12 h-12 bg-linear-to-r from-secondary-100 to-secondary-50 rounded-xl flex items-center justify-center mr-3">
                <span class="text-2xl font-bold text-secondary-700">98%</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Satisfaction Rate</div>
                <div class="text-sm text-gray-600">Guest Reviews</div>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-12 h-12 bg-linear-to-r from-ocean-100 to-ocean-50 rounded-xl flex items-center justify-center mr-3">
                <span class="text-2xl font-bold text-ocean-700">15+</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Years Experience</div>
                <div class="text-sm text-gray-600">Since 2008</div>
              </div>
            </div>
          </div>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <button @click="scrollToTours" class="px-8 py-4 bg-linear-to-r from-primary-600 to-ocean-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary-200 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center">
              <span>Explore Tours</span>
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            
            <button class="px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
              Watch Our Story
            </button>
          </div>
          
          <!-- Trust Indicators -->
          <div class="flex items-center text-sm text-gray-600">
            <div class="flex items-center mr-6">
              <div class="flex mr-2">
                <span class="text-yellow-400">★</span>
                <span class="text-yellow-400">★</span>
                <span class="text-yellow-400">★</span>
                <span class="text-yellow-400">★</span>
                <span class="text-yellow-400">★</span>
              </div>
              <span class="font-semibold">4.9/5</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Licensed & Insured Operator</span>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Lead Form -->
        <div class="relative">
          <!-- Floating card effect -->
          <div class="relative bg-white rounded-2xl shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
            <!-- Card header with gradient -->
            <div class="bg-linear-to-r from-primary-600 to-ocean-600 p-6">
              <h3 class="text-2xl font-bold text-white text-center">Plan Your Dream Safari</h3>
              <p class="text-primary-100 text-center mt-2">Get a free custom itinerary</p>
            </div>
            
            <!-- Form slot -->
            <div class="p-6">
              <slot name="leadForm"></slot>
            </div>
            
            <!-- Card footer -->
            <div class="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t">
              <div class="flex items-center justify-center">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                No spam. Unsubscribe anytime.
              </div>
            </div>
          </div>
          
          <!-- Floating testimonials -->
          <div class="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs rotate-3">
            <div class="flex items-center mb-2">
              <div class="flex">
                <span class="text-yellow-400">★</span>
                <span class="text-yellow-400">★</span>
                <span class="text-yellow-400">★</span>
                <span class="text-yellow-400">★</span>
                <span class="text-yellow-400">★</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 italic">"Best safari experience ever! The guides were incredible."</p>
            <div class="flex items-center mt-2">
              <div class="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div>
                <div class="text-sm font-semibold">Sarah M.</div>
                <div class="text-xs text-gray-500">From USA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
      <div class="animate-bounce">
        <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
const scrollToTours = () => {
  const toursSection = document.querySelector('#tours')
  if (toursSection) {
    toursSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Animation delay utilities for Tailwind v4 */
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom scroll behavior */
:root {
  scroll-behavior: smooth;
}
</style>