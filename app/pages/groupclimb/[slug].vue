<template>
  <div class="min-h-screen bg-linear-to-b from-amber-50 via-white to-emerald-50/20">
    <!-- Hero Section -->
    <section class="relative" v-if="climb">
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
              <button
                @click="goBack"
                class="group relative inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-visible focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="Go back to group climbs"
              >
                <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Climbs</span>
              </button>

              <!-- Book/Enquire Button -->
              <button
                v-if="spotsLeft > 0 && statusLabel !== 'Completed' && statusLabel !== 'Cancelled'"
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
                v-else-if="spotsLeft === 0 && statusLabel !== 'Completed' && statusLabel !== 'Cancelled'"
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
    <main class="max-w-7xl mx-auto px-4 lg:px-6 py-8" v-if="climb">
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
              <p class="text-slate-700 leading-relaxed whitespace-pre-line">{{ climb.shortDescription }}</p>
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
                <p class="text-slate-700 whitespace-pre-line leading-relaxed">{{ climb.itinerarySummary }}</p>
              </div>
              
              <!-- Collapsible Day-by-Day (Mock) -->
              <div class="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  @click="toggleItineraryDetails"
                  class="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  :aria-expanded="showItineraryDetails"
                  :aria-controls="'itinerary-details-' + climb.id"
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
                  :id="'itinerary-details-' + climb.id"
                  class="p-6 space-y-4"
                >
                  <!-- Mock day-by-day itinerary -->
                  <div v-for="day in 6" :key="day" class="border-l-4 border-amber-500 pl-4 py-2">
                    <h4 class="font-semibold text-slate-900 mb-1">Day {{ day }}</h4>
                    <p class="text-slate-600">
                      {{ mockItineraryDescriptions[(day - 1) % mockItineraryDescriptions.length] }}
                    </p>
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
                    v-for="(item, index) in climb.included"
                    :key="index"
                    class="flex items-start gap-3 text-slate-700"
                  >
                    <div class="shrink-0 mt-0.5">
                      <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <span class="flex-1">{{ item }}</span>
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
                    v-for="(item, index) in climb.notIncluded"
                    :key="index"
                    class="flex items-start gap-3 text-slate-700"
                  >
                    <div class="shrink-0 mt-0.5">
                      <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span class="flex-1">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Gallery Section -->
          <section class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
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
                v-for="(faq, index) in mockFAQs"
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

          <!-- Reviews Placeholder -->
          <section class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Reviews
            </h2>
            
            <div class="text-center py-12">
              <div class="inline-block p-8 bg-slate-50 rounded-3xl max-w-md">
                <div class="text-6xl mb-4">⭐</div>
                <h3 class="text-xl font-semibold text-slate-900 mb-2">No Reviews Yet</h3>
                <p class="text-slate-600 mb-4">
                  Be the first to share your experience after completing this climb!
                </p>
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
                      {{ climb.seatsBooked }}/{{ climb.maxGroupSize }} booked
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
                    <div class="text-right">
                      <p class="text-sm text-slate-600">Deposit to secure</p>
                      <p class="text-lg font-semibold text-slate-900">
                        {{ formatPrice(climb.price * 0.3, climb.currency) }}
                      </p>
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
                  :disabled="bookingSubmitting"
                  class="w-full py-4 bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  :aria-label="bookingSubmitting ? 'Submitting enquiry...' : 'Submit enquiry'"
                >
                  <span v-if="bookingSubmitting">Processing...</span>
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

            <!-- Organizer Card -->
            <div class="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <h3 class="text-xl font-bold text-slate-900 mb-6">Organizer</h3>
              
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="p-2 bg-emerald-50 rounded-lg shrink-0">
                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Organizer</p>
                    <p class="font-semibold text-slate-900">{{ climb.organizer?.name || 'Not specified' }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2 bg-emerald-50 rounded-lg shrink-0">
                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-slate-600">Contact Email</p>
                    <a
                      :href="`mailto:${climb.organizer?.contact || 'info@example.com'}`"
                      class="font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
                    >
                      {{ climb.organizer?.contact || 'info@example.com' }}
                    </a>
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-200">
                  <a
                    :href="`mailto:${climb.organizer?.contact || 'info@example.com'}?subject=Enquiry about ${climb.title}`"
                    class="block w-full py-3 text-center bg-emerald-50 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Contact Organizer
                  </a>
                </div>
              </div>
            </div>

            <!-- Map Placeholder -->
            <div class="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <h3 class="text-xl font-bold text-slate-900 mb-6">Location</h3>
              
              <div class="aspect-video bg-slate-100 rounded-xl overflow-hidden relative">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center p-4">
                    <div class="text-4xl mb-2">🗺️</div>
                    <p class="text-slate-600 font-medium">Map View</p>
                    <p class="text-sm text-slate-500">Location details available upon booking</p>
                  </div>
                </div>
              </div>
              
              <button
                class="w-full mt-4 py-3 text-center bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                aria-label="View on map"
              >
                View on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Related Climbs Section -->
    <section class="max-w-7xl mx-auto px-4 lg:px-6 py-12" v-if="relatedClimbs.length > 0">
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
          :key="relatedClimb.id"
          :climb="relatedClimb"
          @quickview="handleQuickView"
        />
      </div>
    </section>

    <!-- 404 State -->
    <section v-else-if="!isLoading" class="max-w-7xl mx-auto px-4 lg:px-6 py-20">
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
    </section>

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
import { useRouter } from '#app'
import GroupClimbCard from '~/components/GroupClimb/GroupClimbCard.vue'

// TODO: Replace with real API call when backend is ready:
// const { data: climb, error } = await $fetch('/api/groupclimbs/' + slug)
// OR
// const { data: climbs } = await $fetch('/api/groupclimbs?slug=' + slug)

// Import mock data from the index page
// In a real app, you would import this from a shared data file
const MOCK_GROUP_CLIMBS = [
  {
    id: '1',
    title: 'Yosemite Valley Classic',
    slug: 'yosemite-valley-classic',
    startDate: '2026-03-10T00:00:00Z',
    endDate: '2026-03-15T00:00:00Z',
    durationDays: 6,
    maxGroupSize: 12,
    seatsBooked: 8,
    price: 1299,
    currency: 'USD',
    categoryIds: ['beginner-friendly', 'multi-day-expedition'],
    tags: ['yosemite', 'granite', 'big-walls'],
    shortDescription: 'Experience the iconic granite walls of Yosemite Valley with expert guides. This 6-day expedition takes you through the most famous climbing routes in the world, with professional guides ensuring safety and maximum enjoyment.',
    itinerarySummary: 'Day 1: Arrival and orientation\nDay 2-3: Basic climbing techniques and practice\nDay 4-5: Half Dome approach and climb\nDay 6: Departure',
    included: ['Professional guide services', 'All climbing equipment', 'Permits and park fees', 'Camping accommodation', 'Meals during climbs'],
    notIncluded: ['Transportation to Yosemite', 'Personal insurance', 'Alcoholic beverages', 'Personal climbing shoes'],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
      'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&q=80'
    ],
    organizer: { name: 'El Capitan Guides', contact: 'guides@elcap.com' },
    isPublic: true
  },
  {
    id: '2',
    title: 'Red Rock Canyon Weekend',
    slug: 'red-rock-canyon-weekend',
    startDate: '2026-04-05T00:00:00Z',
    endDate: '2026-04-07T00:00:00Z',
    durationDays: 3,
    maxGroupSize: 8,
    seatsBooked: 6,
    price: 599,
    currency: 'USD',
    categoryIds: ['weekend-warrior', 'beginner-friendly'],
    tags: ['red-rock', 'sandstone', 'weekend'],
    shortDescription: 'Perfect weekend getaway for sandstone climbing enthusiasts.',
    itinerarySummary: 'Friday: Evening arrival and setup\nSaturday: Full day of multi-pitch climbing\nSunday: Morning climb and afternoon departure',
    included: ['Guide services', 'Basic climbing gear', 'Camping fees', 'Saturday dinner'],
    notIncluded: ['Transportation', 'Friday/Sunday meals', 'Personal gear'],
    gallery: ['https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80'],
    organizer: { name: 'Desert Ascents', contact: 'book@desertascents.com' },
    isPublic: true
  },
  // ... add more mock climbs as needed
]

// Router and state
const router = useRouter()
const route = useRoute()
const slug = route.params.slug
const climb = ref(null)
const isLoading = ref(true)

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

// Mock data
const mockFAQs = [
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

const mockItineraryDescriptions = [
  'Arrival day. Meet your guide and group at the base camp. Equipment check and safety briefing.',
  'Morning technique session focusing on multi-pitch systems. Afternoon practice climbs on nearby routes.',
  'Summit attempt day. Early start for the main objective with professional guides managing the ascent.',
  'Backup summit day or alternative climbing routes depending on weather and group condition.',
  'Descent and return to base camp. Celebration dinner and trip debrief.',
  'Final breakfast together, equipment return, and departure.'
]

// Initialize page
onMounted(() => {
  // TODO: Replace with real API call
  // await fetchClimbData()
  
  // Mock data loading
  setTimeout(() => {
    const foundClimb = MOCK_GROUP_CLIMBS.find(c => c.slug === slug)
    if (foundClimb) {
      climb.value = foundClimb
      // Set meta tags for SEO
      setMetaTags()
    }
    isLoading.value = false
  }, 300) // Simulate network delay
  
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
  return Math.max(0, climb.value.maxGroupSize - climb.value.seatsBooked)
})

const statusLabel = computed(() => {
  if (!climb.value) return 'Unknown'
  
  // Determine status based on dates and availability
  const now = new Date()
  const startDate = new Date(climb.value.startDate)
  const endDate = new Date(climb.value.endDate)
  
  if (spotsLeft.value === 0 && now < startDate) return 'Sold Out'
  if (now > endDate) return 'Completed'
  if (now >= startDate && now <= endDate) return 'In Progress'
  if (spotsLeft.value <= 2) return 'Almost Full'
  return 'Upcoming'
})

const statusClass = computed(() => {
  switch (statusLabel.value) {
    case 'Upcoming': return 'bg-blue-500/90'
    case 'In Progress': return 'bg-emerald-500/90'
    case 'Almost Full': return 'bg-amber-500/90'
    case 'Sold Out': return 'bg-red-500/90'
    case 'Completed': return 'bg-slate-500/90'
    default: return 'bg-blue-500/90'
  }
})

const formattedStartDate = computed(() => {
  if (!climb.value) return ''
  return formatDate(climb.value.startDate)
})

const formattedEndDate = computed(() => {
  if (!climb.value) return ''
  return formatDate(climb.value.endDate)
})

const formattedPrice = computed(() => {
  if (!climb.value) return ''
  return formatPrice(climb.value.price, climb.value.currency)
})

const heroImage = computed(() => {
  if (!climb.value) return ''
  return climb.value.gallery?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80'
})

const galleryImages = computed(() => {
  if (!climb.value) return []
  return climb.value.gallery || []
})

const currentGalleryImage = computed(() => {
  return galleryImages.value[currentGalleryIndex.value] || ''
})

const relatedClimbs = computed(() => {
  if (!climb.value) return []
  // Filter other climbs in the same category that are upcoming
  const now = new Date()
  return MOCK_GROUP_CLIMBS
    .filter(c => 
      c.id !== climb.value.id && 
      c.isPublic &&
      new Date(c.startDate) > now
    )
    .slice(0, 3) // Limit to 3 related climbs
})

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const formatPrice = (price, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const getCategoryName = (slug) => {
  const categoryMap = {
    'beginner-friendly': 'Beginner',
    'advanced-technical': 'Advanced',
    'multi-day-expedition': 'Expedition',
    'weekend-warrior': 'Weekend',
    'family-climbing': 'Family'
  }
  return categoryMap[slug] || slug.replace('-', ' ')
}

// Event handlers
const goBack = () => {
  router.back()
}

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
      text: climb.value?.shortDescription,
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
  
  if (!bookingForm.value.travellers || bookingForm.value.travellers < 1 || bookingForm.value.travellers > spotsLeft.value) {
    bookingErrors.value.travellers = `Please select between 1 and ${spotsLeft.value} travellers`
    hasErrors = true
  }
  
  if (hasErrors) return
  
  // Simulate API call
  bookingSubmitting.value = true
  
  // TODO: Replace with real API call
  // try {
  //   const response = await $fetch('/api/leads', {
  //     method: 'POST',
  //     body: {
  //       climbId: climb.value.id,
  //       climbSlug: climb.value.slug,
  //       climbTitle: climb.value.title,
  //       name: bookingForm.value.name,
  //       email: bookingForm.value.email,
  //       phone: bookingForm.value.phone,
  //       travellers: bookingForm.value.travellers,
  //       message: bookingForm.value.message,
  //       status: 'pending',
  //       source: 'groupclimb-detail-page'
  //     }
  //   })
  //   console.log('Lead created:', response)
  // } catch (error) {
  //   console.error('Error creating lead:', error)
  //   alert('There was an error submitting your enquiry. Please try again.')
  //   return
  // } finally {
  //   bookingSubmitting.value = false
  // }
  
  // Mock success
  setTimeout(() => {
    bookingSubmitting.value = false
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
  }, 1500)
}

const handleQuickView = (climbData) => {
  // Navigate to the climb detail page
  navigateTo(`/groupclimb/${climbData.slug}`)
}

// SEO Meta Tags
const setMetaTags = () => {
  if (!climb.value) return
  
  useHead({
    title: `${climb.value.title} | Group Climb Details`,
    meta: [
      { name: 'description', content: climb.value.shortDescription },
      { property: 'og:title', content: climb.value.title },
      { property: 'og:description', content: climb.value.shortDescription },
      { property: 'og:image', content: heroImage.value },
      { property: 'og:url', content: window.location.href },
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
        
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: climb.value.title,
          description: climb.value.shortDescription,
          startDate: climb.value.startDate,
          endDate: climb.value.endDate,
          eventStatus: statusLabel.value === 'Upcoming' ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventPostponed',
          location: {
            '@type': 'Place',
            name: 'To be confirmed upon booking',
          },
          offers: {
            '@type': 'Offer',
            price: climb.value.price,
            priceCurrency: climb.value.currency,
            availability: spotsLeft.value > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
            validFrom: new Date().toISOString(),
          },
          organizer: {
            '@type': 'Organization',
            name: climb.value.organizer?.name || 'Climbing Adventures',
            email: climb.value.organizer?.contact || 'info@example.com'
          },
          url: window.location.href,
          image: galleryImages.value
        })
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
</style>