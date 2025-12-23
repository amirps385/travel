<template>
  <div class="experiences-page">
    <!-- 1️⃣ HERO SECTION -->
    <section class="relative min-h-[90vh] flex items-center">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-br from-emerald-950 via-emerald-950/90 to-amber-950/30"></div>
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80&blend=064e3b&blend-mode=multiply"
          alt="Hot air balloon safari over Serengeti"
          class="w-full h-full object-cover scale-110 animate-parallax"
        />
        <!-- Animated floating elements -->
        <div class="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-amber-400/20 animate-float"></div>
        <div class="absolute bottom-1/3 right-20 w-6 h-6 rounded-full bg-emerald-400/10 animate-float-delayed"></div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-2xl mx-auto text-center">
          <div class="inline-flex items-center justify-center gap-3 mb-8">
            <div class="h-px w-12 bg-amber-500"></div>
            <span class="text-amber-300 font-medium tracking-widest text-sm uppercase">Premium Add-Ons</span>
          </div>
          <h1 class="text-6xl md:text-8xl font-serif font-light mb-6 tracking-tight leading-[0.9] text-white">
            <span class="block">Elevate</span>
            <span class="block text-amber-300">Your Journey</span>
          </h1>
          <p class="text-xl md:text-2xl font-light mb-10 text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Curated moments that transform your Tanzanian adventure into an unforgettable story.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              class="group relative inline-flex items-center justify-center px-10 py-5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-lg transition-all duration-500 overflow-hidden"
            >
              <span class="relative z-10">Plan Your Experience</span>
              <div class="absolute inset-0 bg-linear-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <svg class="ml-3 w-5 h-5 relative z-10 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button class="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-lg text-lg border border-white/20 transition-all duration-500 group">
              <svg class="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Preview
            </button>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div class="animate-bounce">
          <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>

    <!-- 2️⃣ INTRO SECTION -->
    <section class="py-24 bg-white relative overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-emerald-50/50 to-transparent"></div>
      <div class="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-amber-100/20 blur-3xl"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-block px-6 py-2 rounded-full bg-emerald-100 text-emerald-800 font-medium mb-8">
            Why Experiences Matter
          </div>
          <h2 class="text-5xl font-serif font-light text-emerald-900 mb-10 leading-tight">
            The <span class="text-amber-600">Art of Travel</span> is in the Details
          </h2>
          <p class="text-xl text-gray-700 leading-relaxed mb-12">
            Our carefully curated Experiences are designed to add depth, perspective, and unforgettable moments to your Tanzanian journey. 
            These are not just activities—they are <span class="font-medium text-emerald-800">memory-makers</span> that transform good trips into 
            <span class="font-medium text-emerald-800">legendary adventures</span>.
          </p>
          
          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div class="text-center">
              <div class="text-4xl font-serif text-emerald-800 mb-2">98%</div>
              <div class="text-gray-600">Guest Satisfaction</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-serif text-emerald-800 mb-2">50+</div>
              <div class="text-gray-600">Unique Experiences</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-serif text-emerald-800 mb-2">3-6h</div>
              <div class="text-gray-600">Average Duration</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-serif text-emerald-800 mb-2">24/7</div>
              <div class="text-gray-600">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3️⃣ EXPERIENCE CATEGORIES -->
    <section class="py-12 bg-emerald-900/95 sticky top-0 z-40 backdrop-blur-md">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap justify-center gap-3">
          <button 
            @click="activeFilter = 'all'"
            :class="activeFilter === 'all' 
              ? 'bg-emerald-700 text-white' 
              : 'bg-white/5 hover:bg-white/10 text-white'"
            class="group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/10"
          >
            <span class="relative z-10">All Experiences</span>
            <div class="absolute inset-0 bg-linear-to-r from-emerald-700 to-amber-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            @click="activeFilter = 'Wildlife'"
            :class="activeFilter === 'Wildlife' 
              ? 'bg-emerald-700 text-white' 
              : 'bg-white/5 hover:bg-white/10 text-white'"
            class="group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/10"
          >
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              Wildlife
            </span>
          </button>
          <button 
            @click="activeFilter = 'Culture'"
            :class="activeFilter === 'Culture' 
              ? 'bg-emerald-700 text-white' 
              : 'bg-white/5 hover:bg-white/10 text-white'"
            class="group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/10"
          >
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Culture
            </span>
          </button>
          <button 
            @click="activeFilter = 'Adventure'"
            :class="activeFilter === 'Adventure' 
              ? 'bg-emerald-700 text-white' 
              : 'bg-white/5 hover:bg-white/10 text-white'"
            class="group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/10"
          >
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Adventure
            </span>
          </button>
          <button 
            @click="activeFilter = 'Day Trips'"
            :class="activeFilter === 'Day Trips' 
              ? 'bg-emerald-700 text-white' 
              : 'bg-white/5 hover:bg-white/10 text-white'"
            class="group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/10"
          >
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Day Trips
            </span>
          </button>
          <button 
            @click="activeFilter = 'Zanzibar'"
            :class="activeFilter === 'Zanzibar' 
              ? 'bg-emerald-700 text-white' 
              : 'bg-white/5 hover:bg-white/10 text-white'"
            class="group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/10"
          >
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Zanzibar
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- 4️⃣ EXPERIENCES GRID -->
    <section class="py-24 bg-linear-to-b from-white to-emerald-50/30">
      <div class="container mx-auto px-6">
        <div v-if="filteredExperiences.length === 0" class="text-center py-20">
          <svg class="w-24 h-24 text-emerald-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-2xl font-serif text-emerald-800 mb-4">No Experiences Found</h3>
          <p class="text-gray-600 mb-8">Try selecting a different category to see available experiences.</p>
          <button 
            @click="activeFilter = 'all'"
            class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
          >
            Show All Experiences
          </button>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="experience in filteredExperiences" 
            :key="experience.id"
            class="group relative"
          >
            <!-- Card -->
            <div class="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 border border-emerald-100 h-full flex flex-col transform hover:-translate-y-2">
              <!-- Image Container -->
              <div class="relative h-72 overflow-hidden">
                <div class="absolute inset-0 bg-linear-to-t from-emerald-950/50 to-transparent z-10"></div>
                <img 
                  :src="experience.image" 
                  :alt="experience.title"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                
                <!-- Floating Badges -->
                <div class="absolute top-6 left-6 z-20">
                  <span class="px-4 py-2 bg-white/90 backdrop-blur-sm text-emerald-800 font-semibold rounded-full text-sm shadow-lg">
                    {{ experience.category }}
                  </span>
                </div>
                
                <!-- Highlight Tag -->
                <div v-if="experience.highlightTag" class="absolute top-6 right-6 z-20">
                  <span class="px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full text-sm shadow-lg animate-pulse">
                    {{ experience.highlightTag }}
                  </span>
                </div>
                
                <!-- Hover Overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-950/0 to-emerald-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              </div>
              
              <!-- Card Content -->
              <div class="p-8 grow flex flex-col">
                <h3 class="text-2xl font-serif font-light text-emerald-900 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                  {{ experience.title }}
                </h3>
                <p class="text-gray-600 mb-6 leading-relaxed grow">
                  {{ experience.shortDescription }}
                </p>
                
                <!-- Info Row -->
                <div class="flex items-center justify-between mb-8">
                  <div class="flex items-center gap-2">
                    <div class="p-2 bg-amber-100 rounded-lg">
                      <svg class="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Duration</div>
                      <div class="font-medium text-emerald-800">{{ experience.duration }}</div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <div class="p-2 bg-emerald-100 rounded-lg">
                      <svg class="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Location</div>
                      <div class="font-medium text-emerald-800">{{ experience.location }}</div>
                    </div>
                  </div>
                </div>
                
                <!-- CTA Button -->
                <button class="group relative w-full py-4 bg-linear-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-medium rounded-xl transition-all duration-500 overflow-hidden">
                  <span class="relative z-10 flex items-center justify-center gap-3">
                    View Experience
                    <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div class="absolute inset-0 bg-linear-to-r from-emerald-800 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
              
              <!-- Corner accent -->
              <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div class="absolute transform rotate-45 bg-linear-to-r from-amber-500 to-amber-600 w-24 h-12 -right-6 -top-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5️⃣ WHY ADD EXPERIENCES -->
    <section class="py-24 bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-950 relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 animate-shimmer"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 mb-6">
            <div class="h-px w-12 bg-amber-500"></div>
            <span class="text-amber-300 font-medium tracking-widest text-sm uppercase">Value Proposition</span>
          </div>
          <h2 class="text-5xl font-serif font-light text-white mb-6">
            Why These <span class="text-amber-300">Moments Matter</span>
          </h2>
          <p class="text-xl text-emerald-200 max-w-2xl mx-auto">
            Transform your journey from ordinary to extraordinary with our curated experiences
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:bg-white/10">
            <div class="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Unique Perspectives</h3>
            <p class="text-emerald-200/80 leading-relaxed">
              See Tanzania through different lenses—from treetop canopies to underwater worlds.
            </p>
          </div>
          
          <div class="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:bg-white/10">
            <div class="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Authentic Connections</h3>
            <p class="text-emerald-200/80 leading-relaxed">
              Build meaningful relationships with local communities and expert guides.
            </p>
          </div>
          
          <div class="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:bg-white/10">
            <div class="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Time Efficient</h3>
            <p class="text-emerald-200/80 leading-relaxed">
              Perfectly timed experiences that fit seamlessly into your itinerary.
            </p>
          </div>
          
          <div class="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:bg-white/10">
            <div class="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-4">Exclusive Access</h3>
            <p class="text-emerald-200/80 leading-relaxed">
              Gain entry to private reserves, hidden gems, and premium locations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6️⃣ CTA SECTION -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-emerald-700 via-emerald-800 to-amber-800"></div>
      
      <!-- Simplified grid background -->
      <div class="absolute inset-0 opacity-10 bg-grid-pattern"></div>
      
      <!-- Floating elements -->
      <div class="absolute top-20 left-10 w-32 h-32 rounded-full bg-amber-400/10 blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-3 mb-8">
            <div class="h-px w-12 bg-amber-400"></div>
            <span class="text-amber-300 font-medium tracking-widest text-sm uppercase">Ready to Elevate Your Journey?</span>
            <div class="h-px w-12 bg-amber-400"></div>
          </div>
          
          <h2 class="text-6xl md:text-7xl font-serif font-light text-white mb-10 leading-tight">
            Your <span class="text-amber-300">Unforgettable Experience</span> Awaits
          </h2>
          
          <p class="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our travel experts will craft a personalized itinerary that seamlessly blends these experiences with your main adventure.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="/contact" 
              class="group relative inline-flex items-center justify-center px-14 py-6 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-2xl text-xl transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <span class="relative z-10 flex items-center gap-4">
                Talk to a Travel Expert
                <svg class="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div class="absolute inset-0 rounded-2xl bg-linear-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
            
            <button class="group inline-flex items-center justify-center px-10 py-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-2xl text-xl border-2 border-white/20 transition-all duration-500">
              <svg class="mr-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Brochure
            </button>
          </div>
          
          <!-- Trust indicators -->
          <div class="mt-16 pt-12 border-t border-white/20">
            <p class="text-emerald-200 mb-8">Trusted by travelers worldwide</p>
            <div class="flex flex-wrap justify-center items-center gap-12 opacity-80">
              <div class="text-white font-serif text-2xl">National Geographic</div>
              <div class="text-white font-serif text-2xl">Lonely Planet</div>
              <div class="text-white font-serif text-2xl">Forbes Travel</div>
              <div class="text-white font-serif text-2xl">Conde Nast</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '#app'
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'default'
})

// Filter state
const activeFilter = ref('all')

// Mock data for experiences
const experiences = [
  {
    id: 1,
    title: 'Hot Air Balloon Safari',
    shortDescription: 'Float silently above the Serengeti at sunrise for breathtaking aerial views of wildlife and landscapes.',
    category: 'Wildlife',
    duration: '3–4 Hours',
    location: 'Serengeti',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlightTag: 'Best Seller'
  },
  {
    id: 2,
    title: 'Maasai Village Cultural Experience',
    shortDescription: 'Authentic visit to a Maasai community with traditional welcome, dancing, and insight into their nomadic lifestyle.',
    category: 'Culture',
    duration: 'Half Day',
    location: 'Ngorongoro Area',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlightTag: 'Popular'
  },
  {
    id: 3,
    title: 'Dhow Sunset Cruise',
    shortDescription: 'Traditional wooden dhow sail along the Zanzibar coast with snorkeling, fresh seafood, and spectacular sunset views.',
    category: 'Zanzibar',
    duration: '4 Hours',
    location: 'Stone Town',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlightTag: null
  },
  {
    id: 4,
    title: 'Walking Safari with Armed Guide',
    shortDescription: 'Intimate ground-level safari experience focusing on tracks, plants, insects, and smaller wildlife.',
    category: 'Adventure',
    duration: '3 Hours',
    location: 'Lake Manyara',
    image: 'https://images.unsplash.com/photo-1536152471326-642d74b6f5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlightTag: null
  },
  {
    id: 5,
    title: 'Arusha Coffee Plantation Tour',
    shortDescription: 'Behind-the-scenes tour of a working coffee estate, from bean to cup, with tasting and lunch included.',
    category: 'Day Trips',
    duration: 'Half Day',
    location: 'Arusha',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlightTag: 'Exclusive'
  },
  {
    id: 6,
    title: 'Materuni Waterfalls & Village Walk',
    shortDescription: 'Scenic hike through Chagga lands to a stunning waterfall, with traditional lunch and coffee experience.',
    category: 'Adventure',
    duration: '5–6 Hours',
    location: 'Kilimanjaro Foothills',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlightTag: 'Popular'
  }
]

// Computed property for filtered experiences
const filteredExperiences = computed(() => {
  if (activeFilter.value === 'all') {
    return experiences
  }
  return experiences.filter(exp => exp.category === activeFilter.value)
})

// SEO Configuration
useHead({
  title: 'Premium Experiences in Tanzania | ZAFS Tours',
  meta: [
    {
      name: 'description',
      content: 'Elevate your Tanzanian journey with premium curated experiences. Hot air balloon safaris, cultural immersions, exclusive wildlife encounters, and luxury add-ons.'
    },
    {
      property: 'og:image',
      content: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://zafstours.com/experiences'
    }
  ]
})

// JSON-LD structured data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'ZAFS Tours',
        description: 'Premium Tanzanian travel experiences',
        url: 'https://zafstours.com',
        offers: experiences.map(exp => ({
          '@type': 'TouristAttraction',
          name: exp.title,
          description: exp.shortDescription,
          location: {
            '@type': 'Place',
            name: exp.location
          },
          duration: exp.duration
        }))
      })
    }
  ]
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

@keyframes parallax {
  0% { transform: scale(1.1) translateY(0px); }
  100% { transform: scale(1.1) translateY(-20px); }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 7s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-parallax {
  animation: parallax 20s ease-in-out infinite alternate;
}

.animate-shimmer {
  background-size: 1000px 100%;
  animation: shimmer 3s infinite linear;
}

.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

.experiences-page {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #064e3b;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #d97706, #059669);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #b45309, #047857);
}

/* Selection color */
::selection {
  background-color: rgba(217, 119, 6, 0.3);
  color: white;
}

/* Smooth transitions for all interactive elements */
button, a {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>