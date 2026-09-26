<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { IconChevronDown, IconCheck, IconAlertCircle, IconCircleCheck, IconAlertTriangle } from '@tabler/icons-vue'

const props = defineProps({
	modelValue: {
		type: [String, Number, null],
		default: null
	},
	options: {
		type: Array,
		default: () => []
	},
	label: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: 'Select an option...'
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

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectRef = ref(null)

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

const normalizedOptions = computed(() => {
	return props.options.map(opt => {
		if (typeof opt === 'object' && opt !== null) {
			return opt
		}
		return { value: opt, label: String(opt) }
	})
})

const selectedOption = computed(() => {
	return normalizedOptions.value.find(opt => opt.value === props.modelValue) || null
})

const selectOption = (opt) => {
	if (props.disabled) return
	emit('update:modelValue', opt.value)
	isOpen.value = false
}

const toggleOpen = () => {
	if (!props.disabled) {
		isOpen.value = !isOpen.value
	}
}

const handleClickOutside = (e) => {
	if (selectRef.value && !selectRef.value.contains(e.target)) {
		isOpen.value = false
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
	<div class="w-full">
		<label v-if="label" class="form-label flex items-center justify-between">
			<span>
				{{ label }}
				<span v-if="required" class="text-destructive font-bold ml-0.5">*</span>
			</span>
			<slot name="label-extra" />
		</label>
		<div class="relative" ref="selectRef">
			<button type="button" :disabled="disabled" @click="toggleOpen" :class="[
				'input flex items-center justify-between cursor-pointer text-left',
				computedState === 'error' ? 'input-error' : '',
				computedState === 'success' ? 'input-success' : '',
				computedState === 'warning' ? 'input-warning' : '',
				disabled ? 'cursor-not-allowed opacity-60' : ''
			]">
				<span :class="selectedOption ? 'text-foreground font-medium' : 'text-muted-foreground'">
					{{ selectedOption ? selectedOption.label : placeholder }}
				</span>
				<div class="flex items-center gap-1.5 shrink-0 ml-2">
					<IconAlertCircle v-if="computedState === 'error'" :size="16" class="text-destructive" />
					<IconCircleCheck v-else-if="computedState === 'success'" :size="16" class="text-success" />
					<IconAlertTriangle v-else-if="computedState === 'warning'" :size="16" class="text-warning" />
					<IconChevronDown :size="18" :class="['text-muted-foreground transition-transform duration-200', isOpen ? 'rotate-180 text-primary' : '']" />
				</div>
			</button>

			<div v-if="isOpen" class="absolute z-30 w-full mt-1.5 bg-card border border-border rounded-xl shadow-xl py-1.5 overflow-hidden">
				<div v-for="opt in normalizedOptions" :key="opt.value" @click="selectOption(opt)" :class="[
					'flex items-center justify-between px-3.5 py-2 text-sm cursor-pointer transition select-none',
					selectedOption?.value === opt.value
						? 'bg-primary-soft text-primary font-semibold'
						: 'text-muted-foreground hover:bg-muted hover:text-foreground'
				]">
					<span>{{ opt.label }}</span>
					<IconCheck v-if="selectedOption?.value === opt.value" :size="16" class="text-primary" />
				</div>
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
