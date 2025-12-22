<template>
  <div class="min-h-screen bg-white">
    <div v-if="loading" class="min-h-[50vh] flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin mb-4 border-4 border-amber-500 border-t-transparent rounded-full w-12 h-12 mx-auto"></div>
        <div class="text-gray-600">Loading experience…</div>
      </div>
    </div>

    <div v-else-if="errorMsg" class="min-h-[50vh] flex items-center justify-center">
      <div class="max-w-xl text-center p-8">
        <h2 class="text-2xl font-bold mb-2">Experience not found</h2>
        <p class="text-gray-600 mb-4">{{ errorMsg }}</p>
        <NuxtLink to="/zanzibar" class="inline-block rounded-lg bg-amber-500 px-4 py-2 text-white">Back to experiences</NuxtLink>
      </div>
    </div>

    <div v-else>
      <!-- 1) HERO SECTION -->
      <section class="relative h-[85vh] w-full overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img
            :src="experience.heroImage || placeholder"
            :alt="experience.title || 'Experience hero'"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent"></div>
        </div>

        <div class="relative z-10 flex h-full flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <div class="mx-auto w-full max-w-7xl">
            <div class="mb-4">
              <span class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg">
                {{ experience.type || '—' }}
              </span>
            </div>

            <h1 class="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {{ experience.title || '—' }}
            </h1>

            <p class="mb-8 max-w-3xl text-xl font-medium text-gray-100">
              {{ experience.tagline || '' }}
            </p>

            <!-- Quick Facts Strip -->
            <div class="mb-10 flex flex-wrap gap-3">
              <div class="flex items-center rounded-xl bg-white px-4 py-3 text-gray-900 shadow-lg">
                <span class="mr-3 text-xl">📍</span>
                <div>
                  <div class="text-xs text-gray-500">Region</div>
                  <div class="font-bold">{{ experience.region || '—' }}</div>
                </div>
              </div>
              <div class="flex items-center rounded-xl bg-white px-4 py-3 text-gray-900 shadow-lg">
                <span class="mr-3 text-xl">⏱️</span>
                <div>
                  <div class="text-xs text-gray-500">Duration</div>
                  <div class="font-bold">{{ experience.durationLabel || '—' }}</div>
                </div>
              </div>
              <div class="flex items-center rounded-xl bg-white px-4 py-3 text-gray-900 shadow-lg">
                <span class="mr-3 text-xl">⭐</span>
                <div>
                  <div class="text-xs text-gray-500">Best For</div>
                  <div class="font-bold">{{ experience.highlights?.[0] || '—' }}</div>
                </div>
              </div>
              <div v-if="experience.priceFrom" class="flex items-center rounded-xl bg-amber-500 px-4 py-3 text-white shadow-lg">
                <span class="mr-3 text-xl">💵</span>
                <div>
                  <div class="text-xs text-amber-100">Starting From</div>
                  <div class="font-bold">${{ experience.priceFrom }}</div>
                </div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col gap-4 sm:flex-row">
              <button class="rounded-xl bg-amber-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-amber-600 hover:shadow-xl active:scale-95">
                Inquire Now
              </button>
              <button class="rounded-xl border-2 border-white bg-white/5 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-white/15 hover:shadow-xl active:scale-95">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 2) OVERVIEW -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-900 lg:text-4xl">
              Experience Overview
            </h2>
            <div class="mt-2 h-1 w-20 bg-amber-500 rounded-full"></div>
          </div>

          <div class="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              {{ experience.description }}
            </p>
          </div>

          <div class="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
            <h3 class="mb-6 text-2xl font-bold text-gray-900">Key Highlights</h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="(highlight, index) in experience.highlights || []" :key="`hl-${index}`" class="flex items-start">
                <div class="mr-4 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500">
                  <span class="text-sm font-bold text-white">✓</span>
                </div>
                <span class="text-gray-800">{{ highlight }}</span>
              </div>
              <div v-if="!(experience.highlights && experience.highlights.length)" class="text-gray-500">No highlights provided.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3) EXPERIENCE DETAILS -->
      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              Experience Details
            </h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Everything you need to know about this Zanzibar adventure</p>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div class="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
              <div class="mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <span class="text-2xl">🎯</span>
              </div>
              <h3 class="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Type</h3>
              <p class="text-xl font-bold text-gray-900">{{ experience.type || '—' }}</p>
            </div>

            <div class="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
              <div class="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <span class="text-2xl">📍</span>
              </div>
              <h3 class="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Region</h3>
              <p class="text-xl font-bold text-gray-900">{{ experience.region || '—' }}</p>
            </div>

            <div class="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
              <div class="mb-4 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                <span class="text-2xl">⏱️</span>
              </div>
              <h3 class="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Duration</h3>
              <p class="text-xl font-bold text-gray-900">{{ experience.durationLabel || '—' }}</p>
            </div>

            <div class="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
              <div class="mb-4 h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                <span class="text-2xl">💵</span>
              </div>
              <h3 class="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Starting Price</h3>
              <p v-if="experience.priceFrom" class="text-xl font-bold text-amber-600">${{ experience.priceFrom }}</p>
              <p v-else class="text-xl font-bold text-gray-900">Price on request</p>
            </div>

            <div class="rounded-2xl bg-white p-6 text-center shadow-lg border border-gray-100">
              <div class="mb-4 h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center mx-auto">
                <span class="text-2xl">🌤️</span>
              </div>
              <h3 class="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Best Time</h3>
              <p class="text-xl font-bold text-gray-900">Year-round</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4) ITINERARY / WHAT YOU'LL DO -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div class="mb-10">
            <h2 class="text-3xl font-bold text-gray-900 lg:text-4xl">
              What You'll Do
            </h2>
            <div class="mt-2 h-1 w-20 bg-amber-500 rounded-full"></div>
          </div>

          <div class="space-y-6">
            <div v-for="(step, index) in experience.itinerary || []" :key="`step-${index}`"
              class="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div class="flex items-start">
                <div class="mr-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-2xl font-bold text-white">
                  {{ index + 1 }}
                </div>
                <div class="flex-1">
                  <h3 class="mb-4 text-2xl font-bold text-gray-900">{{ step.title }}</h3>
                  <p class="mb-6 text-gray-700 text-lg leading-relaxed">{{ step.description }}</p>
                  <div v-if="step.image" class="overflow-hidden rounded-xl">
                    <img
                      :src="step.image"
                      :alt="step.title"
                      class="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!(experience.itinerary && experience.itinerary.length)" class="text-gray-500">
              No itinerary provided.
            </div>
          </div>
        </div>
      </section>

      <!-- 5) WHAT'S INCLUDED / NOT INCLUDED -->
      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              What's Included & Excluded
            </h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Clear breakdown of what's covered in your experience</p>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Included -->
            <div class="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <div class="mb-8 flex items-center">
                <div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                  <span class="text-2xl font-bold text-white">✓</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">Included</h3>
                  <p class="text-green-600">All these are covered in your price</p>
                </div>
              </div>

              <div class="space-y-4">
                <div v-for="(item, index) in experience.included || []" :key="`inc-${index}`" class="flex items-start">
                  <div class="mr-4 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <span class="text-green-600 font-bold">✓</span>
                  </div>
                  <span class="text-gray-800 text-lg">{{ item }}</span>
                </div>

                <div v-if="!(experience.included && experience.included.length)" class="text-gray-500">No included items listed.</div>
              </div>
            </div>

            <!-- Not Included -->
            <div class="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
              <div class="mb-8 flex items-center">
                <div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
                  <span class="text-2xl font-bold text-white">✗</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">Not Included</h3>
                  <p class="text-red-600">These are additional costs</p>
                </div>
              </div>

              <div class="space-y-4">
                <div v-for="(item, index) in experience.excluded || []" :key="`ex-${index}`" class="flex items-start">
                  <div class="mr-4 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <span class="text-red-500 font-bold">✗</span>
                  </div>
                  <span class="text-gray-800 text-lg">{{ item }}</span>
                </div>

                <div v-if="!(experience.excluded && experience.excluded.length)" class="text-gray-500">No excluded items listed.</div>
              </div>

              <div class="mt-8 rounded-xl bg-amber-50 p-5 border border-amber-200">
                <div class="flex">
                  <span class="mr-3 text-2xl">💡</span>
                  <div>
                    <h4 class="font-bold text-amber-900 mb-1">Important Note</h4>
                    <p class="text-amber-800">
                      Travel insurance is highly recommended for all our experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6) IMAGE GALLERY -->
      <section class="py-16 bg-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mb-10">
            <h2 class="text-3xl font-bold text-gray-900 lg:text-4xl">
              Photo Gallery
            </h2>
            <div class="mt-2 h-1 w-20 bg-amber-500 rounded-full"></div>
          </div>

          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="(image, index) in experience.gallery || []" :key="`g-${index}`"
              class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                :src="image"
                :alt="`${experience.title || 'Image'} - ${index + 1}`"
                class="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div v-if="!(experience.gallery && experience.gallery.length)" class="text-gray-500">No gallery images available.</div>
          </div>

          <div class="mt-8 text-center">
            <button class="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition-all duration-300 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700">
              View All Photos
            </button>
          </div>
        </div>
      </section>

      <!-- 7) FAQ SECTION -->
      <section class="py-16 bg-gray-50">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p class="text-gray-600">Common questions about this experience</p>
          </div>

          <div class="space-y-4">
            <div
              v-for="(faq, index) in experience.faqs || []"
              :key="`faq-${index}`"
              class="rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                @click="toggleFaq(index)"
                class="flex w-full items-center justify-between p-6 text-left"
                :aria-expanded="!!faq.open"
                :aria-controls="`faq-${index}`"
              >
                <h3 class="text-lg font-bold text-gray-900">{{ faq.question }}</h3>
                <span :class="[
                  'ml-4 text-2xl transition-transform duration-300',
                  faq.open ? 'text-amber-600 rotate-180' : 'text-gray-400'
                ]">
                  ▼
                </span>
              </button>

              <div
                v-if="faq.open"
                :id="`faq-${index}`"
                class="px-6 pb-6"
              >
                <div class="border-t border-gray-100 pt-6">
                  <p class="text-gray-700">{{ faq.answer }}</p>
                </div>
              </div>
            </div>

            <div v-if="!(experience.faqs && experience.faqs.length)" class="text-gray-500">No FAQs yet.</div>
          </div>
        </div>
      </section>

      <!-- 8) FINAL CTA SECTION -->
      <section class="py-20 bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="mb-6 text-4xl font-bold text-white lg:text-5xl">
              Ready to Experience Zanzibar?
            </h2>
            <p class="mx-auto mb-10 max-w-2xl text-xl text-gray-200">
              Contact our Zanzibar specialists today to book your Safari Blue adventure.
            </p>

            <div class="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                class="rounded-xl bg-amber-500 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-amber-600 hover:shadow-xl active:scale-95"
              >
                INQUIRE NOW
              </button>
              <button
                class="rounded-xl border-2 border-white bg-transparent px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-xl active:scale-95"
              >
                Talk to an Expert
              </button>
            </div>

            <div class="grid grid-cols-1 gap-8 rounded-2xl bg-gray-800 p-8 sm:grid-cols-3">
              <div class="text-center">
                <div class="mb-3 h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mx-auto">
                  <span class="text-2xl text-white">🛡️</span>
                </div>
                <h4 class="mb-1 font-bold text-white">Licensed Operator</h4>
                <p class="text-sm text-gray-300">Fully licensed by Tanzanian Tourism Board</p>
              </div>

              <div class="text-center">
                <div class="mb-3 h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mx-auto">
                  <span class="text-2xl text-white">🔒</span>
                </div>
                <h4 class="mb-1 font-bold text-white">No Hidden Fees</h4>
                <p class="text-sm text-gray-300">All taxes and fees included in quoted price</p>
              </div>

              <div class="text-center">
                <div class="mb-3 h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center mx-auto">
                  <span class="text-2xl text-white">☎️</span>
                </div>
                <h4 class="mb-1 font-bold text-white">24/7 Support</h4>
                <p class="text-sm text-gray-300">Dedicated support throughout your trip</p>
              </div>
            </div>

            <p class="mt-8 text-sm text-gray-400">
              © 2024 ZAFS Tours. Registered Tanzanian tour operator since 2012.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = ref(route.params.slug || '')
const placeholder = '/images/placeholder.png'

const experience = ref(null)
const loading = ref(true)
const errorMsg = ref('')

// when route param changes (navigate client-side), refetch
watch(
  () => route.params.slug,
  (v) => {
    slug.value = v
    fetchExperience()
  }
)

/**
 * Try a few strategies to fetch a single experience by slug.
 * Adjust endpoints to match your backend if different.
 */
async function fetchExperience() {
  loading.value = true
  errorMsg.value = ''
  experience.value = null

  if (!slug.value) {
    errorMsg.value = 'No experience specified.'
    loading.value = false
    return
  }

  try {
    let res = null

    // 1) Try dedicated slug endpoint: /api/zanzibar/slug/{slug}
    try {
      res = await $fetch(`/api/zanzibar/slug/${encodeURIComponent(slug.value)}`)
      // res may be the object or { success, data }
      if (res) {
        // if API returned wrapper { success, data }
        if (res.success && res.data) {
          experience.value = Array.isArray(res.data) ? res.data[0] : res.data
        } else if (res._id || res.slug) {
          // direct object
          experience.value = res
        } else if (Array.isArray(res) && res.length) {
          experience.value = res[0]
        }
      }
    } catch (e) {
      // ignore and fallback
      // console.warn('slug endpoint failed', e)
    }

    // 2) If not found, try list query: /api/zanzibar?slug={slug}
    if (!experience.value) {
      try {
        const q = new URLSearchParams()
        q.set('slug', slug.value)
        const url = `/api/zanzibar?${q.toString()}`
        const listRes = await $fetch(url)
        if (listRes) {
          if (listRes.success && Array.isArray(listRes.data) && listRes.data.length) {
            experience.value = listRes.data[0]
          } else if (Array.isArray(listRes) && listRes.length) {
            experience.value = listRes[0]
          }
        }
      } catch (e) {
        // ignore and fallback
        // console.warn('list-by-slug failed', e)
      }
    }

    // 3) As a last attempt, try /api/zanzibar/{slug}
    if (!experience.value) {
      try {
        const res2 = await $fetch(`/api/zanzibar/${encodeURIComponent(slug.value)}`)
        if (res2) {
          if (res2.success && res2.data) experience.value = res2.data
          else experience.value = res2
        }
      } catch (e) {
        // ignore
      }
    }

    if (!experience.value) {
      errorMsg.value = 'Could not find an experience with that URL.'
    } else {
      // normalize some arrays to always be arrays
      experience.value.highlights = experience.value.highlights || []
      experience.value.itinerary = experience.value.itinerary || []
      experience.value.included = experience.value.included || []
      experience.value.excluded = experience.value.excluded || []
      experience.value.faqs = (experience.value.faqs || []).map(f => ({ ...f, open: !!f.open }))
      experience.value.gallery = experience.value.gallery || []
    }
  } catch (err) {
    console.error('fetchExperience error', err)
    errorMsg.value = 'Failed to load experience. Please try again later.'
  } finally {
    loading.value = false
  }
}

function toggleFaq(index) {
  const f = experience.value?.faqs?.[index]
  if (f) f.open = !f.open
}

onMounted(() => {
  fetchExperience()
})
</script>

<style scoped>
/* Keep only essential styles; small accessibility improvements */
.text-white {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
button:focus-visible {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}
img {
  content-visibility: auto;
}
</style>
