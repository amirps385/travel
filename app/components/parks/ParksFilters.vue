<template>
  <div
    class="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6"
  >
    <div class="flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
      <!-- LEFT: Filters -->
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Region Filter -->
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">
            Region
          </label>
          <select
            v-model="local.region"
            class="min-w-[200px] rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="">All regions</option>
            <option
              v-for="r in regions"
              :key="r"
              :value="r"
            >
              {{ r }}
            </option>
          </select>
        </div>

        <!-- Category Filter -->
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">
            Park type
          </label>
          <select
            v-model="local.category"
            class="min-w-[200px] rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="">All types</option>
            <option
              v-for="c in categories"
              :key="c"
              :value="c"
            >
              {{ c }}
            </option>
          </select>
        </div>
      </div>

      <!-- RIGHT: Clear -->
      <button
        v-if="local.region || local.category"
        @click="clear"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
               text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
      >
        Clear filters
        <span class="text-lg">✕</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  parks: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const local = reactive({
  region: props.modelValue.region || '',
  category: props.modelValue.category || ''
})

/* Unique regions & categories from parks */
const regions = computed(() => {
  return [...new Set(props.parks.map(p => p.region).filter(Boolean))].sort()
})

const categories = computed(() => {
  return [...new Set(props.parks.map(p => p.category).filter(Boolean))].sort()
})

watch(
  () => ({ ...local }),
  (val) => emit('update:modelValue', val),
  { deep: true }
)

function clear () {
  local.region = ''
  local.category = ''
}
</script>
