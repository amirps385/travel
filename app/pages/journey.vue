<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
    <!-- Top hero + progress -->
    <header class="mb-10">
      <div class="rounded-3xl bg-linear-to-r from-sky-50 via-white to-amber-50 p-8 shadow-xl relative overflow-hidden border border-sky-100">
        <!-- Decorative elements -->
        <div class="absolute -right-8 -top-8 w-40 h-40 bg-linear-to-br from-amber-100 to-sky-100 rounded-full opacity-50"></div>
        <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-linear-to-tr from-amber-100 to-sky-100 rounded-full opacity-30"></div>
        
        <div class="relative z-10">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Design Your Dream Africa Adventure</h1>
          <p class="mt-3 text-lg text-gray-600 max-w-3xl">
            Feel the savannah breeze — choose experiences and we'll craft the perfect itinerary for you.
          </p>

          <!-- Progress bar with jeep icon -->
          <div class="mt-8">
            <div class="relative">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-3">
                <span>Planning Progress</span>
                <span class="text-amber-700">{{ Math.round(completionPercent) }}% Complete</span>
              </div>
              
              <div class="relative h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <div
                  class="absolute left-0 top-0 h-full bg-linear-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500 ease-out"
                  :style="{ width: completionPercent + '%' }"
                  aria-hidden="true"
                ></div>
              </div>

              <!-- Jeep marker -->
              <div
                class="absolute top-1/2 -translate-y-1/2"
                :style="{ left: Math.max(0, completionPercent - 2) + '%' }"
              >
                <div class="relative group">
                  <div class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transform -translate-y-1/2 transition-transform duration-300 group-hover:scale-110">
                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13h18v-2H3v2zm2 1a1 1 0 100 2 1 1 0 000-2zm14 0a1 1 0 100 2 1 1 0 000-2zM7 10v-2a2 2 0 012-2h6a2 2 0 012 2v2" />
                    </svg>
                  </div>
                  <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {{ Math.round(completionPercent) }}% Complete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: main form -->
      <div class="lg:col-span-2 space-y-8">
        <!-- 1. Choose experiences -->
        <section class="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <span class="text-amber-600 font-bold">1</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900">Choose Your Experiences <span class="text-red-500">*</span></h2>
              <p class="text-gray-600 mt-1">Pick one or more — we'll propose a smart day count you can adjust.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              v-for="act in activityOptions"
              :key="act.value"
              type="button"
              @click="toggleActivity(act.value)"
              :class="[
                'group relative text-left p-5 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
                form.activities.includes(act.value) 
                  ? 'border-amber-500 bg-linear-to-br from-amber-50 to-amber-100 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow'
              ]"
              :aria-pressed="form.activities.includes(act.value)"
            >
              <div class="flex items-start gap-4">
                <div class="text-2xl">{{ act.icon }}</div>
                <div class="flex-1">
                  <div class="font-semibold text-gray-900 group-hover:text-amber-700">{{ act.label }}</div>
                  <div class="text-xs text-gray-500 mt-1">{{ act.desc }}</div>
                </div>
              </div>
              <div v-if="form.activities.includes(act.value)" 
                   class="absolute top-3 right-3 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
            </button>
          </div>

          <p v-if="errors.activities" class="mt-3 text-sm text-red-600 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ errors.activities }}
          </p>
        </section>

        <!-- Conditional: country selector for safari/beach/migration -->
        <section v-if="needsCountrySelector" 
                 :class="[
                   'bg-white rounded-2xl p-6 md:p-8 shadow-lg border transition-all duration-200',
                   isStep1Complete ? 'border-gray-100' : 'border-gray-100 opacity-50 pointer-events-none'
                 ]">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
              <span class="text-sky-600 font-bold">📍</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Select Destination Countries <span class="text-red-500">*</span></h3>
              <p class="text-gray-600 text-sm mt-1">Choose one or more countries for your selected experiences.</p>
            </div>
            <div v-if="!isStep1Complete" class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Select experiences first
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label
              v-for="c in countryOptions"
              :key="c.code"
              class="relative cursor-pointer group"
              :class="isStep1Complete ? '' : 'pointer-events-none'"
            >
              <input
                type="checkbox"
                :value="c.name"
                v-model="form.countries"
                :disabled="!isStep1Complete"
                class="sr-only peer"
              />
              <div class="p-4 rounded-xl border-2 transition-all duration-200 peer-checked:border-amber-500 peer-checked:bg-amber-50 hover:border-amber-300 bg-white border-gray-200">
                <div class="font-medium text-gray-900">{{ c.name }}</div>
                <div class="text-xs text-gray-500 mt-1">Explore {{ c.name }}</div>
              </div>
              <div class="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 flex items-center justify-center transition-all duration-200">
                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
            </label>
          </div>

          <p v-if="errors.countries" class="mt-3 text-sm text-red-600 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ errors.countries }}
          </p>
        </section>

        <!-- Kilimanjaro route -->
        <section v-if="form.activities.includes('kilimanjaro trek')" 
                 :class="[
                   'bg-white rounded-2xl p-6 md:p-8 shadow-lg border transition-all duration-200',
                   canAccessKilimanjaroRoute ? 'border-gray-100' : 'border-gray-100 opacity-50 pointer-events-none'
                 ]">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <span class="text-emerald-600 font-bold">⛰️</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Kilimanjaro Trek Route <span class="text-red-500">*</span></h3>
              <p class="text-gray-600 text-sm mt-1">Choose your preferred route — duration and success rate included.</p>
            </div>
            <div v-if="!canAccessKilimanjaroRoute" class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ getStepLockedMessage('kilimanjaro-route') }}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <label
              v-for="route in kilimanjaroRoutes"
              :key="route.slug"
              class="relative cursor-pointer"
              :class="canAccessKilimanjaroRoute ? '' : 'pointer-events-none'"
            >
              <input
                type="radio"
                name="kilimanjaro-route"
                v-model="form.kilimanjaroRoute"
                :value="route.slug"
                :disabled="!canAccessKilimanjaroRoute"
                class="sr-only peer"
              />
              <div class="border-2 rounded-xl p-4 transition-all duration-200 peer-checked:border-amber-500 peer-checked:bg-linear-to-br from-amber-50 to-white hover:border-amber-300 bg-white border-gray-200">
                <div class="font-semibold text-gray-900">{{ route.name }}</div>
                <div class="flex items-center justify-between mt-3">
                  <div class="text-xs">
                    <div class="text-gray-500">Success Rate</div>
                    <div class="font-medium text-gray-900">{{ route.success }}</div>
                  </div>
                  <div class="text-xs">
                    <div class="text-gray-500">Duration</div>
                    <div class="font-medium text-gray-900">{{ route.durationDays }} days</div>
                  </div>
                </div>
              </div>
              <div class="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-amber-500 peer-checked:bg-amber-500 flex items-center justify-center transition-all duration-200">
                <div class="w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
              </div>
            </label>
          </div>

          <p v-if="errors.kilimanjaroRoute" class="mt-3 text-sm text-red-600 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ errors.kilimanjaroRoute }}
          </p>
        </section>

        <!-- Days & Travelers -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Days -->
          <section :class="[
                   'bg-white rounded-2xl p-6 shadow-lg border transition-all duration-200',
                   canAccessTripDuration ? 'border-gray-100' : 'border-gray-100 opacity-50 pointer-events-none'
                 ]">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span class="text-blue-600 font-bold">📅</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Trip Duration <span class="text-red-500">*</span></h3>
                <p class="text-gray-600 text-sm mt-1">Suggested duration based on your selections</p>
              </div>
              <div v-if="!canAccessTripDuration" class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ getStepLockedMessage('trip-duration') }}
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">{{ form.days }} days</span>
                <span class="text-sm text-gray-500">1-30 days</span>
              </div>
              <input 
                type="range" 
                v-model.number="form.days" 
                :disabled="!canAccessTripDuration"
                min="1" 
                max="30" 
                step="1" 
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 disabled:[&::-webkit-slider-thumb]:bg-gray-400"
              />
              <div class="flex justify-between text-xs text-gray-500">
                <span>Short</span>
                <span>Long</span>
              </div>
            </div>
          </section>

          <!-- Who's travelling -->
          <section :class="[
                   'bg-white rounded-2xl p-6 shadow-lg border transition-all duration-200',
                   canAccessTravelGroup ? 'border-gray-100' : 'border-gray-100 opacity-50 pointer-events-none'
                 ]">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span class="text-purple-600 font-bold">👥</span>
            </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Travel Group <span class="text-red-500">*</span></h3>
                <p class="text-gray-600 text-sm mt-1">Who's joining this adventure?</p>
              </div>
              <div v-if="!canAccessTravelGroup" class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ getStepLockedMessage('travel-group') }}
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <label
                v-for="opt in travelGroupOptions"
                :key="opt.value"
                class="relative cursor-pointer group"
                :class="canAccessTravelGroup ? '' : 'pointer-events-none'"
              >
                <input
                  type="radio"
                  name="who"
                  :value="opt.value"
                  v-model="form.who"
                  :disabled="!canAccessTravelGroup"
                  class="sr-only peer"
                />
                <div 
                  :class="[
                    'w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 min-h-[100px]',
                    form.who === opt.value 
                      ? 'bg-linear-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-md' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:shadow-sm'
                  ]"
                >
                  <div class="flex flex-col items-center justify-center gap-2 h-full">
                    <div class="text-2xl">{{ opt.icon }}</div>
                    <div class="text-sm font-medium leading-tight text-center whitespace-normal px-1">
                      {{ opt.label }}
                    </div>
                  </div>
                </div>
                <div 
                  v-if="form.who === opt.value"
                  class="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-amber-600 flex items-center justify-center"
                >
                  <svg class="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </label>
            </div>

            <p v-if="errors.who" class="mt-3 text-sm text-red-600 flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              {{ errors.who }}
            </p>
          </section>
        </div>

        <!-- Date / month -->
        <section :class="[
                 'bg-white rounded-2xl p-6 md:p-8 shadow-lg border transition-all duration-200',
                 canAccessTravelDates ? 'border-gray-100' : 'border-gray-100 opacity-50 pointer-events-none'
               ]">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <span class="text-green-600 font-bold">✈️</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Travel Dates <span class="text-red-500">*</span></h3>
              <p class="text-gray-600 text-sm mt-1">When do you want to travel?</p>
            </div>
            <div v-if="!canAccessTravelDates" class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ getStepLockedMessage('travel-dates') }}
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                  <div class="relative">
                    <input 
                      type="checkbox" 
                      v-model="dateIsMonthOnly" 
                      :disabled="!canAccessTravelDates"
                      class="sr-only peer"
                    />
                    <div class="w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"></div>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Flexible dates (month only)</span>
                </label>
              </div>
            </div>

            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                v-if="!dateIsMonthOnly"
                type="date"
                v-model="form.date"
                :disabled="!canAccessTravelDates"
                class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :aria-label="'Select travel date'"
              />
              <input
                v-else
                type="month"
                v-model="form.monthValue"
                :disabled="!canAccessTravelDates"
                class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :aria-label="'Select travel month'"
              />
            </div>
          </div>

          <p v-if="errors.date" class="mt-3 text-sm text-red-600 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ errors.date }}
          </p>
        </section>

        <!-- Budget -->
        <section :class="[
                 'bg-white rounded-2xl p-6 md:p-8 shadow-lg border transition-all duration-200',
                 canAccessBudget ? 'border-gray-100' : 'border-gray-100 opacity-50 pointer-events-none'
               ]">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <span class="text-yellow-600 font-bold">💰</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Budget Estimate <span class="text-red-500">*</span></h3>
              <p class="text-gray-600 text-sm mt-1">Per person (excluding international flights)</p>
            </div>
            <div v-if="!canAccessBudget" class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ getStepLockedMessage('budget') }}
            </div>
          </div>

          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div class="text-2xl font-bold text-gray-900">${{ formatNumber(form.budget) }}</div>
              <div class="text-sm text-gray-500">$500 - $15,000</div>
            </div>
            
            <input 
              type="range" 
              v-model.number="form.budget" 
              :disabled="!canAccessBudget"
              min="500" 
              max="15000" 
              step="100" 
              class="w-full h-2 bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-amber-500 disabled:[&::-webkit-slider-thumb]:border-gray-400 disabled:[&::-webkit-slider-thumb]:bg-gray-300"
            />
            
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="amt in [1000, 2500, 5000, 10000]"
                :key="amt"
                type="button"
                @click="canAccessBudget ? form.budget = amt : null"
                :class="[
                  'px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
                  form.budget === amt && canAccessBudget
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : canAccessBudget
                    ? 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'
                    : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                ]"
                :disabled="!canAccessBudget"
              >
                ${{ formatNumber(amt) }}
              </button>
            </div>
          </div>
        </section>

        <!-- Travellers & ages -->
        <section :class="[
                 'bg-white rounded-2xl p-6 md:p-8 shadow-lg border transition-all duration-200',
                 canAccessTravellerDetails ? 'border-gray-100' : 'border-gray-100 opacity-50 pointer-events-none'
               ]">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
              <span class="text-pink-600 font-bold">👨‍👩‍👧‍👦</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Traveller Details</h3>
              <p class="text-gray-600 text-sm mt-1">Specify ages for personalized recommendations</p>
            </div>
            <div v-if="!canAccessTravellerDetails" class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ getStepLockedMessage('traveller-details') }}
            </div>
          </div>

          <div class="space-y-6">
            <!-- Adults & Children Count -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <div class="font-medium text-gray-900">Adults (18+)</div>
                    <div class="text-xs text-gray-500">Age 18 and above</div>
                  </div>
                  <div class="flex items-center gap-3">
                    <button 
                      type="button" 
                      @click="canAccessTravellerDetails ? changeAdults(-1) : null"
                      :class="[
                        'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
                        canAccessTravellerDetails
                          ? 'border-gray-300 hover:bg-gray-100'
                          : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                      ]"
                      :disabled="!canAccessTravellerDetails"
                    >-</button>
                    <div class="w-8 text-center font-bold text-gray-900">{{ form.adults }}</div>
                    <button 
                      type="button" 
                      @click="canAccessTravellerDetails ? changeAdults(1) : null"
                      :class="[
                        'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
                        canAccessTravellerDetails
                          ? 'border-gray-300 hover:bg-gray-100'
                          : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                      ]"
                      :disabled="!canAccessTravellerDetails"
                    >+</button>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <div class="font-medium text-gray-900">Children (0-17)</div>
                    <div class="text-xs text-gray-500">Age 0 to 17 years</div>
                  </div>
                  <div class="flex items-center gap-3">
                    <button 
                      type="button" 
                      @click="canAccessTravellerDetails ? changeChildren(-1) : null"
                      :class="[
                        'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
                        canAccessTravellerDetails
                          ? 'border-gray-300 hover:bg-gray-100'
                          : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                      ]"
                      :disabled="!canAccessTravellerDetails"
                    >-</button>
                    <div class="w-8 text-center font-bold text-gray-900">{{ form.children }}</div>
                    <button 
                      type="button" 
                      @click="canAccessTravellerDetails ? changeChildren(1) : null"
                      :class="[
                        'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
                        canAccessTravellerDetails
                          ? 'border-gray-300 hover:bg-gray-100'
                          : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                      ]"
                      :disabled="!canAccessTravellerDetails"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Age Selectors -->
            <div v-if="form.adults > 0" class="space-y-4">
              <div class="font-medium text-gray-900">Adult Ages</div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div v-for="(age, idx) in form.adultAges" :key="'adult-age-' + idx" class="relative">
                  <select 
                    v-model.number="form.adultAges[idx]" 
                    :disabled="!canAccessTravellerDetails"
                    class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option v-for="ageOpt in adultAgeOptions" :key="ageOpt" :value="ageOpt">{{ ageOpt }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="form.children > 0" class="space-y-4">
              <div class="font-medium text-gray-900">Children Ages</div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div v-for="(age, idx) in form.childAges" :key="'child-age-' + idx" class="relative">
                  <select 
                    v-model.number="form.childAges[idx]" 
                    :disabled="!canAccessTravellerDetails"
                    class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option v-for="ageOpt in childAgeOptions" :key="ageOpt" :value="ageOpt">{{ ageOpt }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Anything else -->
        <section :class="[
                 'bg-white rounded-2xl p-6 md:p-8 shadow-lg border transition-all duration-200',
                 canAccessAdditionalNotes ? 'border-gray-100' : 'border-gray-100 opacity-50 pointer-events-none'
               ]">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span class="text-indigo-600 font-bold">💭</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Additional Notes</h3>
              <p class="text-gray-600 text-sm mt-1">Help us personalize your experience</p>
            </div>
            <div v-if="!canAccessAdditionalNotes" class="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ getStepLockedMessage('additional-notes') }}
            </div>
          </div>

          <textarea 
            v-model="form.message" 
            :disabled="!canAccessAdditionalNotes"
            rows="4" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Parks or regions, lodge style, beach add-on, special occasions, dietary restrictions, accessibility needs..."
          ></textarea>
        </section>
      </div>

      <!-- Right: summary / contact -->
      <aside class="lg:col-span-1 space-y-8">
        <!-- Trip Summary -->
        <div class="bg-linear-to-b from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Trip Summary</h3>
              <p class="text-gray-600 text-sm mt-1">Preview your adventure</p>
            </div>
          </div>

          <div class="space-y-4">
            <div v-for="(item, index) in summaryItems" :key="index" 
                 class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <span class="text-sm font-medium text-gray-600">{{ item.label }}</span>
              <span class="text-sm font-semibold text-gray-900">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- Contact Details -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-linear-to-r from-sky-500 to-sky-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Contact Details</h3>
              <p class="text-gray-600 text-sm mt-1">We'll use this to send your proposal</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <input 
                  v-model="form.firstName" 
                  placeholder="First name *" 
                  :class="['w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors', errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-amber-500 focus:ring-amber-200']"
                />
              </div>
              <div>
                <input 
                  v-model="form.lastName" 
                  placeholder="Last name" 
                  class="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <input 
                v-model="form.email" 
                placeholder="Email address *" 
                type="email"
                :class="['w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors', errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-amber-500 focus:ring-amber-200']"
              />
            </div>

            <div class="relative">
              <select 
                v-model="form.country"
                @change="updateCountryCode"
                class="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg appearance-none bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-colors"
              >
                <option value="">Select your country</option>
                <option v-for="c in countries" :key="c.code" :value="c.name">{{ c.flag }} {{ c.name }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <input 
                  v-model="form.countryCode" 
                  placeholder="+255" 
                  class="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                  readonly
                />
              </div>
              <div class="col-span-2">
                <input 
                  v-model="form.phone" 
                  placeholder="Phone number" 
                  class="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Preferred contact method</label>
                <div class="flex flex-wrap gap-2">
                  <label 
                    v-for="m in contactMethods" 
                    :key="m"
                    :class="['px-3 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors', form.preferredContactMethod === m ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300']"
                  >
                    <input type="radio" class="sr-only" :value="m" v-model="form.preferredContactMethod" />
                    {{ m }}
                  </label>
                </div>
              </div>

              <div>
                <label class="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="form.scheduleCall" class="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500" />
                  <span class="text-sm font-medium text-gray-900">Schedule a call with travel expert</span>
                </label>

                <div v-if="form.scheduleCall" class="mt-3">
                  <input 
                    type="datetime-local" 
                    v-model="form.preferredTime" 
                    class="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                  />
                  <p class="text-xs text-gray-500 mt-2">Choose a preferred time (we'll confirm via email)</p>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <label class="inline-flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="form.consentToContact" 
                  :class="['mt-1 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500', errors.contact ? 'border-red-300' : '']"
                />
                <span class="text-sm text-gray-700">
                  I agree to be contacted with my tailored travel proposal and occasional travel inspiration.
                  <span class="text-red-500">*</span>
                </span>
              </label>
            </div>
          </div>

          <p v-if="errors.contact" class="mt-3 text-sm text-red-600 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            {{ errors.contact }}
          </p>
        </div>

        <!-- Submit Section -->
        <div class="bg-linear-to-r from-sky-50 to-amber-50 rounded-2xl p-6 shadow-lg border border-amber-100">
          <div class="space-y-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900">Ready to Explore?</div>
              <p class="text-sm text-gray-600 mt-1">Get your personalized Africa itinerary</p>
            </div>

            <div class="space-y-3">
              <button 
                :disabled="!isValid || isSubmitting" 
                type="submit"
                :class="[
                  'w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2',
                  isValid && !isSubmitting 
                    ? 'bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                    : 'bg-gray-300 cursor-not-allowed'
                ]"
              >
                <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
                <svg v-if="isSubmitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Processing...' : 'Send my trip request' }}</span>
              </button>

              <button 
                type="button" 
                @click="resetForm" 
                class="w-full py-3 px-6 rounded-xl font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset Form
              </button>
            </div>

            <p class="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
              🔒 Your information is secure. We never share your details with third parties.
            </p>
          </div>
        </div>

        <!-- Why Plan With Us Card (MOVED BELOW SUBMIT SECTION) -->
        <div class="bg-linear-to-br from-sky-50 to-amber-50 rounded-2xl p-6 shadow-lg border border-sky-100">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-linear-to-r from-sky-500 to-sky-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Why Plan With Us</h3>
              <p class="text-gray-600 text-sm mt-1">Your trusted Tanzania travel partner</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Transparent pricing and real values</div>
                  <div class="text-xs text-gray-500 mt-0.5">No hidden costs, just honest quotes</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Attention to details</div>
                  <div class="text-xs text-gray-500 mt-0.5">Every aspect of your trip meticulously planned</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Peace of mind, from start to finish</div>
                  <div class="text-xs text-gray-500 mt-0.5">24/7 support throughout your journey</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900">Carefully Selected Guides</div>
                  <div class="text-xs text-gray-500 mt-0.5">Expert local guides with extensive knowledge</div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium text-gray-900">100% Licensed and locally owned Tanzanian Operator</div>
                  <div class="text-xs text-gray-500 mt-0.5">Supporting local communities directly</div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <div class="font-medium text-gray-900 mb-3">Guest ratings</div>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="flex">
                      <span class="text-amber-500">⭐️⭐️⭐️⭐️⭐️</span>
                    </div>
                    <span class="text-sm font-medium text-gray-700">5.0</span>
                  </div>
                  <span class="text-xs text-gray-500">Google : 157 reviews</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="flex">
                      <span class="text-amber-500">⭐️⭐️⭐️⭐️⭐️</span>
                    </div>
                    <span class="text-sm font-medium text-gray-700">5.0</span>
                  </div>
                  <span class="text-xs text-gray-500">Trip Advisor : 559 reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </form>

    <!-- Validation Summary -->
    <div v-if="showValidationSummary" class="mt-8 bg-linear-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-r-lg p-6 animate-pulse">
      <div class="flex items-start gap-3">
        <div class="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div>
          <div class="font-bold text-red-800 mb-2">Please fix the following issues:</div>
          <ul class="space-y-1">
            <li v-for="(m, idx) in validationMessages" :key="idx" class="text-red-700 flex items-center gap-2">
              <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ m }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Options
const activityOptions = [
  { value: 'wild safari', label: 'Wildlife Safari', icon: '🦁', desc: 'Game drives & wildlife' },
  { value: 'beach holidays', label: 'Beach Holiday', icon: '🏖️', desc: 'Relax by the sea' },
  { value: 'kilimanjaro trek', label: 'Kilimanjaro Trek', icon: '🏔️', desc: 'High-altitude trek' },
  { value: 'great migration', label: 'Great Migration', icon: '🦓', desc: 'Nature spectacle' }
]

const kilimanjaroRoutes = [
  { slug: 'marangu', name: 'Marangu Route', success: '50–60%', durationDays: 5 },
  { slug: 'machame', name: 'Machame Route', success: '75–85%', durationDays: 6 },
  { slug: 'lemosho', name: 'Lemosho Route', success: '85–95%', durationDays: 7 },
  { slug: 'rongai', name: 'Rongai Route', success: '70–80%', durationDays: 6 },
  { slug: 'umbwe', name: 'Umbwe Route', success: '40–50%', durationDays: 5 },
  { slug: 'northern', name: 'Northern Circuit', success: '90–95%', durationDays: 8 }
]

const countryOptions = [
  { code: 'KE', name: 'Kenya' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'UG', name: 'Uganda' },
  { code: 'ZA', name: 'South Africa' }
]

// Only 4 countries with their country codes
const countries = [
  { code: 'IN', name: 'India', flag: '🇮🇳', phoneCode: '+91' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', phoneCode: '+971' },
  { code: 'US', name: 'United States', flag: '🇺🇸', phoneCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phoneCode: '+44' }
]

// Updated travel group options with icons
const travelGroupOptions = [
  { value: 'Honeymooners', label: 'Honeymoon', icon: '💑' },
  { value: 'Family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { value: 'Solo traveller', label: 'Solo', icon: '🧳' },
  { value: 'Couple', label: 'Couple', icon: '👫' },
  { value: 'Group of friends', label: 'Friends', icon: '👯‍♂️' },
  { value: 'Other', label: 'Other', icon: '🤝' }
]

const contactMethods = ['Email', 'Phone', 'WhatsApp']

// Adult age options from 18-100
const adultAgeOptions = Array.from({ length: 83 }, (_, i) => i + 18)
const childAgeOptions = Array.from({ length: 18 }, (_, i) => i)

// Function to get browser timezone
function getBrowserTimezone() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log('Detected browser timezone:', timezone)
    return timezone
  } catch (error) {
    console.warn('Could not detect timezone:', error)
    return 'UTC'
  }
}

// reactive form
const form = reactive({
  activities: [],
  kilimanjaroRoute: '',
  countries: [],
  days: 7,
  who: '',
  date: '',
  monthValue: '',
  budget: 2500,
  adults: 2,
  children: 0,
  adultAges: [30, 30],
  childAges: [],
  message: '',
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  countryCode: '',
  phone: '',
  preferredContactMethod: 'Email',
  scheduleCall: false,
  preferredTime: '',
  consentToContact: false
})

const dateIsMonthOnly = ref(false)

// Function to update country code based on selected country
function updateCountryCode() {
  if (form.country) {
    const selectedCountry = countries.find(c => c.name === form.country)
    if (selectedCountry) {
      form.countryCode = selectedCountry.phoneCode
    }
  } else {
    form.countryCode = ''
  }
}

// Step completion logic
const isStep1Complete = computed(() => form.activities.length > 0)
const isStep2Complete = computed(() => {
  if (!needsCountrySelector.value) return true
  return form.countries.length > 0
})
const isKilimanjaroRouteComplete = computed(() => {
  if (!form.activities.includes('kilimanjaro trek')) return true
  return !!form.kilimanjaroRoute
})

// Access logic
const canAccessCountrySelector = computed(() => isStep1Complete.value)
const canAccessKilimanjaroRoute = computed(() => {
  if (!form.activities.includes('kilimanjaro trek')) return false
  return isStep2Complete.value
})

// Trip duration access logic - country selector not required for beach holidays
const canAccessTripDuration = computed(() => {
  if (!isStep1Complete.value) return false
  
  if (form.activities.includes('kilimanjaro trek')) {
    return isKilimanjaroRouteComplete.value
  } else if (needsCountrySelector.value) {
    // Only require countries for safari/migration, not for beach holidays
    return isStep2Complete.value
  } else {
    // For beach holidays only (or other non-country experiences)
    return true
  }
})

const canAccessTravelGroup = computed(() => {
  return form.days > 0 && canAccessTripDuration.value
})
const canAccessTravelDates = computed(() => {
  return !!form.who && canAccessTravelGroup.value
})
const canAccessBudget = computed(() => {
  if (dateIsMonthOnly.value) {
    return !!form.monthValue && canAccessTravelDates.value
  }
  return !!form.date && canAccessTravelDates.value
})
const canAccessTravellerDetails = computed(() => {
  return form.budget > 0 && canAccessBudget.value
})
const canAccessAdditionalNotes = computed(() => {
  return (form.adults > 0 || form.children > 0) && canAccessTravellerDetails.value
})

// Helper function for locked messages
function getStepLockedMessage(step) {
  const messages = {
    'country-selector': 'Select experiences first',
    'kilimanjaro-route': 'Select countries first',
    'trip-duration': form.activities.includes('kilimanjaro trek') 
      ? 'Choose Kilimanjaro route first' 
      : needsCountrySelector.value 
        ? 'Select countries first' 
        : 'Select experiences first',
    'travel-group': 'Set trip duration first',
    'travel-dates': 'Select travel group first',
    'budget': 'Set travel dates first',
    'traveller-details': 'Set budget first',
    'additional-notes': 'Complete traveller details first'
  }
  return messages[step] || 'Complete previous steps first'
}

// Computed for summary
const summaryItems = computed(() => [
  { label: 'Experiences', value: form.activities.length > 0 ? form.activities.map(a => activityOptions.find(o => o.value === a)?.label || a).join(', ') : '—' },
  { label: 'Duration', value: `${form.days} days` },
  { label: 'Travellers', value: `${form.adults + form.children} people` },
  { label: 'Group Type', value: form.who || '—' },
  { label: 'Budget (per person)', value: `$${formatNumber(form.budget)}` },
  { label: 'Travel Date', value: displayDate.value }
])

// Ensure arrays keep correct lengths when adults / children change
watch(() => form.adults, (v) => {
  const needed = Math.max(1, Number(v) || 1)
  while (form.adultAges.length < needed) form.adultAges.push(30)
  while (form.adultAges.length > needed) form.adultAges.pop()
})
watch(() => form.children, (v) => {
  const needed = Math.max(0, Number(v) || 0)
  while (form.childAges.length < needed) form.childAges.push(1)
  while (form.childAges.length > needed) form.childAges.pop()
})

// if user toggles month-only convert date/month safely
watch(dateIsMonthOnly, (val) => {
  if (val && form.date) {
    const d = new Date(form.date)
    if (!isNaN(d.getTime())) form.monthValue = d.toISOString().slice(0,7)
    form.date = ''
  } else if (!val && form.monthValue) {
    // convert month to first day of month
    form.date = form.monthValue + '-01'
    form.monthValue = ''
  }
})

// suggest days based on selections
watch(() => [form.activities.slice(), form.kilimanjaroRoute], () => {
  if (form.activities.includes('kilimanjaro trek') && form.kilimanjaroRoute) {
    const r = kilimanjaroRoutes.find(x => x.slug === form.kilimanjaroRoute)
    if (r) form.days = Math.max(form.days, r.durationDays + 1)
  } else {
    // mild suggestions (do not override intentionally set value)
    if (form.activities.includes('great migration') || form.activities.includes('wild safari')) {
      form.days = Math.max( Math.min(form.days, 30), 10 )
    } else if (form.activities.includes('beach holidays') && form.activities.length === 1) {
      form.days = Math.max( Math.min(form.days, 14), 3 )
    }
  }
})

// Country selector only needed for safari/migration, NOT beach holidays
const needsCountrySelector = computed(() => {
  // Only show country selector for safari/migration
  // Beach holiday can be in many countries, so it's optional
  const safariOrMigration = form.activities.includes('wild safari') || form.activities.includes('great migration')
  return safariOrMigration
})

const completionPercent = computed(() => {
  const checks = [
    form.activities.length > 0,
    // Only check countries if they're needed (not for beach holidays)
    (!needsCountrySelector.value || form.countries.length > 0),
    (!form.activities.includes('kilimanjaro trek')) || (!!form.kilimanjaroRoute),
    form.days > 0,
    form.who !== '',
    (dateIsMonthOnly.value ? !!form.monthValue : !!form.date),
    form.budget > 0,
    (form.firstName && form.email && form.consentToContact)
  ]
  const done = checks.filter(Boolean).length
  return (done / checks.length) * 100
})

const isSubmitting = ref(false)
const errors = reactive({})
const showValidationSummary = ref(false)
const validationMessages = ref([])

function formatNumber(n) {
  if (!n && n !== 0) return '0'
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function toggleActivity(val) {
  const idx = form.activities.indexOf(val)
  if (idx === -1) form.activities.push(val)
  else form.activities.splice(idx, 1)
}

function changeAdults(delta) {
  form.adults = Math.max(1, Number(form.adults || 1) + delta)
}

function changeChildren(delta) {
  form.children = Math.max(0, Number(form.children || 0) + delta)
}

function validate() {
  validationMessages.value = []
  Object.keys(errors).forEach(k => delete errors[k])

  if (!form.activities.length) {
    errors.activities = 'Please choose at least one experience.'
    validationMessages.value.push(errors.activities)
  }

  // Only validate countries if they're needed (not for beach holidays)
  if (needsCountrySelector.value && form.countries.length === 0) {
    errors.countries = 'Please select at least one destination country.'
    validationMessages.value.push(errors.countries)
  }

  if (form.activities.includes('kilimanjaro trek') && !form.kilimanjaroRoute) {
    errors.kilimanjaroRoute = 'Please choose at least one Kilimanjaro route.'
    validationMessages.value.push(errors.kilimanjaroRoute)
  }

  if (!form.days || form.days < 1) {
    errors.days = 'Please select how many days.'
    validationMessages.value.push(errors.days)
  }

  if (!form.who) {
    errors.who = 'Please choose who is travelling.'
    validationMessages.value.push(errors.who)
  }

  if (dateIsMonthOnly.value) {
    if (!form.monthValue) {
      errors.date = 'Please pick a month.'
      validationMessages.value.push(errors.date)
    }
  } else {
    if (!form.date) {
      errors.date = 'Please pick a travel date.'
      validationMessages.value.push(errors.date)
    }
  }

  if (!form.budget || form.budget < 0) {
    errors.budget = 'Please set a budget estimate.'
    validationMessages.value.push(errors.budget)
  }

  if (!form.firstName) {
    errors.firstName = 'First name required.'
    validationMessages.value.push(errors.firstName)
  }

  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Valid email required.'
    validationMessages.value.push(errors.email)
  }

  if (!form.consentToContact) {
    errors.contact = 'You must agree to be contacted.'
    validationMessages.value.push(errors.contact)
  }

  if ((Number(form.adults) + Number(form.children)) < 1) {
    errors.travellers = 'Please specify at least one traveller.'
    validationMessages.value.push(errors.travellers)
  }

  showValidationSummary.value = validationMessages.value.length > 0
  return validationMessages.value.length === 0
}

// send payload to your /api/leads (with browser timezone)
async function handleSubmit() {
  if (!validate()) return

  isSubmitting.value = true
  try {
    // Get browser timezone
    const timezone = getBrowserTimezone()
    
    const payload = {
      name: `${form.firstName}${form.lastName ? ' ' + form.lastName : ''}`,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      countryCode: form.countryCode,
      country: form.country,
      activities: form.activities,
      kilimanjaroRoute: form.kilimanjaroRoute || '',
      countries: form.countries,
      days: form.days,
      who: form.who,
      date: dateIsMonthOnly.value ? (form.monthValue ? `${form.monthValue}-01` : '') : form.date,
      dateIsMonthOnly: dateIsMonthOnly.value,
      budget: form.budget,
      adults: form.adults,
      children: form.children,
      adultAges: form.adultAges,
      childAges: form.childAges,
      message: form.message || '',
      preferredContactMethod: form.preferredContactMethod,
      scheduleCall: form.scheduleCall,
      preferredTime: form.preferredTime || null,
      timezone: timezone, // Browser-detected timezone
      consentToContact: form.consentToContact,
      source: 'custom_itinerary',
      leadSourceDetail: 'Homepage Hero - 30-second Trip Planner Form'
    }

    if (process.client) localStorage.setItem('journeyForm', JSON.stringify(payload))

    await $fetch('/api/leads', { method: 'POST', body: payload })

    router.push({
      path: '/thankyou',
      query: {
        name: form.firstName,
        days: form.days,
        activities: form.activities.join(', ')
      }
    })
  } catch (err) {
    console.error('Error saving lead:', err)
    alert('Something went wrong while sending your request. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  try {
    // First check for prefilled data from URL parameters (hero form)
    const urlParams = new URLSearchParams(window.location.search)
    const isPrefilled = urlParams.get('prefilled') === 'true'
    
    // ALWAYS prioritize URL parameters over localStorage
    if (isPrefilled) {
      const prefilledAdults = urlParams.get('adults')
      const prefilledChildren = urlParams.get('children') || '0'
      const prefilledArrivalDate = urlParams.get('arrivalDate')
      
      console.log('🚀 Prefilled data from hero form URL params (HIGHEST PRIORITY):', {
        adults: prefilledAdults,
        children: prefilledChildren,
        arrivalDate: prefilledArrivalDate
      })
      
      // Update form with prefilled values
      if (prefilledAdults) {
        form.adults = parseInt(prefilledAdults)
        // Initialize adult ages array
        const needed = Math.max(1, Number(prefilledAdults) || 1)
        form.adultAges = Array(needed).fill(30)
      }
      
      if (prefilledChildren) {
        form.children = parseInt(prefilledChildren)
        // Initialize child ages array
        const needed = Math.max(0, Number(prefilledChildren) || 0)
        form.childAges = Array(needed).fill(1)
      }
      
      if (prefilledArrivalDate) {
        // Check if it's a full date or just month
        if (prefilledArrivalDate.includes('-') && prefilledArrivalDate.length === 10) {
          // Full date YYYY-MM-DD
          form.date = prefilledArrivalDate
          dateIsMonthOnly.value = false
        } else if (prefilledArrivalDate.length === 7) {
          // Just month YYYY-MM
          form.monthValue = prefilledArrivalDate
          dateIsMonthOnly.value = true
        }
      }
      
      // IMPORTANT: Clear localStorage/sessionStorage for these fields 
      // when we have URL params to prevent old data from persisting
      if (typeof window !== 'undefined') {
        localStorage.removeItem('heroLeadData')
        localStorage.removeItem('heroQuickLeadData')
        sessionStorage.removeItem('heroLeadData')
        sessionStorage.removeItem('heroQuickLeadData')
      }
    }
    
    // Only check storage if NO URL parameters were provided
    else {
      console.log('No URL params found, checking storage for data...')
      
      // Check sessionStorage first (most recent)
      let heroLeadData = null
      
      try {
        heroLeadData = sessionStorage.getItem('heroLeadData')
        if (!heroLeadData) {
          // Fallback to localStorage
          heroLeadData = localStorage.getItem('heroLeadData')
        }
      } catch (e) {
        console.error('Error accessing storage:', e)
      }
      
      if (heroLeadData) {
        try {
          const parsedHeroData = JSON.parse(heroLeadData)
          console.log('Found hero lead data in storage (NO URL params):', parsedHeroData)
          
          // Only use storage data if we don't have URL params
          if (parsedHeroData.adults) {
            form.adults = parsedHeroData.adults
            const needed = Math.max(1, Number(parsedHeroData.adults) || 1)
            form.adultAges = Array(needed).fill(30)
          }
          
          if (parsedHeroData.children !== undefined) {
            form.children = parsedHeroData.children
            const needed = Math.max(0, Number(parsedHeroData.children) || 0)
            form.childAges = Array(needed).fill(1)
          }
          
          if (parsedHeroData.arrivalDate) {
            const arrivalDate = parsedHeroData.arrivalDate
            if (arrivalDate.includes('-') && arrivalDate.length === 10) {
              form.date = arrivalDate
              dateIsMonthOnly.value = false
            } else if (arrivalDate.length === 7) {
              form.monthValue = arrivalDate
              dateIsMonthOnly.value = true
            }
          }
          
        } catch (e) {
          console.error('Error parsing hero lead data:', e)
        }
      }
    }
    
    // Always check for cached journey form data (user progress) 
    // but don't let it override URL params or hero form data
    const cached = localStorage.getItem('journeyForm')
    if (cached) {
      const parsed = JSON.parse(cached)
      console.log('Found cached journeyForm (user progress):', parsed)
      
      // Only hydrate fields that weren't set by URL params or hero form
      Object.keys(parsed).forEach(k => {
        if (k in form) {
          // Don't override if URL params already set these
          const urlHasAdults = isPrefilled && urlParams.has('adults')
          const urlHasChildren = isPrefilled && urlParams.has('children')
          const urlHasDate = isPrefilled && urlParams.has('arrivalDate')
          
          const shouldSkip = 
            (k === 'adults' && (isPrefilled || form.adults !== 2)) ||
            (k === 'children' && (isPrefilled || form.children !== 0)) ||
            (k === 'date' && (isPrefilled || form.date)) ||
            (k === 'monthValue' && (isPrefilled || form.monthValue))
          
          if (!shouldSkip) {
            form[k] = parsed[k]
          }
        }
      })
      
      if (parsed.date && parsed.date.length === 7 && !form.monthValue) {
        form.monthValue = parsed.date.slice(0,7)
        dateIsMonthOnly.value = true
      }
    }
    
    // Log final state for debugging
    console.log('✅ Final form state after loading:', {
      adults: form.adults,
      children: form.children,
      date: form.date,
      monthValue: form.monthValue,
      adultAges: form.adultAges,
      childAges: form.childAges,
      source: isPrefilled ? 'URL params' : (cached ? 'cached journey' : 'defaults')
    })
    
  } catch (e) { 
    console.error('❌ Error loading prefilled data:', e)
  }
})

const displayDate = computed(() => {
  if (dateIsMonthOnly.value && form.monthValue) {
    const [y, m] = form.monthValue.split('-')
    return `${m}/${y}`
  }
  if (form.date) return new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return '—'
})

const isValid = computed(() => {
  return form.activities.length > 0 &&
         // Only check countries if needed (not for beach holidays)
         (!needsCountrySelector.value || form.countries.length > 0) &&
         (!form.activities.includes('kilimanjaro trek') || !!form.kilimanjaroRoute) &&
         (dateIsMonthOnly.value ? !!form.monthValue : !!form.date) &&
         form.firstName && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
         form.consentToContact
})

function resetForm() {
  Object.assign(form, {
    activities: [],
    kilimanjaroRoute: '',
    countries: [],
    days: 7,
    who: '',
    date: '',
    monthValue: '',
    budget: 2500,
    adults: 2,
    children: 0,
    adultAges: [30, 30],
    childAges: [],
    message: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    countryCode: '',
    phone: '',
    preferredContactMethod: 'Email',
    scheduleCall: false,
    preferredTime: '',
    consentToContact: false
  })
  dateIsMonthOnly.value = false
  Object.keys(errors).forEach(k => delete errors[k])
  showValidationSummary.value = false
}
</script>

<style scoped>
/* Custom scrollbar */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Custom range input styling */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, box-shadow, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Line clamp utility */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>