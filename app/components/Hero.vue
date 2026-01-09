<!-- components/Hero.vue -->
<template>
  <section
    class="relative overflow-hidden text-white"
    aria-labelledby="hero-heading"
  >
    <!-- BACKGROUND LAYERS -->
    <div class="absolute inset-0">
      <!-- Safari background video -->
      <video
        class="absolute inset-0 w-full h-full object-cover"
        src="/videos/safari.mp4"
        autoplay
        muted
        loop
        playsinline
      ></video>

      <!-- Dark gradient overlay for readability (lighter so video is visible) -->
      <div
        class="absolute inset-0 bg-linear-to-b from-black/70 via-black/45 to-black/20"
      ></div>

      <!-- Soft color accents (sunset + greenery, reduced opacity) -->
      <div
        class="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light
               bg-[radial-gradient(circle_at_10%_20%,rgba(245,158,11,0.6),transparent_60%),
                  radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.5),transparent_55%)]"
      ></div>

      <!-- Subtle texture (very light so it doesn’t hide the video) -->
      <div
        class="absolute inset-0 opacity-8 mix-blend-soft-light
               bg-[radial-gradient(circle,rgba(15,23,42,0.55)_1px,transparent_0)]
               bg-size-[36px_36px]"
      ></div>
    </div>

    <!-- CONTENT -->
    <div class="relative max-w-7xl mx-auto px-4 lg:px-6 py-16 md:py-20 lg:py-24">
      <div
        class="grid gap-12 lg:gap-14 items-start
               lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        <!-- LEFT: TEXT + VALUE PROPS (merged content) -->
        <div class="space-y-8 max-w-2xl">
          <!-- Badge (old copy, new styling) -->
          <div
  class="inline-flex items-center gap-2 px-4 py-2 rounded-full
         bg-black/50 border border-amber-400/50 backdrop-blur-sm"
>
  <span class="inline-flex h-2 w-2 rounded-full bg-amber-300 animate-pulse"></span>

  <span class="text-xs font-semibold tracking-wide uppercase text-amber-100">
    Tailor-Made Tanzania Safaris
  </span>

  <span class="h-4 w-px bg-amber-300/50"></span>

  <span class="text-xs text-emerald-100">
    Serengeti · Ngorongoro · Kilimanjaro · Zanzibar
  </span>
</div>


          <!-- Heading (old wording, safari style) -->
          <header>
            <p
              class="text-sm md:text-base font-semibold tracking-[0.22em] uppercase
                     text-amber-200/90 mb-3"
            >
              Zafs Tours · Local Tanzanian Experts
            </p>
            <h1
              id="hero-heading"
              class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight"
            >
              <span class="block text-white">
                Tailor-Made
              </span>
              <span
                class="block text-transparent bg-clip-text
                       bg-linear-to-r from-amber-300 via-yellow-300 to-emerald-200"
              >
                Tanzania Safaris &amp; Kilimanjaro Treks
              </span>
            </h1>
          </header>

          <!-- Subheadline -->
          <p class="text-base md:text-lg text-amber-50/95 leading-relaxed max-w-xl">
            Custom itineraries designed by local experts in Tanzania. Experience the wild beauty of
            Africa with personalised adventures that match your dreams — from safari plains to
            Zanzibar beaches.
          </p>

          <!-- Key Selling Points -->
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center
                       rounded-full bg-emerald-500/20 border border-emerald-300/60"
              >
                <svg
                  class="h-3.5 w-3.5 text-emerald-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.5-3.5A1 1 0 016.207 9.293L8.75 11.836l6.543-6.543a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <p class="text-sm md:text-base text-amber-50/95">
                Private &amp; group safaris across Tanzania’s best national parks.
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center
                       rounded-full bg-emerald-500/20 border border-emerald-300/60"
              >
                <svg
                  class="h-3.5 w-3.5 text-emerald-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.5-3.5A1 1 0 016.207 9.293L8.75 11.836l6.543-6.543a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <p class="text-sm md:text-base text-amber-50/95">
                Expert local guides &amp; safe, well-maintained safari vehicles.
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center
                       rounded-full bg-emerald-500/20 border border-emerald-300/60"
              >
                <svg
                  class="h-3.5 w-3.5 text-emerald-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.5-3.5A1 1 0 016.207 9.293L8.75 11.836l6.543-6.543a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <p class="text-sm md:text-base text-amber-50/95">
                Flexible itineraries for couples, families, and small groups.
              </p>
            </li>

            <li class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center
                       rounded-full bg-emerald-500/20 border border-emerald-300/60"
              >
                <svg
                  class="h-3.5 w-3.5 text-emerald-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.5-3.5A1 1 0 016.207 9.293L8.75 11.836l6.543-6.543a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <p class="text-sm md:text-base text-amber-50/95">
                Zanzibar beach holidays &amp; cultural experiences included.
              </p>
            </li>
          </ul>

          <!-- Trust Strip -->
          <div
            class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10"
          >
            <div
              class="flex flex-col items-center text-center p-3
                     bg-black/40 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <div class="text-2xl font-bold text-amber-300">10+</div>
              <div class="text-sm font-semibold text-amber-50/95">
                Years Experience
              </div>
              <div class="text-xs text-amber-100/80 mt-1">Since 2012</div>
            </div>
            <div
              class="flex flex-col items-center text-center p-3
                     bg-black/40 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <div class="flex items-center gap-1">
                <svg
                  class="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="text-xl font-bold text-amber-50">4.9/5</span>
              </div>
              <div class="text-sm font-semibold text-amber-50/95">
                Rated by Travellers
              </div>
              <div class="text-xs text-amber-100/80 mt-1">500+ reviews</div>
            </div>
            <div
              class="flex flex-col items-center text-center p-3
                     bg-black/40 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <div class="text-2xl font-bold text-emerald-200">100%</div>
              <div class="text-sm font-semibold text-amber-50/95">
                Licensed Operator
              </div>
              <div class="text-xs text-amber-100/80 mt-1">
                TATO &amp; TTB Certified
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              @click="scrollToTours"
              class="inline-flex items-center gap-2 px-6 py-3
                     rounded-full bg-amber-400 text-slate-900 text-sm md:text-base font-semibold
                     shadow-lg shadow-amber-900/40 hover:bg-amber-300 hover:-translate-y-0.5
                     transition-all"
            >
              <span>View Safari Packages</span>
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-full
                     border border-amber-100/70 bg-black/40 px-5 py-2.5 text-sm md:text-base
                     font-medium text-amber-50 hover:bg-black/60 hover:-translate-y-0.5
                     transition-all"
            >
              Talk to a safari expert
              <span class="inline-flex h-2 w-2 rounded-full bg-emerald-300"></span>
            </button>
          </div>

          <!-- Testimonial -->
          <div
            class="mt-5 inline-flex items-start gap-3 rounded-xl bg-black/45 px-4 py-3
                   border border-amber-300/50 backdrop-blur-sm max-w-md"
          >
            <div
              class="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full
                     bg-linear-to-br from-amber-300 to-amber-500 text-slate-900
                     font-bold text-sm"
            >
              JM
            </div>
            <div>
              <p class="text-xs md:text-sm text-amber-50/95 italic">
                "ZafsTours created our perfect family safari. Every detail was
                expertly handled!"
              </p>
              <p
                class="mt-1 text-[11px] uppercase tracking-wide text-amber-200/80 font-semibold"
              >
                — James M., Family Safari to Serengeti
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT: LEAD FORM CARD (SLOT) -->
        <div class="lg:pl-4">
          <div
            class="bg-white/95 text-slate-900 rounded-2xl shadow-2xl overflow-hidden
                   border border-amber-100/80 backdrop-blur"
          >
            <!-- Card Header -->
            <div class="bg-linear-to-r from-emerald-700 to-emerald-600 p-6 text-center">
              <h3 class="text-2xl md:text-3xl font-extrabold text-white drop-shadow-sm">
                Start planning your Tanzania safari
              </h3>
              <p class="mt-2 text-sm md:text-base text-emerald-50/95 font-medium">
                Share your travel dates &amp; wishes — we’ll send a custom safari
                plan within 24 hours.
              </p>

              <!-- Trust badges -->
              <div
                class="flex flex-wrap items-center justify-center gap-4 mt-4
                       text-[13px] md:text-sm text-emerald-50"
              >
                <div class="flex items-center gap-1">
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="font-semibold">4.9/5</span>
                  <span class="ml-1">Traveller rating</span>
                </div>

                <span class="hidden sm:inline-block h-4 w-px bg-emerald-300/70"></span>

                <div class="flex items-center gap-1">
                  <svg
                    class="w-4 h-4 text-emerald-50"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a6 6 0 00-6 6v2.586l-.707.707A1 1 0 004 13h12a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6zm-2 15a2 2 0 104 0H8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="font-semibold">Local office</span>
                  <span class="ml-1">in Tanzania</span>
                </div>
              </div>
            </div>

            <!-- Form Slot -->
            <div class="p-5 md:p-6">
              <slot name="leadForm" />
            </div>
          </div>

          <!-- Small reassurance text under form -->
          <p class="mt-4 text-xs md:text-[13px] text-amber-50/90 leading-relaxed">
            No spam, no pressure. Just friendly safari planning from a local
            Tanzanian team who loves showing guests our home.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

  // In Hero.vue's script setup
import { onMounted } from 'vue'

onMounted(() => {
  // Clear any old hero form data when homepage loads
  // This ensures fresh start every time user visits homepage
  if (typeof window !== 'undefined') {
    console.log('Homepage loaded - clearing old hero form data from storage')
    
    // Clear old hero data but NOT journeyForm (preserves user progress if they go back)
    localStorage.removeItem('heroLeadData')
    localStorage.removeItem('heroQuickLeadData')
    localStorage.removeItem('prefilledAdults')
    localStorage.removeItem('prefilledChildren')
    localStorage.removeItem('prefilledArrivalDate')
    
    sessionStorage.removeItem('heroLeadData')
    sessionStorage.removeItem('heroQuickLeadData')
    sessionStorage.removeItem('prefilledAdults')
    sessionStorage.removeItem('prefilledChildren')
    sessionStorage.removeItem('prefilledArrivalDate')
  }
})
// scroll to tours section when primary button is clicked
const scrollToTours = () => {
  const toursSection = document.querySelector('#tours')
  if (toursSection) {
    toursSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Optional fine-tuning here */
</style>
