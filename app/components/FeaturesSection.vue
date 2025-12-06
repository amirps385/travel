<!-- components/FeaturesSection.vue -->
<template>
  <section class="bg-white py-16 lg:py-24 overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left Column - Text Content -->
        <div>
          <!-- Section Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Custom Experiences
          </div>

          <!-- Main Heading -->
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tailor-Made
            <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-emerald-600">Tanzania Experiences</span>
          </h2>

          <!-- Subheading -->
          <p class="text-lg text-gray-600 mb-8 lg:mb-10 leading-relaxed">
            We specialize in creating custom safaris, Kilimanjaro climbs, and Zanzibar holidays 
            designed around your dreams, schedule, and budget.
          </p>

          <!-- Key Features -->
          <div class="space-y-6 mb-10 lg:mb-12">
            <div v-for="feature in features" :key="feature.id" class="flex items-start gap-4">
              <div class="shrink-0 w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ feature.title }}</h3>
                <p class="text-gray-600">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <!-- Trust Stats -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl lg:text-3xl font-bold text-emerald-600 mb-1">25+</div>
              <div class="text-sm font-medium text-gray-700">Years Experience</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl lg:text-3xl font-bold text-emerald-600 mb-1">3.5k+</div>
              <div class="text-sm font-medium text-gray-700">Happy Customers</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl lg:text-3xl font-bold text-emerald-600 mb-1">24/7</div>
              <div class="text-sm font-medium text-gray-700">Guide Support</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl lg:text-3xl font-bold text-emerald-600 mb-1">100%</div>
              <div class="text-sm font-medium text-gray-700">Local Team</div>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/journey" 
              class="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200">
              Plan Your Adventure
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </NuxtLink>
            <button @click="scrollToTours" 
              class="inline-flex items-center justify-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
              View All Tours
            </button>
          </div>
        </div>

        <!-- Right Column - Images (Preserved Original Structure) -->
        <div class="relative h-[500px] lg:h-[600px]">
          <!-- Years of Experience Card with Plane -->
          <div class="absolute z-30 lg:top-8 top-4 lg:right-0 -right-4 animate-flying max-md:hidden">
            <!-- Plane Image -->
            <div class="absolute lg:-left-28 -left-20 bottom-4 z-40">
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
            <div class="bg-white rounded-xl py-4 lg:pl-14 pl-10 pr-6 inline-flex items-center lg:w-88 w-72 shadow-2xl z-30">
              <h2 class="font-black lg:text-83 text-5xl leading-none text-emerald-600 mb-0 text-shadow-custom mr-7">25</h2>
              <span class="font-black lg:text-28 text-xl leading-tight text-emerald-700">Years of<br>Experience</span>
            </div>
          </div>

          <!-- Circular Image (Bigger and positioned higher) -->
          <div class="absolute z-10 border-8 border-white rounded-full shadow-xl overflow-hidden"
               :class="{
                 'lg:size-100 size-80': true,
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
            <div v-else class="w-full h-full bg-linear-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
              <span class="text-gray-600">Profile Image</span>
            </div>
          </div>

          <!-- Background Landscape Image (Person on mountain) - ON TOP -->
          <div class="absolute lg:-right-10 right-0 bottom-0 max-lg:w-[80%] lg:w-full z-20">
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
            <div v-else class="w-full h-[400px] lg:h-[500px] bg-linear-to-r from-emerald-50 to-blue-50 rounded-2xl flex items-center justify-center">
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

// Features list
const features = [
  {
    id: 1,
    title: 'Private & Small-Group Safaris',
    description: 'Personalized attention and flexible itineraries for your perfect wildlife experience.'
  },
  {
    id: 2,
    title: 'Locally Based, Expert Team',
    description: 'Tanzanian guides with deep knowledge of wildlife, culture, and hidden gems.'
  },
  {
    id: 3,
    title: 'Flexible Dates & Routes',
    description: 'Tailor your trip around your schedule with customizable departure dates.'
  },
  {
    id: 4,
    title: 'End-to-End Support',
    description: 'We handle everything from planning to execution, with 24/7 local support.'
  }
]

const scrollToTours = () => {
  const toursSection = document.querySelector('#tours')
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
/* Custom CSS for animations */
.text-shadow-custom {
  text-shadow: 0px 4px 0px #059669;
}

/* Flying animation for plane */
.animate-flying {
  animation: flying 3s ease-in-out infinite;
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

/* Sizing classes */
.size-100 {
  width: 25rem;
  height: 25rem;
}

.size-80 {
  width: 20rem;
  height: 20rem;
}

.w-88 {
  width: 22rem;
}

.w-72 {
  width: 18rem;
}

/* Text sizes */
.text-83 {
  font-size: 5.1875rem;
}

.text-28 {
  font-size: 1.75rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .max-md\:hidden {
    display: none;
  }
  
  .h-\[500px\] {
    height: 400px;
  }
}
</style>