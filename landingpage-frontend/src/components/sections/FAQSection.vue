<template>
  <section class="py-20 px-6 bg-gray-50">
    <h2 class="text-2xl font-bold text-center mb-10">{{ content.title }}</h2>
    <div class="max-w-2xl mx-auto">
      <div v-for="(faq, index) in content.faqs" :key="index" class="mb-4">
        <button @click="toggle(index)" class="w-full text-left font-semibold text-blue-600">
          {{ faq.question }}
        </button>
        <div v-if="activeIndex === index" class="text-gray-600 mt-2">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ content: { title: string; faqs: { question: string; answer: string }[] } }>()

const activeIndex = ref<number | null>(null)
const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>
