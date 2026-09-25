<script setup>
import { computed } from 'vue'
import {
	IconInfoCircle,
	IconCircleCheck,
	IconAlertTriangle,
	IconAlertCircle,
	IconX
} from '@tabler/icons-vue'

const props = defineProps({
	variant: {
		type: String,
		default: 'info',
		validator: (val) => ['info', 'success', 'warning', 'error'].includes(val)
	},
	title: {
		type: String,
		default: ''
	},
	dismissible: {
		type: Boolean,
		default: false
	},
	modelValue: {
		type: Boolean,
		default: true
	}
})

const emit = defineEmits(['update:modelValue', 'close'])

const variantClass = computed(() => `alert-${props.variant}`)

const defaultIcon = computed(() => {
	switch (props.variant) {
		case 'success':
			return IconCircleCheck
		case 'warning':
			return IconAlertTriangle
		case 'error':
			return IconAlertCircle
		case 'info':
		default:
			return IconInfoCircle
	}
})

const dismiss = () => {
	emit('update:modelValue', false)
	emit('close')
}
</script>

<template>
	<div v-if="modelValue" :class="['alert', variantClass]" role="alert">
		<slot name="icon">
			<component :is="defaultIcon" :size="20" class="shrink-0 mt-0.5 sm:mt-0" />
		</slot>

		<div class="flex-1 min-w-0">
			<h4 v-if="title" class="font-semibold text-sm leading-snug">{{ title }}</h4>
			<div :class="title ? 'text-xs opacity-90 mt-0.5' : 'text-sm'">
				<slot></slot>
			</div>
		</div>

		<slot name="actions"></slot>

		<button v-if="dismissible" type="button" @click="dismiss" class="btn btn-ghost btn-icon btn-sm hover:bg-black/5 rounded-lg transition shrink-0 cursor-pointer" aria-label="Dismiss alert">
			<IconX :size="16" />
		</button>
	</div>
</template>
