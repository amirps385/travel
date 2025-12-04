<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- Page header -->
     

      <!-- TRANSFERS SECTION -->
      <div
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">
              Route Transfers
            </h2>
            <p class="text-xs md:text-sm text-slate-500">
              Manage transfers between cities and destinations.
            </p>
          </div>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs md:text-sm font-semibold px-4 py-2 shadow-sm"
            @click="openCreateTransfer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 5v14M5 12h14" />
            </svg>
            Add Transfer
          </button>
        </div>

        <!-- Transfers table -->
        <div class="border rounded-2xl overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-slate-50/80">
              <tr class="text-left text-xs uppercase tracking-wide text-slate-500 border-b">
                <th class="py-3 px-4">From City</th>
                <th class="py-3 px-4">To City</th>
                <th class="py-3 px-4">Duration</th>
                <th class="py-3 px-4">Cost</th>
                <th class="py-3 px-4">Vehicle Type</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transfer in transfers"
                :key="transfer._id"
                class="border-b last:border-b-0 hover:bg-slate-50/80"
              >
                <td class="py-3 px-4 text-slate-900">{{ transfer.fromCity }}</td>
                <td class="py-3 px-4 text-slate-900">{{ transfer.toCity }}</td>
                <td class="py-3 px-4 text-slate-700">
                  {{ transfer.durationHours }}h
                </td>
                <td class="py-3 px-4 text-slate-700">
                  {{ transfer.costUSD ? '$' + transfer.costUSD : '$0' }}
                </td>
                <td class="py-3 px-4 text-slate-700">
                  {{ transfer.vehicleType || 'Standard' }}
                </td>
                <td class="py-3 pr-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <!-- EDIT -->
                    <button
                      type="button"
                      class="rounded-full p-2 hover:bg-slate-100"
                      @click.stop="openEditTransfer(transfer)"
                      title="Edit transfer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M15.232 5.232l3.536 3.536M4 20h4l9.5-9.5-4-4L4 16v4z"/>
                      </svg>
                    </button>

                    <!-- DELETE -->
                    <button
                      type="button"
                      class="rounded-full p-2 hover:bg-rose-50 text-rose-500"
                      @click.stop="deleteTransfer(transfer._id)"
                      title="Delete transfer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                              d="M6 7h12M10 11v6M14 11v6M9 7l1-2h4l1 2M6 7l1 12h10l1-12"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!transfers.length">
                <td colspan="6" class="py-4 px-4 text-center text-xs text-slate-500">
                  No transfers yet. Use “Add Transfer” to create your first one.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ADD / EDIT TRANSFER MODAL -->
      <transition name="fade">
        <div
          v-if="isTransferModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
          <div
            class="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
          >
            <!-- Modal header -->
            <div class="flex items-center justify-between px-6 py-4 border-b bg-slate-50/70">
              <div>
                <h2 class="text-base md:text-lg font-semibold text-slate-900">
                  {{ isEditingTransfer ? 'Edit Route Transfer' : 'Add New Route Transfer' }}
                </h2>
                <p class="text-xs text-slate-500">
                  Create a new route transfer for arrival, departure, and city-to-city transfers.
                </p>
              </div>
              <button
                type="button"
                class="rounded-full w-8 h-8 flex items-center justify-center border bg-white hover:bg-slate-100"
                @click="closeTransferModal"
              >
                ✕
              </button>
            </div>

            <!-- Modal body -->
            <div class="px-6 py-5 space-y-4 text-xs md:text-sm">
              <!-- From / To -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    From City
                  </label>
                  <select
                    v-model="transferForm.fromCity"
                    class="w-full border rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="">Select origin</option>
                    <option v-for="c in transferCityOptions" :key="'from-' + c" :value="c">
                      {{ c }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    To City
                  </label>
                  <select
                    v-model="transferForm.toCity"
                    class="w-full border rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="">Select destination</option>
                    <option v-for="c in transferCityOptions" :key="'to-' + c" :value="c">
                      {{ c }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Cost + Duration -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Cost ($)
                  </label>
                  <input
                    v-model.number="transferForm.costUSD"
                    type="number"
                    min="0"
                    class="w-full border rounded-lg px-3 py-2"
                  />
                  <p class="text-[11px] text-slate-400 mt-1">
                    Total transfer cost.
                  </p>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">
                    Duration (hours)
                  </label>
                  <input
                    v-model.number="transferForm.durationHours"
                    type="number"
                    min="1"
                    step="0.5"
                    class="w-full border rounded-lg px-3 py-2"
                  />
                  <p class="text-[11px] text-slate-400 mt-1">
                    Travel time in hours.
                  </p>
                </div>
              </div>

              <!-- Vehicle type -->
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">
                  Vehicle Type (Optional)
                </label>
                <input
                  v-model="transferForm.vehicleType"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2"
                  placeholder="4x4 Safari Vehicle, Minibus, etc."
                />
              </div>

              <p v-if="transferError" class="text-[11px] text-rose-600">
                {{ transferError }}
              </p>
            </div>

            <!-- Modal footer -->
            <div class="px-6 py-4 border-t bg-slate-50/70 flex items-center justify-end gap-2">
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-xs md:text-sm border bg-white text-slate-700 hover:bg-slate-100"
                @click="closeTransferModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-xs md:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60"
                :disabled="isSavingTransfer"
                @click="saveTransfer"
              >
                {{ isSavingTransfer ? 'Saving…' : (isEditingTransfer ? 'Save changes' : 'Create Transfer') }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Transfers'
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

// ---- Transfers state ----
const transfers = ref([])

const isTransferModalOpen = ref(false)
const isEditingTransfer = ref(false)
const isSavingTransfer = ref(false)
const transferError = ref('')

// you can later replace with cities from /api/cities if you want
const transferCityOptions = [
  'Arusha',
  'Moshi',
  'Kilimanjaro Airport',
  'Dar es Salaam',
  'Zanzibar',
  'Nairobi',
  'Other'
]

const transferForm = ref({
  _id: null,
  fromCity: '',
  toCity: '',
  durationHours: 1,
  costUSD: 0,
  vehicleType: 'Standard'
})

function resetTransferForm () {
  transferForm.value = {
    _id: null,
    fromCity: '',
    toCity: '',
    durationHours: 1,
    costUSD: 0,
    vehicleType: 'Standard'
  }
}

function openCreateTransfer () {
  resetTransferForm()
  isEditingTransfer.value = false
  transferError.value = ''
  isTransferModalOpen.value = true
}

function openEditTransfer (transfer) {
  transferForm.value = {
    _id: transfer._id,
    fromCity: transfer.fromCity,
    toCity: transfer.toCity,
    durationHours: transfer.durationHours,
    costUSD: transfer.costUSD,
    vehicleType: transfer.vehicleType || 'Standard'
  }
  isEditingTransfer.value = true
  transferError.value = ''
  isTransferModalOpen.value = true
}

function closeTransferModal () {
  isTransferModalOpen.value = false
}

// load all transfers from API
async function loadTransfers () {
  try {
    const data = await $fetch('/api/transfers')
    transfers.value = data || []
  } catch (err) {
    console.error('Failed to load transfers', err)
  }
}

async function saveTransfer () {
  transferError.value = ''

  if (!transferForm.value.fromCity || !transferForm.value.toCity) {
    transferError.value = 'From City and To City are required.'
    return
  }

  isSavingTransfer.value = true
  try {
    const payload = {
      fromCity: transferForm.value.fromCity,
      toCity: transferForm.value.toCity,
      durationHours: transferForm.value.durationHours,
      costUSD: transferForm.value.costUSD,
      vehicleType: transferForm.value.vehicleType
    }

    let saved

    if (isEditingTransfer.value && transferForm.value._id) {
      saved = await $fetch(`/api/transfers/${transferForm.value._id}`, {
        method: 'PATCH',
        body: payload
      })
      const idx = transfers.value.findIndex(t => t._id === saved._id)
      if (idx !== -1) transfers.value[idx] = saved
    } else {
      saved = await $fetch('/api/transfers', {
        method: 'POST',
        body: payload
      })
      transfers.value.push(saved)
    }

    closeTransferModal()
  } catch (err) {
    console.error('Failed to save transfer', err)
    transferError.value = 'Failed to save transfer. Please try again.'
  } finally {
    isSavingTransfer.value = false
  }
}

async function deleteTransfer (id) {
  if (!confirm('Are you sure you want to delete this transfer?')) return

  try {
    await $fetch(`/api/transfers/${id}`, { method: 'DELETE' })
    transfers.value = transfers.value.filter(t => t._id !== id)
  } catch (err) {
    console.error('Failed to delete transfer', err)
    alert('Failed to delete transfer. See console for details.')
  }
}

// ---- Initial load ----
onMounted(async () => {
  await loadTransfers()
})
</script>
