<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section - Premium Design -->
    <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 to-emerald-900">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Kilimanjaro mountain with safari landscape"
          class="w-full h-full object-cover opacity-10"
        />
        <div class="absolute inset-0 bg-linear-to-t from-gray-900/30 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div class="text-center py-20 md:py-28">
          <div class="inline-flex items-center justify-center mb-8">
            <div class="h-px w-12 bg-amber-500"></div>
            <span class="mx-4 text-amber-400 font-medium tracking-wider text-sm uppercase">Start Your Journey</span>
            <div class="h-px w-12 bg-amber-500"></div>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Contact <span class="text-amber-300">ZAFS Tours</span>
          </h1>
          
          <p class="text-xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            Plan your dream trip in 30 seconds — tell us who's traveling and when and we'll send a personalised plan.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/255767277306"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-lg"
            >
              <span class="mr-2">💬</span>
              WhatsApp Chat
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>

            <a 
              href="tel:+255767277306"
              class="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-lg"
            >
              <span class="mr-2">📞</span>
              Call Now
            </a>
          </div>

          <!-- Trust Badges - Enhanced Design -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
            <div 
              v-for="badge in trustBadges"
              :key="badge.title"
              class="group bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:-translate-y-2 hover:shadow-xl"
            >
              <div class="text-3xl mb-3 text-emerald-400 group-hover:scale-110 transition-transform">
                {{ badge.icon }}
              </div>
              <h3 class="font-semibold text-white mb-2 group-hover:text-amber-300">{{ badge.title }}</h3>
              <p class="text-gray-300 text-sm">{{ badge.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content - Premium Design -->
    <section class="py-20 bg-linear-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Contact Information Column - Premium Cards -->
          <div class="lg:col-span-1">
            <div class="sticky top-24">
              <div class="flex items-center mb-8">
                <div class="h-px w-8 bg-linear-to-r from-emerald-500 to-amber-500"></div>
                <span class="mx-3 text-emerald-600 font-medium tracking-wider text-sm uppercase">Contact Us</span>
                <div class="h-px w-8 bg-linear-to-r from-amber-500 to-emerald-500"></div>
              </div>
              
              <div class="space-y-6">
                <!-- Phone Card - Premium -->
                <div class="group bg-white rounded-xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div class="flex items-start mb-4">
                    <div class="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-100 to-amber-100 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                      <span class="text-emerald-600 text-xl">📞</span>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-bold text-gray-900 mb-3 group-hover:text-emerald-700">Phone & WhatsApp</h3>
                      <div class="space-y-2">
                        <a 
                          href="tel:+255767277306"
                          class="block text-gray-800 hover:text-emerald-600 font-medium transition-colors text-lg group-hover:translate-x-2 transition-transform"
                        >
                          +255 767 277 306
                        </a>
                        <a 
                          href="tel:+255624023455"
                          class="block text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                        >
                          +255 624 023 455
                        </a>
                      </div>
                      <div class="mt-4 pt-4 border-t border-gray-100">
                        <p class="text-sm text-gray-500 flex items-center">
                          <span class="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                          24/7 Support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Email Card - Premium -->
                <div class="group bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div class="flex items-start mb-4">
                    <div class="w-12 h-12 rounded-xl bg-linear-to-br from-amber-100 to-emerald-100 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                      <span class="text-amber-600 text-xl">✉️</span>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-bold text-gray-900 mb-3 group-hover:text-amber-700">Email</h3>
                      <a 
                        href="mailto:info@zafstours.com"
                        class="block text-gray-800 hover:text-amber-600 font-medium transition-colors text-lg group-hover:translate-x-2 transition-transform"
                      >
                        info@zafstours.com
                      </a>
                      <div class="mt-4 pt-4 border-t border-gray-100">
                        <p class="text-sm text-gray-500">Response within 12 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Office Card - Premium -->
                <div class="group bg-white rounded-xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div class="flex items-start">
                    <div class="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-100 to-amber-100 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                      <span class="text-emerald-600 text-xl">📍</span>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-bold text-gray-900 mb-3 group-hover:text-emerald-700">Our Office</h3>
                      <p class="text-gray-700 leading-relaxed">
                        Arusha Moshi - Road Moshi,<br>
                        Kilimanjaro, Tanzania
                      </p>
                      <div class="mt-4 pt-4 border-t border-gray-200">
                        <div class="flex items-center text-gray-600">
                          <svg class="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span class="text-sm">Mon - Sun: 7:00 AM - 10:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Why Choose Us - Premium -->
                <div class="group bg-linear-to-br from-emerald-50 to-amber-50/50 rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <h4 class="font-bold text-gray-900 mb-4 flex items-center">
                    <span class="mr-2 text-emerald-600">✨</span>
                    Why Choose ZAFS Tours
                  </h4>
                  <ul class="space-y-3">
                    <li class="flex items-center text-gray-700 group-hover:text-gray-900">
                      <svg class="w-4 h-4 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>100% Tanzanian guides & staff</span>
                    </li>
                    <li class="flex items-center text-gray-700 group-hover:text-gray-900">
                      <svg class="w-4 h-4 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>Licensed by Tanzania Tourist Board</span>
                    </li>
                    <li class="flex items-center text-gray-700 group-hover:text-gray-900">
                      <svg class="w-4 h-4 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>15+ years of experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form Column - Premium Design -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-xl">
              <div class="mb-10">
                <div class="flex items-center mb-6">
                  <div class="h-px w-8 bg-linear-to-r from-emerald-500 to-amber-500"></div>
                  <span class="mx-3 text-emerald-600 font-medium tracking-wider text-sm uppercase">Plan Your Trip</span>
                  <div class="h-px w-8 bg-linear-to-r from-amber-500 to-emerald-500"></div>
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Plan Your Dream Trip in <span class="text-emerald-600">30 Seconds</span>
                </h2>
                <p class="text-gray-600 text-lg">
                  Fill out this quick form and our team will send you a personalized itinerary within 24 hours.
                </p>
              </div>

              <!-- Success Message - Premium -->
              <div 
                v-if="formStatus === 'success'" 
                class="mb-8 p-8 bg-linear-to-br from-emerald-50 to-amber-50/30 rounded-xl border border-emerald-200"
                role="alert"
                aria-live="polite"
              >
                <div class="flex items-start">
                  <div class="w-12 h-12 rounded-xl bg-linear-to-r from-emerald-500 to-amber-500 flex items-center justify-center mr-4 shrink-0">
                    <span class="text-white text-xl">🎉</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Thank you for your inquiry!</h3>
                    <p class="text-gray-700 mb-6 leading-relaxed">
                      Our safari experts are already working on your personalized plan. We'll email you a detailed itinerary within 24 hours.
                    </p>
                    <div class="flex flex-wrap gap-4">
                      <a 
                        href="https://wa.me/255767277306" 
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group inline-flex items-center px-6 py-3 bg-linear-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <span class="mr-2">💬</span>
                        WhatsApp Chat
                      </a>
                      <button
                        @click="resetForm"
                        class="group inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Error Message - Premium -->
              <div 
                v-if="formStatus === 'error'" 
                class="mb-8 p-8 bg-linear-to-br from-red-50 to-red-50/30 rounded-xl border border-red-200"
                role="alert"
                aria-live="assertive"
              >
                <div class="flex items-start">
                  <div class="w-12 h-12 rounded-xl bg-linear-to-r from-red-500 to-red-600 flex items-center justify-center mr-4 shrink-0">
                    <span class="text-white text-xl">⚠️</span>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Something went wrong</h3>
                    <p class="text-gray-700 mb-6">
                      {{ errorMessage || 'Unable to send your message. Please try again or contact us directly.' }}
                    </p>
                    <button
                      @click="resetForm"
                      class="group inline-flex items-center px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>

              <!-- Contact Form - Premium Design -->
              <form 
                v-if="formStatus !== 'success'" 
                @submit.prevent="submitForm" 
                class="space-y-8"
                novalidate
              >
                <!-- Name & Email Row -->
                <div class="grid md:grid-cols-2 gap-8">
                  <div class="group">
                    <label for="fullName" class="block text-sm font-medium text-gray-700 mb-3">
                      Full Name <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        id="fullName"
                        v-model="formData.fullName"
                        type="text"
                        required
                        :class="[
                          'w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300',
                          'group-hover:border-emerald-300',
                          errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        ]"
                        placeholder="Your name"
                      />
                      <div class="absolute right-4 top-4 text-gray-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div v-if="errors.fullName" class="mt-2 text-sm text-red-600">
                      {{ errors.fullName }}
                    </div>
                  </div>

                  <div class="group">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-3">
                      Email <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        id="email"
                        v-model="formData.email"
                        type="email"
                        required
                        :class="[
                          'w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300',
                          'group-hover:border-emerald-300',
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        ]"
                        placeholder="you@example.com"
                      />
                      <div class="absolute right-4 top-4 text-gray-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>
                    <div v-if="errors.email" class="mt-2 text-sm text-red-600">
                      {{ errors.email }}
                    </div>
                  </div>
                </div>

                <!-- Phone & Travelers Row -->
                <div class="grid md:grid-cols-2 gap-8">
                  <div class="group">
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <div class="relative">
                      <input
                        id="phone"
                        v-model="formData.phone"
                        type="tel"
                        :class="[
                          'w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300',
                          'group-hover:border-emerald-300',
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        ]"
                        placeholder="+255 XXX XXX XXX"
                      />
                      <div class="absolute right-4 top-4 text-gray-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-3">
                      Number of Travelers <span class="text-red-500">*</span>
                    </label>
                    <div class="flex gap-4">
                      <div class="flex-1 group">
                        <label class="block text-xs text-gray-500 mb-2">Adults</label>
                        <div class="relative">
                          <input
                            id="adults"
                            v-model.number="formData.adults"
                            type="number"
                            min="1"
                            required
                            :class="[
                              'w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300',
                              'group-hover:border-emerald-300',
                              errors.adults ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            ]"
                          />
                        </div>
                      </div>
                      <div class="flex-1 group">
                        <label class="block text-xs text-gray-500 mb-2">Children</label>
                        <div class="relative">
                          <input
                            id="children"
                            v-model.number="formData.children"
                            type="number"
                            min="0"
                            :class="[
                              'w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300',
                              'group-hover:border-emerald-300',
                              errors.children ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            ]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Date & Destination Row -->
                <div class="grid md:grid-cols-2 gap-8">
                  <div class="group">
                    <label for="arrivalDate" class="block text-sm font-medium text-gray-700 mb-3">
                      Estimated Arrival <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        id="arrivalDate"
                        v-model="formData.arrivalDate"
                        type="date"
                        required
                        :class="[
                          'w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300',
                          'group-hover:border-emerald-300',
                          errors.arrivalDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        ]"
                      />
                      <div class="absolute right-4 top-4 text-gray-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div class="group">
                    <label for="destination" class="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Destination <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <select
                        id="destination"
                        v-model="formData.destination"
                        required
                        :class="[
                          'w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 appearance-none',
                          'group-hover:border-emerald-300',
                          errors.destination ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        ]"
                      >
                        <option value="" disabled selected>Select destination</option>
                        <option value="Zanzibar">🏝️ Zanzibar</option>
                        <option value="Safari">🦁 Safari</option>
                        <option value="Kilimanjaro">🏔️ Kilimanjaro</option>
                        <option value="Custom">✨ Custom Itinerary</option>
                      </select>
                      <div class="absolute right-4 top-4 text-gray-400 pointer-events-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Message Field -->
                <div class="group">
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-3">
                    Message / Special Requests
                  </label>
                  <div class="relative">
                    <textarea
                      id="message"
                      v-model="formData.message"
                      rows="5"
                      :class="[
                        'w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300',
                        'group-hover:border-emerald-300 resize-y min-h-[140px]',
                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      ]"
                      placeholder="Tell us about your dream trip, special requirements, or questions..."
                    ></textarea>
                    <div class="absolute right-4 top-4 text-gray-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-6">
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    :class="[
                      'group w-full px-8 py-5 rounded-xl font-medium transition-all duration-300',
                      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500',
                      'transform hover:-translate-y-1 hover:shadow-xl',
                      isSubmitting 
                        ? 'bg-linear-to-r from-emerald-400 to-amber-400 cursor-not-allowed' 
                        : 'bg-linear-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white shadow-lg'
                    ]"
                  >
                    <span class="flex items-center justify-center text-lg">
                      <svg 
                        v-if="isSubmitting" 
                        class="animate-spin h-6 w-6 mr-3 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span v-else class="mr-3">✈️</span>
                      {{ isSubmitting ? 'Sending your inquiry...' : 'Plan My Dream Trip Now' }}
                    </span>
                  </button>
                  <p class="mt-4 text-sm text-gray-500 text-center">
                    By submitting, you agree to our privacy policy. We'll never share your information.
                  </p>
                </div>
              </form>
            </div>

            <!-- Premium Indicators -->
            <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="group bg-white rounded-xl p-5 text-center border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div class="text-2xl mb-3 text-emerald-600 group-hover:scale-110 transition-transform">⏱️</div>
                <p class="text-sm font-medium text-gray-900 group-hover:text-emerald-700">24-hour response</p>
              </div>
              <div class="group bg-white rounded-xl p-5 text-center border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div class="text-2xl mb-3 text-emerald-600 group-hover:scale-110 transition-transform">🛡️</div>
                <p class="text-sm font-medium text-gray-900 group-hover:text-emerald-700">Licensed & Insured</p>
              </div>
              <div class="group bg-white rounded-xl p-5 text-center border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div class="text-2xl mb-3 text-amber-600 group-hover:scale-110 transition-transform">👨‍👩‍👧‍👦</div>
                <p class="text-sm font-medium text-gray-900 group-hover:text-amber-700">Local Experts</p>
              </div>
              <div class="group bg-white rounded-xl p-5 text-center border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div class="text-2xl mb-3 text-emerald-600 group-hover:scale-110 transition-transform">✨</div>
                <p class="text-sm font-medium text-gray-900 group-hover:text-emerald-700">Tailor-Made</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section - Premium -->
    <section class="py-20 bg-linear-to-b from-white to-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center mb-8">
            <div class="h-px w-8 bg-linear-to-r from-emerald-500 to-amber-500"></div>
            <span class="mx-3 text-emerald-600 font-medium tracking-wider text-sm uppercase">Need Help?</span>
            <div class="h-px w-8 bg-linear-to-r from-amber-500 to-emerald-500"></div>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p class="text-gray-600 text-lg">Quick answers to common questions</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="group bg-white rounded-xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 class="font-bold text-gray-900 mb-3 flex items-center group-hover:text-emerald-700">
              <span class="mr-2 text-emerald-600">❓</span>
              How soon will you respond?
            </h3>
            <p class="text-gray-600 group-hover:text-gray-700">
              We respond to WhatsApp messages within minutes, emails within 12 hours, and provide personalized itineraries within 24 hours.
            </p>
          </div>
          
          <div class="group bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 class="font-bold text-gray-900 mb-3 flex items-center group-hover:text-amber-700">
              <span class="mr-2 text-amber-600">❓</span>
              Do you offer payment plans?
            </h3>
            <p class="text-gray-600 group-hover:text-gray-700">
              Yes! We offer flexible payment plans with deposits as low as 30%. The balance can be paid closer to your travel dates.
            </p>
          </div>

          <div class="group bg-white rounded-xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 class="font-bold text-gray-900 mb-3 flex items-center group-hover:text-emerald-700">
              <span class="mr-2 text-emerald-600">❓</span>
              What's included in the price?
            </h3>
            <p class="text-gray-600 group-hover:text-gray-700">
              All our packages include accommodation, meals, transportation, park fees, and guide services. We provide a detailed breakdown for each itinerary.
            </p>
          </div>
          
          <div class="group bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 class="font-bold text-gray-900 mb-3 flex items-center group-hover:text-amber-700">
              <span class="mr-2 text-amber-600">❓</span>
              Is travel insurance included?
            </h3>
            <p class="text-gray-600 group-hover:text-gray-700">
              Travel insurance is not included but highly recommended. We can help you arrange comprehensive coverage for your trip.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Import Vue reactivity and useHead from Nuxt
import { ref, reactive } from 'vue'
import { useHead } from '#imports'

// Define page metadata for layout
definePageMeta({
  layout: 'default'
})

// Trust badges matching the About page style
const trustBadges = [
  {
    icon: '🦁',
    title: 'Licensed Operator',
    description: 'Fully licensed by Tanzania Tourist Board'
  },
  {
    icon: '🗺️',
    title: 'Local Guides',
    description: 'Born & raised in Tanzania'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'On-trip assistance always available'
  },
  {
    icon: '✨',
    title: 'Tailor-Made',
    description: 'Custom itineraries for every traveler'
  }
]

// Form state management
const formData = reactive({
  fullName: '',
  email: '',
  phone: '',
  adults: 1,
  children: 0,
  arrivalDate: '',
  destination: '',
  message: ''
})

const errors = reactive({})
const isSubmitting = ref(false)
const formStatus = ref('') // 'success', 'error', or ''
const errorMessage = ref('')

/**
 * Validate form inputs
 * @returns {boolean} True if validation passes
 */
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  let isValid = true

  // Full name validation
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required'
    isValid = false
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Phone validation (optional but validate format if provided)
  if (formData.phone && !/^[\d\s\+\(\)\-]+$/.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number'
    isValid = false
  }

  // Adults validation
  if (!formData.adults || formData.adults < 1) {
    errors.adults = 'At least 1 adult is required'
    isValid = false
  }

  // Children validation
  if (formData.children < 0) {
    errors.children = 'Number of children cannot be negative'
    isValid = false
  }

  // Arrival date validation
  if (!formData.arrivalDate) {
    errors.arrivalDate = 'Arrival date is required'
    isValid = false
  } else {
    const selectedDate = new Date(formData.arrivalDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      errors.arrivalDate = 'Arrival date cannot be in the past'
      isValid = false
    }
  }

  // Destination validation
  if (!formData.destination) {
    errors.destination = 'Please select a destination'
    isValid = false
  }

  return isValid
}

/**
 * Submit form data to API endpoint
 */
const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  formStatus.value = ''
  errorMessage.value = ''

  try {
    // Prepare the data for submission
    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      source: 'website_contact_form'
    }

    // Send POST request to API endpoint
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: submissionData,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Handle successful submission
    formStatus.value = 'success'
    
    // Reset form data for next submission
    resetFormData()
    
  } catch (error) {
    // Handle submission error
    formStatus.value = 'error'
    errorMessage.value = error.message || 'Unable to send your message. Please try again later.'
    
    // For demo purposes, simulate success if API endpoint doesn't exist
    // Remove this in production
    if (error.message?.includes('404') || error.message?.includes('Failed to fetch')) {
      formStatus.value = 'success'
      resetFormData()
    }
  } finally {
    isSubmitting.value = false
  }
}

/**
 * Reset form data to initial state
 */
const resetFormData = () => {
  formData.fullName = ''
  formData.email = ''
  formData.phone = ''
  formData.adults = 1
  formData.children = 0
  formData.arrivalDate = ''
  formData.destination = ''
  formData.message = ''
  
  // Clear errors
  Object.keys(errors).forEach(key => delete errors[key])
}

/**
 * Reset form status for retry
 */
const resetForm = () => {
  formStatus.value = ''
  errorMessage.value = ''
}

// Set up page metadata for SEO
useHead({
  title: 'Contact ZAFS Tours — Plan Your Tanzanian Adventure | Safari Experts',
  meta: [
    {
      name: 'description',
      content: 'Contact ZAFS Tours for personalized safari, Kilimanjaro, and Zanzibar adventures. Get a custom itinerary in 24 hours. Call +255 767 277 306 or email info@zafstours.com'
    },
    {
      property: 'og:title',
      content: 'Contact ZAFS Tours — Tanzanian Safari Experts'
    },
    {
      property: 'og:description',
      content: 'Plan your dream Tanzanian adventure with local experts. Contact us for personalized safari, Kilimanjaro, and Zanzibar tours.'
    },
    {
      property: 'og:image',
      content: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ],
  // JSON-LD structured data for SEO
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TouristInformationAndServices',
        'name': 'ZAFS Tours',
        'url': 'https://zafstours.com',
        'logo': 'https://zafstours.com/logo.png',
        'description': 'Licensed Tanzanian tour operator specializing in Zanzibar holidays, wildlife safaris, and Kilimanjaro climbs.',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Arusha Moshi - Road Moshi',
          'addressLocality': 'Kilimanjaro',
          'addressCountry': 'Tanzania'
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'info@zafstours.com',
          'telephone': ['+255767277306', '+255624023455'],
          'contactType': 'customer service',
          'availableLanguage': ['English', 'Swahili'],
          'areaServed': 'Tanzania'
        },
        'founder': {
          '@type': 'Person',
          'name': 'Juma Hassan'
        },
        'openingHours': 'Mo-Su 24/7',
        'priceRange': '$$'
      })
    }
  ]
})
</script>

<style scoped>
/* Custom styles for better accessibility and UI polish */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 3rem;
}

/* Custom styles for date input */
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Smooth focus transitions */
input:focus, textarea:focus, select:focus {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .md\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .text-6xl {
    font-size: 3.5rem;
  }
}
</style>