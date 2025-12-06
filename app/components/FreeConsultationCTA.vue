<template>
  <section class="relative py-20 md:py-24 lg:py-28">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-linear-to-br from-white via-blue-50/10 to-slate-50/30"></div>
    
    <!-- Decorative elements -->
    <div class="absolute top-20 right-10 w-80 h-80 bg-blue-100/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-10 w-80 h-80 bg-emerald-100/10 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <!-- Main Card -->
      <div class="max-w-5xl mx-auto">
        <div class="bg-linear-to-br from-white via-white to-amber-50/30 rounded-3xl shadow-xl overflow-hidden border border-amber-200/40">
          <!-- Top accent border -->
          <div class="h-1.5 bg-linear-to-r from-primary-blue via-emerald-500 to-primary-blue"></div>
          
          <div class="flex flex-col lg:flex-row items-stretch">
            <!-- Left: Content -->
            <div class="lg:w-3/5 p-8 md:p-10 lg:p-12">
              <div class="h-full flex flex-col justify-center">
                <!-- Badge -->
                <div class="inline-flex items-center mb-6">
                  <div class="w-12 h-1 bg-linear-to-r from-transparent via-primary-blue to-transparent rounded-full"></div>
                  <span class="mx-4 text-primary-blue font-semibold tracking-wider text-sm uppercase">Free Consultation</span>
                  <div class="w-12 h-1 bg-linear-to-r from-transparent via-primary-blue to-transparent rounded-full"></div>
                </div>
                
                <!-- Heading -->
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Free 30-minute call with our travel expert
                </h2>
                
                <!-- Description -->
                <p class="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
                  Book a free 30-minute call to get personalized advice about safaris, Kilimanjaro routes, and the best times to visit Tanzania.
                </p>
                
                <!-- CTA Button -->
                <div class="mt-4">
                  <a 
                    :href="calendlyLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center justify-center bg-primary-blue hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
                  >
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span>Book a Free Call</span>
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                  
                  <!-- Trust indicator -->
                  <p class="mt-4 text-sm text-gray-500 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    No obligation • No credit card required
                  </p>
                </div>
              </div>
            </div>

            <!-- Right: Expert Profile -->
            <div class="lg:w-2/5 bg-linear-to-br from-amber-50/50 to-amber-100/20 p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-amber-200/40">
              <div class="text-center">
                <!-- Expert Image with real photo -->
                <div class="relative mb-6">
                  <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto border-4 border-white shadow-2xl">
                    <!-- Real travel expert image from Unsplash -->
                    <img 
                      :src="expertImage" 
                      alt="Aya - Tanzania Travel Expert"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  
                  <!-- Verified badge -->
                  <div class="absolute bottom-4 right-1/4 transform translate-x-1/2">
                    <div class="w-10 h-10 rounded-full bg-linear-to-r from-emerald-500 to-green-500 flex items-center justify-center shadow-lg border-2 border-white">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <!-- Expert Info -->
                <div class="mb-6">
                  <div class="flex items-center justify-center mb-2">
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mr-2">Aya</h3>
                  </div>
                  <p class="text-gray-600 font-medium">Tanzania Travel Expert</p>
                  <p class="text-gray-500 text-sm mt-1">15+ years experience</p>
                </div>
                
                <!-- Expert Stats -->
                <div class="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-6">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary-blue mb-1">15+</div>
                    <div class="text-xs text-gray-500">Years</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary-blue mb-1">500+</div>
                    <div class="text-xs text-gray-500">Trips</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary-blue mb-1">100%</div>
                    <div class="text-xs text-gray-500">Satisfaction</div>
                  </div>
                </div>
                
                <!-- Expertise tags -->
                <div class="mt-4 flex flex-wrap justify-center gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                    Kilimanjaro
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                    </svg>
                    Safari
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    </svg>
                    Zanzibar
                  </span>
                </div>
                
                <!-- Availability indicator -->
                <div class="mt-6 flex items-center justify-center text-sm text-gray-600">
                  <div class="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  <span>Available for calls today</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom accent border -->
          <div class="h-1.5 bg-linear-to-r from-primary-blue via-emerald-500 to-primary-blue"></div>
        </div>
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
  'https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=400&h=400&fit=crop&crop=face&q=80', // Travel guide style
]

// Pick a random expert image
const expertImage = expertImages[Math.floor(Math.random() * expertImages.length)]
</script>

<style scoped>
/* Custom color definitions */
.bg-primary-blue {
  background-color: #297BD4;
}

.text-primary-blue {
  color: #297BD4;
}

/* Smooth transitions */
a, button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Image hover effect */
img {
  transition: transform 0.5s ease;
}

.group:hover img {
  transform: scale(1.05);
}

/* Border gradients */
.border-amber-200\/40 {
  border-color: rgba(253, 230, 138, 0.4);
}

/* Shadow utilities */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Availability pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg\:border-l {
    border-left: 0;
  }
  
  .lg\:border-t-0 {
    border-top: 1px solid rgba(253, 230, 138, 0.4);
  }
}

/* Ensure image covers properly */
.object-cover {
  object-fit: cover;
}
</style>