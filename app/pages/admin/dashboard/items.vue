<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- HEADER SECTION -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Items
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage activities, add-ons, and supplementary items
            </p>
          </div>

          <div class="flex items-center gap-3">
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

            <!-- Add Item Button -->
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs md:text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm"
              @click="openCreateModal"
            >
              <span class="text-lg leading-none">＋</span>
              Add Item
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
              placeholder="Search items..."
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
            <option v-for="type in itemTypes" :key="type" :value="type">
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
            <option v-for="category in itemCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>

          <!-- Attach To Filter -->
          <select
            v-model="filters.attachTo"
            class="border rounded-lg px-3 py-2 text-sm bg-white"
            @change="applyFilters"
          >
            <option value="">All Attachments</option>
            <option v-for="attach in attachToOptions" :key="attach" :value="attach">
              {{ attach }}
            </option>
          </select>

          <!-- Free/Paid Filter -->
          <select
            v-model="filters.free"
            class="border rounded-lg px-3 py-2 text-sm bg-white"
            @change="applyFilters"
          >
            <option value="">All Items</option>
            <option value="true">Free Items</option>
            <option value="false">Paid Items</option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="filters.isPublic"
            class="border rounded-lg px-3 py-2 text-sm bg-white"
            @change="applyFilters"
          >
            <option value="">All Status</option>
            <option value="true">Published</option>
            <option value="false">Unpublished</option>
          </select>
        </div>

        <!-- ITEMS TABLE -->
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
                <th class="py-3 px-4">Item</th>
                <th class="py-3 px-4">Type</th>
                <th class="py-3 px-4">Price</th>
                <th class="py-3 px-4">Variants</th>
                <th class="py-3 px-4">Attached To</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in items"
                :key="item._id"
                class="border-b last:border-b-0 hover:bg-slate-50/80 transition-colors"
                :class="{ 'bg-slate-50/50': selectedItems.includes(item._id) }"
              >
                <td class="py-3 px-4">
                  <input
                    type="checkbox"
                    :value="item._id"
                    v-model="selectedItems"
                    class="cursor-pointer"
                  />
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <!-- Featured Image -->
                    <div class="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img
                        v-if="getFeaturedImage(item)"
                        :src="getFeaturedImage(item)"
                        class="w-full h-full object-cover"
                        alt=""
                        @error="handleImageError"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                        📦
                      </div>
                    </div>
                    <div>
                      <div class="font-medium text-slate-900">{{ item.title }}</div>
                      <div class="text-xs text-slate-500">{{ item.slug }}</div>
                      <div v-if="item.code" class="text-xs text-slate-400 font-mono">{{ item.code }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    :class="getTypeColor(item.type)"
                  >
                    {{ item.type || 'misc' }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="text-sm text-slate-700">
                    <span v-if="item.free" class="text-emerald-600 font-medium">Free</span>
                    <span v-else>
                      {{ formatCurrency(item.price || 0, item.currency) }}
                      <span class="text-xs text-slate-400 ml-1">{{ formatPriceType(item.priceType) }}</span>
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="text-sm text-slate-700">
                    <span v-if="item.variants && item.variants.length > 0" 
                          class="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2.5 py-0.5 text-[11px] font-medium">
                      {{ item.variants.length }} variant{{ item.variants.length !== 1 ? 's' : '' }}
                    </span>
                    <span v-else class="text-slate-400">—</span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="attach in (item.attachTo || []).slice(0, 2)"
                      :key="attach"
                      class="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-medium"
                    >
                      {{ attach }}
                    </span>
                    <span v-if="item.attachTo && item.attachTo.length > 2" 
                          class="text-xs text-slate-400 ml-1">
                      +{{ item.attachTo.length - 2 }}
                    </span>
                    <span v-if="!item.attachTo || item.attachTo.length === 0" 
                          class="text-xs text-slate-400">
                      —
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                      :class="getStatusClass(item)"
                    >
                      <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(item)"></span>
                      {{ getStatusText(item) }}
                    </span>
                    <span
                      v-if="item.includedByDefault"
                      class="text-xs text-emerald-500"
                      title="Included by default"
                    >
                      ✓
                    </span>
                    <span
                      v-if="!item.isOptional"
                      class="text-xs text-amber-500"
                      title="Required item"
                    >
                      ⭐
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4 text-right">
                  <div class="inline-flex items-center gap-2 justify-end">
                    <!-- Preview -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                      :title="`Preview ${item.title}`"
                      @click="previewItem(item)"
                    >
                      👁️
                    </button>

                    <!-- Edit -->
                    <button
                      type="button"
                      class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                      title="Edit item"
                      @click="openEditModal(item)"
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
                      :class="item.isPublic ? 'text-emerald-600' : 'text-slate-600'"
                      :title="item.isPublic ? 'Unpublish' : 'Publish'"
                      @click="toggleItemStatus(item)"
                    >
                      <svg v-if="item.isPublic" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                      title="Delete item"
                      @click="confirmDeleteItem(item)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 12h10l1-12"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="items.length === 0 && !loading">
                <td colspan="8" class="px-4 py-8 text-center text-xs text-slate-500">
                  No items found. Click "Add Item" to create your first one.
                </td>
              </tr>

              <tr v-if="loading">
                <td colspan="8" class="px-4 py-8 text-center text-xs text-slate-500">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                    Loading items...
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
            {{ pagination.total }} items
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
        class="max-w-5xl w-full bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900">
              {{ isEditing ? 'Edit Item' : 'Add New Item' }}
            </h2>
            <p class="text-xs text-slate-500">
              {{ isEditing ? 'Update item details' : 'Create a new supplementary item' }}
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
              <!-- Title -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Item Title *
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., Airport Transfer"
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
                    placeholder="airport-transfer"
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

              <!-- Code -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Item Code
                </label>
                <input
                  v-model="form.code"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., TRANS-AIR-001"
                />
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
                  <option value="misc">Miscellaneous</option>
                  <option v-for="type in itemTypes" :key="type" :value="type">
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
                  <option v-for="category in itemCategories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>

              <!-- Short Description -->
              <div class="md:col-span-2">
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Short Description
                </label>
                <input
                  v-model="form.shortDescription"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Brief description for lists and previews"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">
                Full Description
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Detailed description of the item"
              ></textarea>
            </div>

            <!-- Item Settings -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
              <div class="flex items-center gap-2">
                <input
                  v-model="form.includedByDefault"
                  type="checkbox"
                  class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label class="text-sm text-slate-700">Included by default</label>
              </div>
              <div class="flex items-center gap-2">
                <input
                  v-model="form.isOptional"
                  type="checkbox"
                  class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label class="text-sm text-slate-700">Optional item</label>
              </div>
              <div class="flex items-center gap-2">
                <input
                  v-model="form.refundable"
                  type="checkbox"
                  class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label class="text-sm text-slate-700">Refundable</label>
              </div>
            </div>
          </div>

          <!-- PRICING & VARIANTS TAB -->
          <div v-if="activeTab === 'pricing'" class="space-y-6">
            <!-- Base Pricing -->
            <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 class="text-sm font-semibold text-slate-800 mb-3">Base Pricing</h3>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Base Price
                  </label>
                  <input
                    v-model.number="form.price"
                    type="number"
                    min="0"
                    step="0.01"
                    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Currency
                  </label>
                  <select
                    v-model="form.currency"
                    class="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TZS">TZS (TSh)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Price Type
                  </label>
                  <select
                    v-model="form.priceType"
                    class="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option value="per_person">Per Person</option>
                    <option value="per_booking">Per Booking</option>
                    <option value="per_room">Per Room</option>
                    <option value="per_day">Per Day</option>
                  </select>
                </div>
                <div class="flex items-center gap-2 pt-6">
                  <input
                    v-model="form.free"
                    type="checkbox"
                    class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label class="text-sm text-slate-700">Free Item</label>
                </div>
              </div>
            </div>

            <!-- Variants -->
            <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-slate-800">Variants</h3>
                <button
                  type="button"
                  class="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  @click="addVariant"
                >
                  ＋ Add Variant
                </button>
              </div>
              
              <div v-if="form.variants.length === 0" class="text-sm text-slate-500 text-center py-4">
                No variants added. Variants allow different price points or options for this item.
              </div>
              
              <div v-else class="space-y-3">
                <div
                  v-for="(variant, index) in form.variants"
                  :key="index"
                  class="border rounded-lg p-3 bg-white"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <input
                        v-model="variant.code"
                        type="text"
                        class="border-b px-1 py-1 text-sm w-24"
                        placeholder="Code"
                      />
                      <input
                        v-model="variant.title"
                        type="text"
                        class="border-b px-1 py-1 text-sm flex-1"
                        placeholder="Variant title"
                      />
                    </div>
                    <button
                      type="button"
                      class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      @click="removeVariant(index)"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">Price</label>
                      <input
                        v-model.number="variant.price"
                        type="number"
                        min="0"
                        step="0.01"
                        class="w-full border rounded-lg px-2 py-1.5 text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">Min Qty</label>
                      <input
                        v-model.number="variant.minQty"
                        type="number"
                        min="1"
                        class="w-full border rounded-lg px-2 py-1.5 text-sm"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">Max Qty</label>
                      <input
                        v-model.number="variant.maxQty"
                        type="number"
                        min="1"
                        class="w-full border rounded-lg px-2 py-1.5 text-sm"
                        placeholder="10"
                      />
                    </div>
                  </div>
                  
                  <div class="mt-2">
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Description</label>
                    <textarea
                      v-model="variant.description"
                      rows="2"
                      class="w-full border rounded-lg px-2 py-1.5 text-sm"
                      placeholder="Optional variant description"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Seasonal Pricing -->
            <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-semibold text-slate-800">Seasonal Pricing</h3>
                <button
                  type="button"
                  class="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  @click="addSeasonalPrice"
                >
                  ＋ Add Seasonal Price
                </button>
              </div>
              
              <div v-if="form.seasonal.length === 0" class="text-sm text-slate-500 text-center py-4">
                No seasonal pricing added. Add special prices for specific date ranges.
              </div>
              
              <div v-else class="space-y-3">
                <div
                  v-for="(season, index) in form.seasonal"
                  :key="index"
                  class="border rounded-lg p-3 bg-white"
                >
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="text-sm font-medium text-slate-700">Season {{ index + 1 }}</h4>
                    <button
                      type="button"
                      class="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      @click="removeSeasonalPrice(index)"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">Start Date</label>
                      <input
                        v-model="season.startDate"
                        type="date"
                        class="w-full border rounded-lg px-2 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">End Date</label>
                      <input
                        v-model="season.endDate"
                        type="date"
                        class="w-full border rounded-lg px-2 py-1.5 text-sm"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">Price</label>
                      <input
                        v-model.number="season.price"
                        type="number"
                        min="0"
                        step="0.01"
                        class="w-full border rounded-lg px-2 py-1.5 text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1">Price Type</label>
                      <select
                        v-model="season.priceType"
                        class="w-full border rounded-lg px-2 py-1.5 text-sm bg-white"
                      >
                        <option value="per_person">Per Person</option>
                        <option value="per_booking">Per Booking</option>
                        <option value="per_room">Per Room</option>
                        <option value="per_day">Per Day</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="mt-2">
                    <label class="block text-xs font-semibold text-slate-600 mb-1">Note</label>
                    <input
                      v-model="season.note"
                      type="text"
                      class="w-full border rounded-lg px-2 py-1.5 text-sm"
                      placeholder="e.g., Peak season surcharge"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ATTACHMENTS TAB -->
          <div v-if="activeTab === 'attachments'" class="space-y-4">
            <!-- Attach To -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">
                Attach To (Where this item can be used)
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="attach in form.attachTo"
                  :key="attach"
                  class="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs"
                >
                  {{ attach }}
                  <button
                    type="button"
                    class="text-slate-500 hover:text-slate-700 transition-colors"
                    @click="removeAttachTo(attach)"
                  >
                    ✕
                  </button>
                </span>
              </div>
              <div class="flex gap-2">
                <select
                  v-model="selectedAttachTo"
                  class="flex-1 border rounded-lg px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                >
                  <option value="">Select category...</option>
                  <option v-for="attach in attachToOptions" :key="attach" :value="attach">
                    {{ attach }}
                  </option>
                </select>
                <button
                  type="button"
                  class="px-3 py-1.5 border rounded-lg text-xs hover:bg-slate-50 transition-colors"
                  @click="addAttachTo"
                >
                  Add
                </button>
              </div>
            </div>

            <!-- Supplier Information -->
            <div class="border-t pt-4">
              <h3 class="text-sm font-semibold text-slate-800 mb-3">Supplier Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Supplier Name
                  </label>
                  <input
                    v-model="form.supplier.name"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g., ABC Transport Ltd"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Contact
                  </label>
                  <input
                    v-model="form.supplier.contact"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g., +255 123 456 789"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Supplier ID
                  </label>
                  <input
                    v-model="form.supplier.id"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g., SUP-001"
                  />
                </div>
              </div>
            </div>

            <!-- Availability & Cost -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Capacity
                </label>
                <input
                  v-model.number="form.availability.capacity"
                  type="number"
                  min="0"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., 50"
                />
                <div class="flex items-center gap-2 mt-2">
                  <input
                    v-model="form.availability.trackStock"
                    type="checkbox"
                    class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label class="text-sm text-slate-700">Track stock availability</label>
                </div>
              </div>
              
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Cost Price
                </label>
                <input
                  v-model.number="form.costPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>

            <!-- Commission & Tax -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Commission (%)
                </label>
                <input
                  v-model.number="form.commissionPercent"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Tax (%)
                </label>
                <input
                  v-model.number="form.taxPercent"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Cancellation Policy
                </label>
                <input
                  v-model="form.cancellationPolicy"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g., 48 hours notice required"
                />
              </div>
            </div>
          </div>

          <!-- MEDIA TAB -->
          <div v-if="activeTab === 'media'" class="space-y-4">
            <!-- Featured Image -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">
                Featured Image
              </label>
              <div class="flex gap-4">
                <div class="w-48 h-32 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    v-if="form.featuredImage"
                    :src="form.featuredImage"
                    class="w-full h-full object-cover"
                    alt="Featured"
                    @error="handleImageError"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                    🖼️
                  </div>
                </div>
                <div class="flex-1 space-y-3">
                  <div class="flex items-center gap-2">
                    <label class="cursor-pointer">
                      <span class="px-3 py-1.5 border rounded-lg text-xs hover:bg-slate-50 transition-colors inline-block">
                        Upload Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="uploadFeaturedImage"
                      />
                    </label>
                    <button
                      v-if="form.featuredImage"
                      type="button"
                      class="px-3 py-1.5 border rounded-lg text-xs hover:bg-rose-50 text-rose-600 transition-colors"
                      @click="form.featuredImage = ''"
                    >
                      Remove
                    </button>
                  </div>
                  <p class="text-[11px] text-slate-400">
                    This will be the main image displayed for this item. Recommended size: 800×600px.
                  </p>
                </div>
              </div>
            </div>

            <!-- Gallery Images -->
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-2">
                Gallery Images
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div
                  v-for="(image, index) in form.images"
                  :key="index"
                  class="relative group aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200"
                >
                  <img
                    :src="image"
                    class="w-full h-full object-cover"
                    alt=""
                    @error="handleImageError"
                  />
                  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      class="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                      @click="setFeaturedImage(image)"
                      :title="image === form.featuredImage ? 'Currently featured' : 'Set as featured'"
                    >
                      <span :class="image === form.featuredImage ? 'text-amber-500' : 'text-slate-600'">⭐</span>
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
                  <div v-if="image === form.featuredImage" class="absolute top-2 left-2">
                    <span class="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>
                  </div>
                </div>
                <div>
                  <label class="aspect-video rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-400 flex flex-col items-center justify-center cursor-pointer transition-colors">
                    <span class="text-2xl mb-1 text-slate-400">＋</span>
                    <span class="text-xs text-slate-600">Upload Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      class="hidden"
                      @change="uploadGalleryImages"
                    />
                  </label>
                </div>
              </div>
              <p class="text-[11px] text-slate-400">
                Upload multiple images to show in the item gallery. Images can be reordered later.
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
            @click="saveItem"
          >
            {{ isSaving ? 'Saving...' : (isEditing ? 'Update Item' : 'Create Item') }}
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
              {{ previewData.title }}
            </h2>
            <p class="text-xs text-slate-500">
              Item Preview
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
          <div v-if="previewData.featuredImage" class="rounded-lg overflow-hidden">
            <img
              :src="previewData.featuredImage"
              class="w-full h-48 object-cover"
              alt=""
              @error="handleImageError"
            />
          </div>

          <!-- Basic Info -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-slate-500">Type</p>
              <p class="text-sm font-medium">{{ previewData.type || 'misc' }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500">Category</p>
              <p class="text-sm font-medium">{{ previewData.category || '—' }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500">Code</p>
              <p class="text-sm font-medium">{{ previewData.code || '—' }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500">Price</p>
              <p class="text-sm font-medium">
                <span v-if="previewData.free" class="text-emerald-600">Free</span>
                <span v-else>
                  {{ formatCurrency(previewData.price || 0, previewData.currency) }}
                  <span class="text-xs text-slate-400">{{ formatPriceType(previewData.priceType) }}</span>
                </span>
              </p>
            </div>
          </div>

          <!-- Description -->
          <div v-if="previewData.description">
            <p class="text-xs text-slate-500">Description</p>
            <p class="text-sm text-slate-700 mt-1">
              {{ previewData.description }}
            </p>
          </div>

          <!-- Variants -->
          <div v-if="previewData.variants && previewData.variants.length > 0">
            <p class="text-xs text-slate-500">Variants</p>
            <div class="mt-1 space-y-2">
              <div
                v-for="(variant, index) in previewData.variants"
                :key="index"
                class="text-sm text-slate-700 border-l-2 border-emerald-400 pl-3 py-1"
              >
                <div class="font-medium">{{ variant.title }}</div>
                <div class="text-xs text-slate-500">
                  {{ formatCurrency(variant.price || 0, previewData.currency) }}
                  <span v-if="variant.minQty || variant.maxQty" class="ml-2">
                    (Qty: {{ variant.minQty || '1' }}-{{ variant.maxQty || '∞' }})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Attached To -->
          <div v-if="previewData.attachTo && previewData.attachTo.length > 0">
            <p class="text-xs text-slate-500">Attached To</p>
            <div class="flex flex-wrap gap-1 mt-1">
              <span
                v-for="attach in previewData.attachTo"
                :key="attach"
                class="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-xs"
              >
                {{ attach }}
              </span>
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
            @click="editPreviewedItem"
          >
            Edit Item
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
  title: 'Dashboard - Items'
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

// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

// Data
const items = ref([])
const loading = ref(false)
const showModal = ref(false)
const showPreviewModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const activeTab = ref('basic')
const previewData = ref({})
const selectedAttachTo = ref('')

// Filters & Search
const searchQuery = ref('')
const filters = ref({
  type: '',
  category: '',
  attachTo: '',
  free: '',
  isPublic: ''
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
const itemTypes = [
  'activity',
  'transfer',
  'accommodation',
  'meal',
  'equipment',
  'guide',
  'ticket',
  'insurance',
  'misc'
]

const itemCategories = [
  'Transport',
  'Activities',
  'Accommodation',
  'Food & Drink',
  'Equipment',
  'Guides & Staff',
  'Tickets & Permits',
  'Insurance',
  'Other'
]

const attachToOptions = [
  'Tour',
  'Route',
  'GroupClimb',
  'Zanzibar',
  'Itinerary',
  'Hotel',
  'Accommodation',
  'Activity'
]

const tabs = [
  { key: 'basic', label: 'Basic Info' },
  { key: 'pricing', label: 'Pricing & Variants' },
  { key: 'attachments', label: 'Attachments' },
  { key: 'media', label: 'Media' }
]

// Form
const emptyForm = () => ({
  title: '',
  slug: '',
  code: '',
  type: 'misc',
  category: '',
  shortDescription: '',
  description: '',
  featuredImage: '',
  images: [],
  includedByDefault: false,
  isOptional: true,
  price: 0,
  currency: 'USD',
  priceType: 'per_person',
  free: false,
  seasonal: [],
  variants: [],
  supplier: { id: '', name: '', contact: '' },
  availability: { capacity: null, trackStock: false },
  costPrice: null,
  commissionPercent: null,
  taxPercent: null,
  refundable: true,
  cancellationPolicy: '',
  attachTo: [],
  attachIds: [],
  metadata: {},
  isPublic: true,
  isDeleted: false
})

const form = ref(emptyForm())

// Helper Functions
function getFeaturedImage(item) {
  return item.featuredImage || (item.images && item.images.length > 0 ? item.images[0] : null)
}

function getTypeColor(type) {
  const colors = {
    'activity': 'bg-blue-50 text-blue-700',
    'transfer': 'bg-green-50 text-green-700',
    'accommodation': 'bg-purple-50 text-purple-700',
    'meal': 'bg-amber-50 text-amber-700',
    'equipment': 'bg-indigo-50 text-indigo-700',
    'guide': 'bg-teal-50 text-teal-700',
    'ticket': 'bg-pink-50 text-pink-700',
    'insurance': 'bg-rose-50 text-rose-700',
    'misc': 'bg-slate-100 text-slate-700'
  }
  return colors[type] || 'bg-slate-100 text-slate-700'
}

function getStatusClass(item) {
  if (item.isDeleted) return 'bg-rose-50 text-rose-700'
  if (!item.isPublic) return 'bg-slate-100 text-slate-600'
  return 'bg-emerald-50 text-emerald-700'
}

function getStatusDotClass(item) {
  if (item.isDeleted) return 'bg-rose-500'
  if (!item.isPublic) return 'bg-slate-400'
  return 'bg-emerald-500'
}

function getStatusText(item) {
  if (item.isDeleted) return 'Deleted'
  if (!item.isPublic) return 'Unpublished'
  return 'Published'
}

function formatCurrency(amount, currency = 'USD') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return formatter.format(amount)
}

function formatPriceType(priceType) {
  const types = {
    'per_person': '/person',
    'per_booking': '/booking',
    'per_room': '/room',
    'per_day': '/day'
  }
  return types[priceType] || ''
}

function handleImageError(event) {
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400">📦</div>'
}

// Form Helpers
function generateSlug() {
  if (!form.value.title) return
  form.value.slug = form.value.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function addVariant() {
  form.value.variants.push({
    code: '',
    title: '',
    description: '',
    price: 0,
    currency: form.value.currency || 'USD',
    priceType: form.value.priceType || 'per_person',
    minQty: null,
    maxQty: null,
    metadata: {}
  })
}

function removeVariant(index) {
  form.value.variants.splice(index, 1)
}

function addSeasonalPrice() {
  form.value.seasonal.push({
    startDate: '',
    endDate: '',
    price: 0,
    currency: form.value.currency || 'USD',
    priceType: form.value.priceType || 'per_person',
    minQty: null,
    maxQty: null,
    note: ''
  })
}

function removeSeasonalPrice(index) {
  form.value.seasonal.splice(index, 1)
}

function addAttachTo() {
  if (selectedAttachTo.value && !form.value.attachTo.includes(selectedAttachTo.value)) {
    form.value.attachTo.push(selectedAttachTo.value)
    selectedAttachTo.value = ''
  }
}

function removeAttachTo(attach) {
  form.value.attachTo = form.value.attachTo.filter(a => a !== attach)
}

async function uploadFeaturedImage(event) {
  console.log('Uploading featured image...', event.target.files[0])
  const file = event.target.files[0]
  if (!file) {
    console.log('No file selected')
    return
  }

  try {
    const base64Data = await fileToBase64(file)
    
    const response = await $fetch('/api/items/upload', {
      method: 'POST',
      body: { 
        data: base64Data,
        prefix: form.value.slug || 'item'
      }
    })

    if (response.ok && response.url) {
      // Set as featured image
      form.value.featuredImage = response.url
      console.log('Featured image set to:', form.value.featuredImage)
      
      // ALSO add to images array if not already there
      if (!form.value.images.includes(response.url)) {
        form.value.images.push(response.url)
        console.log('Also added to images array. Images now:', form.value.images)
      }
    } else {
      alert('Failed to upload image: ' + (response.error || 'Unknown error'))
    }
  } catch (error) {
    console.error('Failed to upload featured image:', error)
    alert('Failed to upload image')
  }
}

async function uploadGalleryImages(event) {
  console.log('Uploading gallery images...', event.target.files)
  const files = Array.from(event.target.files)
  if (files.length === 0) {
    console.log('No files selected')
    return
  }

  for (const file of files) {
    try {
      console.log('Processing file:', file.name)
      const base64Data = await fileToBase64(file)
      
      const response = await $fetch('/api/items/upload', {
        method: 'POST',
        body: { 
          data: base64Data,
          prefix: form.value.slug || 'item'
        }
      })

      console.log('Upload response for', file.name, ':', response)

      if (response.ok && response.url) {
        form.value.images.push(response.url)
        // If this is the first image and no featured image is set, set it as featured
        if (!form.value.featuredImage) {
          form.value.featuredImage = response.url
        }
      } else {
        console.error('Failed to upload:', response.error)
      }
    } catch (error) {
      console.error('Failed to upload gallery image:', error)
    }
  }
}

function setFeaturedImage(image) {
  form.value.featuredImage = image
}

function removeImage(index) {
  form.value.images.splice(index, 1)
  // If the removed image was the featured image, set featured to first image or empty
  if (form.value.images.length > 0 && !form.value.images.includes(form.value.featuredImage)) {
    form.value.featuredImage = form.value.images[0]
  } else if (form.value.images.length === 0) {
    form.value.featuredImage = ''
  }
}

// CRUD Operations
async function loadItems() {
  loading.value = true
  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      page: pagination.value.page.toString(),
      limit: pagination.value.limit.toString()
    })
    
    // Add search query if present
    if (searchQuery.value) {
      queryParams.append('q', searchQuery.value)
    }
    
    // Add filters
    Object.entries(filters.value).forEach(([key, value]) => {
      if (value !== '') {
        queryParams.append(key, value)
      }
    })
    
    const response = await $fetch(`/api/items?${queryParams.toString()}`)
    
    if (response.ok && response.data) {
      items.value = response.data
      pagination.value = {
        page: response.meta?.page || 1,
        limit: response.meta?.limit || 20,
        total: response.meta?.total || 0,
        pages: response.meta?.total ? Math.ceil(response.meta.total / (response.meta.limit || 20)) : 1
      }
    }
  } catch (error) {
    console.error('Failed to load items:', error)
    alert('Failed to load items. Please check console for details.')
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  isEditing.value = false
  form.value = emptyForm()
  activeTab.value = 'basic'
  selectedAttachTo.value = ''
  showModal.value = true
}

async function openEditModal(item) {
  isEditing.value = true
  form.value = JSON.parse(JSON.stringify({
    _id: item._id,
    title: item.title,
    slug: item.slug,
    code: item.code || '',
    type: item.type || 'misc',
    category: item.category || '',
    shortDescription: item.shortDescription || '',
    description: item.description || '',
    featuredImage: item.featuredImage || '',
    images: item.images || [],
    includedByDefault: item.includedByDefault || false,
    isOptional: item.isOptional !== false,
    price: item.price || 0,
    currency: item.currency || 'USD',
    priceType: item.priceType || 'per_person',
    free: item.free || false,
    seasonal: item.seasonal || [],
    variants: item.variants || [],
    supplier: item.supplier || { id: '', name: '', contact: '' },
    availability: item.availability || { capacity: null, trackStock: false },
    costPrice: item.costPrice || null,
    commissionPercent: item.commissionPercent || null,
    taxPercent: item.taxPercent || null,
    refundable: item.refundable !== false,
    cancellationPolicy: item.cancellationPolicy || '',
    attachTo: item.attachTo || [],
    attachIds: item.attachIds || [],
    metadata: item.metadata || {},
    isPublic: item.isPublic !== false,
    isDeleted: item.isDeleted || false
  }))
  activeTab.value = 'basic'
  selectedAttachTo.value = ''
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  isSaving.value = false
  form.value = emptyForm()
}

async function saveItem() {
  // Validation
  if (!form.value.title || !form.value.slug) {
    alert('Title and slug are required')
    return
  }

  // Prepare data for API
  const payload = JSON.parse(JSON.stringify(form.value))
  
  // DEBUG: Log the form data before sending
  console.log('FORM DATA BEFORE SENDING:')
  console.log('Featured Image:', form.value.featuredImage)
  console.log('Images Array:', form.value.images)
  console.log('Full form:', form.value)
  
  // Remove _id from payload for POST
  const itemId = payload._id
  if (itemId) {
    delete payload._id
  }

  // Ensure arrays are properly formatted
  if (!Array.isArray(payload.images)) payload.images = []
  if (!Array.isArray(payload.variants)) payload.variants = []
  if (!Array.isArray(payload.seasonal)) payload.seasonal = []
  if (!Array.isArray(payload.attachTo)) payload.attachTo = []
  if (!Array.isArray(payload.attachIds)) payload.attachIds = []
  
  // Ensure supplier object exists
  if (!payload.supplier) payload.supplier = { id: '', name: '', contact: '' }
  if (!payload.availability) payload.availability = { capacity: null, trackStock: false }
  if (!payload.metadata) payload.metadata = {}

  // DEBUG: Log the payload being sent
  console.log('PAYLOAD BEING SENT TO API:')
  console.log('Featured Image in payload:', payload.featuredImage)
  console.log('Images in payload:', payload.images)
  console.log('Full payload:', JSON.stringify(payload, null, 2))

  isSaving.value = true
  try {
    let response
    if (isEditing.value && itemId) {
      response = await $fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        body: payload
      })

      if (response.ok) {
        console.log('API RESPONSE:', response.data)
        // Check if featuredImage is in the response
        console.log('Featured Image in response:', response.data.featuredImage)
        
        // Update in list
        const index = items.value.findIndex(a => a._id === itemId)
        if (index !== -1) {
          items.value[index] = response.data
        } else {
          await loadItems()
        }
        closeModal()
      } else {
        alert(response.error || 'Failed to save item')
      }
    } else {
      response = await $fetch('/api/items', {
        method: 'POST',
        body: payload
      })

      if (response.ok) {
        console.log('API RESPONSE:', response.data)
        console.log('Featured Image in response:', response.data.featuredImage)
        
        items.value.unshift(response.data)
        closeModal()
        await loadItems()
      } else {
        alert(response.error || 'Failed to save item')
      }
    }
  } catch (error) {
    console.error('Failed to save item:', error)
    alert(error.message || 'Failed to save item. Please try again.')
  } finally {
    isSaving.value = false
  }
}

async function toggleItemStatus(item) {
  try {
    const response = await $fetch(`/api/items/${item._id}`, {
      method: 'PUT',
      body: { isPublic: !item.isPublic }
    })

    if (response.ok) {
      const index = items.value.findIndex(a => a._id === item._id)
      if (index !== -1) {
        items.value[index].isPublic = !item.isPublic
      }
    } else {
      alert(response.error || 'Failed to update status')
    }
  } catch (error) {
    console.error('Failed to toggle status:', error)
    alert('Failed to update item status')
  }
}

async function confirmDeleteItem(item) {
  if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return

  try {
    const response = await $fetch(`/api/items/${item._id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      // Remove from list
      items.value = items.value.filter(a => a._id !== item._id)
    } else {
      alert(response.error || 'Failed to delete item')
    }
  } catch (error) {
    console.error('Failed to delete item:', error)
    alert('Failed to delete item')
  }
}

// Preview
async function previewItem(item) {
  previewData.value = JSON.parse(JSON.stringify(item))
  showPreviewModal.value = true
}

function closePreviewModal() {
  showPreviewModal.value = false
  previewData.value = {}
}

function editPreviewedItem() {
  closePreviewModal()
  openEditModal(previewData.value)
}

// Bulk Actions
function toggleSelectAll() {
  if (selectAll.value) {
    selectedItems.value = items.value.map(a => a._id)
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
          $fetch(`/api/items/${id}`, {
            method: 'PUT',
            body: { isPublic: true }
          })
        ))
        break
      case 'unpublish':
        await Promise.all(selectedItems.value.map(id =>
          $fetch(`/api/items/${id}`, {
            method: 'PUT',
            body: { isPublic: false }
          })
        ))
        break
      case 'delete':
        if (!confirm(`Delete ${selectedItems.value.length} item(s)?`)) return
        await Promise.all(selectedItems.value.map(id =>
          $fetch(`/api/items/${id}`, { method: 'DELETE' })
        ))
        break
    }

    // Reset and reload
    bulkAction.value = ''
    selectedItems.value = []
    selectAll.value = false
    loadItems()
  } catch (error) {
    console.error('Bulk action failed:', error)
    alert('Failed to perform bulk action')
  }
}

// Pagination
function changePage(page) {
  if (page < 1 || page > pagination.value.pages) return
  pagination.value.page = page
  loadItems()
}

// Search debounce
const debouncedSearch = debounce(() => {
  loadItems()
}, 500)

// Apply filters
function applyFilters() {
  pagination.value.page = 1 // Reset to first page when filters change
  loadItems()
}

// Watch selected items
watch(selectedItems, (newVal) => {
  selectAll.value = newVal.length === items.value.length && items.value.length > 0
})

// Initialize
onMounted(() => {
  loadItems()
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