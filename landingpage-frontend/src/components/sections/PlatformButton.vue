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
  padding: 0.5rem 1.5rem;
  border: 1px solid #555555; /* hitam tipis */
  border-radius: 9999px; /* pill style */
  background-color: #fff;
  color: #000;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.platform-button:hover {
  background-color: #e8f7f2;
  border-color: #1abc9c;
}
.platform-button:focus-visible {
  outline: 3px solid #1abc9c;
}
.platform-button.active {
  background-color: #1abc9c; /* tosca hijau */
  color: #fff;
  border-color: #555555;
}
</style>
