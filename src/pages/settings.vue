<script setup>
import { ref } from 'vue'
import { IconShieldCheck } from '@tabler/icons-vue'
import BaseInput from '../components/form/BaseInput.vue'

const currentUser = ref({
	name: 'Administrator',
	email: 'admin@arunika.io',
	role: 'Super Admin'
})
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-slate-900">Account & System Settings</h3>
			<p class="text-xs sm:text-sm text-slate-500">Configure admin profile and application preferences.</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div class="lg:col-span-2 card card-body flex flex-col gap-4">
				<h4 class="font-bold text-slate-900 text-sm sm:text-base border-b border-slate-100 pb-3">User Profile</h4>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<BaseInput v-model="currentUser.name" label="Display Name" />
					<BaseInput v-model="currentUser.email" type="email" label="Email" />
				</div>
				<BaseInput v-model="currentUser.role" label="Role / Position" disabled />
				<div class="pt-2">
					<button class="btn btn-primary">
						Save Changes
					</button>
				</div>
			</div>

			<div class="card card-body flex flex-col gap-4">
				<h4 class="font-bold text-slate-900 text-sm sm:text-base border-b border-slate-100 pb-3">Security</h4>
				<div class="flex flex-col gap-3">
					<button class="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition flex items-center justify-between">
						<span>Change Account Password</span>
						<IconShieldCheck :size="18" class="text-blue-600" />
					</button>
					<button class="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition flex items-center justify-between">
						<span>Two-Factor Authentication (2FA)</span>
						<span class="badge badge-success text-[10px]">Active</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
