<template>
  <div>
    <div class="relative">
      <img
        :src="store.gameDetail?.background_image"
        class="w-full h-[360px] object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <h1
        class="absolute bottom-6 left-6 text-3xl sm:text-4xl font-bold text-white"
      >
        {{ store.gameDetail?.name }}
      </h1>

      <!-- Back button -->
      <BackButton class="absolute top-4 left-4" />
    </div>

    <div class="max-w-5xl mx-auto px-4 py-8">
      <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">
        Loading game details...
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-6">
        <div class="flex-1">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span class="font-semibold">Released:</span>
              {{ store.gameDetail?.released }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span class="font-semibold">Rating:</span>
              ⭐ {{ store.gameDetail?.rating }}
            </p>
            <h2 class="text-xl font-semibold mt-4 mb-3">About this game</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ store.gameDetail?.description_raw }}
            </p>

            <div class="mt-6">
              <button
                @click="toggleFavorite"
                :class="[
                  'px-5 py-2 rounded-lg font-semibold transition',
                  isFav
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                ]"
              >
                {{ isFav ? '★ Added to Favorites' : '☆ Add to Favorites' }}
              </button>
            </div>
          </div>
        </div>

        <aside class="w-full lg:w-80">
          <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h3 class="font-semibold mb-2">Genres</h3>
              <div class="flex flex-wrap gap-2">
                <router-link
                  v-for="g in store.gameDetail?.genres || []"
                  :key="g.id"
                  :to="`/genre/${g.slug}`"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-indigo-500 hover:text-white transition"
                >
                  {{ g.name }}
                </router-link>
              </div>
          </div>
        </aside>
      </div>

      <!-- Related games -->
      <div v-if="related.length" class="mt-8">
        <h3 class="text-xl font-semibold mb-4">You might also like</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <router-link
            v-for="g in related"
            :key="g.id"
            :to="`/game/${g.id}`"
            class="rounded overflow-hidden block group"
          >
            <img
              :src="g.background_image"
              class="w-full h-28 object-cover rounded-lg group-hover:scale-105 transition"
            />
            <div
              class="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-500"
            >
              {{ g.name }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '../store/gameStore'
import BackButton from '../components/BackButton.vue'

const route = useRoute()
const store = useGameStore()
const loading = ref(false)

async function loadGame(id: string) {
  loading.value = true
  await store.fetchGameDetail(id)
  if (!store.games.length) await store.fetchGames()
  store.loadFavorites()
  loading.value = false
}

onMounted(() => {
  loadGame(route.params.id as string)
})

// ✅ Watch biar update saat klik rekomendasi
watch(
  () => route.params.id,
  (newId) => {
    if (newId) loadGame(newId as string)
  }
)

const isFav = computed(() =>
  store.favorites.some((g) => g.id === store.gameDetail?.id)
)

function toggleFavorite() {
  if (!store.gameDetail) return
  if (isFav.value) store.removeFavorite(store.gameDetail.id)
  else store.addFavorite(store.gameDetail)
}

const related = computed(() => (store.games || []).slice(0, 8))
</script>
