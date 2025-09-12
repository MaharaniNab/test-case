import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // biar bisa diakses via IP LAN
    port: 5173, // default Vite
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: '/', // kalau deploy ke subfolder ubah misalnya '/gameverse/'
})
