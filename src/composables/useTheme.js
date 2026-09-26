import { ref } from 'vue'

const isDark = ref(false)

if (typeof window !== 'undefined') {
	const saved = localStorage.getItem('theme')
	if (saved === 'dark') {
		isDark.value = true
		document.documentElement.classList.add('dark')
	} else {
		isDark.value = false
		document.documentElement.classList.remove('dark')
	}
}

export function useTheme() {
	const toggleTheme = () => {
		isDark.value = !isDark.value
		if (isDark.value) {
			document.documentElement.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		} else {
			document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', 'light')
		}
	}

	return {
		isDark,
		toggleTheme
	}
}
