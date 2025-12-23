<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-linear-to-br from-emerald-900 via-emerald-800 to-amber-900 py-20 md:py-32">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
      </div>
      
      <div class="relative z-10 container mx-auto px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-3 mb-6">
            <div class="w-12 h-1 bg-amber-400"></div>
            <span class="text-amber-400 font-semibold tracking-wider uppercase text-sm">Blog & Insights</span>
            <div class="w-12 h-1 bg-amber-400"></div>
          </div>
          
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Tanzania Travel
            <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-emerald-300">Insights & Stories</span>
          </h1>
          
          <p class="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Expert tips, travel stories, and insider knowledge from our Tanzanian adventures. Discover the best of Kilimanjaro, safaris, and Zanzibar through our experiences.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink 
              to="/contact"
              class="group inline-flex items-center gap-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-amber-500/20"
            >
              <span>Plan Your Adventure</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
            
            <a 
              href="https://wa.me/255767277306" 
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-emerald-500/20"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.549 4.125 1.517 5.861L0 24l6.335-1.652A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-6 lg:px-8">
        <!-- Filters and Search -->
        <div class="mb-12 bg-white rounded-2xl shadow-lg p-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Search -->
            <div>
              <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Search Articles</label>
              <div class="relative">
                <input
                  id="search"
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by title or content..."
                  class="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  aria-label="Search blog posts"
                />
                <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="category in allCategories"
                  :key="category"
                  @click="toggleCategory(category)"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    selectedCategories.includes(category)
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                  :aria-pressed="selectedCategories.includes(category)"
                >
                  {{ category }}
                </button>
              </div>
            </div>

            <!-- Sort -->
            <div>
              <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                id="sort"
                v-model="sortBy"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                aria-label="Sort blog posts"
              >
                <option value="latest">Latest First</option>
                <option value="popular">Most Popular</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          <!-- Active Filters Display -->
          <div v-if="selectedCategories.length > 0" class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Active filters:</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="category in selectedCategories"
                  :key="`active-${category}`"
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm"
                >
                  {{ category }}
                  <button @click="toggleCategory(category)" class="text-emerald-600 hover:text-emerald-800" aria-label="Remove filter">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
              <button
                @click="resetFilters"
                class="ml-4 text-sm text-emerald-600 hover:text-emerald-800 font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        <!-- Newsletter CTA -->
        <div class="mb-12 bg-linear-to-r from-emerald-50 to-amber-50 rounded-2xl shadow-lg overflow-hidden">
          <div class="p-8 md:p-10">
            <div class="flex flex-col lg:flex-row items-center gap-8">
              <div class="lg:w-2/3">
                <h3 class="text-2xl font-bold text-gray-800 mb-3">Stay Updated with Our Latest Stories</h3>
                <p class="text-gray-600 mb-6">Get travel tips, exclusive deals, and Tanzania adventure stories directly in your inbox.</p>
                <div class="flex gap-4">
                  <input
                    v-model="emailInput"
                    type="email"
                    placeholder="Your email address"
                    class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    aria-label="Email for newsletter subscription"
                  />
                  <button
                    @click="subscribeNewsletter"
                    :disabled="!emailInput || newsletterSubmitting"
                    class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    :aria-label="newsletterSubmitting ? 'Submitting...' : 'Subscribe to newsletter'"
                  >
                    <span v-if="!newsletterSubmitting">Subscribe</span>
                    <span v-else class="flex items-center gap-2">
                      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  </button>
                </div>
                <p v-if="newsletterMessage" class="mt-4 text-sm" :class="newsletterMessage.includes('Thank you') ? 'text-emerald-600' : 'text-amber-600'">
                  {{ newsletterMessage }}
                </p>
              </div>
              <div class="lg:w-1/3 text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="text-sm text-gray-500">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <article
            v-for="post in displayedPosts"
            :key="post.id"
            class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            @click="openPost(post)"
            @keydown.enter="openPost(post)"
            tabindex="0"
            role="button"
            :aria-label="`Read article: ${post.title}`"
          >
            <!-- Featured Image -->
            <div class="relative h-56 overflow-hidden">
              <picture>
                <source
                  type="image/webp"
                  :srcset="`
                    ${post.featuredImage.webp['640']} 640w,
                    ${post.featuredImage.webp['1024']} 1024w,
                    ${post.featuredImage.webp['1600']} 1600w
                  `"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                >
                <img
                  :src="post.featuredImage.jpg['640']"
                  :srcset="`
                    ${post.featuredImage.jpg['640']} 640w,
                    ${post.featuredImage.jpg['1024']} 1024w,
                    ${post.featuredImage.jpg['1600']} 1600w
                  `"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  :alt="post.coverAlt"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </picture>
              
              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-emerald-700 backdrop-blur-sm">
                  {{ post.categories[0] }}
                </span>
              </div>
              
              <!-- Read Time -->
              <div class="absolute top-4 right-4">
                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-black/70 text-white">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ post.readingTime }} min
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ post.excerpt }}
              </p>
              
              <!-- Meta Info -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      :src="post.author.photo"
                      :alt="`Photo of ${post.author.name}`"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ post.author.name }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(post.date) }}</p>
                  </div>
                </div>
                
                <button
                  class="text-emerald-600 hover:text-emerald-800 font-semibold text-sm flex items-center gap-1"
                  aria-label="Read full article"
                >
                  Read more
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More -->
        <div v-if="hasMorePosts" class="text-center">
          <button
            @click="loadMorePosts"
            :disabled="loadingMore"
            class="group inline-flex items-center gap-3 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            :aria-label="`Load ${postsPerPage} more articles`"
          >
            <span v-if="!loadingMore" class="flex items-center gap-2">
              Load More Articles
              <svg class="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          </button>
          <p class="text-gray-500 mt-4 text-sm">
            Showing {{ displayedPosts.length }} of {{ filteredPosts.length }} articles
          </p>
        </div>

        <!-- Contact CTA -->
        <div class="mt-20 bg-linear-to-br from-emerald-900 to-emerald-800 rounded-3xl overflow-hidden shadow-2xl">
          <div class="p-10 md:p-12 text-center">
            <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Write Your Own Tanzanian Story?</h3>
            <p class="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Contact us today and let our expert team help you plan an unforgettable Tanzanian adventure.
            </p>
            
            <div class="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
              <div class="flex items-center gap-3 text-white">
                <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="font-semibold">info@zafstours.com</span>
              </div>
              
              <div class="flex items-center gap-3 text-white">
                <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="font-semibold">+255 767 277 306</span>
              </div>
              
              <div class="flex items-center gap-3 text-white">
                <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="font-semibold">+255 624 023 455</span>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NuxtLink
                to="/contact"
                class="inline-flex items-center gap-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-amber-500/20"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Send Us a Message</span>
              </NuxtLink>
              
              <a
                href="https://wa.me/255767277306"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-emerald-500/20"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.549 4.125 1.517 5.861L0 24l6.335-1.652A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
            
            <p class="mt-8 text-gray-300 text-sm">
              Office: Arusha Moshi - Road Moshi, Kilimanjaro, Tanzania
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Post Modal -->
    <div
      v-if="activePost"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm pt-16 md:pt-20"
      role="dialog"
      aria-modal="true"
      :aria-label="`Reading: ${activePost.title}`"
      @keydown="handleModalKeydown"
      ref="modal"
    >
      <div class="min-h-screen">
        <div class="container mx-auto px-4 py-8">
          <!-- Close Button -->
          <button
            @click="closePost"
            class="fixed top-20 right-6 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            aria-label="Close article"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Navigation Buttons -->
          <button
            v-if="postNavigation.prev"
            @click="openPost(postNavigation.prev)"
            class="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            aria-label="Previous article"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            v-if="postNavigation.next"
            @click="openPost(postNavigation.next)"
            class="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            aria-label="Next article"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Post Content -->
          <article class="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
            <!-- Featured Image -->
            <div class="relative h-96">
              <picture>
                <source
                  type="image/webp"
                  :srcset="`
                    ${activePost.featuredImage.webp['640']} 640w,
                    ${activePost.featuredImage.webp['1024']} 1024w,
                    ${activePost.featuredImage.webp['1600']} 1600w
                  `"
                  sizes="100vw"
                >
                <img
                  :src="activePost.featuredImage.jpg['1600']"
                  :srcset="`
                    ${activePost.featuredImage.jpg['640']} 640w,
                    ${activePost.featuredImage.jpg['1024']} 1024w,
                    ${activePost.featuredImage.jpg['1600']} 1600w
                  `"
                  sizes="100vw"
                  :alt="activePost.coverAlt"
                  class="w-full h-full object-cover"
                />
              </picture>
            </div>

            <!-- Post Header -->
            <div class="p-8 md:p-10">
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="category in activePost.categories"
                  :key="category"
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800"
                >
                  {{ category }}
                </span>
              </div>
              
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                {{ activePost.title }}
              </h1>
              
              <!-- Meta Info -->
              <div class="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      :src="activePost.author.photo"
                      :alt="`Photo of ${activePost.author.name}`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">{{ activePost.author.name }}</p>
                    <p class="text-sm text-gray-600">Travel Expert</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-6">
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ formatDate(activePost.date) }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ activePost.readingTime }} min read</span>
                  </div>
                </div>
              </div>

              <!-- Post Content -->
              <div class="prose prose-lg max-w-none mb-10">
                <div v-html="activePost.content"></div>
              </div>

              <!-- Canonical Link -->
              <div class="mb-10 p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600 mb-2">Continue reading on website:</p>
                <a
                  :href="activePost.canonicalUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-emerald-600 hover:text-emerald-800 font-medium break-all"
                >
                  {{ activePost.canonicalUrl }}
                </a>
              </div>

              <!-- Share Buttons -->
              <div class="mb-10">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Share this article</h3>
                <div class="flex gap-3">
                  <a
                    :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(activePost.title)}&url=${encodeURIComponent(activePost.canonicalUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </a>
                  
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(activePost.canonicalUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                  
                  <a
                    :href="`https://wa.me/?text=${encodeURIComponent(activePost.title + ' ' + activePost.canonicalUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                    aria-label="Share on WhatsApp"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.549 4.125 1.517 5.861L0 24l6.335-1.652A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              <!-- Author Bio -->
              <div class="mb-10 p-6 bg-linear-to-r from-emerald-50 to-amber-50 rounded-2xl">
                <div class="flex flex-col md:flex-row items-start gap-6">
                  <div class="shrink-0">
                    <div class="w-20 h-20 rounded-full overflow-hidden">
                      <img
                        :src="activePost.author.photo"
                        :alt="`Photo of ${activePost.author.name}`"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">About {{ activePost.author.name }}</h3>
                    <p class="text-gray-600 mb-4">
                      {{ activePost.author.bio || 'Experienced Tanzanian travel expert with extensive knowledge of Kilimanjaro climbs, safari adventures, and Zanzibar retreats.' }}
                    </p>
                    <div class="text-sm text-gray-600">
                      <p>Contact: info@zafstours.com | +255 767 277 306</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Related Posts -->
              <div v-if="relatedPosts.length > 0">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">Related Articles</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <article
                    v-for="related in relatedPosts"
                    :key="related.id"
                    class="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    @click="openPost(related)"
                    @keydown.enter="openPost(related)"
                    tabindex="0"
                    role="button"
                    :aria-label="`Read related article: ${related.title}`"
                  >
                    <div class="h-40 overflow-hidden">
                      <img
                        :src="related.featuredImage.jpg['640']"
                        :alt="related.coverAlt"
                        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div class="p-4">
                      <h4 class="font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {{ related.title }}
                      </h4>
                      <p class="text-sm text-gray-600">{{ formatDate(related.date) }}</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO: Replace this local posts array with an API call to /api/posts
// Expected API response shape:
// {
//   data: [
//     {
//       id: 'unique-id',
//       slug: 'post-slug',
//       title: 'Post Title',
//       excerpt: 'Short excerpt...',
//       content: '<p>HTML content...</p>',
//       author: {
//         name: 'Author Name',
//         photo: 'https://...',
//         bio: 'Author bio...'
//       },
//       date: 'YYYY-MM-DD',
//       readingTime: 5,
//       featuredImage: {
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
//       },
//       categories: ['Category1', 'Category2'],
//       tags: ['tag1', 'tag2'],
//       coverAlt: 'Image alt text',
//       canonicalUrl: 'https://zafstours.com/blog/post-slug',
//       popularity: 100
//     }
//   ],
//   meta: {
//     total: 50,
//     page: 1,
//     perPage: 12
//   }
// }

// Sample data - replace with API call
const posts = [
  {
    id: '1',
    slug: 'kilimanjaro-climbing-season',
    title: 'Best Time to Climb Kilimanjaro: A Complete Seasonal Guide',
    excerpt: 'Discover the optimal months for your Kilimanjaro adventure based on weather conditions, crowd levels, and summit success rates. Our expert guide covers dry season advantages and what to expect during shoulder seasons.',
    content: `
      <p>Climbing Mount Kilimanjaro is a dream for many adventurers, but choosing the right time can make all the difference between a successful summit and a challenging experience. Tanzania experiences two main dry seasons, each offering unique advantages for climbers.</p>
      
      <h2>The Two Dry Seasons</h2>
      
      <h3>January to March (Short Dry Season)</h3>
      <p>This period offers warm temperatures and relatively dry conditions. The skies are usually clear, providing excellent visibility and stunning views. However, this is also the coldest time of year, with summit temperatures often dropping below -20°C (-4°F).</p>
      
      <h3>June to October (Long Dry Season)</h3>
      <p>The most popular climbing season features stable weather conditions and moderate temperatures. While this period sees more climbers on the mountain, the well-established infrastructure and experienced guides make it an excellent choice for first-time climbers.</p>
      
      <h2>Shoulder Seasons: April-May & November</h2>
      <p>These transitional months bring the "long rains" (April-May) and "short rains" (November). While challenging due to wet conditions, these periods offer solitude on the mountain and lush, green landscapes that transform the climbing experience.</p>
      
      <h2>Key Considerations</h2>
      <ul>
        <li><strong>Summit Success Rates:</strong> Highest during the long dry season (June-October)</li>
        <li><strong>Crowd Levels:</strong> Peak crowds in July-August; quieter in January-March</li>
        <li><strong>Temperature:</strong> Coldest in January-February; warmest in August-September</li>
        <li><strong>Photography:</strong> Best visibility in January-March; dramatic clouds in shoulder seasons</li>
      </ul>
      
      <p>Our expert guides recommend 7-9 day itineraries regardless of season, as longer climbs significantly increase summit success rates through better acclimatization.</p>
    `,
    author: {
      name: 'David Wilson',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      bio: 'Lead Kilimanjaro guide with 15+ years experience, 200+ successful summits'
    },
    date: '2024-01-15',
    readingTime: 6,
    featuredImage: {
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
    },
    categories: ['Kilimanjaro', 'Planning'],
    tags: ['seasonal guide', 'weather', 'planning'],
    coverAlt: 'Kilimanjaro summit at sunrise with climbers',
    canonicalUrl: 'https://zafstours.com/blog/kilimanjaro-climbing-season',
    popularity: 95
  },
  {
    id: '2',
    slug: 'serengeti-great-migration',
    title: 'Witnessing the Great Migration: Your Ultimate Serengeti Safari Guide',
    excerpt: 'Follow the path of over 1.5 million wildebeest across the Serengeti-Mara ecosystem. Learn where and when to experience this natural wonder, plus expert tips for photography and wildlife viewing.',
    content: `
      <p>The Great Migration is often called "The Greatest Show on Earth" - and for good reason. This annual cycle involves over 1.5 million wildebeest, 200,000 zebras, and 350,000 gazelles moving in a continuous search for fresh grazing and water.</p>
      
      <h2>The Annual Cycle</h2>
      
      <h3>December-April: Southern Serengeti & Ngorongoro</h3>
      <p>During the short rains, the herds congregate in the southern Serengeti and Ngorongoro Conservation Area. This is calving season (February-March), when approximately 400,000 calves are born within 2-3 weeks.</p>
      
      <h3>May-July: Western Corridor & Grumeti River</h3>
      <p>As the plains dry out, the migration moves northwest toward the Grumeti River. The river crossings here are dramatic, with crocodiles waiting for exhausted animals.</p>
      
      <h3>August-October: Northern Serengeti & Mara River</h3>
      <p>The most famous river crossings occur at the Mara River from August through October. This is the peak viewing season, though also the most crowded.</p>
      
      <h3>November: Return Journey</h3>
      <p>With the onset of the short rains, the herds begin their journey back south to the rejuvenated plains.</p>
      
      <h2>Expert Viewing Tips</h2>
      <ul>
        <li><strong>Book Early:</strong> Prime locations sell out 6-12 months in advance</li>
        <li><strong>Private Conservancies:</strong> Consider less crowded private reserves adjacent to the main parks</li>
        <li><strong>Hot Air Balloons:</strong> For breathtaking aerial views of the migrating herds</li>
        <li><strong>Photography Gear:</strong> Bring telephoto lenses (200-400mm minimum) and bean bags for stabilization</li>
      </ul>
      
      <p>Our recommended itinerary combines Central Serengeti for predator action with Northern Serengeti for river crossings, offering the complete migration experience.</p>
    `,
    author: {
      name: 'Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      bio: 'Wildlife biologist and safari guide with 12 years experience in East African ecosystems'
    },
    date: '2024-02-10',
    readingTime: 8,
    featuredImage: {
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
    },
    categories: ['Safari', 'Wildlife'],
    tags: ['great migration', 'serengeti', 'wildlife'],
    coverAlt: 'Wildebeest herd crossing river during great migration',
    canonicalUrl: 'https://zafstours.com/blog/serengeti-great-migration',
    popularity: 98
  },
  {
    id: '3',
    slug: 'zanzibar-spice-tour',
    title: 'Beyond the Beaches: Discovering Zanzibar\'s Spice Heritage',
    excerpt: 'Zanzibar is more than just pristine beaches. Explore the island\'s rich spice history through guided tours, cooking classes, and visits to working plantations where cloves, vanilla, and cinnamon tell stories of trade routes and cultural fusion.',
    content: `
      <p>Known as the "Spice Island," Zanzibar has been at the center of global spice trade for centuries. The island's fertile soil and tropical climate create perfect conditions for growing some of the world's most sought-after spices.</p>
      
      <h2>The Spice Trail Experience</h2>
      
      <h3>Clove Plantations</h3>
      <p>Zanzibar produces 80% of the world's cloves. Visit working plantations to see the harvesting process and learn about the spice that once made the island one of the wealthiest places in Africa.</p>
      
      <h3>Vanilla Cultivation</h3>
      <p>Discover the labor-intensive process of vanilla cultivation, from hand-pollination to curing. Zanzibar's vanilla is prized for its rich, creamy flavor profile.</p>
      
      <h3>Cinnamon & Cardamom</h3>
      <p>Walk through cinnamon groves where you can peel fresh bark and smell the distinctive aroma. Learn about cardamom's uses in both cooking and traditional medicine.</p>
      
      <h2>Interactive Experiences</h2>
      <ul>
        <li><strong>Spice Identification:</strong> Blindfolded spice smelling tests challenge your senses</li>
        <li><strong>Cooking Classes:</strong> Learn to prepare traditional Swahili dishes using fresh spices</li>
        <li><strong>Market Visits:</strong> Explore Stone Town's Darajani Market with a local guide</li>
        <li><strong>Spice Blending:</strong> Create your own custom spice blends to take home</li>
      </ul>
      
      <h2>Cultural Significance</h2>
      <p>The spice trade brought together Arab, Indian, Persian, and African cultures, creating Zanzibar's unique Swahili culture. Many spice plantation tours include cultural demonstrations of traditional music, dance, and crafts.</p>
      
      <p>Most spice tours include transportation, guided plantation walk, lunch featuring local spices, and opportunities to purchase fresh spices directly from farmers.</p>
    `,
    author: {
      name: 'Fatima Said',
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      bio: 'Zanzibar native and cultural guide specializing in spice heritage and Swahili cuisine'
    },
    date: '2024-01-28',
    readingTime: 5,
    featuredImage: {
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
    },
    categories: ['Zanzibar', 'Culture'],
    tags: ['spice tour', 'culture', 'food'],
    coverAlt: 'Fresh spices displayed on traditional Zanzibar market',
    canonicalUrl: 'https://zafstours.com/blog/zanzibar-spice-tour',
    popularity: 87
  },
  {
    id: '4',
    slug: 'family-safari-tanzania',
    title: 'Family Safari in Tanzania: Creating Unforgettable Memories with Kids',
    excerpt: 'Planning a family safari in Tanzania? Discover child-friendly lodges, age-appropriate activities, and safety tips for traveling with children in national parks. Learn how to make wildlife viewing exciting and educational for young explorers.',
    content: `
      <p>A family safari in Tanzania can be the trip of a lifetime, creating memories that will last for generations. With proper planning, children as young as five can safely enjoy and appreciate the wonders of African wildlife.</p>
      
      <h2>Age Considerations & Recommendations</h2>
      
      <h3>Ages 5-7: Introduction to Wildlife</h3>
      <p>Focus on shorter game drives (2-3 hours), lodges with swimming pools, and properties with educational programs. Tarangire National Park is excellent for young children with its high elephant density and easy wildlife spotting.</p>
      
      <h3>Ages 8-12: Young Explorers</h3>
      <p>Children in this age group can handle longer drives and appreciate learning about animal behavior. Consider adding cultural visits to Maasai villages or nature walks with armed guides.</p>
      
      <h3>Teens: Adventure Seekers</h3>
      <p>Include more adventurous activities like walking safaris, night drives, or even a hot air balloon safari over the Serengeti.</p>
      
      <h2>Family-Friendly Accommodations</h2>
      <ul>
        <li><strong>Family Tents/Cottages:</strong> Many lodges offer interconnected rooms or family-sized accommodations</li>
        <li><strong>Kids\' Clubs:</strong> Select properties have supervised activities allowing parents some downtime</li>
        <li><strong>Swimming Pools:</strong> Essential for afternoon relaxation between game drives</li>
        <li><strong>Child Menus:</strong> Look for lodges offering familiar options alongside local cuisine</li>
      </ul>
      
      <h2>Educational Elements</h2>
      <p>Transform the safari into an educational experience:</p>
      <ul>
        <li>Animal tracking lessons with guides</li>
        <li>Bird identification with checklists</li>
        <li>Star gazing and astronomy talks</li>
        <li>Conservation education about anti-poaching efforts</li>
      </ul>
      
      <p>Our family safari packages include private vehicles for flexibility, child-sized binoculars, and guides specially trained in engaging young travelers.</p>
    `,
    author: {
      name: 'Lisa Wang',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      bio: 'Family travel specialist with 8 years experience designing multi-generational African adventures'
    },
    date: '2024-02-05',
    readingTime: 7,
    featuredImage: {
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
    },
    categories: ['Family Travel', 'Safari'],
    tags: ['family safari', 'kids', 'education'],
    coverAlt: 'Family watching elephants on safari in Tanzania',
    canonicalUrl: 'https://zafstours.com/blog/family-safari-tanzania',
    popularity: 92
  },
  {
    id: '5',
    slug: 'kilimanjaro-training-guide',
    title: 'Training for Kilimanjaro: How to Physically Prepare for Africa\'s Highest Peak',
    excerpt: 'Summiting Kilimanjaro requires more than just willpower. Our comprehensive training guide covers cardio, strength, and altitude preparation exercises to maximize your chances of reaching Uhuru Peak.',
    content: `
      <p>While Kilimanjaro is considered a "walk-up" mountain requiring no technical climbing skills, the altitude and sustained trekking make physical preparation essential for success and enjoyment.</p>
      
      <h2>Training Timeline: 3-6 Months Before Your Climb</h2>
      
      <h3>Month 1-2: Foundation Building</h3>
      <p>Focus on building aerobic base through regular cardio exercise 4-5 times per week. Aim for 30-60 minutes of sustained activity at 60-70% of your maximum heart rate.</p>
      
      <h3>Month 3-4: Strength & Endurance</h3>
      <p>Add strength training 2-3 times weekly, focusing on legs, core, and back. Begin incorporating hill training and weighted pack walks.</p>
      
      <h3>Month 5-6: Specificity & Altitude</h3>
      <p>Simulate climb conditions with back-to-back training days. If possible, train at altitude or use altitude simulation masks.</p>
      
      <h2>Key Training Components</h2>
      
      <h3>Cardiovascular Training</h3>
      <ul>
        <li><strong>Running/Cycling:</strong> 3-4 times weekly for 45-60 minutes</li>
        <li><strong>Stair Climbing:</strong> Find a tall building or stadium stairs; carry a weighted pack</li>
        <li><strong>Hiking:</strong> Weekly hikes of increasing distance and elevation gain</li>
      </ul>
      
      <h3>Strength Training</h3>
      <ul>
        <li><strong>Squats & Lunges:</strong> For quadriceps and glute strength</li>
        <li><strong>Step-ups:</strong> Using a bench or box, with weighted pack</li>
        <li><strong>Core Exercises:</strong> Planks, Russian twists, and back extensions</li>
      </ul>
      
      <h2>Altitude Preparation</h2>
      <p>While physical training helps, altitude affects everyone differently:</p>
      <ul>
        <li>Consider medication (Diamox) after consulting your doctor</li>
        <li>Choose longer routes (7-9 days) for better acclimatization</li>
        <li>Practice "pole pole" (slowly slowly) pacing during training</li>
        <li>Stay well-hydrated throughout training and the climb</li>
      </ul>
      
      <p>Our pre-climb assessment includes fitness evaluation and personalized training recommendations based on your current fitness level and chosen route.</p>
    `,
    author: {
      name: 'Michael Chen',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      bio: 'Certified mountain guide and fitness trainer specializing in high-altitude preparation'
    },
    date: '2024-01-20',
    readingTime: 6,
    featuredImage: {
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
    },
    categories: ['Kilimanjaro', 'Fitness'],
    tags: ['training', 'fitness', 'preparation'],
    coverAlt: 'Hikers training on mountain trail with backpacks',
    canonicalUrl: 'https://zafstours.com/blog/kilimanjaro-training-guide',
    popularity: 90
  },
  {
    id: '6',
    slug: 'tanzania-cultural-immersion',
    title: 'Cultural Immersion: Experiencing Tanzania Beyond Wildlife',
    excerpt: 'Tanzania\'s true magic lies in its people and cultures. Explore authentic cultural experiences from Maasai village visits to Swahili cooking classes that offer deeper connections and understanding of this diverse nation.',
    content: `
      <p>While Tanzania's wildlife is world-renowned, the country's cultural richness offers equally rewarding experiences. With over 120 ethnic groups, Tanzania presents a tapestry of traditions, languages, and customs waiting to be discovered.</p>
      
      <h2>Maasai Cultural Experiences</h2>
      
      <h3>Authentic Village Visits</h3>
      <p>Visit Maasai communities that have established sustainable tourism programs. Participate in daily activities like milking cows, fetching water, or learning traditional beadwork from Maasai women.</p>
      
      <h3>Warrior Training</h3>
      <p>Learn traditional Maasai skills like spear throwing, fire making without matches, and identifying medicinal plants from experienced warriors.</p>
      
      <h2>Swahili Coast Culture</h2>
      
      <h3>Stone Town Exploration</h3>
      <p>Wander through UNESCO World Heritage-listed Stone Town with a local guide who can explain the architectural influences and historical significance of this trading port.</p>
      
      <h3>Dhow Sailing Experience</h3>
      <p>Sail on a traditional wooden dhow, learning about navigation techniques that have been used for centuries along the East African coast.</p>
      
      <h2>Artisan Workshops</h2>
      <ul>
        <li><strong>Tinga Tinga Painting:</strong> Learn this distinctive East African art style characterized by bright colors and animal themes</li>
        <li><strong>Makonde Carving:</strong> Discover the intricate wood carving traditions of the Makonde people</li>
        <li><strong>Batik Making:</strong> Create your own fabric using traditional wax-resist dyeing techniques</li>
      </ul>
      
      <h2>Culinary Experiences</h2>
      <p>Food offers a delicious window into culture:</p>
      <ul>
        <li><strong>Swahili Cooking Classes:</strong> Learn to prepare dishes like pilau, coconut bean soup, and mandazi</li>
        <li><strong>Market Tours:</strong> Visit local markets with a chef to select ingredients and learn about their uses</li>
        <li><strong>Family Meals:</strong> Share a meal with a local family in their home</li>
      </ul>
      
      <p>Our cultural tours are designed in partnership with local communities, ensuring authentic experiences while supporting sustainable community development.</p>
    `,
    author: {
      name: 'Juma Hassan',
      photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005-128?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      bio: 'Cultural anthropologist and guide specializing in Tanzanian ethnic traditions and community tourism'
    },
    date: '2024-02-15',
    readingTime: 7,
    featuredImage: {
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
    },
    categories: ['Culture', 'Experiences'],
    tags: ['cultural immersion', 'maasai', 'swahili culture'],
    coverAlt: 'Maasai warriors performing traditional dance',
    canonicalUrl: 'https://zafstours.com/blog/tanzania-cultural-immersion',
    popularity: 85
  }
];

// Page metadata
definePageMeta({
  layout: 'default'
});

// Helper functions
const estimateReadTime = (htmlText) => {
  // Strip HTML tags and count words
  const text = htmlText.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  // Average reading speed: 200-250 words per minute
  return Math.max(1, Math.ceil(wordCount / 200));
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Define reactive variables FIRST
const searchQuery = ref('');
const selectedCategories = ref([]);
const sortBy = ref('latest');
const activePost = ref(null);
const displayedPosts = ref([]);
const loadedCount = ref(6);
const loadingMore = ref(false);
const emailInput = ref('');
const newsletterSubmitting = ref(false);
const newsletterMessage = ref('');

// Constants
const postsPerPage = 6;

// Computed
const allCategories = computed(() => {
  const categories = new Set();
  posts.forEach(post => {
    post.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
});

const filteredPosts = computed(() => {
  let result = [...posts];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    result = result.filter(post =>
      selectedCategories.value.some(category => 
        post.categories.includes(category)
      )
    );
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'latest':
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'popular':
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
  }

  return result;
});

const hasMorePosts = computed(() => {
  return displayedPosts.value.length < filteredPosts.value.length;
});

const postNavigation = computed(() => {
  if (!activePost.value) return { prev: null, next: null };
  
  const currentIndex = filteredPosts.value.findIndex(post => post.id === activePost.value.id);
  return {
    prev: currentIndex > 0 ? filteredPosts.value[currentIndex - 1] : null,
    next: currentIndex < filteredPosts.value.length - 1 ? filteredPosts.value[currentIndex + 1] : null
  };
});

const relatedPosts = computed(() => {
  if (!activePost.value) return [];
  
  return filteredPosts.value
    .filter(post => 
      post.id !== activePost.value.id &&
      post.categories.some(category => 
        activePost.value.categories.includes(category)
      )
    )
    .slice(0, 3);
});

// SEO Head with JSON-LD - FIXED: Now placed AFTER reactive variables
const headConfig = computed(() => {
  if (activePost.value) {
    return {
      title: `${activePost.value.title} | Zafs Tours Blog`,
      meta: [
        {
          name: 'description',
          content: activePost.value.excerpt
        },
        {
          property: 'og:title',
          content: activePost.value.title
        },
        {
          property: 'og:description',
          content: activePost.value.excerpt
        },
        {
          property: 'og:image',
          content: activePost.value.featuredImage.jpg['1600']
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: activePost.value.canonicalUrl
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': activePost.value.title,
            'description': activePost.value.excerpt,
            'image': activePost.value.featuredImage.jpg['1600'],
            'datePublished': activePost.value.date,
            'dateModified': activePost.value.date,
            'author': {
              '@type': 'Person',
              'name': activePost.value.author.name,
              'image': activePost.value.author.photo
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Zafs Tours',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://zafstours.com/logo.png'
              }
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': activePost.value.canonicalUrl
            },
            'articleBody': activePost.value.content.replace(/<[^>]*>/g, ''),
            'wordCount': activePost.value.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
            'timeRequired': `PT${activePost.value.readingTime}M`,
            'keywords': activePost.value.tags.join(', ')
          })
        }
      ]
    };
  } else {
    // Default blog head
    return {
      title: 'Blog & Travel Insights - Tanzania Adventures | Zafs Tours',
      meta: [
        {
          name: 'description',
          content: 'Expert travel tips, safari guides, Kilimanjaro insights, and cultural stories from Tanzania. Your source for authentic travel information and adventure planning.'
        },
        {
          name: 'keywords',
          content: 'Tanzania blog, safari tips, Kilimanjaro guide, Zanzibar travel, wildlife insights, travel stories'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            'name': 'Zafs Tours Tanzania Travel Blog',
            'description': 'Expert insights and stories about Tanzanian travel, safaris, Kilimanjaro climbs, and cultural experiences.',
            'url': 'https://zafstours.com/blog',
            'publisher': {
              '@type': 'Organization',
              'name': 'Zafs Tours',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://zafstours.com/logo.png'
              }
            },
            'blogPost': posts.slice(0, 6).map(post => ({
              '@type': 'BlogPosting',
              'headline': post.title,
              'description': post.excerpt,
              'image': post.featuredImage.jpg['1600'],
              'datePublished': post.date,
              'dateModified': post.date,
              'author': {
                '@type': 'Person',
                'name': post.author.name,
                'image': post.author.photo
              },
              'publisher': {
                '@type': 'Organization',
                'name': 'Zafs Tours',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://zafstours.com/logo.png'
                }
              },
              'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': post.canonicalUrl
              }
            }))
          })
        }
      ]
    };
  }
});

useHead(headConfig);

// Methods
const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(category);
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategories.value = [];
  sortBy.value = 'latest';
};

const loadMorePosts = () => {
  loadingMore.value = true;
  setTimeout(() => {
    loadedCount.value += postsPerPage;
    updateDisplayedPosts();
    loadingMore.value = false;
  }, 500);
};

const updateDisplayedPosts = () => {
  displayedPosts.value = filteredPosts.value.slice(0, loadedCount.value);
};

const openPost = (post) => {
  activePost.value = post;
  document.body.style.overflow = 'hidden';
};

const closePost = () => {
  activePost.value = null;
  document.body.style.overflow = '';
};

const subscribeNewsletter = () => {
  if (!emailInput.value) return;
  
  newsletterSubmitting.value = true;
  newsletterMessage.value = '';
  
  // Simulate API call
  setTimeout(() => {
    newsletterSubmitting.value = false;
    newsletterMessage.value = 'Thank you for subscribing! You\'ll receive our next newsletter.';
    emailInput.value = '';
    
    // Clear message after 5 seconds
    setTimeout(() => {
      newsletterMessage.value = '';
    }, 5000);
  }, 1500);
};

const handleModalKeydown = (e) => {
  if (!activePost.value) return;
  
  switch (e.key) {
    case 'Escape':
      closePost();
      break;
    case 'ArrowRight':
      if (postNavigation.value.next) {
        openPost(postNavigation.value.next);
      }
      break;
    case 'ArrowLeft':
      if (postNavigation.value.prev) {
        openPost(postNavigation.value.prev);
      }
      break;
  }
};

// Initialize
onMounted(() => {
  updateDisplayedPosts();
  
  // Add keyboard event listener for modal
  window.addEventListener('keydown', handleModalKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleModalKeydown);
});

// Watch for filter changes
watch([searchQuery, selectedCategories, sortBy], () => {
  loadedCount.value = postsPerPage;
  updateDisplayedPosts();
}, { deep: true });
</script>

<style scoped>
/* Custom styles */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* Add standard property for compatibility */
  line-clamp: 3;
}

/* Rest of the styles remain exactly the same... */
.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

/* Modal backdrop */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid #059669;
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #059669;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #047857;
}

/* Print styles for post view */
@media print {
  .fixed {
    display: none !important;
  }
  
  #post-modal {
    position: static !important;
    background: white !important;
    overflow: visible !important;
  }
  
  .prose {
    font-size: 12pt;
    line-height: 1.6;
  }
  
  .prose h2 {
    page-break-after: avoid;
  }
  
  .prose h3 {
    page-break-after: avoid;
  }
  
  .prose p {
    orphans: 3;
    widows: 3;
  }
}
</style>