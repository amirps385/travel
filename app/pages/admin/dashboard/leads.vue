<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-6">

      <!-- HEADER -->
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Leads — CRM view</h1>
          <p class="text-sm text-slate-500 mt-1">
            Track lead source, status, timeline and next actions. Click a row to open the CRM drawer.
          </p>
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

          <button
            class="px-3 py-2 rounded-lg text-xs bg-emerald-600 text-white disabled:opacity-40"
            :disabled="!selectedIds.length"
            @click="openBulkAssignModal"
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
                {{ lead.leadSourceDetail || lead.source || 'Website Form' }}
              </td>

              <!-- STATUS -->
              <td class="p-3">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                  :class="statusPillClass(lead.status)"
                >
                  {{ statusLabelFrom(lead.status) }}
                </span>
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
                    @click.stop="goToBuild(lead)"
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
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border text-sm">
                  <span class="text-xs text-slate-500">Source</span>
                  <strong class="ml-2">{{ selectedLead.leadSourceDetail || selectedLead.source || 'form' }}</strong>
                </div>

                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" :class="priorityBadgeClass(selectedLead.priority)">
                  <strong class="text-sm">{{ priorityLabelFrom(selectedLead.priority) }}</strong>
                  <span class="text-xs text-slate-700">Priority</span>
                  <button 
                    class="ml-2 text-xs text-slate-500 hover:text-slate-700"
                    @click="openPriorityModal"
                  >
                    ✏️
                  </button>
                </div>

                <div v-if="selectedLead.assignedTo?.name" class="px-3 py-1.5 rounded-lg bg-slate-50 text-sm font-medium border">
                  Owner: {{ selectedLead.assignedTo.name }}
                </div>
              </div>
            </div>

            <div class="shrink-0 flex items-center gap-2">
              <div v-if="!isEditingLead" class="flex items-center gap-2">
                <button class="px-4 py-2 rounded-lg bg-white border" @click="openStatusModal(selectedLead)">Change status</button>

                <select v-model="assignSelect" @change="assignLeadToSelected(assignSelect)" class="rounded-lg px-3 py-2 text-sm border bg-white">
                  <option :value="null">Unassigned</option>
                  <option v-for="u in admins" :key="u.id" :value="u.id">{{ u.name }}</option>
                </select>

                <button class="px-4 py-2 rounded-lg bg-emerald-600 text-white" @click="handleConvert(selectedLead)">Convert / Build</button>

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
                  <div>
                    <div class="text-sm font-medium">{{ selectedLead.email || '—' }}</div>
                    <div class="text-xs text-slate-500">Email</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium"><span v-if="selectedLead.countryCode">{{ selectedLead.countryCode }} </span>{{ selectedLead.phone || '—' }}</div>
                    <div class="text-xs text-slate-500">Phone</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ selectedLead.age ?? '—' }}</div>
                    <div class="text-xs text-slate-500">Age</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ selectedLead.originCity || '—' }}</div>
                    <div class="text-xs text-slate-500">Origin city</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ selectedLead.country || '—' }}</div>
                    <div class="text-xs text-slate-500">Country</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ selectedLead.leadSourceDetail || selectedLead.source || 'form' }}</div>
                    <div class="text-xs text-slate-500">Source detail</div>
                  </div>
                </div>

                <div v-else>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs text-slate-500 mb-1">Name</label>
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
                        <label class="block text-xs text-slate-500 mb-1">Phone (10 digits)</label>
                        <input 
                          v-model="editForm.phone" 
                          type="tel" 
                          class="w-full border rounded px-2 py-1"
                          @input="validatePhoneNumber"
                          maxlength="10"
                        />
                        <div v-if="editForm.phone && editForm.phone.length !== 10" class="text-xs text-rose-600 mt-1">
                          Phone number must be 10 digits
                        </div>
                      </div>
                    </div>
                    <div>
                      <label class="block text-xs text-slate-500 mb-1">Age</label>
                      <input type="number" v-model.number="editForm.age" min="1" max="120" class="w-full border rounded px-2 py-1" />
                    </div>
                    <div>
                      <label class="block text-xs text-slate-500 mb-1">Origin city</label>
                      <input v-model="editForm.originCity" class="w-full border rounded px-2 py-1" />
                    </div>
                    <div>
                      <label class="block text-xs text-slate-500 mb-1">Country</label>
                      <input v-model="editForm.country" class="w-full border rounded px-2 py-1" />
                    </div>

                    <div class="md:col-span-2">
                      <label class="block text-xs text-slate-500 mb-1">Lead source</label>
                      <select v-model="editForm.source" class="w-full border rounded px-2 py-1">
                        <option value="">Select source</option>
                        <optgroup label="📩 Website">
                          <option value="website_form">Website Form</option>
                          <option value="custom_itinerary">Custom Itinerary Request</option>
                          <option value="book_call">Book a Call</option>
                        </optgroup>
                        <optgroup label="💬 Direct">
                          <option value="whatsapp">WhatsApp</option>
                          <option value="phone">Phone Call</option>
                          <option value="email">Email</option>
                        </optgroup>
                        <optgroup label="📣 Marketing">
                          <option value="google_ads">Google Ads</option>
                          <option value="facebook">Facebook / Instagram</option>
                          <option value="organic_search">Organic Search</option>
                        </optgroup>
                        <optgroup label="🤝 Referrals">
                          <option value="referral_past_client">Referral – Past Client</option>
                          <option value="partner_agent">Partner / Agent</option>
                        </optgroup>
                        <optgroup label="⚙️ Internal">
                          <option value="manual">Manual Entry</option>
                        </optgroup>
                      </select>
                    </div>

                    <div class="md:col-span-2">
                      <label class="block text-xs text-slate-500 mb-1">Source detail</label>
                      <input v-model="editForm.leadSourceDetail" placeholder="e.g. ad campaign name, referrer name" class="w-full border rounded px-2 py-1" />
                    </div>
                  </div>
                </div>

                <div v-if="selectedLead.utm" class="mt-3 text-xs text-slate-400">
                  UTM: {{ selectedLead.utm.source || '—' }} / {{ selectedLead.utm.medium || '—' }} / {{ selectedLead.utm.campaign || '—' }}
                </div>
              </div>

              <!-- Trip info -->
              <div class="border rounded-xl p-4 bg-slate-50/60">
                <h3 class="text-xs font-semibold text-slate-500 mb-2">Trip</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <div class="text-xs text-slate-500">Travellers</div>
                  </div>
                  <div>
                    <div class="text-sm font-medium">{{ selectedLead.who || '—' }}</div>
                    <div class="text-xs text-slate-500">Who is travelling</div>
                  </div>

                  <div v-if="selectedLead.budget" class="col-span-2 mt-3">
                    <div class="text-sm font-medium">${{ selectedLead.budget }}</div>
                    <div class="text-xs text-slate-500">Budget / person</div>
                  </div>
                </div>

                <!-- Next follow-up quick input -->
                <div class="mt-4">
                  <label class="block text-xs text-slate-500 mb-1">Next follow-up</label>
                  <div class="flex items-center gap-2">
                    <input type="datetime-local" v-model="followUpInput" class="border rounded px-2 py-1 text-sm" />
                    <button class="px-3 py-1 rounded bg-amber-600 text-white text-sm" @click="setNextFollowUp">Set follow-up</button>
                    <button v-if="selectedLead.nextFollowUpAt" class="px-3 py-1 rounded border text-sm" @click="clearFollowUp">Clear</button>
                  </div>
                </div>
              </div>

              <!-- quick actions -->
              <div class="flex flex-wrap gap-2">
                <button class="px-4 py-2 rounded-lg border bg-white text-sm" @click="openAddNoteModal">Add note</button>
                <button class="px-4 py-2 rounded-lg border bg-white text-sm" @click="openLogCallModal">Log call</button>
                <button class="px-4 py-2 rounded-lg border bg-white text-sm" @click="openCreateTaskModal">Create task</button>
                <button class="px-4 py-2 rounded-lg border bg-white text-sm" @click="copyPublicLink">Copy public link</button>
              </div>

              <!-- Tasks -->
              <div class="border rounded-xl p-4 bg-slate-50/60">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xs font-semibold text-slate-500">Tasks</h3>
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
                        v-model="t.status" 
                        @change="updateTaskStatus(t)"
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
                        <option value="archived">Archived</option>
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
              <div class="border rounded-xl p-4 bg-white">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-xs font-semibold text-slate-500">Activity / Timeline</h3>
                  <div class="text-xs text-slate-400">{{ (selectedLead.events || []).length }} events</div>
                </div>

                <div v-if="(selectedLead.events || []).length" class="space-y-3">
                  <div v-for="ev in timelineSorted" :key="ev.at + ev.type" class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center text-sm bg-slate-50 border">
                      {{ eventIcon(ev.type) }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <div class="font-medium text-slate-900">{{ eventTitle(ev) }}</div>
                          <div class="text-xs text-slate-500">{{ ev.by?.name || ev.by || currentUser.name }} • {{ formatDateTime(ev.at) }}</div>
                        </div>
                       <div class="text-xs text-slate-400">
  <!-- Status change: show from -> to -->
  <div v-if="ev.type === 'status_change'">
    <div>{{ ev.metadata?.short || (ev.metadata?.from + ' → ' + ev.metadata?.to) }}</div>
    <div v-if="ev.reason" class="text-xs text-rose-600 italic">Reason: {{ ev.reason }}</div>
  </div>

  <!-- Priority or assign: same pattern -->
  <div v-else-if="['priority_change','assign'].includes(ev.type)">
    <div>{{ ev.metadata?.short || '' }}</div>
    <div v-if="ev.metadata?.from !== undefined">
      <small>From: {{ ev.metadata.from ?? '—' }} → To: {{ ev.metadata.to ?? '—' }}</small>
    </div>
  </div>

  <!-- Contact edits: list fields and their previous values -->
  <div v-else-if="ev.type === 'contact_edited'">
    <div>{{ ev.metadata?.short || 'Contact updated' }}</div>
    <div v-if="ev.metadata?.changes" class="mt-1">
      <div v-for="(chg, key) in ev.metadata.changes" :key="key" class="text-xs text-slate-500">
        {{ key }}: <strong>{{ chg.from ?? '—' }}</strong> → <strong>{{ chg.to ?? '—' }}</strong>
      </div>
    </div>
  </div>

  <!-- fallback -->
  <div v-else>
    {{ ev.metadata?.short || '' }}
  </div>
</div>

                      </div>
                      <div v-if="ev.note" class="mt-2 text-sm text-slate-700">{{ ev.note }}</div>
                      <div v-if="ev.reason" class="mt-1 text-xs text-rose-600 italic">Reason: {{ ev.reason }}</div>
                    </div>
                  </div>
                </div>

                <p v-else class="text-xs text-slate-400">No activity yet. Use "Add note" or "Log call" to start the timeline.</p>
              </div>

              <div class="border rounded-xl p-3 bg-slate-50 text-xs text-slate-500">
                <div class="font-medium text-slate-700 mb-2">Recent logs</div>
                <div v-if="logsForSelectedLead.length" class="space-y-2">
                  <div v-for="l in logsForSelectedLead" :key="l.at + l.type" class="flex items-start justify-between gap-2">
                    <div>
                      <div class="font-medium text-slate-900">{{ eventTitle(l) }}</div>
                      <div class="text-xs text-slate-500">{{ l.by?.name || l.by || currentUser.name }} • {{ formatDateTime(l.at) }}</div>
                      <div v-if="l.metadata?.short" class="text-xs text-slate-400 mt-1">{{ l.metadata.short }}</div>
                    </div>
                    <div class="text-xs text-slate-400">{{ l.type }}</div>
                  </div>
                </div>
                <p v-else class="text-xs text-slate-400">No logs yet.</p>
              </div>
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
              <input type="datetime-local" v-model="taskDue" class="w-full border rounded px-2 py-2" />
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

    <!-- MODAL: Bulk assign -->
    <transition name="fade">
      <div v-if="showBulkAssign" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-md bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Assign selected leads</h3>

          <label class="block text-xs text-slate-500 mb-1">Assign to</label>
          <select v-model="bulkAssignTo" class="w-full border rounded px-2 py-2 mb-4">
            <option :value="null">Unassigned</option>
            <option v-for="u in admins" :key="u.id" :value="u.id">{{ u.name }}</option>
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
          <select v-model="statusChange" class="w-full border rounded px-2 py-2 mb-3">
            <option v-for="s in statusOptions" :key="s.key" :value="s.key">{{ s.label }}</option>
          </select>

          <label class="block text-xs text-slate-500 mb-1">Reason (optional)</label>
          <textarea v-model="statusReason" rows="3" class="w-full border rounded p-2 mb-3"></textarea>

          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeStatusModal">Cancel</button>
            <button class="px-4 py-2 rounded bg-amber-600 text-white" @click="confirmChangeStatus">Save</button>
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
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Leads (CRM)'
})

const router = useRouter()

// ---- Current User (you can replace this with actual auth) ----
const currentUser = ref({
  id: 'admin-1',
  name: 'Juma Hassan',
  email: 'juma@example.com'
})

// ---- Task Status Options ----
const taskStatusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'done', label: 'Done' }
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

// Data
const leads = ref([])

const admins = ref([])

async function loadAdmins () {
  try {
    const data = await $fetch('/api/admins')
    // expected: [{ id, name, email, role }, ...]
    admins.value = (data || []).map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }))
  } catch (err) {
    console.error('Failed to load admins', err)
    admins.value = []
  }
}

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
  age: null,
  originCity: '',
  country: '',
  source: '',
  leadSourceDetail: ''
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
const showStatusModal = ref(false)
const statusChange = ref('new')
const statusReason = ref('')
const showPriorityModal = ref(false)
const priorityChange = ref('medium')
const priorityReason = ref('')
const isLoadingPatch = ref(false)
const isLoadingBulk = ref(false)

// Status options (expanded)
const statusOptions = [
  { key: 'new', label: 'New / Open — Not contacted' },
  { key: 'working', label: 'Working — Contacted / Attempting contact' },
  { key: 'qualified', label: 'Qualified' },
  { key: 'unqualified', label: 'Unqualified / Not converted' },
  { key: 'converted', label: 'Closed — Converted' }
]

// helper functions reused in UI

function lastStatusChangeReason (lead) {
  if (!lead || !Array.isArray(lead.events) || !lead.events.length) return ''
  // look from newest to oldest for a status_change
  const ev = (lead.events || []).slice().reverse().find(e => e.type === 'status_change')
  if (!ev) return ''
  // prefer explicit reason, then note, then metadata.short
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
    // Remove any non-digit characters
    editForm.value.phone = editForm.value.phone.replace(/\D/g, '')
    // Limit to 10 digits
    if (editForm.value.phone.length > 10) {
      editForm.value.phone = editForm.value.phone.substring(0, 10)
    }
  }
}

// Normalize/augment lead for UI
function normalizeLead (l) {
  const copy = { ...l }
  // ensure consistent ids and arrays
  copy._id = copy._id || copy.id
  copy.events = copy.events || []
  copy.attachments = copy.attachments || []
  copy.documents = copy.documents || copy.attachments || []
  copy.tasks = copy.tasks || []
  copy.assignedTo = copy.assignedTo || copy.assignedToId ? admins.value.find(a => a.id === copy.assignedToId) : copy.assignedTo || null
  copy.status = copy.status || 'new'
  copy.statusLabel = statusLabelFrom(copy.status)
  copy.priority = copy.priority || 'medium'
  copy.priorityLabel = priorityLabelFrom(copy.priority)
  copy.prettyDate = prettyDateFrom(copy.date || copy.travelDate)
  copy.nextFollowUpAt = copy.nextFollowUpAt || null
  
  // Normalize tasks
  if (copy.tasks) {
    copy.tasks = copy.tasks.map(task => ({
      ...task,
      status: task.status || 'open',
      createdBy: task.createdBy || currentUser.value.name,
      createdAt: task.createdAt || new Date().toISOString()
    }))
  }
  
  // contact fields
  copy.age = copy.age ?? null
  copy.originCity = copy.originCity || ''
  copy.country = copy.country || ''
  copy.source = copy.source || ''
  copy.leadSourceDetail = copy.leadSourceDetail || ''
  copy.phone = copy.phone || ''
  copy.countryCode = copy.countryCode || ''
  return copy
}

// load leads from API
async function loadLeads () {
  isLoading.value = true
  try {
    const data = await $fetch('/api/leads')
    leads.value = (data || []).map(normalizeLead)
  } catch (err) {
    console.error('Failed to load leads', err)
    leads.value = []
  } finally {
    isLoading.value = false
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
    .filter(e => e.type === 'note' && e.status !== 'deleted' && e.status !== 'archived') // hide deleted notes
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
    .map((call, index) => ({
      id: `call-${index}-${call.at}`,
      title: 'Call',
      summary: call.note,
      duration: call.durationMinutes || 0,
      outcome: call.outcome || '',
      status: call.status || 'completed',
      by: call.by || { name: currentUser.value.name },
      createdAt: call.at,
      updatedBy: call.updatedBy,
      updatedAt: call.updatedAt,
      ...call
    }))
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
  // ensure edit mode off
  isEditingLead.value = false
}

// close
function closeLeadDetails () {
  isDetailOpen.value = false
  selectedLead.value = null
  // clear editing
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
}

// start edit
function startEdit () {
  if (!selectedLead.value) return
  editForm.value = {
    name: selectedLead.value.name || '',
    email: selectedLead.value.email || '',
    phone: selectedLead.value.phone || '',
    countryCode: selectedLead.value.countryCode || '',
    age: selectedLead.value.age ?? null,
    originCity: selectedLead.value.originCity || '',
    country: selectedLead.value.country || '',
    source: selectedLead.value.source || '',
    leadSourceDetail: selectedLead.value.leadSourceDetail || ''
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
    age: null,
    originCity: '',
    country: '',
    source: '',
    leadSourceDetail: ''
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

  // Build patch body with new contact fields
  const patchBody = {
    name: editForm.value.name,
    email: editForm.value.email,
    phone: editForm.value.phone,
    countryCode: editForm.value.countryCode,
    age: editForm.value.age,
    originCity: editForm.value.originCity,
    country: editForm.value.country,
    source: editForm.value.source,
    leadSourceDetail: editForm.value.leadSourceDetail,
    updatedBy: currentUser.value.name
  }

  // Compute changes (previous -> next) for fields we care about
  const fields = ['name','email','phone','countryCode','age','originCity','country','source','leadSourceDetail']
  const changes = {}
  fields.forEach(f => {
    const prev = selectedLead.value[f] === undefined ? null : selectedLead.value[f]
    const next = patchBody[f] === undefined ? null : patchBody[f]
    // treat numbers vs strings carefully; convert to string for comparison
    if (String(prev ?? '') !== String(next ?? '')) {
      changes[f] = { from: prev, to: next }
    }
  })

  // If there are changes, create an event describing them
  if (Object.keys(changes).length) {
    const shortParts = Object.keys(changes).map(k => {
      const c = changes[k]
      return `${k}: ${c.from ?? '—'} → ${c.to ?? '—'}`
    }).slice(0,5) // limit length
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
    // include events in the patchBody so server persists the history
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


// COPY PUBLIC LINK
async function copyPublicLink () {
  if (!selectedLead.value || !selectedLead.value._id) return
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  const url = `${origin}/lead/${selectedLead.value._id}`
  try {
    await navigator.clipboard.writeText(url)
    alert('Public lead link copied to clipboard')
  } catch (err) {
    console.error('copy failed', err)
    alert('Failed to copy link')
  }
}

// navigation to build route
function goToBuild (lead) {
  const id = lead._id || lead.id
  if (!id) return
  router.push(`/admin/leads/${id}/build`)
}

// assign single lead (select dropdown)
async function assignLeadToSelected (adminId) {
  if (!selectedLead.value || !selectedLead.value._id) return
  const admin = admins.value.find(a => a.id === adminId) || null

  const prevAssigned = selectedLead.value.assignedTo?.name || null
  const nextAssigned = admin?.name || null

  // update local UI
  selectedLead.value.assignedTo = admin
  selectedLead.value.assignedToId = adminId

  // create assign event
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
      assignedTo: selectedLead.value.assignedTo, // optional, server may ignore
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('assign failed', err)
    alert('Failed to assign lead')
    await loadLeads()
  }
}


// bulk assign
function openBulkAssignModal () {
  showBulkAssign.value = true
}
function closeBulkAssignModal () {
  showBulkAssign.value = false
  bulkAssignTo.value = null
}
async function performBulkAssign () {
  if (!bulkAssignTo.value || !selectedIds.value.length) return
  isLoadingBulk.value = true
  try {
    for (const id of selectedIds.value) {
      const lead = leads.value.find(l => (l._id || l.id) === id)
      if (!lead) continue
      lead.assignedToId = bulkAssignTo.value
      lead.assignedTo = admins.value.find(a => a.id === bulkAssignTo.value) || null
      await patchLead(lead._id, { 
        assignedToId: bulkAssignTo.value,
        updatedBy: currentUser.value.name
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

// NEXT FOLLOW-UP
function dateTimeLocalValue (iso) {
  try {
    const d = new Date(iso)
    const pad = (n) => String(n).padStart(2, '0')
    const y = d.getFullYear()
    const m = pad(d.getMonth() + 1)
    const day = pad(d.getDate())
    const hh = pad(d.getHours())
    const mm = pad(d.getMinutes())
    return `${y}-${m}-${day}T${hh}:${mm}`
  } catch {
    return ''
  }
}

async function setNextFollowUp () {
  if (!selectedLead.value) return
  if (!followUpInput.value) {
    alert('Pick date & time')
    return
  }
  const iso = new Date(followUpInput.value).toISOString()
  selectedLead.value.nextFollowUpAt = iso
  try {
    await patchLead(selectedLead.value._id, { 
      nextFollowUpAt: iso,
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('patch followup failed', err)
  }
}

async function clearFollowUp () {
  if (!selectedLead.value) return
  selectedLead.value.nextFollowUpAt = null
  try {
    await patchLead(selectedLead.value._id, { 
      nextFollowUpAt: null,
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('clear followup failed', err)
  }
}

// NOTES
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

async function addNote () {
  if (!selectedLead.value || !noteText.value.trim()) return
  const note = noteText.value.trim()
  const ev = {
    type: 'note',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note,
    status: 'active',
    metadata: { short: note.slice(0, 80) }
  }
  // Add to local state
  selectedLead.value.events = selectedLead.value.events || []
  selectedLead.value.events.push(ev)
  closeAddNote()
  try {
    // Send the updated events array
    await patchLead(selectedLead.value._id, { 
      events: selectedLead.value.events, // Send ALL events
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('failed to persist note', err)
  }
}

async function saveEditedNote () {
  if (!selectedLead.value || !editingNote.value || !editNoteText.value.trim()) return
  
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'note' && e.at === editingNote.value.at
  )
  
  if (index !== -1) {
    events[index].note = editNoteText.value.trim()
    events[index].updatedBy = currentUser.value.name
    events[index].updatedAt = new Date().toISOString()
    
    // Send the updated events array
    try {
      await patchLead(selectedLead.value._id, { 
        events: events, // Send ALL events
        updatedBy: currentUser.value.name
      })
    } catch (err) {
      console.error('Failed to update note', err)
    }
  }
  
  closeEditNote()
}

// LOG CALL
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
  editingCall.value = call
  editCallNote.value = call.summary
  editCallDuration.value = call.duration
  editCallOutcome.value = call.outcome
  showEditCall.value = true
}
function closeEditCall () {
  showEditCall.value = false
  editingCall.value = null
  editCallNote.value = ''
  editCallDuration.value = 0
  editCallOutcome.value = ''
}

async function saveLogCall () {
  if (!selectedLead.value) return
  const ev = {
    type: 'call',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: callNote.value || '',
    status: 'completed',
    metadata: { 
      short: (callOutcome.value || '') + (callDuration.value ? ` • ${callDuration.value}m` : '')
    },
    durationMinutes: callDuration.value || 0,
    outcome: callOutcome.value || ''
  }
  // Add to local state
  selectedLead.value.events = selectedLead.value.events || []
  selectedLead.value.events.push(ev)
  closeLogCall()
  try {
    // Send the updated events array
    await patchLead(selectedLead.value._id, { 
      events: selectedLead.value.events, // Send ALL events
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('failed to persist call', err)
  }
}

async function saveEditedCall () {
  if (!selectedLead.value || !editingCall.value) return
  
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'call' && e.at === editingCall.value.at
  )
  
  if (index !== -1) {
    events[index].note = editCallNote.value.trim()
    events[index].durationMinutes = editCallDuration.value
    events[index].outcome = editCallOutcome.value
    events[index].updatedBy = currentUser.value.name
    events[index].updatedAt = new Date().toISOString()
    
    // Send the updated events array
    try {
      await patchLead(selectedLead.value._id, { 
        events: events, // Send ALL events
        updatedBy: currentUser.value.name
      })
    } catch (err) {
      console.error('Failed to update call', err)
    }
  }
  
  closeEditCall()
}

// TASKS
function openCreateTaskModal () {
  taskTitle.value = ''
  taskDue.value = ''
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

async function createTask () {
  if (!selectedLead.value || !taskTitle.value.trim()) return
  const t = {
    id: 'task-' + Math.random().toString(36).slice(2, 9),
    title: taskTitle.value.trim(),
    due: taskDue.value ? new Date(taskDue.value).toISOString() : null,
    note: taskNote.value,
    status: taskStatus.value,
    createdAt: new Date().toISOString(),
    createdBy: currentUser.value.name
  }
  selectedLead.value.tasks = selectedLead.value.tasks || []
  selectedLead.value.tasks.push(t)
  closeCreateTask()
  try {
    // Send the updated tasks array
    await patchLead(selectedLead.value._id, { 
      tasks: selectedLead.value.tasks, // Send ALL tasks
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('failed to persist task', err)
  }
}

async function saveEditedTask () {
  if (!selectedLead.value || !editingTask.value || !editTaskTitle.value.trim()) return
  
  const taskIndex = selectedLead.value.tasks.findIndex(t => t.id === editingTask.value.id)
  if (taskIndex !== -1) {
    selectedLead.value.tasks[taskIndex].title = editTaskTitle.value.trim()
    selectedLead.value.tasks[taskIndex].due = editTaskDue.value ? new Date(editTaskDue.value).toISOString() : null
    selectedLead.value.tasks[taskIndex].note = editTaskNote.value
    selectedLead.value.tasks[taskIndex].status = editTaskStatus.value
    selectedLead.value.tasks[taskIndex].updatedBy = currentUser.value.name
    selectedLead.value.tasks[taskIndex].updatedAt = new Date().toISOString()
    
    try {
      // Send the updated tasks array
      await patchLead(selectedLead.value._id, { 
        tasks: selectedLead.value.tasks, // Send ALL tasks
        updatedBy: currentUser.value.name
      })
    } catch (err) {
      console.error('Failed to update task', err)
    }
  }
  
  closeEditTask()
}

// Update functions for tasks, notes, and calls
async function updateTaskStatus(task) {
  const prev = task.prevStatus || null // if you stored prev status earlier; else we'll compute
  const idx = selectedLead.value.tasks.findIndex(t => t.id === task.id)
  const newStatus = task.status
  if (idx !== -1) {
    const before = selectedLead.value.tasks[idx].status || null
    selectedLead.value.tasks[idx].updatedBy = currentUser.value.name
    selectedLead.value.tasks[idx].updatedAt = new Date().toISOString()
    // Build event describing the change
    const ev = {
      type: 'task_status_changed',
      at: new Date().toISOString(),
      by: { name: currentUser.value.name },
      metadata: {
        short: `Task "${task.title}" ${before} → ${newStatus}`,
        taskId: task.id,
        changes: { status: { from: before, to: newStatus } }
      }
    }
    selectedLead.value.events = selectedLead.value.events || []
    selectedLead.value.events.push(ev)
    try {
      await patchLead(selectedLead.value._id, { 
        tasks: selectedLead.value.tasks,
        events: selectedLead.value.events,
        updatedBy: currentUser.value.name
      })
    } catch (err) {
      console.error('Failed to update task', err)
      await loadLeads()
    }
  }
}


async function updateNoteStatus(note) {
  // Find and update the note in events
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'note' && e.at === note.at
  )
  if (index !== -1) {
    events[index].status = note.status
    events[index].updatedBy = currentUser.value.name
    events[index].updatedAt = new Date().toISOString()
    try {
      // Send the updated events array
      await patchLead(selectedLead.value._id, { 
        events: events, // Send ALL events
        updatedBy: currentUser.value.name
      })
    } catch (err) {
      console.error('Failed to update note', err)
    }
  }
}

async function updateCallStatus(call) {
  // Find and update the call in events
  const events = selectedLead.value.events || []
  const index = events.findIndex(e => 
    e.type === 'call' && e.at === call.at
  )
  if (index !== -1) {
    events[index].status = call.status
    events[index].updatedBy = currentUser.value.name
    events[index].updatedAt = new Date().toISOString()
    try {
      // Send the updated events array
      await patchLead(selectedLead.value._id, { 
        events: events, // Send ALL events
        updatedBy: currentUser.value.name
      })
    } catch (err) {
      console.error('Failed to update call', err)
    }
  }
}

async function deleteTask(task) {
  if (!confirm('Delete this task?')) return
  
  selectedLead.value.tasks = selectedLead.value.tasks.filter(t => t.id !== task.id)
  
  try {
    // Send the updated tasks array
    await patchLead(selectedLead.value._id, { 
      tasks: selectedLead.value.tasks, // Send ALL tasks
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('Failed to delete task', err)
  }
}

async function deleteNote(note) {
  if (!confirm('Delete this note?')) return
  if (!selectedLead.value) return

  // defensive copy of events
  const events = Array.isArray(selectedLead.value.events) ? [...selectedLead.value.events] : []

  // mark the original note as deleted (if found)
  const index = events.findIndex(e => e.type === 'note' && e.at === note.at)
  if (index !== -1) {
    events[index] = {
      ...events[index],
      status: 'deleted',
      updatedBy: currentUser.value.name,
      updatedAt: new Date().toISOString()
    }
  }

  // Add a deletion marker event so timeline keeps record
  const delEv = {
    type: 'note_deleted',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    metadata: { short: 'Note deleted' },
    originalAt: note.at // helpful reference to link back to original note
  }

  // Append the deletion event
  const newEvents = events.concat([delEv])
  selectedLead.value.events = newEvents

  try {
    // send the whole events array so server persists both the deleted flag and the deletion marker
    await patchLead(selectedLead.value._id, {
      events: newEvents,
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('Failed to delete note', err)
    alert('Failed to delete note. Please try again.')
    // reload to revert local changes
    await loadLeads()
    const found = leads.value.find(l => (l._id || l.id) === (selectedLead.value?._id || selectedLead.value?.id))
    if (found) selectedLead.value = found
  }
}



async function deleteCall(call) {
  if (!confirm('Delete this call?')) return
  
  const events = selectedLead.value.events || []
  const filteredEvents = events.filter(e => 
    !(e.type === 'call' && e.at === call.at)
  )
  selectedLead.value.events = filteredEvents
  
  try {
    // Send the filtered events array
    await patchLead(selectedLead.value._id, { 
      events: filteredEvents, // Send filtered events
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('Failed to delete call', err)
  }
}

// STATUS change
function openStatusModal (lead = null) {
  if (lead) openLeadDetails(lead)
  // prefill status selector from current lead
  statusChange.value = selectedLead.value?.status || 'new'
  // prefill reason from last status_change event (makes old reason visible)
  statusReason.value = lastStatusChangeReason(selectedLead.value) || ''
  showStatusModal.value = true
}


function closeStatusModal () {
  showStatusModal.value = false
}
async function confirmChangeStatus () {
  if (!selectedLead.value) return

  // previous status
  const prevStatus = selectedLead.value.status || null

  // find last status_change event to get previous reason (if any)
  const lastStatusEv = (selectedLead.value.events || []).slice().reverse().find(e => e.type === 'status_change')

  // safer fallback chain — avoid mixing ?? with || (caused your compile error)
  // prefer lastStatusEv.reason, then lastStatusEv.note, then selectedLead.value.reason, else empty string
  const prevReason = lastStatusEv?.reason ?? lastStatusEv?.note ?? selectedLead.value?.reason ?? ''

  // new values from modal
  const newStatus = statusChange.value
  const newReason = (statusReason.value || '').trim()

  // optimistic UI update
  selectedLead.value.status = newStatus
  selectedLead.value.statusLabel = statusLabelFrom(newStatus)

  // build event recording both old and new values
  const ev = {
    type: 'status_change',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: newReason || '',      // short note retained for compatibility
    reason: newReason || '',    // explicit reason field
    metadata: {
      short: `Status ${prevStatus || '—'} → ${newStatus}`,
      from: prevStatus,
      to: newStatus,
      // store fine-grained changes including previous/new reason
      changes: {
        status: { from: prevStatus, to: newStatus },
        reason: { from: prevReason || null, to: newReason || null }
      }
    }
  }

  // append to local events array
  selectedLead.value.events = selectedLead.value.events || []
  selectedLead.value.events.push(ev)

  // close UI modal
  closeStatusModal()

  // PATCH to server — include events so server persists the audit trail
  try {
    await patchLead(selectedLead.value._id, {
      status: newStatus,
      reason: newReason || '',
      note: newReason || '',           // keep compatibility if backend expects note
      events: selectedLead.value.events,
      updatedBy: currentUser.value.name
    })
  } catch (err) {
    console.error('status patch failed', err)
    alert('Failed to save status change — reloading data.')
    // revert / reload from server to keep consistent
    await loadLeads()
  }
}




// PRIORITY change
function openPriorityModal () {
  priorityChange.value = selectedLead.value?.priority || 'medium'
  priorityReason.value = ''
  showPriorityModal.value = true
}
function closePriorityModal () {
  showPriorityModal.value = false
}
async function confirmChangePriority () {
  if (!selectedLead.value) return
  const prev = selectedLead.value.priority || null
  const next = priorityChange.value
  selectedLead.value.priority = next
  selectedLead.value.priorityLabel = priorityLabelFrom(next)
  selectedLead.value.priorityUpdatedBy = currentUser.value.name
  selectedLead.value.priorityUpdatedAt = new Date().toISOString()

  // Build event with from/to
  const ev = {
    type: 'priority_change',
    at: new Date().toISOString(),
    by: { name: currentUser.value.name },
    note: priorityReason.value || '',
    metadata: {
      short: `Priority ${prev || 'Not set'} → ${next}`,
      from: prev,
      to: next,
      changes: { priority: { from: prev, to: next } }
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
  return e.type
}

// filter logs to meaningful items (notes, calls, status changes, contact edits, tasks)
const logsForSelectedLead = computed(() => {
  if (!selectedLead.value) return []
  const events = selectedLead.value.events || []
  return events
    .filter(e => [
      'note', 'note_updated', 'note_deleted',
      'call', 'call_updated', 'call_deleted',
      'status_change', 'followup_set', 'followup_cleared',
      'contact_edited', 'task_created', 'task_updated', 'task_deleted',
      'priority_change', 'assign'
    ].includes(e.type))
    .slice()
    .sort((a, b) => new Date(b.at) - new Date(a.at))
})


function eventIcon (type) {
  if (type === 'note' || type === 'note_updated') return '✍️'
  if (type === 'note_deleted') return '🗑️'
  if (type === 'call' || type === 'call_updated') return '📞'
  if (type === 'call_deleted') return '🗑️'
  if (type === 'task_created' || type === 'task_updated' || type === 'task_status_changed') return '🗒️'
  if (type === 'task_deleted') return '🗑️'
  if (type === 'status_change') return '🔁'
  if (type === 'followup_set') return '⏰'
  if (type === 'followup_cleared') return '⌛'
  if (type === 'contact_edited') return '✏️'
  if (type === 'priority_change') return '🎯'
  if (type === 'assign') return '👤'
  return '•'
}
function eventTitle (ev) {
  if (ev.type === 'note') return 'Note added'
  if (ev.type === 'note_updated') return 'Note updated'
  if (ev.type === 'note_deleted') return 'Note deleted'
  if (ev.type === 'call') return 'Call logged'
  if (ev.type === 'call_updated') return 'Call updated'
  if (ev.type === 'call_deleted') return 'Call deleted'
  if (ev.type === 'task_created') return 'Task created'
  if (ev.type === 'task_updated') return 'Task updated'
  if (ev.type === 'task_deleted') return 'Task deleted'
  if (ev.type === 'task_status_changed') return 'Task status changed'
  if (ev.type === 'status_change') return 'Status changed'
  if (ev.type === 'followup_set') return 'Follow-up set'
  if (ev.type === 'followup_cleared') return 'Follow-up cleared'
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
  if (status === 'converted') return 'bg-indigo-50 text-indigo-700'
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
  if (s === 'converted') return '✅'
  if (s === 'unqualified') return '❌'
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

// PATCH helper to update single lead on server
async function patchLead (id, patchBody) {
  if (!id) throw new Error('missing id')
  try {
    const updated = await $fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      body: patchBody
    })
    const idx = leads.value.findIndex(l => (l._id || l.id) === (updated._id || updated.id))
    if (idx !== -1) {
      leads.value[idx] = normalizeLead(updated)
      if (selectedLead.value && (selectedLead.value._id || selectedLead.value.id) === (updated._id || updated.id)) {
        selectedLead.value = leads.value[idx]
      }
    }
    return updated
  } catch (err) {
    throw err
  }
}

// copy link helper
async function copyLinkToClipboard (lead) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  const url = `${origin}/lead/${lead._id}`
  try {
    await navigator.clipboard.writeText(url)
    alert('Link copied')
  } catch {
    alert('Copy failed')
  }
}

// convenience: open status modal for a lead quickly
function openStatusChangeFor (lead) {
  openLeadDetails(lead)
  openStatusModal()
}

// convert placeholder
function handleConvert (lead) {
  // you may want to enforce convert only when qualified:
  if (lead && lead.status !== 'qualified') {
    if (!confirm('Lead is not "Qualified". Are you sure you want to convert?')) return
  }
  goToBuild(lead)
}

// format datetime
function formatDateTime (value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}

// helper for last event summary used above
onMounted(() => {
  loadLeads()
  loadAdmins()
})
</script>


<style scoped>
.fade-enter-active,.fade-leave-active{transition:all .15s ease}
.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-4px)}

/* Simple button styles (keeps visual consistency without relying on @apply) */
.btn-primary {
  background-color: #059669;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}
.btn-primary:hover { opacity: 0.95; }

.btn-secondary {
  background-color: #ffffff;
  border: 1px solid rgba(15,23,42,0.06);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}
</style>
