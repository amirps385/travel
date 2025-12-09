<template>
  <section class="py-12">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center px-6 py-3 bg-linear-to-r from-emerald-50 to-amber-50 rounded-full border border-emerald-200 mb-4">
        <svg class="w-5 h-5 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="font-semibold text-emerald-700">Key Highlights</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        What Makes This Tour
        <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-amber-600">Special</span>
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Discover the unique experiences that set this Tanzania adventure apart
      </p>
    </div>

    <!-- Highlights Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(highlight, index) in highlights" 
        :key="index"
        class="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <!-- Background Pattern -->
        <div class="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <div class="w-16 h-16 bg-linear-to-br from-emerald-300 to-amber-300 rounded-full"></div>
        </div>

        <!-- Icon/Number -->
        <div class="mb-4">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white font-bold text-lg">
            {{ index + 1 }}
          </div>
        </div>

        <!-- Content -->
        <h3 class="text-lg font-bold text-gray-900 mb-3">{{ highlight }}</h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          Experience this unique aspect of your Tanzania adventure with our expert guides ensuring the best possible encounter.
        </p>

        <!-- Safari Decoration -->
        <div class="mt-6 pt-6 border-t border-gray-100">
          <div class="flex items-center text-xs text-gray-500">
            <svg class="w-4 h-4 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Included in your tour
          </div>
        </div>

        <!-- Hover Effect Line -->
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 to-amber-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!highlights.length" class="text-center py-16 bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-dashed border-gray-300">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">Discover the Adventure</h3>
      <p class="text-gray-600 max-w-md mx-auto mb-6">
        Highlights for this tour will be updated soon. Contact us for personalized highlights based on your interests.
      </p>
      <a 
        href="https://wa.me/255620285462?text=Hi%20ZafsTours,%20I%20want%20to%20know%20more%20about%20tour%20highlights"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        Ask About Highlights
      </a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  highlights: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
/* Smooth hover transitions */
.group {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>