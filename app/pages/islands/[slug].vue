<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      <p class="mt-3 text-slate-600">Loading island details...</p>
    </div>
  </div>

  <div v-else-if="error || !island" class="min-h-screen flex items-center justify-center">
    <div class="text-center max-w-md">
      <svg class="mx-auto h-16 w-16 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h2 class="mt-4 text-2xl font-bold text-slate-800">Island Not Found</h2>
      <p class="mt-2 text-slate-600">The island you're looking for doesn't exist or may have been moved.</p>
      <NuxtLink 
        to="/islands" 
        class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-colors"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Islands
      </NuxtLink>
    </div>
  </div>

  <div v-else class="min-h-screen bg-linear-to-b from-amber-50 to-slate-50">
    <!-- Hero Section - SIMPLIFIED with no hover effects -->
    <div class="relative overflow-hidden bg-linear-to-r from-amber-900 via-amber-800 to-amber-900">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <!-- Back Button - SIMPLE LINK ONLY -->
        <div class="mb-8">
          <NuxtLink 
            to="/islands" 
            class="inline-flex items-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Islands
          </NuxtLink>
        </div>

        <!-- Island Info -->
        <div class="grid lg:grid-cols-2 gap-8 items-start">
          <!-- Left Column: Title & Basic Info -->
          <div>
            <div class="mb-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-200 text-xs font-medium">
                Tanzanian Island
              </span>
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span class="bg-linear-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
                {{ island.name }}
              </span>
            </h1>
            
            <p v-if="island.shortDescription" class="text-xl text-amber-100/90 mb-6">
              {{ island.shortDescription }}
            </p>

            <!-- Quick Stats - NO HOVER EFFECTS -->
            <div class="flex flex-wrap gap-4 mt-8">
              <div v-if="island.region" class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                <svg class="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span class="text-white font-medium">{{ island.region }}</span>
              </div>

              <div v-if="island.areaKm2" class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                <svg class="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4"/>
                </svg>
                <span class="text-white font-medium">{{ formatArea(island.areaKm2) }}</span>
              </div>

              <div v-if="island.establishedYear" class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                <svg class="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="text-white font-medium">Est. {{ island.establishedYear }}</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Featured Image - ONLY IMAGE CLICKS -->
          <div>
            <div class="aspect-video rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
              <img
                :src="island.featuredImage || placeholderImage"
                :alt="island.name"
                class="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                @click="openGallery(0)"
                @error="handleImageError"
              />
            </div>
            
            <!-- Gallery Counter - ONLY THIS BUTTON OPENS GALLERY -->
            <div v-if="island.gallery?.length > 0" class="mt-4">
              <button
                @click="openGallery(0)"
                class="flex items-center gap-2 px-4 py-3 bg-black/60 hover:bg-black/80 text-white rounded-xl border border-white/20 transition-colors"
                aria-label="Open photo gallery"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="font-medium">{{ island.gallery.length }} Photos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Rest of the content remains the same -->
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column: Description & Details -->
        <div class="lg:col-span-2">
          <!-- Description -->
          <section class="mb-12">
            <div class="flex items-center gap-3 mb-6">
              <div class="h-1 w-12 bg-amber-600 rounded-full"></div>
              <h2 class="text-2xl font-bold text-slate-900">About {{ island.name }}</h2>
            </div>
            
            <div class="prose prose-lg max-w-none">
              <p v-if="island.description" class="text-slate-700 leading-relaxed whitespace-pre-line">
                {{ island.description }}
              </p>
              <p v-else-if="island.shortDescription" class="text-slate-700 leading-relaxed">
                {{ island.shortDescription }}
              </p>
              <div v-else class="text-slate-500 italic">
                No detailed description available for this island.
              </div>
            </div>
          </section>

          <!-- Gallery (if available) -->
          <section v-if="island.gallery?.length > 0" class="mb-12">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="h-1 w-12 bg-amber-600 rounded-full"></div>
                <h2 class="text-2xl font-bold text-slate-900">Photo Gallery</h2>
              </div>
              <button
                @click="openGallery(0)"
                class="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2"
              >
                View all photos
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div 
                v-for="(image, index) in island.gallery.slice(0, 6)" 
                :key="index"
                class="aspect-square rounded-xl overflow-hidden cursor-pointer"
                @click="openGallery(index)"
              >
                <img
                  :src="image"
                  :alt="`${island.name} - Photo ${index + 1}`"
                  class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="space-y-6">
          <!-- Quick Facts Card -->
          <div class="bg-linear-to-br from-amber-50 to-white rounded-2xl shadow-lg border border-amber-100 p-6">
            <h3 class="text-lg font-bold text-slate-900 mb-4">Island Facts</h3>
            
            <div class="space-y-4">
              <div v-if="island.areaKm2" class="flex justify-between items-center py-2 border-b border-amber-100">
                <span class="text-slate-600">Total Area</span>
                <span class="font-semibold text-amber-700">{{ formatArea(island.areaKm2) }}</span>
              </div>
              
              <div v-if="island.region" class="flex justify-between items-center py-2 border-b border-amber-100">
                <span class="text-slate-600">Region</span>
                <span class="font-semibold text-amber-700">{{ island.region }}</span>
              </div>
              
              <div v-if="island.establishedYear" class="flex justify-between items-center py-2 border-b border-amber-100">
                <span class="text-slate-600">Established</span>
                <span class="font-semibold text-amber-700">{{ island.establishedYear }}</span>
              </div>
              
              <div class="flex justify-between items-center py-2">
                <span class="text-slate-600">Status</span>
                <span class="font-semibold text-amber-700">{{ island.isActive !== false ? 'Active' : 'Inactive' }}</span>
              </div>
            </div>
          </div>

          <!-- Share Card -->
          <div class="bg-linear-to-br from-slate-50 to-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <h3 class="text-lg font-bold text-slate-900 mb-4">Share This Island</h3>
            <div class="flex gap-3">
              <button
                @click="shareOnSocial('twitter')"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl border border-sky-200 transition-colors"
              >
                <span class="text-sm font-medium">Twitter</span>
              </button>
              
              <button
                @click="shareOnSocial('facebook')"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl border border-blue-200 transition-colors"
              >
                <span class="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>

          <!-- Explore More Card -->
          <div class="bg-linear-to-br from-amber-50 to-white rounded-2xl shadow-lg border border-amber-100 p-6">
            <h3 class="text-lg font-bold text-slate-900 mb-4">Explore More</h3>
            <NuxtLink 
              to="/islands" 
              class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-colors"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
              View All Islands
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <!-- Lightbox Modal -->
    <div v-if="showGallery" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div class="relative w-full max-w-6xl max-h-[85vh] mt-16">
        <button
          @click="closeGallery"
          class="absolute -top-12 right-0 z-10 p-3 bg-black/50 text-white rounded-full"
          aria-label="Close gallery"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <button
          v-if="currentGalleryIndex > 0"
          @click="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <button
          v-if="currentGalleryIndex < island.gallery.length - 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        
        <div class="h-full flex flex-col">
          <div class="flex-1 flex items-center justify-center">
            <img
              :src="island.gallery[currentGalleryIndex]"
              :alt="`${island.name} - Photo ${currentGalleryIndex + 1}`"
              class="max-w-full max-h-[60vh] object-contain rounded-lg"
            />
          </div>
          
          <div class="mt-4 text-center text-white">
            <p class="text-sm opacity-75">Photo {{ currentGalleryIndex + 1 }} of {{ island.gallery.length }}</p>
          </div>
          
          <div v-if="island.gallery.length > 1" class="mt-4 flex gap-2 overflow-x-auto py-2 px-4">
            <button
              v-for="(image, index) in island.gallery"
              :key="index"
              @click="currentGalleryIndex = index"
              :class="[
                'shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2',
                currentGalleryIndex === index 
                  ? 'border-amber-500' 
                  : 'border-transparent'
              ]"
            >
              <img
                :src="image"
                :alt="`Thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()

definePageMeta({
  title: 'Island Details'
})

// Fetch island data
const { data: island, pending, error, refresh } = await useAsyncData(
  `island-${route.params.slug}`,
  async () => {
    try {
      const islands = await $fetch('/api/islands')
      const islandsArray = Array.isArray(islands) ? islands : (islands?.data || [])
      
      const foundIsland = islandsArray.find(i => 
        i.slug === route.params.slug || 
        i._id === route.params.slug || 
        i.id === route.params.slug
      )
      
      if (!foundIsland) {
        throw createError({ 
          statusCode: 404, 
          statusMessage: 'Island not found' 
        })
      }
      
      return foundIsland
    } catch (err) {
      console.error('Error fetching island:', err)
      throw err
    }
  },
  { server: true, immediate: true }
)

// Set dynamic page title
watch(island, (newIsland) => {
  if (newIsland?.name) {
    useHead({
      title: `${newIsland.name} | Tanzanian Islands`,
      meta: [
        { 
          name: 'description', 
          content: newIsland.shortDescription || newIsland.description || `Discover ${newIsland.name} island in Tanzania` 
        }
      ]
    })
  }
}, { immediate: true })

// Gallery state
const showGallery = ref(false)
const currentGalleryIndex = ref(0)

// Image placeholder
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZCQjI0Ii8+CjxwYXRoIGQ9Ik0xMDAsMTUwIEMxNTAsMTAwIDI1MCwxMDAgMzAwLDE1MCBDMjUwLDIwMCAxNTAsMjAwIDEwMCwxNTAgWiIgZmlsbD0iI0Y1OUIwQiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjIwIiBmaWxsPSIjREM0NkI2Ii8+Cjwvc3ZnPgo='

/**
 * Format area with commas and km² suffix
 */
function formatArea(km2) {
  if (km2 == null) return '— km²'
  try {
    const formatted = new Intl.NumberFormat('en-US').format(Number(km2))
    return `${formatted} km²`
  } catch {
    return `${km2} km²`
  }
}

/**
 * Handle image loading errors
 */
function handleImageError(event) {
  if (event?.target) {
    event.target.src = placeholderImage
  }
}

/**
 * Open gallery at specific index
 */
function openGallery(index = 0) {
  if (island.value?.gallery?.length > 0) {
    currentGalleryIndex.value = Math.min(index, island.value.gallery.length - 1)
    showGallery.value = true
    document.body.style.overflow = 'hidden'
  }
}

/**
 * Close gallery
 */
function closeGallery() {
  showGallery.value = false
  document.body.style.overflow = ''
}

/**
 * Navigate to previous image
 */
function prevImage() {
  if (currentGalleryIndex.value > 0) {
    currentGalleryIndex.value--
  }
}

/**
 * Navigate to next image
 */
function nextImage() {
  if (currentGalleryIndex.value < island.value.gallery.length - 1) {
    currentGalleryIndex.value++
  }
}

/**
 * Share on social media
 */
function shareOnSocial(platform) {
  const url = window.location.href
  const title = island.value?.name || 'Tanzanian Island'
  const text = island.value?.shortDescription || 'Check out this beautiful Tanzanian island!'
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} - ${text}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  }
  
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }
}

/**
 * Handle keyboard navigation in gallery
 */
function handleKeyDown(event) {
  if (!showGallery.value) return
  
  switch (event.key) {
    case 'Escape':
      closeGallery()
      break
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

// Add/remove event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>