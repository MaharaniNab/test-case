<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-bold mb-10 text-center text-gray-800 dark:text-white">
          Explore Games
    </h1>

    <div class="max-w-7xl mx-auto px-4">
      <!-- Error state -->
      <div
        v-if="store.error"
        class="mb-6 p-4 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900 dark:text-red-200 dark:border-red-700"
      >
        ⚠️ {{ store.error }}
      </div>

      <!-- Loading state -->
      <div v-if="store.loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>

      <!-- Games grid -->
      <div v-else>
        <div
          v-if="store.games.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <GameCard
            v-for="game in store.games"
            :key="game.id"
            :game="game"
            @favorite="toggleFav"
            class="transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="flex flex-col items-center justify-center text-center py-20 text-gray-600 dark:text-gray-400"
        >
          <div class="text-6xl mb-4">🎮</div>
          <h2 class="text-xl font-semibold mb-2">No games found</h2>
          <p class="text-sm">Try adjusting your search or filters.</p>
        </div>
      </div>


      <!-- Pagination -->
      <div
        v-if="!store.loading && !store.error"
        class="flex justify-center items-center mt-12 space-x-4"
      >
        <button
          class="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 transition"
          :disabled="store.page <= 1"
          @click="store.fetchGames(store.page - 1)"
        >
          ⬅ Prev
        </button>
        <span class="text-gray-700 dark:text-gray-300 font-medium">
          Page {{ store.page }} / {{ store.totalPages }}
        </span>
        <button
          class="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 transition"
          :disabled="store.page >= store.totalPages"
          @click="store.fetchGames(store.page + 1)"
        >
          Next ➡
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import GameCard from '../components/GameCard.vue'
import { useGameStore } from '../store/gameStore'

const store = useGameStore()

onMounted(() => {
  store.fetchGames()
})

function toggleFav(game: any) {
  if (store.favorites.some((g) => g.id === game.id)) store.removeFavorite(game.id)
  else store.addFavorite(game)
}
</script>

<style scoped>
.game-card {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg;
}
</style>
