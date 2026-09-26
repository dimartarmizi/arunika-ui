<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseTable from '../components/ui/BaseTable.vue'
import {
	IconReceipt,
	IconShoppingCart,
	IconUsers,
	IconPackage,
	IconArrowUpRight,
	IconArrowDownRight,
	IconDownload,
	IconPlus,
	IconDotsVertical,
	IconCircleCheck,
	IconUser
} from '@tabler/icons-vue'

const router = useRouter()

const stats = [
	{ title: 'Total Revenue', value: '$148,250', change: '+14.2%', isPositive: true, icon: IconReceipt },
	{ title: 'Completed Orders', value: '1,429', change: '+8.1%', isPositive: true, icon: IconShoppingCart },
	{ title: 'New Customers', value: '382', change: '-2.4%', isPositive: false, icon: IconUsers },
	{ title: 'Active Products', value: '94', change: '+3.5%', isPositive: true, icon: IconPackage },
]

const orderColumns = [
	{ key: 'id', label: 'Order ID' },
	{ key: 'customer', label: 'Customer' },
	{ key: 'amount', label: 'Amount' },
	{ key: 'status', label: 'Status' },
	{ key: 'action', label: 'Action', align: 'right' }
]

const orders = ref([
	{ id: '#ORD-8821', customer: 'Budi Santoso', amount: '$16,500.00', status: 'Completed' },
	{ id: '#ORD-8820', customer: 'Siti Rahma', amount: '$1,450.00', status: 'Processing' },
	{ id: '#ORD-8819', customer: 'Fajar Pratama', amount: '$7,800.00', status: 'Completed' },
	{ id: '#ORD-8818', customer: 'Maya Putri', amount: '$5,200.00', status: 'Cancelled' },
	{ id: '#ORD-8817', customer: 'Dewi Lestari', amount: '$2,700.00', status: 'Completed' }
])
</script>

<template>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-linear-to-r from-primary to-primary-hover text-primary-foreground rounded-2xl p-6 shadow-sm">
			<div>
				<h3 class="text-xl sm:text-2xl font-bold">Welcome back, Administrator!</h3>
				<p class="text-primary-foreground/80 text-sm mt-1">Here is a summary of your store's performance and activity today.</p>
			</div>
			<div class="flex items-center gap-2">
				<button class="btn bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground backdrop-blur-xs">
					<IconDownload :size="16" />
					Download Report
				</button>
				<router-link to="/users" class="btn btn-white">
					<IconPlus :size="16" />
					Add User
				</router-link>
			</div>
		</div>

		<section aria-label="Dashboard statistics" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<article v-for="(st, index) in stats" :key="index" class="card p-5">
				<div class="flex items-center justify-between">
					<span class="stat-title">{{ st.title }}</span>
					<div class="icon-box icon-box-md icon-box-neutral">
						<component :is="st.icon" :size="18" />
					</div>
				</div>
				<div class="mt-3 flex items-baseline justify-between">
					<div class="stat-value">{{ st.value }}</div>
					<span :class="[
						'badge',
						st.isPositive ? 'badge-success' : 'badge-destructive'
					]">
						<IconArrowUpRight v-if="st.isPositive" :size="14" class="mr-0.5" />
						<IconArrowDownRight v-else :size="14" class="mr-0.5" />
						{{ st.change }}
					</span>
				</div>
			</article>
		</section>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div class="lg:col-span-2 card overflow-hidden">
				<div class="card-header">
					<h4 class="font-bold text-foreground text-sm sm:text-base">Recent Orders</h4>
				</div>
				<BaseTable :columns="orderColumns" :data="orders">
					<template #cell(id)="{ value }">
						<span class="font-semibold text-primary text-xs">{{ value }}</span>
					</template>
					<template #cell(customer)="{ value }">
						<span class="text-muted-foreground font-medium">{{ value }}</span>
					</template>
					<template #cell(amount)="{ value }">
						<span class="text-foreground font-semibold">{{ value }}</span>
					</template>
					<template #cell(status)="{ value }">
						<span :class="[
							'badge',
							value === 'Completed' ? 'badge-success' :
								value === 'Processing' ? 'badge-warning' : 'badge-destructive'
						]">
							{{ value }}
						</span>
					</template>
					<template #cell(action)>
						<button class="btn btn-ghost btn-icon">
							<IconDotsVertical :size="16" />
						</button>
					</template>
				</BaseTable>
			</div>

			<div class="card p-5 flex flex-col justify-between">
				<div>
					<h4 class="font-bold text-foreground text-sm sm:text-base mb-4">System Activity</h4>
					<div class="flex flex-col gap-4">
						<div class="flex gap-3">
							<div class="w-8 h-8 rounded-full bg-success-soft text-success flex items-center justify-center shrink-0">
								<IconCircleCheck :size="16" />
							</div>
							<div>
								<p class="text-xs font-semibold text-foreground">Payment Confirmed</p>
								<p class="text-xs text-muted-foreground mt-0.5">Order #ORD-8821 of $16,500.00 was successful.</p>
								<span class="text-[10px] text-muted-foreground">10 mins ago</span>
							</div>
						</div>

						<div class="flex gap-3">
							<div class="w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center shrink-0">
								<IconUser :size="16" />
							</div>
							<div>
								<p class="text-xs font-semibold text-foreground">New User Registered</p>
								<p class="text-xs text-muted-foreground mt-0.5">Budi Santoso created a new account.</p>
								<span class="text-[10px] text-muted-foreground">45 mins ago</span>
							</div>
						</div>

						<div class="flex gap-3">
							<div class="w-8 h-8 rounded-full bg-warning-soft text-warning flex items-center justify-center shrink-0">
								<IconPackage :size="16" />
							</div>
							<div>
								<p class="text-xs font-semibold text-foreground">Low Stock Alert</p>
								<p class="text-xs text-muted-foreground mt-0.5">Dell UltraSharp 27" stock has 12 units remaining.</p>
								<span class="text-[10px] text-muted-foreground">2 hours ago</span>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-6 p-4 rounded-xl bg-background border border-border">
					<div class="flex items-center justify-between text-xs font-semibold text-muted-foreground">
						<span>Server Capacity</span>
						<span class="text-primary">68%</span>
					</div>
					<div class="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
						<div class="h-full bg-primary rounded-full" style="width: 68%"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
