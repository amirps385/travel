<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- Page header -->
     
      <!-- ITINERARIES CARD -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base md:text-lg font-semibold text-slate-900">
            Itineraries
          </h2>
          <p class="text-xs text-slate-500">
            Total: {{ itineraries.length }}
          </p>
        </div>

        <ul class="space-y-3 text-sm">
          <li
            v-for="it in itineraries"
            :key="it.id"
            class="flex justify-between items-center rounded-xl border px-4 py-3 hover:bg-slate-50"
          >
            <div>
              <div class="font-medium text-slate-900">
                {{ it.title }}
              </div>
              <div class="text-xs text-slate-500">
                {{ it.days }} days · {{ it.travellers }} travellers · {{ it.status }}
              </div>
            </div>

            <button
              type="button"
              class="text-xs rounded-full border px-3 py-1 text-slate-700 hover:bg-slate-100"
            >
              Open
            </button>
          </li>

          <li v-if="!itineraries.length" class="text-xs text-slate-500 text-center py-4">
            No itineraries yet. Once you start building from leads, they will appear here.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Itineraries'
})

// simple "today" text for header
const today = computed(() => {
  const d = new Date()
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

// For now: demo data, same as in your old dashboard.vue
// Later we can replace this with a real API call, e.g. /api/itineraries
const itineraries = [
  { id: 1, title: '7-Day Safari + Beach Escape', days: 7, travellers: 2, status: 'Draft' },
  { id: 2, title: 'Kilimanjaro Trek + Zanzibar', days: 10, travellers: 4, status: 'Confirmed' }
]
</script>
