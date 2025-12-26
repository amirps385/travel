<template>
  <div>
    <!-- Compact preview card (same size as current timeline card) -->
    <div class="border rounded-xl p-4 bg-white">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xs font-semibold text-slate-500">Activity / Timeline</h3>
        <div class="text-xs text-slate-400">{{ events.length }} events</div>
      </div>

      <div v-if="events && events.length" class="space-y-3">
        <div v-for="ev in previewEvents" :key="ev.at + ev.type" class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-sm bg-slate-50 border">
            {{ eventIcon(ev.type) }}
          </div>
          <div class="flex-1">
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="font-medium text-slate-900">{{ eventTitle(ev) }}</div>
                <div class="text-xs text-slate-500">{{ ev.by?.name || ev.by || currentUser.name }} • {{ formatDateTime(ev.at) }}</div>
              </div>
              <div class="text-xs text-slate-400">{{ ev.metadata?.short || '' }}</div>
            </div>
            <div v-if="ev.note" class="mt-2 text-sm text-slate-700">{{ ev.note }}</div>
          </div>
        </div>

        <div class="mt-3 text-right">
          <button class="text-xs px-3 py-1 rounded border bg-slate-50" @click="openModal">View all</button>
        </div>
      </div>

      <p v-else class="text-xs text-slate-400">No activity yet. Use "Add note" or "Log call" to start the timeline.</p>
    </div>

    <!-- Modal: full activity / logs -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="closeModal" aria-hidden="true"></div>

        <div class="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="flex items-center justify-between p-4 border-b">
            <div>
              <h3 class="text-lg font-semibold">Activity & Logs</h3>
              <p class="text-xs text-slate-400">Showing all events ({{ events.length }}) — scroll to view details</p>
            </div>
            <div class="flex items-center gap-2">
              <input v-model="filterText" placeholder="Filter (notes, calls, status...)" class="text-sm border rounded px-2 py-1" />
              <button class="px-3 py-1 rounded border bg-white text-sm" @click="closeModal">Close</button>
            </div>
          </div>

          <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- LEFT: full scrollable timeline -->
            <div>
              <div class="text-xs text-slate-500 mb-2">Timeline</div>
              <div class="rounded-lg border overflow-y-auto" :style="{ 'maxHeight': modalMaxHeight }">
                <div class="p-3 space-y-3">
                  <div v-for="ev in filteredEvents" :key="ev.at + ev.type" class="flex items-start gap-3 bg-white p-2 rounded">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center text-sm bg-slate-50 border">
                      {{ eventIcon(ev.type) }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <div class="font-medium text-slate-900">{{ eventTitle(ev) }}</div>
                          <div class="text-xs text-slate-500">{{ ev.by?.name || ev.by || currentUser.name }} • {{ formatDateTime(ev.at) }}</div>
                        </div>
                        <div class="text-xs text-slate-400">{{ ev.metadata?.short || '' }}</div>
                      </div>
                      <div v-if="ev.note" class="mt-2 text-sm text-slate-700">{{ ev.note }}</div>
                      <div v-if="ev.reason" class="mt-1 text-xs text-rose-600 italic">Reason: {{ ev.reason }}</div>
                      <div v-if="ev.type === 'note_deleted' && ev.originalAt" class="mt-1 text-xs text-slate-400">Original note at: {{ formatDateTime(ev.originalAt) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT: recent logs / details panel -->
            <div>
              <div class="text-xs text-slate-500 mb-2">Recent logs</div>
              <div class="rounded-lg border overflow-y-auto" :style="{ 'maxHeight': modalMaxHeight }">
                <div class="p-3 space-y-3">
                  <div v-for="l in filteredLogs" :key="l.at + l.type" class="flex items-start justify-between gap-2 bg-white p-2 rounded">
                    <div>
                      <div class="font-medium text-slate-900">{{ eventTitle(l) }}</div>
                      <div class="text-xs text-slate-500">{{ l.by?.name || l.by || currentUser.name }} • {{ formatDateTime(l.at) }}</div>
                      <div v-if="l.metadata?.short" class="text-xs text-slate-400 mt-1">{{ l.metadata.short }}</div>
                    </div>
                    <div class="text-xs text-slate-400">{{ l.type }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-3 border-t text-right">
            <button class="px-3 py-1 rounded border bg-slate-50 text-sm" @click="closeModal">Done</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  events: { type: Array, default: () => [] },
  logs: { type: Array, default: () => [] },
  currentUser: { type: Object, default: () => ({ name: 'Admin' }) },
  previewCount: { type: Number, default: 5 }
})

const showModal = ref(false)
const filterText = ref('')

const previewEvents = computed(() => (props.events || []).slice(0, props.previewCount))

function openModal () { showModal.value = true }
function closeModal () { showModal.value = false }

const modalMaxHeight = 'calc(100vh - 200px)'

const filteredEvents = computed(() => {
  const q = filterText.value.trim().toLowerCase()
  if (!q) return (props.events || []).slice().sort((a, b) => new Date(b.at) - new Date(a.at))
  return (props.events || []).filter(e => {
    return (e.note || '').toLowerCase().includes(q) || (e.metadata?.short || '').toLowerCase().includes(q) || (e.type || '').toLowerCase().includes(q)
  }).slice().sort((a, b) => new Date(b.at) - new Date(a.at))
})

const filteredLogs = computed(() => {
  const q = filterText.value.trim().toLowerCase()
  if (!q) return (props.logs || []).slice().sort((a, b) => new Date(b.at) - new Date(a.at))
  return (props.logs || []).filter(e => {
    return (e.metadata?.short || '').toLowerCase().includes(q) || (e.type || '').toLowerCase().includes(q) || (e.note || '').toLowerCase().includes(q)
  }).slice().sort((a, b) => new Date(b.at) - new Date(a.at))
})

function formatDateTime(value) {
  if (!value) return '—'
  try { return new Date(value).toLocaleString() } catch { return value }
}

function eventIcon(type) {
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

function eventTitle(ev) {
  if (!ev) return ''
  const t = ev.type
  if (t === 'note') return 'Note added'
  if (t === 'note_updated') return 'Note updated'
  if (t === 'note_deleted') return 'Note deleted'
  if (t === 'call') return 'Call logged'
  if (t === 'call_updated') return 'Call updated'
  if (t === 'call_deleted') return 'Call deleted'
  if (t === 'task_created') return 'Task created'
  if (t === 'task_updated') return 'Task updated'
  if (t === 'task_deleted') return 'Task deleted'
  if (t === 'task_status_changed') return 'Task status changed'
  if (t === 'status_change') return 'Status changed'
  if (t === 'followup_set') return 'Follow-up set'
  if (t === 'followup_cleared') return 'Follow-up cleared'
  if (t === 'assign') return 'Assigned'
  if (t === 'contact_edited') return 'Contact edited'
  if (t === 'priority_change') return 'Priority changed'
  return t
}
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:all .15s ease}
.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-4px)}
</style>
