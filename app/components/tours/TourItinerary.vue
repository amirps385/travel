<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Simple Header -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center">
          <NuxtLink to="/tours" class="inline-flex items-center text-gray-600 hover:text-gray-900">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tours
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div class="inline-block animate-pulse">
          <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading tour details...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12 bg-red-50 rounded-lg p-8">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Tour not found</h3>
        <p class="text-gray-600 mb-4">{{ error.message || "The tour you're looking for doesn't exist" }}</p>
        <div class="flex gap-3 justify-center">
          <NuxtLink to="/tours" class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
            Browse Tours
          </NuxtLink>
          <NuxtLink to="/" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
            Home
          </NuxtLink>
        </div>
      </div>

      <!-- Tour Content -->
      <div v-else-if="tour">
        <!-- Hero Section -->
        <div class="mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{{ tour.title }}</h1>
          <div class="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ tour.duration || '7' }} days
            </span>
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {{ tour.route || 'Tanzania' }}
            </span>
          </div>
          <div class="text-3xl font-bold text-amber-600 mb-8">
            ${{ tour.price?.toLocaleString() || '1,200' }} per person
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Gallery -->
            <TourGallery
              v-if="tour.images?.length"
              :images="tour.images"
              :alt-text="tour.title"
            />

            <!-- Overview -->
            <div class="bg-white rounded-xl p-8 border border-gray-200">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Tour Overview</h2>
              <div class="prose max-w-none text-gray-700 leading-relaxed">
                <p class="text-lg">{{ tour.overview || 'Experience an unforgettable adventure through Tanzania.' }}</p>
              </div>
            </div>

            <!-- Highlights -->
            <TourHighlights
              v-if="tour.highlights?.length"
              :highlights="tour.highlights"
            />

            <!-- Itinerary -->
            <TourItinerary
              :tour-id="tour._id"
            />
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Booking Card -->
            <div class="sticky top-8 space-y-6">
              <!-- Price Card -->
              <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-6">Book This Tour</h3>
                <div class="space-y-4 mb-6">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Per Person</span>
                    <span class="text-3xl font-bold text-emerald-700">
                      ${{ tour.price?.toLocaleString() || '1,200' }}
                    </span>
                  </div>
                  <div class="text-sm text-gray-500">
                    All inclusive • Best price guarantee
                  </div>
                </div>
                <div class="space-y-3">
                  <NuxtLink
                    to="/contact"
                    class="block w-full py-3.5 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors text-center"
                  >
                    Enquire Now
                  </NuxtLink>
                  <a
                    :href="`https://wa.me/255620285462?text=Hi%20ZafsTours,%20I'm%20interested%20in%20your%20tour:%20${encodeURIComponent(tour.title)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block w-full py-3.5 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-600 hover:bg-emerald-50 transition-colors text-center"
                  >
                    Quick Questions? Chat Now
                  </a>
                </div>
              </div>

              <!-- Quick Facts -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h4 class="font-bold text-gray-900 mb-4">Quick Facts</h4>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Duration</span>
                    <span class="font-medium text-gray-900">{{ tour.duration || '7' }} days</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Difficulty</span>
                    <span class="font-medium text-gray-900">{{ getDifficulty(tour) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Group Size</span>
                    <span class="font-medium text-gray-900">2-12 people</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Best Time</span>
                    <span class="font-medium text-gray-900">June-October</span>
                  </div>
                </div>
              </div>

              <!-- Included -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h4 class="font-bold text-gray-900 mb-4">What's Included</h4>
                <ul class="space-y-3">
                  <li class="flex items-center text-gray-700">
                    <svg class="w-5 h-5 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    All Accommodation
                  </li>
                  <li class="flex items-center text-gray-700">
                    <svg class="w-5 h-5 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Professional Guides
                  </li>
                  <li class="flex items-center text-gray-700">
                    <svg class="w-5 h-5 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Park Fees & Permits
                  </li>
                  <li class="flex items-center text-gray-700">
                    <svg class="w-5 h-5 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    All Meals
                  </li>
                  <li class="flex items-center text-gray-700">
                    <svg class="w-5 h-5 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    Airport Transfers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Tours -->
        <div v-if="relatedTours.length" class="mt-24">
          <h2 class="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TourCard
              v-for="relatedTour in relatedTours"
              :key="relatedTour._id"
              :tour="relatedTour"
            />
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="mt-16">
          <TourCTA />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Components
import TourGallery from '~/components/tours/TourGallery.vue'
import TourHighlights from '~/components/tours/TourHighlights.vue'
import TourItinerary from '~/components/tours/TourItinerary.vue'
import TourCard from '~/components/tours/TourCard.vue'
import TourCTA from '~/components/tours/TourCTA.vue'

const route = useRoute()
const slug = route.params.slug

// Fetch tour data
const { data, pending, error, refresh } = await useFetch(`/api/tours/${slug}`, {
  method: 'get'
})

const tour = computed(() => data.value?.data || null)

// Mock related tours
const relatedTours = ref([
  {
    _id: '1',
    slug: 'serengeti-migration',
    title: 'Great Migration Safari',
    overview: 'Witness millions of wildebeest and zebra crossing the Serengeti plains.',
    images: ['/images/tour1.png'],
    duration: 7,
    price: 2300,
    highlights: ['River Crossings', 'Predator Action', 'Hot Air Balloon']
  },
  {
    _id: '2',
    slug: 'lemosho-8d',
    title: 'Lemosho Route Kilimanjaro',
    overview: 'Most scenic route with excellent acclimatization. Best success rate.',
    images: ['/images/tour2.png'],
    duration: 8,
    price: 2100,
    highlights: ['Private Toilet', 'Hot Meals', '95% Success Rate']
  },
  {
    _id: '3',
    slug: 'zanzibar-beach',
    title: 'Zanzibar Beach Paradise',
    overview: 'Relax on pristine white sand beaches with turquoise waters.',
    images: ['/images/tour3.png'],
    duration: 5,
    price: 850,
    highlights: ['Snorkeling', 'Spa', 'Dolphin Tour']
  }
])

const getDifficulty = (tour) => {
  const title = tour.title?.toLowerCase() || ''
  if (title.includes('kilimanjaro') || title.includes('summit')) {
    return 'Moderate to Challenging'
  } else if (title.includes('safari')) {
    return 'Easy to Moderate'
  } else if (title.includes('zanzibar') || title.includes('beach')) {
    return 'Easy'
  }
  return 'Moderate'
}

// SEO
useHead({
  title: tour.value ? `${tour.value.title} - ZafsTours` : 'Tour Details - ZafsTours',
  meta: [
    {
      name: 'description',
      content: tour.value?.overview || 'Tour details on ZafsTours Tanzania'
    }
  ]
})

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1em;
  line-height: 1.7;
}
</style>