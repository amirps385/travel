<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-linear-to-br from-emerald-900 via-emerald-800 to-amber-900 min-h-[80vh] flex items-center">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
      </div>
      
      <div class="relative z-10 container mx-auto px-6 lg:px-8 py-20">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-3 mb-6">
            <div class="w-16 h-1 bg-amber-400"></div>
            <span class="text-amber-400 font-semibold tracking-wider uppercase text-sm">Gallery</span>
            <div class="w-16 h-1 bg-amber-400"></div>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Moments from 
            <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-emerald-300">Tanzania</span>
          </h1>
          
          <p class="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in the breathtaking beauty of Tanzania through our curated collection of unforgettable moments and adventures.
          </p>
          
          <NuxtLink 
            to="/contact"
            class="group inline-flex items-center gap-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-amber-500/20"
          >
            <span>Start Your Journey</span>
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-20 bg-linear-to-b from-white to-gray-50">
      <div class="container mx-auto px-6 lg:px-8">
        <!-- Filter Section -->
        <div class="mb-16 text-center">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Explore by Category</h2>
          <p class="text-gray-600 mb-10 max-w-2xl mx-auto">Filter through our collection of stunning Tanzanian moments</p>
          
          <div class="flex flex-wrap justify-center gap-3">
            <button
              v-for="filter in filters"
              :key="filter"
              @click="activeFilter = filter"
              :class="[
                'group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105',
                activeFilter === filter 
                  ? 'bg-linear-to-r from-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-500/20' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
              ]"
              :aria-label="`Show ${filter} images`"
              :aria-pressed="activeFilter === filter"
            >
              <span class="relative z-10">{{ filter }}</span>
              <span 
                v-if="activeFilter === filter"
                class="absolute inset-0 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-700"
              ></span>
            </button>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div
            v-for="item in displayedItems"
            :key="item.id"
            class="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            @click="openModal(item)"
            @keydown.enter="openModal(item)"
            tabindex="0"
            role="button"
            :aria-label="`View ${item.title} image`"
          >
            <!-- Image Container -->
            <div class="relative aspect-4/3 overflow-hidden">
              <picture>
                <source
                  type="image/webp"
                  :srcset="`
                    ${item.images.webp['640']} 640w,
                    ${item.images.webp['1024']} 1024w,
                    ${item.images.webp['1600']} 1600w
                  `"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                >
                <img
                  :src="item.images.jpg['640']"
                  :srcset="`
                    ${item.images.jpg['640']} 640w,
                    ${item.images.jpg['1024']} 1024w,
                    ${item.images.jpg['1600']} 1600w
                  `"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  :alt="item.alt"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </picture>
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div class="flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span class="font-medium">{{ item.location }}</span>
                  </div>
                  <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
                  <div class="flex items-center gap-2 text-sm text-gray-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ formatDate(item.date) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white/90 text-emerald-700 backdrop-blur-sm">
                  {{ item.category }}
                </span>
              </div>
              
              <!-- View Icon - Fixed positioning -->
              <div class="absolute top-4 right-4 transform group-hover:translate-x-0 transition-transform duration-500">
                <div class="w-12 h-12 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Bottom Info -->
            <div class="p-6 bg-white">
              <h3 class="font-bold text-gray-800 text-lg mb-2">{{ item.title }}</h3>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span class="font-medium">{{ item.location }}</span>
                </div>
                <span class="text-sm text-amber-600 font-semibold">{{ formatDate(item.date) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div v-if="hasMoreItems" class="text-center">
          <button
            @click="loadMore"
            :disabled="loadingMore"
            class="group relative inline-flex items-center gap-4 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            :aria-label="`Load ${itemsPerPage} more images`"
          >
            <span v-if="!loadingMore" class="flex items-center gap-3">
              Load More Adventures
              <svg class="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <span v-else class="flex items-center gap-3">
              <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading Adventures...
            </span>
          </button>
          <p class="text-gray-500 mt-4 text-sm">
            Showing {{ displayedItems.length }} of {{ filteredItems.length }} incredible moments
          </p>
        </div>

        <!-- Call to Action -->
        <div class="mt-32">
          <div class="relative overflow-hidden rounded-4xl bg-linear-to-br from-emerald-900 to-emerald-800">
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80&blend=emerald-900&blend-mode=multiply')] bg-cover bg-center opacity-20"></div>
            
            <div class="relative z-10 text-center py-16 px-8">
              <div class="inline-flex items-center gap-3 mb-6">
                <div class="w-12 h-1 bg-amber-400"></div>
                <span class="text-amber-400 font-bold tracking-wider uppercase text-sm">Ready to Create Your Story?</span>
                <div class="w-12 h-1 bg-amber-400"></div>
              </div>
              
              <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
                Your Tanzanian Adventure Awaits
              </h2>
              
              <p class="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                Let us help you create unforgettable memories in the heart of Africa. Our expert team is ready to craft your perfect journey.
              </p>
              
              <div class="flex flex-col lg:flex-row gap-6 justify-center items-center">
                <NuxtLink
                  to="/contact"
                  class="group inline-flex items-center gap-4 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-amber-500/20 min-w-[200px] justify-center"
                >
                  <svg class="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Book Your Trip</span>
                </NuxtLink>
                
                <div class="flex flex-col sm:flex-row gap-6 text-white">
                  <a 
                    href="mailto:info@zafstours.com" 
                    class="group inline-flex items-center gap-3 hover:text-amber-300 transition-colors"
                  >
                    <div class="w-12 h-12 rounded-full bg-emerald-700/50 flex items-center justify-center group-hover:bg-emerald-600/70 transition-colors">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="text-left">
                      <div class="text-sm text-gray-300">Email us at</div>
                      <div class="font-bold">info@zafstours.com</div>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+255767277306" 
                    class="group inline-flex items-center gap-3 hover:text-amber-300 transition-colors"
                  >
                    <div class="w-12 h-12 rounded-full bg-emerald-700/50 flex items-center justify-center group-hover:bg-emerald-600/70 transition-colors">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div class="text-left">
                      <div class="text-sm text-gray-300">Call us at</div>
                      <div class="font-bold">+255 767 277 306</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal - Fixed with proper spacing -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/95 backdrop-blur-sm overflow-y-auto pt-16 md:pt-20"
      @click.self="closeModal"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      @keydown="handleKeydown"
      ref="modal"
    >
      <div class="relative w-full max-w-6xl my-8 md:my-12 overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-black">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          aria-label="Close lightbox"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Navigation Buttons -->
        <button
          v-if="filteredItems.length > 1"
          @click="prevImage"
          class="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          aria-label="Previous image"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          v-if="filteredItems.length > 1"
          @click="nextImage"
          class="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          aria-label="Next image"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Image Container -->
        <div class="relative h-[65vh] md:h-[70vh] flex items-center justify-center p-4 md:p-6">
          <picture class="block h-full">
            <source
              type="image/webp"
              :srcset="`
                ${currentModalItem.images.webp['640']} 640w,
                ${currentModalItem.images.webp['1024']} 1024w,
                ${currentModalItem.images.webp['1600']} 1600w
              `"
              sizes="100vw"
            >
            <img
              :src="currentModalItem.images.jpg['1600']"
              :srcset="`
                ${currentModalItem.images.jpg['640']} 640w,
                ${currentModalItem.images.jpg['1024']} 1024w,
                ${currentModalItem.images.jpg['1600']} 1600w
              `"
              sizes="100vw"
              :alt="currentModalItem.alt"
              class="h-full w-auto max-w-full object-contain rounded-xl"
            />
          </picture>
        </div>

        <!-- Caption Panel -->
        <div class="bg-linear-to-t from-black to-gray-900 p-6 md:p-8">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="flex-1">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-3">{{ currentModalItem.title }}</h3>
              
              <div class="flex flex-wrap gap-3 md:gap-4 mb-4">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-200 font-medium text-sm md:text-base">{{ currentModalItem.location }}</span>
                </div>
                
                <div v-if="currentModalItem.date" class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-200 text-sm md:text-base">{{ formatDate(currentModalItem.date) }}</span>
                </div>
                
                <div v-if="currentModalItem.photographer" class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="text-gray-300 text-sm md:text-base">Photo by {{ currentModalItem.photographer }}</span>
                </div>
              </div>
              
              <div class="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-emerald-900/50 text-emerald-300 text-sm font-bold">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                {{ currentModalItem.category }}
              </div>
            </div>
            
            <div class="text-right">
              <div class="text-3xl md:text-4xl font-bold text-amber-400 mb-2">{{ String(currentModalIndex + 1).padStart(2, '0') }}</div>
              <div class="text-gray-400 text-sm">
                of {{ String(filteredItems.length).padStart(2, '0') }} moments
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO: Replace this local galleryItems array with an API call to /api/gallery
// Expected API response shape:
// {
//   data: [
//     {
//       id: 'unique-id',
//       title: 'Image Title',
//       alt: 'Accessible alt text',
//       category: 'Safari | Zanzibar | Kilimanjaro',
//       location: 'Location name',
//       date: 'YYYY-MM',
//       photographer: 'Photographer name',
//       images: {
//         webp: {
//           '640': 'https://...w=640&fm=webp',
//           '1024': 'https://...w=1024&fm=webp',
//           '1600': 'https://...w=1600&fm=webp'
//         },
//         jpg: {
//           '640': 'https://...w=640',
//           '1024': 'https://...w=1024',
//           '1600': 'https://...w=1600'
//         }
//       }
//     }
//   ],
//   meta: {
//     total: 36,
//     page: 1,
//     perPage: 12
//   }
// }

// Sample data - replace with API call
const galleryItems = [
  {
    id: 'kili-01',
    title: 'Kilimanjaro at Dawn',
    alt: 'Golden sunrise illuminating Kilimanjaro summit with clouds below',
    category: 'Kilimanjaro',
    location: 'Uhuru Peak, Kilimanjaro',
    date: '2024-01',
    photographer: 'Juma Hassan',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'safari-01',
    title: 'Elephant Family Gathering',
    alt: 'Large family of African elephants gathering at watering hole',
    category: 'Safari',
    location: 'Serengeti National Park',
    date: '2023-09',
    photographer: 'Sarah Johnson',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'zanzibar-01',
    title: 'Stone Town Sunset',
    alt: 'Vibrant sunset colors reflecting on historic Stone Town buildings',
    category: 'Zanzibar',
    location: 'Stone Town, Zanzibar',
    date: '2023-12',
    photographer: 'Ali Mohammed',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'safari-02',
    title: 'Lion Pride Resting',
    alt: 'Majestic lion pride resting under acacia tree at golden hour',
    category: 'Safari',
    location: 'Ngorongoro Crater',
    date: '2023-08',
    photographer: 'David Wilson',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'kili-02',
    title: 'Summit Celebration',
    alt: 'Hikers celebrating victory at Uhuru Peak summit marker',
    category: 'Kilimanjaro',
    location: 'Uhuru Peak',
    date: '2024-02',
    photographer: 'Michael Chen',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'zanzibar-02',
    title: 'Turquoise Paradise',
    alt: 'Crystal clear turquoise waters of Zanzibar beaches with white sand',
    category: 'Zanzibar',
    location: 'Nungwi Beach',
    date: '2023-11',
    photographer: 'Fatima Said',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'safari-03',
    title: 'Great Migration Crossing',
    alt: 'Thousands of wildebeest crossing Mara River during great migration',
    category: 'Safari',
    location: 'Mara River, Serengeti',
    date: '2023-07',
    photographer: 'Robert Kimani',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'kili-03',
    title: 'Starry Summit Night',
    alt: 'Milky Way galaxy over Kilimanjaro summit under starry night',
    category: 'Kilimanjaro',
    location: 'Barranco Camp',
    date: '2023-08',
    photographer: 'Anna Schmidt',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'zanzibar-03',
    title: 'Spice Farm Harvest',
    alt: 'Fresh spices and fruits harvested from Zanzibar spice farm',
    category: 'Zanzibar',
    location: 'Spice Farms, Zanzibar',
    date: '2023-10',
    photographer: 'Hamisi Juma',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1573843989-c9d7ad2f094b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'safari-04',
    title: 'Cheetah on the Hunt',
    alt: 'Cheetah scanning the savannah landscape for prey opportunities',
    category: 'Safari',
    location: 'Tarangire National Park',
    date: '2023-09',
    photographer: 'Lisa Wang',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'kili-04',
    title: 'Glacier Majesty',
    alt: 'Remaining glaciers on Kilimanjaro with dramatic cloud formations',
    category: 'Kilimanjaro',
    location: 'Arrow Glacier',
    date: '2023-07',
    photographer: 'Thomas Müller',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  },
  {
    id: 'zanzibar-04',
    title: 'Dhow Sunset Sail',
    alt: 'Traditional wooden dhow sailing into vibrant Zanzibar sunset',
    category: 'Zanzibar',
    location: 'Indian Ocean, Zanzibar',
    date: '2023-11',
    photographer: 'Carlos Rodriguez',
    images: {
      webp: {
        '640': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80&fm=webp',
        '1024': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80&fm=webp',
        '1600': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80&fm=webp'
      },
      jpg: {
        '640': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
        '1024': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
        '1600': 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      }
    }
  }
];

// Page metadata
definePageMeta({
  layout: 'default'
});

// Page head with JSON-LD structured data
useHead({
  title: 'Gallery — Breathtaking Moments from Tanzania | Zafs Tours',
  meta: [
    {
      name: 'description',
      content: 'Explore our stunning gallery of Tanzania adventures - Kilimanjaro climbs, safari wildlife, and Zanzibar paradise. Start planning your journey today.'
    },
    {
      name: 'keywords',
      content: 'Tanzania gallery, Kilimanjaro photos, Safari wildlife, Zanzibar beaches, Travel photography'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        'name': 'Zafs Tours Tanzania Gallery',
        'description': 'Premium collection of photographs from Tanzanian adventures including Kilimanjaro climbs, safari expeditions, and Zanzibar retreats',
        'url': 'https://zafstours.com/gallery',
        'image': galleryItems.slice(0, 6).map(item => ({
          '@type': 'ImageObject',
          'contentUrl': item.images.jpg['1600'],
          'name': item.title,
          'description': item.alt,
          'contentLocation': item.location,
          'datePublished': item.date ? `${item.date}-01` : undefined,
          'creator': item.photographer ? {
            '@type': 'Person',
            'name': item.photographer
          } : undefined,
          'keywords': item.category
        }))
      })
    }
  ]
});

// Reactive state
const activeFilter = ref('All');
const modalOpen = ref(false);
const currentModalItem = ref(null);
const currentModalIndex = ref(0);
const displayedItems = ref([]);
const loadedCount = ref(12);
const loadingMore = ref(false);

// Constants
const itemsPerPage = 12;
const filters = ['All', 'Safari', 'Zanzibar', 'Kilimanjaro'];

// Computed
const filteredItems = computed(() => {
  if (activeFilter.value === 'All') {
    return galleryItems;
  }
  return galleryItems.filter(item => item.category === activeFilter.value);
});

const hasMoreItems = computed(() => {
  return displayedItems.value.length < filteredItems.value.length;
});

// Methods
const formatDate = (dateString) => {
  const [year, month] = dateString.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const openModal = (item) => {
  currentModalItem.value = item;
  currentModalIndex.value = filteredItems.value.findIndex(i => i.id === item.id);
  modalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = '';
};

const nextImage = () => {
  currentModalIndex.value = (currentModalIndex.value + 1) % filteredItems.value.length;
  currentModalItem.value = filteredItems.value[currentModalIndex.value];
};

const prevImage = () => {
  currentModalIndex.value = currentModalIndex.value === 0 
    ? filteredItems.value.length - 1 
    : currentModalIndex.value - 1;
  currentModalItem.value = filteredItems.value[currentModalIndex.value];
};

const loadMore = () => {
  loadingMore.value = true;
  setTimeout(() => {
    loadedCount.value += itemsPerPage;
    updateDisplayedItems();
    loadingMore.value = false;
  }, 500);
};

const updateDisplayedItems = () => {
  displayedItems.value = filteredItems.value.slice(0, loadedCount.value);
};

// Keyboard navigation for modal
const handleKeydown = (e) => {
  if (!modalOpen.value) return;
  
  switch (e.key) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowRight':
      nextImage();
      break;
    case 'ArrowLeft':
      prevImage();
      break;
  }
};

// Initialize
onMounted(() => {
  updateDisplayedItems();
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

// Watch for filter changes
watch([activeFilter, filteredItems], () => {
  loadedCount.value = 12;
  updateDisplayedItems();
});
</script>

<style scoped>
/* Custom animations and transitions */
.gallery-item {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth hover effects */
.group:hover .group-hover\:scale-110 {
  transition-duration: 1s;
}

/* Modal backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Custom scrollbar for modal image */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.8);
}

/* Custom focus styles */
*:focus-visible {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Gradient text animation */
.text-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>