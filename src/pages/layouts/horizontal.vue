<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BaseTable from '../../components/ui/BaseTable.vue'
import {
	IconBuildingStore,
	IconBadge,
	IconLayoutDashboard,
	IconForms,
	IconTable,
	IconClick,
	IconFolders,
	IconLayoutList,
	IconComponents,
	IconAppWindow,
	IconBell,
	IconNotification,
	IconHelpCircle,
	IconChevronDown,
	IconSearch,
	IconPencil,
	IconTrash,
	IconUsers,
	IconEye,
	IconUser,
	IconLock,
	IconLogout
} from '@tabler/icons-vue'

const activeDropdown = ref(null)
const profileOpen = ref(false)
const profileDropdownRef = ref(null)

const toggleDropdown = (key) => {
	activeDropdown.value = activeDropdown.value === key ? null : key
}

const toggleProfile = () => {
	profileOpen.value = !profileOpen.value
}

const closeDropdowns = (e) => {
	activeDropdown.value = null
	if (profileDropdownRef.value && !profileDropdownRef.value.contains(e?.target)) {
		profileOpen.value = false
	}
}

onMounted(() => {
	window.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
	window.removeEventListener('click', closeDropdowns)
})

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
				<router-link to="/" class="flex items-center gap-3 shrink-0">
					<div class="icon-box icon-box-md icon-box-primary shadow-sm">
						<IconBuildingStore :size="20" />
					</div>
					<span class="text-base font-bold text-slate-900 tracking-tight leading-none">Arunika</span>
				</router-link>

				<div class="flex items-center gap-2">
					<button class="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer" title="Search">
						<IconSearch :size="18" />
					</button>

					<button class="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition relative cursor-pointer" title="Notifications">
						<IconBell :size="18" />
						<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
					</button>

					<div class="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>

					<div class="relative" ref="profileDropdownRef" @click.stop>
						<button type="button" @click="toggleProfile" class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer select-none text-left" aria-label="User menu">
							<img class="avatar avatar-sm ring-2 ring-slate-100 shrink-0" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120" alt="Avatar" />
							<div class="hidden sm:flex flex-col text-left">
								<span class="text-xs font-semibold text-slate-800">Administrator</span>
								<span class="text-[10px] text-slate-400">admin@arunika.io</span>
							</div>
						</button>

						<div v-if="profileOpen" class="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
							<div class="px-4 py-2.5 border-b border-slate-100">
								<p class="text-xs font-bold text-slate-900 truncate">Administrator</p>
								<p class="text-[11px] text-slate-500 truncate">admin@arunika.io</p>
							</div>

							<div class="py-1">
								<router-link to="/users" @click="profileOpen = false" class="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition">
									<IconUser :size="16" class="text-slate-400" />
									<span>Account Profile</span>
								</router-link>
								<router-link to="/reset-password" @click="profileOpen = false" class="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition">
									<IconLock :size="16" class="text-slate-400" />
									<span>Change Password</span>
								</router-link>
							</div>

							<div class="pt-1 border-t border-slate-100">
								<router-link to="/login" @click="profileOpen = false" class="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition">
									<IconLogout :size="16" />
									<span>Log Out</span>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<nav class="border-t border-slate-100 bg-white">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-visible">
					<router-link to="/" class="flex items-center gap-2 px-3.5 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600 transition">
						<IconLayoutDashboard :size="18" />
						<span>Dashboard</span>
					</router-link>

					<div class="relative" @click.stop>
						<button @click="toggleDropdown('forms')" :class="[
							'flex items-center gap-1.5 px-3.5 py-3 text-sm font-medium border-b-2 transition cursor-pointer',
							activeDropdown === 'forms'
								? 'border-blue-600 text-blue-600 bg-slate-50/50'
								: 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
						]">
							<IconForms :size="18" />
							<span>Forms & Tables</span>
							<IconChevronDown :size="16" :class="['transition-transform duration-200', activeDropdown === 'forms' ? 'rotate-180' : '']" />
						</button>

						<div v-if="activeDropdown === 'forms'" class="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200/80 p-1.5 z-50 flex flex-col gap-0.5">
							<router-link to="/form-elements" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconForms :size="18" class="text-slate-400" />
								<span>Form Elements</span>
							</router-link>
							<router-link to="/tables" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconTable :size="18" class="text-slate-400" />
								<span>Data Tables</span>
							</router-link>
						</div>
					</div>

					<div class="relative" @click.stop>
						<button @click="toggleDropdown('ui')" :class="[
							'flex items-center gap-1.5 px-3.5 py-3 text-sm font-medium border-b-2 transition cursor-pointer',
							activeDropdown === 'ui'
								? 'border-blue-600 text-blue-600 bg-slate-50/50'
								: 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
						]">
							<IconComponents :size="18" />
							<span>Components</span>
							<IconChevronDown :size="16" :class="['transition-transform duration-200', activeDropdown === 'ui' ? 'rotate-180' : '']" />
						</button>

						<div v-if="activeDropdown === 'ui'" class="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200/80 p-1.5 z-50 grid grid-cols-1 gap-0.5">
							<router-link to="/accordion" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconLayoutList :size="18" class="text-slate-400" />
								<span>Accordion</span>
							</router-link>
							<router-link to="/alerts" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconBell :size="18" class="text-slate-400" />
								<span>Alerts</span>
							</router-link>
							<router-link to="/badges" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconBadge :size="18" class="text-slate-400" />
								<span>Badges</span>
							</router-link>
							<router-link to="/buttons" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconClick :size="18" class="text-slate-400" />
								<span>Buttons</span>
							</router-link>
							<router-link to="/modals" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconAppWindow :size="18" class="text-slate-400" />
								<span>Modals</span>
							</router-link>
							<router-link to="/tabs" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconFolders :size="18" class="text-slate-400" />
								<span>Tabs</span>
							</router-link>
							<router-link to="/toasts" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconNotification :size="18" class="text-slate-400" />
								<span>Toasts</span>
							</router-link>
							<router-link to="/tooltips" @click="closeDropdowns" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition">
								<IconHelpCircle :size="18" class="text-slate-400" />
								<span>Tooltips</span>
							</router-link>
						</div>
					</div>

					<router-link to="/users" class="flex items-center gap-2 px-3.5 py-3 text-sm font-medium border-b-2 border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300 transition">
						<IconUsers :size="18" />
						<span>Users</span>
					</router-link>
				</div>
			</nav>
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
