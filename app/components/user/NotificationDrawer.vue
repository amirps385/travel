<!-- components/user/NotificationDrawer.vue -->
<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <div v-if="isOpen" class="fixed inset-0 z-10000">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/20" @click="close" />
        
        <!-- Drawer -->
        <div class="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-hidden flex flex-col">
          <!-- Header -->
          <div class="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Notifications</h2>
              <p class="text-xs text-slate-500">
                {{ unreadCount }} unread of {{ notifications.length }} total
              </p>
            </div>
            
            <div class="flex items-center gap-2">
              <button
                v-if="notifications.length > 0"
                @click="markAllAsRead"
                class="px-3 py-1 text-xs font-medium text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition"
                :disabled="isLoading"
              >
                Mark all read
              </button>
              <button
                v-if="notifications.length > 0"
                @click="clearAll"
                class="px-3 py-1 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                :disabled="isLoading"
              >
                Clear all
              </button>
              <button
                @click="close"
                class="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading && notifications.length === 0" class="flex items-center justify-center h-64">
            <div class="text-center">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
              <p class="mt-3 text-sm text-slate-500">Loading notifications...</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="notifications.length === 0" class="flex items-center justify-center h-64">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
                <span class="text-2xl">🔔</span>
              </div>
              <h3 class="text-sm font-medium text-slate-900">No notifications</h3>
              <p class="text-xs text-slate-500 mt-1">You're all caught up!</p>
            </div>
          </div>

          <!-- Notifications List -->
          <div v-else class="flex-1 overflow-y-auto">
            <div class="divide-y divide-slate-100">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="px-6 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                :class="{
                  'bg-sky-50/30': !notification.read,
                  'opacity-75': notification.read
                }"
                @click="handleNotificationClick(notification)"
              >
                <div class="flex gap-3">
                  <!-- Icon -->
                  <div class="shrink-0 mt-0.5">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center"
                         :class="getNotificationIconClass(notification.type)">
                      <span class="text-sm">{{ notification.icon || getDefaultIcon(notification.type) }}</span>
                    </div>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start gap-2">
                      <h3 class="text-sm font-medium text-slate-900"
                          :class="{ 'font-semibold': !notification.read }">
                        {{ notification.title }}
                      </h3>
                      <div class="flex items-center gap-2">
                        <span class="text-xs text-slate-400">
                          {{ formatTime(notification.createdAt) }}
                        </span>
                        <button
                          v-if="!notification.read"
                          @click.stop="markAsRead(notification.id)"
                          class="p-1 hover:bg-slate-200 rounded"
                          title="Mark as read"
                        >
                          <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <p class="text-sm text-slate-600 mt-1">{{ notification.message }}</p>
                    
                    <!-- Data preview -->
                    <div v-if="notification.data" class="mt-2">
                      <div v-if="notification.type === 'lead_assigned'" 
                           class="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                        <span>Lead ID:</span>
                        <code class="font-mono">{{ notification.data.leadId?.substring(0, 8) }}...</code>
                      </div>
                      <div v-else-if="notification.type === 'follow_up_reminder'"
                           class="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 rounded text-xs text-amber-700">
                        <span>Due:</span>
                        <span>{{ formatDate(notification.data.followUpDate) }}</span>
                      </div>
                    </div>
                    
                    <!-- Link indicator -->
                    <div v-if="notification.link" class="mt-2">
                      <span class="text-xs text-sky-600 inline-flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Click to view
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div v-if="notifications.length > 0" class="sticky bottom-0 bg-white border-t px-6 py-3">
            <button
              @click="loadMore"
              class="w-full text-center text-sm text-sky-600 hover:text-sky-700 py-2 hover:bg-sky-50 rounded-lg transition"
              :disabled="isLoadingMore || notifications.length < limit"
            >
              {{ isLoadingMore ? 'Loading...' : 'Load more notifications' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed , watch} from 'vue'
import { useRouter } from '#imports'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'notification-click'])

const router = useRouter()
const notifications = ref([])
const isLoading = ref(false)
const isLoadingMore = ref(false)
const limit = ref(10)
const offset = ref(0)
const hasMore = ref(true)

// Fetch user data
const { data: meData, refresh: refreshMe } = await useAsyncData(
  'notifications-user',
  () => $fetch('/api/auth/me'),
  { server: false }
)

const user = computed(() => meData.value?.user || {})

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Load notifications when drawer opens
watch(() => props.isOpen, async (open) => {
  if (open) {
    await loadNotifications()
  } else {
    // Refresh user data to update notification count
    await refreshMe()
  }
})

async function loadNotifications(reset = true) {
  if (reset) {
    notifications.value = []
    offset.value = 0
    hasMore.value = true
  }
  
  if (!hasMore.value) return
  
  isLoading.value = true
  
  try {
    const response = await $fetch('/api/notifications', {
      params: {
        limit: limit.value,
        offset: offset.value
      }
    })
    
    if (response.notifications) {
      if (reset) {
        notifications.value = response.notifications
      } else {
        notifications.value.push(...response.notifications)
      }
      
      hasMore.value = response.notifications.length === limit.value
      offset.value += limit.value
    }
  } catch (error) {
    console.error('Failed to load notifications:', error)
  } finally {
    isLoading.value = false
    isLoadingMore.value = false
  }
}

async function loadMore() {
  if (isLoadingMore.value || !hasMore.value) return
  
  isLoadingMore.value = true
  await loadNotifications(false)
}

async function markAsRead(notificationId) {
  try {
    // CHANGE THIS: From /api/notifications/read to /api/notifications
    await $fetch('/api/notifications', {
      method: 'POST',
      body: { notificationId }
    })
    
    // Update local state
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
    }
    
    // Refresh user data to update count
    await refreshMe()
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
  }
}

async function markAllAsRead() {
  try {
    // CHANGE THIS: From /api/notifications/read to /api/notifications
    await $fetch('/api/notifications', {
      method: 'POST',
      body: { markAll: true }
    })
    
    // Update local state
    notifications.value.forEach(n => {
      n.read = true
    })
    
    // Refresh user data to update count
    await refreshMe()
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error)
  }
}

async function clearAll() {
  if (!confirm('Are you sure you want to clear all notifications?')) return
  
  try {
    // CHANGE THIS: From /api/notifications/clear to /api/notifications
    await $fetch('/api/notifications', {
      method: 'DELETE',
      body: { clearAll: true }
    })
    
    notifications.value = []
    
    // Refresh user data to update count
    await refreshMe()
  } catch (error) {
    console.error('Failed to clear notifications:', error)
  }
}

function handleNotificationClick(notification) {
  emit('notification-click', notification)
  
  if (notification.link) {
    router.push(notification.link)
  }
  
  // Mark as read if not already read
  if (!notification.read) {
    markAsRead(notification.id)
  }
  
  close()
}

function close() {
  emit('close')
}

function getNotificationIconClass(type) {
  const classes = {
    'lead_assigned': 'bg-sky-100 text-sky-600',
    'follow_up_reminder': 'bg-amber-100 text-amber-600',
    'new_message': 'bg-emerald-100 text-emerald-600',
    'system_alert': 'bg-rose-100 text-rose-600',
    'task_due': 'bg-violet-100 text-violet-600',
    'itinerary_updated': 'bg-blue-100 text-blue-600',
    'lead_status_changed': 'bg-indigo-100 text-indigo-600'
  }
  return classes[type] || 'bg-slate-100 text-slate-600'
}

function getDefaultIcon(type) {
  const icons = {
    'lead_assigned': '👥',
    'follow_up_reminder': '⏰',
    'new_message': '💬',
    'system_alert': '⚠️',
    'task_due': '📝',
    'itinerary_updated': '📄',
    'lead_status_changed': '🔄'
  }
  return icons[type] || '🔔'
}

function formatTime(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString()
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>