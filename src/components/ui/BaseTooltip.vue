<script setup>
import { computed } from 'vue'

const props = defineProps({
	content: {
		type: String,
		required: true
	},
	position: {
		type: String,
		default: 'top',
		validator: (val) => ['top', 'bottom', 'left', 'right'].includes(val)
	},
	as: {
		type: String,
		default: 'span'
	}
})

const tooltipClass = computed(() => [
	'tooltip',
	`tooltip-${props.position}`
])
</script>

<template>
	<component :is="as" :class="tooltipClass" :data-tip="content">
		<slot></slot>
	</component>
</template>
