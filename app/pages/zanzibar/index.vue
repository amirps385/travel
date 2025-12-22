<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 1) HERO SECTION -->
    <section class="relative h-[80vh] w-full overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1563482776068-4dac10f9373d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Zanzibar white sand beach with turquoise water"
          class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-linear-to-b from-gray-900/90 via-gray-900/70 to-gray-900/30"></div>
      </div>
      
      <div class="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl text-center text-white">
          <h1 class="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Zanzibar
          </h1>
          <p class="mx-auto mb-10 max-w-2xl text-xl font-light leading-relaxed text-gray-100">
            Where powder-white beaches meet vibrant Swahili culture. The perfect tropical escape after your Tanzanian safari adventure.
          </p>
          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button 
              @click="scrollToSection('experiences')"
              class="rounded-2xl bg-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-amber-600 hover:shadow-xl focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Browse Experiences
            </button>
            <button 
              @click="scrollToSection('inquiry')"
              class="rounded-2xl border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div class="h-8 w-0.5 bg-white"></div>
      </div>
    </section>

    <!-- 2) QUICK HIGHLIGHTS STRIP -->
    <section class="bg-white py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div class="rounded-2xl bg-linear-to-br from-amber-50 to-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">🏝️</div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900">Beaches</h3>
            <p class="text-sm text-gray-600">World-class white sands & turquoise waters</p>
          </div>
          
          <div class="rounded-2xl bg-linear-to-br from-amber-50 to-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">🕌</div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900">Culture</h3>
            <p class="text-sm text-gray-600">Rich Swahili history & spice trade heritage</p>
          </div>
          
          <div class="rounded-2xl bg-linear-to-br from-amber-50 to-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">🐠</div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900">Snorkeling</h3>
            <p class="text-sm text-gray-600">Vibrant coral reefs & marine life</p>
          </div>
          
          <div class="rounded-2xl bg-linear-to-br from-amber-50 to-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">💑</div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900">Honeymoon</h3>
            <p class="text-sm text-gray-600">Romantic escapes & luxury resorts</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3) "CHOOSE YOUR ZANZIBAR STYLE" -->
    <section class="py-16 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
            Choose Your Zanzibar Style
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the different faces of Zanzibar. Each region offers unique experiences tailored to different travel preferences.
          </p>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <!-- North Coast Card -->
          <div class="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="absolute top-4 right-4 z-10">
              <div class="h-12 w-12 rounded-full bg-linear-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-md">
                <span class="text-xl text-white">🌅</span>
              </div>
            </div>
            <div class="p-6 pt-12">
              <div class="mb-4">
                <span class="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                  VIBRANT BEACHES
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">North Coast</h3>
              <p class="text-sm text-blue-600 font-medium mb-4">Nungwi & Kendwa</p>
              <div class="h-1 w-12 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full mb-4"></div>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed">
                Lively beaches, spectacular sunsets, and vibrant nightlife. Perfect for social travelers seeking entertainment and family fun.
              </p>
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Best for nightlife & sunset views</span>
                </div>
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Family-friendly resorts</span>
                </div>
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Water sports & diving</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6">
              <button @click="filterByRegion('North')" class="w-full rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 text-sm transition-colors duration-200 group-hover:shadow-inner">
                Explore North Coast
              </button>
            </div>
          </div>
          
          <!-- East Coast Card -->
          <div class="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="absolute top-4 right-4 z-10">
              <div class="h-12 w-12 rounded-full bg-linear-to-br from-emerald-400 to-green-400 flex items-center justify-center shadow-md">
                <span class="text-xl text-white">🏄</span>
              </div>
            </div>
            <div class="p-6 pt-12">
              <div class="mb-4">
                <span class="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                  ADVENTURE ZONE
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">East Coast</h3>
              <p class="text-sm text-emerald-600 font-medium mb-4">Paje & Jambiani</p>
              <div class="h-1 w-12 bg-linear-to-r from-emerald-400 to-green-400 rounded-full mb-4"></div>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed">
                World-class kite-surfing, natural tidal pools, and authentic village experiences for the adventurous traveler.
              </p>
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Kite-surfing capital</span>
                </div>
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Cultural immersion</span>
                </div>
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Natural tidal pools</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6">
              <button @click="filterByRegion('East')" class="w-full rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium py-3 text-sm transition-colors duration-200 group-hover:shadow-inner">
                Explore East Coast
              </button>
            </div>
          </div>
          
          <!-- Stone Town Card -->
          <div class="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="absolute top-4 right-4 z-10">
              <div class="h-12 w-12 rounded-full bg-linear-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-md">
                <span class="text-xl text-white">🏛️</span>
              </div>
            </div>
            <div class="p-6 pt-12">
              <div class="mb-4">
                <span class="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-100">
                  CULTURAL HUB
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Stone Town</h3>
              <p class="text-sm text-amber-600 font-medium mb-4">Historic Center</p>
              <div class="h-1 w-12 bg-linear-to-r from-amber-400 to-orange-400 rounded-full mb-4"></div>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed">
                UNESCO World Heritage site with winding alleys, historic architecture, and rich Swahili cultural heritage.
              </p>
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Historic architecture</span>
                </div>
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Spice markets & shopping</span>
                </div>
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Authentic food tours</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6">
              <button @click="filterByRegion('Stone Town')" class="w-full rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium py-3 text-sm transition-colors duration-200 group-hover:shadow-inner">
                Explore Stone Town
              </button>
            </div>
          </div>
          
          <!-- South & Remote Card -->
          <div class="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div class="absolute top-4 right-4 z-10">
              <div class="h-12 w-12 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-md">
                <span class="text-xl text-white">🏝️</span>
              </div>
            </div>
            <div class="p-6 pt-12">
              <div class="mb-4">
                <span class="inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-100">
                  LUXURY ESCAPE
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">South & Remote</h3>
              <p class="text-sm text-purple-600 font-medium mb-4">Unguja & Islands</p>
              <div class="h-1 w-12 bg-linear-to-r from-purple-400 to-pink-400 rounded-full mb-4"></div>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed">
                Secluded luxury eco-resorts, pristine beaches, and ultimate privacy for romantic getaways and honeymoons.
              </p>
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Perfect for honeymoons</span>
                </div>
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Luxury eco-resorts</span>
                </div>
                <div class="flex items-start">
                  <div class="shrink-0 mt-0.5">
                    <div class="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <div class="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                  <span class="ml-3 text-sm text-gray-700">Complete privacy & seclusion</span>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6">
              <button @click="filterByRegion('South')" class="w-full rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium py-3 text-sm transition-colors duration-200 group-hover:shadow-inner">
                Explore South Coast
              </button>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <p class="text-sm text-gray-500">
            Not sure which area suits you best? <a href="#inquiry" class="text-amber-600 font-semibold hover:text-amber-700 underline">Talk to our experts</a>
          </p>
        </div>
      </div>
    </section>

    <!-- 4) FILTERS + EXPERIENCE GRID -->
    <section id="experiences" class="py-16 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-10 text-3xl font-bold text-gray-900 lg:text-4xl">
          Zanzibar Experiences
        </h2>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16">
          <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent"></div>
          <p class="mt-4 text-gray-600">Loading experiences...</p>
        </div>
        
        <!-- Filters (only show when not loading) -->
        <div v-if="!loading" class="mb-10 rounded-2xl bg-linear-to-r from-gray-50 to-white p-6 shadow-sm">
          <div class="mb-6">
            <label for="search" class="mb-2 block text-sm font-medium text-gray-700">Search Experiences</label>
            <input 
              id="search"
              v-model="searchQuery"
              type="text" 
              placeholder="Search by title, description, or highlights..."
              class="w-full rounded-2xl border border-gray-300 px-4 py-3 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          
          <div class="grid gap-6 md:grid-cols-3">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Type</label>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="type in experienceTypes" 
                  :key="type"
                  @click="filters.type = type"
                  :class="[
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    filters.type === type 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ type }}
                </button>
              </div>
            </div>
            
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Region</label>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="region in regions" 
                  :key="region"
                  @click="filters.region = region"
                  :class="[
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    filters.region === region 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ region }}
                </button>
              </div>
            </div>
            
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Duration</label>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="duration in durations" 
                  :key="duration"
                  @click="filters.duration = duration"
                  :class="[
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    filters.duration === duration 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ duration }}
                </button>
              </div>
            </div>
          </div>
          
          <div class="mt-6 flex justify-between">
            <div class="text-sm text-gray-600">
              Showing {{ filteredExperiences.length }} of {{ experiences.length }} experiences
            </div>
            <button 
              @click="resetFilters"
              class="text-sm font-medium text-amber-600 hover:text-amber-800"
            >
              Reset filters
            </button>
          </div>
        </div>
        
        <!-- Experience Grid -->
        <div v-if="!loading" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="experience in filteredExperiences" 
            :key="experience.slug"
            class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div class="relative h-56 overflow-hidden">
              <img 
                :src="getExperienceImage(experience)" 
                :alt="experience.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute right-4 top-4">
                <span :class="[
                  'rounded-full px-3 py-1 text-xs font-semibold text-white',
                  getTypeBadgeClass(experience.type)
                ]">
                  {{ experience.type }}
                </span>
              </div>
              <div class="absolute bottom-4 left-4">
                <span class="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-800 backdrop-blur-sm">
                  {{ experience.durationLabel || 'Custom Duration' }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-900">{{ experience.title }}</h3>
              <p class="mb-4 text-gray-600">{{ getShortDescription(experience) }}</p>
              
              <div class="mb-4 flex flex-wrap gap-2">
                <span v-for="highlight in getHighlights(experience)" :key="highlight" 
                  class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {{ highlight }}
                </span>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-sm text-gray-500">From</span>
                  <span v-if="experience.priceFrom" class="ml-2 text-2xl font-bold text-amber-600">
                    ${{ experience.priceFrom }}
                  </span>
                  <span v-else class="ml-2 text-lg font-medium text-gray-700">Price on request</span>
                </div>
                
                <NuxtLink 
                  :to="`/zanzibar/${experience.slug}`"
                  class="rounded-2xl bg-amber-500 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-amber-600 focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
                >
                  View Details
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="!loading && filteredExperiences.length === 0" class="py-16 text-center">
          <div class="text-5xl mb-4">🔍</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-900">No experiences found</h3>
          <p class="text-gray-600">Try adjusting your filters or search term</p>
        </div>
      </div>
    </section>

    <!-- 5) "WHY ZANZIBAR AFTER SAFARI?" -->
    <section class="py-16 bg-linear-to-b from-gray-50 to-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
          Why Zanzibar After Safari?
        </h2>
        
        <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div class="overflow-hidden rounded-2xl shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Relaxing on Zanzibar beach after safari"
              class="h-full w-full object-cover"
            />
          </div>
          
          <div>
            <div class="space-y-8">
              <div class="flex items-start">
                <div class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <span class="text-xl">🔄</span>
                </div>
                <div>
                  <h3 class="mb-2 text-xl font-semibold text-gray-900">Perfect Contrast</h3>
                  <p class="text-gray-600">
                    After the dust and excitement of safari, Zanzibar offers pure relaxation on pristine beaches, creating the ideal balanced vacation.
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <span class="text-xl">🌊</span>
                </div>
                <div>
                  <h3 class="mb-2 text-xl font-semibold text-gray-900">Marine Adventure</h3>
                  <p class="text-gray-600">
                    Swap land animals for marine life! Snorkel with dolphins, swim with turtles, and explore vibrant coral reefs just offshore.
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <span class="text-xl">🌶️</span>
                </div>
                <div>
                  <h3 class="mb-2 text-xl font-semibold text-gray-900">Cultural Immersion</h3>
                  <p class="text-gray-600">
                    Experience the rich Swahili culture, spice plantations, and historic Stone Town—a complete cultural contrast to safari life.
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <span class="text-xl">✈️</span>
                </div>
                <div>
                  <h3 class="mb-2 text-xl font-semibold text-gray-900">Easy Transition</h3>
                  <p class="text-gray-600">
                    Quick, direct flights from all major safari destinations. Seamlessly extend your Tanzanian adventure without complicated travel logistics.
                  </p>
                </div>
              </div>
            </div>
            
            <div class="mt-10 rounded-2xl bg-linear-to-r from-blue-50 to-cyan-50 p-6">
              <p class="font-medium text-gray-800">
                <span class="text-amber-600">Pro Tip:</span> Most travelers add 3–5 nights in Zanzibar after their 5–7 day safari for the perfect balanced itinerary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6) FAQ SECTION -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
          Frequently Asked Questions
        </h2>
        
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="rounded-2xl border border-gray-200"
          >
            <button 
              @click="toggleFaq(index)"
              class="flex w-full items-center justify-between p-6 text-left"
              :aria-expanded="faq.open"
              :aria-controls="`faq-${index}`"
            >
              <h3 class="text-lg font-semibold text-gray-900">{{ faq.question }}</h3>
              <span class="ml-4 text-2xl text-amber-600">
                {{ faq.open ? '−' : '+' }}
              </span>
            </button>
            
            <div 
              v-if="faq.open"
              :id="`faq-${index}`"
              class="px-6 pb-6"
            >
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7) FINAL CTA -->
    <section id="inquiry" class="relative overflow-hidden py-20">
      <div class="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-amber-900/70"></div>
      
      <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="mb-6 text-4xl font-bold text-white lg:text-5xl">
            Ready for Your Zanzibar Escape?
          </h2>
          <p class="mx-auto mb-10 max-w-2xl text-xl text-gray-200">
            Let our Zanzibar experts craft your perfect post-safari relaxation or island adventure.
          </p>
          
          <div class="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button 
              class="rounded-2xl bg-amber-500 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-amber-600 hover:shadow-xl focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Talk to an Expert
            </button>
            <button 
              class="rounded-2xl border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              INQUIRE NOW
            </button>
          </div>
          
          <!-- Trust Strip -->
          <div class="grid grid-cols-1 gap-8 rounded-2xl bg-white/10 p-8 backdrop-blur-sm sm:grid-cols-3">
            <div class="text-center">
              <div class="mb-2 text-3xl">🛡️</div>
              <h4 class="mb-1 font-semibold text-white">Licensed Operator</h4>
              <p class="text-sm text-gray-200">Fully licensed by Tanzanian Tourism Board</p>
            </div>
            
            <div class="text-center">
              <div class="mb-2 text-3xl">🔒</div>
              <h4 class="mb-1 font-semibold text-white">No Hidden Fees</h4>
              <p class="text-sm text-gray-200">Transparent pricing with all taxes included</p>
            </div>
            
            <div class="text-center">
              <div class="mb-2 text-3xl">☎️</div>
              <h4 class="mb-1 font-semibold text-white">24/7 Support</h4>
              <p class="text-sm text-gray-200">Dedicated support during your entire trip</p>
            </div>
          </div>
          
          <p class="mt-8 text-sm text-gray-300">
            ZAFS Tours is a registered Tanzanian tour operator specializing in Zanzibar & safari experiences since 2012.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Real data from API
const experiences = ref([])
const loading = ref(true)
const error = ref(null)

// Filter options - Will be populated dynamically
const experienceTypes = ref(['All'])
const regions = ref(['All'])
const durations = ref(['All'])

// BACKEND-COMPATIBLE MAPPING
// Maps frontend filter values to backend data values
const backendRegionMapping = {
  'North': ['Nungwi', 'Kendwa', 'Matemwe', 'North', 'Northern', 'north'],
  'East': ['Paje', 'Jambiani', 'East', 'Eastern', 'east'],
  'Stone Town': ['Stone Town', 'Stone town', 'Zanzibar Town', 'Stonetown'],
  'South': ['Kizimkazi', 'Mnemba', 'South', 'Southern', 'south', 'Unguja']
}

const backendDurationMapping = {
  // Frontend "Half-day" maps to these backend values
  'Half-day': [
    'Half Day (≤4h)', 'Half Day', 'Half day', 'half-day', 'half day',
    'morning', 'afternoon', '3-4 hours', '3–4 hours', '2-3 hours', 
    '2–3 hours', 'half', '≤4h', 'Half-day', 'Half Day tour'
  ],
  
  // Frontend "Full-day" maps to these backend values
  'Full-day': [
    'Full Day (≈8h)', 'Full Day', 'Full day', 'full-day', 'full day',
    'day trip', 'all day', '6-8 hours', '6–8 hours', '8-10 hours',
    '8–10 hours', 'full', '≈8h', 'Full-day', 'Day tour'
  ],
  
  // Frontend "2–4 nights" maps to these backend values
  '2–4 nights': [
    '2 Days', '3–4 Days', '2-4 nights', '2–4 nights', '2-4 days',
    '2–4 days', '2 nights', '3 nights', '4 nights', '2-3 nights',
    '3-4 nights', '2-4', '2 days', '3 days', '4 days'
  ],
  
  // Frontend "5–7 nights" maps to these backend values (INCLUDES "5+ Days")
  '5–7 nights': [
    '5+ Days', '5-7 nights', '5–7 nights', '5-7 days', '5–7 days',
    '5 nights', '6 nights', '7 nights', 'week', '5-6 nights',
    '6-7 nights', '5+', '5 days', '6 days', '7 days', '5+ Days',
    '5 Days', '6 Days', '7 Days'
  ]
}

// Also map specific backend values to simplified categories
const backendToFrontendDuration = {
  'Half Day (≤4h)': 'Half-day',
  'Full Day (≈8h)': 'Full-day',
  '1 Day': 'Full-day',
  '2 Days': '2–4 nights',
  '3–4 Days': '2–4 nights',
  '5+ Days': '5–7 nights'
}

// Reactive state
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const filters = ref({
  type: 'All',
  region: 'All',
  duration: 'All'
})

// FAQ data
const faqs = ref([
  {
    question: 'What is the best time to visit Zanzibar?',
    answer: 'The best time is during the dry seasons: June to October and December to February. These months offer sunny weather with less humidity and minimal rainfall, perfect for beach activities and excursions.',
    open: false
  },
  {
    question: 'Do I need a visa for Zanzibar?',
    answer: 'Most visitors require a Tanzanian visa, which covers both mainland Tanzania and Zanzibar. Many nationalities can obtain a visa on arrival or apply for an e-visa online before travel. Always check current requirements with your embassy.',
    open: false
  },
  {
    question: 'How many days should I spend in Zanzibar after safari?',
    answer: 'We recommend 3-5 nights for a good balance. This allows time for relaxation, a few excursions, and experiencing different parts of the island. For a more immersive experience, 5-7 nights is ideal.',
    open: false
  },
  {
    question: 'Is Zanzibar safe for tourists?',
    answer: 'Yes, Zanzibar is generally safe for tourists. Exercise normal precautions as you would in any tourist destination. Our guides accompany you on all excursions, and we provide 24/7 support throughout your stay.',
    open: false
  },
  {
    question: 'What should I pack for Zanzibar?',
    answer: 'Light clothing, swimwear, sunscreen, hat, mosquito repellent, comfortable walking shoes for Stone Town, and modest clothing for visiting cultural sites. Don\'t forget your camera and waterproof case for water activities!',
    open: false
  }
])

// Fetch ALL experiences ONCE
async function fetchAllExperiences() {
  try {
    loading.value = true
    error.value = null
    
    const response = await $fetch('/api/zanzibar')
    
    if (response && response.success) {
      experiences.value = response.data || []
      // Update filter options dynamically based on actual backend data
      updateFilterOptionsFromBackend()
    } else {
      experiences.value = []
      error.value = 'Failed to load experiences'
    }
  } catch (err) {
    console.error('Error fetching experiences:', err)
    experiences.value = []
    error.value = err.message || 'Failed to load experiences. Please try again.'
  } finally {
    loading.value = false
  }
}

// Update filter options based on actual backend data
function updateFilterOptionsFromBackend() {
  if (!experiences.value.length) return
  
  // Get unique types from experiences
  const uniqueTypes = [...new Set(experiences.value
    .map(exp => exp.type)
    .filter(Boolean)
    .sort())]
  
  if (uniqueTypes.length > 0) {
    experienceTypes.value = ['All', ...uniqueTypes]
  }
  
  // Get unique regions from experiences and map to simplified categories
  const uniqueRegions = [...new Set(experiences.value
    .map(exp => exp.region)
    .filter(Boolean))]
  
  // Determine which region filter options to show
  const regionOptions = new Set(['All'])
  
  // Check if we have regions that match our simplified categories
  uniqueRegions.forEach(region => {
    const regionLower = region.toLowerCase()
    
    // Map to simplified categories
    if (regionLower.includes('north') || 
        regionLower === 'nungwi' || 
        regionLower === 'kendwa' || 
        regionLower === 'matemwe') {
      regionOptions.add('North')
    } else if (regionLower.includes('east') || 
               regionLower === 'paje' || 
               regionLower === 'jambiani') {
      regionOptions.add('East')
    } else if (regionLower.includes('stone') || 
               regionLower.includes('zanzibar town')) {
      regionOptions.add('Stone Town')
    } else if (regionLower.includes('south') || 
               regionLower === 'kizimkazi' || 
               regionLower === 'mnemba') {
      regionOptions.add('South')
    } else {
      // Keep the original if it doesn't match any category
      regionOptions.add(region)
    }
  })
  
  regions.value = Array.from(regionOptions).sort()
  
  // Get unique durations from experiences and map to simplified categories
  const uniqueDurations = [...new Set(experiences.value
    .map(exp => exp.durationLabel)
    .filter(Boolean))]
  
  const durationOptions = new Set(['All'])
  
  uniqueDurations.forEach(duration => {
    if (!duration) return
    
    const durationLower = duration.toLowerCase()
    
    // Map backend durations to frontend categories
    if (backendToFrontendDuration[duration]) {
      durationOptions.add(backendToFrontendDuration[duration])
    } else if (durationLower.includes('half') || 
               durationLower.includes('morning') || 
               durationLower.includes('afternoon') || 
               durationLower.includes('≤4') ||
               durationLower.includes('3-4') ||
               durationLower.includes('2-3')) {
      durationOptions.add('Half-day')
    } else if (durationLower.includes('full') || 
               durationLower.includes('day trip') || 
               durationLower.includes('all day') ||
               durationLower.includes('≈8') ||
               durationLower.includes('6-8') ||
               durationLower.includes('8-10')) {
      durationOptions.add('Full-day')
    } else if (durationLower.includes('2-4') || 
               durationLower.includes('2–4') || 
               durationLower.includes('2 days') || 
               durationLower.includes('3-4') || 
               durationLower.includes('3–4') ||
               durationLower.includes('2 nights') ||
               durationLower.includes('3 nights') ||
               durationLower.includes('4 nights')) {
      durationOptions.add('2–4 nights')
    } else if (durationLower.includes('5') || 
               durationLower.includes('6') || 
               durationLower.includes('7') || 
               durationLower.includes('+') || 
               durationLower.includes('week') ||
               durationLower.includes('5+')) {
      durationOptions.add('5–7 nights')
    } else {
      // Keep original if no match
      durationOptions.add(duration)
    }
  })
  
  durations.value = Array.from(durationOptions).sort()
}

// Safe search debounce
let searchDebounceTimer = null
watch(searchQuery, () => {
  clearTimeout(searchDebounceTimer)
  searchDebounceTimer = setTimeout(() => {
    debouncedSearchQuery.value = searchQuery.value.trim().toLowerCase()
  }, 300)
})

// Main filtered experiences computed property - BACKEND COMPATIBLE
const filteredExperiences = computed(() => {
  if (!experiences.value.length) return []
  
  let results = [...experiences.value]
  
  // Apply type filter (exact match)
  if (filters.value.type !== 'All') {
    results = results.filter(exp => exp.type === filters.value.type)
  }
  
  // Apply region filter (with backend mapping)
  if (filters.value.region !== 'All') {
    results = results.filter(exp => {
      const expRegion = (exp.region || '').toLowerCase().trim()
      const filterRegion = filters.value.region.toLowerCase()
      
      // Check for exact match first
      if (expRegion === filterRegion) return true
      
      // Check if this region belongs to the filtered category
      const mappedRegions = backendRegionMapping[filters.value.region] || []
      return mappedRegions.some(mappedRegion => 
        mappedRegion.toLowerCase() === expRegion
      )
    })
  }
  
  // Apply duration filter (with backend mapping)
  if (filters.value.duration !== 'All') {
    results = results.filter(exp => {
      const durationLabel = (exp.durationLabel || '').toLowerCase().trim()
      
      if (!durationLabel) return false
      
      // Get all possible backend values for this frontend filter
      const backendValues = backendDurationMapping[filters.value.duration] || []
      
      // Check if durationLabel matches any backend value
      return backendValues.some(backendValue => 
        durationLabel === backendValue.toLowerCase() ||
        durationLabel.includes(backendValue.toLowerCase()) ||
        backendValue.toLowerCase().includes(durationLabel)
      )
    })
  }
  
  // Apply search filter
  if (debouncedSearchQuery.value) {
    const query = debouncedSearchQuery.value
    results = results.filter(exp => {
      const searchText = [
        exp.title || '',
        exp.description || '',
        exp.tagline || '',
        ...(exp.highlights || [])
      ]
      .join(' ')
      .toLowerCase()
      
      return searchText.includes(query)
    })
  }
  
  return results
})

// Filter by region from the "Choose Your Zanzibar Style" section
function filterByRegion(region) {
  filters.value.region = region
  scrollToSection('experiences')
}

// Helper functions
function getExperienceImage(experience) {
  if (experience.heroImage) {
    return experience.heroImage
  } else if (experience.gallery && experience.gallery.length > 0) {
    return experience.gallery[0]
  } else {
    const fallbackImages = {
      'Excursion': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Stay': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Combo': 'https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Private Tour': 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Group Tour': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
    return fallbackImages[experience.type] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
}

function getShortDescription(experience) {
  if (experience.shortDescription) {
    return experience.shortDescription
  } else if (experience.tagline) {
    return experience.tagline
  } else if (experience.description) {
    return experience.description.length > 120 
      ? experience.description.substring(0, 120) + '...' 
      : experience.description
  }
  return 'Experience the beauty of Zanzibar'
}

function getHighlights(experience) {
  if (experience.highlights && experience.highlights.length > 0) {
    return experience.highlights.slice(0, 2)
  } else if (experience.tagline) {
    return experience.tagline.split(/[,.]/).slice(0, 2).map(s => s.trim())
  }
  return ['Zanzibar', 'Experience']
}

function getTypeBadgeClass(type) {
  const classes = {
    'Excursion': 'bg-blue-600',
    'Stay': 'bg-green-600',
    'Combo': 'bg-purple-600',
    'Private Tour': 'bg-indigo-600',
    'Group Tour': 'bg-amber-600'
  }
  return classes[type] || 'bg-gray-600'
}

function toggleFaq(index) {
  faqs.value[index].open = !faqs.value[index].open
}

function resetFilters() {
  filters.value = {
    type: 'All',
    region: 'All',
    duration: 'All'
  }
  searchQuery.value = ''
  debouncedSearchQuery.value = ''
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Initialize
onMounted(() => {
  if (faqs.value.length > 0) {
    faqs.value[0].open = true
  }
  
  fetchAllExperiences()
})
</script>

<style scoped>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Accessibility improvements */
button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>