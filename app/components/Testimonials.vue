<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <!-- Safari-themed background matching your other components -->
    <div class="absolute inset-0 bg-gray-900">
      <!-- Safari background image -->
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('/images/background/safari5.png')` }"
      ></div>
      
      <!-- Soft gradient overlay -->
      <div class="absolute inset-0 bg-linear-to-br from-gray-900/50 via-gray-800/40 to-amber-900/30"></div>

      <!-- Soft dark fade for text readability -->
      <div class="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/70 via-black/50 to-transparent"></div>
      
      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
    </div>

    <!-- Subtle background elements -->
    <div class="absolute top-10 left-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
      <!-- Premium Header with safari styling -->
      <div class="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
        <!-- Safari-themed badge -->
        <div class="inline-flex items-center px-5 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 rounded-full text-white font-bold mb-8 shadow-lg">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          5.0 STAR RATING
        </div>
        
        <h1 class="heading-safe text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Traveler Stories
          <span class="block text-amber-300 text-3xl md:text-4xl mt-4">That Inspire Journeys</span>
        </h1>
        
        <p class="body-safe text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Discover real experiences from adventurers who trusted ZafsTours for their Tanzanian adventures
        </p>
      </div>

      <!-- Modern Swiper Container -->
      <div class="relative px-2">
        <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :slides-per-view="1"
          :space-between="40"
          :loop="true"
          :autoplay="{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          :pagination="{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'custom-bullet',
            bulletActiveClass: 'custom-bullet-active',
          }"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :breakpoints="{
            640: { slidesPerView: 2, spaceBetween: 32 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            1280: { slidesPerView: 3, spaceBetween: 48 },
          }"
          class="modern-swiper"
        >
          <SwiperSlide v-for="(testimonial, index) in testimonials" :key="index">
            <div class="h-full px-2 py-3">
              <div class="modern-testimonial-card group h-full flex flex-col">
                <!-- Traveler Image & Info -->
                <div class="relative mb-8 shrink-0">
                  <!-- Image Container with safari styling -->
                  <div class="relative">
                    <!-- Traveler Image with safari border -->
                    <div class="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mx-auto mb-6 border-4 border-white shadow-2xl relative">
                      <div class="absolute inset-0 bg-linear-to-br from-amber-500/20 to-transparent opacity-50"></div>
                      <img 
                        :src="testimonial.image" 
                        :alt="testimonial.name"
                        class="w-full h-full object-cover relative z-10"
                      />
                      
                      <!-- Corner accents -->
                      <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
                      <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
                      <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
                      <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
                    </div>
                    
                    <!-- Flag Badge with safari styling -->
<div class="absolute -top-3 right-3 z-20">
  <div
    class="flex items-center bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg border border-amber-500/20 max-w-[180px]"
  >
    <span class="text-sm mr-1 shrink-0">{{ testimonial.flag }}</span>
    <span class="text-[11px] font-semibold text-gray-700 whitespace-nowrap">
      {{ testimonial.country }}
    </span>
  </div>
</div>

                    
                    <!-- Rating Badge with amber gradient -->
                    <div class="absolute bottom-2 left-1/4 transform -translate-x-1/2">
                      <div class="flex items-center bg-linear-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-full shadow-lg text-xs border border-amber-400/30">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="font-bold">{{ testimonial.rating }}.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Traveler Info -->
                  <div class="text-center mt-4">
                    <h3 class="font-bold text-white text-xl mb-1">{{ testimonial.name }}</h3>
                    <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
                  </div>
                </div>

                <!-- Trip Type Indicator with safari colors -->
                <div class="flex justify-center mb-6 shrink-0">
                  <div class="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <div class="w-3 h-3 rounded-full mr-2 animate-pulse" :class="{
                      'bg-amber-500': testimonial.tripType === 'Safari',
                      'bg-emerald-500': testimonial.tripType === 'Kilimanjaro',
                      'bg-blue-500': testimonial.tripType === 'Zanzibar'
                    }"></div>
                    <span class="font-semibold text-white text-sm">{{ testimonial.tripType }}</span>
                    <span class="mx-3 text-gray-400">•</span>
                    <span class="text-gray-400 text-sm">{{ testimonial.duration }}</span>
                  </div>
                </div>

                <!-- Review Quote -->
                <div class="relative mb-6 grow min-h-[180px]">
                  <div class="relative">
                    <!-- Small left quote symbol with amber color -->
                    <div class="absolute -top-2 -left-1 text-amber-400/40">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                    
                    <!-- Review text -->
                    <p class="text-gray-300 text-base leading-relaxed pl-6 pr-6 line-clamp-5">
                      {{ testimonial.review }}
                    </p>
                    
                    <!-- Small right quote symbol -->
                    <div class="absolute -bottom-2 -right-1 text-amber-400/40 rotate-180">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Highlights -->
                <div class="border-t border-white/10 pt-5 shrink-0">
                  <div class="flex flex-wrap justify-center gap-2">
                    <span v-for="highlight in testimonial.highlights" :key="highlight" 
                          class="inline-flex items-center bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-gray-300 border border-white/10 hover:border-amber-500/30 transition-colors">
                      <svg class="w-2.5 h-2.5 mr-1.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      {{ highlight }}
                    </span>
                  </div>
                </div>

                <!-- Decorative Bottom Border -->
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Modern Navigation with safari styling -->
        <div class="flex items-center justify-between mt-16 px-4">
          <!-- Custom Pagination -->
          <div class="custom-pagination flex items-center space-x-2"></div>
          
          <!-- Navigation Arrows -->
          <div class="flex items-center space-x-3">
            <button class="modern-nav-button swiper-button-prev group">
              <div class="modern-nav-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </div>
            </button>
            <button class="modern-nav-button swiper-button-next group">
              <div class="modern-nav-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Trust Indicators with safari styling -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-4xl font-bold text-amber-300 mb-3">1,000+</div>
          <div class="text-gray-300">Happy Travelers</div>
        </div>
        <div class="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-4xl font-bold text-emerald-300 mb-3">98%</div>
          <div class="text-gray-300">Satisfaction Rate</div>
        </div>
        <div class="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div class="text-4xl font-bold text-amber-300 mb-3">10+</div>
          <div class="text-gray-300">Years Experience</div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16 pt-12 border-t border-white/20">
        <div class="inline-flex flex-col sm:flex-row items-center gap-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg max-w-3xl mx-auto">
          <div class="text-left">
            <h4 class="text-2xl font-bold text-white mb-2">Ready to Write Your Own Story?</h4>
            <p class="text-gray-300">Join thousands of happy travelers and start planning your Tanzanian adventure today.</p>
          </div>
          <div class="flex gap-4">
            <NuxtLink 
              to="/contact" 
              class="group inline-flex items-center justify-center px-8 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Start Planning</span>
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </NuxtLink>
            <a 
              href="https://wa.me/255620285462?text=Hi%20ZafsTours,%20I%20want%20to%20plan%20my%20Tanzania%20adventure."
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
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Generate random traveler images from Unsplash
const getRandomImage = (seed) => {
  const images = [
    `https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&q=80&seed=${seed}`,
    `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&q=80&seed=${seed}`,
    `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&q=80&seed=${seed}`,
    `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&q=80&seed=${seed}`,
    `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&q=80&seed=${seed}`,
    `https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face&q=80&seed=${seed}`,
    `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face&q=80&seed=${seed}`,
    `https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face&q=80&seed=${seed}`
  ];
  return images[seed % images.length];
}

const testimonials = [
  {
    name: "Sarah Mitchell",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    role: "Adventure Photographer",
    rating: 5,
    image: getRandomImage(1),
    tripType: "Kilimanjaro",
    duration: "8 Days",
    review: "Reaching Uhuru Peak was life-changing. The guides were incredible - their knowledge and support made the entire journey unforgettable.",
    highlights: ["Expert Guides", "Perfect Planning", "Safety"]
  },
  {
    name: "James Wilson",
    country: "United Kingdom",
    countryCode: "UK",
    flag: "🇬🇧",
    role: "Wildlife Enthusiast",
    rating: 5,
    image: getRandomImage(2),
    tripType: "Safari",
    duration: "6 Days",
    review: "Witnessing the Great Migration from our private safari vehicle was surreal. Our guide's animal tracking skills were exceptional.",
    highlights: ["Big Five", "Great Migration", "Luxury"]
  },
  {
    name: "Emma Thompson",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    role: "Honeymoon Traveler",
    rating: 5,
    image: getRandomImage(3),
    tripType: "Zanzibar",
    duration: "5 Days",
    review: "Our beachfront villa in Zanzibar was paradise. The spice tour and Stone Town exploration added perfect cultural touches.",
    highlights: ["Private Beaches", "Spice Tours", "Resort"]
  },
  {
    name: "Thomas Müller",
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    role: "Solo Traveler",
    rating: 5,
    image: getRandomImage(4),
    tripType: "Kilimanjaro",
    duration: "7 Days",
    review: "As a solo climber, I felt completely supported. The team's professionalism and attention to detail were outstanding.",
    highlights: ["Solo Support", "Lemosho Route", "Summit"]
  },
  {
    name: "Maria Rodriguez",
    country: "Spain",
    countryCode: "ES",
    flag: "🇪🇸",
    role: "Family Traveler",
    rating: 5,
    image: getRandomImage(5),
    tripType: "Safari",
    duration: "4 Days",
    review: "Our children's first safari was magical. The family-friendly accommodations and knowledgeable guides made it perfect.",
    highlights: ["Family Friendly", "Kid Activities", "Lodges"]
  },
  {
    name: "David Chen",
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    role: "Photography Guide",
    rating: 5,
    image: getRandomImage(6),
    tripType: "Zanzibar",
    duration: "3 Days",
    review: "The turquoise waters and historic Stone Town provided endless photography opportunities. A truly inspiring destination.",
    highlights: ["Photography", "Crystal Waters", "Culture"]
  }
]
</script>

<style scoped>
/* Modern Swiper Container */
.modern-swiper {
  padding-bottom: 20px !important;
}

/* Modern Testimonial Card - Safari themed glass morphism */
.modern-testimonial-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2rem 1.75rem;
  height: 100%;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.modern-testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    rgba(245, 158, 11, 0) 0%, 
    rgba(245, 158, 11, 0.6) 50%, 
    rgba(245, 158, 11, 0) 100%);
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
  border-radius: 1.5rem 1.5rem 0 0;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.modern-testimonial-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(245, 158, 11, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Modern Navigation Buttons with safari styling */
.modern-nav-button {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.modern-nav-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(217, 119, 6, 0.8) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modern-nav-icon {
  position: relative;
  z-index: 10;
  transition: all 0.3s ease;
  stroke: rgba(255, 255, 255, 0.8);
}

.modern-nav-button:hover {
  transform: translateY(-2px);
  border-color: rgba(245, 158, 11, 0.5);
  box-shadow: 0 15px 30px -10px rgba(245, 158, 11, 0.3);
}

.modern-nav-button:hover::before {
  opacity: 1;
}

.modern-nav-button:hover .modern-nav-icon {
  stroke: white;
}

/* Custom Pagination */
:deep(.custom-bullet) {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  opacity: 0.7;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

:deep(.custom-bullet-active) {
  width: 28px;
  background: linear-gradient(90deg, #f59e0b, #d97706);
  opacity: 1;
  box-shadow: 0 3px 10px rgba(245, 158, 11, 0.3);
}

:deep(.custom-bullet:hover) {
  background: rgba(245, 158, 11, 0.5);
}

/* Safari color scheme */
.bg-linear-to-r.from-amber-500.to-amber-600 {
  background-image: linear-gradient(to right, #f59e0b, #d97706);
}

/* Image styling */
img {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modern-testimonial-card:hover img {
  transform: scale(1.1);
}

/* Line clamp for consistent text height */
.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 5;
}

/* Text readability */
.heading-safe {
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.85);
}

.body-safe {
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.75);
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .modern-testimonial-card {
    padding: 2.25rem 2rem;
    min-height: 540px;
  }
}

@media (min-width: 1024px) {
  .modern-testimonial-card {
    padding: 2.5rem 2.25rem;
    min-height: 560px;
  }
}

/* Ensure all cards have same height */
.swiper-slide {
  height: auto;
}

/* Smooth transitions */
.modern-testimonial-card,
.modern-nav-button,
:deep(.custom-bullet) {
  will-change: transform, box-shadow;
}

/* Glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>