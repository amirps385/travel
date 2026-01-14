<template>
  <div class="min-h-screen bg-linear-to-b from-amber-50 via-white to-emerald-50/20">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-28 overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-linear-to-br from-amber-900 via-amber-800 to-slate-900"></div>

      <!-- Decorative Elements -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <!-- Pattern Overlay -->
      <div class="absolute inset-0 opacity-5 bg-pattern"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            <span class="text-sm text-amber-100 font-medium tracking-wider">GROUP CLIMBING ADVENTURES</span>
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Join
            <span class="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-emerald-300">Group Climbs</span>
          </h1>

          <p class="text-xl md:text-2xl text-amber-100/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience guided climbing adventures with fellow enthusiasts. From beginner-friendly ascents 
            to technical expeditions, find your next challenge with expert guides and a supportive group.
          </p>

          <div class="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">{{ upcomingClimbsCount }}</div>
              <div class="text-sm text-amber-200/80 uppercase tracking-wider">Upcoming & Ongoing</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">{{ groupClimbs.length }}</div>
              <div class="text-sm text-amber-200/80 uppercase tracking-wider">Total Routes</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div class="text-sm text-amber-200/80 uppercase tracking-wider">Success Rate</div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink
              to="/admin/groupclimbs"
              class="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 overflow-visible"
            >
              <span class="relative z-10">Create Group (Admin)</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </NuxtLink>

            <button
              @click="scrollToGrid"
              class="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-visible group"
            >
              <svg class="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span class="relative z-10">Browse Climbs</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-amber-300/50 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-amber-300 rounded-full mt-2"></div>
        </div>
      </div>
    </section>

    <!-- Filter Bar -->
    <div class="max-w-7xl mx-auto px-4 lg:px-6">
      <div class="relative -mt-12 md:-mt-16 z-30">
        <div class="mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-5 backdrop-blur-sm">
          <!-- Tabs -->
          <div class="flex space-x-1 mb-4">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300',
                activeTab === tab.id
                  ? 'bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                  : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50'
              ]"
              :aria-current="activeTab === tab.id ? 'page' : null"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="flex flex-col md:flex-row md:items-center gap-3">
            <!-- Category Filter -->
            <div class="relative flex-1 group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <label class="text-xs text-slate-600 font-medium block mb-1 ml-1">Categories</label>
              <div class="relative">
                <button
                  @click="isCategoryOpen = !isCategoryOpen"
                  @blur="handleCategoryBlur"
                  class="w-full text-left pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all hover:border-amber-300"
                  aria-haspopup="listbox"
                  :aria-expanded="isCategoryOpen"
                >
                  <span class="truncate block">
                    {{ selectedCategories.length > 0 ? `${selectedCategories.length} selected` : 'All Categories' }}
                  </span>
                </button>
                
                <div
                  v-if="isCategoryOpen"
                  class="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg"
                  role="listbox"
                >
                  <div class="p-2 max-h-60 overflow-auto">
                    <div
                      v-for="category in categories"
                      :key="category.id"
                      class="flex items-center px-3 py-2.5 hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                      @mousedown.prevent="toggleCategory(category.id)"
                    >
                      <input
                        type="checkbox"
                        :id="`category-${category.id}`"
                        :checked="selectedCategories.includes(category.id)"
                        class="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                        @change="toggleCategory(category.id)"
                      />
                      <label
                        :for="`category-${category.id}`"
                        class="ml-3 text-sm text-slate-700 cursor-pointer select-none"
                      >
                        {{ category.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Search -->
            <div class="flex-1 group">
              <label class="text-xs text-slate-600 font-medium block mb-1 ml-1">Search Climbs</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="search"
                  placeholder="Search by title, tags, or description..."
                  class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all hover:border-amber-300 placeholder-slate-400"
                  aria-label="Search group climbs"
                />
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Sort -->
            <div class="relative group">
              <label class="text-xs text-slate-600 font-medium block mb-1 ml-1">Sort By</label>
              <select
                v-model="sortBy"
                class="pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all hover:border-amber-300 appearance-none cursor-pointer min-w-[180px]"
                aria-label="Sort climbs"
              >
                <option value="date-asc">Date (soonest)</option>
                <option value="date-desc">Date (latest)</option>
                <option value="price-asc">Price (low → high)</option>
                <option value="price-desc">Price (high → low)</option>
              </select>
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="selectedCategories.length > 0 || searchQuery" class="mt-3 pt-3 border-t border-slate-100">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs text-slate-600 font-medium">Active filters:</span>
              
              <!-- Category Badges -->
              <div v-for="categoryId in selectedCategories" :key="categoryId" 
                   class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium">
                <span>{{ getCategoryName(categoryId) }}</span>
                <button @click="toggleCategory(categoryId)" class="text-amber-500 hover:text-amber-700">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- Search Badge -->
              <div v-if="searchQuery" class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium">
                <span>Search: "{{ searchQuery }}"</span>
                <button @click="searchQuery = ''" class="text-emerald-500 hover:text-emerald-700">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- Clear All -->
              <button
                v-if="selectedCategories.length > 0 || searchQuery"
                @click="resetFilters"
                class="text-xs text-slate-600 hover:text-slate-900 underline"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- Results Info -->
      <div v-if="filteredClimbs.length > 0" class="mb-8">
        <div class="bg-linear-to-r from-amber-50 to-emerald-50 rounded-2xl p-6 border border-amber-100">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="text-slate-800">
              <span class="font-bold text-amber-700 text-lg">{{ filteredClimbs.length }}</span>
              <span class="ml-2">climb{{ filteredClimbs.length !== 1 ? 's' : '' }} found</span>
              <span v-if="searchQuery" class="ml-3 text-slate-600">
                matching "<span class="font-medium">{{ searchQuery }}</span>"
              </span>
              <span v-if="selectedCategories.length > 0" class="ml-3 text-slate-600">
                • in selected categories
              </span>
            </div>
            
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <svg class="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Showing page {{ currentPage }} of {{ totalPages }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards Grid -->
      <div v-if="filteredClimbs.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GroupClimbCard
            v-for="climb in paginatedClimbs"
            :key="climb._id || climb.id"
            :climb="climb"
            @quick-view="openQuickView(climb)"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 pt-8 border-t border-slate-200">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-sm text-slate-600">
              Showing 
              <span class="font-semibold text-amber-700">{{ ((currentPage - 1) * pageSize) + 1 }}</span> – 
              <span class="font-semibold text-amber-700">{{ Math.min(currentPage * pageSize, filteredClimbs.length) }}</span> of 
              <span class="font-semibold text-amber-700">{{ filteredClimbs.length }}</span> climbs
            </div>
            
            <div class="flex items-center gap-2">
              <!-- Previous Button -->
              <button
                :disabled="currentPage === 1"
                @click="prevPage"
                class="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-amber-50 hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                :aria-label="`Go to previous page, page ${currentPage - 1}`"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <!-- Page Numbers -->
              <div class="flex items-center gap-1">
                <button
                  v-for="p in visiblePages"
                  :key="p"
                  @click="currentPage = p"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
                    currentPage === p
                      ? 'bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-lg'
                      : 'text-slate-700 hover:text-amber-700 hover:bg-amber-50 bg-white border border-slate-200 shadow-sm hover:shadow-md'
                  ]"
                  :aria-label="`Go to page ${p}`"
                  :aria-current="p === currentPage ? 'page' : null"
                >
                  {{ p }}
                </button>
              </div>
              
              <!-- Next Button -->
              <button
                :disabled="currentPage >= totalPages"
                @click="nextPage"
                class="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-amber-50 hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                :aria-label="`Go to next page, page ${currentPage + 1}`"
              >
                Next
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="inline-block p-10 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 max-w-md">
          <div class="text-8xl mb-6">🏔️</div>
          <h3 class="text-2xl font-bold text-slate-900 mb-3">No climbs found</h3>
          <p class="text-slate-600 mb-6">
            {{ 
              activeTab === 'upcoming' ? 'No upcoming climbs match your filters.' : 
              activeTab === 'ongoing' ? 'No ongoing climbs match your filters.' :
              'No past climbs match your filters.' 
            }}
            Try adjusting your search or filters.
          </p>
          <button
            @click="resetFilters"
            class="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-medium rounded-xl transition-all duration-300 hover:from-amber-700 hover:to-amber-800"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
        </div>
      </div>
    </main>

    <!-- Quick View Modal -->
    <div
      v-if="quickViewClimb"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeQuickView"></div>

      <!-- Modal Content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-slate-200">
          <!-- Close button -->
          <button
            @click="closeQuickView"
            class="absolute right-6 top-6 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all hover:scale-110"
            aria-label="Close quick view"
          >
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Body -->
          <div class="overflow-y-auto max-h-[90vh]">
            <!-- Image Gallery -->
            <div class="h-72 md:h-80 bg-linear-to-br from-amber-900 to-amber-800 relative overflow-hidden">
              <img
                :src="quickViewClimb.gallery && quickViewClimb.gallery[0] ? quickViewClimb.gallery[0] : '/images/placeholder-mountain.jpg'"
                :alt="quickViewClimb.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6">
                <h2 class="text-3xl font-bold text-white mb-2" id="modal-title">
                  {{ quickViewClimb.title }}
                </h2>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="categoryId in (quickViewClimb.categoryIds || [])"
                    :key="categoryId"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md bg-white/20 text-white border border-white/30"
                  >
                    {{ getCategoryName(categoryId) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-8">
              <!-- Dates and Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="bg-amber-50 rounded-2xl p-6">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 bg-amber-100 rounded-lg">
                      <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-slate-700 mb-1">Trip Dates</h3>
                      <p class="text-lg font-semibold text-slate-900">
                        {{ formatDate(quickViewClimb.startDate) }} - {{ formatDate(quickViewClimb.endDate) }}
                      </p>
                      <p class="text-sm text-slate-600">{{ quickViewClimb.durationDays }} days</p>
                    </div>
                  </div>
                </div>

                <div class="bg-emerald-50 rounded-2xl p-6">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="p-2 bg-emerald-100 rounded-lg">
                      <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-slate-700 mb-1">Group Size</h3>
                      <p class="text-lg font-semibold text-slate-900">
                        {{ quickViewClimb.seatsBooked || 0 }}/{{ quickViewClimb.maxGroupSize || 8 }} booked
                      </p>
                      <p class="text-sm" :class="spotsLeftClass(quickViewClimb)">
                        {{ (quickViewClimb.maxGroupSize || 8) - (quickViewClimb.seatsBooked || 0) }} spots left
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Itinerary Summary -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Itinerary Summary
                </h3>
                <div class="bg-slate-50 rounded-2xl p-6">
                  <template v-if="quickViewClimb.itinerary && quickViewClimb.itinerary.length > 0">
                    <div class="space-y-4">
                      <div v-for="day in quickViewClimb.itinerary" :key="day.day" class="border-l-2 border-amber-400 pl-4 py-2">
                        <div class="font-semibold text-slate-800 mb-1">Day {{ day.day }}: {{ day.title }}</div>
                        <p class="text-slate-600 text-sm">{{ day.description }}</p>
                        <div v-if="day.activities && day.activities.length > 0" class="mt-2">
                          <div class="text-xs text-slate-500 mb-1">Activities:</div>
                          <div class="flex flex-wrap gap-1">
                            <span v-for="(activity, idx) in day.activities" :key="idx" 
                                  class="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs">
                              {{ activity }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="quickViewClimb.itinerarySummary">
                    <p class="text-slate-700 whitespace-pre-line leading-relaxed">{{ quickViewClimb.itinerarySummary }}</p>
                  </template>
                  <template v-else>
                    <p class="text-slate-500 italic">No itinerary details available yet.</p>
                  </template>
                </div>
              </div>

              <!-- Included/Not Included -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div v-if="quickViewClimb.included && quickViewClimb.included.length > 0">
                  <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    What's Included
                  </h4>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, index) in quickViewClimb.included"
                      :key="index"
                      class="flex items-start gap-3 text-slate-700"
                    >
                      <div class="shrink-0 mt-0.5">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span class="flex-1">{{ item }}</span>
                    </li>
                  </ul>
                </div>
                <div v-if="quickViewClimb.notIncluded && quickViewClimb.notIncluded.length > 0">
                  <h4 class="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Not Included
                  </h4>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, index) in quickViewClimb.notIncluded"
                      :key="index"
                      class="flex items-start gap-3 text-slate-700"
                    >
                      <div class="shrink-0 mt-0.5">
                        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span class="flex-1">{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Price -->
              <div class="bg-linear-to-r from-amber-50 to-amber-100 rounded-2xl p-6 mb-8">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-slate-700 mb-1">Price per person</h4>
                    <div class="text-3xl font-bold text-slate-900">
                      {{ formatPrice(quickViewClimb.price, quickViewClimb.currency) }}
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-slate-600">Deposit to secure spot</p>
                    <p class="text-lg font-semibold text-slate-900">
                      {{ formatPrice((quickViewClimb.price || 0) * 0.3, quickViewClimb.currency) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200">
                <NuxtLink
                  :to="`/groupclimb/${quickViewClimb.slug}`"
                  class="flex-1 text-center px-6 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  @click="closeQuickView"
                >
                  View Full Details
                </NuxtLink>
                <button
                  @click="closeQuickView"
                  class="flex-1 px-6 py-4 border border-slate-300 text-base font-medium rounded-2xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Toast -->
    <div
      v-if="showToast"
      class="fixed bottom-6 right-6 z-50 max-w-sm bg-linear-to-r from-amber-600 to-amber-700 text-white px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up backdrop-blur-sm"
      role="alert"
    >
      <div class="flex items-start gap-3">
        <svg class="w-6 h-6 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="font-medium">Admin Access Required</p>
          <p class="text-sm text-white/90 mt-1">This feature is for administrators only. Please contact support for access.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import GroupClimbCard from '~/components/GroupClimb/GroupClimbCard.vue'

// Define your hardcoded category options
const CATEGORY_OPTIONS = [
  // Kilimanjaro routes
  { id: 'kilimanjaro-lemosho', name: 'Kilimanjaro — Lemosho' },
  { id: 'kilimanjaro-machame', name: 'Kilimanjaro — Machame' },
  { id: 'kilimanjaro-rongai', name: 'Kilimanjaro — Rongai' },
  { id: 'kilimanjaro-northern', name: 'Kilimanjaro — Northern Circuit' },
  { id: 'kilimanjaro-marangu', name: 'Kilimanjaro — Marangu' },
  { id: 'kilimanjaro-umbwe', name: 'Kilimanjaro — Umbwe' },
  { id: 'kilimanjaro-expedition', name: 'Kilimanjaro — Expedition / Crater' },

  // Trip type
  { id: 'group-departure', name: 'Group Departure' },
  { id: 'private-departure', name: 'Private Departure' },
  { id: 'multi-day', name: 'Multi-day / Expedition' },
  { id: 'day-trip', name: 'Day Trip / Excursion' },

  // Activity / focus
  { id: 'summit', name: 'Summit Attempt' },
  { id: 'acclimatization', name: 'Acclimatization' },
  { id: 'trekking', name: 'Trekking & Hiking' },
  { id: 'birdwatching', name: 'Birdwatching' },
  { id: 'photography', name: 'Photography' },

  // Comfort / accommodation
  { id: 'camping-basic', name: 'Camping (Basic)' },
  { id: 'camping-comfort', name: 'Camping (Comfort / Glamping)' },
  { id: 'lodge', name: 'Lodge / Permanent Tents' },

  // Difficulty / audience
  { id: 'easy', name: 'Easy' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'challenging', name: 'Challenging / High altitude' },
  { id: 'family-friendly', name: 'Family Friendly' },
  { id: 'honeymoon', name: 'Honeymoon / Couples' },

  // Add-ons / region
  { id: 'safari-addon', name: 'Safari Add-on' },
  { id: 'zanzibar', name: 'Zanzibar / Sea Extension' },
  { id: 'cultural', name: 'Cultural Excursions' }
]

// Reactive state
const categories = ref(CATEGORY_OPTIONS)
const groupClimbs = ref([])
const isLoading = ref(false)
const error = ref('')

const activeTab = ref('upcoming')
const selectedCategories = ref([])
const searchQuery = ref('')
const sortBy = ref('date-asc')
const currentPage = ref(1)
const pageSize = 6
const quickViewClimb = ref(null)
const isCategoryOpen = ref(false)
const showToast = ref(false)

// Tabs configuration - UPDATED: Added "ongoing" tab
const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'past', label: 'Past' }
]

// Helper to get today's date at midnight
const getToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

// Check if climb is upcoming
const isUpcomingClimb = (climb) => {
  if (!climb.startDate) return false
  try {
    const climbDate = new Date(climb.startDate)
    climbDate.setHours(0, 0, 0, 0)
    return climbDate > getToday()
  } catch {
    return false
  }
}

// Check if climb is ongoing
const isOngoingClimb = (climb) => {
  if (!climb.startDate) return false
  try {
    const today = getToday()
    const startDate = new Date(climb.startDate)
    startDate.setHours(0, 0, 0, 0)
    
    // If no end date, check if start date is today
    if (!climb.endDate) {
      return startDate.getTime() === today.getTime()
    }
    
    // Check if today is between start and end dates (inclusive)
    const endDate = new Date(climb.endDate)
    endDate.setHours(0, 0, 0, 0)
    
    return today >= startDate && today <= endDate
  } catch {
    return false
  }
}

// Check if climb is past
const isPastClimb = (climb) => {
  if (!climb.startDate) return false
  try {
    const today = getToday()
    
    // Use end date if available, otherwise use start date
    const compareDate = climb.endDate ? new Date(climb.endDate) : new Date(climb.startDate)
    compareDate.setHours(0, 0, 0, 0)
    
    return compareDate < today
  } catch {
    return false
  }
}

// Fetch real data from API
async function loadGroupClimbs() {
  isLoading.value = true
  error.value = ''
  
  try {
    const response = await $fetch('/api/groupclimb')
    
    if (response.ok && Array.isArray(response.data)) {
      groupClimbs.value = response.data.filter(climb => climb.isPublic && !climb.isDeleted)
    } else if (Array.isArray(response)) {
      groupClimbs.value = response.filter(climb => climb.isPublic && !climb.isDeleted)
    } else {
      groupClimbs.value = []
    }
  } catch (err) {
    console.error('Failed to load group climbs:', err)
    error.value = 'Failed to load group climbs. Please try again later.'
    groupClimbs.value = []
  } finally {
    isLoading.value = false
  }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'TBA'
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  } catch {
    return 'Invalid date'
  }
}

// Format price
const formatPrice = (price, currency) => {
  const amount = price || 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Get category name by ID
const getCategoryName = (id) => {
  const category = categories.value.find(cat => cat.id === id)
  return category ? category.name : id
}

// Spots left class helper
const spotsLeftClass = (climb) => {
  const max = climb.maxGroupSize || 0
  const booked = climb.seatsBooked || 0
  const spotsLeft = max - booked
  
  if (spotsLeft <= 2) return 'text-red-600 font-semibold'
  if (spotsLeft <= 5) return 'text-orange-600'
  return 'text-emerald-600'
}

// Computed upcoming climbs count - UPDATED: Includes both upcoming AND ongoing
const upcomingClimbsCount = computed(() => {
  return groupClimbs.value.filter(climb => {
    return isUpcomingClimb(climb) || isOngoingClimb(climb)
  }).length
})

// Filter climbs based on active tab (upcoming, ongoing, or past) - UPDATED
const filteredByTab = computed(() => {
  return groupClimbs.value.filter(climb => {
    try {
      switch (activeTab.value) {
        case 'upcoming':
          return isUpcomingClimb(climb)
        case 'ongoing':
          return isOngoingClimb(climb)
        case 'past':
          return isPastClimb(climb)
        default:
          return true
      }
    } catch {
      return false
    }
  })
})

// Apply category filters
const filteredByCategory = computed(() => {
  if (selectedCategories.value.length === 0) return filteredByTab.value
  
  return filteredByTab.value.filter(climb => {
    const climbCategories = Array.isArray(climb.categoryIds) ? climb.categoryIds : []
    return climbCategories.some(categoryId => 
      selectedCategories.value.includes(categoryId)
    )
  })
})

// Apply search filter
const filteredBySearch = computed(() => {
  if (!searchQuery.value.trim()) return filteredByCategory.value
  
  const query = searchQuery.value.toLowerCase().trim()
  return filteredByCategory.value.filter(climb => {
    const title = climb.title?.toLowerCase() || ''
    const shortDesc = climb.shortDescription?.toLowerCase() || ''
    const tags = Array.isArray(climb.tags) ? climb.tags.map(tag => tag.toLowerCase()) : []
    
    return title.includes(query) ||
           shortDesc.includes(query) ||
           tags.some(tag => tag.includes(query)) ||
           (climb.description && climb.description.toLowerCase().includes(query))
  })
})

// Apply sorting
const filteredClimbs = computed(() => {
  const climbs = [...filteredBySearch.value]
  
  switch (sortBy.value) {
    case 'date-asc':
      return climbs.sort((a, b) => {
        try {
          return new Date(a.startDate) - new Date(b.startDate)
        } catch {
          return 0
        }
      })
    case 'date-desc':
      return climbs.sort((a, b) => {
        try {
          return new Date(b.startDate) - new Date(a.startDate)
        } catch {
          return 0
        }
      })
    case 'price-asc':
      return climbs.sort((a, b) => (a.price || 0) - (b.price || 0))
    case 'price-desc':
      return climbs.sort((a, b) => (b.price || 0) - (a.price || 0))
    default:
      return climbs
  }
})

// Pagination logic
const totalPages = computed(() => Math.ceil(filteredClimbs.value.length / pageSize))
const startIndex = computed(() => (currentPage.value - 1) * pageSize)
const endIndex = computed(() => startIndex.value + pageSize)
const paginatedClimbs = computed(() => 
  filteredClimbs.value.slice(startIndex.value, endIndex.value)
)

// Calculate visible page numbers for pagination
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  start = Math.max(1, end - maxVisible + 1)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Navigation functions
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Scroll to grid
const scrollToGrid = () => {
  const el = document.querySelector('main')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Category filter handlers
const toggleCategory = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index === -1) {
    selectedCategories.value.push(categoryId)
  } else {
    selectedCategories.value.splice(index, 1)
  }
  currentPage.value = 1
}

const handleCategoryBlur = (e) => {
  setTimeout(() => {
    isCategoryOpen.value = false
  }, 200)
}

// Quick view modal functions
const openQuickView = (climb) => {
  quickViewClimb.value = climb
  document.body.style.overflow = 'hidden'
}

const closeQuickView = () => {
  quickViewClimb.value = null
  document.body.style.overflow = ''
}

// Handle escape key to close modal
onMounted(() => {
  loadGroupClimbs()
  
  const handleEscape = (e) => {
    if (e.key === 'Escape' && quickViewClimb.value) {
      closeQuickView()
    }
  }
  window.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})

// Toast notification for admin button
const showAdminToast = () => {
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Reset all filters
const resetFilters = () => {
  selectedCategories.value = []
  searchQuery.value = ''
  sortBy.value = 'date-asc'
  currentPage.value = 1
}

// Watch for changes that should reset pagination
watch([activeTab, selectedCategories, searchQuery, sortBy], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Pattern Background */
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #fef3c7;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #d97706, #b45309);
}
</style>