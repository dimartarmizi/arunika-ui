<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './layouts/Sidebar.vue'
import Navbar from './layouts/Navbar.vue'

const route = useRoute()
const sidebarOpen = ref(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)
const sidebarMini = ref(false)

const isStandalonePage = computed(() => {
	const authPages = ['/login', '/register', '/forgot-password', '/reset-password']
	return authPages.includes(route.path) || route.path.startsWith('/layouts/')
})

const currentUser = ref({
	name: 'Administrator',
	email: 'admin@arunika.io',
	avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
})

const toggleSidebar = () => {
	if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
		sidebarMini.value = !sidebarMini.value
	} else {
		sidebarOpen.value = !sidebarOpen.value
	}
}
</script>

<template>
	<div class="min-h-screen bg-background text-foreground antialiased font-sans transition-colors duration-200">
		<router-view v-if="isStandalonePage" />

		<div v-else class="flex min-h-screen">
			<Sidebar v-model:open="sidebarOpen" v-model:mini="sidebarMini" :user="currentUser" />

			<div class="flex-1 flex flex-col min-w-0">
				<Navbar :user="currentUser" @toggle-sidebar="toggleSidebar" />

				<main class="flex-1 py-6">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<router-view />
					</div>
				</main>
			</div>
		</div>
	</div>
</template>
