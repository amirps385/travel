<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- HEADER -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Routes
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage trekking routes, itineraries, and pricing.
            </p>
          </div>

          <button
            type="button"
            @click="newRoute"
            class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2"
          >
            <span class="text-lg">＋</span> Add Route
          </button>
        </div>

        <!-- SEARCH AND FILTER -->
        <div class="mb-4 flex gap-2">
          <input
            v-model="filter"
            @input="debouncedLoad"
            placeholder="Search routes..."
            class="flex-1 px-3 py-2 border rounded-lg"
          />
          <div class="flex gap-2">
            <button @click="prevPage" :disabled="page === 1" class="px-3 py-2 border rounded-lg text-sm">
              Prev
            </button>
            <button
              @click="nextPage"
              :disabled="routes.length < perPage"
              class="px-3 py-2 border rounded-lg text-sm"
            >
              Next
            </button>
          </div>
        </div>

        <!-- TABLE -->
        <div class="border rounded-2xl overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">Route</th>
                <th class="py-3 px-4">Slug</th>
                <th class="py-3 px-4">Region</th>
                <th class="py-3 px-4">Difficulty</th>
                <th class="py-3 px-4">Duration</th>
                <th class="py-3 px-4">Price</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="r in routes"
                :key="r._id"
                class="border-b last:border-b-0 hover:bg-slate-50/80"
              >
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="r.featuredImage || r.heroImage || r.gallery?.[0] || placeholder"
                      class="w-14 h-10 object-cover rounded"
                    />
                    <div>
                      <div class="font-medium text-slate-900">{{ r.name }}</div>
                      <div class="text-xs text-slate-500">{{ r.tagline }}</div>
                    </div>
                  </div>
                </td>

                <td class="py-3 px-4 text-slate-700">
                  /{{ r.slug }}
                </td>

                <td class="py-3 px-4 text-slate-700">
                  {{ r.region || '—' }}
                </td>

                <td class="py-3 px-4">
                  <span class="px-2 py-1 text-xs rounded-full" :class="difficultyClass(r.difficulty)">
                    {{ r.difficulty || '—' }}
                  </span>
                </td>

                <td class="py-3 px-4 text-slate-700">
                  <span v-if="r.durationMin && r.durationMax">
                    {{ r.durationMin === r.durationMax ? r.durationMin + ' Day' + (r.durationMin > 1 ? 's' : '') : r.durationMin + '–' + r.durationMax + ' Days' }}
                  </span>
                  <span v-else-if="r.duration" class="text-slate-400">
                    {{ r.duration }}
                  </span>
                  <span v-else class="text-slate-400">—</span>
                </td>

                <td class="py-3 px-4">
                  <span v-if="r.startingPrice" class="font-medium">
                    ${{ r.startingPrice }}
                  </span>
                  <span v-else class="text-slate-400">—</span>
                </td>

                <td class="py-3 px-4">
                  <span class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full" :class="r.isActive ? 'bg-emerald-500' : 'bg-slate-300'"></span>
                    <span class="text-xs">{{ r.isActive ? 'Active' : 'Draft' }}</span>
                  </span>
                </td>

                <td class="py-3 px-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <button
                      @click.stop="editRoute(r)"
                      class="p-2 rounded-lg border hover:bg-slate-100"
                      title="Edit"
                    >
                      ✎
                    </button>

                    <button
                      @click="confirmDelete(r)"
                      class="p-2 text-rose-600 border rounded-lg hover:bg-rose-50"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!routes.length && !loadingList">
                <td colspan="8" class="p-4 text-center text-xs text-slate-500">
                  No routes found. Click "Add Route" to create one.
                </td>
              </tr>

              <tr v-if="loadingList">
                <td colspan="8" class="p-4 text-center text-xs text-slate-500">
                  Loading routes...
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION INFO -->
        <div class="mt-4 flex justify-between text-xs text-slate-500">
          <span>{{ routes.length }} routes</span>
          <span>Page {{ page }}</span>
        </div>
      </div>
    </div>

    <!-- ROUTE EDITING MODAL -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <div class="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-y-auto max-h-[90vh] my-8">
          <!-- MODAL HEADER -->
          <div class="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between z-10">
            <div>
              <h2 class="text-lg font-semibold">
                {{ isEditing ? 'Edit Route' : 'Create Route' }}
              </h2>
              <p class="text-sm text-slate-500">
                Fill details and save
              </p>
            </div>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-1 text-sm">
                <input type="checkbox" v-model="form.isActive" /> Active
              </label>
              <label class="flex items-center gap-1 text-sm">
                <input type="checkbox" v-model="form.isFeatured" /> Featured
              </label>
              <button class="p-2 rounded hover:bg-slate-100" @click="resetForm">✕</button>
            </div>
          </div>

          <!-- MODAL BODY -->
          <div class="px-6 py-5">
            <!-- FORM GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- LEFT FIELDS -->
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold mb-1">Name *</label>
                  <input v-model="form.name" class="w-full border rounded-lg px-3 py-2" />
                  <p v-if="!form.name" class="text-red-500 text-xs mt-1">Name is required</p>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Slug *</label>
                  <div class="flex gap-2">
                    <input v-model="form.slug" class="flex-1 border rounded-lg px-3 py-2" />
                    <button @click="generateSlug" class="px-3 py-2 border rounded-lg text-sm whitespace-nowrap">
                      Auto
                    </button>
                  </div>
                  <p v-if="!form.slug" class="text-red-500 text-xs mt-1">Slug is required</p>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Tagline</label>
                  <input v-model="form.tagline" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Short description (card)</label>
                  <input v-model="form.shortDescription" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <!-- REGION FIELD -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Region *</label>
                  <select v-model="form.region" class="w-full border rounded-lg px-3 py-2 bg-white">
                    <option value="">Select a region</option>
                    <option value="Kilimanjaro">Kilimanjaro</option>
                    <option value="Serengeti">Serengeti</option>
                    <option value="Ngorongoro">Ngorongoro</option>
                    <option value="Tarangire">Tarangire</option>
                    <option value="Lake Manyara">Lake Manyara</option>
                    <option value="Mount Meru">Mount Meru</option>
                    <option value="Zanzibar">Zanzibar</option>
                    <option value="Selous">Selous</option>
                    <option value="Ruaha">Ruaha</option>
                    <option value="Mafia Island">Mafia Island</option>
                    <option value="Other">Other</option>
                  </select>
                  <p v-if="!form.region" class="text-red-500 text-xs mt-1">Region is required</p>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-semibold mb-1">Min Duration (days) *</label>
                    <input 
                      type="number" 
                      v-model.number="form.durationMin" 
                      min="1" 
                      max="365" 
                      class="w-full border rounded-lg px-3 py-2" 
                    />
                    <p v-if="!form.durationMin" class="text-red-500 text-xs mt-1">Min duration is required</p>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold mb-1">Max Duration (days) *</label>
                    <input 
                      type="number" 
                      v-model.number="form.durationMax" 
                      min="1" 
                      max="365" 
                      class="w-full border rounded-lg px-3 py-2" 
                    />
                    <p v-if="!form.durationMax" class="text-red-500 text-xs mt-1">Max duration is required</p>
                  </div>
                </div>

                <!-- Duration validation message -->
                <div v-if="form.durationMin && form.durationMax && form.durationMin > form.durationMax" 
                     class="text-red-500 text-xs mt-1">
                  Minimum duration cannot be greater than maximum duration
                </div>

                <!-- Duration display preview -->
                <div v-if="form.durationMin && form.durationMax" class="text-xs text-slate-600 mt-1">
                  Display: <span class="font-medium">{{ displayDuration }}</span>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Starting price (USD)</label>
                  <input type="number" v-model.number="form.startingPrice" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Difficulty *</label>
                  <select v-model="form.difficulty" class="w-full border rounded-lg px-3 py-2">
                    <option value="">Select</option>
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Challenging</option>
                    <option>Very Challenging</option>
                  </select>
                  <p v-if="!form.difficulty" class="text-red-500 text-xs mt-1">Difficulty is required</p>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Success rate (e.g. 95%)</label>
                  <input v-model="form.successRate" class="w-full border rounded-lg px-3 py-2" />
                </div>

                <!-- STATS FIELDS - IMPROVED FOR ADMINS -->
                <div class="border-t pt-4 mt-4">
                  <h4 class="text-sm font-semibold mb-3 text-slate-700">Route Statistics</h4>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <!-- Starting altitude (meters) -->
                    <div>
                      <label class="block text-xs font-semibold mb-1">Starting Altitude (m)</label>
                      <input type="number" v-model.number="form.stats.startingAltitude.value" min="0" step="1" placeholder="e.g. 900" class="w-full border rounded-lg px-3 py-2" />
                      <p class="text-xs text-slate-500 mt-1">Enter numeric altitude in meters (no suffix). Example: <em>900</em>.</p>

                      <label class="block text-xs font-semibold mb-1 mt-2">Starting Altitude — detail</label>
                      <input v-model="form.stats.startingAltitude.detail" class="w-full border rounded-lg px-3 py-2" placeholder="Optional context (e.g. 'base camp area')" />
                    </div>

                    <!-- Max altitude (meters) -->
                    <div>
                      <label class="block text-xs font-semibold mb-1">Max Altitude (m)</label>
                      <input type="number" v-model.number="form.stats.maxAltitude.value" min="0" step="1" placeholder="e.g. 5895" class="w-full border rounded-lg px-3 py-2" />
                      <p class="text-xs text-slate-500 mt-1">Highest point of the route in meters (numeric only).</p>

                      <label class="block text-xs font-semibold mb-1 mt-2">Max Altitude — detail</label>
                      <input v-model="form.stats.maxAltitude.detail" class="w-full border rounded-lg px-3 py-2" placeholder="Optional context (e.g. 'summit')"/>
                    </div>

                    <!-- Total distance (km) -->
                    <div>
                      <label class="block text-xs font-semibold mb-1">Total Distance (km)</label>
                      <input type="number" v-model.number="form.stats.totalDistance.value" min="0" step="0.1" placeholder="e.g. 60.5" class="w-full border rounded-lg px-3 py-2" />
                      <p class="text-xs text-slate-500 mt-1">Enter numeric total distance in kilometres (decimal allowed).</p>

                      <label class="block text-xs font-semibold mb-1 mt-2">Total Distance — detail</label>
                      <input v-model="form.stats.totalDistance.detail" class="w-full border rounded-lg px-3 py-2" placeholder="Optional detail (e.g. 'approx from trailhead')"/>
                    </div>

                    <!-- Best season (FROM / TO dropdowns) -->
                    <div>
                      <label class="block text-xs font-semibold mb-1">Best Season — From</label>
                      <select v-model="form.stats.bestSeason.from" class="w-full border rounded-lg px-3 py-2">
                        <option value="">Select</option>
                        <option v-for="m in months" :key="'from-'+m" :value="m">{{ m }}</option>
                        <option value="Year-round">Year-round</option>
                      </select>
                      <label class="block text-xs font-semibold mb-1 mt-2">Best Season — To</label>
                      <select v-model="form.stats.bestSeason.to" class="w-full border rounded-lg px-3 py-2">
                        <option value="">Select</option>
                        <option v-for="m in months" :key="'to-'+m" :value="m">{{ m }}</option>
                        <option value="Year-round">Year-round</option>
                      </select>
                      <p class="text-xs text-slate-500 mt-1">Choose a <strong>From</strong> and <strong>To</strong> month. Use <em>Year-round</em> if applicable.</p>

                      <label class="block text-xs font-semibold mb-1 mt-2">Best Season — detail</label>
                      <input v-model="form.stats.bestSeason.detail" class="w-full border rounded-lg px-3 py-2" placeholder="Optional: e.g. 'Dry season is best (July-Sep)'" />
                    </div>

                    <!-- Acclimatization -->
                    <div class="md:col-span-2">
                      <label class="block text-xs font-semibold mb-1">Acclimatization — recommended days</label>
                      <input type="number" v-model.number="form.stats.acclimatization.value" min="0" step="1" placeholder="e.g. 1" class="w-full border rounded-lg px-3 py-2" />
                      <p class="text-xs text-slate-500 mt-1">
                        Number of recommended acclimatization days (numeric). For example, if the route requires a rest day at mid-altitude, enter <em>1</em>.
                      </p>

                      <label class="block text-xs font-semibold mb-1 mt-2">Acclimatization — detail</label>
                      <input v-model="form.stats.acclimatization.detail" class="w-full border rounded-lg px-3 py-2" placeholder="Optional guidance (e.g. 'rest at 3500m before summit push')" />
                    </div>
                  </div>
                </div>

                <!-- HIGHLIGHTS SECTION - UPDATED -->
                <div>
                  <label class="block text-xs font-semibold mb-2">Highlights / Tags</label>
                  
                  <!-- Input with Add button -->
                  <div class="flex gap-2 mb-2">
                    <input
                      v-model="highlightInput"
                      @keyup.enter="addHighlight"
                      placeholder="Enter a highlight and press Enter or click Add"
                      class="flex-1 border rounded-lg px-3 py-2"
                    />
                    <button
                      @click="addHighlight"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                    >
                      Add
                    </button>
                  </div>
                  
                  <!-- Highlights Display -->
                  <div class="flex flex-wrap gap-2 mt-2">
                    <div
                      v-for="(highlight, index) in form.highlights"
                      :key="index"
                      class="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>#{{ highlight }}</span>
                      <button
                        @click="removeHighlight(index)"
                        class="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  
                  <!-- Quick add common highlights (optional) -->
                  <div class="mt-3">
                    <p class="text-xs text-slate-500 mb-1">Quick add common highlights:</p>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="common in commonHighlights"
                        :key="common"
                        @click="addCommonHighlight(common)"
                        class="px-2 py-1 text-xs border rounded-lg hover:bg-blue-50"
                      >
                        {{ common }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- WHAT'S INCLUDED/NOT INCLUDED SECTION - NEW -->
                <div class="border-t pt-4 mt-4">
                  <h4 class="text-sm font-semibold mb-3 text-slate-700">What's Included / Not Included</h4>
                  
                  <!-- Included Items -->
                  <div class="mb-4">
                    <label class="block text-xs font-semibold mb-2">Included Items</label>
                    <div class="flex gap-2 mb-2">
                      <input
                        v-model="includedInput"
                        @keyup.enter="addIncludedItem"
                        placeholder="Add included item"
                        class="flex-1 border rounded-lg px-3 py-2"
                      />
                      <button
                        @click="addIncludedItem"
                        class="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
                      >
                        Add
                      </button>
                    </div>
                    
                    <!-- Included Items List -->
                    <div class="flex flex-wrap gap-2">
                      <div
                        v-for="(item, index) in form.whatsIncluded.included"
                        :key="`included-${index}`"
                        class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>✓ {{ item }}</span>
                        <button
                          @click="removeIncludedItem(index)"
                          class="ml-1 text-emerald-600 hover:text-emerald-800"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Not Included Items -->
                  <div>
                    <label class="block text-xs font-semibold mb-2">Not Included Items</label>
                    <div class="flex gap-2 mb-2">
                      <input
                        v-model="notIncludedInput"
                        @keyup.enter="addNotIncludedItem"
                        placeholder="Add not included item"
                        class="flex-1 border rounded-lg px-3 py-2"
                      />
                      <button
                        @click="addNotIncludedItem"
                        class="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm"
                      >
                        Add
                      </button>
                    </div>
                    
                    <!-- Not Included Items List -->
                    <div class="flex flex-wrap gap-2">
                      <div
                        v-for="(item, index) in form.whatsIncluded.notIncluded"
                        :key="`notincluded-${index}`"
                        class="inline-flex items-center gap-1 bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>✗ {{ item }}</span>
                        <button
                          @click="removeNotIncludedItem(index)"
                          class="ml-1 text-rose-600 hover:text-rose-800"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    
                    <!-- Note Field -->
                    <div class="mt-4">
                      <label class="block text-xs font-semibold mb-2">Additional Note</label>
                      <textarea
                        v-model="form.whatsIncluded.note"
                        rows="2"
                        placeholder="e.g., Travel insurance is highly recommended for all our experiences"
                        class="w-full border rounded-lg px-3 py-2"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold mb-1">Description (long) *</label>
                  <textarea v-model="form.description" rows="6" class="w-full border rounded-lg px-3 py-2"></textarea>
                  <p v-if="!form.description" class="text-red-500 text-xs mt-1">Description is required</p>
                </div>
              </div>

              <!-- RIGHT MEDIA / SEO -->
              <div class="space-y-4">
                <!-- FEATURED IMAGE -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Featured image URL</label>
                  <div class="flex gap-2">
                    <input v-model="form.featuredImage" class="flex-1 border rounded-lg px-3 py-2" placeholder="https://..." />
                    <input 
                      type="file" 
                      @change="onFileChange($event, 'featuredImage')" 
                      class="border rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                      accept="image/*"
                    />
                  </div>
                  <img
                    v-if="form.featuredImage"
                    :src="form.featuredImage"
                    class="mt-2 h-36 w-full object-cover rounded-lg"
                  />
                </div>

                <!-- HERO IMAGE -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Hero image URL</label>
                  <div class="flex gap-2">
                    <input v-model="form.heroImage" class="flex-1 border rounded-lg px-3 py-2" placeholder="https://..." />
                    <input 
                      type="file" 
                      @change="onFileChange($event, 'heroImage')" 
                      class="border rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                      accept="image/*"
                    />
                  </div>
                  <img
                    v-if="form.heroImage"
                    :src="form.heroImage"
                    class="mt-2 h-36 w-full object-cover rounded-lg"
                  />
                </div>

                <!-- GALLERY -->
                <div>
                  <label class="block text-xs font-semibold mb-1">Gallery</label>
                  <div class="flex gap-2 mb-2">
                    <input
                      type="file"
                      multiple
                      @change="onGalleryFiles"
                      class="flex-1 border rounded-lg px-3 py-2 text-sm"
                      accept="image/*"
                    />
                    <button
                      @click="showGalleryModal = true"
                      class="px-3 py-2 border rounded-lg text-sm whitespace-nowrap"
                    >
                      Manage
                    </button>
                  </div>
                  
                  <!-- Gallery preview -->
                  <div class="mt-3 grid grid-cols-4 gap-2">
                    <div
                      v-for="(g, i) in form.gallery"
                      :key="i"
                      class="relative group"
                    >
                      <img
                        :src="g"
                        class="h-20 w-full object-cover rounded-lg"
                      />
                      <button
                        @click="removeGalleryImage(i)"
                        class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>

                <!-- SEO -->
                <div class="border-t pt-4">
                  <h4 class="text-sm font-semibold mb-3 text-slate-700">SEO Settings</h4>
                  <div>
                    <label class="block text-xs font-semibold mb-1">SEO Title</label>
                    <input v-model="form.seo.title" class="w-full border rounded-lg px-3 py-2" />
                  </div>
                  
                  <div class="mt-3">
                    <label class="block text-xs font-semibold mb-1">SEO Description</label>
                    <input v-model="form.seo.description" class="w-full border rounded-lg px-3 py-2" />
                  </div>

                  <div class="mt-3">
                    <label class="block text-xs font-semibold mb-1">SEO Keywords (comma separated)</label>
                    <input v-model="seoKeywordsInput" @change="syncSeoKeywords" class="w-full border rounded-lg px-3 py-2" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Itinerary editor -->
            <div class="mt-6 border-t pt-6">
              <h3 class="text-base font-semibold text-slate-800 mb-3">Itinerary (day-by-day)</h3>
              <div class="space-y-3">
                <div v-for="(day, idx) in form.itinerary" :key="idx" class="border rounded-lg p-3 bg-slate-50">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label class="text-xs text-slate-600">Day no</label>
                      <input type="number" v-model.number="day.day" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div class="md:col-span-2">
                      <label class="text-xs text-slate-600">Title</label>
                      <input v-model="day.title" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div class="md:col-span-3">
                      <label class="text-xs text-slate-600">Description</label>
                      <textarea v-model="day.description" rows="3" class="w-full border rounded-lg px-2 py-1"></textarea>
                    </div>
                    <div>
                      <label class="text-xs text-slate-600">Altitude</label>
                      <input v-model="day.altitude" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div class="md:col-span-2">
                      <label class="text-xs text-slate-600">Image URL</label>
                      <div class="flex gap-2">
                        <input v-model="day.image" class="flex-1 border rounded-lg px-2 py-1" placeholder="https://..." />
                        <input 
                          type="file" 
                          @change="onFileChange($event, 'itinerary', idx)" 
                          class="border rounded-lg px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 flex justify-end">
                    <button @click="removeItinerary(idx)" class="px-3 py-1 text-sm border rounded-lg text-red-600">
                      Remove Day
                    </button>
                  </div>
                </div>

                <div class="flex gap-2">
                  <button @click="addItinerary" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                    Add Day
                  </button>
                  <button @click="sortItinerary" class="px-3 py-2 border rounded-lg text-sm">
                    Sort by Day
                  </button>
                </div>
              </div>
            </div>

            <!-- Group climbs editor -->
            <div class="mt-6 border-t pt-6">
              <h3 class="text-base font-semibold text-slate-800 mb-3">Group Climbs</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(c, idx) in form.groupClimbs" :key="idx" class="border rounded-lg p-3 bg-slate-50">
                  <label class="text-xs text-slate-600">Departure date</label>
                  <input type="date" v-model="c.date" class="w-full border rounded-lg px-2 py-1 mb-2" />
                  
                  <div class="grid grid-cols-3 gap-2 mb-2">
                    <div>
                      <label class="text-xs text-slate-600">Days</label>
                      <input type="number" v-model.number="c.days" placeholder="days" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div>
                      <label class="text-xs text-slate-600">Price</label>
                      <input type="number" v-model.number="c.price" placeholder="price" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                    <div>
                      <label class="text-xs text-slate-600">Group</label>
                      <input type="number" v-model.number="c.groupSize" placeholder="size" class="w-full border rounded-lg px-2 py-1" />
                    </div>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-600">Spots left</span>
                    <input type="number" v-model.number="c.spotsLeft" class="w-20 border rounded-lg px-2 py-1" />
                  </div>
                  
                  <div class="mt-2 text-right">
                    <button @click="removeClimb(idx)" class="px-3 py-1 text-sm border rounded-lg text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <button @click="addClimb" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                  Add Group Climb
                </button>
              </div>
            </div>

            <!-- FAQs editor -->
            <div class="mt-6 border-t pt-6">
              <h3 class="text-base font-semibold text-slate-800 mb-3">FAQs</h3>
              <div class="space-y-3">
                <div v-for="(f, idx) in form.faqs" :key="idx" class="border rounded-lg p-3 bg-slate-50">
                  <input v-model="f.question" placeholder="Question" class="w-full border rounded-lg px-2 py-1 mb-2" />
                  <textarea v-model="f.answer" rows="3" class="w-full border rounded-lg px-2 py-1" placeholder="Answer"></textarea>
                  <div class="mt-2 text-right">
                    <button @click="removeFaq(idx)" class="px-3 py-1 border rounded-lg text-red-600 text-sm">
                      Remove FAQ
                    </button>
                  </div>
                </div>
                <button @click="addFaq" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">
                  Add FAQ
                </button>
              </div>
            </div>

            <!-- SAVE BUTTONS -->
            <div class="mt-6 border-t pt-6 flex flex-wrap gap-3 items-center">
              <button
                @click="save"
                :disabled="saving || !isFormValid"
                class="px-6 py-3 bg-emerald-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Saving...' : isEditing ? 'Update Route' : 'Create Route' }}
              </button>

              <button
                @click="saveAndPublish"
                :disabled="saving || !isFormValid"
                class="px-6 py-3 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save & Publish
              </button>

              <button
                @click="resetForm"
                class="px-6 py-3 border rounded-lg"
              >
                Cancel
              </button>

              <span v-if="message" class="text-sm" :class="messageType === 'error' ? 'text-red-600' : 'text-emerald-600'">
                {{ message }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Gallery Management Modal -->
    <div v-if="showGalleryModal" class="fixed inset-0 bg-black/30 z-60 flex items-center justify-center px-4">
      <div class="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Manage Gallery Images</h3>
          <button @click="showGalleryModal = false" class="p-2 rounded hover:bg-slate-100">
            ✕
          </button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(g, i) in form.gallery" :key="i" class="relative group">
            <img :src="g" class="w-full h-32 object-cover rounded-lg" />
            <button
              @click="removeGalleryImage(i)"
              class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm"
            >
              ×
            </button>
            <input
              v-model="form.gallery[i]"
              class="mt-2 w-full px-2 py-1 text-xs border rounded-lg"
              placeholder="Image URL"
            />
          </div>
        </div>
        
        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="showGalleryModal = false"
            class="px-4 py-2 border rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard', title: 'Dashboard - Routes' })
import { ref, reactive, computed, onMounted } from 'vue'
import { getCurrentInstance } from 'vue'

const placeholder = '/images/placeholder.png'

// months for dropdowns
const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

// list state
const routes = ref([])
const loadingList = ref(false)
const page = ref(1)
const perPage = ref(20)
const filter = ref('')

// form state
const isEditing = ref(false)
const editId = ref(null)
const saving = ref(false)
const message = ref('')
const messageType = ref('success') // 'success' or 'error'
const showModal = ref(false)
const showGalleryModal = ref(false)

// Form validation - UPDATED
const isFormValid = computed(() => {
  return form.name && form.slug && form.description && form.difficulty &&
         form.durationMin && form.durationMax &&
         form.durationMin <= form.durationMax &&
         form.region // Region required
})

// Duration display helper
const displayDuration = computed(() => {
  if (form.durationMin && form.durationMax) {
    if (form.durationMin === form.durationMax) {
      return `${form.durationMin} Day${form.durationMin > 1 ? 's' : ''}`
    }
    return `${form.durationMin}–${form.durationMax} Days`
  }
  return ''
})

const defaultForm = () => ({
  name: '',
  slug: '',
  tagline: '',
  shortDescription: '',
  region: '',
  duration: '', // Keep for backward compatibility (auto-generated)
  durationMin: null,
  durationMax: null,
  startingPrice: null,
  difficulty: '',
  successRate: '',
  highlights: [],
  whatsIncluded: {
    included: [],
    notIncluded: [],
    note: ''
  },
  featuredImage: '',
  heroImage: '',
  gallery: [],
  description: '',
  // stats: numeric-friendly defaults (use numbers for numeric fields)
  stats: {
    startingAltitude: { value: null, detail: '' },
    maxAltitude: { value: null, detail: '' },
    totalDistance: { value: null, detail: '' },
    // NEW shape for bestSeason: { from, to, detail }
    bestSeason: { from: '', to: '', detail: '' },
    acclimatization: { value: null, detail: '' }
  },
  itinerary: [],
  groupClimbs: [],
  faqs: [],
  seo: { title: '', description: '', keywords: [] },
  isActive: true,
  isFeatured: false
})

const form = reactive(defaultForm())

// helper inputs for comma / textarea controls
const highlightInput = ref('')
const includedInput = ref('')
const notIncludedInput = ref('')
const seoKeywordsInput = ref('')
const commonHighlights = ref([
  'Scenic Views', 'Wildlife', 'Photography', 'Adventure',
  'Cultural Experience', 'Family Friendly', 'Beginner Friendly',
  'Expert Guide', 'Small Group', 'Luxury Accommodation'
])

// Difficulty color helper
const difficultyClass = (difficulty) => {
  switch(difficulty) {
    case 'Easy': return 'bg-emerald-100 text-emerald-800'
    case 'Moderate': return 'bg-blue-100 text-blue-800'
    case 'Challenging': return 'bg-amber-100 text-amber-800'
    case 'Very Challenging': return 'bg-red-100 text-red-800'
    default: return 'bg-slate-100 text-slate-800'
  }
}

// debounce helper
let timer = null
function debouncedLoad() {
  clearTimeout(timer)
  timer = setTimeout(() => { 
    page.value = 1 // Reset to first page when searching
    loadRoutes() 
  }, 400)
}

async function loadRoutes() {
  loadingList.value = true
  try {
    const q = new URLSearchParams()
    if (filter.value.trim()) q.set('search', filter.value.trim())
    q.set('page', String(page.value))
    q.set('limit', String(perPage.value))
    
    const url = '/api/routes' + (q.toString() ? `?${q.toString()}` : '')
    const res = await $fetch(url)
    
    if (res.success) {
      routes.value = res.data || []
    } else {
      routes.value = []
    }
  } catch (e) {
    console.error('loadRoutes error', e)
    routes.value = []
    showMessage('Failed to load routes', 'error')
  } finally {
    loadingList.value = false
  }
}

function prevPage(){ 
  if(page.value > 1){ 
    page.value--; 
    loadRoutes() 
  } 
}

function nextPage(){ 
  page.value++; 
  loadRoutes() 
}

function newRoute() {
  Object.assign(form, defaultForm())
  highlightInput.value = ''
  includedInput.value = ''
  notIncludedInput.value = ''
  seoKeywordsInput.value = ''
  isEditing.value = false
  editId.value = null
  message.value = ''
  showGalleryModal.value = false
  showModal.value = true
}

async function editRoute(r) {
  console.log('🚀 Edit clicked for route:', r.name, 'ID:', r._id)
  
  try {
    // Show loading
    message.value = 'Loading complete route data...'
    messageType.value = 'info'
    
    // Use the SAME endpoint but with ?id= parameter
    const response = await $fetch(`/api/routes?id=${r._id}`)
    
    console.log('📦 API Response:', response)
    
    if (!response.success || !response.data) {
      throw new Error('Failed to load route data')
    }
    
    const completeRoute = response.data
    console.log('✅ Complete route data loaded:', {
      name: completeRoute.name,
      hasHighlights: !!completeRoute.highlights,
      hasItinerary: !!completeRoute.itinerary,
      hasGallery: !!completeRoute.gallery,
      hasFAQs: !!completeRoute.faqs,
      hasWhatsIncluded: !!completeRoute.whatsIncluded
    })
    
    // Clear loading message
    message.value = ''
    
    // RESET FORM to defaults first
    Object.assign(form, defaultForm())
    
    // ========== POPULATE ALL FIELDS ==========

    // Basic fields
    form.name = completeRoute.name || ''
    form.slug = completeRoute.slug || ''
    form.tagline = completeRoute.tagline || ''
    form.shortDescription = completeRoute.shortDescription || ''
    form.description = completeRoute.description || ''
    form.featuredImage = completeRoute.featuredImage || ''
    form.heroImage = completeRoute.heroImage || ''
    form.duration = completeRoute.duration || ''
    form.durationMin = completeRoute.durationMin ?? null
    form.durationMax = completeRoute.durationMax ?? null
    form.startingPrice = completeRoute.startingPrice ?? null
    form.difficulty = completeRoute.difficulty || ''
    form.successRate = completeRoute.successRate || ''
    form.region = completeRoute.region || ''
    form.isActive = completeRoute.isActive !== undefined ? completeRoute.isActive : true
    form.isFeatured = completeRoute.isFeatured || false
    
    // Arrays
    form.highlights = Array.isArray(completeRoute.highlights) ? [...completeRoute.highlights] : []
    form.itinerary = Array.isArray(completeRoute.itinerary) ? [...completeRoute.itinerary] : []
    form.gallery = Array.isArray(completeRoute.gallery) ? [...completeRoute.gallery] : []
    form.faqs = Array.isArray(completeRoute.faqs) ? [...completeRoute.faqs] : []
    form.groupClimbs = Array.isArray(completeRoute.groupClimbs) ? [...completeRoute.groupClimbs] : []
    
    // Nested objects - STAT parsing
    const statsFromApi = completeRoute.stats || {}

    // Handle multiple legacy shapes:
    // - New: stats.bestSeason = { from, to, detail }
    // - Legacy: stats.bestSeason = { value: 'Jan–Mar', detail: '' } or stats.bestSeason.value = 'Year-round'
    const parsedBestSeason = normalizeBestSeasonFromApi(statsFromApi.bestSeason)

    form.stats = {
      startingAltitude: {
        value: parseNumberIfPossible(statsFromApi.startingAltitude?.value),
        detail: statsFromApi.startingAltitude?.detail || ''
      },
      maxAltitude: {
        value: parseNumberIfPossible(statsFromApi.maxAltitude?.value),
        detail: statsFromApi.maxAltitude?.detail || ''
      },
      totalDistance: {
        value: parseNumberIfPossible(statsFromApi.totalDistance?.value),
        detail: statsFromApi.totalDistance?.detail || ''
      },
      bestSeason: parsedBestSeason,
      acclimatization: {
        value: parseNumberIfPossible(statsFromApi.acclimatization?.value),
        detail: statsFromApi.acclimatization?.detail || ''
      }
    }

    form.whatsIncluded = completeRoute.whatsIncluded || defaultForm().whatsIncluded
    form.seo = completeRoute.seo || defaultForm().seo
    
    // Update SEO keywords input
    if (form.seo.keywords && Array.isArray(form.seo.keywords)) {
      seoKeywordsInput.value = form.seo.keywords.join(', ')
    } else {
      seoKeywordsInput.value = ''
    }
    
    // Clear helper inputs
    highlightInput.value = ''
    includedInput.value = ''
    notIncludedInput.value = ''
    
    // Log final form state
    console.log('📝 Form after loading:', {
      name: form.name,
      region: form.region,
      highlights: form.highlights,
      itinerary: form.itinerary,
      gallery: form.gallery,
      faqs: form.faqs,
      whatsIncluded: form.whatsIncluded,
      stats: form.stats
    })
    
    // Set editing mode
    isEditing.value = true
    editId.value = r._id
    showModal.value = true
    
    console.log('✅ Edit modal opened successfully')
    
  } catch (error) {
    console.error('❌ Error loading route for editing:', error)
    
    // Fallback: Use table data
    console.log('⚠️ Using fallback - table row data')
    
    // Reset form
    Object.assign(form, defaultForm())
    
    // Copy table data (limited but better than nothing)
    Object.keys(r).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        form[key] = r[key]
      }
    })
    
    // Ensure all arrays/objects exist
    const defaults = defaultForm()
    form.highlights = form.highlights || defaults.highlights
    form.itinerary = form.itinerary || defaults.itinerary
    form.gallery = form.gallery || defaults.gallery
    form.faqs = form.faqs || defaults.faqs
    form.groupClimbs = form.groupClimbs || defaults.groupClimbs
    form.stats = form.stats || defaults.stats
    form.whatsIncluded = form.whatsIncluded || defaults.whatsIncluded
    form.seo = form.seo || defaults.seo
    form.region = form.region || defaults.region
    
    // Set editing mode
    isEditing.value = true
    editId.value = r._id
    showModal.value = true
    
    showMessage('Loaded basic data. Some fields may be incomplete.', 'warning')
  }
}

function parseNumberIfPossible(val) {
  if (val === undefined || val === null || val === '') return null
  const n = Number(String(val).replace(/,/g,'').trim())
  return Number.isFinite(n) ? n : null
}

/*
 Normalizes incoming bestSeason from API (supports legacy shapes)
 - If API has { from, to, detail } -> return as-is
 - If API has { value: 'Jan–Mar', detail } -> try to split into from/to
 - If API has string like 'Jan–Mar' -> split
 - If 'Year-round' -> from/to = 'Year-round'
*/
function normalizeBestSeasonFromApi(apiBestSeason) {
  if (!apiBestSeason) return { from: '', to: '', detail: '' }

  // If already object with from/to
  if (typeof apiBestSeason === 'object' && apiBestSeason.from !== undefined) {
    return {
      from: apiBestSeason.from || '',
      to: apiBestSeason.to || '',
      detail: apiBestSeason.detail || ''
    }
  }

  // Legacy: { value: 'Jan–Mar', detail: '' }
  const val = (apiBestSeason.value ?? apiBestSeason) || ''
  if (typeof val === 'string') {
    const s = val.trim()
    if (!s) return { from: '', to: '', detail: apiBestSeason.detail || '' }

    // Year-round handling
    if (/year[-\s]*round/i.test(s)) {
      return { from: 'Year-round', to: 'Year-round', detail: apiBestSeason.detail || '' }
    }

    // split by dash or en dash
    const parts = s.split(/–|—|-/)
      .map(p => p.trim())
      .filter(Boolean)

    if (parts.length === 2) {
      return { from: parts[0], to: parts[1], detail: apiBestSeason.detail || '' }
    }

    // single token (e.g. 'July') treat as both from/to
    return { from: s, to: s, detail: apiBestSeason.detail || '' }
  }

  return { from: '', to: '', detail: '' }
}

function generateSlug() {
  if (!form.name) return
  form.slug = form.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .substring(0, 100) // Limit length
}

function syncSeoKeywords(){ 
  form.seo.keywords = seoKeywordsInput.value.split(',').map(s=>s.trim()).filter(Boolean) 
}

// Helper to show messages
function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

// HIGHLIGHTS FUNCTIONS
function addHighlight() {
  const highlight = highlightInput.value.trim()
  if (highlight) {
    if (!form.highlights) {
      form.highlights = []
    }
    // Check for duplicates
    if (!form.highlights.includes(highlight)) {
      form.highlights.push(highlight)
    }
    highlightInput.value = ''
  }
}

function removeHighlight(index) {
  form.highlights.splice(index, 1)
}

function addCommonHighlight(highlight) {
  if (!form.highlights) {
    form.highlights = []
  }
  if (!form.highlights.includes(highlight)) {
    form.highlights.push(highlight)
  }
}

// WHAT'S INCLUDED FUNCTIONS
function addIncludedItem() {
  const item = includedInput.value.trim()
  if (item) {
    if (!form.whatsIncluded.included) {
      form.whatsIncluded.included = []
    }
    // Check for duplicates
    if (!form.whatsIncluded.included.includes(item)) {
      form.whatsIncluded.included.push(item)
    }
    includedInput.value = ''
  }
}

function removeIncludedItem(index) {
  form.whatsIncluded.included.splice(index, 1)
}

function addNotIncludedItem() {
  const item = notIncludedInput.value.trim()
  if (item) {
    if (!form.whatsIncluded.notIncluded) {
      form.whatsIncluded.notIncluded = []
    }
    // Check for duplicates
    if (!form.whatsIncluded.notIncluded.includes(item)) {
      form.whatsIncluded.notIncluded.push(item)
    }
    notIncludedInput.value = ''
  }
}

function removeNotIncludedItem(index) {
  form.whatsIncluded.notIncluded.splice(index, 1)
}

// itinerary helpers
function addItinerary() {
  form.itinerary.push({ 
    day: (form.itinerary.length ? Math.max(...form.itinerary.map(d=>d.day||0)) + 1 : 1), 
    title: '', 
    description: '', 
    altitude: '', 
    image: '' 
  })
}

function removeItinerary(i) { 
  form.itinerary.splice(i, 1) 
}

function sortItinerary(){ 
  form.itinerary.sort((a,b)=> (a.day||0) - (b.day||0)) 
}

// group climbs
function addClimb(){ 
  form.groupClimbs.push({ 
    date: new Date().toISOString().slice(0,10), 
    days: null, 
    price: null, 
    groupSize: null, 
    spotsLeft: 0 
  }) 
}

function removeClimb(i){ 
  form.groupClimbs.splice(i, 1) 
}

// faqs
function addFaq(){ 
  form.faqs.push({ question: '', answer: '' }) 
}

function removeFaq(i){ 
  form.faqs.splice(i, 1) 
}

// gallery functions
async function onGalleryFiles(e) {
  const files = Array.from(e.target.files)
  if (!files.length) return
  
  for (const file of files) {
    const url = await uploadFile(file)
    if (url) {
      form.gallery.push(url)
    }
  }
  e.target.value = '' // Clear input
}

function removeGalleryImage(index) {
  form.gallery.splice(index, 1)
}

// file upload function - FIXED VERSION
async function uploadFile(file) {
  if (!file) return null
  
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    console.log('Uploading file:', file.name, file.size, file.type)
    
    const res = await $fetch('/api/routes/upload-image', { 
      method: 'POST', 
      body: formData,
      headers: {
        // Let the browser set the correct Content-Type for FormData
      }
    })
    
    console.log('Upload response:', res)
    
    if (res && res.url) {
      showMessage('Image uploaded successfully')
      return res.url
    } else {
      throw new Error('No URL returned from upload')
    }
  } catch (e) { 
    console.error('uploadFile error:', e)
    showMessage('Upload failed: ' + (e.data?.message || e.message || 'Unknown error'), 'error')
    return null 
  }
}

async function onFileChange(e, target, idx = null) {
  const file = e.target.files && e.target.files[0]
  if (!file) return
  
  console.log('File selected:', file.name, 'for target:', target)
  
  const url = await uploadFile(file)
  if (!url) return
  
  if (target === 'featuredImage') {
    form.featuredImage = url
  } else if (target === 'heroImage') {
    form.heroImage = url
  } else if (target === 'itinerary' && typeof idx === 'number') {
    form.itinerary[idx].image = url
  }
  
  // Reset file input
  e.target.value = ''
}

function confirmDelete(r) {
  if (!confirm(`Delete route "${r.name}"? This cannot be undone.`)) return
  deleteRoute(r._id)
}

async function deleteRoute(id) {
  try {
    await $fetch(`/api/routes/${id}`, { method: 'DELETE' })
    showMessage('Route deleted successfully')
    await loadRoutes()
    if (editId.value === id) {
      resetForm()
    }
  } catch (e) { 
    console.error('deleteRoute', e)
    showMessage('Delete failed: ' + (e.data?.message || e.message), 'error')
  }
}

async function save() {
  if (!isFormValid.value) {
    showMessage('Please fill all required fields', 'error')
    return
  }
  
  // Additional validation for duration - UPDATED
  if (form.durationMin > form.durationMax) {
    showMessage('Minimum duration cannot be greater than maximum duration', 'error')
    return
  }
  
  if (form.durationMin < 1 || form.durationMax < 1) {
    showMessage('Duration must be at least 1 day', 'error')
    return
  }
  
  saving.value = true
  try {
    // ensure arrays/structure
    syncSeoKeywords()
    
    // Deep clone form into payload
    const payload = JSON.parse(JSON.stringify(form))

    // Ensure stats structure exists
    payload.stats = payload.stats || {}
    payload.stats.startingAltitude = payload.stats.startingAltitude || { value: '', detail: '' }
    payload.stats.maxAltitude = payload.stats.maxAltitude || { value: '', detail: '' }
    payload.stats.totalDistance = payload.stats.totalDistance || { value: '', detail: '' }
    payload.stats.bestSeason = payload.stats.bestSeason || { from: '', to: '', detail: '' }
    payload.stats.acclimatization = payload.stats.acclimatization || { value: '', detail: '' }

    // Convert numeric stat fields to strings to keep backward compatibility with DB schema
    if (payload.stats.startingAltitude.value !== null && payload.stats.startingAltitude.value !== undefined) {
      payload.stats.startingAltitude.value = String(payload.stats.startingAltitude.value)
    } else {
      payload.stats.startingAltitude.value = ''
    }
    if (payload.stats.maxAltitude.value !== null && payload.stats.maxAltitude.value !== undefined) {
      payload.stats.maxAltitude.value = String(payload.stats.maxAltitude.value)
    } else {
      payload.stats.maxAltitude.value = ''
    }
    if (payload.stats.totalDistance.value !== null && payload.stats.totalDistance.value !== undefined) {
      payload.stats.totalDistance.value = String(payload.stats.totalDistance.value)
    } else {
      payload.stats.totalDistance.value = ''
    }
    if (payload.stats.acclimatization.value !== null && payload.stats.acclimatization.value !== undefined) {
      payload.stats.acclimatization.value = String(payload.stats.acclimatization.value)
    } else {
      payload.stats.acclimatization.value = ''
    }

    // Auto-generate duration string for display - UPDATED
    if (payload.durationMin && payload.durationMax) {
      if (payload.durationMin === payload.durationMax) {
        payload.duration = `${payload.durationMin} Day${payload.durationMin > 1 ? 's' : ''}`
      } else {
        payload.duration = `${payload.durationMin}–${payload.durationMax} Days`
      }
    }

    // Format group climb dates
    payload.groupClimbs = (payload.groupClimbs || []).map(g => ({
      ...g,
      date: g.date || new Date().toISOString().slice(0,10)
    }))

    let res
    if (isEditing.value && editId.value) {
      res = await $fetch(`/api/routes/${editId.value}`, { 
        method: 'PUT', 
        body: payload 
      })
      showMessage('Route updated successfully')
    } else {
      res = await $fetch('/api/routes', { 
        method: 'POST', 
        body: payload 
      })
      showMessage('Route created successfully')
      editId.value = res.data?._id
      isEditing.value = true
    }
    
    await loadRoutes()
    
  } catch (e) { 
    console.error('Save error:', e)
    showMessage('Save failed: ' + (e.data?.message || e.message || 'Unknown error'), 'error')
  }
  finally { 
    saving.value = false 
  }
}

async function saveAndPublish() {
  form.isActive = true
  await save()
}

function resetForm() {
  Object.assign(form, defaultForm())
  highlightInput.value = ''
  includedInput.value = ''
  notIncludedInput.value = ''
  seoKeywordsInput.value = ''
  isEditing.value = false
  editId.value = null
  message.value = ''
  showGalleryModal.value = false
  showModal.value = false
}

onMounted(() => { 
  loadRoutes() 
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

input[type="file"] {
  max-width: 200px;
}

@media (max-width: 640px) {
  input[type="file"] {
    max-width: 140px;
  }
}

/* Ensure table cells don't overflow */
td {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
