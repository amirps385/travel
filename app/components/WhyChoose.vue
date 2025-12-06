<!-- components/WhyChoose.vue -->
<template>
  <section class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16">
        <!-- Badge -->
        <div class="inline-flex items-center px-4 py-2 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full text-white text-sm font-semibold mb-6 shadow-lg">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Trusted Since 2012
        </div>
        
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Why Travel With
          <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-emerald-600">ZafsTours</span>?
        </h2>
        
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          As a local Tanzania operator, we specialize in tailor-made safaris, Kilimanjaro climbs, 
          and Zanzibar holidays with personal attention and expert guidance.
        </p>
      </div>

      <!-- Trust Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 lg:mb-16 max-w-3xl mx-auto">
        <div class="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm">
          <div class="text-3xl font-bold text-emerald-600 mb-2">10+</div>
          <div class="text-gray-700 font-medium">Years Organizing Safaris</div>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm">
          <div class="text-3xl font-bold text-emerald-600 mb-2">1,000+</div>
          <div class="text-gray-700 font-medium">Happy Travellers</div>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm">
          <div class="text-3xl font-bold text-emerald-600 mb-2">5/5</div>
          <div class="text-gray-700 font-medium">Traveller Rating</div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Feature 1: Expert Local Guides -->
        <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
            <svg class="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Expert Local Guides</h3>
          <p class="text-gray-600">
            Our guides are Tanzanian-born experts with 10+ years experience. They know the best wildlife viewing spots, hidden gems, and cultural insights that only locals can provide.
          </p>
        </div>

        <!-- Feature 2: Tailor-Made Itineraries -->
        <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
            <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Tailor-Made Itineraries</h3>
          <p class="text-gray-600">
            Every journey is uniquely crafted to match your interests, pace, and budget. From luxury safaris to budget adventures, we create experiences just for you.
          </p>
        </div>

        <!-- Feature 3: Safe & Comfortable Vehicles -->
        <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-sky-100 transition-colors">
            <svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Safe & Comfortable Vehicles</h3>
          <p class="text-gray-600">
            Modern 4x4 Land Cruisers with pop-up roofs, first aid kits, and experienced drivers. Well-maintained for safety and comfort on Tanzania's varied terrain.
          </p>
        </div>

        <!-- Feature 4: Transparent, Fair Pricing -->
        <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
            <svg class="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Transparent, Fair Pricing</h3>
          <p class="text-gray-600">
            No hidden fees or surprise charges. We provide detailed cost breakdowns and offer competitive rates while ensuring fair wages for our local team.
          </p>
        </div>

        <!-- Feature 5: 24/7 On-Ground Support -->
        <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
            <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">24/7 On-Ground Support</h3>
          <p class="text-gray-600">
            Local support available throughout your trip. We handle logistics, emergencies, and last-minute changes so you can focus on enjoying your adventure.
          </p>
        </div>

        <!-- Feature 6: Ethical & Sustainable Tourism -->
        <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-sky-100 transition-colors">
            <svg class="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Ethical & Sustainable Tourism</h3>
          <p class="text-gray-600">
            We're committed to conservation, fair wages for our team, and positive community impact. Your adventure helps protect Tanzania's natural heritage.
          </p>
        </div>
      </div>

      <!-- Trust Seals -->
      <div class="mt-16 lg:mt-20 pt-12 border-t border-gray-200">
        <div class="text-center mb-10">
          <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Licensed & Trusted</h3>
          <p class="text-gray-600 max-w-2xl mx-auto">Fully certified and insured for your peace of mind</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div class="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Licensed Operator</div>
                <div class="text-sm text-gray-500">Tanzania Tourism Board</div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Fully Insured</div>
                <div class="text-sm text-gray-500">Comprehensive Coverage</div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-gray-900">5-Star Reviews</div>
                <div class="text-sm text-gray-500">TripAdvisor Excellence</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-12">
          <NuxtLink to="/journey" 
            class="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200">
            <span>Plan Your Trip Now</span>
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
          <p class="text-sm text-gray-500 mt-4">Start planning your custom Tanzania adventure today</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Simple array structure for features (optional for future expansion)
const features = [
  {
    title: "Expert Local Guides",
    description: "Our guides are Tanzanian-born experts with 10+ years experience. They know the best wildlife viewing spots, hidden gems, and cultural insights that only locals can provide.",
    icon: "people",
    color: "emerald"
  },
  {
    title: "Tailor-Made Itineraries",
    description: "Every journey is uniquely crafted to match your interests, pace, and budget. From luxury safaris to budget adventures, we create experiences just for you.",
    icon: "itinerary",
    color: "amber"
  },
  {
    title: "Safe & Comfortable Vehicles",
    description: "Modern 4x4 Land Cruisers with pop-up roofs, first aid kits, and experienced drivers. Well-maintained for safety and comfort on Tanzania's varied terrain.",
    icon: "vehicle",
    color: "sky"
  },
  {
    title: "Transparent, Fair Pricing",
    description: "No hidden fees or surprise charges. We provide detailed cost breakdowns and offer competitive rates while ensuring fair wages for our local team.",
    icon: "pricing",
    color: "emerald"
  },
  {
    title: "24/7 On-Ground Support",
    description: "Local support available throughout your trip. We handle logistics, emergencies, and last-minute changes so you can focus on enjoying your adventure.",
    icon: "support",
    color: "amber"
  },
  {
    title: "Ethical & Sustainable Tourism",
    description: "We're committed to conservation, fair wages for our team, and positive community impact. Your adventure helps protect Tanzania's natural heritage.",
    icon: "sustainable",
    color: "sky"
  }
]
</script>