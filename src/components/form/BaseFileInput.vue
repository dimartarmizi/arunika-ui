<script setup>
import { computed } from 'vue'
import { IconUpload, IconAlertCircle, IconCircleCheck, IconAlertTriangle } from '@tabler/icons-vue'

const props = defineProps({
	label: {
		type: String,
		default: ''
	},
	dropzone: {
		type: Boolean,
		default: false
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

defineEmits(['change'])

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
				<span v-if="required" class="text-destructive font-bold ml-0.5">*</span>
			</span>
		</label>

		<label v-if="dropzone" :class="[
			'flex items-center justify-center gap-3 px-4 py-2.5 border-2 border-dashed rounded-xl transition group h-[42px]',
			disabled ? 'opacity-50 cursor-not-allowed bg-muted border-border' : 'cursor-pointer',
			computedState === 'error' ? 'border-destructive bg-destructive-soft' : '',
			computedState === 'success' ? 'border-success bg-success-soft' : '',
			computedState === 'warning' ? 'border-warning bg-warning-soft' : '',
			!computedState && !disabled ? 'border-border hover:border-primary bg-background/50 hover:bg-primary-soft' : ''
		]">
			<IconUpload :size="18" class="text-muted-foreground group-hover:text-primary transition shrink-0" />
			<span class="text-xs text-muted-foreground">
				<span class="font-semibold text-primary">Choose a file</span> or drag it here
			</span>
			<input type="file" :disabled="disabled" class="hidden" @change="$emit('change', $event)" v-bind="$attrs" />
		</label>

		<input v-else type="file" :disabled="disabled" @change="$emit('change', $event)" v-bind="$attrs" :class="[
			'w-full text-xs text-muted-foreground file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary-hover file:cursor-pointer file:transition border rounded-xl bg-background focus:outline-none cursor-pointer',
			computedState === 'error' ? 'border-destructive bg-destructive-soft' : '',
			computedState === 'success' ? 'border-success bg-success-soft' : '',
			computedState === 'warning' ? 'border-warning bg-warning-soft' : '',
			!computedState ? 'border-border' : '',
			disabled ? 'opacity-50 cursor-not-allowed' : ''
		]" />

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
