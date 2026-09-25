<script setup>
import { ref } from 'vue'
import BaseBadge from '../components/ui/BaseBadge.vue'
import {
	IconCheck,
	IconAlertCircle,
	IconStar,
	IconSparkles,
	IconFlame,
	IconBell,
	IconMail,
	IconShieldCheck
} from '@tabler/icons-vue'

const tags = ref(['Vue 3', 'Tailwind CSS', 'Vite', 'TypeScript', 'Arunika'])

const removeTag = (index) => {
	tags.value.splice(index, 1)
}

const resetTags = () => {
	tags.value = ['Vue 3', 'Tailwind CSS', 'Vite', 'TypeScript', 'Arunika']
}
</script>

<template>
	<div class="flex flex-col gap-6">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-xl font-bold text-slate-900">Badges</h3>
				<p class="text-xs sm:text-sm text-slate-500">Semantic badges for states, categories, counters, and status indicators.</p>
			</div>
			<button v-if="tags.length < 5" @click="resetTags" class="btn btn-outline btn-sm">
				Reset Tags
			</button>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-slate-800">Soft / Light Variants</h4>
			</div>
			<div class="card-body flex flex-wrap items-center gap-3">
				<BaseBadge variant="primary">Primary</BaseBadge>
				<BaseBadge variant="secondary">Secondary</BaseBadge>
				<BaseBadge variant="success">Success</BaseBadge>
				<BaseBadge variant="warning">Warning</BaseBadge>
				<BaseBadge variant="danger">Danger</BaseBadge>
				<BaseBadge variant="info">Info</BaseBadge>
				<BaseBadge variant="neutral">Neutral</BaseBadge>
				<BaseBadge variant="muted">Muted</BaseBadge>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-slate-800">Solid / Filled Variants</h4>
			</div>
			<div class="card-body flex flex-wrap items-center gap-3">
				<BaseBadge variant="primary" solid>Primary</BaseBadge>
				<BaseBadge variant="success" solid>Success</BaseBadge>
				<BaseBadge variant="warning" solid>Warning</BaseBadge>
				<BaseBadge variant="danger" solid>Danger</BaseBadge>
				<BaseBadge variant="info" solid>Info</BaseBadge>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-slate-800">Outline Variants</h4>
			</div>
			<div class="card-body flex flex-wrap items-center gap-3">
				<BaseBadge variant="primary" outline>Primary</BaseBadge>
				<BaseBadge variant="success" outline>Success</BaseBadge>
				<BaseBadge variant="warning" outline>Warning</BaseBadge>
				<BaseBadge variant="danger" outline>Danger</BaseBadge>
				<BaseBadge variant="info" outline>Info</BaseBadge>
				<BaseBadge variant="neutral" outline>Neutral</BaseBadge>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="card">
				<div class="card-header">
					<h4 class="font-semibold text-sm text-slate-800">Sizes</h4>
				</div>
				<div class="card-body flex flex-wrap items-center gap-4">
					<div class="flex items-center gap-2">
						<BaseBadge variant="primary" size="sm">Small (sm)</BaseBadge>
						<BaseBadge variant="primary" size="md">Medium (md)</BaseBadge>
						<BaseBadge variant="primary" size="lg">Large (lg)</BaseBadge>
					</div>
					<div class="flex items-center gap-2 pt-3 border-t border-slate-100 w-full">
						<BaseBadge variant="success" solid size="sm">Small</BaseBadge>
						<BaseBadge variant="success" solid size="md">Medium</BaseBadge>
						<BaseBadge variant="success" solid size="lg">Large</BaseBadge>
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-header">
					<h4 class="font-semibold text-sm text-slate-800">Status Dots</h4>
				</div>
				<div class="card-body flex flex-wrap items-center gap-3">
					<BaseBadge variant="success" dot>Active</BaseBadge>
					<BaseBadge variant="warning" dot>Pending</BaseBadge>
					<BaseBadge variant="danger" dot>Inactive</BaseBadge>
					<BaseBadge variant="info" dot>In Progress</BaseBadge>
					<BaseBadge variant="neutral" dot>Draft</BaseBadge>

					<div class="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 w-full">
						<BaseBadge variant="success" solid dot>Online</BaseBadge>
						<BaseBadge variant="warning" solid dot>Away</BaseBadge>
						<BaseBadge variant="danger" solid dot>Offline</BaseBadge>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="card">
				<div class="card-header">
					<h4 class="font-semibold text-sm text-slate-800">With Icons</h4>
				</div>
				<div class="card-body flex flex-wrap items-center gap-3">
					<BaseBadge variant="primary">
						<IconStar :size="13" />
						<span>Featured</span>
					</BaseBadge>
					<BaseBadge variant="success">
						<IconCheck :size="13" />
						<span>Verified</span>
					</BaseBadge>
					<BaseBadge variant="warning">
						<IconSparkles :size="13" />
						<span>New</span>
					</BaseBadge>
					<BaseBadge variant="danger">
						<IconFlame :size="13" />
						<span>Popular</span>
					</BaseBadge>
					<BaseBadge variant="info">
						<IconShieldCheck :size="13" />
						<span>Protected</span>
					</BaseBadge>
				</div>
			</div>

			<div class="card">
				<div class="card-header">
					<h4 class="font-semibold text-sm text-slate-800">Dismissible Tags</h4>
				</div>
				<div class="card-body flex flex-wrap items-center gap-2">
					<BaseBadge v-for="(tag, index) in tags" :key="tag" variant="neutral" dismissible @dismiss="removeTag(index)">
						{{ tag }}
					</BaseBadge>
					<span v-if="tags.length === 0" class="text-xs text-slate-400 italic">All tags removed. Click "Reset Tags" above.</span>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-slate-800">Positioned Notification Indicators</h4>
			</div>
			<div class="card-body flex flex-wrap items-center gap-8">
				<button class="btn btn-outline relative">
					<IconBell :size="18" />
					<span>Notifications</span>
					<span class="badge badge-solid-danger badge-sm ml-1.5">3</span>
				</button>

				<div class="relative inline-flex">
					<div class="icon-box icon-box-md icon-box-neutral">
						<IconMail :size="20" />
					</div>
					<span class="absolute -top-1.5 -right-1.5 badge badge-solid-primary badge-sm px-1.5 py-0 min-w-5 h-5 flex items-center justify-center">
						8
					</span>
				</div>

				<div class="relative inline-flex">
					<img class="avatar avatar-md" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Avatar" />
					<span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
				</div>

				<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700">
					<span>Pending Reviews</span>
					<BaseBadge variant="warning" size="sm">14</BaseBadge>
				</div>
			</div>
		</div>
	</div>
</template>
