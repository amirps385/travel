<template>
  <article class="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-amber-200">
    <!-- Image with Safari Overlay -->
    <div class="relative h-64 overflow-hidden">
      <NuxtLink :to="`/tours/${tour.slug}`" class="block h-full">
        <!-- Background Image -->
        <div 
          v-if="tour.images?.[0]" 
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          :style="{ backgroundImage: `url(${tour.images[0]})` }"
        >
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>
          
          <!-- Safari Tree Silhouette -->
          <div class="absolute bottom-0 left-0 right-0 h-20">
            <div class="absolute bottom-0 left-1/4 w-2 h-16 bg-gray-800/50"></div>
            <div class="absolute bottom-12 left-1/4 -ml-8 w-16 h-6 bg-gray-900/50 rounded-full"></div>
          </div>
        </div>
        
        <!-- Fallback -->
        <div v-else class="absolute inset-0 bg-linear-to-br from-emerald-900/90 to-amber-900/80 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-16 h-16 text-amber-300 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01 -2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-amber-100 font-semibold text-sm">Tanzania Adventure</span>
          </div>
        </div>

        <!-- Duration Badge -->
        <div class="absolute top-4 left-4">
          <span class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-emerald-800 border border-emerald-200 shadow-sm">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            {{ tour.duration || '7' }} days
          </span>
        </div>

        <!-- Type Badge -->
        <div class="absolute top-4 right-4 transform rotate-3">
          <span class="px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg">
            {{ getTourType(tour) }}
          </span>
        </div>

        <!-- View Overlay -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="px-4 py-2.5 bg-black/70 backdrop-blur-sm rounded-full border border-amber-300/30">
            <span class="text-white font-medium text-sm flex items-center">
              View Details
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="p-6 relative">
      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
        {{ tour.title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
        {{ tour.overview || 'Experience the wild beauty of Tanzania with our expertly crafted tour.' }}
      </p>

      <!-- Highlights -->
      <div v-if="tour.highlights?.length" class="mb-5">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(highlight, idx) in tour.highlights.slice(0, 2)" 
            :key="idx"
            class="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100"
          >
            <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ highlight }}
          </span>
        </div>
      </div>

      <!-- Price and CTA -->
      <div class="flex items-center justify-between pt-5 border-t border-gray-100">
        <div>
          <div class="text-xs text-gray-500 font-medium">STARTING FROM</div>
          <div class="text-2xl font-bold text-emerald-700">
            ${{ tour.price?.toLocaleString() || '1,200' }}
          </div>
          <div class="text-xs text-gray-500 mt-1">per person</div>
        </div>
        <NuxtLink
          :to="`/tours/${tour.slug}`"
          class="group/btn px-5 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center"
        >
          <span>View Tour</span>
          <svg
            class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- Decorative Bottom Border -->
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <!-- Safari Pattern Overlay -->
    <div class="absolute -top-6 -right-6 w-24 h-24 opacity-5 group-hover:opacity-20 transition-opacity">
      <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
        <path d="M50,20 C60,15 75,20 80,35 C85,50 70,65 50,80 C30,65 15,50 20,35 C25,20 40,15 50,20 Z"/>
      </svg>
    </div>
  </article>
</template>

<script setup>
defineProps({
  tour: {
    type: Object,
    required: true
  }
})

const getTourType = (tour) => {
  const title = tour.title?.toLowerCase() || ''
  if (title.includes('safari') || title.includes('serengeti') || title.includes('ngorongoro')) {
    return 'Safari'
  } else if (title.includes('kilimanjaro') || title.includes('kili') || title.includes('mountain')) {
    return 'Kilimanjaro'
  } else if (title.includes('zanzibar') || title.includes('beach')) {
    return 'Zanzibar'
  }
  return 'Adventure'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>