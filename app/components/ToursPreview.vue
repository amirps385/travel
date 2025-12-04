<template>
  <section class="py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Featured tours</h2>
        <NuxtLink to="/tours" class="text-sm text-emerald-600">View all</NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="t in tours" :key="t.slug" class="rounded-xl overflow-hidden shadow-lg bg-white">
          <div class="h-40 bg-gray-200" :style="{ backgroundImage: `url(${t.image || '/images/tour-placeholder.jpg'})`, backgroundSize: 'cover' }"></div>
          <div class="p-4">
            <h3 class="font-semibold text-lg">{{ t.title }}</h3>
            <p class="text-sm text-gray-600 mt-2">{{ t.summary }}</p>
            <div class="mt-3 flex items-center justify-between">
              <div class="text-sm font-bold">${{ t.price }}</div>
              <NuxtLink :to="`/tours/${t.slug}`" class="text-emerald-600 text-sm">View</NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const tours = [
  { title: 'Serengeti Migration Safari', slug: 'serengeti-migration', price: 2200, summary: 'Witness the great migration.', image: '/images/tour1.png' },
  { title: 'Kilimanjaro Lemosho 8d', slug: 'lemosho-8d', price: 1900, summary: 'A popular scenic route.', image: '/images/tour2.png' },
  { title: 'Zanzibar Beach Stay', slug: 'zanzibar-beach', price: 800, summary: 'Beach relaxation & diving.', image: '/images/tour3.png' }
]
</script>
