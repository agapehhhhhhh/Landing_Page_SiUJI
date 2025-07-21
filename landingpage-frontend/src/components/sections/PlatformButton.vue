<template>
  <button
    class="platform-button"
    :class="{ active: isActive }"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  isActive: boolean
}>()
</script>

<style scoped>
.platform-button {
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
}
.platform-button.active {
  background-color: #1abc9c;
  color: white;
  border-color: #1abc9c;
}
</style>
