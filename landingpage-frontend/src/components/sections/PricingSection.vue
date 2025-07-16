<template>
  <section class="py-20 px-6 bg-white text-center">
    <h2 class="text-3xl font-bold mb-10">{{ content.title }}</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="(plan, index) in content.plans"
        :key="index"
        class="p-6 border rounded shadow"
      >
        <h3 class="text-xl font-bold mb-2">{{ plan.name }}</h3>
        <p class="text-gray-500 mb-4">{{ plan.description }}</p>
        <p class="text-2xl font-bold mb-6">{{ plan.price }}</p>
        <button class="bg-blue-600 text-white px-4 py-2 rounded">Pilih Paket</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: { title: string; plans: { name: string; description: string; price: string }[] } }>()
</script>
