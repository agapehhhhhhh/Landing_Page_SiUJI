// src/composables/useLandingPageData.js
import { ref, onMounted } from "vue";
import { fetchLandingPage } from "@/services/payloadService";

export function useLandingPageData() {
  const pageData = ref({});
  const isLoading = ref(true);

  const fetchData = async () => {
    try {
      const data = await fetchLandingPage();
      console.log("[DEBUG] fetched pageData:", data); // DEBUG
      pageData.value = data;
    } catch (error) {
      console.error("Gagal fetch landing page:", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchData);

  return { pageData, isLoading };
}
