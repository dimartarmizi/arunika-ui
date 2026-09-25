<script setup>
defineProps({
	modelValue: {
		type: [String, Number, Boolean],
		default: null
	},
	value: {
		type: [String, Number, Boolean],
		required: true
	},
	name: {
		type: String,
		default: ''
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

defineEmits(['update:modelValue'])
</script>

<template>
	<div>
		<label :class="['inline-flex items-center gap-2 select-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer']">
			<div class="relative flex items-center justify-center">
				<input type="radio" :name="name" :value="value" :disabled="disabled" :checked="modelValue === value" @change="$emit('update:modelValue', value)" v-bind="$attrs" :class="[
					'peer appearance-none w-5 h-5 border-2 rounded-full bg-white checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition cursor-pointer',
					error ? 'border-rose-400' : 'border-slate-300'
				]" />
				<span class="absolute w-2.5 h-2.5 bg-blue-600 rounded-full pointer-events-none hidden peer-checked:block"></span>
			</div>
			<span v-if="label" :class="['text-sm', error ? 'text-rose-700 font-medium' : 'text-slate-700']">{{ label }}</span>
		</label>
		<p v-if="typeof error === 'string' && error" class="form-hint-error">
			{{ error }}
		</p>
	</div>
</template>
