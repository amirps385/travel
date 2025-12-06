<!-- components/ToursPreview.vue -->
<template>
  <section id="tours" class="py-16 lg:py-24 bg-linear-to-b from-white to-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <!-- Badge -->
        <div class="inline-flex items-center px-4 py-2 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full text-white text-sm font-semibold mb-6 shadow-lg">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
          </svg>
          Handpicked Adventures
        </div>
        
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Popular Tanzania Trips
        </h2>
        
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Handpicked safari itineraries, Kilimanjaro routes, and Zanzibar beach escapes.
        </p>
      </div>

      <!-- Tanzania Safaris Group -->
      <div class="mb-12 lg:mb-16">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 lg:mb-8">
          <div>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              Tanzania Safaris
            </h3>
            <p class="text-gray-600 mt-2">Experience Africa's most spectacular wildlife adventures</p>
          </div>
          <NuxtLink to="/tours/safaris" class="text-emerald-600 hover:text-emerald-800 font-medium mt-2 sm:mt-0 inline-flex items-center">
            View all safaris
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="tour in safariTours" :key="tour.id" 
            class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
            <!-- Image -->
            <div class="h-48 relative overflow-hidden">
              <div class="absolute inset-0" :style="{ 
                backgroundImage: `url(${tour.image || '/images/tour-placeholder.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }">
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-emerald-900/60 via-emerald-800/30 to-transparent"></div>
              </div>
              
              <!-- Duration Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-700">
                  {{ tour.duration }}
                </span>
              </div>
              
              <!-- Badge -->
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-emerald-600/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                  {{ tour.badge }}
                </span>
              </div>
            </div>
            
            <!-- Card Content -->
            <div class="p-6">
              <!-- Title -->
              <h4 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {{ tour.title }}
              </h4>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ tour.description }}
              </p>

              <!-- Highlights -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span v-for="(highlight, idx) in tour.highlights" :key="idx" 
                  class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                  {{ highlight }}
                </span>
              </div>

              <!-- Price and CTA -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div class="text-xs text-gray-500">Starting from</div>
                  <div class="text-xl font-bold text-emerald-700">{{ tour.price }}</div>
                </div>
                <NuxtLink :to="tour.link" 
                  class="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm">
                  View Itinerary
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Kilimanjaro Routes Group -->
      <div class="mb-12 lg:mb-16">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 lg:mb-8">
          <div>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
              </svg>
              Kilimanjaro Routes
            </h3>
            <p class="text-gray-600 mt-2">Conquer Africa's highest peak with expert guides</p>
          </div>
          <NuxtLink to="/tours/kilimanjaro" class="text-amber-600 hover:text-amber-800 font-medium mt-2 sm:mt-0 inline-flex items-center">
            View all Kilimanjaro tours
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="tour in kilimanjaroTours" :key="tour.id" 
            class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
            <!-- Image -->
            <div class="h-48 relative overflow-hidden">
              <div class="absolute inset-0" :style="{ 
                backgroundImage: `url(${tour.image || '/images/tour-placeholder.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }">
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-amber-900/60 via-amber-800/30 to-transparent"></div>
              </div>
              
              <!-- Duration Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-amber-700">
                  {{ tour.duration }}
                </span>
              </div>
              
              <!-- Badge -->
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-amber-600/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                  {{ tour.badge }}
                </span>
              </div>
            </div>
            
            <!-- Card Content -->
            <div class="p-6">
              <!-- Title -->
              <h4 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                {{ tour.title }}
              </h4>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ tour.description }}
              </p>

              <!-- Highlights -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span v-for="(highlight, idx) in tour.highlights" :key="idx" 
                  class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                  {{ highlight }}
                </span>
              </div>

              <!-- Price and CTA -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div class="text-xs text-gray-500">Starting from</div>
                  <div class="text-xl font-bold text-amber-700">{{ tour.price }}</div>
                </div>
                <NuxtLink :to="tour.link" 
                  class="px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-200 text-sm">
                  View Route
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Zanzibar Holidays Group -->
      <div class="mb-12 lg:mb-16">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 lg:mb-8">
          <div>
            <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-2 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              Zanzibar Holidays
            </h3>
            <p class="text-gray-600 mt-2">Relax on pristine beaches and explore rich culture</p>
          </div>
          <NuxtLink to="/tours/zanzibar" class="text-sky-600 hover:text-sky-800 font-medium mt-2 sm:mt-0 inline-flex items-center">
            View all Zanzibar trips
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="tour in zanzibarTours" :key="tour.id" 
            class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
            <!-- Image -->
            <div class="h-48 relative overflow-hidden">
              <div class="absolute inset-0" :style="{ 
                backgroundImage: `url(${tour.image || '/images/tour-placeholder.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }">
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-sky-900/60 via-sky-800/30 to-transparent"></div>
              </div>
              
              <!-- Duration Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-sky-700">
                  {{ tour.duration }}
                </span>
              </div>
              
              <!-- Badge -->
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-sky-600/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                  {{ tour.badge }}
                </span>
              </div>
            </div>
            
            <!-- Card Content -->
            <div class="p-6">
              <!-- Title -->
              <h4 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors">
                {{ tour.title }}
              </h4>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ tour.description }}
              </p>

              <!-- Highlights -->
              <div class="flex flex-wrap gap-2 mb-5">
                <span v-for="(highlight, idx) in tour.highlights" :key="idx" 
                  class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                  {{ highlight }}
                </span>
              </div>

              <!-- Price and CTA -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div class="text-xs text-gray-500">Starting from</div>
                  <div class="text-xl font-bold text-sky-700">{{ tour.price }}</div>
                </div>
                <NuxtLink :to="tour.link" 
                  class="px-4 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors duration-200 text-sm">
                  View Details
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Global CTA -->
      <div class="text-center pt-8 border-t border-gray-200">
        <p class="text-gray-600 mb-6">Can't find what you're looking for? We create custom itineraries</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/tours" 
            class="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200">
            Explore All Tours
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
          <NuxtLink to="/journey" 
            class="inline-flex items-center justify-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors duration-200">
            Request Custom Trip
          </NuxtLink>
        </div>

        <!-- Trust Badges -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div class="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <svg class="w-8 h-8 text-emerald-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <div class="text-sm font-semibold text-gray-900">Best Price Guarantee</div>
            <div class="text-xs text-gray-500 mt-1">No hidden fees</div>
          </div>
          <div class="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <svg class="w-8 h-8 text-emerald-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            <div class="text-sm font-semibold text-gray-900">24/7 Support</div>
            <div class="text-xs text-gray-500 mt-1">Always available</div>
          </div>
          <div class="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <svg class="w-8 h-8 text-emerald-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clip-rule="evenodd"/>
            </svg>
            <div class="text-sm font-semibold text-gray-900">Flexible Booking</div>
            <div class="text-xs text-gray-500 mt-1">Easy changes</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Tanzania Safaris
const safariTours = [
  { 
    id: 1,
    title: 'Serengeti Great Migration', 
    description: 'Witness the world\'s greatest wildlife spectacle in the heart of Serengeti with expert guides.',
    duration: '7 Days',
    badge: 'Best Seller',
    highlights: ['Big Five', 'Luxury Lodges', 'Private Safari'],
    price: 'From $2,300',
    link: '/tours/serengeti-migration',
    image: '/images/tour1.png'
  },
  { 
    id: 2,
    title: 'Tanzania Northern Circuit', 
    description: 'Explore Serengeti, Ngorongoro Crater, and Tarangire on this classic safari adventure.',
    duration: '8 Days',
    badge: 'Most Popular',
    highlights: ['Ngorongoro', 'Cultural Visit', 'Game Drives'],
    price: 'From $2,800',
    link: '/tours/northern-circuit',
    image: '/images/tour1.png'
  },
  { 
    id: 3,
    title: 'Family Safari Adventure', 
    description: 'Tailored for families with kid-friendly activities, accommodations, and wildlife experiences.',
    duration: '6 Days',
    badge: 'Family Friendly',
    highlights: ['Kid Activities', 'Swimming Pools', 'Private Guide'],
    price: 'From $1,950',
    link: '/tours/family-safari',
    image: '/images/tour1.png'
  }
]

// Kilimanjaro Routes
const kilimanjaroTours = [
  { 
    id: 4,
    title: 'Lemosho Route 8 Days', 
    description: 'The most scenic and successful route with excellent acclimatization for summit success.',
    duration: '8 Days',
    badge: 'Highest Success',
    highlights: ['Scenic Route', '98% Success', 'Small Groups'],
    price: 'From $2,100',
    link: '/tours/lemosho-8d',
    image: '/images/tour2.png'
  },
  { 
    id: 5,
    title: 'Machame Route 7 Days', 
    description: 'Popular "Whiskey" route with stunning scenery and challenging climbs for adventure seekers.',
    duration: '7 Days',
    badge: 'Adventure',
    highlights: ['Challenging', 'Picturesque', 'Experienced Guides'],
    price: 'From $1,850',
    link: '/tours/machame-7d',
    image: '/images/tour2.png'
  },
  { 
    id: 6,
    title: 'Marangu Route 6 Days', 
    description: 'The "Coca-Cola" route with hut accommodations, perfect for first-time high-altitude trekkers.',
    duration: '6 Days',
    badge: 'Beginner Friendly',
    highlights: ['Mountain Huts', 'Gentle Slopes', 'All Inclusive'],
    price: 'From $1,650',
    link: '/tours/marangu-6d',
    image: '/images/tour2.png'
  }
]

// Zanzibar Holidays
const zanzibarTours = [
  { 
    id: 7,
    title: 'Zanzibar Beach Paradise', 
    description: 'Relax on pristine white sand beaches and enjoy world-class diving in turquoise waters.',
    duration: '5 Days',
    badge: 'Beach Escape',
    highlights: ['Private Beach', 'Spa', 'Dolphin Tour'],
    price: 'From $850',
    link: '/tours/zanzibar-beach',
    image: '/images/tour3.png'
  },
  { 
    id: 8,
    title: 'Stone Town & Spice Tour', 
    description: 'Explore historic Stone Town, spice plantations, and authentic Swahili culture.',
    duration: '4 Days',
    badge: 'Cultural',
    highlights: ['Stone Town', 'Spice Tour', 'Local Cuisine'],
    price: 'From $650',
    link: '/tours/stone-town',
    image: '/images/tour3.png'
  },
  { 
    id: 9,
    title: 'Safari & Beach Combo', 
    description: 'Combine wildlife adventure with beach relaxation - the perfect Tanzania experience.',
    duration: '10 Days',
    badge: 'Combo Deal',
    highlights: ['Safari + Beach', 'All Transfers', 'Luxury Lodges'],
    price: 'From $3,200',
    link: '/tours/safari-beach-combo',
    image: '/images/tour3.png'
  }
]
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

/* Smooth hover transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>