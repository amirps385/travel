<template>
  <header class="relative w-full">
    <div
      class="relative h-[56vh] min-h-[420px] flex items-center"
      :style="bgStyle"
      role="img"
      :aria-label="route.name"
    >
      <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 text-white">
        <span class="inline-block bg-amber-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          {{ label || 'Route' }}
        </span>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">{{ route.name }}</h1>
        <p class="text-lg md:text-xl text-amber-100/90 max-w-3xl mb-6">{{ route.tagline }}</p>

        <div class="flex flex-wrap gap-4 items-center">
          <div class="inline-flex items-center gap-4 bg-white/10 px-4 py-3 rounded-lg">
            <div class="text-sm text-amber-200 font-semibold">{{ route.duration }}</div>
            <div class="h-6 w-px bg-white/10" />
            <div class="text-sm text-amber-200 font-semibold">{{ route.difficulty }}</div>
            <div class="h-6 w-px bg-white/10" />
            <div class="text-sm text-amber-200 font-semibold">{{ route.successRate }}</div>
          </div>

          <button @click="$emit('request')" class="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 font-bold">
            Request This Route
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
/**
 * RouteHero.vue
 * Props:
 *  - route: { name, tagline, heroImage, duration, difficulty, successRate }
 *  - label: optional small label text
 * Emits:
 *  - request  (when CTA clicked)
 */

const props = defineProps({
  route: { type: Object, required: true },
  label: { type: String, default: 'Route' }
})

const bgStyle = computed(() => ({
  backgroundImage: `url('${props.route?.heroImage || props.route?.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=60&auto=format&fit=crop'}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))
</script>

<style scoped>
/* nothing custom — all Tailwind */
</style>
