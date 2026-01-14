<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- HEADER -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Group Climbs
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage group climbing adventures, dates, pricing, and availability.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <!-- Filter buttons -->
            <div class="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="px-4 py-1.5 text-xs font-medium rounded-md transition-all"
                :class="activeTab === tab.id
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Route & Difficulty Filters -->
            <div class="flex items-center gap-2">
              <!-- Route Filter -->
              <select 
                v-model="filterRoute"
                class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white"
              >
                <option value="">All Routes</option>
                <option 
                  v-for="route in routeOptions" 
                  :key="route.value"
                  :value="route.value"
                >
                  {{ route.label }}
                </option>
              </select>

              <!-- Difficulty Filter -->
              <select 
                v-model="filterDifficulty"
                class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white"
              >
                <option value="">All Difficulties</option>
                <option 
                  v-for="diff in difficultyOptions" 
                  :key="diff.value"
                  :value="diff.value"
                >
                  {{ diff.label }}
                </option>
              </select>
            </div>

            <!-- Add New Button -->
            <button
              type="button"
              @click="openCreateModal"
              class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2"
            >
              <span class="text-lg">＋</span>
              Add Group Climb
            </button>
          </div>
        </div>

        <!-- STATS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-slate-50/70 rounded-xl border border-slate-100 px-4 py-3"
          >
            <p class="text-xs text-slate-500 mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-semibold text-slate-900">{{ stat.value }}</p>
            <p class="text-xs text-slate-400 mt-1">{{ stat.description }}</p>
          </div>
        </div>

        <!-- TABLE -->
        <div class="border rounded-2xl overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">Climb Details</th>
                <th class="py-3 px-4">Dates</th>
                <th class="py-3 px-4">Group Size</th>
                <th class="py-3 px-4">Price</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="climb in filteredClimbs"
                :key="climb._id || climb.id"
                class="border-b last:border-b-0 hover:bg-slate-50/80"
              >
                <!-- Title & Categories -->
                <td class="py-3 px-4">
                  <div class="flex items-start gap-3">
                    <!-- Image -->
                    <div class="w-16 h-12 shrink-0 rounded-md overflow-hidden border border-slate-200">
                      <img
                        :src="climb.gallery?.[0] || '/images/placeholder-mountain.jpg'"
                        :alt="climb.title"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                    </div>

                    <!-- Details -->
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-slate-900 truncate">{{ climb.title }}</div>
                      <div class="text-xs text-slate-500 mt-0.5">{{ climb.slug }}</div>
                      
                      <!-- Route & Difficulty Badges -->
                      <div class="flex flex-wrap gap-1 mt-1">
                        <!-- Route Badge -->
                        <span 
                          v-if="climb.route" 
                          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          {{ getRouteLabel(climb.route) }}
                        </span>
                        
                        <!-- Difficulty Badge -->
                        <span 
                          v-if="climb.difficulty" 
                          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                          :class="getDifficultyClass(climb.difficulty)"
                        >
                          {{ getDifficultyLabel(climb.difficulty) }}
                        </span>
                      </div>
                      
                      <!-- Category Badges -->
                      <div class="flex flex-wrap gap-1 mt-1">
                        <span
                          v-for="categoryId in climb.categoryIds || []"
                          :key="categoryId"
                          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100"
                        >
                          {{ getCategoryName(categoryId) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Dates -->
                <td class="py-3 px-4">
                  <div class="text-xs text-slate-700">
                    {{ formatDate(climb.startDate) }}
                  </div>
                  <div class="text-[11px] text-slate-500">
                    {{ climb.durationDays }} days
                  </div>
                  <div
                    v-if="isUpcoming(climb)"
                    class="text-[10px] text-slate-400 mt-0.5"
                  >
                    {{ daysUntil(climb.startDate) }} days to go
                  </div>
                </td>

                <!-- Group Size -->
                <td class="py-3 px-4">
                  <div class="text-sm font-medium text-slate-900">
                    {{ climb.seatsBooked || 0 }}/{{ climb.maxGroupSize || 8 }}
                  </div>
                  <div class="text-xs" :class="spotsLeftClass(climb)">
                    {{ spotsLeft(climb) }} spots left
                  </div>
                  <div class="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div
                      :class="capacityClass(climb)"
                      class="h-full rounded-full"
                      :style="{ width: `${(climb.seatsBooked / climb.maxGroupSize) * 100}%` }"
                    ></div>
                  </div>
                </td>

                <!-- Price -->
                <td class="py-3 px-4">
                  <div class="text-sm font-semibold text-slate-900">
                    {{ formatPrice(climb.price) }}
                  </div>
                  <div class="text-xs text-slate-500">
                    {{ climb.currency || 'USD' }}
                  </div>
                </td>

                <!-- Status -->
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    :class="statusClass(climb)"
                  >
                    {{ climb.status || 'upcoming' }}
                  </span>
                  <div class="text-[10px] text-slate-400 mt-1">
                    {{ climb.isPublic ? 'Public' : 'Hidden' }}
                  </div>
                </td>

                <!-- Actions -->
                <td class="py-3 px-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <!-- Edit -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100"
                      @click.stop="openEditModal(climb)"
                      title="Edit"
                    >
                      ✎
                    </button>

                    <!-- Duplicate -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 text-blue-600"
                      @click="duplicateClimb(climb)"
                      title="Duplicate"
                    >
                      📋
                    </button>

                    <!-- Delete -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600"
                      @click="deleteClimb(climb._id)"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="!isLoading && filteredClimbs.length === 0">
                <td colspan="6" class="px-4 py-8 text-center">
                  <div class="text-slate-400">
                    <div class="text-3xl mb-2">🏔️</div>
                    <p class="text-sm font-medium text-slate-500 mb-1">
                      No group climbs found
                    </p>
                    <p class="text-xs text-slate-400 mb-3">
                      {{ activeTab === 'upcoming' ? 'No upcoming climbs.' : 'No past climbs.' }}
                    </p>
                    <button
                      @click="openCreateModal"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                    >
                      ＋ Create your first climb
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Loading State -->
              <tr v-if="isLoading">
                <td colspan="6" class="px-4 py-8 text-center">
                  <div class="flex flex-col items-center">
                    <div class="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p class="text-xs text-slate-500">Loading group climbs...</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL: Create/Edit Group Climb -->
      <transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4"
        >
          <div
            class="mt-8 mb-8 w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b bg-slate-50/70 flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">
                  {{ isEditing ? 'Edit Group Climb' : 'Add New Group Climb' }}
                </h2>
                <p class="text-xs text-slate-500">
                  {{ isEditing ? 'Update climb details' : 'Create a new group climbing adventure' }}
                </p>
              </div>
              <button
                type="button"
                class="rounded-full w-8 h-8 flex items-center justify-center border bg-white hover:bg-slate-100"
                @click="closeModal"
              >
                ✕
              </button>
            </div>

            <!-- Modal Body -->
            <div class="px-6 py-5 space-y-6">
              <!-- Title & Slug -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Title *
                  </label>
                  <input
                    v-model="form.title"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Yosemite Valley Classic"
                    :class="{ 'border-rose-300': errors.title }"
                    @input="generateSlug"
                  />
                  <p v-if="errors.title" class="mt-1 text-xs text-rose-600">
                    {{ errors.title }}
                  </p>
                </div>

                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-semibold text-slate-600">
                      URL Slug
                    </label>
                    <button
                      type="button"
                      @click="generateSlug"
                      class="text-xs text-emerald-600 hover:text-emerald-800"
                    >
                      ↻ Generate
                    </button>
                  </div>
                  <input
                    v-model="form.slug"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="yosemite-valley-classic"
                    :class="{ 'border-rose-300': errors.slug }"
                  />
                  <p class="mt-1 text-[11px] text-slate-400">
                    Auto-generated from title if empty
                  </p>
                </div>
              </div>

              <!-- Route & Difficulty -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Route
                  </label>
                  <select
                    v-model="form.route"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select a route (optional)</option>
                    <option 
                      v-for="route in routeOptions" 
                      :key="route.value"
                      :value="route.value"
                    >
                      {{ route.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Difficulty
                  </label>
                  <select
                    v-model="form.difficulty"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select difficulty (optional)</option>
                    <option 
                      v-for="diff in difficultyOptions" 
                      :key="diff.value"
                      :value="diff.value"
                    >
                      {{ diff.label }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Categories -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-xs font-semibold text-slate-600">
                    Categories
                  </label>
                  <span class="text-xs text-slate-400">
                    {{ form.categoryIds.length }} selected
                  </span>
                </div>
                
                <!-- Category Search -->
                <div class="mb-3">
                  <input
                    v-model="categorySearch"
                    type="text"
                    class="w-full border rounded-lg px-3 py-1.5 text-sm"
                    placeholder="Search categories..."
                  />
                </div>
                
                <div class="flex flex-wrap gap-3 max-h-40 overflow-y-auto p-1">
                  <label
                    v-for="category in filteredCategories"
                    :key="category.id"
                    class="inline-flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :value="category.id"
                      v-model="form.categoryIds"
                      class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span class="text-sm text-slate-700">{{ category.name }}</span>
                  </label>
                </div>
              </div>

              <!-- Dates & Duration -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Start Date *
                  </label>
                  <input
                    v-model="form.startDate"
                    type="date"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    :class="{ 'border-rose-300': errors.startDate }"
                    @change="calculateDuration"
                  />
                  <p v-if="errors.startDate" class="mt-1 text-xs text-rose-600">
                    {{ errors.startDate }}
                  </p>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    End Date
                  </label>
                  <input
                    v-model="form.endDate"
                    type="date"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    :min="form.startDate"
                    @change="calculateDuration"
                  />
                </div>

                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-semibold text-slate-600">
                      Duration (days)
                    </label>
                    <button
                      type="button"
                      @click="calculateDuration"
                      class="text-xs text-emerald-600 hover:text-emerald-800"
                    >
                      ↻ Calculate
                    </button>
                  </div>
                  <input
                    v-model.number="form.durationDays"
                    type="number"
                    min="1"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                  <p class="mt-1 text-[11px] text-slate-400">
                    Auto-calculated from dates if not set
                  </p>
                </div>
              </div>

              <!-- Group Size & Price -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Max Group Size *
                  </label>
                  <input
                    v-model.number="form.maxGroupSize"
                    type="number"
                    min="1"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    :class="{ 'border-rose-300': errors.maxGroupSize }"
                  />
                  <p v-if="errors.maxGroupSize" class="mt-1 text-xs text-rose-600">
                    {{ errors.maxGroupSize }}
                  </p>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Seats Already Booked
                  </label>
                  <input
                    v-model.number="form.seatsBooked"
                    type="number"
                    min="0"
                    :max="form.maxGroupSize"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Price (USD) *
                  </label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input
                      v-model.number="form.price"
                      type="number"
                      min="0"
                      step="0.01"
                      class="w-full border rounded-lg pl-8 pr-3 py-2 text-sm"
                      :class="{ 'border-rose-300': errors.price }"
                    />
                  </div>
                  <p v-if="errors.price" class="mt-1 text-xs text-rose-600">
                    {{ errors.price }}
                  </p>
                </div>
              </div>

              <!-- Short Description -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Short Description *
                </label>
                <textarea
                  v-model="form.shortDescription"
                  rows="3"
                  class="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Brief description for listings..."
                  :class="{ 'border-rose-300': errors.shortDescription }"
                ></textarea>
                <p v-if="errors.shortDescription" class="mt-1 text-xs text-rose-600">
                  {{ errors.shortDescription }}
                </p>
                <p class="mt-1 text-[11px] text-slate-400">
                  Keep it concise (2-3 sentences)
                </p>
              </div>

              <!-- ENHANCED: Itinerary Builder -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-xs font-semibold text-slate-600">
                    Itinerary
                  </label>
                  <button
                    type="button"
                    @click="addItineraryDay"
                    class="inline-flex items-center gap-1 px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                  >
                    ＋ Add Day
                  </button>
                </div>
                
                <div class="space-y-4">
                  <div 
                    v-for="(day, idx) in form.itinerary" 
                    :key="idx"
                    class="p-4 border rounded-lg bg-slate-50/60"
                  >
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-semibold text-slate-700">Day {{ idx + 1 }}</span>
                        <span 
                          v-if="day.dayType"
                          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100"
                        >
                          {{ day.dayType }}
                        </span>
                      </div>
                      <div class="flex gap-2">
                        <button
                          type="button"
                          @click="removeItineraryDay(idx)"
                          class="text-xs px-2 py-1 border rounded hover:bg-rose-50 text-rose-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <!-- Day Type Selector -->
                    <div class="mb-3">
                      <select
                        v-model="day.dayType"
                        class="w-full border rounded-lg px-3 py-1.5 text-sm"
                      >
                        <option value="">Select day type (optional)</option>
                        <option value="arrival">Arrival / Airport pickup</option>
                        <option value="acclimatization">Acclimatization day</option>
                        <option value="trekking">Trekking day</option>
                        <option value="summit">Summit attempt</option>
                        <option value="descent">Descent day</option>
                        <option value="departure">Departure / Airport drop-off</option>
                        <option value="rest">Rest day / Free day</option>
                        <option value="cultural">Cultural visit / Town day</option>
                      </select>
                    </div>

                    <!-- Day Title -->
                    <input
                      v-model="day.title"
                      placeholder="Day title (e.g. 'Arrival at Kilimanjaro Airport, transfer to hotel')"
                      class="w-full border rounded-lg px-3 py-2 text-sm mb-3"
                    />

                    <!-- Day Description -->
                    <textarea
                      v-model="day.description"
                      rows="3"
                      placeholder="Detailed description of the day's activities..."
                      class="w-full border rounded-lg px-3 py-2 text-sm mb-3"
                    ></textarea>

                    <!-- Elevation & Distance Info -->
                    <div class="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label class="block text-xs text-slate-600 mb-1">Start Elevation (m)</label>
                        <input
                          v-model.number="day.startElevation"
                          type="number"
                          placeholder="e.g. 1800"
                          class="w-full border rounded-lg px-3 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-xs text-slate-600 mb-1">End Elevation (m)</label>
                        <input
                          v-model.number="day.endElevation"
                          type="number"
                          placeholder="e.g. 2700"
                          class="w-full border rounded-lg px-3 py-1.5 text-sm"
                        />
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label class="block text-xs text-slate-600 mb-1">Distance (km)</label>
                        <input
                          v-model.number="day.distance"
                          type="number"
                          step="0.1"
                          placeholder="e.g. 12.5"
                          class="w-full border rounded-lg px-3 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-xs text-slate-600 mb-1">Hiking Time (hrs)</label>
                        <input
                          v-model.number="day.hikingTime"
                          type="number"
                          step="0.5"
                          placeholder="e.g. 5.5"
                          class="w-full border rounded-lg px-3 py-1.5 text-sm"
                        />
                      </div>
                    </div>

                    <!-- Daily Activities -->
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <label class="block text-xs font-semibold text-slate-600">
                          Daily Activities
                        </label>
                        <span class="text-xs text-slate-400">
                          {{ day.activities?.length || 0 }} activities
                        </span>
                      </div>
                      
                      <div class="flex gap-2 mb-3">
                        <input
                          v-model="day.activityInput"
                          @keydown.enter="addDayActivity(idx)"
                          @input="filterActivitySuggestions(idx)"
                          type="text"
                          class="w-full border rounded-lg px-3 py-1.5 text-sm"
                          placeholder="Type activity and press Enter"
                        />
                        <button
                          type="button"
                          @click="addDayActivity(idx)"
                          class="px-3 py-1.5 border rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm"
                        >
                          Add
                        </button>
                      </div>

                      <!-- Activity Suggestions -->
                      <div 
                        v-if="itineraryActivitySuggestions[idx] && itineraryActivitySuggestions[idx].length"
                        class="mb-3"
                      >
                        <div class="text-xs text-slate-500 mb-1">Suggestions:</div>
                        <div class="flex gap-2 flex-wrap">
                          <button
                            v-for="s in itineraryActivitySuggestions[idx]"
                            :key="s"
                            type="button"
                            class="px-2 py-1 bg-white border rounded text-xs hover:bg-emerald-50"
                            @click="useActivitySuggestion(idx, s)"
                          >
                            {{ s }}
                          </button>
                        </div>
                      </div>

                      <!-- Selected Activities -->
                      <div class="flex gap-2 flex-wrap">
                        <span
                          v-for="(act, actIdx) in day.activities"
                          :key="act + actIdx"
                          class="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100"
                        >
                          {{ act }}
                          <button
                            @click="removeDayActivity(idx, actIdx)"
                            type="button"
                            class="ml-2 text-emerald-700 hover:text-emerald-900"
                          >
                            ✕
                          </button>
                        </span>
                      </div>
                    </div>

                    <!-- Accommodations (Array) -->
                    <div class="mt-4">
                      <div class="flex items-center justify-between mb-2">
                        <label class="block text-xs font-semibold text-slate-600">
                          Accommodations
                        </label>
                        <span class="text-xs text-slate-400">
                          {{ day.accommodations?.length || 0 }} accommodations
                        </span>
                      </div>
                      
                      <div class="flex gap-2 mb-3">
                        <input
                          v-model="day.accommodationInput"
                          @keydown.enter="addDayAccommodation(idx)"
                          @input="filterAccommodationSuggestions(idx)"
                          type="text"
                          class="w-full border rounded-lg px-3 py-1.5 text-sm"
                          placeholder="Type accommodation and press Enter"
                        />
                        <button
                          type="button"
                          @click="addDayAccommodation(idx)"
                          class="px-3 py-1.5 border rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm"
                        >
                          Add
                        </button>
                      </div>

                      <!-- Accommodation Suggestions -->
                      <div 
                        v-if="accommodationSuggestions[idx] && accommodationSuggestions[idx].length"
                        class="mb-3"
                      >
                        <div class="text-xs text-slate-500 mb-1">Suggestions:</div>
                        <div class="flex gap-2 flex-wrap">
                          <button
                            v-for="s in accommodationSuggestions[idx]"
                            :key="s"
                            type="button"
                            class="px-2 py-1 bg-white border rounded text-xs hover:bg-blue-50"
                            @click="useAccommodationSuggestion(idx, s)"
                          >
                            {{ s }}
                          </button>
                        </div>
                      </div>

                      <!-- Selected Accommodations -->
                      <div class="flex gap-2 flex-wrap">
                        <span
                          v-for="(acc, accIdx) in day.accommodations"
                          :key="acc + accIdx"
                          class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100"
                        >
                          {{ acc }}
                          <button
                            @click="removeDayAccommodation(idx, accIdx)"
                            type="button"
                            class="ml-2 text-blue-700 hover:text-blue-900"
                          >
                            ✕
                          </button>
                        </span>
                      </div>
                    </div>

                    <!-- Meals (Array) -->
                    <div class="mt-4">
                      <div class="flex items-center justify-between mb-2">
                        <label class="block text-xs font-semibold text-slate-600">
                          Meals Included
                        </label>
                        <span class="text-xs text-slate-400">
                          {{ day.mealsArray?.length || 0 }} meals
                        </span>
                      </div>
                      
                      <div class="flex gap-2 mb-3">
                        <input
                          v-model="day.mealInput"
                          @keydown.enter="addDayMeal(idx)"
                          @input="filterMealSuggestions(idx)"
                          type="text"
                          class="w-full border rounded-lg px-3 py-1.5 text-sm"
                          placeholder="Type meal and press Enter"
                        />
                        <button
                          type="button"
                          @click="addDayMeal(idx)"
                          class="px-3 py-1.5 border rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-sm"
                        >
                          Add
                        </button>
                      </div>

                      <!-- Meal Suggestions -->
                      <div 
                        v-if="mealSuggestions[idx] && mealSuggestions[idx].length"
                        class="mb-3"
                      >
                        <div class="text-xs text-slate-500 mb-1">Suggestions:</div>
                        <div class="flex gap-2 flex-wrap">
                          <button
                            v-for="s in mealSuggestions[idx]"
                            :key="s"
                            type="button"
                            class="px-2 py-1 bg-white border rounded text-xs hover:bg-green-50"
                            @click="useMealSuggestion(idx, s)"
                          >
                            {{ s }}
                          </button>
                        </div>
                      </div>

                      <!-- Selected Meals -->
                      <div class="flex gap-2 flex-wrap">
                        <span
                          v-for="(meal, mealIdx) in day.mealsArray"
                          :key="meal + mealIdx"
                          class="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100"
                        >
                          {{ meal }}
                          <button
                            @click="removeDayMeal(idx, mealIdx)"
                            type="button"
                            class="ml-2 text-green-700 hover:text-green-900"
                          >
                            ✕
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div 
                    v-if="!form.itinerary.length"
                    class="text-center py-8 border-2 border-dashed border-slate-300 rounded-xl"
                  >
                    <span class="text-2xl">🗺️</span>
                    <p class="text-sm text-slate-500 mt-2">No itinerary days added yet</p>
                    <p class="text-xs text-slate-400 mt-1">
                      Add days to create a detailed climb itinerary
                    </p>
                    <button
                      @click="addItineraryDay"
                      class="mt-3 inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                    >
                      ＋ Add First Day
                    </button>
                  </div>
                </div>
              </div>

              <!-- Included & Not Included -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-2">
                    What's Included
                  </label>
                  <div class="space-y-2">
                    <div
                      v-for="(item, index) in form.included"
                      :key="index"
                      class="flex items-center gap-2"
                    >
                      <input
                        v-model="form.included[index]"
                        type="text"
                        class="flex-1 border rounded-lg px-3 py-1.5 text-sm"
                        placeholder="Professional guide services"
                      />
                      <button
                        type="button"
                        @click="removeIncluded(index)"
                        class="p-1 text-rose-500 hover:text-rose-700"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                    <button
                      type="button"
                      @click="addIncluded"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100"
                    >
                      ＋ Add included item
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-2">
                    Not Included
                  </label>
                  <div class="space-y-2">
                    <div
                      v-for="(item, index) in form.notIncluded"
                      :key="index"
                      class="flex items-center gap-2"
                    >
                      <input
                        v-model="form.notIncluded[index]"
                        type="text"
                        class="flex-1 border rounded-lg px-3 py-1.5 text-sm"
                        placeholder="Personal climbing gear"
                      />
                      <button
                        type="button"
                        @click="removeNotIncluded(index)"
                        class="p-1 text-rose-500 hover:text-rose-700"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                    <button
                      type="button"
                      @click="addNotIncluded"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100"
                    >
                      ＋ Add excluded item
                    </button>
                  </div>
                </div>
              </div>

              <!-- Gallery Images -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-2">
                  Gallery Images
                </label>
                <div class="space-y-4">
                  <!-- Featured Image -->
                  <div class="border rounded-xl p-4 bg-slate-50/60">
                    <label class="block text-xs font-semibold text-slate-600 mb-2">
                      Featured Image (First image in gallery)
                    </label>
                    <div class="flex items-start gap-4">
                      <div
                        v-if="form.featuredImage"
                        class="w-48 h-32 rounded-lg overflow-hidden border border-slate-200"
                      >
                        <img
                          :src="form.featuredImage"
                          alt="Featured"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <div v-else class="w-48 h-32 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <span class="text-slate-400 text-sm">No image</span>
                      </div>
                      <div class="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          @change="onFeaturedImageSelected"
                          class="text-sm"
                        />
                        <p class="mt-2 text-[11px] text-slate-400">
                          This will be the first image in the gallery. Recommended size: 1200×800
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Additional Images -->
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <label class="text-xs font-semibold text-slate-600">
                        Additional Images
                      </label>
                      <button
                        type="button"
                        @click="triggerGalleryUpload"
                        class="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                      >
                        ＋ Add Images
                      </button>
                    </div>

                    <input
                      ref="galleryInput"
                      type="file"
                      accept="image/*"
                      multiple
                      @change="onGalleryImagesSelected"
                      class="hidden"
                    />

                    <div v-if="form.gallery.length > 1" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      <div
                        v-for="(image, index) in form.gallery.slice(1)"
                        :key="index"
                        class="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group"
                      >
                        <img
                          :src="image"
                          :alt="`Gallery image ${index + 1}`"
                          class="w-full h-full object-cover"
                        />
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div class="flex gap-2">
                            <button
                              type="button"
                              @click="moveImageUp(index + 1)"
                              class="p-1.5 bg-white/90 rounded-full hover:bg-white"
                              title="Move up"
                              :disabled="index === 0"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              @click="removeGalleryImage(index + 1)"
                              class="p-1.5 bg-white/90 rounded-full hover:bg-white"
                              title="Remove"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        <div class="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                          {{ index + 2 }}
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-center py-8 border-2 border-dashed border-slate-300 rounded-xl">
                      <span class="text-2xl">🖼️</span>
                      <p class="text-sm text-slate-500 mt-2">No additional images</p>
                      <p class="text-xs text-slate-400 mt-1">Add images to show in the gallery</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status & Visibility -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-2">
                    Status
                  </label>
                  <select
                    v-model="form.status"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="open">Open for booking</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-2">
                    Visibility
                  </label>
                  <div class="flex items-center gap-3">
                    <label class="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        v-model="form.isPublic"
                        class="rounded border-slate-300 text-emerald-600"
                      />
                      <span class="text-sm text-slate-700">
                        {{ form.isPublic ? 'Public (visible on website)' : 'Hidden (admin only)' }}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

             <!-- Organizer Info - UPDATED: Only name, no email -->
<div class="border rounded-xl p-4 bg-slate-50/60">
  <h3 class="text-xs font-semibold text-slate-600 mb-3">
    Organizer Information
  </h3>
  <div class="grid grid-cols-1 gap-4">
    <div>
      <label class="block text-xs text-slate-600 mb-1">
        Organizer Name (Optional)
      </label>
      <input
        v-model="form.organizer.name"
        type="text"
        class="w-full border rounded-lg px-3 py-2 text-sm"
        placeholder="e.g. Adventure Experts, Mountain Guides"
      />
      <p class="mt-1 text-[11px] text-slate-400">
        Display name only. Contact information is handled through the booking form.
      </p>
    </div>
  </div>
</div>

              <!-- Error Message -->
              <div v-if="error" class="p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <p class="text-xs text-rose-600">{{ error }}</p>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 border-t bg-slate-50/70 flex items-center justify-between">
              <div class="text-[11px] text-slate-500">
                Fields marked with * are required
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="rounded-lg px-4 py-2 text-xs font-semibold border bg-white text-slate-700 hover:bg-slate-100"
                  @click="closeModal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  :disabled="isSaving"
                  class="rounded-lg px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60"
                  @click="saveClimb"
                >
                  <span v-if="isSaving">Saving...</span>
                  <span v-else>{{ isEditing ? 'Save Changes' : 'Create Climb' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Group Climbs'
})

/* -------------------------
   HARDCODED CATEGORY OPTIONS
------------------------- */
const CATEGORY_OPTIONS = [
  // Kilimanjaro routes
  { id: 'kilimanjaro-lemosho', name: 'Kilimanjaro — Lemosho' },
  { id: 'kilimanjaro-machame', name: 'Kilimanjaro — Machame' },
  { id: 'kilimanjaro-rongai', name: 'Kilimanjaro — Rongai' },
  { id: 'kilimanjaro-northern', name: 'Kilimanjaro — Northern Circuit' },
  { id: 'kilimanjaro-marangu', name: 'Kilimanjaro — Marangu' },
  { id: 'kilimanjaro-umbwe', name: 'Kilimanjaro — Umbwe' },
  { id: 'kilimanjaro-expedition', name: 'Kilimanjaro — Expedition / Crater' },

  // Trip type
  { id: 'group-departure', name: 'Group Departure' },
  { id: 'private-departure', name: 'Private Departure' },
  { id: 'multi-day', name: 'Multi-day / Expedition' },
  { id: 'day-trip', name: 'Day Trip / Excursion' },

  // Activity / focus
  { id: 'summit', name: 'Summit Attempt' },
  { id: 'acclimatization', name: 'Acclimatization' },
  { id: 'trekking', name: 'Trekking & Hiking' },
  { id: 'birdwatching', name: 'Birdwatching' },
  { id: 'photography', name: 'Photography' },

  // Comfort / accommodation
  { id: 'camping-basic', name: 'Camping (Basic)' },
  { id: 'camping-comfort', name: 'Camping (Comfort / Glamping)' },
  { id: 'lodge', name: 'Lodge / Permanent Tents' },

  // Difficulty / audience
  { id: 'easy', name: 'Easy' },
  { id: 'moderate', name: 'Moderate' },
  { id: 'challenging', name: 'Challenging / High altitude' },
  { id: 'family-friendly', name: 'Family Friendly' },
  { id: 'honeymoon', name: 'Honeymoon / Couples' },

  // Add-ons / region
  { id: 'safari-addon', name: 'Safari Add-on' },
  { id: 'zanzibar', name: 'Zanzibar / Sea Extension' },
  { id: 'cultural', name: 'Cultural Excursions' }
]

/* -------------------------
   ROUTE & DIFFICULTY OPTIONS
------------------------- */
const routeOptions = [
  { value: 'lemosho', label: 'Lemosho' },
  { value: 'machame', label: 'Machame' },
  { value: 'rongai', label: 'Rongai' },
  { value: 'northern', label: 'Northern Circuit' },
  { value: 'marangu', label: 'Marangu' },
  { value: 'umbwe', label: 'Umbwe' },
  { value: 'expedition', label: 'Expedition / Crater' }
]

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'challenging', label: 'Challenging' }
]

/* -------------------------
   ACTIVITY SUGGESTIONS FOR CLIMBS
------------------------- */
const climbActivitySuggestions = [
  'Mountain briefing', 'Gear check', 'National park registration', 'Acclimatization hike',
  'Summit attempt', 'Glacier crossing', 'Rock scrambling', 'River crossing',
  'Wildlife spotting', 'Bird watching', 'Photography session', 'Stargazing',
  'Camp setup', 'Tent pitching', 'Cooking demonstration', 'First aid briefing',
  'Altitude sickness talk', 'Leave No Trace talk', 'Cultural interaction',
  'Local market visit', 'Waterfall visit', 'Hot springs', 'Cable car ride',
  'Helicopter tour', 'Safari drive', 'Beach relaxation', 'Snorkeling',
  'Scuba diving', 'Kayaking', 'Fishing', 'Sunrise viewing', 'Sunset viewing'
]

/* -------------------------
   SUGGESTIONS FOR ACCOMMODATIONS & MEALS
------------------------- */
const accommodationSuggestionsList = [
  'Mountain tents', 'Lodge rooms', 'Hotel', 'Guesthouse', 'Homestay',
  'Camping (basic)', 'Camping (comfort)', 'Permanent tents', 'Dormitory',
  'Private room', 'Shared room', 'Bunk beds', 'Sleeping bags', 'Teepee',
  'Cabin', 'Bungalow', 'Eco-lodge', 'Mountain hut', 'Alpine shelter'
]

const mealSuggestionsList = [
  'Breakfast (B)', 'Lunch (L)', 'Dinner (D)', 'Snacks', 'Tea/Coffee',
  'Energy bars', 'Fruits', 'Sandwiches', 'Hot meals', 'Vegetarian option',
  'Vegan option', 'Local cuisine', 'Western meals', 'Picnic lunch',
  'Buffet dinner', 'BBQ', 'Packed lunch', 'Tea house meals'
]

/* -------------------------
   STATE
------------------------- */
const groupClimbs = ref([])
const isLoading = ref(false)
const error = ref('')
const isSaving = ref(false)
const isUploading = ref(false)

/* -------------------------
   FILTERS
------------------------- */
const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'all', label: 'All' }
]
const activeTab = ref('upcoming')
const filterRoute = ref('')
const filterDifficulty = ref('')
const categorySearch = ref('')

/* -------------------------
   COMPUTED PROPERTIES
------------------------- */
const filteredClimbs = computed(() => {
  const now = new Date()
  
  return groupClimbs.value.filter(climb => {
    // Tab filtering
    if (activeTab.value !== 'all') {
      const startDate = new Date(climb.startDate)
      const isUpcoming = startDate > now
      
      if (activeTab.value === 'upcoming' && !isUpcoming) return false
      if (activeTab.value === 'past' && isUpcoming) return false
    }
    
    // Route filtering
    if (filterRoute.value && climb.route !== filterRoute.value) {
      return false
    }
    
    // Difficulty filtering
    if (filterDifficulty.value && climb.difficulty !== filterDifficulty.value) {
      return false
    }
    
    return true
  })
})

const filteredCategories = computed(() => {
  const search = categorySearch.value.toLowerCase()
  if (!search) return CATEGORY_OPTIONS
  
  return CATEGORY_OPTIONS.filter(category => 
    category.name.toLowerCase().includes(search) ||
    (category.id && category.id.toLowerCase().includes(search))
  )
})

/* -------------------------
   HELPER FUNCTIONS
------------------------- */
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatPrice = (price) => {
  if (!price && price !== 0) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const daysUntil = (dateString) => {
  if (!dateString) return 0
  const now = new Date()
  const date = new Date(dateString)
  const diffTime = date.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const isUpcoming = (climb) => {
  if (!climb.startDate) return false
  return new Date(climb.startDate) > new Date()
}

const spotsLeft = (climb) => {
  const max = climb.maxGroupSize || 0
  const booked = climb.seatsBooked || 0
  return Math.max(0, max - booked)
}

const spotsLeftClass = (climb) => {
  const left = spotsLeft(climb)
  if (left <= 2) return 'text-rose-600 font-semibold'
  if (left <= 5) return 'text-amber-600'
  return 'text-emerald-600'
}

const capacityClass = (climb) => {
  const percentage = (climb.seatsBooked || 0) / (climb.maxGroupSize || 1)
  if (percentage >= 0.9) return 'bg-rose-500'
  if (percentage >= 0.7) return 'bg-amber-500'
  return 'bg-emerald-500'
}

const statusClass = (climb) => {
  const status = climb.status || 'upcoming'
  switch (status) {
    case 'upcoming': return 'bg-blue-50 text-blue-700'
    case 'open': return 'bg-emerald-50 text-emerald-700'
    case 'ongoing': return 'bg-amber-50 text-amber-700'
    case 'completed': return 'bg-slate-50 text-slate-700'
    case 'cancelled': return 'bg-rose-50 text-rose-700'
    default: return 'bg-slate-50 text-slate-700'
  }
}

const getCategoryName = (categoryId) => {
  const category = CATEGORY_OPTIONS.find(c => c.id === categoryId)
  return category ? category.name : categoryId
}

const getRouteLabel = (routeValue) => {
  const route = routeOptions.find(r => r.value === routeValue)
  return route ? route.label : routeValue
}

const getDifficultyLabel = (difficultyValue) => {
  const diff = difficultyOptions.find(d => d.value === difficultyValue)
  return diff ? diff.label : difficultyValue
}

const getDifficultyClass = (difficultyValue) => {
  switch (difficultyValue) {
    case 'easy': return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    case 'moderate': return 'bg-amber-50 text-amber-700 border border-amber-100'
    case 'challenging': return 'bg-rose-50 text-rose-700 border border-rose-100'
    default: return 'bg-slate-50 text-slate-700 border border-slate-100'
  }
}

const handleImageError = (event) => {
  event.target.src = '/images/placeholder-mountain.jpg'
}

/* -------------------------
   STATS
------------------------- */
const stats = computed(() => {
  const now = new Date()
  const upcoming = groupClimbs.value.filter(c => new Date(c.startDate) > now).length
  const active = groupClimbs.value.filter(c => c.status === 'open' || c.status === 'ongoing').length
  const totalSpots = groupClimbs.value.reduce((sum, c) => sum + (c.maxGroupSize || 0), 0)
  const bookedSpots = groupClimbs.value.reduce((sum, c) => sum + (c.seatsBooked || 0), 0)
  
  return [
    {
      label: 'Total Climbs',
      value: groupClimbs.value.length,
      description: 'All group climbs'
    },
    {
      label: 'Upcoming',
      value: upcoming,
      description: 'Future climbs'
    },
    {
      label: 'Active',
      value: active,
      description: 'Open for booking'
    },
    {
      label: 'Booked Spots',
      value: `${bookedSpots}/${totalSpots}`,
      description: 'Total bookings'
    }
  ]
})

/* -------------------------
   LOAD DATA
------------------------- */
async function loadData() {
  isLoading.value = true
  error.value = ''
  
  try {
    // Load group climbs
    const climbsResponse = await $fetch('/api/groupclimb')
    if (climbsResponse?.ok && Array.isArray(climbsResponse.data)) {
      groupClimbs.value = climbsResponse.data
    } else if (Array.isArray(climbsResponse)) {
      groupClimbs.value = climbsResponse
    } else {
      groupClimbs.value = []
    }
  } catch (err) {
    console.error('Failed to load data:', err)
    error.value = 'Failed to load group climbs. Please try again.'
    groupClimbs.value = []
  } finally {
    isLoading.value = false
  }
}

/* -------------------------
   MODAL STATE
------------------------- */
const showModal = ref(false)
const isEditing = ref(false)
const form = ref(getEmptyForm())
const errors = ref({})

// Itinerary activity suggestions per day
const itineraryActivitySuggestions = reactive({})
// Accommodation and meal suggestions per day
const accommodationSuggestions = reactive({})
const mealSuggestions = reactive({})

function getEmptyForm() {
  return {
    title: '',
    slug: '',
    categoryIds: [],
    route: '',
    difficulty: '',
    startDate: '',
    endDate: '',
    durationDays: 0,
    maxGroupSize: 8,
    seatsBooked: 0,
    price: 0,
    currency: 'USD',
    shortDescription: '',
    itinerary: [],
    included: ['Professional guide services', 'All climbing equipment'],
    notIncluded: ['Transportation', 'Personal insurance', 'Alcoholic beverages'],
    gallery: [],
    featuredImage: '',
    status: 'upcoming',
    isPublic: true,
    organizer: {
      name: '' // Only name, no email
    }
  }
}

function generateSlug() {
  if (!form.value.title) return
  
  // Auto-generate slug from title if empty
  if (!form.value.slug || form.value.slug === '') {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

function calculateDuration() {
  if (form.value.startDate && form.value.endDate) {
    const start = new Date(form.value.startDate)
    const end = new Date(form.value.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    form.value.durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  } else if (form.value.durationDays <= 0 && form.value.startDate) {
    // Default to 1 day if no end date
    form.value.durationDays = 1
  }
}

/* -------------------------
   ACTIVITY FUNCTIONS
------------------------- */
function addDayActivity(dayIndex) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  const input = (day.activityInput || '').trim()
  if (!input) return
  
  // Initialize activities array if needed
  if (!Array.isArray(day.activities)) {
    day.activities = []
  }
  
  // Add activity if not already in the array
  if (!day.activities.includes(input)) {
    day.activities.push(input)
  }
  
  // Clear input
  day.activityInput = ''
  
  // Clear suggestions
  itineraryActivitySuggestions[dayIndex] = []
}

function useActivitySuggestion(dayIndex, suggestion) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  if (!Array.isArray(day.activities)) {
    day.activities = []
  }
  
  if (!day.activities.includes(suggestion)) {
    day.activities.push(suggestion)
  }
  
  day.activityInput = ''
  itineraryActivitySuggestions[dayIndex] = []
}

function filterActivitySuggestions(dayIndex) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  const query = (day.activityInput || '').toLowerCase()
  if (!query) {
    itineraryActivitySuggestions[dayIndex] = []
    return
  }
  
  const matched = climbActivitySuggestions
    .filter(suggestion => suggestion.toLowerCase().includes(query))
    .slice(0, 8)
  
  itineraryActivitySuggestions[dayIndex] = matched
}

function removeDayActivity(dayIndex, activityIndex) {
  if (form.value.itinerary[dayIndex]) {
    form.value.itinerary[dayIndex].activities.splice(activityIndex, 1)
  }
}

/* -------------------------
   ACCOMMODATION FUNCTIONS
------------------------- */
function addDayAccommodation(dayIndex) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  const input = (day.accommodationInput || '').trim()
  if (!input) return
  
  // Initialize accommodations array if needed
  if (!Array.isArray(day.accommodations)) {
    day.accommodations = []
  }
  
  // Add accommodation if not already in the array
  if (!day.accommodations.includes(input)) {
    day.accommodations.push(input)
  }
  
  // Clear input
  day.accommodationInput = ''
  
  // Clear suggestions
  accommodationSuggestions[dayIndex] = []
}

function useAccommodationSuggestion(dayIndex, suggestion) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  if (!Array.isArray(day.accommodations)) {
    day.accommodations = []
  }
  
  if (!day.accommodations.includes(suggestion)) {
    day.accommodations.push(suggestion)
  }
  
  day.accommodationInput = ''
  accommodationSuggestions[dayIndex] = []
}

function filterAccommodationSuggestions(dayIndex) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  const query = (day.accommodationInput || '').toLowerCase()
  if (!query) {
    accommodationSuggestions[dayIndex] = []
    return
  }
  
  const matched = accommodationSuggestionsList
    .filter(suggestion => suggestion.toLowerCase().includes(query))
    .slice(0, 6)
  
  accommodationSuggestions[dayIndex] = matched
}

function removeDayAccommodation(dayIndex, accommodationIndex) {
  if (form.value.itinerary[dayIndex]) {
    form.value.itinerary[dayIndex].accommodations.splice(accommodationIndex, 1)
  }
}

/* -------------------------
   MEAL FUNCTIONS
------------------------- */
function addDayMeal(dayIndex) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  const input = (day.mealInput || '').trim()
  if (!input) return
  
  // Initialize meals array if needed
  if (!Array.isArray(day.mealsArray)) {
    day.mealsArray = []
  }
  
  // Add meal if not already in the array
  if (!day.mealsArray.includes(input)) {
    day.mealsArray.push(input)
  }
  
  // Clear input
  day.mealInput = ''
  
  // Clear suggestions
  mealSuggestions[dayIndex] = []
}

function useMealSuggestion(dayIndex, suggestion) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  if (!Array.isArray(day.mealsArray)) {
    day.mealsArray = []
  }
  
  if (!day.mealsArray.includes(suggestion)) {
    day.mealsArray.push(suggestion)
  }
  
  day.mealInput = ''
  mealSuggestions[dayIndex] = []
}

function filterMealSuggestions(dayIndex) {
  const day = form.value.itinerary[dayIndex]
  if (!day) return
  
  const query = (day.mealInput || '').toLowerCase()
  if (!query) {
    mealSuggestions[dayIndex] = []
    return
  }
  
  const matched = mealSuggestionsList
    .filter(suggestion => suggestion.toLowerCase().includes(query))
    .slice(0, 6)
  
  mealSuggestions[dayIndex] = matched
}

function removeDayMeal(dayIndex, mealIndex) {
  if (form.value.itinerary[dayIndex]) {
    form.value.itinerary[dayIndex].mealsArray.splice(mealIndex, 1)
  }
}

/* -------------------------
   MODAL FUNCTIONS
------------------------- */
function openCreateModal() {
  isEditing.value = false
  form.value = getEmptyForm()
  errors.value = {}
  categorySearch.value = ''
  // Clear all suggestions
  Object.keys(itineraryActivitySuggestions).forEach(k => delete itineraryActivitySuggestions[k])
  Object.keys(accommodationSuggestions).forEach(k => delete accommodationSuggestions[k])
  Object.keys(mealSuggestions).forEach(k => delete mealSuggestions[k])
  showModal.value = true
}

function openEditModal(climb) {
  isEditing.value = true
  errors.value = {}
  categorySearch.value = ''
  
  // Clear all suggestions
  Object.keys(itineraryActivitySuggestions).forEach(k => delete itineraryActivitySuggestions[k])
  Object.keys(accommodationSuggestions).forEach(k => delete accommodationSuggestions[k])
  Object.keys(mealSuggestions).forEach(k => delete mealSuggestions[k])
  
  // Deep clone the climb object
  const cloned = JSON.parse(JSON.stringify(climb))
  
  // Ensure arrays are properly initialized
  cloned.categoryIds = Array.isArray(cloned.categoryIds) ? cloned.categoryIds : []
  cloned.included = Array.isArray(cloned.included) ? cloned.included : []
  cloned.notIncluded = Array.isArray(cloned.notIncluded) ? cloned.notIncluded : []
  cloned.gallery = Array.isArray(cloned.gallery) ? cloned.gallery : []
  cloned.itinerary = Array.isArray(cloned.itinerary) ? cloned.itinerary : []
  
  // Initialize itinerary days with new array fields
  cloned.itinerary = cloned.itinerary.map(day => ({
    ...day,
    activityInput: '',
    activities: Array.isArray(day.activities) ? day.activities : [],
    // Handle both string and array formats for accommodations
    accommodations: Array.isArray(day.accommodations) ? day.accommodations : 
                    (day.accommodation ? [day.accommodation] : []),
    accommodationInput: '',
    // Handle both string and array formats for meals  
    mealsArray: Array.isArray(day.meals) ? day.meals : 
                (typeof day.meals === 'string' && day.meals ? day.meals.split(',').map(m => m.trim()).filter(m => m) : []),
    mealInput: ''
  }))
  
  // Set featured image
  cloned.featuredImage = cloned.gallery[0] || ''
  
  // Format dates
  if (cloned.startDate) {
    cloned.startDate = new Date(cloned.startDate).toISOString().split('T')[0]
  }
  if (cloned.endDate) {
    cloned.endDate = new Date(cloned.endDate).toISOString().split('T')[0]
  }
  
 cloned.organizer = cloned.organizer || { name: '' }
// Remove email if it exists in old data
if (cloned.organizer.email) {
  delete cloned.organizer.email
}
  
  form.value = cloned
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  errors.value = {}
  error.value = ''
  categorySearch.value = ''
  // Clear all suggestions
  Object.keys(itineraryActivitySuggestions).forEach(k => delete itineraryActivitySuggestions[k])
  Object.keys(accommodationSuggestions).forEach(k => delete accommodationSuggestions[k])
  Object.keys(mealSuggestions).forEach(k => delete mealSuggestions[k])
}

/* -------------------------
   FORM VALIDATION
------------------------- */
function validateForm() {
  errors.value = {}
  
  if (!form.value.title?.trim()) {
    errors.value.title = 'Title is required'
  }
  
  if (!form.value.startDate) {
    errors.value.startDate = 'Start date is required'
  } else if (new Date(form.value.startDate) < new Date()) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (new Date(form.value.startDate) < today && !isEditing.value) {
      errors.value.startDate = 'Start date cannot be in the past'
    }
  }
  
  if (form.value.endDate && new Date(form.value.endDate) < new Date(form.value.startDate)) {
    errors.value.endDate = 'End date cannot be before start date'
  }
  
  if (!form.value.maxGroupSize || form.value.maxGroupSize < 1) {
    errors.value.maxGroupSize = 'Group size must be at least 1'
  }
  
  if (form.value.seatsBooked > form.value.maxGroupSize) {
    errors.value.seatsBooked = 'Cannot have more bookings than group size'
  }
  
  if (!form.value.price && form.value.price !== 0) {
    errors.value.price = 'Price is required'
  } else if (form.value.price < 0) {
    errors.value.price = 'Price cannot be negative'
  }
  
  if (!form.value.shortDescription?.trim()) {
    errors.value.shortDescription = 'Short description is required'
  }
  
  return Object.keys(errors.value).length === 0
}

/* -------------------------
   ITINERARY BUILDER FUNCTIONS
------------------------- */
function addItineraryDay() {
  const nextDayNumber = form.value.itinerary.length + 1
  form.value.itinerary.push({
    day: nextDayNumber,
    title: `Day ${nextDayNumber}`,
    description: '',
    activities: [],
    activityInput: '',
    // NEW FIELDS:
    accommodations: [],
    accommodationInput: '',
    mealsArray: [],
    mealInput: '',
    // Existing fields:
    dayType: '',
    startElevation: null,
    endElevation: null,
    distance: null,
    hikingTime: null
  })
  // Initialize suggestions for this day
  itineraryActivitySuggestions[form.value.itinerary.length - 1] = []
  accommodationSuggestions[form.value.itinerary.length - 1] = []
  mealSuggestions[form.value.itinerary.length - 1] = []
}

function removeItineraryDay(index) {
  form.value.itinerary.splice(index, 1)
  // Re-number days
  form.value.itinerary.forEach((day, i) => {
    day.day = i + 1
  })
  delete itineraryActivitySuggestions[index]
  delete accommodationSuggestions[index]
  delete mealSuggestions[index]
}

/* -------------------------
   INCLUDED/EXCLUDED ITEMS
------------------------- */
function addIncluded() {
  form.value.included.push('')
}

function removeIncluded(index) {
  form.value.included.splice(index, 1)
}

function addNotIncluded() {
  form.value.notIncluded.push('')
}

function removeNotIncluded(index) {
  form.value.notIncluded.splice(index, 1)
}

/* -------------------------
   IMAGE HANDLING
------------------------- */
const galleryInput = ref(null)

function triggerGalleryUpload() {
  galleryInput.value?.click()
}

async function uploadImage(file) {
  isUploading.value = true
  try {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await $fetch('/api/groupclimb/upload', {
      method: 'POST',
      body: formData
    })
    
    return response?.url || null
  } catch (err) {
    console.error('Image upload failed:', err)
    return null
  } finally {
    isUploading.value = false
  }
}

async function onFeaturedImageSelected(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const imageUrl = await uploadImage(file)
  if (imageUrl) {
    form.value.featuredImage = imageUrl
    // Add to gallery if not already there
    if (!form.value.gallery.includes(imageUrl)) {
      form.value.gallery.unshift(imageUrl)
    }
  }
  
  event.target.value = ''
}

async function onGalleryImagesSelected(event) {
  const files = Array.from(event.target.files)
  if (!files.length) return
  
  for (const file of files) {
    const imageUrl = await uploadImage(file)
    if (imageUrl && !form.value.gallery.includes(imageUrl)) {
      form.value.gallery.push(imageUrl)
    }
  }
  
  event.target.value = ''
}

function removeGalleryImage(index) {
  const imageToRemove = form.value.gallery[index]
  form.value.gallery.splice(index, 1)
  
  // If removing the featured image, set featured to first gallery image
  if (form.value.featuredImage === imageToRemove) {
    form.value.featuredImage = form.value.gallery[0] || ''
  }
}

function moveImageUp(index) {
  if (index <= 1) return // Can't move featured image or first gallery image up
  
  const temp = form.value.gallery[index]
  form.value.gallery[index] = form.value.gallery[index - 1]
  form.value.gallery[index - 1] = temp
}

/* -------------------------
   CRUD OPERATIONS
------------------------- */
async function saveClimb() {
  if (!validateForm()) return
  
  isSaving.value = true
  error.value = ''
  
  try {
    // Prepare payload
    const payload = { ...form.value }
    
    // Ensure gallery includes featured image
    if (payload.featuredImage && !payload.gallery.includes(payload.featuredImage)) {
      payload.gallery.unshift(payload.featuredImage)
    }
    
    // Calculate duration if not set
    if (payload.startDate && payload.endDate && !payload.durationDays) {
      const start = new Date(payload.startDate)
      const end = new Date(payload.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      payload.durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    
    // Filter out empty included/notIncluded items
    payload.included = payload.included.filter(item => item && item.trim())
    payload.notIncluded = payload.notIncluded.filter(item => item && item.trim())
    
    // Format itinerary for saving
    if (Array.isArray(payload.itinerary)) {
      payload.itinerary = payload.itinerary.map(day => ({
        day: day.day,
        title: day.title || `Day ${day.day}`,
        description: day.description || '',
        activities: Array.isArray(day.activities) ? day.activities.filter(a => a && a.trim()) : [],
        // NEW: Convert arrays to proper format
        accommodations: Array.isArray(day.accommodations) ? day.accommodations.filter(a => a && a.trim()) : [],
        meals: Array.isArray(day.mealsArray) ? day.mealsArray.filter(m => m && m.trim()) : [],
        dayType: day.dayType || '',
        startElevation: day.startElevation || null,
        endElevation: day.endElevation || null,
        distance: day.distance || null,
        hikingTime: day.hikingTime || null
      }))
    } else {
      payload.itinerary = []
    }
    
    // Remove temporary fields
    delete payload.activityInput
    delete payload.accommodationInput
    delete payload.mealInput
    delete payload.mealsArray // Remove the temporary array
    
    let response
    let savedClimb
    
    if (isEditing.value && payload._id) {
      // Update existing climb
      const climbId = payload._id
      delete payload._id
      
      response = await $fetch(`/api/groupclimb/${climbId}`, {
        method: 'PUT',
        body: payload
      })
      
      if (response.ok && response.data) {
        savedClimb = response.data
        
        // Update in local state - FIXED: Use the returned data
        const index = groupClimbs.value.findIndex(c => c._id === climbId)
        if (index !== -1) {
          groupClimbs.value[index] = savedClimb
        } else {
          // If not found, add it to the beginning
          groupClimbs.value.unshift(savedClimb)
        }
      } else {
        throw new Error(response.error || 'Failed to update climb')
      }
    } else {
      // Create new climb
      delete payload._id
      
      response = await $fetch('/api/groupclimb', {
        method: 'POST',
        body: payload
      })
      
      if (response.ok && response.data) {
        savedClimb = response.data
        
        // Add to local state at the beginning
        groupClimbs.value.unshift(savedClimb)
      } else {
        throw new Error(response.error || 'Failed to create climb')
      }
    }
    
    // Close modal
    closeModal()
    
    // Show success message
    showSuccessMessage()
    
  } catch (err) {
    console.error('Save failed:', err)
    error.value = err?.data?.error || err?.message || 'Failed to save group climb'
  } finally {
    isSaving.value = false
  }
}

// Add this success message function
function showSuccessMessage() {
  // You can add a toast notification here if you have one
  // For now, just log to console
  console.log('Group climb saved successfully!')
  
  // Optionally, you can add a simple alert or toast
  // alert(isEditing.value ? 'Climb updated successfully!' : 'Climb created successfully!')
}

async function duplicateClimb(climb) {
  if (!confirm(`Duplicate "${climb.title}"?`)) return
  
  try {
    const duplicate = { ...climb }
    delete duplicate._id
    duplicate.title = `${duplicate.title} (Copy)`
    duplicate.slug = `${duplicate.slug}-copy-${Date.now()}`
    duplicate.seatsBooked = 0
    duplicate.status = 'upcoming'
    
    const saved = await $fetch('/api/groupclimb', {
      method: 'POST',
      body: duplicate
    })
    
    groupClimbs.value.unshift(saved)
  } catch (err) {
    console.error('Duplicate failed:', err)
    alert('Failed to duplicate climb. See console for details.')
  }
}

async function deleteClimb(id) {
  if (!confirm('Are you sure you want to delete this climb?')) return
  
  try {
    await $fetch(`/api/groupclimb/${id}`, {
      method: 'DELETE'
    })
    
    groupClimbs.value = groupClimbs.value.filter(c => c._id !== id)
  } catch (err) {
    console.error('Delete failed:', err)
    alert('Failed to delete climb. See console for details.')
  }
}

/* -------------------------
   INITIAL LOAD
------------------------- */
onMounted(async () => {
  await loadData()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar */
.max-h-\[90vh\]::-webkit-scrollbar {
  width: 6px;
}
.max-h-\[90vh\]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
.max-h-\[90vh\]::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
.max-h-\[90vh\]::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Image hover effects */
.group:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Form input focus */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  ring: 2px;
  ring-color: #10b981;
  border-color: #10b981;
}

/* Itinerary day styling */
.bg-slate-50\/60 {
  background-color: rgba(248, 250, 252, 0.6);
}
</style>