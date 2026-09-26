<script setup>
import { ref } from 'vue'
import BaseModal from '../components/ui/BaseModal.vue'
import BaseInput from '../components/form/BaseInput.vue'
import { IconAlertTriangle, IconCheck } from '@tabler/icons-vue'

const showBasicModal = ref(false)
const showConfirmModal = ref(false)
const showFormModal = ref(false)
const showLargeModal = ref(false)

const newProjectName = ref('')
const newProjectDesc = ref('')
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-foreground">Modals</h3>
			<p class="text-xs sm:text-sm text-muted-foreground">Dialog windows rendered on top of the main document view.</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Modal Triggers</h4>
			</div>
			<div class="card-body">
				<div class="flex flex-wrap gap-3">
					<button @click="showBasicModal = true" class="btn btn-outline">
						Standard Modal
					</button>

					<button @click="showConfirmModal = true" class="btn btn-destructive">
						Delete Confirmation
					</button>

					<button @click="showFormModal = true" class="btn btn-primary">
						Form Modal
					</button>

					<button @click="showLargeModal = true" class="btn btn-secondary">
						Large Modal
					</button>
				</div>
			</div>
		</div>

		<BaseModal v-model="showBasicModal" title="Terms & Conditions" size="md">
			<p class="leading-relaxed">
				By accessing and using this dashboard, you accept and agree to be bound by the terms and provisions of this agreement. Any participation in this service will constitute acceptance of this agreement.
			</p>
			<template #footer="{ close }">
				<button @click="close" class="btn btn-primary">I Understand</button>
			</template>
		</BaseModal>

		<BaseModal v-model="showConfirmModal" title="Delete User Account" size="sm">
			<div class="flex items-start gap-3">
				<div class="icon-box icon-box-md bg-destructive-soft text-destructive shrink-0">
					<IconAlertTriangle :size="20" />
				</div>
				<div>
					<p class="font-medium text-foreground">Are you sure?</p>
					<p class="text-xs text-muted-foreground mt-1">
						This action cannot be undone. All associated data will be permanently removed.
					</p>
				</div>
			</div>
			<template #footer="{ close }">
				<button @click="close" class="btn btn-ghost">Cancel</button>
				<button @click="close" class="btn btn-destructive">Delete Account</button>
			</template>
		</BaseModal>

		<BaseModal v-model="showFormModal" title="Create New Project" size="md">
			<form @submit.prevent="showFormModal = false" class="flex flex-col gap-4">
				<BaseInput v-model="newProjectName" label="Project Name" placeholder="e.g. Redesign Dashboard" required />
				<div>
					<label class="form-label">Description</label>
					<textarea v-model="newProjectDesc" rows="3" class="input resize-none" placeholder="Brief summary of project objectives..."></textarea>
				</div>
			</form>
			<template #footer="{ close }">
				<button @click="close" class="btn btn-ghost">Cancel</button>
				<button @click="showFormModal = false" class="btn btn-primary">
					<IconCheck :size="16" />
					Save Project
				</button>
			</template>
		</BaseModal>

		<BaseModal v-model="showLargeModal" title="Detailed Audit Log" size="lg">
			<div class="flex flex-col gap-3">
				<p class="text-xs text-muted-foreground">Showing recent activity recorded by the system kernel:</p>
				<div class="bg-background p-4 rounded-xl border border-border text-xs font-mono text-muted-foreground flex flex-col gap-1.5 overflow-x-auto">
					<p>[2026-09-25 10:14:02] AUTH: User admin@arunika.io logged in successfully.</p>
					<p>[2026-09-25 10:15:33] SYSTEM: Memory consumption peaked at 42%.</p>
					<p>[2026-09-25 10:20:11] DB: Auto-vacuum completed in 41ms.</p>
				</div>
			</div>
			<template #footer="{ close }">
				<button @click="close" class="btn btn-outline">Close Log</button>
			</template>
		</BaseModal>
	</div>
</template>
