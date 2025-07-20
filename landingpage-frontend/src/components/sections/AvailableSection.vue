<template>
  <section class="py-20 px-6 bg-white text-center">
    <h2 class="text-2xl font-bold mb-6">{{ content.title }}</h2>
    <div class="flex justify-center gap-10">
      <img
        v-for="(platform, index) in content.platforms"
        :key="index"
        :src="platform.logo"
        :alt="platform.name"
        class="w-20 h-20"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: { title: string; platforms: { name: string; logo: string }[] } }>()
</script>
