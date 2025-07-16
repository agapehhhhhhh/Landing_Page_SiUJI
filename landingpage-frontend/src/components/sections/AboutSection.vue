<template>
  <section class="py-20 px-6 bg-white text-center">
    <h2 class="text-3xl font-bold">{{ content.title }}</h2>
    <p class="mt-4 text-gray-600">{{ content.description }}</p>
    <div class="mt-8 flex gap-4 overflow-x-auto">
      <img
        v-for="(image, index) in content.carousel"
        :key="index"
        :src="image"
        class="w-64 h-40 object-cover rounded-lg shadow"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: { title: string; description: string; carousel: string[] } }>()
</script>
