<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-6">
    <!-- STATS CARDS GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 py-4"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs text-slate-500">{{ stat.title }}</p>
            <p class="mt-1 text-2xl font-bold text-slate-900">{{ stat.value }}</p>
            <p class="mt-1 text-xs text-slate-500">{{ stat.subtitle }}</p>
          </div>
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center"
            :class="stat.colorClass"
          >
            <span class="text-lg">{{ stat.icon }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- RECENT ACTIVITY PLACEHOLDER -->
    <div
      class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6"
    >
      <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-3">
        Recent activity
      </h2>
      <p class="text-sm text-slate-500">
        Here you’ll later see the latest leads, itinerary updates and admin actions.
        For now, this is a placeholder section while we set up the backend and data.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard Overview'
})

// default values – we will update some from the API below
const stats = ref([
  {
    key: 'newLeads',
    title: 'New Leads',
    value: 0,
    subtitle: 'Status: new',
    icon: '👥',
    colorClass: 'bg-sky-50 text-sky-600'
  },
  {
    key: 'totalLeads',
    title: 'Total Leads',
    value: 0,
    subtitle: 'All time',
    icon: '📈',
    colorClass: 'bg-emerald-50 text-emerald-600'
  },
  {
    key: 'itineraries',
    title: 'Itineraries',
    value: 0,
    subtitle: 'Created itineraries',
    icon: '📄',
    colorClass: 'bg-violet-50 text-violet-600'
  },
  {
    key: 'hotels',
    title: 'Hotels',
    value: 0,
    subtitle: 'Configured hotels',
    icon: '🏨',
    colorClass: 'bg-amber-50 text-amber-600'
  },
  {
    key: 'activities',
    title: 'Activities',
    value: 0,
    subtitle: 'Available activities',
    icon: '📍',
    colorClass: 'bg-rose-50 text-rose-600'
  }
])

// helper to update a stat by key
function setStatValue (key, value) {
  const s = stats.value.find(s => s.key === key)
  if (s) s.value = value
}

onMounted(async () => {
  // ITINERARIES count (fetch first so dashboard shows it ASAP)
  try {
    const its = await $fetch('/api/itineraries').catch(() => [])
    setStatValue('itineraries', (its || []).length)
  } catch (err) {
    console.error('Failed to load itineraries for stats', err)
  }

  // LEADS -> New Leads + Total Leads
  try {
    const leads = await $fetch('/api/leads')
    const list = leads || []

    const total = list.length
    const newCount = list.filter(l => (l.status || 'new') === 'new').length

    setStatValue('totalLeads', total)
    setStatValue('newLeads', newCount)
  } catch (err) {
    console.error('Failed to load leads for stats', err)
  }

  // HOTELS
  try {
    const hotels = await $fetch('/api/hotels')
    setStatValue('hotels', (hotels || []).length)
  } catch (err) {
    console.error('Failed to load hotels for stats', err)
  }

  // ACTIVITIES
  try {
    const acts = await $fetch('/api/activities')
    setStatValue('activities', (acts || []).length)
  } catch (err) {
    console.error('Failed to load activities for stats', err)
  }
})
</script>
