<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-sm">
			<div>
				<h3 class="text-xl sm:text-2xl font-bold">Welcome back, Administrator!</h3>
				<p class="text-blue-100 text-sm mt-1">Here is a summary of your store's performance and activity today.</p>
			</div>
			<div class="flex items-center gap-2">
				<button class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-xs transition">
					<IconDownload :size="16" />
					Download Report
				</button>
				<router-link to="/users" class="btn btn-white">
					<IconPlus :size="16" />
					Add User
				</router-link>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<div v-for="(st, index) in stats" :key="index" class="card p-5">
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
						st.isPositive ? 'badge-success' : 'badge-danger'
					]">
						<IconArrowUpRight v-if="st.isPositive" :size="14" class="mr-0.5" />
						<IconArrowDownRight v-else :size="14" class="mr-0.5" />
						{{ st.change }}
					</span>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div class="lg:col-span-2 card overflow-hidden">
				<div class="card-header">
					<h4 class="font-bold text-slate-900 text-sm sm:text-base">Recent Orders</h4>
				</div>
				<div class="overflow-x-auto">
					<table class="table">
						<thead class="table-thead">
							<tr>
								<th class="table-th">Order ID</th>
								<th class="table-th">Customer</th>
								<th class="table-th">Amount</th>
								<th class="table-th">Status</th>
								<th class="table-th text-right">Action</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-100">
							<tr v-for="order in orders" :key="order.id" class="table-row">
								<td class="table-td font-semibold text-blue-600 text-xs">{{ order.id }}</td>
								<td class="table-td text-slate-700 font-medium">{{ order.customer }}</td>
								<td class="table-td text-slate-900 font-semibold">{{ order.amount }}</td>
								<td class="table-td">
									<span :class="[
										'badge',
										order.status === 'Completed' ? 'badge-success' :
											order.status === 'Processing' ? 'badge-warning' : 'badge-danger'
									]">
										{{ order.status }}
									</span>
								</td>
								<td class="table-td text-right">
									<button class="btn btn-ghost btn-icon">
										<IconDotsVertical :size="16" />
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="card p-5 flex flex-col justify-between">
				<div>
					<h4 class="font-bold text-slate-900 text-sm sm:text-base mb-4">System Activity</h4>
					<div class="flex flex-col gap-4">
						<div class="flex gap-3">
							<div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
								<IconCircleCheck :size="16" />
							</div>
							<div>
								<p class="text-xs font-semibold text-slate-800">Payment Confirmed</p>
								<p class="text-xs text-slate-500 mt-0.5">Order #ORD-8821 of $16,500.00 was successful.</p>
								<span class="text-[10px] text-slate-400">10 mins ago</span>
							</div>
						</div>

						<div class="flex gap-3">
							<div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
								<IconUser :size="16" />
							</div>
							<div>
								<p class="text-xs font-semibold text-slate-800">New User Registered</p>
								<p class="text-xs text-slate-500 mt-0.5">Budi Santoso created a new account.</p>
								<span class="text-[10px] text-slate-400">45 mins ago</span>
							</div>
						</div>

						<div class="flex gap-3">
							<div class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
								<IconPackage :size="16" />
							</div>
							<div>
								<p class="text-xs font-semibold text-slate-800">Low Stock Alert</p>
								<p class="text-xs text-slate-500 mt-0.5">Dell UltraSharp 27" stock has 12 units remaining.</p>
								<span class="text-[10px] text-slate-400">2 hours ago</span>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
					<div class="flex items-center justify-between text-xs font-semibold text-slate-700">
						<span>Server Capacity</span>
						<span class="text-blue-600">68%</span>
					</div>
					<div class="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
						<div class="h-full bg-blue-600 rounded-full" style="width: 68%"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
