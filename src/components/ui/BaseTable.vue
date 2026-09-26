<script setup>
import { computed } from 'vue'

const props = defineProps({
	columns: {
		type: Array,
		required: true
	},
	data: {
		type: Array,
		default: () => []
	},
	striped: {
		type: Boolean,
		default: false
	},
	compact: {
		type: Boolean,
		default: false
	},
	bordered: {
		type: Boolean,
		default: false
	},
	hoverable: {
		type: Boolean,
		default: true
	}
})

const tableClasses = computed(() => [
	'table',
	props.striped ? 'table-striped' : '',
	props.compact ? 'table-compact' : '',
	props.bordered ? 'table-bordered' : ''
])
</script>

<template>
	<div class="overflow-x-auto">
		<table :class="tableClasses">
			<thead class="table-thead">
				<tr>
					<th v-for="col in columns" :key="col.key" :class="[
						'table-th',
						col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
						col.class || ''
					]">
						<slot :name="`head(${col.key})`" :column="col">
							{{ col.label }}
						</slot>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, rowIndex) in data" :key="row.id || rowIndex" :class="hoverable ? 'table-row' : ''">
					<td v-for="col in columns" :key="col.key" :class="[
						'table-td',
						col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
					]">
						<slot :name="`cell(${col.key})`" :row="row" :value="row[col.key]" :index="rowIndex">
							{{ row[col.key] }}
						</slot>
					</td>
				</tr>

				<tr v-if="data.length === 0">
					<td :colspan="columns.length" class="table-td text-center py-8 text-muted-foreground text-xs">
						<slot name="empty">
							No data available
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
