<template>
  <div class="space-y-6">
    <h3 class="text-2xl font-bold text-gray-900">Tour Highlights</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(highlight, index) in highlights"
        :key="index"
        class="flex items-start p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-colors group"
      >
        <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div>
          <span class="font-semibold text-gray-900">{{ highlight }}</span>
        </div>
      </div>
    </div>

    <!-- If no highlights -->
    <div v-if="!highlights.length" class="text-center py-8 bg-gray-50 rounded-xl">
      <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-gray-600">No highlights available for this tour</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  highlights: {
    type: Array,
    default: () => []
  }
})
</script>