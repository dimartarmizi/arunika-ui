<script setup>
import BaseTooltip from '../components/ui/BaseTooltip.vue'
import {
	IconHelpCircle,
	IconInfoCircle,
	IconTrash,
	IconCopy,
	IconHeart,
	IconShare
} from '@tabler/icons-vue'
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-foreground">Tooltips</h3>
			<p class="text-xs sm:text-sm text-muted-foreground">Informative text hints displayed when users hover over an element.</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Placement Positions</h4>
			</div>
			<div class="card-body">
				<div class="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
					<BaseTooltip content="Tooltip on top" position="top">
						<button class="btn btn-outline">Top</button>
					</BaseTooltip>

					<BaseTooltip content="Tooltip on bottom" position="bottom">
						<button class="btn btn-outline">Bottom</button>
					</BaseTooltip>

					<BaseTooltip content="Tooltip on left" position="left">
						<button class="btn btn-outline">Left</button>
					</BaseTooltip>

					<BaseTooltip content="Tooltip on right" position="right">
						<button class="btn btn-outline">Right</button>
					</BaseTooltip>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Tooltips on Common UI Elements</h4>
			</div>
			<div class="card-body flex flex-col gap-6">
				<div>
					<h5 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Icon Action Buttons</h5>
					<div class="flex items-center gap-3">
						<BaseTooltip content="Copy link to clipboard" position="top">
							<button class="btn btn-secondary btn-icon">
								<IconCopy :size="16" />
							</button>
						</BaseTooltip>

						<BaseTooltip content="Add to favorites" position="top">
							<button class="btn btn-secondary btn-icon">
								<IconHeart :size="16" />
							</button>
						</BaseTooltip>

						<BaseTooltip content="Share project" position="top">
							<button class="btn btn-secondary btn-icon">
								<IconShare :size="16" />
							</button>
						</BaseTooltip>

						<BaseTooltip content="Delete permanently" position="top">
							<button class="btn btn-ghost btn-icon hover:text-destructive">
								<IconTrash :size="16" />
							</button>
						</BaseTooltip>
					</div>
				</div>

				<div class="border-t border-border pt-5">
					<h5 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Contextual Indicators & Badges</h5>
					<div class="flex items-center gap-4">
						<BaseTooltip content="Verified identity and signed SSL certificate" position="top">
							<span class="badge badge-success cursor-help">
								Verified User
							</span>
						</BaseTooltip>

						<BaseTooltip content="Pending admin approval since yesterday" position="top">
							<span class="badge badge-warning cursor-help">
								Under Review
							</span>
						</BaseTooltip>

						<BaseTooltip content="Click documentation to learn more" position="right">
							<span class="text-muted-foreground hover:text-primary cursor-help inline-flex items-center gap-1 text-xs">
								<IconHelpCircle :size="16" />
								<span>Help Info</span>
							</span>
						</BaseTooltip>
					</div>
				</div>

				<div class="border-t border-border pt-5">
					<h5 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Pure HTML Class Usage (daisyUI style)</h5>
					<p class="text-xs text-muted-foreground mb-3">
						Can also be used directly on any HTML element without the Vue wrapper:
					</p>
					<div class="flex items-center gap-3">
						<button class="btn btn-primary tooltip tooltip-top" data-tip="Direct class tooltip">
							Hover Me
						</button>
						<span class="tooltip tooltip-bottom text-muted-foreground font-medium text-xs cursor-help inline-flex items-center gap-1" data-tip="Native class tooltip on bottom">
							<IconInfoCircle :size="16" />
							More Info
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
