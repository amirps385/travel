<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- HEADER SECTION -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Accommodations
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage lodges, hotels, camps and other accommodations
            </p>
          </div>

          <div class="flex items-center gap-3">
            <!-- Test API Button -->
            <button
              type="button"
              class="px-3 py-2 border rounded-lg text-xs hover:bg-slate-50 transition-colors"
              @click="testAPIEndpoint"
            >
              Test API
            </button>

            <!-- Bulk Actions -->
            <select
              v-model="bulkAction"
              class="border rounded-lg px-3 py-2 text-xs bg-white"
              @change="applyBulkAction"
            >
              <option value="">Bulk Actions</option>
              <option value="publish">Publish Selected</option>
              <option value="unpublish">Unpublish Selected</option>
              <option value="delete">Delete Selected</option>
            </select>

            <!-- Add Accommodation Button -->
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs md:text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm"
              @click="openCreateModal"
            >
              <span class="text-lg leading-none">＋</span>
              Add Accommodation
            </button>
          </div>
        </div>

        <!-- FILTER BAR -->
        <div class="flex flex-wrap gap-3 mb-4">
          <!-- Search -->
          <div class="relative flex-1 min-w-[200px]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search accommodations..."
              class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm"
              @input="debouncedSearch"
            />
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          </div>

          <!-- Type Filter -->
          <select
            v-model="filters.type"
            class="border rounded-lg px-3 py-2 text-sm bg-white"
            @change="applyFilters"
          >
            <option value="">All Types</option>
            <option v-for="type in accommodationTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>

          <!-- Category Filter -->
          <select
            v-model="filters.category"
            class="border rounded-lg px-3 py-2 text-sm bg-white"
            @change="applyFilters"
          >
            <option value="">All Categories</option>
            <option v-for="category in accommodationCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>

          <!-- City Filter -->
          <select
            v-model="filters.city"
            class="border rounded-lg px-3 py-2 text-sm bg-white"
            @change="applyFilters"
          >
            <option value="">All Cities</option>
            <option v-for="city in uniqueCities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="filters.status"
            class="border rounded-lg px-3 py-2 text-sm bg-white"
            @change="applyFilters"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

        <!-- ACCOMMODATIONS TABLE -->
        <div class="border rounded-2xl overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4 w-8">
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleSelectAll"
                  />
                </th>
                <th class="py-3 px-4">Accommodation</th>
                <th class="py-3 px-4">Type</th>
                <th class="py-3 px-4">Location</th>
                <th class="py-3 px-4">Price Range</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="accommodation in accommodations"
                :key="accommodation._id"
                class="border-b last:border-b-0 hover:bg-slate-50/80 transition-colors"
                :class="{ 'bg-slate-50/50': selectedItems.includes(accommodation._id) }"
              >
                <td class="py-3 px-4">
                  <input
                    type="checkbox"
                    :value="accommodation._id"
                    v-model="selectedItems"
                    class="cursor-pointer"
                  />
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <!-- Featured Image -->
                    <div class="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img
                        v-if="getFeaturedImage(accommodation)"
                        :src="getFeaturedImage(accommodation)"
                        class="w-full h-full object-cover"
                        alt=""
                        @error="handleImageError"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                        🏨
                      </div>
                    </div>
                    <div>
                      <div class="font-medium text-slate-900">{{ accommodation.name }}</div>
                      <div class="text-xs text-slate-500">{{ accommodation.slug }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    :class="getTypeColor(accommodation.type)"
                  >
                    {{ accommodation.type || '—' }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="text-sm text-slate-700">
                    <div v-if="accommodation.city">{{ accommodation.city }}</div>
                    <div v-if="accommodation.park" class="text-xs text-slate-500">{{ accommodation.park }}</div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="text-sm text-slate-700">
                    <span v-if="accommodation.minPrice || accommodation.maxPrice">
                      ${{ accommodation.minPrice || '0' }} - ${{ accommodation.maxPrice || '0' }}
                    </span>
                    <span v-else class="text-slate-400">—</span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                      :class="getStatusClass(accommodation)"
                    >
                      <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(accommodation)"></span>
                      {{ getStatusText(accommodation) }}
                    </span>
                    <span
                      v-if="accommodation.starRating"
                      class="text-xs text-amber-500"
                      title="Star rating"
                    >
                      {{ '★'.repeat(accommodation.starRating) }}
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4 text-right">
                  <div class="inline-flex items-center gap-2 justify-end">
                    <!-- Debug Button -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 text-blue-600 transition-colors"
                      title="Debug accommodation"
                      @click="debugAccommodation(accommodation)"
                    >
                      🐛
                    </button>

                    <!-- Preview -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                      :title="`Preview ${accommodation.name}`"
                      @click="previewAccommodation(accommodation)"
                    >
                      👁️
                    </button>

                    <!-- Edit -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                      title="Edit accommodation"
                      @click="openEditModal(accommodation)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M16.862 4.487l1.651-1.651a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/>
                      </svg>
                    </button>

                    <!-- Toggle Status -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                      :class="accommodation.isPublic ? 'text-emerald-600' : 'text-slate-600'"
                      :title="accommodation.isPublic ? 'Unpublish' : 'Publish'"
                      @click="toggleAccommodationStatus(accommodation)"
                    >
                      <svg v-if="accommodation.isPublic" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    </button>

                    <!-- Delete -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600 transition-colors"
                      title="Delete accommodation"
                      @click="confirmDeleteAccommodation(accommodation)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 12h10l1-12"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="accommodations.length === 0 && !loading">
                <td colspan="8" class="px-4 py-8 text-center text-xs text-slate-500">
                  No accommodations found. Click "Add Accommodation" to create your first one.
                </td>
              </tr>

              <tr v-if="loading">
                <td colspan="8" class="px-4 py-8 text-center text-xs text-slate-500">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                    Loading accommodations...
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION -->
        <div v-if="pagination.total > 0" class="mt-4 flex items-center justify-between">
          <div class="text-xs text-slate-500">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} accommodations
          </div>
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              :disabled="pagination.page === 1"
              @click="changePage(pagination.page - 1)"
            >
              ←
            </button>
            <span class="px-3 py-1.5 text-sm text-slate-700">
              Page {{ pagination.page }} of {{ pagination.pages }}
            </span>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              :disabled="pagination.page === pagination.pages"
              @click="changePage(pagination.page + 1)"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- CREATE/EDIT MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
    >
      <div
        class="max-w-4xl w-full bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900">
              {{ isEditing ? 'Edit Accommodation' : 'Add New Accommodation' }}
            </h2>
            <p class="text-xs text-slate-500">
              {{ isEditing ? 'Update accommodation details' : 'Create a new accommodation entry' }}
            </p>
          </div>
          <button
            type="button"
            class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            @click="closeModal"
          >
            ✕
          </button>
        </div>

        <div class="px-6 py-4 space-y-6">
          <!-- TABS -->
          <div class="border-b">
            <div class="flex space-x-4 text-sm">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                class="pb-3 px-1 border-b-2 transition-colors"
                :class="activeTab === tab.key ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- BASIC INFO TAB -->
          <div v-if="activeTab === 'basic'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Name -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Accommodation Name *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., Serengeti Safari Lodge"
                  required
                />
              </div>

              <!-- Slug -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Slug *
                </label>
                <div class="flex gap-2">
                  <input
                    v-model="form.slug"
                    type="text"
                    class="flex-1 border rounded-lg px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="serengeti-safari-lodge"
                  />
                  <button
                    type="button"
                    class="px-3 py-2 border rounded-lg text-xs hover:bg-slate-50 transition-colors"
                    @click="generateSlug"
                  >
                    Generate
                  </button>
                </div>
                <p class="text-[11px] text-slate-400 mt-1">
                  URL-friendly identifier (lowercase, hyphens)
                </p>
              </div>

              <!-- Type & Category -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Type
                </label>
                <select
                  v-model="form.type"
                  class="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="">Select type</option>
                  <option v-for="type in accommodationTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Category
                </label>
                <select
                  v-model="form.category"
                  class="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="">Select category</option>
                  <option v-for="category in accommodationCategories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>

              <!-- Location Details -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  City
                </label>
                <input
                  v-model="form.city"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., Arusha"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Park/Reserve
                </label>
                <input
                  v-model="form.park"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., Serengeti National Park"
                />
              </div>

              <!-- Country -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Country
                </label>
                <input
                  v-model="form.country"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., Tanzania"
                />
              </div>

              <!-- Star Rating -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Star Rating
                </label>
                <div class="flex items-center gap-2">
                  <select
                    v-model="form.starRating"
                    class="border rounded-lg px-3 py-2 bg-white flex-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option :value="null">Select rating</option>
                    <option v-for="n in 5" :key="n" :value="n">{{ n }} Star{{ n > 1 ? 's' : '' }}</option>
                  </select>
                  <div v-if="form.starRating" class="text-amber-500">
                    {{ '★'.repeat(form.starRating) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mt-4">
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Description (Multi-language)
              </label>
              <div class="border rounded-lg overflow-hidden">
                <div class="flex border-b">
                  <button
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="activeLang = lang.code"
                    class="px-4 py-2 text-sm border-r last:border-r-0 transition-colors"
                    :class="activeLang === lang.code ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'"
                  >
                    {{ lang.name }}
                  </button>
                </div>
                <textarea
                  v-model="form.description[activeLang]"
                  rows="4"
                  class="w-full px-3 py-2 resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  :placeholder="`Description in ${getLanguageName(activeLang)}`"
                ></textarea>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">
                Add descriptions in multiple languages. Visitors will see content in their preferred language.
              </p>
            </div>
          </div>

          <!-- MEDIA TAB -->
          <div v-if="activeTab === 'media'" class="space-y-4">
            <!-- Featured Image Upload -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">
                Featured Images
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div
                  v-for="(image, index) in form.images"
                  :key="index"
                  class="relative group"
                >
                  <div class="aspect-square rounded-lg overflow-hidden bg-slate-100">
                    <img
                      v-if="image.url"
                      :src="image.url"
                      class="w-full h-full object-cover"
                      alt=""
                      @error="handleImageError"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                      🖼️
                    </div>
                  </div>
                  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      class="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                      @click="setFeaturedImage(index)"
                      :title="image.isFeatured ? 'Currently featured' : 'Set as featured'"
                    >
                      <span :class="image.isFeatured ? 'text-amber-500' : 'text-slate-600'">⭐</span>
                    </button>
                    <button
                      type="button"
                      class="p-1.5 bg-white/90 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
                      @click="removeImage(index)"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                  <div v-if="image.isFeatured" class="absolute top-2 left-2">
                    <span class="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>
                  </div>
                </div>
                <div>
                  <label class="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-400 flex flex-col items-center justify-center cursor-pointer transition-colors">
                    <span class="text-2xl mb-1 text-slate-400">＋</span>
                    <span class="text-xs text-slate-600">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      class="hidden"
                      @change="uploadImages"
                    />
                  </label>
                </div>
              </div>
            </div>

            <!-- Videos -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">
                Videos
              </label>
              <div class="space-y-3">
                <div
                  v-for="(video, index) in form.videos"
                  :key="index"
                  class="flex items-center gap-3 p-3 border rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div class="flex-1 space-y-2">
                    <input
                      v-model="video.url"
                      type="url"
                      class="w-full border-b px-1 py-1 text-sm focus:outline-none focus:border-emerald-500"
                      placeholder="YouTube or Vimeo URL"
                      @input="detectVideoProvider(video)"
                    />
                    <input
                      v-model="video.title"
                      type="text"
                      class="w-full border-b px-1 py-1 text-sm focus:outline-none focus:border-emerald-500"
                      placeholder="Video title (optional)"
                    />
                    <div v-if="video.provider" class="text-xs text-slate-500">
                      Provider: {{ video.provider }}
                    </div>
                  </div>
                  <button
                    type="button"
                    class="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    @click="removeVideo(index)"
                  >
                    ✕
                  </button>
                </div>
                <button
                  type="button"
                  class="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  @click="addVideo"
                >
                  ＋ Add Video
                </button>
              </div>
            </div>
          </div>

          <!-- DETAILS TAB -->
          <div v-if="activeTab === 'details'" class="space-y-4">
            <!-- Amenities & Highlights -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-2">
                  Highlights
                </label>
                <div class="space-y-2">
                  <div
                    v-for="(highlight, index) in form.highlights"
                    :key="index"
                    class="flex items-center gap-2"
                  >
                    <input
                      v-model="form.highlights[index]"
                      type="text"
                      class="flex-1 border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="e.g., Sunset views over the savannah"
                    />
                    <button
                      type="button"
                      class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      @click="removeHighlight(index)"
                    >
                      ✕
                    </button>
                  </div>
                  <button
                    type="button"
                    class="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                    @click="addHighlight"
                  >
                    ＋ Add Highlight
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-2">
                  Amenities
                </label>
                <div class="space-y-2">
                  <div
                    v-for="(amenity, index) in form.amenities"
                    :key="index"
                    class="flex items-center gap-2"
                  >
                    <input
                      v-model="form.amenities[index]"
                      type="text"
                      class="flex-1 border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="e.g., Swimming pool, WiFi"
                    />
                    <button
                      type="button"
                      class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      @click="removeAmenity(index)"
                    >
                      ✕
                    </button>
                  </div>
                  <button
                    type="button"
                    class="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                    @click="addAmenity"
                  >
                    ＋ Add Amenity
                  </button>
                </div>
              </div>
            </div>

            <!-- Pricing -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Minimum Price (USD)
                </label>
                <input
                  v-model.number="form.minPrice"
                  type="number"
                  min="0"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="0"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Maximum Price (USD)
                </label>
                <input
                  v-model.number="form.maxPrice"
                  type="number"
                  min="0"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="0"
                />
              </div>
            </div>

            <!-- Rooms -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Number of Rooms
              </label>
              <input
                v-model.number="form.rooms"
                type="number"
                min="0"
                class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="e.g., 20"
              />
            </div>

            <!-- Contact Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Phone
                </label>
                <input
                  v-model="form.contact.phone"
                  type="tel"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="+255 xxx xxx xxx"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Email
                </label>
                <input
                  v-model="form.contact.email"
                  type="email"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Website
                </label>
                <input
                  v-model="form.contact.website"
                  type="url"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <!-- Address & Geo -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Address
              </label>
              <textarea
                v-model="form.address"
                rows="2"
                class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Full physical address"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Latitude
                </label>
                <input
                  v-model.number="form.geo.lat"
                  type="number"
                  step="any"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="-3.3667"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Longitude
                </label>
                <input
                  v-model.number="form.geo.lng"
                  type="number"
                  step="any"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="36.6833"
                />
              </div>
            </div>
          </div>

          <!-- POLICIES & SEO TAB -->
          <div v-if="activeTab === 'policies'" class="space-y-4">
            <!-- Policies -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-slate-900">Policies</h3>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Cancellation Policy
                </label>
                <textarea
                  v-model="form.policies.cancelation"
                  rows="3"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Cancellation terms and conditions..."
                ></textarea>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Check-in Time
                  </label>
                  <input
                    v-model="form.policies.checkIn"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g., 2:00 PM"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Check-out Time
                  </label>
                  <input
                    v-model="form.policies.checkOut"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g., 11:00 AM"
                  />
                </div>
              </div>
            </div>

            <!-- SEO -->
            <div class="space-y-3 border-t pt-4">
              <h3 class="text-sm font-semibold text-slate-900">SEO Settings</h3>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  SEO Title
                </label>
                <input
                  v-model="form.seo.title"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Page title for search engines"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  SEO Description
                </label>
                <textarea
                  v-model="form.seo.description"
                  rows="2"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Meta description for search engines"
                ></textarea>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-2">
                  SEO Keywords
                </label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span
                    v-for="(keyword, index) in form.seo.keywords"
                    :key="index"
                    class="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs"
                  >
                    {{ keyword }}
                    <button
                      type="button"
                      class="text-slate-500 hover:text-slate-700 transition-colors"
                      @click="removeKeyword(index)"
                    >
                      ✕
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="newKeyword"
                    type="text"
                    class="flex-1 border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Add keyword"
                    @keyup.enter="addKeyword"
                  />
                  <button
                    type="button"
                    class="px-3 py-1.5 border rounded-lg text-xs hover:bg-slate-50 transition-colors"
                    @click="addKeyword"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <!-- Status -->
            <div class="border-t pt-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="form.isPublic"
                  type="checkbox"
                  class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span class="text-sm text-slate-700">Publish this accommodation</span>
              </label>
              <p class="text-[11px] text-slate-500 mt-1">
                When published, the accommodation will be visible to website visitors
              </p>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t flex items-center justify-end gap-2">
          <button
            type="button"
            class="rounded-lg px-4 py-2 text-sm border bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            @click="closeModal"
            :disabled="isSaving"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-lg px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 transition-colors"
            :disabled="isSaving"
            @click="saveAccommodation"
          >
            {{ isSaving ? 'Saving...' : (isEditing ? 'Update Accommodation' : 'Create Accommodation') }}
          </button>
        </div>
      </div>
    </div>

    <!-- PREVIEW MODAL -->
    <div
      v-if="showPreviewModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
    >
      <div
        class="max-w-3xl w-full bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900">
              {{ previewData.name }}
            </h2>
            <p class="text-xs text-slate-500">
              Accommodation Preview
            </p>
          </div>
          <button
            type="button"
            class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            @click="closePreviewModal"
          >
            ✕
          </button>
        </div>

        <div class="px-6 py-4 space-y-4">
          <!-- Featured Image -->
          <div v-if="previewData.images && previewData.images.length > 0" class="rounded-lg overflow-hidden">
            <img
              :src="getFeaturedImage(previewData)"
              class="w-full h-48 object-cover"
              alt=""
              @error="handleImageError"
            />
          </div>

          <!-- Basic Info -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-slate-500">Type</p>
              <p class="text-sm font-medium">{{ previewData.type || '—' }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500">Category</p>
              <p class="text-sm font-medium">{{ previewData.category || '—' }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500">Location</p>
              <p class="text-sm font-medium">{{ previewData.city || '—' }}</p>
              <p class="text-xs text-slate-500">{{ previewData.park || '' }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500">Price Range</p>
              <p class="text-sm font-medium">
                ${{ previewData.minPrice || '0' }} - ${{ previewData.maxPrice || '0' }}
              </p>
            </div>
          </div>

          <!-- Description -->
          <div v-if="previewData.description">
            <p class="text-xs text-slate-500">Description</p>
            <p class="text-sm text-slate-700 mt-1">
              {{ previewData.description.en || Object.values(previewData.description)[0] || 'No description available' }}
            </p>
          </div>

          <!-- Highlights -->
          <div v-if="previewData.highlights && previewData.highlights.length > 0">
            <p class="text-xs text-slate-500">Highlights</p>
            <ul class="mt-1 space-y-1">
              <li
                v-for="(highlight, index) in previewData.highlights"
                :key="index"
                class="text-sm text-slate-700 flex items-start gap-2"
              >
                <span class="text-emerald-500 mt-0.5">✓</span>
                {{ highlight }}
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div v-if="previewData.contact" class="border-t pt-4">
            <p class="text-xs text-slate-500">Contact Information</p>
            <div class="grid grid-cols-2 gap-4 mt-2">
              <div v-if="previewData.contact.phone">
                <p class="text-xs text-slate-500">Phone</p>
                <p class="text-sm font-medium">{{ previewData.contact.phone }}</p>
              </div>
              <div v-if="previewData.contact.email">
                <p class="text-xs text-slate-500">Email</p>
                <p class="text-sm font-medium">{{ previewData.contact.email }}</p>
              </div>
              <div v-if="previewData.contact.website" class="col-span-2">
                <p class="text-xs text-slate-500">Website</p>
                <a
                  :href="previewData.contact.website"
                  target="_blank"
                  class="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {{ previewData.contact.website }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t flex items-center justify-end gap-2">
          <button
            type="button"
            class="rounded-lg px-4 py-2 text-sm border bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            @click="closePreviewModal"
          >
            Close
          </button>
          <button
            type="button"
            class="rounded-lg px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
            @click="editPreviewedAccommodation"
          >
            Edit Accommodation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Accommodations'
})

// Debounce utility
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Data
const accommodations = ref([])
const loading = ref(false)
const showModal = ref(false)
const showPreviewModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const activeTab = ref('basic')
const activeLang = ref('en')
const newKeyword = ref('')
const previewData = ref({})

// Filters & Search
const searchQuery = ref('')
const filters = ref({
  type: '',
  category: '',
  city: '',
  status: ''
})

// Bulk Actions
const bulkAction = ref('')
const selectedItems = ref([])
const selectAll = ref(false)

// Pagination
const pagination = ref({
  page: 1,
  limit: 20,
  total: 0,
  pages: 1
})

// Constants
const accommodationTypes = [
  'Lodge',
  'Hotel',
  'Camp',
  'Tented Camp',
  'Resort',
  'Villa',
  'Guest House',
  'Hostel',
  'Other'
]

const accommodationCategories = [
  'Luxury',
  'Mid-range',
  'Budget',
  'Boutique',
  'Eco-friendly',
  'Family-friendly',
  'Business',
  'Romantic'
]

const languages = [
  { code: 'en', name: 'English' },
  { code: 'sw', name: 'Swahili' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' }
]

const tabs = [
  { key: 'basic', label: 'Basic Info' },
  { key: 'media', label: 'Media' },
  { key: 'details', label: 'Details' },
  { key: 'policies', label: 'Policies & SEO' }
]

// Form
const emptyForm = () => ({
  name: '',
  slug: '',
  type: '',
  category: '',
  city: '',
  park: '',
  country: '',
  starRating: null,
  description: { en: '' },
  highlights: [],
  amenities: [],
  images: [],
  videos: [],
  address: '',
  geo: { lat: null, lng: null },
  contact: { phone: '', email: '', website: '' },
  rooms: null,
  minPrice: null,
  maxPrice: null,
  policies: { cancelation: '', checkIn: '', checkOut: '' },
  seo: { title: '', description: '', keywords: [] },
  isPublic: true,
  isDeleted: false
})

const form = ref(emptyForm())

// Computed
const uniqueCities = computed(() => {
  const cities = new Set()
  accommodations.value.forEach(acc => {
    if (acc.city && acc.city.trim()) cities.add(acc.city.trim())
  })
  return Array.from(cities).sort()
})

// Helper Functions
function getLanguageName(code) {
  const lang = languages.find(l => l.code === code)
  return lang ? lang.name : code.toUpperCase()
}

function getFeaturedImage(accommodation) {
  if (!accommodation.images || accommodation.images.length === 0) return null
  const featured = accommodation.images.find(img => img.isFeatured)
  return featured ? featured.url : accommodation.images[0].url
}

function getTypeColor(type) {
  const colors = {
    'Lodge': 'bg-amber-50 text-amber-700',
    'Hotel': 'bg-blue-50 text-blue-700',
    'Camp': 'bg-green-50 text-green-700',
    'Tented Camp': 'bg-emerald-50 text-emerald-700',
    'Resort': 'bg-purple-50 text-purple-700'
  }
  return colors[type] || 'bg-slate-100 text-slate-700'
}

function getStatusClass(accommodation) {
  if (accommodation.isDeleted) return 'bg-rose-50 text-rose-700'
  if (!accommodation.isPublic) return 'bg-slate-100 text-slate-600'
  return 'bg-emerald-50 text-emerald-700'
}

function getStatusDotClass(accommodation) {
  if (accommodation.isDeleted) return 'bg-rose-500'
  if (!accommodation.isPublic) return 'bg-slate-400'
  return 'bg-emerald-500'
}

function getStatusText(accommodation) {
  if (accommodation.isDeleted) return 'Deleted'
  if (!accommodation.isPublic) return 'Unpublished'
  return 'Published'
}

function handleImageError(event) {
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400">🏨</div>'
}

// Form Helpers
function generateSlug() {
  if (!form.value.name) return
  form.value.slug = form.value.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function addHighlight() {
  form.value.highlights.push('')
}

function removeHighlight(index) {
  form.value.highlights.splice(index, 1)
}

function addAmenity() {
  form.value.amenities.push('')
}

function removeAmenity(index) {
  form.value.amenities.splice(index, 1)
}

function detectVideoProvider(video) {
  if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
    video.provider = 'youtube'
  } else if (video.url.includes('vimeo.com')) {
    video.provider = 'vimeo'
  } else {
    video.provider = ''
  }
}

function addVideo() {
  form.value.videos.push({ url: '', title: '', provider: '' })
}

function removeVideo(index) {
  form.value.videos.splice(index, 1)
}

function addKeyword() {
  if (newKeyword.value.trim()) {
    form.value.seo.keywords.push(newKeyword.value.trim())
    newKeyword.value = ''
  }
}

function removeKeyword(index) {
  form.value.seo.keywords.splice(index, 1)
}

async function uploadImages(event) {
  const files = Array.from(event.target.files)
  if (files.length === 0) return

  const formData = new FormData()
  files.forEach(file => {
    formData.append('image', file)
  })

  try {
    console.log('Uploading images...', files.length)
    
    const response = await $fetch('/api/accommodations/upload', {
      method: 'POST',
      body: formData
    })

    console.log('Upload response:', response)

    if (response.ok && response.files) {
      response.files.forEach((file, index) => {
        form.value.images.push({
          url: file.url,
          caption: file.caption || '',
          order: form.value.images.length,
          isFeatured: form.value.images.length === 0
        })
      })
      
      // Reset the file input
      event.target.value = ''
      
      // Switch to media tab to see uploaded images
      activeTab.value = 'media'
    } else {
      alert(`Upload failed: ${response.error || 'Unknown error'}`)
    }
  } catch (error) {
    console.error('Failed to upload images:', error)
    alert('Failed to upload images. Please check console for details.')
  }
}

function setFeaturedImage(index) {
  form.value.images.forEach((img, i) => {
    img.isFeatured = i === index
  })
}

function removeImage(index) {
  form.value.images.splice(index, 1)
}

// CRUD Operations
async function loadAccommodations() {
  loading.value = true
  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      page: pagination.value.page.toString(),
      limit: pagination.value.limit.toString()
    })
    
    // Add search query if present
    if (searchQuery.value) {
      queryParams.append('search', searchQuery.value)
    }
    
    // Add filters
    Object.entries(filters.value).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value)
      }
    })
    
    console.log('Loading accommodations from:', `/api/accommodations?${queryParams.toString()}`)
    const response = await $fetch(`/api/accommodations?${queryParams.toString()}`)
    
    console.log('Full API Response:', response)
    console.log('Response data type:', typeof response.data)
    console.log('Response data is array?', Array.isArray(response.data))
    
    if (response.ok && response.data) {
      accommodations.value = response.data
      console.log('Loaded accommodations:', accommodations.value)
      
      // Check if accommodations have _id
      if (accommodations.value.length > 0) {
        console.log('First accommodation structure:')
        console.log('- Has _id?', '_id' in accommodations.value[0])
        console.log('- Has id?', 'id' in accommodations.value[0])
        console.log('- All keys:', Object.keys(accommodations.value[0]))
      }
      
      pagination.value = {
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        pages: response.pagination.pages
      }
    } else {
      console.error('API error:', response.error)
    }
  } catch (error) {
    console.error('Failed to load accommodations:', error)
    alert('Failed to load accommodations. Please check console for details.')
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  isEditing.value = false
  form.value = emptyForm()
  activeTab.value = 'basic'
  activeLang.value = 'en'
  showModal.value = true
}

async function openEditModal(accommodation) {
  console.log('=== openEditModal called ===', accommodation)

  // Defensive identifier creation
  const rawId = accommodation && (accommodation._id || accommodation.slug)
  const identifier = rawId ? String(rawId).trim() : ''

  if (!identifier) {
    console.warn('openEditModal: no identifier found on accommodation', accommodation)
    alert('Cannot edit: accommodation has no ID or slug')
    return
  }

  const encodedId = encodeURIComponent(identifier)
  const url = `/api/accommodations/${encodedId}`

  // Very explicit logging so we can trace what's happening
  console.log('openEditModal -> identifier:', identifier)
  console.log('openEditModal -> encodedId:', encodedId)
  console.log('openEditModal -> final URL:', url)

  loading.value = true
  try {
    // Try using $fetch first (Nuxt helper)
    try {
      console.log('openEditModal -> Sending $fetch request (admin header)')
      const response = await $fetch(url, { headers: { admin: 'true' } })
      console.log('openEditModal -> $fetch response:', response)

      if (response && response.ok && response.data) {
        // reuse response handling below (so we don't duplicate code)
        const payload = response.data
        populateFormFromPayload(payload)
        return
      } else if (response && !response.ok) {
        console.warn('openEditModal -> $fetch returned ok:false', response)
      }
    } catch (err) {
      console.warn('openEditModal -> $fetch failed, falling back to window.fetch', err)
    }

    // Fallback: raw fetch so devtools shows full request/response
    console.log('openEditModal -> Attempting window.fetch fallback (GET)')
    const rawResp = await window.fetch(url, { headers: { admin: 'true' } })
    console.log('openEditModal -> raw fetch status:', rawResp.status, rawResp.statusText)
    const json = await rawResp.json().catch(e => {
      console.error('openEditModal -> failed to parse JSON from raw fetch', e)
      return null
    })
    console.log('openEditModal -> raw fetch json:', json)

    if (json && json.ok && json.data) {
      populateFormFromPayload(json.data)
    } else {
      const errMsg = (json && json.error) || `Request failed: ${rawResp.status}`
      alert('Failed to load accommodation details: ' + errMsg)
    }
  } catch (error) {
    console.error('openEditModal -> unexpected error:', error)
    alert('Failed to load accommodation details: ' + (error?.message || error))
  } finally {
    loading.value = false
  }
}

// small helper to normalize payload into form
function populateFormFromPayload(data) {
  isEditing.value = true
  console.log('populateFormFromPayload -> received data keys:', Object.keys(data || {}))

  form.value = JSON.parse(JSON.stringify({
    ...data,
    starRating: data.starRating || null,
    description: data.description || { en: '' },
    highlights: data.highlights || [],
    amenities: data.amenities || [],
    images: data.images || [],
    videos: data.videos || [],
    address: data.address || '',
    geo: data.geo || { lat: null, lng: null },
    contact: data.contact || { phone: '', email: '', website: '' },
    rooms: data.rooms || null,
    minPrice: data.minPrice || null,
    maxPrice: data.maxPrice || null,
    policies: data.policies || { cancelation: '', checkIn: '', checkOut: '' },
    seo: data.seo || { title: '', description: '', keywords: [] },
    isPublic: data.isPublic !== false,
    isDeleted: data.isDeleted || false
  }))

  activeTab.value = 'basic'
  activeLang.value = 'en'
  showModal.value = true
}



function closeModal() {
  showModal.value = false
  isSaving.value = false
  form.value = emptyForm()
}

async function saveAccommodation() {
  // Validation
  if (!form.value.name || !form.value.slug) {
    alert('Name and slug are required')
    return
  }

  isSaving.value = true
  try {
    let response
    if (isEditing.value && form.value._id) {
      console.log('Updating accommodation:', form.value._id)
      response = await $fetch(`/api/accommodations/${form.value._id}`, {
        method: 'PUT',
        body: form.value
      })
      
      // Update in list
      const index = accommodations.value.findIndex(a => a._id === form.value._id)
      if (index !== -1) {
        accommodations.value[index] = response.data
      }
    } else {
      console.log('Creating new accommodation')
      response = await $fetch('/api/accommodations', {
        method: 'POST',
        body: form.value
      })
      
      // Add to list
      accommodations.value.unshift(response.data)
    }

    if (response.ok) {
      console.log('Save successful:', response)
      closeModal()
      loadAccommodations() // Reload to ensure fresh data
    } else {
      alert(response.error || 'Failed to save accommodation')
    }
  } catch (error) {
    console.error('Failed to save accommodation:', error)
    alert(error.message || 'Failed to save accommodation. Please try again.')
  } finally {
    isSaving.value = false
  }
}

async function toggleAccommodationStatus(accommodation) {
  try {
    const updated = { ...accommodation, isPublic: !accommodation.isPublic }
    const response = await $fetch(`/api/accommodations/${accommodation._id}`, {
      method: 'PUT',
      body: updated
    })

    if (response.ok) {
      const index = accommodations.value.findIndex(a => a._id === accommodation._id)
      if (index !== -1) {
        accommodations.value[index].isPublic = !accommodation.isPublic
      }
    } else {
      alert(response.error || 'Failed to update status')
    }
  } catch (error) {
    console.error('Failed to toggle status:', error)
    alert('Failed to update accommodation status')
  }
}

async function confirmDeleteAccommodation(accommodation) {
  if (!confirm(`Are you sure you want to delete "${accommodation.name}"?`)) return

  try {
    const response = await $fetch(`/api/accommodations/${accommodation._id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      // Soft delete - update in list
      const index = accommodations.value.findIndex(a => a._id === accommodation._id)
      if (index !== -1) {
        accommodations.value[index].isDeleted = true
      }
    } else {
      alert(response.error || 'Failed to delete accommodation')
    }
  } catch (error) {
    console.error('Failed to delete accommodation:', error)
    alert('Failed to delete accommodation')
  }
}

// Preview
async function previewAccommodation(accommodation) {
  console.log('=== previewAccommodation called ===', accommodation)

  const rawId = accommodation && (accommodation._id || accommodation.slug)
  const identifier = rawId ? String(rawId).trim() : ''

  if (!identifier) {
    console.warn('previewAccommodation: no identifier', accommodation)
    alert('Cannot preview: accommodation has no ID or slug')
    return
  }

  const encodedId = encodeURIComponent(identifier)
  const url = `/api/accommodations/${encodedId}`

  console.log('previewAccommodation -> identifier:', identifier)
  console.log('previewAccommodation -> encodedId:', encodedId)
  console.log('previewAccommodation -> final URL:', url)

  loading.value = true
  try {
    // Try $fetch
    try {
      console.log('previewAccommodation -> Sending $fetch request (admin header)')
      const resp = await $fetch(url, { headers: { admin: 'true' } })
      console.log('previewAccommodation -> $fetch response:', resp)

      if (resp && resp.ok && resp.data) {
        previewData.value = JSON.parse(JSON.stringify(resp.data))
        showPreviewModal.value = true
        return
      } else if (resp && !resp.ok) {
        console.warn('previewAccommodation -> $fetch returned ok:false', resp)
      }
    } catch (err) {
      console.warn('previewAccommodation -> $fetch failed, falling back to window.fetch', err)
    }

    // Fallback raw fetch
    console.log('previewAccommodation -> Attempting window.fetch fallback (GET)')
    const rawResp = await window.fetch(url, { headers: { admin: 'true' } })
    console.log('previewAccommodation -> raw fetch status:', rawResp.status, rawResp.statusText)
    const json = await rawResp.json().catch(e => {
      console.error('previewAccommodation -> failed to parse JSON', e)
      return null
    })
    console.log('previewAccommodation -> raw fetch json:', json)

    if (json && json.ok && json.data) {
      previewData.value = JSON.parse(JSON.stringify(json.data))
      showPreviewModal.value = true
    } else {
      const errMsg = (json && json.error) || `Request failed: ${rawResp.status}`
      alert('Failed to load accommodation preview: ' + errMsg)
    }
  } catch (error) {
    console.error('previewAccommodation -> unexpected error:', error)
    alert('Failed to load accommodation preview: ' + (error?.message || error))
  } finally {
    loading.value = false
  }
}


function closePreviewModal() {
  showPreviewModal.value = false
  previewData.value = {}
}

function editPreviewedAccommodation() {
  closePreviewModal()
  openEditModal(previewData.value)
}

// Debug Functions
function debugAccommodation(accommodation) {
  console.log('=== DEBUG ACCOMMODATION ===')
  console.log('Full object:', accommodation)
  console.log('Type of accommodation:', typeof accommodation)
  console.log('Keys:', Object.keys(accommodation))
  console.log('Has _id?', '_id' in accommodation)
  console.log('_id value:', accommodation._id)
  console.log('Has slug?', 'slug' in accommodation)
  console.log('slug value:', accommodation.slug)
  console.log('=== END DEBUG ===')
}

async function testAPIEndpoint() {
  try {
    console.log('=== TESTING API ENDPOINT ===')
    
    // Test 1: Test the list endpoint
    console.log('Test 1: Testing /api/accommodations')
    const listResponse = await $fetch('/api/accommodations?limit=1')
    console.log('List response:', listResponse)
    
    if (listResponse.ok && listResponse.data && listResponse.data.length > 0) {
      const firstAcc = listResponse.data[0]
      console.log('First accommodation from list:', firstAcc)
      console.log('First accommodation _id:', firstAcc._id)
      console.log('First accommodation slug:', firstAcc.slug)
      // After obtaining firstAcc...
console.log('First accommodation from list:', firstAcc)
console.log('First accommodation _id (type):', typeof firstAcc._id, firstAcc._id)
console.log('First accommodation slug (type):', typeof firstAcc.slug, firstAcc.slug)

const idToTest = firstAcc._id || firstAcc.slug
if (idToTest) {
  const testUrl = `/api/accommodations/${encodeURIComponent(String(idToTest))}`
  console.log('Testing single GET endpoint with URL:', testUrl)
  const singleResponse = await $fetch(testUrl, { headers: { admin: 'true' } })
  console.log('Single response:', singleResponse)
}

      
      // Test 2: Test the single endpoint with ID
      if (firstAcc._id) {
        console.log('\nTest 2: Testing /api/accommodations/' + firstAcc._id)
        try {
          const singleResponse = await $fetch(`/api/accommodations/${firstAcc._id}`, {
            headers: { 'admin': 'true' }
          })
          console.log('Single response with ID:', singleResponse)
        } catch (error) {
          console.error('Error testing with ID:', error)
        }
      }
      
      // Test 3: Test the single endpoint with slug
      if (firstAcc.slug) {
        console.log('\nTest 3: Testing /api/accommodations/' + firstAcc.slug)
        try {
          const slugResponse = await $fetch(`/api/accommodations/${firstAcc.slug}`, {
            headers: { 'admin': 'true' }
          })
          console.log('Single response with slug:', slugResponse)
        } catch (error) {
          console.error('Error testing with slug:', error)
        }
      }
    }
    
    console.log('=== END TEST ===')
  } catch (error) {
    console.error('API Test failed:', error)
  }
}

// Bulk Actions
function toggleSelectAll() {
  if (selectAll.value) {
    selectedItems.value = accommodations.value.map(a => a._id)
  } else {
    selectedItems.value = []
  }
}

async function applyBulkAction() {
  if (!bulkAction.value || selectedItems.value.length === 0) return

  try {
    switch (bulkAction.value) {
      case 'publish':
        await Promise.all(selectedItems.value.map(id =>
          $fetch(`/api/accommodations/${id}`, {
            method: 'PUT',
            body: { isPublic: true }
          })
        ))
        break
      case 'unpublish':
        await Promise.all(selectedItems.value.map(id =>
          $fetch(`/api/accommodations/${id}`, {
            method: 'PUT',
            body: { isPublic: false }
          })
        ))
        break
      case 'delete':
        if (!confirm(`Delete ${selectedItems.value.length} accommodation(s)?`)) return
        await Promise.all(selectedItems.value.map(id =>
          $fetch(`/api/accommodations/${id}`, { method: 'DELETE' })
        ))
        break
    }

    // Reset and reload
    bulkAction.value = ''
    selectedItems.value = []
    selectAll.value = false
    loadAccommodations()
  } catch (error) {
    console.error('Bulk action failed:', error)
    alert('Failed to perform bulk action')
  }
}

// Pagination
function changePage(page) {
  if (page < 1 || page > pagination.value.pages) return
  pagination.value.page = page
  loadAccommodations()
}

// Search debounce
const debouncedSearch = debounce(() => {
  loadAccommodations()
}, 500)

// Apply filters
function applyFilters() {
  pagination.value.page = 1 // Reset to first page when filters change
  loadAccommodations()
}

// Watch selected items
watch(selectedItems, (newVal) => {
  selectAll.value = newVal.length === accommodations.value.length && accommodations.value.length > 0
})

// Initialize
onMounted(() => {
  loadAccommodations()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Smooth transitions for modal */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>