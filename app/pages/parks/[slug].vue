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
                <NuxtLink to="/parks" class="ml-1 text-gray-700 hover:text-emerald-700 transition-colors">Parks</NuxtLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="ml-1 font-medium text-emerald-700 truncate max-w-xs">
                  {{ park?.name || 'Loading...' }}
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
        <h2 class="mt-8 text-2xl font-bold text-gray-900">Discovering the Park</h2>
        <p class="mt-2 text-gray-600">Loading park details...</p>
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
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Park Not Found</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          {{ error.message || "The park you're looking for doesn't exist or may have moved." }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/parks" 
            class="group px-6 py-3.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span class="flex items-center">
              Browse All Parks
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

    <!-- Park Content -->
    <div v-else-if="park" class="max-w-7xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="relative rounded-3xl overflow-hidden shadow-2xl mb-12 mt-6 max-w-7xl mx-auto">
        <div 
          class="aspect-21/9 bg-cover bg-center relative"
          :style="{ backgroundImage: `url('${park.featuredImage || defaultImage}')` }"
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

        <!-- Content Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div class="max-w-4xl">
            <div class="inline-flex items-center px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <svg class="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-white font-bold">{{ park.category || 'National Park' }}</span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {{ park.name }}
            </h1>

            <!-- Meta information -->
            <div class="flex flex-wrap items-center gap-6 text-white/90 mb-8">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-bold text-lg">{{ park.region }}</div>
                  <div class="text-sm text-white/70">Region</div>
                </div>
              </div>

              <div v-if="park.establishedYear" class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-bold text-lg">Est. {{ park.establishedYear }}</div>
                  <div class="text-sm text-white/70">Established</div>
                </div>
              </div>

              <div v-if="park.areaKm2" class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                  </svg>
                </div>
                <div>
                  <div class="font-bold text-lg">{{ park.areaKm2.toLocaleString() }} km²</div>
                  <div class="text-sm text-white/70">Area</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Action Button -->
        <div class="absolute top-6 right-6">
          <button
            @click="scrollToActivities"
            class="group px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-0.5 flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
            View Activities
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
                <h2 class="text-2xl font-bold text-gray-900">Park Overview</h2>
                <p class="text-gray-600">Everything you need to know about {{ park.name }}</p>
              </div>
            </div>
            
            <div class="prose max-w-none text-gray-700 leading-relaxed space-y-6">
              <p class="text-lg text-gray-800">
                {{ park.shortDescription }}
              </p>
              
              <!-- Full Description -->
              <div class="mt-8 pt-8 border-t border-gray-100">
                <h3 class="text-xl font-bold text-gray-900 mb-4">About {{ park.name }}</h3>
                <p class="text-gray-700 whitespace-pre-line">{{ park.description }}</p>
              </div>

              <!-- Climate & Landscape -->
              <div v-if="park.climate || park.landscape" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div v-if="park.climate" class="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                  <h3 class="font-bold text-emerald-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm4.657 2.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm3 6a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2zM12 19a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-7.657-2.343a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM17.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707z" clip-rule="evenodd"/>
                    </svg>
                    Climate
                  </h3>
                  <p class="text-gray-700">{{ park.climate }}</p>
                </div>
                
                <div v-if="park.landscape" class="bg-amber-50 rounded-xl p-6 border border-amber-100">
                  <h3 class="font-bold text-amber-800 mb-3 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                    </svg>
                    Landscape
                  </h3>
                  <p class="text-gray-700">{{ park.landscape }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Best Time to Visit -->
          <section v-if="park.bestTimeToVisit" class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.414L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Best Time to Visit</h2>
                <p class="text-gray-600">Optimal seasons for wildlife viewing and activities</p>
              </div>
            </div>

            <div class="bg-linear-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 p-6">
              <div class="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-lg font-bold text-emerald-800 mb-4">Recommended Period</h3>
                  <div class="space-y-4">
                    <div class="flex items-center">
                      <div class="w-3 h-3 rounded-full bg-emerald-500 mr-3"></div>
                      <div>
                        <div class="font-medium text-gray-700">From</div>
                        <div class="font-bold text-gray-900 text-lg">{{ formatDate(park.bestTimeToVisit.from) }}</div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div class="w-3 h-3 rounded-full bg-teal-500 mr-3"></div>
                      <div>
                        <div class="font-medium text-gray-700">To</div>
                        <div class="font-bold text-gray-900 text-lg">{{ formatDate(park.bestTimeToVisit.to) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-lg font-bold text-amber-800 mb-4">Visit Notes</h3>
                  <p class="text-gray-700">{{ park.bestTimeToVisit.notes }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Wildlife Highlights -->
          <section v-if="park.wildlifeHighlights?.length" class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Wildlife Highlights</h2>
                <p class="text-gray-600">Iconic species you can encounter in {{ park.name }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div
                v-for="(animal, index) in park.wildlifeHighlights"
                :key="index"
                class="group bg-linear-to-br from-white to-emerald-50 rounded-xl border border-emerald-100 hover:border-emerald-300 p-4 text-center transition-all duration-300"
              >
                <div class="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {{ getAnimalEmoji(animal) }}
                </div>
                <h3 class="font-bold text-gray-900">{{ animal }}</h3>
                <p class="text-sm text-gray-600 mt-1">Common sighting</p>
              </div>
            </div>
          </section>

          <!-- Activities -->
          <section v-if="park.activities?.length" id="activities" class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <div class="flex items-center mb-8">
              <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-sky-500 to-sky-600 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm4.657 2.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm3 6a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2zM12 19a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-7.657-2.343a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM17.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Available Activities</h2>
                <p class="text-gray-600">Experience {{ park.name }} through these adventures</p>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div
                v-for="(activity, index) in park.activities"
                :key="index"
                class="group bg-linear-to-br from-white to-amber-50 rounded-xl border border-amber-100 hover:border-amber-300 p-4 text-center transition-all duration-300"
              >
                <div class="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {{ getActivityEmoji(activity) }}
                </div>
                <h3 class="font-bold text-gray-900">{{ activity }}</h3>
                <p class="text-sm text-gray-600 mt-1">Popular activity</p>
              </div>
            </div>
          </section>

          <!-- Gallery -->
          <section v-if="park.gallery?.length" class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">Photo Gallery</h2>
                  <p class="text-gray-600">Visual journey through {{ park.name }}</p>
                </div>
              </div>
              <button @click="openGallery(0)" class="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                View All {{ park.gallery.length }} Photos
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="(image, index) in park.gallery.slice(0, 6)"
                :key="index"
                class="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                @click="openGallery(index)"
              >
                <img
                  :src="image"
                  :alt="`${park.name} - Image ${index + 1}`"
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
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-6 space-y-8">
            <!-- Quick Facts -->
            <div class="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Category</span>
                  <span class="font-bold text-emerald-700">{{ park.category }}</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Region</span>
                  <span class="font-bold text-gray-900">{{ park.region }}</span>
                </div>
                
                <div v-if="park.establishedYear" class="flex items-center justify-between">
                  <span class="text-gray-600">Established</span>
                  <span class="font-bold text-gray-900">{{ park.establishedYear }}</span>
                </div>
                
                <div v-if="park.areaKm2" class="flex items-center justify-between">
                  <span class="text-gray-600">Area</span>
                  <span class="font-bold text-gray-900">{{ park.areaKm2.toLocaleString() }} km²</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Wildlife Species</span>
                  <span class="font-bold text-emerald-700">{{ wildlifeCount }}</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Activities</span>
                  <span class="font-bold text-amber-700">{{ activitiesCount }}</span>
                </div>
                
                <div v-if="park.location" class="pt-4 border-t border-gray-100">
                  <div class="text-sm font-medium text-gray-600 mb-2">Location</div>
                  <div class="text-gray-900">{{ park.location }}</div>
                </div>
              </div>
            </div>

            <!-- Plan Your Visit -->
            <div class="bg-linear-to-br from-emerald-50 to-white rounded-2xl shadow-xl border border-emerald-200 p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Plan Your Visit</h3>
              
              <div class="space-y-4 mb-8">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.414L11 9.586V6z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-medium text-gray-900">Best Time</div>
                    <div class="text-sm text-gray-600">{{ formatDate(park.bestTimeToVisit?.from) }} - {{ formatDate(park.bestTimeToVisit?.to) }}</div>
                  </div>
                </div>
                
                <div v-if="park.climate" class="flex items-center">
                  <svg class="w-5 h-5 text-emerald-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm4.657 2.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm3 6a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2zM12 19a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm-7.657-2.343a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM17.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-medium text-gray-900">Climate</div>
                    <div class="text-sm text-gray-600">{{ park.climate.substring(0, 50) }}...</div>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <NuxtLink to="/contact" class="group block w-full py-3.5 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                  <span class="flex items-center justify-center">
                    Plan Safari
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </span>
                </NuxtLink>
                <NuxtLink to="/parks" class="group block w-full py-3.5 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 transition-all duration-300 text-center">
                  Explore Other Parks
                </NuxtLink>
              </div>
            </div>

            <!-- Need Help? -->
            <div class="bg-linear-to-br from-sky-50 to-white rounded-2xl border border-sky-100 p-6">
              <h4 class="font-bold text-gray-900 mb-4">Need Help?</h4>
              <p class="text-gray-600 text-sm mb-6">
                Our safari experts are here to answer your questions about {{ park.name }}.
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
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxOpen && park?.gallery?.length" class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" @click="closeLightbox" role="dialog" aria-modal="true">
      <button @click.stop="closeLightbox" class="absolute top-6 right-6 text-white hover:text-amber-300 transition-colors z-60" aria-label="Close gallery">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <button v-if="lightboxIndex > 0" @click.stop="prevImage" class="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-60" aria-label="Previous image">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>

      <button v-if="lightboxIndex < park.gallery.length - 1" @click.stop="nextImage" class="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-60" aria-label="Next image">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>

      <div class="absolute top-6 left-6 text-white font-medium z-60">{{ lightboxIndex + 1 }} / {{ park.gallery.length }}</div>

      <div class="relative w-full max-w-4xl mx-auto px-4 max-h-[80vh] flex items-center justify-center z-50" @click.stop>
        <button @click="closeLightbox" class="absolute top-4 right-4 bg-black/40 hover:bg-black/60 p-2 rounded-full z-50 text-white" aria-label="Close image">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <img :src="park.gallery[lightboxIndex]" :alt="`${park.name} - Image ${lightboxIndex + 1}`" class="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl" draggable="false" />
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm z-40">
          Tap outside image or press <span class="font-medium">Esc</span> to close
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useFetch, useHead, navigateTo } from '#app'
import { computed, ref, onMounted } from 'vue'

const route = useRoute()
const slug = route.params.slug

// Fetch park data
const { data, pending, error } = await useFetch(`/api/parks/${slug}`)

const park = computed(() => {
  if (!data.value) return null
  const dv = data.value
  return dv?.data || dv
})

const defaultImage = 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&q=80&auto=format&fit=crop'

// Counts
const wildlifeCount = computed(() => park.value?.wildlifeHighlights?.length || 0)
const activitiesCount = computed(() => park.value?.activities?.length || 0)

// Lightbox state
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openGallery = (index) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const nextImage = () => {
  if (park.value?.gallery && lightboxIndex.value < park.value.gallery.length - 1) {
    lightboxIndex.value++
  }
}

const prevImage = () => {
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--
  }
}

const scrollToActivities = () => {
  const activitiesSection = document.getElementById('activities')
  if (activitiesSection) {
    activitiesSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Helper functions
const getAnimalEmoji = (animal) => {
  const map = {
    'lion': '🦁', 'elephant': '🐘', 'leopard': '🐆', 'rhino': '🦏',
    'buffalo': '🐃', 'giraffe': '🦒', 'zebra': '🦓', 'cheetah': '🐆',
    'hippo': '🦛', 'wild dog': '🐕', 'bird': '🦜', 'antelope': '🦌'
  }
  const lower = animal.toLowerCase()
  for (const [key, emoji] of Object.entries(map)) {
    if (lower.includes(key)) return emoji
  }
  return '🐾'
}

const getActivityEmoji = (activity) => {
  const map = {
    'game drive': '🚙', 'walking safari': '🚶', 'bird watching': '🦜',
    'photography': '📸', 'camping': '🏕️', 'hiking': '🥾',
    'cultural': '👥', 'balloon': '🎈', 'fishing': '🎣', 'boat': '🛶'
  }
  const lower = activity.toLowerCase()
  for (const [key, emoji] of Object.entries(map)) {
    if (lower.includes(key)) return emoji
  }
  return '✨'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December']
  const monthIndex = months.findIndex(m => m.toLowerCase() === dateString.toLowerCase())
  return monthIndex !== -1 ? months[monthIndex] : dateString
}

// Keyboard navigation for lightbox
const handleKeyDown = (event) => {
  if (!lightboxOpen.value || !park.value?.gallery?.length) return
  if (event.key === 'Escape') closeLightbox()
  else if (event.key === 'ArrowRight') { event.preventDefault(); nextImage() }
  else if (event.key === 'ArrowLeft') { event.preventDefault(); prevImage() }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
})

// SEO
useHead(() => {
  const og = park.value?.featuredImage || defaultImage
  return {
    title: park.value ? `${park.value.name} - Tanzania National Park | ZafsTours` : 'Park Details - ZafsTours Tanzania',
    meta: [
      { name: 'description', content: park.value?.shortDescription || 'Explore Tanzania\'s magnificent national parks with expert guides' },
      { property: 'og:image', content: og }
    ]
  }
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
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
  background: linear-gradient(to bottom, #0da271, #047857);
}

/* Aspect ratio for hero */
.aspect-\[21\/9\] {
  aspect-ratio: 21/9;
}

/* Smooth transitions */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.3s ease;
}

/* Prevent text decoration on links */
.no-underline {
  text-decoration: none;
}

/* Lightbox backdrop */
body.lightbox-open {
  overflow: hidden;
}

/* Card hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>