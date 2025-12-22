<template>
  <div class="bg-white rounded-2xl border p-5 shadow-sm flex flex-col gap-4">
    <div class="flex items-start justify-between">
      <div>
        <div class="text-sm text-slate-500">Departure</div>
        <div class="text-lg font-bold text-slate-900">{{ formattedDate }}</div>
      </div>

      <div>
        <span :class="badgeClasses" class="px-3 py-1 rounded-full text-sm font-semibold">
          {{ climb.spotsLeft }} spots left
        </span>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 text-sm text-slate-600">
      <div>
        <div class="text-xs text-slate-500">Duration</div>
        <div class="font-medium text-slate-800">{{ climb.days }} days</div>
      </div>
      <div>
        <div class="text-xs text-slate-500">Group Size</div>
        <div class="font-medium text-slate-800">{{ climb.groupSize }} people</div>
      </div>
      <div>
        <div class="text-xs text-slate-500">Price</div>
        <div class="font-medium text-amber-700">${{ climb.price.toLocaleString() }}</div>
      </div>
    </div>

    <button @click="joinNow" class="mt-2 w-full bg-slate-900 text-white py-2 rounded-lg font-semibold hover:opacity-95">
      Join This Climb
    </button>
  </div>
</template>

<script setup>
/**
 * GroupClimbBox.vue
 * Props:
 *  - climb: { date, days, price, groupSize, spotsLeft }
 * Emits:
 *  - join (with climb object)
 */

const props = defineProps({
  climb: { type: Object, required: true }
})

const emit = defineEmits(['join'])

const formattedDate = computed(() => {
  try {
    const d = new Date(props.climb.date)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return props.climb.date || 'TBD'
  }
})

const badgeClasses = computed(() => {
  const s = Number(props.climb.spotsLeft || 0)
  if (s <= 2) return 'bg-red-100 text-red-800'
  if (s <= 5) return 'bg-amber-100 text-amber-800'
  return 'bg-green-100 text-green-800'
})

function joinNow() {
  emit('join', props.climb)
}
</script>

<style scoped>
/* nothing custom */
</style>
