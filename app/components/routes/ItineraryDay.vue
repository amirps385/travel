<template>
  <article class="bg-white rounded-2xl shadow-sm border overflow-hidden">
    <div class="md:flex">
      <!-- Day stripe -->
      <div class="md:w-36 bg-amber-600 text-white flex flex-col items-center justify-center p-6">
        <div class="text-4xl font-extrabold">{{ day.day }}</div>
        <div class="text-xs uppercase tracking-wider mt-1">Day</div>
      </div>

      <!-- Content -->
      <div class="flex-1 p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h4 class="text-lg font-bold text-slate-900">{{ day.title }}</h4>
            <div class="text-sm text-slate-500 mt-2">
              <span v-if="day.altitude">Altitude: {{ day.altitude }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button @click="expanded = !expanded" class="text-sm text-amber-600 font-semibold">
              {{ expanded ? 'Collapse' : 'Read' }}
            </button>
          </div>
        </div>

        <p class="text-slate-600 mt-4" v-show="expanded">{{ day.description }}</p>

        <img v-if="day.image" :src="day.image" :alt="day.title" class="w-full h-44 object-cover rounded-lg mt-4" loading="lazy"/>
      </div>
    </div>
  </article>
</template>

<script setup>
/**
 * ItineraryDay.vue
 * Props:
 *  - day: { day:number, title, description, altitude?, image? }
 * Simple expand/collapse for long descriptions.
 */

import { ref } from 'vue'
const props = defineProps({
  day: { type: Object, required: true }
})

const expanded = ref(false)
</script>

<style scoped>
/* nothing custom */
</style>
