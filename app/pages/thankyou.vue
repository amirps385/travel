<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-12">
    <div
      class="max-w-4xl w-full bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10"
    >
      <!-- Header -->
      <div class="text-center mb-8">
        <!-- icon -->
        <div class="mb-4 flex items-center justify-center">
          <div class="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-7 h-7 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <p class="text-xs uppercase tracking-[0.2em] text-sky-500 font-semibold">
          Thank you
        </p>

        <h1 class="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
          Thank You for Your Inquiry!
        </h1>

        <p class="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
          We’ve received your travel request<span v-if="guestName">, {{ guestName }}</span> and our team is
          already working on creating the perfect Tanzania adventure for you.
        </p>
      </div>

      <!-- What happens next box -->
      <div
        class="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-6 md:px-7 md:py-7"
      >
        <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-3">
          What happens next?
        </h2>

        <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-slate-700">
          <li>Our team will review your preferences and budget in detail.</li>
          <li>We’ll create 2–3 customized itinerary options tailored to your request.</li>
          <li>
            You’ll receive a detailed quote via email within
            <span class="font-semibold">24–48 hours</span>.
          </li>
        </ol>
      </div>

      <!-- Note -->
      <p class="mt-6 text-xs md:text-sm text-slate-500 text-center max-w-2xl mx-auto">
        Please check your email<span v-if="guestEmail"> ({{ guestEmail }})</span> for a confirmation
        message. If you have any urgent questions, feel free to contact us directly and mention your
        inquiry.
      </p>

      <!-- Button -->
      <div class="mt-8 flex justify-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center px-7 py-2.5 md:px-9 md:py-3 rounded-full
                 bg-sky-600 hover:bg-sky-700 text-white text-sm md:text-base font-semibold
                 shadow-md hover:shadow-lg transition-transform duration-150 hover:-translate-y-0.5"
        >
          Return to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

definePageMeta({
  title: 'Thank You | Travel Planner'
})

const rawForm = ref(null)

onMounted(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('tripForm')
    if (stored) rawForm.value = JSON.parse(stored)
  }
})

const guestName = computed(() => rawForm.value?.name || '')
const guestEmail = computed(() => rawForm.value?.email || '')
</script>
