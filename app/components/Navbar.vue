<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white shadow-lg border-b-2 border-blue-800">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-extrabold tracking-tight">
        TravelGo
      </NuxtLink>

      <ul class="hidden md:flex items-center gap-6 font-medium">
        <li><NuxtLink to="/" class="hover:underline">Home</NuxtLink></li>
        <li><NuxtLink to="/itinerary" class="hover:underline">Itinerary</NuxtLink></li>
        <li><NuxtLink to="/about" class="hover:underline">About</NuxtLink></li>
        <li><NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink></li>
      </ul>

      <button @click="toggleMobile" class="md:hidden p-2 rounded bg-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>

    <transition name="slide-fade">
      <div v-if="mobileOpen" class="md:hidden bg-blue-600/95 border-t border-blue-800">
        <ul class="flex flex-col p-4 gap-3 text-white font-medium">
          <li><NuxtLink @click="closeMobile" to="/">Home</NuxtLink></li>
          <li><NuxtLink @click="closeMobile" to="/itinerary">Itinerary</NuxtLink></li>
          <li><NuxtLink @click="closeMobile" to="/about">About</NuxtLink></li>
          <li><NuxtLink @click="closeMobile" to="/contact">Contact</NuxtLink></li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mobileOpen = ref(false)
const toggleMobile = () => (mobileOpen.value = !mobileOpen.value)
const closeMobile = () => (mobileOpen.value = false)

onMounted(() => {
  // quick debug message in browser console so you can confirm component mounted
  console.log('Navbar mounted — if you see this, component is rendered')
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
