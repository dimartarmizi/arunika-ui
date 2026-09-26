<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../components/form/BaseInput.vue'
import BaseAlert from '../components/ui/BaseAlert.vue'
import { IconBuildingStore, IconMail, IconArrowLeft } from '@tabler/icons-vue'

const router = useRouter()
const email = ref('')
const isSubmitted = ref(false)

const handleForgotPassword = () => {
	isSubmitted.value = true
}
</script>

<template>
	<div class="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-background">
		<div class="w-full max-w-md card-elevated p-6 sm:p-8">
			<div class="text-center mb-8">
				<div class="icon-box icon-box-lg icon-box-primary mx-auto mb-3 shadow-md shadow-primary/20">
					<IconBuildingStore :size="28" stroke-width="2" />
				</div>
				<h1 class="text-2xl font-bold tracking-tight text-foreground">Forgot Password</h1>
				<p class="text-sm text-muted-foreground mt-1">Enter your email and we'll send you a recovery link</p>
			</div>

			<BaseAlert v-if="isSubmitted" variant="success" class="mb-4">
				Reset link has been sent to your email. Please check your inbox.
			</BaseAlert>

			<form @submit.prevent="handleForgotPassword" class="flex flex-col gap-4">
				<BaseInput v-model="email" type="email" label="Email Address" required placeholder="name@company.com">
					<template #prefix>
						<IconMail :size="18" />
					</template>
				</BaseInput>

				<button type="submit" class="btn btn-primary btn-lg w-full">
					Send Reset Link
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
