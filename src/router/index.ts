import { createRouter, createWebHistory } from 'vue-router'
import GameList from '../pages/GameList.vue'
import GameDetail from '../pages/GameDetail.vue'
import Favorites from '../pages/Favorites.vue'
import GenrePage from '../pages/GenrePage.vue'

const routes = [
  { path: '/', name: 'Home', component: GameList },
  { path: '/game/:id', name: 'GameDetail', component: GameDetail, props: true },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/genre/:slug', name: 'GenrePage', component: GenrePage, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
