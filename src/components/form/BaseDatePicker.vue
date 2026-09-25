<script setup>
import { computed } from 'vue'
import { IconCalendar, IconClock, IconAlertCircle, IconCircleCheck, IconAlertTriangle } from '@tabler/icons-vue'

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'date'
	},
	state: {
		type: String,
		default: null,
		validator: (val) => [null, 'error', 'success', 'warning'].includes(val)
	},
	error: {
		type: [String, Boolean],
		default: false
	},
	success: {
		type: [String, Boolean],
		default: false
	},
	warning: {
		type: [String, Boolean],
		default: false
	},
	hint: {
		type: String,
		default: ''
	},
	required: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	}
})

defineEmits(['update:modelValue'])

const isTime = computed(() => props.type === 'time')

const computedState = computed(() => {
	if (props.error) return 'error'
	if (props.success) return 'success'
	if (props.warning) return 'warning'
	return props.state || null
})

const feedbackMessage = computed(() => {
	if (typeof props.error === 'string' && props.error) return props.error
	if (typeof props.success === 'string' && props.success) return props.success
	if (typeof props.warning === 'string' && props.warning) return props.warning
	return props.hint || ''
})

const openPicker = (e) => {
	if (!props.disabled && e.target.showPicker) {
		try {
			e.target.showPicker()
		} catch (_) { }
	}
}
</script>

<template>
	<div class="w-full">
		<label v-if="label" class="form-label flex items-center justify-between">
			<span>
				{{ label }}
				<span v-if="required" class="text-rose-500 font-bold ml-0.5">*</span>
			</span>
			<slot name="label-extra" />
		</label>
		<div class="relative">
			<input :type="type" :value="modelValue" :disabled="disabled" :required="required" @input="$emit('update:modelValue', $event.target.value)" @click="openPicker" v-bind="$attrs" :class="[
				'input pr-10 cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer',
				computedState === 'error' ? 'input-error' : '',
				computedState === 'success' ? 'input-success' : '',
				computedState === 'warning' ? 'input-warning' : '',
				disabled ? 'cursor-not-allowed opacity-60' : ''
			]" />
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 gap-1.5">
				<IconAlertCircle v-if="computedState === 'error'" :size="16" class="text-rose-500" />
				<IconCircleCheck v-else-if="computedState === 'success'" :size="16" class="text-emerald-500" />
				<IconAlertTriangle v-else-if="computedState === 'warning'" :size="16" class="text-amber-500" />
				<IconClock v-if="isTime" :size="18" />
				<IconCalendar v-else :size="18" />
			</div>
		</div>

		<p v-if="feedbackMessage" :class="[
			computedState === 'error' ? 'form-hint-error' : '',
			computedState === 'success' ? 'form-hint-success' : '',
			computedState === 'warning' ? 'form-hint-warning' : '',
			!computedState ? 'form-hint' : ''
		]">
			<span>{{ feedbackMessage }}</span>
		</p>
	</div>
</template>
