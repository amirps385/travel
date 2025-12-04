<template>
  <section class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">Featured tours</h2>
      <NuxtLink to="/tours" class="text-sm text-blue-600">See all tours →</NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TourCard v-for="n in 3" :key="n"
        :title="`Safari Adventure ${n}`"
        :excerpt="'5 days • Best wildlife viewing'"
        :price="1200 + n*100"
        :img="`/images/tour-${n}.jpg`"
        :slug="`safari-${n}`"
      />
    </div>
  </section>
</template>

<script setup>
import TourCard from './TourCard.vue'
</script>
