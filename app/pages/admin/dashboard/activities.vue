<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- Page header -->
  
      <!-- ACTIVITIES SECTION -->
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Activities'
})

// header date
const today = computed(() => {
  const d = new Date()
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

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
  await loadActivities()
})
</script>
