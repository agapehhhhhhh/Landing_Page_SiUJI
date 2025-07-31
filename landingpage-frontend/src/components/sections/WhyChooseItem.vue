<template>
  <div class="feature-item" :class="{ active }">
    <div class="icon-container">
      <img v-if="iconUrl" :src="iconUrl" :alt="title" class="icon-image" />
      <span v-else class="emoji">{{ emoji }}</span>
    </div>
    <h3 class="title">{{ title }}</h3>
    <p class="description">{{ description }}</p>
  </div>
</template>


<script setup lang="ts">
defineProps<{
  emoji?: string
  iconUrl?: string
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
  gap: 0.8rem 1.5rem;
  align-items: center;
  padding: clamp(1.5rem, 2.5vw, 2rem);
  border-radius: 12px;
  background-color: #fff;
  transition: background-color 0.3s, transform 0.3s;
  font-size: clamp(1rem, 1.2vw, 1.3rem);
  border: 1px solid #4CC5BD;
}

/* hover & active */
.feature-item:hover {
  background-color: #f0faf5;
}
.feature-item.active {
  background-color: #4CC5BD;
  color: white;
}
.feature-item.active .icon-container {
  background-color: white;
}
.feature-item.active .emoji {
  color: #4CC5BD;
}
.feature-item.active .title,
.feature-item.active .description {
  color: white;
}

/* layout spesifik */
.icon-container {
  grid-row: 1;
  grid-column: 1;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background-color: #f0f8ff;
}

.emoji {
  font-size: 1.6rem;
}

.icon-image {
  width: 1.8rem;
  height: 1.8rem;
  object-fit: contain;
}

.feature-item.active .icon-container {
  background-color: white;
}

.feature-item.active .emoji {
  color: #4CC5BD;
}

.title {
  grid-row: 1;
  grid-column: 2;
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  font-weight: 600;
  margin: 0;
}

.description {
  grid-row: 2;
  grid-column: 1 / span 2; /* lebar penuh, mulai dari icon */
  margin: 0;
  font-size: clamp(1rem, 1.3vw, 1.25rem);
  color: #555;
  line-height: 1.6;
  padding-left: 8px;
}

</style>
