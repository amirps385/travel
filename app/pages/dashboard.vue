<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex gap-6">
      <!-- SIDEBAR -->
      <aside
        class="hidden md:flex flex-col w-56 shrink-0 bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 py-6"
      >
        <div class="px-5 mb-6">
          <h2 class="text-lg font-semibold text-slate-900">Admin Panel</h2>
          <p class="text-xs text-slate-500 mt-1">Management</p>
        </div>

        <nav class="flex-1 px-2 space-y-1 text-sm">
          <button
            v-for="item in navItems"
            :key="item.key"
            type="button"
            @click="setSection(item.key)"
            :class="[
              'w-full flex items-center gap-3 px-3 py-2 rounded-xl transition text-left',
              item.active
                ? 'bg-slate-900 text-slate-50 shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
            ]"
          >
            <span
              class="inline-flex items-center justify-center w-7 h-7 rounded-lg"
              :class="item.active ? 'bg-slate-800 text-slate-50' : 'bg-slate-100 text-slate-500'"
            >
              <span v-if="item.key === 'dashboard'">📊</span>
              <span v-else-if="item.key === 'leads'">👥</span>
              <span v-else-if="item.key === 'itineraries'">📄</span>
              <span v-else-if="item.key === 'hotels'">🏨</span>
              <span v-else-if="item.key === 'activities'">📍</span>
              <span v-else-if="item.key === 'transfers'">🚐</span>
              <span v-else-if="item.key === 'cities'">🌆</span>
              <span v-else>•</span>
            </span>
            <span class="text-sm font-medium">{{ item.label }}</span>
          </button>
        </nav>
      </aside>

      <!-- MAIN CONTENT -->
      <section class="flex-1">
        <!-- Top header -->
        <div
          class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-4 flex items-center justify-between mb-6"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-sky-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6M4 21h16"
                />
              </svg>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                Travel Itinerary Management
              </p>
              <h1 class="text-xl md:text-2xl font-bold text-slate-900">
                {{ headerTitle }}
              </h1>
              <p class="text-xs md:text-sm text-slate-500">
                {{ headerSubtitle }}
              </p>
            </div>
          </div>

          <div class="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 bg-slate-100">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              Live
            </span>
            <span class="hidden md:inline">
              {{ today }}
            </span>
          </div>
        </div>

        <!-- DASHBOARD OVERVIEW -->
        <div v-if="activeSection === 'dashboard'">
          <!-- Stats cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div
              v-for="stat in stats"
              :key="stat.title"
              class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 py-4"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs text-slate-500">{{ stat.title }}</p>
                  <p class="mt-1 text-2xl font-bold text-slate-900">{{ stat.value }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ stat.subtitle }}</p>
                </div>
                <div
                  class="w-9 h-9 rounded-xl flex items-center justify-center"
                  :class="stat.colorClass"
                >
                  <span>{{ stat.icon }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent activity placeholder -->
          <div
            class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
          >
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-3">
              Recent activity
            </h2>
            <p class="text-sm text-slate-500">
              Here you’ll later see the latest leads, itinerary updates and admin actions.
              For now, this is a placeholder section while we set up the backend and data.
            </p>
          </div>
        </div>

        <!-- LEADS SECTION -->
        <div v-else-if="activeSection === 'leads'">
          <div
            class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base md:text-lg font-semibold text-slate-900">
                  Leads
                </h2>
                <p class="text-xs md:text-sm text-slate-500">
                  New trip enquiries from the website form.
                </p>
              </div>
              <div class="text-xs text-slate-500">
                Total leads: {{ totalLeads }}
              </div>
            </div>

            <div class="mb-4 flex justify-between items-center gap-2 text-sm">
              <input
                v-model="leadSearch"
                type="text"
                placeholder="Search by name or email"
                class="border rounded-lg px-3 py-2 text-sm w-full max-w-xs"
              />
              <select
                v-model="leadStatusFilter"
                class="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="in-progress">In progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                    <th class="py-2 pr-4">Guest</th>
                    <th class="py-2 pr-4">Email</th>
                    <th class="py-2 pr-4">Travel date</th>
                    <th class="py-2 pr-4">Travellers</th>
                    <th class="py-2 pr-4">Activities</th>
                    <th class="py-2 pr-4">Budget / person</th>
                    <th class="py-2 pr-4">Status</th>
                    <th class="py-2 pr-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="lead in filteredLeads"
                    :key="lead._id || lead.id"
                    class="border-b last:border-b-0 hover:bg-slate-50 cursor-pointer"
                    @click="openLeadDetails(lead)"
                  >
                    <td class="py-2 pr-4 font-medium text-slate-900">
                      {{ lead.name || '—' }}
                    </td>
                    <td class="py-2 pr-4 text-slate-600">
                      {{ lead.email || '—' }}
                    </td>
                    <td class="py-2 pr-4 text-slate-600">
                      {{ lead.prettyDate }}
                    </td>
                    <td class="py-2 pr-4 text-slate-600">
                      {{ lead.travellers || 0 }}
                    </td>
                    <td class="py-2 pr-4 text-slate-600 max-w-[180px] truncate">
                      {{ (lead.activities && lead.activities.join(', ')) || '—' }}
                    </td>
                    <td class="py-2 pr-4 text-slate-600">
                      {{ lead.budget ? '$' + lead.budget : '—' }}
                    </td>
                    <td class="py-2 pr-4">
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        :class="statusPillClass(lead.status)"
                      >
                        {{ lead.statusLabel }}
                      </span>
                    </td>

                    <!-- Build button -->
                    <td class="py-2 pr-4 text-right">
                      <button
                        type="button"
                        class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        @click.stop="goToBuild(lead)"
                      >
                        Build
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M5 12h14M13 6l6 6-6 6"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p v-if="filteredLeads.length === 0" class="mt-4 text-xs text-slate-500">
                No leads match this filter yet.
              </p>
            </div>
          </div>
        </div>

        <!-- ITINERARIES SECTION -->
        <div v-else-if="activeSection === 'itineraries'">
          <div
            class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
          >
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-2">
              Itineraries
            </h2>
            <p class="text-sm text-slate-500 mb-4">
              List of itineraries created by admins from client enquiries.
            </p>
            <ul class="space-y-3 text-sm">
              <li
                v-for="it in itineraries"
                :key="it.id"
                class="flex justify-between items-center rounded-xl border px-4 py-3 hover:bg-slate-50"
              >
                <div>
                  <div class="font-medium text-slate-900">{{ it.title }}</div>
                  <div class="text-xs text-slate-500">
                    {{ it.days }} days · {{ it.travellers }} travellers · {{ it.status }}
                  </div>
                </div>
                <button
                  type="button"
                  class="text-xs rounded-full border px-3 py-1 text-slate-700 hover:bg-slate-100"
                >
                  Open
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- HOTELS SECTION -->
        <div v-else-if="activeSection === 'hotels'">
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
                          class="rounded-full p-2 hover:bg-slate-100 text-rose-500"
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
                </tbody>
              </table>

              <p v-if="!hotels.length" class="p-4 text-xs text-slate-500">
                No hotels yet. Use “Add Hotel” to create your first one.
              </p>
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
                    You can refine this structure later when we connect real hotel data from MongoDB.
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

        <!-- ACTIVITIES SECTION -->
        <div v-else-if="activeSection === 'activities'">
          <div
            class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
                  Activities
                </h2>
                <p class="text-xs md:text-sm text-slate-500">
                  Manage available activities and excursions.
                </p>
              </div>

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs md:text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-sm"
                @click="openCreateActivityModal"
              >
                <span class="text-lg leading-none">＋</span>
                Add Activity
              </button>
            </div>

            <!-- Activities table -->
            <div class="overflow-x-auto rounded-2xl border border-slate-100">
              <table class="min-w-full text-sm">
                <thead class="bg-slate-50">
                  <tr class="text-left text-xs uppercase tracking-wide text-slate-500">
                    <th class="px-4 py-2">Activity Name</th>
                    <th class="px-4 py-2">Type</th>
                    <th class="px-4 py-2">Time</th>
                    <th class="px-4 py-2">Cost</th>
                    <th class="px-4 py-2">Duration</th>
                    <th class="px-4 py-2">Priority</th>
                    <th class="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="act in activitiesAdmin"
                    :key="act.id"
                    class="border-t last:border-b-0 hover:bg-slate-50/80"
                  >
                    <td class="px-4 py-3 text-slate-900">
                      <div class="font-medium">{{ act.name }}</div>
                      <div class="text-xs text-slate-500 truncate">
                        {{ act.location || act.description || '' }}
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                        :class="act.type ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'"
                      >
                        {{ act.type || '—' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-slate-700 text-sm">
                      {{ act.timeOfDay || '—' }}
                    </td>
                    <td class="px-4 py-3 text-slate-700 text-sm">
                      {{ act.costUSD ? '$' + act.costUSD : '—' }}
                    </td>
                    <td class="px-4 py-3 text-slate-700 text-sm">
                      {{ act.durationMinutes ? act.durationMinutes + ' min' : '—' }}
                    </td>
                    <td class="px-4 py-3">
                      <span
                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                        :class="act.priorityPercent >= 70
                          ? 'bg-emerald-50 text-emerald-700'
                          : act.priorityPercent <= 40
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-amber-50 text-amber-700'"
                      >
                        {{ (act.priorityPercent ?? 50) + '%' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-right">
                      <div class="inline-flex items-center gap-2">
                        <!-- Edit -->
                        <button
                          type="button"
                          class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                          @click="openEditActivityModal(act)"
                          title="Edit activity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                                  d="M16.862 4.487l1.651-1.651a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                          </svg>
                        </button>

                        <!-- Delete -->
                        <button
                          type="button"
                          class="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600"
                          @click="deleteActivity(act.id)"
                          title="Delete activity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                                  d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2m-1 13H8a2 2 0 01-2-2V7h12v11a2 2 0 01-2 2z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="activitiesAdmin.length === 0">
                    <td colspan="7" class="px-4 py-6 text-center text-xs text-slate-500">
                      No activities yet. Click “Add Activity” to create your first one.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TRANSFERS & CITIES SECTIONS -->
       <!-- TRANSFERS SECTION -->
<div v-else-if="activeSection === 'transfers'">
  <div
    class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
          Route Transfers
        </h2>
        <p class="text-xs md:text-sm text-slate-500">
          Manage transfers between cities and destinations.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs md:text-sm font-semibold px-4 py-2 shadow-sm"
        @click="openCreateTransfer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 5v14M5 12h14" />
        </svg>
        Add Transfer
      </button>
    </div>

    <!-- Transfers table -->
    <div class="border rounded-2xl overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80">
          <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
            <th class="py-3 px-4">From City</th>
            <th class="py-3 px-4">To City</th>
            <th class="py-3 px-4">Duration</th>
            <th class="py-3 px-4">Cost</th>
            <th class="py-3 px-4">Vehicle Type</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transfer in transfers"
            :key="transfer._id"
            class="border-b last:border-b-0 hover:bg-slate-50/80"
          >
            <td class="py-3 px-4 text-slate-900">{{ transfer.fromCity }}</td>
            <td class="py-3 px-4 text-slate-900">{{ transfer.toCity }}</td>
            <td class="py-3 px-4 text-slate-700">
              {{ transfer.durationHours }}h
            </td>
            <td class="py-3 px-4 text-slate-700">
              {{ transfer.costUSD ? '$' + transfer.costUSD : '$0' }}
            </td>
            <td class="py-3 px-4 text-slate-700">
              {{ transfer.vehicleType || 'Standard' }}
            </td>
            <td class="py-3 pr-4 text-right">
              <div class="inline-flex items-center gap-2">
                <!-- EDIT -->
                <button
                  type="button"
                  class="rounded-full p-2 hover:bg-slate-100"
                  @click.stop="openEditTransfer(transfer)"
                  title="Edit transfer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                          d="M15.232 5.232l3.536 3.536M4 20h4l9.5-9.5-4-4L4 16v4z"/>
                  </svg>
                </button>

                <!-- DELETE -->
                <button
                  type="button"
                  class="rounded-full p-2 hover:bg-rose-50 text-rose-500"
                  @click.stop="deleteTransfer(transfer._id)"
                  title="Delete transfer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                          d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 12h10l1-12"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="!transfers.length">
            <td colspan="6" class="py-4 px-4 text-center text-xs text-slate-500">
              No transfers yet. Use “Add Transfer” to create your first one.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ADD / EDIT TRANSFER MODAL -->
  <transition name="fade">
    <div
      v-if="isTransferModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        class="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal header -->
        <div class="flex items-center justify-between px-6 py-4 border-b bg-slate-50/70">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900">
              {{ isEditingTransfer ? 'Edit Route Transfer' : 'Add New Route Transfer' }}
            </h2>
            <p class="text-xs text-slate-500">
              Create a new route transfer for arrival, departure, and city-to-city transfers.
            </p>
          </div>
          <button
            type="button"
            class="rounded-full w-8 h-8 flex items-center justify-center border bg-white hover:bg-slate-100"
            @click="closeTransferModal"
          >
            ✕
          </button>
        </div>

        <!-- Modal body -->
        <div class="px-6 py-5 space-y-4 text-xs md:text-sm">
          <!-- From / To -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                From City
              </label>
              <select
                v-model="transferForm.fromCity"
                class="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Select origin</option>
                <option v-for="c in transferCityOptions" :key="'from-' + c" :value="c">
                  {{ c }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                To City
              </label>
              <select
                v-model="transferForm.toCity"
                class="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Select destination</option>
                <option v-for="c in transferCityOptions" :key="'to-' + c" :value="c">
                  {{ c }}
                </option>
              </select>
            </div>
          </div>

          <!-- Cost + Duration -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Cost ($)
              </label>
              <input
                v-model.number="transferForm.costUSD"
                type="number"
                min="0"
                class="w-full border rounded-lg px-3 py-2"
              />
              <p class="text-[11px] text-slate-400 mt-1">
                Total transfer cost.
              </p>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Duration (hours)
              </label>
              <input
                v-model.number="transferForm.durationHours"
                type="number"
                min="1"
                step="0.5"
                class="w-full border rounded-lg px-3 py-2"
              />
              <p class="text-[11px] text-slate-400 mt-1">
                Travel time in hours.
              </p>
            </div>
          </div>

          <!-- Vehicle type -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">
              Vehicle Type (Optional)
            </label>
            <input
              v-model="transferForm.vehicleType"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="4x4 Safari Vehicle, Minibus, etc."
            />
          </div>

          <p v-if="transferError" class="text-[11px] text-rose-600">
            {{ transferError }}
          </p>
        </div>

        <!-- Modal footer -->
        <div class="px-6 py-4 border-t bg-slate-50/70 flex items-center justify-end gap-2">
          <button
            type="button"
            class="rounded-lg px-4 py-2 text-xs md:text-sm border bg-white text-slate-700 hover:bg-slate-100"
            @click="closeTransferModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-lg px-4 py-2 text-xs md:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60"
            :disabled="isSavingTransfer"
            @click="saveTransfer"
          >
            {{ isSavingTransfer ? 'Saving…' : (isEditingTransfer ? 'Save changes' : 'Create Transfer') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</div>

<!-- CITIES SECTION (still placeholder) -->
<!-- CITIES SECTION -->
<div v-else-if="activeSection === 'cities'">
  <div
    class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
  >
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
          Cities & Destinations
        </h2>
        <p class="text-xs md:text-sm text-slate-500">
          Manage cities and destinations for hotels and activities.
        </p>
      </div>
    </div>

    <!-- Input + button -->
    <div class="flex gap-2 mb-4">
      <input
        v-model="newCityName"
        type="text"
        class="flex-1 border rounded-lg px-3 py-2 text-sm"
        placeholder="Enter city name..."
        @keyup.enter="createCity"
      />
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs md:text-sm font-semibold px-4 py-2 shadow-sm disabled:opacity-60"
        :disabled="isSavingCity || !newCityName.trim()"
        @click="createCity"
      >
        <span>＋</span>
        Add City
      </button>
    </div>

    <!-- Cities table -->
    <div class="border rounded-2xl overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50/80">
          <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
            <th class="py-3 px-4">City Name</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="city in cities"
            :key="city._id"
            class="border-b last:border-b-0 hover:bg-slate-50/70"
          >
            <td class="py-3 px-4 text-slate-900">
              {{ city.name }}
            </td>
            <td class="py-3 px-4 text-right">
              <button
                type="button"
                class="rounded-full p-2 hover:bg-rose-50 text-rose-600"
                title="Delete city"
                @click="deleteCity(city)"
              >
                <!-- trash icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                        d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 12h10l1-12"/>
                </svg>
              </button>
            </td>
          </tr>

          <tr v-if="!cities.length">
            <td colspan="2" class="py-4 px-4 text-center text-xs text-slate-500">
              No cities added yet. Type a name and click “Add City”.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


      </section>
    </div>

    <!-- Mobile top bar (instead of sidebar) -->
    <div class="md:hidden px-4 pb-4">
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 py-4 flex items-center justify-between"
      >
        <div>
          <p class="text-xs uppercase tracking-[0.18em] text-sky-500 font-semibold">
            Admin Panel
          </p>
          <p class="text-sm font-semibold text-slate-900 capitalize">{{ activeSection }}</p>
        </div>
        <div class="text-xs text-slate-500">
          {{ today }}
        </div>
      </div>
    </div>

    <!-- LEAD DETAIL DRAWER -->
    <transition name="fade">
      <div
        v-if="isDetailOpen && selectedLead"
        class="fixed inset-x-0 top-20 bottom-0 z-40 flex"
      >
        <!-- overlay -->
        <div class="flex-1 bg-black/30" @click="closeLeadDetails"></div>

        <!-- drawer -->
        <div
          class="w-full max-w-md bg-white shadow-xl border-l border-slate-100 p-6 overflow-y-auto"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-sky-500 font-semibold">
                Lead details
              </p>
              <h2 class="text-lg font-semibold text-slate-900">
                {{ selectedLead.name || 'Unnamed guest' }}
              </h2>
              <p class="text-xs text-slate-500">
                Created from the journey planner form
              </p>
            </div>
            <button
              type="button"
              class="rounded-full w-8 h-8 flex items-center justify-center border bg-slate-50 hover:bg-slate-100"
              @click="closeLeadDetails"
            >
              ✕
            </button>
          </div>

          <div class="space-y-4 text-sm text-slate-700">
            <!-- Contact -->
            <div>
              <h3 class="text-xs font-semibold text-slate-500 mb-1">Contact</h3>
              <p><span class="font-medium">Email:</span> {{ selectedLead.email || '—' }}</p>
              <p><span class="font-medium">Phone:</span> {{ selectedLead.phone || '—' }}</p>
              <p><span class="font-medium">Origin city:</span> {{ selectedLead.originCity || '—' }}</p>
            </div>

            <!-- Trip info -->
            <div>
              <h3 class="text-xs font-semibold text-slate-500 mb-1">Trip</h3>
              <p><span class="font-medium">Travel date:</span> {{ selectedLead.prettyDate }}</p>
              <p><span class="font-medium">Days:</span> {{ selectedLead.days || '—' }}</p>
              <p><span class="font-medium">Travellers:</span> {{ selectedLead.travellers || 0 }}</p>
              <p><span class="font-medium">Who is travelling:</span> {{ selectedLead.who || '—' }}</p>
            </div>

            <!-- Activities -->
            <div>
              <h3 class="text-xs font-semibold text-slate-500 mb-1">Activities</h3>
              <div v-if="selectedLead.activities && selectedLead.activities.length" class="flex flex-wrap gap-1">
                <span
                  v-for="act in selectedLead.activities"
                  :key="act"
                  class="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs"
                >
                  {{ act }}
                </span>
              </div>
              <p v-else class="text-xs text-slate-500">No activities selected.</p>
            </div>

            <!-- Budget -->
            <div>
              <h3 class="text-xs font-semibold text-slate-500 mb-1">Budget</h3>
              <p>
                <span class="font-medium">Per person:</span>
                {{ selectedLead.budget ? '$' + selectedLead.budget : '—' }}
              </p>
            </div>

            <!-- Ages / genders -->
            <div v-if="selectedLead.ages && selectedLead.ages.length">
              <h3 class="text-xs font-semibold text-slate-500 mb-1">Travellers age & gender</h3>
              <ul class="space-y-1">
                <li
                  v-for="(age, index) in selectedLead.ages"
                  :key="index"
                >
                  Traveller {{ index + 1 }}:
                  <span class="font-medium">{{ age }}</span> years,
                  {{ selectedLead.genders?.[index] || '—' }}
                </li>
              </ul>
            </div>

            <!-- Status control -->
            <div class="pt-2 border-t border-slate-100">
              <h3 class="text-xs font-semibold text-slate-500 mb-1">Lead status</h3>
              <div class="flex items-center gap-2">
                <select
                  v-model="detailStatus"
                  class="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In progress</option>
                  <option value="closed">Closed</option>
                </select>
                <button
                  type="button"
                  class="rounded-lg px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60"
                  :disabled="isSavingStatus"
                  @click="saveLeadStatus"
                >
                  {{ isSavingStatus ? 'Saving...' : 'Save changes' }}
                </button>
              </div>
              <p class="mt-1 text-[11px] text-slate-400">
                This will update the lead status in MongoDB and in your dashboard totals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ACTIVITY ADD/EDIT MODAL -->
    <div
      v-if="showActivityModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
    >
      <div
        class="max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900">
              {{ isEditingActivity ? 'Edit Activity' : 'Add New Activity' }}
            </h2>
            <p class="text-xs text-slate-500">
              Create or update an activity for customer itineraries.
            </p>
          </div>
          <button
            type="button"
            class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
            @click="closeActivityModal"
          >
            ✕
          </button>
        </div>

        <div class="px-6 py-4 space-y-4 text-xs md:text-sm">
          <!-- Name -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">
              Activity Name
            </label>
            <input
              v-model="activityForm.name"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="Serengeti Game Drive"
            />
          </div>

          <!-- Type + Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Activity Type
              </label>
              <select
                v-model="activityForm.type"
                class="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Select type</option>
                <option v-for="t in activityTypes" :key="t" :value="t">
                  {{ t }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Activity Time
              </label>
              <select
                v-model="activityForm.timeOfDay"
                class="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Select time</option>
                <option v-for="t in activityTimes" :key="t" :value="t">
                  {{ t }}
                </option>
              </select>
            </div>
          </div>

          <!-- Cost + Duration -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Total Cost ($)
              </label>
              <input
                v-model.number="activityForm.costUSD"
                type="number"
                min="0"
                class="w-full border rounded-lg px-3 py-2"
              />
              <p class="text-[11px] text-slate-400 mt-1">
                Includes all fees (park, vehicle, guide, etc.)
              </p>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Duration (minutes)
              </label>
              <input
                v-model.number="activityForm.durationMinutes"
                type="number"
                min="30"
                step="15"
                class="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <!-- Destination -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">
              Destination/City (optional)
            </label>
            <select
              v-model="activityForm.location"
              class="w-full border rounded-lg px-3 py-2 bg-white"
            >
              <option value="">Select destination</option>
              <option v-for="d in activityDestinations" :key="d" :value="d">
                {{ d }}
              </option>
            </select>
            <p class="text-[11px] text-slate-400 mt-1">
              Location where this activity takes place.
            </p>
          </div>

          <!-- Priority slider -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">
              Recommendation Priority: {{ activityForm.priorityPercent }}%
            </label>
            <input
              v-model.number="activityForm.priorityPercent"
              type="range"
              min="0"
              max="100"
              class="w-full"
            />
            <p class="text-[11px] text-slate-400 mt-1">
              Higher priority activities are suggested first when multiple options exist.
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">
              Description (optional)
            </label>
            <textarea
              v-model="activityForm.description"
              rows="3"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="Short description of the activity."
            ></textarea>
          </div>

          <!-- Error -->
          <p v-if="activityError" class="text-[11px] text-rose-600">
            {{ activityError }}
          </p>
        </div>

        <div class="px-6 py-4 border-t flex items-center justify-end gap-2">
          <button
            type="button"
            class="rounded-lg px-3 py-2 text-xs md:text-sm border bg-white text-slate-700 hover:bg-slate-50"
            @click="closeActivityModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-lg px-4 py-2 text-xs md:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-60"
            :disabled="isSavingActivity"
            @click="saveActivity"
          >
            {{ isSavingActivity ? 'Saving...' : (isEditingActivity ? 'Save changes' : 'Add activity') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  title: 'Admin Dashboard'
})

// ---- Cities state ----
// ---- Cities state ----
const cities = ref([])
const newCityName = ref('')
const isSavingCity = ref(false)

async function loadCities () {
  try {
    const data = await $fetch('/api/cities')
    cities.value = data || []
  } catch (err) {
    console.error('Failed to load cities', err)
  }
}

async function createCity () {
  const name = newCityName.value.trim()
  if (!name) return

  isSavingCity.value = true
  try {
    const created = await $fetch('/api/cities', {
      method: 'POST',
      body: { name }
    })

    // avoid duplicates if API returned existing city
    const exists = cities.value.find((c) => c._id === created._id)
    if (!exists) {
      cities.value.push(created)
    }

    newCityName.value = ''
  } catch (err) {
    console.error('Failed to create city', err)
    alert('Failed to create city. Check console for details.')
  } finally {
    isSavingCity.value = false
  }
}

async function deleteCity (city) {
  if (!confirm(`Delete city "${city.name}"?`)) return

  try {
    await $fetch(`/api/cities/${city._id}`, {
      method: 'DELETE'
    })
    cities.value = cities.value.filter((c) => c._id !== city._id)
  } catch (err) {
    console.error('Failed to delete city', err)
    alert('Failed to delete city. Check console for details.')
  }
}







// ---- Transfers state ----
const transfers = ref([])

const isTransferModalOpen = ref(false)
const isEditingTransfer = ref(false)
const isSavingTransfer = ref(false)
const transferError = ref('')

const transferCityOptions = [
  'Arusha',
  'Moshi',
  'Kilimanjaro Airport',
  'Dar es Salaam',
  'Zanzibar',
  'Nairobi',
  'Other'
]

const transferForm = ref({
  _id: null,
  fromCity: '',
  toCity: '',
  durationHours: 1,
  costUSD: 0,
  vehicleType: 'Standard'
})

function resetTransferForm () {
  transferForm.value = {
    _id: null,
    fromCity: '',
    toCity: '',
    durationHours: 1,
    costUSD: 0,
    vehicleType: 'Standard'
  }
}

function openCreateTransfer () {
  resetTransferForm()
  isEditingTransfer.value = false
  transferError.value = ''
  isTransferModalOpen.value = true
}

function openEditTransfer (transfer) {
  transferForm.value = {
    _id: transfer._id,
    fromCity: transfer.fromCity,
    toCity: transfer.toCity,
    durationHours: transfer.durationHours,
    costUSD: transfer.costUSD,
    vehicleType: transfer.vehicleType || 'Standard'
  }
  isEditingTransfer.value = true
  transferError.value = ''
  isTransferModalOpen.value = true
}

function closeTransferModal () {
  isTransferModalOpen.value = false
}

// load all transfers from API
async function loadTransfers () {
  try {
    const data = await $fetch('/api/transfers')
    transfers.value = data || []
  } catch (err) {
    console.error('Failed to load transfers', err)
  }
}

async function saveTransfer () {
  transferError.value = ''

  if (!transferForm.value.fromCity || !transferForm.value.toCity) {
    transferError.value = 'From City and To City are required.'
    return
  }

  isSavingTransfer.value = true
  try {
    const payload = {
      fromCity: transferForm.value.fromCity,
      toCity: transferForm.value.toCity,
      durationHours: transferForm.value.durationHours,
      costUSD: transferForm.value.costUSD,
      vehicleType: transferForm.value.vehicleType
    }

    let saved

    if (isEditingTransfer.value && transferForm.value._id) {
      saved = await $fetch(`/api/transfers/${transferForm.value._id}`, {
        method: 'PATCH',
        body: payload
      })
      const idx = transfers.value.findIndex(t => t._id === saved._id)
      if (idx !== -1) transfers.value[idx] = saved
    } else {
      saved = await $fetch('/api/transfers', {
        method: 'POST',
        body: payload
      })
      transfers.value.push(saved)
    }

    closeTransferModal()
  } catch (err) {
    console.error('Failed to save transfer', err)
    transferError.value = 'Failed to save transfer. Please try again.'
  } finally {
    isSavingTransfer.value = false
  }
}

async function deleteTransfer (id) {
  if (!confirm('Are you sure you want to delete this transfer?')) return

  try {
    await $fetch(`/api/transfers/${id}`, { method: 'DELETE' })
    transfers.value = transfers.value.filter(t => t._id !== id)
  } catch (err) {
    console.error('Failed to delete transfer', err)
    alert('Failed to delete transfer. See console for details.')
  }
}




// ---- HOTEL SUMMARY (EYE ICON) ----
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

const router = useRouter()

function goToBuild(lead) {
  const id = lead._id || lead.id
  if (!id) return
  router.push(`/leads/${id}/build`)
}

// which section is currently open
const activeSection = ref('dashboard')

// sidebar nav items
const navItems = ref([
  { key: 'dashboard', label: 'Dashboard', active: true },
  { key: 'leads', label: 'Leads', active: false },
  { key: 'itineraries', label: 'Itineraries', active: false },
  { key: 'hotels', label: 'Hotels', active: false },
  { key: 'activities', label: 'Activities', active: false },
  { key: 'transfers', label: 'Transfers', active: false },
  { key: 'cities', label: 'Cities', active: false }
])

function setSection(key) {
  activeSection.value = key
  navItems.value.forEach((item) => {
    item.active = item.key === key
  })
}

// header texts depend on active section
const headerTitle = computed(() => {
  switch (activeSection.value) {
    case 'dashboard':
      return 'Dashboard Overview'
    case 'leads':
      return 'Leads Management'
    case 'itineraries':
      return 'Itineraries'
    case 'hotels':
      return 'Hotels'
    case 'activities':
      return 'Activities'
    case 'transfers':
      return 'Transfers'
    case 'cities':
      return 'Cities'
    default:
      return 'Dashboard'
  }
})

const headerSubtitle = computed(() => {
  switch (activeSection.value) {
    case 'dashboard':
      return 'Welcome to your admin dashboard'
    case 'leads':
      return 'Track and manage all travel enquiries.'
    case 'itineraries':
      return 'Review and edit created itineraries.'
    case 'hotels':
      return 'Configure hotel partners & pricing.'
    case 'activities':
      return 'Manage activities available for trips.'
    case 'transfers':
      return 'Set up transfers and local transport.'
    case 'cities':
      return 'Organise cities and regions.'
    default:
      return ''
  }
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

// stats cards (first two driven by real leads)
const stats = ref([
  {
    title: 'New Leads',
    value: 0,
    subtitle: 'Status: new',
    icon: '👥',
    colorClass: 'bg-sky-50 text-sky-600'
  },
  {
    title: 'Total Leads',
    value: 0,
    subtitle: 'All time',
    icon: '📈',
    colorClass: 'bg-emerald-50 text-emerald-600'
  },
  {
    title: 'Itineraries',
    value: 42,
    subtitle: 'Created itineraries',
    icon: '📄',
    colorClass: 'bg-violet-50 text-violet-600'
  },
  {
    title: 'Hotels',
    value: 4,
    subtitle: 'Configured hotels',
    icon: '🏨',
    colorClass: 'bg-amber-50 text-amber-600'
  },
  {
    title: 'Activities',
    value: 7,
    subtitle: 'Available activities',
    icon: '📍',
    colorClass: 'bg-rose-50 text-rose-600'
  }
])

// ---- Leads + filters (real data) ----
const leadSearch = ref('')
const leadStatusFilter = ref('all')
const leads = ref([])

const totalLeads = computed(() => leads.value.length)

function recomputeLeadStats() {
  const total = leads.value.length
  const newCount = leads.value.filter(
    (l) => (l.status || 'new') === 'new'
  ).length
  stats.value[0].value = newCount
  stats.value[1].value = total
}

const filteredLeads = computed(() => {
  return leads.value
    .filter((lead) => {
      if (leadStatusFilter.value === 'all') return true
      return (lead.status || 'new') === leadStatusFilter.value
    })
    .filter((lead) => {
      const q = leadSearch.value.trim().toLowerCase()
      if (!q) return true
      const name = (lead.name || '').toLowerCase()
      const email = (lead.email || '').toLowerCase()
      return name.includes(q) || email.includes(q)
    })
    .map((lead) => {
      const status = lead.status || 'new'
      let statusLabel = 'New'
      if (status === 'in-progress') statusLabel = 'In progress'
      else if (status === 'closed') statusLabel = 'Closed'

      let prettyDate = '—'
      if (lead.date) {
        try {
          prettyDate = new Date(lead.date).toLocaleDateString()
        } catch {
          prettyDate = lead.date
        }
      }

      return {
        ...lead,
        status,
        statusLabel,
        prettyDate
      }
    })
})

function statusPillClass(status) {
  if (status === 'new') {
    return 'bg-sky-50 text-sky-700'
  }
  if (status === 'in-progress') {
    return 'bg-amber-50 text-amber-700'
  }
  return 'bg-emerald-50 text-emerald-700'
}

// ---- Lead detail drawer state ----
const selectedLead = ref(null)
const isDetailOpen = ref(false)
const detailStatus = ref('new')
const isSavingStatus = ref(false)

function openLeadDetails(lead) {
  selectedLead.value = lead
  detailStatus.value = lead.status || 'new'
  isDetailOpen.value = true
}

function closeLeadDetails() {
  isDetailOpen.value = false
  selectedLead.value = null
}

async function saveLeadStatus() {
  if (!selectedLead.value || !selectedLead.value._id) return

  isSavingStatus.value = true
  try {
    const updated = await $fetch(`/api/leads/${selectedLead.value._id}`, {
      method: 'PATCH',
      body: { status: detailStatus.value }
    })

    const idx = leads.value.findIndex((l) => l._id === updated._id)
    if (idx !== -1) {
      leads.value[idx].status = updated.status
    }

    selectedLead.value.status = updated.status
    recomputeLeadStats()
  } catch (err) {
    console.error('Failed to update lead status', err)
    alert('Failed to update status. Please try again.')
  } finally {
    isSavingStatus.value = false
  }
}

// ---- Itineraries / Hotels demo data ----
const itineraries = [
  { id: 1, title: '7-Day Safari + Beach Escape', days: 7, travellers: 2, status: 'Draft' },
  { id: 2, title: 'Kilimanjaro Trek + Zanzibar', days: 10, travellers: 4, status: 'Confirmed' }
]

// ---- Hotels (local state for now, can connect to API later) ----
const hotels = ref([])


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
    id: Date.now(),
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


// ---- Activities data & modal state ----
const activitiesAdmin = ref([])

const activityTypes = [
  'Safari',
  'Beach',
  'City tour',
  'Trek',
  'Excursion',
  'Cultural',
  'Transfer',
  'Other'
]

const activityTimes = [
  'Morning',
  'Afternoon',
  'Full Day',
  'Evening'
]

const activityDestinations = [
  'Serengeti',
  'Ngorongoro',
  'Tarangire',
  'Lake Manyara',
  'Arusha',
  'Zanzibar',
  'Kilimanjaro',
  'Other'
]

const showActivityModal = ref(false)
const isEditingActivity = ref(false)
const isSavingActivity = ref(false)
const activityError = ref('')

const activityForm = ref({
  id: null,
  name: '',
  type: '',
  timeOfDay: '',
  costUSD: 0,
  durationMinutes: 60,
  location: '',
  priorityPercent: 50,
  code: '',
  description: '',
  isActive: true
})

function openCreateActivityModal() {
  isEditingActivity.value = false
  activityError.value = ''
  activityForm.value = {
    id: null,
    name: '',
    type: '',
    timeOfDay: '',
    costUSD: 0,
    durationMinutes: 60,
    location: '',
    priorityPercent: 50,
    code: '',
    description: '',
    isActive: true
  }
  showActivityModal.value = true
}

function openEditActivityModal(act) {
  isEditingActivity.value = true
  activityError.value = ''
  activityForm.value = {
    id: act.id,
    name: act.name,
    type: act.type || '',
    timeOfDay: act.timeOfDay || '',
    costUSD: act.costUSD || 0,
    durationMinutes: act.durationMinutes || 60,
    location: act.location || '',
    priorityPercent: act.priorityPercent ?? 50,
    code: act.code || '',
    description: act.description || '',
    isActive: act.isActive ?? true
  }
  showActivityModal.value = true
}

function closeActivityModal() {
  showActivityModal.value = false
}

async function loadActivities() {
  try {
    const acts = await $fetch('/api/activities')
    activitiesAdmin.value = acts
  } catch (err) {
    console.error('Failed to load activities', err)
  }
}

async function saveActivity() {
  activityError.value = ''
  if (!activityForm.value.name) {
    activityError.value = 'Activity name is required.'
    return
  }

  isSavingActivity.value = true
  try {
    const payload = {
      name: activityForm.value.name,
      type: activityForm.value.type,
      timeOfDay: activityForm.value.timeOfDay,
      costUSD: activityForm.value.costUSD,
      durationMinutes: activityForm.value.durationMinutes,
      location: activityForm.value.location,
      priorityPercent: activityForm.value.priorityPercent,
      code: activityForm.value.code,
      description: activityForm.value.description,
      isActive: activityForm.value.isActive
    }

    let saved
    if (isEditingActivity.value && activityForm.value.id) {
      saved = await $fetch(`/api/activities/${activityForm.value.id}`, {
        method: 'PATCH',
        body: payload
      })
      const idx = activitiesAdmin.value.findIndex(a => a.id === saved.id)
      if (idx !== -1) {
        activitiesAdmin.value[idx] = saved
      }
    } else {
      saved = await $fetch('/api/activities', {
        method: 'POST',
        body: payload
      })
      activitiesAdmin.value.unshift(saved)
    }

    closeActivityModal()
  } catch (err) {
    console.error('Failed to save activity', err)
    activityError.value = 'Failed to save activity. Check console for details.'
  } finally {
    isSavingActivity.value = false
  }
}

async function deleteActivity(actId) {
  if (!confirm('Are you sure you want to delete this activity?')) return
  try {
    await $fetch(`/api/activities/${actId}`, { method: 'DELETE' })
    activitiesAdmin.value = activitiesAdmin.value.filter(a => a.id !== actId)
  } catch (err) {
    console.error('Failed to delete activity', err)
    alert('Failed to delete activity. See console for details.')
  }
}

// ---- Initial load ----
onMounted(async () => {
  try {
    const data = await $fetch('/api/leads')
    leads.value = data || []
    recomputeLeadStats()
  } catch (err) {
    console.error('Failed to load leads', err)
  }

  await loadActivities()
  await loadTransfers()
  await loadCities()

  // load hotels
  try {
    const hotelData = await $fetch('/api/hotels')
    hotels.value = hotelData || []
  } catch (err) {
    console.error('Failed to load hotels', err)
  }
})
</script>
