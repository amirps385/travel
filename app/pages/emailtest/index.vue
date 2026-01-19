<script setup lang="ts">
import { ref } from 'vue'

// Recipient + template fields
const email = ref('') // recipient
const name = ref('Test User')
const phone = ref('+255712345678')
const country = ref('Tanzania')
const timezone = ref('Africa/Dar_es_Salaam')
const message = ref('I am interested in a 7-day luxury safari for 2 people in the Serengeti. Please include hot air balloon ride.')
const ctaUrl = ref('https://zafstours.com/contact')
const heroImage = ref('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop')
const logoUrl = ref('https://via.placeholder.com/200x60/1a3c34/d4af37?text=ZAFS+TOURS')
const companyPhone = ref('+255 624 023 455')
const companyEmail = ref('info@zafstours.com')
const unsubscribeUrl = ref('https://zafstours.com/unsubscribe?token=abc123')
const scheduledAtLocal = ref('') // datetime-local value like "2026-01-30T11:00"

// Predefined preferredTime for testing
const preferredTimeOptions = [
  'Tomorrow, 10:00 AM',
  'Tomorrow, 2:00 PM',
  'March 12, 2026 — 10:30 AM',
  'March 15, 2026 — 3:00 PM',
  'March 20, 2026 — 9:00 AM'
]
const preferredTime = ref('March 12, 2026 — 10:30 AM')

const loading = ref(false)
const success = ref<string | null>(null)
const errorMsg = ref<string | null>(null)
const rawResult = ref<any>(null)

// Use runtime config to access environment variables
const config = useRuntimeConfig()

const validateEmail = (e: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

/* -------------------------
   Quick schedule helpers
   ------------------------- */
const quickScheduleOptions = [
  { label: '1 min', minutes: 1 },
  { label: '2 min', minutes: 2 },
  { label: '5 min', minutes: 5 },
  { label: '10 min', minutes: 10 },
  { label: '15 min', minutes: 15 },
  { label: '30 min', minutes: 30 }
]

function pad(n: number) { return String(n).padStart(2, '0') }

// create a datetime-local string from Date
function toDateTimeLocal(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// Set default scheduledAtLocal to 1 minute in future (useful for quick tests)
if (!scheduledAtLocal.value) {
  const now = new Date()
  const future = new Date(now.getTime() + 1 * 60 * 1000)
  scheduledAtLocal.value = toDateTimeLocal(future)
}

const setQuickSchedule = (option: any) => {
  const now = new Date()
  const future = new Date(now.getTime() + (option.minutes || 0) * 60 * 1000)
  scheduledAtLocal.value = toDateTimeLocal(future)
}

/* -------------------------
   Immediate send (transactional)
   ------------------------- */
const sendNow = async () => {
  errorMsg.value = null
  success.value = null
  rawResult.value = null

  if (!validateEmail(email.value)) {
    errorMsg.value = 'Please enter a valid recipient email.'
    return
  }
  if (!name.value) {
    errorMsg.value = 'Please enter recipient name.'
    return
  }

  loading.value = true

  try {
    const res = await $fetch('/api/emailtest/send', {
      method: 'POST',
      body: {
        email: email.value,
        name: name.value,
        phone: phone.value,
        country: country.value,
        preferredTime: preferredTime.value,
        timezone: timezone.value,
        message: message.value,
        cta_url: ctaUrl.value,
        hero_image: heroImage.value,
        logo_url: logoUrl.value,
        company_phone: companyPhone.value,
        company_email: companyEmail.value,
        unsubscribe_url: unsubscribeUrl.value
      }
    })

    rawResult.value = res
    success.value = 'Test email sent. Check the inbox (or spam).'
  } catch (err: any) {
    console.error('sendNow error', err)
    errorMsg.value = (err?.data?.message) || (err?.message) || 'Unknown error while sending'
  } finally {
    loading.value = false
  }
}

/* -------------------------
   Schedule email (transactional scheduled)
   ------------------------- */
const scheduleEmail = async () => {
  errorMsg.value = null
  success.value = null
  rawResult.value = null

  if (!validateEmail(email.value)) {
    errorMsg.value = 'Please enter a valid recipient email.'
    return
  }
  if (!scheduledAtLocal.value) {
    errorMsg.value = 'Please pick a date & time to schedule.'
    return
  }

  // ensure scheduledAtLocal is a proper future time
  const scheduledISO = new Date(scheduledAtLocal.value).toISOString()
  if (new Date(scheduledISO) <= new Date()) {
    errorMsg.value = 'Please schedule for a future date/time.'
    return
  }

  loading.value = true
  try {
    const res = await $fetch('/api/emailtest/schedule', {
      method: 'POST',
      body: {
        email: email.value,
        name: name.value,
        phone: phone.value,
        country: country.value,
        preferredTime: preferredTime.value,
        timezone: timezone.value,
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
    success.value = `Email scheduled for ${new Date(scheduledISO).toLocaleString()}.`
  } catch (err: any) {
    console.error('scheduleEmail error', err)
    errorMsg.value = (err?.data?.message) || (err?.message) || 'Unknown error while scheduling'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <header class="card-header">
        <div>
          <h1>Zafs Tours - Email Template Test</h1>
          <p class="muted">Test the "Book a Call — Confirmation" transactional email template with all parameters.</p>
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
            <div class="label">Phone Number</div>
            <input v-model="phone" type="tel" placeholder="+255712345678" />
          </label>
          <label class="field half">
            <div class="label">Country</div>
            <input v-model="country" type="text" placeholder="Tanzania" />
          </label>
        </div>

        <div class="row">
          <label class="field half">
            <div class="label">Preferred Call Time</div>
            <select v-model="preferredTime" class="select">
              <option v-for="option in preferredTimeOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </label>
          <label class="field half">
            <div class="label">Timezone</div>
            <input v-model="timezone" type="text" placeholder="Africa/Dar_es_Salaam" />
          </label>
        </div>

        <label class="field">
          <div class="label">Message / Notes ({{ message.length }} chars)</div>
          <textarea v-model="message" rows="3" />
        </label>

        <div class="row">
          <label class="field half">
            <div class="label">CTA URL</div>
            <input v-model="ctaUrl" type="url" placeholder="https://zafstours.com/book" />
          </label>
          <label class="field half">
            <div class="label">Hero Image URL</div>
            <input v-model="heroImage" type="url" placeholder="https://..." />
          </label>
        </div>

        <div class="row">
          <label class="field half">
            <div class="label">Logo URL (optional)</div>
            <input v-model="logoUrl" type="url" placeholder="https://..." />
          </label>
          <label class="field half">
            <div class="label">Company Phone</div>
            <input v-model="companyPhone" type="tel" placeholder="+255 123 456 789" />
          </label>
        </div>

        <div class="row">
          <label class="field half">
            <div class="label">Company Email</div>
            <input v-model="companyEmail" type="email" placeholder="info@zafstours.com" />
          </label>
          <label class="field half">
            <div class="label">Unsubscribe URL</div>
            <input v-model="unsubscribeUrl" type="url" placeholder="https://..." />
          </label>
        </div>

        <!-- Scheduling area -->
        <div class="row" style="align-items:center;">
          <div class="field half">
            <div class="label">Schedule (optional)</div>
            <input v-model="scheduledAtLocal" type="datetime-local" />
            <div style="font-size:12px;color:#666;margin-top:6px;">
              Scheduled: {{ scheduledAtLocal ? new Date(scheduledAtLocal).toLocaleString() : 'not set' }}
            </div>
          </div>

          <div class="actions half" style="justify-content:flex-start; gap:10px; flex-wrap:wrap;">
            <button type="button" class="btn ghost" @click="setQuickSchedule({ minutes: 1 })">In 1 min</button>
            <button type="button" class="btn ghost" @click="setQuickSchedule({ minutes: 2 })">In 2 min</button>
            <button type="button" class="btn ghost" @click="setQuickSchedule({ minutes: 5 })">In 5 min</button>
            <button type="button" class="btn ghost" @click="setQuickSchedule({ minutes: 10 })">In 10 min</button>
          </div>
        </div>

        <div class="row">
          <div class="actions half" style="justify-content:flex-end;">
            <button type="submit" class="btn primary" :disabled="loading">
              <span v-if="loading" class="spinner" aria-hidden></span>
              Send Test Email
            </button>

            <button type="button" class="btn secondary" @click="scheduleEmail" :disabled="loading">
              <span v-if="loading" class="spinner small" aria-hidden></span>
              Schedule Email
            </button>
          </div>
        </div>
      </form>

      <div v-if="errorMsg" class="feedback error">
        ⚠️ {{ errorMsg }}
      </div>
      <div v-if="success" class="feedback success">
        ✅ {{ success }}
      </div>

      <details class="result" v-if="rawResult">
        <summary>Raw API Response (click to expand)</summary>
        <pre>{{ rawResult }}</pre>
      </details>

      <div class="template-info">
        <h3>Template Parameters Being Sent:</h3>
        <div class="params-grid">
          <div><strong>name:</strong> {{ name }}</div>
          <div><strong>phone:</strong> {{ phone }}</div>
          <div><strong>country:</strong> {{ country }}</div>
          <div><strong>preferredTime:</strong> {{ preferredTime }}</div>
          <div><strong>timezone:</strong> {{ timezone }}</div>
          <div><strong>message:</strong> {{ message.substring(0, 50) }}...</div>
          <div><strong>cta_url:</strong> {{ ctaUrl }}</div>
          <div><strong>hero_image:</strong> {{ heroImage.substring(0, 40) }}...</div>
          <div><strong>logo_url:</strong> {{ logoUrl.substring(0, 40) }}...</div>
          <div><strong>company_phone:</strong> {{ companyPhone }}</div>
          <div><strong>company_email:</strong> {{ companyEmail }}</div>
          <div><strong>unsubscribe_url:</strong> {{ unsubscribeUrl.substring(0, 40) }}...</div>
        </div>
      </div>

      <footer class="card-footer muted">
        <!-- Access environment variables through config -->
        <p>Testing Template ID: 4 | Sender: {{ config.public.BREVO_SENDER_EMAIL || 'Not set' }}</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* (same styles as before) */
.page {
  min-height: 100vh;
  padding: 36px;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #f6fbfa 0%, #eef6f3 100%);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: #0f1724;
}

.card {
  width: 900px;
  max-width: 96%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(15, 23, 36, 0.08);
  padding: 24px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #eef3ef;
  padding-bottom: 16px;
  margin-bottom: 16px;
}

.logo {
  background: #1a3c34;
  color: #d4af37;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  letter-spacing: .6px;
  font-size: 16px;
  border: 2px solid #d4af37;
}

h1 {
  margin: 0;
  font-size: 22px;
  color: #1a3c34;
}

.muted {
  color: #6b7280;
  margin-top: 6px;
  font-size: 14px;
}

.form {
  margin-top: 20px;
}

.field {
  display: block;
  margin-bottom: 16px;
}

.field .label {
  font-size: 14px;
  color: #1a3c34;
  margin-bottom: 8px;
  font-weight: 600;
}

input[type="text"],
input[type="email"],
input[type="url"],
input[type="tel"],
input[type="datetime-local"],
textarea,
.select {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #e6eef0;
  background: #fff;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}

input:focus,
textarea:focus,
.select:focus {
  border-color: #1a3c34;
  box-shadow: 0 0 0 3px rgba(26, 60, 52, 0.1);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231a3c34' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}

.row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.half { flex: 1; }

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn {
  cursor: pointer;
  border: 0;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  min-width: 140px;
  text-align: center;
}

.btn.primary {
  background: linear-gradient(180deg, #d4af37, #b89427);
  color: #1a3c34;
  box-shadow: 0 6px 18px rgba(212, 175, 55, 0.25);
}

.btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(212, 175, 55, 0.35);
}

.btn.secondary {
  background:#1a3c34;
  color:white;
}

.btn.ghost {
  background: transparent;
  color: #1a3c34;
  border: 2px solid #1a3c34;
}

.btn.ghost:hover:not(:disabled) {
  background: #1a3c34;
  color: white;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.feedback {
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
}

.feedback.error {
  background: #fff4f4;
  color: #9b1c1c;
  border: 1px solid #ffd7d7;
}

.feedback.success {
  background: #f0fff4;
  color: #1f7a3a;
  border: 1px solid #d4f5d8;
}

.result {
  margin-top: 20px;
  border-radius: 8px;
  padding: 12px;
  background: #0b1721;
  color: #d6f6ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
  max-height: 300px;
  overflow: auto;
  border: 1px solid rgba(11, 23, 33, 0.06);
}

.result pre {
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
}

.template-info {
  margin-top: 30px;
  padding: 20px;
  background: #f8f5ec;
  border-radius: 8px;
  border: 1px solid #d4af37;
}

.template-info h3 {
  color: #1a3c34;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.params-grid > div {
  background: white;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #e6eef0;
  font-size: 13px;
  word-break: break-all;
}

.params-grid strong {
  color: #1a3c34;
}

.card-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eef3ef;
  font-size: 13px;
  color: #64748b;
  text-align: center;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.25);
  border-top-color: white;
  animation: spin 0.9s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

.spinner.small {
  width: 12px;
  height: 12px;
  border-width: 1.6px;
  border-top-color: #1a3c34;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
