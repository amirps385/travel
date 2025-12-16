<template>
  <div class="min-h-[calc(100vh-5rem)] bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- HEADER -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
              National Parks
            </h1>
            <p class="mt-2 text-sm text-gray-600">
              Manage all national parks in your system
              <span class="ml-2 text-gray-500">
                • {{ parks.length }} park{{ parks.length !== 1 ? 's' : '' }}
              </span>
            </p>
          </div>
          
          <div class="flex flex-wrap items-center gap-3">
            <!-- Status Filter -->
            <div class="relative">
              <select 
                v-model="statusFilter" 
                class="pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Parks</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            
            <!-- Add Park Button -->
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              @click="openCreateModal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Add New Park
            </button>
          </div>
        </div>
      </div>

      <!-- LOADING STATE -->
      <div v-if="isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-3 text-sm text-gray-600">Loading parks...</p>
        </div>
      </div>

      <!-- PARKS TABLE -->
      <div v-else-if="displayedParks.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Park
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Area
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="park in displayedParks" 
                :key="park._id || park.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Park Name & Image -->
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="shrink-0 h-12 w-16 relative">
                      <!-- Featured Image -->
                      <div v-if="park.featuredImage" class="h-12 w-16 rounded-md overflow-hidden border border-gray-200">
                        <img 
                          :src="park.featuredImage" 
                          :alt="park.name"
                          class="h-full w-full object-cover"
                          @error="handleImageError"
                        />
                      </div>
                      <div v-else class="h-12 w-16 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      
                      <!-- Gallery Count Badge -->
                      <div v-if="park.gallery && park.gallery.length > 0" 
                           class="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center border border-white">
                        +{{ park.gallery.length }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ park.name }}</div>
                      <div class="text-xs text-gray-500">{{ park.slug }}</div>
                      <div v-if="park.shortDescription" class="text-xs text-gray-400 truncate max-w-xs">
                        {{ park.shortDescription }}
                      </div>
                      <div class="flex items-center gap-2 mt-1">
                        <div v-if="park.isFeatured" class="inline-block">
                          <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            Featured
                          </span>
                        </div>
                        <div v-if="park.gallery && park.gallery.length > 0" class="text-xs text-gray-500">
                          {{ park.gallery.length }} gallery image{{ park.gallery.length !== 1 ? 's' : '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                
                <!-- Region -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ park.region || '—' }}</div>
                </td>
                
                <!-- Category -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getCategoryClass(park.category)">
                    {{ park.category || '—' }}
                  </span>
                </td>
                
                <!-- Area -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ park.areaKm2 ? Number(park.areaKm2).toLocaleString() + ' km²' : '—' }}
                </td>
                
                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="park.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                    <span class="w-2 h-2 rounded-full mr-1.5" :class="park.isActive ? 'bg-green-400' : 'bg-gray-400'"></span>
                    {{ park.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                
                <!-- Actions -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <!-- Edit Button -->
                    <button
                      @click="openEditModal(park)"
                      class="inline-flex items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit park"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    
                    <!-- Delete Button -->
                    <button
                      @click="deletePark(park._id || park.id)"
                      class="inline-flex items-center p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete park"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No parks found</h3>
          <p class="mt-2 text-sm text-gray-600">
            {{ statusFilter === 'all' ? 'Get started by creating your first national park.' : `No ${statusFilter} parks found.` }}
          </p>
          <div class="mt-6">
            <button
              type="button"
              @click="openCreateModal"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Add New Park
            </button>
          </div>
        </div>
      </div>

      <!-- ADD/EDIT MODAL -->
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      >
        <div
          class="max-w-6xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b">
            <div>
              <h2 class="text-base md:text-lg font-semibold text-gray-900">
                {{ isEditing ? 'Edit Park' : 'Add New Park' }}
              </h2>
              <p class="text-xs text-gray-500">
                {{ isEditing ? 'Update park details' : 'Create a new national park entry' }}
              </p>
            </div>
            <button
              type="button"
              class="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              @click="closeModal"
            >
              ✕
            </button>
          </div>

          <!-- Modal Body -->
          <div class="px-6 py-5 space-y-6">
            <!-- BASIC INFO SECTION -->
            <div>
              <h3 class="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b">
                Basic Information
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Park Name *
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Serengeti National Park"
                    required
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    URL Slug *
                  </label>
                  <input
                    v-model="form.slug"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="serengeti-national-park"
                    required
                  />
                  <p class="text-[11px] text-gray-400 mt-1">
                    Used in URLs (lowercase, hyphens, no spaces)
                  </p>
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-xs font-semibold text-gray-600 mb-1">
                  Short Description *
                </label>
                <input
                  v-model="form.shortDescription"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Brief description (appears in cards and lists)"
                  required
                />
              </div>

              <div class="mt-4">
                <label class="block text-xs font-semibold text-gray-600 mb-1">
                  Full Description *
                </label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  class="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Detailed description of the park..."
                  required
                ></textarea>
              </div>
            </div>

            <!-- IMAGES SECTION -->
            <div>
              <h3 class="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b">
                Images
              </h3>
              <div class="space-y-6">
                <!-- Featured Image -->
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Featured Image
                  </label>
                  <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <!-- Featured Image Preview -->
                    <div class="w-48 h-32 overflow-hidden rounded-md border border-gray-200">
                      <img
                        v-if="form.featuredImage"
                        :src="form.featuredImage"
                        alt="featured"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                      <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg class="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div class="flex-1 space-y-2">
                      <div class="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          @change="onFeaturedImageSelected"
                          class="text-sm"
                          ref="featuredImageInput"
                          id="featuredImageInput"
                        />
                        <label for="featuredImageInput" class="cursor-pointer rounded-lg px-3 py-1.5 text-xs border border-gray-300 bg-white hover:bg-gray-50">
                          Browse
                        </label>
                      </div>
                      <p class="text-[11px] text-gray-500">
                        Main image for the park (recommended: 1200×800). Will be shown in lists and as the main park image.
                      </p>
                      <button
                        v-if="form.featuredImage"
                        type="button"
                        @click="removeFeaturedImage"
                        class="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove featured image
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Gallery Images -->
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Gallery Images
                  </label>
                  <div class="space-y-3">
                    <!-- Gallery Upload Controls -->
                    <div class="flex flex-wrap items-center gap-3 mb-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        @change="onGalleryImagesSelected"
                        class="text-sm"
                        ref="galleryImagesInput"
                        id="galleryImagesInput"
                      />
                      <label for="galleryImagesInput" class="cursor-pointer rounded-lg px-3 py-1.5 text-xs border border-gray-300 bg-white hover:bg-gray-50">
                        Browse Multiple
                      </label>
                      <button
                        v-if="form.gallery && form.gallery.length > 0"
                        type="button"
                        @click="clearGallery"
                        class="rounded-lg px-3 py-1.5 text-xs border border-gray-300 bg-white hover:bg-gray-50 text-red-600 hover:text-red-800"
                      >
                        Clear all gallery images
                      </button>
                    </div>
                    
                    <!-- Gallery Images Preview -->
                    <div v-if="form.gallery && form.gallery.length > 0" class="space-y-2">
                      <p class="text-xs text-gray-500">
                        {{ form.gallery.length }} image{{ form.gallery.length !== 1 ? 's' : '' }} in gallery
                      </p>
                      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <div
                          v-for="(img, idx) in form.gallery"
                          :key="idx"
                          class="relative aspect-video rounded-md overflow-hidden border border-gray-200 group"
                        >
                          <img 
                            :src="img" 
                            class="w-full h-full object-cover"
                            @error="handleImageError"
                          />
                          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              @click="removeGalleryImage(idx)"
                              type="button"
                              class="p-1.5 bg-white/90 rounded-full hover:bg-white"
                              title="Remove image"
                            >
                              <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                              </svg>
                            </button>
                          </div>
                          <div class="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                            {{ idx + 1 }}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div v-else class="text-xs text-gray-400 italic p-4 border border-dashed border-gray-300 rounded-lg text-center">
                      No gallery images selected. Add multiple images to create a gallery for this park.
                    </div>
                    
                    <p class="text-[11px] text-gray-500">
                      Gallery images will be displayed on the park's detail page in a slideshow or grid.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- LOCATION & CLASSIFICATION -->
            <div>
              <h3 class="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b">
                Location & Classification
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Region *
                  </label>
                  <select
                    v-model="form.region"
                    class="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                    required
                  >
                    <option value="">Select region</option>
                    <option v-for="region in PARK_REGIONS" :key="region" :value="region">
                      {{ region }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Location *
                  </label>
                  <select
                    v-model="form.location"
                    class="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                    required
                  >
                    <option value="">Select location</option>
                    <option v-for="location in PARK_LOCATIONS" :key="location" :value="location">
                      {{ location }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Category *
                  </label>
                  <select
                    v-model="form.category"
                    class="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                    required
                  >
                    <option value="">Select category</option>
                    <option v-for="category in PARK_CATEGORIES" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Area (km²)
                  </label>
                  <input
                    v-model.number="form.areaKm2"
                    type="number"
                    min="0"
                    step="0.1"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="14,750"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Established Year
                  </label>
                  <input
                    v-model.number="form.establishedYear"
                    type="number"
                    min="1800"
                    :max="new Date().getFullYear()"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="1951"
                  />
                </div>
              </div>
            </div>

            <!-- WILDLIFE & ACTIVITIES -->
            <div>
              <h3 class="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b">
                Wildlife & Activities
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-2">
                    Wildlife Highlights
                  </label>
                  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <label
                      v-for="animal in WILDLIFE_HIGHLIGHTS"
                      :key="animal"
                      class="inline-flex items-center gap-2 cursor-pointer text-gray-700"
                    >
                      <input
                        type="checkbox"
                        :value="animal"
                        v-model="form.wildlifeHighlights"
                      />
                      <span class="text-sm">{{ animal }}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-2">
                    Activities Available
                  </label>
                  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <label
                      v-for="activity in PARK_ACTIVITIES"
                      :key="activity"
                      class="inline-flex items-center gap-2 cursor-pointer text-gray-700"
                    >
                      <input
                        type="checkbox"
                        :value="activity"
                        v-model="form.activities"
                      />
                      <span class="text-sm">{{ activity }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- ENVIRONMENT -->
            <div>
              <h3 class="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b">
                Environment
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Climate Type
                  </label>
                  <select
                    v-model="form.climate"
                    class="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    <option value="">Select climate</option>
                    <option v-for="climate in CLIMATE_TYPES" :key="climate" :value="climate">
                      {{ climate }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Landscape Type
                  </label>
                  <select
                    v-model="form.landscape"
                    class="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    <option value="">Select landscape</option>
                    <option v-for="landscape in LANDSCAPE_TYPES" :key="landscape" :value="landscape">
                      {{ landscape }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- BEST TIME TO VISIT -->
            <div>
              <h3 class="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b">
                Best Time to Visit
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    From Month
                  </label>
                  <select
                    v-model="form.bestTimeToVisit.from"
                    class="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    <option value="">Select month</option>
                    <option v-for="month in MONTHS" :key="month" :value="month">
                      {{ month }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    To Month
                  </label>
                  <select
                    v-model="form.bestTimeToVisit.to"
                    class="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                  >
                    <option value="">Select month</option>
                    <option v-for="month in MONTHS" :key="month" :value="month">
                      {{ month }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">
                    Notes
                  </label>
                  <input
                    v-model="form.bestTimeToVisit.notes"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Great for wildebeest migration"
                  />
                </div>
              </div>
            </div>

            <!-- SETTINGS -->
            <div>
              <h3 class="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b">
                Settings
              </h3>
              <div class="flex flex-col gap-3">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="form.isActive" />
                  <span class="text-sm text-gray-700">Active (visible on website)</span>
                </label>
                
               
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-md">
              <p class="text-xs text-red-600">{{ error }}</p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t flex items-center justify-end gap-2">
            <button
              type="button"
              class="rounded-lg px-3 py-2 text-xs md:text-sm border bg-white text-gray-700 hover:bg-gray-50"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg px-4 py-2 text-xs md:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
              :disabled="isSaving"
              @click="savePark"
            >
              {{ isSaving ? 'Saving...' : (isEditing ? 'Save changes' : 'Create Park') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAsyncData } from '#app' // Nuxt 4 helper



/* ================= CONSTANTS (kept the same) ================ */
const PARK_REGIONS = [
  'Northern Circuit', 'Southern Circuit', 'Western Circuit',
  'Central Tanzania', 'Eastern Tanzania', 'Zanzibar & Coastal'
]

const PARK_LOCATIONS = [
  'Northern Tanzania', 'Southern Tanzania', 'Western Tanzania',
  'Central Tanzania', 'Eastern Tanzania', 'Zanzibar Archipelago'
]

const PARK_CATEGORIES = [
  'National Park', 'Conservation Area', 'Game Reserve', 'UNESCO World Heritage Site'
]

const WILDLIFE_HIGHLIGHTS = [
  'Lion', 'Elephant', 'Leopard', 'Rhino', 'Buffalo', 'Cheetah',
  'Giraffe', 'Zebra', 'Wildebeest', 'Hippo', 'Crocodile',
  'Antelope', 'Birdlife'
]

const PARK_ACTIVITIES = [
  'Game Drives', 'Hot Air Balloon Safari', 'Walking Safari',
  'Birdwatching', 'Cultural Visits', 'Photography Safari',
  'Night Drives', 'Picnic / Bush Lunch', 'Scenic Flights'
]

const CLIMATE_TYPES = [
  'Dry Savanna', 'Wet Savanna', 'Highland / Montane',
  'Forest & Riverine', 'Semi-Arid'
]

const LANDSCAPE_TYPES = [
  'Plains / Savannah', 'Craters / Caldera', 'Woodlands',
  'Wetlands / Lakes', 'Mountains / Hills', 'Floodplains'
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

definePageMeta({
  layout: 'dashboard',
  title: 'National Parks Management'
})

/* ================= REFS / STATE ================= */
const featuredImageInput = ref(null)
const galleryImagesInput = ref(null)
const statusFilter = ref('all')

const parks = ref([])
const showModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const isLoading = ref(false)
const error = ref('')

const form = ref({
  id: null,
  name: '',
  slug: '',
  shortDescription: '',
  description: '',
  featuredImage: '',
  gallery: [],
  region: '',
  location: '',
  category: '',
  areaKm2: null,
  establishedYear: null,
  wildlifeHighlights: [],
  activities: [],
  bestTimeToVisit: { from: '', to: '', notes: '' },
  climate: '',
  landscape: '',
  isFeatured: false,
  order: 0,
  isActive: true
})

/* ================= HELPERS ================= */
function getCategoryClass(category) {
  const classes = {
    'National Park': 'bg-green-100 text-green-800',
    'Conservation Area': 'bg-blue-100 text-blue-800',
    'Game Reserve': 'bg-amber-100 text-amber-800',
    'UNESCO World Heritage Site': 'bg-purple-100 text-purple-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

function handleImageError(event) {
  if (!event?.target) return
  console.warn('Failed to load image:', event.target?.src)
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlNWU1ZTUiLz4KPHBhdGggZD0iTTI1IDI1SDUwVjUwSDI1VjI1Wk02Mi41IDI1SDc1VjM3LjVINjIuNVYyNVpNMjUgNjIuNUg1MFY3LjVIMjVWNjIuNVpNNjIuNSA1MEg3NVY2Mi41SDYyLjVWNTVaIiBmaWxsPSIjY2NjIi8+CjxwYXRoIGQ9Ik01MCA2Mi41SDc1Vjc1SDUwVjYyLjVaIiBmaWxsPSIjY2NjIi8+Cjwvc3ZnPgo='
  event.target.alt = 'Image not available'
}

/* convert single File to data URL */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => {
      reader.abort()
      reject(new Error('Problem reading file'))
    }
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}

/* ================= IMAGE HANDLERS (client uses base64/data-URL) ================= */
async function onFeaturedImageSelected(e) {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    const dataUrl = await fileToDataUrl(file)
    form.value.featuredImage = dataUrl
  } catch (err) {
    console.error('featured image read failed', err)
  }
}

function removeFeaturedImage() {
  form.value.featuredImage = ''
  if (featuredImageInput.value) featuredImageInput.value.value = ''
}

async function onGalleryImagesSelected(e) {
  const files = Array.from(e.target.files || [])
  if (!files.length) return
  try {
    const promises = files.map(f => fileToDataUrl(f))
    const results = await Promise.all(promises)
    for (const r of results) form.value.gallery.push(r)
  } catch (err) {
    console.error('gallery read failed', err)
  } finally {
    if (galleryImagesInput.value) galleryImagesInput.value.value = ''
  }
}

function removeGalleryImage(index) {
  form.value.gallery.splice(index, 1)
}

function clearGallery() {
  form.value.gallery = []
  if (galleryImagesInput.value) galleryImagesInput.value.value = ''
}

/* ================= SSR-aware DATA FETCH ================= */

/*
  useAsyncData so the parks are fetched server-side on page load (SSR)
  and can be refreshed client-side when needed.
*/
const { data: parksPayload, pending, refresh: refreshParks, error: parksError } = useAsyncData(
  'parks-list',
  async () => {
    const params = {}
    if (statusFilter.value === 'active') params.status = 'active'
    if (statusFilter.value === 'inactive') params.status = 'inactive'
    const res = await $fetch('/api/parks', { params })
    return res
  },
  { server: true, immediate: true }
)

// keep isLoading synced with pending
watch(pending, (p) => {
  isLoading.value = !!p
}, { immediate: true })

// when payload arrives, populate parks ref
watch(parksPayload, (p) => {
  if (!p) {
    parks.value = []
    return
  }
  parks.value = Array.isArray(p.data) ? p.data : (p.data || [])
}, { immediate: true })

// if the status filter changes, refresh server-side fetch
watch(statusFilter, async () => {
  await refreshParks()
})

/* wrapper to refresh parks from server (used after create/update/delete) */
async function reloadParks() {
  await refreshParks()
  // parksPayload watcher updates parks.value
}

/* ================= API INTERACTIONS ================= */

/* Create or Update park */
async function savePark() {
  error.value = ''
  // client validation
  const requiredFields = ['name', 'slug', 'shortDescription', 'description', 'region', 'location', 'category']
  for (const field of requiredFields) {
    const v = form.value[field]
    if (!v || (typeof v === 'string' && !v.trim())) {
      error.value = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`
      return
    }
  }

  isSaving.value = true
  try {
    const payload = { ...form.value }
    if (payload.id) delete payload.id

    if (isEditing.value && form.value.id) {
      const id = form.value.id
      const res = await $fetch(`/api/parks/${id}`, { method: 'PUT', body: payload })
      if (!res?.ok) {
        error.value = res?.error || 'Failed to update park'
      } else {
        await reloadParks()
        closeModal()
      }
    } else {
      const res = await $fetch('/api/parks', { method: 'POST', body: payload })
      if (!res?.ok) {
        error.value = res?.error || 'Failed to create park'
      } else {
        await reloadParks()
        closeModal()
      }
    }
  } catch (err) {
    console.error('Save park error', err)
    if (err?.data?.error) error.value = err.data.error
    else error.value = err?.message || 'An unexpected error occurred'
  } finally {
    isSaving.value = false
  }
}

/* Delete */
async function deletePark(id) {
  if (!confirm('Are you sure you want to delete this park? This action cannot be undone.')) return
  try {
    const res = await $fetch(`/api/parks/${id}`, { method: 'DELETE' })
    if (res && res.ok) {
      await reloadParks()
    } else {
      alert(res?.error || 'Failed to delete')
    }
  } catch (err) {
    console.error('Delete failed', err)
    alert('Delete failed')
  }
}

/* ================= MODAL / FORM HANDLERS ================= */
function openCreateModal() {
  resetForm()
  isEditing.value = false
  error.value = ''
  showModal.value = true
}

function openEditModal(park) {
  form.value = {
    id: park._id || park.id || null,
    name: park.name || '',
    slug: park.slug || '',
    shortDescription: park.shortDescription || '',
    description: park.description || '',
    featuredImage: park.featuredImage || '',
    gallery: Array.isArray(park.gallery) ? [...park.gallery] : (park.gallery ? [park.gallery] : []),
    region: park.region || '',
    location: park.location || '',
    category: park.category || '',
    areaKm2: park.areaKm2 ?? null,
    establishedYear: park.establishedYear ?? null,
    wildlifeHighlights: park.wildlifeHighlights ? [...park.wildlifeHighlights] : [],
    activities: park.activities ? [...park.activities] : [],
    bestTimeToVisit: park.bestTimeToVisit ? { ...park.bestTimeToVisit } : { from: '', to: '', notes: '' },
    climate: park.climate || '',
    landscape: park.landscape || '',
    isFeatured: park.isFeatured || false,
    order: park.order ?? 0,
    isActive: park.isActive !== undefined ? park.isActive : true
  }
  isEditing.value = true
  error.value = ''
  showModal.value = true
}

function resetForm() {
  form.value = {
    id: null,
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    featuredImage: '',
    gallery: [],
    region: '',
    location: '',
    category: '',
    areaKm2: null,
    establishedYear: null,
    wildlifeHighlights: [],
    activities: [],
    bestTimeToVisit: { from: '', to: '', notes: '' },
    climate: '',
    landscape: '',
    isFeatured: false,
    order: 0,
    isActive: true
  }
  if (featuredImageInput.value) featuredImageInput.value.value = ''
  if (galleryImagesInput.value) galleryImagesInput.value.value = ''
}

function closeModal() {
  showModal.value = false
  error.value = ''
}

/* ================= COMPUTED ================= */
const displayedParks = computed(() => {
  if (statusFilter.value === 'active') {
    return parks.value.filter(park => park.isActive === true)
  } else if (statusFilter.value === 'inactive') {
    return parks.value.filter(park => park.isActive === false)
  }
  return parks.value
})
</script>

<style scoped>
/* Custom scrollbar for modal */
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
  background: #a1a1a1;
}

/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Image styling */
img {
  transition: opacity 0.2s ease;
}

img:hover {
  opacity: 0.9;
}

/* Gallery image hover effect */
.group:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
