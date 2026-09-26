<script setup>
import { ref, computed } from 'vue'
import {
	IconSearch,
	IconFilter,
	IconPlus,
	IconEdit,
	IconTrash
} from '@tabler/icons-vue'
import BaseInput from '../components/form/BaseInput.vue'
import BaseSelect from '../components/form/BaseSelect.vue'
import BaseTable from '../components/ui/BaseTable.vue'

const searchQuery = ref('')
const selectedRole = ref('All')

const roleOptions = [
	{ value: 'All', label: 'All Roles' },
	{ value: 'Admin', label: 'Admin' },
	{ value: 'Editor', label: 'Editor' },
	{ value: 'Staff', label: 'Staff' }
]

const userColumns = [
	{ key: 'user', label: 'Name & Email' },
	{ key: 'role', label: 'Role' },
	{ key: 'status', label: 'Status' },
	{ key: 'joined', label: 'Joined Date' },
	{ key: 'action', label: 'Action', align: 'right' }
]

const users = ref([
	{ id: 1, name: 'Budi Santoso', email: 'budi@example.com', role: 'Admin', status: 'Active', joined: 'Jan 12, 2026', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80' },
	{ id: 2, name: 'Siti Rahma', email: 'siti@example.com', role: 'Editor', status: 'Active', joined: 'Feb 15, 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80' },
	{ id: 3, name: 'Rian Wijaya', email: 'rian@example.com', role: 'Staff', status: 'Inactive', joined: 'Mar 03, 2026', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80' },
	{ id: 4, name: 'Dewi Lestari', email: 'dewi@example.com', role: 'Staff', status: 'Active', joined: 'Mar 20, 2026', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80' },
	{ id: 5, name: 'Andi Nugroho', email: 'andi@example.com', role: 'Editor', status: 'Active', joined: 'Mar 28, 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' }
])

const filteredUsers = computed(() => {
	return users.value.filter(u => {
		const matchSearch = u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
		const matchRole = selectedRole.value === 'All' || u.role === selectedRole.value
		return matchSearch && matchRole
	})
})
</script>

<template>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			<div>
				<h3 class="text-xl font-bold text-foreground">User Management</h3>
				<p class="text-xs sm:text-sm text-muted-foreground">Manage user access, roles, and registered accounts.</p>
			</div>
			<button class="btn btn-primary">
				<IconPlus :size="16" />
				Add User
			</button>
		</div>

		<div class="card p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
			<div class="w-full sm:w-72">
				<BaseInput v-model="searchQuery" placeholder="Search name or email...">
					<template #prefix>
						<IconSearch :size="18" />
					</template>
				</BaseInput>
			</div>
			<div class="flex items-center gap-2 w-full sm:w-auto">
				<BaseSelect v-model="selectedRole" :options="roleOptions" class="w-full sm:w-44" />
				<button class="btn btn-outline p-2.5">
					<IconFilter :size="18" />
				</button>
			</div>
		</div>

		<div class="card overflow-hidden">
			<BaseTable :columns="userColumns" :data="filteredUsers">
				<template #cell(user)="{ row }">
					<div class="flex items-center gap-3">
						<img :src="row.avatar" class="avatar avatar-sm" />
						<div>
							<p class="font-semibold text-foreground text-xs sm:text-sm">{{ row.name }}</p>
							<p class="text-xs text-muted-foreground">{{ row.email }}</p>
						</div>
					</div>
				</template>
				<template #cell(role)="{ value }">
					<span class="badge badge-neutral rounded-md">
						{{ value }}
					</span>
				</template>
				<template #cell(status)="{ value }">
					<span :class="[
						'badge',
						value === 'Active' ? 'badge-success' : 'badge-muted'
					]">
						{{ value }}
					</span>
				</template>
				<template #cell(joined)="{ value }">
					<span class="text-xs text-muted-foreground">{{ value }}</span>
				</template>
				<template #cell(action)>
					<div class="inline-flex items-center gap-1">
						<button class="btn btn-ghost btn-icon hover:text-primary">
							<IconPencil :size="16" />
						</button>
						<button class="btn btn-ghost btn-icon hover:text-destructive">
							<IconTrash :size="16" />
						</button>
					</div>
				</template>
			</BaseTable>
		</div>
	</div>
</template>
