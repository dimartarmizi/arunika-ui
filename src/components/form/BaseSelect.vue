<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import {
	IconChevronDown,
	IconCheck,
	IconAlertCircle,
	IconCircleCheck,
	IconAlertTriangle,
	IconSearch,
	IconX,
	IconLoader2,
	IconPlus
} from '@tabler/icons-vue'

const props = defineProps({
	modelValue: {
		type: [String, Number, Array, Object, null],
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
		default: 'Select option...'
	},
	searchable: {
		type: Boolean,
		default: false
	},
	multiple: {
		type: Boolean,
		default: false
	},
	clearable: {
		type: Boolean,
		default: false
	},
	selectAll: {
		type: Boolean,
		default: false
	},
	creatable: {
		type: Boolean,
		default: false
	},
	loadOptions: {
		type: Function,
		default: null
	},
	debounce: {
		type: Number,
		default: 300
	},
	hasMore: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	},
	errorMessage: {
		type: String,
		default: ''
	},
	valueKey: {
		type: String,
		default: 'value'
	},
	labelKey: {
		type: String,
		default: 'label'
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

const emit = defineEmits([
	'update:modelValue',
	'change',
	'search',
	'create',
	'load-more',
	'clear'
])

const isOpen = ref(false)
const selectRef = ref(null)
const searchInputRef = ref(null)
const optionsListRef = ref(null)
const searchQuery = ref('')
const internalLoading = ref(false)
const asyncOptions = ref([])
const fetchError = ref('')
let debounceTimer = null

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

const activeOptions = computed(() => {
	const source = props.loadOptions ? asyncOptions.value : props.options
	return source.map((opt) => {
		if (typeof opt === 'object' && opt !== null) {
			return {
				...opt,
				value: opt[props.valueKey] !== undefined ? opt[props.valueKey] : opt.value,
				label: opt[props.labelKey] !== undefined ? opt[props.labelKey] : (opt.label ?? String(opt.value))
			}
		}
		return { value: opt, label: String(opt) }
	})
})

const filteredOptions = computed(() => {
	if (props.loadOptions || !props.searchable || !searchQuery.value.trim()) {
		return activeOptions.value
	}
	const q = searchQuery.value.toLowerCase().trim()
	return activeOptions.value.filter((opt) =>
		String(opt.label).toLowerCase().includes(q)
	)
})

const isOptionSelected = (opt) => {
	if (props.multiple) {
		return Array.isArray(props.modelValue) && props.modelValue.includes(opt.value)
	}
	return props.modelValue === opt.value
}

const selectedList = computed(() => {
	if (props.multiple) {
		if (!Array.isArray(props.modelValue)) return []
		return props.modelValue.map((val) => {
			const found = activeOptions.value.find((opt) => opt.value === val)
			return found || { value: val, label: String(val) }
		})
	}
	if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '') {
		return []
	}
	const found = activeOptions.value.find((opt) => opt.value === props.modelValue)
	return found ? [found] : [{ value: props.modelValue, label: String(props.modelValue) }]
})

const canCreate = computed(() => {
	if (!props.creatable || !searchQuery.value.trim()) return false
	const q = searchQuery.value.toLowerCase().trim()
	return !activeOptions.value.some((opt) => String(opt.label).toLowerCase() === q)
})

const isLoading = computed(() => props.loading || internalLoading.value)
const isAllSelected = computed(() => {
	if (!props.multiple || activeOptions.value.length === 0) return false
	return (
		Array.isArray(props.modelValue) &&
		activeOptions.value.every((opt) => props.modelValue.includes(opt.value))
	)
})

const executeAsyncSearch = (query = '', isAppend = false) => {
	if (!props.loadOptions) return
	internalLoading.value = true
	fetchError.value = ''
	props
		.loadOptions(query, isAppend)
		.then((res) => {
			if (Array.isArray(res)) {
				asyncOptions.value = isAppend ? [...asyncOptions.value, ...res] : res
			}
		})
		.catch((err) => {
			fetchError.value = err?.message || 'Failed to load data.'
		})
		.finally(() => {
			internalLoading.value = false
		})
}

const handleSearchInput = () => {
	emit('search', searchQuery.value)
	if (!props.loadOptions) return
	clearTimeout(debounceTimer)
	debounceTimer = setTimeout(() => {
		executeAsyncSearch(searchQuery.value, false)
	}, props.debounce)
}

const toggleOpen = () => {
	if (props.disabled) return
	isOpen.value = !isOpen.value
	if (isOpen.value) {
		searchQuery.value = ''
		if (props.loadOptions && asyncOptions.value.length === 0) {
			executeAsyncSearch('', false)
		}
		if (props.searchable || props.loadOptions || props.creatable) {
			nextTick(() => searchInputRef.value?.focus())
		}
	}
}

const selectOption = (opt) => {
	if (props.disabled) return
	if (props.multiple) {
		const curr = Array.isArray(props.modelValue) ? [...props.modelValue] : []
		const idx = curr.indexOf(opt.value)
		if (idx > -1) curr.splice(idx, 1)
		else curr.push(opt.value)
		emit('update:modelValue', curr)
		emit('change', curr)
	} else {
		emit('update:modelValue', opt.value)
		emit('change', opt.value)
		isOpen.value = false
	}
}

const removeTag = (val, e) => {
	e?.stopPropagation()
	if (props.disabled) return
	if (props.multiple && Array.isArray(props.modelValue)) {
		const next = props.modelValue.filter((item) => item !== val)
		emit('update:modelValue', next)
		emit('change', next)
	}
}

const handleClear = (e) => {
	e?.stopPropagation()
	if (props.disabled) return
	const emptyVal = props.multiple ? [] : null
	emit('update:modelValue', emptyVal)
	emit('change', emptyVal)
	emit('clear')
}

const toggleSelectAll = () => {
	if (props.disabled || !props.multiple) return
	if (isAllSelected.value) {
		emit('update:modelValue', [])
		emit('change', [])
	} else {
		const allVals = activeOptions.value.map((o) => o.value)
		emit('update:modelValue', allVals)
		emit('change', allVals)
	}
}

const handleCreate = () => {
	const raw = searchQuery.value.trim()
	if (!raw) return
	const newOpt = { value: raw, label: raw, isCreated: true }
	if (!props.loadOptions) {
		props.options.push(newOpt)
	} else {
		asyncOptions.value.push(newOpt)
	}
	selectOption(newOpt)
	emit('create', raw)
	searchQuery.value = ''
}

const handleScroll = (e) => {
	const el = e.target
	if (el.scrollHeight - el.scrollTop <= el.clientHeight + 25) {
		if (props.hasMore && !isLoading.value) {
			emit('load-more')
			if (props.loadOptions) {
				executeAsyncSearch(searchQuery.value, true)
			}
		}
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
	clearTimeout(debounceTimer)
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
				'input min-h-10 h-auto py-1.5 flex items-center justify-between cursor-pointer text-left gap-2',
				computedState === 'error' ? 'input-error' : '',
				computedState === 'success' ? 'input-success' : '',
				computedState === 'warning' ? 'input-warning' : '',
				disabled ? 'cursor-not-allowed opacity-60' : ''
			]">
				<div class="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
					<template v-if="multiple && selectedList.length > 0">
						<span v-for="item in selectedList" :key="item.value" class="badge badge-primary badge-sm gap-1 py-0.5 px-2">
							<slot name="selected-item" :item="item">
								<span class="truncate max-w-36">{{ item.label }}</span>
							</slot>
							<button type="button" @click="removeTag(item.value, $event)" class="hover:opacity-75 transition cursor-pointer" aria-label="Remove item">
								<IconX :size="12" />
							</button>
						</span>
					</template>
					<template v-else-if="!multiple && selectedList.length > 0">
						<slot name="selected-item" :item="selectedList[0]">
							<span class="text-foreground font-medium truncate">{{ selectedList[0].label }}</span>
						</slot>
					</template>
					<span v-else class="text-muted-foreground">{{ placeholder }}</span>
				</div>

				<div class="flex items-center gap-1 shrink-0 ml-1">
					<button v-if="clearable && selectedList.length > 0 && !disabled" type="button" @click="handleClear" class="text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer" title="Clear selection">
						<IconX :size="14" />
					</button>

					<IconLoader2 v-if="isLoading" :size="16" class="text-primary animate-spin" />
					<IconAlertCircle v-else-if="computedState === 'error'" :size="16" class="text-destructive" />
					<IconCircleCheck v-else-if="computedState === 'success'" :size="16" class="text-success" />
					<IconAlertTriangle v-else-if="computedState === 'warning'" :size="16" class="text-warning" />

					<IconChevronDown :size="18" :class="['text-muted-foreground transition-transform duration-200', isOpen ? 'rotate-180 text-primary' : '']" />
				</div>
			</button>

			<div v-if="isOpen" class="absolute z-40 w-full mt-1.5 bg-card border border-border rounded-xl shadow-xl overflow-hidden flex flex-col max-h-72">
				<div v-if="searchable || loadOptions || creatable" class="p-2 border-b border-border/80 bg-card sticky top-0 z-10">
					<div class="relative flex items-center">
						<IconSearch :size="15" class="absolute left-2.5 text-muted-foreground pointer-events-none" />
						<input ref="searchInputRef" v-model="searchQuery" @input="handleSearchInput" @keydown.enter.prevent="canCreate && handleCreate()" type="text" placeholder="Search options..." class="w-full bg-muted/60 text-foreground text-xs rounded-lg pl-8 pr-2.5 py-1.5 outline-hidden focus:ring-1 focus:ring-primary" />
						<button v-if="searchQuery" @click="searchQuery = ''; handleSearchInput()" type="button" class="absolute right-2 text-muted-foreground hover:text-foreground">
							<IconX :size="13" />
						</button>
					</div>
				</div>

				<div v-if="multiple && selectAll && activeOptions.length > 0" class="px-4 py-2 border-b border-border/60 bg-muted/30 flex items-center justify-between text-xs">
					<button type="button" @click="toggleSelectAll" class="text-primary font-semibold hover:underline cursor-pointer">
						{{ isAllSelected ? 'Deselect All' : 'Select All' }}
					</button>
					<span class="text-muted-foreground">{{ selectedList.length }} selected</span>
				</div>

				<div ref="optionsListRef" @scroll="handleScroll" class="overflow-y-auto flex-1 p-1 custom-scrollbar">
					<div v-if="fetchError || errorMessage" class="p-3 text-xs text-center text-destructive flex items-center justify-center gap-1.5">
						<IconAlertCircle :size="15" />
						<span>{{ fetchError || errorMessage }}</span>
					</div>

					<div v-else-if="isLoading && activeOptions.length === 0" class="p-4 text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
						<IconLoader2 :size="16" class="animate-spin text-primary" />
						<span>Loading data...</span>
					</div>

					<template v-else-if="filteredOptions.length > 0">
						<div v-for="opt in filteredOptions" :key="opt.value" @click="selectOption(opt)" :class="[
							'flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition select-none',
							isOptionSelected(opt)
								? 'bg-primary-soft text-primary font-medium'
								: 'text-foreground hover:bg-muted'
						]">
							<div class="flex items-center gap-2.5 min-w-0 flex-1">
								<slot name="option" :option="opt" :selected="isOptionSelected(opt)">
									<span class="truncate">{{ opt.label }}</span>
								</slot>
							</div>
							<IconCheck v-if="isOptionSelected(opt)" :size="16" class="text-primary shrink-0 ml-2" />
						</div>

						<div v-if="isLoading && activeOptions.length > 0" class="p-2 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
							<IconLoader2 :size="14" class="animate-spin text-primary" />
							<span>Loading more...</span>
						</div>
					</template>

					<div v-else-if="canCreate" @click="handleCreate" class="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-primary hover:bg-primary-soft cursor-pointer font-medium">
						<IconPlus :size="16" />
						<span>Create "{{ searchQuery }}"</span>
					</div>

					<div v-else class="p-4 text-xs text-center text-muted-foreground">
						No options found.
					</div>
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
