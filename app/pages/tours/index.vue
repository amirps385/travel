<template>
  <div class="min-h-screen bg-linear-to-b from-emerald-50/30 via-white to-amber-50/20">
    <!-- Premium Hero Section -->
    <div class="relative overflow-hidden bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white">
      <!-- Safari Pattern Overlay -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-1/4 w-32 h-32">
          <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
            <path d="M50,20 C60,15 75,20 80,35 C85,50 70,65 50,80 C30,65 15,50 20,35 C25,20 40,15 50,20 Z"/>
          </svg>
        </div>
        <div class="absolute bottom-20 right-1/3 w-24 h-24">
          <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
            <path d="M30,40 Q50,20 70,40 Q50,60 30,40 Z"/>
          </svg>
        </div>
      </div>
      
      <!-- Background Image -->
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-20"
        style="background-image: url('https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
      ></div>
      
      <div class="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <!-- Breadcrumb -->
        <div class="mb-8">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NuxtLink to="/" class="inline-flex items-center text-emerald-100 hover:text-white transition-colors">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                  Home
                </NuxtLink>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="ml-1 text-emerald-200 font-medium">Tours</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <!-- Hero Content -->
        <div class="max-w-3xl">
          <div class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <svg class="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-semibold text-amber-300">Premium Safari Experiences</span>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Discover <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-amber-200">Tanzania</span> Adventures
          </h1>
          
          <p class="text-xl text-emerald-100 mb-8 max-w-2xl leading-relaxed">
            Explore our handcrafted collection of safari tours, Kilimanjaro climbs, and Zanzibar escapes.
            Each journey is designed to deliver unforgettable African moments.
          </p>
          
          <!-- Stats -->
          <div class="flex flex-wrap gap-6 mb-8">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold">50+</div>
                <div class="text-sm text-emerald-200">Safari Tours</div>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold">15</div>
                <div class="text-sm text-emerald-200">National Parks</div>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-linear-to-br from-sky-500 to-sky-600 flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold">4.9</div>
                <div class="text-sm text-emerald-200">Guest Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Curved Bottom -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-12 text-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity="1"></path>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-12 md:py-16 -mt-4 relative z-10">
      <!-- Search Bar -->
      <div class="mb-12">
        <div class="relative max-w-3xl mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for safaris, Kilimanjaro climbs, Zanzibar beaches..."
            class="w-full pl-14 pr-4 py-4 bg-white border-2 border-emerald-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-xl text-lg transition-all duration-300"
            @input="handleSearch"
          />
          <div class="absolute left-5 top-1/2 transform -translate-y-1/2">
            <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <button
            @click="handleSearch"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-1/4">
          <!-- Mobile Filter Toggle -->
          <div class="lg:hidden mb-6">
            <button
              @click="showMobileFilters = !showMobileFilters"
              class="w-full flex items-center justify-between p-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold"
            >
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"/>
                </svg>
                Filters & Options
              </span>
              <svg 
                class="w-5 h-5 transition-transform" 
                :class="{ 'rotate-180': showMobileFilters }" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

          <!-- Filters -->
          <div :class="['lg:block', showMobileFilters ? 'block' : 'hidden']">
            <TourFilters @filter="handleFilter" />
            
            <!-- Quick Categories -->
            <div class="mt-8 bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h4 class="font-bold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                </svg>
                Quick Categories
              </h4>
              <div class="space-y-2">
                <button
                  v-for="category in quickCategories"
                  :key="category.id"
                  @click="selectCategory(category.id)"
                  :class="[ 'w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 font-medium', activeCategory === category.id ? category.classes.active : category.classes.inactive ]"
                >
                  <div class="flex items-center justify-between">
                    <span>{{ category.name }}</span>
                    <span class="text-xs px-2 py-1 rounded-full bg-white/50">
                      {{ category.count }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tours Content -->
        <div class="lg:w-3/4">
          <!-- Stats Bar -->
          <div class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p class="text-gray-700">
                  Showing <span class="font-bold text-emerald-700">{{ displayedToursNormalized.length }}</span> 
                  of <span class="font-bold text-gray-900">{{ totalTours }}</span> adventures
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  Sorted by: <span class="font-medium text-emerald-600">Most Popular</span>
                </p>
              </div>
              
              <div class="flex items-center space-x-4">
                <!-- View Toggle -->
                <div class="flex items-center space-x-2">
                  <button
                    @click="gridView = false"
                    :class="[ 'p-3 rounded-xl transition-all duration-300', !gridView ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ]"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                  </button>
                  <button
                    @click="gridView = true"
                    :class="[ 'p-3 rounded-xl transition-all duration-300', gridView ? 'bg-emerald-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ]"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </svg>
                  </button>
                </div>
                
                <!-- Sort Dropdown -->
                <div class="relative">
                  <select
                    v-model="sortBy"
                    @change="handleSort"
                    class="pl-4 pr-10 py-3 bg-white border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 appearance-none cursor-pointer font-medium"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration: Short to Long</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg class="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="pending" class="text-center py-20">
            <div class="inline-block">
              <div class="relative">
                <div class="w-24 h-24 border-4 border-emerald-200 rounded-full"></div>
                <div class="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg class="w-10 h-10 text-emerald-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <p class="mt-6 text-gray-600 font-medium text-lg">Discovering Amazing Tours...</p>
              <p class="text-gray-500 text-sm mt-2">Loading premium Tanzania adventures</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-20 bg-linear-to-br from-red-50 to-amber-50 rounded-3xl border-2 border-red-100 p-8">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-red-100 to-amber-100 mb-6">
              <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Unable to Load Tours</h3>
            <p class="text-gray-600 mb-6 max-w-md mx-auto">
              {{ error.message || "We're having trouble loading the tours. Please check your connection or try again." }}
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                @click="refresh" 
                class="px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Try Again
                </span>
              </button>
              <NuxtLink 
                to="/contact" 
                class="px-6 py-3 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
              >
                Contact Support
              </NuxtLink>
            </div>
          </div>

          <!-- Tours Grid -->
          <div v-else-if="displayedToursNormalized?.length">
            <!-- Use the TourCard component for each tour -->
            <div :class="[ 'grid gap-8', gridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1' ]">
              <TourCard
                v-for="tour in displayedToursNormalized"
                :key="tour._id"
                :tour="tour"
                :layout="gridView ? 'grid' : 'list'"
              />
            </div>

            <!-- Load More Button -->
            <div v-if="displayedTours.length < filteredTours.length" class="text-center mt-12">
              <button
                @click="loadMore"
                class="group px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <span class="flex items-center">
                  Load More Tours
                  <svg class="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                </span>
              </button>
              <p class="text-gray-500 text-sm mt-3">
                Showing {{ displayedTours.length }} of {{ filteredTours.length }} tours
              </p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-20">
            <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-gray-100 to-gray-200 mb-6">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">No Tours Found</h3>
            <p class="text-gray-600 max-w-md mx-auto mb-8">
              We couldn't find any tours matching your search criteria. Try adjusting your filters or browse our popular categories.
            </p>
            <div class="flex flex-wrap gap-3 justify-center">
              <button
                @click="resetFilters"
                class="px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
              >
                Reset All Filters
              </button>
              <NuxtLink
                to="/contact"
                class="px-6 py-3 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
              >
                Request Custom Tour
              </NuxtLink>
            </div>
          </div>

          <!-- Use the TourCTA component -->
          <div class="mt-16">
            <TourCTA />
          </div>

          <!-- Trust Badges -->
          <div class="mt-16 bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <h3 class="text-2xl font-bold text-center text-gray-900 mb-8">
              Why Choose <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-amber-600">ZafsTours</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 mb-4 mx-auto">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">Best Price Guarantee</h4>
                <p class="text-gray-600 text-sm">We guarantee the best rates for all our Tanzania tours.</p>
              </div>
              
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-amber-500 to-amber-600 mb-4 mx-auto">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">24/7 Local Support</h4>
                <p class="text-gray-600 text-sm">Our Tanzanian team is always available to assist you.</p>
              </div>
              
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-sky-500 to-sky-600 mb-4 mx-auto">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h4 class="font-bold text-gray-900 mb-2">Flexible Bookings</h4>
                <p class="text-gray-600 text-sm">Easy changes and cancellations with our flexible policies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
// Import components
import TourCard from '~/components/tours/TourCard.vue'
import TourFilters from '~/components/tours/TourFilters.vue'
import TourCTA from '~/components/tours/TourCTA.vue'
import { computed, ref } from 'vue'

// Fetch tours data
const { data, pending, error, refresh } = await useFetch('/api/tours', {
  method: 'get'
})

// Reactive state
const gridView = ref(true)
const showMobileFilters = ref(false)
const searchQuery = ref('')
const sortBy = ref('popular')
const activeCategory = ref('all')
const activeFilters = ref({})
const toursPerPage = ref(9)
const displayedCount = ref(9)

// Quick categories
const quickCategories = ref([
  { id: 'all', name: 'All Tours', count: 48, classes: { active: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500', inactive: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100' } },
  { id: 'safari', name: 'Wildlife Safaris', count: 24, classes: { active: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500', inactive: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' } },
  { id: 'kilimanjaro', name: 'Kilimanjaro Climbs', count: 12, classes: { active: 'bg-gradient-to-r from-slate-600 to-slate-800 text-white border-slate-600', inactive: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100' } },
  { id: 'zanzibar', name: 'Zanzibar Beaches', count: 8, classes: { active: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-500', inactive: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' } },
  { id: 'family', name: 'Family Adventures', count: 6, classes: { active: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500', inactive: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' } },
])

// Computed properties
const tours = computed(() => data.value?.data || [])
const totalTours = computed(() => tours.value.length)

// Filter tours based on active filters and search
const filteredTours = computed(() => {
  let filtered = [...tours.value]
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(tour => 
      tour.title?.toLowerCase().includes(query) ||
      tour.overview?.toLowerCase().includes(query) ||
      tour.route?.toLowerCase().includes(query)
    )
  }
  
  // Category filter
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(tour => {
      const title = tour.title?.toLowerCase() || ''
      if (activeCategory.value === 'safari') {
        return title.includes('safari') || title.includes('serengeti') || title.includes('ngorongoro')
      } else if (activeCategory.value === 'kilimanjaro') {
        return title.includes('kilimanjaro') || title.includes('kili') || title.includes('mountain')
      } else if (activeCategory.value === 'zanzibar') {
        return title.includes('zanzibar') || title.includes('beach') || title.includes('island')
      } else if (activeCategory.value === 'family') {
        return tour.category === 'family' || (tour.overview?.toLowerCase() || '').includes('family')
      }
      return true
    })
  }
  
  // Apply additional filters from TourFilters component
  if (activeFilters.value.duration) {
    filtered = filtered.filter(tour => tour.duration === parseInt(activeFilters.value.duration))
  }
  
  if (activeFilters.value.minPrice || activeFilters.value.maxPrice) {
    const minPrice = activeFilters.value.minPrice || 0
    const maxPrice = activeFilters.value.maxPrice || Infinity
    filtered = filtered.filter(tour => tour.price >= minPrice && tour.price <= maxPrice)
  }
  
  // Sort tours
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
      break
    case 'price-high':
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
      break
    case 'duration':
      filtered.sort((a, b) => ( (a.duration ?? (a.nights != null ? a.nights + 1 : 0)) - (b.duration ?? (b.nights != null ? b.nights + 1 : 0)) ))
      break
    case 'rating':
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case 'popular':
    default:
      // Keep original order or sort by popularity
      break
  }
  
  return filtered
})

// Displayed tours (for pagination)
const displayedTours = computed(() => {
  return filteredTours.value.slice(0, displayedCount.value)
})

// Normalize a single tour to include canonical nights/days and prefer DB fields
function normalizeTour(t) {
  const nightsFromDb = (t?.nights != null) ? Number(t.nights) : null
  const daysFromDb = (t?.duration != null) ? Number(t.duration) : null

  const displayNightsVal = nightsFromDb != null
    ? nightsFromDb
    : (daysFromDb != null ? Math.max(1, daysFromDb - 1) : 6)

  const displayDaysVal = nightsFromDb != null
    ? nightsFromDb + 1
    : (daysFromDb != null ? daysFromDb : 7)

  // return a shallow copy with normalized fields (do not mutate original)
  return {
    ...t,
    _displayNights: displayNightsVal,
    _displayDays: displayDaysVal,
    // ensure `duration` shows days for components expecting days
    duration: displayDaysVal,
    // ensure `nights` exists for components expecting nights
    nights: displayNightsVal
  }
}

// Normalized displayed tours for passing to TourCard (so TourCard / other UI gets consistent fields)
const displayedToursNormalized = computed(() => {
  return displayedTours.value.map(t => normalizeTour(t))
})

// Handlers
const handleFilter = (filters) => {
  activeFilters.value = filters
  // Reset display count when filters change
  displayedCount.value = toursPerPage.value
}

const handleSearch = () => {
  // Reset display count when search changes
  displayedCount.value = toursPerPage.value
}

const handleSort = () => {
  // Reset display count when sorting changes
  displayedCount.value = toursPerPage.value
}

const selectCategory = (categoryId) => {
  activeCategory.value = categoryId
  // Reset display count when category changes
  displayedCount.value = toursPerPage.value
}

const resetFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'all'
  activeFilters.value = {}
  sortBy.value = 'popular'
  displayedCount.value = toursPerPage.value
  // Emit reset to TourFilters component if needed
}

const loadMore = () => {
  displayedCount.value += toursPerPage.value
}

// SEO
useHead({
  title: 'Premium Tanzania Tours & Safaris | ZafsTours',
  meta: [
    { 
      name: 'description', 
      content: 'Discover handcrafted Tanzania tours including Serengeti safaris, Kilimanjaro climbs, Zanzibar beaches, and cultural experiences. Best price guarantee & expert local guides.' 
    },
    { 
      name: 'keywords', 
      content: 'Tanzania tours, Serengeti safari, Kilimanjaro climb, Zanzibar beach holiday, Africa tours, wildlife safari, luxury Tanzania' 
    }
  ]
})

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #059669);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #047857);
}

/* Smooth transitions */
button, a, .transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Safari theme pattern */
.bg-safari-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2310b981' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
