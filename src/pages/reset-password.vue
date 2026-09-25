<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../components/form/BaseInput.vue'
import BaseAlert from '../components/ui/BaseAlert.vue'
import { IconBuildingStore, IconLock, IconEye, IconEyeOff, IconArrowLeft } from '@tabler/icons-vue'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const handleResetPassword = () => {
	if (password.value !== confirmPassword.value) {
		errorMessage.value = 'Passwords do not match.'
		return
	}
	errorMessage.value = ''
	isSuccess.value = true
	setTimeout(() => {
		router.push('/login')
	}, 1500)
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-100">
		<div class="w-full max-w-md card-elevated p-6 sm:p-8">
			<div class="text-center mb-8">
				<div class="icon-box icon-box-lg icon-box-primary mx-auto mb-3 shadow-md shadow-blue-500/20">
					<IconBuildingStore :size="28" stroke-width="2" />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-slate-900">Reset Password</h1>
				<p class="text-sm text-slate-500 mt-1">Create a new secure password for your account</p>
			</div>

			<BaseAlert v-if="isSuccess" variant="success" class="mb-4">
				Password updated successfully! Redirecting to login...
			</BaseAlert>

			<BaseAlert v-if="errorMessage" variant="error" class="mb-4">
				{{ errorMessage }}
			</BaseAlert>

			<form @submit.prevent="handleResetPassword" class="flex flex-col gap-4">
				<BaseInput
					v-model="password"
					:type="showPassword ? 'text' : 'password'"
					label="New Password"
					required
					placeholder="Minimum 8 characters"
				>
					<template #prefix>
						<IconLock :size="18" />
					</template>
					<template #suffix>
						<button type="button" @click="showPassword = !showPassword" class="flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
							<IconEyeOff v-if="showPassword" :size="18" />
							<IconEye v-else :size="18" />
						</button>
					</template>
				</BaseInput>

				<BaseInput
					v-model="confirmPassword"
					:type="showConfirmPassword ? 'text' : 'password'"
					label="Confirm New Password"
					required
					placeholder="Repeat your new password"
				>
					<template #prefix>
						<IconLock :size="18" />
					</template>
					<template #suffix>
						<button type="button" @click="showConfirmPassword = !showConfirmPassword" class="flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
							<IconEyeOff v-if="showConfirmPassword" :size="18" />
							<IconEye v-else :size="18" />
						</button>
					</template>
				</BaseInput>

				<button type="submit" class="btn btn-primary btn-lg w-full mt-2">
					Reset Password
				</button>

				<div class="flex items-center justify-center gap-1.5 mt-4">
					<router-link to="/login" class="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition">
						<IconArrowLeft :size="14" />
						<span>Back to Sign In</span>
					</router-link>
				</div>
			</form>
		</div>
	</div>
</template>
