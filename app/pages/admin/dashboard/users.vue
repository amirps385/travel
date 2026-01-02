<template>
  <div class="min-h-[calc(100vh-5rem)] bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <!-- HEADER -->
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6 mb-6">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-1">Users</h2>
            <p class="text-xs md:text-sm text-slate-500">Manage admin users — toggle active, change role, or delete permanently.</p>
          </div>

          <div class="flex items-center gap-3">
            <input v-model="q" placeholder="Search name or email..." class="px-3 py-2 border rounded-lg text-sm" />
            <button @click="reload" class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border bg-white hover:bg-slate-50">
              Refresh
            </button>
            <div class="text-xs text-slate-500">Total: <strong>{{ filteredUsers.length }}</strong></div>
          </div>
        </div>
      </div>

      <!-- USERS TABLE -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-slate-50">
            <tr class="text-left text-xs uppercase tracking-wide text-slate-500">
              <th class="px-4 py-3">User</th>
              <th class="px-4 py-3">Email</th>
              <th class="px-4 py-3">Role</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id || user._id" class="border-t last:border-b-0 hover:bg-slate-50/80">
              <!-- USER -->
              <td class="px-4 py-3 text-slate-900">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 shrink-0 rounded-full overflow-hidden border">
                    <img v-if="user.avatar" :src="user.avatar" alt="avatar" class="w-full h-full object-cover" @error="onAvatarError($event)" />
                    <div v-else class="w-full h-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium">
                      {{ initialsFor(user) }}
                    </div>
                  </div>
                  <div>
                    <div class="font-medium">{{ user.name || '—' }}</div>
                    <div class="text-xs text-slate-500">{{ user.role || '—' }}</div>
                  </div>
                </div>
              </td>

              <!-- EMAIL -->
              <td class="px-4 py-3 text-slate-700">
                <div class="truncate max-w-xs">{{ user.email || '—' }}</div>
              </td>

              <!-- ROLE (editable) -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <select v-model="editRole[user.id || user._id]" class="border rounded-lg px-3 py-1 text-sm bg-white">
                    <option value="">Select role</option>
                    <option v-for="r in roles" :key="r" :value="r">{{ formatRoleName(r) }}</option>
                  </select>
                  <button
                    :disabled="saving[user.id || user._id]"
                    @click="saveRole(user)"
                    class="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-slate-50 disabled:opacity-60"
                  >
                    {{ saving[user.id || user._id] ? 'Saving...' : 'Save' }}
                  </button>
                </div>
              </td>

              <!-- STATUS -->
              <td class="px-4 py-3">
                <span
                  :class="user.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'"
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                >
                  <span class="w-2 h-2 rounded-full mr-1.5" :class="user.isActive ? 'bg-emerald-400' : 'bg-slate-400'"></span>
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>

              <!-- ACTIONS -->
              <td class="px-4 py-3 text-right">
                <div class="inline-flex items-center gap-2">
                  <button
                    @click="confirmToggleActive(user)"
                    :disabled="toggling[user.id || user._id]"
                    class="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-slate-50 disabled:opacity-60"
                    :title="user.isActive ? 'Disable account' : 'Enable account'"
                  >
                    {{ toggling[user.id || user._id] ? 'Working...' : (user.isActive ? 'Disable' : 'Enable') }}
                  </button>

                  <button
                    @click="confirmDeleteUser(user)"
                    class="px-2 py-1 text-xs rounded-lg border text-rose-600 hover:bg-rose-50"
                    title="Permanently delete user"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!filteredUsers.length">
              <td colspan="5" class="px-4 py-6 text-center text-xs text-slate-500">
                No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ROLE DESCRIPTIONS -->
      <div class="mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h3 class="text-sm font-semibold text-slate-900 mb-3">Role Permissions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div class="p-3 bg-slate-50 rounded-lg">
            <div class="font-medium text-slate-800 mb-1">Super Admin</div>
            <div class="text-slate-600">Full system access, can manage all users and content</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg">
            <div class="font-medium text-slate-800 mb-1">Admin</div>
            <div class="text-slate-600">Administrative access, can manage most content and users</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg">
            <div class="font-medium text-slate-800 mb-1">Content Manager</div>
            <div class="text-slate-600">Can manage all types of content (routes, parks, activities, islands, encyclopedia)</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg">
            <div class="font-medium text-slate-800 mb-1">Lead Manager</div>
            <div class="text-slate-600">Team leadership role for managing specific content areas</div>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg">
            <div class="font-medium text-slate-800 mb-1">Itinerary Planner</div>
            <div class="text-slate-600">Specialized role for creating and managing travel itineraries and packages</div>
          </div>
        </div>
      </div>

      <!-- DEBUG INFO (Remove in production) -->
      <div v-if="debugMode" class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
        <div class="font-semibold mb-2">Debug Info:</div>
        <div>Users loaded: {{ users.length }}</div>
        <div>First user data: {{ users[0] ? JSON.stringify(users[0]) : 'none' }}</div>
        <div>API endpoints:</div>
        <ul class="ml-4 mt-1">
          <li>GET /api/admins - should return users with isActive, avatar</li>
          <li>PATCH /api/admins/[id] - for updating role/isActive</li>
          <li>DELETE /api/admins/[id] - for permanently deleting users</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

/* Page meta (runtime) */
definePageMeta({
  layout: 'dashboard',
  title: 'Dashboard - Users'
})

/* ---------- state ---------- */
const users = ref([])
const loading = ref(false)
const q = ref('')
const roles = [
  'superadmin',
  'admin', 
  'content-manager',
  'lead-manager',
  'itinerary-planner'
]

// per-user temporary states (objects stored in refs for reactivity)
const saving = ref({})
const toggling = ref({})
const editRole = ref({})

// Debug mode - set to false in production
const debugMode = ref(false)

/* ---------- helpers ---------- */
// Format role name for display
function formatRoleName(role) {
  const names = {
    'superadmin': 'Super Admin',
    'admin': 'Admin',
    'content-manager': 'Content Manager',
    'lead-manager': 'Lead Manager',
    'itinerary-planner': 'Itinerary Planner'
  }
  return names[role] || role.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// tiny debounce (no external deps)
function debounce(fn, wait = 250) {
  let t = null
  return function (...args) {
    clearTimeout(t)
    t = setTimeout(() => { fn.apply(this, args) }, wait)
  }
}

/* ---------- CRUD & UI actions ---------- */
async function loadUsers () {
  loading.value = true
  try {
    const res = await $fetch('/api/admins')
    console.log('Users API response:', res) // Debug log
    
    users.value = Array.isArray(res) ? res.map(u => ({ 
      id: u.id || u._id,
      _id: u._id || u.id,
      name: u.name || '',
      email: u.email || '',
      role: u.role || 'content-manager',
      isActive: u.isActive !== undefined ? Boolean(u.isActive) : true,
      avatar: u.avatar || null
    })) : []
    
    // Initialize editRole values
    users.value.forEach(u => {
      const id = u.id || u._id
      editRole.value[id] = u.role || ''
    })
    
    console.log('Processed users:', users.value) // Debug log
  } catch (err) {
    console.error('Failed to load users', err)
    alert('Failed to load users. See console for details.')
  } finally {
    loading.value = false
  }
}

const debouncedLoad = debounce(() => loadUsers(), 300)

const filteredUsers = computed(() => {
  const term = (q.value || '').trim().toLowerCase()
  if (!term) return users.value
  return users.value.filter(u => {
    const s = `${u.name || ''} ${u.email || ''} ${u.role || ''}`.toLowerCase()
    return s.includes(term)
  })
})

onMounted(loadUsers)

function initialsFor(u) {
  if (!u?.name) return 'A'
  return String(u.name).split(' ').map(s => s?.[0] || '').slice(0,2).join('').toUpperCase()
}

function onAvatarError(e) {
  const img = e?.target
  if (!img) return
  img.style.display = 'none'
}

/* Save role */
async function saveRole (user) {
  const id = user.id || user._id
  const newRole = editRole.value[id] || ''
  if (!newRole) {
    alert('Please select a role before saving.')
    return
  }
  if (newRole === (user.role || '')) {
    alert('No change to save.')
    return
  }

  saving.value[id] = true
  try {
    console.log('Saving role for user:', id, 'new role:', newRole)
    
    const payload = { role: newRole }
    const response = await $fetch(`/api/admins/${id}`, { 
      method: 'PATCH', 
      body: payload 
    })
    
    console.log('Role update response:', response)
    
    // Update the user in the local state
    const idx = users.value.findIndex(u => (u.id || u._id) === id)
    if (idx !== -1) {
      users.value[idx].role = response.role || newRole
      // Also update other fields if returned
      if (response.isActive !== undefined) {
        users.value[idx].isActive = response.isActive
      }
    }
    
    alert(`Role updated to "${formatRoleName(newRole)}" successfully.`)
  } catch (err) {
    console.error('Failed to update role', err)
    
    // Extract error message
    let errorMsg = 'Failed to update role.'
    if (err?.data?.statusMessage) {
      errorMsg = err.data.statusMessage
    } else if (err?.data?.message) {
      errorMsg = err.data.message
    } else if (err?.message) {
      errorMsg = err.message
    }
    
    // Handle common errors
    if (errorMsg.includes('Forbidden') || errorMsg.includes('requires')) {
      errorMsg += '\n\nYou may need to be logged in as a superadmin to change roles.'
    }
    
    alert(errorMsg)
    
    // Reset to original role
    editRole.value[id] = user.role || ''
  } finally {
    saving.value[id] = false
  }
}

/* Toggle active with confirmation */
function confirmToggleActive (user) {
  const willEnable = !user.isActive
  const ok = confirm(`${willEnable ? 'Enable' : 'Disable'} account for "${user.name || user.email}"?`)
  if (!ok) return
  toggleActive(user)
}

async function toggleActive (user) {
  const id = user.id || user._id
  toggling.value[id] = true
  try {
    console.log('Toggling active for user:', id, 'current:', user.isActive)
    
    const payload = { isActive: !user.isActive }
    const response = await $fetch(`/api/admins/${id}`, { 
      method: 'PATCH', 
      body: payload 
    })
    
    console.log('Toggle active response:', response)
    
    const idx = users.value.findIndex(u => (u.id || u._id) === id)
    if (idx !== -1) {
      users.value[idx].isActive = response.isActive !== undefined ? response.isActive : !!payload.isActive
    }
    
    alert(`Account ${users.value[idx].isActive ? 'enabled' : 'disabled'} successfully.`)
  } catch (err) {
    console.error('Failed to toggle active', err)
    
    // Extract error message
    let errorMsg = 'Failed to update status.'
    if (err?.data?.statusMessage) {
      errorMsg = err.data.statusMessage
    } else if (err?.data?.message) {
      errorMsg = err.data.message
    } else if (err?.message) {
      errorMsg = err.message
    }
    
    // Handle common errors
    if (errorMsg.includes('Cannot deactivate your own account')) {
      errorMsg += '\n\nYou cannot disable your own account for safety reasons.'
    }
    
    alert(errorMsg)
  } finally {
    toggling.value[id] = false
  }
}

/* Delete user with confirmation */
function confirmDeleteUser (user) {
  const confirmed = confirm(`⚠️ PERMANENT DELETE ⚠️\n\nAre you absolutely sure you want to permanently delete user "${user.name || user.email}"?\n\nThis action:\n• Cannot be undone\n• Will remove the user from the database permanently\n• The user will no longer be able to log in\n\nType "DELETE" to confirm.`)
  
  if (!confirmed) return
  
  const userInput = prompt('Please type "DELETE" to confirm permanent deletion:')
  if (userInput?.toUpperCase() !== 'DELETE') {
    alert('Deletion cancelled. User not deleted.')
    return
  }
  
  deleteUser(user)
}

async function deleteUser (user) {
  const id = user.id || user._id
  const deletingUserId = id
  
  try {
    console.log('Deleting user:', id)
    
    const response = await $fetch(`/api/admins/${id}`, { 
      method: 'DELETE' 
    })
    
    console.log('Delete response:', response)
    
    if (response && response.success !== false) {
      // Remove from local list completely
      users.value = users.value.filter(u => (u.id || u._id) !== deletingUserId)
      
      // Clear any edit states for this user
      delete saving.value[deletingUserId]
      delete toggling.value[deletingUserId]
      delete editRole.value[deletingUserId]
      
      // Show success message
      alert(`✅ User "${user.name || user.email}" has been permanently deleted from the database.`)
    } else {
      throw new Error('Delete failed - no success response')
    }
  } catch (err) {
    console.error('Delete failed:', err)
    
    // Extract error message
    let errorMsg = 'Failed to delete user.'
    if (err?.data?.statusMessage) {
      errorMsg = err.data.statusMessage
    } else if (err?.data?.message) {
      errorMsg = err.data.message
    } else if (err?.message) {
      errorMsg = err.message
    }
    
    // Handle common errors
    if (errorMsg.includes('Cannot delete your own account')) {
      errorMsg = '❌ You cannot delete your own account for security reasons.'
    } else if (errorMsg.includes('Forbidden') || errorMsg.includes('requires superadmin')) {
      errorMsg = '❌ You need superadmin privileges to delete users.'
    } else if (errorMsg.includes('User not found')) {
      errorMsg = '❌ User not found. It may have already been deleted.'
      // Remove from list anyway
      users.value = users.value.filter(u => (u.id || u._id) !== deletingUserId)
    }
    
    alert(errorMsg)
    
    // Offer to disable instead if delete failed
    if (errorMsg.includes('Forbidden') || errorMsg.includes('requires')) {
      if (confirm(`${errorMsg}\n\nWould you like to disable the account instead?`)) {
        await toggleActive({ ...user, isActive: false })
      }
    }
  }
}

function reload () {
  loadUsers()
}

// Watch for search query changes with debounce
watch(q, debouncedLoad)

// Debug shortcut (Ctrl+Shift+D)
if (process.client) {
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      debugMode.value = !debugMode.value
      console.log('Debug mode:', debugMode.value ? 'ON' : 'OFF')
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
}
</script>

<style scoped>
/* tiny layout niceties to match your admin theme */
.table-avatar { width: 40px; height: 40px; border-radius: 9999px; overflow: hidden; }
</style>