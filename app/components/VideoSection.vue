<template>
  <section class="relative py-20 md:py-28 lg:py-36 overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-100/50"></div>
    
    <!-- Decorative elements -->
    <div class="absolute top-20 right-10 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-10 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
        <!-- Badge -->
        <div class="inline-flex items-center mb-6">
          <div class="w-16 h-1 bg-linear-to-r from-transparent via-primary-blue to-transparent rounded-full"></div>
          <span class="mx-4 text-primary-blue font-semibold tracking-wider text-sm uppercase">Experience Tanzania</span>
          <div class="w-16 h-1 bg-linear-to-r from-transparent via-primary-blue to-transparent rounded-full"></div>
        </div>
        
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Watch Our Story
        </h2>
        
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          See why thousands of travelers trust ZafsTours for unforgettable adventures in Tanzania's most breathtaking destinations.
        </p>
      </div>

      <!-- Video Thumbnail Container -->
      <div class="max-w-5xl mx-auto">
        <div class="relative group cursor-pointer" @click="openModal">
          <!-- Thumbnail Image -->
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <!-- Image overlay gradient -->
            <div class="absolute inset-0 bg-linear-to-t from-gray-900/60 via-gray-900/20 to-transparent z-10"></div>
            
            <!-- Safari image thumbnail -->
            <div class="aspect-video rounded-3xl overflow-hidden">
              <img 
                src="/hero/safari.jpg" 
                alt="Safari Adventure in Tanzania - ZafsTours"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              
              <!-- Play button overlay -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="relative">
                  <!-- Outer glow ring -->
                  <div class="absolute inset-0 bg-linear-to-r from-primary-blue/70 via-blue-500/70 to-primary-blue/70 rounded-full blur-xl opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"></div>
                  
                  <!-- Play button -->
                  <div class="relative w-24 h-24 md:w-28 md:h-28 bg-linear-to-br from-white/95 to-white/80 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
                    <div class="absolute inset-0 bg-linear-to-br from-primary-blue/20 to-blue-600/20 rounded-full"></div>
                    <svg class="w-10 h-10 md:w-12 md:h-12 text-primary-blue ml-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Text overlay -->
              <div class="absolute bottom-8 left-0 right-0 text-center z-20 px-4">
                <div class="inline-flex items-center space-x-4 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <span class="text-white font-medium text-sm md:text-base">Safari • Kilimanjaro • Zanzibar</span>
                  <span class="text-blue-300 animate-pulse">▶</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Hover effect border -->
          <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary-blue/30 transition-all duration-300 pointer-events-none"></div>
        </div>
        
        <!-- Video highlights -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div class="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-blue/20 transition-all duration-300">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-linear-to-r from-emerald-100 to-emerald-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">Safari Adventures</h3>
            <p class="text-gray-600 text-sm">Witness the Great Migration & Big Five</p>
          </div>
          
          <div class="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-blue/20 transition-all duration-300">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-linear-to-r from-blue-100 to-blue-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">Kilimanjaro Treks</h3>
            <p class="text-gray-600 text-sm">Summit Africa's highest peak</p>
          </div>
          
          <div class="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-blue/20 transition-all duration-300">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-linear-to-r from-cyan-100 to-cyan-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">Zanzibar Beaches</h3>
            <p class="text-gray-600 text-sm">Relax on pristine white sand beaches</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <Transition name="modal">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeModal">
        <!-- Backdrop - This div handles the outside click -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
        
        <!-- Modal Content - This div should NOT close when clicked -->
        <div class="relative z-10 w-full max-w-4xl" @click.stop>
          <!-- Close button -->
          <button @click="closeModal" class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors group">
            <div class="relative">
              <div class="absolute inset-0 bg-white/10 rounded-full blur group-hover:blur-sm transition-all duration-300"></div>
              <div class="relative w-10 h-10 bg-linear-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700/50 group-hover:border-gray-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
          </button>
          
          <!-- Video Container -->
          <div class="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50">
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
            <div class="p-6 bg-linear-to-b from-gray-900 to-gray-950">
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

/* Play button animation */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
  }
}

.group:hover .relative > .relative > div:first-child {
  animation: pulse-glow 2s infinite;
}

/* Custom colors */
.bg-primary-blue {
  background-color: #297BD4;
}

.text-primary-blue {
  color: #297BD4;
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
</style>