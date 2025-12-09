<template>
  <div class="space-y-6">
    <!-- Filters Container with Safari Styling -->
    <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6">
      <!-- Header -->
      <div class="flex items-center mb-6">
        <div class="w-8 h-8 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center mr-3">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900">Filter Tours</h3>
      </div>

      <!-- Search with Safari Icon -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-3">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Search Tours
          </div>
        </label>
        <div class="relative">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Find your adventure..."
            class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
          />
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Category Selection with Safari Colors -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-3">Tour Type</label>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="[
              'py-3 px-4 rounded-xl border transition-all duration-300 font-medium text-sm',
              filters.category === category.id
                ? categoryClasses[category.id].active
                : categoryClasses[category.id].inactive
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Duration Slider -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-700 mb-4">
          Duration
          <span class="text-amber-600 font-bold ml-2">{{ filters.duration || 'Any' }} days</span>
        </label>
        <div class="space-y-4">
          <input
            v-model="filters.duration"
            type="range"
            min="1"
            max="21"
            step="1"
            class="w-full h-2 bg-linear-to-r from-emerald-100 to-amber-100 rounded-full appearance-none cursor-pointer"
          />
          <div class="flex justify-between text-xs text-gray-500">
            <span>1 day</span>
            <span>7 days</span>
            <span>14 days</span>
            <span>21+ days</span>
          </div>
        </div>
      </div>

      <!-- Price Range -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-700 mb-4">
          Price Range
          <span class="text-emerald-600 font-bold ml-2">${{ filters.minPrice }} - ${{ filters.maxPrice }}</span>
        </label>
        <div class="space-y-6">
          <input
            v-model="filters.minPrice"
            type="range"
            :min="0"
            :max="filters.maxPrice"
            class="w-full h-1.5 bg-linear-to-r from-emerald-200 to-amber-200 rounded-full appearance-none cursor-pointer"
          />
          <input
            v-model="filters.maxPrice"
            type="range"
            :min="filters.minPrice"
            :max="5000"
            class="w-full h-1.5 bg-linear-to-r from-amber-200 to-emerald-200 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3 pt-4 border-t border-amber-100">
        <button
          @click="applyFilters"
          class="group w-full py-3.5 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
        >
          <svg class="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Apply Filters
        </button>
        <button
          @click="resetFilters"
          class="w-full py-3 bg-white text-gray-700 font-medium rounded-xl border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
        >
          Reset All
        </button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="bg-linear-to-br from-emerald-900/90 to-amber-900/90 rounded-2xl p-6 text-white backdrop-blur-sm border border-emerald-300/20">
      <h4 class="font-bold text-lg mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
        </svg>
        Quick Stats
      </h4>
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-amber-300">{{ resultCount }}</div>
          <div class="text-xs text-emerald-200">Tours Found</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-emerald-300">4.9</div>
          <div class="text-xs text-amber-200">Avg Rating</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['filter'])

// Filter options with safari-themed categories
const categories = [
  { id: 'all', name: 'All Tours' },
  { id: 'safari', name: 'Wildlife Safari' },
  { id: 'kilimanjaro', name: 'Kilimanjaro' },
  { id: 'zanzibar', name: 'Zanzibar' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'family', name: 'Family' }
]

// Color classes for each category
const categoryClasses = {
  all: {
    active: 'bg-linear-to-r from-gray-800 to-gray-900 text-white border-gray-800',
    inactive: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
  },
  safari: {
    active: 'bg-linear-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500',
    inactive: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
  },
  kilimanjaro: {
    active: 'bg-linear-to-r from-slate-600 to-slate-800 text-white border-slate-600',
    inactive: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
  },
  zanzibar: {
    active: 'bg-linear-to-r from-sky-500 to-blue-600 text-white border-sky-500',
    inactive: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
  },
  cultural: {
    active: 'bg-linear-to-r from-amber-500 to-amber-600 text-white border-amber-500',
    inactive: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
  },
  family: {
    active: 'bg-linear-to-r from-pink-500 to-rose-600 text-white border-pink-500',
    inactive: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
  }
}

// Filters state
const filters = reactive({
  search: '',
  category: 'all',
  duration: '',
  minPrice: 0,
  maxPrice: 3000
})

const resultCount = computed(() => {
  // This would come from API
  return 12
})

const selectCategory = (categoryId) => {
  filters.category = categoryId
  applyFilters()
}

const applyFilters = () => {
  emit('filter', { ...filters })
}

const resetFilters = () => {
  filters.search = ''
  filters.category = 'all'
  filters.duration = ''
  filters.minPrice = 0
  filters.maxPrice = 3000
  emit('filter', { ...filters })
}
</script>

<style scoped>
/* Custom range slider styling */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>