<template>
  <div class="flex items-center gap-3 bg-white border rounded-2xl p-3">
    <div class="text-sm text-slate-600 font-medium">Choose days</div>

    <div class="flex gap-2">
      <button
        v-for="opt in options"
        :key="opt"
        @click="select(opt)"
        :class="['px-3 py-2 rounded-md text-sm font-semibold', selected === opt ? 'bg-amber-600 text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100']"
      >
        {{ opt }}d
      </button>
    </div>

    <div class="ml-auto text-sm text-slate-500">Selected: <span class="font-semibold text-slate-800">{{ selected }} days</span></div>
  </div>
</template>

<script setup>
/**
 * ItinerarySelector.vue
 * Props:
 *  - options: Array<number> (e.g. [5,6,7,8])
 *  - modelValue / selected (Number) optional
 * Emits:
 *  - update:selected (v-model style) and "change"
 */

const props = defineProps({
  options: { type: Array, default: () => [5,6,7,8] },
  selected: { type: Number, default: null }
})

const emit = defineEmits(['update:selected','change'])

function select(opt) {
  emit('update:selected', opt)
  emit('change', opt)
}
</script>

<style scoped>
/* nothing custom */
</style>
