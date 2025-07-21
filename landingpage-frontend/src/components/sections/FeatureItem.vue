<template>
  <div class="feature-item">
    <div class="emoji-wrapper">
      <span class="emoji">{{ emoji }}</span>
    </div>
    <div class="text">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  emoji: string
  title: string
  description: string
}>()
</script>

<style scoped>
.feature-item {
  display: flex;
  gap: 1rem;
  align-items: baseline;
}

.emoji-wrapper {
  display: flex;
  align-items: center; /* center emoji secara vertikal terhadap .title */
  height: 1.5rem; /* sesuaikan agar tengah tepat dengan title */
  margin-top: 0.15rem; /* offset halus agar presisi */
}

.emoji {
  font-size: 1.3rem;
  display: inline-block;
  padding: 0.3rem;
  background-color: #f0f8ff;
  border-radius: 6px;
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 1.3rem;
}

.text {
  display: flex;
  flex-direction: column;
}
.title {
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
}
.description {
  margin: 0.2rem 0 0 0;
  color: #555;
}
</style>
