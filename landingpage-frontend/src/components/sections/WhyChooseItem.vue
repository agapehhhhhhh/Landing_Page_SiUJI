<template>
  <div class="feature-item" :class="{ active }">
    <span class="emoji">{{ emoji }}</span>
    <h3 class="title">{{ title }}</h3>
    <p class="description">{{ description }}</p>
  </div>
</template>


<script setup lang="ts">
defineProps<{
  emoji: string
  title: string
  description: string
  active?: boolean
}>()
</script>

<style scoped>
.feature-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 0.5rem 1rem;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;
}

/* hover & active */
.feature-item:hover {
  background-color: #f0faf5;
}
.feature-item.active {
  background-color: #4CC5BD;
  color: white;
}
.feature-item.active .emoji {
  background-color: white;
  color: #4CC5BD;
}
.feature-item.active .title,
.feature-item.active .description {
  color: white;
}

/* layout spesifik */
.emoji {
  grid-row: 1;
  grid-column: 1;
  font-size: 1.4rem;
  background-color: #f0f8ff;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.title {
  grid-row: 1;
  grid-column: 2;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.description {
  grid-row: 2;
  grid-column: 1 / span 2; /* lebar penuh, mulai dari icon */
  margin: 0;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  padding-left: 5px;
}

</style>
