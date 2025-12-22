<template>
  <article :class="cardClass" class="rounded-2xl overflow-hidden border bg-white">
    <div class="relative h-56 md:h-48 lg:h-56">
      <NuxtLink :to="toObj" class="absolute inset-0 block" aria-label="View route details" />
      <img
        :src="route.image || fallbackImage"
        :alt="route.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white" :class="difficultyClass">
        {{ route.difficulty || 'Unknown' }}
      </div>
      <div class="absolute top-4 right-4 bg-black/40 text-white text-xs font-medium px-3 py-1.5 rounded-xl">
        {{ route.durationMin }}–{{ route.durationMax }} days
      </div>
    </div>

    <div class="p-5 space-y-3">
      <h3 class="text-lg font-bold text-slate-900">
        <NuxtLink :to="toObj" class="hover:underline">{{ route.name }}</NuxtLink>
      </h3>

      <p class="text-sm text-slate-600 line-clamp-3" v-if="route.shortDescription">
        {{ route.shortDescription }}
      </p>

      <div class="flex items-center justify-between mt-2">
        <div>
          <div class="text-xs text-slate-500">Starting from</div>
          <div class="text-xl font-semibold text-amber-700">${{ formattedPrice }}</div>
        </div>

        <NuxtLink :to="toObj" class="ml-4 inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:opacity-95">
          View Route Details
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
/**
 * RouteCard.vue
 * Presentational card used on /routes index.
 * Props:
 *  - route: { id, name, slug, image, durationMin, durationMax, difficulty, startingPrice, shortDescription }
 *  - layout: 'grid' | 'list' (not fully used here — but kept for API compatibility)
 *  - to: optional string/object for NuxtLink target
 */

import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  route: { type: Object, required: true },
  layout: { type: String, default: 'grid' },
  to: { type: [String, Object], default: null }
})

const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=60&auto=format&fit=crop'

const toObj = computed(() => {
  if (props.to) return props.to
  const slug = props.route?.slug || props.route?.id || ''
  return { path: `/routes/${slug}` }
})

const difficultyClass = computed(() => {
  const d = (props.route?.difficulty || '').toLowerCase()
  if (d.includes('easy')) return 'bg-green-600'
  if (d.includes('moderate')) return 'bg-amber-600'
  if (d.includes('challenging')) return 'bg-orange-600'
  if (d.includes('very') || d.includes('extreme')) return 'bg-red-600'
  return 'bg-gray-600'
})

const formattedPrice = computed(() => {
  const p = Number(props.route?.startingPrice || 0)
  return isFinite(p) ? p.toLocaleString() : '—'
})

const cardClass = computed(() => props.layout === 'list' ? 'flex gap-4' : 'group')
</script>

<style scoped>
/* small clamp utility for older browsers */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
