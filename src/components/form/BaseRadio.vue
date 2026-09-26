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
					'peer appearance-none w-5 h-5 border-2 rounded-full bg-card checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition cursor-pointer',
					error ? 'border-destructive' : 'border-border'
				]" />
				<span class="absolute w-2.5 h-2.5 bg-primary rounded-full pointer-events-none hidden peer-checked:block"></span>
			</div>
			<span v-if="label" :class="['text-sm', error ? 'text-destructive font-medium' : 'text-muted-foreground']">{{ label }}</span>
		</label>
		<p v-if="typeof error === 'string' && error" class="form-hint-error">
			{{ error }}
		</p>
	</div>
</template>
