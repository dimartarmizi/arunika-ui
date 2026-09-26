<script setup>
import { computed, onMounted } from 'vue'
import {
	IconCircleCheck,
	IconInfoCircle,
	IconAlertTriangle,
	IconAlertCircle,
	IconX
} from '@tabler/icons-vue'

const props = defineProps({
	variant: {
		type: String,
		default: 'info',
		validator: (val) => ['info', 'success', 'warning', 'error', 'neutral'].includes(val)
	},
	title: {
		type: String,
		default: ''
	},
	duration: {
		type: Number,
		default: 0
	},
	dismissible: {
		type: Boolean,
		default: true
	}
})

const emit = defineEmits(['close'])

const defaultIcon = computed(() => {
	switch (props.variant) {
		case 'success':
			return IconCircleCheck
		case 'warning':
			return IconAlertTriangle
		case 'error':
			return IconAlertCircle
		case 'neutral':
			return null
		case 'info':
		default:
			return IconInfoCircle
	}
})

const toastVariantClass = computed(() => {
	switch (props.variant) {
		case 'success':
			return 'toast-item-success'
		case 'warning':
			return 'toast-item-warning'
		case 'error':
			return 'toast-item-destructive'
		case 'neutral':
			return 'toast-item-neutral'
		case 'info':
		default:
			return 'toast-item-info'
	}
})

onMounted(() => {
	if (props.duration > 0) {
		setTimeout(() => {
			emit('close')
		}, props.duration)
	}
})
</script>

<template>
	<div :class="['toast-item min-w-72 max-w-sm', toastVariantClass]" role="status">
		<slot name="icon">
			<component :is="defaultIcon" v-if="defaultIcon" :size="20" class="shrink-0" />
		</slot>

		<div class="flex-1 min-w-0">
			<p v-if="title" class="font-semibold text-xs leading-tight">{{ title }}</p>
			<p :class="title ? 'text-xs opacity-90 mt-0.5' : 'text-xs'">
				<slot></slot>
			</p>
		</div>

		<button v-if="dismissible" type="button" @click="$emit('close')" class="p-1 hover:bg-foreground/10 rounded-lg transition shrink-0 cursor-pointer" aria-label="Dismiss toast">
			<IconX :size="14" />
		</button>
	</div>
</template>
