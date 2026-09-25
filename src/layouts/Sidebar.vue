<script setup>
import { useRoute } from 'vue-router'
import {
	IconLayoutDashboard,
	IconUsers,
	IconSettings,
	IconLogout,
	IconX,
	IconBuildingStore,
	IconForms,
	IconWindow,
	IconBell,
	IconHelpCircle,
	IconLogin,
	IconUserPlus,
	IconKey,
	IconLock,
	IconTable,
	IconNotification,
	IconClick,
	IconFolders,
	IconBadge,
	IconLayoutList
} from '@tabler/icons-vue'

defineProps({
	open: {
		type: Boolean,
		default: false
	},
	user: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['update:open'])
const route = useRoute()

const close = () => {
	if (window.innerWidth < 1024) {
		emit('update:open', false)
	}
}
</script>

<template>
	<div v-if="open" @click="close" class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"></div>

	<aside :class="[
		'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-all duration-200 ease-in-out shrink-0 lg:sticky lg:top-0 lg:h-screen',
		open ? 'translate-x-0' : '-translate-x-full lg:-ml-64'
	]">
		<div class="flex-1 overflow-y-auto custom-scrollbar">
			<div class="h-16 flex items-center justify-between px-6 border-b border-slate-800">
				<router-link to="/" class="flex items-center gap-3" @click="close">
					<div class="icon-box icon-box-md icon-box-primary shadow-sm">
						<IconBuildingStore :size="20" />
					</div>
					<span class="text-base font-bold text-white tracking-tight">Arunika</span>
				</router-link>
				<button @click="close" class="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer">
					<IconX :size="20" />
				</button>
			</div>

			<div class="p-4 flex flex-col gap-1.5">
				<div class="menu-title">Main</div>

				<router-link to="/" @click="close" :class="[
					'menu-item',
					route.path === '/' ? 'menu-item-active' : ''
				]">
					<IconLayoutDashboard :size="18" />
					<span>Dashboard</span>
				</router-link>

				<router-link to="/users" @click="close" :class="[
					'menu-item',
					route.path === '/users' ? 'menu-item-active' : ''
				]">
					<IconUsers :size="18" />
					<span>Users</span>
				</router-link>

				<div class="menu-title pt-4">Forms & Tables</div>

				<router-link to="/form-elements" @click="close" :class="[
					'menu-item',
					route.path === '/form-elements' ? 'menu-item-active' : ''
				]">
					<IconForms :size="18" />
					<span>Form Elements</span>
				</router-link>

				<router-link to="/tables" @click="close" :class="[
					'menu-item',
					route.path === '/tables' ? 'menu-item-active' : ''
				]">
					<IconTable :size="18" />
					<span>Tables</span>
				</router-link>

				<div class="menu-title pt-4">UI Components</div>

				<router-link to="/buttons" @click="close" :class="[
					'menu-item',
					route.path === '/buttons' ? 'menu-item-active' : ''
				]">
					<IconClick :size="18" />
					<span>Buttons</span>
				</router-link>

				<router-link to="/badges" @click="close" :class="[
					'menu-item',
					route.path === '/badges' ? 'menu-item-active' : ''
				]">
					<IconBadge :size="18" />
					<span>Badges</span>
				</router-link>

				<router-link to="/tabs" @click="close" :class="[
					'menu-item',
					route.path === '/tabs' ? 'menu-item-active' : ''
				]">
					<IconFolders :size="18" />
					<span>Tabs</span>
				</router-link>

				<router-link to="/accordion" @click="close" :class="[
					'menu-item',
					route.path === '/accordion' ? 'menu-item-active' : ''
				]">
					<IconLayoutList :size="18" />
					<span>Accordion</span>
				</router-link>

				<router-link to="/modals" @click="close" :class="[
					'menu-item',
					route.path === '/modals' ? 'menu-item-active' : ''
				]">
					<IconWindow :size="18" />
					<span>Modals</span>
				</router-link>

				<router-link to="/alerts" @click="close" :class="[
					'menu-item',
					route.path === '/alerts' ? 'menu-item-active' : ''
				]">
					<IconBell :size="18" />
					<span>Alerts</span>
				</router-link>

				<router-link to="/toasts" @click="close" :class="[
					'menu-item',
					route.path === '/toasts' ? 'menu-item-active' : ''
				]">
					<IconNotification :size="18" />
					<span>Toasts</span>
				</router-link>

				<router-link to="/tooltips" @click="close" :class="[
					'menu-item',
					route.path === '/tooltips' ? 'menu-item-active' : ''
				]">
					<IconHelpCircle :size="18" />
					<span>Tooltips</span>
				</router-link>

				<div class="menu-title pt-4">Authentication</div>

				<router-link to="/login" @click="close" :class="[
					'menu-item',
					route.path === '/login' ? 'menu-item-active' : ''
				]">
					<IconLogin :size="18" />
					<span>Login</span>
				</router-link>

				<router-link to="/register" @click="close" :class="[
					'menu-item',
					route.path === '/register' ? 'menu-item-active' : ''
				]">
					<IconUserPlus :size="18" />
					<span>Register</span>
				</router-link>

				<router-link to="/forgot-password" @click="close" :class="[
					'menu-item',
					route.path === '/forgot-password' ? 'menu-item-active' : ''
				]">
					<IconKey :size="18" />
					<span>Forgot Password</span>
				</router-link>

				<router-link to="/reset-password" @click="close" :class="[
					'menu-item',
					route.path === '/reset-password' ? 'menu-item-active' : ''
				]">
					<IconLock :size="18" />
					<span>Reset Password</span>
				</router-link>

				<div class="menu-title pt-4">Configuration</div>

				<router-link to="/settings" @click="close" :class="[
					'menu-item',
					route.path === '/settings' ? 'menu-item-active' : ''
				]">
					<IconSettings :size="18" />
					<span>Settings</span>
				</router-link>
			</div>
		</div>

		<div class="shrink-0 p-4 border-t border-slate-800">
			<div class="flex items-center justify-between p-2 rounded-xl bg-slate-800/50 mb-3">
				<div class="flex items-center gap-2.5 min-w-0">
					<img :src="user.avatar" alt="Avatar" class="avatar avatar-md ring-2 ring-slate-700" />
					<div class="truncate">
						<p class="text-xs font-semibold text-white truncate">{{ user.name }}</p>
						<p class="text-[11px] text-slate-400 truncate">{{ user.email }}</p>
					</div>
				</div>
			</div>
			<router-link to="/login" @click="close" class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition">
				<IconLogout :size="16" />
				<span>Log Out</span>
			</router-link>
		</div>
	</aside>
</template>
