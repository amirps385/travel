<template>
  <section class="relative py-16 lg:py-24">
    <!-- Background -->
    <div class="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"></div>
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_10%_0,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(245,158,11,0.18),transparent_55%)]"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
      <!-- Card -->
      <div
        class="bg-white/95 lg:bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 flex flex-col lg:flex-row"
      >
        <!-- LEFT: FORM -->
        <div class="w-full lg:w-3/5 p-6 sm:p-8 lg:p-10">
          <!-- Title -->
          <div class="mb-6 sm:mb-8">
            <div
              class="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4"
            >
              KILIMANJARO TOOL
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug">
              Kilimanjaro Success Rate Calculator
            </h2>
            <p class="mt-3 text-sm sm:text-base text-slate-600 max-w-xl">
              Estimate your probability of reaching Uhuru Peak based on your fitness, age, route choice and
              experience at altitude.
            </p>
          </div>

          <!-- Unit toggle -->
          <div class="inline-flex mb-6 rounded-full bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              class="px-4 py-2 rounded-full transition-all"
              :class="
                unitSystem === 'us'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              "
              @click="unitSystem = 'us'"
            >
              US UNITS
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-full transition-all"
              :class="
                unitSystem === 'metric'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              "
              @click="unitSystem = 'metric'"
            >
              METRIC UNITS
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="calculate" class="space-y-6">
            <!-- Row: height / weight / gender / age / route -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <!-- Height -->
              <div class="flex flex-col">
                <label class="text-xs font-semibold text-slate-700 mb-1.5"> Height </label>
                <div class="flex gap-2">
                  <input
                    v-model.number="heightMain"
                    type="number"
                    min="0"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500"
                    :placeholder="unitSystem === 'us' ? 'ft' : 'cm'"
                  />
                  <input
                    v-if="unitSystem === 'us'"
                    v-model.number="heightSub"
                    type="number"
                    min="0"
                    class="w-20 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500"
                    placeholder="in"
                  />
                </div>
              </div>

              <!-- Weight -->
              <div class="flex flex-col">
                <label class="text-xs font-semibold text-slate-700 mb-1.5"> Weight </label>
                <div class="flex gap-2">
                  <input
                    v-model.number="weight"
                    type="number"
                    min="0"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500"
                    :placeholder="unitSystem === 'us' ? 'lbs' : 'kg'"
                  />
                </div>
              </div>

              <!-- Gender -->
              <div class="flex flex-col">
                <label class="text-xs font-semibold text-slate-700 mb-1.5"> Gender </label>
                <select
                  v-model="gender"
                  class="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other / prefer not to say</option>
                </select>
              </div>

              <!-- Age -->
              <div class="flex flex-col">
                <label class="text-xs font-semibold text-slate-700 mb-1.5"> Age </label>
                <input
                  v-model.number="age"
                  type="number"
                  min="10"
                  max="80"
                  class="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500"
                  placeholder="Years"
                />
              </div>

              <!-- Route -->
              <div class="flex flex-col">
                <label class="text-xs font-semibold text-slate-700 mb-1.5"> Choose Route </label>
                <select
                  v-model="route"
                  class="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500"
                >
                  <option value="">Select</option>
                  <option value="lemosho">Lemosho</option>
                  <option value="machame">Machame</option>
                  <option value="rongai">Rongai</option>
                  <option value="northern">Northern Circuit</option>
                  <option value="marangu">Marangu</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <!-- Fitness slider -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <p class="text-xs sm:text-sm font-semibold text-slate-700">
                  EVALUATE YOUR PHYSICAL CONDITION / STAMINA
                </p>
                <p
                  class="text-[11px] sm:text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full"
                >
                  {{ fitnessLabel }}
                </p>
              </div>

              <div class="space-y-2">
                <input
                  v-model.number="fitness"
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  class="w-full range-input"
                />
                <div class="flex justify-between text-[11px] sm:text-xs font-medium text-slate-600">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>

            <!-- Altitude experience -->
            <div class="space-y-3">
              <p class="text-xs sm:text-sm font-semibold text-slate-700">
                Have you climbed above 4,000 m / 13,000 ft in the last 12 months?
              </p>
              <div class="inline-flex rounded-full bg-slate-100 p-1 text-xs font-semibold">
                <button
                  type="button"
                  class="px-4 py-2 rounded-full flex items-center gap-1"
                  :class="
                    highAltitude === false
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  "
                  @click="highAltitude = false"
                >
                  <span>No</span>
                </button>
                <button
                  type="button"
                  class="px-4 py-2 rounded-full flex items-center gap-1"
                  :class="
                    highAltitude === true
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  "
                  @click="highAltitude = true"
                >
                  <span>Yes</span>
                </button>
              </div>
            </div>

            <!-- Calculate button -->
            <div class="pt-2">
              <button
                type="submit"
                class="w-full sm:w-auto px-10 py-3.5 rounded-2xl bg-slate-800 text-white font-semibold text-sm tracking-wide shadow-lg hover:bg-slate-900 hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>CALCULATE</span>
              </button>
            </div>
          </form>

          <!-- Result -->
          <div v-if="resultScore !== null" class="mt-6 border-t border-slate-200 pt-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div class="flex items-center gap-3">
                <div
                  class="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg"
                  :class="resultBadgeClass"
                >
                  {{ resultScore }}%
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-800">
                    {{ resultTitle }}
                  </p>
                  <p class="text-xs text-slate-600">
                    {{ resultMessage }}
                  </p>
                </div>
              </div>
              <p class="text-[11px] text-slate-500 max-w-xs">
                This is an orientation tool only and not a medical assessment. Always consult your doctor before
                attempting high-altitude trekking.
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT: IMAGE -->
        <div class="w-full lg:w-2/5 bg-slate-900 relative">
          <div class="h-64 lg:h-full w-full relative overflow-hidden">
            <img
              src="/images/features/kili-success-calculator.png"
              alt="Kilimanjaro summit sign"
              class="w-full h-full object-cover"
            />
            <!-- changed to bg-linear-to-t to match your project -->
            <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

            <!-- Summit badge -->
            <div class="absolute bottom-5 left-5 right-5">
              <div class="bg-white/95 rounded-2xl shadow-xl px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <p class="text-[10px] font-semibold tracking-[0.13em] text-emerald-600 uppercase">
                    Uhuru Peak • 5,895 m
                  </p>
                  <p class="text-xs text-slate-600">
                    Africa’s highest point • World’s tallest free-standing mountain
                  </p>
                </div>
                <div class="flex items-center">
                  <div
                    class="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold"
                  >
                    100%
                  </div>
                  <p class="ml-2 text-[11px] font-semibold text-slate-800">
                    Your goal
                  </p>
                </div>
              </div>
            </div>

            <!-- Top label -->
            <div class="absolute top-4 left-4">
              <div
                class="px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-[11px] text-slate-100"
              >
                Plan smarter • Trek safer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// unit system: 'us' or 'metric'
const unitSystem = ref('metric')

// form fields
const heightMain = ref(null) // cm OR feet
const heightSub = ref(null) // inches (for US)
const weight = ref(null)
const gender = ref('')
const age = ref(null)
const route = ref('')
const fitness = ref(2) // 1–4
const highAltitude = ref(false) // true / false

// result
const resultScore = ref(null)

// label for fitness slider
const fitnessLabel = computed(() => {
  switch (fitness.value) {
    case 1:
      return 'I can walk ~30 minutes'
    case 2:
      return 'I can hike 2–3 hours'
    case 3:
      return 'I can hike 4–5 hours with a pack'
    case 4:
      return 'I regularly do long hikes / runs'
    default:
      return ''
  }
})

const resultTitle = computed(() => {
  if (resultScore.value === null) return ''
  if (resultScore.value >= 80) return 'High chance of summit'
  if (resultScore.value >= 60) return 'Moderate–good chance of summit'
  if (resultScore.value >= 40) return 'Moderate chance – more prep recommended'
  return 'Low chance – serious training advised'
})

const resultMessage = computed(() => {
  if (resultScore.value === null) return ''
  if (resultScore.value >= 80)
    return 'With a good itinerary and acclimatisation, your profile looks strong for Kilimanjaro.'
  if (resultScore.value >= 60)
    return 'You have a reasonable profile. Extra fitness work and a longer route will help a lot.'
  if (resultScore.value >= 40)
    return 'Consider choosing a longer route and increasing training before your climb.'
  return 'We recommend working with our team on training and route choice before you attempt the summit.'
})

const resultBadgeClass = computed(() => {
  if (resultScore.value === null) return 'bg-slate-200 text-slate-800'
  if (resultScore.value >= 80) return 'bg-emerald-500 text-white'
  if (resultScore.value >= 60) return 'bg-amber-400 text-slate-900'
  if (resultScore.value >= 40) return 'bg-orange-400 text-white'
  return 'bg-rose-500 text-white'
})

// simple heuristic for success rate (UX helper, not medical)
const calculate = () => {
  let score = 60 // base

  // Age
  if (age.value) {
    if (age.value < 40) score += 10
    else if (age.value <= 50) score += 5
    else if (age.value >= 55) score -= 10
  }

  // Fitness
  if (fitness.value === 1) score -= 10
  if (fitness.value === 2) score += 0
  if (fitness.value === 3) score += 8
  if (fitness.value === 4) score += 14

  // Route
  switch (route.value) {
    case 'northern':
      score += 10
      break
    case 'lemosho':
      score += 8
      break
    case 'machame':
      score += 5
      break
    case 'rongai':
      score += 4
      break
    case 'marangu':
      score += 0
      break
    default:
      break
  }

  // Altitude experience
  if (highAltitude.value === true) score += 7

  // very rough BMI penalty if clearly high
  if (heightMain.value && weight.value) {
    let heightMeters
    if (unitSystem.value === 'metric') {
      heightMeters = heightMain.value / 100
    } else {
      const totalInches = (heightMain.value || 0) * 12 + (heightSub.value || 0)
      heightMeters = totalInches * 0.0254
    }

    const weightKg = unitSystem.value === 'metric' ? weight.value : weight.value * 0.453592
    const bmi = weightKg / (heightMeters * heightMeters)

    if (bmi > 32) score -= 8
    else if (bmi > 28) score -= 4
    else if (bmi < 19) score -= 2
  }

  // clamp score
  score = Math.round(Math.min(98, Math.max(10, score)))
  resultScore.value = score
}
</script>

<style scoped>
/* Slider track */
.range-input {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: rgb(226 232 240); /* slate-200 */
  outline: none;
}

/* WebKit thumb */
.range-input::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background-color: rgb(16 185 129); /* emerald-500 */
  border: 1px solid #fff;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.15);
  margin-top: -6px;
}

/* Firefox thumb */
.range-input::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background-color: rgb(16 185 129);
  border: 1px solid #fff;
}
</style>
