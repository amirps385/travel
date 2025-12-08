<template>
  <!-- Full-width safari background band -->
  <section class="relative isolate py-16 md:py-20 lg:py-24 overflow-hidden">
    <!-- Background image + lighter overlays -->
    <div class="absolute inset-0 bg-gray-800">
      <!-- Safari background image -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('/images/background/safari3.png')` }"
      ></div>

      <!-- Brighter overlay so image is visible -->
      <div class="absolute inset-0 bg-black/25"></div>

      <!-- Warm vignette -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.15)_0%,transparent_70%)]"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Main card -->
      <div
        class="bg-slate-900/75 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto border border-blue-800/40"
      >
        <div class="flex flex-col lg:flex-row items-stretch">
        <!-- LEFT: IMAGE SECTION (fills the card, badge on image) -->
<div class="lg:w-2/5 p-6 md:p-8 lg:p-10">
  <div class="h-full">
    <div
      class="relative h-full min-h-60 md:min-h-[280px] lg:min-h-80 rounded-2xl overflow-hidden border border-blue-700/40 shadow-xl bg-slate-900/60"
    >
      <!-- IMAGE fills the whole card -->
      <img
        src="/images/features/safaripacking.png"
        alt="Safari packing list illustration"
        class="w-full h-full object-cover"
        loading="lazy"
      />

      <!-- SAFARI badge ON the image -->
      <div class="absolute top-4 left-4 z-10">
        <div
          class="bg-linear-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
          <span>SAFARI</span>
        </div>
      </div>
    </div>
  </div>
</div>


          <!-- RIGHT: CONTENT -->
          <div class="lg:w-3/5 p-6 md:p-8 lg:p-10">
            <div class="h-full flex flex-col justify-center">
              <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
                Safari Packing List in PDF
              </h2>

              <p class="text-slate-200 text-lg lg:text-xl mb-8 leading-relaxed">
                A comprehensive checklist of must-have clothing, gear, documents and essentials
                for a smooth, comfortable safari across Tanzania’s iconic national parks.
              </p>

              <!-- CTA -->
              <div class="mb-10">
                <a
                  :href="pdfLink"
                  download
                  class="group inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                >
                  <svg
                    class="w-5 h-5 mr-3"
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
                  GET PDF
                </a>

                <p class="mt-3 text-sm text-slate-300">
                  ✔ Instant download &nbsp; • &nbsp; ✔ No signup needed &nbsp; • &nbsp; ✔ Expert-curated
                </p>
              </div>

              <!-- Key points -->
              <div class="space-y-3 mb-8">
                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center mr-3">
                    <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-slate-100">Clothing, accessories & footwear checklist</span>
                </div>

                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center mr-3">
                    <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-slate-100">Camera gear & electronics suggestions</span>
                </div>

                <div class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center mr-3">
                    <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span class="text-slate-100">Printable checklist — easy to tick off</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Bottom accent -->
        <div class="h-1.5 bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const pdfLink = '/downloads/safari-packing-list.pdf'
</script>
