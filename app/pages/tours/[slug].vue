<template>
  <section class="p-6 max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold">Tour: {{ slug }}</h2>
    <p class="mt-4 text-gray-600">Skeleton content — replace with DB-driven data.</p>
  </section>
</template>
<script setup>
const route = useRoute()
const slug = route.params.slug
</script>
