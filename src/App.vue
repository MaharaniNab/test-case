<template>
  <div
    class="min-h-screen w-full overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans"
  >
    <NavBar />
    <main class="max-w-7xl mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/Navbar.vue"
</script>
