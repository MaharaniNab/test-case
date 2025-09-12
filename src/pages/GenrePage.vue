<template>
  <div class="py-2">
    <BackButton />

    <h1 class="text-xl font-bold mt-4 mb-6">
      🎮 Games in <span class="text-indigo-600">{{ route.params.slug }}</span>
    </h1>

    <!-- Loader -->
    <div v-if="store.loading" class="text-center text-gray-500 dark:text-gray-400">
      Loading games...
    </div>

    <!-- Games Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <GameCard
        v-for="game in store.games"
        :key="game.id"
        :game="game"
        @favorite="store.addFavorite"
      />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8 space-x-3">
      <button
        class="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg disabled:opacity-50 transition"
        :disabled="store.page <= 1"
        @click="store.fetchGames(store.page - 1)"
      >
        ⬅ Prev
      </button>
      <span class="px-3 py-2 text-gray-700 dark:text-gray-300">
        Page {{ store.page }} / {{ store.totalPages }}
      </span>
      <button
        class="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg disabled:opacity-50 transition"
        :disabled="store.page >= store.totalPages"
        @click="store.fetchGames(store.page + 1)"
      >
        Next ➡
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { useGameStore } from "../store/gameStore"
import GameCard from "../components/GameCard.vue"
import BackButton from "../components/BackButton.vue"

const route = useRoute()
const store = useGameStore()

async function loadGames() {
  store.selectedGenre = route.params.slug as string
  await store.fetchGames(1)
}

onMounted(() => {
  loadGames()
})

watch(
  () => route.params.slug,
  () => loadGames()
)
</script>
