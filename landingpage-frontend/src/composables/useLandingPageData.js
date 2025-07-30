// src/composables/useLandingPageData.js
import { ref, onMounted } from "vue";
import { fetchLandingPage, fetchFAQData } from "@/services/payloadService";

export function useLandingPageData() {
  const pageData = ref({});
  const isLoading = ref(true);

  const fetchData = async () => {
    try {
      const [landingData, faqData] = await Promise.all([
        fetchLandingPage(),
        fetchFAQData(),
      ]);

      console.log("[DEBUG] fetched landingData:", landingData); // DEBUG
      console.log("[DEBUG] fetched faqData:", faqData); // DEBUG

      pageData.value = {
        ...landingData,
        faqs: faqData,
      };
    } catch (error) {
      console.error("Gagal fetch landing page:", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchData);

  return { pageData, isLoading };
}
