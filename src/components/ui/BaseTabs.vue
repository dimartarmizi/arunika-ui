<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: [String, Number],
		required: true
	},
	tabs: {
		type: Array,
		required: true
	},
	variant: {
		type: String,
		default: 'bordered',
		validator: (val) => ['bordered', 'pills', 'boxed'].includes(val)
	}
})

const emit = defineEmits(['update:modelValue', 'change'])

const normalizedTabs = computed(() => {
	return props.tabs.map(tab => {
		if (typeof tab === 'string') {
			return { id: tab, label: tab }
		}
		return tab
	})
})

const selectTab = (id) => {
	if (props.modelValue !== id) {
		emit('update:modelValue', id)
		emit('change', id)
	}
}
</script>

<template>
	<div>
		<div :class="[
			'tabs',
			variant === 'bordered' ? 'tabs-bordered' : '',
			variant === 'pills' ? 'tabs-pills' : '',
			variant === 'boxed' ? 'tabs-pills tabs-boxed' : ''
		]" role="tablist">
			<button v-for="tab in normalizedTabs" :key="tab.id" type="button" role="tab" :aria-selected="modelValue === tab.id" @click="selectTab(tab.id)" :class="[
				variant === 'bordered' ? 'tab' : 'tab-pill',
				modelValue === tab.id ? 'tab-active' : ''
			]">
				<component :is="tab.icon" v-if="tab.icon" :size="16" class="shrink-0" />
				<span>{{ tab.label }}</span>
				<span v-if="tab.badge !== undefined" :class="[
					'px-1.5 py-0.5 text-[10px] rounded-full font-bold',
					modelValue === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
				]">
					{{ tab.badge }}
				</span>
			</button>
		</div>

		<div class="mt-4">
			<slot :activeTab="modelValue"></slot>
		</div>
	</div>
</template>
