<script setup>
import BaseAccordion from '../components/ui/BaseAccordion.vue'
import {
	IconHelpCircle,
	IconCreditCard,
	IconShield,
	IconTruck,
	IconSettings,
	IconChevronDown
} from '@tabler/icons-vue'

const faqItems = [
	{
		id: 'faq-1',
		title: 'What is Arunika?',
		content: 'Arunika is a modern, lightweight admin template crafted with Vue 3, Vite, and Tailwind CSS v4. It provides clean semantic utilities and responsive layouts out of the box.'
	},
	{
		id: 'faq-2',
		title: 'How do I customize the theme colors?',
		content: 'You can easily adjust color tokens in Tailwind CSS theme configuration or update the global utility classes in src/style.css.'
	},
	{
		id: 'faq-3',
		title: 'Does it support dark mode?',
		content: 'Yes, full dark mode support can be toggled using Tailwind CSS class strategy or custom CSS variables.'
	}
]

const multipleItems = [
	{
		id: 'm-1',
		title: 'Account Settings',
		content: 'Manage your profile details, contact email, and password preferences.'
	},
	{
		id: 'm-2',
		title: 'Billing & Subscriptions',
		content: 'View past invoices, update payment methods, and manage plan tiers.'
	},
	{
		id: 'm-3',
		title: 'Security & Access Logs',
		content: 'Enable two-factor authentication, view active sessions, and configure IP whitelists.'
	}
]

const iconItems = [
	{
		id: 'icon-1',
		title: 'Payment Methods',
		icon: IconCreditCard,
		badge: 'Popular',
		badgeVariant: 'primary',
		content: 'We support Visa, MasterCard, PayPal, and automatic bank transfers across 40+ countries.'
	},
	{
		id: 'icon-2',
		title: 'Data Protection & Privacy',
		icon: IconShield,
		badge: 'Verified',
		badgeVariant: 'success',
		content: 'All personal data is encrypted in transit and at rest using industry-standard AES-256 protocols.'
	},
	{
		id: 'icon-3',
		title: 'Shipping & Delivery Policy',
		icon: IconTruck,
		badge: 'Updated',
		badgeVariant: 'warning',
		content: 'Standard shipping takes 3-5 business days. Express overnight delivery is available in selected metro areas.'
	},
	{
		id: 'icon-4',
		title: 'System Preferences',
		icon: IconSettings,
		content: 'Configure notification alerts, language localization, and workspace defaults.'
	}
]
</script>

<template>
	<div class="flex flex-col gap-6">
		<div>
			<h3 class="text-xl font-bold text-slate-900">Accordion</h3>
			<p class="text-xs sm:text-sm text-slate-500">Expandable collapse sections for FAQs, segmented settings, and collapsible content.</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="card">
				<div class="card-header">
					<h4 class="font-semibold text-sm text-slate-800">Basic (Single Expand)</h4>
				</div>
				<div class="card-body">
					<BaseAccordion :items="faqItems" />
				</div>
			</div>

			<div class="card">
				<div class="card-header">
					<h4 class="font-semibold text-sm text-slate-800">Multiple Expand (Always Open)</h4>
				</div>
				<div class="card-body">
					<BaseAccordion :items="multipleItems" :model-value="['m-1', 'm-2']" multiple />
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h4 class="font-semibold text-sm text-slate-800">Separated / Card Style with Icons & Badges</h4>
			</div>
			<div class="card-body">
				<BaseAccordion :items="iconItems" variant="separated" multiple />
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="card">
				<div class="card-header">
					<h4 class="font-semibold text-sm text-slate-800">Flush Variant (Border-free)</h4>
				</div>
				<div class="card-body">
					<BaseAccordion :items="faqItems" variant="flush" />
				</div>
			</div>

			<div class="card">
				<div class="card-header flex items-center justify-between">
					<h4 class="font-semibold text-sm text-slate-800">Native HTML5 &lt;details&gt; (Zero JS)</h4>
				</div>
				<div class="card-body">
					<div class="accordion">
						<details class="accordion-item" open>
							<summary class="accordion-header group">
								<div class="flex items-center gap-2">
									<IconHelpCircle :size="18" class="text-slate-500" />
									<span>Can I use pure HTML without Vue components?</span>
								</div>
								<IconChevronDown :size="18" class="accordion-icon text-slate-400 transition-transform duration-200" />
							</summary>
							<div class="accordion-body">
								Yes. The classes <code class="text-xs bg-slate-100 px-1 py-0.5 rounded text-blue-600">.accordion</code>, <code class="text-xs bg-slate-100 px-1 py-0.5 rounded text-blue-600">.accordion-header</code>, and <code class="text-xs bg-slate-100 px-1 py-0.5 rounded text-blue-600">.accordion-body</code> work natively on HTML5 <code class="text-xs">&lt;details&gt;</code> and <code class="text-xs">&lt;summary&gt;</code> elements with automatic chevron rotation.
							</div>
						</details>

						<details class="accordion-item">
							<summary class="accordion-header group">
								<div class="flex items-center gap-2">
									<IconHelpCircle :size="18" class="text-slate-500" />
									<span>Does it support browser keyboard navigation?</span>
								</div>
								<IconChevronDown :size="18" class="accordion-icon text-slate-400 transition-transform duration-200" />
							</summary>
							<div class="accordion-body">
								Native HTML5 details element natively supports Tab focus, Space, and Enter key toggling without extra event listeners.
							</div>
						</details>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
