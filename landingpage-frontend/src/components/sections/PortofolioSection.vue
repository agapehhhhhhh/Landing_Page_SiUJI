<template>
  <section class="py-20 px-6 bg-white text-center">
    <h2 class="text-2xl font-bold mb-8">{{ content.title }}</h2>
    <div class="flex flex-wrap justify-center gap-6">
      <img
        v-for="(logo, index) in content.logos"
        :key="index"
        :src="logo"
        class="h-16"
        alt="Partner Logo"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: { title: string; logos: string[] } }>()
</script>
