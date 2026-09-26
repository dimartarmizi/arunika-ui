<script setup>
import { ref } from 'vue'
import {
	IconPlus,
	IconTrash,
	IconArrowRight,
	IconDownload,
	IconShare,
	IconAlignLeft,
	IconAlignCenter,
	IconAlignRight,
	IconChevronDown,
	IconRefresh,
	IconBookmark,
	IconCopy
} from '@tabler/icons-vue'

const activePeriod = ref('month')
const activeAlign = ref('left')
const isLoading = ref(false)

const triggerLoading = () => {
	isLoading.value = true
	setTimeout(() => {
		isLoading.value = false
	}, 1500)
}
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-foreground">Buttons</h3>
			<p class="text-xs sm:text-sm text-muted-foreground">Semantic buttons, state styling, and interactive button groups.</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Button Variants</h4>
			</div>
			<div class="card-body flex flex-wrap items-center gap-3">
				<button class="btn btn-primary">Primary</button>
				<button class="btn btn-secondary">Secondary</button>
				<button class="btn btn-outline">Outline</button>
				<button class="btn btn-ghost">Ghost</button>
				<button class="btn btn-success">Success</button>
				<button class="btn btn-warning">Warning</button>
				<button class="btn btn-destructive">Danger</button>
				<button class="btn btn-info">Info</button>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Button Sizes</h4>
			</div>
			<div class="card-body flex flex-wrap items-center gap-4">
				<button class="btn btn-primary btn-sm">Small (btn-sm)</button>
				<button class="btn btn-primary btn-md">Medium (btn-md)</button>
				<button class="btn btn-primary btn-lg">Large (btn-lg)</button>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Icons & States</h4>
			</div>
			<div class="card-body flex flex-col gap-4">
				<div class="flex flex-wrap items-center gap-3">
					<button class="btn btn-primary">
						<IconPlus :size="16" />
						<span>Add Project</span>
					</button>
					<button class="btn btn-outline">
						<span>Next Page</span>
						<IconArrowRight :size="16" />
					</button>
					<button class="btn btn-secondary">
						<IconDownload :size="16" />
						<span>Export CSV</span>
					</button>
					<button class="btn btn-destructive">
						<IconTrash :size="16" />
						<span>Delete Item</span>
					</button>
				</div>

				<div class="flex flex-wrap items-center gap-3 pt-3 border-t border-border">
					<div class="flex items-center gap-2">
						<button class="btn btn-icon btn-sm btn-secondary" title="Bookmark (btn-sm)">
							<IconBookmark :size="14" />
						</button>
						<button class="btn btn-icon btn-md btn-secondary" title="Bookmark (btn-md)">
							<IconBookmark :size="16" />
						</button>
						<button class="btn btn-icon btn-lg btn-secondary" title="Bookmark (btn-lg)">
							<IconBookmark :size="20" />
						</button>
					</div>

					<button class="btn btn-icon btn-outline" title="Copy">
						<IconCopy :size="16" />
					</button>
					<button class="btn btn-icon btn-destructive" title="Delete">
						<IconTrash :size="16" />
					</button>

					<button disabled class="btn btn-primary">Disabled Primary</button>
					<button disabled class="btn btn-outline">Disabled Outline</button>

					<button @click="triggerLoading" class="btn btn-primary">
						<IconRefresh v-if="isLoading" :size="16" class="animate-spin" />
						<span>{{ isLoading ? 'Processing...' : 'Click to Load' }}</span>
					</button>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Button Groups</h4>
			</div>
			<div class="card-body flex flex-col gap-6">
				<div>
					<p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Segmented Filter</p>
					<div class="btn-group">
						<button @click="activePeriod = 'day'" :class="['btn', activePeriod === 'day' ? 'btn-primary' : 'btn-outline']">
							Day
						</button>
						<button @click="activePeriod = 'week'" :class="['btn', activePeriod === 'week' ? 'btn-primary' : 'btn-outline']">
							Week
						</button>
						<button @click="activePeriod = 'month'" :class="['btn', activePeriod === 'month' ? 'btn-primary' : 'btn-outline']">
							Month
						</button>
						<button @click="activePeriod = 'year'" :class="['btn', activePeriod === 'year' ? 'btn-primary' : 'btn-outline']">
							Year
						</button>
					</div>
				</div>

				<div>
					<p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Text Alignment</p>
					<div class="btn-group">
						<button @click="activeAlign = 'left'" :class="['btn btn-icon', activeAlign === 'left' ? 'btn-primary' : 'btn-outline']" title="Align Left">
							<IconAlignLeft :size="16" />
						</button>
						<button @click="activeAlign = 'center'" :class="['btn btn-icon', activeAlign === 'center' ? 'btn-primary' : 'btn-outline']" title="Align Center">
							<IconAlignCenter :size="16" />
						</button>
						<button @click="activeAlign = 'right'" :class="['btn btn-icon', activeAlign === 'right' ? 'btn-primary' : 'btn-outline']" title="Align Right">
							<IconAlignRight :size="16" />
						</button>
					</div>
				</div>

				<div>
					<p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Split Action</p>
					<div class="flex flex-wrap items-center gap-4">
						<div class="btn-group">
							<button class="btn btn-primary">Save Changes</button>
							<button class="btn btn-primary px-2" title="More options">
								<IconChevronDown :size="16" />
							</button>
						</div>

						<div class="btn-group">
							<button class="btn btn-secondary">
								<IconShare :size="16" />
								<span>Share</span>
							</button>
							<button class="btn btn-secondary px-2" title="Share options">
								<IconChevronDown :size="16" />
							</button>
						</div>
					</div>
				</div>

				<div>
					<p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Vertical Group</p>
					<div class="btn-group-vertical w-48">
						<button class="btn btn-outline justify-start">Overview</button>
						<button class="btn btn-outline justify-start">Billing & Invoices</button>
						<button class="btn btn-outline justify-start">Team Members</button>
						<button class="btn btn-outline justify-start">Security Settings</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
