<template>
  <section class="pricing-section">
    <div class="pricing-header">
      <h2>Choose Plan</h2>
      <h3>That's Right For You</h3>
      <p>Choose plan that works best for you, feel free to contact us</p>

      <!-- Billing Toggle -->
      <div
        class="billing-toggle"
        :data-yearly="billingType === 'yearly'"
        :class="{ 'is-toggling': isToggling }"
      >
        <button
          v-for="type in billingTypes"
          :key="type"
          :class="['toggle-btn', { active: billingType === type }]"
          @click="toggleBilling(type)"
          :disabled="isToggling"
        >
          Bill {{ type === "monthly" ? "Monthly" : "Yearly" }}
        </button>
      </div>
    </div>

    <!-- Pricing Cards Container -->
    <div class="pricing-cards-wrapper">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <p>Loading pricing plans...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!pricingPlans.length" class="empty-state">
        <p>No pricing plans available</p>
      </div>

      <!-- Pricing Cards -->
      <div
        v-else
        class="pricing-cards-container"
        ref="cardsContainer"
        :class="{ 'is-sliding': isSliding }"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div
          v-for="(plan, index) in visiblePlans"
          :key="plan?.id || index"
          :class="getCardClasses(index)"
          @mouseenter="hoveredCard = index"
          @mouseleave="hoveredCard = null"
          v-show="plan"
        >
          <div class="plan-header">
            <h4 class="plan-name">{{ getPlanProperty(plan, "name") }}</h4>
            <p class="plan-description">
              {{ getPlanProperty(plan, "description") }}
            </p>

            <div class="price-container">
              <span class="currency">$</span>
              <span class="price">{{ getCurrentPrice(plan) || 0 }}</span>
            </div>

            <p
              v-if="getSavingsText(plan) && billingType === 'yearly'"
              class="savings"
            >
              {{ getSavingsText(plan) }}
            </p>
          </div>

          <div class="features-list">
            <div class="features-content">
              <div
                v-for="(feature, idx) in getFeatures(plan)"
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
                <span>{{ getFeatureText(feature) }}</span>
              </div>
            </div>

            <button :class="['cta-button', { 'center-button': index === 1 }]">
              {{ getPlanProperty(plan, "buttonText") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div v-if="showNavigation" class="pricing-nav">
        <button
          @click="slidePrev"
          class="nav-btn"
          :disabled="!canSlide || isSliding"
        >
          Prev
        </button>
        <div class="nav-progress">
          <span
            v-for="(_, idx) in pricingPlans"
            :key="idx"
            :class="['nav-dot', { active: idx === centerIndex }]"
            @click="!isSliding && (centerIndex = idx)"
          ></span>
        </div>
        <button
          @click="slideNext"
          class="nav-btn"
          :disabled="!canSlide || isSliding"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchPricingData } from "@/services/payloadService";

// Constants
const BILLING_TYPES = ["monthly", "yearly"];
const ANIMATION_DURATION = 200;
const SWIPE_THRESHOLD = 50;

// Property mappings for API flexibility
const PROPERTY_MAPS = {
  name: ["name", "title", "planName", "plan_name"],
  description: [
    "description",
    "desc",
    "subtitle",
    "planDescription",
    "plan_description",
  ],
  buttonText: [
    "buttonText",
    "button_text",
    "ctaText",
    "cta_text",
    "actionText",
    "action_text",
  ],
  yearlyPrice: [
    "yearlyPrice",
    "yearly_price",
    "annualPrice",
    "annual_price",
    "priceYearly",
  ],
  monthlyPrice: ["monthlyPrice", "monthly_price", "price", "priceMonthly"],
  savings: [
    "savings",
    "savingsText",
    "savings_text",
    "discount",
    "discountText",
    "discount_text",
  ],
};

export default {
  name: "PricingSection",
  data: () => ({
    billingType: "yearly",
    centerIndex: 1,
    hoveredCard: null,
    pricingPlans: [],
    loading: true,
    isSliding: false,
    isToggling: false,
    touchStartX: 0,
    touchEndX: 0,
  }),
  computed: {
    billingTypes: () => BILLING_TYPES,

    visiblePlans() {
      const total = this.pricingPlans.length;
      if (total <= 3) return this.pricingPlans;

      const getIndex = (offset) => (this.centerIndex + offset + total) % total;
      return [
        this.pricingPlans[getIndex(-1)],
        this.pricingPlans[this.centerIndex],
        this.pricingPlans[getIndex(1)],
      ];
    },

    canSlide() {
      return this.pricingPlans.length > 3;
    },

    showNavigation() {
      return !this.loading && this.pricingPlans.length > 3;
    },
  },

  async mounted() {
    await this.loadPricingData();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    async loadPricingData() {
      try {
        this.loading = true;
        const data = await fetchPricingData();
        this.pricingPlans = data.plans || [];
        this.centerIndex = Math.min(1, this.pricingPlans.length - 1);
      } catch (error) {
        console.error("Error loading pricing data:", error);
        this.pricingPlans = [];
        this.centerIndex = 0;
      } finally {
        this.loading = false;
      }
    },

    // Unified slide method
    slide(direction) {
      if (!this.canSlide || this.isSliding) return;

      this.isSliding = true;
      const container = this.$refs.cardsContainer;
      const translateX = direction === "next" ? -100 : 100;

      // Animate out
      if (container) {
        container.style.transform = `translateX(${
          this.isMobile() ? translateX : translateX / 2
        }px)`;
        container.style.opacity = this.isMobile() ? "0.5" : "0.6";
      }

      setTimeout(
        () => {
          // Update index
          if (direction === "next") {
            this.centerIndex =
              this.centerIndex === this.pricingPlans.length - 1
                ? 0
                : this.centerIndex + 1;
          } else {
            this.centerIndex =
              this.centerIndex === 0
                ? this.pricingPlans.length - 1
                : this.centerIndex - 1;
          }

          // Animate in
          if (container) {
            container.style.transform = "translateX(0)";
            container.style.opacity = "1";
          }

          setTimeout(() => {
            this.isSliding = false;
          }, ANIMATION_DURATION);
        },
        this.isMobile() ? ANIMATION_DURATION : 150
      );
    },

    slidePrev() {
      this.slide("prev");
    },

    slideNext() {
      this.slide("next");
    },

    getCardClasses(index) {
      const classes = ["pricing-card"];
      if (index === 1) classes.push("center-card");
      else if (index === 0) classes.push("left-card");
      else if (index === 2) classes.push("right-card");
      return classes;
    },

    isMobile() {
      return window.innerWidth <= 768;
    },

    handleResize() {
      this.$forceUpdate();
    },

    handleTouchStart(event) {
      if (this.isMobile()) {
        this.touchStartX = event.touches[0].clientX;
      }
    },

    handleTouchEnd(event) {
      if (this.isMobile()) {
        this.touchEndX = event.changedTouches[0].clientX;
        this.handleSwipe();
      }
    },

    handleSwipe() {
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        diff > 0 ? this.slideNext() : this.slidePrev();
      }
    },

    // Unified property getter
    getPlanProperty(plan, propertyType, fallback = "") {
      if (!plan) return fallback || this.getDefaultValue(propertyType);

      const properties = PROPERTY_MAPS[propertyType] || [propertyType];
      for (const prop of properties) {
        if (plan[prop]) return plan[prop];
      }
      return fallback || this.getDefaultValue(propertyType);
    },

    getDefaultValue(propertyType) {
      const defaults = {
        name: "Unknown Plan",
        description: "No description available",
        buttonText: "Select Plan",
      };
      return defaults[propertyType] || "";
    },

    getCurrentPrice(plan) {
      if (!plan) return 0;

      const priceType =
        this.billingType === "yearly" ? "yearlyPrice" : "monthlyPrice";
      return this.getPlanProperty(plan, priceType, 0);
    },

    getFeatures(plan) {
      if (!plan?.features) return [];

      if (Array.isArray(plan.features)) return plan.features;
      if (typeof plan.features === "object")
        return Object.values(plan.features);
      return [];
    },

    getFeatureText(feature) {
      if (typeof feature === "object" && feature !== null) {
        const textProps = [
          "feature",
          "text",
          "name",
          "title",
          "description",
          "label",
        ];
        for (const prop of textProps) {
          if (feature[prop]) return feature[prop];
        }

        if (feature.isIncluded !== undefined) {
          return feature.isIncluded
            ? feature.feature || feature.name || "Feature included"
            : "Feature not included";
        }

        return Object.values(feature).join(" ") || "Unknown feature";
      }
      return feature || "Unknown feature";
    },

    getSavingsText(plan) {
      return this.getPlanProperty(plan, "savings");
    },

    toggleBilling(type) {
      if (this.isToggling || this.billingType === type) return;

      this.isToggling = true;
      this.billingType = type;

      setTimeout(() => {
        this.isToggling = false;
      }, 250);
    },
  },
};
</script>

<style scoped>
.pricing-section {
  padding: 80px 0;
  background: radial-gradient(
    circle at center,
    rgba(107, 194, 161, 0.5) 0%,
    rgba(107, 194, 161, 0.3) 30%,
    rgba(255, 255, 255, 0.8) 55%,
    #ffffff 100%
  );
  background-size: 100% 100%; /* Reduced from 100% 100% to make circle smaller */
  background-repeat: no-repeat;
  background-position: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  text-align: center;
  overflow: hidden;
  min-height: 700px;
  position: relative;
}

.pricing-header {
  margin-bottom: 50px;
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
  border-radius: 12px;
  padding: 6px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1.5px solid #000000;
  position: relative;
}

.billing-toggle::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 8px;
  width: calc(50% - 10px);
  height: calc(100% - 16px);
  background: #4cc5bd;
  border-radius: 8px;
  border: 1px solid #000000;
  box-shadow: 0 2px 8px rgba(76, 197, 189, 0.25);
  transition: transform 0.3s ease;
  transform: translateX(0);
  z-index: 1;
}

.billing-toggle[data-yearly="true"]::before {
  transform: translateX(100%);
}

.billing-toggle.is-toggling::before {
  transition: transform 0.3s ease;
}

.toggle-btn {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  color: #718096;
  position: relative;
  z-index: 2;
}

.toggle-btn:first-child {
  padding-left: 17px;
}

.toggle-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.toggle-btn.active {
  color: white;
  background: transparent;
}

.toggle-btn:hover:not(:disabled) {
  color: #4a5568;
}

.toggle-btn.active:hover:not(:disabled) {
  color: white;
}

.pricing-cards-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 40px;
}

.pricing-cards-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  padding: 40px 0;
  min-height: 500px;
  overflow: visible;
  perspective: 1000px;
  transition: all 0.25s ease;
}

.pricing-cards-container.is-sliding {
  pointer-events: none;
}

.pricing-card {
  width: 320px;
  background: white;
  border-radius: 20px;
  padding: 36px 28px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border: 2px solid #e2e8f0;
  position: relative;
  opacity: 1;
  transform: scale(0.9);
  color: #2d3748;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 545px;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: scale(0.95) translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  opacity: 1;
  border-color: #4cc5bd;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.pricing-card.center-card {
  background: linear-gradient(135deg, #4cc5bd 0%, #4cc5bd 100%);
  color: white;
  border-color: #2d3748;
  transform: scale(1.1);
  opacity: 1;
  z-index: 10;
  box-shadow: 0 25px 50px rgba(76, 197, 189, 0.25);
}

.pricing-card.center-card .plan-description {
  color: white;
  opacity: 1;
}

.pricing-card.center-card::before {
  content: "";
  position: absolute;
  top: calc(50% + 115px);
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
  margin-bottom: 20px;
  transform: translateY(-25px);
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
  margin-bottom: 16px;
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
  margin-bottom: 0;
  text-align: left;
  padding: 12px;
  border: 1px solid #000000;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-height: 160px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.features-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 1.8;
  color: #2d3748;
  margin-bottom: 12px;
  font-family: "Inter", sans-serif;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.pricing-card.center-card .features-list {
  border: 1px solid #000000;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #2d3748;
  min-height: 160px;
}

.pricing-card.center-card .feature-item {
  color: #2d3748;
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
  width: 90%;
  margin: 0 auto;
  padding: 15px 20px;
  border: 1px solid #030707;
  border-radius: 10px;
  background: transparent;
  color: #4cc5bd;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  font-family: "Inter", sans-serif;
  border-radius: 1;
}

.cta-button:hover {
  background: #4cc5bd;
  color: white;
  transform: translateY(-2px);
}

.cta-button.center-button {
  background: #4cc5bd;
  color: white;
  border: 1px solid #000000;
}

.cta-button.center-button:hover {
  background: #3ba69f;
  border-color: #3ba69f;
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
  background: #ffffff;
  color: #4cc5bd;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(76, 197, 189, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);    
  transform: translateY(0);
}

.nav-btn:hover:not(:disabled) {
  background: #4cc5bd;
  color: white;
  border-color: #000000;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(76, 197, 189, 0.25);
}

.nav-btn:active:not(:disabled) {
  transform: translateY(-1px);
  transition: all 0.1s ease;
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(76, 197, 189, 0.1);
}

.arrow-icon {
  font-size: 18px;
  font-weight: bold;
}

.nav-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: #cbd5e0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  transform: scale(1);
}

.nav-dot:hover {
  background: #a0aec0;
  transform: scale(1.1);
}

.nav-dot.active {
  width: 24px;
  height: 8px;
  border-radius: 4px;
  background: #4cc5bd;
  transform: scale(1);
}

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
    width: 300px;
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
  content: "";
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  font-size: 16px;
  color: #e53e3e;
  font-weight: 500;
}

@media (max-width: 768px) {
  .pricing-section {
    padding: 60px 0;
    overflow-x: hidden;
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
    padding: 0 20px;
    max-width: 100vw;
    overflow: hidden;
  }

  .pricing-cards-container {
    flex-direction: row;
    align-items: center;
    gap: 20px;
    overflow: hidden;
    width: 100%;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    position: relative;
    transition: transform 0.4s ease, opacity 0.4s ease;
  }

  .pricing-card {
    width: calc(100vw - 60px);
    max-width: 300px;
    min-width: 280px;
    transform: scale(1);
    opacity: 1;
    border-color: #e2e8f0;
    flex-shrink: 0;
    margin: 0 auto;
    transition: opacity 0.4s ease, transform 0.4s ease;
    box-sizing: border-box;
  }

  .pricing-card.center-card {
    transform: scale(1);
    border-color: #2d3748;
  }

  .pricing-card.left-card,
  .pricing-card.right-card {
    opacity: 0;
    transform: scale(0.8);
    border-color: #e2e8f0;
    position: absolute;
    pointer-events: none;
  }

  .pricing-card.left-card {
    left: -100%;
  }

  .pricing-card.right-card {
    right: -100%;
  }

  .pricing-card:hover {
    transform: scale(1) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
    border-color: #e2e8f0 !important;
  }

  .pricing-card.center-card:hover {
    transform: scale(1) !important;
    box-shadow: 0 25px 50px rgba(76, 197, 189, 0.25) !important;
    border-color: #2d3748 !important;
  }

  .pricing-card.center-card::before {
    top: calc(50% + 150px);
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

  .nav-progress {
    gap: 6px;
  }

  .nav-dot {
    width: 6px;
    height: 6px;
  }

  .nav-dot.active {
    width: 20px;
    height: 6px;
  }

  .billing-toggle {
    border-width: 1px;
    padding: 4px 8px;
    border-radius: 8px;
  }

  .billing-toggle::before {
    top: 4px;
    left: 8px;
    width: calc(50% - 10px);
    height: calc(100% - 10px);
    border-radius: 6px;
  }

  .billing-toggle[data-yearly="true"]::before {
    transform: translateX(calc(100% + 2px));
  }

  .toggle-btn {
    padding: 10px 20px;
    font-size: 13px;
    border-width: 1px;
  }

  .toggle-btn:first-child {
    padding-left: 12px;
    padding-right: 12px;
  }

  .toggle-btn:last-child {
    margin-left: 10px;
  }
}

@media (max-width: 480px) {
  .pricing-cards-wrapper {
    padding: 0 15px;
  }

  .pricing-card {
    width: calc(100vw - 50px);
    max-width: 280px;
    min-width: 260px;
    padding: 24px 20px;
  }

  .pricing-header h2,
  .pricing-header h3 {
    font-size: 24px;
  }

  .pricing-header p {
    font-size: 14px;
    padding: 0 10px;
  }

  .price {
    font-size: 42px;
  }

  .plan-name {
    font-size: 20px;
  }

  .features-list {
    padding: 10px;
    min-height: 140px;
    margin-bottom: 0;
    gap: 10px;
  }

  .feature-item {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 1.6;
  }

  .cta-button {
    padding: 12px 18px;
    font-size: 13px;
    width: 75%;
  }
}
</style>
