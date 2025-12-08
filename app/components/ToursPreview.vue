<!-- components/ToursPreview.vue -->
<template>
  <section
    id="tours"
    class="relative py-20 lg:py-28 bg-linear-to-b from-slate-50 via-white to-amber-50/30 overflow-hidden"
  >
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl"></div>

    <!-- Savannah pattern overlay -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-1/4 left-1/4 w-64 h-64">
        <div class="w-12 h-6 bg-amber-300/20 rounded-full absolute top-8 left-8"></div>
        <div class="w-8 h-4 bg-amber-400/20 rounded-full absolute top-12 right-12"></div>
        <div class="w-16 h-8 bg-emerald-300/20 rounded-full absolute bottom-8 left-12"></div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
      <!-- Section Header with safari styling -->
      <div class="text-center mb-16 lg:mb-20">
        <!-- Safari badge -->
        <div
          class="inline-flex items-center px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 rounded-full text-white font-bold mb-6 shadow-lg transform -rotate-1"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          HANDCRAFTED SAFARI EXPERIENCES
        </div>

        <!-- Main heading with safari typography -->
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          <span class="text-amber-700">Discover</span>
          <span class="text-emerald-700 ml-2">Authentic</span>
          <span class="block mt-2 text-gray-800">Tanzania Adventures</span>
        </h2>

        <p class="text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed">
          From thrilling wildlife safaris and Kilimanjaro summit climbs to relaxing Zanzibar beaches –
          experience Tanzania with local experts who know the land.
        </p>
      </div>

      <!-- Tanzania Safaris Section -->
      <div class="mb-20 lg:mb-24 relative">
        <!-- Section header with animal icon -->
        <div class="flex items-center mb-10 lg:mb-12">
          <div
            class="flex items-center bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100 shadow-sm"
          >
            <div
              class="w-10 h-10 mr-4 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl lg:text-3xl font-bold text-gray-900">Wildlife Safaris</h3>
              <p class="text-emerald-600 font-medium text-sm">
                Serengeti • Ngorongoro • Tarangire
              </p>
            </div>
          </div>

          <div class="ml-auto">
            <NuxtLink
              to="/tours/safaris"
              class="group inline-flex items-center text-emerald-700 hover:text-emerald-900 font-bold text-lg"
            >
              Explore all safaris
              <svg
                class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
            </NuxtLink>
          </div>
        </div>

        <!-- Safari tours grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="tour in safariTours"
            :key="tour.id"
            class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
          >
            <!-- Animal silhouette decoration -->
            <div
              class="absolute -top-6 -right-6 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
                <path
                  d="M50,20 C60,15 75,20 80,35 C85,50 70,65 50,80 C30,65 15,50 20,35 C25,20 40,15 50,20 Z"
                />
              </svg>
            </div>

            <!-- Card header with image and overlay -->
            <div class="h-56 relative overflow-hidden">
              <!-- Background image -->
              <div
                class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                :style="{ backgroundImage: `url(${tour.image})` }"
              >
                <!-- Gradient overlay -->
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"
                ></div>

                <!-- Acacia tree silhouette -->
                <div class="absolute bottom-0 left-0 right-0 h-20">
                  <div class="absolute bottom-0 left-1/4 w-2 h-16 bg-gray-800"></div>
                  <div
                    class="absolute bottom-12 left-1/4 -ml-8 w-16 h-6 bg-gray-900 rounded-full"
                  ></div>
                </div>
              </div>

              <!-- Duration badge -->
              <div class="absolute top-4 left-4">
                <span
                  class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-emerald-800 border border-emerald-200 shadow-sm"
                >
                  <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  {{ tour.duration }}
                </span>
              </div>

              <!-- Popular badge -->
              <div class="absolute top-4 right-4 transform rotate-3">
                <span
                  class="px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-full shadow-lg"
                >
                  {{ tour.badge }}
                </span>
              </div>

              <!-- Park/Reserve tag -->
              <div class="absolute bottom-4 left-4">
                <span
                  class="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded"
                >
                  {{ tour.park }}
                </span>
              </div>
            </div>

            <!-- Card content -->
            <div class="p-6 relative">
              <!-- Title with icon -->
              <div class="flex items-start mb-4">
                <div class="mr-4 mt-1">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h4
                  class="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors flex-1"
                >
                  {{ tour.title }}
                </h4>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-5 leading-relaxed">
                {{ tour.description }}
              </p>

              <!-- Highlights -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 font-medium mb-2">HIGHLIGHTS</div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(highlight, idx) in tour.highlights"
                    :key="idx"
                    class="flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg"
                  >
                    <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ highlight }}
                  </div>
                </div>
              </div>

              <!-- Price and CTA -->
              <div class="flex items-center justify-between pt-5 border-t border-gray-100">
                <div>
                  <div class="text-xs text-gray-500 font-medium">STARTING FROM</div>
                  <div class="text-2xl font-bold text-emerald-700">{{ tour.price }}</div>
                  <div class="text-xs text-gray-500 mt-1">per person</div>
                </div>
                <NuxtLink
                  :to="tour.link"
                  class="group/btn px-5 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center"
                >
                  <span>View Itinerary</span>
                  <svg
                    class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
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
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Kilimanjaro Routes Section -->
      <div class="mb-20 lg:mb-24 relative">
        <!-- Mountain-themed header -->
        <div class="flex items-center mb-10 lg:mb-12">
          <div
            class="flex items-center bg-slate-50 px-6 py-3 rounded-full border border-slate-100 shadow-sm"
          >
            <div
              class="w-10 h-10 mr-4 bg-linear-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl lg:text-3xl font-bold text-gray-900">Kilimanjaro Expeditions</h3>
              <p class="text-slate-600 font-medium text-sm">
                5,895m Summit • Expert Guides • High Success Rate
              </p>
            </div>
          </div>

          <div class="ml-auto">
            <NuxtLink
              to="/tours/kilimanjaro"
              class="group inline-flex items-center text-slate-700 hover:text-slate-900 font-bold text-lg"
            >
              All Kilimanjaro routes
              <svg
                class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
            </NuxtLink>
          </div>
        </div>

        <!-- Kilimanjaro tours grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="tour in kilimanjaroTours"
            :key="tour.id"
            class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
          >
            <!-- Card header with mountain image -->
            <div class="h-56 relative overflow-hidden">
              <!-- Background image -->
              <div
                class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                :style="{ backgroundImage: `url(${tour.image})` }"
              >
                <!-- Gradient overlay -->
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"
                ></div>

                <!-- Mountain peak overlay -->
                <div class="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white/10 to-transparent"></div>
              </div>

              <!-- Altitude badge -->
              <div class="absolute top-4 left-4">
                <span
                  class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-slate-800 border border-slate-200 shadow-sm"
                >
                  <span class="inline-block w-2 h-2 rounded-full bg-sky-500 mr-2"></span>
                  {{ tour.altitude }}
                </span>
              </div>

              <!-- Difficulty badge -->
              <div class="absolute top-4 right-4 transform -rotate-3">
                <span
                  :class="[
                    'px-4 py-2 text-white text-sm font-bold rounded-full shadow-lg',
                    tour.difficulty === 'Challenging'
                      ? 'bg-amber-500'
                      : tour.difficulty === 'Moderate'
                      ? 'bg-emerald-500'
                      : 'bg-blue-500'
                  ]"
                >
                  {{ tour.difficulty }}
                </span>
              </div>

              <!-- Summit success -->
              <div class="absolute bottom-4 left-4">
                <span
                  class="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded flex items-center"
                >
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ tour.successRate }} Success
                </span>
              </div>
            </div>

            <!-- Card content -->
            <div class="p-6 relative">
              <!-- Title with mountain icon -->
              <div class="flex items-start mb-4">
                <div class="mr-4 mt-1">
                  <div
                    class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                </div>
                <h4
                  class="text-xl font-bold text-gray-900 group-hover:text-slate-700 transition-colors flex-1"
                >
                  {{ tour.title }}
                </h4>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-5 leading-relaxed">
                {{ tour.description }}
              </p>

              <!-- Features -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 font-medium mb-2">INCLUDES</div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(feature, idx) in tour.features"
                    :key="idx"
                    class="flex items-center px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-medium rounded-lg"
                  >
                    <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ feature }}
                  </div>
                </div>
              </div>

              <!-- Price and CTA -->
              <div class="flex items-center justify-between pt-5 border-t border-gray-100">
                <div>
                  <div class="text-xs text-gray-500 font-medium">STARTING FROM</div>
                  <div class="text-2xl font-bold text-slate-700">{{ tour.price }}</div>
                  <div class="text-xs text-gray-500 mt-1">all inclusive</div>
                </div>
                <NuxtLink
                  :to="tour.link"
                  class="group/btn px-5 py-2.5 bg-linear-to-r from-slate-600 to-slate-800 text-white font-bold rounded-xl hover:from-slate-700 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center"
                >
                  <span>View Route</span>
                  <svg
                    class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
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
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Zanzibar Holidays Section -->
      <div class="mb-20 lg:mb-24 relative">
        <!-- Beach-themed header -->
        <div class="flex items-center mb-10 lg:mb-12">
          <div
            class="flex items-center bg-sky-50 px-6 py-3 rounded-full border border-sky-100 shadow-sm"
          >
            <div
              class="w-10 h-10 mr-4 bg-linear-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl lg:text-3xl font-bold text-gray-900">Zanzibar Escapes</h3>
              <p class="text-sky-600 font-medium text-sm">
                White sand beaches • Turquoise waters • Rich culture
              </p>
            </div>
          </div>

          <div class="ml-auto">
            <NuxtLink
              to="/tours/zanzibar"
              class="group inline-flex items-center text-sky-700 hover:text-sky-900 font-bold text-lg"
            >
              All Zanzibar trips
              <svg
                class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
            </NuxtLink>
          </div>
        </div>

        <!-- Zanzibar tours grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="tour in zanzibarTours"
            :key="tour.id"
            class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
          >
            <!-- Card header with beach image -->
            <div class="h-56 relative overflow-hidden">
              <!-- Background image -->
              <div
                class="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                :style="{ backgroundImage: `url(${tour.image})` }"
              >
                <!-- Gradient overlay -->
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent"
                ></div>

                <!-- Wave pattern overlay -->
                <div class="absolute bottom-0 left-0 right-0 h-16">
                  <div class="absolute bottom-0 left-0 right-0 h-4 bg-sky-400/30"></div>
                  <div class="absolute bottom-4 left-0 right-0 h-3 bg-sky-300/20"></div>
                </div>
              </div>

              <!-- Best for badge -->
              <div class="absolute top-4 left-4">
                <span
                  class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-sky-800 border border-sky-200 shadow-sm"
                >
                  <span class="inline-block w-2 h-2 rounded-full bg-sky-500 mr-2"></span>
                  {{ tour.bestFor }}
                </span>
              </div>

              <!-- Type badge -->
              <div class="absolute top-4 right-4">
                <span
                  class="px-4 py-2 bg-linear-to-r from-sky-500 to-blue-600 text-white text-sm font-bold rounded-full shadow-lg transform rotate-2"
                >
                  {{ tour.type }}
                </span>
              </div>

              <!-- Beach location -->
              <div class="absolute bottom-4 left-4">
                <span
                  class="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded"
                >
                  {{ tour.beach }}
                </span>
              </div>
            </div>

            <!-- Card content -->
            <div class="p-6 relative">
              <!-- Title with palm icon -->
              <div class="flex items-start mb-4">
                <div class="mr-4 mt-1">
                  <div
                    class="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-sky-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h4
                  class="text-xl font-bold text-gray-900 group-hover:text-sky-700 transition-colors flex-1"
                >
                  {{ tour.title }}
                </h4>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-5 leading-relaxed">
                {{ tour.description }}
              </p>

              <!-- Activities -->
              <div class="mb-6">
                <div class="text-xs text-gray-500 font-medium mb-2">ACTIVITIES</div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(activity, idx) in tour.activities"
                    :key="idx"
                    class="flex items-center px-3 py-1.5 bg-sky-50 text-sky-700 text-xs font-medium rounded-lg"
                  >
                    <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ activity }}
                  </div>
                </div>
              </div>

              <!-- Price and CTA -->
              <div class="flex items-center justify-between pt-5 border-t border-gray-100">
                <div>
                  <div class="text-xs text-gray-500 font-medium">STARTING FROM</div>
                  <div class="text-2xl font-bold text-sky-700">{{ tour.price }}</div>
                  <div class="text-xs text-gray-500 mt-1">includes transfers</div>
                </div>
                <NuxtLink
                  :to="tour.link"
                  class="group/btn px-5 py-2.5 bg-linear-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center"
                >
                  <span>View Details</span>
                  <svg
                    class="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
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
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- CTA Section with your trust badges text -->
      <div class="text-center relative">
        <div
          class="bg-linear-to-r from-emerald-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-xl border border-amber-100"
        >
          <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to experience <span class="text-emerald-700">Tanzania?</span>
          </h3>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Let our local experts create your perfect itinerary – from wild safaris to beach
            relaxation.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <NuxtLink
              to="/journey"
              class="group inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Plan my trip
              <svg
                class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
            </NuxtLink>

            <NuxtLink
              to="/tours"
              class="group inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-600 hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Browse all tours
            </NuxtLink>
          </div>

          <!-- Your 3 trust badges / lines -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div
              class="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div
                class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3"
              >
                <svg class="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="font-bold text-gray-900">Best price, local operator</div>
              <div class="text-sm text-gray-600 mt-1">No middleman markups</div>
            </div>

            <div
              class="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div
                class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3"
              >
                <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="font-bold text-gray-900">24/7 on-trip support</div>
              <div class="text-sm text-gray-600 mt-1">Local team in Tanzania</div>
            </div>

            <div
              class="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div
                class="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-3"
              >
                <svg class="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="font-bold text-gray-900">Flexible & customisable</div>
              <div class="text-sm text-gray-600 mt-1">Adjust dates & lodges easily</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Tanzania Safaris – using your local images but richer data
const safariTours = [
  {
    id: 1,
    title: 'Great Migration Safari',
    description:
      "Witness millions of wildebeest and zebra crossing the Serengeti plains during this spectacular natural event.",
    duration: '7 Days / 6 Nights',
    badge: 'POPULAR',
    park: 'Serengeti National Park',
    highlights: ['River Crossings', 'Predator Action', 'Hot Air Balloon'],
    price: 'From $2,300',
    link: '/tours/serengeti-migration',
    image: '/images/tour1.png'
  },
  {
    id: 2,
    title: 'Northern Circuit Safari',
    description:
      "Explore Tanzania's most famous parks including Ngorongoro Crater, Tarangire, and Lake Manyara.",
    duration: '8 Days / 7 Nights',
    badge: 'BEST VALUE',
    park: 'Ngorongoro Conservation',
    highlights: ['Big Five', 'Crater Safari', 'Cultural Village'],
    price: 'From $2,800',
    link: '/tours/northern-circuit',
    image: '/images/tour1.png'
  },
  {
    id: 3,
    title: 'Family Safari Adventure',
    description:
      'Perfect for families with children. Kid-friendly lodges, shorter drives, and educational activities.',
    duration: '6 Days / 5 Nights',
    badge: 'FAMILY',
    park: 'Tarangire National Park',
    highlights: ['Child Guides', 'Swimming Pools', 'Nature Walks'],
    price: 'From $1,950',
    link: '/tours/family-safari',
    image: '/images/tour1.png'
  }
]

// Kilimanjaro Routes – your local mountain image
const kilimanjaroTours = [
  {
    id: 4,
    title: 'Lemosho Route',
    description:
      'Most scenic route with excellent acclimatization. Best success rate for reaching Uhuru Peak.',
    duration: '8 Days / 7 Nights',
    altitude: '5,895m Summit',
    difficulty: 'Moderate',
    successRate: '95%',
    features: ['Private Toilet', 'Hot Meals', 'Pole Pole Pace'],
    price: 'From $2,100',
    link: '/tours/lemosho-8d',
    image: '/images/tour2.png'
  },
  {
    id: 5,
    title: 'Machame Route',
    description:
      'Popular "Whiskey" route known for beautiful scenery and challenging climbs.',
    duration: '7 Days / 6 Nights',
    altitude: '5,895m Summit',
    difficulty: 'Challenging',
    successRate: '90%',
    features: ['Scenic Views', 'Small Groups', 'Experienced Guides'],
    price: 'From $1,850',
    link: '/tours/machame-7d',
    image: '/images/tour2.png'
  },
  {
    id: 6,
    title: 'Marangu Route',
    description:
      'The "Coca-Cola" route with hut accommodation. Perfect for first-time high-altitude trekkers.',
    duration: '6 Days / 5 Nights',
    altitude: '5,895m Summit',
    difficulty: 'Beginner',
    successRate: '85%',
    features: ['Mountain Huts', 'Gentle Slopes', 'All Inclusive'],
    price: 'From $1,650',
    link: '/tours/marangu-6d',
    image: '/images/tour2.png'
  }
]

// Zanzibar Holidays – your local beach image
const zanzibarTours = [
  {
    id: 7,
    title: 'Zanzibar Beach Paradise',
    description:
      'Relax on pristine white sand beaches with turquoise waters. Perfect for honeymooners and couples.',
    duration: '5 Days / 4 Nights',
    bestFor: 'Honeymoon',
    type: 'BEACH ESCAPE',
    beach: 'Nungwi Beach',
    activities: ['Snorkeling', 'Spa', 'Dolphin Tour'],
    price: 'From $850',
    link: '/tours/zanzibar-beach',
    image: '/images/tour3.png'
  },
  {
    id: 8,
    title: 'Stone Town Cultural Tour',
    description:
      'Explore the UNESCO heritage site of Stone Town, spice plantations, and authentic Swahili culture.',
    duration: '4 Days / 3 Nights',
    bestFor: 'Culture',
    type: 'CULTURAL',
    beach: 'Stone Town',
    activities: ['Spice Tour', 'Local Cuisine', 'Historical Sites'],
    price: 'From $650',
    link: '/tours/stone-town',
    image: '/images/tour3.png'
  },
  {
    id: 9,
    title: 'Safari & Beach Combo',
    description:
      'Combine the thrill of wildlife safari with beach relaxation – the ultimate Tanzania experience.',
    duration: '10 Days / 9 Nights',
    bestFor: 'Adventure',
    type: 'COMBO DEAL',
    beach: 'Kendwa Beach',
    activities: ['Safari + Beach', 'All Transfers', 'Luxury Lodges'],
    price: 'From $3,200',
    link: '/tours/safari-beach-combo',
    image: '/images/tour3.png'
  }
]
</script>

<style scoped>
/* Custom animations */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
}

/* Extra decorative helpers (if reused anywhere) */
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}
</style>
