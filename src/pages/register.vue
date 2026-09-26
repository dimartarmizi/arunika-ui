<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
	IconBuildingStore,
	IconUser,
	IconMail,
	IconLock,
	IconEye,
	IconEyeOff
} from '@tabler/icons-vue'
import BaseInput from '../components/form/BaseInput.vue'
import BaseCheckbox from '../components/form/BaseCheckbox.vue'

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registerForm = ref({ name: '', email: '', password: '', confirmPassword: '', agree: false })

const handleRegister = () => {
	router.push('/')
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-background">
		<div class="w-full max-w-md card-elevated p-6 sm:p-8">
			<div class="text-center mb-8">
				<div class="icon-box icon-box-lg icon-box-primary mx-auto mb-3 shadow-md shadow-primary/20">
					<IconBuildingStore :size="28" stroke-width="2" />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">Arunika</h1>
				<p class="text-sm text-muted-foreground mt-1">Create a new admin account</p>
			</div>

			<form @submit.prevent="handleRegister" class="flex flex-col gap-4">
				<BaseInput v-model="registerForm.name" type="text" label="Full Name" required placeholder="Administrator">
					<template #prefix>
						<IconUser :size="18" />
					</template>
				</BaseInput>

				<BaseInput v-model="registerForm.email" type="email" label="Email" required placeholder="name@company.com">
					<template #prefix>
						<IconMail :size="18" />
					</template>
				</BaseInput>

				<BaseInput v-model="registerForm.password" :type="showPassword ? 'text' : 'password'" label="Password" required placeholder="At least 8 characters">
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

				<BaseInput v-model="registerForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" label="Confirm Password" required placeholder="Repeat password">
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

				<div class="pt-1">
					<BaseCheckbox v-model="registerForm.agree" label="I agree to the Terms of Service & Privacy Policy" required />
				</div>

				<button type="submit" class="btn btn-primary btn-lg w-full">
					Create Account
				</button>

				<p class="text-center text-xs text-muted-foreground">
					Already have an account?
					<router-link to="/login" class="font-semibold text-primary hover:opacity-80 ml-1">
						Sign in here
					</router-link>
				</p>
			</form>
		</div>
	</div>
</template>
