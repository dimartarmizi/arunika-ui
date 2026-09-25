<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { IconX } from '@tabler/icons-vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	size: {
		type: String,
		default: 'md',
		validator: (val) => ['sm', 'md', 'lg', 'xl'].includes(val)
	},
	closeOnBackdrop: {
		type: Boolean,
		default: true
	}
})

const emit = defineEmits(['update:modelValue', 'close'])

const sizeClass = computed(() => {
	switch (props.size) {
		case 'sm':
			return 'max-w-sm'
		case 'lg':
			return 'max-w-2xl'
		case 'xl':
			return 'max-w-4xl'
		case 'md':
		default:
			return 'max-w-lg'
	}
})

const close = () => {
	emit('update:modelValue', false)
	emit('close')
}

const onBackdropClick = (e) => {
	if (props.closeOnBackdrop && e.target === e.currentTarget) {
		close()
	}
}

const onKeyDown = (e) => {
	if (e.key === 'Escape' && props.modelValue) {
		close()
	}
}

watch(() => props.modelValue, (isOpen) => {
	if (isOpen) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = ''
	}
})

onMounted(() => {
	window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
	window.removeEventListener('keydown', onKeyDown)
	document.body.style.overflow = ''
})
</script>

<template>
	<Teleport to="body">
		<Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
			<div v-if="modelValue" class="modal-backdrop" @click="onBackdropClick" role="dialog" aria-modal="true">
				<Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95 translate-y-2" enter-to-class="opacity-100 scale-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-2">
					<div v-if="modelValue" :class="['modal-box', sizeClass]">
						<div class="flex items-center justify-between pb-4 border-b border-slate-100">
							<slot name="header">
								<h3 class="modal-title">{{ title }}</h3>
							</slot>
							<button type="button" @click="close" class="btn btn-ghost btn-icon btn-sm text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer" aria-label="Close modal">
								<IconX :size="18" />
							</button>
						</div>

						<div class="py-4 text-sm text-slate-600">
							<slot></slot>
						</div>

						<div v-if="$slots.footer" class="modal-action">
							<slot name="footer" :close="close"></slot>
						</div>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>
