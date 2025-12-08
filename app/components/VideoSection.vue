<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <!-- Safari-themed background matching WhyChoose.vue -->
    <div class="absolute inset-0 bg-gray-900">
      <!-- Safari background image -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('/images/background/safari2.png')` }"
      ></div>
      
      <!-- Soft gradient overlay -->
      <div class="absolute inset-0 bg-linear-to-br from-gray-900/40 via-gray-800/30 to-amber-900/30"></div>

      <!-- Soft dark fade for text readability -->
      <div class="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/65 via-black/45 to-transparent"></div>
      
      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
    </div>

    <!-- Subtle background elements matching WhyChoose.vue -->
    <div class="absolute top-20 right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
      <!-- Section Header with safari touch -->
      <div class="text-center mb-16 lg:mb-20">
        <!-- Safari-themed badge -->
        <div class="inline-flex items-center mb-6">
          <div class="w-16 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
          <span class="mx-4 text-amber-300 font-semibold tracking-wider text-sm uppercase">Experience Tanzania</span>
          <div class="w-16 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
        </div>
        
        <h2 class="heading-safe text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Watch Our Story
        </h2>
        
        <p class="body-safe text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          See why thousands of travelers trust ZafsTours for unforgettable adventures in Tanzania's most breathtaking destinations.
        </p>
      </div>

      <!-- Video Thumbnail Container -->
      <div class="max-w-5xl mx-auto">
        <div class="relative group cursor-pointer" @click="openModal">
          <!-- Thumbnail Container with safari styling -->
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20">
            <!-- Image overlay gradients -->
            <div class="absolute inset-0 bg-linear-to-t from-gray-900/60 via-gray-900/20 to-transparent z-10"></div>
            
            <!-- Safari image thumbnail -->
            <div class="aspect-video rounded-3xl overflow-hidden">
              <img 
                src="/hero/safari.jpg" 
                alt="Safari Adventure in Tanzania - ZafsTours"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              <!-- Play button overlay - Keeping your original play button style with safari enhancements -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="relative">
                  <!-- Outer glow ring - safari-themed -->
                  <div class="absolute inset-0 bg-linear-to-r from-amber-500/40 via-amber-400/40 to-amber-500/40 rounded-full blur-xl opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"></div>
                  
                  <!-- Play button - original style with safari colors -->
                  <div class="relative w-24 h-24 md:w-28 md:h-28 bg-linear-to-br from-white/95 to-white/80 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm border border-amber-300/30">
                    <div class="absolute inset-0 bg-linear-to-br from-amber-500/20 to-amber-400/20 rounded-full"></div>
                    <svg class="w-10 h-10 md:w-12 md:h-12 text-amber-600 ml-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Text overlay with safari styling -->
              <div class="absolute bottom-8 left-0 right-0 text-center z-20 px-4">
                <div class="inline-flex items-center space-x-4 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-500/30">
                  <span class="text-white font-medium text-sm md:text-base">Safari • Kilimanjaro • Zanzibar</span>
                  <span class="text-amber-300 animate-pulse">▶</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Hover effect border -->
          <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-amber-400/40 transition-all duration-300 pointer-events-none"></div>
        </div>
        
        <!-- Video highlights with safari glass-morphism styling -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-amber-500/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div class="absolute top-0 right-0 w-8 h-8 bg-amber-500/20 transform rotate-45 translate-x-4 -translate-y-4 group-hover:bg-amber-500/30 transition-colors"></div>
            </div>
            
            <div class="w-14 h-14 mx-auto mb-6 rounded-xl bg-linear-to-br from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">Safari Adventures</h3>
            <p class="text-gray-300 text-sm">Witness the Great Migration & Big Five</p>
          </div>
          
          <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div class="absolute top-0 right-0 w-8 h-8 bg-blue-500/20 transform rotate-45 translate-x-4 -translate-y-4 group-hover:bg-blue-500/30 transition-colors"></div>
            </div>
            
            <div class="w-14 h-14 mx-auto mb-6 rounded-xl bg-linear-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Kilimanjaro Treks</h3>
            <p class="text-gray-300 text-sm">Summit Africa's highest peak</p>
          </div>
          
          <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-500/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div class="absolute top-0 right-0 w-8 h-8 bg-emerald-500/20 transform rotate-45 translate-x-4 -translate-y-4 group-hover:bg-emerald-500/30 transition-colors"></div>
            </div>
            
            <div class="w-14 h-14 mx-auto mb-6 rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">Zanzibar Beaches</h3>
            <p class="text-gray-300 text-sm">Relax on pristine white sand beaches</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <Transition name="modal">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeModal">
        <!-- Backdrop with safari overlay -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
        
        <!-- Modal Content -->
        <div class="relative z-10 w-full max-w-4xl" @click.stop>
          <!-- Close button with safari styling -->
          <button @click="closeModal" class="absolute -top-12 right-0 text-white hover:text-amber-300 transition-colors group">
            <div class="relative">
              <div class="absolute inset-0 bg-amber-500/10 rounded-full blur group-hover:blur-sm transition-all duration-300"></div>
              <div class="relative w-10 h-10 bg-linear-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-amber-500/30 group-hover:border-amber-400/50 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
          </button>
          
          <!-- Video Container -->
          <div class="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div class="aspect-video">
              <iframe 
                ref="videoIframe"
                :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="ZafsTours Tanzania Adventures - Safari, Kilimanjaro & Zanzibar"
              ></iframe>
            </div>
            
            <!-- Video Info -->
            <div class="p-6 bg-linear-to-b from-gray-900 to-gray-950 border-t border-gray-800/50">
              <h3 class="text-white text-xl font-bold mb-3">ZafsTours Tanzania Adventures</h3>
              <p class="text-gray-400 text-sm md:text-base">Experience the best of Tanzania with our expert guides. From wildlife safaris in Serengeti, Kilimanjaro climbs to Uhuru Peak, and relaxing on Zanzibar's pristine beaches.</p>
              <div class="flex items-center mt-4 space-x-4">
                <span class="inline-flex items-center text-gray-500 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  4:32 min
                </span>
                <span class="inline-flex items-center text-gray-500 text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  15K+ views
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isModalOpen = ref(false)
const videoIframe = ref(null)
const videoId = 'r2Bw3S3PDwI' // Example YouTube video ID - replace with your actual video

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'auto'
  
  // Stop the YouTube video when closing modal
  if (videoIframe.value) {
    const iframeSrc = videoIframe.value.src
    videoIframe.value.src = iframeSrc.replace('autoplay=1', 'autoplay=0')
  }
}

// Close modal when clicking outside (on the backdrop)
const handleOutsideClick = (event) => {
  if (isModalOpen.value && !event.target.closest('.relative.z-10')) {
    closeModal()
  }
}

// Close modal on ESC key
const handleEscKey = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// Set up event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(20px);
}

/* Play button animation - your original style */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(245, 158, 11, 0);
  }
}

.group:hover .relative > .relative > div:first-child {
  animation: pulse-glow 2s infinite;
}

/* Smooth transitions */
img {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Image hover zoom effect */
.group:hover img {
  transform: scale(1.05);
}

/* Prevent scrolling when modal is open */
body.modal-open {
  overflow: hidden;
}

/* Ensure iframe has proper background */
iframe {
  background: #000;
}

/* Cursor pointer for backdrop */
.fixed.inset-0 {
  cursor: pointer;
}

/* Prevent cursor pointer on modal content */
.relative.z-10 {
  cursor: default;
}

/* Background image styling */
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

/* Glass effect for cards */
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

/* Responsive background image adjustments */
@media (max-width: 768px) {
  .bg-cover {
    background-position: 70% center;
  }
}
</style>