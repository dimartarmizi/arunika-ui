<script setup>
defineProps({
	modelValue: {
		type: [Number, String],
		default: 50
	},
	label: {
		type: String,
		default: ''
	},
	min: {
		type: [Number, String],
		default: 0
	},
	max: {
		type: [Number, String],
		default: 100
	}
})

defineEmits(['update:modelValue'])
</script>

<template>
	<div>
		<label v-if="label" class="form-label">
			{{ label }}
		</label>
		<input type="range" :min="min" :max="max" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3" />
	</div>
</template>
