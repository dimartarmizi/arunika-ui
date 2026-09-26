<script setup>
import { ref, computed } from 'vue'
import {
	IconUpload,
	IconX,
	IconRotateClockwise,
	IconFile,
	IconFileText,
	IconFileZip,
	IconPhoto,
	IconCheck,
	IconPlayerPause,
	IconPlayerPlay
} from '@tabler/icons-vue'

const props = defineProps({
	modelValue: {
		type: [Array, Object, null],
		default: () => []
	},
	label: {
		type: String,
		default: ''
	},
	hint: {
		type: String,
		default: ''
	},
	error: {
		type: [String, Boolean],
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	required: {
		type: Boolean,
		default: false
	},
	multiple: {
		type: Boolean,
		default: false
	},
	accept: {
		type: String,
		default: ''
	},
	maxSize: {
		type: Number,
		default: 50 * 1024 * 1024
	},
	maxFiles: {
		type: Number,
		default: 10
	},
	autoUpload: {
		type: Boolean,
		default: true
	},
	uploadUrl: {
		type: String,
		default: ''
	},
	customUpload: {
		type: Function,
		default: null
	},
	chunked: {
		type: Boolean,
		default: false
	},
	chunkSize: {
		type: Number,
		default: 1024 * 1024
	},
	compressImages: {
		type: Boolean,
		default: false
	},
	maxWidth: {
		type: Number,
		default: 1920
	},
	maxHeight: {
		type: Number,
		default: 1080
	},
	quality: {
		type: Number,
		default: 0.8
	}
})

const emit = defineEmits(['update:modelValue', 'change', 'error', 'success', 'complete'])

const fileInputRef = ref(null)
const isDragging = ref(false)
const items = ref([])

const formatSize = (bytes) => {
	if (!bytes || bytes === 0) return '0 B'
	const k = 1024
	const sizes = ['B', 'KB', 'MB', 'GB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const getFileIcon = (file) => {
	const type = file.type || ''
	if (type.startsWith('image/')) return IconPhoto
	if (type.includes('pdf') || type.includes('text') || type.includes('document')) return IconFileText
	if (type.includes('zip') || type.includes('tar') || type.includes('rar') || type.includes('7z')) return IconFileZip
	return IconFile
}

const compressImage = (file) => {
	return new Promise((resolve) => {
		if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
			return resolve(file)
		}
		const img = new Image()
		const url = URL.createObjectURL(file)
		img.src = url
		img.onload = () => {
			URL.revokeObjectURL(url)
			let { width, height } = img
			if (width > props.maxWidth || height > props.maxHeight) {
				const ratio = Math.min(props.maxWidth / width, props.maxHeight / height)
				width = Math.round(width * ratio)
				height = Math.round(height * ratio)
			}
			const canvas = document.createElement('canvas')
			canvas.width = width
			canvas.height = height
			const ctx = canvas.getContext('2d')
			ctx.drawImage(img, 0, 0, width, height)
			canvas.toBlob(
				(blob) => {
					if (!blob || blob.size >= file.size) {
						resolve(file)
					} else {
						const compressed = new File([blob], file.name, {
							type: file.type,
							lastModified: Date.now()
						})
						resolve(compressed)
					}
				},
				file.type,
				props.quality
			)
		}
		img.onerror = () => resolve(file)
	})
}

const validateFile = (file) => {
	if (props.maxSize && file.size > props.maxSize) {
		return `File size exceeds ${formatSize(props.maxSize)}`
	}
	if (props.accept) {
		const patterns = props.accept.split(',').map((p) => p.trim())
		const matches = patterns.some((p) => {
			if (p.startsWith('.')) return file.name.toLowerCase().endsWith(p.toLowerCase())
			if (p.endsWith('/*')) return file.type.startsWith(p.replace('/*', ''))
			return file.type === p
		})
		if (!matches) return `Invalid format. Allowed: ${props.accept}`
	}
	return null
}

const syncModel = () => {
	const completedFiles = items.value
		.filter((i) => i.status === 'success' || i.status === 'ready')
		.map((i) => (i.response ? i.response : i.file))
	const val = props.multiple ? completedFiles : completedFiles[0] || null
	emit('update:modelValue', val)
}

const uploadChunked = async (item) => {
	const totalSize = item.file.size
	const totalChunks = Math.ceil(totalSize / props.chunkSize)

	for (let i = item.currentChunk || 0; i < totalChunks; i++) {
		if (item.status === 'paused' || item.status === 'canceled') return

		item.currentChunk = i
		const start = i * props.chunkSize
		const end = Math.min(start + props.chunkSize, totalSize)
		const chunk = item.file.slice(start, end)

		const formData = new FormData()
		formData.append('file', chunk)
		formData.append('chunkIndex', i)
		formData.append('totalChunks', totalChunks)
		formData.append('fileName', item.file.name)
		formData.append('fileId', item.id)

		try {
			if (props.customUpload) {
				await props.customUpload(formData, (loaded) => {
					const overallLoaded = start + loaded
					item.progress = Math.min(99, Math.round((overallLoaded / totalSize) * 100))
				})
			} else if (props.uploadUrl) {
				await new Promise((resolve, reject) => {
					const xhr = new XMLHttpRequest()
					item.xhr = xhr
					xhr.open('POST', props.uploadUrl)
					xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve(xhr.response) : reject(new Error(xhr.statusText)))
					xhr.onerror = () => reject(new Error('Network error'))
					xhr.send(formData)
				})
			} else {
				await new Promise((r) => setTimeout(r, 120))
			}
			item.progress = Math.min(99, Math.round(((i + 1) / totalChunks) * 100))
		} catch (err) {
			item.status = 'error'
			item.error = err.message || 'Chunk upload failed'
			emit('error', { item, error: err })
			return
		}
	}

	item.progress = 100
	item.status = 'success'
	emit('success', item)
	syncModel()
}

const uploadDirect = (item) => {
	if (props.customUpload) {
		props.customUpload(item.file, (progress) => {
			item.progress = progress
		})
			.then((res) => {
				item.progress = 100
				item.status = 'success'
				item.response = res
				emit('success', item)
				syncModel()
			})
			.catch((err) => {
				item.status = 'error'
				item.error = err.message || 'Upload failed'
				emit('error', { item, error: err })
			})
		return
	}

	if (props.uploadUrl) {
		const xhr = new XMLHttpRequest()
		item.xhr = xhr
		const formData = new FormData()
		formData.append('file', item.file)

		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) {
				item.progress = Math.round((e.loaded / e.total) * 100)
			}
		}
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				item.progress = 100
				item.status = 'success'
				try {
					item.response = JSON.parse(xhr.responseText)
				} catch {
					item.response = xhr.responseText
				}
				emit('success', item)
				syncModel()
			} else {
				item.status = 'error'
				item.error = `HTTP Error ${xhr.status}`
				emit('error', { item, error: xhr.statusText })
			}
		}
		xhr.onerror = () => {
			item.status = 'error'
			item.error = 'Network error'
			emit('error', { item, error: 'Network error' })
		}
		xhr.open('POST', props.uploadUrl)
		xhr.send(formData)
		return
	}

	let p = 0
	const interval = setInterval(() => {
		if (item.status === 'canceled') {
			clearInterval(interval)
			return
		}
		p += Math.floor(Math.random() * 20) + 15
		if (p >= 100) {
			p = 100
			item.progress = 100
			item.status = 'success'
			clearInterval(interval)
			emit('success', item)
			syncModel()
		} else {
			item.progress = p
		}
	}, 120)
	item._interval = interval
}

const startUpload = (item) => {
	if (item.status === 'uploading') return
	item.status = 'uploading'
	item.error = null
	if (props.chunked && item.file.size > props.chunkSize) {
		uploadChunked(item)
	} else {
		uploadDirect(item)
	}
}

const processFiles = async (rawFiles) => {
	if (props.disabled) return
	const filesArray = Array.from(rawFiles)
	if (!filesArray.length) return

	if (!props.multiple) {
		items.value.forEach((i) => cancelItem(i))
		items.value = []
	}

	const allowedCount = props.multiple ? props.maxFiles - items.value.length : 1
	const toProcess = filesArray.slice(0, Math.max(0, allowedCount))

	for (const originalFile of toProcess) {
		const validationError = validateFile(originalFile)
		const finalFile = props.compressImages ? await compressImage(originalFile) : originalFile

		let preview = null
		if (finalFile.type.startsWith('image/')) {
			preview = URL.createObjectURL(finalFile)
		}

		const item = {
			id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			file: finalFile,
			name: finalFile.name,
			size: finalFile.size,
			originalSize: originalFile.size,
			preview,
			progress: 0,
			status: validationError ? 'error' : 'ready',
			error: validationError,
			currentChunk: 0,
			xhr: null,
			response: null
		}

		items.value.push(item)

		if (!validationError && props.autoUpload) {
			startUpload(item)
		}
	}

	emit('change', items.value)
	syncModel()
}

const cancelItem = (item) => {
	if (item._interval) clearInterval(item._interval)
	if (item.xhr) item.xhr.abort()
	item.status = 'canceled'
}

const removeItem = (index) => {
	const item = items.value[index]
	if (!item) return
	cancelItem(item)
	if (item.preview) URL.revokeObjectURL(item.preview)
	items.value.splice(index, 1)
	syncModel()
}

const retryItem = (item) => {
	item.progress = 0
	item.currentChunk = 0
	startUpload(item)
}

const togglePause = (item) => {
	if (item.status === 'uploading') {
		item.status = 'paused'
		if (item.xhr) item.xhr.abort()
	} else if (item.status === 'paused') {
		startUpload(item)
	}
}

const onDrop = (e) => {
	isDragging.value = false
	if (props.disabled) return
	if (e.dataTransfer && e.dataTransfer.files) {
		processFiles(e.dataTransfer.files)
	}
}

const onFileInputChange = (e) => {
	if (e.target && e.target.files) {
		processFiles(e.target.files)
		e.target.value = ''
	}
}

const triggerSelect = () => {
	if (!props.disabled && fileInputRef.value) {
		fileInputRef.value.click()
	}
}

const computedError = computed(() => {
	if (typeof props.error === 'string' && props.error) return props.error
	return null
})
</script>

<template>
	<div class="w-full flex flex-col gap-2">
		<div v-if="label || multiple" class="flex items-center justify-between">
			<label v-if="label" class="form-label mb-0">
				{{ label }}
				<span v-if="required" class="text-destructive font-bold ml-0.5">*</span>
			</label>
			<span v-if="multiple && maxFiles" class="text-[11px] text-muted-foreground font-medium">
				{{ items.length }} / {{ maxFiles }} files
			</span>
		</div>

		<div @dragover.prevent="!disabled && (isDragging = true)" @dragleave.prevent="isDragging = false" @drop.prevent="onDrop" @click="triggerSelect" :class="[
			'relative flex flex-col items-center justify-center p-6 min-h-[200px] border-2 border-dashed rounded-xl transition text-center select-none',
			disabled ? 'opacity-50 cursor-not-allowed bg-muted border-border' : 'cursor-pointer',
			isDragging ? 'border-primary bg-primary-soft scale-[0.99]' : '',
			error || computedError ? 'border-destructive bg-destructive-soft' : '',
			!isDragging && !error && !computedError && !disabled ? 'border-border hover:border-primary bg-background/50 hover:bg-primary-soft' : ''
		]">
			<input ref="fileInputRef" type="file" :multiple="multiple" :accept="accept" :disabled="disabled" class="hidden" @change="onFileInputChange" />

			<div class="size-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-2.5 pointer-events-none transition group-hover:scale-110">
				<IconUpload :size="22" />
			</div>

			<p class="text-xs font-semibold text-foreground pointer-events-none">
				Drag & drop files here, or <span class="text-primary underline underline-offset-2">browse</span>
			</p>
			<p class="text-[11px] text-muted-foreground mt-1 pointer-events-none">
				<span v-if="accept">Accept: {{ accept }} • </span>
				<span>Max size: {{ formatSize(maxSize) }}</span>
				<span v-if="chunked"> • Resumable / Chunks active</span>
				<span v-if="compressImages"> • Auto image resize</span>
			</p>
		</div>

		<p v-if="computedError || hint" :class="computedError ? 'form-hint-error' : 'form-hint'">
			{{ computedError || hint }}
		</p>

		<div v-if="items.length > 0" class="flex flex-col gap-2 mt-1">
			<div v-for="(item, idx) in items" :key="item.id" class="relative p-2.5 rounded-xl border border-border bg-card flex items-center gap-3 overflow-hidden shadow-xs">
				<div class="size-11 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden border border-border">
					<img v-if="item.preview" :src="item.preview" class="size-full object-cover" alt="preview" />
					<component v-else :is="getFileIcon(item.file)" :size="20" class="text-muted-foreground" />
				</div>

				<div class="flex-1 min-w-0">
					<div class="flex items-center justify-between gap-2 mb-1">
						<span class="text-xs font-medium text-foreground truncate" :title="item.name">
							{{ item.name }}
						</span>
						<span class="text-[10px] text-muted-foreground shrink-0">
							{{ formatSize(item.size) }}
							<span v-if="item.originalSize && item.size < item.originalSize" class="text-success text-[9px]">
								(-{{ Math.round((1 - item.size / item.originalSize) * 100) }}%)
							</span>
						</span>
					</div>

					<div v-if="autoUpload" class="w-full h-1.5 rounded-full bg-muted overflow-hidden flex items-center">
						<div class="h-full rounded-full transition-all duration-200" :class="[
							item.status === 'error' ? 'bg-destructive' : '',
							item.status === 'success' ? 'bg-success' : '',
							item.status === 'uploading' ? 'bg-primary' : '',
							item.status === 'paused' ? 'bg-warning' : 'bg-primary'
						]" :style="{ width: `${item.progress}%` }" />
					</div>

					<div class="flex items-center justify-between mt-1 text-[10px]">
						<span v-if="item.status === 'error'" class="text-destructive font-medium truncate">
							{{ item.error }}
						</span>
						<span v-else-if="!autoUpload" class="text-muted-foreground flex items-center gap-1">
							Ready to submit
						</span>
						<span v-else-if="item.status === 'success'" class="text-success font-medium flex items-center gap-1">
							<IconCheck :size="12" /> Completed
						</span>
						<span v-else-if="item.status === 'uploading'" class="text-primary font-medium">
							Uploading... {{ item.progress }}%
						</span>
						<span v-else-if="item.status === 'paused'" class="text-warning font-medium">
							Paused
						</span>
						<span v-else class="text-muted-foreground">
							Ready
						</span>

						<span v-if="chunked && item.status === 'uploading'" class="text-muted-foreground text-[9px]">
							Chunk {{ item.currentChunk + 1 }}
						</span>
					</div>
				</div>

				<div class="flex items-center gap-1 shrink-0">
					<button v-if="chunked && (item.status === 'uploading' || item.status === 'paused')" type="button" @click.stop="togglePause(item)" class="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition" :title="item.status === 'uploading' ? 'Pause' : 'Resume'">
						<component :is="item.status === 'uploading' ? IconPlayerPause : IconPlayerPlay" :size="15" />
					</button>

					<button v-if="item.status === 'error' || item.status === 'canceled'" type="button" @click.stop="retryItem(item)" class="p-1 rounded-lg text-primary hover:bg-primary-soft transition" title="Retry upload">
						<IconRotateClockwise :size="15" />
					</button>

					<button type="button" @click.stop="removeItem(idx)" class="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive-soft transition" title="Remove">
						<IconX :size="15" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
