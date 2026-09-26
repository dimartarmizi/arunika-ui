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
	<div class="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-background">
		<div class="w-full max-w-md card-elevated p-6 sm:p-8">
			<div class="text-center mb-8">
				<div class="icon-box icon-box-lg icon-box-primary mx-auto mb-3 shadow-md shadow-primary/20">
					<IconBuildingStore :size="28" stroke-width="2" />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">Reset Password</h1>
				<p class="text-sm text-muted-foreground mt-1">Create a new secure password for your account</p>
			</div>

			<BaseAlert v-if="isSuccess" variant="success" class="mb-4">
				Password updated successfully! Redirecting to login...
			</BaseAlert>

			<BaseAlert v-if="errorMessage" variant="error" class="mb-4">
				{{ errorMessage }}
			</BaseAlert>

			<form @submit.prevent="handleResetPassword" class="flex flex-col gap-4">
				<BaseInput v-model="password" :type="showPassword ? 'text' : 'password'" label="New Password" required placeholder="Minimum 8 characters">
					<template #prefix>
						<IconLock :size="18" />
					</template>
					<template #suffix>
						<button type="button" @click="showPassword = !showPassword" class="flex items-center text-muted-foreground hover:text-muted-foreground cursor-pointer">
							<IconEyeOff v-if="showPassword" :size="18" />
							<IconEye v-else :size="18" />
						</button>
					</template>
				</BaseInput>

				<BaseInput v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" label="Confirm New Password" required placeholder="Repeat your new password">
					<template #prefix>
						<IconLock :size="18" />
					</template>
					<template #suffix>
						<button type="button" @click="showConfirmPassword = !showConfirmPassword" class="flex items-center text-muted-foreground hover:text-muted-foreground cursor-pointer">
							<IconEyeOff v-if="showConfirmPassword" :size="18" />
							<IconEye v-else :size="18" />
						</button>
					</template>
				</BaseInput>

				<button type="submit" class="btn btn-primary btn-lg w-full">
					Reset Password
				</button>

				<div class="flex items-center justify-center gap-1.5">
					<router-link to="/login" class="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition">
						<IconArrowLeft :size="14" />
						<span>Back to Sign In</span>
					</router-link>
				</div>
			</form>
		</div>
	</div>
</template>
