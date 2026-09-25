<script setup>
defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	label: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	error: {
		type: [String, Boolean],
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	}
})

defineEmits(['update:modelValue'])
</script>

<template>
	<div>
		<label :class="['inline-flex items-center gap-3 select-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer']">
			<span class="relative inline-flex items-center">
				<input type="checkbox" :checked="modelValue" :disabled="disabled" @change="$emit('update:modelValue', $event.target.checked)" class="sr-only peer" />
				<span class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-colors"></span>
			</span>
			<div v-if="label || description">
				<span v-if="label" :class="['text-sm font-medium block', error ? 'text-rose-700' : 'text-slate-700']">{{ label }}</span>
				<span v-if="description" class="text-xs text-slate-400 block">{{ description }}</span>
			</div>
		</label>
		<p v-if="typeof error === 'string' && error" class="form-hint-error">
			{{ error }}
		</p>
	</div>
</template>
