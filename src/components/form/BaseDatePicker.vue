<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import {
	IconCalendar,
	IconClock,
	IconAlertCircle,
	IconCircleCheck,
	IconAlertTriangle,
	IconArrowUp,
	IconArrowDown,
	IconCaretDownFilled
} from '@tabler/icons-vue'

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'date'
	},
	placeholder: {
		type: String,
		default: ''
	},
	state: {
		type: String,
		default: null,
		validator: (val) => [null, 'error', 'success', 'warning'].includes(val)
	},
	error: {
		type: [String, Boolean],
		default: false
	},
	success: {
		type: [String, Boolean],
		default: false
	},
	warning: {
		type: [String, Boolean],
		default: false
	},
	hint: {
		type: String,
		default: ''
	},
	required: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		default: ''
	},
	id: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const containerRef = ref(null)
const hourListRef = ref(null)
const minuteListRef = ref(null)

const isTime = computed(() => props.type === 'time')
const isDateTime = computed(() => props.type === 'datetime-local')
const isMonth = computed(() => props.type === 'month')
const isWeek = computed(() => props.type === 'week')

const computedState = computed(() => {
	if (props.error) return 'error'
	if (props.success) return 'success'
	if (props.warning) return 'warning'
	return props.state || null
})

const feedbackMessage = computed(() => {
	if (typeof props.error === 'string' && props.error) return props.error
	if (typeof props.success === 'string' && props.success) return props.success
	if (typeof props.warning === 'string' && props.warning) return props.warning
	return props.hint || ''
})

const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())
const navMode = ref('calendar')
const yearRangeStart = ref(Math.floor(today.getFullYear() / 12) * 12)

const selectedDate = ref(null)
const selectedTime = ref({ hour: '00', minute: '00' })
const selectedMonth = ref(null)
const selectedWeek = ref(null)

const monthNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
]

const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const yearsList = computed(() => {
	const start = yearRangeStart.value
	return Array.from({ length: 12 }, (_, i) => start + i)
})

const pad2 = (n) => String(n).padStart(2, '0')

const getISOWeek = (d) => {
	const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
	const dayNum = date.getUTCDay() || 7
	date.setUTCDate(date.getUTCDate() + 4 - dayNum)
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
	return Math.ceil(((date - yearStart) / 86400000 + 1) / 7)
}

const getWeekYear = (d) => {
	const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
	const dayNum = date.getUTCDay() || 7
	date.setUTCDate(date.getUTCDate() + 4 - dayNum)
	return date.getUTCFullYear()
}

const parseModelValue = () => {
	const val = props.modelValue
	if (!val) {
		selectedDate.value = null
		selectedMonth.value = null
		selectedWeek.value = null
		selectedTime.value = {
			hour: pad2(today.getHours()),
			minute: pad2(today.getMinutes())
		}
		viewYear.value = today.getFullYear()
		viewMonth.value = today.getMonth()
		yearRangeStart.value = Math.floor(today.getFullYear() / 12) * 12
		return
	}

	if (isTime.value) {
		const parts = val.split(':')
		if (parts.length >= 2) {
			selectedTime.value = { hour: pad2(parts[0]), minute: pad2(parts[1]) }
		}
	} else if (isMonth.value) {
		const parts = val.split('-')
		if (parts.length === 2) {
			const y = parseInt(parts[0], 10)
			const m = parseInt(parts[1], 10) - 1
			selectedMonth.value = { year: y, month: m }
			viewYear.value = y
			viewMonth.value = m
			yearRangeStart.value = Math.floor(y / 12) * 12
		}
	} else if (isWeek.value) {
		const m = val.match(/^(\d{4})-W(\d{2})$/)
		if (m) {
			const y = parseInt(m[1], 10)
			const w = parseInt(m[2], 10)
			selectedWeek.value = { year: y, week: w }
			const simpleDate = new Date(y, 0, 1 + (w - 1) * 7)
			viewYear.value = simpleDate.getFullYear()
			viewMonth.value = simpleDate.getMonth()
			yearRangeStart.value = Math.floor(simpleDate.getFullYear() / 12) * 12
		}
	} else if (isDateTime.value) {
		const [datePart, timePart] = val.includes('T') ? val.split('T') : val.split(' ')
		if (datePart) {
			const [y, m, d] = datePart.split('-').map(Number)
			if (y && m && d) {
				selectedDate.value = new Date(y, m - 1, d)
				viewYear.value = y
				viewMonth.value = m - 1
				yearRangeStart.value = Math.floor(y / 12) * 12
			}
		}
		if (timePart) {
			const [hh, mm] = timePart.split(':')
			selectedTime.value = { hour: pad2(hh), minute: pad2(mm) }
		}
	} else {
		const [y, m, d] = val.split('-').map(Number)
		if (y && m && d) {
			selectedDate.value = new Date(y, m - 1, d)
			viewYear.value = y
			viewMonth.value = m - 1
			yearRangeStart.value = Math.floor(y / 12) * 12
		}
	}
}

watch(() => props.modelValue, parseModelValue, { immediate: true })

const displayText = computed(() => {
	if (!props.modelValue) return ''

	if (isTime.value) {
		return `${selectedTime.value.hour}:${selectedTime.value.minute}`
	}

	if (isMonth.value) {
		if (selectedMonth.value) {
			return `${monthNames[selectedMonth.value.month]} ${selectedMonth.value.year}`
		}
		return props.modelValue
	}

	if (isWeek.value) {
		if (selectedWeek.value) {
			return `Week ${selectedWeek.value.week}, ${selectedWeek.value.year}`
		}
		return props.modelValue
	}

	if (isDateTime.value) {
		if (selectedDate.value) {
			const d = pad2(selectedDate.value.getDate())
			const m = pad2(selectedDate.value.getMonth() + 1)
			const y = selectedDate.value.getFullYear()
			return `${d}/${m}/${y} ${selectedTime.value.hour}:${selectedTime.value.minute}`
		}
		return props.modelValue
	}

	if (selectedDate.value) {
		const d = pad2(selectedDate.value.getDate())
		const m = pad2(selectedDate.value.getMonth() + 1)
		const y = selectedDate.value.getFullYear()
		return `${d}/${m}/${y}`
	}

	return props.modelValue
})

const calendarRows = computed(() => {
	const year = viewYear.value
	const month = viewMonth.value

	const firstDayOfMonth = new Date(year, month, 1)
	const startingDay = firstDayOfMonth.getDay()

	const daysInMonth = new Date(year, month + 1, 0).getDate()
	const daysInPrevMonth = new Date(year, month, 0).getDate()

	const days = []

	for (let i = startingDay - 1; i >= 0; i--) {
		const d = daysInPrevMonth - i
		days.push({
			day: d,
			date: new Date(year, month - 1, d),
			isCurrentMonth: false,
			isPrevMonth: true
		})
	}

	for (let i = 1; i <= daysInMonth; i++) {
		days.push({
			day: i,
			date: new Date(year, month, i),
			isCurrentMonth: true
		})
	}

	const remaining = 42 - days.length
	for (let i = 1; i <= remaining; i++) {
		days.push({
			day: i,
			date: new Date(year, month + 1, i),
			isCurrentMonth: false,
			isNextMonth: true
		})
	}

	const rows = []
	for (let i = 0; i < days.length; i += 7) {
		const weekSlice = days.slice(i, i + 7)
		const midWeekDate = weekSlice[3].date
		const isoW = getISOWeek(midWeekDate)
		const isoY = getWeekYear(midWeekDate)
		rows.push({
			weekNum: isoW,
			weekYear: isoY,
			days: weekSlice
		})
	}

	return rows
})

const prevNav = () => {
	if (navMode.value === 'calendar') {
		if (viewMonth.value === 0) {
			viewMonth.value = 11
			viewYear.value--
		} else {
			viewMonth.value--
		}
	} else if (navMode.value === 'months') {
		viewYear.value--
	} else if (navMode.value === 'years') {
		yearRangeStart.value -= 12
	}
}

const nextNav = () => {
	if (navMode.value === 'calendar') {
		if (viewMonth.value === 11) {
			viewMonth.value = 0
			viewYear.value++
		} else {
			viewMonth.value++
		}
	} else if (navMode.value === 'months') {
		viewYear.value++
	} else if (navMode.value === 'years') {
		yearRangeStart.value += 12
	}
}

const handleHeaderTitleClick = () => {
	if (navMode.value === 'calendar') {
		navMode.value = 'months'
	} else if (navMode.value === 'months') {
		yearRangeStart.value = Math.floor(viewYear.value / 12) * 12
		navMode.value = 'years'
	} else if (navMode.value === 'years') {
		navMode.value = isMonth.value ? 'months' : 'calendar'
	}
}

const selectMonth = (mIdx) => {
	viewMonth.value = mIdx
	if (isMonth.value) {
		selectedMonth.value = { year: viewYear.value, month: mIdx }
		const formatted = `${viewYear.value}-${pad2(mIdx + 1)}`
		emit('update:modelValue', formatted)
		emit('change', formatted)
		isOpen.value = false
	} else {
		navMode.value = 'calendar'
	}
}

const selectYearNav = (y) => {
	viewYear.value = y
	navMode.value = 'months'
}

const emitDate = (d) => {
	selectedDate.value = d
	const y = d.getFullYear()
	const m = pad2(d.getMonth() + 1)
	const day = pad2(d.getDate())

	if (isDateTime.value) {
		const val = `${y}-${m}-${day} ${selectedTime.value.hour}:${selectedTime.value.minute}`
		emit('update:modelValue', val)
		emit('change', val)
	} else {
		const val = `${y}-${m}-${day}`
		emit('update:modelValue', val)
		emit('change', val)
		isOpen.value = false
	}
}

const isSameDay = (d1, d2) => {
	if (!d1 || !d2) return false
	return d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
}

const selectTime = (type, val) => {
	if (type === 'hour') {
		selectedTime.value.hour = val
	} else {
		selectedTime.value.minute = val
	}

	if (isTime.value) {
		const formatted = `${selectedTime.value.hour}:${selectedTime.value.minute}`
		emit('update:modelValue', formatted)
		emit('change', formatted)
	} else if (isDateTime.value && selectedDate.value) {
		const y = selectedDate.value.getFullYear()
		const m = pad2(selectedDate.value.getMonth() + 1)
		const day = pad2(selectedDate.value.getDate())
		const formatted = `${y}-${m}-${day} ${selectedTime.value.hour}:${selectedTime.value.minute}`
		emit('update:modelValue', formatted)
		emit('change', formatted)
	}
}

const selectWeek = (row) => {
	if (!isWeek.value) return
	selectedWeek.value = { year: row.weekYear, week: row.weekNum }
	const formatted = `${row.weekYear}-W${pad2(row.weekNum)}`
	emit('update:modelValue', formatted)
	emit('change', formatted)
	isOpen.value = false
}

const isRowSelectedWeek = (row) => {
	if (!isWeek.value || !selectedWeek.value) return false
	return selectedWeek.value.week === row.weekNum && selectedWeek.value.year === row.weekYear
}

const setToday = () => {
	const n = new Date()
	viewYear.value = n.getFullYear()
	viewMonth.value = n.getMonth()
	yearRangeStart.value = Math.floor(n.getFullYear() / 12) * 12

	if (isMonth.value) {
		selectMonth(n.getMonth())
		return
	}

	if (isWeek.value) {
		const w = getISOWeek(n)
		const y = getWeekYear(n)
		selectedWeek.value = { year: y, week: w }
		const formatted = `${y}-W${pad2(w)}`
		emit('update:modelValue', formatted)
		emit('change', formatted)
		isOpen.value = false
		return
	}

	emitDate(n)
}

const clearValue = () => {
	selectedDate.value = null
	selectedMonth.value = null
	selectedWeek.value = null
	emit('update:modelValue', '')
	emit('change', '')
	isOpen.value = false
}

const hours = Array.from({ length: 24 }, (_, i) => pad2(i))
const minutes = Array.from({ length: 60 }, (_, i) => pad2(i))

const scrollToSelectedTime = () => {
	nextTick(() => {
		if (hourListRef.value) {
			const activeHour = hourListRef.value.querySelector('.time-active')
			if (activeHour) activeHour.scrollIntoView({ block: 'nearest' })
		}
		if (minuteListRef.value) {
			const activeMinute = minuteListRef.value.querySelector('.time-active')
			if (activeMinute) activeMinute.scrollIntoView({ block: 'nearest' })
		}
	})
}

const togglePicker = () => {
	if (props.disabled) return
	isOpen.value = !isOpen.value
	if (isOpen.value) {
		parseModelValue()
		navMode.value = isMonth.value ? 'months' : 'calendar'
		if (isTime.value || isDateTime.value) {
			scrollToSelectedTime()
		}
	}
}

const handleClickOutside = (e) => {
	if (containerRef.value && !containerRef.value.contains(e.target)) {
		isOpen.value = false
		navMode.value = isMonth.value ? 'months' : 'calendar'
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
	<div ref="containerRef" class="w-full relative">
		<label v-if="label" :for="id || undefined" class="form-label flex items-center justify-between">
			<span>
				{{ label }}
				<span v-if="required" class="text-destructive font-bold ml-0.5">*</span>
			</span>
			<slot name="label-extra" />
		</label>

		<div class="relative cursor-pointer" @click="togglePicker">
			<input :id="id || undefined" :name="name || undefined" type="text" readonly :value="displayText" :placeholder="placeholder || (isTime ? 'Select time' : isMonth ? 'Select month' : isWeek ? 'Select week' : isDateTime ? 'Select date and time' : 'Select date')" :disabled="disabled" :required="required" :class="[
				'input pr-10 cursor-pointer select-none',
				computedState === 'error' ? 'input-error' : '',
				computedState === 'success' ? 'input-success' : '',
				computedState === 'warning' ? 'input-warning' : '',
				disabled ? 'cursor-not-allowed opacity-60' : ''
			]" />
			<input v-if="name" type="hidden" :name="name" :value="modelValue" :disabled="disabled" />

			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground gap-1.5">
				<IconAlertCircle v-if="computedState === 'error'" :size="16" class="text-destructive" />
				<IconCircleCheck v-else-if="computedState === 'success'" :size="16" class="text-success" />
				<IconAlertTriangle v-else-if="computedState === 'warning'" :size="16" class="text-warning" />
				<IconClock v-if="isTime" :size="18" />
				<IconCalendar v-else :size="18" />
			</div>
		</div>

		<p v-if="feedbackMessage" :class="[
			computedState === 'error' ? 'form-hint-error' : '',
			computedState === 'success' ? 'form-hint-success' : '',
			computedState === 'warning' ? 'form-hint-warning' : '',
			!computedState ? 'form-hint' : ''
		]">
			<span>{{ feedbackMessage }}</span>
		</p>

		<div v-if="isOpen" class="absolute left-0 mt-1 z-50 bg-card border border-border rounded-xl shadow-xl p-3 flex text-foreground font-sans select-none animate-in fade-in zoom-in-95 duration-100">
			<div v-if="isTime" class="flex gap-2">
				<div ref="hourListRef" class="w-16 h-64 overflow-y-auto no-scrollbar flex flex-col gap-1 border border-border rounded-lg p-1">
					<button v-for="h in hours" :key="h" type="button" @click="selectTime('hour', h)" :class="[
						'py-1.5 text-center text-sm font-semibold rounded cursor-pointer transition',
						selectedTime.hour === h
							? 'time-active bg-primary text-primary-foreground shadow-xs'
							: 'text-foreground hover:bg-muted'
					]">
						{{ h }}
					</button>
				</div>

				<div ref="minuteListRef" class="w-16 h-64 overflow-y-auto no-scrollbar flex flex-col gap-1 border border-border rounded-lg p-1">
					<button v-for="m in minutes" :key="m" type="button" @click="selectTime('minute', m)" :class="[
						'py-1.5 text-center text-sm font-semibold rounded cursor-pointer transition',
						selectedTime.minute === m
							? 'time-active bg-primary text-primary-foreground'
							: 'text-foreground hover:bg-muted'
					]">
						{{ m }}
					</button>
				</div>
			</div>

			<div v-else-if="isMonth" class="w-64" @click.stop>
				<div class="flex items-center justify-between mb-3 px-1">
					<button type="button" @click.stop="handleHeaderTitleClick" class="flex items-center gap-1 font-bold text-sm text-foreground hover:text-primary cursor-pointer">
						<span v-if="navMode === 'months'">{{ viewYear }}</span>
						<span v-else-if="navMode === 'years'">{{ yearRangeStart }} - {{ yearRangeStart + 11 }}</span>
						<IconCaretDownFilled :size="12" />
					</button>

					<div class="flex items-center gap-1 text-foreground">
						<button type="button" @click.stop="prevNav" class="p-1 hover:bg-muted rounded cursor-pointer">
							<IconArrowUp :size="16" />
						</button>
						<button type="button" @click.stop="nextNav" class="p-1 hover:bg-muted rounded cursor-pointer">
							<IconArrowDown :size="16" />
						</button>
					</div>
				</div>

				<div v-if="navMode === 'years'" class="grid grid-cols-4 gap-2 mb-4">
					<button v-for="y in yearsList" :key="y" type="button" @click.stop="selectYearNav(y)" :class="[
						'py-2 rounded-lg text-xs font-semibold cursor-pointer transition',
						viewYear === y
							? 'bg-primary text-primary-foreground font-bold shadow-xs'
							: 'text-foreground hover:bg-muted'
					]">
						{{ y }}
					</button>
				</div>

				<div v-else class="grid grid-cols-4 gap-2 mb-4">
					<button v-for="(mName, idx) in monthShortNames" :key="mName" type="button" @click.stop="selectMonth(idx)" :class="[
						'py-2 rounded-lg text-xs font-semibold cursor-pointer transition',
						selectedMonth && selectedMonth.month === idx && selectedMonth.year === viewYear
							? 'bg-primary text-primary-foreground font-bold shadow-xs'
							: 'text-foreground hover:bg-muted'
					]">
						{{ mName }}
					</button>
				</div>

				<div class="flex items-center justify-between border-t border-border pt-2 text-xs">
					<button type="button" @click.stop="clearValue" class="text-primary font-medium hover:opacity-80 cursor-pointer">Clear</button>
					<button type="button" @click.stop="setToday" class="text-primary font-medium hover:opacity-80 cursor-pointer">This month</button>
				</div>
			</div>

			<div v-else class="flex gap-3" @click.stop>
				<div :class="[isWeek ? 'w-72' : 'w-60']">
					<div class="flex items-center justify-between mb-3 px-1">
						<button type="button" @click.stop="handleHeaderTitleClick" class="flex items-center gap-1 font-bold text-sm text-foreground hover:text-primary cursor-pointer">
							<span v-if="navMode === 'calendar'">{{ monthNames[viewMonth] }} {{ viewYear }}</span>
							<span v-else-if="navMode === 'months'">{{ viewYear }}</span>
							<span v-else-if="navMode === 'years'">{{ yearRangeStart }} - {{ yearRangeStart + 11 }}</span>
							<IconCaretDownFilled :size="12" />
						</button>

						<div class="flex items-center gap-1 text-foreground">
							<button type="button" @click.stop="prevNav" class="p-1 hover:bg-muted rounded cursor-pointer">
								<IconArrowUp :size="16" />
							</button>
							<button type="button" @click.stop="nextNav" class="p-1 hover:bg-muted rounded cursor-pointer">
								<IconArrowDown :size="16" />
							</button>
						</div>
					</div>

					<div v-if="navMode === 'years'" class="py-2">
						<div class="grid grid-cols-4 gap-2">
							<button v-for="y in yearsList" :key="y" type="button" @click.stop="selectYearNav(y)" :class="[
								'py-2 rounded-lg text-xs font-semibold cursor-pointer transition',
								viewYear === y
									? 'bg-primary text-primary-foreground font-bold shadow-xs'
									: 'hover:bg-muted text-foreground'
							]">
								{{ y }}
							</button>
						</div>
					</div>

					<div v-else-if="navMode === 'months'" class="py-2">
						<div class="grid grid-cols-3 gap-2">
							<button v-for="(mName, idx) in monthShortNames" :key="mName" type="button" @click.stop="selectMonth(idx)" :class="[
								'py-2 rounded-lg text-xs font-semibold cursor-pointer transition',
								viewMonth === idx
									? 'bg-primary text-primary-foreground font-bold shadow-xs'
									: 'hover:bg-muted text-foreground'
							]">
								{{ mName }}
							</button>
						</div>
					</div>

					<div v-else>
						<div v-if="isWeek" class="flex gap-2">
							<div class="flex flex-col gap-1 pr-2 border-r border-border">
								<div class="h-6 flex items-center justify-center text-xs font-bold text-muted-foreground mb-1.5 px-1">
									Week
								</div>
								<div v-for="(row, rIdx) in calendarRows" :key="'w-' + rIdx" class="flex items-center justify-center">
									<button type="button" @click.stop="selectWeek(row)" :class="[
										'w-8 h-7 flex items-center justify-center text-xs font-bold rounded cursor-pointer transition',
										isRowSelectedWeek(row)
											? 'bg-primary text-primary-foreground shadow-xs'
											: 'text-muted-foreground hover:bg-muted'
									]">
										{{ row.weekNum }}
									</button>
								</div>
							</div>

							<div class="flex-1 flex flex-col gap-1">
								<div class="grid grid-cols-7 mb-1.5 text-center text-xs font-bold text-foreground h-6 items-center">
									<span v-for="wd in weekDays" :key="wd">{{ wd }}</span>
								</div>

								<div v-for="(row, rIdx) in calendarRows" :key="'d-' + rIdx" @click="selectWeek(row)" :class="[
									'grid grid-cols-7 items-center rounded-md cursor-pointer transition',
									isRowSelectedWeek(row) ? 'bg-primary text-primary-foreground font-semibold shadow-xs' : 'hover:bg-muted/50'
								]">
									<div v-for="(item, dIdx) in row.days" :key="dIdx" :class="[
										'h-7 flex items-center justify-center text-xs font-medium',
										isRowSelectedWeek(row)
											? 'text-primary-foreground'
											: item.isCurrentMonth
												? 'text-foreground'
												: 'text-muted-foreground/60'
									]">
										{{ item.day }}
									</div>
								</div>
							</div>
						</div>

						<div v-else>
							<div class="grid grid-cols-7 mb-1.5 text-center text-xs font-bold text-foreground">
								<span v-for="wd in weekDays" :key="wd">{{ wd }}</span>
							</div>

							<div class="flex flex-col gap-1">
								<div v-for="(row, rIdx) in calendarRows" :key="rIdx" class="grid grid-cols-7 items-center">
									<button v-for="(item, dIdx) in row.days" :key="dIdx" type="button" @click="emitDate(item.date)" :class="[
										'h-7 w-7 mx-auto flex items-center justify-center text-xs font-medium rounded cursor-pointer transition',
										isSameDay(item.date, selectedDate)
											? 'bg-primary text-primary-foreground font-semibold shadow-xs'
											: item.isCurrentMonth
												? 'text-foreground hover:bg-muted'
												: 'text-muted-foreground/60'
									]">
										{{ item.day }}
									</button>
								</div>
							</div>
						</div>

						<div class="flex items-center justify-between border-t border-border mt-3 pt-2 text-xs">
							<button type="button" @click="clearValue" class="text-primary font-medium hover:opacity-80 cursor-pointer">Clear</button>
							<button type="button" @click="setToday" class="text-primary font-medium hover:opacity-80 cursor-pointer">
								{{ isWeek ? 'This week' : 'Today' }}
							</button>
						</div>
					</div>
				</div>

				<div v-if="isDateTime" class="flex gap-2 pl-3 border-l border-border">
					<div ref="hourListRef" class="w-12 h-64 overflow-y-auto no-scrollbar flex flex-col gap-1 border border-border rounded-lg p-1">
						<button v-for="h in hours" :key="h" type="button" @click="selectTime('hour', h)" :class="[
							'py-1.5 text-center text-xs font-semibold rounded cursor-pointer transition',
							selectedTime.hour === h
								? 'time-active bg-primary text-primary-foreground shadow-xs'
								: 'text-foreground hover:bg-muted'
						]">
							{{ h }}
						</button>
					</div>

					<div ref="minuteListRef" class="w-12 h-64 overflow-y-auto no-scrollbar flex flex-col gap-1 border border-border rounded-lg p-1">
						<button v-for="m in minutes" :key="m" type="button" @click="selectTime('minute', m)" :class="[
							'py-1.5 text-center text-xs font-semibold rounded cursor-pointer transition',
							selectedTime.minute === m
								? 'time-active bg-primary text-primary-foreground'
								: 'text-foreground hover:bg-muted'
						]">
							{{ m }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
	display: none;
}

.no-scrollbar {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
