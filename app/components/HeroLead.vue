<template>
  <div class="bg-white/90 rounded-2xl p-6 shadow-md max-w-2xl mx-auto -mt-12 relative">
    <form @submit.prevent="submitLead" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <input v-model="name" placeholder="Your name" class="col-span-1 sm:col-span-1 border rounded px-3 py-2" />
      <input v-model="email" placeholder="Email" class="col-span-1 sm:col-span-1 border rounded px-3 py-2" />
      <button class="col-span-1 sm:col-span-1 bg-emerald-600 text-white rounded px-4 py-2">Request itinerary</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
async function submitLead() {
  // placeholder - replace with real endpoint
  alert('Lead submitted (demo). Replace with API call.')
}
</script>
