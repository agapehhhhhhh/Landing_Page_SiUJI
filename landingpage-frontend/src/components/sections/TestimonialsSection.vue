<template>
  <section class="testimonial-section">
    <div class="testimonial-header">
      <h2>What They say</h2>
      <p>
        Skilline is one powerful online software suite that combines<br />
        all the tools needed to run a successful school or office.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading testimonials...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p>⚠️ Error loading testimonials: {{ error }}</p>
      <button @click="loadTestimonials" class="retry-btn">Retry</button>
    </div>

    <!-- Testimonials Content -->
    <div v-else-if="reviews.length > 0" class="swiper-container">
      <Swiper
        :slides-per-view="3"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :breakpoints="{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
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
                :alt="review.avatar?.alt || review.name || 'User Icon'"
                @error="handleImageError"
              />
            </div>
            <h3>{{ review.title || 'Testimonial' }}</h3>
            <p class="testimonial-text">{{ review.content }}</p>
            <p class="reviewer-name">{{ review.name }}</p>
            <p class="reviewer-job">{{ review.job || review.position }}</p>
            <p v-if="review.school" class="reviewer-school">{{ review.school }}</p>
          
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <p>No testimonials available at the moment.</p>
    </div>
    
    <!-- Custom Navigation -->
    <div v-if="!isLoading && !error && reviews.length > 0" class="testimonial-nav">
      <button @click="slidePrev" class="nav-btn">
        <span class="arrow-icon">&#8592;</span> Prev
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
        Next <span class="arrow-icon">&#8594;</span>
      </button>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { fetchTestimonialsData } from '@/services/payloadService';

export default {
  name: "TestimonialSection",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      reviews: [],
      currentIndex: 0,
      isLoading: true,
      error: null
    };
  },
  async mounted() {
    await this.loadTestimonials();
  },
  methods: {
    async loadTestimonials() {
      try {
        this.isLoading = true;
        this.error = null;
        
        const testimonialsData = await fetchTestimonialsData();
        this.reviews = testimonialsData;
        
        console.log("Loaded testimonials:", this.reviews);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        this.error = error.message;
        
        // Use fallback data if API fails
        this.reviews = [
          {
            id: 1,
            title: "Online Billing, Invoicing, & Contracts",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
            name: "Agus",
            job: "Pekerjaan",
            avatar: null
          },
          {
            id: 2,
            title: "Online Billing, Invoicing, & Contracts",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
            name: "Asep",
            job: "Pekerjaan",
            avatar: null
          }
        ];
      } finally {
        this.isLoading = false;
      }
    },
    handleImageError(event) {
      // Fallback to default image if avatar fails to load
      event.target.src = require('@/assets/user.png');
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
        this.$refs.swiperRef.$el.swiper.slideToLoop(idx);
      }
    },
  },
};
</script>

<style scoped>
/* Pastikan card testimonial yang di-scale tidak terpotong */
.swiper-slide {
  overflow: visible;
}
/* Card testimonial tengah lebih besar dengan selector CSS sederhana */
/* Tambahkan CSS untuk container Swiper */
.swiper-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 60px; /* Tambahkan padding lebih besar di kiri-kanan */
  overflow: visible; /* Pastikan overflow visible */
}

/* Pastikan card testimonial yang di-scale tidak terpotong */
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  transition: transform 0.3s ease;
}

/* Card testimonial tengah lebih besar dengan selector CSS sederhana */
/* Card tengah yang aktif */
.swiper-slide-next .testimonial-card {
  transform: scale(1.15);
  box-shadow: 0 6px 24px rgba(84, 190, 150, 0.25);
  z-index: 10;
  position: relative;
}

.testimonial-section {
  padding: 60px 0;
  background: radial-gradient(circle at 50% 100%, #54be96 0%, #e0f7fa 60%, #ffffff 100%);
  font-family: Arial, sans-serif;
  text-align: center;
  overflow: visible;
  min-height: 400px;
}

.testimonial-header h2 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #222;
}

.testimonial-header p {
  font-size: 16px;
  color: #555;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.testimonial-card {
  width: 280px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.testimonial-card.center {
  transform: scale(1.15);
  box-shadow: 0 6px 24px rgba(84, 190, 150, 0.25);
  z-index: 2;
}

.reviewer-photo {
  width: 50px;
  height: 50px;
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
}

.testimonial-card h3 {
  font-size: 16px;
  color: #1a237e;
  margin-bottom: 15px;
}

.testimonial-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
}

.reviewer-name {
  font-weight: bold;
  margin-bottom: 5px;
  color: #000;
}

.reviewer-job {
  font-size: 14px;
  color: #777;
}

.swiper {
  padding: 30px 0; /* Beri padding atas-bawah untuk card yang di-scale */
  overflow: visible;
}

.testimonial-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  gap: 16px;
}
.nav-btn {
  background: #fff;
  color: #222;
  border: 2px solid #54be96;
  border-radius: 24px;
  padding: 6px 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(84, 190, 150, 0.08);
  transition: background 0.2s, border 0.2s;
}
.nav-btn:hover {
  background: #54be96;
  color: #fff;
  border-color: #009e7a;
}
.arrow-icon {
  font-size: 18px;
  font-weight: bold;
}

.nav-progress {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 120px;
  justify-content: center;
  background: #fff;
  border-radius: 12px;
  padding: 0 16px;
  height: 16px;
}

.nav-dot {
  height: 12px;
  border-radius: 8px;
  background: #e0e0e0;
  transition: all 0.3s;
  width: 24px;
  opacity: 0.6;
  display: inline-block;
}
.nav-dot.active {
  width: 48px;
  background: #54be96;
  opacity: 1;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #54be96;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #e74c3c;
}

.retry-btn {
  background: #54be96;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  margin-top: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.retry-btn:hover {
  background: #4aa085;
}

/* Empty State */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  color: #888;
  font-style: italic;
}

/* School Name */
.reviewer-school {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  font-style: italic;
}

@media (max-width: 1024px) {
  .testimonial-card {
    flex: 0 0 calc(100% / 2 - 20px); /* 2 card per view di tablet */
  }
  .swiper-container {
    padding: 0 40px;
  }
  
  .swiper-slide-next .testimonial-card {
    transform: scale(1.1);
  }
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
    padding: 5px 16px;
    font-size: 14px;
  }
  .nav-progress {
    gap: 10px;
    padding: 0 8px;
    min-width: 80px;
    height: 14px;
  }
  .nav-dot {
    width: 18px;
    height: 10px;
  }
  .nav-dot.active {
    width: 32px;
  }
}
</style>
