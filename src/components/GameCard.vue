<template>
  <div
    class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden group cursor-pointer transition transform hover:-translate-y-2 hover:shadow-2xl"
    @click="goToDetail"
  >
    <!-- Image -->
    <div class="relative w-full h-48 overflow-hidden">
      <img
        :src="game.background_image"
        alt=""
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      <!-- Favorite Button -->
      <button
        @click.stop="$emit('favorite', game)"
        class="absolute top-3 right-3 p-2 rounded-full shadow-md transition transform hover:scale-110"
        :class="isFav
          ? 'bg-white text-white'
          : 'bg-white/80 text-gray-700 dark:bg-gray-700/80 dark:text-gray-200'"
      >
        {{ isFav ? '❤️' : '🤍' }}
      </button>

      <!-- Genres on top of image -->
      <div class="absolute bottom-3 left-3 flex flex-wrap gap-2">
        <span
          v-for="genre in game.genres?.slice(0, 2)"
          :key="genre.id"
          class="text-xs px-2 py-1 rounded-full bg-indigo-500/80 text-white backdrop-blur-sm shadow-md"
        >
          {{ genre.name }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Title -->
      <h3 class="font-bold text-lg mb-1 truncate group-hover:text-indigo-500 transition-colors">
        {{ game.name }}
      </h3>

      <!-- Released -->
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Released: {{ game.released || 'N/A' }}
      </p>

      <!-- Details link -->
      <div class="flex items-center justify-between">
        <span class="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
          View Details →
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../store/gameStore'

const props = defineProps<{ game: any }>()
const store = useGameStore()
const router = useRouter()

const isFav = computed(() =>
  store.favorites.some((g) => g.id === props.game.id)
)

function goToDetail() {
  router.push(`/game/${props.game.id}`)
}
</script>
