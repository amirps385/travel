<template>
  <div class="min-h-screen bg-linear-to-b from-emerald-50/20 via-white to-amber-50/10">
    <!-- Breadcrumb Navigation -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-emerald-100">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink to="/" class="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                Home
              </NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <NuxtLink to="/tours" class="ml-1 text-gray-700 hover:text-emerald-700 transition-colors">Tours</NuxtLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="ml-1 font-medium text-emerald-700 truncate max-w-xs">
                  {{ tour?.title || 'Loading...' }}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="max-w-7xl mx-auto px-4 py-16">
      <div class="text-center">
        <div class="relative inline-block">
          <div class="w-32 h-32 border-4 border-emerald-100 rounded-full"></div>
          <div class="w-32 h-32 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg class="w-12 h-12 text-emerald-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        <h2 class="mt-8 text-2xl font-bold text-gray-900">Discovering Your Adventure</h2>
        <p class="mt-2 text-gray-600">Loading premium tour details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 py-16">
      <div class="text-center bg-linear-to-br from-red-50 to-amber-50 rounded-3xl border-2 border-red-100 p-12 max-w-2xl mx-auto">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-red-100 to-amber-100 mb-8">
          <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Tour Not Found</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          {{ error.message || "The adventure you're looking for doesn't exist or may have moved." }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/tours" 
            class="group px-6 py-3.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span class="flex items-center">
              Browse All Tours
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="px-6 py-3.5 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-300"
          >
            Contact Our Experts
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Tour Content -->
    <div v-else-if="tour" class="max-w-7xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
        <!-- Background Image -->
        <div 
          v-if="tour.images?.[0]"
          class="aspect-21/9 bg-cover bg-center relative"
          :style="{ backgroundImage: `url('${tour.images[0]}')` }"
        >
          <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>
          <div class="absolute inset-0 bg-linear-to-r from-black/30 to-transparent"></div>
          
          <!-- Safari Pattern Overlay -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute bottom-10 left-10 w-32 h-32">
              <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
                <path d="M50,20 C60,15 75,20 80,35 C85,50 70,65 50,80 C30,65 15,50 20,35 C25,20 40,15 50,20 Z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Fallback Image -->
        <div v-else class="aspect-21/9 bg-linear-to-br from-emerald-900 via-emerald-800 to-amber-900 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-32 h-32 text-amber-300/50 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <div class="text-amber-100 font-bold text-lg">Tanzania Adventure</div>
          </div>
        </div>

        <!-- Content Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div class="max-w-4xl">
            <!-- Tour Type Badge -->
            <div class="inline-flex items-center px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <svg class="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-white font-bold">{{ getTourType(tour) }}</span>
            </div>
            
            <!-- Title -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {{ tour.title }}
            </h1>
            
            <!-- Meta Information -->
            <div class="flex flex-wrap items-center gap-6 text-white/90 mb-8">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-bold text-lg">{{ tour.duration || '7' }} days</div>
                  <div class="text-sm text-white/70">Duration</div>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-bold text-lg">{{ tour.route || 'Tanzania' }}</div>
                  <div class="text-sm text-white/70">Destination</div>
                </div>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-bold text-lg">${{ tour.price?.toLocaleString() || '1,200' }}</div>
                  <div class="text-sm text-white/70">Per Person</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Action Button -->
        <div class="absolute top-6 right-6">
          <button
            @click="scrollToBooking"
            class="group px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-0.5 flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Book Now
            <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-12">
          <!-- Overview Section -->
          <section class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Tour Overview</h2>
                <p class="text-gray-600">Everything you need to know about this adventure</p>
              </div>
            </div>
            
            <div class="prose max-w-none text-gray-700 leading-relaxed space-y-6">
              <p class="text-lg text-gray-800">
                {{ tour.overview || 'Embark on an unforgettable journey through the heart of Tanzania, where breathtaking landscapes meet incredible wildlife experiences.' }}
              </p>
              
              <!-- Additional Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div class="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                  <h3 class="font-bold text-emerald-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                    Key Locations
                  </h3>
                  <p class="text-gray-700">{{ getKeyLocations(tour) }}</p>
                </div>
                
                <div class="bg-amber-50 rounded-xl p-6 border border-amber-100">
                  <h3 class="font-bold text-amber-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                    </svg>
                    Best Time to Visit
                  </h3>
                  <p class="text-gray-700">{{ getBestTime(tour) }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Highlights Section -->
          <section class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Tour Highlights</h2>
                <p class="text-gray-600">Unforgettable moments that make this tour special</p>
              </div>
            </div>
            
            <div v-if="tour.highlights?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="(highlight, index) in tour.highlights" 
                :key="index"
                class="group bg-linear-to-br from-white to-emerald-50 rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg"
              >
                <div class="flex items-start">
                  <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <span class="font-bold text-emerald-600">{{ index + 1 }}</span>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 mb-2">{{ highlight }}</h3>
                    <p class="text-gray-600 text-sm">
                      Experience this unique aspect of your Tanzania adventure with our expert guides.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-12 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Discover the Adventure</h3>
              <p class="text-gray-600 max-w-md mx-auto mb-6">
                Highlights for this tour will be updated soon. Contact us for personalized highlights.
              </p>
            </div>
          </section>

          <!-- Gallery Section -->
          <section v-if="tour.images?.length > 1" class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-sky-500 to-sky-600 flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">Photo Gallery</h2>
                  <p class="text-gray-600">A glimpse into your Tanzania adventure</p>
                </div>
              </div>
              
              <button
                @click="openLightbox(0)"
                class="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All Photos
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div 
                v-for="(image, index) in tour.images.slice(1, 7)" 
                :key="index"
                class="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                @click="openLightbox(index + 1)"
              >
                <img
                  :src="image"
                  :alt="`${tour.title} - Image ${index + 2}`"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div class="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Itinerary Section -->
          <section class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.414L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Daily Itinerary</h2>
                <p class="text-gray-600">Day-by-day breakdown of your adventure</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div 
                v-for="day in getSampleItinerary(tour)" 
                :key="day.day"
                class="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6"
              >
                <div class="flex items-start">
                  <div class="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-4 shrink-0">
                    <span class="text-white font-bold">Day {{ day.day }}</span>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 text-lg mb-2">{{ day.title }}</h3>
                    <p class="text-gray-700">{{ day.description }}</p>
                    <div class="flex flex-wrap gap-2 mt-4">
                      <span 
                        v-for="activity in day.activities" 
                        :key="activity"
                        class="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100"
                      >
                        <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        {{ activity }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Booking Card -->
          <div class="sticky top-6 space-y-8">
            <!-- Price Card -->
            <div class="bg-linear-to-br from-emerald-50 to-white rounded-2xl shadow-xl border border-emerald-200 p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Book This Tour</h3>
              
              <!-- Price -->
              <div class="mb-8">
                <div class="flex items-baseline mb-2">
                  <span class="text-4xl font-bold text-emerald-700">${{ tour.price?.toLocaleString() || '1,200' }}</span>
                  <span class="text-gray-600 ml-2">per person</span>
                </div>
                <div class="text-sm text-emerald-600 font-medium flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Best Price Guarantee
                </div>
              </div>
              
              <!-- CTA Buttons -->
              <div class="space-y-4">
                <NuxtLink
                  to="/contact"
                  class="group block w-full py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  <span class="flex items-center justify-center">
                    Enquire Now
                    <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </span>
                </NuxtLink>
                
                <a
                  :href="`https://wa.me/255620285462?text=Hi%20ZafsTours,%20I'm%20interested%20in%20your%20tour:%20${encodeURIComponent(tour.title)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group block w-full py-4 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all duration-300 text-center"
                >
                  <span class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"/>
                    </svg>
                    Quick Questions? Chat Now
                  </span>
                </a>
              </div>
              
              <!-- Trust Badges -->
              <div class="mt-8 pt-8 border-t border-emerald-200">
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-center">
                    <svg class="w-8 h-8 text-emerald-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <div class="text-xs text-gray-600">Secure Booking</div>
                  </div>
                  <div class="text-center">
                    <svg class="w-8 h-8 text-amber-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clip-rule="evenodd"/>
                    </svg>
                    <div class="text-xs text-gray-600">Flexible Dates</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Facts -->
            <div class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h4 class="font-bold text-gray-900 mb-6 text-lg">Quick Facts</h4>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Tour Type</span>
                  <span class="font-bold text-emerald-700">{{ getTourType(tour) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Duration</span>
                  <span class="font-bold text-gray-900">{{ tour.duration || '7' }} days</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Difficulty</span>
                  <span class="font-bold" :class="getDifficultyColor(tour)">
                    {{ getDifficulty(tour) }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Group Size</span>
                  <span class="font-bold text-gray-900">2-12 people</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Best Season</span>
                  <span class="font-bold text-gray-900">{{ getSeason(tour) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Age Range</span>
                  <span class="font-bold text-gray-900">{{ getAgeRange(tour) }}</span>
                </div>
              </div>
            </div>

            <!-- Included -->
            <div class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h4 class="font-bold text-gray-900 mb-6 text-lg">What's Included</h4>
              <ul class="space-y-3">
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>All Accommodation</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Professional Guides</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Park Fees & Permits</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>All Meals</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Airport Transfers</span>
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Transportation</span>
                </li>
              </ul>
            </div>

            <!-- Need Help -->
            <div class="bg-linear-to-br from-sky-50 to-white rounded-2xl border border-sky-100 p-6">
              <h4 class="font-bold text-gray-900 mb-4">Need Help?</h4>
              <p class="text-gray-600 text-sm mb-6">
                Our Tanzania experts are here to answer your questions.
              </p>
              <a
                href="tel:+255620285462"
                class="flex items-center justify-center w-full py-3 bg-white text-sky-600 font-bold rounded-xl border-2 border-sky-200 hover:bg-sky-50 transition-all duration-300"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Call: +255 620 285 462
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Tours -->
      <section v-if="relatedTours.length" class="mt-24">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">You Might Also Like</h2>
            <p class="text-gray-600">Explore similar adventures in Tanzania</p>
          </div>
          <NuxtLink 
            to="/tours" 
            class="flex items-center text-emerald-600 hover:text-emerald-700 font-bold"
          >
            View All Tours
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Related tours would be rendered here -->
          <!-- You can use TourCard component if you adapt it -->
          <div 
            v-for="relatedTour in relatedTours" 
            :key="relatedTour._id"
            class="group bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <!-- Image -->
            <div class="aspect-video overflow-hidden">
              <img
                :src="relatedTour.images?.[0] || '/images/placeholder.jpg'"
                :alt="relatedTour.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <!-- Content -->
            <div class="p-6">
              <h3 class="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                {{ relatedTour.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-4">
                {{ relatedTour.overview }}
              </p>
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-lg font-bold text-emerald-700">
                    ${{ relatedTour.price?.toLocaleString() || '1,200' }}
                  </div>
                  <div class="text-sm text-gray-500">{{ relatedTour.duration || '7' }} days</div>
                </div>
                <NuxtLink 
                  :to="`/tours/${relatedTour.slug}`"
                  class="px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                >
                  View Tour
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <div class="mt-24">
        <TourCTA />
      </div>
    </div>

    <!-- Premium Lightbox -->
    <div
      v-if="lightboxOpen && tour?.images"
      class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <!-- Close Button -->
      <button
        @click="closeLightbox"
        class="absolute top-6 right-6 text-white hover:text-amber-300 transition-colors z-10"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      
      <!-- Previous Button -->
      <button
        v-if="lightboxIndex > 0"
        @click.stop="prevImage"
        class="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
      >
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <!-- Next Button -->
      <button
        v-if="lightboxIndex < tour.images.length - 1"
        @click.stop="nextImage"
        class="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
      >
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      
      <!-- Image Counter -->
      <div class="absolute top-6 left-6 text-white font-medium z-10">
        {{ lightboxIndex + 1 }} / {{ tour.images.length }}
      </div>
      
      <!-- Image Container -->
      <div class="relative max-w-6xl w-full max-h-[85vh]" @click.stop>
        <img
          :src="tour.images[lightboxIndex]"
          :alt="`${tour.title} - Image ${lightboxIndex + 1}`"
          class="w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// Import components
import TourCTA from '~/components/tours/TourCTA.vue'

const route = useRoute()
const slug = route.params.slug

// Fetch tour data
const { data, pending, error, refresh } = await useFetch(`/api/tours/${slug}`, {
  method: 'get'
})

const tour = computed(() => data.value?.data || null)

// Lightbox state
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const nextImage = () => {
  if (tour.value?.images && lightboxIndex.value < tour.value.images.length - 1) {
    lightboxIndex.value++
  }
}

const prevImage = () => {
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--
  }
}

// Scroll to booking section
const scrollToBooking = () => {
  const bookingCard = document.querySelector('.sticky.top-6')
  if (bookingCard) {
    bookingCard.scrollIntoView({ behavior: 'smooth' })
  }
}

// Helper functions
const getTourType = (tour) => {
  const title = tour.title?.toLowerCase() || ''
  if (title.includes('safari') || title.includes('serengeti') || title.includes('ngorongoro')) {
    return 'Wildlife Safari'
  } else if (title.includes('kilimanjaro') || title.includes('kili') || title.includes('mountain')) {
    return 'Kilimanjaro Climb'
  } else if (title.includes('zanzibar') || title.includes('beach') || title.includes('island')) {
    return 'Zanzibar Beach'
  } else if (title.includes('cultural') || title.includes('tribe') || title.includes('maasai')) {
    return 'Cultural Experience'
  }
  return 'Adventure Tour'
}

const getDifficulty = (tour) => {
  const title = tour.title?.toLowerCase() || ''
  if (title.includes('kilimanjaro') || title.includes('summit') || title.includes('climb')) {
    return 'Challenging'
  } else if (title.includes('safari') || title.includes('trek') || title.includes('walk')) {
    return 'Moderate'
  } else if (title.includes('zanzibar') || title.includes('beach') || title.includes('relax')) {
    return 'Easy'
  }
  return 'Moderate'
}

const getDifficultyColor = (tour) => {
  const difficulty = getDifficulty(tour)
  switch (difficulty) {
    case 'Easy': return 'text-emerald-600'
    case 'Moderate': return 'text-amber-600'
    case 'Challenging': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

const getKeyLocations = (tour) => {
  const title = tour.title?.toLowerCase() || ''
  if (title.includes('serengeti')) return 'Serengeti, Ngorongoro, Tarangire'
  if (title.includes('kilimanjaro')) return 'Kilimanjaro National Park'
  if (title.includes('zanzibar')) return 'Stone Town, Nungwi, Paje'
  return 'Multiple locations across Tanzania'
}

const getBestTime = (tour) => {
  const type = getTourType(tour)
  switch (type) {
    case 'Wildlife Safari': return 'June to October (Dry Season)'
    case 'Kilimanjaro Climb': return 'January-March, June-October'
    case 'Zanzibar Beach': return 'June to October, December to February'
    default: return 'Year-round'
  }
}

const getSeason = (tour) => {
  return getBestTime(tour).split('(')[0].trim()
}

const getAgeRange = (tour) => {
  const difficulty = getDifficulty(tour)
  switch (difficulty) {
    case 'Challenging': return '18-65 years'
    case 'Moderate': return '12-70 years'
    case 'Easy': return 'All ages'
    default: return 'All ages'
  }
}

const getSampleItinerary = (tour) => {
  const duration = tour.duration || 7
  const type = getTourType(tour)
  
  const itineraries = {
    'Wildlife Safari': [
      { day: 1, title: 'Arrival in Arusha', description: 'Arrive at Kilimanjaro International Airport, transfer to your lodge, and briefing with your safari guide.', activities: ['Airport Pickup', 'Orientation', 'Lodge Check-in'] },
      { day: 2, title: 'Tarangire National Park', description: 'Full day game drive in Tarangire, famous for its large elephant herds and baobab trees.', activities: ['Game Drive', 'Wildlife Viewing', 'Photography'] },
      { day: 3, title: 'Ngorongoro Conservation Area', description: 'Descend into the Ngorongoro Crater for incredible wildlife viewing in this natural amphitheater.', activities: ['Crater Descent', 'Big Five Safari', 'Picnic Lunch'] },
      { day: 4, title: 'Serengeti National Park', description: 'Travel to the endless plains of Serengeti, home to the Great Migration.', activities: ['Game Drive', 'Migration Viewing', 'Sunset Safari'] },
      { day: 5, title: 'Serengeti Exploration', description: 'Full day exploring different regions of Serengeti with morning and afternoon game drives.', activities: ['Full Day Safari', 'Predator Tracking', 'Bush Lunch'] },
      { day: 6, title: 'Serengeti to Arusha', description: 'Morning game drive in Serengeti before returning to Arusha for your final night.', activities: ['Morning Safari', 'Cultural Visit', 'Farewell Dinner'] },
      { day: 7, title: 'Departure', description: 'Transfer to airport for your departure flight, taking memories of an unforgettable safari.', activities: ['Airport Transfer', 'Safari Memories'] }
    ],
    'Kilimanjaro Climb': [
      { day: 1, title: 'Arrival & Preparation', description: 'Arrive in Moshi, meet your guide team, and prepare equipment for the climb ahead.', activities: ['Gear Check', 'Briefing', 'Acclimatization'] },
      { day: 2, title: 'Start the Ascent', description: 'Begin your climb through rainforest to the first camp, spotting colobus monkeys along the way.', activities: ['Rainforest Trek', 'Wildlife Spotting', 'Camp Setup'] },
      { day: 3, title: 'Heath and Moorland', description: 'Ascend through changing vegetation zones as you adapt to the increasing altitude.', activities: ['Altitude Acclimatization', 'Scenic Views', 'Team Bonding'] },
      { day: 4, title: 'Acclimatization Day', description: 'Active rest day with short hikes to aid acclimatization before the summit push.', activities: ['Rest Day', 'Short Hike', 'Preparation'] },
      { day: 5, title: 'Summit Preparation', description: 'Final preparation day before the summit attempt, focusing on rest and mental preparation.', activities: ['Final Prep', 'Equipment Check', 'Early Rest'] },
      { day: 6, title: 'Summit Day', description: 'The big day! Begin the midnight ascent to reach Uhuru Peak at sunrise.', activities: ['Midnight Ascent', 'Sunrise at Summit', 'Achievement'] },
      { day: 7, title: 'Descent & Celebration', description: 'Descend to the gate, receive certificates, and celebrate your achievement.', activities: ['Certificate Ceremony', 'Celebration', 'Departure'] }
    ]
  }
  
  return itineraries[type]?.slice(0, duration) || Array.from({ length: duration }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1}: Adventure Continues`,
    description: 'Experience the wonders of Tanzania with guided activities and exploration.',
    activities: ['Guided Tour', 'Local Experience', 'Adventure']
  }))
}

// Mock related tours
const relatedTours = ref([
  {
    _id: '1',
    slug: 'serengeti-migration-safari',
    title: 'Great Migration Safari',
    overview: 'Witness millions of wildebeest and zebra crossing the Serengeti plains in this spectacular wildlife event.',
    images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    duration: 8,
    price: 2800
  },
  {
    _id: '2',
    slug: 'lemosho-route-8d',
    title: 'Lemosho Route Kilimanjaro',
    overview: 'Most scenic route with excellent acclimatization. Highest success rate for summit attempts.',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    duration: 8,
    price: 2400
  },
  {
    _id: '3',
    slug: 'zanzibar-beach-paradise',
    title: 'Zanzibar Beach Paradise',
    overview: 'Relax on pristine white sand beaches with turquoise waters. Perfect combination of relaxation and culture.',
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    duration: 6,
    price: 1200
  }
])

// Keyboard navigation for lightbox
onMounted(() => {
  const handleKeyDown = (event) => {
    if (!lightboxOpen.value || !tour.value?.images) return

    if (event.key === 'Escape') {
      closeLightbox()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      nextImage()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prevImage()
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
})

// SEO
useHead({
  title: tour.value ? `${tour.value.title} - Premium Tanzania Tour | ZafsTours` : 'Tour Details - ZafsTours Tanzania',
  meta: [
    {
      name: 'description',
      content: tour.value?.overview || 'Premium Tanzania tour package with ZafsTours. Experience the best of wildlife safaris, Kilimanjaro climbs, and cultural experiences.'
    },
    {
      property: 'og:image',
      content: tour.value?.images?.[0] || '/images/social-default.jpg'
    }
  ]
})

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
/* Custom scrollbar for lightbox */
body.lightbox-open {
  overflow: hidden;
}

/* Smooth transitions */
.prose p {
  margin-bottom: 1em;
  line-height: 1.7;
}

/* Safari theme pattern */
.bg-safari-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2310b981' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>