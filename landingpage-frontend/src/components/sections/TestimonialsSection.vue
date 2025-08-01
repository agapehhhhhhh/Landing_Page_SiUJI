<template>
  <section class="testimonial-section">
    <div class="testimonial-header">
      <h2>What They say</h2>
      <p>
        Skilline is one powerful online software suite that combines<br />
        all the tools needed to run a successful school or office.
      </p>
    </div>

    <!-- Tambahkan container untuk Swiper -->
    <div class="swiper-container">
      <!-- Loading state -->
      <div v-if="loading" class="loading-testimonials">
        <p>Loading testimonials...</p>
      </div>
      
      <!-- Testimonials swiper -->
      <Swiper
        v-else-if="reviews.length > 0"
        :slides-per-view="3"
        :space-between="0"
        :loop="reviews.length > 3"
        :autoplay="reviews.length > 1 ? { delay: 3000, disableOnInteraction: false } : false"
        :breakpoints="{
          0: { slidesPerView: 1 },
          601: { slidesPerView: Math.min(3, reviews.length) }
        }"
        @slideChange="onSlideChange"
        ref="swiperRef"
      >
        <SwiperSlide
          v-for="(review, index) in reviews"
          :key="review.id || index"
        >
          <div class="testimonial-card">
            <div class="reviewer-photo">
              <img 
                :src="review.avatar?.url || '@/assets/user.png'" 
                :alt="review.avatar?.alt || review.name"
                @error="handleImageError"
              />
            </div>
            <h3>{{ review.title }}</h3>
            <p class="testimonial-text">{{ review.content }}</p>
            <div class="testimonial-footer">
              <div class="testimonial-divider"></div>
              <p class="reviewer-name">{{ review.name }}</p>
              <p class="reviewer-job">{{ review.job }}<span v-if="review.school"> | {{ review.school }}</span></p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      
      <!-- No testimonials state -->
      <div v-else-if="!loading && reviews.length === 0" class="no-testimonials">
        <p>No testimonials available at the moment.</p>
      </div>
    </div>

    <!-- Custom Navigation -->
    <div v-if="!loading && reviews.length > 3" class="testimonial-nav">
      <button @click="slidePrev" class="nav-btn">
        Prev
      </button>
      <div class="nav-progress">
        <span
          v-for="(_, idx) in reviews"
          :key="idx"
          :class="['nav-dot', { active: idx === currentIndex }]"
          @click="goToSlide(idx)"
          style="cursor:pointer"
        ></span>
      </div>
      <button @click="slideNext" class="nav-btn">
        Next
      </button>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { fetchTestimonials } from '@/services/payloadService';

export default {
  name: "TestimonialSection",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      reviews: [],
      currentIndex: 0,
      loading: true,
    };
  },
  async mounted() {
    await this.loadTestimonials();
  },
  methods: {
    async loadTestimonials() {
      try {
        this.loading = true;
        const testimonials = await fetchTestimonials();
        this.reviews = testimonials || [];
        console.log('Loaded testimonials:', this.reviews.length, 'items');
      } catch (error) {
        console.error('Error loading testimonials:', error);
        this.reviews = [];
      } finally {
        this.loading = false;
      }
    },
    handleImageError(event) {
      // Fallback to default user icon if image fails to load
      event.target.src = new URL('@/assets/user.png', import.meta.url).href;
    },
    onSlideChange(swiper) {
      this.currentIndex = swiper.realIndex;
    },
    slidePrev() {
      if (this.$refs.swiperRef && this.$refs.swiperRef.$el && this.$refs.swiperRef.$el.swiper) {
        this.$refs.swiperRef.$el.swiper.slidePrev();
      }
    },
    slideNext() {
      if (this.$refs.swiperRef && this.$refs.swiperRef.$el && this.$refs.swiperRef.$el.swiper) {
        this.$refs.swiperRef.$el.swiper.slideNext();
      }
    },
    goToSlide(idx) {
      if (this.$refs.swiperRef && this.$refs.swiperRef.$el && this.$refs.swiperRef.$el.swiper) {
        // Use slideTo instead of slideToLoop if loop is disabled
        const swiper = this.$refs.swiperRef.$el.swiper;
        if (swiper.params.loop) {
          swiper.slideToLoop(idx);
        } else {
          swiper.slideTo(idx);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Loading state */
.loading-testimonials {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 18px;
  color: #666;
}

/* No testimonials state */
.no-testimonials {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 18px;
  color: #999;
  font-style: italic;
}

/* Pastikan card testimonial yang di-scale tidak terpotong */
.swiper-slide {
  overflow: visible;
}
/* Card testimonial tengah lebih besar dengan selector CSS sederhana */
/* Tambahkan CSS untuk container Swiper */
.swiper-container {
  max-width: clamp(1200px, 95vw, 1600px);
  margin: 0 auto;
  padding: 20px clamp(40px, 5vw, 80px); /* Tambahkan padding atas-bawah untuk card yang di-scale */
  overflow: hidden; /* Pastikan overflow visible */
  width: 100%;
  box-sizing: border-box;
}

/* Pastikan card testimonial yang di-scale tidak terpotong */
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  transition: transform 0.3s ease;
  cursor: grab;
}

/* Card testimonial tengah lebih besar dengan selector CSS sederhana */
/* Card tengah yang aktif */
.swiper-slide-next .testimonial-card {
  transform: scale(1.1);
  border: 1.5px solid #555;
  box-shadow: 0 6px 24px rgba(84, 190, 150, 0.25);
  z-index: 10;
  position: relative;
}

.testimonial-section {
  padding: 60px 0;
  background: radial-gradient(
    circle at center,
    rgba(107, 194, 161, 0.5) 0%,
    rgba(107, 194, 161, 0.3) 30%,
    rgba(255, 255, 255, 0.8) 50%,
    #ffffff 100%
  );
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  font-family: Inter;
  text-align: center;
  overflow: visible;
  min-height: calc(100vh - 80px);
  box-sizing: border-box;
}

.testimonial-header h2 {
  font-size: clamp(24px, 4vw, 42px);
  margin-bottom: 10px;
  color: #222;
}

.testimonial-header p {
  font-size: clamp(14px, 1.8vw, 18px);
  color: #555;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.testimonial-card {
  background-color: white;
  border-radius: 12px;
  border: 1px solid #555;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: clamp(300px, 28vw, 400px); /* sedikit diperbesar dari 24vw ke 28vw */
  padding: clamp(24px, 2.5vw, 32px);
  margin: 0 auto;
  box-sizing: border-box;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: left;
  align-items: flex-start;
}

.testimonial-card.center {
  transform: scale(1.15);
  box-shadow: 0 6px 24px rgba(84, 190, 150, 0.25);
  z-index: 2;
}

.reviewer-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #00c2c2;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.reviewer-photo img {
  width: 60%;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
}

.testimonial-card h3 {
  font-size: clamp(16px, 1.4vw, 20px); /* dari max 18 -> max 20 */
  color: #1a237e;
  margin-bottom: 15px;
  text-align: center;
}

.testimonial-text {
  color: #333;
  font-size: clamp(14px, 1.2vw, 18px); /* dari max 16 -> max 18 */
  margin-bottom: 20px;
  line-height: 1.5;
}

.testimonial-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.testimonial-divider {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 12px 0;
  align-self: stretch; /* ⬅️ ini kunci agar lebarnya ikut parent flex */
  width: 100%;
  min-width: 100%;
}

.reviewer-name {
  font-weight: bold;
  margin-bottom: 5px;
  color: #000;
  font-size: clamp(14px, 1.1vw, 18px); /* sebelumnya max 16px */
  margin-top: auto;
}

.reviewer-job {
  font-size: clamp(13px, 1vw, 16px);
  color: #777;
}

.swiper {
  padding: 35px 0; /* Kurangi padding karena sudah ada di container */
  overflow: hidden;
}

.testimonial-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  gap: 16px;
  font-family: 'Inter';
}
.nav-btn {
  background: #fff;
  color: #222;
  border: 2px solid #54be96;
  border-radius: 10px;
  padding: 15px 20px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(84, 190, 150, 0.08);
  transition: background 0.2s, border 0.2s;
}
.nav-btn:hover {
  background: #54be96;
  color: #fff;
  border-color: #009e7a;
}

.nav-btn:hover .arrow-svg {
  stroke: #fff;
}

.nav-progress {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 120px;
  justify-content: center;
  background: transparent;
  border-radius: 5px;
  padding: 0 16px;
  height: 16px;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #c2c2c2;
  transition: all 0.3s;
  opacity: 1;
  display: inline-block;
}
.nav-dot.active {
  width: 48px;
  border-radius: 5px;
  background: #6BC2A1;
  opacity: 1;
}

@media (max-width: 600px) {
  .testimonial-section {
    padding: 16px 0;
    min-height: 0;
    overflow: hidden;
  }
  .swiper-container {
    padding: 0;
    max-width: 100vw;
    overflow: visible;
  }
  .testimonial-header h2 {
    font-size: 22px;
    margin-bottom: 8px;
  }
  .testimonial-header p {
    font-size: 13px;
    margin-bottom: 24px;
    max-width: 95vw;
  }
  .testimonial-card {
    margin: 0 auto;
    /* Pastikan tidak ada transform, margin, atau padding aneh */
    transform: none !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    border-radius: 10px;
    width: 100%;
    max-width: 340px;
    min-height: 0;
  }
  .swiper-slide-next .testimonial-card {
    transform: none !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  }
  .swiper {
    padding: 0 !important;
    overflow: visible;
  }
  .testimonial-nav {
    flex-direction: row; /* Tetap horizontal di mobile */
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 18px;
  }
  .nav-btn {
    padding: 10px 10px;
    font-size: 14px;
    min-width: 44px;
    min-height: 44px;
  }
  .nav-progress {
    gap: 10px;
    padding: 0 8px;
    min-width: 80px;
    height: 14px;
  }
  .nav-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #c2c2c2;
    transition: all 0.3s;
    opacity: 1;
    display: inline-block;
  }
  .nav-dot.active {
    width: 28px;
    height: 14px;
    border-radius: 5px;
    background: #6BC2A1;
    opacity: 1;
  }
}
</style>