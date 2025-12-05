<!-- components/ToursPreview.vue -->
<template>
  <section id="tours" class="py-20 bg-linear-to-b from-white to-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <!-- Badge -->
        <div class="inline-flex items-center px-4 py-2 bg-linear-to-r from-primary-500 to-ocean-500 rounded-full text-white text-sm font-semibold mb-6 shadow-lg">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
          </svg>
          Handpicked Adventures
        </div>
        
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span class="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-ocean-600">
            Featured
          </span>
          Tours
        </h2>
        
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our most popular safari, trekking, and beach experiences. 
          Each tour is carefully crafted for unforgettable memories.
        </p>
      </div>

      <!-- Tour Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Safari Tour Card -->
        <article v-for="(tour, index) in tours" :key="tour.slug" 
          class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
          
          <!-- Card Top with Image Background -->
          <div class="relative h-64 overflow-hidden">
            <!-- Image Background -->
            <div class="absolute inset-0" :style="{ 
              backgroundImage: `url(${tour.image || '/images/tour-placeholder.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }">
              <!-- Gradient Overlay -->
              <div :class="getTourOverlay(index)" class="absolute inset-0"></div>
            </div>
            
            <!-- Duration Badge -->
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold" :class="getTourBadgeColor(index)">
                {{ getTourDuration(index) }}
              </span>
            </div>
            
            <!-- Rating Badge -->
            <div class="absolute bottom-4 left-4">
              <span class="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex items-center">
                <svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {{ getTourRating(index) }}
              </span>
            </div>
            
            <!-- Tour Type Icon -->
            <div class="absolute top-4 right-4">
              <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg :class="getTourIconColor(index)" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="index === 0" fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  <path v-else-if="index === 1" fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                  <path v-else fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
          </div>
          
          <!-- Card Content -->
          <div class="p-8">
            <!-- Tour Title -->
            <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
              {{ tour.title }}
            </h3>
            
            <!-- Tour Description -->
            <p class="text-gray-600 mb-6 line-clamp-2">
              {{ tour.summary }}
            </p>
            
            <!-- Tour Details -->
            <div class="flex items-center justify-between mb-6">
              <!-- Price -->
              <div class="flex items-center text-gray-700">
                <div class="w-8 h-8 rounded-lg bg-linear-to-r from-primary-50 to-primary-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-500">From</div>
                  <div class="text-xl font-bold" :class="getTourPriceColor(index)">
                    ${{ tour.price.toLocaleString() }}
                  </div>
                </div>
              </div>
              
              <!-- Location/Destination -->
              <div class="flex items-center text-gray-700">
                <div class="w-8 h-8 rounded-lg bg-linear-to-r from-gray-50 to-gray-100 flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-500">Destination</div>
                  <div class="font-semibold">{{ getTourDestination(index) }}</div>
                </div>
              </div>
            </div>
            
            <!-- Action Button -->
            <NuxtLink :to="`/tours/${tour.slug}`" 
              class="w-full py-3 bg-linear-to-r from-primary-50 to-ocean-50 text-primary-700 font-semibold rounded-xl hover:from-primary-100 hover:to-ocean-100 transition-all duration-300 group-hover:shadow-lg flex items-center justify-center">
              View Details
              <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </NuxtLink>
          </div>
          
          <!-- Card Corner Decoration -->
          <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div class="absolute -top-8 -right-8 w-16 h-16 rotate-45" :class="getTourCornerColor(index)"></div>
          </div>
        </article>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-16">
        <NuxtLink to="/tours" 
          class="inline-flex items-center px-8 py-4 bg-linear-to-r from-primary-600 to-ocean-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary-200 transition-all duration-300 hover:scale-105">
          <span>Explore All Tours</span>
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
        
        <!-- Stats Below Button -->
        <div class="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Best Price Guarantee</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>24/7 Support</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Flexible Booking</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tours = [
  { 
    title: 'Serengeti Migration Safari', 
    slug: 'serengeti-migration', 
    price: 2200, 
    summary: 'Witness the spectacular Great Migration with expert guides. Luxury accommodations in the heart of Serengeti National Park.',
    image: '/images/tour1.png'
  },
  { 
    title: 'Kilimanjaro Lemosho 8 Days', 
    slug: 'lemosho-8d', 
    price: 1900, 
    summary: 'Summit Africa\'s highest peak via the scenic Lemosho route. Maximum acclimatization days for better success rates.',
    image: '/images/tour2.png'
  },
  { 
    title: 'Zanzibar Beach Paradise', 
    slug: 'zanzibar-beach', 
    price: 800, 
    summary: 'Relax on pristine white sand beaches, explore Stone Town, and enjoy world-class diving and snorkeling adventures.',
    image: '/images/tour3.png'
  }
]

// Helper functions for dynamic styling
const getTourOverlay = (index) => {
  const overlays = [
    'bg-linear-to-t from-primary-900/70 via-primary-800/50 to-transparent', // Safari - Green
    'bg-linear-to-t from-secondary-900/70 via-secondary-800/50 to-transparent', // Kilimanjaro - Orange
    'bg-linear-to-t from-ocean-900/70 via-ocean-800/50 to-transparent', // Zanzibar - Blue
  ]
  return overlays[index] || overlays[0]
}

const getTourBadgeColor = (index) => {
  const colors = [
    'text-primary-700', // Safari
    'text-secondary-700', // Kilimanjaro
    'text-ocean-700', // Zanzibar
  ]
  return colors[index] || colors[0]
}

const getTourDuration = (index) => {
  const durations = ['7 Days', '8 Days', '5 Days']
  return durations[index] || 'Custom'
}

const getTourRating = (index) => {
  const ratings = ['4.9 (128)', '4.8 (96)', '4.9 (87)']
  return ratings[index] || '4.8'
}

const getTourIconColor = (index) => {
  const colors = [
    'text-primary-300', // Safari
    'text-secondary-300', // Kilimanjaro  
    'text-ocean-300', // Zanzibar
  ]
  return colors[index] || colors[0]
}

const getTourPriceColor = (index) => {
  const colors = [
    'text-primary-700', // Safari
    'text-secondary-700', // Kilimanjaro
    'text-ocean-700', // Zanzibar
  ]
  return colors[index] || colors[0]
}

const getTourDestination = (index) => {
  const destinations = ['Serengeti', 'Kilimanjaro', 'Zanzibar']
  return destinations[index] || 'Tanzania'
}

const getTourCornerColor = (index) => {
  const colors = [
    'bg-primary-500', // Safari
    'bg-secondary-500', // Kilimanjaro
    'bg-ocean-500', // Zanzibar
  ]
  return colors[index] || colors[0]
}
</script>

<style scoped>
/* Line clamp utility for text truncation */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>