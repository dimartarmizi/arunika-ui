<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
	IconBuildingStore,
	IconLayoutDashboard,
	IconUsers,
	IconForms,
	IconTable,
	IconUser,
	IconLock,
	IconLogout
} from '@tabler/icons-vue'

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
	<div class="min-h-screen bg-slate-300/60 p-3 sm:p-6 lg:p-8 flex items-center justify-center font-sans antialiased text-slate-800">
		<div class="max-w-7xl w-full bg-white rounded-2xl shadow-2xl border border-slate-300/80 overflow-hidden flex flex-col md:flex-row min-h-[85vh]">
			<aside class="w-full md:w-60 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 p-4 border-r border-slate-800">
				<div>
					<div class="h-12 flex items-center gap-3 border-b border-slate-800 pb-3">
						<div class="icon-box icon-box-md icon-box-primary shadow-sm">
							<IconBuildingStore :size="20" />
						</div>
						<span class="text-base font-bold text-white tracking-tight">Arunika</span>
					</div>

					<div class="flex flex-col gap-1.5 pt-4">
						<button class="menu-item menu-item-active text-left cursor-pointer">
							<IconLayoutDashboard :size="18" />
							<span>Dashboard</span>
						</button>
						<router-link to="/users" class="menu-item">
							<IconUsers :size="18" />
							<span>Users</span>
						</router-link>
						<router-link to="/form-elements" class="menu-item">
							<IconForms :size="18" />
							<span>Forms</span>
						</router-link>
						<router-link to="/tables" class="menu-item">
							<IconTable :size="18" />
							<span>Tables</span>
						</router-link>
					</div>
				</div>
			</aside>

			<div class="flex-1 flex flex-col min-w-0 bg-slate-50">
				<header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<h3 class="text-sm font-bold text-slate-900">Dashboard</h3>
					</div>

					<div class="relative" ref="profileDropdownRef">
						<button type="button" @click.stop="toggleProfile" class="flex items-center p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer select-none" aria-label="User menu">
							<img class="avatar avatar-sm ring-2 ring-slate-100" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120" alt="Avatar" />
						</button>

						<div v-if="profileOpen" class="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
							<div class="px-4 py-2.5 border-b border-slate-100">
								<p class="text-xs font-bold text-slate-900 truncate">Administrator</p>
								<p class="text-[11px] text-slate-500 truncate">admin@arunika.io</p>
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
				</header>

				<main class="flex-1 p-6 flex flex-col gap-6">
					<section aria-label="Key metrics" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<article class="card p-4">
							<span class="text-xs text-slate-500 font-medium">Monthly Active</span>
							<span class="text-xl font-bold text-slate-900 mt-1 block">18,420</span>
						</article>
						<article class="card p-4">
							<span class="text-xs text-slate-500 font-medium">Storage Quota</span>
							<span class="text-xl font-bold text-slate-900 mt-1 block">64.2 GB / 100 GB</span>
						</article>
						<article class="card p-4">
							<span class="text-xs text-slate-500 font-medium">Uptime Guarantee</span>
							<span class="text-xl font-bold text-emerald-600 mt-1 block">99.98%</span>
						</article>
					</section>

					<div class="card">
						<div class="card-header">
							<h4 class="font-semibold text-sm text-slate-800">Layout Specifications</h4>
						</div>
						<div class="card-body text-xs text-slate-600 leading-relaxed flex flex-col gap-2">
							<p>
								Boxed layout limits the viewport width of your application to prevent content over-stretching on ultra-wide desktop monitors (2K / 4K displays).
							</p>
							<p>
								Implementation wrapper: <code class="bg-slate-100 text-blue-600 px-1 py-0.5 rounded font-mono">max-w-7xl mx-auto shadow-2xl rounded-2xl</code>.
							</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>
