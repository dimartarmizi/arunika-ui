<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: [Boolean, Array],
		default: false
	},
	value: {
		type: [String, Number, Boolean],
		default: true
	},
	label: {
		type: String,
		default: ''
	},
	error: {
		type: [String, Boolean],
		default: false
	},
	hint: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => {
	if (Array.isArray(props.modelValue)) {
		return props.modelValue.includes(props.value)
	}
	return typeof props.modelValue === 'boolean' ? props.modelValue : props.modelValue === props.value
})

const handleChange = (e) => {
	if (props.disabled) return
	if (Array.isArray(props.modelValue)) {
		const list = [...props.modelValue]
		if (e.target.checked) {
			list.push(props.value)
		} else {
			const idx = list.indexOf(props.value)
			if (idx > -1) list.splice(idx, 1)
		}
		emit('update:modelValue', list)
	} else {
		emit('update:modelValue', e.target.checked)
	}
}
</script>

<template>
	<div>
		<label :class="['inline-flex items-center gap-2 select-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer']">
			<div class="relative flex items-center justify-center">
				<input type="checkbox" :checked="isChecked" :disabled="disabled" @change="handleChange" v-bind="$attrs" :class="[
					'peer appearance-none w-5 h-5 border-2 rounded-lg bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition cursor-pointer',
					error ? 'border-rose-400' : 'border-slate-300'
				]" />
				<svg class="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
			</div>
			<span v-if="label" :class="['text-sm', error ? 'text-rose-700 font-medium' : 'text-slate-700']">{{ label }}</span>
		</label>
		<p v-if="typeof error === 'string' && error" class="form-hint-error">
			{{ error }}
		</p>
		<p v-else-if="hint" class="form-hint">
			{{ hint }}
		</p>
	</div>
</template>
