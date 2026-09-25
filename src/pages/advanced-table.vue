<script setup>
import { ref } from 'vue'
import BaseAdvancedTable from '../components/ui/BaseAdvancedTable.vue'
import { IconPencil, IconTrash, IconEye, IconRefresh, IconAlertTriangle, IconDownload, IconPlus } from '@tabler/icons-vue'

const advancedColumns = [
	{ key: 'id', label: 'ID', width: '80px', sortable: true, filterType: 'number-range' },
	{ key: 'product', label: 'Product Name', width: '260px', sortable: true, filterType: 'text' },
	{ key: 'category', label: 'Category', width: '150px', sortable: true, filterType: 'select', filterOptions: ['Audio', 'Peripherals', 'Displays', 'Accessories', 'Lighting', 'Storage'] },
	{ key: 'stock', label: 'Stock', width: '110px', align: 'center', sortable: true, filterType: 'number-range' },
	{ key: 'price', label: 'Price ($)', width: '120px', align: 'right', sortable: true, filterType: 'number-range' },
	{ key: 'dateAdded', label: 'Date Added', width: '140px', sortable: true },
	{ key: 'status', label: 'Status', width: '130px', align: 'center', sortable: true, filterType: 'select', filterOptions: ['In Stock', 'Low Stock', 'Out of Stock'] },
	{ key: 'actions', label: 'Actions', width: '110px', align: 'right', sortable: false, resizable: false }
]

const products = ref([
	{ id: 1, product: 'Wireless Noise-Canceling Headphones', category: 'Audio', stock: 45, price: 299.00, dateAdded: '2025-01-12', status: 'In Stock' },
	{ id: 2, product: 'Ergonomic Mechanical Keyboard', category: 'Peripherals', stock: 12, price: 149.00, dateAdded: '2025-01-18', status: 'Low Stock' },
	{ id: 3, product: 'Ultra-Wide Curved Gaming Monitor', category: 'Displays', stock: 0, price: 699.00, dateAdded: '2025-02-01', status: 'Out of Stock' },
	{ id: 4, product: 'Thunderbolt 4 Docking Station', category: 'Accessories', stock: 88, price: 199.00, dateAdded: '2025-02-10', status: 'In Stock' },
	{ id: 5, product: 'Smart RGB Desk Lamp Pro', category: 'Lighting', stock: 24, price: 79.00, dateAdded: '2025-02-14', status: 'In Stock' },
	{ id: 6, product: 'USB-C NVMe SSD Enclosure 10Gbps', category: 'Storage', stock: 65, price: 49.00, dateAdded: '2025-02-20', status: 'In Stock' },
	{ id: 7, product: 'Studio Wireless Microphone', category: 'Audio', stock: 8, price: 179.00, dateAdded: '2025-02-25', status: 'Low Stock' },
	{ id: 8, product: 'Vertical Ergonomic Mouse Wireless', category: 'Peripherals', stock: 32, price: 59.00, dateAdded: '2025-03-01', status: 'In Stock' },
	{ id: 9, product: '4K Pro Webcam with Privacy Shutter', category: 'Peripherals', stock: 19, price: 129.00, dateAdded: '2025-03-05', status: 'In Stock' },
	{ id: 10, product: 'Desk Cable Management Raceway Tray', category: 'Accessories', stock: 120, price: 29.00, dateAdded: '2025-03-08', status: 'In Stock' },
	{ id: 11, product: 'Dual Arm Aluminum Monitor Mount', category: 'Accessories', stock: 15, price: 89.00, dateAdded: '2025-03-11', status: 'In Stock' },
	{ id: 12, product: 'Hi-Fi DAC Headphone Amplifier', category: 'Audio', stock: 4, price: 219.00, dateAdded: '2025-03-15', status: 'Low Stock' },
	{ id: 13, product: 'MagSafe Wireless Charging Station 3-in-1', category: 'Accessories', stock: 42, price: 99.00, dateAdded: '2025-03-18', status: 'In Stock' },
	{ id: 14, product: 'Portable 2TB Rugged External SSD', category: 'Storage', stock: 22, price: 229.00, dateAdded: '2025-03-21', status: 'In Stock' },
	{ id: 15, product: 'ScreenBar Halo Wireless Monitor Light', category: 'Lighting', stock: 17, price: 169.00, dateAdded: '2025-03-25', status: 'In Stock' }
])

const isLoading = ref(false)
const errorMessage = ref('')

const simulateLoading = () => {
	isLoading.value = true
	errorMessage.value = ''
	setTimeout(() => {
		isLoading.value = false
	}, 1200)
}

const simulateError = () => {
	isLoading.value = true
	setTimeout(() => {
		isLoading.value = false
		errorMessage.value = 'Database query timeout (504 Gateway Error). Click retry to fetch again.'
	}, 800)
}

const handleRetry = () => {
	errorMessage.value = ''
	simulateLoading()
}

const handleBulkAction = ({ action, ids }) => {
	if (action === 'delete') {
		products.value = products.value.filter((p) => !ids.includes(p.id))
	}
}
</script>

<template>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div>
				<h3 class="text-xl font-bold text-slate-900">Advanced Table</h3>
				<p class="text-xs sm:text-sm text-slate-500">Full-featured enterprise table with pagination, sorting, search, filters, selection, and resize.</p>
			</div>
			<div class="flex items-center gap-2">
				<button @click="simulateLoading" class="btn btn-outline btn-sm gap-1.5" title="Simulate Skeleton State">
					<IconRefresh :size="14" :class="isLoading ? 'animate-spin' : ''" />
					<span>Test Loading</span>
				</button>
				<button @click="simulateError" class="btn btn-outline btn-sm text-rose-600 border-rose-200 hover:bg-rose-50 gap-1.5" title="Simulate Error State">
					<IconAlertTriangle :size="14" />
					<span>Test Error</span>
				</button>
			</div>
		</div>

		<div class="card overflow-hidden">
			<div class="card-body">
				<BaseAdvancedTable :columns="advancedColumns" :data="products" :loading="isLoading" :error="errorMessage" :default-page-size="10" sticky-header max-height="600px" @retry="handleRetry" @bulk-action="handleBulkAction">
					<template #toolbar>
						<button class="btn btn-primary h-9 px-3 gap-1.5">
							<IconPlus :size="16" />
							<span class="hidden sm:inline">Add Product</span>
						</button>
					</template>

					<template #cell(product)="{ value }">
						<span class="font-medium text-slate-900 text-xs sm:text-sm">{{ value }}</span>
					</template>

					<template #cell(category)="{ value }">
						<span class="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium">{{ value }}</span>
					</template>

					<template #cell(stock)="{ value }">
						<span class="text-xs font-semibold" :class="value === 0 ? 'text-rose-600' : value < 10 ? 'text-amber-600' : 'text-slate-700'">
							{{ value }}
						</span>
					</template>

					<template #cell(price)="{ value }">
						<span class="text-xs sm:text-sm font-semibold text-slate-900">${{ Number(value).toFixed(2) }}</span>
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

					<template #cell(actions)="{ row }">
						<div class="inline-flex items-center gap-1">
							<button class="btn btn-ghost btn-icon" title="View details">
								<IconEye :size="16" />
							</button>
							<button class="btn btn-ghost btn-icon hover:text-blue-600" title="Edit item">
								<IconPencil :size="16" />
							</button>
							<button @click="products = products.filter(p => p.id !== row.id)" class="btn btn-ghost btn-icon hover:text-rose-600" title="Delete item">
								<IconTrash :size="16" />
							</button>
						</div>
					</template>
				</BaseAdvancedTable>
			</div>
		</div>
	</div>
</template>
