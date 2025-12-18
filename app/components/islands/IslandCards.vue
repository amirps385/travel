<template>
  <div 
    :class="[
      'grid gap-6',
      {
        'grid-cols-1': columns === 1,
        'grid-cols-1 sm:grid-cols-2': columns === 2,
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': columns === 3,
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': columns === 4
      }
    ]"
    role="list"
    aria-label="List of Tanzanian islands"
  >
    <!-- Loading Skeletons -->
    <div v-if="isLoading" v-for="i in 6" :key="`skeleton-${i}`" class="animate-pulse">
      <div class="bg-slate-200 rounded-2xl overflow-hidden">
        <div class="h-48 bg-slate-300"></div>
        <div class="p-6 space-y-3">
          <div class="h-4 bg-slate-300 rounded w-3/4"></div>
          <div class="h-3 bg-slate-300 rounded w-1/2"></div>
          <div class="h-3 bg-slate-300 rounded w-2/3"></div>
          <div class="flex gap-2 pt-2">
            <div class="h-6 bg-slate-300 rounded-full w-16"></div>
            <div class="h-6 bg-slate-300 rounded-full w-20"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Island Cards -->
    <div
      v-for="island in islands"
      :key="island._id || island.id || island.slug"
      class="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      role="listitem"
    >
      <!-- Image Container -->
      <div class="relative h-48 md:h-56 overflow-hidden bg-linear-to-br from-amber-100 to-slate-100">
        <img
          :src="currentImage[island._id] || island.featuredImage || placeholderImage"
          :alt="island.name || 'Island image'"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          @error="() => handleImageError(island._id)"
        />
        
        <!-- Gallery Count Badge -->
        <div 
          v-if="island.gallery?.length > 0" 
          class="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs"
          aria-label="Photo gallery available"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span>{{ island.gallery.length }}</span>
        </div>
        
        <!-- Image Fallback Overlay -->
        <div 
          v-if="!island.featuredImage || currentImage[island._id] === placeholderImage" 
          class="absolute inset-0 flex flex-col items-center justify-center text-slate-400"
          aria-hidden="true"
        >
          <svg class="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span class="text-sm">Island Preview</span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-5 md:p-6">
        <!-- Header -->
        <div class="mb-4">
          <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors">
            {{ island.name || 'Unnamed Island' }}
          </h3>
          <div class="flex items-center gap-2 text-sm text-slate-600">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>{{ island.region || 'Unknown Region' }}</span>
          </div>
        </div>

        <!-- Description -->
        <p 
          v-if="island.shortDescription" 
          class="text-slate-600 mb-5 line-clamp-2 leading-relaxed"
        >
          {{ island.shortDescription }}
        </p>

        <!-- Badges -->
        <div class="flex flex-wrap gap-2 mb-6">
          <div 
            v-if="island.areaKm2" 
            class="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-800 rounded-full text-xs font-medium"
            aria-label="Island area"
          >
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
            {{ formatArea(island.areaKm2) }}
          </div>
          
          <div 
            v-if="island.establishedYear" 
            class="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-50 text-slate-800 rounded-full text-xs font-medium"
            aria-label="Year established"
          >
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Est. {{ island.establishedYear }}
          </div>
        </div>

        <!-- CTA -->
        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
          <span class="text-sm text-slate-500">
            Explore this island
          </span>
          <NuxtLink
            :to="`/islands/${island.slug}`"
            class="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 group-hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            :aria-label="`Explore ${island.name || 'this island'}`"
            @click="handleView(island)"
          >
            <span>Explore</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  islands: {
    type: Array,
    required: true,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  columns: {
    type: [Number, String],
    default: 3,
    validator: (value) => [1, 2, 3, 4].includes(Number(value))
  }
})

const emit = defineEmits(['view'])

const currentImage = ref({})
const placeholderImage = '/images/island-placeholder.jpg'

// Use a simple fallback if placeholder image doesn't exist
const defaultPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZCQjI0Ii8+CjxwYXRoIGQ9Ik0xMDAsMTUwIEMxNTAsMTAwIDI1MCwxMDAgMzAwLDE1MCBDMjUwLDIwMCAxNTAsMjAwIDEwMCwxNTAgWiIgZmlsbD0iI0Y1OUIwQiIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMDAiIHI9IjIwIiBmaWxsPSIjREM0NkI2Ii8+Cjwvc3ZnPgo='

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
function handleImageError(islandId) {
  currentImage.value[islandId] = defaultPlaceholder
}

/**
 * Handle view action
 */
function handleView(island) {
  emit('view', island)
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>