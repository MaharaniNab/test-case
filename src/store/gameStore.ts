import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = import.meta.env.VITE_RAWG_BASE_URL

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    games: [] as any[],
    favorites: [] as any[],
    gameDetail: null as any | null,
    genres: [] as any[],
    selectedGenre: '' as string,
    loading: false,
    error: '' as string, // ✅ error state
    page: 1,
    totalPages: 1,
    searchQuery: ''
  }),
  actions: {
    async fetchGames(page = 1, pageSize = 12) {
      this.loading = true
      this.error = ''
      try {
        let url = `${BASE_URL}/games?page=${page}&page_size=${pageSize}&key=${API_KEY}`

        if (this.searchQuery) url += `&search=${this.searchQuery}`
        if (this.selectedGenre) url += `&genres=${this.selectedGenre}`

        const res = await axios.get(url)
        this.games = res.data.results
        this.totalPages = Math.ceil(res.data.count / pageSize)
        this.page = page
      } catch (err: any) {
        console.error('Fetch games error:', err)
        this.error = 'Failed to load games. Please try again later.'
        this.games = []
      } finally {
        this.loading = false
      }
    },

    async fetchGameDetail(id: string) {
      this.loading = true
      this.error = ''
      try {
        const res = await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`)
        this.gameDetail = res.data
      } catch (err: any) {
        console.error('Fetch game detail error:', err)
        this.error = 'Failed to load game detail.'
        this.gameDetail = null
      } finally {
        this.loading = false
      }
    },

    async fetchGenres() {
      this.error = ''
      try {
        const res = await axios.get(`${BASE_URL}/genres?key=${API_KEY}`)
        this.genres = res.data.results
      } catch (err: any) {
        console.error('Fetch genres error:', err)
        this.error = 'Failed to load genres.'
        this.genres = []
      }
    },

    addFavorite(game: any) {
      if (!this.favorites.find(g => g.id === game.id)) {
        this.favorites.push(game)
        localStorage.setItem("favorites", JSON.stringify(this.favorites))
      }
    },
    removeFavorite(id: number) {
      this.favorites = this.favorites.filter(g => g.id !== id)
      localStorage.setItem("favorites", JSON.stringify(this.favorites))
    },
    loadFavorites() {
      const fav = localStorage.getItem("favorites")
      if (fav) this.favorites = JSON.parse(fav)
    }
  }
})
