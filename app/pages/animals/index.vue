<!-- app/pages/animals/index.vue -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-28 overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-linear-to-br from-emerald-900 via-emerald-800 to-slate-900"></div>
      
      <!-- Animated Background Elements -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
      
      <!-- Pattern Overlay -->
      <div class="absolute inset-0 opacity-5 bg-pattern"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span class="text-sm text-emerald-100 font-medium tracking-wider">WILDLIFE CONSERVATION</span>
          </div>
          
          <!-- Main Title -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Africa's
            <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-teal-300">Wild Wonders</span>
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-emerald-100/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Journey through the heart of the African wilderness. Meet majestic creatures, learn about their habitats, and join us in conservation efforts.
          </p>
          
          <!-- Stats -->
          <div class="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">{{ animals.length }}+</div>
              <div class="text-sm text-emerald-200/80 uppercase tracking-wider">Species</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div class="text-sm text-emerald-200/80 uppercase tracking-wider">Monitoring</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
              <div class="text-sm text-emerald-200/80 uppercase tracking-wider">Protected</div>
            </div>
          </div>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search animals, habitats, or behaviors..."
                class="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-emerald-100/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <div class="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-emerald-500/20 rounded-lg">
                <span class="text-emerald-300">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-emerald-300/50 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-emerald-300 rounded-full mt-2"></div>
        </div>
      </div>
    </section>

    <!-- Animals Grid Section -->
    <section class="py-20 md:py-28 bg-linear-to-b from-slate-50 to-white">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <div class="w-16 h-1 bg-linear-to-r from-emerald-400 to-teal-400 rounded-full"></div>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Meet Our Wildlife
            <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Family</span>
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Each species plays a vital role in our ecosystem. Explore their unique characteristics and conservation stories.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-3 justify-center mb-12">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectedCategory = category.value"
            :class="[
              'px-5 py-2.5 rounded-full font-medium transition-all duration-300',
              selectedCategory === category.value
                ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-emerald-200'
            ]"
          >
            {{ category.label }}
          </button>
        </div>

        <!-- Results Count -->
        <div class="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-1">
                {{ filteredAnimals.length }} Animal{{ filteredAnimals.length !== 1 ? 's' : '' }} Discovered
              </h3>
              <p class="text-slate-500">
                <span v-if="searchQuery">Results for "{{ searchQuery }}"</span>
                <span v-else>Explore our wildlife collection</span>
              </p>
            </div>
            
            <div class="flex gap-3">
              <button
                v-if="searchQuery || selectedCategory"
                @click="clearFilters"
                class="px-5 py-2.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>✕</span>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block relative">
            <div class="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-3xl animate-pulse">🦁</span>
            </div>
          </div>
          <p class="mt-6 text-slate-600 text-lg font-medium">Discovering wildlife...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="inline-block p-8 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100">
            <div class="text-7xl mb-6">🐾</div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3">Connection Lost</h3>
            <p class="text-slate-600 max-w-md mx-auto mb-8">{{ error }}</p>
            <button
              @click="fetchAnimals"
              class="px-8 py-3.5 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- No Results -->
        <div v-else-if="filteredAnimals.length === 0" class="text-center py-20">
          <div class="inline-block p-10 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 max-w-md">
            <div class="text-8xl mb-6">🔍</div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3">No Wildlife Found</h3>
            <p class="text-slate-600 mb-8">
              Try adjusting your search or explore different categories to discover amazing animals.
            </p>
            <button
              @click="clearFilters"
              class="w-full py-3.5 bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300"
            >
              Show All Animals
            </button>
          </div>
        </div>

        <!-- Animals Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="animal in filteredAnimals"
            :key="animal._id"
            class="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-emerald-200"
          >
            <!-- Image Container -->
            <div class="relative h-64 overflow-hidden">
              <img
                :src="animal.featuredImage"
                :alt="animal.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&h=600&fit=crop&q=80'"
              />
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <!-- Category Badge -->
              <div class="absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg bg-white/20 text-white border border-white/30">
                {{ animal.category }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <!-- Scientific Name -->
              <p v-if="animal.scientificName" class="text-emerald-700 font-medium text-sm mb-2 italic">
                {{ animal.scientificName }}
              </p>
              
              <!-- Animal Name -->
              <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors duration-300">
                {{ animal.name }}
              </h3>

              <!-- Description -->
              <p class="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                {{ animal.shortDescription }}
              </p>

              <!-- Stats -->
              <div class="grid grid-cols-2 gap-3 mb-6">
                <div v-if="animal.size?.height" class="bg-emerald-50 rounded-xl p-3">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-emerald-600">📏</span>
                    <span class="text-xs font-semibold text-slate-700">Height</span>
                  </div>
                  <p class="text-sm font-medium text-slate-900">{{ animal.size.height }}</p>
                </div>
                
                <div v-if="animal.size?.weight" class="bg-emerald-50 rounded-xl p-3">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-emerald-600">⚖️</span>
                    <span class="text-xs font-semibold text-slate-700">Weight</span>
                  </div>
                  <p class="text-sm font-medium text-slate-900">{{ animal.size.weight }}</p>
                </div>
              </div>

              <!-- Action Button -->
              <button
                @click="viewAnimal(animal.slug)"
                class="w-full py-3.5 px-4 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-200"
              >
                <span>Explore Details</span>
                <span class="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>

            <!-- Hover Effect -->
            <div class="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>
          </div>
        </div>

        <!-- Load More -->
        <div v-if="filteredAnimals.length > 0" class="text-center mt-16">
          <div class="inline-flex items-center gap-4 text-slate-500">
            <span class="w-32 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent"></span>
            <span class="text-sm font-medium">Showing {{ filteredAnimals.length }} of {{ animals.length }} amazing creatures</span>
            <span class="w-32 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-28 bg-linear-to-r from-slate-900 to-emerald-900">
      <div class="max-w-6xl mx-auto px-4 lg:px-6">
        <div class="text-center">
          <!-- Icon -->
          <div class="inline-block p-4 bg-emerald-500/20 rounded-2xl mb-8">
            <div class="text-4xl">🌍</div>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Conservation Mission
          </h2>
          
          <p class="text-xl text-emerald-100/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Every animal deserves a protected habitat. Your support helps us monitor populations, protect ecosystems, and educate communities.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-lg">
              Support Wildlife
            </button>
            <button class="px-8 py-4 bg-transparent border-2 border-emerald-400 text-white font-bold rounded-xl hover:bg-emerald-400/10 transition-all duration-300">
              Learn About Conservation
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const animals = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('')

const categories = [
  { value: '', label: 'All Animals' },
  { value: 'Big Five', label: 'Big Five' },
  { value: 'Mammal', label: 'Mammals' },
  { value: 'Bird', label: 'Birds' },
  { value: 'Reptile', label: 'Reptiles' },
  { value: 'Predator', label: 'Predators' },
]

const viewAnimal = (slug) => {
  navigateTo(`/animals/${slug}`)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
}

async function fetchAnimals() {
  try {
    loading.value = true
    error.value = null
    const data = await $fetch('/api/animals')
    animals.value = data || []
  } catch (err) {
    console.error('Error:', err)
    error.value = 'Unable to connect to wildlife database. Please try again.'
    animals.value = []
  } finally {
    loading.value = false
  }
}

const filteredAnimals = computed(() => {
  if (!animals.value.length) return []
  
  return animals.value.filter(animal => {
    const matchesSearch = !searchQuery.value || 
      animal.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      animal.scientificName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      animal.shortDescription?.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !selectedCategory.value || 
      animal.category === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })
})

onMounted(() => {
  fetchAnimals()
})
</script>

<style scoped>
/* Pattern Background */
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #0d9488);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #0f766e);
}
</style>