<script setup>
import { ref } from 'vue'
import BaseInput from '../components/form/BaseInput.vue'
import BaseSelect from '../components/form/BaseSelect.vue'
import BaseDatePicker from '../components/form/BaseDatePicker.vue'
import BaseToggle from '../components/form/BaseToggle.vue'
import BaseRange from '../components/form/BaseRange.vue'
import BaseCheckbox from '../components/form/BaseCheckbox.vue'
import BaseRadio from '../components/form/BaseRadio.vue'
import BaseFileInput from '../components/form/BaseFileInput.vue'
import BaseFileUpload from '../components/form/BaseFileUpload.vue'

const form = ref({
	text: '',
	password: '',
	email: '',
	number: '',
	tel: '',
	url: '',
	search: '',
	select: '',
	date: '',
	time: '',
	datetime: '',
	month: '',
	week: '',
	notifications: true,
	autoSave: false,
	range: 50,
	agree: false,
	subscribed: true,
	gender: 'l'
})

const options = [
	{ value: '1', label: 'Option 1' },
	{ value: '2', label: 'Option 2' },
	{ value: '3', label: 'Option 3' }
]

const selectedFramework = ref('vue')
const frameworkOptions = [
	{ value: 'vue', label: 'Vue.js', icon: '💚', desc: 'Progressive Framework' },
	{ value: 'react', label: 'React', icon: '⚛️', desc: 'UI Library' },
	{ value: 'svelte', label: 'Svelte', icon: '🔥', desc: 'Cybernetically enhanced' },
	{ value: 'angular', label: 'Angular', icon: '🅰️', desc: 'Platform framework' }
]

const multiTags = ref(['design', 'dev'])
const tagOptions = ref([
	{ value: 'design', label: 'UI/UX Design' },
	{ value: 'dev', label: 'Frontend Dev' },
	{ value: 'backend', label: 'Backend API' },
	{ value: 'devops', label: 'Cloud & DevOps' }
])

const selectedProvince = ref('')
const selectedCity = ref('')
const provinces = [
	{ value: 'west-coast', label: 'West Coast' },
	{ value: 'east-coast', label: 'East Coast' },
	{ value: 'central', label: 'Central' }
]
const cityMap = {
	'west-coast': [
		{ value: 'sf', label: 'San Francisco' },
		{ value: 'la', label: 'Los Angeles' },
		{ value: 'sea', label: 'Seattle' }
	],
	'east-coast': [
		{ value: 'nyc', label: 'New York' },
		{ value: 'bos', label: 'Boston' },
		{ value: 'mia', label: 'Miami' }
	],
	central: [
		{ value: 'chi', label: 'Chicago' },
		{ value: 'aus', label: 'Austin' },
		{ value: 'den', label: 'Denver' }
	]
}
const currentCities = ref([])
const onProvinceChange = (prov) => {
	selectedCity.value = ''
	currentCities.value = prov ? cityMap[prov] || [] : []
}

const asyncUser = ref(null)
const loadUsersApi = async (query = '', isAppend = false) => {
	await new Promise((r) => setTimeout(r, 600))
	const mockData = [
		{ value: '1', label: 'Sarah Connor', email: 'sarah@skynet.com' },
		{ value: '2', label: 'John Doe', email: 'john@example.com' },
		{ value: '3', label: 'Alex Murphy', email: 'murphy@detroit.gov' },
		{ value: '4', label: 'Thomas Anderson', email: 'neo@matrix.io' },
		{ value: '5', label: 'Bruce Wayne', email: 'bruce@wayne.corp' }
	]
	if (query) {
		return mockData.filter((u) =>
			u.label.toLowerCase().includes(query.toLowerCase())
		)
	}
	return mockData
}

const uploadedDocs = ref([])
const uploadedImages = ref([])
const chunkedFiles = ref([])

const testState = ref('normal')
const testForm = ref({
	username: 'johndoe',
	role: '1',
	date: '2026-09-25'
})
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-foreground">Form Elements</h3>
			<p class="text-xs sm:text-sm text-muted-foreground">Compilation of standard form input elements.</p>
		</div>

		<div class="card">
			<div class="card-header flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div>
					<h4 class="font-semibold text-sm text-foreground">Interactive State Tester</h4>
					<p class="text-xs text-muted-foreground">Click state buttons to test the visual response of the inputs live.</p>
				</div>
				<div class="btn-group">
					<button type="button" @click="testState = 'normal'" :class="['btn btn-sm', testState === 'normal' ? 'btn-primary' : 'btn-outline']">
						Normal
					</button>
					<button type="button" @click="testState = 'error'" :class="['btn btn-sm', testState === 'error' ? 'btn-destructive' : 'btn-outline']">
						Error
					</button>
					<button type="button" @click="testState = 'success'" :class="['btn btn-sm', testState === 'success' ? 'btn-success' : 'btn-outline']">
						Success
					</button>
					<button type="button" @click="testState = 'warning'" :class="['btn btn-sm', testState === 'warning' ? 'btn-warning' : 'btn-outline']">
						Warning
					</button>
					<button type="button" @click="testState = 'disabled'" :class="['btn btn-sm', testState === 'disabled' ? 'btn-secondary' : 'btn-outline']">
						Disabled
					</button>
				</div>
			</div>
			<div class="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				<BaseInput v-model="testForm.username" label="Username / Email" placeholder="Enter username" :required="testState !== 'disabled'" :disabled="testState === 'disabled'" :error="testState === 'error' ? 'Username is invalid or already taken.' : false" :success="testState === 'success' ? 'Username is valid and available!' : false" :warning="testState === 'warning' ? 'Username format is not recommended.' : false" :hint="testState === 'normal' ? 'Use 3-20 alphanumeric characters.' : ''" />

				<BaseSelect v-model="testForm.role" label="User Role" :options="options" :required="testState !== 'disabled'" :disabled="testState === 'disabled'" :error="testState === 'error' ? 'Role selection is required.' : false" :success="testState === 'success' ? 'Role has been successfully set.' : false" :warning="testState === 'warning' ? 'This role has restricted access.' : false" :hint="testState === 'normal' ? 'Select an account access level.' : ''" />

				<BaseDatePicker v-model="testForm.date" label="Activation Date" :required="testState !== 'disabled'" :disabled="testState === 'disabled'" :error="testState === 'error' ? 'Date cannot be in the past.' : false" :success="testState === 'success' ? 'Activation date confirmed.' : false" :warning="testState === 'warning' ? 'Date falls on a weekend.' : false" :hint="testState === 'normal' ? 'Choose when activation begins.' : ''" />
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<div>
					<h4 class="font-semibold text-sm text-foreground">Advanced Select Showcase</h4>
					<p class="text-xs text-muted-foreground">Searchable, Multi-select, Creatable, Dependent, Async/API, Custom template</p>
				</div>
			</div>
			<div class="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				<BaseSelect v-model="selectedFramework" label="Custom Option & Searchable" :options="frameworkOptions" searchable clearable hint="Custom display with icons and description metadata">
					<template #option="{ option }">
						<span class="text-base mr-1">{{ option.icon }}</span>
						<div class="flex flex-col">
							<span class="font-medium text-xs">{{ option.label }}</span>
							<span class="text-[10px] text-muted-foreground">{{ option.desc }}</span>
						</div>
					</template>
					<template #selected-item="{ item }">
						<div class="flex items-center gap-1.5">
							<span>{{ item.icon }}</span>
							<span class="font-semibold text-foreground text-xs">{{ item.label }}</span>
						</div>
					</template>
				</BaseSelect>

				<BaseSelect v-model="multiTags" label="Multi-Select + Creatable" :options="tagOptions" multiple searchable creatable clearable selectAll hint="Select multiple, select all, or type a new option then Enter" />

				<BaseSelect v-model="asyncUser" label="Async / Debounce Search" :loadOptions="loadUsersApi" :debounce="400" searchable clearable placeholder="Search users via API..." hint="Async search with debounced requests and loader">
					<template #option="{ option }">
						<div class="flex flex-col">
							<span class="font-medium text-xs">{{ option.label }}</span>
							<span class="text-[10px] text-muted-foreground">{{ option.email }}</span>
						</div>
					</template>
				</BaseSelect>

				<BaseSelect v-model="selectedProvince" label="Dependent: Region" :options="provinces" clearable placeholder="Select region..." @change="onProvinceChange" />

				<BaseSelect v-model="selectedCity" label="Dependent: City" :options="currentCities" :disabled="!selectedProvince" clearable placeholder="Select city..." :hint="!selectedProvince ? 'Please select a region first' : ''" />
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<div>
					<h4 class="font-semibold text-sm text-foreground">Advanced File Upload Showcase</h4>
					<p class="text-xs text-muted-foreground">Drag & drop, multi-file, preview, progress, image compression, chunks & validation</p>
				</div>
			</div>
			<div class="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<BaseFileUpload v-model="uploadedDocs" label="Multiple Documents" multiple :maxFiles="5" :maxSize="15 * 1024 * 1024" hint="Drag & drop PDF, ZIP, or Docs (max 15MB each, up to 5 files)" />

				<BaseFileUpload v-model="uploadedImages" label="Image Upload + Client Compression" multiple accept="image/*" compressImages :maxWidth="1200" :maxHeight="1200" :quality="0.75" hint="Images auto-resized to max 1200px & compressed before upload" />

				<BaseFileUpload v-model="chunkedFiles" label="Chunked / Resumable Large File" chunked :chunkSize="512 * 1024" :maxSize="100 * 1024 * 1024" hint="Simulates resumable chunk uploads (512KB chunks, pause & retry)" />
			</div>
		</div>

		<form @submit.prevent class="card card-body flex flex-col gap-6">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				<BaseInput v-model="form.text" label="Text" placeholder="Full Name" />
				<BaseInput v-model="form.password" type="password" label="Password" placeholder="Password" />
				<BaseInput v-model="form.email" type="email" label="Email" placeholder="name@email.com" />
				<BaseInput v-model="form.number" type="number" label="Number" placeholder="Age" />
				<BaseInput v-model="form.tel" type="tel" label="Tel" placeholder="+1234567890" />
				<BaseInput v-model="form.url" type="url" label="URL" placeholder="https://example.com" />
				<BaseInput v-model="form.search" type="search" label="Search" placeholder="Keywords" />

				<BaseSelect v-model="form.select" label="Select" :options="options" />

				<BaseDatePicker v-model="form.date" type="date" label="Date" />
				<BaseDatePicker v-model="form.time" type="time" label="Time" />
				<BaseDatePicker v-model="form.datetime" type="datetime-local" label="Datetime-Local" />
				<BaseDatePicker v-model="form.month" type="month" label="Month" />
				<BaseDatePicker v-model="form.week" type="week" label="Week" />

				<div>
					<label class="form-label">Toggle</label>
					<div class="flex items-center gap-5 mt-2">
						<BaseToggle v-model="form.notifications" label="Notifications" />
						<BaseToggle v-model="form.autoSave" label="Auto Save" />
					</div>
				</div>

				<BaseRange v-model="form.range" label="Range (0–100)" />

				<div>
					<label class="form-label">Checkbox</label>
					<div class="flex items-center gap-5 mt-2">
						<BaseCheckbox v-model="form.agree" label="Agree" />
						<BaseCheckbox v-model="form.subscribed" label="Subscribe" />
					</div>
				</div>

				<div>
					<label class="form-label">Radio</label>
					<div class="flex items-center gap-5 mt-2">
						<BaseRadio v-model="form.gender" value="l" name="gender" label="Male" />
						<BaseRadio v-model="form.gender" value="p" name="gender" label="Female" />
					</div>
				</div>

				<div class="md:col-span-2 lg:col-span-3">
					<label class="form-label">File</label>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<BaseFileInput />
						<BaseFileInput dropzone />
					</div>
				</div>
			</div>

			<input type="hidden" name="token" value="secret_csrf_12345" />

			<div class="pt-6 border-t border-border flex flex-wrap items-center gap-3">
				<input type="submit" value="Submit" class="btn btn-primary" />

				<input type="reset" value="Reset" class="btn btn-secondary" />

				<input type="button" value="Click" class="btn btn-outline" />

				<input type="image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40' viewBox='0 0 100 40'%3E%3Crect width='100' height='40' rx='10' fill='%230f172a'/%3E%3Ctext x='50' y='24' fill='white' font-size='12' font-family='sans-serif' font-weight='600' text-anchor='middle'%3EImage%3C/text%3E%3C/svg%3E" alt="Submit Image" class="h-[42px] cursor-pointer rounded-xl hover:opacity-90 transition" />
			</div>
		</form>
	</div>
</template>
