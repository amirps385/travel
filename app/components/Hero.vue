<!-- components/Hero.vue -->
<template>
  <section class="relative py-12 md:py-20 lg:py-28 overflow-hidden">
    <!-- Background with image placeholder -->
    <div class="absolute inset-0">
      <!-- Background image placeholder - Safari landscape -->
      <div class="absolute inset-0 bg-linear-to-br from-amber-50 via-emerald-50 to-sky-50"></div>
      
      <!-- Simple pattern overlay using Tailwind -->
      <div class="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,#9C92AC_1px,transparent_0)] bg-size-[40px_40px]"></div>
      
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-linear-to-b from-white/60 via-white/40 to-white/20"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-10 right-10 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
    </div>

    <!-- Content container -->
    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Left Column: Hero Text -->
        <div class="space-y-6 lg:space-y-8">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 rounded-full text-white text-sm font-semibold shadow-lg">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            <span>Trusted Local Operator Since 2012</span>
          </div>

          <!-- Main Headline -->
          <header>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <span class="block">Tailor-Made</span>
              <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-emerald-600">
                Tanzania Safaris & Kilimanjaro Treks
              </span>
            </h1>
          </header>

          <!-- Subheadline -->
          <p class="text-lg md:text-xl text-gray-600 leading-relaxed">
            Custom itineraries designed by local experts in Tanzania. Experience the wild beauty of Africa with personalized adventures that match your dreams.
          </p>

          <!-- Key Selling Points -->
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-700">Private & group safaris across Tanzania's best national parks</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-700">Expert local guides & safe, well-maintained vehicles</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-700">Flexible itineraries for couples, families, and small groups</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-700">Zanzibar beach holidays & cultural experiences included</span>
            </li>
          </ul>

          <!-- Trust Strip -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div class="flex flex-col items-center text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <div class="text-2xl font-bold text-amber-700">10+</div>
              <div class="text-sm font-semibold text-gray-700">Years Experience</div>
              <div class="text-xs text-gray-500 mt-1">Since 2012</div>
            </div>
            <div class="flex flex-col items-center text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <div class="flex items-center gap-1">
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-xl font-bold text-gray-900">4.9/5</span>
              </div>
              <div class="text-sm font-semibold text-gray-700">Rated by Travellers</div>
              <div class="text-xs text-gray-500 mt-1">500+ reviews</div>
            </div>
            <div class="flex flex-col items-center text-center p-3 bg-white/50 rounded-lg backdrop-blur-sm">
              <div class="text-2xl font-bold text-emerald-700">100%</div>
              <div class="text-sm font-semibold text-gray-700">Licensed Operator</div>
              <div class="text-xs text-gray-500 mt-1">TATO & TTB Certified</div>
            </div>
          </div>

          <!-- Optional CTA (can be removed if not needed) -->
          <div class="pt-4">
            <button 
              @click="scrollToTours" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>View Safari Packages</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Right Column: Lead Form Card -->
        <div class="lg:pl-4">
          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
            <!-- Card Header -->
            <div class="bg-linear-to-r from-emerald-600 to-emerald-700 p-6 text-center">
              <h3 class="text-2xl font-bold text-white">Start Your Adventure</h3>
              <p class="text-emerald-100 mt-2">Get your free custom safari quote today</p>
              
              <!-- Trust badges in header -->
              <div class="flex items-center justify-center gap-4 mt-4">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm font-semibold text-white">4.9/5 Rating</span>
                </div>
                <div class="w-px h-4 bg-emerald-400"></div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-sm font-semibold text-white">Local Experts</span>
                </div>
              </div>
            </div>

            <!-- Form Slot -->
            <div class="p-6">
              <slot name="leadForm" />
            </div>

            <!-- Card Footer -->
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div class="flex items-center justify-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Your information is secure and will never be shared with third parties.</span>
              </div>
            </div>
          </div>

          <!-- Testimonial snippet -->
          <div class="mt-6 p-4 bg-linear-to-r from-amber-50 to-white rounded-lg border border-amber-100 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="shrink-0">
                <div class="w-10 h-10 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold">JM</span>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-1 mb-1">
                  <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <p class="text-sm text-gray-700 italic">"ZafsTours created our perfect family safari. Every detail was expertly handled!"</p>
                <p class="text-xs text-gray-600 mt-1 font-semibold">— James M., Family Safari to Serengeti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Optional scroll function if needed elsewhere on the page
const scrollToTours = () => {
  const toursSection = document.querySelector('#tours')
  if (toursSection) {
    toursSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Optional custom styles can be added here */
</style>