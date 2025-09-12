<template>
  <div class="py-2">
    <BackButton />

    <h1 class="text-xl font-bold mt-4 mb-6">Favorites</h1>
    <div v-if="!store.favorites.length" class="text-gray-500">No favorites yet.</div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <GameCard
        v-for="g in store.favorites"
        :key="g.id"
        :game="g"
        @favorite="toggleFav"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCard from '../components/GameCard.vue'
import BackButton from '../components/BackButton.vue'
import { useGameStore } from '../store/gameStore'

const store = useGameStore()
store.loadFavorites()

function toggleFav(game: any) {
  store.removeFavorite(game.id)
}
</script>
