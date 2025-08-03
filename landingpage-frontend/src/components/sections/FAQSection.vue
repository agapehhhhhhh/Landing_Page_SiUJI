<template>
  <section class="faq-section" id="faq">
    <!-- Header with title -->
    <div class="faq-header">
      <div class="header-content">
        <img src="@/assets/faq.svg" alt="FAQ Icon" class="faq-logo" />
        <h2>Frequently Asked Questions</h2>
      </div>
    </div>

    <!-- Category navigation -->
    <div class="category-container">
      <div class="category-tabs">
        <button
          v-for="category in faqData.categories"
          :key="category.id"
          :class="{ active: activeCategory === category.id }"
          @click="selectCategory(category.id)"
          class="category-btn"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- FAQ Items Container -->
    <div class="faq-container" :class="{ expanded: showAllFaqs }">
      <div class="faq-items" ref="faqItems">
        <div
          v-for="(faq, index) in displayedFaqs"
          :key="faq.id"
          class="faq-item"
          :class="{
            active: faq.isOpen,
            blurred: shouldBlurItem(index),
            'fade-out': index >= 6 && !showAllFaqs,
          }"
          @click="toggleFaq(faq.id)"
        >
          <div class="faq-question">
            <span>{{ faq.question }}</span>
            <div class="faq-toggle" :class="{ open: faq.isOpen }">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <transition name="expand">
            <div v-if="faq.isOpen" class="faq-answer">
              <div class="answer-divider"></div>
              <p>{{ faq.answer }}</p>
            </div>
          </transition>
        </div>
      </div>

      <!-- Read More Button -->
      <div v-if="shouldShowReadMore" class="read-more-container">
        <button @click="toggleReadMore" class="read-more-btn">
          {{ showAllFaqs ? "Show Less" : "Read More" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchFAQData } from "@/services/payloadService.js";

export default {
  data() {
    return {
      faqData: {
        categories: [],
        faqs: [],
      },
      activeCategory: "feature",
      showAllFaqs: false,
    };
  },
  computed: {
    currentCategoryFaqs() {
      if (this.activeCategory === "all") {
        return this.faqData.faqs;
      }
      return this.faqData.faqs.filter(
        (faq) => faq.categoryId === this.activeCategory
      );
    },
    displayedFaqs() {
      if (this.showAllFaqs) {
        return this.currentCategoryFaqs;
      }
      // Show 6 FAQs so the 6th one can be blurred, but limit to available FAQs
      return this.currentCategoryFaqs.slice(
        0,
        Math.min(6, this.currentCategoryFaqs.length)
      );
    },
    shouldShowReadMore() {
      return this.currentCategoryFaqs.length > 5;
    },
  },
  methods: {
    async loadFAQData() {
      try {
        this.faqData = await fetchFAQData();
        if (this.faqData.categories.length > 0) {
          this.activeCategory = this.faqData.categories[0].id;
        }
      } catch (error) {
        console.error("Error loading FAQ data:", error);
      }
    },
    selectCategory(categoryId) {
      this.activeCategory = categoryId;
      this.showAllFaqs = false;
      this.resetFaqStates();
    },
    toggleFaq(faqId) {
      const faq = this.faqData.faqs.find((f) => f.id === faqId);
      if (faq) {
        faq.isOpen = !faq.isOpen;
      }
    },
    toggleReadMore() {
      this.showAllFaqs = !this.showAllFaqs;
      if (this.showAllFaqs) {
        this.$nextTick(() => {
          this.$refs.faqItems.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      }
    },
    shouldBlurItem(index) {
      return (
        index >= 5 && this.currentCategoryFaqs.length > 5 && !this.showAllFaqs
      );
    },
    resetFaqStates() {
      this.faqData.faqs.forEach((faq) => {
        faq.isOpen = false;
      });
    },
  },
  mounted() {
    this.loadFAQData();
  },
};
</script>

<style scoped>
.faq-section {
  position: relative;
  padding: 80px 20px 100px;
  background: linear-gradient(135deg, #4cc5bd 0%, #7dd3b0 50%, #8ee4bf 100%);
  overflow: hidden;
  min-height: 600px;
}

.faq-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("@/assets/faq-wave.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 1;
}

/* Header */
.faq-header {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  position: relative;
  margin-left: -150px;
}

.faq-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  flex-shrink: 0;
}

.faq-header h2 {
  font-size: 50px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-align: center;
}

/* Category Navigation */
.category-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
  padding: 0 20px;
}

.category-tabs {
  background: white;
  border-radius: 50px;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 1);
  max-width: 100%;
}

.category-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  background: transparent;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  flex: 0 1 auto;
  min-width: fit-content;
  font-size: 0.95rem;
}

.category-btn:hover {
  color: #4cc5bd;
  background: rgba(76, 197, 189, 0.1);
  transform: translateY(-1px);
}

.category-btn.active {
  background: #4cc5bd;
  color: white;
  box-shadow: 0 4px 15px rgba(76, 197, 189, 0.3);
  transform: translateY(-1px);
}

/* FAQ Container */
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.faq-items {
  max-height: none;
  transition: max-height 0.3s ease;
}

.faq-container.expanded .faq-items {
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.faq-container.expanded .faq-items::-webkit-scrollbar {
  width: 6px;
}

.faq-container.expanded .faq-items::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.faq-container.expanded .faq-items::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

/* FAQ Items */
.faq-item {
  background: white;
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
}

.faq-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid #000000;
}

.faq-item.active {
  border-color: #4cc5bd;
  box-shadow: 0 8px 30px rgba(76, 197, 189, 0.2);
}

.faq-item.blurred {
  filter: blur(3px);
  pointer-events: none;
  opacity: 0.6;
}

.faq-item.fade-out {
  opacity: 0.3;
}

.faq-question {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: #2d3748;
  line-height: 1.4;
}

.faq-toggle {
  width: 32px;
  height: 32px;
  background: #4cc5bd;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-left: 16px;
}

.faq-toggle.open {
  background: white;
  border: 1px solid #000000;
  transform: rotate(45deg);
}

.faq-toggle svg {
  width: 16px;
  height: 16px;
  color: white;
  transition: transform 0.3s ease;
}

.faq-toggle.open svg {
  color: #000000;
}

.faq-answer {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
}

.answer-divider {
  height: 2px;
  background: #333;
  margin: 0 24px 20px 24px;
  opacity: 0.3;
}

.faq-answer p {
  padding: 0 24px 24px;
  margin: 0;
}

/* Expand Animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 200px;
  opacity: 1;
}

/* Read More Button */
.read-more-container {
  text-align: center;
  margin-top: 30px;
}

.read-more-btn {
  background: white;
  color: #4cc5bd;
  border: 3px solid rgba(0, 0, 0, 0.2);
  padding: 14px 32px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.read-more-btn:hover {
  background: transparent;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .faq-section {
    padding: 60px 16px 80px;
  }

  .faq-header h2 {
    font-size: 2rem;
  }

  .header-content {
    gap: 20px;
    flex-direction: column;
    margin-left: 0;
  }

  .faq-logo {
    width: 80px;
    height: 80px;
  }

  .category-container {
    margin-bottom: 30px;
    padding: 0 10px;
  }

  .category-tabs {
    gap: 6px;
    padding: 6px;
    max-width: 95%;
  }

  .category-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
    min-width: auto;
  }

  .faq-question {
    padding: 20px;
    font-size: 1rem;
  }

  .faq-answer p {
    padding: 0 20px 20px;
    font-size: 0.95rem;
  }

  .answer-divider {
    margin: 0 20px 20px 20px;
  }

  .faq-toggle {
    width: 28px;
    height: 28px;
  }

  .faq-toggle svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 480px) {
  .category-tabs {
    gap: 4px;
    padding: 4px;
    max-width: 100%;
  }

  .category-btn {
    padding: 8px 12px;
    font-size: 0.85rem;
    min-width: auto;
  }

  .faq-question {
    padding: 16px;
  }

  .faq-answer p {
    padding: 0 16px 16px;
  }

  .answer-divider {
    margin: 0 16px 16px 16px;
  }
}
</style>
