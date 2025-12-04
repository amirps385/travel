<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- Page header -->
      

      <!-- CITIES SECTION -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Cities & Destinations
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Add and remove cities that will be used across hotels, transfers and activities.
            </p>
          </div>
        </div>

        <!-- Input + button -->
        <div class="flex gap-2 mb-4">
          <input
            v-model="newCityName"
            type="text"
            class="flex-1 border rounded-lg px-3 py-2 text-sm"
            placeholder="Enter city name..."
            @keyup.enter="createCity"
          />
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs md:text-sm font-semibold px-4 py-2 shadow-sm disabled:opacity-60"
            :disabled="isSavingCity || !newCityName.trim()"
            @click="createCity"
          >
            <span>＋</span>
            Add City
          </button>
        </div>

        <!-- Cities table -->
        <div class="border rounded-2xl overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50/80">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">City Name</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="city in cities"
                :key="city._id"
                class="border-b last:border-b-0 hover:bg-slate-50/70"
              >
                <td class="py-3 px-4 text-slate-900">
                  {{ city.name }}
                </td>
                <td class="py-3 px-4 text-right">
                  <button
                    type="button"
                    class="rounded-full p-2 hover:bg-rose-50 text-rose-600"
                    title="Delete city"
                    @click="deleteCity(city)"
                  >
                    <!-- trash icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                            d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 12h10l1-12"/>
                    </svg>
                  </button>
                </td>
              </tr>

              <tr v-if="!cities.length">
                <td colspan="2" class="py-4 px-4 text-center text-xs text-slate-500">
                  No cities added yet. Type a name and click “Add City”.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Cities'
})

// header date
const today = computed(() => {
  const d = new Date()
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

// ---- Cities state ----
const cities = ref([])
const newCityName = ref('')
const isSavingCity = ref(false)

async function loadCities () {
  try {
    const data = await $fetch('/api/cities')
    cities.value = data || []
  } catch (err) {
    console.error('Failed to load cities', err)
  }
}

async function createCity () {
  const name = newCityName.value.trim()
  if (!name) return

  isSavingCity.value = true
  try {
    const created = await $fetch('/api/cities', {
      method: 'POST',
      body: { name }
    })

    // avoid duplicates if API returned existing city
    const exists = cities.value.find((c) => c._id === created._id)
    if (!exists) {
      cities.value.push(created)
    }

    newCityName.value = ''
  } catch (err) {
    console.error('Failed to create city', err)
    alert('Failed to create city. Check console for details.')
  } finally {
    isSavingCity.value = false
  }
}

async function deleteCity (city) {
  if (!confirm(`Delete city "${city.name}"?`)) return

  try {
    await $fetch(`/api/cities/${city._id}`, {
      method: 'DELETE'
    })
    cities.value = cities.value.filter((c) => c._id !== city._id)
  } catch (err) {
    console.error('Failed to delete city', err)
    alert('Failed to delete city. Check console for details.')
  }
}

// initial load
onMounted(async () => {
  await loadCities()
})
</script>
