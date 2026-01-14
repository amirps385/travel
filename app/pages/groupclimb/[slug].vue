<template>
  <div class="min-h-screen bg-linear-to-b from-amber-50 via-white to-emerald-50/20">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
        <p class="text-slate-600">Loading climb details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 lg:px-6 py-20">
      <div class="text-center">
        <div class="inline-block p-12 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md">
          <div class="text-8xl mb-6">❌</div>
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Error Loading Climb</h2>
          <p class="text-slate-600 mb-8">
            {{ error }}
          </p>
          <div class="space-y-4">
            <NuxtLink
              to="/groupclimb"
              class="block px-8 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              aria-label="Browse all group climbs"
            >
              Browse All Climbs
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="climb">
      <!-- Hero Section -->
      <section class="relative">
        <!-- Hero Image -->
        <div class="relative h-96 md:h-[500px] overflow-hidden">
          <img
            :src="heroImage"
            :alt="climb.title"
            class="w-full h-full object-cover"
            loading="eager"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent"></div>
          
          <!-- Hero Content -->
          <div class="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white">
            <div class="max-w-7xl mx-auto">
              <!-- Status Badge -->
              <div class="inline-flex items-center gap-2 mb-4">
                <span 
                  :class="[
                    'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm',
                    statusClass
                  ]"
                >
                  {{ statusLabel }}
                </span>
                <span 
                  v-if="spotsLeft <= 5 && spotsLeft > 0" 
                  class="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm bg-red-500/90"
                >
                  Only {{ spotsLeft }} spot{{ spotsLeft === 1 ? '' : 's' }} left
                </span>
              </div>

              <!-- Title and Meta -->
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {{ climb.title }}
              </h1>
              
              <div class="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
                <!-- Categories -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="categoryId in climb.categoryIds"
                    :key="categoryId"
                    class="px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm bg-white/20 text-white border border-white/30"
                  >
                    {{ getCategoryName(categoryId) }}
                  </span>
                </div>
                
                <!-- Dates and Duration -->
                <div class="flex items-center gap-2 text-lg">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time :datetime="climb.startDate">{{ formattedStartDate }}</time>
                  <span class="mx-2">•</span>
                  <span>{{ climb.durationDays }} days</span>
                </div>
              </div>

              <!-- Price -->
              <div class="text-3xl font-bold mb-8">
                {{ formattedPrice }}
                <span class="text-lg font-normal opacity-90">per person</span>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-3 mb-8">
                <!-- Back Button -->
                <NuxtLink
                  to="/groupclimb"
                  class="group relative inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-visible focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  aria-label="Go back to group climbs"
                >
                  <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Climbs</span>
                </NuxtLink>

                <!-- Book/Enquire Button -->
                <button
                  v-if="spotsLeft > 0 && climb.status !== 'completed' && climb.status !== 'cancelled'"
                  @click="openBookingModal"
                  class="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  aria-label="Book or enquire about this climb"
                >
                  <span class="relative z-10">Book / Enquire</span>
                  <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                
                <!-- Sold Out Button -->
                <button
                  v-else-if="spotsLeft === 0 && climb.status !== 'completed' && climb.status !== 'cancelled'"
                  disabled
                  class="px-8 py-4 rounded-full bg-slate-400 text-white font-bold text-lg cursor-not-allowed"
                  aria-label="Sold out"
                >
                  Sold Out
                </button>

                <!-- Share Button -->
                <button
                  @click="shareClimb"
                  class="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  aria-label="Share this climb"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>

                <!-- Print Button -->
                <button
                  @click="printPage"
                  class="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  aria-label="Print this page"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Description Section -->
            <section class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
              <h2 class="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About This Climb
              </h2>
              <div class="prose prose-slate max-w-none">
                <p class="text-slate-700 leading-relaxed whitespace-pre-line">{{ climb.shortDescription || climb.description || 'No description available.' }}</p>
              </div>
            </section>

            <!-- Itinerary Section -->
            <section class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
              <h2 class="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Itinerary
              </h2>
              <div class="space-y-4">
                <div class="bg-amber-50 rounded-2xl p-6">
                  <h3 class="text-lg font-semibold text-slate-900 mb-2">Trip Summary</h3>
                  <p class="text-slate-700 whitespace-pre-line leading-relaxed">
                    {{ climb.itinerarySummary || generatedItinerarySummary || 'No itinerary summary available.' }}
                  </p>
                </div>
                
                <!-- Day-by-Day Itinerary -->
                <div v-if="climb.itinerary && climb.itinerary.length > 0" class="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    @click="toggleItineraryDetails"
                    class="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    :aria-expanded="showItineraryDetails"
                    :aria-controls="'itinerary-details'"
                  >
                    <span class="font-semibold text-slate-900">Day-by-Day Details</span>
                    <svg
                      class="w-5 h-5 text-slate-500 transition-transform"
                      :class="{ 'rotate-180': showItineraryDetails }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div
                    v-if="showItineraryDetails"
                    id="itinerary-details"
                    class="p-6 space-y-4"
                  >
                    <div v-for="day in climb.itinerary" :key="day.day || day._id" class="border-l-4 border-amber-500 pl-4 py-2">
                      <h4 class="font-semibold text-slate-900 mb-1">Day {{ day.day }}: {{ day.title }}</h4>
                      <p class="text-slate-600">{{ day.description }}</p>
                      <div v-if="day.activities && day.activities.length > 0" class="mt-2">
                        <div class="flex flex-wrap gap-1">
                          <span v-for="(activity, idx) in day.activities" :key="idx" 
                                class="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs">
                            {{ activity }}
                          </span>
                        </div>
                      </div>
                      <div v-if="day.accommodations && day.accommodations.length > 0" class="mt-2">
                        <div class="text-xs text-slate-500 mb-1">Accommodations:</div>
                        <div class="flex flex-wrap gap-1">
                          <span v-for="(accommodation, idx) in day.accommodations" :key="idx" 
                                class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                            {{ accommodation }}
                          </span>
                        </div>
                      </div>
                      <div v-if="day.meals && day.meals.length > 0" class="mt-2">
                        <div class="text-xs text-slate-500 mb-1">Meals:</div>
                        <div class="flex flex-wrap gap-1">
                          <span v-for="(meal, idx) in day.meals" :key="idx" 
                                class="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs">
                            {{ meal }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Included / Not Included Section -->
            <section class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
              <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What's Included
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Included -->
                <div class="bg-emerald-50 rounded-2xl p-6">
                  <h3 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Included
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, index) in climb.included || []"
                      :key="index"
                      class="flex items-start gap-3 text-slate-700"
                    >
                      <div class="shrink-0 mt-0.5">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                      <span class="flex-1">{{ item }}</span>
                    </li>
                    <li v-if="(!climb.included || climb.included.length === 0)" class="text-slate-500 italic">
                      No information provided
                    </li>
                  </ul>
                </div>

                <!-- Not Included -->
                <div class="bg-red-50 rounded-2xl p-6">
                  <h3 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Not Included
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, index) in climb.notIncluded || []"
                      :key="index"
                      class="flex items-start gap-3 text-slate-700"
                    >
                      <div class="shrink-0 mt-0.5">
                        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span class="flex-1">{{ item }}</span>
                    </li>
                    <li v-if="(!climb.notIncluded || climb.notIncluded.length === 0)" class="text-slate-500 italic">
                      No information provided
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Gallery Section -->
            <section v-if="galleryImages.length > 0" class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
              <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Gallery
              </h2>
              
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  v-for="(image, index) in galleryImages"
                  :key="index"
                  @click="openGallery(index)"
                  class="relative aspect-square overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  :aria-label="`View image ${index + 1} of ${galleryImages.length}`"
                >
                  <img
                    :src="image"
                    :alt="`${climb.title} - image ${index + 1}`"
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300"></div>
                </button>
              </div>
            </section>

            <!-- Additional Info Section -->
            <section class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
              <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Additional Information
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Meeting Point -->
                <div v-if="climb.meetingPoint" class="bg-slate-50 rounded-2xl p-6">
                  <h3 class="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Meeting Point
                  </h3>
                  <p class="text-slate-700">{{ climb.meetingPoint }}</p>
                  <p v-if="climb.meetingTime" class="text-sm text-slate-600 mt-2">
                    Time: {{ climb.meetingTime }}
                  </p>
                </div>

                <!-- Route & Difficulty -->
                <div v-if="climb.route || climb.difficulty" class="bg-slate-50 rounded-2xl p-6">
                  <h3 class="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Route & Difficulty
                  </h3>
                  <p v-if="climb.route" class="text-slate-700 mb-2">
                    <span class="font-medium">Route:</span> {{ climb.route }}
                  </p>
                  <p v-if="climb.difficulty" class="text-slate-700">
                    <span class="font-medium">Difficulty:</span> {{ climb.difficulty }}
                  </p>
                </div>
              </div>
            </section>

            <!-- FAQs Section -->
            <section class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
              <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Frequently Asked Questions
              </h2>
              
              <div class="space-y-4">
                <div
                  v-for="(faq, index) in faqs"
                  :key="index"
                  class="border border-slate-200 rounded-2xl overflow-hidden"
                >
                  <button
                    @click="toggleFAQ(index)"
                    class="w-full px-6 py-4 bg-white hover:bg-slate-50 transition-colors text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    :aria-expanded="openFAQ === index"
                    :aria-controls="'faq-answer-' + index"
                  >
                    <span class="font-semibold text-slate-900">{{ faq.question }}</span>
                    <svg
                      class="w-5 h-5 text-slate-500 transition-transform"
                      :class="{ 'rotate-180': openFAQ === index }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div
                    v-if="openFAQ === index"
                    :id="'faq-answer-' + index"
                    class="px-6 py-4 border-t border-slate-200 bg-slate-50"
                  >
                    <p class="text-slate-700">{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column - Sticky Sidebar -->
          <div class="lg:col-span-1">
            <div class="lg:sticky lg:top-8 space-y-8">
              <!-- Trip Summary Card -->
              <div class="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                <h3 class="text-xl font-bold text-slate-900 mb-6">Trip Summary</h3>
                
                <div class="space-y-4">
                  <!-- Dates -->
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-amber-50 rounded-lg shrink-0">
                      <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-slate-600">Trip Dates</p>
                      <p class="font-semibold text-slate-900">
                        {{ formattedStartDate }} - {{ formattedEndDate }}
                      </p>
                    </div>
                  </div>

                  <!-- Duration -->
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-amber-50 rounded-lg shrink-0">
                      <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-slate-600">Duration</p>
                      <p class="font-semibold text-slate-900">{{ climb.durationDays }} days</p>
                    </div>
                  </div>

                  <!-- Group Size -->
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-amber-50 rounded-lg shrink-0">
                      <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-slate-600">Group Size</p>
                      <p class="font-semibold text-slate-900">
                        {{ climb.seatsBooked || 0 }}/{{ climb.maxGroupSize || 8 }} booked
                      </p>
                      <p class="text-sm" :class="spotsLeft <= 2 ? 'text-red-600 font-semibold' : 'text-emerald-600'">
                        {{ spotsLeft }} spots left
                      </p>
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="pt-4 border-t border-slate-200">
                    <div class="flex justify-between items-center">
                      <div>
                        <p class="text-sm text-slate-600">Price per person</p>
                        <p class="text-2xl font-bold text-slate-900">{{ formattedPrice }}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>

              <!-- Booking Widget -->
              <div class="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                <h3 class="text-xl font-bold text-slate-900 mb-6">Book / Enquire</h3>
                
                <form @submit.prevent="handleBookingSubmit" class="space-y-4">
                  <!-- Name -->
                  <div>
                    <label for="name" class="block text-sm font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      v-model="bookingForm.name"
                      type="text"
                      id="name"
                      required
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all"
                      :class="{ 'border-red-500': bookingErrors.name }"
                      aria-describedby="name-error"
                    />
                    <p v-if="bookingErrors.name" id="name-error" class="mt-1 text-sm text-red-600">
                      {{ bookingErrors.name }}
                    </p>
                  </div>

                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-sm font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      v-model="bookingForm.email"
                      type="email"
                      id="email"
                      required
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all"
                      :class="{ 'border-red-500': bookingErrors.email }"
                      aria-describedby="email-error"
                    />
                    <p v-if="bookingErrors.email" id="email-error" class="mt-1 text-sm text-red-600">
                      {{ bookingErrors.email }}
                    </p>
                  </div>

                  <!-- Phone -->
                  <div>
                    <label for="phone" class="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      v-model="bookingForm.phone"
                      type="tel"
                      id="phone"
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all"
                    />
                  </div>

                  <!-- Travellers -->
                  <div>
                    <label for="travellers" class="block text-sm font-medium text-slate-700 mb-1">
                      Number of Travellers *
                    </label>
                    <select
                      v-model="bookingForm.travellers"
                      id="travellers"
                      required
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all appearance-none cursor-pointer"
                      :class="{ 'border-red-500': bookingErrors.travellers }"
                      aria-describedby="travellers-error"
                    >
                      <option value="">Select number</option>
                      <option v-for="n in Math.min(spotsLeft, 10)" :key="n" :value="n">
                        {{ n }} {{ n === 1 ? 'person' : 'people' }}
                      </option>
                    </select>
                    <p v-if="bookingErrors.travellers" id="travellers-error" class="mt-1 text-sm text-red-600">
                      {{ bookingErrors.travellers }}
                    </p>
                  </div>

                  <!-- Message -->
                  <div>
                    <label for="message" class="block text-sm font-medium text-slate-700 mb-1">
                      Message / Questions
                    </label>
                    <textarea
                      v-model="bookingForm.message"
                      id="message"
                      rows="3"
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all resize-none"
                      placeholder="Any specific requirements or questions?"
                    ></textarea>
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    :disabled="bookingSubmitting || spotsLeft === 0 || climb.status === 'completed' || climb.status === 'cancelled'"
                    class="w-full py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    :aria-label="bookingSubmitting ? 'Submitting enquiry...' : 'Submit enquiry'"
                  >
                    <span v-if="bookingSubmitting">Processing...</span>
                    <span v-else-if="spotsLeft === 0">Sold Out</span>
                    <span v-else-if="climb.status === 'completed' || climb.status === 'cancelled'">Not Available</span>
                    <span v-else>Submit Enquiry</span>
                  </button>

                  <!-- Success Message -->
                  <div
                    v-if="bookingSuccess"
                    class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
                    role="alert"
                    aria-live="polite"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p class="font-medium text-emerald-900">Enquiry sent successfully!</p>
                        <p class="text-sm text-emerald-700 mt-1">
                          We'll contact you within 24 hours to confirm your booking.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Clean Organizer Card -->
<div class="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
  <h3 class="text-xl font-bold text-slate-900 mb-6">Organizer</h3>
  
  <div class="space-y-4">
    <!-- Organizer Info -->
    <div class="flex items-start gap-3">
      <div class="p-2 bg-emerald-50 rounded-lg shrink-0">
        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-slate-600">Organized by</p>
        <p class="font-semibold text-slate-900">{{ climb.organizer?.name || 'Adventure Experts' }}</p>
        <p class="text-sm text-slate-500 mt-1">Certified mountain guides & expedition leaders</p>
      </div>
    </div>

    <!-- Organizer Stats -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-slate-50 rounded-xl p-3 text-center">
        <div class="text-lg font-bold text-amber-600 mb-1">10+</div>
        <div class="text-xs text-slate-600">Years Experience</div>
      </div>
      <div class="bg-slate-50 rounded-xl p-3 text-center">
        <div class="text-lg font-bold text-amber-600 mb-1">100+</div>
        <div class="text-xs text-slate-600">Expeditions</div>
      </div>
    </div>

    <!-- Organizer Description -->
    <div class="bg-amber-50 rounded-2xl p-4">
      <h4 class="text-sm font-semibold text-slate-900 mb-2">Professional Team</h4>
      <p class="text-xs text-slate-600">
        Our certified guides ensure safety, provide expert guidance, and create memorable climbing experiences for all skill levels.
      </p>
    </div>
  </div>
</div>

              <!-- Share This Climb -->
              <div class="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                <h3 class="text-xl font-bold text-slate-900 mb-6">Share This Climb</h3>
                
                <div class="flex flex-wrap gap-3">
                  <button
                    @click="shareClimb"
                    class="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  
                  <button
                    @click="printPage"
                    class="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Related Climbs Section -->
      <section v-if="relatedClimbs.length > 0" class="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 class="text-3xl font-bold text-slate-900 mb-2">Related Climbs</h2>
            <p class="text-slate-600">Other upcoming adventures you might enjoy</p>
          </div>
          <NuxtLink
            to="/groupclimb"
            class="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            aria-label="View all group climbs"
          >
            View All Climbs
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GroupClimbCard
            v-for="relatedClimb in relatedClimbs"
            :key="relatedClimb._id"
            :climb="relatedClimb"
          />
        </div>
      </section>
    </div>

    <!-- 404 State -->
    <div v-else-if="!isLoading" class="max-w-7xl mx-auto px-4 lg:px-6 py-20">
      <div class="text-center">
        <div class="inline-block p-12 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md">
          <div class="text-8xl mb-6">🧗‍♂️</div>
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Climb Not Found</h2>
          <p class="text-slate-600 mb-8">
            The group climb you're looking for doesn't exist or has been removed.
          </p>
          <div class="space-y-4">
            <NuxtLink
              to="/groupclimb"
              class="block px-8 py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              aria-label="Browse all group climbs"
            >
              Browse All Climbs
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block px-8 py-4 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              aria-label="Go back to home page"
            >
              Back to Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Modal -->
    <div
      v-if="galleryModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="gallery-modal-title"
      role="dialog"
      aria-modal="true"
      @keydown.esc="closeGallery"
      @keydown.left="prevGalleryImage"
      @keydown.right="nextGalleryImage"
    >
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity" @click="closeGallery"></div>

      <!-- Modal Content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative bg-transparent w-full max-w-6xl">
          <!-- Close Button -->
          <button
            @click="closeGallery"
            class="absolute -top-16 right-0 z-10 p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-all hover:scale-110"
            aria-label="Close gallery"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Navigation Arrows -->
          <button
            v-if="galleryImages.length > 1"
            @click="prevGalleryImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            v-if="galleryImages.length > 1"
            @click="nextGalleryImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-all hover:scale-110"
            aria-label="Next image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Main Image -->
          <div class="relative">
            <img
              :src="currentGalleryImage"
              :alt="`${climb?.title} - image ${currentGalleryIndex + 1} of ${galleryImages.length}`"
              class="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              id="gallery-modal-title"
            />
            
            <!-- Image Counter -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              {{ currentGalleryIndex + 1 }} / {{ galleryImages.length }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div
      v-if="bookingModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      @keydown.esc="closeBookingModal"
    >
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeBookingModal"></div>
        
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-slate-900">Book This Climb</h2>
              <button
                @click="closeBookingModal"
                class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Close booking modal"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p class="text-slate-600 mb-6">
              You'll be redirected to our secure booking system to complete your reservation.
            </p>
            
            <div class="space-y-4">
              <div class="bg-amber-50 rounded-2xl p-6">
                <h3 class="font-semibold text-slate-900 mb-2">{{ climb?.title }}</h3>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-slate-600">Price per person</p>
                    <p class="text-xl font-bold text-slate-900">{{ formattedPrice }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-slate-600">Spots left</p>
                    <p class="text-lg font-semibold text-slate-900">{{ spotsLeft }}</p>
                  </div>
                </div>
              </div>
              
              <div class="flex gap-3">
                <button
                  @click="closeBookingModal"
                  class="flex-1 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  @click="redirectToBooking"
                  class="flex-1 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Proceed to Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Import the component from the GroupClimb subdirectory
import GroupClimbCard from '~/components/GroupClimb/GroupClimbCard.vue'

// Import categories from index page
const CATEGORY_OPTIONS = [
  // Kilimanjaro routes
  { id: 'kilimanjaro-lemosho', name: 'Kilimanjaro — Lemosho' },
  { id: 'kilimanjaro-machame', name: 'Kilimanjaro — Machame' },
  { id: 'kilimanjaro-rongai', name: 'Kilimanjaro — Rongai' },
  { id: 'kilimanjaro-northern', name: 'Kilimanjaro — Northern Circuit' },
  { id: 'kilimanjaro-marangu', name: 'Kilimanjaro — Marangu' },
  { id: 'kilimanjaro-umbwe', name: 'Kilimanjaro — Umbwe' },
  { id: 'kilimanjaro-expedition', name: 'Kilimanjaro — Expedition / Crater' },

  // Trip type
  { id: 'group-departure', name: 'Group Departure' },
  { id: 'private-departure', name: 'Private Departure' },
  { id: 'multi-day', name: 'Multi-day / Expedition' },
  { id: 'day-trip', name: 'Day Trip / Excursion' },

  // Activity / focus
  { id: 'summit', name: 'Summit Attempt' },
  { id: 'acclimatization', name: 'Acclimatization' },
  { id: 'trekking', name: 'Trekking & Hiking' },
  { id: 'birdwatching', name: 'Birdwatching' },
  { id: 'photography', name: 'Photography' },

  // Comfort / accommodation
  { id: 'camping-basic', name: 'Camping (Basic)' },
  { id: 'camping-comfort', name: 'Camping (Comfort / Glamping)' },
  { id: 'lodge', name: 'Lodge / Permanent Tents' },

  // Difficulty / audience
  { id: 'easy', name: 'Easy' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'challenging', name: 'Challenging / High altitude' },
  { id: 'family-friendly', name: 'Family Friendly' },
  { id: 'honeymoon', name: 'Honeymoon / Couples' },

  // Add-ons / region
  { id: 'safari-addon', name: 'Safari Add-on' },
  { id: 'zanzibar', name: 'Zanzibar / Sea Extension' },
  { id: 'cultural', name: 'Cultural Excursions' }
]

// Router and state
const route = useRoute()
const slug = route.params.slug
const climb = ref(null)
const relatedClimbs = ref([])
const isLoading = ref(true)
const error = ref('')

// UI State
const showItineraryDetails = ref(false)
const openFAQ = ref(null)
const galleryModalOpen = ref(false)
const currentGalleryIndex = ref(0)
const bookingModalOpen = ref(false)

// Booking Form
const bookingForm = ref({
  name: '',
  email: '',
  phone: '',
  travellers: 1,
  message: ''
})

const bookingErrors = ref({})
const bookingSubmitting = ref(false)
const bookingSuccess = ref(false)

// FAQs
const faqs = [
  {
    question: 'What level of fitness is required?',
    answer: 'Participants should be in good physical condition with some prior climbing experience. Daily hikes of 2-4 hours with elevation gain are expected.'
  },
  {
    question: 'What equipment is provided?',
    answer: 'We provide all technical climbing equipment including ropes, harnesses, helmets, and protection gear. Personal gear like climbing shoes is not included.'
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Full refund 60+ days before departure, 50% refund 30-59 days before, no refund within 30 days of departure.'
  },
  {
    question: 'Are meals included?',
    answer: 'All meals during climbing days are included. Restaurant meals and snacks are at participants\' expense.'
  }
]

// Fetch climb data from API
async function fetchClimbData() {
  isLoading.value = true
  error.value = ''
  
  try {
    const response = await $fetch(`/api/groupclimb/${slug}`)
    
    if (response.ok && response.data) {
      climb.value = response.data
      relatedClimbs.value = response.relatedClimbs || []
      setMetaTags()
    } else {
      error.value = response.error || 'Climb not found'
    }
  } catch (err) {
    console.error('Failed to load climb:', err)
    error.value = 'Failed to load climb details. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

// Initialize page
onMounted(async () => {
  await fetchClimbData()
  
  // Add keyboard event listeners for gallery
  window.addEventListener('keydown', handleGalleryKeyboard)
})

onUnmounted(() => {
  // Cleanup
  window.removeEventListener('keydown', handleGalleryKeyboard)
  document.body.style.overflow = ''
})

// Computed properties
const spotsLeft = computed(() => {
  if (!climb.value) return 0
  const max = climb.value.maxGroupSize || 0
  const booked = climb.value.seatsBooked || 0
  return Math.max(0, max - booked)
})

const statusLabel = computed(() => {
  if (!climb.value) return 'Unknown'
  
  // Use status from database if available
  if (climb.value.status) {
    return climb.value.status.charAt(0).toUpperCase() + climb.value.status.slice(1)
  }
  
  // Fallback to determining status based on dates and availability
  const now = new Date()
  const startDate = climb.value.startDate ? new Date(climb.value.startDate) : null
  const endDate = climb.value.endDate ? new Date(climb.value.endDate) : null
  
  if (!startDate) return 'TBA'
  
  if (spotsLeft.value === 0 && now < startDate) return 'Sold Out'
  if (endDate && now > endDate) return 'Completed'
  if (endDate && now >= startDate && now <= endDate) return 'In Progress'
  if (spotsLeft.value <= 2) return 'Almost Full'
  return 'Upcoming'
})

const statusClass = computed(() => {
  const status = statusLabel.value.toLowerCase()
  
  if (status.includes('sold') || status.includes('cancelled')) return 'bg-red-500/90'
  if (status.includes('completed')) return 'bg-slate-500/90'
  if (status.includes('progress')) return 'bg-emerald-500/90'
  if (status.includes('almost')) return 'bg-amber-500/90'
  return 'bg-blue-500/90'
})

const formattedStartDate = computed(() => {
  if (!climb.value || !climb.value.startDate) return 'TBA'
  return formatDate(climb.value.startDate)
})

const formattedEndDate = computed(() => {
  if (!climb.value || !climb.value.endDate) return 'TBA'
  return formatDate(climb.value.endDate)
})

const formattedPrice = computed(() => {
  if (!climb.value) return ''
  return formatPrice(climb.value.price || 0, climb.value.currency)
})

const heroImage = computed(() => {
  if (!climb.value) return ''
  return climb.value.gallery?.[0] || '/images/placeholder-mountain.jpg'
})

const galleryImages = computed(() => {
  if (!climb.value) return []
  return Array.isArray(climb.value.gallery) ? climb.value.gallery : []
})

const currentGalleryImage = computed(() => {
  return galleryImages.value[currentGalleryIndex.value] || heroImage.value
})

const generatedItinerarySummary = computed(() => {
  if (!climb.value) return ''
  
  // If there's a manual summary, it would be used in template
  // This generates a summary from itinerary data
  if (climb.value.itinerary && climb.value.itinerary.length > 0) {
    const days = climb.value.durationDays || climb.value.itinerary.length
    const firstDay = climb.value.itinerary[0]?.title || 'Arrival'
    const lastDay = climb.value.itinerary[climb.value.itinerary.length - 1]?.title || 'Departure'
    
    return `This ${days}-day adventure starts with ${firstDay.toLowerCase()} and concludes with ${lastDay.toLowerCase()}. Experience guided climbs, stunning scenery, and professional support throughout your journey.`
  }
  
  return ''
})

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return 'TBA'
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  } catch {
    return 'Invalid date'
  }
}

const formatPrice = (price, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price || 0)
}

const getCategoryName = (id) => {
  const category = CATEGORY_OPTIONS.find(cat => cat.id === id)
  return category ? category.name : id
}

// Event handlers
const toggleItineraryDetails = () => {
  showItineraryDetails.value = !showItineraryDetails.value
}

const toggleFAQ = (index) => {
  openFAQ.value = openFAQ.value === index ? null : index
}

const openGallery = (index) => {
  currentGalleryIndex.value = index
  galleryModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
  galleryModalOpen.value = false
  document.body.style.overflow = ''
}

const nextGalleryImage = () => {
  if (galleryImages.value.length > 0) {
    currentGalleryIndex.value = (currentGalleryIndex.value + 1) % galleryImages.value.length
  }
}

const prevGalleryImage = () => {
  if (galleryImages.value.length > 0) {
    currentGalleryIndex.value = (currentGalleryIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length
  }
}

const handleGalleryKeyboard = (event) => {
  if (!galleryModalOpen.value) return
  
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      prevGalleryImage()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextGalleryImage()
      break
    case 'Escape':
      event.preventDefault()
      closeGallery()
      break
  }
}

const shareClimb = () => {
  if (navigator.share) {
    navigator.share({
      title: climb.value?.title,
      text: climb.value?.shortDescription || climb.value?.description,
      url: window.location.href,
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

const printPage = () => {
  window.print()
}

const openBookingModal = () => {
  bookingModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeBookingModal = () => {
  bookingModalOpen.value = false
  document.body.style.overflow = ''
}

const redirectToBooking = () => {
  // TODO: In production, redirect to actual booking system
  console.log('Redirecting to booking system for:', climb.value?.title)
  alert('In production, this would redirect to the booking system.')
  closeBookingModal()
}

const handleBookingSubmit = async () => {
  // Reset states
  bookingErrors.value = {}
  bookingSuccess.value = false
  
  // Validate form
  let hasErrors = false
  
  if (!bookingForm.value.name.trim()) {
    bookingErrors.value.name = 'Name is required'
    hasErrors = true
  }
  
  if (!bookingForm.value.email.trim()) {
    bookingErrors.value.email = 'Email is required'
    hasErrors = true
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.value.email)) {
    bookingErrors.value.email = 'Please enter a valid email address'
    hasErrors = true
  }
  
  const travellers = parseInt(bookingForm.value.travellers)
  if (!travellers || travellers < 1 || travellers > spotsLeft.value) {
    bookingErrors.value.travellers = `Please select between 1 and ${spotsLeft.value} travellers`
    hasErrors = true
  }
  
  if (hasErrors) return
  
  // Simulate API call
  bookingSubmitting.value = true
  
  try {
    // TODO: Create a leads API endpoint if not exists
    const response = await $fetch('/api/leads', {
      method: 'POST',
      body: {
        climbId: climb.value._id,
        climbSlug: climb.value.slug,
        climbTitle: climb.value.title,
        name: bookingForm.value.name,
        email: bookingForm.value.email,
        phone: bookingForm.value.phone,
        travellers: bookingForm.value.travellers,
        message: bookingForm.value.message,
        status: 'pending',
        source: 'groupclimb-detail-page'
      }
    })
    
    if (response.ok) {
      bookingSuccess.value = true
      
      // Reset form after success
      bookingForm.value = {
        name: '',
        email: '',
        phone: '',
        travellers: 1,
        message: ''
      }
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        bookingSuccess.value = false
      }, 5000)
    } else {
      alert('There was an error submitting your enquiry. Please try again.')
    }
  } catch (error) {
    console.error('Error creating lead:', error)
    alert('There was an error submitting your enquiry. Please try again.')
  } finally {
    bookingSubmitting.value = false
  }
}

// SEO Meta Tags
const setMetaTags = () => {
  if (!climb.value) return
  
  useHead({
    title: `${climb.value.title} | Group Climb Details`,
    meta: [
      { name: 'description', content: climb.value.shortDescription || climb.value.description || 'Group climbing adventure' },
      { property: 'og:title', content: climb.value.title },
      { property: 'og:description', content: climb.value.shortDescription || climb.value.description || 'Group climbing adventure' },
      { property: 'og:image', content: heroImage.value },
      { property: 'og:url', content: typeof window !== 'undefined' ? window.location.href : '' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]
  })
}

// JSON-LD for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => {
        if (!climb.value) return ''
        
        const schema = {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: climb.value.title,
          description: climb.value.shortDescription || climb.value.description,
          startDate: climb.value.startDate,
          endDate: climb.value.endDate,
          location: {
            '@type': 'Place',
            name: climb.value.meetingPoint || 'To be confirmed upon booking',
          },
          offers: {
            '@type': 'Offer',
            price: climb.value.price || 0,
            priceCurrency: climb.value.currency || 'USD',
            availability: spotsLeft.value > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
            validFrom: new Date().toISOString(),
          },
          organizer: {
            '@type': 'Organization',
            name: climb.value.organizer?.name || 'Climbing Adventures',
            email: climb.value.organizer?.email || climb.value.organizer?.contact || 'info@example.com'
          },
          url: typeof window !== 'undefined' ? window.location.href : '',
        }
        
        // Add image if available
        if (galleryImages.value.length > 0) {
          schema.image = galleryImages.value
        }
        
        return JSON.stringify(schema)
      })
    }
  ]
})
</script>

<style scoped>
/* Custom scrollbar for gallery modal */
.modal-open {
  overflow: hidden;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  body {
    background: white !important;
    color: black !important;
  }
  
  a {
    color: black !important;
    text-decoration: underline !important;
  }
  
  .bg-linear-to-b {
    background: white !important;
  }
  
  .shadow-lg, .shadow-xl, .shadow-2xl {
    box-shadow: none !important;
  }
  
  .border {
    border: 1px solid #ccc !important;
  }
}

/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}

/* Ensure images don't overflow */
img {
  max-width: 100%;
  height: auto;
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>