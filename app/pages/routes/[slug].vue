<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 1) HERO SECTION -->
    <section class="relative h-[80vh] w-full overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          :src="experience.heroImage"
          :alt="experience.title"
          class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-linear-to-b from-gray-900/90 via-gray-900/70 to-gray-900/30"></div>
      </div>
      
      <div class="relative z-10 flex h-full flex-col justify-end px-4 pb-20 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="mb-6">
            <span class="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white">
              {{ experience.type }}
            </span>
          </div>
          
          <h1 class="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {{ experience.title }}
          </h1>
          
          <p class="mb-8 max-w-3xl text-xl font-light text-gray-100">
            {{ experience.tagline }}
          </p>
          
          <!-- Quick Facts Strip -->
          <div class="mb-10 flex flex-wrap gap-4">
            <div class="flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-white">
              <span class="mr-2 text-lg">📍</span>
              <span class="font-medium">{{ experience.region }}</span>
            </div>
            <div class="flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-white">
              <span class="mr-2 text-lg">⏱️</span>
              <span class="font-medium">{{ experience.durationLabel }}</span>
            </div>
            <div class="flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-white">
              <span class="mr-2 text-lg">⭐</span>
              <span class="font-medium">{{ experience.highlights[0] }}</span>
            </div>
            <div v-if="experience.priceFrom" class="flex items-center rounded-full bg-amber-500/90 backdrop-blur-sm px-4 py-2 text-white">
              <span class="mr-2 text-lg">💵</span>
              <span class="font-medium">From ${{ experience.priceFrom }}</span>
            </div>
          </div>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col gap-4 sm:flex-row">
            <button class="rounded-2xl bg-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-amber-600 hover:shadow-xl focus:ring-2 focus:ring-amber-300">
              Inquire Now
            </button>
            <button class="rounded-2xl border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-xl focus:ring-2 focus:ring-white">
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 2) OVERVIEW -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-8 text-3xl font-bold text-gray-900 lg:text-4xl">
          Experience Overview
        </h2>
        
        <div class="prose prose-lg max-w-none text-gray-600">
          <p class="mb-6 leading-relaxed">
            {{ experience.description }}
          </p>
        </div>
        
        <div class="mt-10 rounded-2xl bg-linear-to-r from-amber-50 to-yellow-50 p-6">
          <h3 class="mb-4 text-xl font-semibold text-gray-900">Key Highlights</h3>
          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="(highlight, index) in experience.highlights" :key="index" class="flex items-start">
              <div class="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100">
                <div class="h-2 w-2 rounded-full bg-amber-500"></div>
              </div>
              <span class="text-gray-700">{{ highlight }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3) EXPERIENCE DETAILS -->
    <section class="py-16 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-10 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
          Experience Details
        </h2>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <div class="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">🎯</div>
            <h3 class="mb-2 text-sm font-semibold text-gray-500">Type</h3>
            <p class="text-xl font-bold text-gray-900">{{ experience.type }}</p>
          </div>
          
          <div class="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">📍</div>
            <h3 class="mb-2 text-sm font-semibold text-gray-500">Region</h3>
            <p class="text-xl font-bold text-gray-900">{{ experience.region }}</p>
          </div>
          
          <div class="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">⏱️</div>
            <h3 class="mb-2 text-sm font-semibold text-gray-500">Duration</h3>
            <p class="text-xl font-bold text-gray-900">{{ experience.durationLabel }}</p>
          </div>
          
          <div class="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">💵</div>
            <h3 class="mb-2 text-sm font-semibold text-gray-500">Starting Price</h3>
            <p v-if="experience.priceFrom" class="text-xl font-bold text-amber-600">${{ experience.priceFrom }}</p>
            <p v-else class="text-xl font-bold text-gray-900">Price on request</p>
          </div>
          
          <div class="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="mb-3 text-3xl">🌤️</div>
            <h3 class="mb-2 text-sm font-semibold text-gray-500">Best Time</h3>
            <p class="text-xl font-bold text-gray-900">Year-round</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4) ITINERARY / WHAT YOU'LL DO -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-10 text-3xl font-bold text-gray-900 lg:text-4xl">
          What You'll Do
        </h2>
        
        <div class="space-y-8">
          <div v-for="(step, index) in experience.itinerary" :key="index" 
            class="group overflow-hidden rounded-2xl bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div class="p-6 sm:p-8">
              <div class="flex items-start">
                <div class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-yellow-500 text-xl font-bold text-white">
                  {{ index + 1 }}
                </div>
                <div class="flex-1">
                  <h3 class="mb-3 text-xl font-bold text-gray-900">{{ step.title }}</h3>
                  <p class="text-gray-600">{{ step.description }}</p>
                </div>
              </div>
              <div v-if="step.image" class="mt-6 overflow-hidden rounded-xl">
                <img 
                  :src="step.image" 
                  :alt="step.title"
                  class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5) WHAT'S INCLUDED / NOT INCLUDED -->
    <section class="py-16 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-10 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
          What's Included
        </h2>
        
        <div class="grid gap-8 md:grid-cols-2">
          <!-- Included -->
          <div class="rounded-2xl bg-white p-8 shadow-sm">
            <div class="mb-6 flex items-center">
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <span class="text-xl text-emerald-600">✓</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">Included</h3>
            </div>
            
            <div class="space-y-4">
              <div v-for="(item, index) in experience.included" :key="index" class="flex items-start">
                <div class="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
                  <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
                </div>
                <span class="text-gray-700">{{ item }}</span>
              </div>
            </div>
          </div>
          
          <!-- Not Included -->
          <div class="rounded-2xl bg-white p-8 shadow-sm">
            <div class="mb-6 flex items-center">
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <span class="text-xl text-red-600">✗</span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">Not Included</h3>
            </div>
            
            <div class="space-y-4">
              <div v-for="(item, index) in experience.excluded" :key="index" class="flex items-start">
                <div class="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-50">
                  <div class="h-2 w-2 rounded-full bg-red-400"></div>
                </div>
                <span class="text-gray-700">{{ item }}</span>
              </div>
            </div>
            
            <div class="mt-8 rounded-xl bg-amber-50 p-4">
              <p class="text-sm text-amber-800">
                <span class="font-semibold">Note:</span> Travel insurance is highly recommended for all our experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6) IMAGE GALLERY -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-10 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
          Gallery
        </h2>
        
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div v-for="(image, index) in experience.gallery" :key="index"
            class="group relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl">
            <img 
              :src="image" 
              :alt="`${experience.title} - Image ${index + 1}`"
              class="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7) FAQ SECTION -->
    <section class="py-16 bg-gray-50">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-10 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
          Frequently Asked Questions
        </h2>
        
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in experience.faqs" 
            :key="index"
            class="rounded-2xl border border-gray-200 bg-white"
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

    <!-- 8) FINAL CTA SECTION -->
    <section class="relative overflow-hidden py-20">
      <div class="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-amber-900/70"></div>
      
      <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="mb-6 text-4xl font-bold text-white lg:text-5xl">
            Ready to book this Zanzibar experience?
          </h2>
          <p class="mx-auto mb-10 max-w-2xl text-xl text-gray-200">
            Contact our Zanzibar specialists to customize this experience or get more details.
          </p>
          
          <div class="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button 
              class="rounded-2xl bg-amber-500 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-amber-600 hover:shadow-xl focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              INQUIRE NOW
            </button>
            <button 
              class="rounded-2xl border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-xl focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Talk to an Expert
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Mock data for a single Zanzibar experience
const experience = ref({
  slug: 'safari-blue-adventure',
  title: 'Safari Blue Adventure',
  type: 'Excursion',
  region: 'South Coast',
  durationLabel: 'Full-day (8-9 hours)',
  priceFrom: 85,
  tagline: 'A full-day dhow sailing adventure exploring pristine sandbanks, snorkeling vibrant reefs, and indulging in fresh seafood.',
  description: 'Safari Blue is Zanzibar\'s premier full-day sailing adventure, offering an unforgettable experience on the crystal-clear waters of the Indian Ocean. Board a traditional wooden dhow and sail to stunning locations including Menai Bay Conservation Area, known for its abundant marine life and picturesque sandbanks. This comprehensive excursion combines snorkeling on vibrant coral reefs, relaxing on pristine sandbars, and enjoying a freshly prepared seafood barbecue lunch with local flavors.',
  highlights: [
    'Snorkeling in crystal-clear waters',
    'Traditional dhow sailing experience',
    'Fresh seafood BBQ lunch',
    'Dolphin watching opportunities',
    'Pristine sandbank relaxation',
    'Professional guides & equipment'
  ],
  itinerary: [
    {
      title: 'Morning Pickup & Dhow Boarding',
      description: 'We\'ll pick you up from your hotel and transfer you to Fumba Peninsula. After a safety briefing, board your traditional dhow and begin your sailing adventure.',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Snorkeling at Coral Reefs',
      description: 'Anchor at a protected coral reef and snorkel among colorful tropical fish. All equipment is provided, and guides will assist beginners.',
      image: 'https://images.unsplash.com/photo-1536152471326-642d7463e666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Sandbank Relaxation',
      description: 'Visit a stunning sandbank that appears only during low tide. Relax on the white sand, swim in the turquoise waters, or explore the surroundings.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Seafood BBQ Lunch',
      description: 'Enjoy a freshly prepared barbecue lunch on the beach or aboard the dhow. Feast on grilled fish, calamari, lobster (seasonal), tropical fruits, and local side dishes.',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Dolphin Spotting & Return',
      description: 'On the return sail, keep an eye out for dolphins that frequent these waters. We\'ll return to Fumba by late afternoon and transfer you back to your hotel.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ],
  included: [
    'Hotel pickup and drop-off',
    'Traditional dhow sailing',
    'Snorkeling equipment',
    'Professional guide',
    'Seafood BBQ lunch',
    'Fruit and soft drinks',
    'Conservation fees',
    'Life jackets'
  ],
  excluded: [
    'Alcoholic beverages',
    'Tips for guides and crew',
    'Personal expenses',
    'Travel insurance',
    'Swimming costumes & towels'
  ],
  faqs: [
    {
      question: 'What should I bring for the Safari Blue trip?',
      answer: 'We recommend bringing sunscreen, hat, sunglasses, swimwear, towel, camera, and comfortable clothing. Water shoes are optional but useful for walking on coral areas.',
      open: true
    },
    {
      question: 'Is this suitable for non-swimmers?',
      answer: 'Yes, non-swimmers can still enjoy the dhow sailing, sandbank visits, and lunch. The crew can provide extra flotation devices, and you can stay in shallow waters.',
      open: false
    },
    {
      question: 'What time does the tour start and end?',
      answer: 'Pickup is typically around 8:00-8:30 AM from South Coast hotels, and you\'ll return by 5:00 PM. Exact times vary slightly based on your hotel location.',
      open: false
    },
    {
      question: 'Is vegetarian food available?',
      answer: 'Yes, we can accommodate vegetarians and other dietary requirements if notified in advance. Please mention any dietary restrictions when booking.',
      open: false
    },
    {
      question: 'What happens in case of bad weather?',
      answer: 'If weather conditions are unsafe, we may reschedule your trip or offer a full refund. We monitor weather closely and will inform you as early as possible.',
      open: false
    },
    {
      question: 'Are children allowed on this trip?',
      answer: 'Yes, children of all ages are welcome. Children under 5 years usually join for free, while those 5-12 years receive a discounted rate. Please inform us if bringing children.',
      open: false
    }
  ],
  heroImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1536152471326-642d7463e666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563482776068-4dac10f9373d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1569949381669-ecf31b5c55f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ]
})

const toggleFaq = (index) => {
  experience.value.faqs[index].open = !experience.value.faqs[index].open
}

onMounted(() => {
  // In a real implementation, this would fetch data based on route params
  // const { slug } = useRoute().params
  // fetchExperience(slug)
})
</script>

<style scoped>
/* Smooth scrolling for the page */
html {
  scroll-behavior: smooth;
}

/* Improve image loading appearance */
img {
  content-visibility: auto;
}

/* Accessibility improvements */
button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>