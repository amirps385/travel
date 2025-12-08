<!-- components/WhyChoose.vue -->
<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <!-- Safari-themed background with overlay -->
    <div class="absolute inset-0 bg-gray-900">
      <!-- Safari background image -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('/images/background/safari1.png')` }"
      ></div>
      
      <!-- Soft gradient only -->
      <div class="absolute inset-0 bg-linear-to-br from-gray-900/40 via-gray-800/30 to-amber-900/30"></div>

      <!-- Soft dark fade just behind the text (top half) -->
      <div class="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/65 via-black/45 to-transparent"></div>
      
      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
    </div>

    <!-- Subtle background elements -->
    <div class="absolute top-20 right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
      <!-- Section Header with safari touch -->
      <div class="text-center mb-16 lg:mb-20">
        <!-- Safari-themed badge -->
        <div class="inline-flex items-center px-5 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 rounded-full text-white font-bold mb-6 shadow-lg">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Trusted Since 2012
        </div>
        
        <h2 class="heading-safe text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Why Travel With
          <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-300">ZafsTours</span>?
        </h2>
        
        <p class="body-safe text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          As a local Tanzania operator, we specialize in tailor-made safaris, Kilimanjaro climbs, 
          and Zanzibar holidays with personal attention and expert guidance.
        </p>
      </div>

      <!-- Trust Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 lg:mb-20 max-w-3xl mx-auto">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-4xl font-bold text-amber-300 mb-3 flex items-center justify-center">
            <span>10+</span>
            <svg class="w-6 h-6 ml-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="text-lg font-semibold text-white">Years Organizing Safaris</div>
          <div class="text-sm text-gray-300 mt-2">Local Experience</div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-4xl font-bold text-emerald-300 mb-3">1,000+</div>
          <div class="text-lg font-semibold text-white">Happy Travellers</div>
          <div class="text-sm text-gray-300 mt-2">4.9/5 Rating</div>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-4xl font-bold text-amber-300 mb-3 flex items-center justify-center">
            <span>5/5</span>
            <svg class="w-6 h-6 ml-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div class="text-lg font-semibold text-white">Traveller Rating</div>
          <div class="text-sm text-gray-300 mt-2">TripAdvisor Excellence</div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1: Expert Local Guides -->
        <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
          <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div class="absolute top-0 right-0 w-8 h-8 bg-amber-500/20 transform rotate-45 translate-x-4 -translate-y-4"></div>
          </div>
          
          <div class="w-14 h-14 rounded-xl bg-linear-to-br from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">Expert Local Guides</h3>
          <p class="text-gray-300 leading-relaxed">
            Our guides are Tanzanian-born experts with 10+ years experience. They know the best wildlife viewing spots, hidden gems, and cultural insights that only locals can provide.
          </p>
        </div>

        <!-- Feature 2: Tailor-Made Itineraries -->
        <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
          <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div class="absolute top-0 right-0 w-8 h-8 bg-emerald-500/20 transform rotate-45 translate-x-4 -translate-y-4"></div>
          </div>
          
          <div class="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">Tailor-Made Itineraries</h3>
          <p class="text-gray-300 leading-relaxed">
            Every journey is uniquely crafted to match your interests, pace, and budget. From luxury safaris to budget adventures, we create experiences just for you.
          </p>
        </div>

        <!-- Feature 3: Safe & Comfortable Vehicles -->
        <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
          <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div class="absolute top-0 right-0 w-8 h-8 bg-amber-500/20 transform rotate-45 translate-x-4 -translate-y-4"></div>
          </div>
          
          <div class="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">Safe & Comfortable Vehicles</h3>
          <p class="text-gray-300 leading-relaxed">
            Modern 4x4 Land Cruisers with pop-up roofs, first aid kits, and experienced drivers. Well-maintained for safety and comfort on Tanzania's varied terrain.
          </p>
        </div>

        <!-- Feature 4: Transparent, Fair Pricing -->
        <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
          <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div class="absolute top-0 right-0 w-8 h-8 bg-emerald-500/20 transform rotate-45 translate-x-4 -translate-y-4"></div>
          </div>
          
          <div class="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">Transparent, Fair Pricing</h3>
          <p class="text-gray-300 leading-relaxed">
            No hidden fees or surprise charges. We provide detailed cost breakdowns and offer competitive rates while ensuring fair wages for our local team.
          </p>
        </div>

        <!-- Feature 5: 24/7 On-Ground Support -->
        <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
          <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div class="absolute top-0 right-0 w-8 h-8 bg-amber-500/20 transform rotate-45 translate-x-4 -translate-y-4"></div>
          </div>
          
          <div class="w-14 h-14 rounded-xl bg-linear-to-br from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">24/7 On-Ground Support</h3>
          <p class="text-gray-300 leading-relaxed">
            Local support available throughout your trip. We handle logistics, emergencies, and last-minute changes so you can focus on enjoying your adventure.
          </p>
        </div>

        <!-- Feature 6: Ethical & Sustainable Tourism -->
        <div class="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
          <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div class="absolute top-0 right-0 w-8 h-8 bg-emerald-500/20 transform rotate-45 translate-x-4 -translate-y-4"></div>
          </div>
          
          <div class="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">Ethical & Sustainable Tourism</h3>
          <p class="text-gray-300 leading-relaxed">
            We're committed to conservation, fair wages for our team, and positive community impact. Your adventure helps protect Tanzania's natural heritage.
          </p>
        </div>
      </div>

      <!-- Trust Seals -->
      <div class="mt-20 lg:mt-24 pt-16 border-t border-white/20">
        <div class="text-center mb-12">
          <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">Licensed & Trusted</h3>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">Fully certified and insured for your peace of mind</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="flex items-center justify-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center">
              <div class="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mr-5">
                <svg class="w-8 h-8 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="text-xl font-bold text-white">Licensed Operator</div>
                <div class="text-gray-300 mt-1">Tanzania Tourism Board</div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center">
              <div class="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mr-5">
                <svg class="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="text-xl font-bold text-white">Fully Insured</div>
                <div class="text-gray-300 mt-1">Comprehensive Coverage</div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-center">
              <div class="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center mr-5">
                <svg class="w-8 h-8 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div>
                <div class="text-xl font-bold text-white">5-Star Reviews</div>
                <div class="text-gray-300 mt-1">TripAdvisor Excellence</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-16">
          <div class="inline-flex flex-col sm:flex-row items-center gap-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg max-w-3xl mx-auto">
            <div class="text-left">
              <h4 class="text-2xl font-bold text-white mb-2">Ready for Your Tanzania Adventure?</h4>
              <p class="text-gray-300">Start planning your custom safari, Kilimanjaro climb, or Zanzibar holiday today.</p>
            </div>
            <div class="flex gap-4">
              <NuxtLink 
                to="/journey" 
                class="group inline-flex items-center justify-center px-8 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Plan Your Trip Now</span>
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
              <a 
                href="https://wa.me/255620285462?text=Hi%20ZafsTours,%20I%20want%20to%20plan%20a%20Tanzania%20trip."
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span class="mr-2">💬</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Simple array structure for features (kept for future dynamic use if needed)
const features = [
  {
    title: "Expert Local Guides",
    description: "Our guides are Tanzanian-born experts with 10+ years experience. They know the best wildlife viewing spots, hidden gems, and cultural insights that only locals can provide.",
    icon: "people",
    color: "amber"
  },
  {
    title: "Tailor-Made Itineraries",
    description: "Every journey is uniquely crafted to match your interests, pace, and budget. From luxury safaris to budget adventures, we create experiences just for you.",
    icon: "itinerary",
    color: "emerald"
  },
  {
    title: "Safe & Comfortable Vehicles",
    description: "Modern 4x4 Land Cruisers with pop-up roofs, first aid kits, and experienced drivers. Well-maintained for safety and comfort on Tanzania's varied terrain.",
    icon: "vehicle",
    color: "blue"
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
    color: "blue"
  }
]
</script>

<style scoped>
/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhanced shadow for depth */
.shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.shadow-xl {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
}

/* Glass effect for cards */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Background image styling */
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

/* Text gradient for safari theme (if you want to reuse) */
.text-gradient-safari {
  background: linear-gradient(135deg, #f59e0b 0%, #10b981 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Extra readability for hero heading & subheading */
.heading-safe {
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.85);
}

.body-safe {
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.75);
}

/* Responsive background image adjustments */
@media (max-width: 768px) {
  .bg-cover {
    background-position: 70% center;
  }
}
</style>
