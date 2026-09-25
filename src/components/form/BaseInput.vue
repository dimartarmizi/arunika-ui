<script setup>
import { computed } from 'vue'
import { IconAlertCircle, IconCircleCheck, IconAlertTriangle } from '@tabler/icons-vue'

const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'text'
	},
	placeholder: {
		type: String,
		default: ''
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
			<span v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
				<slot name="prefix" />
			</span>

			<input :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled" :required="required" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" :class="[
				'input',
				$slots.prefix ? 'pl-10' : 'px-3.5',
				($slots.suffix || computedState) ? 'pr-10' : 'pr-3.5',
				computedState === 'error' ? 'input-error' : '',
				computedState === 'success' ? 'input-success' : '',
				computedState === 'warning' ? 'input-warning' : ''
			]" />

			<div v-if="$slots.suffix" class="absolute inset-y-0 right-0 pr-3.5 flex items-center">
				<slot name="suffix" />
			</div>
			<div v-else-if="computedState" class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
				<IconAlertCircle v-if="computedState === 'error'" :size="18" class="text-rose-500" />
				<IconCircleCheck v-else-if="computedState === 'success'" :size="18" class="text-emerald-500" />
				<IconAlertTriangle v-else-if="computedState === 'warning'" :size="18" class="text-amber-500" />
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
