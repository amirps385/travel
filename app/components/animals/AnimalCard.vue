<!-- app/components/animals/AnimalCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
    <h3 class="font-bold text-lg">{{ animal.name }}</h3>
    <p class="text-sm text-gray-600">{{ animal.category }}</p>
    <p class="text-sm mt-2">{{ animal.shortDescription }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  animal: {
    type: Object,
    required: true
  }
})
</script>