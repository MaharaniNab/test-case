<template>
  <nav
    class="font-sans bg-white/80 dark:bg-gray-900/80 dark:text-white shadow-lg backdrop-blur-md sticky top-0 z-50 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
       <router-link
          to="/"
          class="text-3xl font-extrabold tracking-wide flex items-center gap-1"
        >
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)] hover:scale-110 transition-transform">
            Game
          </span>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-[0_0_6px_rgba(96,165,250,0.6)] hover:scale-110 transition-transform">
            Verse
          </span>
        </router-link>


        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-6 font-sans">
          <!-- Search -->
          <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <input
              v-model="search"
              @input="onSearchDebounced"
              type="text"
              placeholder="Search games..."
              class="px-4 py-2 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none w-64 font-sans"
            />
            <button
              @click="onSearch"
              class="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-r-full flex items-center gap-2 transition"
            >
              <span>🔍</span>
              <span class="hidden sm:inline">Search</span>
            </button>
          </div>

          <!-- Favorites -->
          <router-link
            to="/favorites"
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            ❤️ Favorites
            <span class="ml-1 text-sm font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
              {{ store.favorites.length }}
            </span>
          </router-link>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <span v-if="isDark">☀️</span>
            <span v-else>🌙</span>
          </button>
        </div>

        <!-- Mobile Button -->
        <button
          class="md:hidden p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition text-3xl font-bold text-gray-800 dark:text-gray-100"
          @click="menuOpen = !menuOpen"
        >
          ☰
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <transition name="slide-fade">
      <div
        v-if="menuOpen"
        class="md:hidden px-6 py-4 bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-lg space-y-4"
      >
        <!-- Search Mobile -->
        <div class="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
          <input
            v-model="search"
            @input="onSearchDebounced"
            placeholder="Search games..."
            class="w-full px-3 py-2 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none font-sans"
          />
          <button @click="onSearch" class="px-3">🔍</button>
        </div>

        <!-- Links -->
        <div class="flex flex-col space-y-3">
          <router-link
            to="/"
            @click="menuOpen=false"
            class="hover:text-indigo-500 transition"
          >
            🏠 Home
          </router-link>
          <router-link
            to="/favorites"
            @click="menuOpen=false"
            class="hover:text-indigo-500 transition flex items-center gap-2"
          >
            ❤️ Favorites ({{ store.favorites.length }})
          </router-link>
          <button
            @click="toggleTheme"
            class="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-left"
          >
            <span v-if="isDark">☀️ Light Mode</span>
            <span v-else>🌙 Dark Mode</span>
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../store/gameStore'
import { useTheme } from '../composables/useTheme'

const store = useGameStore()
const search = ref('')
const menuOpen = ref(false)
const router = useRouter()
const { isDark, toggleTheme } = useTheme()

function onSearch() {
  store.searchQuery = search.value
  menuOpen.value = false
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => store.fetchGames(1))
  } else {
    store.fetchGames(1)
  }
}

let timeout: number
function onSearchDebounced() {
  clearTimeout(timeout)
  timeout = window.setTimeout(() => {
    onSearch()
  }, 300)
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
