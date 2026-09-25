<script setup>
import { ref } from 'vue'
import BaseTable from '../components/ui/BaseTable.vue'
import { IconPencil, IconTrash, IconEye } from '@tabler/icons-vue'

const columns = [
	{ key: 'product', label: 'Product Name' },
	{ key: 'category', label: 'Category' },
	{ key: 'stock', label: 'Stock', align: 'center' },
	{ key: 'price', label: 'Price', align: 'right' },
	{ key: 'status', label: 'Status', align: 'center' },
	{ key: 'actions', label: 'Actions', align: 'right' }
]

const products = ref([
	{ id: 1, product: 'Wireless Noise-Canceling Headphones', category: 'Audio', stock: 45, price: '$299.00', status: 'In Stock' },
	{ id: 2, product: 'Ergonomic Mechanical Keyboard', category: 'Peripherals', stock: 12, price: '$149.00', status: 'Low Stock' },
	{ id: 3, product: 'Ultra-Wide Curved Gaming Monitor', category: 'Displays', stock: 0, price: '$699.00', status: 'Out of Stock' },
	{ id: 4, product: 'Thunderbolt 4 Docking Station', category: 'Accessories', stock: 88, price: '$199.00', status: 'In Stock' },
	{ id: 5, product: 'Smart RGB Desk Lamp Pro', category: 'Lighting', stock: 24, price: '$79.00', status: 'In Stock' }
])
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-slate-900">Tables</h3>
			<p class="text-xs sm:text-sm text-slate-500">Reusable data table component with striped, compact, and bordered variants.</p>
		</div>

		<div class="card overflow-hidden">
			<div class="card-header">
				<div>
					<h4 class="font-semibold text-sm text-slate-800">Standard Table (Reusable BaseTable)</h4>
					<p class="text-xs text-slate-500">Standard table with cell slots for custom badges & action buttons</p>
				</div>
			</div>
			<BaseTable :columns="columns" :data="products">
				<template #cell(product)="{ value }">
					<span class="font-medium text-slate-900 text-xs sm:text-sm">{{ value }}</span>
				</template>

				<template #cell(category)="{ value }">
					<span class="text-xs text-slate-500">{{ value }}</span>
				</template>

				<template #cell(stock)="{ value }">
					<span class="text-xs font-semibold text-slate-700">{{ value }}</span>
				</template>

				<template #cell(price)="{ value }">
					<span class="text-xs sm:text-sm font-semibold text-slate-900">{{ value }}</span>
				</template>

				<template #cell(status)="{ value }">
					<span :class="[
						'badge',
						value === 'In Stock' ? 'badge-success' :
							value === 'Low Stock' ? 'badge-warning' : 'badge-danger'
					]">
						{{ value }}
					</span>
				</template>

				<template #cell(actions)>
					<div class="inline-flex items-center gap-1">
						<button class="btn btn-ghost btn-icon" title="View details">
							<IconEye :size="16" />
						</button>
						<button class="btn btn-ghost btn-icon hover:text-blue-600" title="Edit item">
							<IconPencil :size="16" />
						</button>
						<button class="btn btn-ghost btn-icon hover:text-rose-600" title="Delete item">
							<IconTrash :size="16" />
						</button>
					</div>
				</template>
			</BaseTable>
		</div>

		<div class="card overflow-hidden">
			<div class="card-header">
				<div>
					<h4 class="font-semibold text-sm text-slate-800">Striped Variant</h4>
					<p class="text-xs text-slate-500">Adds alternating background colors using <code>striped</code> prop</p>
				</div>
			</div>
			<BaseTable :columns="columns.slice(0, 5)" :data="products" striped>
				<template #cell(product)="{ value }">
					<span class="font-medium text-slate-900 text-xs sm:text-sm">{{ value }}</span>
				</template>
				<template #cell(price)="{ value }">
					<span class="font-semibold text-slate-900 text-xs sm:text-sm">{{ value }}</span>
				</template>
				<template #cell(status)="{ value }">
					<span :class="[
						'badge',
						value === 'In Stock' ? 'badge-success' :
							value === 'Low Stock' ? 'badge-warning' : 'badge-danger'
					]">
						{{ value }}
					</span>
				</template>
			</BaseTable>
		</div>

		<div class="card overflow-hidden">
			<div class="card-header">f
				<div>
					<h4 class="font-semibold text-sm text-slate-800">Compact & Bordered Variant</h4>
					<p class="text-xs text-slate-500">Dense density layout with full borders using <code>compact</code> and <code>bordered</code> props</p>
				</div>
			</div>
			<div class="card-body">
				<BaseTable :columns="columns.slice(0, 5)" :data="products" compact bordered>
					<template #cell(status)="{ value }">
						<span :class="[
							'badge text-[10px]',
							value === 'In Stock' ? 'badge-success' :
								value === 'Low Stock' ? 'badge-warning' : 'badge-danger'
						]">
							{{ value }}
						</span>
					</template>
				</BaseTable>
			</div>
		</div>
	</div>
</template>
