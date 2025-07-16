<template>
  <section class="py-20 px-6 bg-gray-50">
    <h2 class="text-3xl font-bold text-center mb-10">{{ content.title }}</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="(item, index) in content.items" :key="index" class="p-6 bg-white rounded shadow">
        <img :src="item.image" alt="" class="w-12 h-12 mb-4" />
        <h3 class="font-semibold">{{ item.title }}</h3>
        <p class="text-gray-600 text-sm mt-2">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: { title: string; items: { title: string; description: string; image: string }[] } }>()
</script>
