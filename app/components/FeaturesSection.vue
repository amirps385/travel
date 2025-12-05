<!-- components/FeaturesSection.vue -->
<template>
  <section class="bg-paleaqua py-20 lg:pt-30 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8">
        <!-- Left Column - Text Content -->
        <div class="lg:col-span-5 xl:col-span-5 px-4 max-lg:mb-40">
          <!-- Title Section -->
          <div class="text-left mb-10 2xl:mb-15">
            <h2 class="text-3xl md:text-40 xl:text-46 font-bold mb-2.5 text-gray-900 leading-tight">
              We <span class="text-citrusyellow">Recommend</span><br>
              Beautiful Destinations<br>
              Every Month
            </h2>
            <p class="text-base text-gray-600 mb-7 2xl:mb-12.5 sm:pr-8.75 leading-relaxed">
              ZakiTours is a multi-award-winning travel agency specializing in African safari experiences. 
              We have one of Tanzania's most trusted travel communities, helping travelers discover authentic African adventures.
            </p>
          </div>

          <!-- 24/7 Guide Card and Features -->
          <div class="mb-5 flex max-sm:flex-col sm:flex-wrap gap-6">
            <!-- 24/7 Guide Card -->
            <div class="sm:w-35 w-full sm:h-51 h-40 p-2.25 bg-white rounded-3xl flex min-w-35 sm:mr-7.5 max-sm:mb-10">
              <div class="bg-primary shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-2.5 rounded-2xxl text-center flex flex-col items-center justify-center w-full">
                <span class="text-38 text-citrusyellow font-black block leading-none">24/7</span>
                <span class="text-white text-2xl font-medium block mt-2">Guide Support</span>
              </div>
            </div>

            <!-- Features -->
            <div class="flex-1">
              <!-- Trusted Travel Guide -->
              <div class="flex mb-7.5">
                <div class="size-21.25 min-w-21.25 mr-7.5 flex items-center justify-center bg-cover bg-no-repeat"
                     style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODUiIGhlaWdodD0iODUiIHZpZXdCb3g9IjAgMCA4NSA4NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDIuNSIgY3k9IjQyLjUiIHI9IjQyLjUiIGZpbGw9IiMxRDhCRkIiLz4KPC9zdmc+')">
                  <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 0l5.553-2.276A1 1 0 0116 4.382v10.236a1 1 0 01-1.447.894L9 13m-5.553 2.276L9 17m5.553-2.276L9 13m0 0V7"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 class="mb-3 font-medium text-2xl text-gray-900">Trusted travel guide</h4>
                  <p class="text-gray-600 text-base">Provides reliable information to help travelers plan their trips efficiently and safely.</p>
                </div>
              </div>

              <!-- Mission & Vision -->
              <div class="flex mb-7.5">
                <div class="size-21.25 min-w-21.25 mr-7.5 flex items-center justify-center bg-cover bg-no-repeat"
                     style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODUiIGhlaWdodD0iODUiIHZpZXdCb3g9IjAgMCA4NSA4NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDIuNSIgY3k9IjQyLjUiIHI9IjQyLjUiIGZpbGw9IiMxRDhCRkIiLz4KPC9zdmc+')">
                  <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 class="mb-3 font-medium text-2xl text-gray-900">Mission & Vision</h4>
                  <p class="text-gray-600 text-base">Aims to connect people to positive experience through travel, helping them see the world differently.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA and Happy Customers -->
          <div class="sm:flex items-center mt-8">
            <!-- Discover More Button -->
            <div class="mr-3 mb-4 sm:mb-0">
              <button @click="scrollToTours" 
                      class="site-button px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-md hover:shadow-lg">
                Discover More
              </button>
            </div>

            <!-- Happy Customers -->
            <div class="flex items-center">
              <!-- Customer Avatars -->
              <div class="flex items-center mr-5">
                <div class="size-9 inline-flex rounded-full overflow-hidden border-2 border-white -ml-2.5 first:ml-0">
                  <div class="w-full h-full bg-linear-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                </div>
                <div class="size-9 inline-flex rounded-full overflow-hidden border-2 border-white -ml-2.5">
                  <div class="w-full h-full bg-linear-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                    B
                  </div>
                </div>
                <div class="size-9 inline-flex rounded-full overflow-hidden border-2 border-white -ml-2.5">
                  <div class="w-full h-full bg-linear-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    C
                  </div>
                </div>
              </div>
              
              <!-- Happy Customer Stats -->
              <div>
                <span class="block font-black text-22 text-primary">3.5k</span>
                <p class="mb-0 uppercase font-medium text-xs text-gray-600 tracking-wider">Happy Customer</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Images -->
        <div class="lg:col-span-7 xl:col-span-7 px-4 relative h-[600px] lg:h-[700px]">
                            <!-- Years of Experience Card with Plane -->
          <div class="absolute z-30 lg:top-7.5 top-4 3xl:-right-36.25 lg:right-0 -right-4 animate-flying max-md:hidden">
            <!-- Plane Image -->
            <div class="absolute lg:-left-27.5 -left-20 bottom-4 z-40">
              <img 
                v-if="imagesLoaded.plane"
                src="/images/features/plane1.png" 
                alt="Plane" 
                class="max-lg:max-w-60"
                width="384"
                height="193"
                @load="imagesLoaded.plane = true"
                @error="handleImageError"
              >
              <div v-else class="w-60 h-30 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 text-sm">✈️ Plane Image</span>
              </div>
            </div>

            <!-- Years of Experience Box -->
            <div class="bg-white rounded-xl py-4 lg:pl-13.75 pl-10 pr-6 inline-flex items-center lg:w-88 w-72 shadow-2xl z-30">
              <h2 class="font-display font-black lg:text-83 text-5xl leading-none text-secondary mb-0 text-shadow-custom mr-6.75">25</h2>
              <span class="font-black lg:text-28 text-xl leading-tight text-primary">Years of<br>Experience</span>
            </div>
          </div>

          <!-- Circular Image (Bigger and positioned higher) -->
          <div class="absolute z-10 border-[20px] border-white rounded-full shadow-[0px_27px_35.9px_rgba(41,137,145,0.2)] overflow-hidden"
               :class="{
                 'xl:size-115 lg:size-100 size-80': true,
                 'lg:left-[10%] lg:top-[8%]': !isMobile,
                 'left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4': isMobile
               }">
            <img 
              v-if="imagesLoaded.circular"
              src="/images/features/we-rec-pic2.jpg" 
              alt="Profile" 
              class="w-full h-full object-cover"
              width="460"
              height="460"
              @load="imagesLoaded.circular = true"
              @error="handleImageError"
            >
            <div v-else class="w-full h-full bg-linear-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
              <span class="text-gray-600">Profile Image</span>
            </div>
          </div>

          <!-- Background Landscape Image (Person on mountain) - ON TOP -->
          <div class="absolute 3xl:-right-43.75 lg:-right-10 right-0 bottom-0 max-lg:w-[80%] lg:w-full z-20">
            <img 
              v-if="imagesLoaded.background"
              src="/images/features/we-rec-pic.png" 
              alt="Person standing on mountain" 
              class="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain"
              width="764"
              height="586"
              @load="imagesLoaded.background = true"
              @error="handleImageError"
            >
            <div v-else class="w-full h-[400px] lg:h-[500px] bg-linear-to-r from-blue-50 to-green-50 rounded-2xl flex items-center justify-center">
              <div class="text-center">
                <div class="w-40 h-60 bg-gray-300 rounded-lg mx-auto mb-4 relative">
                  <!-- Simple person silhouette -->
                  <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-20 bg-gray-600 rounded-t-lg"></div>
                  <div class="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-700 rounded-full"></div>
                </div>
                <span class="text-gray-600">Person on mountain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const imagesLoaded = ref({
  plane: false,
  circular: false,
  background: false
})

const isMobile = ref(false)

const scrollToTours = () => {
  const toursSection = document.querySelector('#tours-section')
  if (toursSection) {
    toursSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  event.target.style.display = 'none'
}

const checkImages = () => {
  const imageUrls = [
    { key: 'plane', url: '/images/features/plane1.png' },
    { key: 'circular', url: '/images/features/we-rec-pic2.jpg' },
    { key: 'background', url: '/images/features/we-rec-pic.png' }
  ]
  
  imageUrls.forEach(({ key, url }) => {
    const img = new Image()
    img.onload = () => {
      imagesLoaded.value[key] = true
      console.log(`✅ ${key} image loaded`)
    }
    img.onerror = () => {
      console.warn(`⚠️ ${key} image not found: ${url}`)
      imagesLoaded.value[key] = false
    }
    img.src = url
  })
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  checkImages()
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
/* Custom CSS */
.bg-paleaqua {
  background-color: #f0f9ff;
}

.text-citrusyellow {
  color: #fbbf24;
}

.text-primary {
  color: #3b82f6;
}

.text-secondary {
  color: #10b981;
}

.bg-primary {
  background-color: #3b82f6;
}

/* Sizing classes */
.size-21\.25 {
  width: 5.3125rem;
  height: 5.3125rem;
}

.size-9 {
  width: 2.25rem;
  height: 2.25rem;
}

.size-115 {
  width: 28.75rem;
  height: 28.75rem;
}

.size-100 {
  width: 25rem;
  height: 25rem;
}

.size-90 {
  width: 22.5rem;
  height: 22.5rem;
}

.size-80 {
  width: 20rem;
  height: 20rem;
}

.size-70 {
  width: 17.5rem;
  height: 17.5rem;
}

.w-35 {
  width: 8.75rem;
}

.h-51 {
  height: 12.75rem;
}

.w-88 {
  width: 22rem;
}

.w-72 {
  width: 18rem;
}

/* Text sizes */
.text-38 {
  font-size: 2.375rem;
}

.text-22 {
  font-size: 1.375rem;
}

.text-40 {
  font-size: 2.5rem;
}

.text-46 {
  font-size: 2.875rem;
}

.text-83 {
  font-size: 5.1875rem;
}

.text-28 {
  font-size: 1.75rem;
}

.rounded-2xxl {
  border-radius: 1.5rem;
}

.text-shadow-custom {
  text-shadow: 0px 4px 0px #3b82f6;
}

/* Animations */
.animate-slide-top {
  animation: slideTop 1s ease-out;
}

/* Flying animation for plane */
.animate-flying {
  animation: flying 3s ease-in-out infinite;
}

@keyframes slideTop {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flying {
  0% {
    transform: translateY(0px) rotate(1deg);
  }
  25% {
    transform: translateY(-8px) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(-1deg);
  }
  75% {
    transform: translateY(-4px) rotate(0deg);
  }
  100% {
    transform: translateY(0px) rotate(1deg);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .lg\:pt-30 {
    padding-top: 7.5rem;
  }
  
  .max-lg\:mb-40 {
    margin-bottom: 10rem;
  }
}

@media (max-width: 768px) {
  .max-md\:hidden {
    display: none;
  }
  
  .h-\[600px\] {
    height: 500px;
  }
}

/* Ensure circular image is positioned higher to cover head and upper body */
@media (min-width: 1024px) {
  .lg\:left-\[10\%\] {
    left: 10% !important;
  }
  
  .lg\:top-\[8\%\] {
    top: 8% !important;
  }
}

/* Adjust for larger screens */
@media (min-width: 1280px) {
  .lg\:left-\[10\%\] {
    left: 13% !important;
  }
  
  .lg\:top-\[8\%\] {
    top: 6% !important;
  }
}

/* Adjust for extra large screens */
@media (min-width: 1536px) {
  .lg\:left-\[10\%\] {
    left: 16% !important;
  }
  
  .lg\:top-\[8\%\] {
    top: 4% !important;
  }
}
</style>