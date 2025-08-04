<template>
  <section class="portfolio">
    <h2 class="portfolio-title">{{ title }}</h2>
    <div class="portfolio-slider">
      <div ref="track" class="portfolio-track">
        <div
          v-for="(logo, index) in duplicatedLogos"
          :key="index"
          class="portfolio-logo"
          :class="{ 'is-hovered': hoveredIndex === index }"
        >
          <img :src="logo.url" :alt="logo.name || 'Logo'" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "SIUJI Telah Dipercaya oleh Institusi Pendidikan di Seluruh Indonesia",
  },
  logos: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// Gandakan sekali saja untuk loop (tidak berlebihan)
const duplicatedLogos = computed(() => {
  const minCount = 12;
  const repeated = [];
  while (repeated.length < minCount) repeated.push(...props.logos);
  return [...repeated, ...repeated];
});

const track = ref(null);
const hoveredIndex = ref(-1);
const mouseX = ref(0);
const mouseY = ref(0);
const isMouseOver = ref(false);

onMounted(() => {
  let pos = 0;
  let animationId;

  const animate = () => {
    if (!track.value) return;

    pos -= 1;
    // Reset posisi saat melewati setengah track
    if (Math.abs(pos) >= track.value.scrollWidth / 2) {
      pos = 0;
    }
    track.value.style.transform = `translateX(${pos}px)`;

    // Update hover state berdasarkan posisi mouse
    if (isMouseOver.value) {
      updateHoverState();
    }

    animationId = requestAnimationFrame(animate);
  };

  const updateHoverState = () => {
    if (!track.value || !isMouseOver.value) {
      hoveredIndex.value = -1;
      return;
    }

    const trackRect = track.value.getBoundingClientRect();
    const logos = track.value.querySelectorAll(".portfolio-logo");
    let newHoveredIndex = -1;

    logos.forEach((logo, index) => {
      const logoRect = logo.getBoundingClientRect();
      if (
        mouseX.value >= logoRect.left &&
        mouseX.value <= logoRect.right &&
        mouseY.value >= logoRect.top &&
        mouseY.value <= logoRect.bottom
      ) {
        newHoveredIndex = index;
      }
    });

    hoveredIndex.value = newHoveredIndex;
  };

  const handleMouseMove = (e) => {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
    updateHoverState();
  };

  const handleMouseEnter = () => {
    isMouseOver.value = true;
  };

  const handleMouseLeave = () => {
    isMouseOver.value = false;
    hoveredIndex.value = -1;
  };

  if (track.value) {
    track.value.addEventListener("mousemove", handleMouseMove);
    track.value.addEventListener("mouseenter", handleMouseEnter);
    track.value.addEventListener("mouseleave", handleMouseLeave);
  }

  animationId = requestAnimationFrame(animate);

  // Cleanup on unmount
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (track.value) {
      track.value.removeEventListener("mousemove", handleMouseMove);
      track.value.removeEventListener("mouseenter", handleMouseEnter);
      track.value.removeEventListener("mouseleave", handleMouseLeave);
    }
  };
});
</script>

<style scoped>
.portfolio {
  text-align: center;
  padding: 4rem 2rem;
  background: #f6fdfc;
}

.portfolio-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #222;
}

.portfolio-slider {
  overflow: hidden;
  width: 100%;
  position: relative;
  height: 172px;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.portfolio-track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.portfolio-track:hover {
  cursor: pointer;
}

.portfolio-logo {
  flex: 0 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.portfolio-logo img {
  height: 72px;
  width: auto;
  object-fit: contain;
  opacity: 0.8;
  filter: grayscale(100%);
  transition: transform 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
  margin-top: 50px;
  margin-bottom: 50px;
  pointer-events: auto;
}

.portfolio-logo:hover img,
.portfolio-logo.is-hovered img {
  transform: scale(1.1);
  filter: grayscale(0%);
  opacity: 1;
}
</style>
