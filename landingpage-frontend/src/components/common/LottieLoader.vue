<template>
  <div ref="container" class="w-48 h-48 mx-auto" />
</template>

<script setup>
import lottie from 'lottie-web'
import { onMounted, ref } from 'vue'

const container = ref(null)

onMounted(() => {
  lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json' // kamu bisa ganti ke file lokal jika perlu
  })
})
</script>
