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
  '/parks',      // Parks index page
  '/islands',     // Islands index page
  '/routes',      // Routes index page
  '/zanzibar',     // Zanzibar index page
  '/contact',    // Contact page
  '/about',      // About page
  '/blog',        // Blog index page
  '/gallery',      // Gallery index page
  '/experiences' // Experiences index page
]

const mainClasses = computed(() => {
  const path = route.path
  
  // Check if current path should NOT have padding
  const shouldHaveNoPadding = noPaddingPaths.some(noPadPath => 
    path === noPadPath || path.startsWith(noPadPath + '/')
  )
  
  // For tour detail pages (like /tours/some-slug)
  const isTourDetail = path.startsWith('/tours/') && path !== '/tours/'
  
  // Also include island detail pages
  const isIslandDetail = path.startsWith('/islands/') && path !== '/islands/'
  
  return shouldHaveNoPadding || isTourDetail || isIslandDetail ? '' : 'pt-20'
})
</script>