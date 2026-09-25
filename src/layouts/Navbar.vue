<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
	IconMenu2,
	IconSearch,
	IconBell,
	IconUser,
	IconLock,
	IconLogout
} from '@tabler/icons-vue'

defineProps({
	user: {
		type: Object,
		required: true
	}
})

defineEmits(['toggle-sidebar'])

const profileOpen = ref(false)
const profileDropdownRef = ref(null)

const toggleProfile = () => {
	profileOpen.value = !profileOpen.value
}

const closeProfile = (e) => {
	if (profileDropdownRef.value && !profileDropdownRef.value.contains(e.target)) {
		profileOpen.value = false
	}
}

onMounted(() => {
	window.addEventListener('click', closeProfile)
})

onUnmounted(() => {
	window.removeEventListener('click', closeProfile)
})
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

				<div class="relative" ref="profileDropdownRef">
					<button type="button" @click.stop="toggleProfile" class="flex items-center p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer select-none" aria-label="User menu">
						<img :src="user.avatar" alt="Avatar" class="avatar avatar-sm ring-2 ring-slate-100" />
					</button>

					<div v-if="profileOpen" class="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
						<div class="px-4 py-2.5 border-b border-slate-100">
							<p class="text-xs font-bold text-slate-900 truncate">{{ user.name }}</p>
							<p class="text-[11px] text-slate-500 truncate">{{ user.email }}</p>
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
	</header>
</template>
