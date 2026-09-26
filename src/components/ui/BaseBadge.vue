<script setup>
import { computed } from 'vue'
import { IconX } from '@tabler/icons-vue'

const props = defineProps({
	variant: {
		type: String,
		default: 'primary',
		validator: (val) => ['primary', 'secondary', 'success', 'warning', 'destructive', 'info', 'neutral', 'muted'].includes(val)
	},
	size: {
		type: String,
		default: 'md',
		validator: (val) => ['sm', 'md', 'lg'].includes(val)
	},
	solid: {
		type: Boolean,
		default: false
	},
	outline: {
		type: Boolean,
		default: false
	},
	dot: {
		type: Boolean,
		default: false
	},
	dismissible: {
		type: Boolean,
		default: false
	}
})

defineEmits(['dismiss'])

const dotColors = {
	primary: 'bg-primary',
	secondary: 'bg-muted-foreground',
	success: 'bg-success',
	warning: 'bg-warning',
	destructive: 'bg-destructive',
	info: 'bg-info',
	neutral: 'bg-muted',
	muted: 'bg-muted'
}

const badgeClass = computed(() => {
	const classes = ['badge']

	if (props.size === 'sm') classes.push('badge-sm')
	else if (props.size === 'lg') classes.push('badge-lg')
	else classes.push('badge-md')

	if (props.solid) {
		classes.push(`badge-solid-${props.variant}`)
	} else if (props.outline) {
		classes.push(`badge-${props.variant} badge-outline`)
	} else {
		classes.push(`badge-${props.variant}`)
	}

	return classes
})
</script>

<template>
	<span :class="badgeClass">
		<span v-if="dot" :class="[
			'w-1.5 h-1.5 rounded-full shrink-0',
			solid ? 'bg-primary-foreground' : dotColors[variant] || 'bg-current'
		]"></span>

		<slot />

		<button v-if="dismissible" type="button" @click.stop="$emit('dismiss')" class="p-0.5 rounded-full hover:bg-foreground/10 transition cursor-pointer shrink-0 -mr-1" aria-label="Remove badge">
			<IconX :size="size === 'sm' ? 10 : 12" />
		</button>
	</span>
</template>
