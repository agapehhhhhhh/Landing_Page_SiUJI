<template>
  <section class="pricing-section">
    <div class="pricing-header">
      <h2>Choose Plan</h2>
      <h3>That's Right For You</h3>
      <p>Choose plan that works best for you, feel free to contact us</p>

      <!-- Billing Toggle -->
      <div class="billing-toggle">
        <button
          :class="['toggle-btn', { active: billingType === 'monthly' }]"
          @click="billingType = 'monthly'"
        >
          Bill Monthly
        </button>
        <button
          :class="['toggle-btn', { active: billingType === 'yearly' }]"
          @click="billingType = 'yearly'"
        >
          Bill Yearly
        </button>
      </div>
    </div>

    <!-- Pricing Cards Container -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">Loading pricing plans...</div>
    </div>
    
    <div v-else-if="pricingPlans.length === 0" class="error-container">
      <div class="error-message">Unable to load pricing plans. Please try again later.</div>
    </div>

    <div v-else class="pricing-cards-wrapper">
      <div class="pricing-cards-container" ref="cardsContainer">
        <div
          v-for="(plan, index) in visiblePlans"
          :key="plan.id"
          :class="[
            'pricing-card',
            {
              'center-card': index === 1,
              'left-card': index === 0,
              'right-card': index === 2,
            },
          ]"
          @mouseenter="onCardHover(index)"
          @mouseleave="onCardLeave"
        >
          <div class="plan-header">
            <h4 class="plan-name">{{ plan.name }}</h4>
            <p class="plan-description">{{ plan.description }}</p>

            <div class="price-container">
              <span class="currency">{{ getCurrencySymbol(plan.currency) }}</span>
              <span 
                class="price" 
                :data-length="getPriceLength(billingType === 'yearly' && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice)"
              >{{
                formatPrice(billingType === "yearly" && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice)
              }}</span>
              <span class="period">{{ billingType === 'yearly' ? '/year' : '/month' }}</span>
            </div>

            <p v-if="plan.savings && billingType === 'yearly'" class="savings">
              {{ plan.savings }}
            </p>
          </div>

          <div class="features-list">
            <div class="features-content">
              <div
                v-for="(feature, idx) in plan.features"
                :key="idx"
                class="feature-item"
              >
                <div class="feature-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.5 4.5L6 12L2.5 8.5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>

          <button :class="['cta-button', { 'center-button': index === 1 }]">
            {{ plan.buttonText }}
          </button>
        </div>
      </div>

      <!-- Custom Navigation -->
      <div class="pricing-nav">
        <button @click="slidePrev" class="nav-btn" :disabled="!canSlidePrev">
          <span class="arrow-icon">&#8592;</span> Prev
        </button>
        <div class="nav-progress">
          <span
            v-for="(_, idx) in totalDots"
            :key="idx"
            :class="['nav-dot', { active: idx === centerIndex }]"
            @click="goToSlide(idx)"
          ></span>
        </div>
        <button @click="slideNext" class="nav-btn" :disabled="!canSlideNext">
          Next <span class="arrow-icon">&#8594;</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchPricingData } from "@/services/payloadService";

export default {
  name: "PricingSection",
  data() {
    return {
      billingType: "yearly", // 'monthly' or 'yearly'
      centerIndex: 1, // Index dari card yang berada di tengah (Pro plan default)
      hoveredCard: null,
      pricingPlans: [],
      loading: true,
    };
  },
  computed: {
    visiblePlans() {
      if (this.pricingPlans.length <= 3) {
        return this.pricingPlans;
      }

      // Ambil 3 card berdasarkan centerIndex
      const plans = [];
      const total = this.pricingPlans.length;

      // Card kiri
      const leftIndex =
        this.centerIndex === 0 ? total - 1 : this.centerIndex - 1;
      plans.push(this.pricingPlans[leftIndex]);

      // Card tengah
      plans.push(this.pricingPlans[this.centerIndex]);

      // Card kanan
      const rightIndex =
        this.centerIndex === total - 1 ? 0 : this.centerIndex + 1;
      plans.push(this.pricingPlans[rightIndex]);

      return plans;
    },
    totalDots() {
      return this.pricingPlans.length;
    },
    canSlidePrev() {
      return this.pricingPlans.length > 3;
    },
    canSlideNext() {
      return this.pricingPlans.length > 3;
    },
  },
  async mounted() {
    await this.loadPricingData();
  },
  methods: {
    async loadPricingData() {
      try {
        this.loading = true;
        const data = await fetchPricingData();
        this.pricingPlans = data.plans || [];
        // Set center index ke Pro plan (index 1) sebagai default
        this.centerIndex = Math.min(1, this.pricingPlans.length - 1);
      } catch (error) {
        console.error("Error loading pricing data:", error);
        this.pricingPlans = [];
      } finally {
        this.loading = false;
      }
    },
    getCurrencySymbol(currency) {
      const symbols = {
        idr: 'Rp ',
      };
      return symbols[currency] || 'Rp ';
    },
    formatPrice(price) {
      if (!price || price === '0') return 'Free';
      
      // Convert to number for formatting
      const numPrice = parseInt(price);
      
      // Format with abbreviations for large numbers
      if (numPrice >= 1000000) {
        return (numPrice / 1000000).toFixed(1).replace('.0', '') + 'Jt';
      } else if (numPrice >= 1000) {
        return (numPrice / 1000).toFixed(0) + 'rb';
      }
      
      return numPrice.toString();
    },
    getPriceLength(price) {
      const formattedPrice = this.formatPrice(price);
      if (formattedPrice.length > 6) return 'very-long';
      if (formattedPrice.length > 4) return 'long';
      return 'normal';
    },
    slidePrev() {
      if (this.canSlidePrev) {
        this.centerIndex =
          this.centerIndex === 0
            ? this.pricingPlans.length - 1
            : this.centerIndex - 1;
      }
    },
    slideNext() {
      if (this.canSlideNext) {
        this.centerIndex =
          this.centerIndex === this.pricingPlans.length - 1
            ? 0
            : this.centerIndex + 1;
      }
    },
    goToSlide(idx) {
      this.centerIndex = idx;
    },
    onCardHover(index) {
      this.hoveredCard = index;
    },
    onCardLeave() {
      this.hoveredCard = null;
    },
  },
};
</script>

<style scoped>
.pricing-section {
  padding: 80px 0;
  background: radial-gradient(circle at center, #6BC2A1 0%, #b7e6d1 60%, #ffffff 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-align: center;
  overflow: hidden;
  min-height: 700px;
  position: relative;
}
  

.pricing-header {
  margin-bottom: 50 px;
  position: relative;
  z-index: 2;
}

.pricing-header h2 {
  font-size: 48px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: -30px;
  line-height: 1.2;
}

.pricing-header h3 {
  font-size: 48px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 16px;
  line-height: 1.2;
}

.pricing-header p {
  font-size: 18px;
  color: #718096;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.billing-toggle {
  display: inline-flex;
  background: #ffffff;
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #000000;
  margin-bottom: 40px;
}

.toggle-btn {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: #718096;
}

.toggle-btn.active {
  background: #4cc5bd;
  color: white;
  border-color: #060707;
  border: 1px solid #000000;
  box-shadow: 0 2px 8px rgba(76, 197, 189, 0.25);
}

.pricing-cards-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.pricing-cards-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  padding: 40px 0;
  min-height: 500px;
}

.pricing-card {
  width: 280px;
  background: white;
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid #e2e8f0;
  position: relative;
  opacity: 1;
  transform: scale(0.9);
  color: #2d3748;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 580px;
}

.pricing-card:hover {
  transform: scale(0.95) translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  opacity: 1;
  border-color: #4cc5bd;
}

/* Center card styling - Pro plan yang hijau */
.pricing-card.center-card {
  background: linear-gradient(135deg, #4cc5bd 0%, #4cc5bd 100%);
  color: white;
  border-color: #2d3748;
  transform: scale(1.1);
  opacity: 1;
  z-index: 10;
  box-shadow: 0 25px 50px rgba(76, 197, 189, 0.25);
}

/* Ellipse khusus untuk center card */
.pricing-card.center-card::before {
  content: "";
  position: absolute;
  top: calc(50% + 90px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 600px;
  background-image: url("@/assets/Ellipse.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.7;
  z-index: 1;
  pointer-events: none;
}

.pricing-card.center-card > * {
  position: relative;
  z-index: 3;
}

.pricing-card.center-card:hover {
  transform: scale(1.15) translateY(-12px);
  box-shadow: 0 30px 60px rgba(76, 197, 189, 0.35);
  border-color: #2d3748;
}

/* Side cards yang tidak terlihat */
.pricing-card.left-card,
.pricing-card.right-card {
  opacity: 1;
  transform: scale(0.9);
  border-color: #e2e8f0;
}

.pricing-card.left-card:hover,
.pricing-card.right-card:hover {
  opacity: 1;
  transform: scale(0.95) translateY(-5px);
  border-color: #4cc5bd;
}

.plan-header {
  margin-bottom: 32px;
}

.plan-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: inherit;
}

.plan-description {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 24px;
  line-height: 1.5;
}

.price-container {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 4px;
}

.currency {
  font-size: 24px;
  font-weight: 600;
}

.price {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  word-break: break-all;
  max-width: 100%;
}

/* Responsive font size based on content length */
.price[data-length="long"] {
  font-size: 48px;
}

.price[data-length="very-long"] {
  font-size: 36px;
}

.period {
  font-size: 16px;
  font-weight: 500;
  opacity: 0.8;
  margin-left: 4px;
}

.savings {
  font-size: 12px;
  opacity: 0.9;
  font-weight: 500;
  margin-top: 4px;
}

.features-list {
  margin-bottom: 32px;
  text-align: left;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-height: 180px;
  display: flex;
  flex-direction: column;
}

.features-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1.5;
  color: #2d3748;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.pricing-card.center-card .features-list {
  border: 1px solid rgba(0, 0, 0, 0.8);
  background: rgba(255, 255, 255, 0.95);
  color: #2d3748;
  min-height: 180px;
}

.pricing-card.center-card .feature-item {
  color: #0046c0;
}

.feature-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4cc5bd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.pricing-card.center-card .feature-icon {
  background: #4cc5bd;
}

.feature-icon svg {
  color: white;
}

.cta-button {
  width: 100%;
  padding: 16px 24px;
  border: 2px solid #4cc5bd;
  border-radius: 12px;
  background: transparent;
  color: #4cc5bd;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #4cc5bd;
  color: white;
  transform: translateY(-2px);
}

.cta-button.center-button {
  background: white;
  color: #4cc5bd;
  border: 1px solid #000000;
}

.cta-button.center-button:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.pricing-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  gap: 20px;
}

.nav-btn {
  background: white;
  color: #4a5568;
  border: 2px solid #4cc5bd;
  border-radius: 30px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(76, 197, 189, 0.15);
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #4cc5bd;
  color: white;
  transform: translateY(-2px);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.arrow-icon {
  font-size: 18px;
  font-weight: bold;
}

.nav-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border-radius: 20px;
  padding: 8px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.nav-dot {
  height: 4px;
  width: 20px;
  border-radius: 2px;
  background: #cbd5e0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-dot.active {
  width: 40px;
  background: #4cc5bd;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .pricing-header h2,
  .pricing-header h3 {
    font-size: 36px;
  }

  .pricing-cards-wrapper {
    padding: 0 20px;
  }

  .pricing-cards-container {
    gap: 15px;
  }

  .pricing-card {
    width: 260px;
  }

  .pricing-card.center-card {
    transform: scale(1.05);
  }

  .pricing-card.center-card:hover {
    transform: scale(1.1) translateY(-8px);
  }
}

/* Loading and Error States */
.loading-container,
.error-container {
  padding: 60px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  margin: 0 auto;
  max-width: 400px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  font-size: 18px;
  color: #4cc5bd;
  font-weight: 600;
}

.loading-spinner::after {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #4cc5bd;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  font-size: 16px;
  color: #e53e3e;
  font-weight: 500;
}

@media (max-width: 768px) {
  .pricing-section {
    padding: 60px 0;
  }

  .pricing-header {
    margin-bottom: 40px;
  }

  .pricing-header h2,
  .pricing-header h3 {
    font-size: 28px;
  }

  .pricing-header p {
    font-size: 16px;
  }

  .pricing-cards-wrapper {
    padding: 0 16px;
  }

  .pricing-cards-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .pricing-card {
    width: 100%;
    max-width: 320px;
    transform: scale(1);
    opacity: 1;
    border-color: #e2e8f0;
  }

  .pricing-card.center-card {
    transform: scale(1);
    order: -1;
    border-color: #2d3748;
  }

  .pricing-card.left-card,
  .pricing-card.right-card {
    opacity: 1;
    transform: scale(1);
    border-color: #e2e8f0;
  }

  .price {
    font-size: 48px;
  }

  .price[data-length="long"] {
    font-size: 36px;
  }

  .price[data-length="very-long"] {
    font-size: 28px;
  }

  .period {
    font-size: 14px;
  }

  .pricing-nav {
    margin-top: 30px;
    gap: 12px;
  }

  .nav-btn {
    padding: 10px 20px;
    font-size: 14px;
  }

  .billing-toggle {
    margin-bottom: 20px;
    border-width: 1px;
  }

  .toggle-btn {
    padding: 10px 20px;
    font-size: 13px;
    border-width: 1px;
  }

  .nav-progress {
    gap: 6px;
    padding: 6px 16px;
  }

  .nav-dot {
    width: 16px;
    height: 3px;
  }

  .nav-dot.active {
    width: 32px;
  }
}
</style>
