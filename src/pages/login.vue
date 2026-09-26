<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
	IconBuildingStore,
	IconMail,
	IconLock,
	IconEye,
	IconEyeOff
} from '@tabler/icons-vue'
import BaseInput from '../components/form/BaseInput.vue'
import BaseCheckbox from '../components/form/BaseCheckbox.vue'

const router = useRouter()
const showPassword = ref(false)
const loginForm = ref({ email: '', password: '', remember: false })

const handleLogin = () => {
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
				<p class="text-sm text-muted-foreground mt-1">Sign in to administrative dashboard</p>
			</div>

			<form @submit.prevent="handleLogin" class="flex flex-col gap-4">
				<BaseInput v-model="loginForm.email" type="email" label="Email" required placeholder="name@company.com">
					<template #prefix>
						<IconMail :size="18" />
					</template>
				</BaseInput>

				<div>
					<div class="flex items-center justify-between mb-2">
						<span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</span>
						<router-link to="/forgot-password" class="text-xs font-medium text-primary hover:opacity-80">Forgot password?</router-link>
					</div>
					<BaseInput v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••">
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
				</div>

				<div class="flex items-center justify-between pt-1">
					<BaseCheckbox v-model="loginForm.remember" label="Remember me" />
				</div>

				<button type="submit" class="btn btn-primary btn-lg w-full">
					Sign In Now
				</button>

				<p class="text-center text-xs text-muted-foreground">
					Don't have an account?
					<router-link to="/register" class="font-semibold text-primary hover:opacity-80 ml-1">
						Sign up here
					</router-link>
				</p>
			</form>
		</div>
	</div>
</template>
