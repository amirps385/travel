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

        <select v-model="leadSort" class="border rounded-lg px-3 py-2 text-sm">
          <option value="createdDesc">Newest</option>
          <option value="createdAsc">Oldest</option>
          <option value="priorityDesc">Priority</option>
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
              <td colspan="7" class="p-6 text-center text-xs text-slate-500">
                No leads found
              </td>
            </tr>

            <tr v-if="isLoading">
              <td colspan="7" class="p-6 text-center text-xs text-slate-500">
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
                      <input v-model="editForm.phone" placeholder="Phone" class="border rounded px-2 py-1 text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-3 flex flex-wrap gap-2 items-center">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border text-sm">
                  <span class="text-xs text-slate-500">Source</span>
                  <strong class="ml-2">{{ selectedLead.leadSourceDetail || selectedLead.source || 'form' }}</strong>
                </div>

                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" :class="scoreBadgeClass(selectedLead.score)">
                  <strong class="text-sm">{{ selectedLead.score ?? 0 }}</strong>
                  <span class="text-xs text-slate-700">Score</span>
                </div>

                <div v-if="selectedLead.priority" class="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium">
                  {{ selectedLead.priority }}
                </div>

                <div v-if="selectedLead.assignedTo?.name" class="px-3 py-1.5 rounded-lg bg-slate-50 text-sm font-medium border">
                  Owner: {{ selectedLead.assignedTo.name }}
                </div>
              </div>
            </div>

            <div class="flex-shrink-0 flex items-center gap-2">
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
            <div class="p-4 rounded-xl bg-gradient-to-r from-white to-slate-50 border flex items-center justify-between">
              <div>
                <div class="text-xs text-slate-500">Status</div>
                <div class="mt-1 text-lg font-semibold">{{ statusLabelFrom(selectedLead.status) }}</div>
                <div class="text-xs text-slate-400 mt-1">Updated: {{ formatDateTime(lastEventAt(selectedLead)) }}</div>
              </div>
              <div class="text-3xl">{{ statusIcon(selectedLead.status) }}</div>
            </div>

            <div class="p-4 rounded-xl bg-gradient-to-r from-white to-slate-50 border">
              <div class="text-xs text-slate-500">Next follow-up</div>
              <div class="mt-1 text-lg font-semibold">{{ selectedLead.nextFollowUpAt ? formatDateTime(selectedLead.nextFollowUpAt) : 'Not set' }}</div>
              <div class="mt-2 text-xs text-slate-400">Set or schedule a follow-up below</div>
            </div>

            <div class="p-4 rounded-xl bg-gradient-to-r from-white to-slate-50 border">
              <div class="text-xs text-slate-500">Last activity</div>
              <div class="mt-1 text-lg font-semibold">{{ lastEventSummary(selectedLead) }}</div>
              <div class="mt-2 text-xs text-slate-400">Events: {{ (selectedLead.events || []).length }}</div>
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
                      <input v-model="editForm.email" class="w-full border rounded px-2 py-1" />
                    </div>
                    <div class="flex gap-2">
                      <div class="w-28">
                        <label class="block text-xs text-slate-500 mb-1">Code</label>
                        <input v-model="editForm.countryCode" placeholder="+255" class="w-full border rounded px-2 py-1" />
                      </div>
                      <div class="flex-1">
                        <label class="block text-xs text-slate-500 mb-1">Phone</label>
                        <input v-model="editForm.phone" class="w-full border rounded px-2 py-1" />
                      </div>
                    </div>
                    <div>
                      <label class="block text-xs text-slate-500 mb-1">Age</label>
                      <input type="number" v-model.number="editForm.age" class="w-full border rounded px-2 py-1" />
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
                <h3 class="text-xs font-semibold text-slate-500 mb-2">Tasks</h3>
                <div v-if="tasksForSelectedLead.length" class="space-y-2">
                  <div v-for="t in tasksForSelectedLead" :key="t.id" class="flex items-start justify-between gap-3 bg-white p-3 rounded-lg border">
                    <div class="flex-1">
                      <div class="font-medium text-slate-900">{{ t.title }}</div>
                      <div class="text-xs text-slate-500">{{ formatDateTime(t.due) }}</div>
                      <div v-if="t.note" class="text-xs text-slate-400 mt-1">{{ t.note }}</div>
                    </div>
                    <div class="text-right">
                      <select 
                        v-model="t.completed" 
                        @change="updateTaskStatus(t)"
                        class="text-xs border rounded px-2 py-1"
                      >
                        <option :value="false">Open</option>
                        <option :value="true">Completed</option>
                      </select>
                      <div class="text-xs text-slate-500 mt-2">
                        {{ formatDateTime(t.createdAt) }}
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else class="text-xs text-slate-400">No tasks yet for this lead.</p>
              </div>

              <!-- Notes -->
              <div class="border rounded-xl p-4 bg-slate-50/60">
                <h3 class="text-xs font-semibold text-slate-500 mb-2">Notes</h3>
                <div v-if="notesForSelectedLead.length" class="space-y-2">
                  <div v-for="note in notesForSelectedLead" :key="note.id" class="flex items-start justify-between gap-3 bg-white p-3 rounded-lg border">
                    <div class="flex-1">
                      <div class="font-medium text-slate-900">{{ note.title || 'Note' }}</div>
                      <div class="text-sm text-slate-700 mt-1">{{ note.content }}</div>
                      <div class="text-xs text-slate-500 mt-2">{{ formatDateTime(note.createdAt) }}</div>
                    </div>
                    <div class="text-right">
                      <select 
                        v-model="note.status" 
                        @change="updateNoteStatus(note)"
                        class="text-xs border rounded px-2 py-1"
                      >
                        <option value="active">Active</option>
                        <option value="archived">Archived</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button 
                        class="text-xs text-rose-600 mt-2 block"
                        @click="deleteNote(note)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <p v-else class="text-xs text-slate-400">No notes yet for this lead.</p>
              </div>

              <!-- Calls -->
              <div class="border rounded-xl p-4 bg-slate-50/60">
                <h3 class="text-xs font-semibold text-slate-500 mb-2">Calls</h3>
                <div v-if="callsForSelectedLead.length" class="space-y-2">
                  <div v-for="call in callsForSelectedLead" :key="call.id" class="flex items-start justify-between gap-3 bg-white p-3 rounded-lg border">
                    <div class="flex-1">
                      <div class="font-medium text-slate-900">{{ call.title || 'Call' }}</div>
                      <div class="text-sm text-slate-700 mt-1">{{ call.summary }}</div>
                      <div class="flex gap-3 mt-2">
                        <span class="text-xs text-slate-500">Duration: {{ call.duration }}m</span>
                        <span class="text-xs text-slate-500">Outcome: {{ call.outcome }}</span>
                      </div>
                      <div class="text-xs text-slate-500 mt-1">{{ formatDateTime(call.createdAt) }}</div>
                    </div>
                    <div class="text-right">
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
                      <button 
                        class="text-xs text-rose-600 mt-2 block"
                        @click="deleteCall(call)"
                      >
                        Delete
                      </button>
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
                          <div class="text-xs text-slate-500">{{ ev.by?.name || ev.by || 'System' }} • {{ formatDateTime(ev.at) }}</div>
                        </div>
                        <div class="text-xs text-slate-400">{{ ev.metadata?.short || '' }}</div>
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
                      <div class="text-xs text-slate-500">{{ l.by?.name || l.by || 'System' }} • {{ formatDateTime(l.at) }}</div>
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
          <textarea v-model="noteText" rows="6" class="w-full border rounded p-3"></textarea>
          <div class="mt-4 flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeAddNote">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="addNote" :disabled="!noteText.trim()">Save note</button>
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
          <textarea v-model="callNote" rows="4" class="w-full border rounded p-3"></textarea>

          <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-slate-500 mb-1">Duration (mins)</label>
              <input type="number" v-model.number="callDuration" class="w-full border rounded px-2 py-1" />
            </div>
            <div>
              <label class="block text-xs text-slate-500 mb-1">Outcome</label>
              <select v-model="callOutcome" class="w-full border rounded px-2 py-1">
                <option value="">Select</option>
                <option value="interested">Interested</option>
                <option value="not-interested">Not interested</option>
                <option value="follow-up">Needs follow-up</option>
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

    <!-- MODALS: Create Task -->
    <transition name="fade">
      <div v-if="showCreateTask" class="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
        <div class="w-full max-w-2xl bg-white rounded-2xl p-6">
          <h3 class="text-lg font-semibold mb-3">Create task</h3>

          <label class="block text-xs text-slate-500 mb-1">Title</label>
          <input v-model="taskTitle" class="w-full border rounded px-2 py-2 mb-3" />

          <label class="block text-xs text-slate-500 mb-1">Due</label>
          <input type="datetime-local" v-model="taskDue" class="w-full border rounded px-2 py-2 mb-3" />

          <label class="block text-xs text-slate-500 mb-1">Notes (optional)</label>
          <textarea v-model="taskNote" rows="3" class="w-full border rounded p-2"></textarea>

          <div class="mt-4 flex justify-end gap-2">
            <button class="px-4 py-2 rounded border" @click="closeCreateTask">Cancel</button>
            <button class="px-4 py-2 rounded bg-emerald-600 text-white" @click="createTask" :disabled="!taskTitle.trim()">Create</button>
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

// Admins (placeholder) — replace with API if you have user admin list
const admins = ref([
  { id: 'admin-1', name: 'Juma Hassan' },
  { id: 'admin-2', name: 'Sarah Mwamba' }
])

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
const showLogCall = ref(false)
const callNote = ref('')
const callDuration = ref(0)
const callOutcome = ref('')
const showCreateTask = ref(false)
const taskTitle = ref('')
const taskDue = ref('')
const taskNote = ref('')
const showBulkAssign = ref(false)
const bulkAssignTo = ref(null)
const showStatusModal = ref(false)
const statusChange = ref('new')
const statusReason = ref('')
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
function statusLabelFrom (s) {
  const found = statusOptions.find(x => x.key === s)
  return found ? found.label : 'New'
}

function prettyDateFrom (d) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString()
  } catch {
    return d
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
  copy.prettyDate = prettyDateFrom(copy.date || copy.travelDate)
  copy.nextFollowUpAt = copy.nextFollowUpAt || null
  copy.score = copy.score ?? 0
  copy.priority = copy.priority || null
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
    arr.sort((a, b) => (b.priorityScore || b.score || 0) - (a.priorityScore || a.score || 0))
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
    .filter(e => e.type === 'note')
    .map((note, index) => ({
      id: `note-${index}-${note.at}`,
      title: 'Note',
      content: note.note,
      status: note.status || 'active',
      createdAt: note.at,
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
      createdAt: call.at,
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
  showCreateTask.value = false
  showLogCall.value = false
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
  isSavingContact.value = true
  const id = selectedLead.value._id
  const patchBody = {
    name: editForm.value.name,
    email: editForm.value.email,
    phone: editForm.value.phone,
    countryCode: editForm.value.countryCode,
    age: editForm.value.age,
    originCity: editForm.value.originCity,
    country: editForm.value.country,
    source: editForm.value.source,
    leadSourceDetail: editForm.value.leadSourceDetail
  }

  try {
    const updated = await patchLead(id, patchBody)
    pushEvent(normalizeLead(updated), {
      type: 'contact_edited',
      at: new Date().toISOString(),
      by: { name: 'Admin' },
      metadata: { short: 'Contact details updated' }
    })
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
  selectedLead.value.assignedTo = admin
  selectedLead.value.assignedToId = adminId
  pushEvent(selectedLead.value, {
    type: 'assign',
    at: new Date().toISOString(),
    by: { name: 'Admin' },
    metadata: { short: admin ? `Assigned to ${admin.name}` : 'Unassigned' }
  })
  try {
    await patchLead(selectedLead.value._id, { assignedToId: adminId })
  } catch (err) {
    console.error('assign failed', err)
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
      pushEvent(lead, {
        type: 'assign',
        at: new Date().toISOString(),
        by: { name: 'Bulk assign' },
        metadata: { short: `Assigned to ${lead.assignedTo?.name || '—'}` }
      })
      await patchLead(lead._id, { assignedToId: bulkAssignTo.value }).catch(e => {
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
  pushEvent(selectedLead.value, {
    type: 'followup_set',
    at: iso,
    by: { name: 'Admin' },
    metadata: { short: `Follow-up set ${formatDateTime(iso)}` }
  })
  try {
    await patchLead(selectedLead.value._id, { nextFollowUpAt: iso })
  } catch (err) {
    console.error('patch followup failed', err)
  }
}

async function clearFollowUp () {
  if (!selectedLead.value) return
  selectedLead.value.nextFollowUpAt = null
  pushEvent(selectedLead.value, {
    type: 'followup_cleared',
    at: new Date().toISOString(),
    by: { name: 'Admin' },
    metadata: { short: 'Follow-up cleared' }
  })
  try {
    await patchLead(selectedLead.value._id, { nextFollowUpAt: null })
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
async function addNote () {
  if (!selectedLead.value || !noteText.value.trim()) return
  const note = noteText.value.trim()
  const ev = {
    type: 'note',
    at: new Date().toISOString(),
    by: { name: 'Admin' },
    note,
    status: 'active',
    metadata: { short: note.slice(0, 80) }
  }
  pushEvent(selectedLead.value, ev)
  closeAddNote()
  try {
    await patchLead(selectedLead.value._id, { 
      events: selectedLead.value.events 
    })
  } catch (err) {
    console.error('failed to persist note', err)
  }
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
async function saveLogCall () {
  if (!selectedLead.value) return
  const ev = {
    type: 'call',
    at: new Date().toISOString(),
    by: { name: 'Admin' },
    note: callNote.value || '',
    status: 'completed',
    metadata: { 
      short: (callOutcome.value || '') + (callDuration.value ? ` • ${callDuration.value}m` : '')
    },
    durationMinutes: callDuration.value || 0,
    outcome: callOutcome.value || ''
  }
  pushEvent(selectedLead.value, ev)
  closeLogCall()
  try {
    await patchLead(selectedLead.value._id, { 
      events: selectedLead.value.events 
    })
  } catch (err) {
    console.error('failed to persist call', err)
  }
}

// TASKS
function openCreateTaskModal () {
  taskTitle.value = ''
  taskDue.value = ''
  taskNote.value = ''
  showCreateTask.value = true
}
function closeCreateTask () {
  showCreateTask.value = false
}
async function createTask () {
  if (!selectedLead.value || !taskTitle.value.trim()) return
  const t = {
    id: 'task-' + Math.random().toString(36).slice(2, 9),
    title: taskTitle.value.trim(),
    due: taskDue.value ? new Date(taskDue.value).toISOString() : null,
    note: taskNote.value,
    completed: false,
    createdAt: new Date().toISOString()
  }
  selectedLead.value.tasks = selectedLead.value.tasks || []
  selectedLead.value.tasks.push(t)
  pushEvent(selectedLead.value, {
    type: 'task_created',
    at: new Date().toISOString(),
    by: { name: 'Admin' },
    metadata: { short: t.title }
  })
  closeCreateTask()
  try {
    await patchLead(selectedLead.value._id, { 
      tasks: selectedLead.value.tasks, 
      events: selectedLead.value.events 
    })
  } catch (err) {
    console.error('failed to persist task', err)
  }
}

// Update functions for tasks, notes, and calls
async function updateTaskStatus(task) {
  try {
    await patchLead(selectedLead.value._id, { 
      tasks: selectedLead.value.tasks 
    })
  } catch (err) {
    console.error('Failed to update task', err)
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
    try {
      await patchLead(selectedLead.value._id, { events })
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
    try {
      await patchLead(selectedLead.value._id, { events })
    } catch (err) {
      console.error('Failed to update call', err)
    }
  }
}

async function deleteNote(note) {
  if (!confirm('Delete this note?')) return
  
  const events = selectedLead.value.events || []
  const filteredEvents = events.filter(e => 
    !(e.type === 'note' && e.at === note.at)
  )
  selectedLead.value.events = filteredEvents
  
  try {
    await patchLead(selectedLead.value._id, { events: filteredEvents })
  } catch (err) {
    console.error('Failed to delete note', err)
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
    await patchLead(selectedLead.value._id, { events: filteredEvents })
  } catch (err) {
    console.error('Failed to delete call', err)
  }
}

function toggleTaskComplete (t) {
  t.completed = !t.completed
  pushEvent(selectedLead.value, {
    type: t.completed ? 'task_completed' : 'task_reopened',
    at: new Date().toISOString(),
    by: { name: 'Admin' },
    metadata: { short: t.title }
  })
  patchLead(selectedLead.value._id, { tasks: selectedLead.value.tasks }).catch(e => console.error(e))
}

// STATUS change
function openStatusModal (lead = null) {
  if (lead) openLeadDetails(lead)
  statusChange.value = selectedLead.value?.status || 'new'
  statusReason.value = ''
  showStatusModal.value = true
}
function closeStatusModal () {
  showStatusModal.value = false
}
async function confirmChangeStatus () {
  if (!selectedLead.value) return
  const prev = selectedLead.value.status
  selectedLead.value.status = statusChange.value
  selectedLead.value.statusLabel = statusLabelFrom(statusChange.value)
  pushEvent(selectedLead.value, {
    type: 'status_change',
    at: new Date().toISOString(),
    by: { name: 'Admin' },
    note: statusReason.value || '',
    reason: statusReason.value || '',
    metadata: { short: `Status ${prev} → ${statusChange.value}` }
  })
  closeStatusModal()
  try {
    await patchLead(selectedLead.value._id, { status: statusChange.value, events: selectedLead.value.events })
  } catch (err) {
    console.error('status patch failed', err)
    alert('Failed to save status change')
  }
}

// UTILS for events / timeline
function pushEvent (lead, ev) {
  lead.events = lead.events || []
  lead.events.push(ev)
  const idx = leads.value.findIndex(l => (l._id || l.id) === (lead._id || lead.id))
  if (idx !== -1) leads.value[idx] = lead
}

const timelineSorted = computed(() => {
  if (!selectedLead.value) return []
  return (selectedLead.value.events || []).slice().sort((a, b) => new Date(b.at) - new Date(a.at))
})

function lastEventAt (lead) {
  if (!lead || !lead.events || !lead.events.length) return null
  return lead.events[lead.events.length - 1].at
}
function lastEventSummary (lead) {
  if (!lead || !lead.events || !lead.events.length) return '—'
  const e = lead.events[lead.events.length - 1]
  if (e.type === 'note') return (e.note || '').slice(0, 60) || 'Note'
  return e.type
}

// filter logs to meaningful items (notes, calls, status changes, contact edits, tasks)
const logsForSelectedLead = computed(() => {
  if (!selectedLead.value) return []
  const events = selectedLead.value.events || []
  return events
    .filter(e => ['note', 'call', 'status_change', 'contact_edited', 'task_created'].includes(e.type))
    .slice()
    .sort((a, b) => new Date(b.at) - new Date(a.at))
})

function eventIcon (type) {
  if (type === 'note') return '✍️'
  if (type === 'call') return '📞'
  if (type === 'task_created') return '🗒️'
  if (type === 'status_change') return '🔁'
  if (type === 'contact_edited') return '✏️'
  return '•'
}
function eventTitle (ev) {
  if (ev.type === 'note') return 'Note added'
  if (ev.type === 'call') return 'Call logged'
  if (ev.type === 'task_created') return 'Task created'
  if (ev.type === 'status_change') return 'Status changed'
  if (ev.type === 'contact_edited') return 'Contact edited'
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
function statusIcon (s) {
  if (s === 'working') return '🔄'
  if (s === 'qualified') return '⭐'
  if (s === 'converted') return '✅'
  if (s === 'unqualified') return '❌'
  return '🟢'
}
function scoreBadgeClass (score) {
  if (score >= 70) return 'bg-rose-50 text-rose-700'
  if (score >= 40) return 'bg-amber-50 text-amber-700'
  return 'bg-slate-50 text-slate-700'
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