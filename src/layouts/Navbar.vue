<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
	IconMenu2,
	IconSearch,
	IconBell,
	IconUser,
	IconLock,
	IconLogout,
	IconSun,
	IconMoon
} from '@tabler/icons-vue'
import { useTheme } from '../composables/useTheme'

defineProps({
	user: {
		type: Object,
		required: true
	}
})

defineEmits(['toggle-sidebar'])

const { isDark, toggleTheme } = useTheme()
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
	<header class="h-16 bg-card border-b border-border sticky top-0 z-30 transition-colors duration-200">
		<div class="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
			<div class="flex items-center gap-3 flex-1 max-w-md">
				<button @click="$emit('toggle-sidebar')" class="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer shrink-0" aria-label="Toggle sidebar">
					<IconMenu2 :size="20" />
				</button>

				<div class="relative w-full hidden sm:block">
					<span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
						<IconSearch :size="18" />
					</span>
					<input type="text" placeholder="Search transactions, users, products..." class="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-xl text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-card transition" />
				</div>
			</div>

			<div class="flex items-center gap-2 sm:gap-3">
				<button @click="toggleTheme" class="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer" :title="isDark ? 'Switch to Light' : 'Switch to Dark'">
					<IconSun v-if="isDark" :size="20" />
					<IconMoon v-else :size="20" />
				</button>

				<button class="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer">
					<IconBell :size="20" />
					<span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-card"></span>
				</button>

				<div class="h-6 w-px bg-border"></div>

				<div class="relative" ref="profileDropdownRef">
					<button type="button" @click.stop="toggleProfile" class="flex items-center p-1 rounded-xl hover:bg-muted transition cursor-pointer select-none" aria-label="User menu">
						<img :src="user.avatar" alt="Avatar" class="avatar avatar-sm ring-2 ring-border" />
					</button>

					<div v-if="profileOpen" class="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
						<div class="px-4 py-2.5 border-b border-border">
							<p class="text-xs font-bold text-foreground truncate">{{ user.name }}</p>
							<p class="text-[11px] text-muted-foreground truncate">{{ user.email }}</p>
						</div>

						<div class="py-1">
							<router-link to="/users" @click="profileOpen = false" class="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition">
								<IconUser :size="16" class="text-muted-foreground" />
								<span>Account Profile</span>
							</router-link>
							<router-link to="/reset-password" @click="profileOpen = false" class="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition">
								<IconLock :size="16" class="text-muted-foreground" />
								<span>Change Password</span>
							</router-link>
						</div>

						<div class="pt-1 border-t border-border">
							<router-link to="/login" @click="profileOpen = false" class="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive-soft transition">
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
