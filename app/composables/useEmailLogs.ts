// app/composables/useEmailLogs.ts
export const useEmailLogs = () => {
  const loading = ref(false)
  const logs = ref<any[]>([])
  const stats = ref<any>(null)

  const fetchLogs = async (leadId: string) => {
    loading.value = true
    try {
      // Use the correct API endpoint
      const response: any = await $fetch('/api/emailtest/log', {
        params: { leadId }
      })
      
      if (response?.success && response?.data?.logs) {
        logs.value = response.data.logs
        
        // Debug log to see what we're getting
        console.log('Fetched logs with fullHtml:', logs.value.map(l => ({
          id: l.id,
          hasFullHtml: !!l.fullHtml,
          fullHtmlLength: l.fullHtml?.length || 0
        })))
      } else {
        logs.value = []
      }
    } catch (err: any) {
      console.error('Failed to fetch email logs:', err)
      logs.value = []
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async (leadId: string) => {
    try {
      const data = await $fetch(`/api/leads/${leadId}/emails/stats`)
      stats.value = data
      return data
    } catch (err: any) {
      console.error('Failed to fetch email stats:', err)
      stats.value = null
      return null
    }
  }

  return {
    loading,
    logs,
    stats,
    fetchLogs,
    fetchStats
  }
}