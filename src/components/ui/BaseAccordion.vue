<script setup>
import { ref, watch } from 'vue'
import { IconChevronDown } from '@tabler/icons-vue'

const props = defineProps({
	items: {
		type: Array,
		default: () => []
	},
	modelValue: {
		type: [String, Number, Array],
		default: undefined
	},
	multiple: {
		type: Boolean,
		default: false
	},
	variant: {
		type: String,
		default: 'default',
		validator: (val) => ['default', 'flush', 'separated'].includes(val)
	}
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeKeys = ref(
	props.modelValue !== undefined
		? Array.isArray(props.modelValue)
			? [...props.modelValue]
			: [props.modelValue]
		: props.items.length > 0 && !props.multiple
			? [props.items[0].id ?? 0]
			: []
)

watch(
	() => props.modelValue,
	(val) => {
		if (val !== undefined) {
			activeKeys.value = Array.isArray(val) ? [...val] : [val]
		}
	}
)

const isOpen = (id) => activeKeys.value.includes(id)

const toggle = (id) => {
	if (props.multiple) {
		const index = activeKeys.value.indexOf(id)
		if (index > -1) {
			activeKeys.value.splice(index, 1)
		} else {
			activeKeys.value.push(id)
		}
		emit('update:modelValue', [...activeKeys.value])
		emit('change', [...activeKeys.value])
	} else {
		if (activeKeys.value.includes(id)) {
			activeKeys.value = []
		} else {
			activeKeys.value = [id]
		}
		emit('update:modelValue', activeKeys.value[0] ?? null)
		emit('change', activeKeys.value[0] ?? null)
	}
}
</script>

<template>
	<div :class="[
		'accordion',
		variant === 'flush' ? 'accordion-flush' : '',
		variant === 'separated' ? 'accordion-separated' : ''
	]">
		<div v-for="(item, index) in items" :key="item.id ?? index" :class="['accordion-item', item.class || '']">
			<button type="button" @click="toggle(item.id ?? index)" class="accordion-header group" :aria-expanded="isOpen(item.id ?? index)">
				<slot name="header" :item="item" :is-open="isOpen(item.id ?? index)" :index="index">
					<div class="flex items-center gap-3 min-w-0 pr-2">
						<component :is="item.icon" v-if="item.icon" :size="18" class="text-slate-500 shrink-0" />
						<span class="truncate">{{ item.title }}</span>
						<span v-if="item.badge" :class="['badge badge-sm shrink-0', item.badgeVariant ? `badge-${item.badgeVariant}` : 'badge-primary']">
							{{ item.badge }}
						</span>
					</div>
				</slot>
				<IconChevronDown :size="18" :class="[
					'accordion-icon text-slate-400 shrink-0 transition-transform duration-200',
					isOpen(item.id ?? index) ? 'rotate-180 text-blue-600' : ''
				]" />
			</button>

			<div :class="['accordion-collapse', isOpen(item.id ?? index) ? 'is-open' : '']">
				<div>
					<div class="accordion-body">
						<slot name="body" :item="item" :is-open="isOpen(item.id ?? index)" :index="index">
							{{ item.content }}
						</slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
