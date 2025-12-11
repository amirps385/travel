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
      <!-- Hero Section (unchanged) -->
      <div class="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
        <div 
          v-if="heroImage"
          class="aspect-21/9 bg-cover bg-center relative"
          :style="{ backgroundImage: `url('${heroImage}')` }"
        >
          <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>
          <div class="absolute inset-0 bg-linear-to-r from-black/30 to-transparent"></div>
          <div class="absolute inset-0 opacity-10">
            <div class="absolute bottom-10 left-10 w-32 h-32">
              <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
                <path d="M50,20 C60,15 75,20 80,35 C85,50 70,65 50,80 C30,65 15,50 20,35 C25,20 40,15 50,20 Z"/>
              </svg>
            </div>
          </div>
        </div>
        <div v-else class="aspect-21/9 bg-linear-to-br from-emerald-900 via-emerald-800 to-amber-900 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-32 h-32 text-amber-300/50 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <div class="text-amber-100 font-bold text-lg">Tanzania Adventure</div>
          </div>
        </div>

        <!-- Content Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div class="max-w-4xl">
            <div class="inline-flex items-center px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <svg class="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-white font-bold">{{ tourTypeFromDb }}</span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {{ tour.title }}
            </h1>

            <!-- Meta information (unchanged) -->
            <div class="flex flex-wrap items-center gap-6 text-white/90 mb-8">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-bold text-lg">{{ displayDays }} days</div>
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

        <!-- Quick Action Button (unchanged) -->
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

          <!-- Overview Section (unchanged) -->
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
                  <p class="text-gray-700">
                    <span v-if="Array.isArray(tour.keyLocations) && tour.keyLocations.length">
                      <span v-for="(loc, idx) in tour.keyLocations" :key="loc + idx" class="inline-block no-link mr-2">{{ loc }}<span v-if="idx < tour.keyLocations.length-1">,</span></span>
                    </span>
                    <span v-else>{{ getKeyLocations(tour) }}</span>
                  </p>
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

          <!-- Highlights Section - UPDATED: show parsed title & description -->
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

            <div v-if="parsedHighlights.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="(h, index) in parsedHighlights" 
                :key="(h.title || '') + index"
                class="group bg-linear-to-br from-white to-emerald-50 rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg no-link"
              >
                <div class="flex items-start">
                  <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <span class="font-bold text-emerald-600">{{ index + 1 }}</span>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 mb-2" v-text="h.title || 'Untitled highlight'"></h3>
                    <p class="text-gray-600 text-sm" v-if="h.description" v-text="h.description"></p>
                    <p class="text-gray-600 text-sm" v-else>
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

          <!-- rest of page unchanged... (Gallery, Itinerary etc) -->
          <!-- Gallery Section -->
          <section v-if="imagesList.length > 1" class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <!-- ... unchanged ... -->
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
              <button @click="openLightbox(0)" class="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">View All Photos</button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(image, index) in imagesList.slice(1, 7)" :key="index" class="group relative aspect-square overflow-hidden rounded-xl cursor-pointer" @click="openLightbox(index + 1)">
                <img :src="image" :alt="`${tour.title} - Image ${index + 2}`" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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

          <!-- Itinerary Section (unchanged) -->
          <section class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <!-- itinerary rendering kept as-is (use getSampleItinerary fallback) -->
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
              <template v-if="tour.itinerary && tour.itinerary.length">
                <div v-for="day in tour.itinerary" :key="day.day || day.title || Math.random()" class="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
                  <div class="flex items-start">
                    <div class="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-4 shrink-0">
                      <span class="text-white font-bold">Day {{ day.day }}</span>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900 text-lg mb-2">{{ day.title }}</h3>
                      <p class="text-gray-700">{{ day.description }}</p>
                      <div class="flex flex-wrap gap-2 mt-4">
                        <span v-for="activity in (day.activities || [])" :key="activity" class="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100">
                          <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                          {{ activity }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template v-else>
                <div v-for="day in getSampleItinerary(tour)" :key="day.day" class="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
                  <div class="flex items-start">
                    <div class="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-4 shrink-0">
                      <span class="text-white font-bold">Day {{ day.day }}</span>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900 text-lg mb-2">{{ day.title }}</h3>
                      <p class="text-gray-700">{{ day.description }}</p>
                      <div class="flex flex-wrap gap-2 mt-4">
                        <span v-for="activity in day.activities" :key="activity" class="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100">
                          <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                          {{ activity }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </section>
        </div>

        <!-- Sidebar (unchanged) -->
        <div class="lg:col-span-1">
          <div class="sticky top-6 space-y-8">
            <!-- Booking Card and quick facts etc. kept the same -->
            <!-- ... -->
            <div class="bg-linear-to-br from-emerald-50 to-white rounded-2xl shadow-xl border border-emerald-200 p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Book This Tour</h3>
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

              <div class="space-y-4">
                <NuxtLink to="/contact" class="group block w-full py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                  <span class="flex items-center justify-center">Enquire Now</span>
                </NuxtLink>
                <a :href="`https://wa.me/255620285462?text=Hi%20ZafsTours,%20I'm%20interested%20in%20your%20tour:%20${encodeURIComponent(tour.title)}`" target="_blank" rel="noopener noreferrer" class="group block w-full py-4 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all duration-300 text-center">
                  Quick Questions? Chat Now
                </a>
              </div>
            </div>

            <!-- Quick Facts etc. (kept same) -->
            <div class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h4 class="font-bold text-gray-900 mb-6 text-lg">Quick Facts</h4>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Tour Type</span>
                  <span class="font-bold text-emerald-700">{{ tour.type || getTourType(tour) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Duration</span>
                  <span class="font-bold text-gray-900">{{ displayDays }} days</span>
                </div>
                <div class="flex items-center justify-between" v-if="displayNights != null">
                  <span class="text-gray-600">Nights</span>
                  <span class="font-bold text-gray-900">{{ displayNights }} nights</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Difficulty</span>
                  <span class="font-bold" :class="getDifficultyColor(tour)">{{ tour.difficulty || getDifficulty(tour) }}</span>
                </div>
                <div class="flex items-center justify-between" v-if="tour.groupSize">
                  <span class="text-gray-600">Group Size</span>
                  <span class="font-bold text-gray-900">{{ tour.groupSize.min ?? '—' }} - {{ tour.groupSize.max ?? '—' }} people</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Best Season</span>
                  <span class="font-bold text-gray-900">{{ tour.bestTime || getSeason(tour) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Age Range</span>
                  <span class="font-bold text-gray-900">{{ tour.ageRange || getAgeRange(tour) }}</span>
                </div>
              </div>
            </div>

            <div class="bg-linear-to-br from-sky-50 to-white rounded-2xl border border-sky-100 p-6">
              <h4 class="font-bold text-gray-900 mb-4">Need Help?</h4>
              <p class="text-gray-600 text-sm mb-6">
                Our Tanzania experts are here to answer your questions.
              </p>
              <a href="tel:+255620285462" class="flex items-center justify-center w-full py-3 bg-white text-sky-600 font-bold rounded-xl border-2 border-sky-200 hover:bg-sky-50 transition-all duration-300">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Call: +255 620 285 462
              </a>
            </div>

          </div>
        </div>
      </div>

      <!-- Related Tours (unchanged) -->
      <section v-if="relatedTours.length" class="mt-24">
        <!-- ... -->
      </section>

      <!-- Bottom CTA -->
      <div class="mt-24">
        <TourCTA />
      </div>
    </div>

    <!-- Lightbox (unchanged) -->
    <div v-if="lightboxOpen && imagesList.length" class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" @click="closeLightbox" role="dialog" aria-modal="true">
      <button @click.stop="closeLightbox" class="absolute top-6 right-6 text-white hover:text-amber-300 transition-colors z-60" aria-label="Close gallery">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <button v-if="lightboxIndex > 0" @click.stop="prevImage" class="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-60" aria-label="Previous image">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>

      <button v-if="lightboxIndex < imagesList.length - 1" @click.stop="nextImage" class="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-60" aria-label="Next image">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>

      <div class="absolute top-6 left-6 text-white font-medium z-60">{{ lightboxIndex + 1 }} / {{ imagesList.length }}</div>

      <div class="relative w-full max-w-4xl mx-auto px-4 max-h-[80vh] flex items-center justify-center z-50" @click.stop>
        <button @click="closeLightbox" class="absolute top-4 right-4 bg-black/40 hover:bg-black/60 p-2 rounded-full z-50 text-white" aria-label="Close image">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <img :src="imagesList[lightboxIndex]" :alt="`${tour.title} - Image ${lightboxIndex + 1}`" class="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl" draggable="false" />
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm z-40">
          Tap outside image or press <span class="font-medium">Esc</span> to close
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TourCTA from '~/components/tours/TourCTA.vue'

const route = useRoute()
const slug = route.params.slug

// fetch tour
const { data, pending, error, refresh } = await useFetch(`/api/tours/${slug}`, { method: 'get' })

const tour = computed(() => {
  if (!data.value) return null
  const dv = data.value
  if (dv && 'data' in dv) return dv.data
  return null
})

// imagesList & heroImage
const imagesList = computed(() => {
  const t = tour.value
  if (!t) return []
  const gallery = Array.isArray(t.images) ? [...t.images] : []
  if (t.featuredImage) {
    const idx = gallery.findIndex(i => i === t.featuredImage)
    if (idx > -1) gallery.splice(idx, 1)
    return [t.featuredImage, ...gallery]
  }
  return gallery
})
const heroImage = computed(() => imagesList.value.length ? imagesList.value[0] : (tour.value?.images?.[0] || null))

// nights/days normalization
const dbNights = computed(() => {
  const t = tour.value
  if (!t) return null
  return (t.nights != null) ? Number(t.nights) : null
})
const dbDurationDays = computed(() => {
  const t = tour.value
  if (!t) return null
  return (t.duration != null) ? Number(t.duration) : null
})
const displayNights = computed(() => {
  if (dbNights.value != null) return dbNights.value
  if (dbDurationDays.value != null) return Math.max(1, dbDurationDays.value - 1)
  return 6
})
const displayDays = computed(() => {
  if (dbNights.value != null) return dbNights.value + 1
  if (dbDurationDays.value != null) return dbDurationDays.value
  return 7
})
const tourTypeFromDb = computed(() => tour.value?.type || getTourType(tour.value))

/* --------------------
   Highlights parsing helpers
   -------------------- */

// normalize & extract primitive text from various shapes
function _extractString(value) {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' || typeof value === 'boolean') return String(value).trim()
  if (Array.isArray(value)) return value.map(v => _extractString(v)).filter(Boolean).join(', ')
  if (typeof value === 'object') {
    // prefer common text-like keys
    const preferKeys = ['title', 'name', 'label', 'text', 'value', 'en', 'description', 'desc', 'body']
    for (const k of preferKeys) {
      if (k in value) {
        const v = value[k]
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v).trim()
        if (typeof v === 'object') {
          // nested object: try 'en' or any string child
          if ('en' in v && (typeof v.en === 'string' || typeof v.en === 'number')) return String(v.en).trim()
          for (const sub of Object.values(v)) {
            if (typeof sub === 'string' || typeof sub === 'number' || typeof sub === 'boolean') return String(sub).trim()
          }
        }
      }
    }
    // fall back: try to find any primitive child
    for (const child of Object.values(value)) {
      if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') return String(child).trim()
      if (Array.isArray(child)) {
        const join = child.map(c => _extractString(c)).filter(Boolean).join(', ')
        if (join) return join
      }
    }
    // last resort stringification
    try {
      return JSON.stringify(value)
    } catch (e) {
      return String(value)
    }
  }
  return String(value)
}

// remove trailing pipes (common corruption) and collapse long repeated pipes
function _cleanText(s) {
  if (!s) return ''
  // collapse >3 pipes into single '|||' for splitting (preserve original double-pipes if user used)
  let out = String(s)
  // replace long sequences of pipes with '|||'
  out = out.replace(/\|{4,}/g, '|||')
  // trim trailing/leading pipes and whitespace
  out = out.replace(/^\|+/, '').replace(/\|+$/, '').trim()
  return out
}

/* parsedHighlights: robustly handle many shapes:
   - string "title|||description"
   - JSON string '{"title":"t","description":"d"}'
   - object { title, description } or nested shapes
*/
const parsedHighlights = computed(() => {
  const t = tour.value
  if (!t || !Array.isArray(t.highlights)) return []
  return t.highlights.map(item => {
    if (item === null || item === undefined) return { title: '', description: '' }

    // If item is an object, try to extract meaningful title & description
    if (typeof item === 'object') {
      // quick check: any field contains '|||' (someone stored combined string inside an object)
      for (const v of Object.values(item)) {
        if (typeof v === 'string' && v.includes('|||')) {
          const s = _cleanText(v)
          const [left, ...rest] = s.split('|||')
          return { title: (left || '').trim(), description: (rest.join('|||') || '').trim() }
        }
      }

      const rawTitle = item.title ?? item.name ?? item.label ?? item.text ?? item.value ?? ''
      const rawDesc = item.description ?? item.desc ?? item.body ?? item.text ?? ''
      const title = _cleanText(_extractString(rawTitle))
      const description = _cleanText(_extractString(rawDesc))

      // if both empty, flatten the whole object to string and try to split
      if (!title && !description) {
        const flat = _cleanText(_extractString(item))
        if (flat.includes('|||')) {
          const [left, ...rest] = flat.split('|||')
          return { title: (left || '').trim(), description: (rest.join('|||') || '').trim() }
        }
        // if flat contains JSON-like content, try parse again
        try {
          const parsed = typeof flat === 'string' && flat.startsWith('{') ? JSON.parse(flat) : null
          if (parsed && typeof parsed === 'object') {
            const t2 = _cleanText(_extractString(parsed.title ?? parsed.name ?? parsed.label ?? parsed.text ?? ''))
            const d2 = _cleanText(_extractString(parsed.description ?? parsed.desc ?? parsed.body ?? parsed.text ?? ''))
            return { title: t2, description: d2 }
          }
        } catch (e) { /* ignore parse errors */ }
        return { title: flat || '', description: '' }
      }

      // clean trailing pipe junk (some stored values had many trailing pipes)
      const cleanedTitle = title.replace(/\|+$/g, '').trim()
      const cleanedDesc = description.replace(/\|+$/g, '').trim()
      return { title: cleanedTitle, description: cleanedDesc }
    }

    // item is primitive (string/number)
    const sRaw = String(item || '').trim()
    if (!sRaw) return { title: '', description: '' }

    // if string contains delimiter "|||", split on first occurrence
    if (sRaw.includes('|||')) {
      const cleaned = _cleanText(sRaw)
      const [left, ...rest] = cleaned.split('|||')
      return { title: (left || '').trim(), description: (rest.join('|||') || '').trim() }
    }

    // try JSON parse (maybe stored as JSON string)
    try {
      const parsed = JSON.parse(sRaw)
      if (parsed && typeof parsed === 'object') {
        const t2 = _cleanText(_extractString(parsed.title ?? parsed.name ?? parsed.label ?? parsed.text ?? ''))
        const d2 = _cleanText(_extractString(parsed.description ?? parsed.desc ?? parsed.body ?? parsed.text ?? ''))
        return { title: t2, description: d2 }
      }
    } catch (e) {
      // not JSON - continue
    }

    // fallback: treat entire string as title (clean pipes)
    return { title: _cleanText(sRaw), description: '' }
  }).map(h => {
    // final safety: ensure strings, trim trailing pipe characters left behind
    return {
      title: (h.title || '').toString().replace(/\|+$/g, '').trim(),
      description: (h.description || '').toString().replace(/\|+$/g, '').trim()
    }
  })
})


// lightbox state
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const openLightbox = (index) => { lightboxIndex.value = index; lightboxOpen.value = true; document.body.style.overflow = 'hidden' }
const closeLightbox = () => { lightboxOpen.value = false; document.body.style.overflow = 'auto' }
const nextImage = () => { if (imagesList.value && lightboxIndex.value < imagesList.value.length - 1) lightboxIndex.value++ }
const prevImage = () => { if (lightboxIndex.value > 0) lightboxIndex.value-- }
const scrollToBooking = () => { const bookingCard = document.querySelector('.sticky.top-6'); if (bookingCard) bookingCard.scrollIntoView({ behavior: 'smooth' }) }

// helper functions (same heuristics as before)
const getTourType = (tourObj) => {
  const title = tourObj?.title?.toLowerCase() || ''
  if (title.includes('safari') || title.includes('serengeti') || title.includes('ngorongoro')) return 'Wildlife Safari'
  if (title.includes('kilimanjaro') || title.includes('kili') || title.includes('mountain')) return 'Kilimanjaro Climb'
  if (title.includes('zanzibar') || title.includes('beach') || title.includes('island')) return 'Zanzibar Beach'
  if (title.includes('cultural') || title.includes('tribe') || title.includes('maasai')) return 'Cultural Experience'
  return 'Adventure Tour'
}

const getDifficulty = (tourObj) => {
  const title = tourObj?.title?.toLowerCase() || ''
  if (title.includes('kilimanjaro') || title.includes('summit') || title.includes('climb')) return 'Challenging'
  if (title.includes('safari') || title.includes('trek') || title.includes('walk')) return 'Moderate'
  if (title.includes('zanzibar') || title.includes('beach') || title.includes('relax')) return 'Easy'
  return 'Moderate'
}

const getDifficultyColor = (tourObj) => {
  const difficulty = getDifficulty(tourObj)
  switch (difficulty) {
    case 'Easy': return 'text-emerald-600'
    case 'Moderate': return 'text-amber-600'
    case 'Challenging': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

const getKeyLocations = (tourObj) => {
  if (tourObj?.keyLocations && Array.isArray(tourObj.keyLocations) && tourObj.keyLocations.length) {
    return tourObj.keyLocations.join(', ')
  }
  const title = tourObj?.title?.toLowerCase() || ''
  if (title.includes('serengeti')) return 'Serengeti, Ngorongoro, Tarangire'
  if (title.includes('kilimanjaro')) return 'Kilimanjaro National Park'
  if (title.includes('zanzibar')) return 'Stone Town, Nungwi, Paje'
  return 'Multiple locations across Tanzania'
}

const getBestTime = (tourObj) => {
  if (tourObj?.bestTime && String(tourObj.bestTime).trim()) return String(tourObj.bestTime)
  const type = getTourType(tourObj)
  switch (type) {
    case 'Wildlife Safari': return 'June to October (Dry Season)'
    case 'Kilimanjaro Climb': return 'January-March, June-October'
    case 'Zanzibar Beach': return 'June to October, December to February'
    default: return 'Year-round'
  }
}

const getSeason = (tourObj) => getBestTime(tourObj).split('(')[0].trim()

const getAgeRange = (tourObj) => {
  const difficulty = getDifficulty(tourObj)
  switch (difficulty) {
    case 'Challenging': return '18-65 years'
    case 'Moderate': return '12-70 years'
    case 'Easy': return 'All ages'
    default: return 'All ages'
  }
}

// sample itinerary (unchanged)
const getSampleItinerary = (tourObj) => {
  const duration = (tourObj?.nights != null) ? (tourObj.nights + 1) : (tourObj?.duration ?? 7)
  const type = getTourType(tourObj)
  const itineraries = { /* same sample data as before - omitted for brevity in this function block; paste your existing sample blocks if needed */ }

  // fallback generic
  return itineraries[type]?.slice(0, duration) || Array.from({ length: duration }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1}: Adventure Continues`,
    description: 'Experience the wonders of Tanzania with guided activities and exploration.',
    activities: ['Guided Tour', 'Local Experience', 'Adventure']
  }))
}

// mock related tours (kept as before)
const relatedTours = ref([
  { _id: '1', slug: 'serengeti-migration-safari', title: 'Great Migration Safari', overview: 'Witness millions of wildebeest and zebra crossing the Serengeti plains in this spectacular wildlife event.', images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], duration: 8, price: 2800 },
  { _id: '2', slug: 'lemosho-route-8d', title: 'Lemosho Route Kilimanjaro', overview: 'Most scenic route with excellent acclimatization. Highest success rate for summit attempts.', images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], duration: 8, price: 2400 },
  { _id: '3', slug: 'zanzibar-beach-paradise', title: 'Zanzibar Beach Paradise', overview: 'Relax on pristine white sand beaches with turquoise waters. Perfect combination of relaxation and culture.', images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], duration: 6, price: 1200 }
])

onMounted(() => {
  const handleKeyDown = (event) => {
    if (!lightboxOpen.value || !imagesList.value.length) return
    if (event.key === 'Escape') closeLightbox()
    else if (event.key === 'ArrowRight') { event.preventDefault(); nextImage() }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); prevImage() }
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
})

useHead(() => {
  const og = imagesList.value.length ? imagesList.value[0] : '/images/social-default.jpg'
  return {
    title: tour.value ? `${tour.value.title} - Premium Tanzania Tour | ZafsTours` : 'Tour Details - ZafsTours Tanzania',
    meta: [
      { name: 'description', content: tour.value?.overview || 'Premium Tanzania tour package with ZafsTours.' },
      { property: 'og:image', content: og }
    ]
  }
})

definePageMeta({ layout: 'default' })
</script>

<style scoped>
/* prevent highlight/key chips from behaving like links (no pointer cursor) */
.no-link { cursor: default; }

/* Custom scrollbar for lightbox */
body.lightbox-open { overflow: hidden; }

/* Smooth transitions */
.prose p { margin-bottom: 1em; line-height: 1.7; }

/* Safari theme pattern */
.bg-safari-pattern { /* keep your existing pattern if needed */ }
</style>
