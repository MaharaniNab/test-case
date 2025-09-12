<template>
  <button
    @click="$router.back()"
    class="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-900/80 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition"
  >
    ⬅ Back
  </button>
</template>

<script setup lang="ts"></script>