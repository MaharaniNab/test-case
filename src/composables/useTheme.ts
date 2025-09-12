import { ref, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  onMounted(() => {
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      isDark.value = true
    }
  })

function toggleTheme() {
  isDark.value = !isDark.value
  console.log('Theme toggle:', isDark.value)

  if (isDark.value) {
    document.documentElement.classList.add('dark')
    console.log('Added class dark')
  } else {
    document.documentElement.classList.remove('dark')
    console.log('Removed class dark')
  }
}


  return { isDark, toggleTheme }
}
