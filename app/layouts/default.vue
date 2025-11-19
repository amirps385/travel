<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />

    <!-- ensure pages render here -->
    <main class="pt-20">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
</script>
