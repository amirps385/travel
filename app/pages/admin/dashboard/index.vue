<template>
  <div class="max-w-7xl mx-auto px-4 lg:px-6 py-8 space-y-6">
    <!-- ROLE-SPECIFIC WELCOME SECTION -->
    <div class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 py-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-linear-to-br from-sky-100 to-sky-50 border border-sky-200 flex items-center justify-center">
          <span class="text-2xl">
            <span v-if="userRole === 'superadmin'">👑</span>
            <span v-else-if="userRole === 'admin'">⚙️</span>
            <span v-else-if="userRole === 'content-manager'">📝</span>
            <span v-else-if="userRole === 'lead-manager'">👥</span>
            <span v-else-if="userRole === 'itinerary-planner'">🗓️</span>
            <span v-else>👤</span>
          </span>
        </div>
        <div class="flex-1">
          <h1 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Welcome, {{ userName || 'User' }}!
          </h1>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3" 
               :class="roleBadgeClass">
            {{ userRoleFormatted }}
          </div>
          <p class="text-sm text-slate-600">
            {{ roleWelcomeMessage }}
          </p>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="(permission, index) in rolePermissions" :key="index" 
                 class="bg-slate-50 rounded-lg px-3 py-2 text-xs">
              <div class="font-medium text-slate-700">{{ permission }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ROLE-SPECIFIC STATS -->
    <div v-if="showStats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in filteredStats"
        :key="stat.title"
        class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 py-4"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs text-slate-500">{{ stat.title }}</p>
            <p class="mt-1 text-2xl font-bold text-slate-900">
              <span v-if="loadingStates[stat.key]">...</span>
              <span v-else>{{ stat.value }}</span>
            </p>
            <p class="mt-1 text-xs text-slate-500">{{ stat.subtitle }}</p>
          </div>
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center"
            :class="stat.colorClass"
          >
            <span class="text-lg">{{ stat.icon }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ROLE-SPECIFIC QUICK ACTIONS -->
    <div v-if="showQuickActions" class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6">
      <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-4">
        Quick Actions
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <NuxtLink v-for="action in quickActions" :key="action.label" 
           :to="action.to"
           class="flex items-center gap-3 p-3 rounded-lg border hover:bg-slate-50 transition-colors no-underline">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="action.bgColor">
            <span class="text-sm">{{ action.icon }}</span>
          </div>
          <div>
            <div class="font-medium text-slate-900 text-sm">{{ action.label }}</div>
            <div class="text-xs text-slate-500">{{ action.description }}</div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- RECENT ACTIVITY PLACEHOLDER -->
    <div v-if="showRecentActivity"
      class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6"
    >
      <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-3">
        Recent Activity
      </h2>
      <p class="text-sm text-slate-500">
        {{ recentActivityMessage }}
      </p>
    </div>

    <!-- SYSTEM INFO FOR SUPERADMIN/ADMIN -->
    <div v-if="userRole === 'superadmin' || userRole === 'admin'" 
         class="bg-white/90 backdrop-blur rounded-2xl shadow border border-slate-100 px-5 md:px-7 py-6">
      <h2 class="text-base md:text-lg font-semibold text-slate-900 mb-4">
        System Information
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-3">
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-600">Total Users</span>
            <span class="font-medium">{{ totalUsers || 'Loading...' }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-600">Active Users</span>
            <span class="font-medium">{{ activeUsers || 'Loading...' }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-600">System Version</span>
            <span class="font-mono text-xs bg-slate-100 px-2 py-1 rounded">v1.0.0</span>
          </div>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-600">Last Backup</span>
            <span class="font-medium">{{ lastBackup || 'Never' }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-600">Server Status</span>
            <span class="inline-flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-medium">Online</span>
            </span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-600">Storage Used</span>
            <span class="font-medium">{{ storageUsed || '0%' }}</span>
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
  title: 'Dashboard Overview'
})

// Fetch user data
const { data: meData } = await useAsyncData('dashboard-me', () => $fetch('/api/auth/me'))

const user = computed(() => meData.value?.user || {})
const userName = computed(() => user.value.name || '')
const userRole = computed(() => user.value.role || '')
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

const roleBadgeClass = computed(() => {
  const classes = {
    'superadmin': 'bg-purple-100 text-purple-800',
    'admin': 'bg-blue-100 text-blue-800',
    'content-manager': 'bg-green-100 text-green-800',
    'lead-manager': 'bg-amber-100 text-amber-800',
    'itinerary-planner': 'bg-indigo-100 text-indigo-800'
  }
  return classes[userRole.value] || 'bg-slate-100 text-slate-800'
})

const roleWelcomeMessage = computed(() => {
  const messages = {
    'superadmin': 'You have full access to all system features and user management.',
    'admin': 'You have administrative access to manage content and oversee operations.',
    'content-manager': 'You can create and manage all types of travel content for our website.',
    'lead-manager': 'You are responsible for managing and following up with travel enquiries.',
    'itinerary-planner': 'You specialize in creating and managing travel itineraries and packages.'
  }
  return messages[userRole.value] || 'Welcome to the travel management system.'
})

const rolePermissions = computed(() => {
  const permissions = {
    'superadmin': [
      'Full System Access',
      'User Management',
      'Content Management',
      'System Settings',
      'Analytics & Reports'
    ],
    'admin': [
      'User Management',
      'Content Management',
      'Leads Overview',
      'System Monitoring'
    ],
    'content-manager': [
      'Tours Management',
      'Routes & Parks',
      'Islands & Zanzibar',
      'Animals Encyclopedia',
      'Hotels & Activities',
      'Transfers & Cities',
      'Group Climbs' // ADDED Group Climbs
    ],
    'lead-manager': [
      'View All Leads',
      'Update Lead Status',
      'Contact Management',
      'Follow-up Tracking'
    ],
    'itinerary-planner': [
      'Create Itineraries',
      'Manage Bookings',
      'Hotel Coordination',
      'Activity Planning',
      'Transport Arrangements'
    ]
  }
  return permissions[userRole.value] || []
})

// All possible stats with custom data extractors for each API
const allStats = ref([
  {
    key: 'newLeads',
    title: 'New Leads',
    value: 0,
    subtitle: 'Status: new',
    icon: '👥',
    colorClass: 'bg-sky-50 text-sky-600',
    roles: ['superadmin', 'admin', 'lead-manager', 'itinerary-planner'],
    apiEndpoint: '/api/leads',
    extractData: (response) => {
      // Assuming /api/leads returns array directly
      const list = Array.isArray(response) ? response : []
      return list.filter(l => (l.status || 'new') === 'new').length
    }
  },
  {
    key: 'totalLeads',
    title: 'Total Leads',
    value: 0,
    subtitle: 'All time',
    icon: '📈',
    colorClass: 'bg-emerald-50 text-emerald-600',
    roles: ['superadmin', 'admin', 'lead-manager'],
    apiEndpoint: '/api/leads',
    extractData: (response) => {
      const list = Array.isArray(response) ? response : []
      return list.length
    }
  },
  {
    key: 'itineraries',
    title: 'Itineraries',
    value: 0,
    subtitle: 'Created itineraries',
    icon: '📄',
    colorClass: 'bg-violet-50 text-violet-600',
    roles: ['superadmin', 'admin', 'itinerary-planner'],
    apiEndpoint: '/api/itineraries',
    extractData: (response) => {
      // Assuming /api/itineraries returns array directly
      const data = Array.isArray(response) ? response : []
      return data.length
    }
  },
  {
    key: 'tours',
    title: 'Tours',
    value: 0,
    subtitle: 'Available tours',
    icon: '🧭',
    colorClass: 'bg-amber-50 text-amber-600',
    roles: ['superadmin', 'admin', 'content-manager'],
    apiEndpoint: '/api/tours',
    extractData: (response) => {
      // Your API returns { success: true, data: tours }
      const data = response?.data || []
      return Array.isArray(data) ? data.length : 0
    }
  },
  {
    key: 'routes',
    title: 'Routes',
    value: 0,
    subtitle: 'Kilimanjaro routes',
    icon: '🗺️',
    colorClass: 'bg-blue-50 text-blue-600',
    roles: ['superadmin', 'admin', 'content-manager'],
    apiEndpoint: '/api/routes',
    extractData: (response) => {
      // Assuming /api/routes returns array directly or { data: [] }
      const data = Array.isArray(response) ? response : (response?.data || [])
      return Array.isArray(data) ? data.length : 0
    }
  },
  {
    key: 'parks',
    title: 'Parks',
    value: 0,
    subtitle: 'National parks',
    icon: '🏞️',
    colorClass: 'bg-green-50 text-green-600',
    roles: ['superadmin', 'admin', 'content-manager'],
    apiEndpoint: '/api/parks',
    extractData: (response) => {
      // Your API returns { ok: true, data: parks }
      const data = response?.data || []
      return Array.isArray(data) ? data.length : 0
    }
  },
  {
    key: 'islands',
    title: 'Islands',
    value: 0,
    subtitle: 'Island destinations',
    icon: '🏝️',
    colorClass: 'bg-teal-50 text-teal-600',
    roles: ['superadmin', 'admin', 'content-manager'],
    apiEndpoint: '/api/islands',
    extractData: (response) => {
      // Your API returns { ok: true, data: items, meta: { ... } }
      const data = response?.data || []
      return Array.isArray(data) ? data.length : 0
    }
  },
  {
    key: 'zanzibar',
    title: 'Zanzibar',
    value: 0,
    subtitle: 'Zanzibar experiences',
    icon: '🏝️',
    colorClass: 'bg-cyan-50 text-cyan-600',
    roles: ['superadmin', 'admin', 'content-manager'],
    apiEndpoint: '/api/zanzibar',
    extractData: (response) => {
      // Your API returns { success: true, data: [...] }
      const data = response?.data || []
      return Array.isArray(data) ? data.length : 0
    }
  },
  {
    key: 'animals',
    title: 'Animals',
    value: 0,
    subtitle: 'Wildlife species',
    icon: '🦁',
    colorClass: 'bg-orange-50 text-orange-600',
    roles: ['superadmin', 'admin', 'content-manager'],
    apiEndpoint: '/api/animals',
    extractData: (response) => {
      // Your API returns array directly (after mapping)
      return Array.isArray(response) ? response.length : 0
    }
  },
  {
    key: 'hotels',
    title: 'Hotels',
    value: 0,
    subtitle: 'Configured hotels',
    icon: '🏨',
    colorClass: 'bg-pink-50 text-pink-600',
    roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'],
    apiEndpoint: '/api/hotels',
    extractData: (response) => {
      // Assuming /api/hotels returns array directly
      return Array.isArray(response) ? response.length : 0
    }
  },
  {
  key: 'accommodations',
  title: 'Accommodations',
  value: 0,
  subtitle: 'Configured accommodations',
  icon: '🛏️',
  colorClass: 'bg-fuchsia-50 text-fuchsia-600',
  roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'],
  apiEndpoint: '/api/accommodations',
  extractData: (response) => {
    // Accept either array or { data: [] } responses
    if (Array.isArray(response)) return response.length
    if (response?.data && Array.isArray(response.data)) return response.data.length
    return 0
  }
},
  {
    key: 'activities',
    title: 'Activities',
    value: 0,
    subtitle: 'Available activities',
    icon: '📍',
    colorClass: 'bg-rose-50 text-rose-600',
    roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'],
    apiEndpoint: '/api/activities',
    extractData: (response) => {
      // Assuming /api/activities returns array directly
      return Array.isArray(response) ? response.length : 0
    }
  },
  {
    key: 'transfers',
    title: 'Transfers',
    value: 0,
    subtitle: 'Transport options',
    icon: '🚐',
    colorClass: 'bg-indigo-50 text-indigo-600',
    roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'],
    apiEndpoint: '/api/transfers',
    extractData: (response) => {
      // Your API returns array directly
      return Array.isArray(response) ? response.length : 0
    }
  },
  {
    key: 'cities',
    title: 'Cities',
    value: 0,
    subtitle: 'City destinations',
    icon: '🌆',
    colorClass: 'bg-purple-50 text-purple-600',
    roles: ['superadmin', 'admin', 'content-manager', 'itinerary-planner'],
    apiEndpoint: '/api/cities',
    extractData: (response) => {
      // Your API returns array directly
      return Array.isArray(response) ? response.length : 0
    }
  },
  {
    key: 'users',
    title: 'Users',
    value: 0,
    subtitle: 'Active admin users',
    icon: '👤',
    colorClass: 'bg-slate-50 text-slate-600',
    roles: ['superadmin', 'admin'],
    apiEndpoint: '/api/admins',
    extractData: (response) => {
      // Your API returns array directly or with data property?
      const data = Array.isArray(response) ? response : (response?.data || [])
      const userList = Array.isArray(data) ? data : []
      return userList.filter(u => u.isActive !== false).length
    }
  },
  // ADD THIS: Group Climbs stat
  {
    key: 'groupClimbs',
    title: 'Group Climbs',
    value: 0,
    subtitle: 'Upcoming climbs',
    icon: '🧗‍♂️',
    colorClass: 'bg-indigo-50 text-indigo-600',
    roles: ['superadmin', 'admin', 'content-manager'],
    apiEndpoint: '/api/groupclimb',
    extractData: (response) => {
      // Assuming /api/groupclimb returns { ok: true, data: [...] }
      const data = response?.data || []
      const now = new Date()
      const upcoming = Array.isArray(data) 
        ? data.filter(c => new Date(c.startDate) > now).length 
        : 0
      return upcoming
    }
  }
])

// Filter stats based on user role
const filteredStats = computed(() => {
  if (userRole.value === 'superadmin' || userRole.value === 'admin') {
    return allStats.value
  }
  return allStats.value.filter(stat => stat.roles.includes(userRole.value))
})

// Quick actions based on role
const quickActions = computed(() => {
  const actions = {
    'superadmin': [
      { to: '/admin/dashboard/users', icon: '👤', label: 'Manage Users', description: 'Add or edit admin users', bgColor: 'bg-purple-100' },
      { to: '/admin/dashboard/leads', icon: '👥', label: 'View Leads', description: 'Check recent enquiries', bgColor: 'bg-sky-100' },
      { to: '/admin/dashboard/tours', icon: '🧭', label: 'Manage Tours', description: 'Edit safari packages', bgColor: 'bg-amber-100' },
      { to: '/admin/dashboard/routes', icon: '🗺️', label: 'Kilimanjaro Routes', description: 'Update climbing routes', bgColor: 'bg-blue-100' },
      { to: '/admin/dashboard/parks', icon: '🏞️', label: 'National Parks', description: 'Edit park information', bgColor: 'bg-green-100' },
      { to: '/admin/dashboard/islands', icon: '🏝️', label: 'Islands', description: 'Manage island content', bgColor: 'bg-teal-100' },
      // ADD THIS: Group Climbs for superadmin
      { to: '/admin/dashboard/groupclimb', icon: '🧗‍♂️', label: 'Group Climbs', description: 'Manage climbing adventures', bgColor: 'bg-indigo-100' }
    ],
    'admin': [
      { to: '/admin/dashboard/leads', icon: '👥', label: 'View Leads', description: 'Check recent enquiries', bgColor: 'bg-sky-100' },
      { to: '/admin/dashboard/tours', icon: '🧭', label: 'Manage Tours', description: 'Edit safari packages', bgColor: 'bg-amber-100' },
      { to: '/admin/dashboard/itineraries', icon: '📄', label: 'Itineraries', description: 'Review travel plans', bgColor: 'bg-violet-100' },
      { to: '/admin/dashboard/parks', icon: '🏞️', label: 'National Parks', description: 'Edit park information', bgColor: 'bg-green-100' },
      { to: '/admin/dashboard/hotels', icon: '🏨', label: 'Hotels', description: 'Configure hotel partners', bgColor: 'bg-pink-100' },
      { to: '/admin/dashboard/activities', icon: '📍', label: 'Activities', description: 'Manage activities', bgColor: 'bg-rose-100' },
      // ADD THIS: Group Climbs for admin
      { to: '/admin/dashboard/groupclimb', icon: '🧗‍♂️', label: 'Group Climbs', description: 'Manage climbing adventures', bgColor: 'bg-indigo-100' }
    ],
    'content-manager': [
      { to: '/admin/dashboard/tours', icon: '🧭', label: 'Manage Tours', description: 'Edit safari packages', bgColor: 'bg-amber-100' },
      { to: '/admin/dashboard/routes', icon: '🗺️', label: 'Kilimanjaro Routes', description: 'Update climbing routes', bgColor: 'bg-blue-100' },
      { to: '/admin/dashboard/parks', icon: '🏞️', label: 'National Parks', description: 'Edit park information', bgColor: 'bg-green-100' },
      { to: '/admin/dashboard/islands', icon: '🏝️', label: 'Islands', description: 'Manage island content', bgColor: 'bg-teal-100' },
      { to: '/admin/dashboard/zanzibar', icon: '🏝️', label: 'Zanzibar', description: 'Update experiences', bgColor: 'bg-cyan-100' },
      { to: '/admin/dashboard/animals', icon: '🦁', label: 'Animals', description: 'Edit wildlife info', bgColor: 'bg-orange-100' },
      // ADD THIS: Group Climbs for content-manager
      { to: '/admin/dashboard/groupclimb', icon: '🧗‍♂️', label: 'Group Climbs', description: 'Manage climbing adventures', bgColor: 'bg-indigo-100' }
    ],
    'lead-manager': [
      { to: '/admin/dashboard/leads', icon: '👥', label: 'Manage Leads', description: 'Follow up on enquiries', bgColor: 'bg-sky-100' },
      { to: '/admin/dashboard/leads', icon: '📞', label: 'New Leads', description: 'Check for new enquiries', bgColor: 'bg-emerald-100' },
      { to: '/admin/dashboard/leads', icon: '📊', label: 'Leads Report', description: 'View lead statistics', bgColor: 'bg-indigo-100' }
    ],
    'itinerary-planner': [
      { to: '/admin/dashboard/itineraries', icon: '📄', label: 'Create Itinerary', description: 'Start new travel plan', bgColor: 'bg-violet-100' },
      { to: '/admin/dashboard/leads', icon: '👥', label: 'Client Leads', description: 'View client requests', bgColor: 'bg-sky-100' },
      { to: '/admin/dashboard/hotels', icon: '🏨', label: 'Hotel Partners', description: 'Check available hotels', bgColor: 'bg-pink-100' },
      { to: '/admin/dashboard/activities', icon: '📍', label: 'Activities', description: 'Plan activities', bgColor: 'bg-rose-100' },
      { to: '/admin/dashboard/transfers', icon: '🚐', label: 'Transfers', description: 'Arrange transport', bgColor: 'bg-indigo-100' },
      { to: '/admin/dashboard/cities', icon: '🌆', label: 'Cities', description: 'Manage destinations', bgColor: 'bg-purple-100' }
    ]
  }
  return actions[userRole.value] || []
})

const showStats = computed(() => filteredStats.value.length > 0)
const showQuickActions = computed(() => quickActions.value.length > 0)
const showRecentActivity = computed(() => ['superadmin', 'admin'].includes(userRole.value))

const recentActivityMessage = computed(() => {
  if (userRole.value === 'superadmin' || userRole.value === 'admin') {
    return 'Here you\'ll later see the latest leads, itinerary updates and admin actions. For now, this is a placeholder section while we set up the backend and data.'
  }
  return 'Your recent activities will appear here as you work on the system.'
})

// System info for superadmin/admin
const totalUsers = ref(0)
const activeUsers = ref(0)
const lastBackup = ref('Never')
const storageUsed = ref('0%')

// Loading states for each stat
const loadingStates = ref({})

// Function to fetch data for a stat
async function fetchStatData(stat) {
  if (!stat.apiEndpoint) return 0
  
  try {
    loadingStates.value[stat.key] = true
    const response = await $fetch(stat.apiEndpoint).catch(() => null)
    
    // Use the custom extractor for each API
    const count = stat.extractData ? stat.extractData(response) : 0
    
    // Update the stat value
    updateStatValue(stat.key, count)
    return count
  } catch (error) {
    console.error(`Failed to load ${stat.title} from ${stat.apiEndpoint}:`, error)
    updateStatValue(stat.key, 0)
    return 0
  } finally {
    loadingStates.value[stat.key] = false
  }
}

// Function to update a stat
function updateStatValue(key, value) {
  const stat = allStats.value.find(s => s.key === key)
  if (stat) {
    stat.value = value
  }
}

onMounted(async () => {
  // Fetch all stats in parallel for better performance
  const statPromises = filteredStats.value.map(async (stat) => {
    return await fetchStatData(stat)
  })

  // Wait for all stats to load
  await Promise.all(statPromises)

  // For superadmin/admin, also calculate user stats
  if (userRole.value === 'superadmin' || userRole.value === 'admin') {
    try {
      const users = await $fetch('/api/admins')
      const data = Array.isArray(users) ? users : (users?.data || [])
      const userList = Array.isArray(data) ? data : []
      totalUsers.value = userList.length
      activeUsers.value = userList.filter(u => u.isActive !== false).length
    } catch (err) {
      console.error('Failed to load users for stats', err)
    }
  }

  // Set current date as last backup for demo
  lastBackup.value = new Date().toLocaleDateString()
  storageUsed.value = '15%'
})
</script>