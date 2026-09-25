<script setup>
import { ref } from 'vue'
import BaseAlert from '../components/ui/BaseAlert.vue'

const showDismissible = ref(true)
const resetAlert = () => {
	showDismissible.value = true
}
</script>

<template>
	<div class="flex flex-col gap-6">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-xl font-bold text-slate-900">Alerts</h3>
				<p class="text-xs sm:text-sm text-slate-500">Contextual feedback messages for typical user actions.</p>
			</div>
			<button v-if="!showDismissible" @click="resetAlert" class="btn btn-outline btn-sm">
				Restore Dismissed Alert
			</button>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-slate-800">Basic Variants</h4>
			</div>
			<div class="card-body flex flex-col gap-3">
				<BaseAlert variant="info">
					A new software update is available for your system.
				</BaseAlert>

				<BaseAlert variant="success">
					Your profile changes have been successfully saved.
				</BaseAlert>

				<BaseAlert variant="warning">
					Your account storage is at 85% capacity. Consider upgrading soon.
				</BaseAlert>

				<BaseAlert variant="error">
					Unable to connect to the database. Please check your credentials.
				</BaseAlert>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-slate-800">Alerts with Titles & Actions</h4>
			</div>
			<div class="card-body flex flex-col gap-4">
				<BaseAlert
					v-model="showDismissible"
					variant="info"
					title="Information Notice"
					dismissible
				>
					This alert can be dismissed by clicking the close button on the right.
				</BaseAlert>

				<BaseAlert variant="success" title="Payment Received">
					Invoice #INV-2024-001 has been marked as paid in full.
					<template #actions>
						<button class="btn btn-sm btn-white">View Receipt</button>
					</template>
				</BaseAlert>

				<BaseAlert variant="warning" title="Subscription Expiring Soon">
					Your plan will renew automatically on October 1st, 2026.
					<template #actions>
						<button class="btn btn-sm btn-primary">Renew Now</button>
					</template>
				</BaseAlert>

				<BaseAlert variant="error" title="Critical Failure">
					The backup job failed due to insufficient disk space on partition /dev/sda1.
					<template #actions>
						<button class="btn btn-sm btn-danger">Retry Job</button>
					</template>
				</BaseAlert>
			</div>
		</div>
	</div>
</template>
