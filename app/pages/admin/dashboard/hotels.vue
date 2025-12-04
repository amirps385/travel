<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- Page header -->
     
      <!-- HOTELS SECTION -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
      >
        <!-- Header row -->
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Hotels
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage hotel inventory and pricing.
            </p>
          </div>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs md:text-sm font-semibold px-4 py-2 shadow-sm"
            @click="openCreateHotel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 5v14M5 12h14" />
            </svg>
            Add Hotel
          </button>
        </div>

        <!-- Hotels table -->
        <div class="border rounded-2xl overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50/80">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">Hotel Name</th>
                <th class="py-3 px-4">Destination</th>
                <th class="py-3 px-4">Activities</th>
                <th class="py-3 px-4">Range</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="hotel in hotels"
                :key="hotel._id || hotel.id"
                class="border-b last:border-b-0 hover:bg-slate-50/80"
              >
                <td class="py-3 px-4 font-medium text-slate-900">
                  {{ hotel.name }}
                </td>
                <td class="py-3 px-4 text-slate-700">
                  {{ hotel.destination || '—' }}
                </td>
                <td class="py-3 px-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="tag in hotel.activityTypes || []"
                      :key="tag"
                      class="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium"
                    >
                      {{ tag }}
                    </span>
                    <span
                      v-if="!hotel.activityTypes || !hotel.activityTypes.length"
                      class="text-xs text-slate-400"
                    >
                      —
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span
                    v-if="hotel.range"
                    class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    {{ hotel.range }}
                  </span>
                  <span v-else class="text-xs text-slate-400">—</span>
                </td>

                <!-- ACTIONS -->
                <td class="py-3 pr-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <!-- VIEW / SUMMARY (eye) -->
                    <button
                      type="button"
                      class="rounded-full p-2 hover:bg-slate-100"
                      @click.stop="openHotelSummary(hotel)"
                      title="View details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    </button>

                    <!-- EDIT (pencil) -->
                    <button
                      type="button"
                      class="rounded-full p-2 hover:bg-slate-100"
                      @click.stop="openEditHotel(hotel, 'edit')"
                      title="Edit hotel"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M15.232 5.232l3.536 3.536M4 20h4l9.5-9.5-4-4L4 16v4z"/>
                      </svg>
                    </button>

                    <!-- DELETE (trash) -->
                    <button
                      type="button"
                      class="rounded-full p-2 hover:bg-rose-50 text-rose-500"
                      @click.stop="confirmDeleteHotel(hotel)"
                      title="Delete hotel"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 12h10l1-12"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!hotels.length">
                <td colspan="5" class="p-4 text-xs text-slate-500 text-center">
                  No hotels yet. Use “Add Hotel” to create your first one.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- HOTEL MODAL (CREATE / EDIT) -->
      <transition name="fade">
        <div
          v-if="isHotelModalOpen"
          class="fixed inset-0 z-50 flex items-start justify-center bg-black/40"
        >
          <div
            class="mt-16 mb-8 w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            <!-- Modal header -->
            <div class="flex items-center justify-between px-6 py-4 border-b bg-slate-50/70">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                  {{ hotelModalMode === 'create' ? 'Add Hotel' : 'Edit Hotel' }}
                </p>
                <h2 class="text-lg font-semibold text-slate-900">
                  {{ hotelForm.name || 'New Hotel' }}
                </h2>
              </div>
              <button
                type="button"
                class="rounded-full w-8 h-8 flex items-center justify-center border bg-white hover:bg-slate-100"
                @click="closeHotelModal"
              >
                ✕
              </button>
            </div>

            <!-- Tabs -->
            <div class="px-6 pt-4 border-b bg-slate-50/40">
              <div class="inline-flex rounded-2xl bg-slate-100/70 p-1 text-xs md:text-sm font-medium">
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-xl"
                  :class="activeHotelTab === 'basic' ? 'bg-white shadow text-slate-900' : 'text-slate-500'"
                  @click="activeHotelTab = 'basic'"
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-xl"
                  :class="activeHotelTab === 'pricing' ? 'bg-white shadow text-slate-900' : 'text-slate-500'"
                  @click="activeHotelTab = 'pricing'"
                >
                  Pricing
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-xl"
                  :class="activeHotelTab === 'child' ? 'bg-white shadow text-slate-900' : 'text-slate-500'"
                  @click="activeHotelTab = 'child'"
                >
                  Child Policy
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-xl"
                  :class="activeHotelTab === 'special' ? 'bg-white shadow text-slate-900' : 'text-slate-500'"
                  @click="activeHotelTab = 'special'"
                >
                  Special Dates
                </button>
              </div>
            </div>

            <!-- Modal body -->
            <div class="px-6 py-5 max-h-[70vh] overflow-y-auto text-sm text-slate-700 space-y-6">
              <!-- BASIC INFO TAB -->
              <div v-if="activeHotelTab === 'basic'" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Hotel Name</label>
                  <input
                    v-model="hotelForm.name"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2"
                    :disabled="hotelModalMode === 'view'"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Destination (City or Area)
                  </label>
                  <input
                    v-model="hotelForm.destination"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2"
                    :disabled="hotelModalMode === 'view'"
                  />
                </div>

                <div>
                  <p class="block text-xs font-semibold text-slate-600 mb-2">Activity Types</p>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <label
                      v-for="opt in hotelActivityOptions"
                      :key="opt.value"
                      class="inline-flex items-center gap-2 cursor-pointer text-slate-700"
                    >
                      <input
                        type="checkbox"
                        :value="opt.label"
                        v-model="hotelForm.activityTypes"
                        :disabled="hotelModalMode === 'view'"
                      />
                      <span>{{ opt.label }}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Hotel Range</label>
                  <select
                    v-model="hotelForm.range"
                    class="w-full md:w-80 border rounded-lg px-3 py-2 bg-white"
                    :disabled="hotelModalMode === 'view'"
                  >
                    <option disabled value="">Select range</option>
                    <option value="Budget">Budget</option>
                    <option value="Mid Range">Mid Range</option>
                    <option value="Mid Luxury">Mid Luxury</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <!-- PRICING TAB -->
              <div v-else-if="activeHotelTab === 'pricing'" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Select Pricing Year</label>
                  <select
                    v-model.number="hotelForm.pricingYear"
                    class="w-full md:w-64 border rounded-lg px-3 py-2 bg-white"
                    :disabled="hotelModalMode === 'view'"
                  >
                    <option v-for="y in pricingYearOptions" :key="y" :value="y">
                      {{ y }} (Jan 1 - Dec 31)
                    </option>
                  </select>
                  <p class="mt-1 text-[11px] text-slate-500">
                    Manage pricing for different years. Each year has its own seasonal rates.
                  </p>
                </div>

                <!-- High season -->
                <div class="border rounded-2xl px-4 py-3 bg-slate-50/60">
                  <div class="flex items-center justify-between mb-3">
                    <p class="text-sm font-semibold text-slate-800">High Season Pricing</p>
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-60"
                      :disabled="hotelModalMode === 'view'"
                      @click="addHighSeasonRow"
                    >
                      + Add Row
                    </button>
                  </div>

                  <div
                    v-for="(row, idx) in hotelForm.highSeason"
                    :key="idx"
                    class="grid grid-cols-1 md:grid-cols-5 gap-2 items-start mb-3"
                  >
                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">Start Date</label>
                      <input
                        v-model="row.startDate"
                        type="date"
                        class="border rounded-lg px-3 py-2 w-full"
                        :disabled="hotelModalMode === 'view'"
                      />
                    </div>

                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">End Date</label>
                      <input
                        v-model="row.endDate"
                        type="date"
                        class="border rounded-lg px-3 py-2 w-full"
                        :disabled="hotelModalMode === 'view'"
                      />
                    </div>

                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">Room Type</label>
                      <select
                        v-model="row.roomType"
                        class="border rounded-lg px-3 py-2 w-full bg-white"
                        :disabled="hotelModalMode === 'view'"
                      >
                        <option disabled value="">Select room type</option>
                        <option v-for="rt in roomTypeOptions" :key="rt" :value="rt">
                          {{ rt }}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">Meal Plan</label>
                      <select
                        v-model="row.mealPlan"
                        class="border rounded-lg px-3 py-2 w-full bg-white"
                        :disabled="hotelModalMode === 'view'"
                      >
                        <option disabled value="">Select meal plan</option>
                        <option
                          v-for="mp in mealPlanOptions"
                          :key="mp.value"
                          :value="mp.value"
                        >
                          {{ mp.label }}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">Price (USD)</label>
                      <div class="flex items-center gap-2">
                        <input
                          v-model.number="row.priceUSD"
                          type="number"
                          min="0"
                          class="border rounded-lg px-3 py-2 w-full"
                          :disabled="hotelModalMode === 'view'"
                        />
                        <button
                          v-if="hotelModalMode !== 'view'"
                          type="button"
                          class="p-1 text-rose-500 hover:bg-rose-50 rounded-full"
                          @click="removeHighSeasonRow(idx)"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Low season -->
                <div class="border rounded-2xl px-4 py-3 bg-slate-50/60">
                  <div class="flex items-center justify-between mb-3">
                    <p class="text-sm font-semibold text-slate-800">Low Season Pricing</p>
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-60"
                      :disabled="hotelModalMode === 'view'"
                      @click="addLowSeasonRow"
                    >
                      + Add Row
                    </button>
                  </div>

                  <div
                    v-for="(row, idx) in hotelForm.lowSeason"
                    :key="idx"
                    class="grid grid-cols-1 md:grid-cols-3 gap-2 items-start mb-3"
                  >
                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">Room Type</label>
                      <select
                        v-model="row.roomType"
                        class="border rounded-lg px-3 py-2 w-full bg-white"
                        :disabled="hotelModalMode === 'view'"
                      >
                        <option disabled value="">Select room type</option>
                        <option v-for="rt in roomTypeOptions" :key="rt" :value="rt">
                          {{ rt }}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">Meal Plan</label>
                      <select
                        v-model="row.mealPlan"
                        class="border rounded-lg px-3 py-2 w-full bg-white"
                        :disabled="hotelModalMode === 'view'"
                      >
                        <option disabled value="">Select meal plan</option>
                        <option
                          v-for="mp in mealPlanOptions"
                          :key="mp.value"
                          :value="mp.value"
                        >
                          {{ mp.label }}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-[11px] font-semibold text-slate-600 mb-1">Price (USD)</label>
                      <div class="flex items-center gap-2">
                        <input
                          v-model.number="row.priceUSD"
                          type="number"
                          min="0"
                          class="border rounded-lg px-3 py-2 w-full"
                          :disabled="hotelModalMode === 'view'"
                        />
                        <button
                          v-if="hotelModalMode !== 'view'"
                          type="button"
                          class="p-1 text-rose-500 hover:bg-rose-50 rounded-full"
                          @click="removeLowSeasonRow(idx)"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CHILD POLICY TAB -->
              <div v-else-if="activeHotelTab === 'child'" class="space-y-4">
                <p class="text-sm font-semibold text-slate-800">
                  Child Pricing Policies
                </p>
                <p class="text-[11px] text-slate-500 mb-2">
                  Define age ranges and discount percentages for children.
                </p>

                <div class="border rounded-2xl px-4 py-3 bg-slate-50/60 space-y-2">
                  <!-- COLUMN HEADINGS for Child Policy -->
                  <div class="hidden md:grid grid-cols-4 gap-2 text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Min Age</span>
                    <span>Max Age</span>
                    <span>Discount %</span>
                    <span>Description</span>
                  </div>
                  <div
                    v-for="(row, idx) in hotelForm.childPolicies"
                    :key="idx"
                    class="grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
                  >
                    <input
                      v-model.number="row.minAge"
                      type="number"
                      min="0"
                      class="border rounded-lg px-3 py-2"
                      placeholder="Min age"
                      :disabled="hotelModalMode === 'view'"
                    />
                    <input
                      v-model.number="row.maxAge"
                      type="number"
                      min="0"
                      class="border rounded-lg px-3 py-2"
                      placeholder="Max age"
                      :disabled="hotelModalMode === 'view'"
                    />
                    <input
                      v-model.number="row.discountPercent"
                      type="number"
                      min="0"
                      max="100"
                      class="border rounded-lg px-3 py-2"
                      placeholder="Discount %"
                      :disabled="hotelModalMode === 'view'"
                    />
                    <div class="flex items-center gap-2">
                      <input
                        v-model="row.description"
                        type="text"
                        class="border rounded-lg px-3 py-2 w-full"
                        placeholder="Description"
                        :disabled="hotelModalMode === 'view'"
                      />
                      <button
                        v-if="hotelModalMode !== 'view'"
                        type="button"
                        class="p-1 text-rose-500 hover:bg-rose-50 rounded-full"
                        @click="removeChildPolicyRow(idx)"
                      >
                        🗑
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    class="mt-2 inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-60"
                    :disabled="hotelModalMode === 'view'"
                    @click="addChildPolicyRow"
                  >
                    + Add Policy
                  </button>
                </div>
              </div>

              <!-- SPECIAL DATES TAB -->
              <div v-else-if="activeHotelTab === 'special'" class="space-y-4">
                <p class="text-sm font-semibold text-slate-800">
                  Special Date Supplements
                </p>
                <p class="text-[11px] text-slate-500 mb-2">
                  Add extra charges for festive seasons (e.g. 24–26 Dec, 31 Dec, 1 Jan).
                </p>

                <div class="border rounded-2xl px-4 py-3 bg-slate-50/60 space-y-2">
                  <!-- COLUMN HEADINGS for Special Dates -->
                  <div class="hidden md:grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Special Date</span>
                    <span>Extra Charge Per Person (USD)</span>
                    <span>Note / Description (optional)</span>
                  </div>
                  <div
                    v-for="(row, idx) in hotelForm.specialDates"
                    :key="idx"
                    class="grid grid-cols-1 md:grid-cols-3 gap-2 items-center"
                  >
                    <input
                      v-model="row.date"
                      type="date"
                      class="border rounded-lg px-3 py-2"
                      :disabled="hotelModalMode === 'view'"
                    />
                    <input
                      v-model.number="row.extraPerPersonUSD"
                      type="number"
                      min="0"
                      class="border rounded-lg px-3 py-2"
                      placeholder="Extra charge per person (USD)"
                      :disabled="hotelModalMode === 'view'"
                    />
                    <div class="flex items-center gap-2">
                      <input
                        v-model="row.note"
                        type="text"
                        class="border rounded-lg px-3 py-2 w-full"
                        placeholder="Note (optional)"
                        :disabled="hotelModalMode === 'view'"
                      />
                      <button
                        v-if="hotelModalMode !== 'view'"
                        type="button"
                        class="p-1 text-rose-500 hover:bg-rose-50 rounded-full"
                        @click="removeSpecialDateRow(idx)"
                      >
                        🗑
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    class="mt-2 inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-60"
                    :disabled="hotelModalMode === 'view'"
                    @click="addSpecialDateRow"
                  >
                    + Add Date
                  </button>
                </div>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="px-6 py-4 border-t bg-slate-50/70 flex items-center justify-between">
              <p class="text-[11px] text-slate-500">
                You can refine this structure later when we connect more hotel logic.
              </p>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="rounded-lg px-4 py-2 text-xs font-semibold border bg-white text-slate-700 hover:bg-slate-100"
                  @click="closeHotelModal"
                >
                  Cancel
                </button>
                <button
                  v-if="hotelModalMode !== 'view'"
                  type="button"
                  class="rounded-lg px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60"
                  :disabled="isSavingHotel"
                  @click="saveHotel"
                >
                  {{ isSavingHotel ? 'Saving…' : (editingHotelId ? 'Update Hotel' : 'Save Hotel') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- HOTEL SUMMARY MODAL (VIEW ONLY) -->
      <transition name="fade">
        <div
          v-if="isHotelSummaryOpen && summaryHotel"
          class="fixed inset-0 z-40 flex items-start justify-center bg-black/40"
        >
          <div
            class="mt-16 mb-8 w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div class="flex items-center justify-between px-6 py-4 border-b bg-slate-50/70">
              <div>
                <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                  {{ summaryHotel.name || 'Hotel' }} - Complete Details
                </p>
              </div>
              <button
                type="button"
                class="rounded-full w-8 h-8 flex items-center justify-center border bg-white hover:bg-slate-100"
                @click="closeHotelSummary"
              >
                ✕
              </button>
            </div>

            <div class="px-6 py-5 max-h-[70vh] overflow-y-auto text-sm text-slate-700 space-y-5">
              <!-- BASIC INFO -->
              <div>
                <h3 class="text-xs font-semibold text-slate-500 mb-1">Basic Info</h3>
                <p><span class="font-semibold">Destination:</span> {{ summaryHotel.destination || '—' }}</p>
                <p><span class="font-semibold">Range:</span> {{ summaryHotel.range || '—' }}</p>
                <p>
                  <span class="font-semibold">Activities:</span>
                  <span v-if="summaryHotel.activityTypes && summaryHotel.activityTypes.length">
                    {{ summaryHotel.activityTypes.join(', ') }}
                  </span>
                  <span v-else>—</span>
                </p>
              </div>

              <!-- PRICING SUMMARY -->
              <div>
                <h3 class="text-xs font-semibold text-slate-500 mb-1">Pricing</h3>
                <div v-if="(summaryHotel.highSeason && summaryHotel.highSeason.length) || (summaryHotel.lowSeason && summaryHotel.lowSeason.length)">
                  <p class="text-[11px] text-slate-500 mb-1">
                    Year: {{ summaryHotel.pricingYear || new Date().getFullYear() }}
                  </p>
                  <div class="space-y-2">
                    <div v-if="summaryHotel.highSeason && summaryHotel.highSeason.length">
                      <p class="font-semibold text-[13px] mb-1">High Season</p>
                      <ul class="space-y-1">
                        <li
                          v-for="(row, idx) in summaryHotel.highSeason"
                          :key="'hs-'+idx"
                          class="text-[13px]"
                        >
                          {{ row.startDate || 'Start ?' }} – {{ row.endDate || 'End ?' }}
                          · {{ row.roomType || 'Room ?' }}
                          · {{ row.mealPlan || 'Meal ?' }}
                          · {{ row.priceUSD ? '$' + row.priceUSD : '$0' }}
                        </li>
                      </ul>
                    </div>

                    <div v-if="summaryHotel.lowSeason && summaryHotel.lowSeason.length">
                      <p class="font-semibold text-[13px] mt-3 mb-1">Low Season</p>
                      <ul class="space-y-1">
                        <li
                          v-for="(row, idx) in summaryHotel.lowSeason"
                          :key="'ls-'+idx"
                          class="text-[13px]"
                        >
                          {{ row.roomType || 'Room ?' }}
                          · {{ row.mealPlan || 'Meal ?' }}
                          · {{ row.priceUSD ? '$' + row.priceUSD : '$0' }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p v-else class="text-xs text-slate-500">
                  No pricing data.
                </p>
              </div>

              <!-- CHILD POLICIES -->
              <div>
                <h3 class="text-xs font-semibold text-slate-500 mb-1">Child Policies</h3>
                <div v-if="summaryHotel.childPolicies && summaryHotel.childPolicies.length">
                  <ul class="space-y-1">
                    <li
                      v-for="(row, idx) in summaryHotel.childPolicies"
                      :key="'cp-'+idx"
                      class="text-[13px]"
                    >
                      Ages {{ row.minAge }} – {{ row.maxAge }}:
                      {{ row.discountPercent }}% discount
                      <span v-if="row.description">— {{ row.description }}</span>
                    </li>
                  </ul>
                </div>
                <p v-else class="text-xs text-slate-500">
                  No child policies defined.
                </p>
              </div>

              <!-- SPECIAL DATES -->
              <div>
                <h3 class="text-xs font-semibold text-slate-500 mb-1">Special Dates</h3>
                <div v-if="summaryHotel.specialDates && summaryHotel.specialDates.length">
                  <ul class="space-y-1">
                    <li
                      v-for="(row, idx) in summaryHotel.specialDates"
                      :key="'sd-'+idx"
                      class="text-[13px]"
                    >
                      {{ row.date || 'Date ?' }}:
                      +{{ row.extraPerPersonUSD ? '$' + row.extraPerPersonUSD : '$0' }} per person
                      <span v-if="row.note">— {{ row.note }}</span>
                    </li>
                  </ul>
                </div>
                <p v-else class="text-xs text-slate-500">
                  No special dates defined.
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Hotels'
})

// simple "today" text for the header
const today = computed(() => {
  const d = new Date()
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

// ---- Hotel list ----
const hotels = ref([])

// ---- HOTEL SUMMARY (eye icon) ----
const isHotelSummaryOpen = ref(false)
const summaryHotel = ref(null)

function openHotelSummary (hotel) {
  summaryHotel.value = hotel
  isHotelSummaryOpen.value = true
}

function closeHotelSummary () {
  isHotelSummaryOpen.value = false
  summaryHotel.value = null
}

// ---- HOTEL FORM & MODAL ----
const hotelActivityOptions = [
  { value: 'safari', label: 'Safari' },
  { value: 'beach', label: 'Beach' },
  { value: 'climb', label: 'Climb' },
  { value: 'migration', label: 'Migration' }
]

// Room / meal options for pricing tab
const roomTypeOptions = ['Single', 'Double', 'Triple', 'Quadruple']
const mealPlanOptions = [
  { value: 'BB', label: 'BB (Bed & Breakfast)' },
  { value: 'HB', label: 'HB (Half Board)' },
  { value: 'FB', label: 'FB (Full Board)' }
]

const pricingYearOptions = [
  new Date().getFullYear(),
  new Date().getFullYear() + 1,
  new Date().getFullYear() + 2
]

const isHotelModalOpen = ref(false)
const hotelModalMode = ref('create') // 'create' | 'edit' | 'view'
const activeHotelTab = ref('basic')  // 'basic' | 'pricing' | 'child' | 'special'
const isSavingHotel = ref(false)
const editingHotelId = ref(null)

// helpers for default rows so each pricing section starts with 1 row
function defaultHighSeasonRow () {
  return {
    startDate: '',
    endDate: '',
    roomType: '',
    mealPlan: '',
    priceUSD: 0
  }
}
function defaultLowSeasonRow () {
  return {
    roomType: '',
    mealPlan: '',
    priceUSD: 0
  }
}

function emptyHotel () {
  return {
    name: '',
    destination: '',
    activityTypes: [],
    range: '',
    pricingYear: new Date().getFullYear(),
    highSeason: [defaultHighSeasonRow()],
    lowSeason: [defaultLowSeasonRow()],
    childPolicies: [],
    specialDates: []
  }
}

const hotelForm = ref(emptyHotel())

function openCreateHotel () {
  hotelModalMode.value = 'create'
  hotelForm.value = emptyHotel()
  editingHotelId.value = null
  activeHotelTab.value = 'basic'
  isHotelModalOpen.value = true
}

function openEditHotel (hotel, mode = 'edit') {
  hotelModalMode.value = mode
  // clone so we don't mutate original until save
  const copy = JSON.parse(JSON.stringify(hotel))

  if (!Array.isArray(copy.highSeason)) copy.highSeason = []
  if (!copy.highSeason.length) copy.highSeason.push(defaultHighSeasonRow())

  if (!Array.isArray(copy.lowSeason)) copy.lowSeason = []
  if (!copy.lowSeason.length) copy.lowSeason.push(defaultLowSeasonRow())

  if (!Array.isArray(copy.childPolicies)) copy.childPolicies = []
  if (!Array.isArray(copy.specialDates)) copy.specialDates = []

  hotelForm.value = copy
  editingHotelId.value = hotel._id || hotel.id
  activeHotelTab.value = 'basic'
  isHotelModalOpen.value = true
}

function closeHotelModal () {
  isHotelModalOpen.value = false
}

// pricing helpers
function addHighSeasonRow () {
  hotelForm.value.highSeason.push(defaultHighSeasonRow())
}
function removeHighSeasonRow (index) {
  hotelForm.value.highSeason.splice(index, 1)
}

function addLowSeasonRow () {
  hotelForm.value.lowSeason.push(defaultLowSeasonRow())
}
function removeLowSeasonRow (index) {
  hotelForm.value.lowSeason.splice(index, 1)
}

// child policy helpers
function addChildPolicyRow () {
  hotelForm.value.childPolicies.push({
    minAge: 0,
    maxAge: 0,
    discountPercent: 0,
    description: ''
  })
}
function removeChildPolicyRow (index) {
  hotelForm.value.childPolicies.splice(index, 1)
}

// special date helpers
function addSpecialDateRow () {
  hotelForm.value.specialDates.push({
    date: '',
    extraPerPersonUSD: 0,
    note: ''
  })
}
function removeSpecialDateRow (index) {
  hotelForm.value.specialDates.splice(index, 1)
}

async function saveHotel () {
  isSavingHotel.value = true
  try {
    const payload = {
      name: hotelForm.value.name,
      destination: hotelForm.value.destination,
      activityTypes: hotelForm.value.activityTypes,
      range: hotelForm.value.range,
      pricingYear: hotelForm.value.pricingYear,
      highSeason: hotelForm.value.highSeason,
      lowSeason: hotelForm.value.lowSeason,
      childPolicies: hotelForm.value.childPolicies,
      specialDates: hotelForm.value.specialDates
    }

    let saved

    if (editingHotelId.value) {
      // UPDATE
      saved = await $fetch(`/api/hotels/${editingHotelId.value}`, {
        method: 'PATCH',
        body: payload
      })

      const idx = hotels.value.findIndex(h => (h._id || h.id) === editingHotelId.value)
      if (idx !== -1) {
        hotels.value[idx] = saved
      }
    } else {
      // CREATE
      saved = await $fetch('/api/hotels', {
        method: 'POST',
        body: payload
      })
      hotels.value.unshift(saved)
    }

    closeHotelModal()
  } catch (err) {
    console.error('Failed to save hotel', err)
    alert('Failed to save hotel. Check console for details.')
  } finally {
    isSavingHotel.value = false
  }
}

async function confirmDeleteHotel (hotel) {
  if (!confirm(`Delete hotel "${hotel.name}"?`)) return

  const id = hotel._id || hotel.id
  if (!id) return

  try {
    await $fetch(`/api/hotels/${id}`, { method: 'DELETE' })
    hotels.value = hotels.value.filter(h => (h._id || h.id) !== id)
  } catch (err) {
    console.error('Failed to delete hotel', err)
    alert('Failed to delete hotel. See console for details.')
  }
}

// ---- Initial load ----
onMounted(async () => {
  try {
    const hotelData = await $fetch('/api/hotels')
    hotels.value = hotelData || []
  } catch (err) {
    console.error('Failed to load hotels', err)
  }
})
</script>

