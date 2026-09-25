<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './layouts/Sidebar.vue'
import Navbar from './layouts/Navbar.vue'

const route = useRoute()
const sidebarOpen = ref(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)

const isAuthPage = computed(() => ['/login', '/register', '/forgot-password', '/reset-password'].includes(route.path))

const currentUser = ref({
	name: 'Administrator',
	email: 'admin@arunika.io',
	avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
})
</script>

<template>
	<div class="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
		<router-view v-if="isAuthPage" />

		<div v-else class="flex min-h-screen">
			<Sidebar v-model:open="sidebarOpen" :user="currentUser" />

			<div class="flex-1 flex flex-col min-w-0">
				<Navbar :user="currentUser" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

				<main class="flex-1 py-6">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<router-view />
					</div>
				</main>
			</div>
		</div>
	</div>
</template>
