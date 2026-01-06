<template>
  <div class="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Background matching FreeConsultationCTA -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Safari background image -->
      <div
        class="absolute inset-0 bg-cover bg-center pointer-events-none"
        :style="{ backgroundImage: `url('/images/background/safari6.png')` }"
      ></div>
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-linear-to-br from-gray-900/50 via-gray-800/40 to-amber-900/30 pointer-events-none"></div>
      <!-- Fade for readability -->
      <div class="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/70 via-black/50 to-transparent pointer-events-none"></div>
      <!-- Subtle pattern -->
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)] pointer-events-none"
      ></div>
    </div>

    <!-- Decorative elements (non-interactive) -->
    <div class="absolute top-10 left-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-3xl mx-auto relative z-10">
      <!-- Page Header -->
      <div class="text-center mb-10">
        <div class="inline-flex items-center mb-6">
          <div class="w-12 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
          <span class="mx-4 text-amber-300 font-semibold tracking-wider text-sm uppercase">
            Free Consultation
          </span>
          <div class="w-12 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
        </div>

        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Book a free 30-minute call
        </h1>
        <p class="text-gray-300 text-lg mb-4">
          Speak directly with our Tanzania travel expert for personalized safari advice
        </p>
        <div class="flex items-center justify-center text-sm text-gray-400">
          <svg class="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>No obligation • No credit card required • Expert advice guaranteed</span>
        </div>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 mb-10">
        <!-- Top accent border -->
        <div class="h-2 bg-linear-to-r from-amber-400 via-amber-500 to-emerald-500"></div>

        <div class="p-6 md:p-8 lg:p-10">
          <!-- Success State -->
          <div v-if="success" class="text-center py-12">
            <div class="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Thanks — we received your request!</h3>
            <p class="text-gray-300 mb-8 max-w-md mx-auto">
              We'll call you to schedule the 30-minute consultation. Our expert will contact you within 24 hours.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/" class="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl border border-white/20 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Return home
              </NuxtLink>
              <button @click="success = false" class="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 rounded-xl transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Submit another request
              </button>
            </div>
          </div>

          <!-- Error State (only for server/network errors) -->
          <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-red-400 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">Submission failed</h3>
                <p class="text-red-200">{{ error }}</p>
                <button @click="error = ''" class="mt-4 text-red-300 hover:text-red-200 font-medium">
                  Try again
                </button>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="submitForm" class="space-y-8" novalidate>
            <!-- Personal Information Section -->
            <div>
              <h2 class="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">Personal Information</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Full Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                    Full name <span class="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    @blur="validateField('name')"
                    :aria-invalid="!!errors.name"
                    aria-describedby="name-error"
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    :class="{ 'border-red-400': errors.name, 'border-green-400': validations.name }"
                    placeholder="John Doe"
                  />
                  <p v-if="errors.name" id="name-error" class="mt-2 text-sm text-red-400">{{ errors.name }}</p>
                  <p v-else-if="validations.name" class="mt-2 text-sm text-green-400 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Looks good!
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                    Email <span class="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    @blur="validateField('email')"
                    :aria-invalid="!!errors.email"
                    aria-describedby="email-error"
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    :class="{ 'border-red-400': errors.email, 'border-green-400': validations.email }"
                    placeholder="john@example.com"
                  />
                  <p v-if="errors.email" id="email-error" class="mt-2 text-sm text-red-400">{{ errors.email }}</p>
                  <p v-else-if="validations.email" class="mt-2 text-sm text-green-400 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Valid email format
                  </p>
                </div>
              </div>

              <!-- Phone Number -->
              <div class="mt-6">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Mobile phone <span class="text-red-400">*</span>
                </label>
                <div class="flex flex-col sm:flex-row gap-4">
                  <div class="sm:w-32">
                    <label for="countryCode" class="sr-only">Country calling code</label>
                    <input
                      id="countryCode"
                      v-model="form.countryCode"
                      type="text"
                      required
                      @blur="validateField('countryCode')"
                      @input="formatCountryCode"
                      :aria-invalid="!!errors.countryCode"
                      aria-describedby="country-code-hint"
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                      :class="{ 'border-red-400': errors.countryCode, 'border-green-400': validations.countryCode }"
                      placeholder="e.g., 255, 91, 1"
                    />
                    <p id="country-code-hint" class="mt-2 text-xs text-gray-400">
                      Country calling code (e.g., 91 for India, 255 for Tanzania, 1 for US/Canada)
                    </p>
                    <p v-if="errors.countryCode" class="mt-2 text-sm text-red-400">{{ errors.countryCode }}</p>
                    <p v-else-if="validations.countryCode" class="mt-2 text-sm text-green-400 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                      </svg>
                      Valid country code
                    </p>
                  </div>
                  <div class="flex-1">
                    <label for="phone" class="sr-only">Mobile phone number</label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      @input="formatPhone"
                      @blur="validateField('phone')"
                      type="text"
                      required
                      :aria-invalid="!!errors.phone"
                      aria-describedby="phone-hint phone-error"
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                      :class="{ 'border-red-400': errors.phone, 'border-green-400': validations.phone }"
                      placeholder="712345678"
                    />
                    <p id="phone-hint" class="mt-2 text-xs text-gray-400">
                      Enter mobile number (digits only; omit 0 prefix)
                    </p>
                    <p v-if="errors.phone" id="phone-error" class="mt-2 text-sm text-red-400">{{ errors.phone }}</p>
                    <p v-else-if="validations.phone" class="mt-2 text-sm text-green-400 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Valid phone number
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Travel Details Section -->
          <div>
            <h2 class="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">Travel Details</h2>
            
            <!-- Who is travelling? -->
            <div class="mb-6">
              <legend class="block text-sm font-medium text-gray-300 mb-3">
                Who is travelling? <span class="text-red-400">*</span>
              </legend>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <!-- Single -->
                <label
                  class="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer transition hover:bg-white/10 group"
                  :class="{ 'bg-amber-500/20 border-amber-500/40 shadow-lg scale-105 ring-2 ring-amber-400': form.who === 'single' }"
                  @click="selectWho('single')"
                >
                  <input
                    type="radio"
                    v-model="form.who"
                    value="single"
                    class="sr-only"
                    @change="handleWhoChange"
                  />
                  <div class="text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div class="text-lg text-white font-medium">Single</div>
                </label>
                
                <!-- Couple -->
                <label
                  class="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer transition hover:bg-white/10 group"
                  :class="{ 'bg-amber-500/20 border-amber-500/40 shadow-lg scale-105 ring-2 ring-amber-400': form.who === 'couple' }"
                  @click="selectWho('couple')"
                >
                  <input
                    type="radio"
                    v-model="form.who"
                    value="couple"
                    class="sr-only"
                    @change="handleWhoChange"
                  />
                  <div class="text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div class="text-lg text-white font-medium">Couple</div>
                </label>
                
                <!-- Groups -->
                <label
                  class="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer transition hover:bg-white/10 group"
                  :class="{ 'bg-amber-500/20 border-amber-500/40 shadow-lg scale-105 ring-2 ring-amber-400': form.who === 'groups' }"
                  @click="selectWho('groups')"
                >
                  <input
                    type="radio"
                    v-model="form.who"
                    value="groups"
                    class="sr-only"
                    @change="handleWhoChange"
                  />
                  <div class="text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a5.5 5.5 0 01-5.5 5.5m0 0a5.5 5.5 0 015.5-5.5m-11 0a5.5 5.5 0 015.5 5.5" />
                    </svg>
                  </div>
                  <div class="text-lg text-white font-medium">Groups</div>
                </label>
                
                <!-- Family -->
                <label
                  class="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/20 rounded-xl cursor-pointer transition hover:bg-white/10 group"
                  :class="{ 'bg-amber-500/20 border-amber-500/40 shadow-lg scale-105 ring-2 ring-amber-400': form.who === 'family' }"
                  @click="selectWho('family')"
                >
                  <input
                    type="radio"
                    v-model="form.who"
                    value="family"
                    class="sr-only"
                    @change="handleWhoChange"
                  />
                  <div class="text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div class="text-lg text-white font-medium">Family</div>
                </label>
              </div>
              <p class="mt-3 text-xs text-gray-400">
                Selecting "single" or "couple" will set travellers automatically — you can still change the number.
              </p>
              <p v-if="errors.who" class="mt-2 text-sm text-red-400">{{ errors.who }}</p>
            </div>

            <!-- Travellers and other details -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Number of travellers -->
              <div>
                <label for="travellers" class="block text-sm font-medium text-gray-300 mb-2">
                  Number of travellers <span class="text-red-400">*</span>
                </label>
                <input
                  id="travellers"
                  v-model.number="form.travellers"
                  type="number"
                  min="1"
                  max="99"
                  required
                  @input="handleTravellersInput"
                  @blur="validateField('travellers')"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  :class="{ 'border-red-400': errors.travellers, 'border-green-400': validations.travellers }"
                />
                <p v-if="errors.travellers" class="mt-2 text-sm text-red-400">{{ errors.travellers }}</p>
              </div>

              <!-- Planned travel date -->
              <div>
                <label for="travelDate" class="block text-sm font-medium text-gray-300 mb-2">
                  Planned travel date <span class="text-red-400">*</span>
                </label>
                <input
                  id="travelDate"
                  v-model="form.travelDate"
                  type="date"
                  required
                  @blur="validateDate('travelDate')"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  :class="{ 'border-red-400': dateErrors.travelDate, 'border-green-400': dateValidations.travelDate }"
                />
                <p v-if="dateErrors.travelDate" class="mt-2 text-sm text-red-400">{{ dateErrors.travelDate }}</p>
                <p v-else-if="dateValidations.travelDate" class="mt-2 text-sm text-green-400 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Valid date
                </p>
              </div>

              <!-- Trip length -->
              <div>
                <label for="days" class="block text-sm font-medium text-gray-300 mb-2">
                  Trip length (days)
                </label>
                <input
                  id="days"
                  v-model.number="form.days"
                  type="number"
                  min="1"
                  @blur="validateNumber('days')"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  :class="{ 'border-red-400': numberErrors.days, 'border-green-400': numberValidations.days }"
                  placeholder="e.g., 7"
                />
                <p v-if="numberErrors.days" class="mt-2 text-sm text-red-400">{{ numberErrors.days }}</p>
              </div>

              <!-- Budget - MADE REQUIRED -->
              <div>
                <label for="budget" class="block text-sm font-medium text-gray-300 mb-2">
                  Budget per person (USD) <span class="text-red-400">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-400">$</span>
                  </div>
                  <input
                    id="budget"
                    v-model.number="form.budget"
                    type="number"
                    min="0"
                    required
                    @blur="validateField('budget')"
                    class="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    :class="{ 'border-red-400': errors.budget, 'border-green-400': validations.budget }"
                    placeholder="1500"
                  />
                </div>
                <p v-if="errors.budget" id="budget-error" class="mt-2 text-sm text-red-400">{{ errors.budget }}</p>
                <p v-else-if="validations.budget" class="mt-2 text-sm text-green-400 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Budget set
                </p>
              </div>

              <!-- Origin city -->
              <div>
                <label for="originCity" class="block text-sm font-medium text-gray-300 mb-2">
                  Origin city
                </label>
                <input
                  id="originCity"
                  v-model="form.originCity"
                  type="text"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  placeholder="e.g., Mumbai"
                />
              </div>

              <!-- Country -->
              <div>
                <label for="country" class="block text-sm font-medium text-gray-300 mb-2">
                  Country
                </label>
                <input
                  id="country"
                  v-model="form.country"
                  type="text"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  placeholder="e.g., India"
                />
              </div>
            </div>
          </div>

          <!-- Call Preferences -->
          <div>
            <h2 class="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">Call Preferences</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Preferred call time -->
              <div>
                <label for="preferredTime" class="block text-sm font-medium text-gray-300 mb-2">
                  Preferred call date & time <span class="text-red-400">*</span>
                </label>
                <input
                  id="preferredTime"
                  v-model="form.preferredTime"
                  type="datetime-local"
                  required
                  @blur="validateField('preferredTime')"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  :class="{ 'border-red-400': errors.preferredTime, 'border-green-400': validations.preferredTime }"
                />
                <p v-if="errors.preferredTime" class="mt-2 text-sm text-red-400">{{ errors.preferredTime }}</p>
                <p v-else-if="validations.preferredTime" class="mt-2 text-sm text-green-400 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Valid date & time
                </p>
              </div>

              <!-- Timezone -->
              <div>
                <label for="timezone" class="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <div class="relative">
                  <select
                    id="timezone"
                    v-model="form.timezone"
                    class="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition appearance-none cursor-pointer"
                  >
                    <option 
                      v-for="tz in timezones" 
                      :key="tz" 
                      :value="tz"
                      class="bg-gray-800 text-white hover:bg-amber-500 hover:text-gray-900"
                    >
                      {{ tz }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message -->
            <div class="mt-6">
              <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
                Message / notes
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                placeholder="Tell us about your travel preferences, questions, or any specific requirements..."
              ></textarea>
            </div>

            <!-- How did you hear about us? -->
            <div class="mt-6">
              <label for="leadSourceDetail" class="block text-sm font-medium text-gray-300 mb-2">
                How did you hear about us?
              </label>
              <input
                id="leadSourceDetail"
                v-model="form.leadSourceDetail"
                type="text"
                class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                placeholder="e.g., Google search, Friend recommendation, Instagram..."
              />
            </div>
          </div>

          <!-- Consent -->
          <div class="bg-white/5 rounded-xl p-6 border border-white/10">
            <div class="flex items-start">
              <input
                id="consent"
                v-model="form.consent"
                type="checkbox"
                required
                @change="validateConsent"
                class="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500 focus:ring-offset-gray-900"
              />
              <label for="consent" class="ml-3 text-sm text-gray-300">
                I consent to be contacted about my travel enquiry. <span class="text-red-400">*</span><br>
                <span class="text-gray-400 text-xs">We'll only use your information to arrange your consultation and provide relevant travel information.</span>
              </label>
            </div>
            <p v-if="errors.consent" class="mt-2 text-sm text-red-400">{{ errors.consent }}</p>
            <p v-else-if="validations.consent" class="mt-2 text-sm text-green-400 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Thank you for your consent
            </p>
          </div>

          <!-- Submit -->
          <div class="pt-6 border-t border-white/10">
            <button
              type="submit"
              :disabled="loading"
              class="w-full group inline-flex items-center justify-center bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg border border-amber-400/30 hover:border-amber-300/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-xl"
            >
              <span v-if="!loading">Book Your Free 30-Minute Call</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <svg v-if="!loading" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
            
            <p class="mt-4 text-center text-sm text-gray-400">
              By submitting, you agree to our <a href="/privacy" class="text-amber-400 hover:text-amber-300">Privacy Policy</a> and confirm we can contact you about your enquiry.
            </p>
          </div>
        </form>
      </div>

      <!-- Bottom accent border -->
      <div class="h-2 bg-linear-to-r from-emerald-500 via-amber-500 to-amber-400"></div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from '#imports'

// emits
const emit = defineEmits(['lead-created'])

const route = useRoute()

// UI / state
const loading = ref(false)
const success = ref(false)
const error = ref('')
const userEditedTravellers = ref(false)

// Timezone options
const timezones = [
  'Asia/Kolkata',
  'Africa/Dar_es_Salaam',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
  'Australia/Sydney',
  'Asia/Dubai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Europe/Paris',
  'Europe/Berlin'
]

// Form data - COUNTRY CODE EMPTY BY DEFAULT
const form = reactive({
  name: '',
  email: '',
  countryCode: '', // CHANGED: Empty by default
  phone: '',
  who: 'single',
  travellers: 1,
  travelDate: '', // This will be mapped to 'date' in payload
  days: '',
  budget: '',
  originCity: '',
  country: '',
  preferredTime: '',
  timezone: 'Asia/Kolkata',
  message: '',
  leadSourceDetail: '',
  consent: false
})

// Errors
const errors = reactive({
  name: '',
  email: '',
  countryCode: '',
  phone: '',
  who: '',
  travellers: '',
  budget: '',
  preferredTime: '', // ADDED: For preferredTime validation
  consent: ''
})

// Validations (green checkmarks)
const validations = reactive({
  name: false,
  email: false,
  countryCode: false,
  phone: false,
  travellers: false,
  budget: false,
  preferredTime: false, // ADDED: For preferredTime validation
  consent: false
})

// Additional validations for other fields
const dateErrors = reactive({
  travelDate: '',
  preferredTime: ''
})

const dateValidations = reactive({
  travelDate: false,
  preferredTime: false
})

const numberErrors = reactive({
  days: '',
  budget: ''
})

const numberValidations = reactive({
  days: false,
  budget: false
})

// Simple helpers
const selectWho = (value) => {
  form.who = value
  handleWhoChange()
}

const handleWhoChange = () => {
  if (!userEditedTravellers.value) {
    if (form.who === 'single') form.travellers = 1
    else if (form.who === 'couple') form.travellers = 2
  }
  validateWho()
}

const handleTravellersInput = () => {
  userEditedTravellers.value = true
  validateField('travellers')
}

const formatPhone = () => {
  form.phone = String(form.phone || '').replace(/\D/g, '')
  // Real-time validation as user types
  if (form.phone) {
    validateField('phone')
  }
}

const formatCountryCode = () => {
  // Remove any non-digit characters (including + sign)
  let value = form.countryCode
  // Extract only digits
  const digitsOnly = value.replace(/\D/g, '')
  
  // If there are digits, store them
  if (digitsOnly) {
    form.countryCode = digitsOnly
  } else {
    form.countryCode = '' // CHANGED: Empty if no digits
  }
  
  // Real-time validation
  if (form.countryCode) {
    validateField('countryCode')
  }
}

// Validation functions
const validateField = (field) => {
  switch (field) {
    case 'name':
      validateName()
      break
    case 'email':
      validateEmail()
      break
    case 'countryCode':
      validateCountryCode()
      break
    case 'phone':
      validatePhone()
      break
    case 'travellers':
      validateTravellers()
      break
    case 'budget':
      validateBudget()
      break
    case 'preferredTime': // ADDED: Handle preferredTime validation
      validatePreferredTime()
      break
  }
}

const validateName = () => {
  if (!form.name || !String(form.name).trim()) {
    errors.name = 'Name is required'
    validations.name = false
    return false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    validations.name = false
    return false
  } else {
    errors.name = ''
    validations.name = true
    return true
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'Email is required'
    validations.email = false
    return false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com)'
    validations.email = false
    return false
  } else {
    errors.email = ''
    validations.email = true
    return true
  }
}

const validateCountryCode = () => {
  if (!form.countryCode || !String(form.countryCode).trim()) {
    errors.countryCode = 'Country code is required'
    validations.countryCode = false
    return false
  }
  
  // Allow only digits (1-4 digits)
  const digitsOnly = String(form.countryCode).replace(/\D/g, '')
  if (!/^\d{1,4}$/.test(digitsOnly)) {
    errors.countryCode = 'Please enter a valid country code (1-4 digits, e.g., 91, 255, 1)'
    validations.countryCode = false
    return false
  }
  
  errors.countryCode = ''
  validations.countryCode = true
  return true
}

const validatePhone = () => {
  const digits = String(form.phone || '').replace(/\D/g, '')
  if (!digits) {
    errors.phone = 'Phone number is required'
    validations.phone = false
    return false
  }
  if (digits.length < 6) {
    errors.phone = 'Phone number must be at least 6 digits'
    validations.phone = false
    return false
  } else if (digits.length > 15) {
    errors.phone = 'Phone number must be 15 digits or less'
    validations.phone = false
    return false
  } else {
    errors.phone = ''
    validations.phone = true
    return true
  }
}

const validateWho = () => {
  if (!form.who) {
    errors.who = 'Please select who is travelling'
    return false
  }
  errors.who = ''
  return true
}

const validateTravellers = () => {
  if (!form.travellers || form.travellers < 1 || form.travellers > 99) {
    errors.travellers = 'Please enter a valid number of travellers (1-99)'
    validations.travellers = false
    return false
  }
  errors.travellers = ''
  validations.travellers = true
  return true
}

// ADDED: Budget validation
const validateBudget = () => {
  if (!form.budget && form.budget !== 0) {
    errors.budget = 'Budget is required'
    validations.budget = false
    return false
  }
  
  const num = Number(form.budget)
  if (isNaN(num)) {
    errors.budget = 'Please enter a valid budget amount'
    validations.budget = false
    return false
  }
  
  if (num < 0) {
    errors.budget = 'Budget cannot be negative'
    validations.budget = false
    return false
  }
  
  if (num < 100) {
    errors.budget = 'Budget should be at least $100 per person'
    validations.budget = false
    return false
  }
  
  errors.budget = ''
  validations.budget = true
  return true
}

// ADDED: PreferredTime validation
const validatePreferredTime = () => {
  if (!form.preferredTime) {
    errors.preferredTime = 'Preferred call date & time is required'
    validations.preferredTime = false
    return false
  }
  
  const date = new Date(form.preferredTime)
  if (isNaN(date.getTime())) {
    errors.preferredTime = 'Please enter a valid date and time'
    validations.preferredTime = false
    return false
  }
  
  // Check if date is in the past
  const now = new Date()
  if (date < now) {
    errors.preferredTime = 'Please select a future date and time'
    validations.preferredTime = false
    return false
  }
  
  errors.preferredTime = ''
  validations.preferredTime = true
  return true
}

const validateConsent = () => {
  if (!form.consent) {
    errors.consent = 'You must consent to be contacted'
    validations.consent = false
    return false
  }
  errors.consent = ''
  validations.consent = true
  return true
}

const validateDate = (field) => {
  const value = form[field]
  if (!value) {
    dateErrors[field] = ''
    dateValidations[field] = false
    return true // Optional field, but travelDate is required for backend
  }
  
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    dateErrors[field] = 'Please enter a valid date'
    dateValidations[field] = false
    return false
  }
  
  // Check if date is in the past (for travel date)
  if (field === 'travelDate' || field === 'preferredTime') {
    const now = new Date()
    if (date < now) {
      dateErrors[field] = field === 'preferredTime' 
        ? 'Please select a future date and time' 
        : 'Please select a future travel date'
      dateValidations[field] = false
      return false
    }
  }
  
  dateErrors[field] = ''
  dateValidations[field] = true
  return true
}

const validateNumber = (field) => {
  const value = form[field]
  if (!value && value !== 0) {
    numberErrors[field] = ''
    numberValidations[field] = false
    return true // Optional field (except for budget which is now required)
  }
  
  const num = Number(value)
  if (isNaN(num)) {
    numberErrors[field] = 'Please enter a valid number'
    numberValidations[field] = false
    return false
  }
  
  if (field === 'days' && num < 1) {
    numberErrors[field] = 'Trip length must be at least 1 day'
    numberValidations[field] = false
    return false
  }
  
  if (field === 'budget' && num < 0) {
    numberErrors[field] = 'Budget cannot be negative'
    numberValidations[field] = false
    return false
  }
  
  numberErrors[field] = ''
  numberValidations[field] = true
  return true
}

const validateForm = () => {
  let ok = true
  
  ok = validateName() && ok
  ok = validateEmail() && ok
  ok = validateCountryCode() && ok
  ok = validatePhone() && ok
  ok = validateWho() && ok
  ok = validateTravellers() && ok
  ok = validateBudget() && ok
  ok = validatePreferredTime() && ok // ADDED: Validate preferredTime
  ok = validateConsent() && ok
  
  // Travel date is required for backend - validate it properly
  if (!form.travelDate) {
    dateErrors.travelDate = 'Travel date is required'
    dateValidations.travelDate = false
    ok = false
  } else {
    ok = validateDate('travelDate') && ok
  }
  
  // Optional fields
  validateDate('preferredTime')
  validateNumber('days')
  
  return ok
}

// Capture UTM parameters from route.query
const getUtmParams = () => {
  const utm = {}
  const utmKeys = ['source', 'medium', 'campaign', 'term', 'content']
  utmKeys.forEach(k => {
    const val = route.query[`utm_${k}`]
    if (val) utm[k] = val
  })
  return Object.keys(utm).length ? utm : null
}

// Submit - UPDATED PAYLOAD TO MATCH BACKEND EXPECTATIONS
// In the submitForm function, update the payload section:
const submitForm = async () => {
  error.value = ''
  
  // Validate form first
  if (!validateForm()) {
    // ... existing scroll to error code ...
    return
  }

  loading.value = true

  try {
    // Clean country code - remove any non-digit characters
    const cleanedCountryCode = String(form.countryCode || '').replace(/\D/g, '')
    
    // Convert preferredTime to ISO string for backend
    let preferredTimeISO = null
    if (form.preferredTime) {
      const date = new Date(form.preferredTime)
      if (!isNaN(date.getTime())) {
        preferredTimeISO = date.toISOString()
      }
    }
    
    // UPDATED PAYLOAD: Map frontend fields to backend expectations
    const payload = {
      // Contact info (mapped directly)
      name: String(form.name || '').trim(),
      email: String(form.email || '').trim(),
      countryCode: cleanedCountryCode, // Send cleaned code without plus
      phone: String(form.phone || '').trim(),
      country: form.country || '',
      originCity: form.originCity || '',
      message: form.message || '',
      timezone: form.timezone || '',
      
      // FIXED: Send preferredTime as ISO string at top level
      preferredTime: preferredTimeISO,
      
      // Trip details (mapped directly)
      who: form.who,
      travellers: Number(form.travellers) || 1,
      days: form.days ? Number(form.days) : undefined,
      budget: form.budget ? Number(form.budget) : undefined,
      
      // CRITICAL FIX: Map travelDate to date field
      date: form.travelDate, // Backend expects 'date', not 'travelDate'
      
      // Arrays (empty for this form)
      activities: [],
      ages: [],
      genders: [],
      
      // LEAD SOURCE: Send 'book_call' explicitly so backend uses it instead of default
      source: 'book_call', // This will override backend's default 'custom_itinerary'
      leadSourceDetail: form.leadSourceDetail || 'Book a Call form',
      
      // Consent
      consent: !!form.consent,
      
      // UTM parameters
      utm: getUtmParams() || {},
      
      // Metadata WITHOUT preferredTime
      metadata: {
        createdFrom: 'pages/bookacall.vue',
        createdAt: new Date().toISOString()
      }
    }

    // Debug log
    console.log('Sending payload:', payload)
    
    // POST to your backend
    const response = await $fetch('/api/leads', {
      method: 'POST',
      body: payload
    })

    // backend success
    success.value = true
    emit('lead-created', response)

    // Reset form gently
    const tz = form.timezone
    Object.keys(form).forEach(k => {
      if (k === 'who') form[k] = 'single'
      else if (k === 'travellers') form[k] = 1
      else if (k === 'timezone') form[k] = tz
      else if (k === 'consent') form[k] = false
      else form[k] = '' // CHANGED: Reset all fields to empty, including countryCode
    })
    
    // Reset validations
    Object.keys(validations).forEach(k => validations[k] = false)
    Object.keys(dateValidations).forEach(k => dateValidations[k] = false)
    Object.keys(numberValidations).forEach(k => numberValidations[k] = false)
    
    userEditedTravellers.value = false
    error.value = ''
  } catch (err) {
    console.error('Submit lead error', err)
    // Show user-friendly error
    if (err && err.message) {
      error.value = err.message
    } else if (typeof err === 'string') {
      error.value = err
    } else {
      error.value = 'Failed to submit. Please check your connection and try again.'
    }
    
    // Scroll to error message
    setTimeout(() => {
      const errorDiv = document.querySelector('.bg-red-500\\/10')
      if (errorDiv) {
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  } finally {
    loading.value = false
  }
}

// onMounted defaults - REMOVED country code setting
onMounted(() => {
  // preferredTime default to local datetime (browser)
  const now = new Date()
  const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)
  form.preferredTime = localDateTime

  // travelDate default 30 days from now - REQUIRED FIELD
  const futureDate = new Date(now)
  futureDate.setDate(futureDate.getDate() + 30)
  form.travelDate = futureDate.toISOString().split('T')[0]

  // Set user's timezone if possible
  try {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (userTz && timezones.includes(userTz)) {
      form.timezone = userTz
    }
  } catch {}
  
  // COUNTRY CODE INTENTIONALLY LEFT EMPTY - NO DEFAULT SET
})
</script>

<style scoped>
/* Glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Custom focus styles */
input:focus, textarea:focus, select:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.5);
}

/* Hide number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Custom select arrow - FIXED for better visibility */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d1d5db' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
  padding-right: 2.5rem;
  cursor: pointer;
}

/* Style dropdown options */
select option {
  background-color: #1f2937; /* gray-800 */
  color: white;
  padding: 0.5rem;
}

select option:hover,
select option:focus,
select option:checked {
  background-color: #f59e0b; /* amber-500 */
  color: #111827; /* gray-900 */
}

/* Radio card hover effect */
label:hover {
  transform: translateY(-2px);
  transition: transform 0.15s;
}

/* Success animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-center {
  animation: fadeIn 0.5s ease-out;
}

/* Accessibility improvements */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Ensure proper color contrast for disabled state */
button:disabled {
  background: linear-gradient(to right, #6b7280, #4b5563) !important;
  border-color: #6b7280 !important;
}

/* Green border for valid fields */
.border-green-400 {
  border-color: #34d399 !important;
}

/* Red border for error fields */
.border-red-400 {
  border-color: #f87171 !important;
}

/* Custom dropdown styling */
select {
  scrollbar-width: thin;
  scrollbar-color: rgba(245, 158, 11, 0.5) rgba(31, 41, 55, 0.8);
}

select::-webkit-scrollbar {
  width: 8px;
}

select::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.8);
  border-radius: 4px;
}

select::-webkit-scrollbar-thumb {
  background-color: rgba(245, 158, 11, 0.5);
  border-radius: 4px;
}

select::-webkit-scrollbar-thumb:hover {
  background-color: rgba(245, 158, 11, 0.7);
}
</style>