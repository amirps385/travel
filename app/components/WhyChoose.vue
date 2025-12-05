<!-- components/WhyChoose.vue -->
<template>
  <!-- Section Separator -->
  <div class="relative">
    <!-- Wave separator -->
    <div class="absolute top-0 left-0 right-0 h-12 -translate-y-1/2 overflow-hidden">
      <svg class="absolute w-full h-full text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity=".25"></path>
      </svg>
    </div>
  </div>

  <section class="py-20 bg-white relative">
    <!-- Background Pattern - Makes it distinct -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Subtle diagonal pattern -->
      <div class="absolute inset-0" style="background: linear-gradient(45deg, transparent 49%, rgba(20, 184, 166, 0.03) 50%, rgba(20, 184, 166, 0.03) 50%, transparent 51%); background-size: 50px 50px;"></div>
    </div>

    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header - Improved from newer version -->
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <!-- Badge from previous version (Trusted Since 2008) -->
        <div class="inline-flex items-center px-4 py-2 bg-linear-to-r from-primary-500 to-secondary-500 rounded-full text-white text-sm font-semibold mb-6 shadow-lg">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Trusted Since 2008
        </div>
        
        <!-- Heading from previous version -->
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Choose
          <span class="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-secondary-600">
            Zafstours
          </span>
        </h2>
        
        <!-- Paragraph from previous version -->
        <p class="text-xl text-gray-600">
          We combine local expertise with global standards to deliver unforgettable 
          African adventures that exceed expectations.
        </p>
      </div>

      <!-- Features Grid - BETTER CARDS from previous version -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1: Local Experts - Better card from previous version -->
        <div class="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <!-- Feature Icon from previous version -->
          <div class="absolute -top-6 left-8">
            <div class="w-14 h-14 rounded-2xl bg-linear-to-r from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          
          <!-- Feature Content from previous version -->
          <div class="mt-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
              Local Expertise
            </h3>
            <p class="text-gray-600 mb-6">
              Our team consists of Tanzanian-born guides with 10+ years of experience. 
              We know the hidden gems, best wildlife viewing spots, and cultural insights 
              that only locals can provide.
            </p>
            
            <!-- Feature Highlights from previous version -->
            <ul class="space-y-3">
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Born & raised in Tanzania
              </li>
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Fluent in English & Swahili
              </li>
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                10+ years guiding experience
              </li>
            </ul>
          </div>
          
          <!-- Hover Effect Background from previous version -->
          <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary-200 transition-all duration-300 pointer-events-none"></div>
        </div>

        <!-- Feature 2: Tailor-Made Trips - Better card from previous version -->
        <div class="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <!-- Feature Icon from previous version -->
          <div class="absolute -top-6 left-8">
            <div class="w-14 h-14 rounded-2xl bg-linear-to-r from-secondary-500 to-secondary-600 flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
            </div>
          </div>
          
          <!-- Feature Content from previous version -->
          <div class="mt-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors">
              Custom Itineraries
            </h3>
            <p class="text-gray-600 mb-6">
              Every journey is uniquely crafted to match your interests, pace, and budget. 
              From luxury safaris to budget adventures, we create experiences just for you.
            </p>
            
            <!-- Feature Highlights from previous version -->
            <ul class="space-y-3">
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Personalized trip planning
              </li>
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Flexible dates & durations
              </li>
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Budget to luxury options
              </li>
            </ul>
          </div>
          
          <!-- Stats Badge from previous version -->
          <div class="absolute -bottom-4 right-8">
            <div class="px-4 py-2 bg-linear-to-r from-secondary-100 to-secondary-50 rounded-full">
              <span class="text-sm font-semibold text-secondary-700">500+ Custom Trips</span>
            </div>
          </div>
          
          <!-- Hover Effect Background from previous version -->
          <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-secondary-200 transition-all duration-300 pointer-events-none"></div>
        </div>

        <!-- Feature 3: Responsible Travel - Better card from previous version -->
        <div class="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <!-- Feature Icon from previous version -->
          <div class="absolute -top-6 left-8">
            <div class="w-14 h-14 rounded-2xl bg-linear-to-r from-ocean-500 to-ocean-600 flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          
          <!-- Feature Content from previous version -->
          <div class="mt-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-ocean-600 transition-colors">
              Sustainable Tourism
            </h3>
            <p class="text-gray-600 mb-6">
              We're committed to conservation, fair wages for our team, and positive 
              community impact. Your adventure helps protect Tanzania's natural heritage.
            </p>
            
            <!-- Feature Highlights from previous version -->
            <ul class="space-y-3">
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Fair wages for guides & porters
              </li>
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Conservation partnerships
              </li>
              <li class="flex items-center text-sm text-gray-600">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Community development projects
              </li>
            </ul>
          </div>
          
          <!-- Certification Badge from previous version -->
          <div class="absolute -bottom-4 right-8">
            <div class="px-4 py-2 bg-linear-to-r from-ocean-100 to-ocean-50 rounded-full">
              <span class="text-sm font-semibold text-ocean-700">Eco-Certified</span>
            </div>
          </div>
          
          <!-- Hover Effect Background from previous version -->
          <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-ocean-200 transition-all duration-300 pointer-events-none"></div>
        </div>
      </div>

      <!-- Stats Section - Improved design from newer version -->
      <div class="mt-20 pt-16 border-t border-gray-200">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Our Track Record</h3>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Numbers that speak to our commitment to excellence and customer satisfaction
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <!-- Stat 1 with gradient background from newer version -->
          <div class="bg-linear-to-br from-primary-50 to-white p-6 rounded-2xl text-center border border-primary-100">
            <div class="text-4xl font-bold text-primary-600 mb-2">15+</div>
            <div class="text-gray-700 font-medium">Years</div>
            <div class="text-sm text-gray-500">Local Experience</div>
          </div>
          
          <!-- Stat 2 with gradient background from newer version -->
          <div class="bg-linear-to-br from-secondary-50 to-white p-6 rounded-2xl text-center border border-secondary-100">
            <div class="text-4xl font-bold text-secondary-600 mb-2">98%</div>
            <div class="text-gray-700 font-medium">Success Rate</div>
            <div class="text-sm text-gray-500">Kilimanjaro Summits</div>
          </div>
          
          <!-- Stat 3 with gradient background from newer version -->
          <div class="bg-linear-to-br from-ocean-50 to-white p-6 rounded-2xl text-center border border-ocean-100">
            <div class="text-4xl font-bold text-ocean-600 mb-2">5K+</div>
            <div class="text-gray-700 font-medium">Travelers</div>
            <div class="text-sm text-gray-500">From 40 Countries</div>
          </div>
          
          <!-- Stat 4 with gradient background from newer version -->
          <div class="bg-linear-to-br from-adventure-50 to-white p-6 rounded-2xl text-center border border-adventure-100">
            <div class="text-4xl font-bold text-adventure-600 mb-2">4.9</div>
            <div class="text-gray-700 font-medium">Rating</div>
            <div class="text-sm text-gray-500">TripAdvisor</div>
          </div>
        </div>

        <!-- Trust Seals from previous version -->
        <div class="mt-12 flex flex-wrap justify-center items-center gap-8">
          <div class="flex items-center text-sm text-gray-600">
            <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <div class="font-semibold">Licensed Operator</div>
              <div class="text-xs">Tanzania Tourism Board</div>
            </div>
          </div>
          
          <div class="flex items-center text-sm text-gray-600">
            <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <div class="font-semibold">Fully Insured</div>
              <div class="text-xs">Comprehensive Coverage</div>
            </div>
          </div>
          
          <div class="flex items-center text-sm text-gray-600">
            <div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <div>
              <div class="font-semibold">5-Star Reviews</div>
              <div class="text-xs">TripAdvisor Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Pointer events utility */
.pointer-events-none {
  pointer-events: none;
}
</style>