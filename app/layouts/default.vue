<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />

    <main :class="pagePadding">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from '~/components/Navbar.vue'

const route = useRoute()

// Remove spacing only on the homepage
const pagePadding = computed(() =>
  route.path === '/' ? '' : 'pt-20'
)
</script>
