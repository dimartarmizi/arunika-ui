<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import BaseInput from '../form/BaseInput.vue'
import BaseSelect from '../form/BaseSelect.vue'
import BaseCheckbox from '../form/BaseCheckbox.vue'
import BaseDatePicker from '../form/BaseDatePicker.vue'
import {
	IconSearch,
	IconChevronUp,
	IconChevronDown,
	IconSelector,
	IconChevronLeft,
	IconChevronRight,
	IconChevronsLeft,
	IconChevronsRight,
	IconAdjustmentsHorizontal,
	IconFilter,
	IconRefresh,
	IconAlertTriangle,
	IconInbox,
	IconTrash,
	IconX
} from '@tabler/icons-vue'

const props = defineProps({
	columns: {
		type: Array,
		required: true
	},
	data: {
		type: Array,
		default: () => []
	},
	loading: {
		type: Boolean,
		default: false
	},
	error: {
		type: String,
		default: ''
	},
	stickyHeader: {
		type: Boolean,
		default: true
	},
	maxHeight: {
		type: String,
		default: '560px'
	},
	pageSizeOptions: {
		type: Array,
		default: () => [10, 25, 50, 100]
	},
	defaultPageSize: {
		type: Number,
		default: 10
	}
})

const emit = defineEmits(['retry', 'bulk-action', 'selection-change'])

const searchInput = ref('')
const debouncedSearch = ref('')
let debounceTimer = null

const handleSearchInput = (e) => {
	clearTimeout(debounceTimer)
	debounceTimer = setTimeout(() => {
		debouncedSearch.value = e.target.value
		currentPage.value = 1
	}, 300)
}

const columnFilters = ref({})
const showFilters = ref(false)

const columnVisibility = ref({})
const showColumnPicker = ref(false)

props.columns.forEach((col) => {
	columnVisibility.value[col.key] = col.visible !== false
	if (col.filterType) {
		if (col.filterType === 'number-range') {
			columnFilters.value[col.key] = { min: '', max: '' }
		} else if (col.filterType === 'date-range') {
			columnFilters.value[col.key] = { start: '', end: '' }
		} else {
			columnFilters.value[col.key] = ''
		}
	}
})

const visibleColumns = computed(() => {
	return props.columns.filter((c) => columnVisibility.value[c.key] !== false)
})

const columnWidths = ref({})
props.columns.forEach((col) => {
	if (col.width) columnWidths.value[col.key] = col.width
})

const resizingCol = ref(null)
const startX = ref(0)
const startWidth = ref(0)

const startResize = (key, event) => {
	resizingCol.value = key
	startX.value = event.clientX
	const th = event.target.parentElement
	startWidth.value = th.offsetWidth
	document.addEventListener('mousemove', onResizing)
	document.addEventListener('mouseup', stopResize)
}

const onResizing = (event) => {
	if (!resizingCol.value) return
	const diff = event.clientX - startX.value
	const newWidth = Math.max(70, startWidth.value + diff)
	columnWidths.value[resizingCol.value] = `${newWidth}px`
}

const stopResize = () => {
	resizingCol.value = null
	document.removeEventListener('mousemove', onResizing)
	document.removeEventListener('mouseup', stopResize)
}

onUnmounted(() => {
	document.removeEventListener('mousemove', onResizing)
	document.removeEventListener('mouseup', stopResize)
	clearTimeout(debounceTimer)
})

const sortRules = ref([])

const toggleSort = (col, event) => {
	if (col.sortable === false) return
	const key = col.key
	const isMulti = event.shiftKey

	const existingIndex = sortRules.value.findIndex((s) => s.key === key)

	if (!isMulti) {
		if (existingIndex > -1) {
			const current = sortRules.value[existingIndex]
			if (current.order === 'asc') {
				sortRules.value = [{ key, order: 'desc' }]
			} else {
				sortRules.value = []
			}
		} else {
			sortRules.value = [{ key, order: 'asc' }]
		}
		return
	}

	if (existingIndex > -1) {
		const current = sortRules.value[existingIndex]
		if (current.order === 'asc') {
			sortRules.value[existingIndex].order = 'desc'
		} else {
			sortRules.value.splice(existingIndex, 1)
		}
	} else {
		sortRules.value.push({ key, order: 'asc' })
	}
}

const getSortOrder = (key) => {
	const rule = sortRules.value.find((s) => s.key === key)
	return rule ? rule.order : null
}

const getSortIndex = (key) => {
	if (sortRules.value.length <= 1) return null
	const idx = sortRules.value.findIndex((s) => s.key === key)
	return idx > -1 ? idx + 1 : null
}

const selectedRows = ref([])

const isAllSelected = computed(() => {
	if (paginatedData.value.length === 0) return false
	return paginatedData.value.every((row) => selectedRows.value.includes(row.id))
})

const isSomeSelected = computed(() => {
	return selectedRows.value.length > 0 && !isAllSelected.value
})

watch(
	() => props.data,
	(newData) => {
		const validIds = new Set(newData.map((r) => r.id))
		const filteredSelected = selectedRows.value.filter((id) => validIds.has(id))
		if (filteredSelected.length !== selectedRows.value.length) {
			selectedRows.value = filteredSelected
			emit('selection-change', selectedRows.value)
		}
	},
	{ deep: true }
)

const toggleSelectAll = () => {
	if (isAllSelected.value) {
		const currentPageIds = paginatedData.value.map((r) => r.id)
		selectedRows.value = selectedRows.value.filter((id) => !currentPageIds.includes(id))
	} else {
		const currentPageIds = paginatedData.value.map((r) => r.id)
		const newSelected = Array.from(new Set([...selectedRows.value, ...currentPageIds]))
		selectedRows.value = newSelected
	}
	emit('selection-change', selectedRows.value)
}

const toggleRowSelection = (id) => {
	const idx = selectedRows.value.indexOf(id)
	if (idx > -1) {
		selectedRows.value.splice(idx, 1)
	} else {
		selectedRows.value.push(id)
	}
	emit('selection-change', selectedRows.value)
}

const filteredData = computed(() => {
	let result = [...props.data]

	if (debouncedSearch.value.trim()) {
		const q = debouncedSearch.value.toLowerCase().trim()
		result = result.filter((row) => {
			return props.columns.some((col) => {
				const val = row[col.key]
				if (val == null) return false
				return String(val).toLowerCase().includes(q)
			})
		})
	}

	Object.keys(columnFilters.value).forEach((key) => {
		const filter = columnFilters.value[key]
		if (!filter) return

		const colDef = props.columns.find((c) => c.key === key)
		if (!colDef) return

		if (colDef.filterType === 'select' && filter !== '') {
			result = result.filter((r) => String(r[key]) === String(filter))
		} else if (colDef.filterType === 'text' && String(filter).trim()) {
			const textQ = String(filter).toLowerCase().trim()
			result = result.filter((r) => String(r[key] || '').toLowerCase().includes(textQ))
		} else if (colDef.filterType === 'number-range') {
			const { min, max } = filter
			if (min !== '' && !isNaN(min)) {
				result = result.filter((r) => Number(r[key]) >= Number(min))
			}
			if (max !== '' && !isNaN(max)) {
				result = result.filter((r) => Number(r[key]) <= Number(max))
			}
		} else if (colDef.filterType === 'date-range') {
			const { start, end } = filter
			if (start) {
				result = result.filter((r) => new Date(r[key]) >= new Date(start))
			}
			if (end) {
				result = result.filter((r) => new Date(r[key]) <= new Date(end + 'T23:59:59'))
			}
		}
	})

	if (sortRules.value.length > 0) {
		result.sort((a, b) => {
			for (const rule of sortRules.value) {
				const { key, order } = rule
				const valA = a[key]
				const valB = b[key]

				if (valA === valB) continue

				let cmp = 0
				if (typeof valA === 'number' && typeof valB === 'number') {
					cmp = valA - valB
				} else {
					cmp = String(valA || '').localeCompare(String(valB || ''), undefined, { numeric: true })
				}

				return order === 'asc' ? cmp : -cmp
			}
			return 0
		})
	}

	return result
})

const pageSize = ref(props.defaultPageSize)
const currentPage = ref(1)

const totalPages = computed(() => {
	return Math.max(1, Math.ceil(filteredData.value.length / pageSize.value))
})

const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * pageSize.value
	return filteredData.value.slice(start, start + pageSize.value)
})

watch(
	[debouncedSearch, columnFilters, pageSize],
	() => {
		currentPage.value = 1
	},
	{ deep: true }
)

const activeFiltersCount = computed(() => {
	let count = 0
	Object.keys(columnFilters.value).forEach((key) => {
		const f = columnFilters.value[key]
		if (!f) return
		if (typeof f === 'object') {
			if (f.min !== '' || f.max !== '' || f.start || f.end) count++
		} else if (String(f).trim() !== '') {
			count++
		}
	})
	return count
})

const resetFilters = () => {
	Object.keys(columnFilters.value).forEach((k) => {
		const col = props.columns.find((c) => c.key === k)
		if (col?.filterType === 'number-range') {
			columnFilters.value[k] = { min: '', max: '' }
		} else if (col?.filterType === 'date-range') {
			columnFilters.value[k] = { start: '', end: '' }
		} else {
			columnFilters.value[k] = ''
		}
	})
	searchInput.value = ''
	debouncedSearch.value = ''
}
</script>

<template>
	<div class="flex flex-col gap-3 font-sans antialiased text-foreground">
		<div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
			<div class="flex items-center gap-2 flex-1 max-w-md">
				<div class="w-full">
					<BaseInput v-model="searchInput" type="text" @input="handleSearchInput" placeholder="Search table records...">
						<template #prefix>
							<IconSearch :size="16" />
						</template>
						<template #suffix>
							<button v-if="searchInput" @click="searchInput = ''; debouncedSearch = ''; currentPage = 1" class="text-muted-foreground hover:text-muted-foreground cursor-pointer">
								<IconX :size="14" />
							</button>
						</template>
					</BaseInput>
				</div>

				<button @click="showFilters = !showFilters" :class="[
					'btn btn-outline h-10 px-3 gap-1.5 relative shrink-0',
					showFilters || activeFiltersCount > 0 ? 'border-primary text-primary bg-primary-soft' : ''
				]" title="Column filters">
					<IconFilter :size="16" />
					<span class="hidden md:inline">Filters</span>
					<span v-if="activeFiltersCount > 0" class="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
						{{ activeFiltersCount }}
					</span>
				</button>
			</div>

			<div class="flex items-center gap-2 self-end sm:self-auto">
				<div class="relative">
					<button @click="showColumnPicker = !showColumnPicker" class="btn btn-outline h-10 px-3 gap-1.5" title="Toggle column visibility">
						<IconAdjustmentsHorizontal :size="16" />
						<span class="hidden sm:inline">Columns</span>
					</button>

					<div v-if="showColumnPicker" class="absolute right-0 mt-1 w-48 bg-card rounded-xl shadow-xl border border-border p-2 z-40 flex flex-col gap-1">
						<div class="text-[11px] font-bold text-muted-foreground uppercase px-2 py-1">Toggle Columns</div>
						<div v-for="col in columns" :key="col.key" class="px-2 py-1 hover:bg-muted rounded-lg">
							<BaseCheckbox v-model="columnVisibility[col.key]" :label="col.label" />
						</div>
					</div>
				</div>

				<slot name="toolbar" :selected="selectedRows" />
			</div>
		</div>

		<div v-if="selectedRows.length > 0" class="bg-primary-soft border border-primary/20 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-sm text-primary">
			<span class="font-medium">
				<strong>{{ selectedRows.length }}</strong> row(s) selected
			</span>
			<div class="flex items-center gap-2">
				<slot name="bulk-actions" :selected="selectedRows" :clear="() => { selectedRows = []; $emit('selection-change', []) }">
					<button @click="$emit('bulk-action', { action: 'delete', ids: [...selectedRows] }); selectedRows = []; $emit('selection-change', [])" class="btn btn-destructive btn-sm gap-1.5" title="Delete selected">
						<IconTrash :size="15" />
						<span>Delete Selected</span>
					</button>
				</slot>
				<button @click="selectedRows = []; $emit('selection-change', [])" class="btn btn-ghost btn-sm text-primary hover:bg-primary-soft gap-1.5" title="Clear selection">
					<IconX :size="15" />
					<span>Clear Selection</span>
				</button>
			</div>
		</div>

		<div v-if="showFilters" class="p-4 bg-muted/70 border border-border rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
			<template v-for="col in columns" :key="col.key">
				<div v-if="col.filterType" class="flex flex-col gap-1.5">
					<label class="font-semibold text-muted-foreground text-xs">{{ col.label }}</label>

					<BaseInput v-if="col.filterType === 'text'" v-model="columnFilters[col.key]" type="text" :placeholder="`Filter ${col.label}...`" />

					<BaseSelect v-else-if="col.filterType === 'select'" v-model="columnFilters[col.key]" :options="[{ label: `All ${col.label}`, value: '' }, ...col.filterOptions.map(opt => typeof opt === 'object' ? opt : { label: opt, value: opt })]" :placeholder="`All ${col.label}`" />

					<div v-else-if="col.filterType === 'number-range'" class="flex items-center gap-2">
						<BaseInput v-model.number="columnFilters[col.key].min" type="number" placeholder="Min" />
						<span class="text-muted-foreground font-bold shrink-0">-</span>
						<BaseInput v-model.number="columnFilters[col.key].max" type="number" placeholder="Max" />
					</div>

					<div v-else-if="col.filterType === 'date-range'" class="flex items-center gap-2">
						<BaseDatePicker v-model="columnFilters[col.key].start" placeholder="Start date" />
						<span class="text-muted-foreground font-bold shrink-0">-</span>
						<BaseDatePicker v-model="columnFilters[col.key].end" placeholder="End date" />
					</div>
				</div>
			</template>

			<div class="sm:col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-end gap-2 pt-2 border-t border-border">
				<button @click="resetFilters" class="btn btn-ghost btn-sm gap-1.5 text-muted-foreground hover:text-foreground">
					<IconRefresh :size="14" />
					<span>Reset All Filters</span>
				</button>
			</div>
		</div>

		<div class="border border-border rounded-xl bg-card overflow-hidden shadow-xs relative z-0">
			<div class="overflow-x-auto overflow-y-auto" :style="{ maxHeight: stickyHeader ? maxHeight : 'none' }">
				<table class="table w-full border-collapse">
					<thead :class="['table-thead bg-background', stickyHeader ? 'sticky top-0 z-10 shadow-xs' : '']">
						<tr>
							<th class="table-th w-10 text-center px-3 bg-background">
								<div class="flex items-center justify-center">
									<BaseCheckbox :model-value="isAllSelected" :indeterminate="isSomeSelected" @update:model-value="toggleSelectAll" />
								</div>
							</th>

							<th v-for="col in visibleColumns" :key="col.key" :style="{ width: columnWidths[col.key] || 'auto' }" :class="[
								'table-th relative group select-none bg-background',
								col.sortable !== false ? 'cursor-pointer hover:bg-muted' : '',
								col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
							]" @click="toggleSort(col, $event)">
								<div class="flex items-center gap-1.5" :class="col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'">
									<slot :name="`head(${col.key})`" :column="col">
										<span>{{ col.label }}</span>
									</slot>

									<span v-if="col.sortable !== false" class="inline-flex items-center text-muted-foreground">
										<template v-if="getSortOrder(col.key) === 'asc'">
											<IconChevronUp :size="15" class="text-primary stroke-[2.5]" />
										</template>
										<template v-else-if="getSortOrder(col.key) === 'desc'">
											<IconChevronDown :size="15" class="text-primary stroke-[2.5]" />
										</template>
										<template v-else>
											<IconSelector :size="15" class="opacity-0 group-hover:opacity-100 transition-opacity" />
										</template>

										<span v-if="getSortIndex(col.key)" class="text-[9px] font-bold text-primary ml-0.5">
											{{ getSortIndex(col.key) }}
										</span>
									</span>
								</div>

								<div v-if="col.resizable !== false" @click.stop @mousedown="startResize(col.key, $event)" class="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-primary/50 active:bg-primary transition" title="Drag to resize"></div>
							</th>
						</tr>
					</thead>

					<tbody>
						<tr v-if="loading">
							<td :colspan="visibleColumns.length + 1" class="p-8">
								<div class="flex flex-col gap-3">
									<div v-for="i in 5" :key="i" class="h-8 bg-muted rounded-lg animate-pulse"></div>
								</div>
							</td>
						</tr>

						<tr v-else-if="error">
							<td :colspan="visibleColumns.length + 1" class="p-12 text-center">
								<div class="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
									<div class="w-12 h-12 rounded-full bg-destructive-soft text-destructive flex items-center justify-center">
										<IconAlertTriangle :size="24" />
									</div>
									<h5 class="font-bold text-sm text-foreground">Failed to load records</h5>
									<p class="text-xs text-muted-foreground">{{ error }}</p>
									<button @click="$emit('retry')" class="btn btn-outline btn-sm mt-2 gap-1.5">
										<IconRefresh :size="14" />
										<span>Retry</span>
									</button>
								</div>
							</td>
						</tr>

						<tr v-else-if="paginatedData.length === 0">
							<td :colspan="visibleColumns.length + 1" class="p-12 text-center">
								<div class="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
									<div class="w-12 h-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
										<IconInbox :size="24" />
									</div>
									<h5 class="font-bold text-sm text-foreground">No records found</h5>
									<p class="text-xs text-muted-foreground">
										{{ debouncedSearch || activeFiltersCount > 0 ? 'Try adjusting your search query or filters.' : 'No data records available at this time.' }}
									</p>
									<button v-if="debouncedSearch || activeFiltersCount > 0" @click="resetFilters" class="btn btn-outline btn-sm mt-2">
										Clear Filters
									</button>
								</div>
							</td>
						</tr>

						<tr v-else v-for="(row, rowIndex) in paginatedData" :key="row.id || rowIndex" :class="[
							'table-row transition-colors',
							selectedRows.includes(row.id) ? 'bg-primary-soft' : ''
						]">
							<td class="table-td text-center px-3">
								<div class="flex items-center justify-center">
									<BaseCheckbox :model-value="selectedRows.includes(row.id)" @update:model-value="toggleRowSelection(row.id)" />
								</div>
							</td>

							<td v-for="col in visibleColumns" :key="col.key" :class="[
								'table-td',
								col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
							]">
								<slot :name="`cell(${col.key})`" :row="row" :value="row[col.key]" :index="rowIndex">
									{{ row[col.key] }}
								</slot>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="p-4 border-t border-border bg-background/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
				<div class="flex items-center gap-3 text-muted-foreground order-2 sm:order-1">
					<span>
						Showing
						<strong class="text-foreground font-semibold">{{ filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1 }}</strong>
						to
						<strong class="text-foreground font-semibold">{{ Math.min(currentPage * pageSize, filteredData.length) }}</strong>
						of
						<strong class="text-foreground font-semibold">{{ filteredData.length }}</strong>
						results
					</span>

					<div class="flex items-center gap-1.5 ml-2">
						<span class="text-muted-foreground">Rows per page:</span>
						<select v-model.number="pageSize" class="bg-card border border-border rounded-lg px-2 py-1 font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary">
							<option v-for="opt in pageSizeOptions" :key="opt" :value="opt">{{ opt }}</option>
						</select>
					</div>
				</div>

				<div class="flex items-center gap-1 order-1 sm:order-2">
					<button @click="currentPage = 1" :disabled="currentPage === 1" class="p-1.5 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:hover:bg-card cursor-pointer disabled:cursor-not-allowed text-muted-foreground" title="First page">
						<IconChevronsLeft :size="16" />
					</button>

					<button @click="currentPage--" :disabled="currentPage === 1" class="p-1.5 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:hover:bg-card cursor-pointer disabled:cursor-not-allowed text-muted-foreground" title="Previous page">
						<IconChevronLeft :size="16" />
					</button>

					<span class="px-3 py-1 font-semibold text-foreground">
						Page {{ currentPage }} of {{ totalPages }}
					</span>

					<button @click="currentPage++" :disabled="currentPage === totalPages" class="p-1.5 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:hover:bg-card cursor-pointer disabled:cursor-not-allowed text-muted-foreground" title="Next page">
						<IconChevronRight :size="16" />
					</button>

					<button @click="currentPage = totalPages" :disabled="currentPage === totalPages" class="p-1.5 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:hover:bg-card cursor-pointer disabled:cursor-not-allowed text-muted-foreground" title="Last page">
						<IconChevronsRight :size="16" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
