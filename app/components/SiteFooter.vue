<template>
  <footer class="bg-slate-900 text-slate-200">
    <div class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h4 class="font-bold text-white">ZafsTours</h4>
        <p class="text-sm text-slate-400 mt-2">Tailor-made safaris & Kilimanjaro climbs.</p>
      </div>
      <div>
        <h5 class="font-semibold">Explore</h5>
        <ul class="mt-2 text-sm text-slate-400 space-y-1">
          <li><NuxtLink to="/tours">Tours</NuxtLink></li>
          <li><NuxtLink to="/articles">Articles</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h5 class="font-semibold">Contact</h5>
        <p class="text-sm text-slate-400 mt-2">info@zafstours.com</p>
        <p class="text-sm text-slate-400">+255 689 78 0780</p>
      </div>
    </div>

    <div class="border-t border-slate-800 text-slate-500 text-xs py-3 text-center">
      © ZafsTours — All rights reserved
    </div>
  </footer>
</template>
