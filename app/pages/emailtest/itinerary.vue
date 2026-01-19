<script setup lang="ts">
import { ref } from 'vue'

/* --- Inputs --- */
const email = ref('')
const name = ref('Test User')
const tripName = ref('Custom itinerary request')
const days = ref(7)
const travellers = ref('2 people')
const interests = ref('Wildlife, Luxury lodges')
const message = ref('Please include a hot air balloon ride and private vehicle.')
const ctaUrl = ref('https://zafstours.com/contact')
const heroImage = ref('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop')
const logoUrl = ref('https://via.placeholder.com/200x60/1a3c34/d4af37?text=ZAFS+TOURS')
const companyPhone = ref('+255 624 023 455')
const companyEmail = ref('info@zafstours.com')
const unsubscribeUrl = ref('https://zafstours.com/privacy')
const scheduledAtLocal = ref('') // datetime-local value like "2026-01-30T11:00"

/* --- UI state --- */
const loading = ref(false)
const loadingSchedule = ref(false)
const success = ref<string | null>(null)
const errorMsg = ref<string | null>(null)
const rawResult = ref<any>(null)

// Use runtime config for environment variables
const config = useRuntimeConfig()

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

/* --- Helper to get a future date/time for testing --- */
const getDefaultScheduleTime = () => {
  const now = new Date()
  // Schedule for 10 minutes from now (for testing)
  const future = new Date(now.getTime() + 10 * 60 * 1000)
  // Format as YYYY-MM-DDTHH:mm for datetime-local input
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${future.getFullYear()}-${pad(future.getMonth() + 1)}-${pad(future.getDate())}T${pad(future.getHours())}:${pad(future.getMinutes())}`
}

// Set default schedule time for convenience
if (!scheduledAtLocal.value) {
  scheduledAtLocal.value = getDefaultScheduleTime()
}

/* --- send immediate transactional email --- */
const sendNow = async () => {
  errorMsg.value = null
  success.value = null
  rawResult.value = null
  if (!validateEmail(email.value)) { errorMsg.value = 'Please enter a valid recipient email.'; return }
  if (!name.value) { errorMsg.value = 'Please enter recipient name.'; return }

  loading.value = true
  try {
    const res = await $fetch('/api/emailtest/send-itinerary', {
      method: 'POST',
      body: {
        email: email.value,
        name: name.value,
        tripName: tripName.value,
        days: days.value,
        travellers: travellers.value,
        interests: interests.value,
        message: message.value,
        cta_url: ctaUrl.value,
        hero_image: heroImage.value,
        logo_url: logoUrl.value,
        company_phone: companyPhone.value,
        company_email: companyEmail.value,
        unsubscribe_url: unsubscribeUrl.value,
        templateId: 5    // <-- FORCE template 5
      }
    })
    rawResult.value = res
    success.value = 'Itinerary request email sent. Check inbox (or spam).'
  } catch (err: any) {
    console.error('sendNow error', err)
    errorMsg.value = (err?.data?.message) || (err?.message) || 'Unknown error while sending'
  } finally {
    loading.value = false
  }
}

/* --- schedule as campaign (optional) --- */
const scheduleEmail = async () => {
  errorMsg.value = null
  success.value = null
  rawResult.value = null
  if (!validateEmail(email.value)) { errorMsg.value = 'Please enter a valid recipient email.'; return }
  if (!scheduledAtLocal.value) { errorMsg.value = 'Please pick a date & time to schedule.'; return }

  // Validate that scheduled time is in the future
  const scheduledTime = new Date(scheduledAtLocal.value).getTime()
  const now = new Date().getTime()
  if (scheduledTime <= now) {
    errorMsg.value = 'Please schedule for a future date/time.'
    return
  }

  loadingSchedule.value = true
  try {
    const scheduledISO = new Date(scheduledAtLocal.value).toISOString()
    const res = await $fetch('/api/emailtest/schedule-itinerary', {
      method: 'POST',
      body: {
        email: email.value,
        name: name.value,
        tripName: tripName.value,
        days: days.value,
        travellers: travellers.value,
        interests: interests.value,
        message: message.value,
        cta_url: ctaUrl.value,
        hero_image: heroImage.value,
        logo_url: logoUrl.value,
        company_phone: companyPhone.value,
        company_email: companyEmail.value,
        unsubscribe_url: unsubscribeUrl.value,
        scheduledAt: scheduledISO
      }
    })
    rawResult.value = res
    success.value = `Campaign scheduled for ${new Date(scheduledISO).toLocaleString()}. Check Brevo dashboard for campaign status.`
  } catch (err: any) {
    console.error('scheduleEmail error', err)
    errorMsg.value = (err?.data?.message) || (err?.message) || 'Unknown error while scheduling'
  } finally {
    loadingSchedule.value = false
  }
}

/* --- Quick schedule options --- */
const quickScheduleOptions = [
  { label: 'In 5 minutes', minutes: 5 },
  { label: 'In 15 minutes', minutes: 15 },
  { label: 'In 30 minutes', minutes: 30 },
  { label: 'In 1 hour', minutes: 60 },
  { label: 'Tomorrow at 10 AM', hours: 24 },
  { label: 'Day after tomorrow at 2 PM', hours: 48 }
]

const setQuickSchedule = (option: any) => {
  const now = new Date()
  let futureTime
  
  if (option.minutes) {
    futureTime = new Date(now.getTime() + option.minutes * 60 * 1000)
  } else if (option.hours) {
    futureTime = new Date(now.getTime() + option.hours * 60 * 60 * 1000)
  }
  
  if (futureTime) {
    const pad = (n: number) => String(n).padStart(2, '0')
    scheduledAtLocal.value = `${futureTime.getFullYear()}-${pad(futureTime.getMonth() + 1)}-${pad(futureTime.getDate())}T${pad(futureTime.getHours())}:${pad(futureTime.getMinutes())}`
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <header class="card-header">
        <div>
          <h1>Zafs Tours — Custom Itinerary Test</h1>
          <p class="muted">Send a confirmation email for a visitor's custom itinerary request</p>
        </div>
        <div class="logo">ZAFS TOURS</div>
      </header>

      <form @submit.prevent="sendNow" class="form">
        <div class="row">
          <label class="field half">
            <div class="label">Recipient Email *</div>
            <input v-model="email" type="email" placeholder="recipient@example.com" required />
          </label>
          <label class="field half">
            <div class="label">Recipient Name *</div>
            <input v-model="name" type="text" placeholder="John Doe" required />
          </label>
        </div>

        <div class="row">
          <label class="field half">
            <div class="label">Trip / Itinerary</div>
            <input v-model="tripName" type="text" />
          </label>
          <label class="field half">
            <div class="label">Days</div>
            <input v-model="days" type="number" min="1" />
          </label>
        </div>

        <div class="row">
          <label class="field half">
            <div class="label">Travellers</div>
            <input v-model="travellers" type="text" />
          </label>
          <label class="field half">
            <div class="label">Interests</div>
            <input v-model="interests" type="text" />
          </label>
        </div>

        <label class="field">
          <div class="label">Message / Notes</div>
          <textarea v-model="message" rows="3" />
        </label>

        <div class="row">
          <label class="field half">
            <div class="label">CTA URL</div>
            <input v-model="ctaUrl" type="url" />
          </label>
          <label class="field half">
            <div class="label">Hero Image URL</div>
            <input v-model="heroImage" type="url" />
          </label>
        </div>

        <div class="row">
          <label class="field half">
            <div class="label">Company Phone</div>
            <input v-model="companyPhone" type="tel" />
          </label>
          <label class="field half">
            <div class="label">Company Email</div>
            <input v-model="companyEmail" type="email" />
          </label>
        </div>

        <!-- SCHEDULE SECTION -->
        <div class="schedule-section">
          <h3 style="color:#1a3c34; margin-bottom:15px; font-size:16px;">Schedule Email Campaign</h3>
          
          <div class="quick-schedule">
            <span style="color:#666; font-size:14px; margin-right:10px;">Quick schedule:</span>
            <div class="quick-buttons">
              <button 
                v-for="option in quickScheduleOptions" 
                :key="option.label"
                type="button"
                @click="setQuickSchedule(option)"
                class="quick-btn"
              >
                {{ option.label }}
              </button>
            </div>
          </div>

          <div class="row" style="margin-top:15px;">
            <label class="field">
              <div class="label">Schedule Date & Time *</div>
              <input v-model="scheduledAtLocal" type="datetime-local" required />
              <div style="font-size:12px; color:#666; margin-top:5px;">
                Currently set to: {{ new Date(scheduledAtLocal).toLocaleString() }}
              </div>
            </label>
          </div>
        </div>

        <div class="row">
          <div class="actions">
            <button class="btn primary" type="submit" :disabled="loading">
              <span v-if="loading" class="spinner" aria-hidden></span>
              Send Immediate Email
            </button>
            <button type="button" class="btn secondary" @click="scheduleEmail" :disabled="loadingSchedule">
              <span v-if="loadingSchedule" class="spinner" aria-hidden></span>
              Schedule Campaign
            </button>
            <button type="button" class="btn ghost" @click="sendNow" :disabled="loading">
              <span v-if="loading" class="spinner small" aria-hidden></span>
              Test Template Only
            </button>
          </div>
        </div>
      </form>

      <div v-if="errorMsg" class="feedback error">⚠️ {{ errorMsg }}</div>
      <div v-if="success" class="feedback success">✅ {{ success }}</div>

      <details class="result" v-if="rawResult">
        <summary>Raw API Response (click to expand)</summary>
        <pre>{{ rawResult }}</pre>
      </details>

      <div class="info-box">
        <h3 style="color:#1a3c34; margin-top:0; margin-bottom:10px; font-size:16px;">What's being tested?</h3>
        <ul style="margin:0; padding-left:20px; color:#333; font-size:14px;">
          <li><strong>Immediate Email:</strong> Uses Brevo Template ID 5 (transactional)</li>
          <li><strong>Scheduled Campaign:</strong> Creates a new email campaign in Brevo with custom HTML</li>
          <li><strong>Parameters sent:</strong> All form fields are passed to the API</li>
          <li><strong>Schedule time:</strong> {{ new Date(scheduledAtLocal).toLocaleString() }}</li>
        </ul>
      </div>

      <footer class="card-footer muted">
        <!-- Use config.public to access environment variables -->
        <p>Sender: {{ config.public?.BREVO_SENDER_EMAIL || 'From environment' }} | Template ID: 5</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.page { 
  min-height:100vh; 
  padding:36px; 
  display:flex; 
  justify-content:center; 
  background:linear-gradient(180deg,#f6fbfa 0,#eef6f3 100%); 
  font-family:Inter,Arial; 
}

.card { 
  width:900px; 
  max-width:96%; 
  background:white; 
  border-radius:12px; 
  padding:30px; 
  box-shadow:0 8px 30px rgba(0,0,0,0.08); 
}

.card-header { 
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  gap:12px; 
  border-bottom:1px solid #eef3ef; 
  padding-bottom:16px; 
  margin-bottom:20px; 
}

.logo { 
  background:#1a3c34; 
  color:#d4af37; 
  padding:10px 16px; 
  border-radius:8px; 
  font-weight:700; 
  border:2px solid #d4af37;
}

.label { 
  font-size:14px; 
  color:#1a3c34; 
  margin-bottom:8px; 
  font-weight:600; 
}

input, textarea { 
  width:100%; 
  padding:12px; 
  border-radius:8px; 
  border:1px solid #e6eef0; 
  font-size:14px; 
  box-sizing:border-box;
}

textarea {
  min-height:80px;
  resize:vertical;
}

.row { 
  display:flex; 
  gap:16px; 
  margin-bottom:16px; 
  align-items:flex-end; 
}

.half { flex:1; }

.actions { 
  display:flex; 
  gap:12px; 
  justify-content:flex-start; 
  flex-wrap:wrap;
  margin-top:20px;
}

.btn { 
  padding:12px 20px; 
  border-radius:8px; 
  font-weight:600; 
  cursor:pointer; 
  border:none;
  font-size:14px;
  transition:all 0.2s;
  min-width:140px;
}

.btn.primary { 
  background:linear-gradient(180deg,#d4af37,#b89427); 
  color:#1a3c34; 
}

.btn.primary:hover:not(:disabled) {
  transform:translateY(-2px);
  box-shadow:0 4px 12px rgba(212, 175, 55, 0.3);
}

.btn.secondary {
  background:#1a3c34;
  color:white;
}

.btn.secondary:hover:not(:disabled) {
  background:#2c5a4d;
  transform:translateY(-2px);
  box-shadow:0 4px 12px rgba(26, 60, 52, 0.3);
}

.btn.ghost { 
  background:transparent; 
  color:#1a3c34; 
  border:2px solid #1a3c34; 
}

.btn.ghost:hover:not(:disabled) {
  background:#1a3c34;
  color:white;
}

.btn:disabled { 
  opacity:0.6; 
  cursor:not-allowed;
}

.feedback { 
  margin-top:20px; 
  padding:14px; 
  border-radius:8px; 
  font-weight:600; 
  font-size:14px;
}

.feedback.error { 
  background:#fff4f4; 
  color:#9b1c1c; 
  border:1px solid #ffd7d7; 
}

.feedback.success { 
  background:#f0fff4; 
  color:#1f7a3a; 
  border:1px solid #d4f5d8; 
}

.result { 
  margin-top:20px; 
  padding:12px; 
  background:#0b1721; 
  color:#d6f6ff; 
  border-radius:8px; 
  max-height:300px; 
  overflow:auto; 
}

.spinner { 
  display:inline-block; 
  width:16px; 
  height:16px; 
  border-radius:50%; 
  border:2px solid rgba(255,255,255,0.25); 
  border-top-color:white; 
  animation:spin .9s linear infinite; 
  margin-right:8px; 
}

.spinner.small { 
  width:12px; 
  height:12px; 
  border-width:1.6px; 
  border-top-color:#1a3c34; 
}

@keyframes spin { to { transform: rotate(360deg) } }

.schedule-section {
  margin:30px 0;
  padding:20px;
  background:#f8fafc;
  border-radius:8px;
  border:1px solid #eef6f3;
}

.quick-schedule {
  margin-bottom:15px;
}

.quick-buttons {
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:8px;
}

.quick-btn {
  padding:8px 12px;
  background:white;
  border:1px solid #d4af37;
  border-radius:6px;
  color:#1a3c34;
  font-size:12px;
  cursor:pointer;
  transition:all 0.2s;
}

.quick-btn:hover {
  background:#d4af37;
  color:#1a3c34;
}

.info-box {
  margin-top:25px;
  padding:20px;
  background:#f8f5ec;
  border-radius:8px;
  border:1px solid #d4af37;
}

.card-footer { 
  margin-top:25px; 
  padding-top:16px; 
  border-top:1px solid #eef3ef; 
  color:#64748b; 
  font-size:13px; 
  text-align:center; 
}
</style>