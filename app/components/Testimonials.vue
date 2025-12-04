<template>
  <section class="bg-slate-50 py-12">
    <div class="max-w-6xl mx-auto px-6">
      <h3 class="text-xl font-bold mb-6">What travellers say</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-white p-5 rounded-2xl shadow">
          <p class="text-sm text-slate-700">"Excellent planning—our safari was magical. Highly recommend!"</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <div class="font-semibold">Guest {{ i }}</div>
              <div class="text-xs text-slate-500">Country</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
