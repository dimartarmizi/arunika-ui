<script setup>
import { ref } from 'vue'
import BaseTabs from '../components/ui/BaseTabs.vue'
import {
	IconUser,
	IconSettings,
	IconBell,
	IconShield,
	IconCreditCard,
	IconActivity,
	IconCode
} from '@tabler/icons-vue'

const activeUnderlineTab = ref('account')
const underlineTabs = [
	{ id: 'account', label: 'My Account', icon: IconUser },
	{ id: 'security', label: 'Security', icon: IconShield },
	{ id: 'billing', label: 'Billing & Plans', icon: IconCreditCard, badge: 'Pro' },
	{ id: 'notifications', label: 'Notifications', icon: IconBell, badge: 3 }
]

const activePillTab = ref('overview')
const pillTabs = [
	{ id: 'overview', label: 'Overview', icon: IconActivity },
	{ id: 'api', label: 'API Keys', icon: IconCode },
	{ id: 'settings', label: 'Settings', icon: IconSettings }
]

const activeBoxedTab = ref('general')
const boxedTabs = ['general', 'team', 'integrations']
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-foreground">Tabs</h3>
			<p class="text-xs sm:text-sm text-muted-foreground">Navigation tabs with underline, pill, and boxed styling variations.</p>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Bordered Underline Tabs (BaseTabs)</h4>
			</div>
			<div class="card-body">
				<BaseTabs v-model="activeUnderlineTab" :tabs="underlineTabs" variant="bordered">
					<div v-if="activeUnderlineTab === 'account'" class="p-4 bg-background rounded-xl border border-border text-sm text-muted-foreground">
						<h5 class="font-bold text-foreground mb-1">Account Information</h5>
						<p>Manage your account personal details, email addresses, and preferred display name.</p>
					</div>

					<div v-else-if="activeUnderlineTab === 'security'" class="p-4 bg-background rounded-xl border border-border text-sm text-muted-foreground">
						<h5 class="font-bold text-foreground mb-1">Security & Authentication</h5>
						<p>Enable two-factor authentication, view active login sessions, and change your password.</p>
					</div>

					<div v-else-if="activeUnderlineTab === 'billing'" class="p-4 bg-background rounded-xl border border-border text-sm text-muted-foreground">
						<h5 class="font-bold text-foreground mb-1">Subscription & Invoices</h5>
						<p>You are currently subscribed to the Pro plan ($29/mo). Your next billing date is Oct 1, 2026.</p>
					</div>

					<div v-else-if="activeUnderlineTab === 'notifications'" class="p-4 bg-background rounded-xl border border-border text-sm text-muted-foreground">
						<h5 class="font-bold text-foreground mb-1">Notification Preferences</h5>
						<p>You have 3 unread alerts. Configure your email digests and push notification settings.</p>
					</div>
				</BaseTabs>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Pills / Segmented Tabs</h4>
			</div>
			<div class="card-body">
				<BaseTabs v-model="activePillTab" :tabs="pillTabs" variant="pills">
					<div class="p-4 rounded-xl border border-border text-sm text-muted-foreground">
						<span class="font-semibold text-foreground capitalize">{{ activePillTab }}</span> tab content loaded dynamically.
					</div>
				</BaseTabs>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-foreground">Boxed Tabs</h4>
			</div>
			<div class="card-body">
				<BaseTabs v-model="activeBoxedTab" :tabs="boxedTabs" variant="boxed">
					<div class="p-4 rounded-xl bg-background text-sm text-muted-foreground">
						Active section: <span class="font-semibold text-foreground capitalize">{{ activeBoxedTab }}</span>
					</div>
				</BaseTabs>
			</div>
		</div>
	</div>
</template>
