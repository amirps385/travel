<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <!-- Safari-themed background matching your other components -->
    <div class="absolute inset-0 bg-gray-900">
      <!-- Safari background image -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('/images/background/safari6.png')` }"
      ></div>

      <!-- Soft gradient overlay -->
      <div class="absolute inset-0 bg-linear-to-br from-gray-900/50 via-gray-800/40 to-amber-900/30"></div>

      <!-- Soft dark fade for text readability -->
      <div class="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/70 via-black/50 to-transparent"></div>

      <!-- Subtle pattern overlay -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)]"
      ></div>
    </div>

    <!-- Subtle background elements -->
    <div class="absolute top-10 left-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
      <!-- Main Card with safari glass morphism -->
      <div class="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <!-- Top accent border with safari gradient -->
        <div class="h-2 bg-linear-to-r from-amber-400 via-amber-500 to-emerald-500"></div>

        <div class="flex flex-col lg:flex-row items-stretch">
          <!-- Left: Content -->
          <div class="lg:w-3/5 p-8 md:p-10 lg:p-12">
            <div class="h-full flex flex-col justify-center">
              <!-- Safari-themed badge -->
              <div class="inline-flex items-center mb-6">
                <div class="w-12 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
                <span class="mx-4 text-amber-300 font-semibold tracking-wider text-sm uppercase">
                  Free Consultation
                </span>
                <div class="w-12 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
              </div>

              <!-- Heading -->
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Free 30-minute call with our travel expert
              </h2>

              <!-- Description -->
              <p class="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                Book a free 30-minute call to get personalized advice about safaris, Kilimanjaro routes, and the best
                times to visit Tanzania.
              </p>

              <!-- CTA Button -->
              <div class="mt-4">
                <a
                  :href="calendlyLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex items-center justify-center bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg border border-amber-400/30 hover:border-amber-300/40"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <span>Book a Free Call</span>
                  <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>

                <!-- Trust indicator -->
                <p class="mt-4 text-sm text-gray-400 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  No obligation • No credit card required • Expert advice guaranteed
                </p>
              </div>

              <!-- Benefits list -->
              <div class="mt-8 space-y-3">
                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-gray-300 font-medium">Get answers to all your travel questions</span>
                </div>
                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <svg class="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-gray-300 font-medium">Personalized itinerary suggestions</span>
                </div>
                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                    <svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-gray-300 font-medium">Local insights you won't find online</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Expert Profile with safari styling -->
          <div class="lg:w-2/5 bg-white/5 backdrop-blur-sm p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/20">
            <div class="text-center">
              <!-- Expert Image -->
              <div class="relative mb-6 flex justify-center">
                <!-- Small relative wrapper only around the avatar -->
                <div class="relative inline-block">
                  <!-- Avatar circle -->
                  <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl group">
                    <div
                      class="absolute inset-0 bg-linear-to-br from-amber-500/20 to-emerald-500/20 opacity-50 group-hover:opacity-30 transition-opacity"
                    ></div>
                    <img
                      :src="expertImage"
                      alt="Aya - Tanzania Travel Expert"
                      class="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-500"
                    />

                    <!-- Corner accents -->
                    <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
                    <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
                    <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
                    <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
                  </div>

                  <!-- Verified badge: bottom-right, slightly outside -->
                  <div class="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 z-30">
                    <div
                      class="w-11 h-11 md:w-12 md:h-12 rounded-full bg-linear-to-r from-emerald-500 to-emerald-600
                             flex items-center justify-center shadow-xl border-2 border-white/40"
                    >
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Expert Info -->
              <div class="mb-6">
                <div class="flex items-center justify-center mb-2">
                  <h3 class="text-2xl md:text-3xl font-bold text-white mr-2">Aya</h3>
                </div>
                <p class="text-amber-300 font-medium">Tanzania Travel Expert</p>
                <p class="text-gray-400 text-sm mt-1">15+ years experience in Tanzanian tourism</p>
              </div>

              <!-- Expert Stats -->
              <div class="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-6">
                <div class="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-2xl font-bold text-amber-300 mb-1">15+</div>
                  <div class="text-xs text-gray-400">Years</div>
                </div>
                <div class="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-2xl font-bold text-emerald-300 mb-1">500+</div>
                  <div class="text-xs text-gray-400">Trips</div>
                </div>
                <div class="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-2xl font-bold text-amber-300 mb-1">100%</div>
                  <div class="text-xs text-gray-400">Satisfaction</div>
                </div>
              </div>

              <!-- Expertise tags -->
              <div class="mt-4 flex flex-wrap justify-center gap-2">
                <span
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    ></path>
                  </svg>
                  Kilimanjaro
                </span>
                <span
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                    ></path>
                  </svg>
                  Safari
                </span>
                <span
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                  </svg>
                  Zanzibar
                </span>
              </div>

              <!-- Availability indicator -->
              <div class="mt-6 flex items-center justify-center text-sm text-gray-400">
                <div class="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                <span>Available for calls today</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom accent border -->
        <div class="h-2 bg-linear-to-r from-emerald-500 via-amber-500 to-amber-400"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const calendlyLink = 'https://calendly.com/zafstours/consultation'

// Real travel expert images from Unsplash
const expertImages = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face&q=80', // Professional African woman
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&q=80', // Smiling woman outdoors
  'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face&q=80', // Confident business woman
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&q=80', // Professional smiling woman
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&q=80', // Friendly professional woman
  'https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=400&h=400&fit=crop&crop=face&q=80' // Travel guide style
]

// Pick a random expert image
const expertImage = expertImages[Math.floor(Math.random() * expertImages.length)]
</script>

<style scoped>
/* Smooth transitions */
a,
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Shadow utilities */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

/* Availability pulse animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Safari color gradients */
.bg-linear-to-r.from-amber-500.to-amber-600 {
  background-image: linear-gradient(to right, #f59e0b, #d97706);
}

.hover\:from-amber-600:hover {
  --tw-gradient-from: #d97706;
}

.hover\:to-amber-700:hover {
  --tw-gradient-to: #b45309;
}

/* Text readability */
.heading-safe {
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.85);
}

/* Background image styling */
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

/* Ensure image covers properly */
.object-cover {
  object-fit: cover;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg\:border-l {
    border-left: 0;
  }

  .lg\:border-t-0 {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
}

/* Image zoom on hover */
.group:hover img {
  transform: scale(1.05);
}

/* Ensure proper z-index stacking */
.relative.z-10 {
  position: relative;
  z-index: 10;
}
</style>
