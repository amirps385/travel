<template>
  <article class="border rounded-lg p-4 shadow">
    <div class="h-40 bg-gray-200 rounded mb-3"></div>
    <h3 class="text-xl font-semibold">{{ title }}</h3>
    <nuxt-link :to="`/tours/${slug}`" class="text-blue-600 inline-block mt-2">View</nuxt-link>
  </article>
</template>
<script setup>
defineProps({ title: String, slug: String })
</script>
