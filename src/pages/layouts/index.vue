<script setup>
import {
	IconLayout,
	IconLayoutNavbar,
	IconLayoutSidebar,
	IconLayoutGrid,
	IconArrowUpRight
} from '@tabler/icons-vue'

const layoutList = [
	{
		title: 'Default Layout',
		subtitle: 'Vertical Sticky Sidebar',
		description: 'The standard dashboard structure with a dark sticky sidebar, responsive off-canvas drawer on mobile, and a sticky top navbar.',
		route: '/',
		isCurrent: true,
		icon: IconLayoutSidebar
	},
	{
		title: 'Horizontal Layout',
		subtitle: 'Top-Nav Header with Sub-bar',
		description: 'Dedicated horizontal layout with two-tier header navbar and quick-access navigation bar.',
		route: '/layouts/horizontal',
		isCurrent: false,
		icon: IconLayoutNavbar
	},
	{
		title: 'Horizontal Condensed',
		subtitle: 'Single Bar Navigation',
		description: 'Streamlined horizontal layout with brand logo and navigation items combined into a single navbar row without search input.',
		route: '/layouts/horizontal-condensed',
		isCurrent: false,
		icon: IconLayout
	},
	{
		title: 'Boxed Layout',
		subtitle: 'Centered Max-Width Container',
		description: 'Dashboard centered inside a bounded container with outer canvas backdrop for high-resolution desktop displays.',
		route: '/layouts/boxed',
		isCurrent: false,
		icon: IconLayoutGrid
	}
]
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-slate-900">Layout Variations</h3>
			<p class="text-xs sm:text-sm text-slate-500">
				Arunika provides dedicated, standalone Vue pages demonstrating each layout architecture.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div v-for="item in layoutList" :key="item.title" class="card flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition group">
				<div class="card-body flex flex-col gap-4">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
							<component :is="item.icon" :size="20" />
						</div>
						<div>
							<h4 class="font-bold text-base text-slate-900">{{ item.title }}</h4>
							<span class="text-xs text-slate-500 font-medium">{{ item.subtitle }}</span>
						</div>
					</div>

					<p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
						{{ item.description }}
					</p>
				</div>

				<div class="card-footer bg-slate-50/50 flex items-center justify-end">
					<router-link :to="item.route" :class="['btn btn-sm', item.isCurrent ? 'btn-outline' : 'btn-primary']">
						<span>{{ item.isCurrent ? 'Current Layout' : 'Open Layout' }}</span>
						<IconArrowUpRight v-if="!item.isCurrent" :size="14" />
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
