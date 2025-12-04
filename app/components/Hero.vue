<template>
  <section class="relative w-full min-h-[70vh] lg:min-h-screen flex items-center">
    <!-- BG image (from public/hero/safari.jpg) -->
    <img
      src="/hero/safari.jpg"
      alt="Safari Tanzania"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />
    <!-- dark gradient -->
    <div class="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/10"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-40 text-center text-white">
      <p class="text-xs uppercase tracking-widest text-sky-300 mb-3">Explore Tanzania</p>
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
        Plan your dream safari — tailor-made, unforgettable.
      </h1>
      <p class="mt-4 text-sm md:text-lg text-slate-200 max-w-2xl mx-auto">
        Handcrafted itineraries, expert guides, and unforgettable wildlife experiences. Start building your custom trip now.
      </p>

      <div class="mt-8 flex items-center justify-center gap-4">
        <NuxtLink to="/journey" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition">
          Start Trip Planner
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>

        <NuxtLink to="/tours" class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full font-medium transition">
          View Tours
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
