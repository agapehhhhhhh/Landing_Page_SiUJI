// src/services/payloadService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchLandingPage = async () => {
  try {
    const [hero] = await Promise.all([
      axios
        .get(`${API_BASE_URL}/hero-section`)
        .then((res) => res.data.docs?.[0]),
    ]);
    return {
      hero: hero ?? {
        heroTitle: "Headline Utama Dari Aplikasi SIUJIII",
        heroSubtitle:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        ctaButtonText: "Get Started Nowwwwwwwww",
        heroImage: { url: "require('@/assets/ilustrasi-hero.png')" },
      },
    };
  } catch (e) {
    console.error("[fetchLandingPage] Error:", e);
    return {
      hero: {
        heroTitle: "Fallback Title",
        heroSubtitle: "Fallback Subtitle",
        heroImage: { url: "" },
      },
    };
  }
};
