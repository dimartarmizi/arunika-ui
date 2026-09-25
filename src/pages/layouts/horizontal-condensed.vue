<script setup>
import { ref } from 'vue'
import BaseTable from '../../components/ui/BaseTable.vue'
import {
	IconBuildingStore,
	IconBadge,
	IconLayoutDashboard,
	IconUsers,
	IconForms,
	IconTable,
	IconClick,
	IconFolders,
	IconLayoutList,
	IconComponents,
	IconAppWindow,
	IconBell,
	IconSearch,
	IconNotification,
	IconHelpCircle,
	IconSettings,
	IconChevronDown,
	IconPencil,
	IconTrash,
	IconEye
} from '@tabler/icons-vue'

const activeDropdown = ref(null)

const toggleDropdown = (key) => {
	activeDropdown.value = activeDropdown.value === key ? null : key
}

const closeDropdowns = () => {
	activeDropdown.value = null
}

const metrics = [
	{ label: 'Total Revenue', value: '$48,250', change: '+12.5%', isUp: true },
	{ label: 'Active Users', value: '2,840', change: '+8.1%', isUp: true },
	{ label: 'Pending Orders', value: '43', change: '-3.2%', isUp: false },
	{ label: 'Conversion Rate', value: '3.62%', change: '+0.8%', isUp: true }
]

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
	<div class="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased font-sans" @click="closeDropdowns">
		<header class="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
				<div class="flex items-center gap-6">
					<router-link to="/" class="flex items-center gap-3 shrink-0">
						<div class="icon-box icon-box-md icon-box-primary shadow-sm">
							<IconBuildingStore :size="20" />
						</div>
						<span class="text-base font-bold text-slate-900 tracking-tight leading-none">Arunika</span>
					</router-link>

					<div class="h-6 w-px bg-slate-200 hidden md:block"></div>

					<nav class="hidden md:flex items-center gap-1.5">
						<router-link to="/" class="px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-blue-50 text-blue-600 transition">
							<IconLayoutDashboard :size="18" />
							<span>Dashboard</span>
						</router-link>

						<div class="relative" @click.stop>
							<button @click="toggleDropdown('forms')" :class="[
								'px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition cursor-pointer',
								activeDropdown === 'forms'
									? 'bg-slate-100 text-slate-900'
									: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
							]">
								<IconForms :size="18" />
								<span>Forms & Tables</span>
								<IconChevronDown :size="16" :class="['transition-transform duration-200', activeDropdown === 'forms' ? 'rotate-180' : '']" />
							</button>

							<div v-if="activeDropdown === 'forms'" class="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200/80 p-1.5 z-50 flex flex-col gap-0.5">
								<router-link to="/form-elements" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconForms :size="18" class="text-slate-400" />
									<span>Form Elements</span>
								</router-link>
								<router-link to="/tables" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconTable :size="18" class="text-slate-400" />
									<span>Data Tables</span>
								</router-link>
							</div>
						</div>

						<div class="relative" @click.stop>
							<button @click="toggleDropdown('components')" :class="[
								'px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition cursor-pointer',
								activeDropdown === 'components'
									? 'bg-slate-100 text-slate-900'
									: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
							]">
								<IconComponents :size="18" />
								<span>UI Components</span>
								<IconChevronDown :size="16" :class="['transition-transform duration-200', activeDropdown === 'components' ? 'rotate-180' : '']" />
							</button>

							<div v-if="activeDropdown === 'components'" class="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200/80 p-1.5 z-50 flex flex-col gap-0.5">
								<router-link to="/accordion" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconLayoutList :size="18" class="text-slate-400" />
									<span>Accordion</span>
								</router-link>
								<router-link to="/alerts" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconBell :size="18" class="text-slate-400" />
									<span>Alerts</span>
								</router-link>
								<router-link to="/badges" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconBadge :size="18" class="text-slate-400" />
									<span>Badges</span>
								</router-link>
								<router-link to="/buttons" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconClick :size="18" class="text-slate-400" />
									<span>Buttons</span>
								</router-link>
								<router-link to="/modals" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconAppWindow :size="18" class="text-slate-400" />
									<span>Modals</span>
								</router-link>
								<router-link to="/tabs" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconFolders :size="18" class="text-slate-400" />
									<span>Tabs</span>
								</router-link>
								<router-link to="/toasts" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconNotification :size="18" class="text-slate-400" />
									<span>Toasts</span>
								</router-link>
								<router-link to="/tooltips" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
									<IconHelpCircle :size="18" class="text-slate-400" />
									<span>Tooltips</span>
								</router-link>
							</div>
						</div>

						<router-link to="/users" class="px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
							<IconUsers :size="18" />
							<span>Users</span>
						</router-link>

						<router-link to="/settings" class="px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition">
							<IconSettings :size="18" />
							<span>Settings</span>
						</router-link>
					</nav>
				</div>

				<div class="flex items-center gap-2">
					<button class="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Search">
						<IconSearch :size="18" />
					</button>

					<button class="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition relative cursor-pointer" title="Notifications">
						<IconBell :size="18" />
						<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
					</button>

					<div class="flex items-center gap-2.5 pl-2 border-l border-slate-200 ml-1">
						<img class="avatar avatar-sm" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120" alt="Avatar" />
						<div class="hidden sm:flex flex-col text-left">
							<span class="text-xs font-semibold text-slate-800 leading-tight">Administrator</span>
							<span class="text-[10px] text-slate-400">admin@arunika.io</span>
						</div>
					</div>
				</div>
			</div>
		</header>

		<main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
			<section aria-label="Key metrics" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<article v-for="metric in metrics" :key="metric.label" class="card p-5 flex flex-col justify-between">
					<span class="text-xs font-medium text-slate-500">{{ metric.label }}</span>
					<div class="flex items-baseline justify-between mt-2">
						<span class="text-2xl font-bold text-slate-900">{{ metric.value }}</span>
						<span :class="['text-xs font-semibold', metric.isUp ? 'text-emerald-600' : 'text-rose-600']">
							{{ metric.change }}
						</span>
					</div>
				</article>
			</section>

			<div class="card overflow-hidden">
				<div class="card-header flex items-center justify-between">
					<div>
						<h4 class="font-semibold text-sm text-slate-800">Products Catalog</h4>
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
		</main>
	</div>
</template>
