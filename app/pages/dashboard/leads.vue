<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- Page header (simple, because main admin shell is now split per page) -->
    

      <!-- LEADS CARD -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
      >
        <!-- Header row -->
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

        <!-- Filters -->
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

        <!-- Leads table -->
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
                This will update the lead status in MongoDB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Leads'
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

// ---- Leads + filters (real data) ----
const leadSearch = ref('')
const leadStatusFilter = ref('all')
const leads = ref([])

const totalLeads = computed(() => leads.value.length)

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

    // also update currently opened lead
    selectedLead.value = {
      ...selectedLead.value,
      status: updated.status
    }
  } catch (err) {
    console.error('Failed to update lead status', err)
    alert('Failed to update status. Please try again.')
  } finally {
    isSavingStatus.value = false
  }
}

// ---- Navigation to build page ----
function goToBuild (lead) {
  const id = lead._id || lead.id
  if (!id) return
  router.push(`/leads/${id}/build`)
}

// ---- Initial load ----
onMounted(async () => {
  try {
    const data = await $fetch('/api/leads')
    leads.value = data || []
  } catch (err) {
    console.error('Failed to load leads', err)
  }
})
</script>
