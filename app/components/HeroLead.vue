<template>
  <form @submit.prevent="submitLead" class="simple-lead-form">
    <!-- Form Fields -->
    <div class="form-fields">
      <!-- Adult Field -->
      <div class="field-group">
        <label class="field-label">
          <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Adult
        </label>
        <div class="field-input">
          <input
            v-model.number="form.adults"
            type="number"
            min="1"
            max="20"
            required
            class="simple-input"
            @input="handleNumberInput($event, 'adults')"
          />
        </div>
      </div>
      
      <!-- Children Field -->
      <div class="field-group">
        <label class="field-label">
          <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Children
        </label>
        <div class="field-input">
          <input
            v-model.number="form.children"
            type="number"
            min="0"
            max="20"
            class="simple-input"
            @input="handleNumberInput($event, 'children')"
          />
        </div>
      </div>
      
      <!-- Travel Date Field - Fixed Placeholder Inside -->
      <div class="field-group">
        <label class="field-label">
          <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Travel Date
        </label>
        <div class="field-input date-wrapper">
          <input
            v-model="form.arrivalDate"
            type="date"
            required
            :min="minDate"
            class="simple-input date-input"
            :class="{ 'has-value': form.arrivalDate }"
          />
          <span v-if="!form.arrivalDate" class="date-placeholder">Pick a date</span>
        </div>
      </div>
    </div>
    
    <!-- Submit Button -->
    <button type="submit" :disabled="loading" class="submit-button">
      <span v-if="!loading">Get My Personalized Plan</span>
      <span v-else>Creating your plan...</span>
    </button>
    
    <!-- Trust Badge -->
    <p class="trust-badge">
      Trusted by 1000+ travelers. <a href="#" class="review-link">Check review!</a>
    </p>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const form = ref({
  adults: 1,
  children: 0,
  arrivalDate: ''
})

const loading = ref(false)

const handleNumberInput = (event, field) => {
  let value = parseInt(event.target.value) || 0
  if (value < 0) value = 0
  if (value > 20) value = 20
  form.value[field] = value
}

const submitLead = async () => {
  if (!form.value.adults || !form.value.arrivalDate) {
    alert('Please fill in all required fields')
    return
  }

  loading.value = true

  try {
    const sessionId = `hero_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('hero') || key.includes('prefilled') || key === 'heroSessionId') {
          localStorage.removeItem(key)
        }
      })
      sessionStorage.clear()
    }

    const leadData = {
      adults: parseInt(form.value.adults),
      children: parseInt(form.value.children) || 0,
      arrivalDate: form.value.arrivalDate,
      totalTravelers: parseInt(form.value.adults) + (parseInt(form.value.children) || 0),
      source: 'hero_quick_lead',
      leadSourceDetail: `Homepage Quick Planner - ${form.value.adults}A/${form.value.children}C - ${form.value.arrivalDate}`,
      submittedAt: new Date().toISOString(),
      sessionId: sessionId
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('heroSessionId', sessionId)
      const dataWithExpiry = {
        ...leadData,
        _expiry: Date.now() + (5 * 60 * 1000)
      }
      localStorage.setItem('heroLeadData', JSON.stringify(dataWithExpiry))
    }

    const params = new URLSearchParams()
    params.append('prefilled', 'true')
    params.append('adults', form.value.adults)
    params.append('children', form.value.children || '0')
    params.append('arrivalDate', form.value.arrivalDate)
    params.append('source', 'hero_quick')
    params.append('sessionId', sessionId)
    
    const total = parseInt(form.value.adults) + (parseInt(form.value.children) || 0)
    params.append('travelers', total)

    if (window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname)
    }
    
    window.location.href = `/journey?${params.toString()}`

  } catch (error) {
    console.error('Error submitting lead:', error)
    alert('Something went wrong. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.simple-lead-form {
  width: 100%;
  font-family: 'Inter', sans-serif;
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.field-group {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: none;
}

.field-icon {
  width: 14px;
  height: 14px;
  color: #666;
}

.field-input {
  position: relative;
  width: 100%;
}

.simple-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  background: #fafafa;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}

.simple-input:focus {
  outline: none;
  border-color: #c9a962;
  background: white;
  box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.1);
}

.simple-input::-webkit-inner-spin-button,
.simple-input::-webkit-outer-spin-button {
  opacity: 1;
  height: 24px;
  cursor: pointer;
}

/* FIXED Date Input Styling - Placeholder inside */
.date-wrapper {
  position: relative;
}

.date-input {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  background: #fafafa;
  font-family: 'Inter', sans-serif;
}

/* Hide default browser text when empty, but keep input clickable */
.date-input:not(.has-value) {
  color: transparent;
  background: transparent; /* Let parent background show through or keep consistent */
}

/* When date is selected, show text normally */
.date-input.has-value {
  color: #333;
  background: #fafafa;
}

.date-input:focus {
  outline: none;
  border-color: #c9a962;
  background: white;
  box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.1);
}

/* The placeholder text sits ON TOP of the input (z-index: 3) */
.date-placeholder {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: #999;
  font-size: 15px;
  pointer-events: none; /* Let clicks pass through to input */
  z-index: 3; /* Higher than input */
  font-family: 'Inter', sans-serif;
}

/* Date picker icon - clickable area covers full input */
.date-input::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
  z-index: 4; /* Even higher so calendar icon works */
}

.submit-button {
  width: 100%;
  padding: 16px 24px;
  background: #c9a962;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 16px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 12px rgba(201, 169, 98, 0.3);
}

.submit-button:hover {
  background: #b89a50;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(201, 169, 98, 0.4);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.trust-badge {
  text-align: center;
  font-size: 13px;
  color: #1C1A17;
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.review-link {
  color: #c9a962;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.review-link:hover {
  border-bottom-color: #c9a962;
}

@media (max-width: 768px) {
  .form-fields {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .submit-button {
    padding: 16px;
    font-size: 16px;
  }
}
</style>