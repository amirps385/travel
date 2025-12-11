<template>
  <div class="space-y-6">
    <!-- Filters Container -->
    <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6">
      <!-- Header -->
      <div class="flex items-center mb-6">
        <div class="w-8 h-8 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center mr-3">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 008 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900">Filter Tours</h3>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-3">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Search Tours
          </div>
        </label>

        <div class="relative">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Find your adventure..."
            class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-white/50 backdrop-blur-sm"
            @input="onSearchInput"
          />
          <div class="absolute left-4 top-1/2 -translate-y-1/2">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Category Selection -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-3">Tour Type</label>

        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="[
              'py-3 px-4 rounded-xl border transition-all font-medium text-sm',
              activeCategory === category.id
                ? getCategoryClass(category.id).active
                : getCategoryClass(category.id).inactive
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Duration Slider -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-700 mb-4">
          Duration <span class="text-amber-600 font-bold ml-2">{{ filters.duration || "Any" }} days</span>
        </label>

        <input
          v-model.number="filters.duration"
          type="range"
          min="1"
          max="21"
          step="1"
          @change="applyFilters"
          class="w-full h-2 bg-linear-to-r from-emerald-100 to-amber-100 rounded-full"
        />

        <div class="flex justify-between text-xs text-gray-500 mt-2">
          <span>1 day</span><span>7 days</span><span>14 days</span><span>21+ days</span>
        </div>
      </div>

      <!-- Price Range -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-700 mb-4">
          Price Range
          <span class="text-emerald-600 font-bold ml-2">${{ filters.minPrice }} - ${{ filters.maxPrice }}</span>
        </label>

        <input
          v-model.number="filters.minPrice"
          type="range"
          min="0"
          :max="filters.maxPrice"
          @change="applyFilters"
          class="w-full h-1.5 bg-linear-to-r from-emerald-200 to-amber-200 rounded-full"
        />

        <input
          v-model.number="filters.maxPrice"
          type="range"
          min="0"
          max="10000"
          @change="applyFilters"
          class="w-full h-1.5 bg-linear-to-r from-amber-200 to-emerald-200 rounded-full"
        />
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3 pt-4 border-t border-amber-100">
        <button
          @click="applyFilters"
          class="w-full py-3.5 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-lg flex items-center justify-center"
        >
          Apply Filters
        </button>

        <button
          @click="resetFilters"
          class="w-full py-3 bg-white text-gray-700 font-medium rounded-xl border-2 border-amber-200 hover:bg-amber-50"
        >
          Reset All
        </button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="bg-linear-to-br from-emerald-900/90 to-amber-900/90 rounded-2xl p-6 text-white">
      <h4 class="font-bold text-lg mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
            clip-rule="evenodd"/>
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
import { reactive, computed, ref } from 'vue'

/* ---------- Props from Parent ---------- */
const props = defineProps({
  typeOptions: {
    type: Array,
    default: () => []
  },
  resultCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['filter'])

/* ---------- Helpers ---------- */
const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

/* ---------- Category Setup ---------- */
const categories = [
  { id: 'all', name: 'All Tours' },
  ...props.typeOptions.map(name => ({
    id: slugify(name),
    name
  }))
]

const defaultClasses = {
  active: 'bg-linear-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500',
  inactive: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
}

const categoryClasses = {
  all: defaultClasses,
  [slugify("Wildlife Safari")]: defaultClasses,
  [slugify("Kilimanjaro Climb")]: {
    active: 'bg-linear-to-r from-slate-600 to-slate-800 text-white border-slate-600',
    inactive: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
  },
  [slugify("Zanzibar Beach")]: {
    active: 'bg-linear-to-r from-sky-500 to-blue-600 text-white border-sky-500',
    inactive: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
  },
  [slugify("Cultural Experience")]: {
    active: 'bg-linear-to-r from-amber-500 to-amber-600 text-white border-amber-500',
    inactive: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
  },
  [slugify("Adventure Tour")]: {
    active: 'bg-linear-to-r from-pink-500 to-rose-600 text-white border-pink-500',
    inactive: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
  }
}

function getCategoryClass(id) {
  return categoryClasses[id] || defaultClasses
}

/* ---------- Filter State ---------- */
const filters = reactive({
  search: '',
  category: 'all',
  duration: '',
  minPrice: 0,
  maxPrice: 10000
})

const activeCategory = ref('all')

/* ---------- Emit Filters to Parent ---------- */
const MAX_PRICE = 10000

function applyFilters() {
  emit("filter", {
    ...filters,
    duration: filters.duration ? Number(filters.duration) : '',
    minPrice: Number(filters.minPrice),
    maxPrice: Math.min(Number(filters.maxPrice), MAX_PRICE)
  })
}

function resetFilters() {
  filters.search = ''
  filters.category = 'all'
  filters.duration = ''
  filters.minPrice = 0
  filters.maxPrice = 10000
  activeCategory.value = 'all'

  applyFilters()
}

function selectCategory(id) {
  activeCategory.value = id
  filters.category = id
  applyFilters()
}

function onSearchInput() {
  applyFilters()
}
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  border: 2px solid white;
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  border: 2px solid white;
  cursor: pointer;
}
</style>
