<!-- app/pages/animals/[slug].vue -->
<template>
  <!-- Loading State -->
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-linear-to-brrom-gray-50 to-gray-100">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="mt-4 text-gray-600 font-medium">Loading details...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
    <div class="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">Animal Not Found</h3>
      <p class="text-gray-600 mb-6">The animal you're looking for doesn't exist or has been removed.</p>
      <NuxtLink 
        to="/animals"
        class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Animals</span>
      </NuxtLink>
    </div>
  </div>

  <!-- Main Content -->
  <div v-else class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
    <!-- Hero Image Only - No Overlay Content -->
    <section class="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <!-- Back Button -->
      <div class="absolute top-6 left-6 z-20">
        <NuxtLink 
          to="/animals"
          class="flex items-center gap-2 px-4 py-2.5 bg-white/95 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="font-medium">Back to Animals</span>
        </NuxtLink>
      </div>

      <!-- Hero Image Only -->
      <div class="absolute inset-0">
        <img
          v-if="animal.featuredImage"
          :src="animal.featuredImage"
          :alt="animal.name"
          class="w-full h-full object-cover"
          @load="heroImageLoaded = true"
          @error="handleImageError"
        />
        <div v-else class="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center">
          <svg class="w-24 h-24 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </section>

    <!-- All Content Below Hero Image -->
    <section class="py-8 md:py-12">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Animal Title Section - Improved Design -->
        <div class="mb-10 md:mb-12">
          <!-- Category Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
            <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span class="text-emerald-700 font-medium text-sm">{{ animal.category || 'Uncategorized' }}</span>
          </div>
          
          <!-- Common Name Section -->
          <div class="mb-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Common Name</h2>
            </div>
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">{{ animal.name }}</h1>
          </div>
          
          <!-- Scientific Name Section -->
          <div class="bg-linear-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
            <div class="flex items-start md:items-center gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Scientific Name</h3>
                    <p class="text-2xl md:text-3xl text-gray-900 italic font-medium">{{ animal.scientificName || 'Not specified' }}</p>
                  </div>
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm text-gray-600">Binomial nomenclature</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Card -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <!-- Overview Section -->
          <div class="p-8 md:p-10 border-b border-gray-100">
            <div class="flex items-start gap-4 md:gap-6">
              <div class="hidden md:block shrink-0">
                <div class="w-12 h-12 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-4 md:hidden">
                  <div class="w-10 h-10 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 class="text-xl font-bold text-gray-900">Quick Overview</h2>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Quick Overview</h2>
                <p class="text-gray-700 text-lg leading-relaxed">
                  {{ animal.shortDescription || 'No overview available for this animal.' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Full Description Section -->
          <div class="p-8 md:p-10">
            <div class="flex items-start gap-4 md:gap-6">
              <div class="hidden md:block shrink-0">
                <div class="w-12 h-12 bg-linear-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-4 md:hidden">
                  <div class="w-10 h-10 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h2 class="text-xl font-bold text-gray-900">In-Depth Description</h2>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6 hidden md:block">In-Depth Description</h2>
                <div class="prose max-w-none">
                  <div class="text-gray-700 leading-relaxed whitespace-pre-line">
                    {{ animal.fullDescription || animal.description || 'No detailed description available for this animal.' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gallery Section -->
        <div v-if="animal.gallery && animal.gallery.length > 0" class="mb-12">
          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div class="p-8 md:p-10">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-linear-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-xl font-bold text-gray-900">Visual Gallery</h2>
                    <p class="text-gray-500 text-sm mt-1">Explore {{ animal.name }} in pictures</p>
                  </div>
                </div>
                <span class="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                  {{ animal.gallery.length }} {{ animal.gallery.length === 1 ? 'image' : 'images' }}
                </span>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div 
                  v-for="(image, index) in animal.gallery" 
                  :key="index"
                  class="aspect-square overflow-hidden rounded-xl cursor-pointer bg-gray-100 group"
                  @click="openGallery(index)"
                >
                  <div class="relative w-full h-full">
                    <img
                      :src="image"
                      :alt="`${animal.name} - Image ${index + 1}`"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      @error="handleImageError"
                    />
                    <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/animals"
            class="inline-flex items-center justify-center gap-3 px-8 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Browse All Animals</span>
          </NuxtLink>
          
          <button 
            v-if="animal.gallery && animal.gallery.length > 0"
            @click="openGallery(0)"
            class="inline-flex items-center justify-center gap-3 px-8 py-3 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>View Photo Gallery</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Modal -->
    <div 
      v-if="showGallery"
      class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      @click.self="closeGallery"
    >
      <!-- Close Button -->
      <button 
        class="absolute top-6 right-6 text-white p-3 hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
        @click="closeGallery"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- Navigation Buttons -->
      <button 
        v-if="galleryIndex > 0"
        class="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
        @click="prevImage"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        v-if="galleryIndex < animal.gallery.length - 1"
        class="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
        @click="nextImage"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Image Container -->
      <div class="max-w-4xl max-h-[80vh] w-full">
        <img
          :src="animal.gallery[galleryIndex]"
          :alt="`${animal.name} - Image ${galleryIndex + 1}`"
          class="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto"
          @error="handleImageError"
        />
        <!-- Counter -->
        <div class="mt-4 text-center">
          <span class="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            {{ galleryIndex + 1 }} / {{ animal.gallery.length }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const slug = route.params.slug

const animal = ref({})
const loading = ref(true)
const error = ref(null)
const showGallery = ref(false)
const galleryIndex = ref(0)
const heroImageLoaded = ref(false)

// Fetch animal details
async function fetchAnimal() {
  try {
    loading.value = true
    error.value = null
    
    const allAnimals = await $fetch('/api/animals')
    const foundAnimal = allAnimals.find(a => a.slug === slug)
    
    if (!foundAnimal) {
      throw new Error(`Animal with slug "${slug}" not found`)
    }
    
    // Map your fields to match the expected structure
    animal.value = {
      ...foundAnimal,
      fullDescription: foundAnimal.description || foundAnimal.fullDescription || ''
    }
    
  } catch (err) {
    console.error('Failed to fetch animal:', err)
    error.value = 'Animal not found.'
    animal.value = null
  } finally {
    loading.value = false
  }
}

// Image error handler
const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&h=600&fit=crop'
  event.target.onerror = null
}

// Gallery functions
const openGallery = (index) => {
  galleryIndex.value = index
  showGallery.value = true
  document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
  showGallery.value = false
  document.body.style.overflow = 'auto'
}

const prevImage = (e) => {
  e.stopPropagation()
  if (galleryIndex.value > 0) {
    galleryIndex.value--
  }
}

const nextImage = (e) => {
  e.stopPropagation()
  if (galleryIndex.value < animal.value.gallery.length - 1) {
    galleryIndex.value++
  }
}

// Keyboard navigation for gallery
const handleKeydown = (e) => {
  if (!showGallery.value) return
  
  switch (e.key) {
    case 'Escape':
      closeGallery()
      break
    case 'ArrowLeft':
      if (galleryIndex.value > 0) {
        galleryIndex.value--
      }
      break
    case 'ArrowRight':
      if (galleryIndex.value < animal.value.gallery.length - 1) {
        galleryIndex.value++
      }
      break
  }
}

onMounted(() => {
  fetchAnimal()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.3s ease, opacity 0.3s ease;
}

/* Ensure hero image shows fully */
section.relative {
  position: relative;
}

/* Fix for image object-cover */
img.object-cover {
  object-fit: cover;
  object-position: center;
}
</style>