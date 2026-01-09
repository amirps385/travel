<template>
  <article 
    class="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-amber-200 h-full flex flex-col relative focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2"
    :aria-label="`Group climb: ${climb.title}`"
  >
    <!-- Image with clickable area -->
    <div 
      class="relative h-60 overflow-hidden cursor-pointer"
      @click="handleImageClick"
      @keydown.enter="handleImageClick"
      tabindex="0"
      :aria-label="`View details for ${climb.title}`"
      role="button"
    >
      <img
        :src="climbImage"
        :alt="climb.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
        width="400"
        height="240"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      
      <!-- Status Badge -->
      <div class="absolute top-4 right-4">
        <span 
          :class="[
            'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border',
            statusClass
          ]"
          :aria-label="`Status: ${statusLabel}`"
        >
          {{ statusLabel }}
        </span>
      </div>
      
      <!-- Spots Left Badge (Top Left) -->
      <div class="absolute top-4 left-4">
        <div 
          :class="[
            'px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border',
            spotsLeftClass
          ]"
          :aria-label="`${spotsLeft} spots left`"
        >
          {{ spotsLeft }} {{ spotsLeft === 1 ? 'Spot' : 'Spots' }}
        </div>
      </div>
      
      <!-- Price Tag (Bottom Left) -->
      <div class="absolute bottom-4 left-4">
        <div class="bg-linear-to-r from-amber-600 to-amber-700 text-white px-4 py-2.5 rounded-xl shadow-lg">
          <div class="text-lg font-bold">{{ formattedPrice }}</div>
          <div class="text-xs opacity-90">per person</div>
        </div>
      </div>
      
      <!-- Quick View Button (Bottom Right) -->
      <div v-if="showQuickView" class="absolute bottom-4 right-4">
        <button
          @click.stop="handleQuickView"
          @keydown.enter.stop="handleQuickView"
          class="inline-flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-slate-800 hover:bg-white hover:text-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl group/btn focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-label="Open quick view modal"
        >
          <svg class="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Quick View
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex-1 flex flex-col">
      <!-- Title and Meta -->
      <div class="mb-4">
        <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors duration-300 line-clamp-2 leading-tight">
          {{ climb.title }}
        </h3>
        
        <div class="flex items-center gap-2 text-slate-600 mb-3">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-medium">{{ climb.durationDays }} days</span>
          <span class="text-slate-400" aria-hidden="true">•</span>
          <time :datetime="climb.startDate" class="text-sm">{{ formattedDate }}</time>
        </div>
        
        <!-- Short Description -->
        <p class="text-sm text-slate-600 mb-4 flex-1 line-clamp-2 leading-relaxed">
          {{ climb.shortDescription }}
        </p>
      </div>

      <!-- Meta Information Grid -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <!-- Group Size -->
        <div class="flex items-center gap-3">
          <div class="p-2 bg-amber-50 rounded-lg" aria-hidden="true">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-xs text-slate-500 uppercase tracking-wide font-medium">Group Size</p>
            <p class="text-sm font-semibold text-slate-900">{{ climb.seatsBooked }}/{{ climb.maxGroupSize }}</p>
          </div>
        </div>

        <!-- Organizer -->
        <div class="flex items-center gap-3">
          <div class="p-2 bg-emerald-50 rounded-lg" aria-hidden="true">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-xs text-slate-500 uppercase tracking-wide font-medium">Organizer</p>
            <p class="text-sm font-semibold text-slate-900 truncate" :title="climb.organizer?.name">{{ climb.organizer?.name || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <!-- Progress Bar for Spots -->
      <div class="mb-6">
        <div class="flex justify-between text-xs text-slate-600 mb-1">
          <span>Spots filled</span>
          <span>{{ Math.round((climb.seatsBooked / climb.maxGroupSize) * 100) }}%</span>
        </div>
        <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            :class="[
              'h-full rounded-full transition-all duration-500',
              spotsLeft <= 2 
                ? 'bg-red-500' 
                : spotsLeft <= 5 
                  ? 'bg-orange-500'
                  : 'bg-emerald-500'
            ]"
            :style="{ width: `${(climb.seatsBooked / climb.maxGroupSize) * 100}%` }"
            :aria-label="`${climb.seatsBooked} out of ${climb.maxGroupSize} spots filled`"
            role="progressbar"
            :aria-valuenow="climb.seatsBooked"
            :aria-valuemin="0"
            :aria-valuemax="climb.maxGroupSize"
          ></div>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="climb.tags && climb.tags.length > 0" class="mb-6 flex flex-wrap gap-1.5">
        <span
          v-for="(tag, index) in climb.tags.slice(0, 3)"
          :key="index"
          class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          tabindex="0"
          :aria-label="`Tag: ${tag}`"
        >
          #{{ tag }}
        </span>
        <span
          v-if="climb.tags.length > 3"
          class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
          aria-label="Additional tags"
        >
          +{{ climb.tags.length - 3 }}
        </span>
      </div>

      <!-- Actions -->
      <div class="mt-auto pt-5 border-t border-slate-100">
        <div class="flex gap-3">
          <!-- View Details Button -->
          <NuxtLink
            :to="`/groupclimb/${climb.slug}`"
            class="flex-1 text-center px-4 py-3.5 border border-transparent text-sm font-bold rounded-xl text-white bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group/link"
            :aria-label="`View full details for ${climb.title}`"
          >
            <span class="flex items-center justify-center gap-2">
              View Details
              <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </NuxtLink>
          
          <!-- Quick View Button (Mobile/Compact) -->
          <button
            v-if="showQuickView"
            @click="handleQuickView"
            @keydown.enter="handleQuickView"
            class="p-3.5 border border-slate-200 rounded-xl text-slate-700 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            aria-label="Quick view modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          <!-- Book/Enquire Button -->
          <button
            class="p-3.5 border border-slate-200 rounded-xl text-slate-700 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Book or enquire about this climb"
            @click="handleBookClick"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Hover Glow Effect -->
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/20 rounded-3xl transition-all duration-500 pointer-events-none"></div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

// Define props
const props = defineProps({
  climb: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value &&
        typeof value.title === 'string' &&
        typeof value.slug === 'string' &&
        value.maxGroupSize > 0
      )
    }
  },
  showQuickView: {
    type: Boolean,
    default: true
  }
})

// Define emits
const emit = defineEmits(['quickview', 'book'])

// Computed values
const spotsLeft = computed(() => {
  return Math.max(0, props.climb.maxGroupSize - props.climb.seatsBooked)
})

const statusLabel = computed(() => {
  const status = props.climb.status || determineStatusFromDate()
  
  const statusMap = {
    'upcoming': 'Upcoming',
    'open': 'Open',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
    'full': 'Full',
    'closed': 'Closed'
  }
  
  return statusMap[status] || status || 'Upcoming'
})

const statusClass = computed(() => {
  const status = props.climb.status || determineStatusFromDate()
  
  const classMap = {
    'upcoming': 'bg-blue-500/20 text-blue-100 border-blue-400/30',
    'open': 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30',
    'completed': 'bg-slate-500/20 text-slate-100 border-slate-400/30',
    'cancelled': 'bg-red-500/20 text-red-100 border-red-400/30',
    'full': 'bg-amber-500/20 text-amber-100 border-amber-400/30',
    'closed': 'bg-slate-500/20 text-slate-100 border-slate-400/30'
  }
  
  return classMap[status] || 'bg-blue-500/20 text-blue-100 border-blue-400/30'
})

const spotsLeftClass = computed(() => {
  if (spotsLeft.value <= 0) return 'bg-red-500/20 text-red-100 border-red-400/30'
  if (spotsLeft.value <= 2) return 'bg-red-500/20 text-red-100 border-red-400/30'
  if (spotsLeft.value <= 5) return 'bg-orange-500/20 text-orange-100 border-orange-400/30'
  return 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30'
})

const formattedDate = computed(() => {
  const date = new Date(props.climb.startDate)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
})

const formattedPrice = computed(() => {
  const price = props.climb.price || 0
  const currency = props.climb.currency || 'USD'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
})

const climbImage = computed(() => {
  if (props.climb.gallery && props.climb.gallery.length > 0) {
    return props.climb.gallery[0]
  }
  
  // Fallback placeholder images
  const placeholders = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
    'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&q=80'
  ]
  
  // Use a consistent placeholder based on climb ID for better UX
  const index = props.climb.id ? parseInt(props.climb.id) % placeholders.length : 0
  return placeholders[index]
})

// Helper function to determine status from dates if not provided
const determineStatusFromDate = () => {
  const now = new Date()
  const startDate = new Date(props.climb.startDate)
  const endDate = new Date(props.climb.endDate)
  
  if (props.climb.seatsBooked >= props.climb.maxGroupSize) {
    return 'full'
  }
  
  if (now > endDate) {
    return 'completed'
  }
  
  if (now >= startDate && now <= endDate) {
    return 'open'
  }
  
  return 'upcoming'
}

// Event handlers
const handleQuickView = (event) => {
  event.stopPropagation()
  emit('quickview', props.climb)
}

const handleImageClick = () => {
  emit('quickview', props.climb)
}

const handleBookClick = (event) => {
  event.stopPropagation()
  // In a real app, this would trigger a booking flow
  console.log('Book/Enquire clicked for:', props.climb.title)
  // For now, emit an event so parent can handle it
  emit('book', props.climb)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Improve focus visibility */
:focus-visible {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}

/* Ensure links have proper focus styles */
a:focus-visible {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}

/* Smooth transitions for interactive elements */
button, a {
  transition: all 0.2s ease-in-out;
}
</style>