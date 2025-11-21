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
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-2">
              Hotels
            </h2>
            <p class="text-sm text-slate-500 mb-4">
              Configure partner hotels, categories and price ranges.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="hotel in hotels"
                :key="hotel.id"
                class="border rounded-2xl px-4 py-3 hover:bg-slate-50"
              >
                <div class="flex justify-between items-center mb-1">
                  <div class="font-medium text-slate-900">{{ hotel.name }}</div>
                  <div class="text-xs text-slate-500">
                    {{ hotel.category }}
                  </div>
                </div>
                <div class="text-xs text-slate-500">
                  From ${{ hotel.from }} / night
                </div>
              </div>
            </div>
          </div>
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
        <div v-else-if="activeSection === 'transfers' || activeSection === 'cities'">
          <div
            class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
          >
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-2">
              {{ activeSection === 'transfers' ? 'Transfers' : 'Cities' }}
            </h2>
            <p class="text-sm text-slate-500">
              This section will later allow you to manage
              {{ activeSection === 'transfers' ? 'airport transfers & local transport.' : 'cities, regions and entry points.' }}
            </p>
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

const hotels = [
  { id: 1, name: 'Serengeti View Lodge', category: 'Safari lodge', from: 180 },
  { id: 2, name: 'Zanzibar Beach Resort', category: 'Beach resort', from: 220 },
  { id: 3, name: 'Arusha City Hotel', category: 'City hotel', from: 90 }
]

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
})
</script>
