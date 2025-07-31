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
      <Swiper
        :slides-per-view="3"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :breakpoints="{
          0: { slidesPerView: 1 },
          601: { slidesPerView: 3 }
        }"
        @slideChange="onSlideChange"
        ref="swiperRef"
      >
        <SwiperSlide
          v-for="(review, index) in reviews"
          :key="index"
        >
          <div class="testimonial-card">
            <div class="reviewer-photo">
              <img src="@/assets/user.png" alt="User Icon" />
            </div>
            <h3>{{ review.title }}</h3>
            <p class="testimonial-text">{{ review.content }}</p>
            <div class="testimonial-footer">
              <div class="testimonial-divider"></div>
              <p class="reviewer-name">{{ review.name }}</p>
              <p class="reviewer-job">{{ review.job }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Custom Navigation -->
    <div class="testimonial-nav">
      <button @click="slidePrev" class="nav-btn">
        <svg class="arrow-svg" viewBox="0 0 24 24">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
        <svg class="arrow-svg" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: "TestimonialSection",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      reviews: [
        {
          title: "Online Billing, Invoicing, & Contracts",
          content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          name: "Agus",
          job: "Pekerjaan",
        },
        {
          title: "Online Billing, Invoicing, & Contracts",
          content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          name: "Asep",
          job: "Pekerjaan",
        },
        {
          title: "Online Billing, Invoicing, & Contracts",
          content:
            "PERSIB JUARA",
          name: "Ujang",
          job: "Pekerjaan",
        },
        {
          title: "Online Billing, Invoicing, & Contracts",
          content:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          name: "Kedu",
          job: "Pekerjaan",
        },
      ],
      currentIndex: 0,
    };
  },
    methods: {
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
    rgba(255, 255, 255, 0.8) 60%,
    #ffffff 100%
  );
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  font-family: Arial, sans-serif;
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: clamp(260px, 24vw, 340px); /* sedikit diperkecil dari 28vw */
  padding: clamp(20px, 2vw, 24px);
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
  font-size: clamp(15px, 1.2vw, 18px); /* dari max 20 -> max 18 */
  color: #1a237e;
  margin-bottom: 15px;
  text-align: center;
}

.testimonial-text {
  color: #333;
  font-size: clamp(13px, 1vw, 16px); /* dari max 18 -> max 16 */
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
  font-size: clamp(13px, 0.9vw, 16px); /* sebelumnya bisa 18px */
  margin-top: auto;
}

.reviewer-job {
  font-size: clamp(12px, 0.85vw, 14px);
  color: #777;
}

.swiper {
  padding: 30px 0; /* Beri padding atas-bawah untuk card yang di-scale */
  overflow: hidden;
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
  border-radius: 10px;
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

.arrow-svg {
  width: 16px;
  height: 16px;
  stroke: #222;
  transition: stroke 0.2s;
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