<script setup>
import { ref } from 'vue'
import BaseToast from '../components/ui/BaseToast.vue'

const activeToasts = ref([
	{ id: 1, variant: 'success', title: 'Order Completed', message: 'Invoice #8849 has been sent.' },
	{ id: 2, variant: 'info', title: 'System Notification', message: 'New backup generated.' }
])

const toastPosition = ref('toast-bottom toast-end')

const addToast = (variant, title, message) => {
	const id = Date.now()
	activeToasts.value.push({ id, variant, title, message })
	setTimeout(() => {
		removeToast(id)
	}, 4000)
}

const removeToast = (id) => {
	activeToasts.value = activeToasts.value.filter(t => t.id !== id)
}
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-foreground">Toasts</h3>
			<p class="text-xs sm:text-sm text-muted-foreground">Floating notifications stacked in any screen corner.</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Trigger Toast Notifications</h4>
			</div>
			<div class="card-body flex flex-col gap-4">
				<div class="flex flex-wrap items-center gap-3">
					<button @click="addToast('success', 'Success!', 'Changes saved to server successfully.')" class="btn btn-primary">
						Trigger Success Toast
					</button>

					<button @click="addToast('info', 'Update Available', 'A new version of Arunika is ready.')" class="btn btn-outline">
						Trigger Info Toast
					</button>

					<button @click="addToast('warning', 'High Memory Usage', 'Memory threshold exceeded 80%.')" class="btn btn-secondary">
						Trigger Warning Toast
					</button>

					<button @click="addToast('error', 'Network Error', 'Could not reach API gateway.')" class="btn btn-destructive">
						Trigger Error Toast
					</button>

					<button @click="addToast('neutral', 'Copied', 'Project link copied to clipboard.')" class="btn btn-ghost">
						Trigger Neutral Toast
					</button>
				</div>

				<div class="pt-4 border-t border-border flex flex-wrap items-center gap-4">
					<span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Screen Placement:</span>
					<div class="flex flex-wrap gap-2">
						<button v-for="pos in [
							{ label: 'Bottom Right', val: 'toast-bottom toast-end' },
							{ label: 'Bottom Left', val: 'toast-bottom toast-start' },
							{ label: 'Top Right', val: 'toast-top toast-end' },
							{ label: 'Top Left', val: 'toast-top toast-start' },
							{ label: 'Bottom Center', val: 'toast-bottom toast-center' }
						]" :key="pos.val" @click="toastPosition = pos.val" :class="[
							'btn btn-sm',
							toastPosition === pos.val ? 'btn-primary' : 'btn-outline'
						]">
							{{ pos.label }}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Static Toast Variations</h4>
			</div>
			<div class="card-body">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<BaseToast variant="success" title="Success Notification" :dismissible="false">
						Your payment transaction was processed.
					</BaseToast>

					<BaseToast variant="info" title="Info Notification" :dismissible="false">
						Maintenance scheduled at midnight.
					</BaseToast>

					<BaseToast variant="warning" title="Warning Notification" :dismissible="false">
						API token will expire in 2 days.
					</BaseToast>

					<BaseToast variant="error" title="Error Notification" :dismissible="false">
						Unable to delete user profile.
					</BaseToast>

					<BaseToast variant="neutral" title="Dark Neutral Notification" :dismissible="false">
						Saved draft automatically.
					</BaseToast>
				</div>
			</div>
		</div>

		<Teleport to="body">
			<div :class="['toast', toastPosition]">
				<TransitionGroup enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 translate-y-2 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
					<BaseToast v-for="t in activeToasts" :key="t.id" :variant="t.variant" :title="t.title" @close="removeToast(t.id)">
						{{ t.message }}
					</BaseToast>
				</TransitionGroup>
			</div>
		</Teleport>
	</div>
</template>
