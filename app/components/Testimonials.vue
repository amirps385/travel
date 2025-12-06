<template>
  <section class="relative py-24 md:py-32 lg:py-40 overflow-hidden">
    <!-- Premium Background with layered effects -->
    <div class="absolute inset-0 bg-linear-to-brrom-white via-blue-50/10 to-emerald-50/10">
      <!-- Decorative orbs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-linear-to-br from-blue-100/30 to-blue-200/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-linear-to-br from-emerald-100/30 to-emerald-200/20 rounded-full blur-3xl"></div>
      
      <!-- Subtle pattern -->
      <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(#297BD4 1px, transparent 1px); background-size: 40px 40px;"></div>
    </div>

    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <!-- Premium Header -->
      <div class="text-center max-w-4xl mx-auto mb-20 lg:mb-24">
        <!-- Badge -->
        <div class="inline-flex items-center bg-linear-to-r from-primary-blue/10 to-blue-100/50 border border-primary-blue/20 rounded-full px-6 py-2 mb-8">
          <svg class="w-5 h-5 text-primary-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
          <span class="text-primary-blue font-semibold tracking-wider text-sm">5.0 STAR RATING</span>
        </div>
        
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          Traveler Stories
          <span class="block text-4xl md:text-5xl lg:text-6xl text-primary-blue mt-2">That Inspire Journeys</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                  <!-- Image Container -->
                  <div class="relative">
                    <!-- Traveler Image -->
                    <div class="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mx-auto mb-6 border-4 border-white shadow-2xl">
                      <img 
                        :src="testimonial.image" 
                        :alt="testimonial.name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    
                    <!-- Flag Badge -->
                    <div class="absolute top-0 right-1/4 transform translate-x-1/2">
                      <div class="flex items-center bg-white px-2 py-1 rounded-full shadow-lg border border-gray-100">
                        <span class="text-base mr-1">{{ testimonial.flag }}</span>
                        <span class="text-xs font-semibold text-gray-700">{{ testimonial.countryCode }}</span>
                      </div>
                    </div>
                    
                    <!-- Rating Badge -->
                    <div class="absolute bottom-2 left-1/4 transform -translate-x-1/2">
                      <div class="flex items-center bg-linear-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full shadow-lg text-xs">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="font-bold">{{ testimonial.rating }}.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Traveler Info -->
                  <div class="text-center mt-4">
                    <h3 class="font-bold text-gray-900 text-xl mb-1">{{ testimonial.name }}</h3>
                    <p class="text-gray-500 text-sm">{{ testimonial.role }}</p>
                  </div>
                </div>

                <!-- Trip Type Indicator -->
                <div class="flex justify-center mb-6 shrink-0">
                  <div class="inline-flex items-center bg-linear-to-r from-primary-blue/10 to-blue-100/30 px-3 py-1.5 rounded-full">
                    <div class="w-2 h-2 rounded-full mr-2" :class="{
                      'bg-emerald-500': testimonial.tripType === 'Safari',
                      'bg-blue-500': testimonial.tripType === 'Kilimanjaro',
                      'bg-purple-500': testimonial.tripType === 'Zanzibar'
                    }"></div>
                    <span class="font-semibold text-primary-blue text-sm">{{ testimonial.tripType }}</span>
                    <span class="mx-2 text-gray-300">•</span>
                    <span class="text-gray-600 text-sm">{{ testimonial.duration }}</span>
                  </div>
                </div>

                <!-- Review Quote - FIXED QUOTE SYMBOLS -->
                <div class="relative mb-6 grow min-h-[180px]">
                  <div class="relative">
                    <!-- Small left quote symbol -->
                    <div class="absolute -top-2 -left-1 text-primary-blue/20">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                    
                    <!-- Review text with proper padding -->
                    <p class="text-gray-600 text-base leading-relaxed pl-6 pr-6 line-clamp-5">
                      {{ testimonial.review }}
                    </p>
                    
                    <!-- Small right quote symbol -->
                    <div class="absolute -bottom-2 -right-1 text-primary-blue/20 rotate-180">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Highlights -->
                <div class="border-t border-gray-100 pt-5 shrink-0">
                  <div class="flex flex-wrap justify-center gap-2">
                    <span v-for="highlight in testimonial.highlights" :key="highlight" 
                          class="inline-flex items-center bg-gray-50 px-2.5 py-1 rounded-full text-xs text-gray-600">
                      <svg class="w-2.5 h-2.5 mr-1.5 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      {{ highlight }}
                    </span>
                  </div>
                </div>

                <!-- Decorative Bottom Border -->
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-linear-to-r from-transparent via-primary-blue to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Modern Navigation -->
        <div class="flex items-center justify-between mt-12 px-4">
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

      <!-- Trust Indicators -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="text-4xl font-bold text-primary-blue mb-2">500+</div>
          <div class="text-gray-600">Happy Travelers</div>
        </div>
        <div class="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="text-4xl font-bold text-primary-blue mb-2">98%</div>
          <div class="text-gray-600">Satisfaction Rate</div>
        </div>
        <div class="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="text-4xl font-bold text-primary-blue mb-2">15</div>
          <div class="text-gray-600">Years Experience</div>
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

/* Modern Testimonial Card - Consistent height */
.modern-testimonial-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem 1.75rem;
  height: 100%;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 20px 60px -30px rgba(0, 0, 0, 0.1),
              0 10px 30px -15px rgba(0, 0, 0, 0.05);
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
    #3b82f6 0%, 
    #60a5fa 25%, 
    #93c5fd 50%, 
    #60a5fa 75%, 
    #3b82f6 100%);
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
  border-radius: 1.5rem 1.5rem 0 0;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.modern-testimonial-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 30px 60px -30px rgba(37, 99, 235, 0.3),
              0 15px 30px -15px rgba(0, 0, 0, 0.1);
  border-color: rgba(96, 165, 250, 0.5);
}

/* Modern Navigation Buttons */
.modern-nav-button {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e5e7eb;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.modern-nav-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modern-nav-icon {
  position: relative;
  z-index: 10;
  transition: all 0.3s ease;
  stroke: #4b5563;
}

.modern-nav-button:hover {
  transform: translateY(-2px);
  border-color: #3b82f6;
  box-shadow: 0 15px 30px -10px rgba(37, 99, 235, 0.3);
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
  background: #cbd5e1;
  border-radius: 4px;
  opacity: 0.7;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

:deep(.custom-bullet-active) {
  width: 28px;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  opacity: 1;
  box-shadow: 0 3px 10px rgba(37, 99, 235, 0.3);
}

:deep(.custom-bullet:hover) {
  background: #94a3b8;
}

/* Custom colors */
.bg-primary-blue {
  background-color: #297BD4;
}

.text-primary-blue {
  color: #297BD4;
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
</style>