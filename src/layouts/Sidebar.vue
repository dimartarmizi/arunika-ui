<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
	IconLayoutDashboard,
	IconUsers,
	IconLogout,
	IconX,
	IconBuildingStore,
	IconForms,
	IconAppWindow,
	IconBell,
	IconHelpCircle,
	IconLogin,
	IconUserPlus,
	IconKey,
	IconLock,
	IconTable,
	IconTableSpark,
	IconNotification,
	IconClick,
	IconFolders,
	IconBadge,
	IconLayoutList,
	IconLayout,
	IconLayoutNavbar,
	IconLayoutGrid,
	IconChevronUp,
	IconUser,
	IconMenu2
} from '@tabler/icons-vue'

defineProps({
	open: {
		type: Boolean,
		default: false
	},
	mini: {
		type: Boolean,
		default: false
	},
	user: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['update:open', 'update:mini'])
const route = useRoute()

const sidebarProfileOpen = ref(false)
const sidebarProfileRef = ref(null)

const toggleSidebarProfile = () => {
	sidebarProfileOpen.value = !sidebarProfileOpen.value
}

const closeSidebarProfile = (e) => {
	if (sidebarProfileRef.value && !sidebarProfileRef.value.contains(e.target)) {
		sidebarProfileOpen.value = false
	}
}

onMounted(() => {
	window.addEventListener('click', closeSidebarProfile)
})

onUnmounted(() => {
	window.removeEventListener('click', closeSidebarProfile)
})

const close = () => {
	sidebarProfileOpen.value = false
	if (typeof window !== 'undefined' && window.innerWidth < 1024) {
		emit('update:open', false)
	}
}

const menuSections = [
	{
		title: 'Main',
		items: [
			{ to: '/', label: 'Dashboard', icon: IconLayoutDashboard },
			{ to: '/users', label: 'Users', icon: IconUsers }
		]
	},
	{
		title: 'Forms & Tables',
		items: [
			{ to: '/form-elements', label: 'Form Elements', icon: IconForms },
			{ to: '/tables', label: 'Tables', icon: IconTable },
			{ to: '/advanced-table', label: 'Advanced Table', icon: IconTableSpark }
		]
	},
	{
		title: 'UI Components',
		items: [
			{ to: '/accordion', label: 'Accordion', icon: IconLayoutList },
			{ to: '/alerts', label: 'Alerts', icon: IconBell },
			{ to: '/badges', label: 'Badges', icon: IconBadge },
			{ to: '/buttons', label: 'Buttons', icon: IconClick },
			{ to: '/modals', label: 'Modals', icon: IconAppWindow },
			{ to: '/tabs', label: 'Tabs', icon: IconFolders },
			{ to: '/toasts', label: 'Toasts', icon: IconNotification },
			{ to: '/tooltips', label: 'Tooltips', icon: IconHelpCircle }
		]
	},
	{
		title: 'Authentication',
		items: [
			{ to: '/login', label: 'Login', icon: IconLogin },
			{ to: '/register', label: 'Register', icon: IconUserPlus },
			{ to: '/forgot-password', label: 'Forgot Password', icon: IconKey },
			{ to: '/reset-password', label: 'Reset Password', icon: IconLock }
		]
	},
	{
		title: 'Layouts',
		items: [
			{ to: '/layouts/horizontal', label: 'Horizontal', icon: IconLayoutNavbar },
			{ to: '/layouts/horizontal-condensed', label: 'Horizontal Condensed', icon: IconLayout },
			{ to: '/layouts/boxed', label: 'Boxed', icon: IconLayoutGrid }
		]
	}
]
</script>

<template>
	<div v-if="open" @click="close" class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"></div>

	<aside :class="[
		'fixed inset-y-0 left-0 z-50 bg-slate-900 text-slate-300 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 lg:sticky lg:top-0 lg:h-screen',
		mini ? 'lg:w-20' : 'lg:w-64',
		open ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
	]">
		<div class="flex-1 overflow-y-auto custom-scrollbar">
			<div :class="['h-16 flex items-center border-b border-slate-800 px-4 transition-all', mini ? 'justify-center' : 'justify-between']">
				<router-link to="/" class="flex items-center gap-3 overflow-hidden" @click="close">
					<div class="icon-box icon-box-md icon-box-primary shadow-sm shrink-0">
						<IconBuildingStore :size="20" />
					</div>
					<span v-if="!mini" class="text-base font-bold text-white tracking-tight truncate">Arunika</span>
				</router-link>
				<button v-if="!mini" @click="close" class="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer">
					<IconX :size="20" />
				</button>
			</div>

			<div class="p-3 flex flex-col gap-1.5">
				<template v-for="(section, sIndex) in menuSections" :key="section.title">
					<div v-if="!mini" :class="['menu-title', sIndex > 0 ? 'pt-4' : '']">
						{{ section.title }}
					</div>
					<div v-else-if="sIndex > 0" class="my-2 border-t border-slate-800/80"></div>

					<router-link v-for="item in section.items" :key="item.label" :to="item.to" @click="close" :class="[
						'menu-item',
						mini ? 'justify-center px-0' : '',
						route.path === item.to ? 'menu-item-active' : ''
					]" :title="item.label">
						<component :is="item.icon" :size="18" class="shrink-0" />
						<span v-if="!mini" class="truncate">{{ item.label }}</span>
					</router-link>
				</template>
			</div>
		</div>

		<div class="shrink-0 p-3 border-t border-slate-800">
			<div v-if="mini" class="flex flex-col items-center gap-3">
				<img :src="user.avatar" :alt="user.name" class="avatar avatar-sm ring-2 ring-slate-700" :title="user.name" />
				<router-link to="/login" @click="close" class="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition" title="Log Out">
					<IconLogout :size="18" />
				</router-link>
				<button @click="emit('update:mini', false)" class="hidden lg:flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer" title="Expand Sidebar">
					<IconMenu2 :size="18" />
				</button>
			</div>

			<div v-else class="relative" ref="sidebarProfileRef">
				<div v-if="sidebarProfileOpen" class="absolute bottom-full left-0 mb-2 w-full bg-slate-800 border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 z-50 flex flex-col gap-0.5">
					<router-link to="/users" @click="close" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 transition">
						<IconUser :size="16" class="text-slate-400" />
						<span>Account Profile</span>
					</router-link>
					<router-link to="/reset-password" @click="close" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 transition">
						<IconLock :size="16" class="text-slate-400" />
						<span>Change Password</span>
					</router-link>
				</div>

				<button type="button" @click.stop="toggleSidebarProfile" class="w-full flex items-center justify-between p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800/90 transition cursor-pointer mb-3 select-none text-left">
					<div class="flex items-center gap-2.5 min-w-0">
						<img :src="user.avatar" alt="Avatar" class="avatar avatar-md ring-2 ring-slate-700 shrink-0" />
						<div class="truncate">
							<p class="text-xs font-semibold text-white truncate">{{ user.name }}</p>
							<p class="text-[11px] text-slate-400 truncate">{{ user.email }}</p>
						</div>
					</div>
					<IconChevronUp :size="16" :class="['text-slate-400 transition-transform duration-200 shrink-0', sidebarProfileOpen ? 'rotate-180 text-blue-400' : '']" />
				</button>

				<div class="flex items-center gap-2">
					<router-link to="/login" @click="close" class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition">
						<IconLogout :size="16" />
						<span>Log Out</span>
					</router-link>
					<button @click="emit('update:mini', true)" class="hidden lg:flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer" title="Collapse to Mini">
						<IconMenu2 :size="16" />
					</button>
				</div>
			</div>
		</div>
	</aside>
</template>
