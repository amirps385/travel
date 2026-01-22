<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- HEADER -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">Email Marketing</h2>
            <p class="text-sm text-slate-500 mt-1">Manage contacts and send targeted emails</p>
          </div>
          <div class="text-sm text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
            Sender: <span class="font-medium text-slate-800">{{ senderEmail }}</span>
          </div>
        </div>
      </div>

      <!-- CONTACTS TABLE -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <!-- TABLE HEADER -->
        <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-slate-800">Contacts List</h3>
            <p class="text-xs text-slate-500 mt-1">Click email icon to send, preview icon to view details, history icon to view email history</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search contacts..."
                class="pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <svg class="w-4 h-4 absolute left-3 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              @click="refreshContacts"
              class="inline-flex items-center px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- TABLE CONTENT -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50 border-b border-slate-100">
              <tr>
                <th class="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Lead Source</th>
                <th class="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="contact in filteredContacts"
                :key="contact._id"
                class="hover:bg-slate-50 transition-colors"
              >
                <!-- CONTACT INFO -->
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="shrink-0">
                      <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span class="text-blue-600 font-medium text-sm">{{ getInitials(contact.name) }}</span>
                      </div>
                    </div>
                    <div class="ml-3">
                      <div class="font-medium text-slate-900">{{ contact.name }}</div>
                      <div class="text-sm text-slate-500">{{ contact.email }}</div>
                      <div v-if="contact.phone" class="text-xs text-slate-400 mt-0.5">{{ contact.phone }}</div>
                    </div>
                  </div>
                </td>

                <!-- LEAD SOURCE -->
                <td class="px-6 py-4">
                  <div class="flex flex-col gap-1">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getSourceBadgeClass(contact.source)">
                      {{ formatSource(contact.source) }}
                    </span>
                    <div v-if="contact.leadSourceDetail" class="text-xs text-slate-500 truncate max-w-[180px]" :title="contact.leadSourceDetail">
                      {{ contact.leadSourceDetail }}
                    </div>
                  </div>
                </td>

                <!-- STATUS -->
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusBadgeClass(contact.status)">
                    {{ formatStatus(contact.status) }}
                  </span>
                </td>

                <!-- DATE -->
                <td class="px-6 py-4">
                  <div class="text-sm text-slate-600">
                    {{ formatDate(contact.createdAt) }}
                  </div>
                </td>

                <!-- ACTIONS -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <!-- PREVIEW BUTTON -->
                    <button
                      @click="openPreviewModal(contact)"
                      class="p-2 hover:bg-slate-100 rounded-lg transition-colors group"
                      title="Preview Contact Details"
                    >
                      <svg class="w-5 h-5 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <!-- EMAIL HISTORY BUTTON -->
                    <button
                      @click="openEmailHistory(contact)"
                      class="p-2 hover:bg-purple-50 rounded-lg transition-colors group"
                      title="View Email History"
                    >
                      <svg class="w-5 h-5 text-purple-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>

                    <!-- EMAIL BUTTON -->
                    <button
                      @click="openEmailModal(contact)"
                      class="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      title="Send Email"
                    >
                      <svg class="w-5 h-5 text-blue-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- LOADING / EMPTY STATES -->
        <div v-if="loadingContacts" class="px-6 py-12 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-3 text-sm text-slate-500">Loading contacts...</p>
        </div>
        <div v-else-if="filteredContacts.length === 0" class="px-6 py-12 text-center">
          <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p class="mt-3 text-sm text-slate-500">No contacts found</p>
          <p v-if="searchQuery" class="text-xs text-slate-400 mt-1">Try a different search term</p>
        </div>

        <!-- PAGINATION -->
        <div v-if="filteredContacts.length > 0" class="px-6 py-4 border-t border-slate-100 text-sm text-slate-500">
          Showing {{ filteredContacts.length }} of {{ contacts.length }} contacts
        </div>
      </div>
    </div>

    <!-- PREVIEW CONTACT MODAL -->
    <div v-if="showPreviewModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <!-- MODAL HEADER -->
        <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Contact Details</h3>
            <p class="text-sm text-slate-500 mt-1">Full information about {{ previewContact.name }}</p>
          </div>
          <button @click="closePreviewModal" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- MODAL CONTENT -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-6">
            <!-- CONTACT CARD -->
            <div class="bg-slate-50 rounded-xl p-5 mb-6">
              <div class="flex items-start gap-4">
                <div class="shrink-0">
                  <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-bold text-xl">{{ getInitials(previewContact.name) }}</span>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="text-xl font-bold text-slate-900">{{ previewContact.name }}</h4>
                  <div class="mt-2 space-y-1">
                    <div class="flex items-center text-sm text-slate-600">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {{ previewContact.email }}
                    </div>
                    <div v-if="previewContact.phone" class="flex items-center text-sm text-slate-600">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {{ previewContact.phone }}
                    </div>
                    <div v-if="previewContact.country" class="flex items-center text-sm text-slate-600">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ previewContact.country }}
                    </div>
                  </div>
                </div>
                <div>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="getStatusBadgeClass(previewContact.status)">
                    {{ formatStatus(previewContact.status) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- DETAILED CONTACT INFORMATION -->
            <div class="space-y-6">
              <!-- CONTACT INFORMATION SECTION -->
              <div class="border rounded-xl p-4 bg-slate-50/60">
                <h3 class="text-xs font-semibold text-slate-500 mb-3">Contact Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <!-- Name -->
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.name || '—' }}</div>
                    <div class="text-xs text-slate-500">Full Name</div>
                  </div>
                  
                  <!-- Email -->
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.email || '—' }}</div>
                    <div class="text-xs text-slate-500">Email</div>
                  </div>
                  
                  <!-- Country Code -->
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.countryCode || '—' }}</div>
                    <div class="text-xs text-slate-500">Country Code</div>
                  </div>
                  
                  <!-- Phone Number -->
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.phone || '—' }}</div>
                    <div class="text-xs text-slate-500">Phone Number</div>
                  </div>
                  
                  <!-- Country -->
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.country || '—' }}</div>
                    <div class="text-xs text-slate-500">Country</div>
                  </div>
                  
                  <!-- User Selected Timezone -->
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.timezone || 'Not selected' }}</div>
                    <div class="text-xs text-slate-500 flex items-center gap-1">
                      Selected Timezone
                      <span v-if="previewContact.timezone" class="text-green-600">✓</span>
                    </div>
                  </div>
                  
                  <!-- Browser Detected Timezone -->
                  <div v-if="previewContact.metadata?.browserTimezone">
                    <div class="text-sm font-medium">{{ previewContact.metadata.browserTimezone }}</div>
                    <div class="text-xs text-slate-500 flex items-center gap-1">
                      Browser Timezone ✓
                    </div>
                  </div>
                  
                  <!-- Origin City -->
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.originCity || '—' }}</div>
                    <div class="text-xs text-slate-500">Origin City</div>
                  </div>
                  
                  <!-- Lead Source -->
                  <div>
                    <div class="text-sm font-medium">{{ humanizeSource(previewContact.source) || 'Website Form' }}</div>
                    <div class="text-xs text-slate-500">Lead source</div>
                  </div>
                  
                  <!-- Lead Source Detail -->
                  <div v-if="previewContact.leadSourceDetail">
                    <div class="text-sm font-medium" :title="previewContact.leadSourceDetail">
                      {{ displaySourceDetail(previewContact.leadSourceDetail) }}
                    </div>
                    <div class="text-xs text-slate-500">Source detail</div>
                  </div>
                  
                  <!-- Scheduled Call -->
                  <div v-if="previewContact.scheduleCall" class="md:col-span-2 lg:col-span-3">
                    <div class="text-sm font-medium text-emerald-600">✓ Call Scheduled</div>
                    <div class="text-xs text-slate-500">Client requested a call</div>
                  </div>
                  
                  <!-- Preferred Contact Method -->
                  <div v-if="previewContact.preferredContactMethod">
                    <div class="text-sm font-medium">{{ previewContact.preferredContactMethod }}</div>
                    <div class="text-xs text-slate-500">Preferred Contact Method</div>
                  </div>
                  
                  <!-- Consent -->
                  <div v-if="previewContact.consent !== undefined">
                    <div class="text-sm font-medium">{{ previewContact.consent ? '✓ Given' : 'Not given' }}</div>
                    <div class="text-xs text-slate-500">Consent</div>
                  </div>
                </div>

                <!-- UTM tracking -->
                <div v-if="previewContact.utm && (previewContact.utm.source || previewContact.utm.medium || previewContact.utm.campaign)" 
                     class="mt-4 pt-4 border-t border-slate-200">
                  <h4 class="text-xs font-semibold text-slate-500 mb-2">UTM Tracking</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div v-if="previewContact.utm.source">
                      <div class="text-xs font-medium text-slate-700">Source</div>
                      <div class="text-xs text-slate-500">{{ previewContact.utm.source }}</div>
                    </div>
                    <div v-if="previewContact.utm.medium">
                      <div class="text-xs font-medium text-slate-700">Medium</div>
                      <div class="text-xs text-slate-500">{{ previewContact.utm.medium }}</div>
                    </div>
                    <div v-if="previewContact.utm.campaign">
                      <div class="text-xs font-medium text-slate-700">Campaign</div>
                      <div class="text-xs text-slate-500">{{ previewContact.utm.campaign }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- TRIP INFORMATION SECTION -->
              <div v-if="hasTripInfo(previewContact)" class="border rounded-xl p-4 bg-slate-50/60">
                <h3 class="text-xs font-semibold text-slate-500 mb-3">Trip Information</h3>
                
                <!-- Basic Trip Info -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.prettyDate || formatDate(previewContact.date) || '—' }}</div>
                    <div class="text-xs text-slate-500">Travel date</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.days || '—' }}</div>
                    <div class="text-xs text-slate-500">Days</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.travellers || 0 }}</div>
                    <div class="text-xs text-slate-500">Total Travellers</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ previewContact.who || '—' }}</div>
                    <div class="text-xs text-slate-500">Group Type</div>
                  </div>
                </div>
                
                <!-- Detailed Breakdown -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <!-- Adults & Children -->
                  <div v-if="previewContact.adults !== undefined">
                    <div class="text-sm font-medium">{{ previewContact.adults || 0 }} Adults, {{ previewContact.children || 0 }} Children</div>
                    <div class="text-xs text-slate-500">Travel group breakdown</div>
                  </div>
                  
                  <!-- Destination Countries -->
                  <div v-if="previewContact.countries && previewContact.countries.length">
                    <div class="text-sm font-medium">{{ previewContact.countries.join(', ') }}</div>
                    <div class="text-xs text-slate-500">Destination Countries</div>
                  </div>
                  
                  <!-- Activities -->
                  <div v-if="previewContact.activities && previewContact.activities.length" class="sm:col-span-2 lg:col-span-2">
                    <div class="text-sm font-medium">
                      {{ previewContact.activities.map(a => formatActivityName(a)).join(', ') }}
                    </div>
                    <div class="text-xs text-slate-500">Selected Activities</div>
                  </div>
                </div>
                
                <!-- Additional Trip Details -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <!-- Budget -->
                  <div v-if="previewContact.budget">
                    <div class="text-sm font-medium">${{ previewContact.budget.toLocaleString() }}</div>
                    <div class="text-xs text-slate-500">Budget per person</div>
                  </div>
                  
                  <!-- Kilimanjaro Route -->
                  <div v-if="previewContact.kilimanjaroRoute">
                    <div class="text-sm font-medium">{{ previewContact.kilimanjaroRoute.replace(/_/g, ' ').toUpperCase() }}</div>
                    <div class="text-xs text-slate-500">Kilimanjaro Route</div>
                  </div>
                  
                  <!-- Timezone -->
                  <div v-if="previewContact.timezone">
                    <div class="text-sm font-medium">{{ previewContact.timezone }}</div>
                    <div class="text-xs text-slate-500">Selected Timezone</div>
                  </div>
                  
                  <!-- Date Flexibility -->
                  <div v-if="previewContact.dateIsMonthOnly !== undefined">
                    <div class="text-sm font-medium">{{ previewContact.dateIsMonthOnly ? 'Month Only' : 'Specific Date' }}</div>
                    <div class="text-xs text-slate-500">Date Flexibility</div>
                  </div>
                </div>
                
                <!-- Age Breakdown -->
                <div v-if="(previewContact.adultAges && previewContact.adultAges.length) || (previewContact.childAges && previewContact.childAges.length)" 
                     class="mt-4 pt-4 border-t border-slate-200">
                  <h4 class="text-xs font-semibold text-slate-500 mb-2">Age Breakdown</h4>
                  <div class="space-y-2">
                    <!-- Adult Ages -->
                    <div v-if="previewContact.adultAges && previewContact.adultAges.length" class="flex flex-wrap gap-2">
                      <span class="text-xs font-medium text-slate-700">Adults:</span>
                      <div class="flex flex-wrap gap-1">
                        <span v-for="(age, index) in previewContact.adultAges" :key="'adult-' + index" 
                              class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                          {{ age }} yrs
                        </span>
                      </div>
                    </div>
                    
                    <!-- Child Ages -->
                    <div v-if="previewContact.childAges && previewContact.childAges.length" class="flex flex-wrap gap-2">
                      <span class="text-xs font-medium text-slate-700">Children:</span>
                      <div class="flex flex-wrap gap-1">
                        <span v-for="(age, index) in previewContact.childAges" :key="'child-' + index" 
                              class="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
                          {{ age }} yrs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- MESSAGE SECTION -->
              <div v-if="previewContact.message" class="border rounded-xl p-4 bg-slate-50/60">
                <h3 class="text-xs font-semibold text-slate-500 mb-3">Message / Notes</h3>
                <div class="text-sm text-slate-700 bg-white p-3 rounded-lg border">
                  {{ previewContact.message }}
                </div>
              </div>

              <!-- PREFERRED CALL TIME -->
              <div v-if="previewContact.preferredTime" class="border rounded-xl p-4 bg-slate-50/60">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xs font-semibold text-slate-500">Preferred Call Time</h3>
                  <div class="text-xs text-slate-400">
                    {{ formatDateTime(previewContact.preferredTime) }}
                  </div>
                </div>
                <div class="text-sm text-slate-700">
                  Client requested a call {{ previewContact.scheduleCall ? '✓' : '' }}
                </div>
              </div>

              <!-- STATUS & PRIORITY INFO -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Status Card -->
                <div class="border rounded-xl p-4 bg-slate-50/60">
                  <h3 class="text-xs font-semibold text-slate-500 mb-2">Status</h3>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-lg font-semibold">{{ formatStatus(previewContact.status) }}</div>
                      <div v-if="previewContact.closedDate" class="text-xs text-slate-500 mt-1">
                        Closed: {{ formatDateShort(previewContact.closedDate) }}
                      </div>
                      <div v-if="previewContact.closedReason" class="text-xs text-slate-500 mt-1">
                        Reason: {{ previewContact.closedReason }}
                      </div>
                    </div>
                    <div class="text-2xl">{{ statusIcon(previewContact.status) }}</div>
                  </div>
                </div>

                <!-- Priority Card -->
                <div class="border rounded-xl p-4 bg-slate-50/60">
                  <h3 class="text-xs font-semibold text-slate-500 mb-2">Priority</h3>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-lg font-semibold">{{ priorityLabelFrom(previewContact.priority) }}</div>
                      <div v-if="previewContact.priorityUpdatedBy" class="text-xs text-slate-500 mt-1">
                        Updated by: {{ previewContact.priorityUpdatedBy }}
                      </div>
                    </div>
                    <div class="text-2xl">🎯</div>
                  </div>
                </div>
              </div>

              <!-- ASSIGNMENT INFO -->
              <div v-if="previewContact.assignedTo" class="border rounded-xl p-4 bg-slate-50/60">
                <h3 class="text-xs font-semibold text-slate-500 mb-2">Assignment</h3>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-medium text-xs">{{ getInitials(previewContact.assignedTo.name) }}</span>
                  </div>
                  <div>
                    <div class="font-medium text-slate-900">{{ previewContact.assignedTo.name }}</div>
                    <div class="text-xs text-slate-500">{{ previewContact.assignedTo.email }}</div>
                    <div class="text-xs text-slate-400">{{ formatRole(previewContact.assignedTo.role) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MODAL FOOTER -->
        <div class="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            @click="openEmailHistory(previewContact)"
            class="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Email History
          </button>
          <button
            @click="closePreviewModal"
            class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button
            @click="openEmailModal(previewContact)"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Email
          </button>
        </div>
      </div>
    </div>

    <!-- SEND EMAIL MODAL -->
    <div v-if="showEmailModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <!-- MODAL HEADER -->
        <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Send Email</h3>
            <p class="text-sm text-slate-500 mt-1">Send email to {{ emailContact.name }}</p>
          </div>
          <button @click="closeEmailModal" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- MODAL CONTENT -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-6 space-y-6">
            <!-- CONTACT SUMMARY -->
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-slate-900">{{ emailContact.name }}</h4>
                  <p class="text-sm text-slate-600 mt-1">{{ emailContact.email }}</p>
                  <div v-if="emailContact.phone" class="text-xs text-slate-500 mt-1">{{ emailContact.phone }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-slate-500">Lead Source</div>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1" :class="getSourceBadgeClass(emailContact.source)">
                    {{ formatSource(emailContact.source) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- TEMPLATE SELECTION -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-3">Select Email Template</label>
              <div class="relative">
                <select
                  v-model="selectedTemplateId"
                  @change="onTemplateChange"
                  class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">-- Select a template --</option>
                  <option v-for="template in emailTemplates" :key="template.id" :value="template.id">
                    {{ template.name }} (ID: {{ template.id }})
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <!-- Template Description -->
              <div v-if="selectedTemplate" class="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                {{ selectedTemplate.description }}
              </div>
            </div>

            <!-- EMAIL PREVIEW SECTION -->
            <div v-if="selectedTemplateId" class="border-t border-slate-200 pt-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-sm font-semibold text-slate-700">Email Preview</h4>
                <div class="flex items-center gap-2">
                  <button
                    @click="refreshPreview"
                    class="inline-flex items-center px-3 py-1.5 text-xs border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Preview
                  </button>
                  <button
                    @click="showPreviewInModal"
                    class="inline-flex items-center px-3 py-1.5 text-xs border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Full Screen Preview
                  </button>
                </div>
              </div>
              
              <!-- Preview Container -->
              <div class="bg-white border border-slate-300 rounded-lg overflow-hidden shadow-sm">
                <!-- Email Header Simulator -->
                <div class="bg-slate-100 px-4 py-3 border-b border-slate-300">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-slate-300 rounded-full"></div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="text-sm font-medium text-slate-900">{{ senderName }} &lt;{{ senderEmail }}&gt;</div>
                          <div class="text-xs text-slate-500">to {{ emailContact.name }} &lt;{{ emailContact.email }}&gt;</div>
                        </div>
                        <div class="text-xs text-slate-500">{{ formatDateTime(new Date().toISOString()) }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="text-sm font-semibold text-slate-900">{{ getEmailSubject() }}</div>
                    <div class="text-xs text-slate-500">{{ getEmailPreviewText() }}</div>
                  </div>
                </div>
                
                <!-- ACTUAL TEMPLATE PREVIEW -->
                <div class="overflow-y-auto" style="max-height: 500px;">
                  <div class="email-preview-template" v-html="getFullEmailPreview()"></div>
                </div>
              </div>
              
              <div class="mt-2 text-xs text-slate-500">
                <p>This preview shows how the email will appear in the recipient's inbox. Parameters are dynamically replaced with actual values.</p>
              </div>
            </div>

            <!-- TEMPLATE PARAMETERS -->
            <div v-if="selectedTemplateId" class="border-t border-slate-200 pt-6">
              <h4 class="text-sm font-semibold text-slate-700 mb-4">Email Parameters</h4>
              
              <!-- RECIPIENT INFORMATION -->
              <div class="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h5 class="text-xs font-semibold text-slate-600 mb-3">Recipient Information</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Recipient Name *</label>
                    <input v-model="emailContact.name" @input="refreshPreview" type="text" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      placeholder="Enter recipient name" />
                    <p class="text-xs text-slate-500 mt-1">Name as it should appear in the email salutation</p>
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Recipient Email *</label>
                    <input v-model="emailContact.email" @input="refreshPreview" type="email" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      placeholder="recipient@example.com" />
                    <p class="text-xs text-slate-500 mt-1">Email address to send to</p>
                  </div>
                </div>
              </div>
              
              <!-- Template 4: Book a Call -->
              <div v-if="selectedTemplateId === 4" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Country Dropdown -->
                  <div>
                    <label class="text-xs font-semibold text-slate-600 mb-2 block">Country *</label>
                    <div class="relative">
                      <select
                        v-model="selectedCountryIso"
                        @change="onCountryChange"
                        class="w-full border rounded-lg px-3 py-2 pr-10 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">-- Select Country --</option>
                        <option v-for="country in countries" :key="country.iso2" :value="country.iso2">
                          {{ country.emoji }} {{ country.name }} ({{ country.dial_code }})
                        </option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <p class="text-xs text-slate-500 mt-1">Selecting country will auto-fill dial code and timezone</p>
                  </div>

                  <!-- Country Code (Read-only) -->
                  <div>
                    <label class="text-xs font-semibold text-slate-600 mb-2 block">Country Code</label>
                    <div class="px-3 py-2 bg-slate-50 border rounded-lg text-sm font-medium text-slate-700">
                      {{ selectedCountry ? selectedCountry.dial_code : '—' }}
                    </div>
                    <p class="text-xs text-slate-500 mt-1">Auto-filled from selected country</p>
                  </div>

                  <!-- Phone Number -->
                  <div>
                    <label class="text-xs font-semibold text-slate-600 mb-2 block">Phone Number *</label>
                    <div class="flex items-center gap-2">
                      <div class="px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium min-w-[70px] text-center">
                        {{ selectedCountry ? selectedCountry.dial_code : '+?' }}
                      </div>
                      <input
                        v-model="emailParams.phone"
                        @input="refreshPreview"
                        type="tel"
                        class="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Local number e.g. 712345678"
                      />
                    </div>
                    <p class="text-xs text-slate-500 mt-1">
                      Full phone: <strong>{{ selectedCountry ? selectedCountry.dial_code : '' }}{{ emailParams.phone || '' }}</strong>
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Timezone Dropdown -->
                  <div>
                    <label class="text-xs font-semibold text-slate-600 mb-2 block">Timezone *</label>
                    <div class="relative">
                      <select
                        v-model="emailParams.timezone"
                        @change="refreshPreview"
                        class="w-full border rounded-lg px-3 py-2 pr-10 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        :disabled="!selectedCountry"
                      >
                        <option value="">-- Select Timezone --</option>
                        <option v-for="timezone in availableTimezones" :key="timezone" :value="timezone">
                          {{ timezone }}
                        </option>
                        <option v-if="emailContact.timezone && !availableTimezones.includes(emailContact.timezone)" :value="emailContact.timezone">
                          {{ emailContact.timezone }} (Timezone provided by the contact in the form)
                        </option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <p class="text-xs text-slate-500 mt-1">
                      {{ selectedCountry ? `You can select timezones for ${selectedCountry.name}, if you want to change timezone in mail` : 'Select country first' }}
                    </p>
                  </div>

                  <!-- Preferred Time -->
                  <div>
                    <label class="text-xs font-semibold text-slate-600 mb-2 block">Preferred Time *</label>
                    <input
                      v-model="emailParams.preferredTime"
                      @input="refreshPreview"
                      type="text"
                      class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      :placeholder="emailContact.preferredTime ? formatDateTime(emailContact.preferredTime) : 'March 12, 2026 — 10:30 AM'"
                    />
                    <p class="text-xs text-slate-500 mt-1">Date and time for the scheduled call</p>
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label class="text-xs font-semibold text-slate-600 mb-2 block">Message / Notes *</label>
                  <textarea
                    v-model="emailParams.message"
                    @input="refreshPreview"
                    rows="3"
                    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    :placeholder="emailContact.message || 'I am interested in a luxury safari package...'"
                  ></textarea>
                </div>
              </div>

              <!-- Template 5: Itinerary Request -->
              <div v-else-if="selectedTemplateId === 5" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Trip Name *</label>
                    <input v-model="emailParams.tripName" @input="refreshPreview" type="text" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      placeholder="e.g., 'Serengeti Luxury Safari'" />
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Duration (Days) *</label>
                    <input v-model.number="emailParams.days" @input="refreshPreview" type="number" min="1" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      :placeholder="emailContact.days ? String(emailContact.days) : '7'" />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Number of Travellers *</label>
                    <input v-model="emailParams.travellers" @input="refreshPreview" type="text" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      :placeholder="`${emailContact.travellers || '2'} people`" />
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Interests / Activities</label>
                    <input v-model="emailParams.interests" @input="refreshPreview" type="text" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      :placeholder="emailContact.activities?.join(', ') || 'Safari, beach, hiking'" />
                  </div>
                </div>
                <div>
                  <label class="text-xs font-semibold text-slate-600">Additional Notes</label>
                  <textarea v-model="emailParams.message" @input="refreshPreview" rows="3" class="mt-1 w-full border rounded-lg px-3 py-2" 
                    :placeholder="emailContact.message || 'Please include a hot air balloon ride and luxury lodge accommodation...'"></textarea>
                </div>
              </div>

              <!-- Template 6: Newsletter -->
              <div v-else-if="selectedTemplateId === 6" class="space-y-4">
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p class="text-sm text-blue-700 font-medium">No parameters needed for this template</p>
                      <p class="text-xs text-blue-600 mt-1">The newsletter template has fixed content. Just click send!</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- COMMON PARAMETERS -->
              <div class="mt-6 pt-6 border-t border-slate-200">
                <h5 class="text-xs font-semibold text-slate-600 mb-3">Common Settings</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Call-to-Action URL</label>
                    <input v-model="emailParams.cta_url" @input="refreshPreview" type="url" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      :placeholder="selectedTemplateId === 4 ? 'https://zafstours.com/book-now' : 'https://zafstours.com/contact'" />
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Hero Image URL</label>
                    <input v-model="emailParams.hero_image" @input="refreshPreview" type="url" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      placeholder="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop" />
                    <p class="text-xs text-slate-500 mt-1">Optional. Leave empty for default safari image.</p>
                  </div>
                </div>
              </div>

              <!-- COMPANY CONTACT INFO -->
              <div class="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h5 class="text-xs font-semibold text-slate-600 mb-3">Company Contact Information</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Company Phone</label>
                    <input v-model="emailParams.company_phone" @input="refreshPreview" type="text" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      placeholder="+255 624 023 455" />
                  </div>
                  <div>
                    <label class="text-xs font-semibold text-slate-600">Company Email</label>
                    <input v-model="emailParams.company_email" @input="refreshPreview" type="email" class="mt-1 w-full border rounded-lg px-3 py-2" 
                      placeholder="info@zafstours.com" />
                  </div>
                </div>
                <div class="mt-4">
                  <label class="text-xs font-semibold text-slate-600">Unsubscribe URL</label>
                  <input v-model="emailParams.unsubscribe_url" @input="refreshPreview" type="url" class="mt-1 w-full border rounded-lg px-3 py-2" 
                    placeholder="https://zafstours.com/unsubscribe" />
                </div>
                <p class="text-xs text-slate-500 mt-2">These are pre-filled with company defaults. Edit only if needed for this specific email.</p>
              </div>
            </div>

            <!-- SCHEDULING OPTIONS -->
            <div v-if="selectedTemplateId" class="bg-slate-50 rounded-lg p-5 border border-slate-200">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h4 class="text-sm font-semibold text-slate-700">Schedule Options</h4>
                  <p class="text-xs text-slate-500 mt-1">Choose to send now or schedule for later</p>
                </div>
                <div class="flex items-center gap-3">
                  <label class="inline-flex items-center">
                    <input type="radio" v-model="sendOption" value="now" class="text-blue-600 focus:ring-blue-500" />
                    <span class="ml-2 text-sm text-slate-700">Send Now</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" v-model="sendOption" value="schedule" class="text-blue-600 focus:ring-blue-500" />
                    <span class="ml-2 text-sm text-slate-700">Schedule</span>
                  </label>
                </div>
              </div>

              <!-- Schedule DateTime Picker -->
              <div v-if="sendOption === 'schedule'" class="space-y-4">
                <div>
                  <label class="text-xs font-semibold text-slate-600 mb-2 block">Schedule Date & Time</label>
                  <input v-model="scheduleDateTime" type="datetime-local" class="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label class="text-xs font-semibold text-slate-600 mb-2 block">Quick Schedule</label>
                  <div class="flex flex-wrap gap-2">
                    <button @click="setQuickSchedule(5)" class="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">In 5 minutes</button>
                    <button @click="setQuickSchedule(15)" class="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">In 15 minutes</button>
                    <button @click="setQuickSchedule(30)" class="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">In 30 minutes</button>
                    <button @click="setQuickSchedule(60)" class="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">In 1 hour</button>
                    <button @click="setQuickSchedule(1440)" class="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Tomorrow</button>
                  </div>
                </div>
                <div v-if="scheduleDateTime" class="text-sm text-slate-600">
                  Scheduled for: <span class="font-medium">{{ formatScheduleDate(scheduleDateTime) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MODAL FOOTER -->
        <div class="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div class="text-sm text-slate-500">
            Template: <span class="font-medium text-slate-700">{{ selectedTemplate?.name || 'Not selected' }}</span>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="closeEmailModal"
              class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              v-if="sendOption === 'now' && selectedTemplateId"
              @click="sendEmailNow"
              :disabled="sendingEmail"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="sendingEmail" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Send Now
            </button>
            <button
              v-if="sendOption === 'schedule' && selectedTemplateId && scheduleDateTime"
              @click="scheduleEmail"
              :disabled="schedulingEmail"
              class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="schedulingEmail" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Schedule Email
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FULL SCREEN PREVIEW MODAL -->
    <div v-if="showFullScreenPreview" class="fixed inset-0 bg-black/90 z-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Full Email Preview</h3>
            <p class="text-sm text-slate-500 mt-1">How the email will appear to the recipient</p>
          </div>
          <button @click="showFullScreenPreview = false" class="p-2 hover:bg-slate-100 rounded-lg">
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-auto bg-slate-50">
          <div class="email-fullscreen-preview" v-html="getFullEmailPreview()"></div>
        </div>
      </div>
    </div>

    <!-- EMAIL HISTORY MODAL -->
    <EmailLogsModal
      :lead-id="selectedLeadId"
      :lead-name="selectedLeadName"
      :visible="showEmailHistoryModal"
      @close="showEmailHistoryModal = false"
    />

    <!-- TOAST NOTIFICATIONS -->
    <div v-if="toast.show" class="fixed bottom-4 right-4 z-50">
      <div :class="['px-4 py-3 rounded-lg shadow-lg', toast.type === 'success' ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200']">
        <div class="flex items-center">
          <div :class="['shrink-0', toast.type === 'success' ? 'text-emerald-500' : 'text-rose-500']">
            <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p :class="['text-sm font-medium', toast.type === 'success' ? 'text-emerald-800' : 'text-rose-800']">{{ toast.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import EmailLogsModal from '~/components/EmailLogsModal.vue'

const { 
  COUNTRIES: countryList, 
  findCountryByIso2, 
  findCountryByName, 
  getDialCode, 
  getPrimaryTimezone 
} = useCountries()

definePageMeta({
  layout: 'dashboard',
  title: 'Email Marketing'
})

// State
const contacts = ref([])
const loadingContacts = ref(false)
const searchQuery = ref('')

// Modal states
const showPreviewModal = ref(false)
const showEmailModal = ref(false)
const previewContact = ref({})
const emailContact = ref({})

// Email History Modal state
const showEmailHistoryModal = ref(false)
const selectedLeadId = ref('')
const selectedLeadName = ref('')

// Email sending state
const selectedTemplateId = ref(null)
const emailParams = ref({
  phone: '',
  country: '',
  preferredTime: '',
  timezone: '',
  message: '',
  tripName: '',
  days: 7,
  travellers: '',
  interests: '',
  cta_url: 'https://zafstours.com/contact',
  hero_image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop',
  company_phone: '+255 624 023 455',
  company_email: 'info@zafstours.com',
  unsubscribe_url: 'https://zafstours.com/unsubscribe?token=test'
})

// Country selection state
const selectedCountryIso = ref('')
const selectedCountry = computed(() => {
  return selectedCountryIso.value ? findCountryByIso2(selectedCountryIso.value) : null
})

const availableTimezones = computed(() => {
  return selectedCountry.value?.timezones || []
})

// Countries data - using the imported countryList from composable
const countries = ref(countryList)

// Email preview state
const emailPreview = ref('')
const senderName = computed(() => process.env.BREVO_SENDER_NAME || 'Zafstours')
const senderEmail = computed(() => process.env.BREVO_SENDER_EMAIL || 'amirps385@gmail.com')

// Full screen preview state
const showFullScreenPreview = ref(false)

// Scheduling
const sendOption = ref('now')
const scheduleDateTime = ref('')
const sendingEmail = ref(false)
const schedulingEmail = ref(false)

// Toast notifications
const toast = ref({
  show: false,
  type: 'success',
  message: ''
})

// Email templates
const emailTemplates = ref([
  { id: 4, name: 'Book a Call', description: 'Call confirmation email template' },
  { id: 5, name: 'Itinerary Request', description: 'Your Africa Adventure Has Officially Begun' },
  { id: 6, name: 'Newsletter', description: 'Monthly updates and special offers' }
])

// Computed
const filteredContacts = computed(() => {
  if (!searchQuery.value.trim()) return contacts.value
  
  const query = searchQuery.value.toLowerCase()
  return contacts.value.filter(contact => {
    const name = (contact.name || '').toLowerCase()
    const email = (contact.email || '').toLowerCase()
    const source = (contact.source || '').toLowerCase()
    const leadSourceDetail = (contact.leadSourceDetail || '').toLowerCase()
    const phone = (contact.phone || '').toLowerCase()
    
    return name.includes(query) || 
           email.includes(query) || 
           source.includes(query) ||
           leadSourceDetail.includes(query) ||
           phone.includes(query)
  })
})

const selectedTemplate = computed(() => {
  return emailTemplates.value.find(t => t.id === selectedTemplateId.value) || null
})

// Methods
const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const getInitials = (name) => {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatSource = (source) => {
  const sources = {
    'custom_itinerary': 'Custom Itinerary',
    'bookacall': 'Book a Call',
    'newsletter': 'Newsletter',
    'contact_form': 'Contact Form',
    'referral': 'Referral'
  }
  return sources[source] || source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const humanizeSource = (source) => {
  if (!source) return '—'
  const MAP = {
    'custom_itinerary': 'custom itinerary',
    'facebook_ad': 'Facebook ad',
    'google_search': 'Google search',
    'email': 'Email',
    'social_media': 'Social media platform',
    'facebook': 'Social media platform',
    'instagram': 'Social media platform'
  }
  if (MAP[source]) return MAP[source]
  const s = String(source)
    .replace(/[_-]+/g, ' ')
    .trim()
  return s.toLowerCase()
}

const displaySourceDetail = (detail) => {
  if (!detail) return '—'
  const MAP = {
    'request-quote-clone': 'Website — Quote Request',
    'request-quote': 'Website — Quote Request',
    'contact-form': 'Website — Contact Form',
    'facebook_lead': 'Facebook Lead',
    'facebook_ad': 'Facebook Ad',
    'google_search': 'Google Search',
    'whatsapp_form': 'WhatsApp Form'
  }
  if (MAP[detail]) return MAP[detail]
  const s = String(detail).replace(/[_-]+/g, ' ').trim()
  return s.length > 60 ? s.slice(0,57) + '...' : s
}

const formatActivityName = (activity) => {
  if (!activity) return ''
  return activity
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatStatus = (status) => {
  const statuses = {
    'new': 'New',
    'qualified': 'Qualified',
    'unqualified': 'Unqualified',
    'working': 'Working',
    'closed-won': 'Closed Won',
    'closed-lost': 'Closed Lost'
  }
  return statuses[status] || status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const priorityLabelFrom = (priority) => {
  if (!priority) return 'Not Set'
  const priorityMap = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High',
    'very-high': 'Very High'
  }
  return priorityMap[priority] || priority
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDateShort = (dateString) => {
  if (!dateString) return '—'
  try {
    return new Date(dateString).toLocaleDateString()
  } catch {
    return dateString
  }
}

const formatDateTime = (value) => {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return value
  }
}

const formatScheduleDate = (dateTime) => {
  const date = new Date(dateTime)
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatRole = (role) => {
  if (!role) return ''
  const roleMap = {
    'superadmin': 'Super Admin',
    'admin': 'Admin',
    'content-manager': 'Content Manager',
    'lead-manager': 'Lead Manager',
    'itinerary-planner': 'Itinerary Planner'
  }
  return roleMap[role] || role.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const getSourceBadgeClass = (source) => {
  const classes = {
    'custom_itinerary': 'bg-blue-100 text-blue-800',
    'bookacall': 'bg-purple-100 text-purple-800',
    'newsletter': 'bg-green-100 text-green-800',
    'contact_form': 'bg-yellow-100 text-yellow-800',
    'referral': 'bg-indigo-100 text-indigo-800'
  }
  return classes[source] || 'bg-slate-100 text-slate-800'
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'new': 'bg-blue-100 text-blue-800',
    'qualified': 'bg-emerald-100 text-emerald-800',
    'unqualified': 'bg-rose-100 text-rose-800',
    'working': 'bg-amber-100 text-amber-800',
    'closed-won': 'bg-green-100 text-green-800',
    'closed-lost': 'bg-slate-100 text-slate-800'
  }
  return classes[status] || 'bg-slate-100 text-slate-800'
}

const statusIcon = (s) => {
  if (s === 'working') return '🔄'
  if (s === 'qualified') return '⭐'
  if (s === 'closed-won') return '✅'
  if (s === 'unqualified' || s === 'closed-lost') return '❌'
  return '🟢'
}

const hasTripInfo = (contact) => {
  return contact.days || contact.travellers || contact.who || 
         (contact.activities && contact.activities.length > 0) ||
         contact.budget || (contact.countries && contact.countries.length > 0)
}

// Email History Modal methods
const openEmailHistory = (contact) => {
  selectedLeadId.value = contact._id || contact.id
  selectedLeadName.value = contact.name
  showEmailHistoryModal.value = true
}

// Email preview methods
const refreshPreview = () => {
  if (!selectedTemplateId.value) {
    emailPreview.value = ''
    return
  }

  console.log('🔄 Refreshing preview for template:', selectedTemplateId.value)
  
  const previewHtml = getFullEmailPreview()
  emailPreview.value = previewHtml
  
  console.log('📋 Preview HTML length:', previewHtml.length)
  
  // Force update if full screen preview is open
  if (showFullScreenPreview.value) {
    const previewDiv = document.querySelector('.email-fullscreen-preview')
    if (previewDiv) {
      previewDiv.innerHTML = previewHtml
    }
  }
}

const showPreviewInModal = () => {
  if (selectedTemplateId.value) {
    showFullScreenPreview.value = true
  }
}

// Generate full email preview HTML - COMPLETE WITH NEWSLETTER TEMPLATE
const getFullEmailPreview = () => {
  if (!selectedTemplateId.value) return ''
  
  const params = emailParams.value
  const name = emailContact.value.name || 'Guest'
  
  if (selectedTemplateId.value === 4) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zafs Tours</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5;">
    <!-- WRAPPER -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
        <!-- HEADER -->
        <tr>
            <td align="center" style="padding:30px 20px; background-color:#1a3c34;">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:28px; font-weight:bold; text-align:center;">
                            ZAFS TOURS
                        </td>
                    </tr>
                    <tr>
                        <td style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; padding-top:8px; text-align:center;">
                            Luxury Safari Experiences in Tanzania
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- HERO IMAGE -->
        <tr>
            <td align="center" style="padding:0;">
                <img src="${params.hero_image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop'}" alt="Luxury Safari Image" width="600" style="max-width:100%; height:auto; display:block; border:0;" />
            </td>
        </tr>
        
        <!-- TITLE -->
        <tr>
            <td align="center" style="padding:40px 20px 20px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:24px; font-weight:bold; text-align:center;">
                            Exclusive Safari Adventure Awaits, ${name}!
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- CONFIRMATION BODY -->
        <tr>
            <td align="center" style="padding:0 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="color:#333333; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; text-align:left;">
                            <p style="margin-top:0; margin-bottom:20px;">
                                Thanks — we received your call request. We'll call you at <strong>${params.phone || ''}</strong> (${params.country || ''}) around <strong>${params.preferredTime || ''}</strong> (${params.timezone || ''}).
                            </p>
                            
                            ${params.message ? `
                            <p style="margin:25px 0 10px 0; color:#1a3c34; font-weight:bold;">Your notes:</p>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f8f8f8; border-left:4px solid #d4af37; margin-bottom:25px;">
                                <tr>
                                    <td style="padding:15px 20px; color:#333333; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.5; font-style:italic;">
                                        "${params.message}"
                                    </td>
                                </tr>
                            </table>
                            ` : ''}
                            
                            <p style="margin-bottom:0;">
                                If you need to reschedule or have urgent questions before our call, please reply to this email or contact us directly.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- HIGHLIGHTS -->
        <tr>
            <td align="center" style="padding:30px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="padding:0 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:160px; display:inline-table;">
                                <tr>
                                    <td align="center" style="background-color:#f8f5ec; padding:15px; border:1px solid #d4af37;">
                                        <span style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold;">Luxury Lodges</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td align="center" style="padding:0 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:160px; display:inline-table;">
                                <tr>
                                    <td align="center" style="background-color:#f8f5ec; padding:15px; border:1px solid #d4af37;">
                                        <span style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold;">Expert Guides</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td align="center" style="padding:0 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:160px; display:inline-table;">
                                <tr>
                                    <td align="center" style="background-color:#f8f5ec; padding:15px; border:1px solid #d4af37;">
                                        <span style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold;">Private Tours</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- PRIMARY CTA BUTTON -->
        <tr>
            <td align="center" style="padding:30px 20px 20px 20px;">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="background-color:#d4af37; border-radius:4px;">
                            <a href="${params.cta_url || 'https://zafstours.com/contact'}" style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; text-decoration:none; padding:15px 40px; display:inline-block;">
                                BOOK NOW
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- SECONDARY PHONE CTA -->
        <tr>
            <td align="center" style="padding:0 20px 40px 20px;">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#666; padding:10px 0;">
                            or
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <a href="tel:${params.company_phone}" style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; text-decoration:none; padding:12px 30px; display:inline-block; border:2px solid #d4af37; border-radius:4px;">
                                Call us: ${params.company_phone}
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- FOOTER -->
        <tr>
            <td align="center" style="padding:40px 20px; background-color:#1a3c34;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; padding-bottom:15px;">
                            Zafs Tours
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:10px;">
                            Luxury Travel & Safari Specialists
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:5px;">
                            Arusha, Tanzania
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:5px;">
                            ${params.company_phone}
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:25px;">
                            <a href="mailto:${params.company_email}" style="color:#ffffff; text-decoration:underline;">${params.company_email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top:25px; border-top:1px solid #2c5a4d;">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 12px;">
                                        <a href="https://zafstours.com" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Website</a>
                                    </td>
                                    <td style="padding:0 12px; color:#d4af37;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="https://zafstours.com/privacy" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Privacy</a>
                                    </td>
                                    <td style="padding:0 12px; color:#d4af37;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="${params.unsubscribe_url}" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Unsubscribe</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top:25px;">
                            <p style="color:#a0b5ae; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:1.5; max-width:500px; margin:0 auto;">
                                You're receiving this email because you requested a consultation with Zafs Tours. We respect your privacy. View our <a href="https://zafstours.com/privacy" style="color:#d4af37; text-decoration:underline;">privacy policy</a>.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
 } else if (selectedTemplateId.value === 5) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Africa Adventure Has Officially Begun</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5;">
    <!-- WRAPPER -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
        <!-- HEADER -->
        <tr>
            <td align="center" style="padding:30px 20px; background-color:#1a3c34;">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:28px; font-weight:bold; text-align:center;">
                            ZAFS TOURS
                        </td>
                    </tr>
                    <tr>
                        <td style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; padding-top:8px; text-align:center;">
                            Luxury Safari Experiences in Tanzania
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- HERO IMAGE -->
        <tr>
            <td align="center" style="padding:0;">
                <img src="${params.hero_image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop'}" alt="African Safari Adventure" width="600" style="max-width:100%; height:auto; display:block; border:0;" />
            </td>
        </tr>
        
        <!-- TITLE -->
        <tr>
            <td align="center" style="padding:40px 20px 20px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:28px; font-weight:bold; text-align:center; line-height:1.3;">
                            Get Ready for the Adventure of a Lifetime
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- MAIN CONTENT -->
        <tr>
            <td align="center" style="padding:0 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="color:#333333; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; text-align:left;">
                            <!-- GREETING -->
                            <p style="margin-top:0; margin-bottom:20px; font-size:18px; color:#1a3c34;">
                                <strong>Karibu ${name},</strong>
                            </p>
                            
                            <p style="margin-bottom:20px;">
                                Thank you for sharing your travel plans with us. Your journey to Africa is already taking shape, and we're truly excited to be part of it.
                            </p>
                            
                            <p style="margin-bottom:20px;">
                                Based on the details you've submitted, our travel experts are now crafting a personalized itinerary tailored to your interests, travel dates, group size, and adventure level. Whether it's a thrilling safari, the challenge of Mount Kilimanjaro, or a perfectly balanced mix of both, we've got you covered.
                            </p>
                            
                            <!-- WHAT HAPPENS NEXT -->
                            <div style="background-color:#f8fafc; border:1px solid #eef6f3; border-radius:8px; padding:25px; margin:30px 0;">
                                <h3 style="color:#1a3c34; margin-top:0; margin-bottom:20px; font-size:20px; text-align:center;">
                                    What happens next?
                                </h3>
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:15px;">
                                    <tr>
                                        <td valign="top" style="padding:12px 10px 12px 0; width:30px;">
                                            <span style="color:#1a3c34; font-weight:bold;">✓</span>
                                        </td>
                                        <td valign="top" style="padding:12px 0;">
                                            <strong>Our specialists</strong> are carefully reviewing your preferences
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" style="padding:12px 10px 12px 0;">
                                            <span style="color:#1a3c34; font-weight:bold;">→</span>
                                        </td>
                                        <td valign="top" style="padding:12px 0;">
                                            We'll design an itinerary aligned with your goals, comfort, and budget
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" style="padding:12px 10px 12px 0;">
                                            <span style="color:#1a3c34; font-weight:bold;">✉</span>
                                        </td>
                                        <td valign="top" style="padding:12px 0;">
                                            You'll hear back from us within <strong>24–48 hours</strong> with a curated plan and next steps
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <p style="margin-bottom:20px;">
                                If we need any clarification to perfect your experience, a member of our team may reach out directly.
                            </p>
                            
                            <!-- REQUEST DETAILS -->
                            ${params.tripName || params.days || params.travellers ? `
                            <div style="background-color:#f8fafc; border:1px solid #eef6f3; border-radius:8px; padding:20px; margin:25px 0;">
                                <h3 style="color:#1a3c34; margin-top:0; margin-bottom:15px; font-size:18px;">Request Summary</h3>
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:15px;">
                                    ${params.tripName ? `
                                    <tr>
                                        <td style="padding:8px 0; color:#1a3c34; font-weight:bold; width:120px;">Trip:</td>
                                        <td style="padding:8px 0;">${params.tripName}</td>
                                    </tr>
                                    ` : ''}
                                    ${params.days ? `
                                    <tr>
                                        <td style="padding:8px 0; color:#1a3c34; font-weight:bold;">Duration:</td>
                                        <td style="padding:8px 0;">${params.days} days</td>
                                    </tr>
                                    ` : ''}
                                    ${params.travellers ? `
                                    <tr>
                                        <td style="padding:8px 0; color:#1a3c34; font-weight:bold;">Travellers:</td>
                                        <td style="padding:8px 0;">${params.travellers}</td>
                                    </tr>
                                    ` : ''}
                                    ${params.interests ? `
                                    <tr>
                                        <td style="padding:8px 0; color:#1a3c34; font-weight:bold;">Interests:</td>
                                        <td style="padding:8px 0;">${params.interests}</td>
                                    </tr>
                                    ` : ''}
                                </table>
                            </div>
                            ` : ''}
                            
                            <!-- MESSAGE -->
                            ${params.message ? `
                            <div style="margin:25px 0;">
                                <p style="color:#1a3c34; font-weight:bold; margin-bottom:10px;">Your Message:</p>
                                <div style="background-color:#f8f8f8; border-left:4px solid #d4af37; padding:15px 20px; font-style:italic; color:#333333;">
                                    "${params.message}"
                                </div>
                            </div>
                            ` : ''}
                            
                            <p style="margin-bottom:20px; font-style:italic; color:#1a3c34; border-left:4px solid #d4af37; padding-left:15px;">
                                In the meantime, imagine waking up to sweeping savannah views, spotting wildlife in their natural habitat, or standing on Africa's highest peak. Your adventure is closer than you think.
                            </p>
                            
                            <!-- CLOSING -->
                            <p style="margin-bottom:10px;">
                                Warm regards,
                            </p>
                            <p style="margin-top:0; margin-bottom:30px; font-size:18px; color:#d4af37; font-weight:bold;">
                                Team ZAFS
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- FOOTER -->
        <tr>
            <td align="center" style="padding:40px 20px; background-color:#1a3c34;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; padding-bottom:15px;">
                            ZAFS Tours
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:20px; font-style:italic;">
                            Crafting once-in-a-lifetime African adventures
                        </td>
                    </tr>
                    
                    <!-- CONTACT INFO -->
                    <tr>
                        <td align="center" style="padding-bottom:25px;">
                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto; font-family:Arial, Helvetica, sans-serif; font-size:14px;">
                                <tr>
                                    <td valign="middle" style="padding:5px 8px 5px 0; color:#ffffff;">
                                        <strong>Location:</strong>
                                    </td>
                                    <td valign="middle" style="padding:5px 0; color:#ffffff;">
                                        Based in Tanzania
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style="padding:5px 8px 5px 0; color:#ffffff;">
                                        <strong>Website:</strong>
                                    </td>
                                    <td valign="middle" style="padding:5px 0;">
                                        <a href="https://zafstours.com" style="color:#ffffff; text-decoration:none;">www.zafstours.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style="padding:5px 8px 5px 0; color:#ffffff;">
                                        <strong>Email:</strong>
                                    </td>
                                    <td valign="middle" style="padding:5px 0;">
                                        <a href="mailto:${params.company_email || 'info@zafstours.com'}" style="color:#ffffff; text-decoration:none;">${params.company_email || 'info@zafstours.com'}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style="padding:5px 8px 5px 0; color:#ffffff;">
                                        <strong>Phone:</strong>
                                    </td>
                                    <td valign="middle" style="padding:5px 0; color:#ffffff;">
                                        <a href="tel:${params.company_phone || '+255620285462'}" style="color:#ffffff; text-decoration:none;">${params.company_phone || '+255 620 285 462'}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- FINAL NOTE -->
                    <tr>
                        <td align="center" style="padding-top:25px; border-top:1px solid #2c5a4d;">
                            <p style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; margin-bottom:15px;">
                                You'll hear from our team within 24–48 hours with your personalized itinerary.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- BOTTOM LINKS -->
                    <tr>
                        <td align="center" style="padding-top:25px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 12px;">
                                        <a href="https://zafstours.com" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Website</a>
                                    </td>
                                    <td style="padding:0 12px; color:#d4af37;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="https://zafstours.com/privacy" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Privacy</a>
                                    </td>
                                    <td style="padding:0 12px; color:#d4af37;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="${params.unsubscribe_url || 'https://zafstours.com/unsubscribe?token=test'}" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Unsubscribe</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
 } else if (selectedTemplateId.value === 6) {
  // Newsletter template - NO MESSAGE PARAMETER
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Zafs Tours Newsletter</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5;">
    <!-- WRAPPER -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
        <!-- HEADER -->
        <tr>
            <td align="center" style="padding:30px 20px; background-color:#1a3c34;">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:28px; font-weight:bold; text-align:center;">
                            ZAFS TOURS
                        </td>
                    </tr>
                    <tr>
                        <td style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; padding-top:8px; text-align:center;">
                            Luxury Safari Experiences in Tanzania
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- HERO IMAGE -->
        <tr>
            <td align="center" style="padding:0;">
                <img src="${params.hero_image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop'}" alt="Safari Newsletter" width="600" style="max-width:100%; height:auto; display:block; border:0;" />
            </td>
        </tr>
        
        <!-- CONTENT -->
        <tr>
            <td align="center" style="padding:40px 30px;">
                <h2 style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:24px; font-weight:bold; margin-top:0; margin-bottom:20px;">
                    Welcome to the Family, ${name}!
                </h2>
                
                <!-- WHAT YOU'LL RECEIVE -->
                <div style="background-color:#f8fafc; border:2px solid #d4af37; border-radius:8px; padding:25px; margin:30px 0;">
                    <h3 style="color:#1a3c34; margin-top:0; margin-bottom:20px; font-size:20px; font-weight:bold; text-align:center;">
                        What You'll Receive
                    </h3>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td valign="top" style="padding:12px 10px 12px 0; width:30px;">
                                <span style="color:#d4af37;">✦</span>
                            </td>
                            <td valign="top" style="padding:12px 0;">
                                <strong>Exclusive safari offers</strong> and early-bird discounts
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="padding:12px 10px 12px 0;">
                                <span style="color:#d4af37;">✦</span>
                            </td>
                            <td valign="top" style="padding:12px 0;">
                                <strong>Insider travel tips</strong> and destination guides
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="padding:12px 10px 12px 0;">
                                <span style="color:#d4af37;">✦</span>
                            </td>
                            <td valign="top" style="padding:12px 0;">
                                <strong>Stunning wildlife photography</strong> and safari stories
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="padding:12px 10px 12px 0;">
                                <span style="color:#d4af37;">✦</span>
                            </td>
                            <td valign="top" style="padding:12px 0;">
                                <strong>Seasonal promotions</strong> and special packages
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- CTA BUTTON -->
                <div style="margin:30px 0;">
                    <a href="${params.cta_url}" style="background-color:#d4af37; color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; text-decoration:none; padding:15px 40px; border-radius:4px; display:inline-block;">
                        EXPLORE SAFARIS
                    </a>
                </div>
                
                <p style="color:#666666; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; font-style:italic;">
                    Get ready for amazing content delivered straight to your inbox. Our first edition will arrive soon!
                </p>
            </td>
        </tr>
        
        <!-- FOOTER -->
        <tr>
            <td align="center" style="padding:40px 20px; background-color:#1a3c34;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; padding-bottom:15px;">
                            Zafs Tours
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:10px;">
                            Luxury Travel & Safari Specialists
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:5px;">
                            Arusha, Tanzania
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:5px;">
                            ${params.company_phone}
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:25px;">
                            <a href="mailto:${params.company_email}" style="color:#ffffff; text-decoration:underline;">${params.company_email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top:25px; border-top:1px solid #2c5a4d;">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 12px;">
                                        <a href="https://zafstours.com" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Website</a>
                                    </td>
                                    <td style="padding:0 12px; color:#d4af37;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="https://zafstours.com/privacy" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Privacy</a>
                                    </td>
                                    <td style="padding:0 12px; color:#d4af37;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="${params.unsubscribe_url}" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Unsubscribe</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
  }
  
  return '<p class="text-slate-500 p-4">Template preview not available</p>'
}

const getEmailSubject = () => {
  if (!selectedTemplateId.value) return 'No template selected'
  
  const name = emailContact.value.name || 'Guest'
  
  switch (selectedTemplateId.value) {
    case 4:
      return `${name}, your call request is confirmed`
    case 5:
      return `Thanks ${name} - Your Africa Adventure Has Officially Begun`
    case 6:
      return `Welcome ${name}! Your Safari Insider Newsletter`
    default:
      return 'Email from Zafs Tours'
  }
}

const getEmailPreviewText = () => {
  if (!selectedTemplateId.value) return ''
  
  switch (selectedTemplateId.value) {
    case 4:
      return 'Our team will contact you shortly to plan your safari.'
    case 5:
      return 'We\'ll send your full itinerary in 48 hours.'
    case 6:
      return 'Welcome to our exclusive safari newsletter community!'
    default:
      return ''
  }
}

// Country change handler
const onCountryChange = () => {
  const country = selectedCountry.value
  if (country) {
    emailParams.value.country = country.name || ''
    
    // Auto-fill timezone if not already set
    if (!emailParams.value.timezone && country.timezones && country.timezones.length > 0) {
      emailParams.value.timezone = country.timezones[0] || 'Africa/Dar_es_Salaam'
    }
    
    refreshPreview()
  } else {
    emailParams.value.country = ''
  }
}

// Modal methods
const openPreviewModal = (contact) => {
  previewContact.value = contact
  showPreviewModal.value = true
}

const closePreviewModal = () => {
  showPreviewModal.value = false
}

const openEmailModal = (contact) => {
  emailContact.value = contact
  
  // Get current date for scheduling defaults
  const now = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  
  // Try to find country from contact data
  let countryIso = contact.country_iso || ''
  if (!countryIso && contact.country) {
    const foundCountry = findCountryByName(contact.country)
    if (foundCountry) {
      countryIso = foundCountry.iso2
    }
  }
  
  // Set selected country
  selectedCountryIso.value = countryIso
  
  // Get default timezone
  const defaultTimezone = selectedCountry.value?.timezones?.[0] || 'Africa/Dar_es_Salaam'
  
  // Pre-fill contact data with smart defaults
  emailParams.value = {
    phone: contact.phone ? contact.phone.replace(/\D/g, '').slice(-9) : '',
    country: contact.country || '',
    preferredTime: contact.preferredTime ? formatDateTime(contact.preferredTime) : 
      `${tomorrow.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} — 10:30 AM`,
    timezone: contact.timezone || defaultTimezone,
    message: contact.message || '',
    tripName: contact.activities && contact.activities.length > 0 ? 
      `${formatActivityName(contact.activities[0])} Safari Itinerary` : '',
    days: contact.days || 7,
    travellers: contact.travellers?.toString() || '',
    interests: contact.activities?.join(', ') || '',
    cta_url: 'https://zafstours.com/contact',
    hero_image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop',
    company_phone: '+255 624 023 455',
    company_email: 'info@zafstours.com',
    unsubscribe_url: 'https://zafstours.com/unsubscribe?token=test'
  }
  
  // Reset template selection
  selectedTemplateId.value = null
  sendOption.value = 'now'
  scheduleDateTime.value = getDefaultSchedule()
  
  showEmailModal.value = true
}

const closeEmailModal = () => {
  showEmailModal.value = false
  sendingEmail.value = false
  schedulingEmail.value = false
  emailPreview.value = ''
  selectedCountryIso.value = ''
  showFullScreenPreview.value = false
}

// Template change handler
const onTemplateChange = () => {
  console.log('📝 Template changed to:', selectedTemplateId.value)
  
  if (!selectedTemplateId.value) {
    emailPreview.value = ''
    return
  }
  
  // Pre-fill additional data based on template
  if (selectedTemplateId.value === 4) {
    // Book a Call template
    if (!emailParams.value.preferredTime && emailContact.value.preferredTime) {
      emailParams.value.preferredTime = formatDateTime(emailContact.value.preferredTime)
    } else if (!emailParams.value.preferredTime) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      emailParams.value.preferredTime = tomorrow.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }) + ' — 10:30 AM'
    }
    if (!emailParams.value.timezone && emailContact.value.timezone) {
      emailParams.value.timezone = emailContact.value.timezone
    } else if (!emailParams.value.timezone && selectedCountry.value?.timezones?.[0]) {
      emailParams.value.timezone = selectedCountry.value.timezones[0]
    } else if (!emailParams.value.timezone) {
      emailParams.value.timezone = 'Africa/Dar_es_Salaam'
    }
  } else if (selectedTemplateId.value === 5) {
    // Itinerary Request template
    if (!emailParams.value.tripName && emailContact.value.activities && emailContact.value.activities.length > 0) {
      emailParams.value.tripName = `${formatActivityName(emailContact.value.activities[0])} Safari Itinerary`
    }
  }
  // For newsletter template (id: 6), no parameters needed
  
  // Generate preview immediately
  setTimeout(() => {
    refreshPreview()
  }, 100)
}

// Watch for parameter changes
watch(emailParams, () => {
  if (selectedTemplateId.value) {
    // Debounce the preview refresh to avoid too many updates
    clearTimeout(window.previewTimeout)
    window.previewTimeout = setTimeout(refreshPreview, 300)
  }
}, { deep: true })

// Scheduling methods
const getDefaultSchedule = (minutes = 10) => {
  const now = new Date()
  const future = new Date(now.getTime() + minutes * 60000)
  return formatDateTimeLocal(future)
}

const formatDateTimeLocal = (date) => {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const setQuickSchedule = (minutes) => {
  const now = new Date()
  const future = new Date(now.getTime() + minutes * 60000)
  scheduleDateTime.value = formatDateTimeLocal(future)
  sendOption.value = 'schedule'
}

// Email sending methods - UPDATED WITH NEWSLETTER SUPPORT
const sendEmailNow = async () => {
  if (!selectedTemplateId.value || !emailContact.value.email) {
    showToast('Please select a template and ensure contact has email', 'error')
    return
  }

  sendingEmail.value = true

  try {
    // Generate the full email HTML BEFORE sending
    const fullEmailHtml = getFullEmailPreview()
    const previewText = getEmailPreviewText()
    const subject = getEmailSubject()
    
    console.log('🔍 DEBUG - Generated HTML:', {
      htmlLength: fullEmailHtml.length,
      previewTextLength: previewText.length,
      subject: subject,
      first100Chars: fullEmailHtml.substring(0, 100)
    })

    // Extract phone and country separately
    const { phone: paramPhone, country: paramCountry, ...restParams } = emailParams.value
    
    // Build the complete phone number with country code
    const fullPhone = selectedCountry.value 
      ? selectedCountry.value.dial_code + (paramPhone || '') 
      : paramPhone || ''
    
    // Get country name
    const countryName = paramCountry || selectedCountry.value?.name || ''
    
    // Prepare the request body with ALL necessary data
    const body = {
      email: emailContact.value.email,
      name: emailContact.value.name,
      templateId: selectedTemplateId.value,
      leadId: emailContact.value._id || emailContact.value.id,
      phone: fullPhone,
      country: countryName,
      subject: subject,
      previewText: previewText,
      fullHtml: fullEmailHtml,
      previewHtml: previewText,
      ...restParams
    }
    
    // For template 4 (Book a Call), ensure timezone is included
    if (selectedTemplateId.value === 4) {
      body.timezone = emailParams.value.timezone || emailContact.value.timezone || 'Africa/Dar_es_Salaam'
      body.preferredTime = emailParams.value.preferredTime || 
        (emailContact.value.preferredTime ? formatDateTime(emailContact.value.preferredTime) : 
        `${new Date(Date.now() + 86400000).toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })} — 10:30 AM`)
    }
    
    // For template 5 (Itinerary), ensure trip details are included
    if (selectedTemplateId.value === 5) {
      body.tripName = emailParams.value.tripName || 
        (emailContact.value.activities && emailContact.value.activities.length > 0 
          ? `${formatActivityName(emailContact.value.activities[0])} Safari Itinerary`
          : 'Custom Safari Itinerary')
      body.days = emailParams.value.days || emailContact.value.days || 7
      body.travellers = emailParams.value.travellers || 
        `${emailContact.value.travellers || '2'} people`
      body.interests = emailParams.value.interests || 
        emailContact.value.activities?.join(', ') || ''
    }
    
    // For template 6 (Newsletter), use the existing 'message' field
    if (selectedTemplateId.value === 6) {
      body.message = emailParams.value.message || 'Welcome to the Zafs Tours newsletter!'
    }

    // Determine which endpoint to use based on template
    let endpoint
    if (selectedTemplateId.value === 5) {
      endpoint = '/api/emailtest/send-itinerary'
    } else if (selectedTemplateId.value === 6) {
      endpoint = '/api/emailtest/send-newsletter'
    } else {
      endpoint = '/api/emailtest/send'
    }

    console.log('📧 Sending email to:', endpoint)
    console.log('📧 Email body includes fullHtml:', !!body.fullHtml)
    console.log('📧 Email body includes previewHtml:', !!body.previewHtml)
    console.log('📧 Email body includes subject:', !!body.subject)

    const res = await $fetch(endpoint, {
      method: 'POST',
      body
    })

    console.log('📧 API Response:', res)

    if (res.success) {
      showToast(`Email sent successfully to ${emailContact.value.name}`, 'success')
      // Refresh email logs immediately
      if (selectedLeadId.value === (emailContact.value._id || emailContact.value.id)) {
        // Trigger email logs refresh
        const event = new CustomEvent('refresh-email-logs')
        window.dispatchEvent(event)
      }
      closeEmailModal()
    } else {
      // Handle error with debug info if available
      const errorMessage = res.debug?.error || 'Failed to send email'
      console.error('📧 Email sending failed:', errorMessage, res)
      showToast(errorMessage, 'error')
    }
  } catch (error) {
    console.error('Send email error:', error)
    showToast(error?.data?.message || error?.message || 'Failed to send email', 'error')
  } finally {
    sendingEmail.value = false
  }
}

const scheduleEmail = async () => {
  if (!selectedTemplateId.value || !emailContact.value.email || !scheduleDateTime.value) {
    showToast('Please select template and schedule time', 'error')
    return
  }

  schedulingEmail.value = true

  try {
    // Validate schedule time is in the future
    const scheduledDate = new Date(scheduleDateTime.value)
    if (scheduledDate <= new Date()) {
      showToast('Schedule time must be in the future', 'error')
      schedulingEmail.value = false
      return
    }

    // Generate the full email HTML BEFORE sending
    const fullEmailHtml = getFullEmailPreview()
    const previewText = getEmailPreviewText()
    const subject = getEmailSubject()
    
    // Extract phone and country separately
    const { phone: paramPhone, country: paramCountry, ...restParams } = emailParams.value
    
    // Build the complete phone number with country code
    const fullPhone = selectedCountry.value 
      ? selectedCountry.value.dial_code + (paramPhone || '') 
      : paramPhone || ''
    
    // Get country name
    const countryName = paramCountry || selectedCountry.value?.name || ''
    
    // Prepare the scheduled ISO date
    const scheduledISO = scheduledDate.toISOString()
    
    // Prepare the request body with HTML content
    const body = {
      email: emailContact.value.email,
      name: emailContact.value.name,
      templateId: selectedTemplateId.value,
      leadId: emailContact.value._id || emailContact.value.id,
      scheduledAt: scheduledISO,
      phone: fullPhone,
      country: countryName,
      subject: subject,
      previewText: previewText,
      fullHtml: fullEmailHtml,
      previewHtml: previewText,
      ...restParams
    }
    
    // For template 4 (Book a Call), ensure timezone is included
    if (selectedTemplateId.value === 4) {
      body.timezone = emailParams.value.timezone || emailContact.value.timezone || 'Africa/Dar_es_Salaam'
      body.preferredTime = emailParams.value.preferredTime || 
        (emailContact.value.preferredTime ? formatDateTime(emailContact.value.preferredTime) : 
        `${scheduledDate.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })} — ${scheduledDate.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}`)
    }
    
    // For template 5 (Itinerary), ensure trip details are included
    if (selectedTemplateId.value === 5) {
      body.tripName = emailParams.value.tripName || 
        (emailContact.value.activities && emailContact.value.activities.length > 0 
          ? `${formatActivityName(emailContact.value.activities[0])} Safari Itinerary`
          : 'Custom Safari Itinerary')
      body.days = emailParams.value.days || emailContact.value.days || 7
      body.travellers = emailParams.value.travellers || 
        `${emailContact.value.travellers || '2'} people`
      body.interests = emailParams.value.interests || 
        emailContact.value.activities?.join(', ') || ''
    }
    
    // For template 6 (Newsletter), use the existing 'message' field
    if (selectedTemplateId.value === 6) {
      body.message = emailParams.value.message || 'Welcome to the Zafs Tours newsletter!'
    }

    // Determine endpoint based on template
    let endpoint
    if (selectedTemplateId.value === 5) {
      endpoint = '/api/emailtest/schedule-itinerary'
    } else if (selectedTemplateId.value === 6) {
      endpoint = '/api/emailtest/schedule-newsletter'
    } else {
      endpoint = '/api/emailtest/schedule'
    }

    console.log('📅 Scheduling email with body:', {
      email: body.email,
      templateId: body.templateId,
      scheduledAt: body.scheduledAt,
      htmlLength: fullEmailHtml.length
    })

    const res = await $fetch(endpoint, {
      method: 'POST',
      body
    })

    if (res.success) {
      showToast(`Email scheduled for ${formatScheduleDate(scheduleDateTime.value)}`, 'success')
      closeEmailModal()
    } else {
      const errorMessage = res.debug?.error || 'Failed to schedule email'
      showToast(errorMessage, 'error')
    }
  } catch (error) {
    console.error('Schedule email error:', error)
    showToast(error?.data?.message || error?.message || 'Failed to schedule email', 'error')
  } finally {
    schedulingEmail.value = false
  }
}

// Data fetching
const fetchContacts = async () => {
  loadingContacts.value = true
  try {
    const data = await $fetch('/api/leads')
    contacts.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    showToast('Failed to load contacts', 'error')
  } finally {
    loadingContacts.value = false
  }
}

const refreshContacts = async () => {
  await fetchContacts()
  showToast('Contacts refreshed', 'success')
}

// Lifecycle
onMounted(() => {
  fetchContacts()
})
</script>

<style scoped>
/* Custom scrollbar for modals */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation for modals */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Email preview styles */
.email-preview-template {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
  color: #333333;
}

.email-preview-template a {
  color: #1a3c34;
  text-decoration: underline;
}

.email-preview-template table {
  border-collapse: collapse;
  width: 100%;
}

.email-preview-template td {
  padding: 0;
}

.email-preview-template img {
  max-width: 100%;
  height: auto;
}

.email-preview-template .button {
  background-color: #d4af37;
  color: #1a3c34;
  padding: 15px 40px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  display: inline-block;
}

.email-preview-template .highlight-box {
  background-color: #f8f8f8;
  border-left: 4px solid #d4af37;
  padding: 15px 20px;
  font-style: italic;
}

.email-preview-template .summary-box {
  background-color: #f8fafc;
  border: 1px solid #eef6f3;
  border-radius: 8px;
  padding: 20px;
}

/* Full screen preview */
.email-fullscreen-preview {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100%;
}

.email-fullscreen-preview :deep(*) {
  max-width: 100% !important;
}

.email-fullscreen-preview :deep(table) {
  width: 100% !important;
  border-collapse: collapse;
}

.email-fullscreen-preview :deep(img) {
  max-width: 100% !important;
  height: auto !important;
}

.email-fullscreen-preview :deep(a) {
  color: #1a3c34;
  text-decoration: underline;
}

.email-fullscreen-preview :deep(.button) {
  background-color: #d4af37;
  color: #1a3c34;
  padding: 15px 40px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  display: inline-block;
}

/* Button hover effects */
.btn-primary {
  background: linear-gradient(180deg, #1a56a6, #174b9a);
}

.btn-primary:hover {
  background: linear-gradient(180deg, #174b9a, #133d82);
}

/* Status badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-new {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge-qualified {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-working {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-unqualified {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-closed-won {
  background-color: #e0e7ff;
  color: #3730a3;
}

.badge-closed-lost {
  background-color: #fecaca;
  color: #7f1d1d;
}
</style>