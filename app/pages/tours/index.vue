<template>
  <section class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">Tours</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="border rounded p-4 shadow">Tour {{n}}</div>
    </div>
  </section>
</template>
