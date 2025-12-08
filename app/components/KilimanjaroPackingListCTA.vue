<template>
  <!-- Full-width Kilimanjaro band with same background image -->
  <section class="relative isolate py-16 md:py-20 lg:py-24 overflow-hidden">
    <!-- Background image + overlays (same as SafariPackingList CTA) -->
    <div class="absolute inset-0 bg-gray-800">
      <!-- Shared safari background image -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('/images/background/safari4.png')` }"
      ></div>

      <!-- Slight dark overlay so text is readable -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- Cooler emerald vignette for Kilimanjaro -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.18)_0%,transparent_70%)]"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Main Container - Kilimanjaro color theme -->
      <div
        class="relative bg-linear-to-br from-slate-900/85 via-slate-900/90 to-slate-950/95 rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto border border-emerald-500/45 backdrop-blur-md"
      >
        <!-- Optional subtle mountain pattern -->
        <div class="pointer-events-none absolute inset-0 opacity-8">
          <div class="absolute top-0 left-0 right-0 h-32">
            <div class="absolute top-8 left-10 w-16 h-8 bg-white/70 rounded-t-full"></div>
            <div class="absolute top-4 left-1/3 w-24 h-12 bg-white/70 rounded-t-full"></div>
            <div class="absolute top-0 left-1/2 w-32 h-16 bg-white/80 rounded-t-full"></div>
            <div class="absolute top-6 right-1/4 w-20 h-10 bg-white/60 rounded-t-full"></div>
          </div>
        </div>

        <div class="relative flex flex-col lg:flex-row items-stretch z-10">
          <!-- LEFT: IMAGE SECTION (same style as Safari CTA, own badge) -->
          <div class="lg:w-2/5 p-6 md:p-8 lg:p-10">
            <div class="h-full">
              <div
                class="relative h-full min-h-60 md:min-h-[280px] lg:min-h-80 rounded-2xl overflow-hidden border border-emerald-500/60 shadow-xl bg-slate-900/70"
              >
                <!-- Same image as SafariPackingList -->
                <img
                  src="/images/features/kiliminjaropacking.png"
                  alt="Kilimanjaro and safari gear illustration"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />

                <!-- KILIMANJARO badge on top of image -->
                <div class="absolute top-4 left-4 z-10">
                  <div
                    class="bg-linear-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center gap-1.5"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      ></path>
                    </svg>
                    <span>KILIMANJARO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: CONTENT SECTION -->
          <div class="lg:w-3/5 p-6 md:p-8 lg:p-10">
            <div class="h-full flex flex-col justify-center">
              <!-- Title -->
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
                Get PDF Kilimanjaro Packing List
              </h2>

              <!-- Description -->
              <p class="text-slate-200 text-base md:text-lg lg:text-xl mb-6 lg:mb-8 leading-relaxed">
                Free Kilimanjaro packing list with all essential gear for your climb, plus practical tips
                from local mountain guides.
              </p>

              <!-- CTA Button -->
              <div class="mb-8 lg:mb-10">
                <a
                  :href="pdfLink"
                  download
                  class="group inline-flex items-center justify-center bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 md:px-10 py-3 md:py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 text-base md:text-lg w-full sm:w-auto"
                >
                  <svg
                    class="w-5 h-5 mr-2 md:mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <span>GET PDF</span>
                  <svg
                    class="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    ></path>
                  </svg>
                </a>

                <!-- Trust indicator -->
                <p class="mt-3 text-sm text-slate-300 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Instant download • Expert-curated • No sign-up required
                </p>
              </div>

              <!-- Key Features -->
              <div class="space-y-3 mb-6 lg:mb-8">
                <div class="flex items-start">
                  <div
                    class="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center mr-3 mt-0.5 shrink-0"
                  >
                    <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-slate-100 font-medium">Full gear list for all seasons</span>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center mr-3 mt-0.5 shrink-0"
                  >
                    <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-slate-100 font-medium">Clothing, boots & layering system</span>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center mr-3 mt-0.5 shrink-0"
                  >
                    <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-slate-100 font-medium"
                    >Printable checklist you can take on the mountain</span
                  >
                </div>
              </div>

              <!-- Footer note -->
              <div class="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-emerald-500/40">
                <p class="text-sm text-slate-300">
                  <span class="font-medium text-slate-100">Covers all major Kilimanjaro routes:</span>
                  <span class="ml-2 text-emerald-300"
                    >Lemosho, Machame, Marangu, Rongai, Northern Circuit and more.</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom accent -->
        <div class="h-1.5 bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-400"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const pdfLink = '/downloads/kilimanjaro-packing-list.pdf'
</script>

<style scoped>
.text-slate-100 {
  color: #f1f5f9;
}

.text-slate-200 {
  color: #e2e8f0;
}

.text-slate-300 {
  color: #cbd5e1;
}

.bg-slate-900 {
  background-color: #0f172a;
}

.from-slate-900 {
  --tw-gradient-from: #0f172a;
}

.via-blue-900 {
  --tw-gradient-via: #1e3a8a;
}

.to-slate-900 {
  --tw-gradient-to: #0f172a;
}

.from-emerald-500 {
  --tw-gradient-from: #10b981;
}

.to-emerald-600 {
  --tw-gradient-to: #059669;
}

.hover\:from-emerald-600:hover {
  --tw-gradient-from: #059669;
}

.hover\:to-emerald-700:hover {
  --tw-gradient-to: #047857;
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
}
</style>
