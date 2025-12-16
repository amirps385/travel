<template>
  <div class="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-emerald-200">
    <!-- Image Container -->
    <div class="relative h-64 overflow-hidden">
      <img
        :src="park.featuredImage || 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=600&fit=crop&q=80'"
        :alt="park.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      <!-- Category Badge -->
      <div class="absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg bg-white/20 text-white border border-white/30">
        {{ park.category }}
      </div>
      <!-- Region Badge -->
      <div class="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md shadow-lg bg-black/40 text-white border border-white/20 flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {{ park.region }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Park Name -->
      <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors duration-300">
        {{ park.name }}
      </h3>

      <!-- Description -->
      <p class="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
        {{ park.shortDescription }}
      </p>

      <!-- Action Button -->
      <button
        @click="navigateToPark"
        class="w-full py-3.5 px-4 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-200"
      >
        <span>Explore Park Details</span>
        <span class="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </div>

    <!-- Hover Effect -->
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>
  </div>
</template>

<script setup>
import { useRouter } from '#app'

const props = defineProps({
  park: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      slug: '',
      shortDescription: '',
      featuredImage: '',
      region: '',
      category: ''
    })
  }
})

const router = useRouter()

const navigateToPark = () => {
  router.push(`/parks/${props.park.slug}`)
}
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>