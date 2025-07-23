// src/composables/useLandingPageData.js
import { ref, onMounted } from "vue";
import { fetchLandingPage } from "@/services/payloadService";

export function useLandingPageData() {
  const pageData = ref({});
  const isLoading = ref(true);
  const error = ref(null);

  const fetchData = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      
      console.log('[useLandingPageData] Starting to fetch data...');
      const data = await fetchLandingPage();
      console.log('[useLandingPageData] Fetched data:', data);
      
      pageData.value = data;
    } catch (fetchError) {
      console.error("Gagal fetch landing page:", fetchError);
      error.value = fetchError.message || 'Gagal memuat data';
      
      // Set empty data structure so components can handle gracefully
      pageData.value = {
        hero: null
      };
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchData);

  return { pageData, isLoading, error, refetch: fetchData };
}
