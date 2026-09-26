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
					<p class="text-xs text-muted-foreground">Klik tombol state untuk menguji respon visual input secara langsung.</p>
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
				<BaseInput v-model="testForm.username" label="Username / Email" placeholder="Enter username" :required="testState !== 'disabled'" :disabled="testState === 'disabled'" :error="testState === 'error' ? 'Username tidak valid atau sudah digunakan.' : false" :success="testState === 'success' ? 'Username valid dan siap digunakan!' : false" :warning="testState === 'warning' ? 'Format username kurang direkomendasikan.' : false" :hint="testState === 'normal' ? 'Gunakan 3-20 karakter alfanumerik.' : ''" />

				<BaseSelect v-model="testForm.role" label="User Role" :options="options" :required="testState !== 'disabled'" :disabled="testState === 'disabled'" :error="testState === 'error' ? 'Role wajib dipilih.' : false" :success="testState === 'success' ? 'Role telah berhasil ditentukan.' : false" :warning="testState === 'warning' ? 'Role ini memiliki batasan akses tertentu.' : false" :hint="testState === 'normal' ? 'Pilih tingkat hak akses akun.' : ''" />

				<BaseDatePicker v-model="testForm.date" label="Activation Date" :required="testState !== 'disabled'" :disabled="testState === 'disabled'" :error="testState === 'error' ? 'Tanggal tidak boleh di masa lampau.' : false" :success="testState === 'success' ? 'Tanggal aktivasi terkonfirmasi.' : false" :warning="testState === 'warning' ? 'Tanggal jatuh pada akhir pekan.' : false" :hint="testState === 'normal' ? 'Pilih tanggal mulai aktif.' : ''" />
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
