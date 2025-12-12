<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />
    <main :class="mainClasses">
      <NuxtPage />
    </main>
     <!-- GLOBAL FOOTER -->
    <SiteFooter />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from '~/components/Navbar.vue'
import SiteFooter from '~/components/SiteFooter.vue'

const route = useRoute()

// Define which pages should NOT have padding
const noPaddingPaths = [
  '/',           // Homepage
  '/tours',      // Tours index page
  '/animals',    // Animals index page
]

const mainClasses = computed(() => {
  const path = route.path
  
  // Check if current path should NOT have padding
  const shouldHaveNoPadding = noPaddingPaths.some(noPadPath => 
    path === noPadPath || path.startsWith(noPadPath + '/')
  )
  
  // For tour detail pages (like /tours/some-slug)
  const isTourDetail = path.startsWith('/tours/') && path !== '/tours/'
  
  return shouldHaveNoPadding || isTourDetail ? '' : 'pt-20'
})
</script>