<script setup>
import { IconMenu2, IconSearch, IconBell } from '@tabler/icons-vue'

defineProps({
	user: {
		type: Object,
		required: true
	}
})

defineEmits(['toggle-sidebar'])
</script>

<template>
	<header class="h-16 bg-white border-b border-slate-200 sticky top-0 z-30">
		<div class="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
			<div class="flex items-center gap-3 flex-1 max-w-md">
				<button @click="$emit('toggle-sidebar')" class="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer shrink-0" aria-label="Toggle sidebar">
					<IconMenu2 :size="20" />
				</button>

				<div class="relative w-full hidden sm:block">
					<span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
						<IconSearch :size="18" />
					</span>
					<input type="text" placeholder="Search transactions, users, products..." class="w-full pl-9 pr-4 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition" />
				</div>
			</div>

			<div class="flex items-center gap-2 sm:gap-3">
				<button class="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer">
					<IconBell :size="20" />
					<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
				</button>

				<div class="h-6 w-px bg-slate-200"></div>

				<img :src="user.avatar" alt="Avatar" class="avatar avatar-sm ring-2 ring-slate-100" />
			</div>
		</div>
	</header>
</template>
