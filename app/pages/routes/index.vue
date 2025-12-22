<template>
  <div class="min-h-screen bg-white">
    <!-- HERO -->
    <section
      class="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"
      aria-hidden="false"
    >
      <div
        class="absolute inset-0 z-0"
        :style="{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2340&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      />
      <div class="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/50 to-transparent z-1" />

      <div class="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Kilimanjaro Routes
        </h1>
        <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover the perfect path to Africa's highest peak. Each carefully crafted itinerary
          offers a unique adventure with expert guides and optimal acclimatization.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            @click="scrollToRoutes"
            class="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Compare Routes
          </button>

          <!-- quick selector to demo ItinerarySelector usage on hero -->
          <ItinerarySelector
            :options="[5,6,7,8,9]"
            :selected="selectedDays"
            @update:selected="val => (selectedDays = val)"
            class="w-full sm:w-auto"
          />
        </div>
      </div>
    </section>

    <!-- ROUTES GRID -->
    <section id="routes-grid" class="py-16 px-4 max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-8 gap-4">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-1">Choose Your Adventure</h2>
          <p class="text-gray-600 text-sm md:text-lg max-w-2xl">
            Filter by itinerary length or browse all routes below.
          </p>
        </div>

        <!-- small controls -->
        <div class="flex items-center gap-3">
          <div class="text-sm text-slate-600">Show routes with</div>
          <ItinerarySelector
            :options="[5,6,7,8,9]"
            :selected="selectedDays"
            @update:selected="val => (selectedDays = val)"
          />
          <button v-if="selectedDays !== null" @click="selectedDays = null" class="ml-2 px-3 py-2 bg-slate-50 border rounded-md text-sm">
            Clear
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
          <p class="text-slate-600">Loading routes...</p>
        </div>
      </div>

      <!-- No Routes Found -->
      <div v-else-if="filteredRoutes.length === 0" class="text-center py-16">
        <div class="inline-block p-10 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 max-w-md">
          <div class="text-8xl mb-6">🏕️</div>
          <h3 class="text-2xl font-bold text-slate-900 mb-3">No routes found</h3>
          <p class="text-slate-600 mb-8">Try selecting a different number of days or clear filters.</p>
          <button @click="selectedDays = null" class="px-6 py-2 bg-slate-50 border rounded-lg">Reset filters</button>
        </div>
      </div>

      <!-- Routes Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <RouteCard 
          v-for="r in filteredRoutes" 
          :key="r._id" 
          :route="{
            _id: r._id,
            name: r.name,
            slug: r.slug,
            image: r.featuredImage || r.heroImage || r.gallery?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=60',
            durationMin: r.durationMin || extractDurationNumbers(r.duration)[0] || 5,
            durationMax: r.durationMax || extractDurationNumbers(r.duration)[1] || r.durationMin || 8,
            difficulty: r.difficulty,
            startingPrice: r.startingPrice,
            shortDescription: r.shortDescription || r.tagline || 'Experience this amazing trekking route.',
            duration: r.duration,
            tagline: r.tagline,
            successRate: r.successRate,
            featuredImage: r.featuredImage,
            heroImage: r.heroImage,
            gallery: r.gallery
          }" 
        />
      </div>
    </section>

    <!-- INFO STRIP -->
    <section class="bg-linear-to-r from-gray-900 to-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Fully Customizable</h3>
            <p class="text-gray-300">All routes can be tailored to your preferences, fitness level, and schedule.</p>
          </div>

          <div class="text-center">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Private & Group Climbs</h3>
            <p class="text-gray-300">Join a group expedition or book a private climb with your own team.</p>
          </div>

          <div class="text-center">
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Expert Local Guides</h3>
            <p class="text-gray-300">Climb with certified guides who have hundreds of successful summits.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import RouteCard from '~/components/routes/RouteCard.vue'
import ItinerarySelector from '~/components/routes/ItinerarySelector.vue'

const routes = ref([])
const loading = ref(true)
const selectedDays = ref(null)

// Helper function to extract numbers from duration string
const extractDurationNumbers = (duration = '') => {
  if (!duration) return [0, 0]
  const matches = duration.match(/\d+/g)
  if (!matches) return [0, 0]
  return matches.map(Number).slice(0, 2)
}

// Fetch routes from API
async function fetchRoutes() {
  try {
    loading.value = true
    const response = await $fetch('/api/routes')
    
    if (response.success) {
      // Filter only active routes for public display
      routes.value = response.data.filter(route => route.isActive === true)
    } else {
      routes.value = []
      console.error('Failed to fetch routes:', response)
    }
  } catch (error) {
    console.error('Error fetching routes:', error)
    routes.value = []
  } finally {
    loading.value = false
  }
}

// Filter routes based on selected days
const filteredRoutes = computed(() => {
  if (!selectedDays.value) return routes.value
  
  return routes.value.filter(r => {
    const min = Number(r.durationMin || extractDurationNumbers(r.duration)[0] || 0)
    const max = Number(r.durationMax || extractDurationNumbers(r.duration)[1] || min || 0)
    
    // If we have both min and max, check if selectedDays falls within range
    if (min && max) {
      return selectedDays.value >= min && selectedDays.value <= max
    }
    
    // If only min is available, check if selectedDays is >= min
    if (min) {
      return selectedDays.value >= min
    }
    
    return false
  })
})

// Helper to scroll to routes section
const scrollToRoutes = () => {
  const el = document.getElementById('routes-grid')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Fetch routes when component mounts
onMounted(() => {
  fetchRoutes()
})

// Optionally refetch when page becomes visible again
if (process.client) {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      fetchRoutes()
    }
  })
}
</script>

<style scoped>
.bg-linear-to-r {
  background-image: linear-gradient(90deg, #0f1724 0%, #0b3f3b 100%);
}
.bg-linear-to-br {
  background-image: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
}
.relative.z-1 {
  z-index: 1;
}
</style>