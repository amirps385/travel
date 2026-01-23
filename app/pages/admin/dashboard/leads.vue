<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-6">

      <!-- RESTRICTION BANNER FOR NON-ADMINS -->
      <div v-if="!canAssignLeads" class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
        <div class="flex items-start gap-2">
          <span class="text-amber-600">⚠️</span>
          <div class="text-sm text-amber-800">
            <strong>Restricted Access:</strong> As a {{ userRoleFormatted }}, you can view leads but cannot assign them to other users.
          </div>
        </div>
      </div>

      <!-- HEADER -->
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Leads — CRM view</h1>
          <p class="text-sm text-slate-500 mt-1">
            Track lead source, status, timeline and next actions. Click a row to open the CRM drawer.
          </p>
          <div class="mt-2 text-xs text-slate-400">
            Role: <span class="font-medium">{{ userRoleFormatted }}</span>
          </div>
        </div>

        <div class="text-sm text-slate-400">
          {{ today }}
        </div>
      </div>

      <!-- FILTER BAR -->
      <div class="bg-white rounded-xl border p-4 flex flex-wrap gap-3 items-center">
        <input
          v-model="leadSearch"
          placeholder="Search name, email or phone"
          class="border rounded-lg px-3 py-2 text-sm w-full max-w-xs"
        />

        <select v-model="leadStatusFilter" class="border rounded-lg px-3 py-2 text-sm">
          <option value="all">All statuses</option>
          <option v-for="s in statusOptions" :key="s.key" :value="s.key">{{ s.label }}</option>
        </select>

        <select v-model="leadPriorityFilter" class="border rounded-lg px-3 py-2 text-sm">
          <option value="all">All priorities</option>
          <option v-for="p in priorityOptions" :key="p.value" :value="p.value">{{ p.label }}</option>
        </select>

        <select v-model="leadSort" class="border rounded-lg px-3 py-2 text-sm">
          <option value="createdDesc">Newest</option>
          <option value="createdAsc">Oldest</option>
          <option value="priorityDesc">Priority (High to Low)</option>
        </select>

        <div class="ml-auto flex gap-2">
          <button
            class="px-3 py-2 rounded-lg text-xs bg-slate-100 hover:bg-slate-200"
            @click="loadLeads"
          >
            🔄 Refresh
          </button>

          <!-- CONDITIONAL BULK ASSIGN BUTTON -->
          <button
            v-if="canAssignLeads"
            class="px-3 py-2 rounded-lg text-xs bg-emerald-600 text-white disabled:opacity-40"
            :disabled="!selectedIds.length"
            @click="openBulkAssignModal"
          >
            Assign selected
          </button>
          <button
            v-else
            class="px-3 py-2 rounded-lg text-xs bg-slate-300 text-slate-600 cursor-not-allowed"
            disabled
            title="Only admins can assign leads"
          >
            Assign selected
          </button>
        </div>
      </div>

      <!-- LEADS TABLE -->
      <div class="bg-white rounded-xl border overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th class="p-3 w-6">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" aria-label="Select all leads" />
              </th>
              <th class="p-3">Lead</th>
              <th class="p-3">Trip</th>
              <th class="p-3">Source</th>
              <th class="p-3">Status</th>
              <th class="p-3">Priority</th>
              <th class="p-3">Owner</th>
              <th class="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="lead in sortedFilteredLeads"
              :key="lead._id || lead.id"
              class="border-t hover:bg-slate-50 cursor-pointer"
              @click="openLeadDetails(lead)"
            >
              <td class="p-3">
                <input
                  type="checkbox"
                  :value="lead._id"
                  v-model="selectedIds"
                  @click.stop
                />
              </td>

              <!-- LEAD -->
              <td class="p-3">
                <div class="font-semibold text-slate-900">
                  {{ lead.name || 'Unnamed lead' }}
                </div>
                <div class="text-xs text-slate-500">
                  <span v-if="lead.countryCode">{{ lead.countryCode }} </span>{{ lead.phone || lead.email || 'No contact' }}
                </div>
                <div class="text-xs text-slate-400 mt-1">
                  {{ lead.originCity || '' }} {{ lead.country ? ('• ' + lead.country) : '' }}
                </div>
              </td>

              <!-- TRIP -->
              <td class="p-3 text-slate-600">
                <div>{{ lead.prettyDate || '—' }}</div>
                <div class="text-xs text-slate-400">{{ lead.travellers || 0 }} pax • {{ lead.days || '—' }} days</div>
              </td>

              <!-- SOURCE -->
<td class="p-3 text-slate-600">
  <div class="font-medium">
    {{ humanizeSource(lead.source) || 'Website Form' }}
  </div>
  <div class="text-xs text-slate-400 mt-0.5">
    {{ lead.leadSourceDetail || '—' }}
  </div>
</td>



              <!-- STATUS -->
              <td class="p-3">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                  :class="statusPillClass(lead.status)"
                >
                  {{ statusLabelFrom(lead.status) }}
                </span>
                <!-- Show closed date if exists -->
                <div v-if="lead.closedDate" class="text-xs text-slate-500 mt-1">
                  {{ formatDateShort(lead.closedDate) }}
                </div>
              </td>

              <!-- PRIORITY -->
              <td class="p-3">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                  :class="priorityPillClass(lead.priority)"
                >
                  {{ priorityLabelFrom(lead.priority) }}
                </span>
              </td>

              <!-- OWNER -->
              <td class="p-3 text-slate-600">
                {{ lead.assignedTo?.name || 'Unassigned' }}
              </td>

              <!-- ACTIONS -->
              <td class="p-3 text-right">
                <div class="inline-flex items-center gap-2 justify-end">
                 <button
  class="px-3 py-1 text-xs rounded-full border hover:bg-slate-100"
  :class="{'opacity-50 cursor-not-allowed': lead.status === 'new'}"
  :disabled="lead.status === 'new'"
  @click.stop="goToBuild(lead)"
  :title="lead.status === 'new' ? 'New leads cannot be built yet' : 'Build Itinerary'"
>
  Build
</button>
                  <button
                    class="px-3 py-1 text-xs rounded-full border hover:bg-slate-100"
                    @click.stop="openStatusChangeFor(lead)"
                  >
                    Status
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!sortedFilteredLeads.length && !isLoading">
              <td colspan="8" class="p-6 text-center text-xs text-slate-500">
                No leads found
              </td>
            </tr>

            <tr v-if="isLoading">
              <td colspan="8" class="p-6 text-center text-xs text-slate-500">
                Loading leads…
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- DRAWER (WIDE) -->
    <transition name="fade">
      <div v-if="isDetailOpen && selectedLead" class="fixed inset-0 z-50 flex">
        <div class="flex-1 bg-black/30" @click="closeLeadDetails" aria-hidden="true"></div>

        <div class="w-full max-w-5xl bg-white shadow-xl overflow-y-auto">
          <!-- HEADER -->
          <div class="p-6 border-b flex justify-between items-start">
            <div class="flex-1">
              <p class="text-xs uppercase tracking-[0.12em] text-sky-500 font-semibold">Lead details</p>

              <!-- editable name -->
              <div class="flex items-center gap-3 mt-2">
                <div v-if="!isEditingLead" class="flex-1">
                  <h2 class="text-2xl font-bold text-slate-900">{{ selectedLead.name || 'Unnamed lead' }}</h2>
                  <p class="text-sm text-slate-500 mt-1">
                    <span v-if="selectedLead.countryCode">{{ selectedLead.countryCode }} </span>{{ selectedLead.phone || '—' }} • {{ selectedLead.email || '—' }}
                  </p>
                </div>

                <div v-else class="flex-1">
                  <input v-model="editForm.name" class="w-full text-2xl font-bold border-b pb-1" />
                  <div class="mt-1 flex gap-2">
                    <input v-model="editForm.email" placeholder="Email" class="border rounded px-2 py-1 text-sm" />
                    <div class="flex gap-1">
                      <input v-model="editForm.countryCode" placeholder="+255" class="w-20 border rounded px-2 py-1 text-sm" />
                      <input 
                        v-model="editForm.phone" 
                        placeholder="Phone (10 digits)" 
                        class="border rounded px-2 py-1 text-sm"
                        @input="validatePhoneNumber"
                      />
                    </div>
                  </div>
                </div>
              </div>

             <div class="mt-3 flex flex-wrap gap-2 items-center">
  <!-- Lead Source -->
  <div class="inline-flex flex-col px-3 py-1.5 rounded-lg bg-slate-50 border text-sm">
    <span class="text-xs text-slate-500">Lead source</span>
    <strong class="text-slate-900">
      {{ humanizeSource(selectedLead.source) || 'Website Form' }}
    </strong>
  </div>

  <!-- Source Detail -->
  <div v-if="selectedLead.leadSourceDetail" class="inline-flex flex-col px-3 py-1.5 rounded-lg bg-slate-50 border text-sm">
    <span class="text-xs text-slate-500">Source detail</span>
    <strong class="text-slate-900">
      {{ selectedLead.leadSourceDetail }}
    </strong>
  </div>

  <div class="inline-flex flex-col items-center gap-2 px-3 py-1.5 rounded-lg" :class="priorityBadgeClass(selectedLead.priority)">
  <div class="flex items-center gap-1">
    <strong class="text-sm">{{ priorityLabelFrom(selectedLead.priority) }}</strong>
    <button 
      class="ml-1 text-xs text-slate-500 hover:text-slate-700"
      @click="openPriorityModal"
      title="Change priority"
    >
      ✏️
    </button>
  </div>
  
  <!-- Show reason if exists -->
  <div v-if="lastPriorityChangeReason(selectedLead)" class="text-xs text-slate-600 mt-0.5 max-w-[150px] truncate">
    {{ lastPriorityChangeReason(selectedLead) }}
  </div>
  
  <div v-else class="text-xs text-slate-400 mt-0.5">
    Priority
  </div>
</div>

  

  <div v-if="selectedLead.assignedTo?.name" class="px-3 py-1.5 rounded-lg bg-slate-50 text-sm font-medium border">
    Owner: {{ selectedLead.assignedTo.name }}
  </div>
</div>
            </div>

            <div class="shrink-0 flex items-center gap-2">
              <div v-if="!isEditingLead" class="flex items-center gap-2">
                <button class="px-4 py-2 rounded-lg bg-white border" @click="openStatusModal(selectedLead)">Change status</button>

                <!-- CONDITIONAL ASSIGN DROPDOWN -->
                <select 
                  v-if="canAssignLeads"
                  v-model="assignSelect" 
                  @change="assignLeadToSelected(assignSelect)" 
                  class="rounded-lg px-3 py-2 text-sm border bg-white"
                >
                  <option :value="null">Unassigned</option>
                  <option v-for="u in leadManagers" :key="u.id" :value="u.id">{{ u.name }} ({{ u.roleFormatted }})</option>
                </select>
                <button 
                  v-else
                  class="px-3 py-2 rounded-lg text-sm border bg-slate-100 text-slate-500 cursor-not-allowed"
                  disabled
                  title="Only admins can assign leads"
                >
                  {{ selectedLead.assignedTo?.name || 'Unassigned' }}
                </button>

                <button 
  class="px-4 py-2 rounded-lg text-white"
  :class="selectedLead.status === 'new' ? 'bg-emerald-400 opacity-50 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'"
  :disabled="selectedLead.status === 'new'"
  @click="handleConvert(selectedLead)"
  :title="selectedLead.status === 'new' ? 'New leads cannot be converted yet' : 'Convert / Build'"
>
  Convert / Build
</button>

                <button class="px-4 py-2 rounded-lg border bg-white" @click="startEdit">Edit contact</button>
              </div>

              <div v-else class="flex items-center gap-2">
                <button class="px-4 py-2 rounded-lg bg-emerald-600 text-white" :disabled="isSavingContact" @click="saveContactEdits">
                  {{ isSavingContact ? 'Saving…' : 'Save' }}
                </button>
                <button class="px-4 py-2 rounded-lg border bg-white" @click="cancelEdit" :disabled="isSavingContact">Cancel</button>
              </div>

              <button class="rounded-full w-10 h-10 flex items-center justify-center border bg-white hover:bg-slate-100" @click="closeLeadDetails">✕</button>
            </div>
          </div>

          <!-- SUMMARY STRIP -->
          <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b">
            <div class="p-4 rounded-xl bg-linear-to-r from-white to-slate-50 border flex items-center justify-between">
              <div>
                <div class="text-xs text-slate-500">Status</div>
                <div class="mt-1 text-lg font-semibold">{{ statusLabelFrom(selectedLead.status) }}</div>
                <!-- Show closed reason if applicable -->
                <div v-if="(selectedLead.status === 'closed-lost' || selectedLead.status === 'closed-won') && selectedLead.closedReason" 
                     class="text-xs text-slate-600 mt-1">
                  {{ selectedLead.closedReason }}
                </div>
                <!-- Show closed date if applicable -->
                <div v-if="selectedLead.closedDate" class="text-xs text-slate-400 mt-1">
                  Closed: {{ formatDateShort(selectedLead.closedDate) }}
                </div>
                <div class="text-xs text-slate-400 mt-1">Updated: {{ formatDateTime(lastEventAt(selectedLead)) }}</div>
              </div>
              <div class="text-3xl">{{ statusIcon(selectedLead.status) }}</div>
            </div>

            <div class="p-4 rounded-xl bg-linear-to-r from-white to-slate-50 border">
              <div class="text-xs text-slate-500">Priority</div>
              <div class="mt-1 text-lg font-semibold">{{ priorityLabelFrom(selectedLead.priority) }}</div>
              <div class="mt-2 text-xs text-slate-400">
                <span v-if="selectedLead.priorityUpdatedBy">Updated by: {{ selectedLead.priorityUpdatedBy }}</span>
                <span v-else>Not set</span>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-linear-to-r from-white to-slate-50 border">
              <div class="text-xs text-slate-500">Last activity</div>
              <div class="mt-1 text-lg font-semibold">{{ lastEventSummary(selectedLead) }}</div>
              <div class="mt-2 text-xs text-slate-400">By: {{ lastEventBy(selectedLead) || '—' }}</div>
            </div>
          </div>

          <!-- MAIN GRID -->
          <div class="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- LEFT: Details (big) -->
            <div class="lg:col-span-2 space-y-4">

             <!-- Contact card (editable) -->
<div class="border rounded-xl p-4 bg-slate-50/60">
  <h3 class="text-xs font-semibold text-slate-500 mb-2">Contact</h3>

  <div v-if="!isEditingLead" class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <!-- Name -->
    <div>
      <div class="text-sm font-medium">{{ selectedLead.name || '—' }}</div>
      <div class="text-xs text-slate-500">Full Name</div>
    </div>
    
    <!-- Email -->
    <div>
      <div class="text-sm font-medium">{{ selectedLead.email || '—' }}</div>
      <div class="text-xs text-slate-500">Email</div>
    </div>
    
    <!-- Country Code -->
    <div>
      <div class="text-sm font-medium">{{ selectedLead.countryCode || '—' }}</div>
      <div class="text-xs text-slate-500">Country Code</div>
    </div>
    
    <!-- Phone Number -->
    <div>
      <div class="text-sm font-medium">{{ selectedLead.phone || '—' }}</div>
      <div class="text-xs text-slate-500">Phone Number</div>
    </div>
    
    <!-- Country -->
    <div>
      <div class="text-sm font-medium">{{ selectedLead.country || '—' }}</div>
      <div class="text-xs text-slate-500">Country</div>
    </div>
    
    <!-- User Selected Timezone -->
<div>
  <div class="text-sm font-medium">{{ selectedLead.timezone || 'Not selected' }}</div>
  <div class="text-xs text-slate-500">
    Selected Timezone
    <span v-if="selectedLead.timezone" class="text-green-600">✓</span>
  </div>
</div>

<!-- Browser Detected Timezone -->
<div v-if="selectedLead.metadata?.browserTimezone">
  <div class="text-sm font-medium">{{ selectedLead.metadata.browserTimezone }}</div>
  <div class="text-xs text-slate-500">
    Browser Timezone ✓
  </div>
</div>
    
    <!-- Origin City -->
    <div>
      <div class="text-sm font-medium">{{ selectedLead.originCity || '—' }}</div>
      <div class="text-xs text-slate-500">Origin City</div>
    </div>
    
    <!-- Preferred Contact Method -->
    <div v-if="selectedLead.preferredContactMethod">
      <div class="text-sm font-medium">{{ selectedLead.preferredContactMethod }}</div>
      <div class="text-xs text-slate-500">Preferred Contact</div>
    </div>

    <!-- Lead Source (readable) -->
    <div>
      <div class="text-sm font-medium">{{ humanizeSource(selectedLead.source) || 'Website Form' }}</div>
      <div class="text-xs text-slate-500">Lead source</div>
    </div>

    <!-- Lead Source Detail (readable) -->
    <div v-if="selectedLead.leadSourceDetail">
      <div class="text-sm font-medium" :title="selectedLead.leadSourceDetail">
        {{ displaySourceDetail(selectedLead.leadSourceDetail) }}
      </div>
      <div class="text-xs text-slate-500 flex items-center gap-2">
        <span>Source detail</span>
        
      </div>
    </div>

    
    <!-- Scheduled Call -->
    <div v-if="selectedLead.scheduleCall" class="md:col-span-2">
      <div class="text-sm font-medium text-emerald-600">✓ Call Scheduled</div>
      <div class="text-xs text-slate-500">Client requested a call</div>
    </div>
  </div>

  <!-- Editing mode -->
  <div v-else>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="md:col-span-2">
        <label class="block text-xs text-slate-500 mb-1">Full Name</label>
        <input v-model="editForm.name" class="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label class="block text-xs text-slate-500 mb-1">Email</label>
        <input v-model="editForm.email" type="email" class="w-full border rounded px-2 py-1" />
      </div>
      <div class="flex gap-2">
        <div class="w-28">
          <label class="block text-xs text-slate-500 mb-1">Code</label>
          <input v-model="editForm.countryCode" placeholder="+255" class="w-full border rounded px-2 py-1" />
        </div>
        <div class="flex-1">
          <label class="block text-xs text-slate-500 mb-1">Phone</label>
          <input 
            v-model="editForm.phone" 
            type="tel" 
            class="w-full border rounded px-2 py-1"
            @input="validatePhoneNumber"
          />
        </div>
      </div>
      <div>
        <label class="block text-xs text-slate-500 mb-1">Country</label>
        <input v-model="editForm.country" class="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label class="block text-xs text-slate-500 mb-1">Origin City</label>
        <input v-model="editForm.originCity" class="w-full border rounded px-2 py-1" />
      </div>
      
      <!-- New fields for editing -->
      <div>
        <label class="block text-xs text-slate-500 mb-1">Timezone</label>
        <input v-model="editForm.timezone" class="w-full border rounded px-2 py-1" placeholder="e.g., Asia/Kolkata" />
      </div>

      <!-- Source (editable as dropdown token) -->
      <div class="md:col-span-2">
        <label class="block text-xs text-slate-500 mb-1">Lead source</label>
        <!-- keep name="source" so any focus helper can find it -->
        <select
          name="source"
          v-model="editForm.source"
          class="w-full border rounded px-2 py-1"
          ref="sourceSelect"
        >
          <option value="">Select source</option>

          <optgroup label="📩 Website">
            <option value="website_form">Website Form</option>
            <option value="custom_itinerary">Custom Itinerary Request</option>
            <option value="book_call">Book a Call</option>
            <option value="request_quote">Request a Quote</option>
          </optgroup>

          <optgroup label="💬 Direct">
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone Call</option>
            <option value="email">Email</option>
          </optgroup>

          <optgroup label="📣 Marketing">
            <option value="google_ads">Google Ads</option>
            <option value="facebook_ad">Facebook ad</option>
            <option value="instagram_ad">Instagram ad</option>
            <option value="social_media">Social media platform</option>
            <option value="organic_search">Organic Search</option>
          </optgroup>

          <optgroup label="🤝 Referrals">
            <option value="referral_past_client">Referral – Past Client</option>
            <option value="partner_agent">Partner / Agent</option>
          </optgroup>

          <optgroup label="⚙️ Internal">
            <option value="manual">Manual Entry</option>
            <option value="import">Import</option>
          </optgroup>
        </select>

        <div class="text-xs text-slate-400 mt-1">Choose a source token (backend-friendly). You can store a human label in leadSourceDetail when needed.</div>
      </div>

      <!-- Source detail (editable, free text) -->
      <div class="md:col-span-2">
        <label class="block text-xs text-slate-500 mb-1">Source detail (optional)</label>
        <input v-model="editForm.leadSourceDetail" placeholder="More context (e.g., campaign name or form id)" class="w-full border rounded px-2 py-1" />
        <div class="text-xs text-slate-400 mt-1">This shows in the lead view as the friendly string.</div>
      </div>

      
      <div>
        <label class="block text-xs text-slate-500 mb-1">Preferred Contact</label>
        <select v-model="editForm.preferredContactMethod" class="w-full border rounded px-2 py-1">
          <option value="">Select method</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>
      </div>
      
      <div class="flex items-center gap-2 md:col-span-2">
        <input type="checkbox" v-model="editForm.scheduleCall" id="scheduleCall" class="w-4 h-4" />
        <label for="scheduleCall" class="text-xs text-slate-500">Schedule a call with travel expert</label>
      </div>
    </div>
  </div>

  <!-- UTM tracking -->
  <div v-if="selectedLead.utm" class="mt-3 text-xs text-slate-400">
    UTM: {{ selectedLead.utm.source || '—' }} / {{ selectedLead.utm.medium || '—' }} / {{ selectedLead.utm.campaign || '—' }}
  </div>
</div>


             <!-- Trip info -->
<div class="border rounded-xl p-4 bg-slate-50/60">
  <h3 class="text-xs font-semibold text-slate-500 mb-2">Trip Details</h3>
  
  <!-- First row: Basic trip info -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
    <div>
      <div class="text-sm font-medium">{{ selectedLead.prettyDate || '—' }}</div>
      <div class="text-xs text-slate-500">Travel date</div>
    </div>
    <div>
      <div class="text-sm font-medium">{{ selectedLead.days || '—' }}</div>
      <div class="text-xs text-slate-500">Days</div>
    </div>
    <div>
      <div class="text-sm font-medium">{{ selectedLead.travellers || 0 }}</div>
      <div class="text-xs text-slate-500">Total Travellers</div>
    </div>
    <div>
      <div class="text-sm font-medium">{{ selectedLead.who || '—' }}</div>
      <div class="text-xs text-slate-500">Group Type</div>
    </div>
  </div>
  
  <!-- Second row: Detailed breakdown -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
    <!-- Adults & Children -->
    <div v-if="selectedLead.adults !== undefined">
      <div class="text-sm font-medium">{{ selectedLead.adults || 0 }} Adults, {{ selectedLead.children || 0 }} Children</div>
      <div class="text-xs text-slate-500">Travel group breakdown</div>
    </div>
    
    <!-- Destination Countries -->
    <div v-if="selectedLead.countries && selectedLead.countries.length">
      <div class="text-sm font-medium">{{ selectedLead.countries.join(', ') }}</div>
      <div class="text-xs text-slate-500">Destination Countries</div>
    </div>
    
    <!-- Activities (THIS IS WHERE IT GOES) -->
    <div v-if="selectedLead.activities && selectedLead.activities.length" class="sm:col-span-2 lg:col-span-2">
      <div class="text-sm font-medium">
        {{ selectedLead.activities.map(a => formatActivityName(a)).join(', ') }}
      </div>
      <div class="text-xs text-slate-500">Selected Activities</div>
    </div>
  </div>
  
  <!-- Rest of the Trip section remains the same... -->
  <!-- Third row: Additional trip details -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
    <!-- Budget -->
    <div v-if="selectedLead.budget">
      <div class="text-sm font-medium">${{ selectedLead.budget.toLocaleString() }}</div>
      <div class="text-xs text-slate-500">Budget per person</div>
    </div>
    
    <!-- Kilimanjaro Route -->
    <div v-if="selectedLead.kilimanjaroRoute">
      <div class="text-sm font-medium">{{ selectedLead.kilimanjaroRoute.replace(/_/g, ' ').toUpperCase() }}</div>
      <div class="text-xs text-slate-500">Kilimanjaro Route</div>
    </div>
    
    <!-- Timezone -->
<div v-if="selectedLead.timezone">
  <div class="text-sm font-medium">{{ selectedLead.timezone }}</div>
  <div class="text-xs text-slate-500">Selected Timezone</div>
</div>
    
    <!-- Date Flexibility -->
    <div>
      <div class="text-sm font-medium">{{ selectedLead.dateIsMonthOnly ? 'Month Only' : 'Specific Date' }}</div>
      <div class="text-xs text-slate-500">Date Flexibility</div>
    </div>
  </div>
  
  <!-- Age Breakdown Section -->
  <div v-if="(selectedLead.adultAges && selectedLead.adultAges.length) || (selectedLead.childAges && selectedLead.childAges.length)" 
       class="mt-4 pt-4 border-t">
    <h4 class="text-xs font-semibold text-slate-500 mb-2">Age Breakdown</h4>
    <div class="space-y-2">
      <!-- Adult Ages -->
      <div v-if="selectedLead.adultAges && selectedLead.adultAges.length" class="flex flex-wrap gap-2">
        <span class="text-xs font-medium text-slate-700">Adults:</span>
        <div class="flex flex-wrap gap-1">
          <span v-for="(age, index) in selectedLead.adultAges" :key="'adult-' + index" 
                class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
            {{ age }} yrs
          </span>
        </div>
      </div>
      
      <!-- Child Ages -->
      <div v-if="selectedLead.childAges && selectedLead.childAges.length" class="flex flex-wrap gap-2">
        <span class="text-xs font-medium text-slate-700">Children:</span>
        <div class="flex flex-wrap gap-1">
          <span v-for="(age, index) in selectedLead.childAges" :key="'child-' + index" 
                class="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
            {{ age }} yrs
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- Message section -->
  <div v-if="selectedLead.message" class="mt-4 pt-4 border-t">
    <div class="flex items-center justify-between mb-1">
      <h4 class="text-xs font-semibold text-slate-500">Message / Notes</h4>
    </div>
    <div class="text-sm text-slate-700 bg-white p-3 rounded-lg border">
      {{ selectedLead.message }}
    </div>
  </div>

  <!-- Preferred call time -->
  <div v-if="selectedLead.preferredTime" class="mt-4 pt-4 border-t">
    <div class="flex items-center justify-between mb-1">
      <h4 class="text-xs font-semibold text-slate-500">Preferred Call Time</h4>
      <div class="text-xs text-slate-400">
        {{ formatDateTime(selectedLead.preferredTime) }}
      </div>
    </div>
    <div class="text-sm text-slate-700">
      Client requested a call {{ selectedLead.scheduleCall ? '✓' : '' }}
    </div>
  </div>

  <!-- Next follow-up -->
  <div class="mt-4 pt-4 border-t">
    <div class="flex items-center justify-between mb-1">
      <h4 class="text-xs font-semibold text-slate-500">Next follow-up</h4>
      <div v-if="selectedLead.nextFollowUpAt" class="text-xs text-slate-400">
        {{ formatDateTime(selectedLead.nextFollowUpAt) }}
      </div>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex-1">
        <input
          type="datetime-local"
          v-model="followUpInput"
          class="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          :min="getCurrentDateTime()"
        />
      </div>
      <button
        class="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm hover:bg-sky-700 transition-colors"
        @click="setNextFollowUp"
        :disabled="!followUpInput"
      >
        Set follow-up
      </button>
      <button
        v-if="selectedLead.nextFollowUpAt"
        class="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm hover:bg-slate-50 transition-colors"
        @click="clearFollowUp"
      >
        Clear
      </button>
    </div>
    <div v-if="showFollowUpError" class="mt-1 text-xs text-rose-600">
      Please select a future date and time
    </div>
  </div>
</div>

              <!-- quick actions -->
              <div class="flex flex-wrap gap-2">
                <button class="px-4 py-2 rounded-lg border bg-white text-sm" @click="openAddNoteModal">Add note</button>
                <button class="px-4 py-2 rounded-lg border bg-white text-sm" @click="openLogCallModal">Log call</button>
                <button class="px-4 py-2 rounded-lg border bg-white text-sm" @click="openCreateTaskModal">Create task</button>
                <!-- VIEW EMAIL HISTORY BUTTON (Replaced "Copy public link") -->
                <button class="px-4 py-2 rounded-lg border bg-white text-sm flex items-center gap-2" @click="viewEmailHistory">
                  <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View email history
                </button>
              </div>

              <!-- Follow-ups section -->
<div class="border rounded-xl p-4 bg-slate-50/60">
  <div class="flex items-center justify-between mb-2">
    <h3 class="text-xs font-semibold text-slate-500">Follow-ups</h3>
    <span class="text-xs text-slate-400">{{ followUpsForSelectedLead.length }} follow-ups</span>
  </div>
  
  <div v-if="followUpsForSelectedLead.length" class="space-y-4">
    <div 
      v-for="followup in followUpsForSelectedLead" 
      :key="followup.id" 
      class="bg-white p-4 rounded-lg border space-y-3"
    >
      <!-- DATE PROMINENTLY DISPLAYED -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="text-lg font-semibold text-slate-900">
            {{ formatDateTime(followup.metadata?.followUpDate || followup.scheduledDate) }}
          </div>
          <span class="text-xs px-2 py-1 rounded-full" 
            :class="{
              'bg-emerald-100 text-emerald-700': followup.status === 'completed',
              'bg-rose-100 text-rose-700': followup.status === 'missed',
              'bg-amber-100 text-amber-700': followup.status === 'scheduled',
              'bg-slate-100 text-slate-700': followup.status === 'cancelled'
            }">
            {{ followup.status === 'completed' ? '✓ Completed' : 
               followup.status === 'missed' ? '✗ Missed' : 
               followup.status === 'scheduled' ? '⏰ Scheduled' : 
               followup.status === 'cancelled' ? '✗ Cancelled' : 
               '⏰ Scheduled' }}
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <!-- Status dropdown -->
          <select 
            v-model="followup.status" 
            @change="updateFollowUpStatus(followup)"
            class="text-xs border rounded px-2 py-1"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <button 
            class="text-xs text-sky-600 hover:text-sky-800"
            @click="openEditFollowUpModal(followup)"
          >
            Edit
          </button> 
          <button 
            class="text-xs text-rose-600 hover:text-rose-800"
            @click="deleteFollowUp(followup)"
          >
            Delete
          </button>
        </div>
      </div>
      
      <!-- NOTE SECTION (only shown if there's a note) -->
      <div v-if="followup.note || followup.content" class="pt-2 border-t">
        <div class="text-sm text-slate-700">{{ followup.note || followup.content }}</div>
      </div>
      
      <!-- META INFO -->
      <div class="text-xs text-slate-400 pt-2 border-t">
        {{ followup.by?.name || currentUser.name }} • {{ formatDateShort(followup.createdAt) }}
      </div>
    </div>
  </div>
  
  <p v-else class="text-xs text-slate-400">No follow-ups logged yet for this lead.</p>
</div>

              <!-- Tasks -->
              <div class="border rounded-xl p-4 bg-slate-50/60">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <h3 class="text-xs font-semibold text-slate-500">Tasks</h3>
                    <button 
                      @click.stop="refreshSelectedLead"
                      class="text-xs text-slate-400 hover:text-slate-600"
                      title="Refresh tasks"
                    >
                      ↻
                    </button>
                  </div>
                  <span class="text-xs text-slate-400">{{ tasksForSelectedLead.length }} tasks</span>
                </div>
                <div v-if="tasksForSelectedLead.length" class="space-y-2">
                  <div v-for="t in tasksForSelectedLead" :key="t.id" class="flex items-start justify-between gap-3 bg-white p-3 rounded-lg border">
                    <div class="flex-1">
                      <div class="font-medium text-slate-900">{{ t.title }}</div>
                      <div v-if="t.note" class="text-xs text-slate-400 mt-1">{{ t.note }}</div>
                      <div class="flex items-center gap-3 mt-2">
                        <span class="text-xs text-slate-500">{{ formatDateTime(t.due) }}</span>
                        <span class="text-xs text-slate-400">•</span>
                        <span class="text-xs text-slate-400">
                          Created by: {{ t.createdBy || currentUser.name }} • {{ formatDateShort(t.createdAt) }}
                        </span>
                        <span v-if="t.updatedBy" class="text-xs text-slate-400">
                          • Updated by: {{ t.updatedBy }} • {{ formatDateShort(t.updatedAt) }}
                        </span>
                      </div>
                    </div>
                    <div class="text-right flex items-start gap-2">
                      <select 
  :value="t.status" 
  @change="handleTaskStatusChange(t, $event.target.value)"
  class="text-xs border rounded px-2 py-1"
>
  <option v-for="status in taskStatusOptions" :key="status.value" :value="status.value">
    {{ status.label }}
  </option>
</select>
                      <div class="flex flex-col gap-1">
                        <button 
                          class="text-xs text-sky-600 hover:text-sky-800"
                          @click="openEditTaskModal(t)"
                        >
                          Edit
                        </button>
                        <button 
                          class="text-xs text-rose-600 hover:text-rose-800"
                          @click="deleteTask(t)"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else class="text-xs text-slate-400">No tasks yet for this lead.</p>
              </div>

              <!-- Notes -->
              <div class="border rounded-xl p-4 bg-slate-50/60">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xs font-semibold text-slate-500">Notes</h3>
                  <span class="text-xs text-slate-400">{{ notesForSelectedLead.length }} notes</span>
                </div>
                <div v-if="notesForSelectedLead.length" class="space-y-2">
                  <div v-for="note in notesForSelectedLead" :key="note.id" class="flex items-start justify-between gap-3 bg-white p-3 rounded-lg border">
                    <div class="flex-1">
                      <div class="font-medium text-slate-900">{{ note.title || 'Note' }}</div>
                      <div class="text-sm text-slate-700 mt-1">{{ note.content }}</div>
                      <div class="flex items-center gap-3 mt-2">
                        <span class="text-xs text-slate-400">
                          Created by: {{ note.by?.name || currentUser.name }} • {{ formatDateShort(note.createdAt) }}
                        </span>
                        <span v-if="note.updatedBy" class="text-xs text-slate-400">
                          • Updated by: {{ note.updatedBy }} • {{ formatDateShort(note.updatedAt) }}
                        </span>
                      </div>
                    </div>
                    <div class="text-right flex items-start gap-2">
                      <select 
                        v-model="note.status" 
                        @change="updateNoteStatus(note)"
                        class="text-xs border rounded px-2 py-1"
                      >
                        <option value="active">Active</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <div class="flex flex-col gap-1">
                        <button 
                          class="text-xs text-sky-600 hover:text-sky-800"
                          @click="openEditNoteModal(note)"
                        >
                          Edit
                        </button>
                        <button 
                          class="text-xs text-rose-600 hover:text-rose-800"
                          @click="deleteNote(note)"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else class="text-xs text-slate-400">No notes yet for this lead.</p>
              </div>

              <!-- Calls -->
              <div class="border rounded-xl p-4 bg-slate-50/60">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xs font-semibold text-slate-500">Calls</h3>
                  <span class="text-xs text-slate-400">{{ callsForSelectedLead.length }} calls</span>
                </div>
                <div v-if="callsForSelectedLead.length" class="space-y-2">
                  <div v-for="call in callsForSelectedLead" :key="call.id" class="flex items-start justify-between gap-3 bg-white p-3 rounded-lg border">
                    <div class="flex-1">
                      <div class="font-medium text-slate-900">{{ call.title || 'Call' }}</div>
                      <div class="text-sm text-slate-700 mt-1">{{ call.summary }}</div>
                      <div class="flex flex-wrap items-center gap-3 mt-2">
                        <span class="text-xs text-slate-500">Duration: {{ call.duration }}m</span>
                        <span class="text-xs text-slate-500">Outcome: {{ call.outcome }}</span>
                        <span class="text-xs text-slate-400">
                          • Logged by: {{ call.by?.name || currentUser.name }} • {{ formatDateShort(call.createdAt) }}
                        </span>
                        <span v-if="call.updatedBy" class="text-xs text-slate-400">
                          • Updated by: {{ call.updatedBy }} • {{ formatDateShort(call.updatedAt) }}
                        </span>
                      </div>
                    </div>
                    <div class="text-right flex items-start gap-2">
                      <select 
                        v-model="call.status" 
                        @change="updateCallStatus(call)"
                        class="text-xs border rounded px-2 py-1"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="missed">Missed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <div class="flex flex-col gap-1">
                        <button 
                          class="text-xs text-sky-600 hover:text-sky-800"
                          @click="openEditCallModal(call)"
                        >
                          Edit
                        </button>
                        <button 
                          class="text-xs text-rose-600 hover:text-rose-800"
                          @click="deleteCall(call)"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else class="text-xs text-slate-400">No calls logged yet for this lead.</p>
              </div>

              <!-- Documents (only if present) -->
              <div v-if="selectedLead.documents?.length" class="border rounded-xl p-4 bg-slate-50/60">
                <h3 class="text-xs font-semibold text-slate-500 mb-2">Documents</h3>
                <div class="space-y-2">
                  <div v-for="doc in selectedLead.documents" :key="doc.url" class="flex items-center gap-3">
                    <a :href="doc.url" target="_blank" class="text-emerald-600 font-medium text-sm">{{ doc.name || 'document' }}</a>
                    <div class="text-xs text-slate-500">{{ formatDateTime(doc.uploadedAt) }}</div>
                    <div class="text-xs text-slate-400">Uploaded by: {{ doc.uploadedBy || '—' }}</div>
                  </div>
                </div>
              </div>
              <!-- if no documents we don't show an empty attachments box -->

            </div>

            <!-- RIGHT: Timeline + quick logs -->
            <div class="space-y-4">
              <ActivityTimeline
                :events="timelineSorted"
                :logs="logsForSelectedLead"
                :current-user="currentUser"
                :preview-count="5"
              />
            </div>

          </div>
        </div>
      </div>
    </transition>

    <!-- MODALS: Add Note -->
    <transition name="fade">
      <div v-if="showAddNote" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-2xl bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Add note</h3>
          <textarea v-model="noteText" rows="6" class="w-full border rounded p-3" placeholder="Enter note content..."></textarea>
          <div class="mt-4 flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeAddNote">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="addNote" :disabled="!noteText.trim()">Save note</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODALS: Edit Note -->
    <transition name="fade">
      <div v-if="showEditNote" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-2xl bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Edit note</h3>
          <textarea v-model="editNoteText" rows="6" class="w-full border rounded p-3"></textarea>
          <div class="mt-4 flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeEditNote">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="saveEditedNote" :disabled="!editNoteText.trim()">Update note</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODALS: Log Call -->
    <transition name="fade">
      <div v-if="showLogCall" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-xl bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Log call</h3>
          <label class="block text-xs text-slate-500 mb-1">Call summary</label>
          <textarea v-model="callNote" rows="4" class="w-full border rounded p-3" placeholder="Enter call summary..."></textarea>

          <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-slate-500 mb-1">Duration (mins)</label>
              <input type="number" v-model.number="callDuration" class="w-full border rounded px-2 py-1" min="0" />
            </div>
            <div>
              <label class="block text-xs text-slate-500 mb-1">Outcome</label>
              <select v-model="callOutcome" class="w-full border rounded px-2 py-1">
                <option value="">Select outcome</option>
                <option value="interested">Interested</option>
                <option value="not-interested">Not interested</option>
                <option value="follow-up">Needs follow-up</option>
                <option value="left-voicemail">Left voicemail</option>
                <option value="no-answer">No answer</option>
                <option value="callback-requested">Callback requested</option>
                <option value="information-sent">Information sent</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeLogCall">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="saveLogCall">Save call</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODALS: Edit Call -->
    <transition name="fade">
      <div v-if="showEditCall" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-xl bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Edit call</h3>
          <label class="block text-xs text-slate-500 mb-1">Call summary</label>
          <textarea v-model="editCallNote" rows="4" class="w-full border rounded p-3"></textarea>

          <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-slate-500 mb-1">Duration (mins)</label>
              <input type="number" v-model.number="editCallDuration" class="w-full border rounded px-2 py-1" min="0" />
            </div>
            <div>
              <label class="block text-xs text-slate-500 mb-1">Outcome</label>
              <select v-model="editCallOutcome" class="w-full border rounded px-2 py-1">
                <option value="">Select outcome</option>
                <option value="interested">Interested</option>
                <option value="not-interested">Not interested</option>
                <option value="follow-up">Needs follow-up</option>
                <option value="left-voicemail">Left voicemail</option>
                <option value="no-answer">No answer</option>
                <option value="callback-requested">Callback requested</option>
                <option value="information-sent">Information sent</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeEditCall">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="saveEditedCall">Update call</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODALS: Edit Follow-up -->
<transition name="fade">
  <div v-if="showEditFollowUp" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl p-6">
      <h3 class="text-lg font-semibold mb-3">Edit follow-up</h3>

      <label class="block text-xs text-slate-500 mb-1">Date & time</label>
      <input
        type="datetime-local"
        v-model="editFollowUpDate"
        :min="getCurrentDateTime()"
        class="w-full border rounded px-2 py-2 mb-4"
      />

      <label class="block text-xs text-slate-500 mb-1">Note (optional)</label>
      <textarea 
        v-model="editFollowUpNote" 
        rows="3"
        class="w-full border rounded px-2 py-2 mb-4"
        placeholder="Add a note about this follow-up..."
      ></textarea>

      <div class="mt-4 flex justify-end gap-2">
        <button class="px-4 py-2 rounded border" @click="closeEditFollowUp">Cancel</button>
        <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="saveEditedFollowUp">Save</button>
      </div>
    </div>
  </div>
</transition>


    <!-- MODALS: Create Task -->
    <transition name="fade">
      <div v-if="showCreateTask" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-2xl bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Create task</h3>

          <label class="block text-xs text-slate-500 mb-1">Title *</label>
          <input v-model="taskTitle" class="w-full border rounded px-2 py-2 mb-3" placeholder="Enter task title..." />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-slate-500 mb-1">Due date</label>
              <input type="datetime-local" v-model="taskDue" :min="getCurrentDateTime()" class="w-full border rounded px-2 py-2" />
            </div>
            <div>
              <label class="block text-xs text-slate-500 mb-1">Status</label>
              <select v-model="taskStatus" class="w-full border rounded px-2 py-2">
                <option v-for="status in taskStatusOptions" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>
          </div>

          <label class="block text-xs text-slate-500 mb-1">Notes (optional)</label>
          <textarea v-model="taskNote" rows="3" class="w-full border rounded p-2" placeholder="Enter task notes..."></textarea>

          <div class="mt-4 flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeCreateTask">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="createTask" :disabled="!taskTitle.trim()">Create</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODALS: Edit Task -->
    <transition name="fade">
      <div v-if="showEditTask" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-2xl bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Edit task</h3>

          <label class="block text-xs text-slate-500 mb-1">Title *</label>
          <input v-model="editTaskTitle" class="w-full border rounded px-2 py-2 mb-3" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-slate-500 mb-1">Due date</label>
              <input type="datetime-local" v-model="editTaskDue" class="w-full border rounded px-2 py-2" />
            </div>
            <div>
              <label class="block text-xs text-slate-500 mb-1">Status</label>
              <select v-model="editTaskStatus" class="w-full border rounded px-2 py-2">
                <option v-for="status in taskStatusOptions" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>
          </div>

          <label class="block text-xs text-slate-500 mb-1">Notes (optional)</label>
          <textarea v-model="editTaskNote" rows="3" class="w-full border rounded p-2"></textarea>

          <div class="mt-4 flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeEditTask">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="saveEditedTask" :disabled="!editTaskTitle.trim()">Update</button>
          </div>
        </div>
      </div>
</transition>

    <!-- MODAL: Bulk assign (ADMIN ONLY) -->
    <transition name="fade">
      <div v-if="showBulkAssign && canAssignLeads" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-md bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Assign selected leads</h3>

          <label class="block text-xs text-slate-500 mb-1">Assign to</label>
          <select v-model="bulkAssignTo" class="w-full border rounded px-2 py-2 mb-4">
            <option :value="null">Unassigned</option>
            <option v-for="u in leadManagers" :key="u.id" :value="u.id">{{ u.name }} ({{ u.roleFormatted }})</option>
          </select>

          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeBulkAssignModal">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" :disabled="!bulkAssignTo" @click="performBulkAssign">Assign</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODAL: Change status -->
    <transition name="fade">
      <div v-if="showStatusModal" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-md bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Change status</h3>

          <label class="block text-xs text-slate-500 mb-1">New status</label>
          <select v-model="statusChange" class="w-full border rounded px-2 py-2 mb-3" @change="handleStatusChange">
            <option v-for="s in statusOptions" :key="s.key" :value="s.key">{{ s.label }}</option>
          </select>

          <!-- Show date field for closed-won and closed-lost -->
          <div v-if="statusChange === 'closed-won' || statusChange === 'closed-lost'" class="mb-3">
            <label class="block text-xs text-slate-500 mb-1">
              {{ statusChange === 'closed-won' ? 'Date Won' : 'Date Lost' }}
            </label>
            <input 
              type="date" 
              v-model="closedDate" 
              class="w-full border rounded px-2 py-2"
              :max="getCurrentDate()"
            />
          </div>

          <!-- Show closed-lost reasons dropdown only when status is 'closed-lost' -->
          <div v-if="statusChange === 'closed-lost'" class="mb-3">
            <label class="block text-xs text-slate-500 mb-1">Reason for losing</label>
            <select v-model="closedLostReason" class="w-full border rounded px-2 py-2">
              <option value="">Select a reason</option>
              <option v-for="reason in closedLostReasons" :key="reason.key" :value="reason.key">
                {{ reason.label }}
              </option>
            </select>
            
            <!-- Show custom reason input when "Other" is selected -->
            <div v-if="closedLostReason === 'other'" class="mt-3">
              <label class="block text-xs text-slate-500 mb-1">Specify other reason</label>
              <input 
                v-model="customClosedLostReason" 
                class="w-full border rounded px-2 py-2"
                placeholder="Enter reason..."
              />
            </div>
          </div>

          <!-- General reason field (for other statuses) -->
          <div v-if="statusChange !== 'closed-lost' && statusChange !== 'closed-won'">
            <label class="block text-xs text-slate-500 mb-1">Reason (optional)</label>
            <textarea v-model="statusReason" rows="3" class="w-full border rounded p-2 mb-3"></textarea>
          </div>

          <!-- Show additional notes field for closed-won -->
          <div v-if="statusChange === 'closed-won'" class="mb-3">
            <label class="block text-xs text-slate-500 mb-1">Notes (optional)</label>
            <textarea v-model="statusReason" rows="3" class="w-full border rounded p-2 mb-3" placeholder="Add any notes about winning this lead..."></textarea>
          </div>

          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeStatusModal">Cancel</button>
            <button 
              class="px-4 py-2 rounded bg-amber-600 text-white"
              :disabled="(statusChange === 'closed-lost' && !closedLostReason) || (statusChange === 'closed-won' && !closedDate) || (statusChange === 'closed-lost' && !closedDate)"
              @click="confirmChangeStatus"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODAL: Change Priority -->
    <transition name="fade">
      <div v-if="showPriorityModal" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-md bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Change Priority</h3>

          <label class="block text-xs text-slate-500 mb-1">Priority level</label>
          <select v-model="priorityChange" class="w-full border rounded px-2 py-2 mb-3">
            <option v-for="p in priorityOptions" :key="p.value" :value="p.value">{{ p.label }}</option>
          </select>

          <label class="block text-xs text-slate-500 mb-1">Reason (optional)</label>
          <textarea v-model="priorityReason" rows="3" class="w-full border rounded p-2 mb-3"></textarea>

          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closePriorityModal">Cancel</button>
            <button class="px-4 py-2 rounded bg-amber-600 text-white" @click="confirmChangePriority">Save</button>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- EMAIL HISTORY MODAL -->
    <EmailLogsModal
      :lead-id="selectedLeadIdForEmailHistory"
      :lead-name="selectedLeadNameForEmailHistory"
      :visible="showEmailHistoryModal"
      @close="showEmailHistoryModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import ActivityTimeline from '~/components/admins/ActivityTimeline.vue'
import EmailLogsModal from '~/components/EmailLogsModal.vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Leads (CRM)'
})

const router = useRouter()

// use the selectedLead ref (or remove this computed if you don't need it)
const followUps = computed(() => getFollowUpsFromEvents(selectedLead.value?.events || []));


// ---- Current User from Auth ----
const { data: authData } = await useAsyncData('auth-me', () => $fetch('/api/auth/me'))
const currentUser = computed(() => authData.value?.user || { id: '', name: 'Unknown', email: '', role: '' })
const userRole = computed(() => currentUser.value.role || '')
const userRoleFormatted = computed(() => {
  const roleMap = {
    'superadmin': 'Super Admin',
    'admin': 'Admin',
    'content-manager': 'Content Manager',
    'lead-manager': 'Lead Manager',
    'itinerary-planner': 'Itinerary Planner'
  }
  return roleMap[userRole.value] || userRole.value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
})

// Permission checks
const canAssignLeads = computed(() => {
  return userRole.value === 'superadmin' || userRole.value === 'admin'
})

// ---- Task Status Options ----
const taskStatusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

// ---- Status Options ----
const statusOptions = [
  { key: 'new', label: 'New' },
  { key: 'qualified', label: 'Qualified' },
  { key: 'unqualified', label: 'Unqualified' },
  { key: 'working', label: 'Working' },
  { key: 'closed-won', label: 'Closed / Won' },
  { key: 'closed-lost', label: 'Closed / Lost' }
]

// ---- Closed/Lost Reasons ----
const closedLostReasons = [
  { key: 'lost-to-competitor', label: 'Lost to competitor' },
  { key: 'low-budget', label: 'The budget was low' },
  { key: 'unhappy-itinerary', label: 'Unhappy with the Itinerary' },
  { key: 'just-checking-cost', label: 'Was just checking the cost' },
  { key: 'other', label: 'Other' }
]

// ---- Simple "today" text ----
const today = computed(() => {
  const d = new Date()
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

// ---- UI state ----
const leadSearch = ref('')
const leadStatusFilter = ref('all')
const leadPriorityFilter = ref('all')
const leadSort = ref('createdDesc')
const selectAll = ref(false)
const selectedIds = ref([])
const isLoading = ref(false)
const isDetailOpen = ref(false)
const selectedLead = ref(null)
const assignSelect = ref(null)
const followUpInput = ref('')
const showFollowUpError = ref(false)

// --- Status modal state ---
const statusChange = ref('new')
const statusReason = ref('')
const closedLostReason = ref('')
const customClosedLostReason = ref('')
const closedDate = ref('')
const showStatusModal = ref(false)

// --- Edit follow-up state ---
const showEditFollowUp = ref(false)
const editingFollowUp = ref(null)
const editFollowUpDate = ref('')
const editFollowUpNote = ref('')

// Email History Modal state
const showEmailHistoryModal = ref(false)
const selectedLeadIdForEmailHistory = ref('')
const selectedLeadNameForEmailHistory = ref('')

// Data
const leads = ref([])
const admins = ref([])

// Filter admins to only show lead managers in assign dropdown
const leadManagers = computed(() => {
  return admins.value.filter(admin => {
    // Only show users with lead management roles
    return ['lead-manager', 'admin', 'superadmin'].includes(admin.role)
  }).map(admin => ({
    ...admin,
    roleFormatted: admin.role === 'lead-manager' ? 'Lead Manager' : 
                  admin.role === 'admin' ? 'Admin' : 
                  admin.role === 'superadmin' ? 'Super Admin' : admin.role
  }))
})

// Priority options
const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-slate-700', bg: 'bg-slate-100' },
  { value: 'medium', label: 'Medium', color: 'text-amber-700', bg: 'bg-amber-50' },
  { value: 'high', label: 'High', color: 'text-rose-700', bg: 'bg-rose-50' },
  { value: 'very-high', label: 'Very High', color: 'text-rose-800', bg: 'bg-rose-100' }
]

// Edit/contact form state
const isEditingLead = ref(false)
const editForm = ref({
  name: '',
  email: '',
  phone: '',
  countryCode: '',
  country: '',
  originCity: '',
  age: null,
  source: '',
  leadSourceDetail: '',
  // New fields from journey.vue
  preferredContactMethod: '',
  timezone: '',
  scheduleCall: false
})
const isSavingContact = ref(false)

// simple UI controls & modals
const showAddNote = ref(false)
const noteText = ref('')
const showEditNote = ref(false)
const editNoteText = ref('')
const editingNote = ref(null)

const showLogCall = ref(false)
const callNote = ref('')
const callDuration = ref(0)
const callOutcome = ref('')
const showEditCall = ref(false)
const editCallNote = ref('')
const editCallDuration = ref(0)
const editCallOutcome = ref('')
const editingCall = ref(null)

const showCreateTask = ref(false)
const taskTitle = ref('')
const taskDue = ref('')
const taskNote = ref('')
const taskStatus = ref('open')
const showEditTask = ref(false)
const editTaskTitle = ref('')
const editTaskDue = ref('')
const editTaskNote = ref('')
const editTaskStatus = ref('open')
const editingTask = ref(null)

const showBulkAssign = ref(false)
const bulkAssignTo = ref(null)
const showPriorityModal = ref(false)
const priorityChange = ref('medium')
const priorityReason = ref('')
const isLoadingPatch = ref(false)
const isLoadingBulk = ref(false)

// Helper functions
function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function handleStatusChange() {
  // Only reset closed-lost related fields if switching FROM closed-lost
  if (statusChange.value !== 'closed-lost') {
    closedLostReason.value = ''
    customClosedLostReason.value = ''
  }
  
  // Reset closed date when not closed-won or closed-lost
  if (statusChange.value !== 'closed-won' && statusChange.value !== 'closed-lost') {
    closedDate.value = ''
  }
  
  // Reset general reason field for non-closed-lost statuses
  if (statusChange.value === 'closed-lost' || statusChange.value === 'closed-won') {
    statusReason.value = ''
  } else {
    // Keep the status reason for non-closed statuses
    if (!statusReason.value && selectedLead.value?.reason) {
      statusReason.value = selectedLead.value.reason
    }
  }
}

function openEditFollowUpModal(followup) {
  editingFollowUp.value = followup
  editFollowUpDate.value = followup.metadata?.followUpDate ? dateTimeLocalValue(followup.metadata.followUpDate) : getCurrentDateTime()
  editFollowUpNote.value = followup.note || followup.content || ''
  showEditFollowUp.value = true
}

function closeEditFollowUp() {
  showEditFollowUp.value = false
  editingFollowUp.value = null
  editFollowUpDate.value = ''
  editFollowUpNote.value = ''
}

async function saveEditedFollowUp() {
  if (!selectedLead.value || !editingFollowUp.value) return

  if (!editFollowUpDate.value) {
    alert('Please select a date and time for the follow-up')
    return
  }

  // Convert new date to ISO
  const newIso = new Date(editFollowUpDate.value).toISOString()
  const formattedNewDate = formatDateTime(newIso)

  // Prepare local events array
  const events = selectedLead.value.events ? [...selectedLead.value.events] : []

  // Try to locate original followup_set event
  const followupId = editingFollowUp.value.at || editingFollowUp.value.createdAt || editingFollowUp.value.id
  const idx = events.findIndex(e => e.type === 'followup_set' && e.at === followupId)

  let oldDateIso = null
  let oldNote = null
  let oldFormattedDate = null
  
  if (idx !== -1) {
    // Store previous values for audit
    const originalDate = events[idx].metadata?.followUpDate
    oldDateIso = originalDate ? new Date(originalDate).toISOString() : null
    oldNote = events[idx].note
    oldFormattedDate = events[idx].metadata?.formattedDate || formatDateTime(originalDate)
    
    // Update the original followup_set event
    events[idx] = {
      ...events[idx],
      note: editFollowUpNote.value,
      metadata: {
        ...(events[idx].metadata || {}),
        followUpDate: newIso,
        formattedDate: formattedNewDate,
        short: `Follow-up: ${formattedNewDate}`
      },
      updatedBy: currentUser.value.name,
      updatedAt: new Date().toISOString()
    }
  }

  // Check if note changed
  const noteChanged = oldNote !== editFollowUpNote.value
  
  // Check if date changed - compare formatted dates to avoid timezone issues
  let dateChanged = false
  if (oldDateIso) {
    const oldDate = new Date(oldDateIso)
    const newDate = new Date(newIso)
    dateChanged = oldDate.getTime() !== newDate.getTime()
  } else {
    dateChanged = true
  }

  // If nothing changed, just close the modal
  if (!noteChanged && !dateChanged) {
    closeEditFollowUp()
    return
  }

  let auditNote = ''
  let auditShort = ''
  
  if (dateChanged && noteChanged) {
    auditNote = `Follow-up updated: ${formattedNewDate}`
    auditShort = `Follow-up updated: ${formattedNewDate}`
  } else if (dateChanged) {
    auditNote = `Follow-up date updated to ${formattedNewDate}`
    auditShort = `Follow-up date updated: ${formattedNewDate}`
  } else if (noteChanged) {
    auditNote = `Follow-up note updated`
    auditShort = `Follow-up note updated`
  }

  const auditEvent = {
    type: 'followup_updated',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: auditNote,
    status: 'active',
    metadata: {
      short: auditShort,
      followupId: idx !== -1 ? events[idx].at : null,
      changes: {
        note: noteChanged ? { from: oldNote, to: editFollowUpNote.value } : null,
        followUpDate: dateChanged ? { from: oldDateIso, to: newIso } : null
      }
    },
    updatedBy: currentUser.value.name,
    updatedAt: new Date().toISOString()
  }
  
  if (!auditEvent.metadata.changes.note) delete auditEvent.metadata.changes.note
  if (!auditEvent.metadata.changes.followUpDate) delete auditEvent.metadata.changes.followUpDate
  
  events.push(auditEvent)

  selectedLead.value.events = events
  
  if (dateChanged) {
    const currentNextIso = selectedLead.value.nextFollowUpAt ? new Date(selectedLead.value.nextFollowUpAt).toISOString() : null
    
    if (oldDateIso && currentNextIso && oldDateIso === currentNextIso) {
      selectedLead.value.nextFollowUpAt = newIso
    } else if (!selectedLead.value.nextFollowUpAt) {
      selectedLead.value.nextFollowUpAt = newIso
    }
  }

  closeEditFollowUp()

  try {
    const patchData = {
      events: events,
      updatedBy: currentUser.value.name
    }
    
    if (dateChanged && selectedLead.value.nextFollowUpAt) {
      patchData.nextFollowUpAt = selectedLead.value.nextFollowUpAt
    }
    
    await patchLead(selectedLead.value._id, patchData)
    await loadLeads()
  } catch (err) {
    console.error('Failed to save edited follow-up', err)
    alert('Failed to save follow-up. Reverting and reloading.')
    await loadLeads()
  }
}

// helper functions reused in UI

// Helper to format activity names (e.g., "wild_safari" → "Wild Safari")
function formatActivityName(activity) {
  if (!activity) return ''
  return activity
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatDateTimeShort (value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return value
  }
}

function lastPriorityChangeReason(lead) {
  if (!lead || !Array.isArray(lead.events) || !lead.events.length) return ''
  
  const priorityEvent = [...lead.events]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .find(e => e.type === 'priority_change')
  
  if (!priorityEvent) return ''
  
  return priorityEvent.reason || 
         priorityEvent.note || 
         priorityEvent.metadata?.reason || 
         ''
}

// humanize lead source for display
function humanizeSource(src) {
  if (!src && src !== 0) return '—';

  const MAP = {
    custom_itinerary: 'custom itinerary',
    facebook_ad: 'Facebook ad',
    google_search: 'Google search',
    email: 'Email',
    social_media: 'Social media platform',
    facebook: 'Social media platform',
    instagram: 'Social media platform'
  };

  if (MAP[src]) return MAP[src];

  const s = String(src)
    .replace(/[_-]+/g, ' ')
    .trim();

  return s.toLowerCase();
}

// --- New helper: pretty-print "leadSourceDetail" values ---
function displaySourceDetail(detail) {
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

// Helper: get follow-ups from events array
function getFollowUpsFromEvents(events = []) {
  return events
    .filter(e => e.type === 'followup_set' && e.status !== 'deleted')
    .map(e => {
      const iso = e.metadata?.followUpDate || e.metadata?.followupDate || null;
      const note = e.note || e.metadata?.short || '';
      return {
        id: e.at || e.metadata?.followupId || iso,
        dateIso: iso,
        rawNote: note,
        status: e.status || 'scheduled',
        by: e.by,
        eventAt: e.at,
        originalEvent: e
      };
    })
    .sort((a, b) => {
      if (!a.dateIso) return 1;
      if (!b.dateIso) return -1;
      return new Date(a.dateIso) - new Date(b.dateIso);
    });
}

function lastStatusChangeReason (lead) {
  if (!lead || !Array.isArray(lead.events) || !lead.events.length) return ''
  const ev = (lead.events || []).slice().reverse().find(e => e.type === 'status_change')
  if (!ev) return ''
  return (ev.reason && String(ev.reason).trim()) ||
         (ev.note && String(ev.note).trim()) ||
         (ev.metadata && String(ev.metadata.short || '').trim()) ||
         ''
}

function statusLabelFrom (s) {
  const found = statusOptions.find(x => x.key === s)
  return found ? found.label : 'New'
}

function priorityLabelFrom (p) {
  if (!p) return 'Not Set'
  const found = priorityOptions.find(x => x.value === p)
  return found ? found.label : p
}

function taskStatusLabelFrom (s) {
  const found = taskStatusOptions.find(x => x.value === s)
  return found ? found.label : 'Open'
}

function prettyDateFrom (d) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString()
  } catch {
    return d
  }
}

// Phone number validation
function validatePhoneNumber() {
  if (editForm.value.phone) {
    editForm.value.phone = editForm.value.phone.replace(/\D/g, '')
    if (editForm.value.phone.length > 10) {
      editForm.value.phone = editForm.value.phone.substring(0, 10)
    }
  }
}

// Get current date-time in format for datetime-local input
function getCurrentDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

// Normalize/augment lead for UI
function normalizeLead (l) {
  const copy = { ...l }
  copy._id = copy._id || copy.id
  copy.events = copy.events || []
  copy.attachments = copy.attachments || []
  copy.documents = copy.documents || copy.attachments || []
  copy.tasks = copy.tasks || []
  copy.status = copy.status || 'new'
  copy.statusLabel = statusLabelFrom(copy.status)
  copy.priority = copy.priority || 'medium'
  copy.priorityLabel = priorityLabelFrom(copy.priority)
  copy.prettyDate = prettyDateFrom(copy.date || copy.travelDate)
  copy.nextFollowUpAt = copy.nextFollowUpAt || null
  copy.closedDate = copy.closedDate || null
  copy.closedReason = copy.closedReason || null
  copy.closedLostDetails = copy.closedLostDetails || null

  // Resolve assignedTo:
  if (copy.assignedTo && typeof copy.assignedTo === 'object') {
    copy.assignedTo = copy.assignedTo
  } else if (copy.assignedToId) {
    copy.assignedTo = admins.value.find(a => String(a.id) === String(copy.assignedToId)) || null
  } else {
    copy.assignedTo = null
  }

  copy.canBeAssignedByCurrentUser = canAssignLeads.value
  
  if (copy.tasks) {
    copy.tasks = copy.tasks.map(task => ({
      ...task,
      status: task.status || 'open',
      createdBy: task.createdBy || currentUser.value.name,
      createdAt: task.createdAt || new Date().toISOString()
    }))
  }

  copy.age = copy.age ?? null
  copy.originCity = copy.originCity || ''
  copy.country = copy.country || ''
  copy.source = copy.source || ''
  copy.leadSourceDetail = copy.leadSourceDetail || ''
  copy.phone = copy.phone || ''
  copy.countryCode = copy.countryCode || ''
  return copy
}

// load admins with role
async function loadAdmins () {
  try {
    const data = await $fetch('/api/admins')
    admins.value = (data || []).map(u => ({
      id: String(u.id ?? u._id ?? ''),
      name: u.name,
      email: u.email,
      role: u.role || 'lead-manager'
    }))
  } catch (err) {
    console.error('Failed to load admins', err)
    admins.value = []
  }
}

// load leads from API
async function loadLeads () {
  console.log('Loading leads...')
  isLoading.value = true
  
  try {
    const data = await $fetch('/api/leads').catch(err => {
      console.error('Failed to fetch leads:', err)
      throw err
    })
    
    console.log('Leads loaded from server:', data)
    leads.value = (data || []).map(normalizeLead)
    
    if (selectedLead.value) {
      const refreshedLead = leads.value.find(l => (l._id || l.id) === (selectedLead.value._id || selectedLead.value.id))
      if (refreshedLead) {
        console.log('Refreshing selected lead:', refreshedLead)
        selectedLead.value = refreshedLead
        followUpInput.value = refreshedLead.nextFollowUpAt ? dateTimeLocalValue(refreshedLead.nextFollowUpAt) : ''
      }
    }
    
  } catch (err) {
    console.error('Failed to load leads:', err)
    leads.value = []
    
    if (err.message && !err.message.includes('401') && !err.message.includes('403')) {
      alert('Failed to load leads. Please check your connection.')
    }
  } finally {
    isLoading.value = false
    console.log('Leads loading complete')
  }
}

// computed filtered and sorted leads
const filteredLeads = computed(() => {
  return leads.value
    .filter(lead => {
      if (leadStatusFilter.value === 'all') return true
      return (lead.status || 'new') === leadStatusFilter.value
    })
    .filter(lead => {
      if (leadPriorityFilter.value === 'all') return true
      return (lead.priority || 'medium') === leadPriorityFilter.value
    })
    .filter(lead => {
      const q = leadSearch.value.trim().toLowerCase()
      if (!q) return true
      const name = (lead.name || '').toLowerCase()
      const email = (lead.email || '').toLowerCase()
      const phone = (lead.phone || '').toLowerCase()
      return name.includes(q) || email.includes(q) || phone.includes(q)
    })
})

const sortedFilteredLeads = computed(() => {
  const arr = filteredLeads.value.slice()
  if (leadSort.value === 'createdDesc') {
    arr.sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))
  } else if (leadSort.value === 'createdAsc') {
    arr.sort((a, b) => new Date(a.createdAt || a.date || 0) - new Date(b.createdAt || b.date || 0))
  } else if (leadSort.value === 'priorityDesc') {
    const priorityOrder = { 'very-high': 4, 'high': 3, 'medium': 2, 'low': 1 }
    arr.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0))
  }
  return arr
})

// Computed properties for tasks, notes, and calls
const tasksForSelectedLead = computed(() => {
  return selectedLead.value?.tasks || []
})

const notesForSelectedLead = computed(() => {
  if (!selectedLead.value) return []
  return (selectedLead.value.events || [])
    .filter(e => e.type === 'note' && e.status !== 'deleted' && e.status !== 'archived')
    .map((note, index) => ({
      id: `note-${index}-${note.at}`,
      title: 'Note',
      content: note.note,
      status: note.status || 'active',
      by: note.by || { name: currentUser.value.name },
      createdAt: note.at,
      updatedBy: note.updatedBy,
      updatedAt: note.updatedAt,
      ...note
    }))
})

const callsForSelectedLead = computed(() => {
  if (!selectedLead.value) return []
  return (selectedLead.value.events || [])
    .filter(e => e.type === 'call')
    .map((call, index) => {
      const duration = call.metadata?.duration || 0
      const outcome = call.metadata?.short || ''
      
      return {
        id: `call-${index}-${call.at}`,
        title: 'Call',
        summary: call.note,
        duration: duration,
        outcome: outcome,
        status: call.status || 'completed',
        by: call.by || { name: currentUser.value.name },
        createdAt: call.at,
        updatedBy: call.updatedBy,
        updatedAt: call.updatedAt,
        at: call.at,
        ...call
      }
    })
})

const followUpsForSelectedLead = computed(() => {
  if (!selectedLead.value) return []
  return (selectedLead.value.events || [])
    .filter(e => e.type === 'followup_set')
    .map((followup, index) => ({
      id: `followup-${index}-${followup.at}`,
      title: 'Follow-up',
      content: followup.note || `Follow-up scheduled`,
      status: followup.status || 'scheduled',
      by: followup.by || { name: currentUser.value.name },
      createdAt: followup.at,
      scheduledDate: followup.metadata?.followUpDate,
      metadata: followup.metadata,
      ...followup
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// select all toggle
watch(sortedFilteredLeads, () => {
  selectAll.value = false
  selectedIds.value = []
})

function toggleSelectAll () {
  if (selectAll.value) {
    selectedIds.value = sortedFilteredLeads.value.map(l => l._id)
  } else {
    selectedIds.value = []
  }
}

// open detail drawer
function openLeadDetails (lead) {
  const found = leads.value.find(x => (x._id || x.id) === (lead._id || lead.id))
  selectedLead.value = found || normalizeLead(lead)
  isDetailOpen.value = true
  assignSelect.value = selectedLead.value.assignedTo?.id || null
  followUpInput.value = selectedLead.value.nextFollowUpAt ? dateTimeLocalValue(selectedLead.value.nextFollowUpAt) : ''
  showFollowUpError.value = false
  isEditingLead.value = false
}

// close
function closeLeadDetails () {
  isDetailOpen.value = false
  selectedLead.value = null
  isEditingLead.value = false
  editForm.value = {
    name: '',
    email: '',
    phone: '',
    countryCode: '',
    age: null,
    originCity: '',
    country: '',
    source: '',
    leadSourceDetail: ''
  }
  showAddNote.value = false
  showEditNote.value = false
  showCreateTask.value = false
  showEditTask.value = false
  showLogCall.value = false
  showEditCall.value = false
  showFollowUpError.value = false
}

// start edit
function startEdit () {
  if (!selectedLead.value) return
  editForm.value = {
    name: selectedLead.value.name || '',
    email: selectedLead.value.email || '',
    phone: selectedLead.value.phone || '',
    countryCode: selectedLead.value.countryCode || '',
    country: selectedLead.value.country || '',
    originCity: selectedLead.value.originCity || '',
    age: selectedLead.value.age ?? null,
    source: selectedLead.value.source || '',
    leadSourceDetail: selectedLead.value.leadSourceDetail || '',
    preferredContactMethod: selectedLead.value.preferredContactMethod || '',
    timezone: selectedLead.value.timezone || '',
    scheduleCall: selectedLead.value.scheduleCall || false
  }
  isEditingLead.value = true
}

// cancel edits
function cancelEdit () {
  isEditingLead.value = false
  editForm.value = {
    name: '',
    email: '',
    phone: '',
    countryCode: '',
    country: '',
    originCity: '',
    age: null,
    source: '',
    leadSourceDetail: '',
    preferredContactMethod: '',
    timezone: '',
    scheduleCall: false
  }
}

// save edits
async function saveContactEdits () {
  if (!selectedLead.value) return
  if (editForm.value.phone && editForm.value.phone.length !== 10) {
    alert('Phone number must be exactly 10 digits')
    return
  }

  isSavingContact.value = true
  const id = selectedLead.value._id

const patchBody = {
  name: editForm.value.name,
  email: editForm.value.email,
  phone: editForm.value.phone,
  countryCode: editForm.value.countryCode,
  country: editForm.value.country,
  originCity: editForm.value.originCity,
  age: editForm.value.age,
  source: editForm.value.source,
  leadSourceDetail: editForm.value.leadSourceDetail,
  preferredContactMethod: editForm.value.preferredContactMethod,
  timezone: editForm.value.timezone,
  scheduleCall: editForm.value.scheduleCall,
  updatedBy: currentUser.value.name
}

const fields = ['name','email','phone','countryCode','age','originCity','country','source','leadSourceDetail']
const changes = {}
fields.forEach(f => {
  const prev = selectedLead.value[f] === undefined ? null : selectedLead.value[f]
  const next = patchBody[f] === undefined ? null : patchBody[f]
  if (String(prev ?? '') !== String(next ?? '')) {
    if (f === 'source') {
      changes[f] = {
        from: prev,
        to: next,
        from_label: prev ? humanizeSource(prev) : prev,
        to_label: next ? humanizeSource(next) : next
      }
    } else {
      changes[f] = { from: prev, to: next }
    }
  }
})

  if (Object.keys(changes).length) {
    const shortParts = Object.keys(changes).map(k => {
  const c = changes[k]
  if (k === 'source') {
    return `${k}: ${c.from_label ?? c.from ?? '—'} → ${c.to_label ?? c.to ?? '—'}`
  }
  return `${k}: ${c.from ?? '—'} → ${c.to ?? '—'}`
}).slice(0,5)

    const ev = {
      type: 'contact_edited',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: {
        short: `Contact updated: ${shortParts.join(', ')}`,
        changes
      }
    }
    selectedLead.value.events = selectedLead.value.events || []
    selectedLead.value.events.push(ev)
    patchBody.events = selectedLead.value.events
  }

  try {
    const updated = await patchLead(id, patchBody)
    const refreshed = leads.value.find(l => (l._id || l.id) === (updated._id || updated.id))
    if (refreshed) selectedLead.value = refreshed
    isEditingLead.value = false
    editForm.value = {
      name: '',
      email: '',
      phone: '',
      countryCode: '',
      age: null,
      originCity: '',
      country: '',
      source: '',
      leadSourceDetail: ''
    }
  } catch (err) {
    console.error('Failed to save contact edits', err)
    alert('Failed to save contact changes. Please try again.')
    await loadLeads()
  } finally {
    isSavingContact.value = false
  }
}

// VIEW EMAIL HISTORY (Replaced copyPublicLink)
function viewEmailHistory() {
  if (!selectedLead.value) return
  
  selectedLeadIdForEmailHistory.value = selectedLead.value._id || selectedLead.value.id
  selectedLeadNameForEmailHistory.value = selectedLead.value.name || 'Unnamed lead'
  showEmailHistoryModal.value = true
}

// navigation to build route
function goToBuild (lead) {
  const id = lead._id || lead.id
  if (!id) return
  router.push(`/admin/leads/${id}/build`)
}

// assign single lead (select dropdown) - WITH PERMISSION CHECK
async function assignLeadToSelected (adminId) {
  if (!canAssignLeads.value) {
    alert('Only admins can assign leads to other users.')
    return
  }
  
  if (!selectedLead.value || !selectedLead.value._id) return
  const admin = admins.value.find(a => a.id === adminId) || null

  const prevAssigned = selectedLead.value.assignedTo?.name || null
  const nextAssigned = admin?.name || null

  selectedLead.value.assignedTo = admin
  selectedLead.value.assignedToId = adminId

  const ev = {
    type: 'assign',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    metadata: {
      short: `Assigned ${prevAssigned || 'Unassigned'} → ${nextAssigned || 'Unassigned'}`,
      from: prevAssigned,
      to: nextAssigned,
      changes: { assignedTo: { from: prevAssigned, to: nextAssigned } }
    }
  }

  selectedLead.value.events = selectedLead.value.events || []
  selectedLead.value.events.push(ev)

  try {
    await patchLead(selectedLead.value._id, { 
      assignedToId: adminId,
      assignedTo: selectedLead.value.assignedTo,
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name,
      assignmentBy: currentUser.value.name,
      assignmentAt: new Date().toISOString()
    })
  } catch (err) {
    console.error('assign failed', err)
    alert('Failed to assign lead')
    await loadLeads()
  }
}

// bulk assign - WITH PERMISSION CHECK
function openBulkAssignModal () {
  if (!canAssignLeads.value) {
    alert('Only admins can assign leads to other users.')
    return
  }
  showBulkAssign.value = true
}
function closeBulkAssignModal () {
  showBulkAssign.value = false
  bulkAssignTo.value = null
}
async function performBulkAssign () {
  if (!canAssignLeads.value) {
    alert('You do not have permission to assign leads.')
    return
  }
  
  if (!bulkAssignTo.value || !selectedIds.value.length) return
  isLoadingBulk.value = true
  try {
    for (const id of selectedIds.value) {
      const lead = leads.value.find(l => (l._id || l.id) === id)
      if (!lead) continue
      lead.assignedToId = bulkAssignTo.value
      lead.assignedTo = admins.value.find(a => a.id === bulkAssignTo.value) || null
      
      const events = lead.events || []
      events.push({
        type: 'assign',
        at: new Date().toISOString(),
        by: { name: currentUser.value.name },
        metadata: {
          short: `Bulk assigned to ${lead.assignedTo?.name || 'Unassigned'}`,
          bulk: true
        }
      })
      
      await patchLead(lead._id, { 
        assignedToId: bulkAssignTo.value,
        events: events,
        updatedBy: currentUser.value.name,
        assignmentBy: currentUser.value.name,
        assignmentAt: new Date().toISOString(),
        bulkAssignment: true
      }).catch(e => {
        console.error('bulk patch failed for', id, e)
      })
    }
    alert('Assigned selected leads')
  } finally {
    isLoadingBulk.value = false
    closeBulkAssignModal()
    selectedIds.value = []
  }
}

// NEXT FOLLOW-UP - FIXED VERSION
function dateTimeLocalValue (iso) {
  try {
    const d = new Date(iso)
    const offset = d.getTimezoneOffset() * 60000
    const adjustedDate = new Date(d.getTime() - offset)
    return adjustedDate.toISOString().slice(0, 16)
  } catch {
    return ''
  }
}

async function setNextFollowUp () {
  if (!selectedLead.value) return
  
  if (!followUpInput.value) {
    showFollowUpError.value = true
    alert('Please select a date and time for the follow-up')
    return
  }
  
  const selectedDate = new Date(followUpInput.value)
  const now = new Date()
  
  if (selectedDate <= now) {
    showFollowUpError.value = true
    alert('Please select a future date and time for the follow-up')
    return
  }
  
  showFollowUpError.value = false
  
  const iso = selectedDate.toISOString()
  const formattedDate = formatDateTime(iso)
  
  const prevFollowUp = selectedLead.value.nextFollowUpAt || null
  
  selectedLead.value.nextFollowUpAt = iso
  
  const ev = {
    type: 'followup_set',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: '',
    status: 'scheduled',
    metadata: {
      short: `Follow-up: ${formattedDate}`,
      followUpDate: iso,
      formattedDate: formattedDate,
      changes: { nextFollowUpAt: { from: prevFollowUp, to: iso } }
    }
  }
  
  selectedLead.value.events = selectedLead.value.events || []
  selectedLead.value.events.push(ev)
  
  try {
    await patchLead(selectedLead.value._id, { 
      nextFollowUpAt: iso,
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    })
    
    alert(`Follow-up set for ${formattedDate}`)
    
    followUpInput.value = ''
    
    await loadLeads()
    
  } catch (err) {
    console.error('Failed to set follow-up', err)
    alert('Failed to set follow-up. Please try again.')
    
    selectedLead.value.nextFollowUpAt = prevFollowUp
    if (ev && selectedLead.value.events) {
      selectedLead.value.events = selectedLead.value.events.filter(e => e !== ev)
    }
    
    await loadLeads()
  }
}

async function clearFollowUp () {
  if (!selectedLead.value) return
  
  if (!confirm('Clear the scheduled follow-up?')) return
  
  const prevFollowUp = selectedLead.value.nextFollowUpAt
  
  selectedLead.value.nextFollowUpAt = null
  
  const ev = {
    type: 'followup_cleared',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: 'Follow-up cleared',
    metadata: {
      short: 'Follow-up cleared',
      previousFollowUp: prevFollowUp,
      changes: { nextFollowUpAt: { from: prevFollowUp, to: null } }
    }
  }
  
  selectedLead.value.events = selectedLead.value.events || []
  selectedLead.value.events.push(ev)
  
  followUpInput.value = ''
  
  try {
    await patchLead(selectedLead.value._id, { 
      nextFollowUpAt: null,
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    })
    
    alert('Follow-up cleared')
    
    await loadLeads()
    
  } catch (err) {
    console.error('Failed to clear follow-up', err)
    alert('Failed to clear follow-up. Please try again.')
    
    selectedLead.value.nextFollowUpAt = prevFollowUp
    if (ev && selectedLead.value.events) {
      selectedLead.value.events = selectedLead.value.events.filter(e => e !== ev)
    }
    
    await loadLeads()
  }
}

// ========== NOTE FUNCTIONS - FIXED ==========
async function addNote () {
  if (!selectedLead.value || !noteText.value.trim()) return
  
  console.log('Adding note...')
  
  const ev = {
    type: 'note',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: noteText.value.trim(),
    status: 'active',
    metadata: { short: noteText.value.trim().slice(0, 80) }
  }
  
  if (!selectedLead.value.events) {
    selectedLead.value.events = []
  }
  selectedLead.value.events.push(ev)
  
  closeAddNote()
  
  try {
    console.log('Saving note to server...')
    
    const result = await patchLead(selectedLead.value._id, { 
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    })
    
    console.log('Note saved successfully:', result)
    
    await loadLeads()
    
  } catch (err) {
    console.error('failed to persist note', err)
    alert(`Failed to save note: ${err.message || 'Unknown error'}`)
    
    await loadLeads()
  }
}

async function saveEditedNote () {
  if (!selectedLead.value || !editingNote.value || !editNoteText.value.trim()) return
  
  console.log('Saving edited note:', editingNote.value)
  
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'note' && e.at === editingNote.value.at
  )
  
  if (index !== -1) {
    const oldNote = events[index].note
    
    events[index].note = editNoteText.value.trim()
    events[index].updatedBy = currentUser.value.name
    events[index].updatedAt = new Date().toISOString()
    
    const updateEv = {
      type: 'note_updated',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: {
        short: `Note updated: ${editNoteText.value.trim().slice(0, 50)}`,
        noteId: editingNote.value.at,
        changes: { content: { from: oldNote, to: editNoteText.value.trim() } }
      }
    }
    
    events.push(updateEv)
    
    console.log('Updated note at index:', index)
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        events: events,
        updatedBy: currentUser.value.name
      })
      
      console.log('Note update successful:', result)
      
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to update note', err)
      alert(`Failed to update note: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
  
  closeEditNote()
}

// ========== CALL FUNCTIONS - FIXED ==========
async function saveLogCall () {
  if (!selectedLead.value) return
  
  console.log('Logging call...')
  
  const ev = {
    type: 'call',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: callNote.value || '',
    status: 'completed',
    metadata: { 
      short: callOutcome.value || '',
      duration: callDuration.value || 0
    },
    updatedBy: currentUser.value.name
  }
  
  if (!selectedLead.value.events) {
    selectedLead.value.events = []
  }
  selectedLead.value.events.push(ev)
  
  closeLogCall()
  
  try {
    console.log('Saving call to server...')
    
    const result = await patchLead(selectedLead.value._id, { 
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    })
    
    console.log('Call saved successfully:', result)
    
    await loadLeads()
    
  } catch (err) {
    console.error('failed to persist call', err)
    alert(`Failed to save call: ${err.message || 'Unknown error'}`)
    
    await loadLeads()
  }
}

async function saveEditedCall () {
  if (!selectedLead.value || !editingCall.value) return
  
  console.log('Saving edited call:', editingCall.value)
  
  const events = selectedLead.value.events || []
  
  const index = events.findIndex(e => 
    e.type === 'call' && e.at === editingCall.value.at
  )
  
  if (index !== -1) {
    const oldCall = { ...events[index] }
    const oldDuration = oldCall.metadata?.duration || 0
    const oldOutcome = oldCall.metadata?.short || ''
    const oldNote = oldCall.note || ''
    
    events[index] = {
      ...events[index],
      note: editCallNote.value.trim(),
      metadata: {
        ...events[index].metadata,
        short: editCallOutcome.value || '',
        duration: editCallDuration.value || 0
      },
      updatedBy: currentUser.value.name,
      updatedAt: new Date().toISOString()
    }
    
    const durationChanged = oldDuration !== editCallDuration.value
    const outcomeChanged = oldOutcome !== editCallOutcome.value
    const noteChanged = oldNote !== editCallNote.value.trim()
    
    let changeDescriptions = []
    if (noteChanged) changeDescriptions.push('summary updated')
    if (durationChanged) changeDescriptions.push(`duration: ${oldDuration}m → ${editCallDuration.value}m`)
    if (outcomeChanged) changeDescriptions.push(`outcome: ${oldOutcome || 'none'} → ${editCallOutcome.value}`)
    
    const changeMessage = changeDescriptions.length > 0 
      ? changeDescriptions.join(', ')
      : 'Call updated'
    
    const updateEv = {
      type: 'call_updated',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      note: `Call updated: ${changeMessage}`,
      metadata: {
        short: `Call updated: ${editCallOutcome.value || 'No outcome'}${durationChanged ? ` (${editCallDuration.value}m)` : ''}`,
        callId: editingCall.value.at,
        changes: {
          summary: noteChanged ? { from: oldNote, to: editCallNote.value.trim() } : null,
          duration: durationChanged ? { from: oldDuration, to: editCallDuration.value } : null,
          outcome: outcomeChanged ? { from: oldOutcome, to: editCallOutcome.value } : null
        }
      }
    }
    
    if (!updateEv.metadata.changes.summary) delete updateEv.metadata.changes.summary
    if (!updateEv.metadata.changes.duration) delete updateEv.metadata.changes.duration
    if (!updateEv.metadata.changes.outcome) delete updateEv.metadata.changes.outcome
    
    events.push(updateEv)
    
    console.log('Updated original call at index:', index, events[index])
    console.log('Timeline event:', updateEv)
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        events: events,
        updatedBy: currentUser.value.name
      })
      
      console.log('Call update successful:', result)
      
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to update call', err)
      alert(`Failed to update call: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  } else {
    console.error('Original call event not found for ID:', editingCall.value.at)
    alert('Could not find the original call to update')
  }
  
  closeEditCall()
}

// ========== TASK FUNCTIONS - FIXED ==========
async function createTask () {
  if (!selectedLead.value || !taskTitle.value.trim()) return
  
  console.log('Creating task...')
  
  const t = {
    id: 'task-' + Math.random().toString(36).slice(2, 9),
    title: taskTitle.value.trim(),
    due: taskDue.value ? new Date(taskDue.value).toISOString() : null,
    note: taskNote.value,
    status: taskStatus.value,
    createdAt: new Date().toISOString(),
    createdBy: currentUser.value.name
  }
  
  console.log('New task object:', t)
  
  if (!selectedLead.value.tasks) {
    selectedLead.value.tasks = []
  }
  selectedLead.value.tasks.push(t)
  
  const createEv = {
    type: 'task_created',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: `Task created: ${t.title} (status: ${t.status})`,
    metadata: {
      short: `Task created: ${t.title}`,
      taskId: t.id
    }
  }
  
  const statusEv = {
    type: 'task_status_changed',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: `Task status: → ${t.status}`,
    metadata: {
      short: `Task "${t.title}" → ${t.status}`,
      taskId: t.id,
      changes: { status: { from: null, to: t.status } }
    }
  }
  
  if (!selectedLead.value.events) {
    selectedLead.value.events = []
  }
  selectedLead.value.events.push(createEv, statusEv)
  
  closeCreateTask()
  
  try {
    const patchData = {
      tasks: selectedLead.value.tasks,
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    }
    
    const result = await patchLead(selectedLead.value._id, patchData)
    console.log('Task creation successful:', result)
    await loadLeads()
    
  } catch (err) {
    console.error('Failed to create task:', err)
    alert(`Failed to create task: ${err.message || 'Unknown error'}`)
    await loadLeads()
  }
}

async function handleTaskStatusChange(task, newStatus) {
  console.log('Task status changing from', task.status, 'to', newStatus)
  
  const oldStatus = task.status || 'open'
  
  if (oldStatus === newStatus) {
    console.log('No status change, skipping')
    return
  }
  
  task.status = newStatus
  
  await updateTaskStatus(task, oldStatus)
}

async function saveEditedTask () {
  if (!selectedLead.value || !editingTask.value || !editTaskTitle.value.trim()) return
  
  console.log('Editing task:', editingTask.value)
  
  const taskIndex = selectedLead.value.tasks.findIndex(t => t.id === editingTask.value.id)
  if (taskIndex !== -1) {
    const oldTask = { 
      ...selectedLead.value.tasks[taskIndex],
      status: selectedLead.value.tasks[taskIndex].status || 'open'
    }
    
    selectedLead.value.tasks[taskIndex].title = editTaskTitle.value.trim()
    selectedLead.value.tasks[taskIndex].due = editTaskDue.value ? new Date(editTaskDue.value).toISOString() : null
    selectedLead.value.tasks[taskIndex].note = editTaskNote.value
    selectedLead.value.tasks[taskIndex].status = editTaskStatus.value
    selectedLead.value.tasks[taskIndex].updatedBy = currentUser.value.name
    selectedLead.value.tasks[taskIndex].updatedAt = new Date().toISOString()
    
    const changes = {}
    const changeDescriptions = []
    
    if (oldTask.title !== editTaskTitle.value.trim()) {
      changes.title = { from: oldTask.title, to: editTaskTitle.value.trim() }
      changeDescriptions.push('title')
    }
    
    if (oldTask.status !== editTaskStatus.value) {
      changes.status = { from: oldTask.status, to: editTaskStatus.value }
      changeDescriptions.push('status')
    }
    
    const oldDue = oldTask.due ? new Date(oldTask.due).toISOString() : null
    const newDue = editTaskDue.value ? new Date(editTaskDue.value).toISOString() : null
    if (oldDue !== newDue) {
      changes.due = { from: oldDue, to: newDue }
      changeDescriptions.push('due date')
    }
    
    if (oldTask.note !== editTaskNote.value) {
      changes.note = { from: oldTask.note || '', to: editTaskNote.value || '' }
      changeDescriptions.push('note')
    }
    
    const detailedChanges = []
    if (changes.note) {
      const fromNote = changes.note.from ? changes.note.from.slice(0, 50) + (changes.note.from.length > 50 ? '...' : '') : '(empty)'
      const toNote = changes.note.to ? changes.note.to.slice(0, 50) + (changes.note.to.length > 50 ? '...' : '') : '(empty)'
      detailedChanges.push(`note: ${fromNote} → ${toNote}`)
    }
    if (changes.due) {
      const fromDate = changes.due.from ? formatDateTimeShort(changes.due.from) : '(not set)'
      const toDate = changes.due.to ? formatDateTimeShort(changes.due.to) : '(not set)'
      detailedChanges.push(`due: ${fromDate} → ${toDate}`)
    }
    if (changes.title) {
      const fromTitle = changes.title.from || '(no title)'
      const toTitle = changes.title.to || '(no title)'
      detailedChanges.push(`title: ${fromTitle} → ${toTitle}`)
    }
    if (changes.status) {
      const fromStatus = changes.status.from || 'not set'
      const toStatus = changes.status.to || 'not set'
      detailedChanges.push(`status: ${fromStatus} → ${toStatus}`)
    }
    
    let shortDescription = ''
    if (changeDescriptions.length === 0) {
      shortDescription = 'Task updated (no changes)'
    } else if (changeDescriptions.length === 1) {
      shortDescription = `Task ${changeDescriptions[0]} updated`
    } else if (changeDescriptions.length === 2) {
      shortDescription = `Task ${changeDescriptions[0]} and ${changeDescriptions[1]} updated`
    } else {
      shortDescription = `Task ${changeDescriptions.slice(0, -1).join(', ')} and ${changeDescriptions.slice(-1)[0]} updated`
    }
    
    const ev = {
      type: 'task_updated',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      note: detailedChanges.join('; '),
      metadata: {
        short: shortDescription,
        taskId: editingTask.value.id,
        changes: changes
      }
    }
    
    if (!selectedLead.value.events) {
      selectedLead.value.events = []
    }
    selectedLead.value.events.push(ev)
    
    if (oldTask.status !== editTaskStatus.value) {
      const statusEv = {
        type: 'task_status_changed',
        at: new Date().toISOString(),
        by: { name: currentUser.value.name },
        note: `Task status changed: ${oldTask.status} → ${editTaskStatus.value}`,
        metadata: {
          short: `Task "${editTaskTitle.value.trim()}" ${oldTask.status} → ${editTaskStatus.value}`,
          taskId: editingTask.value.id,
          changes: { status: { from: oldTask.status, to: editTaskStatus.value } }
        }
      }
      selectedLead.value.events.push(statusEv)
    }
    
    console.log('Updated task:', selectedLead.value.tasks[taskIndex])
    console.log('Changes detected:', changes)
    console.log('Event description:', shortDescription)
    console.log('Detailed changes:', detailedChanges)
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        tasks: selectedLead.value.tasks,
        events: selectedLead.value.events,
        updatedBy: currentUser.value.name
      })
      
      console.log('Task update successful:', result)
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to update task:', err)
      alert(`Failed to update task: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
  
  closeEditTask()
}

// ========== UPDATE STATUS FUNCTIONS - FIXED ==========
async function updateTaskStatus(task, oldStatus) {
  console.log('Updating task status:', task.id, 'from', oldStatus, 'to', task.status)
  
  const idx = selectedLead.value.tasks.findIndex(t => t.id === task.id)
  if (idx !== -1) {
    const before = oldStatus || 'open'
    const after = task.status
    
    selectedLead.value.tasks[idx].status = after
    selectedLead.value.tasks[idx].updatedBy = currentUser.value.name
    selectedLead.value.tasks[idx].updatedAt = new Date().toISOString()
    
    const ev = {
      type: 'task_status_changed',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      note: `Task status changed: ${before} → ${after}`,
      metadata: {
        short: `Task "${task.title}" ${before} → ${after}`,
        taskId: task.id,
        changes: { status: { from: before, to: after } }
      }
    }
    
    if (!selectedLead.value.events) {
      selectedLead.value.events = []
    }
    selectedLead.value.events.push(ev)
    
    console.log('Sending task status update...')
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        tasks: selectedLead.value.tasks,
        events: selectedLead.value.events,
        updatedBy: currentUser.value.name
      })
      
      console.log('Task status update successful:', result)
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to update task status:', err)
      alert(`Failed to update task status: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
}

async function updateNoteStatus(note) {
  console.log('Updating note status for:', note)
  
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'note' && e.at === note.at
  )
  
  if (index !== -1) {
    const before = events[index].status || 'active'
    const after = note.status
    
    events[index].status = after
    events[index].updatedBy = currentUser.value.name
    events[index].updatedAt = new Date().toISOString()
    
    const statusEv = {
      type: 'note_status_changed',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: {
        short: `Note status ${before} → ${after}`,
        noteId: note.at,
        changes: { status: { from: before, to: after } }
      }
    }
    
    events.push(statusEv)
    
    console.log('Updated note status at index:', index)
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        events: events,
        updatedBy: currentUser.value.name
      })
      
      console.log('Note status update successful:', result)
      
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to update note status', err)
      alert(`Failed to update note status: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
}

async function updateCallStatus(call) {
  console.log('Updating call status for:', call)
  
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'call' && e.at === call.at
  )
  
  if (index !== -1) {
    const before = events[index].status || 'completed'
    const after = call.status
    
    events[index].status = after
    events[index].updatedBy = currentUser.value.name
    events[index].updatedAt = new Date().toISOString()
    
    const statusEv = {
      type: 'call_status_changed',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: {
        short: `Call status ${before} → ${after}`,
        callId: call.at,
        changes: { status: { from: before, to: after } }
      }
    }
    
    events.push(statusEv)
    
    console.log('Updated call status at index:', index)
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        events: events,
        updatedBy: currentUser.value.name
      })
      
      console.log('Call status update successful:', result)
      
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to update call status', err)
      alert(`Failed to update call status: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
}

// ========== FOLLOW-UP STATUS FUNCTIONS ==========
async function updateFollowUpStatus(followup) {
  console.log('Updating follow-up status for:', followup)
  
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'followup_set' && e.at === followup.at
  )
  
  if (index !== -1) {
    const before = events[index].status || 'scheduled'
    const after = followup.status
    
    events[index] = {
      ...events[index],
      status: after,
      updatedBy: currentUser.value.name,
      updatedAt: new Date().toISOString()
    }
    
    const statusEv = {
      type: 'followup_status_changed',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: {
        short: `Follow-up status ${before} → ${after}`,
        followupId: followup.at,
        changes: { status: { from: before, to: after } }
      }
    }
    
    events.push(statusEv)
    
    console.log('Updated follow-up status at index:', index)
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        events: events,
        updatedBy: currentUser.value.name
      })
      
      console.log('Follow-up status update successful:', result)
      
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to update follow-up status', err)
      alert(`Failed to update follow-up status: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
}

async function deleteFollowUp(followup) {
  if (!confirm('Delete this follow-up record?')) return
  
  console.log('Deleting follow-up:', followup)
  
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'followup_set' && e.at === followup.createdAt
  )
  
  if (index !== -1) {
    const deletedFollowup = { ...events[index] }
    
    const delEv = {
      type: 'followup_deleted',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: { 
        short: 'Follow-up deleted',
        followupId: followup.createdAt,
        originalDate: deletedFollowup.metadata?.followUpDate || ''
      }
    }
    
    const filteredEvents = events.filter((e, i) => i !== index)
    
    filteredEvents.push(delEv)
    selectedLead.value.events = filteredEvents
    
    console.log('Follow-up deleted, new events:', filteredEvents)
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        events: filteredEvents,
        updatedBy: currentUser.value.name
      })
      
      console.log('Follow-up deletion successful:', result)
      
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to delete follow-up', err)
      alert(`Failed to delete follow-up: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
}

// ========== DELETE FUNCTIONS - FIXED ==========
async function deleteTask(task) {
  if (!confirm(`Delete task "${task.title}"?`)) return
  
  console.log('Deleting task:', task)
  
  if (!selectedLead.value.tasks) {
    selectedLead.value.tasks = []
  }
  
  const deletedTask = { ...task }
  
  selectedLead.value.tasks = selectedLead.value.tasks.filter(t => t.id !== task.id)
  
  const ev = {
    type: 'task_deleted',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: `Task deleted: ${deletedTask.title}`,
    metadata: {
      short: `Task deleted: ${deletedTask.title}`,
      taskId: deletedTask.id,
      taskTitle: deletedTask.title
    }
  }
  
  if (!selectedLead.value.events) {
    selectedLead.value.events = []
  }
  selectedLead.value.events.push(ev)
  
  console.log('Tasks after deletion:', selectedLead.value.tasks)
  
  try {
    const result = await patchLead(selectedLead.value._id, { 
      tasks: selectedLead.value.tasks,
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    })
    
    console.log('Task deletion successful:', result)
    
    await loadLeads()
    
  } catch (err) {
    console.error('Failed to delete task:', err)
    alert(`Failed to delete task: ${err.message || 'Unknown error'}`)
    await loadLeads()
  }
}

async function deleteNote(note) {
  if (!confirm('Delete this note?')) return
  
  console.log('Deleting note:', note)
  
  if (!selectedLead.value) return

  const events = selectedLead.value.events || []
  const index = events.findIndex(e => e.type === 'note' && e.at === note.at)
  
  if (index !== -1) {
    const deletedNote = { ...events[index] }
    
    events[index] = {
      ...events[index],
      status: 'deleted',
      updatedBy: currentUser.value.name,
      updatedAt: new Date().toISOString()
    }
    
    const delEv = {
      type: 'note_deleted',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: { 
        short: 'Note deleted',
        noteId: note.at,
        originalContent: deletedNote.note ? deletedNote.note.slice(0, 100) : ''
      }
    }
    
    events.push(delEv)
    
    console.log('Note marked as deleted at index:', index)

    try {
      const result = await patchLead(selectedLead.value._id, {
        events: events,
        updatedBy: currentUser.value.name
      })
      
      console.log('Note deletion successful:', result)
      
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to delete note:', err)
      alert(`Failed to delete note: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
}

async function deleteCall(call) {
  if (!confirm('Delete this call?')) return
  
  console.log('Deleting call:', call)
  
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => e.type === 'call' && e.at === call.at)
  
  if (index !== -1) {
    const deletedCall = { ...events[index] }
    
    const delEv = {
      type: 'call_deleted',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: { 
        short: 'Call deleted',
        callId: call.at,
        originalOutcome: deletedCall.outcome || '',
        originalDuration: deletedCall.durationMinutes || 0
      }
    }
    
    const filteredEvents = events.filter((e, i) => i !== index)
    
    filteredEvents.push(delEv)
    selectedLead.value.events = filteredEvents
    
    console.log('Call deleted, new events:', filteredEvents)
    
    try {
      const result = await patchLead(selectedLead.value._id, { 
        events: filteredEvents,
        updatedBy: currentUser.value.name
      })
      
      console.log('Call deletion successful:', result)
      
      await loadLeads()
      
    } catch (err) {
      console.error('Failed to delete call', err)
      alert(`Failed to delete call: ${err.message || 'Unknown error'}`)
      await loadLeads()
    }
  }
}

// ========== MODAL OPEN/CLOSE FUNCTIONS ==========
function openAddNoteModal () {
  noteText.value = ''
  showAddNote.value = true
}
function closeAddNote () {
  showAddNote.value = false
  noteText.value = ''
}

function openEditNoteModal (note) {
  editingNote.value = note
  editNoteText.value = note.content
  showEditNote.value = true
}
function closeEditNote () {
  showEditNote.value = false
  editingNote.value = null
  editNoteText.value = ''
}

function openLogCallModal () {
  callNote.value = ''
  callDuration.value = 0
  callOutcome.value = ''
  showLogCall.value = true
}
function closeLogCall () {
  showLogCall.value = false
}

function openEditCallModal (call) {
  console.log('Opening edit modal for call:', call)
  
  const events = selectedLead.value.events || []
  const originalCall = events.find(e => 
    e.type === 'call' && e.at === call.at
  )
  
  if (originalCall) {
    editingCall.value = originalCall
    
    editCallNote.value = originalCall.note || ''
    
    const outcome = originalCall.metadata?.short || ''
    editCallOutcome.value = outcome
    
    const duration = originalCall.metadata?.duration || 0
    editCallDuration.value = duration
    
    console.log('Form values set:', {
      note: editCallNote.value,
      duration: editCallDuration.value,
      outcome: editCallOutcome.value,
      metadata: originalCall.metadata
    })
    
    showEditCall.value = true
  } else {
    console.error('Original call not found for:', call)
    alert('Could not find the original call data')
  }
}
function closeEditCall () {
  showEditCall.value = false
  editingCall.value = null
  editCallNote.value = ''
  editCallDuration.value = 0
  editCallOutcome.value = ''
}

function openCreateTaskModal () {
  taskTitle.value = ''
  taskDue.value = getCurrentDateTime()
  taskNote.value = ''
  taskStatus.value = 'open'
  showCreateTask.value = true
}
function closeCreateTask () {
  showCreateTask.value = false
}

function openEditTaskModal (task) {
  editingTask.value = task
  editTaskTitle.value = task.title
  editTaskDue.value = task.due ? new Date(task.due).toISOString().slice(0, 16) : ''
  editTaskNote.value = task.note || ''
  editTaskStatus.value = task.status || 'open'
  showEditTask.value = true
}
function closeEditTask () {
  showEditTask.value = false
  editingTask.value = null
  editTaskTitle.value = ''
  editTaskDue.value = ''
  editTaskNote.value = ''
  editTaskStatus.value = 'open'
}

// STATUS change
function openStatusModal (lead = null) {
  if (lead) openLeadDetails(lead)
  
  // Set current status
  statusChange.value = selectedLead.value?.status || 'new'
  
  // Get the last status change event to pre-fill reason
  const lastStatusEv = (selectedLead.value?.events || []).slice().reverse().find(e => e.type === 'status_change')
  
  // Set status reason from last event
  statusReason.value = lastStatusEv?.reason ?? lastStatusEv?.note ?? selectedLead.value?.reason ?? ''
  
  // Pre-fill closed date if exists
  closedDate.value = selectedLead.value?.closedDate ? new Date(selectedLead.value.closedDate).toISOString().split('T')[0] : ''
  
  // Pre-fill closed-lost reason if status is closed-lost
  if (selectedLead.value?.status === 'closed-lost') {
    // Try to get reason from closedLostDetails first
    if (selectedLead.value.closedLostDetails) {
      const details = selectedLead.value.closedLostDetails
      closedLostReason.value = details.reasonKey || ''
      
      // If it's "other", set the custom reason
      if (details.reasonKey === 'other' && details.customReason) {
        customClosedLostReason.value = details.customReason
      }
    } else if (selectedLead.value.closedReason) {
      // Fallback to closedReason text
      const reasonText = selectedLead.value.closedReason.toLowerCase()
      
      // Try to match with known reasons
      const matchedReason = closedLostReasons.find(reason => 
        reasonText.includes(reason.key.replace(/-/g, ' ')) || 
        reasonText.includes(reason.label.toLowerCase())
      )
      
      if (matchedReason) {
        closedLostReason.value = matchedReason.key
        
        // If it's "other", extract the custom part
        if (matchedReason.key === 'other') {
          // Try to extract custom text after "Other:"
          const otherMatch = selectedLead.value.closedReason.match(/Other:\s*(.+)/i)
          if (otherMatch && otherMatch[1]) {
            customClosedLostReason.value = otherMatch[1].trim()
          } else {
            customClosedLostReason.value = selectedLead.value.closedReason
          }
        }
      } else {
        // If no match found, default to "other"
        closedLostReason.value = 'other'
        customClosedLostReason.value = selectedLead.value.closedReason
      }
    }
  } else {
    // Reset closed-lost fields if not closed-lost
    closedLostReason.value = ''
    customClosedLostReason.value = ''
  }
  
  showStatusModal.value = true
}

function closeStatusModal () {
  showStatusModal.value = false
  statusChange.value = 'new'
  statusReason.value = ''
  closedLostReason.value = ''
  customClosedLostReason.value = ''
  closedDate.value = ''
}

async function confirmChangeStatus () {
  if (!selectedLead.value) return

  // Validate required fields
  if (statusChange.value === 'closed-lost' && !closedLostReason.value) {
    alert('Please select a reason for losing the lead')
    return
  }
  
  if ((statusChange.value === 'closed-won' || statusChange.value === 'closed-lost') && !closedDate.value) {
    alert('Please select a date for when the lead was ' + (statusChange.value === 'closed-won' ? 'won' : 'lost'))
    return
  }

  const prevStatus = selectedLead.value.status || null
  const lastStatusEv = (selectedLead.value.events || []).slice().reverse().find(e => e.type === 'status_change')
  const prevReason = lastStatusEv?.reason ?? lastStatusEv?.note ?? selectedLead.value?.reason ?? ''

  const newStatus = statusChange.value
  let newReason = ''
  let closedLostDetails = null

  // Build appropriate reason based on status
  if (newStatus === 'closed-lost') {
    const reasonObj = closedLostReasons.find(r => r.key === closedLostReason.value)
    newReason = reasonObj ? reasonObj.label : 'Lost'
    
    // Add custom reason if "Other" is selected
    if (closedLostReason.value === 'other' && customClosedLostReason.value) {
      newReason = `Other: ${customClosedLostReason.value}`
    }
    
    // Store closed-lost details for metadata
    closedLostDetails = {
      reasonKey: closedLostReason.value,
      reasonLabel: newReason,
      customReason: closedLostReason.value === 'other' ? customClosedLostReason.value : null
    }
  } else if (newStatus === 'closed-won') {
    newReason = statusReason.value.trim() || 'Won'
  } else {
    newReason = statusReason.value.trim()
  }

  // Optimistic UI update
  selectedLead.value.status = newStatus
  selectedLead.value.statusLabel = statusLabelFrom(newStatus)
  
  // Update closed date if applicable
  if (newStatus === 'closed-won' || newStatus === 'closed-lost') {
    selectedLead.value.closedDate = new Date(closedDate.value).toISOString()
    selectedLead.value.closedReason = newReason
  } else {
    selectedLead.value.closedDate = null
    selectedLead.value.closedReason = null
  }

  // Build event
  const ev = {
    type: 'status_change',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: newReason || '',
    reason: newReason || '',
    metadata: {
      short: `Status ${prevStatus || '—'} → ${newStatus}`,
      from: prevStatus,
      to: newStatus,
      changes: {
        status: { from: prevStatus, to: newStatus },
        reason: { from: prevReason || null, to: newReason || null }
      }
    }
  }

  // Add closed date to event if applicable
  if (newStatus === 'closed-won' || newStatus === 'closed-lost') {
    ev.metadata.closedDate = selectedLead.value.closedDate
  }

  // Add closed-lost details if applicable
  if (closedLostDetails) {
    ev.metadata.closedLost = closedLostDetails
  }

  selectedLead.value.events = selectedLead.value.events || []
  selectedLead.value.events.push(ev)

  closeStatusModal()

  // Prepare PATCH data
  const patchData = {
    status: newStatus,
    reason: newReason || '',
    events: selectedLead.value.events,
    updatedBy: currentUser.value.name
  }

  // Add closed date and reason if applicable
  if (newStatus === 'closed-won' || newStatus === 'closed-lost') {
    patchData.closedDate = selectedLead.value.closedDate
    patchData.closedReason = newReason
  } else {
    patchData.closedDate = null
    patchData.closedReason = null
  }

  // Add closed-lost details to patch if applicable
  if (closedLostDetails) {
    patchData.closedLostDetails = closedLostDetails
  }

  try {
    await patchLead(selectedLead.value._id, patchData)
  } catch (err) {
    console.error('status patch failed', err)
    alert('Failed to save status change — reloading data.')
    await loadLeads()
  }
}

// PRIORITY change
function openPriorityModal () {
  priorityChange.value = selectedLead.value?.priority || 'medium'
  priorityReason.value = lastPriorityChangeReason(selectedLead.value) || ''
  showPriorityModal.value = true
}

function closePriorityModal () {
  showPriorityModal.value = false
}
async function confirmChangePriority () {
  if (!selectedLead.value) return
  
  const prev = selectedLead.value.priority || null
  const prevReason = lastPriorityChangeReason(selectedLead.value) || ''
  const next = priorityChange.value
  const nextReason = priorityReason.value.trim()
  
  selectedLead.value.priority = next
  selectedLead.value.priorityLabel = priorityLabelFrom(next)
  selectedLead.value.priorityUpdatedBy = currentUser.value.name
  selectedLead.value.priorityUpdatedAt = new Date().toISOString()

  const ev = {
    type: 'priority_change',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: nextReason || `Priority changed to ${next}`,
    reason: nextReason,
    metadata: {
      short: `Priority ${prev || 'Not set'} → ${next}`,
      from: prev,
      to: next,
      reason: nextReason,
      changes: { 
        priority: { from: prev, to: next },
        reason: { from: prevReason, to: nextReason }
      }
    }
  }

  selectedLead.value.events = selectedLead.value.events || []
  selectedLead.value.events.push(ev)

  closePriorityModal()
  try {
    await patchLead(selectedLead.value._id, { 
      priority: next, 
      priorityUpdatedBy: currentUser.value.name,
      priorityUpdatedAt: selectedLead.value.priorityUpdatedAt,
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('priority patch failed', err)
    alert('Failed to save priority change')
    await loadLeads()
  }
}

// UTILS for events / timeline
const timelineSorted = computed(() => {
  if (!selectedLead.value) return []
  return (selectedLead.value.events || []).slice().sort((a, b) => new Date(b.at) - new Date(a.at))
})

function lastEventAt (lead) {
  if (!lead || !lead.events || !lead.events.length) return null
  return lead.events[lead.events.length - 1].at
}

function lastEventBy (lead) {
  if (!lead || !lead.events || !lead.events.length) return null
  const e = lead.events[lead.events.length - 1]
  return e.by?.name || e.by || null
}

function lastEventSummary (lead) {
  if (!lead || !lead.events || !lead.events.length) return '—'
  const e = lead.events[lead.events.length - 1]
  if (e.type === 'note') return (e.note || '').slice(0, 60) || 'Note'
  if (e.type === 'call') return 'Call logged'
  if (e.type === 'task_created') return 'Task created'
  if (e.type === 'status_change') return 'Status changed'
  if (e.type === 'priority_change') return 'Priority changed'
  if (e.type === 'followup_set') return 'Follow-up set'
  if (e.type === 'followup_cleared') return 'Follow-up cleared'
  return e.type
}

// filter logs to meaningful items (notes, calls, status changes, contact edits, tasks)
const logsForSelectedLead = computed(() => {
  if (!selectedLead.value) return []
  const events = selectedLead.value.events || []
  return events
    .filter(e => [
      'note', 'note_updated', 'note_deleted', 'note_status_changed',
      'call', 'call_updated', 'call_deleted', 'call_status_changed',
      'status_change', 'followup_set', 'followup_cleared', 'followup_status_changed', 'followup_deleted',
      'contact_edited', 'task_created', 'task_updated', 'task_deleted', 'task_status_changed',
      'priority_change', 'assign'
    ].includes(e.type))
    .slice()
    .sort((a, b) => new Date(b.at) - new Date(a.at))
})

function eventIcon (type) {
  if (type === 'note' || type === 'note_updated') return '✍️'
  if (type === 'note_deleted' || type === 'note_status_changed') return '🗑️'
  if (type === 'call' || type === 'call_updated') return '📞'
  if (type === 'call_deleted' || type === 'call_status_changed') return '🗑️'
  if (type === 'task_created' || type === 'task_updated' || type === 'task_status_changed') return '🗒️'
  if (type === 'task_deleted') return '🗑️'
  if (type === 'status_change') return '🔁'
  if (type === 'followup_set') return '⏰'
  if (type === 'followup_cleared') return '⌛'
  if (type === 'followup_status_changed' || type === 'followup_deleted') return '🗑️'
  if (type === 'contact_edited') return '✏️'
  if (type === 'priority_change') return '🎯'
  if (type === 'assign') return '👤'
  return '•'
}
function eventTitle (ev) {
  if (ev.type === 'note') return 'Note added'
  if (ev.type === 'note_updated') return 'Note updated'
  if (ev.type === 'note_deleted') return 'Note deleted'
  if (ev.type === 'note_status_changed') return 'Note status changed'
  if (ev.type === 'call') return 'Call logged'
  if (ev.type === 'call_updated') {
    const changes = ev.metadata?.changes || {}
    let changeList = []
    
    if (changes.summary) changeList.push('summary')
    if (changes.duration) changeList.push('duration')
    if (changes.outcome) changeList.push('outcome')
    
    if (changeList.length > 0) {
      return `Call ${changeList.join(', ')} updated`
    }
    return 'Call updated'
  }
  if (ev.type === 'call_deleted') return 'Call deleted'
  if (ev.type === 'call_status_changed') return 'Call status changed'
  if (ev.type === 'task_created') return 'Task created'
  if (ev.type === 'task_updated') {
    return 'Task updated'
  }
  if (ev.type === 'task_deleted') return 'Task deleted'
  if (ev.type === 'task_status_changed') return 'Task status changed'
  if (ev.type === 'status_change') return 'Status changed'
  if (ev.type === 'followup_set') return 'Follow-up set'
  if (ev.type === 'followup_cleared') return 'Follow-up cleared'
  if (ev.type === 'followup_status_changed') return 'Follow-up status changed'
  if (ev.type === 'followup_deleted') return 'Follow-up deleted'
  if (ev.type === 'followup_updated') {
    const changes = ev.metadata?.changes || {}
    
    if (changes.followUpDate && changes.note) {
      return 'Follow-up updated'
    } else if (changes.followUpDate) {
      return 'Follow-up date changed'
    } else if (changes.note) {
      return 'Follow-up note updated'
    }
    
    const note = ev.note || ''
    if (note.includes('date updated')) {
      return 'Follow-up date changed'
    } else if (note.includes('note updated')) {
      return 'Follow-up note updated'
    }
    
    return 'Follow-up updated'
  }
  if (ev.type === 'assign') return 'Assigned'
  if (ev.type === 'contact_edited') return 'Contact edited'
  if (ev.type === 'priority_change') return 'Priority changed'
  return ev.type
}

function statusPillClass (status) {
  if (status === 'new') return 'bg-sky-50 text-sky-700'
  if (status === 'working') return 'bg-amber-50 text-amber-700'
  if (status === 'qualified') return 'bg-emerald-50 text-emerald-700'
  if (status === 'unqualified') return 'bg-rose-50 text-rose-700'
  if (status === 'closed-won') return 'bg-indigo-50 text-indigo-700'
  if (status === 'closed-lost') return 'bg-rose-100 text-rose-800'
  return 'bg-slate-100 text-slate-700'
}

function priorityPillClass (priority) {
  if (priority === 'low') return 'bg-slate-100 text-slate-700'
  if (priority === 'medium') return 'bg-amber-50 text-amber-700'
  if (priority === 'high') return 'bg-rose-50 text-rose-700'
  if (priority === 'very-high') return 'bg-rose-100 text-rose-800'
  return 'bg-slate-100 text-slate-700'
}

function priorityBadgeClass (priority) {
  if (priority === 'low') return 'bg-slate-50 text-slate-700'
  if (priority === 'medium') return 'bg-amber-50 text-amber-700'
  if (priority === 'high') return 'bg-rose-50 text-rose-700'
  if (priority === 'very-high') return 'bg-rose-100 text-rose-800'
  return 'bg-slate-50 text-slate-700'
}

function statusIcon (s) {
  if (s === 'working') return '🔄'
  if (s === 'qualified') return '⭐'
  if (s === 'closed-won') return '✅'
  if (s === 'unqualified' || s === 'closed-lost') return '❌'
  return '🟢'
}

// Format date short (just date)
function formatDateShort(value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleDateString()
  } catch {
    return value
  }
}

// PATCH helper to update single lead on server - FIXED VERSION
async function patchLead (id, patchBody) {
  if (!id) {
    console.error('Missing lead ID for PATCH')
    throw new Error('missing id')
  }
  
  try {
    console.log('Sending PATCH to /api/leads/' + id, patchBody)
    
    const updated = await $fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      body: patchBody,
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(err => {
      console.error('Fetch error:', err)
      throw err
    })
    
    console.log('PATCH response received:', updated)
    
    const idx = leads.value.findIndex(l => (l._id || l.id) === (updated._id || updated.id))
    if (idx !== -1) {
      leads.value[idx] = normalizeLead(updated)
      
      if (selectedLead.value && (selectedLead.value._id || selectedLead.value.id) === (updated._id || updated.id)) {
        console.log('Updating selectedLead with server response')
        selectedLead.value = leads.value[idx]
      }
    }
    
    return updated
    
  } catch (err) {
    console.error('PATCH request failed:', err)
    
    let errorMessage = 'Failed to save changes'
    if (err.data?.statusMessage) {
      errorMessage = err.data.statusMessage
    } else if (err.message) {
      errorMessage = err.message
    } else if (err.statusText) {
      errorMessage = err.statusText
    }
    
    throw new Error(errorMessage)
  }
}

// convenience: open status modal for a lead quickly
function openStatusChangeFor (lead) {
  openLeadDetails(lead)
  openStatusModal()
}

// convert placeholder
function handleConvert (lead) {
  if (lead && lead.status === 'new') {
    alert('New leads cannot be converted yet. Please update the lead status first.')
    return
  }
  goToBuild(lead)
}

// format datetime
function formatDateTime (value) {
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

// Refresh selected lead function
async function refreshSelectedLead() {
  if (!selectedLead.value) return
  
  console.log('Refreshing selected lead...')
  try {
    const freshLead = await $fetch(`/api/leads/${selectedLead.value._id}`)
    selectedLead.value = normalizeLead(freshLead)
    followUpInput.value = freshLead.nextFollowUpAt ? dateTimeLocalValue(freshLead.nextFollowUpAt) : ''
    console.log('Lead refreshed:', selectedLead.value)
  } catch (err) {
    console.error('Failed to refresh lead:', err)
  }
}

// Watch for selected lead changes to update follow-up input
watch(selectedLead, (newVal) => {
  if (newVal) {
    followUpInput.value = newVal.nextFollowUpAt ? dateTimeLocalValue(newVal.nextFollowUpAt) : ''
    showFollowUpError.value = false
  }
}, { deep: true })

// helper for last event summary used above
onMounted(async () => {
  console.log('Leads component mounted, current user:', currentUser.value)
  
  await loadAdmins()
  
  await loadLeads()
  
  console.log('Initial load complete, leads count:', leads.value.length)
})
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:all .15s ease}
.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-4px)}

/* Improved datetime-local input styling */
input[type="datetime-local"] {
  font-family: inherit;
  font-size: 0.875rem;
  color: #334155;
  background-color: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  transition: all 0.2s;
}

input[type="datetime-local"]:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

input[type="datetime-local"]:hover {
  border-color: #94a3b8;
}

/* Date input styling */
input[type="date"] {
  font-family: inherit;
  font-size: 0.875rem;
  color: #334155;
  background-color: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  transition: all 0.2s;
}

input[type="date"]:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

input[type="date"]:hover {
  border-color: #94a3b8;
}

/* Simple button styles (keeps visual consistency without relying on @apply) */
.btn-primary {
  background-color: #059669;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}
.btn-primary:hover { background-color: #047857; }
.btn-secondary {
  background-color: #ffffff;
  border: 1px solid rgba(15,23,42,0.06);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}
.btn-secondary:hover { background-color: #f8fafc; }
/* Follow-up section styling */
.follow-up-section {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  margin-top: 1rem;
}
.follow-up-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.follow-up-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.follow-up-input {
  flex: 1;
}
.follow-up-error {
  margin-top: 0.25rem;
  color: #dc2626;
  font-size: 0.75rem;
}
/* Status badge improvements */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.status-badge-new {
  background-color: #dbeafe;
  color: #1e40af;
}

.status-badge-qualified {
  background-color: #d1fae5;
  color: #065f46;
}
.status-badge-working {
  background-color: #fef3c7;
  color: #92400e;
}
.status-badge-unqualified {
  background-color: #fee2e2;
  color: #991b1b;
}
.status-badge-closed-won {
  background-color: #e0e7ff;
  color: #3730a3;
}
.status-badge-closed-lost {
  background-color: #fecaca;
  color: #7f1d1d;
}
</style>