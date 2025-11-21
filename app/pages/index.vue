<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-12">
    <div class="max-w-4xl w-full bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
      <!-- Header -->
      <div class="text-center mb-8">
        <p class="text-xs uppercase tracking-[0.2em] text-sky-500 font-semibold">
          Welcome to
        </p>
        <h1 class="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
          Your Tanzania Travel Planner
        </h1>
        <p class="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
          Create a fully customized trip itinerary for your guests, or jump into the admin dashboard
          to manage enquiries, itineraries and content.
        </p>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <!-- Plan Journey -->
        <NuxtLink
          to="/journey"
          class="group flex flex-col justify-between rounded-2xl border border-sky-100 bg-linear-to-br from-sky-500 to-indigo-600 text-white p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold">Plan your journey</h2>
              <p class="mt-1 text-xs md:text-sm text-sky-50/80">
                Open the trip planning wizard to build a custom itinerary step by step.
              </p>
            </div>
            <div class="shrink-0 rounded-full bg-white/15 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.5 19.5L21 12 2.5 4.5 9 12z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between text-xs md:text-sm">
            <span class="inline-flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-emerald-300"></span>
              Ideal for clients / travellers
            </span>
            <span class="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition">
              Start planning
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </NuxtLink>

        <!-- Admin Dashboard -->
        <NuxtLink
          to="/dashboard"
          class="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
        >
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Dashboard</h2>
              <p class="mt-1 text-xs md:text-sm text-slate-600">
                Go to the admin area to manage itineraries, leads and content (internal use).
              </p>
            </div>
            <div class="shrink-0 rounded-full bg-slate-900 text-white p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h8M4 18h4" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between text-xs md:text-sm text-slate-600">
            <span class="inline-flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-sky-400"></span>
              For administrators
            </span>
            <span class="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition">
              Open dashboard
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Small footer text -->
      <p class="mt-6 text-xs text-center text-slate-400">
        You can customise this welcome screen later with photos, branding and marketing copy.
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Welcome | Travel Planner'
})
</script>
